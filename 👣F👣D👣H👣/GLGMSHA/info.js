(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     قسم المعلومات — INFO DATA
     عدّل الوصف والصورة هنا
  ══════════════════════════════════════════════════════ */
  var INFO = [
    {
      id:    1,
      desc:  'جلجامشة الوردية — مؤسسة إمبراطورية الظلال وصاحبة الرؤية الأسطورية التي جمعت هذا العالم.',
      img:   'https://picsum.photos/seed/inf1/800/500',
    },
    {
      id:    2,
      desc:  'الإمبراطورية تأسست على مبادئ الولاء والقوة والإبداع — ثلاثة أركان لا تتزعزع.',
      img:   'https://picsum.photos/seed/inf2/800/500',
    },
    {
      id:    3,
      desc:  'عدد الأعضاء الحاليين: ٢٥ عضواً مميزاً من مختلف الأماكن، متحدون تحت راية واحدة.',
      img:   'https://picsum.photos/seed/inf3/800/500',
    },
    {
      id:    4,
      desc:  'يصدر المحتوى بانتظام عبر قنوات رسمية متعددة — تابع لتكون أول من يعلم.',
      img:   'https://picsum.photos/seed/inf4/800/500',
    },
    {
      id:    5,
      desc:  'للتواصل والاستفسار توجّه إلى قسم الروابط حيث تجد جميع وسائل التواصل الرسمية.',
      img:   'https://picsum.photos/seed/inf5/800/500',
    },
  ];

  /* ═══════════════ CSS ═══════════════ */
  var css = document.createElement('style');
  css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#inf-root *{box-sizing:border-box;margin:0;padding:0}

#inf-root{
  position:fixed;inset:0;z-index:500;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

/* نجوم ثابتة */
#inf-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.inf-star{position:absolute;border-radius:50%;background:#fff}

/* تدرج */
#inf-bg{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(ellipse 65% 32% at 50% 0%,rgba(160,0,220,.1) 0%,transparent 65%),
    radial-gradient(ellipse 40% 24% at 0% 100%,rgba(100,0,160,.07) 0%,transparent 58%);
}

/* محتوى رئيسي */
#inf-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  overflow-y:auto;overflow-x:hidden;
  padding:28px 16px 90px;
  scrollbar-width:thin;
  scrollbar-color:rgba(200,100,255,.3) transparent;
}
#inf-main::-webkit-scrollbar{width:4px}
#inf-main::-webkit-scrollbar-thumb{background:rgba(200,100,255,.28);border-radius:2px}

/* رأس */
#inf-header{text-align:center;margin-bottom:32px;animation:infDown .7s ease both}
#inf-top-line{
  display:flex;align-items:center;justify-content:center;
  gap:12px;margin-bottom:8px;
  color:rgba(200,120,255,.38);
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:6px;
}
#inf-top-line span{
  flex:1;max-width:90px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(200,100,255,.45),transparent);
}
#inf-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(20px,5vw,40px);font-weight:900;
  letter-spacing:clamp(3px,.9vw,9px);
  color:transparent;
  background:linear-gradient(135deg,#e0a0ff 0%,#aa00ff 40%,#7700cc 68%,#cc66ff 100%);
  -webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 22px rgba(170,0,255,.45));
  margin-bottom:6px;
}
#inf-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.6vw,14px);
  color:rgba(200,120,255,.38);letter-spacing:2px;
}
#inf-head-line{
  width:160px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(180,80,255,.4),transparent);
}

/* قائمة المعلومات */
#inf-list{
  display:flex;flex-direction:column;
  width:min(700px,100%);margin:0 auto;
  animation:infUp .8s ease .12s both;
}

/* عنصر معلومة */
.inf-item{margin-bottom:30px}

/* وصف فوق الصورة */
.inf-desc{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,2vw,15px);font-weight:700;
  color:rgba(230,180,255,.85);
  padding:11px 16px;
  background:rgba(150,0,255,.05);
  border-right:3px solid rgba(180,80,255,.55);
  line-height:1.65;
}

