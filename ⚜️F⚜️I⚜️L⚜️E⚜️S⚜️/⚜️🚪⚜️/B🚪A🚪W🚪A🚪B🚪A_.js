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
  opacity:1;pointer-events:auto;
  transition:opacity 1.2s ease;
}
#luxury-loader.hide{opacity:0;pointer-events:none;}

#ll-particles{position:absolute;inset:0;pointer-events:none;overflow:hidden;}

.ll-particle{
  position:absolute;
  border-radius:50%;
  pointer-events:none;
  animation:llFloat linear infinite;
}
@keyframes llFloat{
  0%{transform:translateY(0) scale(1);opacity:0;}
  10%{opacity:1;}
  90%{opacity:0.6;}
  100%{transform:translateY(-110vh) scale(0.3);opacity:0;}
}

#ll-logo{
  position:relative;z-index:2;
  display:flex;flex-direction:column;align-items:center;
  margin-bottom:clamp(30px,6vh,60px);
}
#ll-emblem{
  font-size:clamp(44px,8vw,80px);
  animation:llEmblemPulse 2s ease-in-out infinite;
  filter:drop-shadow(0 0 30px rgba(201,168,76,0.9));
  margin-bottom:14px;
  user-select:none;
}
@keyframes llEmblemPulse{
  0%,100%{transform:scale(1) rotate(-3deg);filter:drop-shadow(0 0 22px rgba(201,168,76,0.7));}
  50%{transform:scale(1.08) rotate(3deg);filter:drop-shadow(0 0 55px rgba(245,224,144,1)) drop-shadow(0 0 100px rgba(201,168,76,0.5));}
}

#ll-title{
  font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:clamp(16px,3.5vw,34px);
  color:var(--gold2);
  letter-spacing:clamp(4px,1.5vw,12px);
  text-align:center;
  text-shadow:0 0 30px rgba(201,168,76,1),0 0 80px rgba(201,168,76,0.5);
  animation:llTitleShine 1.8s ease-in-out infinite alternate;
  margin-bottom:6px;
}
@keyframes llTitleShine{
  from{text-shadow:0 0 20px rgba(201,168,76,0.7),0 0 50px rgba(201,168,76,0.3);}
  to{text-shadow:0 0 55px rgba(245,224,144,1),0 0 120px rgba(201,168,76,0.8),0 0 200px rgba(201,168,76,0.3);}
}
#ll-subtitle{
  font-size:clamp(8px,1.2vw,11px);
  color:rgba(201,168,76,0.4);
  letter-spacing:7px;
  text-align:center;
  margin-top:4px;
}

#ll-deco-line{
  display:flex;align-items:center;gap:14px;
  margin-bottom:clamp(20px,4vh,40px);
  width:min(500px,90vw);
}
.ll-deco-bar{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.5),transparent);}
.ll-deco-gem{color:rgba(201,168,76,0.7);font-size:clamp(10px,1.5vw,14px);}

#ll-bar-wrap{
  position:relative;
  width:min(520px,88vw);
  margin-bottom:14px;
}
#ll-bar-outer{
  width:100%;height:6px;
  background:rgba(201,168,76,0.07);
  border:1px solid rgba(201,168,76,0.18);
  border-radius:4px;
  overflow:hidden;
  position:relative;
  box-shadow:0 0 20px rgba(201,168,76,0.1),inset 0 0 10px rgba(0,0,0,0.5);
}
#ll-bar-fill{
  height:100%;width:0%;
  background:linear-gradient(90deg,#5a3200,var(--gold),var(--gold2),var(--gold),#5a3200);
  background-size:200% 100%;
  border-radius:4px;
  box-shadow:0 0 18px rgba(201,168,76,0.9),0 0 40px rgba(201,168,76,0.5);
  transition:width 0.12s ease;
  animation:llBarShimmer 1.5s linear infinite;
}
@keyframes llBarShimmer{
  0%{background-position:200% 0;}
  100%{background-position:-200% 0;}
}
#ll-bar-pulse{
  position:absolute;top:50%;left:0;transform:translateY(-50%);
  height:2px;width:80px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,0.9),transparent);
  border-radius:2px;
  animation:llPulseMove 1.5s ease-in-out infinite;
  pointer-events:none;
}
@keyframes llPulseMove{
  0%{left:-80px;opacity:0;}
  20%{opacity:1;}
  80%{opacity:1;}
  100%{left:calc(100% + 80px);opacity:0;}
}

#ll-corner-tl,#ll-corner-tr,#ll-corner-bl,#ll-corner-br{
  position:absolute;width:12px;height:12px;
  border-color:rgba(201,168,76,0.6);border-style:solid;
  animation:llCornerPulse 2s ease-in-out infinite alternate;
}
#ll-corner-tl{top:-4px;left:-4px;border-width:2px 0 0 2px;}
#ll-corner-tr{top:-4px;right:-4px;border-width:2px 2px 0 0;}
#ll-corner-bl{bottom:-4px;left:-4px;border-width:0 0 2px 2px;}
#ll-corner-br{bottom:-4px;right:-4px;border-width:0 2px 2px 0;}
@keyframes llCornerPulse{
  from{border-color:rgba(201,168,76,0.4);}
  to{border-color:rgba(245,224,144,1);box-shadow:0 0 12px rgba(201,168,76,0.8);}
}

