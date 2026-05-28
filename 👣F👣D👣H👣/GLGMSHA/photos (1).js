(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     قسم الصور — PHOTOS DATA
     عدّل روابط الصور والأوصاف هنا
  ═══════════════════════════════════════════════════════ */
  var PHOTOS = [
    {
      id: 1,
      desc: 'لحظات ملكية من داخل الإمبراطورية',
      src:  'https://picsum.photos/seed/royal1/800/500',
    },
    {
      id: 2,
      desc: 'أعضاء إمبراطورية الظلال في لقاء استثنائي',
      src:  'https://picsum.photos/seed/royal2/800/500',
    },
    {
      id: 3,
      desc: 'أجمل لحظات الفعاليات الخاصة',
      src:  'https://picsum.photos/seed/royal3/800/500',
    },
    {
      id: 4,
      desc: 'صور حصرية من الأرشيف الملكي',
      src:  'https://picsum.photos/seed/royal4/800/500',
    },
    {
      id: 5,
      desc: 'لقطات ذهبية لا تُنسى',
      src:  'https://picsum.photos/seed/royal5/800/500',
    },
  ];

  /* ═══════════════ CSS ═══════════════ */
  var css = document.createElement('style');
  css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#ph-root *{box-sizing:border-box;margin:0;padding:0}

#ph-root{
  position:fixed;inset:0;z-index:500;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

/* نجوم ثابتة */
#ph-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.ph-star{position:absolute;border-radius:50%;background:#fff}

/* تدرج */
#ph-bg{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 35% at 50% 0%,rgba(180,0,30,.15) 0%,transparent 70%),
    radial-gradient(ellipse 40% 25% at 100% 100%,rgba(100,0,15,.1) 0%,transparent 60%);
}

/* محتوى رئيسي */
#ph-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  overflow-y:auto;overflow-x:hidden;
  padding:28px 16px 80px;
  scrollbar-width:thin;
  scrollbar-color:rgba(255,51,85,.3) transparent;
}
#ph-main::-webkit-scrollbar{width:4px}
#ph-main::-webkit-scrollbar-thumb{background:rgba(255,51,85,.3);border-radius:2px}

/* رأس */
#ph-header{text-align:center;margin-bottom:30px;animation:phDown .7s ease both}
#ph-top-line{
  display:flex;align-items:center;justify-content:center;
  gap:12px;margin-bottom:8px;
  color:rgba(255,80,100,.4);
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:6px;
}
#ph-top-line span{flex:1;max-width:90px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.45),transparent)}
#ph-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(20px,5vw,40px);font-weight:900;
  letter-spacing:clamp(3px,1vw,10px);
  color:transparent;
  background:linear-gradient(135deg,#ff6680 0%,#ff0033 40%,#cc0022 70%,#ff4466 100%);
  -webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 22px rgba(255,0,40,.5));
  margin-bottom:6px;
}
#ph-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.6vw,14px);
  color:rgba(255,120,140,.4);letter-spacing:2px;
}
#ph-head-line{width:160px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.4),transparent)}

/* قائمة الصور */
#ph-list{
  display:flex;flex-direction:column;gap:0;
  width:min(700px,100%);margin:0 auto;
  animation:phUp .8s ease .12s both;
}

/* عنصر صورة */
.ph-item{margin-bottom:28px}

/* وصف */
.ph-desc{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,2vw,15px);font-weight:700;
  color:rgba(255,200,210,.8);
  padding:10px 14px;
  background:rgba(255,20,50,.06);
  border-right:3px solid rgba(255,51,85,.5);
  line-height:1.6;
}

/* فاصل وردي شفاف */
.ph-divider{
  height:3px;
  background:linear-gradient(90deg,transparent,rgba(255,130,160,.25),transparent);
}

/* صورة */
.ph-img-wrap{
  position:relative;
  border:1px solid rgba(255,51,85,.35);
  border-top:none;
  overflow:hidden;
  cursor:pointer;
  background:#0a0005;
}
.ph-img-wrap:hover .ph-hover-layer{opacity:1}
.ph-img{
  width:100%;display:block;
  aspect-ratio:16/9;object-fit:cover;
  opacity:.85;
  transition:opacity .25s,transform .3s;
}
.ph-img-wrap:hover .ph-img{opacity:1;transform:scale(1.025)}

