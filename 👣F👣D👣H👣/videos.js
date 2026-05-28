(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     قسم الفيديوهات — VIDEOS DATA
     عدّل روابط الفيديوهات والأوصاف والصور المصغرة هنا
  ═══════════════════════════════════════════════════════ */
  var VIDEOS = [
    {
      id:    1,
      title: 'فيديو ترحيبي من إمبراطورية الظلال',
      desc:  'رسالة ترحيبية حصرية لكل من انضم إلى عالمنا الملكي الأسطوري.',
      thumb: 'https://picsum.photos/seed/vid1/800/450',
      src:   'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id:    2,
      title: 'أبرز لحظات الفعاليات الخاصة',
      desc:  'تجميع لأجمل اللحظات التي جمعت أعضاء الإمبراطورية في فعاليات مميزة.',
      thumb: 'https://picsum.photos/seed/vid2/800/450',
      src:   'https://www.w3schools.com/html/movie.mp4',
    },
    {
      id:    3,
      title: 'إعلان حدث ملكي قادم',
      desc:  'نظرة حصرية على الحدث الأسطوري القادم الذي سيجمع كبار أعضاء الإمبراطورية.',
      thumb: 'https://picsum.photos/seed/vid3/800/450',
      src:   'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id:    4,
      title: 'جولة داخل أرشيف الإمبراطورية',
      desc:  'رحلة بصرية عبر أرشيف الإمبراطورية ومحتواها الحصري على مر السنين.',
      thumb: 'https://picsum.photos/seed/vid4/800/450',
      src:   'https://www.w3schools.com/html/movie.mp4',
    },
  ];

  /* ═══════════════ CSS ═══════════════ */
  var css = document.createElement('style');
  css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#vd-root *{box-sizing:border-box;margin:0;padding:0}

#vd-root{
  position:fixed;inset:0;z-index:500;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

/* ── نجوم ثابتة ── */
#vd-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.vd-star{position:absolute;border-radius:50%;background:#fff}

/* ── تدرج خلفية ── */
#vd-bg{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 35% at 50% 0%,rgba(180,0,30,.14) 0%,transparent 68%),
    radial-gradient(ellipse 45% 28% at 5% 95%,rgba(100,0,15,.09) 0%,transparent 60%);
}

/* ── محتوى رئيسي ── */
#vd-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  overflow-y:auto;overflow-x:hidden;
  padding:28px 16px 90px;
  scrollbar-width:thin;
  scrollbar-color:rgba(255,51,85,.3) transparent;
}
#vd-main::-webkit-scrollbar{width:4px}
#vd-main::-webkit-scrollbar-thumb{background:rgba(255,51,85,.3);border-radius:2px}

/* ── رأس ── */
#vd-header{text-align:center;margin-bottom:32px;animation:vdDown .7s ease both}

#vd-top-line{
  display:flex;align-items:center;justify-content:center;
  gap:12px;margin-bottom:8px;
  color:rgba(255,80,100,.38);
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:6px;
}
#vd-top-line span{
  flex:1;max-width:90px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.45),transparent);
}

#vd-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(20px,5vw,42px);font-weight:900;
  letter-spacing:clamp(2px,.8vw,8px);
  color:transparent;
  background:linear-gradient(135deg,#ff6680 0%,#ff0033 38%,#cc0022 68%,#ff4466 100%);
  -webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 24px rgba(255,0,40,.5));
  margin-bottom:6px;
}
#vd-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.6vw,14px);
  color:rgba(255,120,140,.4);letter-spacing:2px;
}
#vd-head-line{
  width:160px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.4),transparent);
}

/* ── قائمة الفيديوهات ── */
#vd-list{
  display:flex;flex-direction:column;
  width:min(720px,100%);
  margin:0 auto;
  animation:vdUp .8s ease .12s both;
}

/* ── بطاقة فيديو ── */
.vd-item{margin-bottom:30px}