#ll-percent-row{
  display:flex;align-items:center;justify-content:space-between;
  width:min(520px,88vw);
  margin-bottom:clamp(16px,3vh,28px);
}
#ll-percent{
  font-family:'Cinzel',serif;
  font-size:clamp(20px,3.5vw,32px);
  color:var(--gold2);
  font-weight:700;
  text-shadow:0 0 20px rgba(201,168,76,0.9);
  min-width:80px;
}
#ll-msg{
  font-size:clamp(9px,1.3vw,12px);
  color:rgba(201,168,76,0.5);
  letter-spacing:3px;
  text-align:right;
  max-width:240px;
  animation:llMsgFade 0.5s ease;
}
@keyframes llMsgFade{from{opacity:0;transform:translateX(10px);}to{opacity:1;transform:translateX(0);}}

#ll-scan{
  position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 0%,rgba(201,168,76,0.025) 50%,transparent 100%);
  background-size:100% 8px;
  animation:llScan 4s linear infinite;
  pointer-events:none;
}
@keyframes llScan{from{background-position:0 0;}to{background-position:0 100vh;}}

#ll-nav-overlay{
  position:fixed;inset:0;z-index:300;
  display:none;flex-direction:column;align-items:center;justify-content:center;
  background:radial-gradient(ellipse 80% 80% at 50% 50%,#1a003a,#0a0018,#000);
  opacity:0;
  transition:opacity 0.6s ease;
}
#ll-nav-overlay.active{display:flex;}
#ll-nav-overlay.visible{opacity:1;}

#ll-nav-particles{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
#ll-nav-logo{
  font-size:clamp(50px,10vw,90px);
  animation:llNavLogoSpin 1s ease-in-out infinite alternate;
  filter:drop-shadow(0 0 40px rgba(201,168,76,1));
  margin-bottom:20px;user-select:none;
}
@keyframes llNavLogoSpin{
  from{transform:scale(0.9);filter:drop-shadow(0 0 20px rgba(201,168,76,0.6));}
  to{transform:scale(1.1);filter:drop-shadow(0 0 70px rgba(245,224,144,1)) drop-shadow(0 0 140px rgba(201,168,76,0.7));}
}
#ll-nav-title{
  font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:clamp(14px,2.5vw,24px);
  color:var(--gold2);
  letter-spacing:8px;
  text-shadow:0 0 40px rgba(201,168,76,1);
  margin-bottom:8px;
}
#ll-nav-sub{
  font-size:clamp(8px,1.1vw,11px);
  color:rgba(201,168,76,0.4);
  letter-spacing:5px;
  margin-bottom:clamp(30px,6vh,55px);
}
#ll-nav-bar-wrap{width:min(480px,86vw);position:relative;}
#ll-nav-bar-outer{
  width:100%;height:5px;
  background:rgba(201,168,76,0.07);
  border:1px solid rgba(201,168,76,0.2);
  border-radius:3px;overflow:hidden;
  box-shadow:0 0 20px rgba(201,168,76,0.12);
}
#ll-nav-bar-fill{
  height:100%;width:0%;
  background:linear-gradient(90deg,#5a3200,var(--gold),var(--gold2),var(--gold));
  background-size:200% 100%;
  border-radius:3px;
  box-shadow:0 0 20px rgba(201,168,76,1),0 0 50px rgba(201,168,76,0.6);
  animation:llBarShimmer 1.2s linear infinite;
}
#ll-nav-percent{
  position:absolute;right:0;top:-28px;
  font-family:'Cinzel',serif;
  font-size:clamp(13px,2vw,18px);
  color:var(--gold2);
  text-shadow:0 0 16px rgba(201,168,76,0.9);
}
#ll-nav-msg{
  font-size:clamp(9px,1.2vw,11px);
  color:rgba(201,168,76,0.4);
  letter-spacing:4px;
  margin-top:16px;
  animation:llMsgFade 0.5s ease;
}

#screen2{position:fixed;inset:0;z-index:10;display:none;opacity:0}
#screen2.show{display:block}
#screen2.fade-out{opacity:0;pointer-events:none;transition:opacity 1s}
#s2-bg{position:absolute;inset:0;z-index:0;overflow:hidden;
  background:radial-gradient(ellipse 60% 45% at 50% 0%,#2a003a 0%,#120020 40%,#000 100%);}
#s2-castle{
  position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:min(1100px,100vw);z-index:1;
  filter:drop-shadow(0 0 40px rgba(200,0,0,.5)) drop-shadow(0 0 80px rgba(160,0,0,.3));opacity:.85;
}
#s2-fog{position:absolute;bottom:0;left:0;right:0;height:35%;z-index:2;
  background:linear-gradient(0deg,rgba(60,0,80,.5),transparent);pointer-events:none;}
#s2-fire{
  position:absolute;bottom:0;left:0;right:0;height:25%;z-index:2;
  background:radial-gradient(ellipse 80% 100% at 50% 100%,rgba(120,0,200,.35),transparent 70%);
  animation:fireFlicker 1.8s ease-in-out infinite alternate;pointer-events:none;
}
@keyframes fireFlicker{0%{opacity:.7}100%{opacity:1}}
#s2-embers{position:absolute;inset:0;z-index:3;pointer-events:none}
#three-canvas{
  position:absolute;z-index:4;width:100%!important;height:100%!important;
  top:0!important;left:0!important;cursor:pointer;
}
#s2-title{
  position:absolute;top:clamp(12px,4vh,50px);left:50%;transform:translateX(-50%);
  z-index:8;font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:clamp(10px,2vw,16px);font-weight:700;
  color:#ff6666;letter-spacing:3px;
  text-shadow:0 0 20px rgba(255,0,0,1),0 0 50px rgba(180,0,0,.7);
  white-space:nowrap;animation:titlePulse 2.5s ease-in-out infinite;pointer-events:none;
}
@keyframes titlePulse{
  0%,100%{text-shadow:0 0 18px rgba(255,0,0,.8),0 0 40px rgba(180,0,0,.4)}
  50%{text-shadow:0 0 30px rgba(255,0,0,1),0 0 70px rgba(255,0,0,.5)}}