/* طبقة hover */
.ph-hover-layer{
  position:absolute;inset:0;
  background:rgba(0,0,0,.35);
  display:flex;align-items:center;justify-content:center;
  opacity:0;transition:opacity .25s;
}
.ph-hover-icon{
  width:52px;height:52px;
  border:2px solid rgba(255,100,130,.7);
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:22px;color:#ffb0c0;
}

/* رقم */
.ph-num{
  position:absolute;top:8px;left:10px;
  font-family:'Cinzel',serif;font-size:9px;
  color:rgba(255,51,85,.35);letter-spacing:1px;
}

/* ══ لايت بوكس ══ */
#ph-lb{
  display:none;
  position:fixed;inset:0;z-index:700;
  background:rgba(0,0,0,.97);
  flex-direction:column;
  animation:phLbIn .3s ease both;
}
#ph-lb.active{display:flex}

#ph-lb-top{
  flex-shrink:0;
  padding:14px 18px;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid rgba(255,51,85,.15);
}
#ph-lb-back{
  display:flex;align-items:center;gap:7px;
  background:rgba(255,51,85,.1);
  border:1px solid rgba(255,51,85,.3);
  color:#ff6680;font-family:'Noto Naskh Arabic',serif;font-size:13px;
  padding:8px 16px;cursor:pointer;
  transition:background .2s,border-color .2s;
}
#ph-lb-back:hover{background:rgba(255,51,85,.22);border-color:rgba(255,51,85,.7)}

#ph-lb-actions{display:flex;gap:10px;align-items:center}

.ph-lb-btn{
  display:flex;align-items:center;gap:6px;
  font-family:'Noto Naskh Arabic',serif;font-size:12px;
  padding:8px 14px;cursor:pointer;
  border-radius:1px;transition:all .2s;
  text-decoration:none;
}
#ph-lb-dl{
  background:rgba(255,51,85,.12);
  border:1px solid rgba(255,51,85,.3);
  color:#ff8899;
}
#ph-lb-dl:hover{background:rgba(255,51,85,.25);border-color:rgba(255,51,85,.7)}

#ph-lb-share-btn{
  background:rgba(255,51,85,.12);
  border:1px solid rgba(255,51,85,.3);
  color:#ff8899;position:relative;
}
#ph-lb-share-btn:hover{background:rgba(255,51,85,.25);border-color:rgba(255,51,85,.7)}

/* قائمة مشاركة */
#ph-share-menu{
  display:none;
  position:absolute;top:calc(100% + 8px);left:0;
  background:#0d0007;
  border:1px solid rgba(255,51,85,.3);
  min-width:170px;z-index:10;
  flex-direction:column;
}
#ph-lb-share-btn.open #ph-share-menu{display:flex}
.ph-share-item{
  display:flex;align-items:center;gap:10px;
  padding:11px 16px;
  font-family:'Noto Naskh Arabic',serif;font-size:13px;
  color:rgba(255,180,190,.8);cursor:pointer;
  text-decoration:none;
  transition:background .15s;border:none;background:transparent;
  width:100%;text-align:right;direction:rtl;
}
.ph-share-item:hover{background:rgba(255,51,85,.1)}

#ph-lb-img-wrap{
  flex:1;overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  padding:12px;
}
#ph-lb-img{max-width:100%;max-height:100%;object-fit:contain;display:block}

#ph-lb-desc{
  flex-shrink:0;padding:14px 20px;
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,1.8vw,15px);
  color:rgba(220,160,175,.7);line-height:1.7;
  border-top:1px solid rgba(255,51,85,.12);
  text-align:center;
}

/* زر إغلاق */
#ph-close{
  position:fixed;top:14px;left:16px;z-index:550;
  width:38px;height:38px;
  background:rgba(0,0,0,.85);
  border:1px solid rgba(255,51,85,.3);
  color:rgba(255,80,100,.7);font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#ph-close:hover{background:rgba(255,51,85,.15);border-color:rgba(255,51,85,.7);color:#fff}

/* Keyframes */
@keyframes phDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes phUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes phLbIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
  `;
  document.head.appendChild(css);

  /* ═══════════════ HTML ═══════════════ */
  var html = `
