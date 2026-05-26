(function(){
'use strict';

var css = document.createElement('style');
css.textContent = `
:root{
  --gold:#c9a84c;--gold2:#f5e090;
  --red:#ff0000;--red2:#8b0000;
}

#luxury-loader{
  position:fixed;inset:0;z-index:200;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:radial-gradient(ellipse 80% 80% at 50% 50%,#1a003a,#0a0018,#000);
}

#ll-logo{
  position:relative;z-index:2;
  display:flex;flex-direction:column;align-items:center;
  margin-bottom:30px;
}
#ll-emblem{
  font-size:60px;
  margin-bottom:14px;
  user-select:none;
}
#ll-title{
  font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:34px;
  color:var(--gold2);
  text-align:center;
  text-shadow:0 0 30px rgba(201,168,76,1);
}
#ll-subtitle{
  font-size:11px;
  color:rgba(201,168,76,0.4);
}

#ll-deco-line{
  display:flex;align-items:center;gap:14px;
  margin-bottom:40px;
}
.ll-deco-bar{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent);}
.ll-deco-gem{color:rgba(201,168,76,0.7);font-size:14px;}

#ll-bar-wrap{
  position:relative;
  margin-bottom:14px;
}
#ll-bar-outer{
  width:100%;height:6px;
  background:rgba(201,168,76,0.07);
  border-radius:4px;
}
#ll-bar-fill{
  height:100%;width:0%;
  background:linear-gradient(90deg,#5a3200,var(--gold),var(--gold2),var(--gold),#5a3200);
}
#ll-percent-row{
  display:flex;align-items:center;justify-content:space-between;
}
#ll-percent{
  font-family:'Cinzel',serif;
  font-size:32px;
  color:var(--gold2);
  font-weight:700;
}
#ll-msg{
  font-size:12px;
  color:rgba(201,168,76,0.5);
  text-align:right;
}

#ll-dots{
  display:flex;gap:8px;
}
.ll-dot{
  width:5px;height:5px;border-radius:50%;
  background:rgba(201,168,76,0.25);
}

#screen2{position:fixed;inset:0;z-index:10;display:none;opacity:0}
#screen2.show{display:block}
#screen2.fade-out{opacity:0;pointer-events:none;transition:opacity 1s}
#s2-title{
  position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);
  font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:24px; font-weight:700;
  color:#ff6666; text-shadow:0 0 20px rgba(255,0,0,1);
  white-space:nowrap;}
`;

document.head.appendChild(css);

var html = `
<div id="luxury-loader">
  <div id="ll-logo">
    <div id="ll-emblem">⚜️</div>
    <div id="ll-title">بوابة الظلام</div>
    <div id="ll-subtitle">GATE OF SHADOWS · LOADING</div>
  </div>
  <div id="ll-deco-line">
    <div class="ll-deco-bar"></div>
    <div class="ll-deco-gem">✦ ⬧ ✦</div>
    <div class="ll-deco-bar"></div>
  </div>
  <div id="ll-percent-row">
    <div id="ll-percent">0%</div>
    <div id="ll-msg">تهيئة البوابة...</div>
  </div>
  <div id="ll-bar-wrap">
    <div id="ll-bar-outer">
      <div id="ll-bar-fill"></div>
    </div>
  </div>
  <div id="ll-dots">
    <div class="ll-dot"></div>
    <div class="ll-dot"></div>
    <div class="ll-dot"></div>
    <div class="ll-dot"></div>
    <div class="ll-dot"></div>
  </div>
</div>
<div id="screen2">
  <div id="s2-title">مخصص لظلال فقط</div>
</div>
`;

var tmp = document.createElement('div');
tmp.innerHTML = html;
while(tmp.firstChild) document.body.appendChild(tmp.firstChild);

var llMsgs = [
  'تهيئة البوابة...',
  'استدعاء الظلال...',
  'فتح البعد المظلم...',
  'تحميل الأسرار...',
  'ربط الطاقات الخفية...',
  'اتصال بمملكة الظلال...',
  'تفعيل الطلاسم...',
  'البوابة تستيقظ...',
  'جاهز للدخول...'
];

function initLuxuryLoader(){
  var loader = document.getElementById('luxury-loader');
  var bar = document.getElementById('ll-bar-fill');
  var pct = document.getElementById('ll-percent');
  var msg = document.getElementById('ll-msg');

  var progress = 0;
  var msgIdx = 0;
  var targetProgress = 0;

  function animateBar(){
    if (progress >= 100) return;
    progress = Math.min(progress + 1 + Math.random() * 2, 100);
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    if (msgIdx < llMsgs.length && progress >= (msgIdx + 1) * (100 / llMsgs.length)) {
      msg.textContent = llMsgs[msgIdx++];
    }
    requestAnimationFrame(animateBar);
  }

  function advanceTarget(){
    targetProgress = Math.min(targetProgress + 10 + Math.random() * 30, 100);
    setTimeout(advanceTarget, 1000);
  }

  advanceTarget();
  animateBar();

  window._llFinish = function(cb){
    setTimeout(function() {
      loader.classList.add('hide');
      loader.style.display = 'none';
      if (typeof cb === 'function') cb();
    }, 1200);
  };
}

initLuxuryLoader();

(function(){
  var s2 = document.getElementById('screen2');
  s2.classList.add('show');
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      s2.style.transition = 'opacity .8s'; s2.style.opacity = '1';
      if (window._llFinish) {
        window._llFinish();
      }
    });
  });
})();
})();