/* وصف / عنوان */
.vd-desc-bar{
  padding:10px 16px;
  background:rgba(255,20,50,.06);
  border-right:3px solid rgba(255,51,85,.55);
}
.vd-desc-title{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(13px,2.2vw,16px);font-weight:700;
  color:rgba(255,200,210,.85);
  margin-bottom:4px;line-height:1.5;
}
.vd-desc-body{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.7vw,13px);
  color:rgba(200,140,155,.6);line-height:1.6;
}

/* فاصل وردي شفاف */
.vd-divider{
  height:3px;
  background:linear-gradient(90deg,transparent,rgba(255,130,160,.22),transparent);
}

/* مشغّل مصغّر (thumbnail) */
.vd-thumb-wrap{
  position:relative;
  border:1px solid rgba(255,51,85,.3);
  border-top:none;
  overflow:hidden;
  cursor:pointer;
  background:#0a0003;
  aspect-ratio:16/9;
}
.vd-thumb{
  width:100%;height:100%;
  object-fit:cover;
  display:block;
  opacity:.75;
  transition:opacity .25s,transform .3s;
}
.vd-thumb-wrap:hover .vd-thumb{opacity:.9;transform:scale(1.03)}

/* زر تشغيل مركزي */
.vd-play-btn{
  position:absolute;inset:0;
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.25);
  transition:background .2s;
}
.vd-thumb-wrap:hover .vd-play-btn{background:rgba(0,0,0,.38)}

.vd-play-circle{
  width:clamp(48px,10vw,66px);
  height:clamp(48px,10vw,66px);
  border-radius:50%;
  border:2px solid rgba(255,80,110,.75);
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.45);
  transition:border-color .2s,transform .2s;
}
.vd-thumb-wrap:hover .vd-play-circle{
  border-color:rgba(255,51,85,1);
  transform:scale(1.08);
}
.vd-play-icon{
  font-size:clamp(18px,4vw,26px);
  color:#ffb0c0;
  margin-left:3px; /* تعويض بصري لمثلث التشغيل */
}

/* رقم الفيديو */
.vd-num{
  position:absolute;top:8px;left:10px;
  font-family:'Cinzel',serif;font-size:9px;
  color:rgba(255,51,85,.3);letter-spacing:1px;
}

/* مدة وهمية */
.vd-duration{
  position:absolute;bottom:8px;left:10px;
  font-family:'Cinzel',serif;font-size:10px;
  color:rgba(255,180,190,.55);
  background:rgba(0,0,0,.55);
  padding:2px 7px;
  letter-spacing:1px;
}

/* ══════════════════════════════════════
   مشغّل ملء شاشة
══════════════════════════════════════ */
#vd-player{
  display:none;
  position:fixed;inset:0;z-index:700;
  background:#000;
  flex-direction:column;
  animation:vdPlayerIn .28s ease both;
}
#vd-player.active{display:flex}

/* شريط علوي */
#vd-player-top{
  flex-shrink:0;
  padding:12px 16px;
  display:flex;align-items:center;justify-content:space-between;
  gap:10px;
  border-bottom:1px solid rgba(255,51,85,.14);
  background:rgba(0,0,0,.6);
  backdrop-filter:blur(8px);
}
#vd-player-back{
  display:flex;align-items:center;gap:7px;
  background:rgba(255,51,85,.1);
  border:1px solid rgba(255,51,85,.3);
  color:#ff6680;font-family:'Noto Naskh Arabic',serif;font-size:13px;
  padding:8px 16px;cursor:pointer;
  transition:background .2s,border-color .2s;white-space:nowrap;
}
#vd-player-back:hover{background:rgba(255,51,85,.22);border-color:rgba(255,51,85,.7)}

#vd-player-title{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,2vw,15px);font-weight:700;
  color:rgba(255,200,210,.75);
  flex:1;text-align:center;line-height:1.4;
}