<div id="ph-root">
  <div id="ph-stars"></div>
  <div id="ph-bg"></div>

  <button id="ph-close">✕</button>

  <div id="ph-main">
    <div id="ph-header">
      <div id="ph-top-line"><span></span>◈ PHOTOS ◈<span></span></div>
      <div id="ph-title">قسم الصور</div>
      <div id="ph-subtitle">IMPERIAL GALLERY</div>
      <div id="ph-head-line"></div>
    </div>
    <div id="ph-list"></div>
  </div>

  <!-- لايت بوكس -->
  <div id="ph-lb">
    <div id="ph-lb-top">
      <button id="ph-lb-back">← رجوع</button>
      <div id="ph-lb-actions">
        <a id="ph-lb-dl" class="ph-lb-btn" download>⬇ تحميل</a>
        <div id="ph-lb-share-btn" class="ph-lb-btn">
          ↗ مشاركة
          <div id="ph-share-menu">
            <a class="ph-share-item" id="ph-share-wa"  target="_blank" rel="noopener">💬 واتساب</a>
            <a class="ph-share-item" id="ph-share-tg"  target="_blank" rel="noopener">✈️ تيليغرام</a>
            <a class="ph-share-item" id="ph-share-ms"  target="_blank" rel="noopener">💙 ماسنجر</a>
          </div>
        </div>
      </div>
    </div>
    <div id="ph-lb-img-wrap">
      <img id="ph-lb-img" src="" alt=""/>
    </div>
    <div id="ph-lb-desc"></div>
  </div>
</div>
  `;
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  /* ═══════════════ نجوم ثابتة ═══════════════ */
  (function () {
    var wrap = document.getElementById('ph-stars');
    for (var i = 0; i < 140; i++) {
      var s   = document.createElement('div');
      s.className = 'ph-star';
      var sz  = Math.random() * 1.8 + 0.3;
      s.style.cssText =
        'width:' + sz + 'px;height:' + sz + 'px;' +
        'top:'  + (Math.random() * 100) + '%;' +
        'left:' + (Math.random() * 100) + '%;' +
        'opacity:' + (Math.random() * 0.55 + 0.12).toFixed(2) + ';';
      wrap.appendChild(s);
    }
  })();

  /* ═══════════════ بناء الصور ═══════════════ */
  var list = document.getElementById('ph-list');

  PHOTOS.forEach(function (p) {
    var item = document.createElement('div');
    item.className = 'ph-item';
    item.innerHTML =
      '<div class="ph-desc">' + p.desc + '</div>' +
      '<div class="ph-divider"></div>' +
      '<div class="ph-img-wrap">' +
        '<span class="ph-num">#' + String(p.id).padStart(2, '0') + '</span>' +
        '<img class="ph-img" src="' + p.src + '" alt="' + p.desc + '" loading="lazy"/>' +
        '<div class="ph-hover-layer"><div class="ph-hover-icon">🔍</div></div>' +
      '</div>';
    item.querySelector('.ph-img-wrap').addEventListener('click', function () {
      openLb(p);
    });
    list.appendChild(item);
  });

  /* ═══════════════ لايت بوكس ═══════════════ */
  var lb     = document.getElementById('ph-lb');
  var lbImg  = document.getElementById('ph-lb-img');
  var lbDesc = document.getElementById('ph-lb-desc');
  var lbDl   = document.getElementById('ph-lb-dl');
  var shareBtn = document.getElementById('ph-lb-share-btn');
  var shareWa  = document.getElementById('ph-share-wa');
  var shareTg  = document.getElementById('ph-share-tg');
  var shareMs  = document.getElementById('ph-share-ms');

  var currentSrc = '';

  function openLb(p) {
    currentSrc    = p.src;
    lbImg.src     = p.src;
    lbImg.alt     = p.desc;
    lbDesc.textContent = p.desc;
    lbDl.href     = p.src;
    lbDl.setAttribute('download', 'photo-' + p.id + '.jpg');
    setShareLinks(p.src);
    lb.classList.add('active');
    shareBtn.classList.remove('open');
  }

  function setShareLinks(url) {
    var enc = encodeURIComponent(url);
    shareWa.href = 'https://wa.me/?text=' + enc;
    shareTg.href = 'https://t.me/share/url?url=' + enc;
    shareMs.href = 'https://www.facebook.com/dialog/send?link=' + enc + '&app_id=291494419107518&redirect_uri=' + enc;
  }

  document.getElementById('ph-lb-back').addEventListener('click', function () {
    lb.classList.remove('active');
  });

  shareBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    shareBtn.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    shareBtn.classList.remove('open');
  });

  /* ═══════════════ زر الإغلاق ═══════════════ */
  document.getElementById('ph-close').addEventListener('click', function () {
    var root = document.getElementById('ph-root');
    if (root) {
      root.style.transition = 'opacity .4s';
      root.style.opacity    = '0';
      setTimeout(function () { root.remove(); }, 420);
    }
  });

})();
