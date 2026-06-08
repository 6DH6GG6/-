(function(){
'use strict';

/* ============================================================
   slaym.js — نظام حماية المطور | SLAM Gate System
   يتصل بـ admin.js عبر window.ADMIN
   كلمة سر المطور: "الظلال نتربص في الظلام"
   ============================================================ */

// ── مسار البوابة ثلاثية الأبعاد ─────────────────────────
var BWB_GLB_PATH = 'bawaba.glb';

// ── كلمة سر المطور (مشفرة بـ btoa لحمايتها من العيون) ───
var _DEV_PW_ENCODED = btoa(encodeURIComponent('الظلال نتربص في الظلام'));

function _checkDevPw(val){
  return btoa(encodeURIComponent(val.trim())) === _DEV_PW_ENCODED;
}

// ── حالة المطور ─────────────────────────────────────────
var _devUnlocked = false;

// ── CSS الخاص بـ SLAM ────────────────────────────────────
var style = document.createElement('style');
style.textContent = `
@keyframes slam-ring-spin{to{transform:rotate(360deg)}}
@keyframes slam-glow{0%,100%{box-shadow:0 0 8px 2px rgba(201,168,76,.5),inset 0 0 6px rgba(0,0,0,.9)}
  50%{box-shadow:0 0 18px 5px rgba(201,168,76,.85),inset 0 0 8px rgba(0,0,0,.95)}}
@keyframes slam-badge-in{from{opacity:0;transform:scale(.4) rotate(-12deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
@keyframes slam-text-flicker{0%,100%{opacity:1}45%{opacity:.8}50%{opacity:1}70%{opacity:.85}}
@keyframes slam-pw-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
@keyframes slam-overlay-in{from{opacity:0}to{opacity:1}}
@keyframes slam-panel-in{from{opacity:0;transform:translateY(22px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes slam-bolt{0%,100%{opacity:0}10%,14%{opacity:.9}12%{opacity:.3}}
@keyframes slam-glb-pulse{0%,100%{filter:drop-shadow(0 0 8px rgba(201,168,76,.4))}50%{filter:drop-shadow(0 0 22px rgba(201,168,76,.8))}}

/* ── شارة SLAM ── */
.slam-badge{
  display:inline-flex;align-items:center;justify-content:center;
  position:relative;width:54px;height:54px;
  cursor:default;
  animation:slam-badge-in .5s cubic-bezier(.34,1.3,.64,1) forwards;
  flex-shrink:0;
}
.slam-badge-ring{
  position:absolute;inset:0;border-radius:50%;
  border:2px solid transparent;
  border-top-color:#c9a84c;border-right-color:#f5e090;
  animation:slam-ring-spin 4s linear infinite;
  box-shadow:0 0 10px rgba(201,168,76,.4);
}
.slam-badge-ring2{
  position:absolute;inset:5px;border-radius:50%;
  border:1px solid rgba(201,168,76,.25);
  border-bottom-color:transparent;
  animation:slam-ring-spin 7s linear infinite reverse;
}
.slam-badge-core{
  position:relative;z-index:2;
  width:36px;height:36px;border-radius:50%;
  background:radial-gradient(circle at 38% 35%,#1a1a1a,#000 75%);
  border:1.5px solid rgba(201,168,76,.55);
  display:flex;align-items:center;justify-content:center;
  animation:slam-glow 2.8s ease-in-out infinite;
}
.slam-badge-text{
  font-family:'Cinzel',serif;
  font-size:9px;font-weight:900;
  color:#c9a84c;letter-spacing:1.5px;
  animation:slam-text-flicker 3s ease-in-out infinite;
  text-shadow:0 0 6px rgba(201,168,76,.7);
  line-height:1;
}

/* ── فقاعة SLAM في البوت ── */
.slam-bubble-wrap{
  display:flex;align-items:center;gap:10px;
  padding:4px 0;
}
.slam-bubble-info{
  font-family:'Cairo',sans-serif;
  font-size:12px;color:rgba(201,168,76,.75);
  letter-spacing:1.5px;line-height:1.6;
}
.slam-bubble-label{
  font-family:'Cinzel',serif;font-size:10px;
  color:#c9a84c;letter-spacing:3px;
  text-shadow:0 0 8px rgba(201,168,76,.6);
  margin-bottom:2px;
}

/* ── أوامر المطور السرية ── */
.slam-dev-cmd{
  display:inline-block;
  background:rgba(0,0,0,.7);
  border:1px solid rgba(201,168,76,.3);
  border-right:3px solid #c9a84c;
  color:#f5e090;font-family:'Cinzel',serif;
  font-size:11px;padding:5px 12px;
  letter-spacing:2px;margin:3px 0;
  border-radius:2px;cursor:pointer;
  transition:all .2s;width:100%;text-align:right;
}
.slam-dev-cmd:hover{
  background:rgba(201,168,76,.1);
  border-right-color:#f5e090;
  color:#fff;
}

/* ── overlay كلمة سر المطور ── */
#slam-dev-overlay{
  position:fixed;inset:0;z-index:700;
  background:rgba(0,0,0,.92);
  display:none;align-items:center;justify-content:center;
  animation:slam-overlay-in .25s ease;
  backdrop-filter:blur(4px);
}
#slam-dev-overlay.show{display:flex;}
#slam-dev-panel{
  background:linear-gradient(160deg,#0d0a00,#050300);
  border:1px solid rgba(201,168,76,.4);
  border-top:2px solid #c9a84c;
  width:min(360px,92vw);
  padding:28px 24px 24px;
  border-radius:3px;
  display:flex;flex-direction:column;align-items:center;gap:16px;
  animation:slam-panel-in .3s cubic-bezier(.34,1.1,.64,1);
  position:relative;
}
#slam-dev-panel-bolts{position:absolute;inset:0;pointer-events:none;border-radius:3px;overflow:hidden;}
#slam-dev-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(13px,3.5vw,18px);
  color:#c9a84c;letter-spacing:4px;text-align:center;
  text-shadow:0 0 20px rgba(201,168,76,.6);
}
#slam-dev-subtitle{
  font-size:11px;color:rgba(201,168,76,.45);
  letter-spacing:3px;margin-top:-10px;font-family:'Cinzel',serif;
}
#slam-dev-pw{
  width:100%;
  background:rgba(10,8,0,.7);
  border:1px solid rgba(201,168,76,.35);
  color:#f5e090;font-family:'Cairo',sans-serif;
  font-size:14px;padding:12px 16px;
  outline:none;border-radius:2px;
  direction:rtl;text-align:center;
  transition:border-color .2s,box-shadow .2s;
  letter-spacing:2px;
}
#slam-dev-pw:focus{
  border-color:#c9a84c;
  box-shadow:0 0 16px rgba(201,168,76,.2);
}
#slam-dev-pw.shake{animation:slam-pw-shake .4s ease;}
#slam-dev-err{
  font-size:11px;color:#cc4400;letter-spacing:2px;min-height:15px;
  font-family:'Cinzel',serif;
  text-shadow:0 0 6px rgba(200,60,0,.5);
}
#slam-dev-btn{
  width:100%;
  background:linear-gradient(135deg,#1a1200,#3d2a00,#c9a84c,#3d2a00,#1a1200);
  border:1px solid rgba(201,168,76,.5);
  color:#000;font-family:'Cinzel Decorative',serif;
  font-size:13px;padding:13px;
  letter-spacing:3px;cursor:pointer;border-radius:2px;
  font-weight:900;transition:all .25s;
}
#slam-dev-btn:hover{box-shadow:0 0 24px rgba(201,168,76,.45);color:#000;}
#slam-dev-close-btn{
  background:transparent;border:1px solid rgba(120,80,0,.3);
  color:rgba(180,130,50,.5);font-family:'Cinzel',serif;
  font-size:10px;padding:7px 20px;cursor:pointer;
  letter-spacing:2px;border-radius:2px;transition:all .2s;
}
#slam-dev-close-btn:hover{color:#c9a84c;border-color:rgba(201,168,76,.5);}

/* ── GLB badge صغير في الرسالة ── */
.slam-glb-tag{
  display:inline-flex;align-items:center;gap:6px;
  background:rgba(0,0,0,.6);
  border:1px solid rgba(201,168,76,.3);
  padding:4px 10px;border-radius:2px;
  font-family:'Cinzel',serif;font-size:10px;
  color:rgba(201,168,76,.7);letter-spacing:2px;
  animation:slam-glb-pulse 3s ease-in-out infinite;
  margin-top:6px;cursor:default;
}
.slam-glb-tag-icon{font-size:14px;}
`;
document.head.appendChild(style);

// ── إنشاء overlay المطور ────────────────────────────────
var overlayHtml = `
<div id="slam-dev-overlay">
  <div id="slam-dev-panel">
    <canvas id="slam-dev-panel-bolts"></canvas>
    <div id="slam-dev-title">⚜ SLAM ⚜</div>
    <div id="slam-dev-subtitle">DEVELOPER ACCESS</div>
    <input id="slam-dev-pw" type="password" placeholder="أدخل كلمة سر المطور" maxlength="80" autocomplete="off">
    <div id="slam-dev-err"></div>
    <button id="slam-dev-btn">⚔ تأكيد الهوية ⚔</button>
    <button id="slam-dev-close-btn">↩ إلغاء</button>
  </div>
</div>
`;
var tmp = document.createElement('div');
tmp.innerHTML = overlayHtml;
while(tmp.firstChild) document.body.appendChild(tmp.firstChild);

// ── برق صغير داخل panel ──────────────────────────────────
(function(){
  var cv = document.getElementById('slam-dev-panel-bolts');
  if(!cv) return;
  var ctx = cv.getContext('2d');
  var W, H, bolts = [], active = false;
  function resize(){
    var p = cv.parentElement;
    W = cv.width = p ? p.offsetWidth : 360;
    H = cv.height = p ? p.offsetHeight : 300;
  }
  function spawnBolt(){
    var x = Math.random()*W, pts=[{x:x,y:0}];
    for(var i=0;i<6;i++){x+=(Math.random()-.5)*80;pts.push({x:x,y:(i+1)*(H/6)});}
    return{pts:pts,life:1,decay:.12+Math.random()*.1};
  }
  function loop(){
    if(!active){ctx.clearRect(0,0,W,H);return;}
    ctx.clearRect(0,0,W,H);
    if(Math.random()<.08) bolts.push(spawnBolt());
    for(var i=bolts.length-1;i>=0;i--){
      var b=bolts[i];
      ctx.beginPath();ctx.moveTo(b.pts[0].x,b.pts[0].y);
      for(var j=1;j<b.pts.length;j++) ctx.lineTo(b.pts[j].x,b.pts[j].y);
      ctx.strokeStyle='rgba(201,168,76,'+b.life*.4+')';
      ctx.lineWidth=.8+b.life;ctx.stroke();
      b.life-=b.decay;if(b.life<=0) bolts.splice(i,1);
    }
    requestAnimationFrame(loop);
  }
  window._slamBoltStart=function(){active=true;resize();requestAnimationFrame(loop);};
  window._slamBoltStop=function(){active=false;ctx.clearRect(0,0,W,H);};
})();

// ── فتح / إغلاق overlay ──────────────────────────────────
function openDevOverlay(){
  var o = document.getElementById('slam-dev-overlay');
  var pw = document.getElementById('slam-dev-pw');
  var err = document.getElementById('slam-dev-err');
  if(!o) return;
  pw.value=''; err.textContent='';
  o.classList.add('show');
  pw.focus();
  window._slamBoltStart&&window._slamBoltStart();
}
function closeDevOverlay(){
  var o = document.getElementById('slam-dev-overlay');
  if(o) o.classList.remove('show');
  window._slamBoltStop&&window._slamBoltStop();
}

// ── التحقق من كلمة السر ──────────────────────────────────
function attemptDevUnlock(){
  var pw = document.getElementById('slam-dev-pw');
  var err = document.getElementById('slam-dev-err');
  if(!pw) return;
  if(_checkDevPw(pw.value)){
    err.textContent='';
    _devUnlocked = true;
    window.SLAM && (window.SLAM.devUnlocked = true);
    closeDevOverlay();
    _onDevUnlocked();
  } else {
    err.textContent = '✖ كلمة السر خاطئة';
    pw.classList.remove('shake');
    void pw.offsetWidth; // reflow
    pw.classList.add('shake');
    setTimeout(function(){pw.classList.remove('shake');},450);
    pw.value='';pw.focus();
  }
}

document.getElementById('slam-dev-btn').addEventListener('click', attemptDevUnlock);
document.getElementById('slam-dev-pw').addEventListener('keydown', function(e){
  if(e.key==='Enter') attemptDevUnlock();
  if(e.key==='Escape') closeDevOverlay();
});
document.getElementById('slam-dev-close-btn').addEventListener('click', closeDevOverlay);

// ── بناء شارة SLAM ───────────────────────────────────────
function buildSlamBadge(){
  var wrap = document.createElement('div');
  wrap.className = 'slam-badge';
  wrap.title = 'SLAM — وصول المطور';
  wrap.innerHTML =
    '<div class="slam-badge-ring"></div>'+
    '<div class="slam-badge-ring2"></div>'+
    '<div class="slam-badge-core">'+
      '<span class="slam-badge-text">SLAM</span>'+
    '</div>';
  return wrap;
}

// ── بناء فقاعة تأكيد التحقق للبوت ───────────────────────
function buildSlamConfirmBubble(){
  var wrap = document.createElement('div');
  wrap.className = 'slam-bubble-wrap';

  var badge = buildSlamBadge();

  var info = document.createElement('div');
  info.className = 'slam-bubble-info';
  info.innerHTML =
    '<div class="slam-bubble-label">SLAM · DEVELOPER</div>'+
    'تم فتح الوصول الكامل ✅<br>'+
    '<span style="font-size:10px;opacity:.6;letter-spacing:1px;">الأوامر السرية متاحة الآن</span>';

  var glbTag = document.createElement('div');
  glbTag.className = 'slam-glb-tag';
  glbTag.innerHTML = '<span class="slam-glb-tag-icon">🚪</span><span>'+BWB_GLB_PATH+'</span>';

  var col = document.createElement('div');
  col.style.cssText='display:flex;flex-direction:column;gap:5px;flex:1;';
  col.appendChild(info);
  col.appendChild(glbTag);

  wrap.appendChild(badge);
  wrap.appendChild(col);
  return wrap;
}

// ── بناء قائمة أوامر المطور السرية ──────────────────────
function buildDevCmdList(sendMsg){
  var cmds = window.SLAM ? window.SLAM.devCommands : [];
  if(!cmds || !cmds.length) return null;
  var wrap = document.createElement('div');
  wrap.style.cssText='display:flex;flex-direction:column;gap:4px;width:100%;';
  var title = document.createElement('div');
  title.style.cssText='font-family:"Cinzel",serif;font-size:10px;color:rgba(201,168,76,.5);letter-spacing:3px;margin-bottom:4px;text-align:right;';
  title.textContent='— أوامر المطور —';
  wrap.appendChild(title);
  cmds.forEach(function(cmd){
    var btn = document.createElement('button');
    btn.className='slam-dev-cmd';
    btn.textContent=cmd.label+' · '+cmd.trigger;
    btn.addEventListener('click',function(){
      if(typeof sendMsg==='function') sendMsg(cmd.trigger);
    });
    wrap.appendChild(btn);
  });
  return wrap;
}

// ── ما يحدث بعد فتح وصول المطور ─────────────────────────
function _onDevUnlocked(){
  // أرسل رسالة للبوت عبر ADMIN
  if(window.ADMIN && typeof window.ADMIN._slamDevGranted === 'function'){
    window.ADMIN._slamDevGranted();
  } else {
    // fallback: أرسل مباشرة للواجهة إذا كانت addMsg متاحة
    if(window._botAddMsg){
      var bubble = buildSlamConfirmBubble();
      window._botAddMsg('bot', bubble, 'dom');
      var cmdList = buildDevCmdList(function(t){
        if(window._botDispatch) window._botDispatch(t);
      });
      if(cmdList) window._botAddMsg('bot', cmdList, 'dom');
    }
  }
}

// ── الواجهة العامة لـ slaym.js ───────────────────────────
window.SLAM = {
  // حالة المطور
  devUnlocked: false,

  // مسار الـ GLB
  glbPath: BWB_GLB_PATH,

  // أوامر المطور السرية — يملؤها admin.js
  devCommands: [],

  // فتح نافذة التحقق
  openGate: function(){
    if(_devUnlocked){
      _onDevUnlocked();
      return;
    }
    openDevOverlay();
  },

  // التحقق البرمجي (يستخدمه admin.js لأوامر مباشرة)
  isDevUnlocked: function(){
    return _devUnlocked;
  },

  // إعادة قفل المطور (للاختبار)
  lockDev: function(){
    _devUnlocked=false;
    window.SLAM.devUnlocked=false;
  },

  // بناء شارة SLAM (يستخدمها admin.js في الرسائل)
  buildBadge: buildSlamBadge,

  // بناء فقاعة التأكيد
  buildConfirmBubble: buildSlamConfirmBubble,

  // بناء قائمة الأوامر
  buildDevCmdList: buildDevCmdList
};

})();
