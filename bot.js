(function(){
'use strict';
if(document.getElementById('bot-wrap'))return;

var lnk=document.createElement('link');
lnk.rel='stylesheet';
lnk.href='https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;900&family=Cairo:wght@300;400;700;900&display=swap';
document.head.appendChild(lnk);

var css=document.createElement('style');
css.textContent=`
@keyframes bot-flicker{0%,100%{opacity:1}50%{opacity:.85}75%{opacity:.92}}
@keyframes bot-glow-pulse{0%,100%{text-shadow:0 0 8px #ff0000,0 0 20px #880000,0 0 40px #440000}50%{text-shadow:0 0 16px #ff2200,0 0 40px #cc0000,0 0 80px #660000,0 0 120px #330000}}
@keyframes bot-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-3px)}40%{transform:translateX(3px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}}
@keyframes bot-msg-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes bot-avatar-pulse{0%,100%{box-shadow:0 0 0 0 rgba(180,0,0,0),0 0 18px rgba(120,0,0,.5)}50%{box-shadow:0 0 0 6px rgba(180,0,0,.18),0 0 32px rgba(180,0,0,.7)}}
@keyframes bot-bg-move{0%{background-position:0 0}100%{background-position:40px 40px}}
@keyframes bot-lightning-flash{0%,100%{opacity:0}5%,8%{opacity:.18}6%,7%{opacity:.08}}
@keyframes bot-mini-gate-in{from{opacity:0;transform:scale(.5) rotate(-8deg)}to{opacity:1;transform:scale(1) rotate(0deg)}}
@keyframes bot-sickle-rot{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
@keyframes bot-blood-drip{0%{height:0;opacity:1}80%{opacity:1}100%{height:18px;opacity:0}}
@keyframes bot-star-pop{0%{opacity:1;transform:translate(-50%,-50%) scale(0) rotate(0deg)}55%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(30deg)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.2) rotate(50deg)}}
@keyframes bot-edit-in{from{opacity:0;transform:scaleY(.85)}to{opacity:1;transform:scaleY(1)}}

#bot-wrap{
  position:fixed;inset:0;z-index:500;
  display:flex;flex-direction:column;
  background:#000;
  font-family:'Cairo',sans-serif;
  overflow:hidden;
}
#bot-bg-grid{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(80,0,0,.13)1px,transparent 1px),linear-gradient(90deg,rgba(80,0,0,.13)1px,transparent 1px);
  background-size:40px 40px;
  animation:bot-bg-move 8s linear infinite;
  pointer-events:none;z-index:0;
}
#bot-bg-radial{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(60,0,0,.5),rgba(0,0,0,.98) 80%);
  pointer-events:none;z-index:1;
}
#bot-lightning-layer{position:absolute;inset:0;z-index:2;pointer-events:none;}
#bot-header{
  position:relative;z-index:10;
  display:flex;align-items:center;gap:14px;
  padding:14px 18px 10px;
  border-bottom:1px solid rgba(150,0,0,.35);
  background:linear-gradient(180deg,rgba(20,0,0,.98),rgba(8,0,0,.95));
  flex-shrink:0;
}
#bot-avatar-wrap{position:relative;flex-shrink:0;}
#bot-avatar{
  width:52px;height:52px;border-radius:50%;
  object-fit:cover;border:2px solid #8b0000;
  box-shadow:0 0 18px rgba(120,0,0,.5);
  animation:bot-avatar-pulse 3s ease-in-out infinite;display:block;
}
#bot-avatar-sickle{
  position:absolute;bottom:-4px;right:-4px;font-size:16px;
  animation:bot-sickle-rot 2.5s ease-in-out infinite;
  filter:drop-shadow(0 0 4px #ff0000);
}
#bot-name-wrap{flex:1;}
#bot-name{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(16px,3.5vw,22px);color:#ff2200;
  animation:bot-glow-pulse 2.5s ease-in-out infinite;
  letter-spacing:2px;line-height:1.2;
}
#bot-status{font-size:10px;color:rgba(180,50,30,.7);letter-spacing:3px;margin-top:2px;}
#bot-status-dot{
  display:inline-block;width:6px;height:6px;border-radius:50%;
  background:#cc0000;margin-left:6px;
  box-shadow:0 0 6px #ff0000;
  animation:bot-flicker 1.8s ease-in-out infinite;vertical-align:middle;
}
#bot-msgs{
  flex:1;overflow-y:auto;
  padding:14px 14px 10px;
  display:flex;flex-direction:column;gap:10px;
  position:relative;z-index:10;cursor:text;scroll-behavior:smooth;
}
#bot-msgs::-webkit-scrollbar{width:3px;}
#bot-msgs::-webkit-scrollbar-track{background:rgba(30,0,0,.3);}
#bot-msgs::-webkit-scrollbar-thumb{background:rgba(140,0,0,.5);border-radius:2px;}
.bot-msg{
  display:flex;align-items:flex-end;gap:8px;
  animation:bot-msg-in .35s ease forwards;max-width:88%;
}
.bot-msg.user{align-self:flex-start;flex-direction:row-reverse;}
.bot-msg.bot{align-self:flex-end;}
.bot-bubble{
  padding:10px 14px;border-radius:4px;
  font-size:clamp(12px,2.5vw,14px);line-height:1.7;
  position:relative;word-break:break-word;white-space:pre-wrap;
}
.bot-msg.user .bot-bubble{
  background:linear-gradient(135deg,rgba(25,5,0,.95),rgba(12,2,0,.98));
  border:1px solid rgba(180,50,30,.4);border-top-color:rgba(220,80,50,.6);
  color:#ffccaa;border-radius:4px 0 4px 4px;
}
.bot-msg.bot .bot-bubble{
  background:linear-gradient(135deg,rgba(18,0,0,.97),rgba(8,0,0,.99));
  border:1px solid rgba(140,0,0,.45);border-top-color:rgba(200,0,0,.6);
  color:#ffaa88;border-radius:0 4px 4px 4px;
}
.bot-bubble::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(200,0,0,.4),transparent);
}
.bot-mini-avatar{
  width:26px;height:26px;border-radius:50%;
  border:1px solid rgba(140,0,0,.5);object-fit:cover;flex-shrink:0;opacity:.8;
}
.bot-mini-gate{
  display:inline-flex;align-items:center;justify-content:center;
  width:180px;height:60px;
  background:linear-gradient(135deg,rgba(10,0,20,.97),rgba(4,0,10,.99));
  border:1px solid rgba(100,0,200,.5);border-top-color:rgba(160,0,255,.7);
  border-radius:3px;cursor:pointer;position:relative;overflow:hidden;
  animation:bot-mini-gate-in .5s cubic-bezier(.34,1.2,.64,1) forwards;
  transition:all .25s;gap:10px;
}
.bot-mini-gate:hover{border-color:rgba(200,0,255,.8);box-shadow:0 0 30px rgba(150,0,255,.4);}
.bot-mini-gate-icon{font-size:22px;filter:drop-shadow(0 0 6px rgba(180,0,255,.8));}
.bot-mini-gate-text{
  font-family:'Cinzel',serif;font-size:11px;color:rgba(200,150,255,.9);
  letter-spacing:2px;line-height:1.5;text-align:center;
}
.bot-mini-gate::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(150,0,255,.06),transparent);
  animation:bot-bg-move 3s linear infinite;
}
.bot-pw-input-wrap{display:flex;gap:8px;margin-top:8px;direction:ltr;}
.bot-pw-input{
  flex:1;background:rgba(30,0,0,.5);
  border:1px solid rgba(150,0,0,.4);color:#ffaa88;
  font-family:'Cinzel',serif;font-size:13px;padding:8px 12px;
  outline:none;border-radius:2px;letter-spacing:4px;text-align:center;
}
.bot-pw-input:focus{border-color:#cc0000;box-shadow:0 0 12px rgba(150,0,0,.2);}
.bot-pw-btn{
  background:linear-gradient(135deg,#3d0000,#8b0000);
  border:1px solid rgba(180,0,0,.5);color:#ffddcc;
  font-family:'Cinzel',serif;font-size:12px;padding:8px 14px;
  cursor:pointer;border-radius:2px;transition:all .2s;
}
.bot-pw-btn:hover{border-color:rgba(220,0,0,.8);box-shadow:0 0 16px rgba(180,0,0,.4);}

#bot-edit-bar{
  display:none;align-items:center;gap:8px;
  padding:7px 14px;
  background:rgba(18,0,0,.97);
  border-top:1px solid rgba(140,0,0,.35);
  position:relative;z-index:11;
  animation:bot-edit-in .2s ease;
  flex-shrink:0;
}
#bot-edit-bar.show{display:flex;}
#bot-edit-input{
  flex:1;color:#ffaa88;font-family:'Cairo',sans-serif;font-size:13px;
  background:rgba(30,0,0,.55);
  border:1px solid rgba(140,0,0,.38);
  padding:8px 12px;outline:none;border-radius:2px;direction:rtl;
}
#bot-edit-input:focus{border-color:#cc0000;}
#bot-edit-send{
  background:linear-gradient(135deg,#3d0000,#8b0000,#cc0000);
  border:1px solid rgba(180,0,0,.5);color:#ffddcc;
  font-family:'Cinzel',serif;font-size:11px;letter-spacing:1px;
  padding:8px 14px;cursor:pointer;border-radius:2px;
  transition:all .2s;white-space:nowrap;
}
#bot-edit-send:hover{box-shadow:0 0 16px rgba(180,0,0,.4);}
#bot-edit-cancel{
  background:rgba(30,0,0,.4);border:1px solid rgba(100,0,0,.3);
  color:rgba(200,100,80,.6);font-size:15px;width:30px;height:30px;
  cursor:pointer;border-radius:2px;
  display:flex;align-items:center;justify-content:center;transition:all .2s;
}
#bot-edit-cancel:hover{color:#ff6644;}

#bot-input-area{
  position:relative;z-index:10;
  padding:10px 14px 14px;
  border-top:1px solid rgba(120,0,0,.3);
  background:linear-gradient(0deg,rgba(12,0,0,.98),rgba(6,0,0,.95));
  display:flex;gap:10px;align-items:center;flex-shrink:0;
  margin-bottom:env(safe-area-inset-bottom,0px);
}
#bot-input{
  flex:1;background:rgba(20,0,0,.6);
  border:1px solid rgba(140,0,0,.4);border-top-color:rgba(200,0,0,.55);
  color:#ffccaa;font-family:'Cairo',sans-serif;font-size:14px;
  padding:11px 16px;outline:none;border-radius:2px;direction:rtl;
  transition:border-color .25s,box-shadow .25s;
}
#bot-input:focus{border-color:#cc0000;box-shadow:0 0 16px rgba(150,0,0,.2),inset 0 0 8px rgba(80,0,0,.1);}
#bot-input::placeholder{color:rgba(150,60,40,.4);font-size:12px;letter-spacing:2px;}
#bot-edit-btn{
  background:rgba(30,0,0,.5);border:1px solid rgba(120,0,0,.35);
  color:rgba(200,80,60,.7);font-size:15px;width:44px;height:44px;
  border-radius:2px;cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
#bot-edit-btn:hover{color:#ff6644;border-color:rgba(200,0,0,.6);box-shadow:0 0 14px rgba(180,0,0,.3);}
#bot-send{
  background:linear-gradient(135deg,#3d0000,#8b0000 40%,#cc0000 60%,#8b0000);
  border:1px solid rgba(180,0,0,.5);color:#ffddcc;font-size:18px;
  width:44px;height:44px;border-radius:2px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
#bot-send:hover{box-shadow:0 0 20px rgba(180,0,0,.5);border-color:rgba(220,0,0,.8);}
#bot-send:active{transform:scale(.93);}

#bot-gate-fullscreen{
  position:fixed;inset:0;z-index:600;
  display:none;align-items:center;justify-content:center;
  background:radial-gradient(ellipse 80% 80% at 50% 50%,#1a003a,#0a0018,#000);
}
#bot-gate-fullscreen.show{display:flex;}
#bot-gate-fs-canvas{position:absolute;inset:0;pointer-events:none;}
#bot-gate-fs-inner{
  position:relative;z-index:2;
  display:flex;flex-direction:column;align-items:center;gap:18px;
  width:min(400px,90vw);
}
#bot-gate-fs-icon{font-size:60px;filter:drop-shadow(0 0 30px rgba(150,0,255,.9));animation:bot-sickle-rot 2s ease-in-out infinite;}
#bot-gate-fs-title{
  font-family:'Cinzel Decorative',serif;font-size:clamp(16px,4vw,24px);
  color:#d4a0ff;letter-spacing:4px;text-align:center;
  text-shadow:0 0 30px rgba(150,0,255,.8);
}
#bot-gate-fs-pw{
  width:100%;background:rgba(20,0,40,.6);
  border:1px solid rgba(130,0,200,.5);color:#d4a0ff;
  font-family:'Cinzel',serif;font-size:15px;padding:13px;
  outline:none;border-radius:2px;letter-spacing:6px;text-align:center;direction:ltr;
}
#bot-gate-fs-pw:focus{border-color:#aa00ff;box-shadow:0 0 18px rgba(120,0,200,.3);}
#bot-gate-fs-btn{
  width:100%;
  background:linear-gradient(135deg,#2a0050,#6600aa,#aa00ff,#6600aa,#2a0050);
  border:1px solid rgba(180,0,255,.5);color:#fff;
  font-family:'Cinzel Decorative',serif;font-size:15px;padding:14px;
  letter-spacing:3px;cursor:pointer;border-radius:2px;transition:all .2s;
}
#bot-gate-fs-btn:hover{box-shadow:0 0 30px rgba(150,0,255,.5);}
#bot-gate-fs-close{
  background:rgba(40,0,0,.4);border:1px solid rgba(120,0,0,.4);
  color:rgba(200,100,80,.7);font-family:'Cinzel',serif;
  font-size:11px;padding:8px 20px;cursor:pointer;letter-spacing:2px;
  border-radius:2px;transition:all .2s;
}
#bot-gate-fs-close:hover{color:#ff6644;border-color:rgba(180,0,0,.6);}
#bot-gate-fs-err{font-size:11px;color:#ff3300;letter-spacing:2px;min-height:16px;text-shadow:0 0 8px #cc0000;}

.bot-click-star{
  position:fixed;pointer-events:none;z-index:99999;
  width:34px;height:34px;
  animation:bot-star-pop .5s ease forwards;
}
`;
document.head.appendChild(css);

var html=`
<div id="bot-wrap">
  <div id="bot-bg-grid"></div>
  <div id="bot-bg-radial"></div>
  <canvas id="bot-lightning-layer"></canvas>
  <div id="bot-header">
    <div id="bot-avatar-wrap">
      <img id="bot-avatar" src="https://i.imgur.com/ft33w91.jpg" alt="ذو المنجل">
      <span id="bot-avatar-sickle">🪬</span>
    </div>
    <div id="bot-name-wrap">
      <div id="bot-name">☠ ذو المنجل ☠</div>
      <div id="bot-status"><span id="bot-status-dot"></span> في الخدمة</div>
    </div>
  </div>
  <div id="bot-msgs"></div>
  <div id="bot-edit-bar">
    <button id="bot-edit-cancel">✕</button>
    <input id="bot-edit-input" type="text" placeholder="عدّل نصك..." autocomplete="off">
    <button id="bot-edit-send">✓ إرسال</button>
  </div>
  <div id="bot-input-area">
    <button id="bot-send">⚔</button>
    <input id="bot-input" type="text" placeholder="· · · اكتب رسالتك · · ·" autocomplete="off">
    <button id="bot-edit-btn" title="تعديل قبل الإرسال">✏</button>
  </div>
</div>
<div id="bot-gate-fullscreen">
  <canvas id="bot-gate-fs-canvas"></canvas>
  <div id="bot-gate-fs-inner">
    <div id="bot-gate-fs-icon">🚪</div>
    <div id="bot-gate-fs-title">بوابة الظلام</div>
    <input id="bot-gate-fs-pw" type="password" placeholder="· · · · · · · ·" maxlength="60" autocomplete="off">
    <div id="bot-gate-fs-err"></div>
    <button id="bot-gate-fs-btn">⚔ دخول ⚔</button>
    <button id="bot-gate-fs-close">↩ إغلاق</button>
  </div>
</div>
`;
var tmp=document.createElement('div');
tmp.innerHTML=html;
while(tmp.firstChild)document.body.appendChild(tmp.firstChild);

var msgsEl=document.getElementById('bot-msgs');
var inputEl=document.getElementById('bot-input');
var sendEl=document.getElementById('bot-send');
var editBtn=document.getElementById('bot-edit-btn');
var editBar=document.getElementById('bot-edit-bar');
var editInput=document.getElementById('bot-edit-input');
var editSend=document.getElementById('bot-edit-send');
var editCancel=document.getElementById('bot-edit-cancel');

function spawnStar(cx,cy){
  var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
  svg.setAttribute('viewBox','0 0 34 34');
  svg.classList.add('bot-click-star');
  svg.style.left=cx+'px';svg.style.top=cy+'px';
  function tri(rot){
    var p=document.createElementNS('http://www.w3.org/2000/svg','polygon');
    var cx2=17,cy2=17,r=14,pts=[];
    for(var i=0;i<3;i++){
      var a=(i*120+rot-90)*Math.PI/180;
      pts.push((cx2+Math.cos(a)*r).toFixed(2)+','+(cy2+Math.sin(a)*r).toFixed(2));
    }
    p.setAttribute('points',pts.join(' '));
    p.setAttribute('fill','none');
    p.setAttribute('stroke','#ff0000');
    p.setAttribute('stroke-width','2');
    return p;
  }
  svg.appendChild(tri(0));svg.appendChild(tri(60));
  var circ=document.createElementNS('http://www.w3.org/2000/svg','circle');
  circ.setAttribute('cx','17');circ.setAttribute('cy','17');circ.setAttribute('r','3');
  circ.setAttribute('fill','#ff3300');
  svg.appendChild(circ);
  document.body.appendChild(svg);
  setTimeout(function(){if(svg.parentNode)svg.parentNode.removeChild(svg);},520);
}

document.addEventListener('click',function(e){
  spawnStar(e.clientX,e.clientY);
});

editBtn.addEventListener('click',function(e){
  e.stopPropagation();
  var val=inputEl.value.trim();
  editInput.value=val;
  editBar.classList.add('show');
  editInput.focus();
  if(val)inputEl.value='';
});

editCancel.addEventListener('click',function(e){
  e.stopPropagation();
  editBar.classList.remove('show');
  editInput.value='';
});

editSend.addEventListener('click',function(e){
  e.stopPropagation();
  var val=editInput.value.trim();
  if(!val)return;
  editBar.classList.remove('show');
  editInput.value='';
  dispatchMessage(val);
});

editInput.addEventListener('keydown',function(e){
  if(e.key==='Enter'){editSend.click();}
  if(e.key==='Escape'){editCancel.click();}
});

(function initLightning(){
  var cv=document.getElementById('bot-lightning-layer');
  var ctx=cv.getContext('2d');
  var W,H,bolts=[];
  function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  function spawnBolt(){
    var pts=[],x=Math.random()*W,y=0;
    pts.push({x:x,y:y});
    for(var i=0;i<8;i++){x+=(Math.random()-.5)*100;y+=H/8+Math.random()*30;pts.push({x:x,y:y});}
    return{pts:pts,life:1,decay:.1+Math.random()*.12};
  }
  (function loop(){
    ctx.clearRect(0,0,W,H);
    if(Math.random()<.04)bolts.push(spawnBolt());
    for(var i=bolts.length-1;i>=0;i--){
      var b=bolts[i];
      ctx.beginPath();ctx.moveTo(b.pts[0].x,b.pts[0].y);
      for(var j=1;j<b.pts.length;j++)ctx.lineTo(b.pts[j].x,b.pts[j].y);
      ctx.strokeStyle='rgba(180,0,0,'+b.life*.3+')';
      ctx.lineWidth=1+b.life*1.5;ctx.stroke();
      b.life-=b.decay;if(b.life<=0)bolts.splice(i,1);
    }
    requestAnimationFrame(loop);
  })();
})();

(function initGateLightning(){
  var cv=document.getElementById('bot-gate-fs-canvas');
  var ctx=cv.getContext('2d');
  var W,H,bolts=[],active=false;
  function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  function spawnBolt(){
    var cx=W/2,cy=H*.45,a=-Math.PI/2+(Math.random()-.5)*Math.PI*1.5;
    var pts=[{x:cx,y:cy}],x=cx,y=cy;
    for(var i=0;i<9;i++){x+=Math.cos(a)*25+(Math.random()-.5)*45;y+=Math.sin(a)*25+(Math.random()-.5)*25;pts.push({x:x,y:y});}
    return{pts:pts,life:1,decay:.09+Math.random()*.1};
  }
  window._botGateLightningStart=function(){
    active=true;bolts=[];
    (function loop(){
      if(!active)return;
      ctx.clearRect(0,0,W,H);
      if(Math.random()<.2)bolts.push(spawnBolt());
      for(var i=bolts.length-1;i>=0;i--){
        var b=bolts[i];
        ctx.beginPath();ctx.moveTo(b.pts[0].x,b.pts[0].y);
        for(var j=1;j<b.pts.length;j++)ctx.lineTo(b.pts[j].x,b.pts[j].y);
        ctx.strokeStyle='rgba(180,0,255,'+b.life+')';
        ctx.lineWidth=2+b.life*2;
        ctx.shadowColor='rgba(150,0,255,1)';ctx.shadowBlur=18;
        ctx.stroke();ctx.shadowBlur=0;
        b.life-=b.decay;if(b.life<=0)bolts.splice(i,1);
      }
      requestAnimationFrame(loop);
    })();
  };
  window._botGateLightningStop=function(){
    active=false;if(ctx)ctx.clearRect(0,0,W,H);
  };
})();

function addMsg(role,content,type){
  var wrap=document.createElement('div');
  wrap.className='bot-msg '+(role==='user'?'user':'bot');
  var bubble=document.createElement('div');
  bubble.className='bot-bubble';
  if(type==='dom'&&content instanceof Element){
    bubble.appendChild(content);
  } else if(type==='mini-gate'||content===null&&type==='mini-gate'){
    var gate=document.createElement('div');
    gate.className='bot-mini-gate';
    gate.innerHTML='<span class="bot-mini-gate-icon">🚪</span><span class="bot-mini-gate-text">بوابة الظلام<br>انقر للدخول</span>';
    gate.addEventListener('click',function(){openGateFullscreen();});
    bubble.appendChild(gate);
  } else if(type==='pw-ask'){
    bubble.innerHTML=typeof content==='string'?content:'';
    var pwWrap=document.createElement('div');
    pwWrap.className='bot-pw-input-wrap';
    var pwIn=document.createElement('input');
    pwIn.className='bot-pw-input';pwIn.type='password';pwIn.placeholder='كلمة السر';pwIn.maxLength=60;
    var pwBtn=document.createElement('button');
    pwBtn.className='bot-pw-btn';pwBtn.textContent='✓';
    pwBtn.addEventListener('click',function(){checkPwInBubble(pwIn.value,pwWrap);});
    pwIn.addEventListener('keydown',function(e){if(e.key==='Enter')checkPwInBubble(pwIn.value,pwWrap);});
    pwWrap.appendChild(pwIn);pwWrap.appendChild(pwBtn);
    bubble.appendChild(pwWrap);
    setTimeout(function(){pwIn.focus();},80);
  } else {
    bubble.textContent=typeof content==='string'?content:(content?JSON.stringify(content):'');
  }
  if(role==='bot'){
    var av=document.createElement('img');
    av.className='bot-mini-avatar';
    av.src='https://i.imgur.com/ft33w91.jpg';av.alt='';
    wrap.appendChild(av);
  }
  wrap.appendChild(bubble);
  msgsEl.appendChild(wrap);
  msgsEl.scrollTop=msgsEl.scrollHeight;
}

var GATE_PW='666';

function checkPwInBubble(val,wrap){
  if(val.trim()===GATE_PW){
    wrap.parentElement.textContent='✅ تم التحقق، جاري فتح البوابة...';
    setTimeout(function(){openGateFullscreen(true);},400);
  } else {
    var pwIn=wrap.querySelector('.bot-pw-input');
    if(pwIn){pwIn.style.borderColor='#cc0000';pwIn.style.animation='bot-shake .4s';setTimeout(function(){pwIn.style.animation='';pwIn.style.borderColor='';},500);}
    addMsg('bot','❌ كلمة السر خاطئة.. حاول ثانية');
  }
}

function openGateFullscreen(skipPw){
  var fs=document.getElementById('bot-gate-fullscreen');
  if(!skipPw){
    fs.classList.add('show');
    document.getElementById('bot-gate-fs-pw').value='';
    document.getElementById('bot-gate-fs-err').textContent='';
    document.getElementById('bot-gate-fs-pw').focus();
    window._botGateLightningStart&&window._botGateLightningStart();
    return;
  }
  window._botGateLightningStart&&window._botGateLightningStart();
  fs.classList.add('show');
  setTimeout(function(){
    window._botGateLightningStop&&window._botGateLightningStop();
    fs.classList.remove('show');
    if(window.ADMIN&&typeof window.ADMIN.onGateSuccess==='function'){
      window.ADMIN.onGateSuccess();
    } else {
      addMsg('bot','⚜️ مرحباً بك في مملكة الظلام ⚜️');
    }
  },2200);
}

document.getElementById('bot-gate-fs-btn').addEventListener('click',function(){
  var v=document.getElementById('bot-gate-fs-pw').value.trim();
  var errEl=document.getElementById('bot-gate-fs-err');
  if(v===GATE_PW){
    errEl.textContent='';
    openGateFullscreen(true);
  } else {
    errEl.textContent='✖ كلمة السر خاطئة';
    document.getElementById('bot-gate-fs-pw').style.animation='bot-shake .4s';
    setTimeout(function(){document.getElementById('bot-gate-fs-pw').style.animation='';},500);
  }
});
document.getElementById('bot-gate-fs-close').addEventListener('click',function(){
  document.getElementById('bot-gate-fullscreen').classList.remove('show');
  window._botGateLightningStop&&window._botGateLightningStop();
});
document.getElementById('bot-gate-fs-pw').addEventListener('keydown',function(e){
  if(e.key==='Enter')document.getElementById('bot-gate-fs-btn').click();
});

msgsEl.addEventListener('click',function(e){
  if(e.target.closest('.bot-mini-gate')||e.target.closest('.bot-pw-input-wrap'))return;
  inputEl.focus();
});

function dispatchMessage(t){
  addMsg('user',t);
  var handled=false;
  if(window.ADMIN&&typeof window.ADMIN.handleMessage==='function'){
    handled=ADMIN.handleMessage(t,function(role,content,type){addMsg(role,content,type);});
  }
  if(!handled){
    setTimeout(function(){
      addMsg('bot',ADMIN&&ADMIN.chatResponses?ADMIN.chatResponses.default:'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة');
    },300);
  }
}

function handleSend(){
  var t=inputEl.value.trim();
  if(!t)return;
  inputEl.value='';
  dispatchMessage(t);
}

sendEl.addEventListener('click',handleSend);
inputEl.addEventListener('keydown',function(e){if(e.key==='Enter')handleSend();});

setTimeout(function(){
  var welcome=window.ADMIN&&window.ADMIN.getWelcome?ADMIN.getWelcome():'مرحباً بك ⚡ اكتب «اوامر» للقائمة';
  addMsg('bot',welcome);
},600);

})();
