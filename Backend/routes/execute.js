const express = require('express');
const fs = require('fs/promises');
const os = require('os');
const path = require('path');
const { spawn } = require('child_process');

const router = express.Router();

const MAX_CODE_CHARS = 50000;
const MAX_OUTPUT_BYTES = 64 * 1024;
const COMPILE_TIMEOUT_MS = 10000;
const RUN_TIMEOUT_MS = 8000;
const TMP_ROOT = path.join(os.tmpdir(), 'codelens-c-runs');
const C_COMPILER = process.env.C_COMPILER || 'gcc';

function normalizeEol(value) {
    return String(value || '').replace(/\r\n/g, '\n');
}

function sanitizeOutput(text, scrub) {
    if (!text) return '';

    var out = String(text);
    if (!scrub) return out;

    if (scrub.sourcePath) {
        out = out.split(scrub.sourcePath).join('main.c');
    }
    if (scrub.binaryPath) {
        out = out.split(scrub.binaryPath).join('program');
    }
    if (scrub.workDir) {
        out = out.split(scrub.workDir + path.sep).join('');
        out = out.split(scrub.workDir).join('');
    }

    return out;
}

function compactResult(result, scrub) {
    return {
        stdout: sanitizeOutput(result.stdout, scrub),
        stderr: sanitizeOutput(result.stderr, scrub),
        exitCode: result.exitCode,
        timedOut: result.timedOut,
        outputTruncated: result.outputTruncated,
        durationMs: result.durationMs
    };
}

function stripCommentsAndStrings(code) {
    return String(code || '')
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/\/\/[^\n\r]*/g, ' ')
        .replace(/"(?:\\.|[^"\\])*"/g, '""')
        .replace(/'(?:\\.|[^'\\])*'/g, "''");
}

