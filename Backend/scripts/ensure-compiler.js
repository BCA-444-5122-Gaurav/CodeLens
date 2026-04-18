const { spawnSync } = require('child_process');

const CHECK_ONLY = process.argv.includes('--check-only');
const IS_LINUX = process.platform === 'linux';

function commandWorks(command, args) {
    try {
        const result = spawnSync(command, args || [], {
            stdio: 'ignore',
            shell: false
        });
        return result && result.status === 0;
    } catch (_) {
        return false;
    }
}

function shellCommandExists(command) {
    if (!IS_LINUX) return false;
    try {
        const result = spawnSync('sh', ['-lc', 'command -v ' + command + ' >/dev/null 2>&1'], {
            stdio: 'ignore',
            shell: false
        });
        return result && result.status === 0;
    } catch (_) {
        return false;
    }
}

function runShell(command) {
    const result = spawnSync('sh', ['-lc', command], {
        stdio: 'inherit',
        shell: false
    });
    return !!(result && result.status === 0);
}

function hasCompiler() {
    return commandWorks('gcc', ['--version']);
}

function shouldAutoInstall() {
    if (process.env.FORCE_COMPILER_SETUP === '1') return true;
    if (process.env.CI === 'true') return true;
    if (process.env.NODE_ENV === 'production') return true;
    if (process.env.RENDER === 'true') return true;
    if (process.env.RAILWAY_ENVIRONMENT) return true;
    return false;
}

function getPrivilegePrefix() {
    if (!IS_LINUX) return '';
    if (typeof process.getuid === 'function' && process.getuid() === 0) return '';
    if (shellCommandExists('sudo')) return 'sudo ';
    return '';
}

function tryInstallCompiler() {
    if (!IS_LINUX) return false;

    const prefix = getPrivilegePrefix();
    const commands = [];

    if (shellCommandExists('apt-get')) {
        commands.push(prefix + 'apt-get update -y && ' + prefix + 'apt-get install -y gcc');
    }
    if (shellCommandExists('apk')) {
        commands.push(prefix + 'apk add --no-cache gcc musl-dev libc-dev');
    }
    if (shellCommandExists('dnf')) {
        commands.push(prefix + 'dnf install -y gcc');
    }
    if (shellCommandExists('yum')) {
        commands.push(prefix + 'yum install -y gcc');
    }
    if (shellCommandExists('zypper')) {
        commands.push(prefix + 'zypper --non-interactive install gcc');
    }

    for (let i = 0; i < commands.length; i += 1) {
        const command = commands[i];
        console.log('[compiler] Attempting install with: ' + command);
        if (!runShell(command)) continue;
        if (hasCompiler()) return true;
    }

    return false;
}

function failWithHelp(message) {
    console.error('[compiler] ' + message);
    console.error('[compiler] Expected gcc to be available for /api/execute/c.');
    console.error('[compiler] If auto-install is blocked on your host, use a Docker deploy with gcc preinstalled.');
    process.exit(1);
}

function main() {
    if (hasCompiler()) {
        console.log('[compiler] gcc detected.');
        process.exit(0);
    }

    if (CHECK_ONLY) {
        failWithHelp('gcc was not found during startup check.');
    }

    if (!shouldAutoInstall()) {
        console.warn('[compiler] gcc not found, skipping auto-install outside deploy/CI environment.');
        process.exit(0);
    }

    if (!IS_LINUX) {
        failWithHelp('Auto-install only supports Linux deploy targets.');
    }

    console.log('[compiler] gcc not found. Starting auto-install...');
    const installed = tryInstallCompiler();
    if (!installed || !hasCompiler()) {
        failWithHelp('Auto-install failed.');
    }

    console.log('[compiler] gcc installed successfully.');
    process.exit(0);
}

main();