/* فاصل وردي شفاف */
.inf-divider{
  height:3px;
  background:linear-gradient(90deg,transparent,rgba(220,140,255,.22),transparent);
}

/* الصورة */
.inf-img-wrap{
  position:relative;
  border:1px solid rgba(180,80,255,.28);
  border-top:none;
  overflow:hidden;
  background:#08000f;
}
.inf-img{
  width:100%;display:block;
  aspect-ratio:16/9;object-fit:cover;
  opacity:.78;
  transition:opacity .25s,transform .3s;
}
.inf-img-wrap:hover .inf-img{opacity:.92;transform:scale(1.02)}

/* خط تحتي لوني */
.inf-img-wrap::after{
  content:'';
  position:absolute;bottom:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,transparent,rgba(180,80,255,.4),transparent);
  pointer-events:none;
}

/* رقم */
.inf-num{
  position:absolute;top:8px;left:10px;
  font-family:'Cinzel',serif;font-size:9px;
  color:rgba(180,80,255,.28);letter-spacing:1px;
}

/* زر إغلاق */
#inf-close{
  position:fixed;top:14px;left:16px;z-index:550;
  width:38px;height:38px;
  background:rgba(0,0,0,.85);
  border:1px solid rgba(180,80,255,.3);
  color:rgba(200,100,255,.7);font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#inf-close:hover{background:rgba(180,80,255,.16);border-color:rgba(180,80,255,.7);color:#fff}

/* Keyframes */
@keyframes infDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes infUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  `;
  document.head.appendChild(css);

  /* ═══════════════ HTML ═══════════════ */
  var html = `
<div id="inf-root">
  <div id="inf-stars"></div>
  <div id="inf-bg"></div>

  <button id="inf-close">✕</button>

  <div id="inf-main">
    <div id="inf-header">
      <div id="inf-top-line"><span></span>✦ INFO ✦<span></span></div>
      <div id="inf-title">المعلومات</div>
      <div id="inf-subtitle">IMPERIAL KNOWLEDGE</div>
      <div id="inf-head-line"></div>
    </div>
    <div id="inf-list"></div>
  </div>
</div>
  `;
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  /* ═══════════════ نجوم ثابتة ═══════════════ */
  (function () {
    var wrap = document.getElementById('inf-stars');
    for (var i = 0; i < 135; i++) {
      var s  = document.createElement('div');
      s.className = 'inf-star';
      var sz = Math.random() * 1.8 + 0.3;
      s.style.cssText =
        'width:'  + sz + 'px;height:' + sz + 'px;' +
        'top:'    + (Math.random() * 100) + '%;' +
        'left:'   + (Math.random() * 100) + '%;' +
        'opacity:' + (Math.random() * 0.5 + 0.1).toFixed(2) + ';';
      wrap.appendChild(s);
    }
  })();

  /* ═══════════════ بناء العناصر ═══════════════ */
  var list = document.getElementById('inf-list');

  INFO.forEach(function (item) {
    var el = document.createElement('div');
    el.className = 'inf-item';
    el.innerHTML =
      '<div class="inf-desc">' + item.desc + '</div>' +
      '<div class="inf-divider"></div>' +
      '<div class="inf-img-wrap">' +
        '<img class="inf-img" src="' + item.img + '" alt="معلومة ' + item.id + '" loading="lazy"/>' +
        '<span class="inf-num">#' + String(item.id).padStart(2, '0') + '</span>' +
      '</div>';
    list.appendChild(el);
  });

  /* ═══════════════ زر إغلاق ═══════════════ */
  document.getElementById('inf-close').addEventListener('click', function () {
    var root = document.getElementById('inf-root');
    if (root) {
      root.style.transition = 'opacity .4s';
      root.style.opacity    = '0';
      setTimeout(function () { root.remove(); }, 420);
    }
  });

})();