/* زر مشاركة */
#vd-share-wrap{position:relative}
#vd-share-btn{
  display:flex;align-items:center;gap:6px;
  background:rgba(255,51,85,.1);
  border:1px solid rgba(255,51,85,.3);
  color:#ff8899;font-family:'Noto Naskh Arabic',serif;font-size:12px;
  padding:8px 14px;cursor:pointer;
  transition:background .2s,border-color .2s;white-space:nowrap;
}
#vd-share-btn:hover{background:rgba(255,51,85,.22);border-color:rgba(255,51,85,.7)}

#vd-share-menu{
  display:none;
  position:absolute;top:calc(100% + 8px);left:0;
  background:#0d0007;
  border:1px solid rgba(255,51,85,.3);
  min-width:175px;z-index:20;
  flex-direction:column;
}
#vd-share-wrap.open #vd-share-menu{display:flex}

.vd-share-item{
  display:flex;align-items:center;gap:10px;
  padding:11px 16px;
  font-family:'Noto Naskh Arabic',serif;font-size:13px;
  color:rgba(255,180,190,.8);cursor:pointer;
  text-decoration:none;
  transition:background .15s;
  border:none;background:transparent;
  width:100%;text-align:right;direction:rtl;
}
.vd-share-item:hover{background:rgba(255,51,85,.12)}

/* منطقة الفيديو */
#vd-video-area{
  flex:1;
  display:flex;align-items:center;justify-content:center;
  background:#000;overflow:hidden;
  position:relative;
}
#vd-video{
  width:100%;height:100%;
  object-fit:contain;
  display:block;
  outline:none;
}

/* شريط سفلي للوصف */
#vd-player-desc{
  flex-shrink:0;
  padding:12px 20px;
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.7vw,14px);
  color:rgba(200,140,155,.6);
  line-height:1.65;
  text-align:center;
  border-top:1px solid rgba(255,51,85,.1);
  background:rgba(0,0,0,.5);
}

/* زر إغلاق قسم */
#vd-close{
  position:fixed;top:14px;left:16px;z-index:550;
  width:38px;height:38px;
  background:rgba(0,0,0,.85);
  border:1px solid rgba(255,51,85,.3);
  color:rgba(255,80,100,.7);font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#vd-close:hover{background:rgba(255,51,85,.16);border-color:rgba(255,51,85,.7);color:#fff}

/* Keyframes */
@keyframes vdDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes vdUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes vdPlayerIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
  `;
  document.head.appendChild(css);

  /* ═══════════════ HTML ═══════════════ */
  var html = `
<div id="vd-root">
  <div id="vd-stars"></div>
  <div id="vd-bg"></div>

  <button id="vd-close">✕</button>

  <!-- قائمة الفيديوهات -->
  <div id="vd-main">
    <div id="vd-header">
      <div id="vd-top-line"><span></span>▶ VIDEOS ◀<span></span></div>
      <div id="vd-title">قائمة فيديوهات</div>
      <div id="vd-subtitle">IMPERIAL MEDIA ARCHIVE</div>
      <div id="vd-head-line"></div>
    </div>
    <div id="vd-list"></div>
  </div>

  <!-- مشغّل ملء شاشة -->
  <div id="vd-player">
    <div id="vd-player-top">
      <button id="vd-player-back">← رجوع</button>
      <div id="vd-player-title"></div>
      <div id="vd-share-wrap">
        <button id="vd-share-btn">↗ مشاركة</button>
        <div id="vd-share-menu">
          <a class="vd-share-item" id="vd-share-wa" target="_blank" rel="noopener">💬 واتساب</a>
          <a class="vd-share-item" id="vd-share-tg" target="_blank" rel="noopener">✈️ تيليغرام</a>
          <a class="vd-share-item" id="vd-share-ms" target="_blank" rel="noopener">💙 ماسنجر</a>
        </div>
      </div>
    </div>

    <div id="vd-video-area">
      <video id="vd-video" controls playsinline></video>
    </div>

    <div id="vd-player-desc"></div>
  </div>