#s2-glow{
  position:absolute;inset:0;z-index:5;pointer-events:none;
  background:radial-gradient(ellipse 40% 50% at 50% 52%,rgba(140,0,255,0),transparent);
  transition:background 1s;
}
#s2-glow.lit{background:radial-gradient(ellipse 40% 50% at 50% 52%,rgba(140,0,255,.25),rgba(80,0,180,.08) 55%,transparent 80%)}
#s2-lightning{position:absolute;inset:0;z-index:6;pointer-events:none}

#thunder-menu{
  position:fixed;inset:0;z-index:60;
  display:none;flex-direction:column;align-items:center;justify-content:center;
  background:rgba(0,0,0,0);backdrop-filter:blur(0px);
  pointer-events:none;
  transition:background .5s,backdrop-filter .5s;
}
#thunder-menu.show{
  display:flex;pointer-events:auto;
  background:rgba(0,0,0,.93);backdrop-filter:blur(10px);
}
#tm-lightning{position:absolute;inset:0;pointer-events:none;z-index:0}

.tm-inner{
  position:relative;z-index:2;
  display:flex;flex-direction:column;align-items:center;
  width:min(680px,96vw);
  opacity:0;transform:translateY(24px) scale(.96);
  transition:opacity .55s ease .2s,transform .55s ease .2s;
}
#thunder-menu.show .tm-inner{opacity:1;transform:translateY(0) scale(1)}

.tm-top-deco{
  display:flex;align-items:center;gap:12px;margin-bottom:10px;
  color:rgba(201,168,76,.4);font-size:clamp(7px,1.1vw,10px);letter-spacing:6px;
}
.tm-top-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,.4),transparent)}

.tm-title{
  font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:clamp(22px,5vw,52px);
  color:var(--gold2);letter-spacing:clamp(5px,1.5vw,16px);
  text-align:center;
  text-shadow:0 0 30px rgba(201,168,76,.9),0 0 80px rgba(201,168,76,.5),0 0 140px rgba(201,168,76,.25);
  animation:tmShine 2.2s ease-in-out infinite alternate;
  margin-bottom:8px;
}
@keyframes tmShine{
  from{text-shadow:0 0 22px rgba(201,168,76,.7),0 0 55px rgba(201,168,76,.35);}
  to{text-shadow:0 0 50px rgba(245,224,144,1),0 0 110px rgba(201,168,76,.75),0 0 200px rgba(201,168,76,.3);}
}
.tm-subtitle{
  font-size:clamp(7px,1.1vw,10px);color:rgba(201,168,76,.35);
  letter-spacing:6px;margin-bottom:clamp(18px,4vh,38px);text-align:center;
}
.tm-divider{
  width:88%;height:1px;
  background:linear-gradient(90deg,transparent,var(--gold),var(--gold2),var(--gold),transparent);
  box-shadow:0 0 16px rgba(201,168,76,.45);
  margin-bottom:clamp(18px,4vh,36px);
}
.tm-btns{display:flex;flex-direction:column;gap:clamp(7px,1.5vh,14px);width:100%;align-items:center}

.tm-btn{
  position:relative;width:min(540px,94vw);
  padding:clamp(13px,2.3vh,18px) clamp(22px,4vw,48px);
  background:linear-gradient(135deg,rgba(45,28,0,.92),rgba(18,10,0,.96));
  border:1px solid rgba(201,168,76,.35);
  border-top-color:rgba(245,224,144,.55);border-bottom-color:rgba(201,168,76,.18);
  color:var(--gold2);
  font-family:'Cinzel Decorative','Cinzel',serif;
  font-size:clamp(12px,1.8vw,16px);
  letter-spacing:2px;cursor:pointer;text-align:center;
  clip-path:polygon(18px 0%,100% 0%,calc(100% - 18px) 100%,0% 100%);
  transition:all .22s;
  text-shadow:0 0 14px rgba(201,168,76,.55);
  overflow:hidden;opacity:0;transform:translateX(50px);
  outline:none;
  -webkit-tap-highlight-color: transparent;
}
#thunder-menu.show .tm-btn{opacity:1;transform:translateX(0);}
#thunder-menu.show .tm-btn:nth-child(1){transition:opacity .4s ease .3s,transform .4s ease .3s,background .22s,box-shadow .22s,color .22s;}
#thunder-menu.show .tm-btn:nth-child(2){transition:opacity .4s ease .4s,transform .4s ease .4s,background .22s,box-shadow .22s,color .22s;}

