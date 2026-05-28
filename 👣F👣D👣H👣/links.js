(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     قسم الروابط — LINKS DATA
     عدّل الصورة والوصف والرابط الخارجي هنا
  ══════════════════════════════════════════════════════ */
  var LINKS = [
    {
      id:    1,
      desc:  'قناتنا الرسمية على يوتيوب — اشترك الآن',
      img:   'https://picsum.photos/seed/lnk1/800/400',
      href:  'https://youtube.com',
      label: 'يوتيوب',
    },
    {
      id:    2,
      desc:  'تابعنا على تيليغرام للحصول على آخر الأخبار',
      img:   'https://picsum.photos/seed/lnk2/800/400',
      href:  'https://telegram.org',
      label: 'تيليغرام',
    },
    {
      id:    3,
      desc:  'انضم إلى مجموعة الواتساب الخاصة بالأعضاء',
      img:   'https://picsum.photos/seed/lnk3/800/400',
      href:  'https://whatsapp.com',
      label: 'واتساب',
    },
    {
      id:    4,
      desc:  'صفحتنا الرسمية على انستقرام',
      img:   'https://picsum.photos/seed/lnk4/800/400',
      href:  'https://instagram.com',
      label: 'انستقرام',
    },
    {
      id:    5,
      desc:  'موقعنا الرسمي — استكشف كل ما لدينا',
      img:   'https://picsum.photos/seed/lnk5/800/400',
      href:  'https://example.com',
      label: 'الموقع الرسمي',
    },
  ];

  /* ═══════════════ CSS ═══════════════ */
  var css = document.createElement('style');
  css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#lk-root *{box-sizing:border-box;margin:0;padding:0}

#lk-root{
  position:fixed;inset:0;z-index:500;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

/* نجوم ثابتة */
#lk-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.lk-star{position:absolute;border-radius:50%;background:#fff}

/* تدرج */
#lk-bg{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(ellipse 65% 32% at 50% 0%,rgba(180,0,30,.13) 0%,transparent 65%),
    radial-gradient(ellipse 40% 24% at 100% 100%,rgba(120,0,20,.08) 0%,transparent 58%);
}

/* محتوى رئيسي */
#lk-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  overflow-y:auto;overflow-x:hidden;
  padding:28px 16px 90px;
  scrollbar-width:thin;
  scrollbar-color:rgba(255,51,85,.3) transparent;
}
#lk-main::-webkit-scrollbar{width:4px}
#lk-main::-webkit-scrollbar-thumb{background:rgba(255,51,85,.3);border-radius:2px}

/* رأس */
#lk-header{text-align:center;margin-bottom:32px;animation:lkDown .7s ease both}
#lk-top-line{
  display:flex;align-items:center;justify-content:center;
  gap:12px;margin-bottom:8px;
  color:rgba(255,80,100,.38);
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:6px;
}
#lk-top-line span{
  flex:1;max-width:90px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.45),transparent);
}
#lk-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(20px,5vw,40px);font-weight:900;
  letter-spacing:clamp(3px,.9vw,9px);
  color:transparent;
  background:linear-gradient(135deg,#ff6680 0%,#ff0033 40%,#cc0022 68%,#ff4466 100%);
  -webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 22px rgba(255,0,40,.48));
  margin-bottom:6px;
}
#lk-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.6vw,14px);
  color:rgba(255,120,140,.38);letter-spacing:2px;
}
#lk-head-line{
  width:160px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.4),transparent);
}

/* قائمة الروابط */
#lk-list{
  display:flex;flex-direction:column;gap:0;
  width:min(700px,100%);margin:0 auto;
  animation:lkUp .8s ease .12s both;
}

/* عنصر رابط */
.lk-item{margin-bottom:28px}

/* وصف */
.lk-desc{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,2vw,15px);font-weight:700;
  color:rgba(255,200,210,.82);
  padding:10px 14px;
  background:rgba(255,20,50,.05);
  border-right:3px solid rgba(255,51,85,.5);
  line-height:1.6;
}

/* فاصل وردي شفاف */
.lk-divider{
  height:3px;
  background:linear-gradient(90deg,transparent,rgba(255,130,160,.25),transparent);
}

/* الصورة / الزر */
.lk-img-wrap{
  position:relative;
  border:1px solid rgba(255,51,85,.32);
  border-top:none;
  overflow:hidden;
  display:block;
  text-decoration:none;
  background:#0a0003;
  cursor:pointer;
}
.lk-img{
  width:100%;display:block;
  aspect-ratio:16/7;object-fit:cover;
  opacity:.7;
  transition:opacity .25s,transform .3s;
}
.lk-img-wrap:hover .lk-img{opacity:.88;transform:scale(1.025)}