</div>
  `;
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  /* ═══════════════ نجوم ثابتة ═══════════════ */
  (function () {
    var wrap = document.getElementById('vd-stars');
    for (var i = 0; i < 140; i++) {
      var s  = document.createElement('div');
      s.className = 'vd-star';
      var sz = Math.random() * 1.8 + 0.3;
      s.style.cssText =
        'width:'  + sz + 'px;height:' + sz + 'px;' +
        'top:'    + (Math.random() * 100) + '%;' +
        'left:'   + (Math.random() * 100) + '%;' +
        'opacity:' + (Math.random() * 0.5 + 0.12).toFixed(2) + ';';
      wrap.appendChild(s);
    }
  })();

  /* ═══════════════ بناء البطاقات ═══════════════ */
  var list = document.getElementById('vd-list');

  VIDEOS.forEach(function (v) {
    var item = document.createElement('div');
    item.className = 'vd-item';
    item.innerHTML =
      '<div class="vd-desc-bar">' +
        '<div class="vd-desc-title">' + v.title + '</div>' +
        '<div class="vd-desc-body">'  + v.desc  + '</div>' +
      '</div>' +
      '<div class="vd-divider"></div>' +
      '<div class="vd-thumb-wrap">' +
        '<img class="vd-thumb" src="' + v.thumb + '" alt="' + v.title + '" loading="lazy"/>' +
        '<div class="vd-play-btn">' +
          '<div class="vd-play-circle">' +
            '<span class="vd-play-icon">▶</span>' +
          '</div>' +
        '</div>' +
        '<span class="vd-num">#' + String(v.id).padStart(2, '0') + '</span>' +
      '</div>';

    item.querySelector('.vd-thumb-wrap').addEventListener('click', function () {
      openPlayer(v);
    });
    list.appendChild(item);
  });

  /* ═══════════════ مشغّل ملء الشاشة ═══════════════ */
  var player    = document.getElementById('vd-player');
  var video     = document.getElementById('vd-video');
  var playerTtl = document.getElementById('vd-player-title');
  var playerDsc = document.getElementById('vd-player-desc');
  var shareWrap = document.getElementById('vd-share-wrap');
  var shareWa   = document.getElementById('vd-share-wa');
  var shareTg   = document.getElementById('vd-share-tg');
  var shareMs   = document.getElementById('vd-share-ms');

  function openPlayer(v) {
    video.pause();
    video.src        = v.src;
    playerTtl.textContent = v.title;
    playerDsc.textContent = v.desc;
    setShareLinks(v.src);
    player.classList.add('active');
    shareWrap.classList.remove('open');
    setTimeout(function () { video.play().catch(function(){}); }, 120);
  }

  function closePlayer() {
    video.pause();
    video.src = '';
    player.classList.remove('active');
  }

  function setShareLinks(url) {
    var enc = encodeURIComponent(url);
    shareWa.href = 'https://wa.me/?text=' + enc;
    shareTg.href = 'https://t.me/share/url?url=' + enc;
    shareMs.href = 'https://www.facebook.com/dialog/send?link=' + enc +
                   '&app_id=291494419107518&redirect_uri=' + enc;
  }

  document.getElementById('vd-player-back').addEventListener('click', closePlayer);

  document.getElementById('vd-share-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    shareWrap.classList.toggle('open');
  });
  document.addEventListener('click', function () {
    shareWrap.classList.remove('open');
  });

  /* ═══════════════ زر إغلاق القسم ═══════════════ */
  document.getElementById('vd-close').addEventListener('click', function () {
    closePlayer();
    var root = document.getElementById('vd-root');
    if (root) {
      root.style.transition = 'opacity .4s';
      root.style.opacity    = '0';
      setTimeout(function () { root.remove(); }, 420);
    }
  });

})();