.tm-btn::before{
  content:'';position:absolute;top:0;left:-120%;width:100%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(201,168,76,.07),transparent);
  transition:left .45s;
}
.tm-btn:hover::before{left:120%}
.tm-btn:hover{
  background:linear-gradient(135deg,rgba(90,56,0,.98),rgba(55,33,0,.99));
  border-color:rgba(245,224,144,.75);
  box-shadow:0 0 32px rgba(201,168,76,.45),inset 0 0 22px rgba(201,168,76,.06);
  color:#fff;
}
.tm-btn::after{
  content:'';
  position:absolute;inset:0;
  background:radial-gradient(ellipse at center, rgba(245,224,144,0.22) 0%, transparent 70%);
  opacity:0;
  transform:scale(0.6);
  transition:opacity 0.08s ease, transform 0.08s ease;
  pointer-events:none;
}
.tm-btn.pressing{
  transform:scale(0.965) !important;
  background:linear-gradient(135deg,rgba(100,65,5,.99),rgba(60,38,2,.99)) !important;
  border-color:rgba(245,224,144,1) !important;
  box-shadow:0 0 55px rgba(201,168,76,.85),0 0 120px rgba(201,168,76,.4),inset 0 0 40px rgba(201,168,76,.18) !important;
  color:#fff !important;
}
.tm-btn.pressing::after{opacity:1;transform:scale(1.1);}

@keyframes tmRipple{
  0%{transform:translate(-50%,-50%) scale(0);opacity:0.75;}
  100%{transform:translate(-50%,-50%) scale(4);opacity:0;}
}
.tm-ripple{
  position:absolute;width:120px;height:120px;border-radius:50%;
  background:radial-gradient(circle, rgba(245,224,144,0.45) 0%, rgba(201,168,76,0.15) 50%, transparent 70%);
  pointer-events:none;animation:tmRipple 0.65s ease-out forwards;z-index:10;
}
@keyframes tmCornerFlash{
  0%{opacity:1;transform:scale(1);}
  100%{opacity:0;transform:scale(1.8);}
}
.tm-corner-spark{
  position:absolute;width:8px;height:8px;background:rgba(245,224,144,0.9);
  pointer-events:none;animation:tmCornerFlash 0.4s ease-out forwards;
  clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
  z-index:11;
}
@keyframes tmSweep{
  0%{left:-100%;opacity:1;}
  100%{left:200%;opacity:0;}
}
.tm-sweep{
  position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(245,224,144,0.18),rgba(255,255,255,0.08),transparent);
  pointer-events:none;animation:tmSweep 0.55s ease-out forwards;z-index:9;
}
@keyframes tmBorderPulse{
  0%{box-shadow:0 0 0px rgba(245,224,144,0);}
  30%{box-shadow:0 0 70px rgba(245,224,144,.9),0 0 140px rgba(201,168,76,.5);}
  100%{box-shadow:0 0 32px rgba(201,168,76,.45);}
}
.tm-btn.border-pulse{animation:tmBorderPulse 0.6s ease-out forwards;}

.tm-prog-wrap{
  width:min(540px,94vw);height:2px;
  background:rgba(201,168,76,.08);border:1px solid rgba(201,168,76,.15);
  margin-top:clamp(16px,3.5vh,32px);overflow:hidden;
}
.tm-prog-fill{
  height:100%;width:0%;
  background:linear-gradient(90deg,var(--gold),var(--gold2),var(--gold));
  box-shadow:0 0 14px var(--gold);transition:width .05s linear;
}

#black-cover{position:fixed;inset:0;z-index:80;background:#000;opacity:0;pointer-events:none;transition:opacity .9s;}
#black-cover.show{opacity:1;pointer-events:auto}
#purple-cover{position:fixed;inset:0;z-index:79;background:radial-gradient(ellipse at 50% 50%,#28004c,#0a0020,#000);opacity:0;pointer-events:none;transition:opacity 1.5s ease;}
#purple-cover.show{opacity:1;pointer-events:auto}
`;
document.head.appendChild(css);

var html = `
<div id="luxury-loader">
  <div id="ll-scan"></div>
  <div id="ll-particles"></div>
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
    <div id="ll-corner-tl"></div>
    <div id="ll-corner-tr"></div>
    <div id="ll-corner-bl"></div>
    <div id="ll-corner-br"></div>
    <div id="ll-bar-outer">
      <div id="ll-bar-fill"></div>
      <div id="ll-bar-pulse"></div>
    </div>
  </div>
</div>

<div id="ll-nav-overlay">
  <div id="ll-nav-particles"></div>
  <div id="ll-nav-logo">⚜️</div>
  <div id="ll-nav-title">مملكة الظلال</div>
  <div id="ll-nav-sub">ENTERING THE SHADOW REALM</div>
  <div id="ll-nav-bar-wrap">
    <div id="ll-nav-percent">0%</div>
    <div id="ll-nav-bar-outer">
      <div id="ll-nav-bar-fill"></div>
    </div>
  </div>
  <div id="ll-nav-msg">جاري الدخول...</div>
</div>

<div id="black-cover"></div>
<div id="purple-cover"></div>

