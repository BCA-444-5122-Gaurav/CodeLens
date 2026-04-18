window.FullScreenEditor = (function () {
    'use strict';

    function $(sel) { return document.querySelector(sel); }
    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    var overlay       = null;
    var codeArea      = null;
    var codeInput     = null;
    var codeHighlight = null;
    var lineNumbers   = null;
    var lineNumsInner = null;
    var fileBadgeText = null;
    var terminalEl    = null;
    var terminalBody  = null;
    var runBtn        = null;
    var statusLang    = null;
    var statusLines   = null;
    var isRunning     = false;
    var isOpen        = false;
    var terminalState = 'minimized'; // minimized | open | expanded
    var pendingRender = false;
    var pendingSync   = false;

    function open() {
        if (isOpen) return;
        overlay = document.getElementById('fseOverlay');
        if (!overlay) return;

        isOpen = true;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('fse-open');
        overlay.classList.add('open');
        cacheEls();
        syncFromEditor();
        resetTerminal();
        if (window.lucide) lucide.createIcons({ rootElement: overlay });
    }

    function close() {
        if (!isOpen) return;
        syncToMainEditor();
        isOpen = false;
        document.body.style.overflow = '';
        document.body.classList.remove('fse-open');
        if (overlay) overlay.classList.remove('open');
    }

    function cacheEls() {
        codeArea      = $('#fseCodeArea');
        codeInput     = document.getElementById('fseCodeInput');
        codeHighlight = document.getElementById('fseCodeHighlight');
        lineNumbers   = document.getElementById('fseLineNumbers');
        lineNumsInner = document.getElementById('fseLineNumbersInner');
        fileBadgeText = $('#fseFileBadgeText');
        terminalEl    = $('#fseTerminal');
        terminalBody  = $('#fseTerminalBody');
        runBtn        = $('#fseBtnRun');
        statusLang    = $('#fseStatusLang');
        statusLines   = $('#fseStatusLines');
    }

    function toRunnerLanguage(label) {
        var normalized = String(label || '').trim().toLowerCase();
        if (normalized === 'c') return 'c';
        return '';
    }

    function toSyntaxLanguage(label) {
        var normalized = String(label || '').trim().toLowerCase();
        if (normalized === 'c++') return 'cpp';
        if (normalized === 'js') return 'javascript';
        if (normalized === 'py') return 'python';
        return normalized || 'c';
    }

    function getMainEditorCodeText() {
        var spans = document.querySelectorAll('.code-content .code-text');
        if (!spans.length) return '';
        return Array.prototype.map.call(spans, function (s) {
            return s.textContent || '';
        }).join('\n');
    }

    function getCurrentCodeText() {
        if (!codeInput) return '';
        return String(codeInput.value || '').replace(/\r\n/g, '\n');
    }

    function updateLineCount(text) {
        var lineCount = text ? text.split('\n').length : 1;

        if (statusLines) {
            statusLines.textContent = lineCount + ' lines';
        }

        var infoEl = document.querySelector('.code-container-header .info');
        if (infoEl) {
            var langLabel = statusLang ? statusLang.textContent : 'C';
            infoEl.textContent = langLabel + ' · ' + lineCount + ' lines';
        }
    }

    function renderLineNumbers(lineCount) {
        if (!lineNumsInner) return;
        var safeCount = Math.max(1, lineCount || 1);
        var html = '';
        for (var i = 1; i <= safeCount; i += 1) {
            html += '<div class="fse-line-number">' + i + '</div>';
        }
        lineNumsInner.innerHTML = html;
    }

    function syncScrollPositions() {
        if (!codeInput) return;
        if (codeHighlight) {
            codeHighlight.style.transform =
                'translate(' + (-codeInput.scrollLeft) + 'px, ' + (-codeInput.scrollTop) + 'px)';
        }
        if (lineNumsInner) {
            lineNumsInner.style.transform = 'translateY(' + (-codeInput.scrollTop) + 'px)';
        }
    }

    function scheduleSyncScroll() {
        if (pendingSync) return;
        pendingSync = true;
        requestAnimationFrame(function () {
            pendingSync = false;
            syncScrollPositions();
        });
    }

    function renderEditorLayers() {
        if (!codeInput) return;

        var codeText = getCurrentCodeText();
        var syntaxLang = toSyntaxLanguage(statusLang ? statusLang.textContent : 'C');
        var highlighted = [];

        if (window.SyntaxHighlighter && typeof window.SyntaxHighlighter.highlight === 'function') {
            highlighted = window.SyntaxHighlighter.highlight(codeText, syntaxLang);
        } else {
            highlighted = codeText.split('\n').map(escapeHtml);
        }

        if (!highlighted.length) highlighted = [''];

        if (codeHighlight) {
            codeHighlight.innerHTML = highlighted.join('\n');
        }

        renderLineNumbers(highlighted.length);
        updateLineCount(codeText);
        scheduleSyncScroll();
    }

    function scheduleRender() {
        if (pendingRender) return;
        pendingRender = true;
        requestAnimationFrame(function () {
            pendingRender = false;
            renderEditorLayers();
        });
    }

    function ensureEditorLayout() {
        if (!codeArea) return;

        if (!codeInput || !codeArea.contains(codeInput) || !codeHighlight || !lineNumbers || !lineNumsInner) {
            codeArea.innerHTML = '';

            var wrap = document.createElement('div');
            wrap.className = 'fse-editor-wrap';

            lineNumbers = document.createElement('div');
            lineNumbers.id = 'fseLineNumbers';
            lineNumbers.className = 'fse-line-numbers';

            lineNumsInner = document.createElement('div');
            lineNumsInner.id = 'fseLineNumbersInner';
            lineNumsInner.className = 'fse-line-numbers-inner';
            lineNumbers.appendChild(lineNumsInner);

            var pane = document.createElement('div');
            pane.className = 'fse-editor-pane';

            codeHighlight = document.createElement('pre');
            codeHighlight.id = 'fseCodeHighlight';
            codeHighlight.className = 'fse-code-highlight';
            codeHighlight.setAttribute('aria-hidden', 'true');

            codeInput = document.createElement('textarea');
            codeInput.id = 'fseCodeInput';
            codeInput.className = 'fse-code-input';
            codeInput.spellcheck = false;

            pane.appendChild(codeHighlight);
            pane.appendChild(codeInput);

            wrap.appendChild(lineNumbers);
            wrap.appendChild(pane);
            codeArea.appendChild(wrap);
        }

        if (!codeInput.dataset.wired) {
            codeInput.addEventListener('input', function () {
                scheduleRender();
            });

            codeInput.addEventListener('scroll', function () {
                scheduleSyncScroll();
            });

            codeInput.addEventListener('keydown', function (event) {
                if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
                    event.preventDefault();
                    handleRun();
                    return;
                }

                if (event.key === 'Tab') {
                    event.preventDefault();
                    var start = codeInput.selectionStart;
                    var end = codeInput.selectionEnd;
                    var value = codeInput.value;

                    codeInput.value = value.slice(0, start) + '    ' + value.slice(end);
                    codeInput.selectionStart = start + 4;
                    codeInput.selectionEnd = start + 4;
                    scheduleRender();
                }
            });

            codeInput.dataset.wired = '1';
        }
    }

    function syncToMainEditor() {
        var codeText = getCurrentCodeText();
        var mainCode = document.querySelector('.code-content');
        if (!mainCode) return;

        var langLabel = statusLang ? statusLang.textContent : 'C';
        var lang = toSyntaxLanguage(langLabel);

        if (window.SyntaxHighlighter && typeof window.SyntaxHighlighter.applyToViewer === 'function') {
            window.SyntaxHighlighter.applyToViewer(codeText, lang, mainCode);
        } else {
            var rows = codeText.split('\n');
            if (!rows.length) rows = [''];
            mainCode.innerHTML = rows.map(function (line, index) {
                return '<div class="code-line">' +
                    '<span class="line-number">' + (index + 1) + '</span>' +
                    '<span class="code-text">' + escapeHtml(line) + '</span>' +
                    '</div>';
            }).join('');
        }

        if (window.__currentExample && window.__currentExample.meta) {
            window.__currentExample.meta.code = codeText;
        }

        updateLineCount(codeText);
    }

    function syncFromEditor() {
        codeArea = document.getElementById('fseCodeArea');
        if (!codeArea) return;

        ensureEditorLayout();
        if (codeInput) {
            codeInput.value = getMainEditorCodeText();
            codeInput.scrollTop = 0;
            codeInput.scrollLeft = 0;
        }

        var mainBadge = document.querySelector('.file-badge span');
        var fseBadge  = document.getElementById('fseFileBadgeText');
        if (mainBadge && fseBadge) {
            fseBadge.innerHTML = mainBadge.innerHTML;
        }

        var mainInfo = document.querySelector('.code-container-header .info');
        var lang = 'C';
        var lines = '0';
        if (mainInfo) {
            var parts = mainInfo.textContent.split('·');
            if (parts.length >= 2) {
                lang  = parts[0].trim();
                lines = parts[1].trim();
            }
        }
        var sl = document.getElementById('fseStatusLang');
        var sli = document.getElementById('fseStatusLines');
        if (sl)  sl.textContent = lang.toUpperCase();
        if (sli) sli.textContent = lines;

        renderEditorLayers();
    }

    function handleCopy() {
        var text = getCurrentCodeText();

        var btn = document.getElementById('fseBtnCopy');
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function () { showCopied(btn); });
        } else {
            var ta = document.createElement('textarea');
            ta.value = text;
            ta.style.cssText = 'position:fixed;opacity:0;left:-9999px;';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showCopied(btn);
        }
    }

    function showCopied(btn) {
        if (!btn) return;
        btn.classList.add('copied');
        var span = btn.querySelector('span');
        var old = span ? span.textContent : '';
        if (span) span.textContent = 'Copied!';
        setTimeout(function () {
            btn.classList.remove('copied');
            if (span) span.textContent = old;
        }, 1500);
    }

    function setTerminalEmptyState() {
        if (!terminalBody) return;
        terminalBody.innerHTML = '<span class="fse-terminal-empty">Click "Run" to execute code</span>';
    }

    function resetTerminal() {
        terminalState = 'minimized';
        if (terminalEl) {
            terminalEl.classList.remove('open', 'expanded');
        }
        setTerminalEmptyState();
        var indicator = document.getElementById('fseTerminalRunning');
        if (indicator) indicator.classList.remove('active');
    }

    function toggleTerminal() {
        if (!terminalEl) return;
        if (terminalState === 'minimized') {
            terminalState = 'open';
            terminalEl.classList.add('open');
            terminalEl.classList.remove('expanded');
        } else {
            terminalState = 'minimized';
            terminalEl.classList.remove('open', 'expanded');
        }
    }

    function toggleExpand() {
        if (!terminalEl) return;
        if (terminalState === 'minimized') {
            terminalState = 'expanded';
            terminalEl.classList.add('open', 'expanded');
        } else if (terminalState === 'open') {
            terminalState = 'expanded';
            terminalEl.classList.add('expanded');
        } else {
            terminalState = 'open';
            terminalEl.classList.remove('expanded');
        }
    }

    function clearTerminal() {
        setTerminalEmptyState();
    }

    function appendTerminalLine(type, text) {
        if (!terminalBody) return;
        var empty = terminalBody.querySelector('.fse-terminal-empty');
        if (empty) empty.remove();

        var div = document.createElement('div');
        div.className = 'fse-terminal-line fse-terminal-line--' + type;
        div.textContent = text;
        terminalBody.appendChild(div);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function appendTerminalBlock(type, text) {
        if (!text) return;
        String(text).split(/\r?\n/).forEach(function (line) {
            appendTerminalLine(type, line);
        });
    }

    function setRunBusy(isBusy) {
        isRunning = isBusy;
        if (runBtn) {
            runBtn.classList.toggle('running', isBusy);
        }
        var indicator = document.getElementById('fseTerminalRunning');
        if (indicator) {
            indicator.classList.toggle('active', isBusy);
        }
    }

    async function handleRun() {
        if (isRunning) return;

        var languageLabel = statusLang ? statusLang.textContent : 'C';
        if (toRunnerLanguage(languageLabel) !== 'c') {
            if (terminalState === 'minimized' && terminalEl) {
                terminalState = 'open';
                terminalEl.classList.add('open');
            }
            if (terminalBody) terminalBody.innerHTML = '';
            appendTerminalLine('error', 'Only C language execution is supported right now.');
            return;
        }

        var sourceCode = getCurrentCodeText();
        if (!sourceCode.trim()) {
            if (terminalState === 'minimized' && terminalEl) {
                terminalState = 'open';
                terminalEl.classList.add('open');
            }
            if (terminalBody) terminalBody.innerHTML = '';
            appendTerminalLine('error', 'Please write some C code before running.');
            return;
        }

        syncToMainEditor();

        if (terminalState === 'minimized' && terminalEl) {
            terminalState = 'open';
            terminalEl.classList.add('open');
        }

        if (terminalBody) terminalBody.innerHTML = '';

        setRunBusy(true);

        var fileName = 'main.c';
        var badge = document.getElementById('fseFileBadgeText');
        if (badge && badge.textContent) fileName = badge.textContent;

        var ts = new Date().toLocaleTimeString();
        appendTerminalLine('compile', '[' + ts + '] Compiling ' + fileName + '...');

        var requestBody = {
            code: sourceCode
        };

        var headers = { 'Content-Type': 'application/json' };
        var token = localStorage.getItem('codelens-token');
        if (token) headers.Authorization = 'Bearer ' + token;

        try {
            var response = await smartFetch(API_URL + '/execute/c', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(requestBody)
            });

            var data = null;
            try {
                data = await response.json();
            } catch (_) {
                throw new Error('Invalid response from execution server');
            }

            if (data && data.compile) {
                if (data.compile.stdout) appendTerminalBlock('compile', data.compile.stdout);
                if (data.compile.stderr) appendTerminalBlock(data.success ? 'compile' : 'error', data.compile.stderr);
            }

            if (!response.ok) {
                appendTerminalLine('error', (data && data.message) ? data.message : 'Execution request failed');
                return;
            }

            if (!data.success && data.stage === 'compile') {
                appendTerminalLine('error', '[' + new Date().toLocaleTimeString() + '] ' + (data.message || 'Compilation failed'));
                return;
            }

            appendTerminalLine('run', '> Running program...');

            if (data.run) {
                if (data.run.stdout) appendTerminalBlock('output', data.run.stdout);
                if (data.run.stderr) appendTerminalBlock('error', data.run.stderr);

                var doneAt = new Date().toLocaleTimeString();
                if (data.run.timedOut) {
                    appendTerminalLine('error', '[' + doneAt + '] Program execution timed out');
                } else if (data.success) {
                    appendTerminalLine('success', '[' + doneAt + '] Process exited with code ' + data.run.exitCode);
                } else {
                    appendTerminalLine('error', '[' + doneAt + '] Process exited with code ' + data.run.exitCode);
                }
            } else {
                appendTerminalLine(data.success ? 'success' : 'error', data.message || 'Execution finished');
            }
        } catch (err) {
            appendTerminalLine('error', (err && err.message) ? err.message : 'Network error while running code');
        } finally {
            setRunBusy(false);
        }
    }

    function handleVisualize() {
        close();
    }

    function handleExamples() {
        if (window._P && typeof window._P.openBrowseExamples === 'function') {
            window._P.openBrowseExamples();
        } else {
            var popup = document.getElementById('browseExamplesPopup');
            if (popup) popup.classList.add('active');
        }
    }

    function refresh() {
        if (!isOpen) return;
        syncFromEditor();
        resetTerminal();
        if (window.lucide) lucide.createIcons({ rootElement: overlay });
    }

    function init() {
        overlay = document.getElementById('fseOverlay');
        if (!overlay) return;

        cacheEls();

        var closeBtn = document.getElementById('fseCloseBtn');
        var redDot   = document.getElementById('fseDotRed');
        if (closeBtn) closeBtn.addEventListener('click', close);
        if (redDot)   redDot.addEventListener('click', close);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) close();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                var browsePopup = document.getElementById('browseExamplesPopup');
                if (browsePopup && browsePopup.classList.contains('active')) return;
                close();
            }
        });

        // Tool buttons
        var copyBtn = document.getElementById('fseBtnCopy');
        if (copyBtn) copyBtn.addEventListener('click', handleCopy);

        var examplesBtn = document.getElementById('fseBtnExamples');
        if (examplesBtn) examplesBtn.addEventListener('click', handleExamples);

        var visualizeBtn = document.getElementById('fseBtnVisualize');
        if (visualizeBtn) visualizeBtn.addEventListener('click', handleVisualize);

        var runBtnEl = document.getElementById('fseBtnRun');
        if (runBtnEl) runBtnEl.addEventListener('click', handleRun);

        // Terminal controls
        var termHeader = document.getElementById('fseTerminalHeader');
        if (termHeader) termHeader.addEventListener('click', toggleTerminal);

        var termClear = document.getElementById('fseTerminalClear');
        if (termClear) termClear.addEventListener('click', function (e) {
            e.stopPropagation();
            clearTerminal();
        });

        var termExpand = document.getElementById('fseTerminalExpand');
        if (termExpand) termExpand.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleExpand();
        });

        // Expand button in main editor header
        var expandBtn = document.querySelector('.code-viewer-header-right .action-btn[title="Expand"]');
        if (expandBtn) {
            expandBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                open();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        open: open,
        close: close,
        refresh: refresh
    };
})();