/* طبقة تراكب */
.lk-overlay{
  position:absolute;inset:0;
  display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  gap:10px;
  background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,rgba(0,0,0,.55) 100%);
  transition:background .25s;
}
.lk-img-wrap:hover .lk-overlay{
  background:linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,.68) 100%);
}

/* اسم المنصة */
.lk-label{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(15px,3vw,22px);font-weight:700;
  color:#fff;
  text-shadow:0 2px 12px rgba(0,0,0,.8);
  letter-spacing:2px;
}

/* زر الانتقال */
.lk-btn{
  display:flex;align-items:center;gap:8px;
  background:rgba(255,51,85,.18);
  border:1px solid rgba(255,51,85,.5);
  color:#ffb0be;
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.8vw,13px);
  padding:8px 20px;
  transition:background .2s,border-color .2s,transform .2s;
}
.lk-img-wrap:hover .lk-btn{
  background:rgba(255,51,85,.35);
  border-color:rgba(255,51,85,.85);
  color:#fff;
  transform:scale(1.04);
}

/* رقم */
.lk-num{
  position:absolute;top:8px;left:10px;
  font-family:'Cinzel',serif;font-size:9px;
  color:rgba(255,51,85,.28);letter-spacing:1px;
}

/* زر إغلاق */
#lk-close{
  position:fixed;top:14px;left:16px;z-index:550;
  width:38px;height:38px;
  background:rgba(0,0,0,.85);
  border:1px solid rgba(255,51,85,.3);
  color:rgba(255,80,100,.7);font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#lk-close:hover{background:rgba(255,51,85,.16);border-color:rgba(255,51,85,.7);color:#fff}

/* Keyframes */
@keyframes lkDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes lkUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  `;
  document.head.appendChild(css);

  /* ═══════════════ HTML ═══════════════ */
  var html = `
<div id="lk-root">
  <div id="lk-stars"></div>
  <div id="lk-bg"></div>

  <button id="lk-close">✕</button>

  <div id="lk-main">
    <div id="lk-header">
      <div id="lk-top-line"><span></span>⬡ LINKS ⬡<span></span></div>
      <div id="lk-title">الروابط</div>
      <div id="lk-subtitle">IMPERIAL GATEWAYS</div>
      <div id="lk-head-line"></div>
    </div>
    <div id="lk-list"></div>
  </div>
</div>
  `;
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  /* ═══════════════ نجوم ثابتة ═══════════════ */
  (function () {
    var wrap = document.getElementById('lk-stars');
    for (var i = 0; i < 135; i++) {
      var s  = document.createElement('div');
      s.className = 'lk-star';
      var sz = Math.random() * 1.8 + 0.3;
      s.style.cssText =
        'width:'  + sz + 'px;height:' + sz + 'px;' +
        'top:'    + (Math.random() * 100) + '%;' +
        'left:'   + (Math.random() * 100) + '%;' +
        'opacity:' + (Math.random() * 0.5 + 0.1).toFixed(2) + ';';
      wrap.appendChild(s);
    }
  })();

  /* ═══════════════ بناء الروابط ═══════════════ */
  var list = document.getElementById('lk-list');

  LINKS.forEach(function (lnk) {
    var item = document.createElement('div');
    item.className = 'lk-item';
    item.innerHTML =
      '<div class="lk-desc">' + lnk.desc + '</div>' +
      '<div class="lk-divider"></div>' +
      '<a class="lk-img-wrap" href="' + lnk.href + '" target="_blank" rel="noopener">' +
        '<img class="lk-img" src="' + lnk.img + '" alt="' + lnk.label + '" loading="lazy"/>' +
        '<div class="lk-overlay">' +
          '<span class="lk-label">' + lnk.label + '</span>' +
          '<span class="lk-btn">اضغط للانتقال ←</span>' +
        '</div>' +
        '<span class="lk-num">#' + String(lnk.id).padStart(2, '0') + '</span>' +
      '</a>';
    list.appendChild(item);
  });

  /* ═══════════════ زر إغلاق ═══════════════ */
  document.getElementById('lk-close').addEventListener('click', function () {
    var root = document.getElementById('lk-root');
    if (root) {
      root.style.transition = 'opacity .4s';
      root.style.opacity    = '0';
      setTimeout(function () { root.remove(); }, 420);
    }
  });

})();