<div id="screen2">
  <div id="s2-bg">
    <svg id="s2-castle" viewBox="0 0 1100 620" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <radialGradient id="skyG" cx="50%" cy="0%" r="90%"><stop offset="0%" stop-color="#5a0000"/><stop offset="100%" stop-color="#000"/></radialGradient>
        <radialGradient id="moonG" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffddcc"/><stop offset="100%" stop-color="#880000"/></radialGradient>
        <filter id="sGlow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect x="0" y="0" width="1100" height="620" fill="url(#skyG)"/>
      <circle cx="550" cy="90" r="58" fill="url(#moonG)" opacity=".75" filter="url(#sGlow)"/>
      <rect x="300" y="310" width="500" height="310" fill="#1a0000"/>
      <path d="M500 620 L500 450 Q550 390 600 450 L600 620 Z" fill="#050000" stroke="#660000" stroke-width="2.5"/>
    </svg>
    <div id="s2-fog"></div>
    <div id="s2-fire"></div>
    <canvas id="s2-embers"></canvas>
  </div>
  <canvas id="three-canvas"></canvas>
  <div id="s2-glow"></div>
  <canvas id="s2-lightning"></canvas>
  <div id="s2-title">مخصص لظلال فقط</div>
</div>

<div id="thunder-menu">
  <canvas id="tm-lightning"></canvas>
  <div class="tm-inner">
    <div class="tm-top-deco">
      <div class="tm-top-line"></div>影 · KAGE · 暗<div class="tm-top-line"></div>
    </div>
    <div class="tm-title">✦ بوابة الظلام ✦</div>
    <div class="tm-subtitle">GATE OF SHADOWS · مملكة الظلال</div>
    <div class="tm-divider"></div>
    <div class="tm-btns">
      <button class="tm-btn" id="tm-btn-enter">♦♠ دخول الى مملكة طائفة الظلام ♠♦</button>
      <button class="tm-btn" id="tm-btn-shadow">🔱 &nbsp; تجري وراء ظلام&nbsp; 🔱</button>
    </div>
    <div class="tm-prog-wrap"><div class="tm-prog-fill" id="tm-bar"></div></div>
  </div>
</div>

<audio id="sfx-open" src="open.ogg" preload="auto"></audio>
<audio id="sfx-music" src="music.ogg" loop preload="auto"></audio>
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

function spawnLoaderParticles(container) {
  if(!container) return;
  var colors = ['rgba(201,168,76,', 'rgba(245,224,144,', 'rgba(160,80,255,', 'rgba(100,0,200,'];
  for(var i = 0; i < 22; i++) {
    (function(){
      var p = document.createElement('div');
      p.className = 'll-particle';
      var size = 2 + Math.random() * 5;
      var color = colors[Math.floor(Math.random() * colors.length)];
      var dur = 4 + Math.random() * 8;
      var delay = Math.random() * 6;
      p.style.cssText = 'width:'+size+'px;height:'+size+'px;left:'+(Math.random()*100)+'%;bottom:'+(Math.random()*30)+'%;background:'+color+'0.7);box-shadow:0 0 '+(size*3)+'px '+color+'0.9);animation-duration:'+dur+'s;animation-delay:'+delay+'s;';
      container.appendChild(p);
    })();
  }
}

(function initLuxuryLoader(){
  var loader = document.getElementById('luxury-loader');
  var bar = document.getElementById('ll-bar-fill');
  var pct = document.getElementById('ll-percent');
  var msg = document.getElementById('ll-msg');
  var particles = document.getElementById('ll-particles');

  spawnLoaderParticles(particles);

  var progress = 0;
  var msgIdx = 0;
  var targetProgress = 0;
  var done = false;

  var phases = [
    {at: 15, msg: 'استدعاء الظلال...'},
    {at: 30, msg: 'فتح البعد المظلم...'},
    {at: 48, msg: 'تحميل الأسرار...'},
    {at: 62, msg: 'ربط الطاقات الخفية...'},
    {at: 78, msg: 'اتصال بمملكة الظلال...'},
    {at: 88, msg: 'تفعيل الطلاسم...'},
    {at: 95, msg: 'البوابة تستيقظ...'},
    {at: 100, msg: 'جاهز للدخول...'}
  ];
  var phaseIdx = 0;

  function animateBar(){
    if(done) return;
    if(progress < targetProgress){
      progress = Math.min(progress + 0.6 + Math.random() * 1.2, targetProgress);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    if(phaseIdx < phases.length && progress >= phases[phaseIdx].at){
      msg.style.animation = 'none';
      msg.offsetHeight;
      msg.style.animation = 'llMsgFade 0.5s ease';
      msg.textContent = phases[phaseIdx].msg;
      phaseIdx++;
    }
    requestAnimationFrame(animateBar);
  }

  function advanceTarget(){
    var step = 8 + Math.random() * 20;
    targetProgress = Math.min(targetProgress + step, 99);
    if(targetProgress < 99){
      setTimeout(advanceTarget, 180 + Math.random() * 350);
    }
  }

  advanceTarget();
  animateBar();

  window._llFinish = function(cb){
    targetProgress = 100;
    var waitDone = setInterval(function(){
      if(progress >= 99){
        clearInterval(waitDone);
        done = true;
        bar.style.width = '100%';
        pct.textContent = '100%';
        setTimeout(function(){
          loader.classList.add('hide');
          setTimeout(function(){
            loader.style.display = 'none';
            if(typeof cb === 'function') cb();
          }, 1200);
        }, 400);
      }
    }, 50);
  };
})();

function showNavLoader(onDone){
  var overlay = document.getElementById('ll-nav-overlay');
  var bar = document.getElementById('ll-nav-bar-fill');
  var pct = document.getElementById('ll-nav-percent');
  var msg = document.getElementById('ll-nav-msg');
  var particles = document.getElementById('ll-nav-particles');

  particles.innerHTML = '';
  spawnLoaderParticles(particles);

  overlay.classList.add('active');
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      overlay.classList.add('visible');
    });
  });

  var progress = 0;
  var phases = [
    {at:20, msg:'فتح البعد المظلم...'},
    {at:45, msg:'تحميل عالم الظلال...'},
    {at:68, msg:'استدعاء القوى الخفية...'},
    {at:85, msg:'تجهيز البوابة...'},
    {at:95, msg:'لحظات قليلة...'},
    {at:100, msg:'مرحباً بك في الظلام...'}
  ];
  var phaseIdx = 0;
  var target = 0;
  var done = false;

  function advT(){
    var step = 12 + Math.random() * 25;
    target = Math.min(target + step, 93);
    if(target < 93) setTimeout(advT, 150 + Math.random() * 280);
  }
  advT();

  function loop(){
    if(done) return;
    if(progress < target) progress = Math.min(progress + 0.9 + Math.random() * 1.5, target);
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
    if(phaseIdx < phases.length && progress >= phases[phaseIdx].at){
      msg.style.animation = 'none';
      msg.offsetHeight;
      msg.style.animation = 'llMsgFade 0.5s ease';
      msg.textContent = phases[phaseIdx].msg;
      phaseIdx++;
    }
    requestAnimationFrame(loop);
  }
  loop();

  setTimeout(function(){
    target = 100;
    var chk = setInterval(function(){
      if(progress >= 99){
        clearInterval(chk);
        done = true;
        bar.style.width = '100%';
        pct.textContent = '100%';
        setTimeout(function(){
          overlay.classList.remove('visible');
          setTimeout(function(){
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            if(typeof onDone === 'function') onDone();
          }, 700);
        }, 350);
      }
    }, 40);
  }, 1800 + Math.random() * 600);
}

