(function(){
'use strict';

if(!window.BOT_CORE){console.error('ui.js: BOT_CORE missing');return;}
if(window.BOT_UI)return;

var C=window.BOT_CORE;

var CSS=`
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}

@keyframes bot-msg-in{
  from{opacity:0;transform:translateY(12px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes bot-name-thunder{
  0%,100%{text-shadow:0 0 6px #c00,0 0 14px #900}
  50%{text-shadow:0 0 2px #fff,0 0 30px #f00,0 0 60px #c00,0 0 100px #800;filter:brightness(2.5)}
  52%{text-shadow:0 0 6px #c00,0 0 14px #900;filter:brightness(1)}
  54%{text-shadow:0 0 2px #fff,0 0 30px #f00,0 0 60px #c00;filter:brightness(2)}
  56%{text-shadow:0 0 6px #c00,0 0 14px #900;filter:brightness(1)}
}
@keyframes ember-float{
  0%{transform:translateY(0) translateX(0) scale(1);opacity:.9}
  50%{transform:translateY(-28px) translateX(var(--ex,4px)) scale(.7);opacity:.6}
  100%{transform:translateY(-56px) translateX(var(--ex2,8px)) scale(.3);opacity:0}
}
@keyframes typing-dot{
  0%,80%,100%{transform:scale(0);opacity:.4}
  40%{transform:scale(1);opacity:1}
}
@keyframes pulse-red{
  0%,100%{box-shadow:0 0 10px rgba(200,0,0,.3)}
  50%{box-shadow:0 0 28px rgba(255,0,0,.6)}
}
@keyframes ui-sweep{
  0%{left:-100%}100%{left:200%}
}
@keyframes waveform{
  0%,100%{height:4px}
  50%{height:var(--wh,16px)}
}
@keyframes shatter{
  0%{opacity:1;transform:scale(1) rotate(0deg)}
  50%{opacity:.6;transform:scale(1.08) rotate(var(--sr,3deg))}
  100%{opacity:0;transform:scale(.4) rotate(var(--sr2,15deg)) translateY(-30px)}
}

#bot-wrap{
  position:fixed;inset:0;z-index:500;
  display:flex;flex-direction:column;
  background:radial-gradient(ellipse 90% 80% at 50% 5%,#0d0000 0%,#050000 40%,#000 100%);
  font-family:var(--bot-font-main);
  overflow:hidden;
}
#bot-bg-grid{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(180,0,0,.04) 1px,transparent 1px),
    linear-gradient(90deg,rgba(180,0,0,.04) 1px,transparent 1px);
  background-size:36px 36px;
}
#bot-bg-vignette{
  position:absolute;inset:0;pointer-events:none;z-index:1;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,transparent 40%,rgba(0,0,0,.5) 100%);
}

#bot-header{
  position:relative;z-index:10;
  display:flex;align-items:center;gap:14px;
  padding:12px 16px 10px;
  border-bottom:1px solid rgba(180,0,0,.25);
  background:linear-gradient(180deg,rgba(12,0,0,.99),rgba(6,0,0,.97));
  flex-shrink:0;
}
#bot-header::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(200,0,0,.4),transparent);
}
#bot-avatar{
  width:50px;height:50px;border-radius:50%;
  object-fit:cover;
  border:2px solid rgba(180,0,0,.5);
  box-shadow:0 0 18px rgba(150,0,0,.4);
  display:block;flex-shrink:0;
  cursor:pointer;
  transition:box-shadow .3s;
}
#bot-avatar:hover{box-shadow:0 0 30px rgba(220,0,0,.6);}
#bot-name-wrap{flex:1;min-width:0;}
#bot-name{
  font-family:var(--bot-font-title);
  font-size:clamp(14px,3.5vw,19px);
  color:#ff2200;
  animation:bot-name-thunder 1s ease-in-out infinite;
  letter-spacing:2px;line-height:1.2;
  display:inline-flex;align-items:center;gap:6px;
}
#bot-thunder-svg{
  width:1em;height:1em;
  filter:drop-shadow(0 0 4px #f00);
  flex-shrink:0;
}
#bot-status{
  font-size:10px;color:rgba(220,0,0,.55);
  letter-spacing:3px;margin-top:2px;
  display:flex;align-items:center;gap:5px;
}
#bot-status-dot{
  width:6px;height:6px;border-radius:50%;
  background:#cc0000;
  box-shadow:0 0 6px #ff0000;
  animation:pulse-red 1.5s ease-in-out infinite;
  display:inline-block;
}
.bot-header-actions{
  display:flex;gap:6px;align-items:center;flex-shrink:0;
}
.bot-hdr-btn{
  background:rgba(10,0,0,.5);
  border:1px solid rgba(140,0,0,.3);
  color:rgba(220,0,0,.6);
  width:32px;height:32px;border-radius:var(--bot-radius);
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-size:13px;transition:all .2s;
}
.bot-hdr-btn:hover{
  color:#ff2200;border-color:rgba(200,0,0,.6);
  box-shadow:0 0 10px rgba(180,0,0,.3);
}

#bot-msgs{
  flex:1;overflow-y:auto;
  padding:14px 12px 10px;
  display:flex;flex-direction:column;gap:10px;
  position:relative;z-index:10;
  scroll-behavior:smooth;
  overscroll-behavior:contain;
}
#bot-msgs::-webkit-scrollbar{width:3px;}
#bot-msgs::-webkit-scrollbar-thumb{background:rgba(180,0,0,.3);border-radius:2px;}
#bot-msgs::-webkit-scrollbar-track{background:transparent;}

.bot-msg{
  display:flex;align-items:flex-end;gap:8px;
  animation:bot-msg-in .3s ease forwards;
  max-width:90%;position:relative;
}
.bot-msg.user{align-self:flex-start;flex-direction:row-reverse;}
.bot-msg.bot{align-self:flex-end;}

.bot-bubble{
  padding:10px 14px;
  border-radius:var(--bot-radius);
  font-size:clamp(12px,2.5vw,14px);
  line-height:1.75;
  position:relative;
  word-break:break-word;
}
.bot-msg.user .bot-bubble{
  background:var(--bot-surface2);
  border:1px solid rgba(180,0,0,.35);
  border-top:1px solid rgba(220,0,0,.5);
  color:var(--bot-text2);
}
.bot-msg.bot .bot-bubble{
  background:var(--bot-surface);
  border:1px solid var(--bot-border);
  border-top:1px solid rgba(200,0,0,.55);
  color:var(--bot-text);
}
.bot-msg.bot .bot-bubble::before{
  content:'';position:absolute;
  bottom:-1px;right:-6px;
  border:6px solid transparent;
  border-left-color:var(--bot-border);
  border-bottom-color:var(--bot-border);
}

.bot-bubble-text{white-space:pre-wrap;display:block;}

.bot-mini-avatar{
  width:26px;height:26px;border-radius:50%;
  border:1px solid rgba(160,0,0,.4);
  object-fit:cover;flex-shrink:0;
}

.bot-msg-time{
  font-size:9px;color:rgba(180,60,40,.4);
  letter-spacing:1px;margin-top:3px;
  align-self:flex-end;
  white-space:nowrap;
}

.bot-ember-wrap{
  position:absolute;top:0;right:0;left:0;bottom:0;
  pointer-events:none;overflow:visible;
}
.bot-ember{
  position:absolute;width:5px;height:5px;border-radius:50%;
  background:radial-gradient(circle,#ff4400,#cc0000 60%,transparent);
  box-shadow:0 0 6px #ff2200;
  animation:ember-float 1.2s ease-out forwards;
}

.bot-typing{
  display:flex;align-items:center;gap:5px;
  padding:12px 16px;
}
.bot-typing span{
  width:7px;height:7px;border-radius:50%;
  background:#880000;display:inline-block;
  animation:typing-dot .8s ease-in-out infinite;
}
.bot-typing span:nth-child(2){animation-delay:.2s;}
.bot-typing span:nth-child(3){animation-delay:.4s;}

#bot-scroll-btn{
  position:absolute;bottom:10px;left:50%;
  transform:translateX(-50%);
  background:rgba(80,0,0,.85);
  border:1px solid rgba(180,0,0,.5);
  color:#ffaa88;font-size:14px;
  padding:5px 14px;border-radius:20px;
  cursor:pointer;z-index:20;
  display:none;
  font-family:var(--bot-font-sub);
  font-size:10px;letter-spacing:2px;
  transition:all .2s;
}
#bot-scroll-btn:hover{background:rgba(120,0,0,.9);}

#bot-input-area{
  position:relative;z-index:10;
  padding:10px 12px 14px;
  border-top:1px solid rgba(160,0,0,.2);
  background:linear-gradient(0deg,rgba(8,0,0,.99),rgba(4,0,0,.97));
  display:flex;gap:8px;align-items:flex-end;
  flex-shrink:0;
  margin-bottom:env(safe-area-inset-bottom,0px);
}
#bot-input-wrap{flex:1;position:relative;}
#bot-input{
  width:100%;
  background:rgba(10,0,0,.7);
  border:1px solid rgba(160,0,0,.4);
  border-top-color:rgba(200,0,0,.5);
  color:var(--bot-text);
  font-family:var(--bot-font-main);font-size:14px;
  padding:11px 14px;outline:none;
  border-radius:var(--bot-radius);
  direction:rtl;
  transition:border-color .25s,box-shadow .25s;
  resize:none;min-height:44px;max-height:160px;
  overflow-y:auto;line-height:1.6;display:block;
}
#bot-input:focus{
  border-color:#cc0000;
  box-shadow:0 0 16px rgba(160,0,0,.2);
}
#bot-input::placeholder{
  color:rgba(180,0,0,.3);font-size:12px;letter-spacing:2px;
}

.bot-action-btn{
  background:rgba(10,0,0,.6);
  border:1px solid rgba(140,0,0,.35);
  color:rgba(220,0,0,.7);font-size:16px;
  width:42px;height:42px;
  border-radius:var(--bot-radius);
  cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
  position:relative;
}
.bot-action-btn:hover{
  color:#ff2200;
  border-color:rgba(200,0,0,.6);
  box-shadow:0 0 14px rgba(180,0,0,.3);
}
.bot-action-btn:active{transform:scale(.92);}
.bot-action-badge{
  position:absolute;top:-4px;right:-4px;
  width:14px;height:14px;border-radius:50%;
  background:#cc0000;color:#fff;
  font-size:8px;display:flex;
  align-items:center;justify-content:center;
  font-family:var(--bot-font-main);
}

#bot-send{
  background:linear-gradient(135deg,#1a0000,#4d0000 40%,#770000 60%,#4d0000);
  border:1px solid rgba(180,0,0,.5);
  color:#ffaa88;font-size:18px;
  width:42px;height:42px;
  border-radius:var(--bot-radius);
  cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
#bot-send:hover{
  box-shadow:0 0 20px rgba(180,0,0,.5);
  border-color:rgba(220,0,0,.8);
}
#bot-send:active{transform:scale(.92);}

#bot-attach-input{display:none;}

#bot-toast{
  position:fixed;bottom:90px;left:50%;
  transform:translateX(-50%) translateY(20px);
  background:rgba(20,0,0,.95);
  border:1px solid rgba(180,0,0,.5);
  color:#ffaa88;
  font-family:var(--bot-font-sub);
  font-size:11px;letter-spacing:2px;
  padding:8px 18px;border-radius:var(--bot-radius);
  z-index:900;opacity:0;
  transition:opacity .3s,transform .3s;
  pointer-events:none;
  white-space:nowrap;
}
#bot-toast.show{
  opacity:1;transform:translateX(-50%) translateY(0);
}

#bot-modal-overlay{
  position:fixed;inset:0;z-index:850;
  background:rgba(0,0,0,.85);
  display:none;align-items:center;justify-content:center;
}
#bot-modal-overlay.show{display:flex;}
#bot-modal-box{
  background:rgba(8,0,0,.98);
  border:1px solid rgba(180,0,0,.5);
  border-top:2px solid rgba(220,0,0,.7);
  border-radius:var(--bot-radius);
  padding:20px;
  min-width:min(280px,85vw);
  max-width:min(400px,90vw);
  display:flex;flex-direction:column;gap:12px;
}
#bot-modal-title{
  font-family:var(--bot-font-title);
  font-size:13px;color:#ff4422;
  letter-spacing:3px;text-align:center;
}
#bot-modal-body{
  font-family:var(--bot-font-main);
  font-size:13px;color:var(--bot-text);
  line-height:1.7;text-align:center;
  direction:rtl;
}
.bot-modal-btns{
  display:flex;gap:8px;justify-content:center;
  flex-wrap:wrap;
}
.bot-modal-btn{
  background:rgba(15,0,0,.7);
  border:1px solid rgba(140,0,0,.4);
  color:var(--bot-text2);
  font-family:var(--bot-font-sub);
  font-size:10px;letter-spacing:2px;
  padding:8px 16px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;
}
.bot-modal-btn:hover{
  border-color:rgba(220,0,0,.7);
  box-shadow:0 0 12px rgba(180,0,0,.3);
}
.bot-modal-btn.primary{
  background:linear-gradient(135deg,#2a0000,#660000);
  color:#ffddcc;
}
`;

(function(){
  var st=document.createElement('style');
  st.textContent=CSS;
  document.head.appendChild(st);
})();

var HTML=`
<div id="bot-wrap">
  <div id="bot-bg-grid"></div>
  <div id="bot-bg-vignette"></div>

  <div id="bot-header">
    <img id="bot-avatar" src="https://i.imgur.com/ft33w91.jpg" alt="">
    <div id="bot-name-wrap">
      <div id="bot-name">
        <svg id="bot-thunder-svg" viewBox="0 0 14 22" fill="none">
          <polyline points="9,1 3,12 7,12 5,21 11,10 7,10 9,1"
            fill="#ff2200" stroke="#cc0000" stroke-width=".5"/>
        </svg>
        ذو المنجل
      </div>
      <div id="bot-status">
        <span id="bot-status-dot"></span>
        في الخدمة
      </div>
    </div>
    <div class="bot-header-actions">
      <button class="bot-hdr-btn" id="bot-clear-btn" title="مسح المحادثة">🗑</button>
      <button class="bot-hdr-btn" id="bot-search-btn" title="بحث">🔍</button>
    </div>
  </div>

  <div id="bot-msgs" style="position:relative;">
    <button id="bot-scroll-btn">▼ رسائل جديدة</button>
  </div>

  <div id="bot-input-area">
    <button id="bot-send" title="إرسال">⚔</button>
    <div id="bot-input-wrap">
      <textarea id="bot-input"
        placeholder="· · · اكتب رسالتك · · ·"
        rows="1" autocomplete="off"
        spellcheck="false"></textarea>
    </div>
    <button class="bot-action-btn" id="bot-code-btn" title="محرر كود">⌨</button>
    <button class="bot-action-btn" id="bot-attach-btn" title="إرفاق ملف">📎</button>
    <input id="bot-attach-input" type="file" multiple
      accept="image/*,video/*,audio/*,
              .pdf,.apk,.html,.htm,
              .glb,.gltf,.fbx,.obj,.stl,.ply,.dae,.3ds,
              .zip,.rar,.7z,.tar,.gz,
              .js,.ts,.json,.txt,.md,.csv,.log,
              .doc,.docx,.xls,.xlsx,.ppt,.pptx,
              .exe,.msi,.dmg,.deb,.ipa,
              .ttf,.otf,.woff,.woff2,
              */*">
  </div>
</div>

<div id="bot-toast"></div>
<div id="bot-modal-overlay">
  <div id="bot-modal-box">
    <div id="bot-modal-title"></div>
    <div id="bot-modal-body"></div>
    <div class="bot-modal-btns" id="bot-modal-btns"></div>
  </div>
</div>
`;

(function(){
  var tmp=document.createElement('div');
  tmp.innerHTML=HTML;
  while(tmp.firstChild)document.body.appendChild(tmp.firstChild);
})();

var msgsEl=document.getElementById('bot-msgs');
var inputEl=document.getElementById('bot-input');
var sendEl=document.getElementById('bot-send');
var scrollBtn=document.getElementById('bot-scroll-btn');
var toastEl=document.getElementById('bot-toast');

var _autoScroll=true;
var _toastTimer=null;

(function initThunder(){
  var svg=document.getElementById('bot-thunder-svg');
  if(!svg)return;
  setInterval(function(){
    svg.style.filter='drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #f00) brightness(3)';
    svg.style.transform='scaleY(1.15)';
    setTimeout(function(){
      svg.style.filter='drop-shadow(0 0 4px #f00)';
      svg.style.transform='scaleY(1)';
    },120);
  },1000);
})();

inputEl.addEventListener('input',function(){
  this.style.height='auto';
  this.style.height=Math.min(this.scrollHeight,160)+'px';
});

msgsEl.addEventListener('scroll',function(){
  var atBottom=(msgsEl.scrollHeight-msgsEl.scrollTop-msgsEl.clientHeight)<60;
  _autoScroll=atBottom;
  scrollBtn.style.display=atBottom?'none':'block';
});

scrollBtn.addEventListener('click',function(){
  msgsEl.scrollTop=msgsEl.scrollHeight;
  _autoScroll=true;
  scrollBtn.style.display='none';
});

function scrollToBottom(force){
  if(_autoScroll||force){
    msgsEl.scrollTop=msgsEl.scrollHeight;
  }
}

function spawnEmbers(wrapEl){
  for(var i=0;i<6;i++){
    (function(idx){
      setTimeout(function(){
        var e=document.createElement('div');
        e.className='bot-ember';
        e.style.setProperty('--ex',(Math.random()-.5)*50+'px');
        e.style.setProperty('--ex2',(Math.random()-.5)*70+'px');
        e.style.left=(20+Math.random()*60)+'%';
        e.style.bottom='0';
        e.style.animationDuration=(0.8+Math.random()*.7)+'s';
        wrapEl.appendChild(e);
        setTimeout(function(){
          if(e.parentNode)e.parentNode.removeChild(e);
        },1500);
      },idx*90);
    })(i);
  }
}

function typeText(el,text,done){
  var i=0;
  el.textContent='';
  function next(){
    if(i<text.length){
      el.textContent+=text[i++];
      scrollToBottom();
      setTimeout(next,16+Math.random()*10);
    } else {
      if(typeof done==='function')done();
    }
  }
  next();
}

function getTimeStr(){
  var d=new Date();
  var h=d.getHours(),m=d.getMinutes();
  return (h<10?'0':'')+h+':'+(m<10?'0':'')+m;
}

function addMsg(role,content,type,opts){
  type=type||'text';

  var wrap=document.createElement('div');
  wrap.className='bot-msg '+(role==='user'?'user':'bot');
  wrap.dataset.id=C.uuid();
  wrap.dataset.time=Date.now();

  var bubble=document.createElement('div');
  bubble.className='bot-bubble';

  if(role==='bot'){
    var ew=document.createElement('div');
    ew.className='bot-ember-wrap';
    bubble.appendChild(ew);
    setTimeout(function(){spawnEmbers(ew);},80);
  }

  var inner=buildContent(content,type,opts);
  if(inner)bubble.appendChild(inner);

  var timeEl=document.createElement('div');
  timeEl.className='bot-msg-time';
  timeEl.textContent=getTimeStr();

  if(role==='bot'){
    var av=document.createElement('img');
    av.className='bot-mini-avatar';
    av.src='https://i.imgur.com/ft33w91.jpg';
    av.alt='';
    wrap.appendChild(av);
  }

  wrap.appendChild(bubble);
  wrap.appendChild(timeEl);

  enableLongPress(wrap);

  msgsEl.appendChild(wrap);
  scrollToBottom();

  if(role==='bot'&&type==='text'&&typeof content==='string'){
    typeText(inner,content,function(){
      C.emit('tts:speak',{text:content});
    });
  }

  C.history.add(role,content,type);
  C.emit('msg:added',{role:role,content:content,type:type,el:wrap});

  return bubble;
}

function enableLongPress(wrap){
  var timer=null;
  var startY=0;

  function start(e){
    startY=e.touches?e.touches[0].clientY:e.clientY;
    timer=setTimeout(function(){showMsgMenu(wrap);},600);
  }
  function cancel(){clearTimeout(timer);}
  function move(e){
    var y=e.touches?e.touches[0].clientY:e.clientY;
    if(Math.abs(y-startY)>10)cancel();
  }

  wrap.addEventListener('touchstart',start,{passive:true});
  wrap.addEventListener('touchend',cancel);
  wrap.addEventListener('touchmove',move,{passive:true});
  wrap.addEventListener('contextmenu',function(e){
    e.preventDefault();showMsgMenu(wrap);
  });
}

function showMsgMenu(wrap){
  showModal('خيارات الرسالة','',[ 
    {label:'📋 نسخ',fn:function(){
      var txt=wrap.querySelector('.bot-bubble-text');
      if(txt&&navigator.clipboard)navigator.clipboard.writeText(txt.textContent);
      toast('تم النسخ ✓');
    }},
    {label:'🗑 حذف',fn:function(){
      wrap.style.animation='shatter .4s ease forwards';
      wrap.style.setProperty('--sr',(Math.random()*6-3)+'deg');
      wrap.style.setProperty('--sr2',(Math.random()*20-10)+'deg');
      setTimeout(function(){if(wrap.parentNode)wrap.parentNode.removeChild(wrap);},400);
    }},
    {label:'✕ إلغاء',fn:null}
  ]);
}

function buildContent(content,type,opts){
  type=type||'text';

  if(type==='text'){
    var s=document.createElement('span');
    s.className='bot-bubble-text';
    if(typeof content==='string')s.textContent=content;
    return s;
  }

  if(type==='dom'&&content instanceof Element)return content;

  var UI=window.BOT_UI;
  var MEDIA=window.BOT_MEDIA;
  var FILES=window.BOT_FILES;

  if(type==='image'&&MEDIA)return MEDIA.buildImage(content);
  if(type==='album'&&MEDIA)return MEDIA.buildAlbum(content);
  if(type==='video'&&MEDIA)return MEDIA.buildVideo(content,opts);
  if(type==='audio'&&MEDIA)return MEDIA.buildAudio(content,opts);
  if(type==='pdf'&&FILES)return FILES.buildPDF(content,opts);
  if(type==='html'&&FILES)return FILES.buildHTML(content,opts);
  if((type==='glb'||type==='3d')&&FILES)return FILES.build3D(content,opts);
  if((type==='apk'||type==='app')&&FILES)return FILES.buildAPK(content,opts);
  if((type==='archive')&&FILES)return FILES.buildArchive(content,opts);
  if((type==='office')&&FILES)return FILES.buildOffice(content,opts);
  if((type==='js'||type==='json'||type==='code'||type==='txt')&&FILES)return FILES.buildTextFile(content,opts);
  if(type==='file'&&FILES)return FILES.buildFile(content,opts);
  if(type==='gate')return buildGateInline(content);
  if(type==='webpage')return buildWebpageCard(content);

  var fallback=document.createElement('span');
  fallback.className='bot-bubble-text';
  fallback.textContent=typeof content==='string'?content:JSON.stringify(content);
  return fallback;
}

function buildGateInline(data){
  data=data||{};
  var w=document.createElement('div');
  w.style.cssText='display:inline-flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(12,0,0,.97);border:1px solid rgba(180,0,0,.5);border-top:2px solid rgba(255,30,0,.7);border-radius:var(--bot-radius);cursor:pointer;min-width:180px;transition:all .2s;';
  w.innerHTML='<span style="font-size:20px;">🔥</span><div><div style="font-family:Cinzel,serif;font-size:11px;color:#ff4422;letter-spacing:2px;">'+(data.label||'بوابة')+'</div><div style="font-size:9px;color:rgba(255,80,0,.45);letter-spacing:2px;margin-top:2px;">انقر للدخول</div></div>';
  w.addEventListener('click',function(){
    C.emit('gate:open',data);
  });
  return w;
}

function buildWebpageCard(item){
  var w=document.createElement('div');
  w.style.cssText='display:inline-flex;align-items:center;gap:10px;padding:10px 14px;min-width:180px;background:rgba(8,0,0,.9);border:1px solid rgba(120,0,0,.4);border-top:2px solid rgba(200,0,0,.6);border-radius:var(--bot-radius);cursor:pointer;transition:all .2s;';
  var ic=document.createElement('span');ic.style.fontSize='20px';ic.textContent='🌐';
  var info=document.createElement('div');
  var nm=document.createElement('div');nm.style.cssText='font-size:12px;color:#ffaa88;';nm.textContent=item.name||'صفحة';
  var pt=document.createElement('div');pt.style.cssText='font-size:10px;color:rgba(200,80,60,.45);margin-top:2px;word-break:break-all;';pt.textContent=item.path||item.url||'';
  info.appendChild(nm);info.appendChild(pt);
  w.appendChild(ic);w.appendChild(info);
  w.addEventListener('click',function(){
    var url=item.path||item.url||'';
    window.open(url,'_blank');
  });
  return w;
}

function addTypingIndicator(){
  var wrap=document.createElement('div');
  wrap.className='bot-msg bot';
  wrap.id='bot-typing-indicator';
  var av=document.createElement('img');
  av.className='bot-mini-avatar';
  av.src='https://i.imgur.com/ft33w91.jpg';av.alt='';
  var bubble=document.createElement('div');
  bubble.className='bot-bubble';
  var typing=document.createElement('div');
  typing.className='bot-typing';
  typing.innerHTML='<span></span><span></span><span></span>';
  bubble.appendChild(typing);
  wrap.appendChild(av);
  wrap.appendChild(bubble);
  msgsEl.appendChild(wrap);
  scrollToBottom(true);
  return wrap;
}

function removeTypingIndicator(){
  var el=document.getElementById('bot-typing-indicator');
  if(el)el.remove();
}

function toast(msg,duration){
  clearTimeout(_toastTimer);
  toastEl.textContent=msg;
  toastEl.classList.add('show');
  _toastTimer=setTimeout(function(){
    toastEl.classList.remove('show');
  },duration||2200);
}

function showModal(title,body,btns){
  document.getElementById('bot-modal-title').textContent=title||'';
  document.getElementById('bot-modal-body').textContent=body||'';
  var btnWrap=document.getElementById('bot-modal-btns');
  btnWrap.innerHTML='';
  (btns||[]).forEach(function(b){
    var btn=document.createElement('button');
    btn.className='bot-modal-btn'+(b.primary?' primary':'');
    btn.textContent=b.label||'';
    btn.addEventListener('click',function(){
      hideModal();
      if(b.fn)b.fn();
    });
    btnWrap.appendChild(btn);
  });
  document.getElementById('bot-modal-overlay').classList.add('show');
}

function hideModal(){
  document.getElementById('bot-modal-overlay').classList.remove('show');
}

document.getElementById('bot-modal-overlay').addEventListener('click',function(e){
  if(e.target===this)hideModal();
});

document.getElementById('bot-clear-btn').addEventListener('click',function(){
  showModal('مسح المحادثة','هل تريد مسح جميع الرسائل؟',[
    {label:'✓ نعم',primary:true,fn:function(){
      msgsEl.innerHTML='<button id="bot-scroll-btn" style="display:none;">▼ رسائل جديدة</button>';
      scrollBtn=document.getElementById('bot-scroll-btn');
      C.history.clear();
      toast('تم مسح المحادثة');
    }},
    {label:'✕ لا',fn:null}
  ]);
});

document.getElementById('bot-search-btn').addEventListener('click',function(){
  var q=prompt('🔍 ابحث في المحادثة:');
  if(!q)return;
  var found=C.history.get().filter(function(m){
    return typeof m.content==='string'&&m.content.includes(q);
  });
  toast(found.length?('وُجد '+found.length+' نتيجة'):'لا توجد نتائج');
});

inputEl.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&!e.shiftKey){
    e.preventDefault();
    C.emit('input:send',{text:this.value.trim()});
    this.value='';
    this.style.height='auto';
  }
});

sendEl.addEventListener('click',function(){
  var t=inputEl.value.trim();
  if(!t)return;
  C.emit('input:send',{text:t});
  inputEl.value='';
  inputEl.style.height='auto';
});

document.getElementById('bot-attach-btn').addEventListener('click',function(){
  document.getElementById('bot-attach-input').click();
});

document.getElementById('bot-attach-input').addEventListener('change',function(){
  var files=Array.from(this.files||[]);
  files.forEach(function(f){
    C.emit('file:attached',{file:f});
  });
  this.value='';
});

document.getElementById('bot-code-btn').addEventListener('click',function(){
  C.emit('editor:open',{value:inputEl.value});
});

window.BOT_UI={
  addMsg:addMsg,
  addTypingIndicator:addTypingIndicator,
  removeTypingIndicator:removeTypingIndicator,
  toast:toast,
  showModal:showModal,
  hideModal:hideModal,
  scrollToBottom:scrollToBottom,
  buildContent:buildContent,
  typeText:typeText,
  spawnEmbers:spawnEmbers,
  msgsEl:msgsEl,
  inputEl:inputEl
};

C.registerModule('ui',window.BOT_UI);
C.emit('ui:ready',{});

})();