function usesInputOperations(code) {
    const sanitized = stripCommentsAndStrings(code);
    const inputPatterns = [
        /\bscanf\s*\(/,
        /\bfscanf\s*\(\s*stdin\b/,
        /\bfgets\s*\(/,
        /\bgetchar\s*\(/,
        /\bgets\s*\(/
    ];

    return inputPatterns.some(function(re) {
        return re.test(sanitized);
    });
}

function runProcess(command, args, options) {
    const timeoutMs = options.timeoutMs;
    const maxOutputBytes = options.maxOutputBytes;

    return new Promise(function(resolve) {
        const startedAt = Date.now();
        let stdout = '';
        let stderr = '';
        let stdoutBytes = 0;
        let stderrBytes = 0;
        let timedOut = false;
        let outputTruncated = false;
        let settled = false;

        const child = spawn(command, args, {
            cwd: options.cwd,
            shell: false,
            windowsHide: true,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        function finish(payload) {
            if (settled) return;
            settled = true;
            resolve(payload);
        }

        function markTruncatedAndKill() {
            if (outputTruncated) return;
            outputTruncated = true;
            try {
                child.kill('SIGKILL');
            } catch (_) {
                // no-op
            }
        }

        const timer = setTimeout(function() {
            timedOut = true;
            try {
                child.kill('SIGKILL');
            } catch (_) {
                // no-op
            }
        }, timeoutMs);

        child.on('error', function(err) {
            clearTimeout(timer);
            finish({
                stdout: stdout,
                stderr: stderr,
                exitCode: -1,
                signal: null,
                timedOut: timedOut,
                outputTruncated: outputTruncated,
                durationMs: Date.now() - startedAt,
                spawnError: {
                    code: err && err.code ? err.code : 'SPAWN_ERROR',
                    message: err && err.message ? err.message : 'Failed to start process'
                }
            });
        });

        child.stdout.on('data', function(chunk) {
            const text = chunk.toString('utf8');
            stdout += text;
            stdoutBytes += Buffer.byteLength(text, 'utf8');
            if (stdoutBytes + stderrBytes > maxOutputBytes) {
                markTruncatedAndKill();
            }
        });

        child.stderr.on('data', function(chunk) {
            const text = chunk.toString('utf8');
            stderr += text;
            stderrBytes += Buffer.byteLength(text, 'utf8');
            if (stdoutBytes + stderrBytes > maxOutputBytes) {
                markTruncatedAndKill();
            }
        });

        child.on('close', function(code, signal) {
            clearTimeout(timer);

            if (outputTruncated) {
                stderr += (stderr.endsWith('\n') ? '' : '\n') +
                    '[codelens] Output limit exceeded. Process terminated.';
            }

            finish({
                stdout: stdout,
                stderr: stderr,
                exitCode: typeof code === 'number' ? code : -1,
                signal: signal || null,
                timedOut: timedOut,
                outputTruncated: outputTruncated,
                durationMs: Date.now() - startedAt,
                spawnError: null
            });
        });
        child.stdin.end();
    });
}

/**
 * POST /api/execute/c
 * Body: { code: string }
 *
 * Compiles and runs C code in a temporary folder with strict execution limits.
 */
router.post('/c', async function(req, res) {
    const code = normalizeEol(req.body && req.body.code);

    if (!code.trim()) {
        return res.status(400).json({ success: false, message: 'Code is required' });
    }
    if (code.length > MAX_CODE_CHARS) {
        return res.status(400).json({
            success: false,
            message: 'Code is too large. Max ' + MAX_CODE_CHARS + ' characters allowed'
        });
    }
    if (code.indexOf('\u0000') !== -1) {
        return res.status(400).json({ success: false, message: 'Code contains invalid null bytes' });
    }
    if (usesInputOperations(code)) {
        return res.status(400).json({
            success: false,
            stage: 'validation',
            message: 'Input-taking programs are disabled. Remove scanf/fgets/getchar/gets and try again.'
        });
    }

    const runId = 'run-' + Date.now() + '-' + Math.random().toString(16).slice(2, 10);
    const workDir = path.join(TMP_ROOT, runId);
    const sourcePath = path.join(workDir, 'main.c');
    const binaryPath = path.join(workDir, process.platform === 'win32' ? 'main.exe' : 'main.out');
    const scrub = { workDir: workDir, sourcePath: sourcePath, binaryPath: binaryPath };

    try {
        await fs.mkdir(workDir, { recursive: true });
        await fs.writeFile(sourcePath, code, 'utf8');

        const compileArgs = [
            '-std=c11',
            '-O2',
            '-Wall',
            '-Wextra',
            sourcePath,
            '-o',
            binaryPath
        ];

        const compileResult = await runProcess(C_COMPILER, compileArgs, {
            cwd: workDir,
            timeoutMs: COMPILE_TIMEOUT_MS,
            maxOutputBytes: MAX_OUTPUT_BYTES
        });

        if (compileResult.spawnError) {
            if (compileResult.spawnError.code === 'ENOENT') {
                return res.status(503).json({
                    success: false,
                    stage: 'compile',
                    message: 'C compiler not found on server. Install GCC and set C_COMPILER if needed.',
                    compile: compactResult(compileResult, scrub)
                });
            }

            return res.status(500).json({
                success: false,
                stage: 'compile',
                message: compileResult.spawnError.message || 'Failed to start compiler process',
                compile: compactResult(compileResult, scrub)
            });
        }

        if (compileResult.timedOut) {
            return res.json({
                success: false,
                stage: 'compile',
                message: 'Compilation timed out',
                compile: compactResult(compileResult, scrub)
            });
        }

        if (compileResult.exitCode !== 0) {
            return res.json({
                success: false,
                stage: 'compile',
                message: 'Compilation failed',
                compile: compactResult(compileResult, scrub)
            });
        }

        const runResult = await runProcess(binaryPath, [], {
            cwd: workDir,
            timeoutMs: RUN_TIMEOUT_MS,
            maxOutputBytes: MAX_OUTPUT_BYTES
        });

        if (runResult.spawnError) {
            return res.json({
                success: false,
                stage: 'run',
                message: runResult.spawnError.message || 'Failed to start compiled program',
                compile: compactResult(compileResult, scrub),
                run: compactResult(runResult, scrub)
            });
        }

        if (runResult.timedOut) {
            return res.json({
                success: false,
                stage: 'run',
                message: 'Program execution timed out',
                compile: compactResult(compileResult, scrub),
                run: compactResult(runResult, scrub)
            });
        }

        const runSuccess = runResult.exitCode === 0;

        return res.json({
            success: runSuccess,
            stage: 'run',
            message: runSuccess ? 'Program finished' : 'Program exited with a non-zero code',
            compile: compactResult(compileResult, scrub),
            run: compactResult(runResult, scrub),
            limits: {
                codeChars: MAX_CODE_CHARS,
                outputBytes: MAX_OUTPUT_BYTES,
                compileTimeoutMs: COMPILE_TIMEOUT_MS,
                runTimeoutMs: RUN_TIMEOUT_MS
            }
        });
    } catch (err) {
        console.error('Execute C Error:', err);
        return res.status(500).json({ success: false, message: 'Server error while executing code' });
    } finally {
        try {
            await fs.rm(workDir, { recursive: true, force: true });
        } catch (_) {
            // ignore cleanup failure
        }
    }
});

module.exports = router;