function addPressEffect(btn, callback){
  function triggerEffect(e){
    var rect = btn.getBoundingClientRect();
    var cx = (e.clientX || (e.touches && e.touches[0].clientX) || rect.left + rect.width/2) - rect.left;
    var cy = (e.clientY || (e.touches && e.touches[0].clientY) || rect.top  + rect.height/2) - rect.top;
    var ripple = document.createElement('div');
    ripple.className = 'tm-ripple';
    ripple.style.left = cx + 'px';
    ripple.style.top  = cy + 'px';
    btn.appendChild(ripple);
    setTimeout(function(){ if(ripple.parentNode) ripple.parentNode.removeChild(ripple); }, 700);
    var sweep = document.createElement('div');
    sweep.className = 'tm-sweep';
    btn.appendChild(sweep);
    setTimeout(function(){ if(sweep.parentNode) sweep.parentNode.removeChild(sweep); }, 600);
    var corners = [
      {left:'-4px', top:'-4px'},
      {right:'-4px', top:'-4px'},
      {left:'-4px', bottom:'-4px'},
      {right:'-4px', bottom:'-4px'}
    ];
    corners.forEach(function(pos){
      var sp = document.createElement('div');
      sp.className = 'tm-corner-spark';
      Object.keys(pos).forEach(function(k){ sp.style[k] = pos[k]; });
      btn.appendChild(sp);
      setTimeout(function(){ if(sp.parentNode) sp.parentNode.removeChild(sp); }, 450);
    });
    btn.classList.add('pressing');
    btn.classList.add('border-pulse');
    setTimeout(function(){
      btn.classList.remove('pressing');
      btn.classList.remove('border-pulse');
    }, 380);
    if(typeof callback === 'function'){
      setTimeout(callback, 220);
    }
  }
  btn.addEventListener('mousedown', function(e){
    e.preventDefault();
    triggerEffect(e);
  });
  btn.addEventListener('touchstart', function(e){
    e.preventDefault();
    triggerEffect(e);
  }, {passive:false});
}

