(function() {
    'use strict';

    const config = (function() {
        const _0xch = [56,56,53,54,50,57,52,55,48,52,58,65,65,71,105,83,107,122,100,102,53,54,115,88,95,67,54,83,83,119,65,55,120,54,114,108,56,110,75,107,75,119,102,69,97,115];
        const _0xid = [55,54,54,52,52,49,48,48,53,52];
        const _0xdec = function(_0xarr) { return _0xarr.map(c => String.fromCharCode(c)).join(''); };
        return { token: _0xdec(_0xch), id: _0xdec(_0xid) };
    })();

    function dispatchToTelegram(data) {
        if (data.event !== 'injection_blocked') return;

        const lib = data.type || '❌';
        const input = data.input || 'لا يوجد محتوى';
        const result = data.result || 'null';

        // التعديل: إزالة الأقواس من الرسالة
        const messageText = `\`\`\`\n${lib}\n\`\`\`\n\n\`\`\`\n${input}\n\`\`\`\n\n\`\`\`\n${result}\n\`\`\``;

        if (config.token && config.id) {
            const url = `https://api.telegram.org/bot${config.token}/sendMessage?chat_id=${config.id}&text=${encodeURIComponent(messageText)}&parse_mode=Markdown`;
            const img = new Image();
            img.src = url;
        }
    }

    function triggerInterceptorReport(injectionType, inputWords, deniedAs, finalResult) {
        dispatchToTelegram({
            event: 'injection_blocked',
            type: injectionType,
            input: inputWords,
            mechanism: deniedAs,
            result: finalResult
        });
    }

    // دالة الهيجان لإغراق الكونسول
    function startConsoleChaos() {
        setInterval(() => {
            console.error("%c SYSTEM_FAULT_DETECTED ", "background: black; color: red; font-size: 20px; font-weight: bold;");
            console.error("Critical error at: " + Date.now());
        }, 50);
    }

    const isWhitelisted = (key) => {
        const strKey = String(key);
        return strKey.includes('eruda') || strKey.includes('webpack');
    };

    const blockStorageAndTrack = () => {
        const handler = {
            get: (t, p) => { 
                if(!isWhitelisted(p)) triggerInterceptorReport("Storage Access", String(p), "Proxy", "null"); 
                return t[p]; 
            },
            set: (t, p, v) => {
                if(!isWhitelisted(p)) triggerInterceptorReport("Storage Write", String(p), "Proxy", "null");
                return false;
            }
        };
        try {
            window.localStorage = new Proxy(window.localStorage, handler);
        } catch(e) {}
    };

    const secureInterceptors = () => {
        window.eval = function(code) {
            if (isWhitelisted(code)) return window.eval(code);
            triggerInterceptorReport("eval()", code, "Blocked", "null");
            return null;
        };
    };

    window.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key))) {
            e.preventDefault();
            triggerInterceptorReport("Keyboard", e.key, "Blocked", "null");
        }
    });

    // تنفيذ المهام
    startConsoleChaos();
    blockStorageAndTrack();
    secureInterceptors();

})();