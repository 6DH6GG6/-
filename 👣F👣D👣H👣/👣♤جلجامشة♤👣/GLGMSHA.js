/* =====================================================
   جلخامشة الوديّة — ملف الحقن الكامل
   استخدام: <script src="jilkhamsha.js"></script>
   يُضاف في نهاية الـ body بعد عناصر HTML
   ===================================================== */

(function () {
  'use strict';

  /* ─── إعدادات قابلة للتعديل ─── */
  var MENU_ITEMS = [
    { id: 'news',       icon: '📰', label: 'أحدث الأخبار', file: 'news.js',       global: 'NewsSection'       },
    { id: 'videos',     icon: '🎬', label: 'إبادة الحية',   file: 'videos.js',     global: 'VideosSection'     },
    { id: 'photos',     icon: '🖼',  label: 'دعس وفضائح',    file: 'photos.js',     global: 'PhotosSection'     },
    { id: 'blogs',      icon: '📝', label: 'مدونات',         file: 'blogs.js',      global: 'BlogsSection'      },
    { id: 'links',      icon: '🔗', label: 'روابط',          file: 'links.js',      global: 'LinksSection'      },
    { id: 'info',       icon: 'ℹ️', label: 'معلومات',        file: 'info.js',       global: 'InfoSection'       },
    { id: 'supporters', icon: '💖', label: 'من دعموني',      file: 'supporters.js', global: 'SupportersSection' },
  ];

  var NOTIFICATIONS = [
    { section: 'news',   label: '📰 أحدث الأخبار', dot: 'green', badge: 3, msg: 'تم إضافة 3 أخبار جديدة!',     time: '2025/01/15 — 10:30 م' },
    { section: 'videos', label: '🎬 فيديوهات',      dot: 'red',   badge: 1, msg: 'فيديو جديد تم رفعه الآن',     time: '2025/01/14 — 08:00 م' },
    { section: 'photos', label: '🖼 صور',            dot: 'green', badge: 5, msg: 'تمت إضافة 5 صور جديدة',       time: '2025/01/13 — 04:15 م' },
    { section: 'blogs',  label: '📝 مدونات',         dot: 'red',   badge: 2, msg: 'مدونتان جديدتان في انتظارك', time: '2025/01/12 — 09:00 ص' },
  ];

  var HOME_AVATAR   = 'https://i.imgur.com/S3dRPKW.jpg';
  var AUDIO_SRC     = '👣F👣D👣H👣/👣♤جلجامشة♤👣/🎵T🎵H🎵R🎵.ogg';

  /* ─── حالة داخلية ─── */
  var loadedScripts = new Set();
  var checkedFiles  = new Map();

  /* ═══════════════════════════════════════════
     1. حقن CSS
  ═══════════════════════════════════════════ */
  function injectCSS() {
    var style = document.createElement('style');
    style.textContent = [
      ':root{--pk1:#ff4d9e;--pk2:#f472b6;--pk3:#fda4c8;--pk4:#ffe0f0;--pu1:#c084fc;--pu2:#e879f9;--dk1:#12001a;--dk2:#0e0015;--dk3:#1a0026;--gold:#f9c8e6}',
      '*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}',
      'html,body{width:100%;min-height:100%;background:var(--dk1);font-family:"Tajawal","Amiri",sans-serif;direction:rtl;overflow-x:hidden;-webkit-tap-highlight-color:transparent}',

      /* ── Splash ── */
      '#splash{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;transition:opacity .8s ease,visibility .8s ease}',
      '#splash.hidden{opacity:0;visibility:hidden;pointer-events:none}',
      '.splash-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 15% 15%,#ff4d9e44 0%,transparent 50%),radial-gradient(ellipse at 85% 10%,#c084fc44 0%,transparent 45%),radial-gradient(ellipse at 50% 90%,#ff4d9e66 0%,transparent 55%),linear-gradient(170deg,#1e0030 0%,#0e0018 45%,#180008 100%);z-index:0}',
      '.splash-noise{position:absolute;inset:0;z-index:1;opacity:.04;background-image:url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E");background-size:200px 200px}',
      '.splash-blobs{position:absolute;inset:0;z-index:2;pointer-events:none;overflow:hidden}',
      '.blob{position:absolute;border-radius:50%;filter:blur(70px);animation:blobFloat ease-in-out infinite;opacity:.3}',
      '.blob1{width:320px;height:320px;background:var(--pk1);top:-80px;right:-80px;animation-duration:9s}',
      '.blob2{width:260px;height:260px;background:var(--pu1);bottom:-60px;left:-60px;animation-duration:11s;animation-delay:-4s}',
      '.blob3{width:200px;height:200px;background:#fb7185;top:35%;left:55%;animation-duration:8s;animation-delay:-6s}',
      '.blob4{width:150px;height:150px;background:var(--pu2);top:60%;right:10%;animation-duration:13s;animation-delay:-2s;opacity:.2}',
      '@keyframes blobFloat{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(25px,-25px) scale(1.06)}66%{transform:translate(-18px,18px) scale(.94)}}',
      '.splash-particles{position:absolute;inset:0;z-index:3;pointer-events:none}',
      '.sp{position:absolute;border-radius:50%;animation:floatUp linear infinite;opacity:0}',
      '@keyframes floatUp{0%{opacity:0;transform:translateY(0) scale(0)}10%{opacity:.9}90%{opacity:.2}100%{opacity:0;transform:translateY(-100vh) scale(2)}}',
      '.splash-garden{position:absolute;bottom:0;left:0;right:0;height:42%;z-index:4;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}',
      '.garden-grass{position:absolute;bottom:0;left:0;right:0;height:55px;background:linear-gradient(180deg,#2a6020,#193810);border-radius:110% 110% 0 0;z-index:1}',
      '.garden-grass::before{content:"";position:absolute;top:-16px;left:0;right:0;height:30px;background:linear-gradient(180deg,#358226,#2a6020);border-radius:100% 100% 0 0}',
      '.flower{position:absolute;bottom:28px;display:flex;flex-direction:column;align-items:center;z-index:5;animation:flowerSway ease-in-out infinite;transform-origin:bottom center}',
      '@keyframes flowerSway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}',
      '.flower-stem{width:3px;background:linear-gradient(180deg,#358226,#193810);border-radius:2px}',
      '.flower-head{font-size:1.6rem;margin-bottom:-3px;filter:drop-shadow(0 0 5px #ff69b488);animation:bloomPulse ease-in-out infinite}',
      '@keyframes bloomPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}',
      '.splash-center{position:relative;z-index:6;display:flex;flex-direction:column;align-items:center;gap:24px;margin-bottom:28px;padding:0 28px}',
      '.splash-logo-wrap{display:flex;flex-direction:column;align-items:center;gap:18px}',
      '.splash-ring-outer{position:relative;width:120px;height:120px;display:flex;align-items:center;justify-content:center}',
      '.splash-ring-outer::before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,#ff4d9e,#c084fc,#fb7185,#fda4c8,#ff4d9e);animation:ringRotate 5s linear infinite;padding:2px;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude}',
      '.splash-ring-outer::after{content:"";position:absolute;inset:8px;border-radius:50%;border:1px solid #ff4d9e22}',
      '@keyframes ringRotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}',
      '.splash-avatar-inner{width:94px;height:94px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#3a0050,#12001a);display:flex;align-items:center;justify-content:center;font-size:3rem;position:relative;z-index:1;box-shadow:0 0 30px #ff4d9e33 inset;filter:drop-shadow(0 0 16px #ff4d9e88);animation:iconPulse 3s ease-in-out infinite}',
      '@keyframes iconPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}',
      '.splash-title{font-size:clamp(1.5rem,5.5vw,2.1rem);font-weight:900;color:#fff;text-align:center;letter-spacing:.5px;line-height:1.4;text-shadow:0 2px 24px #ff4d9e55,0 0 60px #c084fc33}',
      '.splash-sub{font-size:clamp(.8rem,2.8vw,.95rem);color:#fda4c877;text-align:center;letter-spacing:3px;font-weight:400}',
      '.splash-divider{display:flex;align-items:center;gap:10px}',
      '.splash-divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,#ff4d9e55,transparent)}',
      '.splash-divider-dot{width:5px;height:5px;border-radius:50%;background:var(--pk1);opacity:.6}',
      '.splash-hint{font-size:.82rem;color:#fda4c855;text-align:center;letter-spacing:2px}',
      '#splash-btn{width:68px;height:68px;border-radius:50%;border:none;background:linear-gradient(135deg,#ff4d9e,#c084fc 50%,#fb7185);background-size:200% 200%;animation:btnShift 3s ease-in-out infinite,btnGlow 2.5s ease-in-out infinite;color:#fff;font-size:1.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;outline:none;transition:transform .2s;position:relative}',
      '@keyframes btnShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}',
      '@keyframes btnGlow{0%,100%{box-shadow:0 8px 32px #ff4d9e66,0 0 0 0 #ff4d9e22}50%{box-shadow:0 8px 44px #ff4d9eaa,0 0 0 14px #ff4d9e11}}',
      '#splash-btn::before{content:"";position:absolute;inset:-7px;border-radius:50%;border:1.5px solid #ff4d9e44;animation:rippleSplash 2s linear infinite}',
      '#splash-btn::after{content:"";position:absolute;inset:-16px;border-radius:50%;border:1px solid #ff4d9e22;animation:rippleSplash 2s linear infinite .65s}',
      '@keyframes rippleSplash{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.6);opacity:0}}',
      '#splash-btn:hover{transform:scale(1.08)}#splash-btn:active{transform:scale(.93)}',

      /* ── Loader ── */
      '#loader-screen{position:fixed;inset:0;z-index:9998;background:var(--dk2);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;opacity:0;visibility:hidden;transition:opacity .3s}',
      '#loader-screen.show{opacity:1;visibility:visible}',
      '#loader-screen.hide{opacity:0;visibility:hidden}',
      '.loader-icon{font-size:2.2rem;animation:iconPulse 1.5s ease-in-out infinite}',
      '.loader-title{font-size:clamp(.95rem,3vw,1.3rem);color:var(--pk2);font-weight:700;letter-spacing:3px}',
      '.loader-bar-wrap{width:min(300px,76vw);height:6px;background:#2a001a;border-radius:99px;overflow:hidden;border:1px solid #ff4d9e22;box-shadow:0 0 12px #ff4d9e11}',
      '.loader-bar-fill{height:100%;width:0%;border-radius:99px;background:linear-gradient(90deg,#ff4d9e,#c084fc,#fb7185,#ff4d9e);background-size:300% 100%;animation:barShine 1s linear infinite;transition:width .05s linear}',
      '@keyframes barShine{0%{background-position:0% 50%}100%{background-position:300% 50%}}',
      '.loader-percent{font-size:.9rem;color:var(--pk3);font-weight:700;letter-spacing:2px}',

      /* ── App & Home ── */
      '#app{display:none;flex-direction:column;min-height:100vh}',
      '#app.visible{display:flex}',
      '#stars-global{position:fixed;inset:0;z-index:0;pointer-events:none}',
      '#home-menu{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:50px 20px 90px;transition:opacity .35s ease,transform .35s ease}',
      '#home-menu.hide-out{opacity:0;transform:scale(.96);pointer-events:none}',
      '.home-profile-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;margin-bottom:32px}',
      '.home-avatar-ring{position:relative;width:clamp(120px,30vw,165px);height:clamp(120px,30vw,165px);display:flex;align-items:center;justify-content:center}',
      '.home-avatar-ring::before{content:"";position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,#ff4d9e,#c084fc,#fda4c8,#fb7185,#ff4d9e);animation:ringRotate 8s linear infinite;padding:3px;-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude}',
      '.home-avatar{width:calc(100% - 8px);height:calc(100% - 8px);border-radius:50%;object-fit:cover;box-shadow:0 0 30px #ff4d9e33;position:relative;z-index:1}',
      '.home-avatar-ph{width:calc(100% - 8px);height:calc(100% - 8px);border-radius:50%;background:#1a0018;display:flex;align-items:center;justify-content:center;font-size:3rem;box-shadow:0 0 30px #ff4d9e33;position:relative;z-index:1}',
      '.home-name{font-size:clamp(1.3rem,4vw,1.9rem);font-weight:900;color:#fff;text-shadow:0 0 20px #ff4d9e55;text-align:center}',
      '.home-name-gradient{background:linear-gradient(90deg,#ff4d9e,#c084fc,#fda4c8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
      '.home-subtitle{font-size:.85rem;color:#fda4c855;letter-spacing:2px;margin-top:2px}',
      '.menu-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:100%;max-width:440px}',
      '.menu-card{position:relative;overflow:hidden;cursor:pointer;border-radius:20px;padding:22px 14px 18px;display:flex;flex-direction:column;align-items:center;gap:10px;text-align:center;background:linear-gradient(145deg,#1c0026ee,#120018ee);border:1px solid #ff4d9e22;transition:border-color .3s,box-shadow .3s,transform .2s;-webkit-tap-highlight-color:transparent}',
      '.menu-card::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#ff4d9e55,transparent)}',
      '.menu-card::after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,#ff4d9e0d,transparent 65%);opacity:0;transition:opacity .3s}',
      '.menu-card:hover{border-color:#ff4d9e66;box-shadow:0 8px 32px #ff4d9e22,0 0 0 1px #ff4d9e11;transform:translateY(-4px)}',
      '.menu-card:hover::after{opacity:1}',
      '.menu-card:active{transform:scale(.96)}',
      '.menu-card-icon{font-size:2rem;line-height:1;filter:drop-shadow(0 0 8px #ff4d9e66);transition:transform .3s}',
      '.menu-card:hover .menu-card-icon{transform:scale(1.15)}',
      '.menu-card-label{font-size:.88rem;font-weight:700;color:#ffd6e7cc;line-height:1.35;position:relative;z-index:1}',
      '.menu-card-shine{position:absolute;inset:0;border-radius:20px;background:linear-gradient(135deg,#ffffff08 0%,transparent 50%,#ffffff04 100%);pointer-events:none}',

      /* ── Notif FAB ── */
      '#notif-fab{position:fixed;bottom:26px;left:20px;z-index:200;width:54px;height:54px;border-radius:50%;border:1px solid #ff4d9e44;background:linear-gradient(145deg,#2a0030,#12001a);box-shadow:0 4px 24px #ff4d9e33,inset 0 1px 0 #ff4d9e22;display:flex;align-items:center;justify-content:center;cursor:pointer;outline:none;transition:box-shadow .25s,transform .2s;-webkit-tap-highlight-color:transparent}',
      '#notif-fab::before{content:"";position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ff4d9e11,transparent 70%)}',
      '#notif-fab:hover{box-shadow:0 6px 36px #ff4d9e55,inset 0 1px 0 #ff4d9e33;transform:scale(1.08)}',
      '#notif-fab:active{transform:scale(.93)}',
      '.notif-fab-icon{font-size:1.3rem;position:relative;z-index:1}',
      '#notif-fab-badge{position:absolute;top:-4px;right:-4px;background:linear-gradient(135deg,#ff4d9e,#c084fc);color:#fff;font-size:.6rem;font-weight:900;border-radius:99px;padding:2px 5px;min-width:18px;text-align:center;border:1.5px solid #12001a;display:none;box-shadow:0 2px 8px #ff4d9e66}',
      '#notif-fab-badge.show{display:block}',
      '#notif-drawer{position:fixed;bottom:90px;left:16px;z-index:201;width:min(310px,calc(100vw - 32px));background:linear-gradient(160deg,#1e0028f8,#110016f8);border:1px solid #ff4d9e33;border-radius:22px;box-shadow:0 12px 50px #ff4d9e22,0 2px 0 #ff4d9e11 inset;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);transform:translateY(16px) scale(.96);opacity:0;visibility:hidden;transition:transform .3s cubic-bezier(.4,0,.2,1),opacity .3s,visibility .3s;overflow:hidden}',
      '#notif-drawer::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#ff4d9e44,transparent)}',
      '#notif-drawer.open{transform:translateY(0) scale(1);opacity:1;visibility:visible}',
      '.notif-drawer-header{padding:16px 18px 12px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ff4d9e11}',
      '.notif-drawer-title{font-size:.88rem;font-weight:900;background:linear-gradient(90deg,#ff4d9e,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:1px}',
      '.notif-clear-btn{font-size:.72rem;color:#fda4c866;background:none;border:none;cursor:pointer;font-family:"Tajawal",sans-serif;transition:color .2s}',
      '.notif-clear-btn:hover{color:var(--pk2)}',
      '.notif-list-inner{max-height:270px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:#ff4d9e22 transparent;padding:6px 0}',
      '.notif-item{padding:12px 18px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;transition:background .2s;border-bottom:1px solid #ff4d9e08}',
      '.notif-item:last-child{border-bottom:none}',
      '.notif-item:hover{background:#ff4d9e0a}',
      '.notif-item:active{background:#ff4d9e14}',
      '.notif-dot-sm{width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px}',
      '.notif-dot-sm.green{background:#4ade80;box-shadow:0 0 8px #4ade8077}',
      '.notif-dot-sm.red{background:#ff4d9e;box-shadow:0 0 8px #ff4d9e77}',
      '.notif-item-body{flex:1}',
      '.notif-item-label{font-size:.82rem;font-weight:700;color:#ffd6e7cc;margin-bottom:3px}',
      '.notif-item-msg{font-size:.76rem;color:#fda4c877;line-height:1.45}',
      '.notif-item-time{font-size:.68rem;color:#fda4c844;margin-top:4px;display:flex;align-items:center;gap:4px}',
      '.notif-empty{text-align:center;padding:28px 16px;color:#fda4c844;font-size:.85rem}',

      /* ── Section page ── */
      '#section-page{position:fixed;inset:0;z-index:10;background:var(--dk1);display:flex;flex-direction:column;transform:translateX(-100%);transition:transform .4s cubic-bezier(.4,0,.2,1);overflow-y:auto}',
      '#section-page.slide-in{transform:translateX(0)}',
      '.sec-header{position:sticky;top:0;z-index:5;background:linear-gradient(180deg,#12001aee,#0e0015ee);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid #ff4d9e22;box-shadow:0 4px 24px #0e001588;display:flex;align-items:center;gap:12px;padding:12px 16px;min-height:56px}',
      '.sec-header::after{content:"";position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#ff4d9e33,transparent)}',
      '#back-btn{background:none;border:1px solid #ff4d9e33;color:var(--pk1);font-size:1.3rem;cursor:pointer;width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s,border-color .2s,transform .15s;flex-shrink:0}',
      '#back-btn:hover{background:#2a0030;border-color:#ff4d9e88}',
      '#back-btn:active{transform:scale(.88)}',
      '.sec-header-title{font-size:clamp(.95rem,3.2vw,1.25rem);font-weight:900;background:linear-gradient(90deg,#ff4d9e,#c084fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;flex:1}',
      '#section-content{flex:1;padding:24px 16px 60px;position:relative;z-index:1}',
      '@media(max-width:360px){.menu-grid{gap:9px}.menu-card{padding:16px 10px 13px}.menu-card-icon{font-size:1.7rem}.menu-card-label{font-size:.8rem}}',
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ═══════════════════════════════════════════
     2. حقن HTML الهيكلي
  ═══════════════════════════════════════════ */
  function injectHTML() {
    // الصوت
    if (!document.getElementById('bg-audio')) {
      var audio = document.createElement('audio');
      audio.id = 'bg-audio';
      audio.loop = true;
      audio.preload = 'auto';
      var src = document.createElement('source');
      src.src  = AUDIO_SRC;
      src.type = 'audio/ogg';
      audio.appendChild(src);
      document.body.insertBefore(audio, document.body.firstChild);
    }

    // Canvas النجوم
    if (!document.getElementById('stars-global')) {
      var canvas = document.createElement('canvas');
      canvas.id = 'stars-global';
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    // Splash
    if (!document.getElementById('splash')) {
      var splashDiv = document.createElement('div');
      splashDiv.id = 'splash';
      splashDiv.innerHTML = [
        '<div class="splash-bg"></div>',
        '<div class="splash-noise"></div>',
        '<div class="splash-blobs">',
          '<div class="blob blob1"></div>',
          '<div class="blob blob2"></div>',
          '<div class="blob blob3"></div>',
          '<div class="blob blob4"></div>',
        '</div>',
        '<div class="splash-particles" id="splash-particles"></div>',
        '<div class="splash-center">',
          '<div class="splash-logo-wrap">',
            '<div class="splash-ring-outer">',
              '<div class="splash-avatar-inner">🌸</div>',
            '</div>',
            '<h1 class="splash-title">جلخامشة الوديّة</h1>',
            '<p class="splash-sub">أهلاً بكِ</p>',
          '</div>',
          '<div class="splash-divider">',
            '<div class="splash-divider-line"></div>',
            '<div class="splash-divider-dot"></div>',
            '<div class="splash-divider-line"></div>',
          '</div>',
          '<div style="display:flex;flex-direction:column;align-items:center;gap:12px;">',
            '<button id="splash-btn" aria-label="دخول">✦</button>',
            '<span class="splash-hint">اضغطي للدخول</span>',
          '</div>',
        '</div>',
        '<div class="splash-garden" id="splash-garden">',
          '<div class="garden-grass"></div>',
        '</div>',
      ].join('');
      document.body.appendChild(splashDiv);
    }

    // Loader
    if (!document.getElementById('loader-screen')) {
      var loaderDiv = document.createElement('div');
      loaderDiv.id = 'loader-screen';
      loaderDiv.innerHTML = [
        '<span class="loader-icon">🌸</span>',
        '<p class="loader-title">جاري التحميل</p>',
        '<div class="loader-bar-wrap"><div class="loader-bar-fill" id="loader-fill"></div></div>',
        '<p class="loader-percent" id="loader-pct">0%</p>',
      ].join('');
      document.body.appendChild(loaderDiv);
    }

    // App shell
    if (!document.getElementById('app')) {
      var appDiv = document.createElement('div');
      appDiv.id = 'app';
      appDiv.innerHTML = [
        '<div id="home-menu"></div>',
        '<button id="notif-fab" aria-label="الإشعارات">',
          '<span class="notif-fab-icon">🔔</span>',
          '<span id="notif-fab-badge">0</span>',
        '</button>',
        '<div id="notif-drawer" role="dialog" aria-label="الإشعارات">',
          '<div class="notif-drawer-header">',
            '<span class="notif-drawer-title">✦ الإشعارات</span>',
            '<button class="notif-clear-btn" id="notif-clear-btn">مسح الكل</button>',
          '</div>',
          '<div class="notif-list-inner" id="notif-list-inner"></div>',
        '</div>',
        '<div id="section-page" aria-hidden="true">',
          '<header class="sec-header">',
            '<button id="back-btn" aria-label="رجوع">&#8592;</button>',
            '<h2 class="sec-header-title" id="sec-header-title">القسم</h2>',
          '</header>',
          '<div id="section-content"></div>',
        '</div>',
      ].join('');
      document.body.appendChild(appDiv);
    }
  }

  /* ═══════════════════════════════════════════
     3. منطق النجوم
  ═══════════════════════════════════════════ */
  function initStars() {
    var c   = document.getElementById('stars-global');
    var ctx = c.getContext('2d');

    function draw() {
      c.width  = window.innerWidth;
      c.height = window.innerHeight;
      ctx.clearRect(0, 0, c.width, c.height);
      for (var i = 0; i < 220; i++) {
        var x   = Math.random() * c.width;
        var y   = Math.random() * c.height;
        var r   = Math.random() * 1.2 + .15;
        var a   = Math.random() * .5 + .08;
        var t   = Math.random();
        var hue = t < .15 ? '255,77,158' : t < .28 ? '192,132,252' : '255,255,255';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + hue + ',' + a + ')';
        ctx.fill();
      }
    }

    draw();
    window.addEventListener('resize', draw);
  }

  /* ═══════════════════════════════════════════
     4. حديقة الـ Splash
  ═══════════════════════════════════════════ */
  function initGarden() {
    var garden    = document.getElementById('splash-garden');
    var particles = document.getElementById('splash-particles');

    var flowers = [
      { left: '4%',  stemH: 65, delay: 0,   dur: 3.2, f: '🌸' },
      { left: '12%', stemH: 48, delay: .4,  dur: 2.8, f: '🌺' },
      { left: '21%', stemH: 80, delay: .2,  dur: 3.5, f: '🌷' },
      { left: '30%', stemH: 52, delay: .7,  dur: 2.6, f: '🌸' },
      { left: '39%', stemH: 72, delay: .1,  dur: 3.1, f: '💮' },
      { left: '49%', stemH: 62, delay: .5,  dur: 2.9, f: '🌸' },
      { left: '58%', stemH: 78, delay: .3,  dur: 3.4, f: '🌺' },
      { left: '67%', stemH: 50, delay: .6,  dur: 2.7, f: '🌷' },
      { left: '76%', stemH: 68, delay: .15, dur: 3.0, f: '🌸' },
      { left: '85%', stemH: 58, delay: .45, dur: 3.3, f: '💮' },
      { left: '93%', stemH: 46, delay: .25, dur: 2.8, f: '🌸' },
    ];

    flowers.forEach(function (f) {
      var el = document.createElement('div');
      el.className = 'flower';
      el.style.cssText = 'bottom:26px;left:' + f.left + ';animation-duration:' + f.dur + 's;animation-delay:' + f.delay + 's;';
      el.innerHTML = '<div class="flower-head" style="animation-delay:' + f.delay + 's">' + f.f + '</div>'
                   + '<div class="flower-stem" style="height:' + f.stemH + 'px"></div>';
      garden.appendChild(el);
    });

    var cols = ['#ff4d9e', '#fda4c8', '#c084fc', '#ffe0f0', '#fb7185', '#f9a8d4'];
    for (var i = 0; i < 40; i++) {
      var sp  = document.createElement('div');
      sp.className = 'sp';
      var sz  = (Math.random() * 4 + 2) + 'px';
      var col = cols[Math.floor(Math.random() * cols.length)];
      sp.style.cssText = 'width:' + sz + ';height:' + sz
        + ';left:' + (Math.random() * 100) + '%;bottom:' + (Math.random() * 30) + '%;'
        + 'background:' + col + ';box-shadow:0 0 6px ' + col + ';'
        + 'animation-duration:' + (Math.random() * 7 + 5) + 's;'
        + 'animation-delay:'    + (Math.random() * 8)     + 's;';
      particles.appendChild(sp);
    }
  }

  /* ═══════════════════════════════════════════
     5. Splash + Loader
  ═══════════════════════════════════════════ */
  function initSplash() {
    var splash     = document.getElementById('splash');
    var splashBtn  = document.getElementById('splash-btn');
    var loaderScr  = document.getElementById('loader-screen');
    var loaderFill = document.getElementById('loader-fill');
    var loaderPct  = document.getElementById('loader-pct');
    var app        = document.getElementById('app');
    var audio      = document.getElementById('bg-audio');

    splashBtn.addEventListener('click', function () {
      audio.volume = .42;
      audio.play().catch(function () {});
      splash.classList.add('hidden');
      loaderScr.classList.add('show');
      runLoader();
    });

    function runLoader() {
      var pct   = 0;
      var steps = [
        { target: 30,  speed: 22 },
        { target: 65,  speed: 34 },
        { target: 88,  speed: 18 },
        { target: 100, speed: 26 },
      ];
      var si = 0;

      function tick() {
        if (pct >= 100) {
          loaderFill.style.width = '100%';
          loaderPct.textContent  = '100%';
          setTimeout(showApp, 320);
          return;
        }
        if (pct >= steps[si].target && si < steps.length - 1) si++;
        pct = Math.min(pct + (Math.random() * .8 + .35), 100);
        loaderFill.style.width = pct + '%';
        loaderPct.textContent  = Math.floor(pct) + '%';
        setTimeout(tick, steps[si].speed);
      }

      tick();
    }

    function showApp() {
      loaderScr.classList.remove('show');
      loaderScr.classList.add('hide');
      app.classList.add('visible');
      buildHomeMenu();
      buildNotifFab();
    }
  }

  /* ═══════════════════════════════════════════
     6. القائمة الرئيسية
  ═══════════════════════════════════════════ */
  function buildHomeMenu() {
    var menu = document.getElementById('home-menu');

    var avatarHTML = HOME_AVATAR
      ? '<div class="home-avatar-ring"><img class="home-avatar" src="' + HOME_AVATAR
          + '" alt="جلخامجة الوردية" onerror="this.parentElement.innerHTML=\'<div class=home-avatar-ph>🌸</div>\'"></div>'
      : '<div class="home-avatar-ring"><div class="home-avatar-ph">🌸</div></div>';

    var cardsHTML = MENU_ITEMS.map(function (item) {
      return '<div class="menu-card"'
        + ' data-id="'     + item.id     + '"'
        + ' data-file="'   + item.file   + '"'
        + ' data-global="' + item.global + '"'
        + ' data-label="'  + item.label  + ' ' + item.icon + '">'
        + '<div class="menu-card-shine"></div>'
        + '<span class="menu-card-icon">'  + item.icon  + '</span>'
        + '<span class="menu-card-label">' + item.label + '</span>'
        + '</div>';
    }).join('');

    menu.innerHTML =
        '<div class="home-profile-wrap">'
      +   avatarHTML
      +   '<h1 class="home-name"><span class="home-name-gradient">🌸 جلخامجة الوردية 🌸</span></h1>'
      +   '<p class="home-subtitle">اختاري القسم الذي تريدينه</p>'
      + '</div>'
      + '<div class="menu-grid">' + cardsHTML + '</div>';

    menu.querySelectorAll('.menu-card').forEach(function (card) {
      card.addEventListener('click', function () {
        openSection(card.dataset.id, card.dataset.file, card.dataset.global, card.dataset.label, card);
      });
    });
  }

  /* ═══════════════════════════════════════════
     7. الإشعارات
  ═══════════════════════════════════════════ */
  function buildNotifFab() {
    var fab        = document.getElementById('notif-fab');
    var badge      = document.getElementById('notif-fab-badge');
    var drawer     = document.getElementById('notif-drawer');
    var listInner  = document.getElementById('notif-list-inner');
    var clearBtn   = document.getElementById('notif-clear-btn');
    var notifs     = NOTIFICATIONS.slice();
    var drawerOpen = false;

    function renderBadge() {
      var total = notifs.reduce(function (s, n) { return s + n.badge; }, 0);
      if (total > 0) { badge.textContent = total; badge.classList.add('show'); }
      else             { badge.classList.remove('show'); }
    }

    function renderList() {
      if (!notifs.length) {
        listInner.innerHTML = '<div class="notif-empty">🌸 لا توجد إشعارات</div>';
        return;
      }
      listInner.innerHTML = notifs.map(function (n, i) {
        return '<div class="notif-item" data-idx="' + i + '" data-section="' + n.section + '">'
          + '<span class="notif-dot-sm ' + n.dot + '"></span>'
          + '<div class="notif-item-body">'
          +   '<div class="notif-item-label">' + n.label + '</div>'
          +   '<div class="notif-item-msg">'   + n.msg   + '</div>'
          +   '<div class="notif-item-time">🕐 ' + n.time + '</div>'
          + '</div>'
          + '</div>';
      }).join('');
      listInner.querySelectorAll('.notif-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var sec = item.dataset.section;
          closeDrawer();
          var mi = MENU_ITEMS.find(function (m) { return m.id === sec; });
          if (mi) openSection(mi.id, mi.file, mi.global, mi.label + ' ' + mi.icon);
        });
      });
    }

    function openDrawer()  { drawerOpen = true;  renderList(); drawer.classList.add('open'); }
    function closeDrawer() { drawerOpen = false; drawer.classList.remove('open'); }

    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      drawerOpen ? closeDrawer() : openDrawer();
    });

    clearBtn.addEventListener('click', function () {
      notifs = [];
      renderBadge();
      renderList();
    });

    document.addEventListener('click', function (e) {
      if (drawerOpen && !drawer.contains(e.target) && e.target !== fab) closeDrawer();
    });

    renderBadge();
  }

  /* ═══════════════════════════════════════════
     8. فتح القسم / الرجوع
  ═══════════════════════════════════════════ */
  function pulseCard(card) {
    if (!card) return;
    card.style.transition = 'transform .12s ease';
    card.style.transform  = 'scale(1.06)';
    setTimeout(function () { card.style.transform = ''; }, 170);
  }

  function openSection(id, file, globalName, label, cardEl) {
    if (checkedFiles.get(file) === false) { pulseCard(cardEl); return; }
    if (checkedFiles.get(file) === true)  { _doOpen(id, file, globalName, label, cardEl); return; }

    fetch(file, { method: 'HEAD' })
      .then(function (res) {
        if (res.ok) { checkedFiles.set(file, true);  _doOpen(id, file, globalName, label, cardEl); }
        else        { checkedFiles.set(file, false); pulseCard(cardEl); }
      })
      .catch(function () { checkedFiles.set(file, false); pulseCard(cardEl); });
  }

  function _doOpen(id, file, globalName, label, cardEl) {
    var homeMenu    = document.getElementById('home-menu');
    var sectionPage = document.getElementById('section-page');
    var headerTitle = document.getElementById('sec-header-title');
    var secContent  = document.getElementById('section-content');
    var fab         = document.getElementById('notif-fab');

    homeMenu.classList.add('hide-out');
    fab.style.display       = 'none';
    headerTitle.textContent = label;
    secContent.innerHTML    = '';
    sectionPage.setAttribute('aria-hidden', 'false');

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { sectionPage.classList.add('slide-in'); });
    });

    if (!loadedScripts.has(file)) {
      var s = document.createElement('script');
      s.src = file;
      s.onload = function () { loadedScripts.add(file); };
      document.body.appendChild(s);
    }
  }

  function closeSection() {
    var homeMenu    = document.getElementById('home-menu');
    var sectionPage = document.getElementById('section-page');
    var fab         = document.getElementById('notif-fab');

    sectionPage.classList.remove('slide-in');
    sectionPage.setAttribute('aria-hidden', 'true');
    setTimeout(function () { homeMenu.classList.remove('hide-out'); fab.style.display = ''; }, 50);
  }

  /* ═══════════════════════════════════════════
     9. تشغيل كل شيء
  ═══════════════════════════════════════════ */
  function boot() {
    injectCSS();
    injectHTML();
    initStars();
    initGarden();
    initSplash();

    document.getElementById('back-btn').addEventListener('click', closeSection);

    window.addEventListener('popstate', function () {
      var sp = document.getElementById('section-page');
      if (sp.classList.contains('slide-in')) closeSection();
    });
  }

  // تشغيل بعد تحميل DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