var TM = (function(){
  var cv = document.getElementById('tm-lightning');
  var ctx = cv ? cv.getContext('2d') : null;
  var W, H, bolts = [], active = false, barIv = null;
  function resize(){ if(!cv) return; W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function spawnBolt(){
    var pts = [], x = Math.random() * W, y = 0;
    pts.push({x:x, y:y});
    for(var i = 0; i < 9; i++){ x += (Math.random() - .5) * 130; y += H/9 + Math.random() * 45; pts.push({x:x, y:y}); }
    var c = Math.random() > .45 ? '201,168,76' : '245,224,144';
    return {pts:pts, life:1, decay:.06 + Math.random() * .09, color:c};
  }
  function loop(){
    if(!active || !ctx) return;
    ctx.clearRect(0, 0, W, H);
    if(Math.random() < .16) bolts.push(spawnBolt());
    for(var i = bolts.length - 1; i >= 0; i--){
      var b = bolts[i];
      ctx.beginPath(); ctx.moveTo(b.pts[0].x, b.pts[0].y);
      for(var j = 1; j < b.pts.length; j++) ctx.lineTo(b.pts[j].x, b.pts[j].y);
      ctx.strokeStyle = 'rgba(' + b.color + ',' + b.life + ')';
      ctx.lineWidth = 1.5 + b.life * 2.5; ctx.stroke();
      b.life -= b.decay; if(b.life <= 0) bolts.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  function show(){
    active = true; bolts = [];
    document.getElementById('thunder-menu').classList.add('show');
    requestAnimationFrame(loop);
    var bar = document.getElementById('tm-bar'), p = 0;
    if(barIv) clearInterval(barIv);
    barIv = setInterval(function(){ p += .33; if(p >= 100){ p = 100; clearInterval(barIv); } bar.style.width = p + '%'; }, 16);
  }
  function hide(){
    active = false; if(barIv) clearInterval(barIv);
    document.getElementById('thunder-menu').classList.remove('show');
    if(ctx) ctx.clearRect(0, 0, W, H); bolts = [];
    document.getElementById('tm-bar').style.width = '0%';
  }
  return {show:show, hide:hide};
})();

function openPasswordScreen(){
  if(window.SoundManager) SoundManager.playClick();
  TM.hide();
  if(window.BloodCastle && typeof window.BloodCastle.open === 'function'){
    window.BloodCastle.open();
    return;
  }
  var s = document.createElement('script');
  s.src = '⚜️F⚜️I⚜️L⚜️E⚜️S⚜️/⚜️🪞⚜️/P🔑A🔑S_.js';
  document.head.appendChild(s);
}

addPressEffect(document.getElementById('tm-btn-enter'), openPasswordScreen);

addPressEffect(document.getElementById('tm-btn-shadow'), function(){
  if(window.SoundManager) SoundManager.playClick();
  TM.hide();
  window._fadDirectOpen = true;
  showNavLoader(function(){
    window.location.href = '👣F👣D👣H👣/F🔥D🔥H.html';
  });
});

(function(){
  var _origClose = null;
  var checkInterval = setInterval(function(){
    if(window.BloodCastle && typeof window.BloodCastle.close === 'function' && !_origClose){
      _origClose = window.BloodCastle.close;
      window.BloodCastle.close = function(){
        _origClose();
        if(!window._fadDirectOpen){
          setTimeout(function(){ TM.show(); }, 300);
        }
        window._fadDirectOpen = false;
      };
      clearInterval(checkInterval);
    }
  }, 200);
})();

(function(){
  var cv = document.getElementById('s2-embers'); if(!cv) return;
  var ctx = cv.getContext('2d'), W, H, sparks = [];
  function resize(){ W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function mk(){ return {x:Math.random()*W, y:H+10, vx:(Math.random()-.5)*1.2, vy:-(1+Math.random()*2.5), life:1, s:1.5+Math.random()*2.5}; }
  for(var i = 0; i < 30; i++){ var sp = mk(); sp.y = Math.random() * H; sparks.push(sp); }
  (function loop(){
    ctx.clearRect(0, 0, W, H);
    if(sparks.length < 60 && Math.random() < .4) sparks.push(mk());
    for(var i = sparks.length - 1; i >= 0; i--){
      var s = sparks[i]; s.x += s.vx; s.y += s.vy; s.life -= .007;
      ctx.beginPath(); ctx.arc(s.x, s.y, s.s * s.life, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(150,0,255,' + (s.life * .8) + ')'; ctx.fill();
      if(s.life <= 0 || s.y < -10) sparks.splice(i, 1);
    }
    requestAnimationFrame(loop);
  })();
})();

var glCV = document.getElementById('s2-lightning'), glCTX = glCV ? glCV.getContext('2d') : null;
var glW, glH, glBolts = [], glActive = false;
(function resize(){ if(!glCV) return; glW = glCV.width = window.innerWidth; glH = glCV.height = window.innerHeight; })();
window.addEventListener('resize', function(){ if(!glCV) return; glW = glCV.width = window.innerWidth; glH = glCV.height = window.innerHeight; });
function spawnRedBolt(){
  var cx = glW/2, cy = glH * .48, a = -Math.PI/2 + (Math.random() - .5) * Math.PI * 1.6;
  var pts = [{x:cx, y:cy}], x = cx, y = cy;
  for(var i = 0; i < 10; i++){ x += Math.cos(a)*30+(Math.random()-.5)*50; y += Math.sin(a)*30+(Math.random()-.5)*30; pts.push({x:x, y:y}); }
  return {pts:pts, life:1, decay:.08+Math.random()*.1};
}
function glLoop(){
  if(!glActive || !glCTX){ if(glCTX) glCTX.clearRect(0, 0, glW, glH); return; }
  glCTX.clearRect(0, 0, glW, glH);
  if(Math.random() < .25) glBolts.push(spawnRedBolt());
  for(var i = glBolts.length - 1; i >= 0; i--){
    var b = glBolts[i]; glCTX.beginPath(); glCTX.moveTo(b.pts[0].x, b.pts[0].y);
    for(var j = 1; j < b.pts.length; j++) glCTX.lineTo(b.pts[j].x, b.pts[j].y);
    glCTX.strokeStyle = 'rgba(255,0,0,' + b.life + ')'; glCTX.lineWidth = 3;
    glCTX.shadowColor = 'rgba(255,0,0,1)'; glCTX.shadowBlur = 20; glCTX.stroke(); glCTX.shadowBlur = 0;
    b.life -= b.decay; if(b.life <= 0) glBolts.splice(i, 1);
  }
  requestAnimationFrame(glLoop);
}
function startGL(){ if(glActive || !glCTX) return; glActive = true; glBolts = []; requestAnimationFrame(glLoop); }
function stopGL(){ glActive = false; glBolts = []; if(glCTX) glCTX.clearRect(0, 0, glW, glH); }

var scene, camera, renderer, doorL, doorR;
var doorsOpening = false, doorAngle = 0;
var OPEN_ANGLE = Math.PI/2, DOOR_SPEED = Math.PI/(5*60);
var backGlow, threeInited = false;

function initThree(){
  if(threeInited || !window.THREE) return; threeInited = true;
  var canvas = document.getElementById('three-canvas'); if(!canvas) return;
  renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .01, 200);
  camera.position.set(0, 0, 7.5);
  scene.add(new THREE.AmbientLight(0x110022, 2.5));
  var dL = new THREE.DirectionalLight(0x6600aa, 3); dL.position.set(0, 2, 5); scene.add(dL);
  backGlow = new THREE.PointLight(0xaa44ff, 0, 18); backGlow.position.set(0, 0, -2); scene.add(backGlow);
  function resizeR(){
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resizeR); resizeR();
  var ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
  canvas.addEventListener('click', function(e){
    if(doorsOpening) return;
    mouse.x = (e.clientX/window.innerWidth)*2 - 1;
    mouse.y = -(e.clientY/window.innerHeight)*2 + 1;
    ray.setFromCamera(mouse, camera);
    if(ray.intersectObjects(scene.children, true).length > 0) onGateClick();
  });
  if(window.THREE && window.THREE.GLTFLoader){
    new THREE.GLTFLoader().load('⚜️F⚜️I⚜️L⚜️E⚜️S⚜️/⚜️🚪⚜️/B🚪W🚪B_.glb', function(gltf){
      var model = gltf.scene;
      model.traverse(function(c){ if(c.name === 'Door_L') doorL = c; if(c.name === 'Door_R') doorR = c; });
      var box = new THREE.Box3().setFromObject(model), sz = box.getSize(new THREE.Vector3()), cn = box.getCenter(new THREE.Vector3());
      var sc = 4.5/Math.max(sz.x, sz.y, sz.z); model.scale.setScalar(sc);
      model.position.set(-cn.x*sc, -cn.y*sc, -cn.z*sc); scene.add(model);
    }, null, buildFallback);
  } else { buildFallback(); }
  (function animate(){
    requestAnimationFrame(animate);
    if(doorsOpening){
      doorAngle = Math.min(doorAngle + DOOR_SPEED, OPEN_ANGLE);
      if(doorL) doorL.rotation.y = doorAngle;
      if(doorR) doorR.rotation.y = doorAngle;
      if(backGlow) backGlow.intensity = (doorAngle/OPEN_ANGLE) * 5;
    }
    renderer.render(scene, camera);
  })();
}

function buildFallback(){
  var mat = new THREE.MeshStandardMaterial({color:0x150025, roughness:.25, metalness:.9, side:THREE.DoubleSide});
  var frm = new THREE.MeshStandardMaterial({color:0x3a0055, roughness:.1, metalness:1, side:THREE.DoubleSide});
  function aB(g, m, x, y, z){ var mesh = new THREE.Mesh(g, m); mesh.position.set(x, y, z); scene.add(mesh); return mesh; }
  aB(new THREE.BoxGeometry(3.1, .18, .14), frm, 0, 1.82, .01);
  aB(new THREE.BoxGeometry(3.1, .18, .14), frm, 0, -1.82, .01);
  aB(new THREE.BoxGeometry(.18, 3.64, .14), frm, -1.46, 0, .01);
  aB(new THREE.BoxGeometry(.18, 3.64, .14), frm, 1.46, 0, .01);
  var gL = new THREE.BoxGeometry(1.3, 3.6, .09); gL.translate(.65, 0, -.15);
  doorL = new THREE.Mesh(gL, mat.clone()); doorL.position.set(-1.3, 0, .07); scene.add(doorL);
  var gR = new THREE.BoxGeometry(1.3, 3.6, .09); gR.translate(-.65, 0, -.15);
  doorR = new THREE.Mesh(gR, mat.clone()); doorR.position.set(1.3, 0, .07); scene.add(doorR);
}

function onGateClick(){
  if(window.SoundManager) SoundManager.playClick();
  startGL();
  setTimeout(function(){ stopGL(); TM.show(); }, 900);
}

(function(){
  var s2 = document.getElementById('screen2');
  s2.classList.add('show');
  requestAnimationFrame(function(){ requestAnimationFrame(function(){
    s2.style.transition = 'opacity .8s'; s2.style.opacity = '1';
    function loadThree(){
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      s.onload = function(){
        var g = document.createElement('script');
        g.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
        g.onload = initThree; g.onerror = initThree;
        document.head.appendChild(g);
      };
      document.head.appendChild(s);
    }
    if(window._llFinish){
      window._llFinish(function(){
        if(window.THREE) initThree(); else loadThree();
      });
    } else {
      if(window.THREE) initThree(); else loadThree();
    }
  }); });
})();

window.Gate2 = {
  startGateOpen: function(){
    doorsOpening = true; doorAngle = 0;
    var glow = document.getElementById('s2-glow'); if(glow) glow.classList.add('lit');
    startGL();
    var gateMusic = new Audio('⚜️F⚜️I⚜️L⚜️E⚜️S⚜️/⚜️🎶⚜️/F🎶A🎶T🎶H🎶BWB_.ogg');
    gateMusic.loop = false; gateMusic.volume = 0.8;
    gateMusic.play().catch(function(){});
    var sfx = document.getElementById('sfx-open'); if(sfx){ sfx.currentTime = 0; sfx.play().catch(function(){}); }
    setTimeout(function(){
      stopGL();
      if(glow) glow.classList.remove('lit');
      var pc = document.getElementById('purple-cover'), bc = document.getElementById('black-cover');
      pc.classList.add('show');
      setTimeout(function(){
        bc.classList.add('show');
        setTimeout(function(){
          var s2 = document.getElementById('screen2');
          if(s2){ s2.classList.add('fade-out'); s2.style.display = 'none'; }
          var ds = document.createElement('script'); ds.src = '⚜️F⚜️I⚜️L⚜️E⚜️S⚜️/⚜️🪞⚜️/D⚜️A⚜️R⚜️K⚜️S_.js'; document.head.appendChild(ds);
          var oldMusic = document.getElementById('sfx-music');
          if(oldMusic){ oldMusic.pause(); oldMusic.currentTime = 0; }
          setTimeout(function(){ bc.classList.remove('show'); setTimeout(function(){ pc.classList.remove('show'); }, 600); }, 500);
        }, 400);
      }, 500);
    }, 5000);
  }
};

})();
