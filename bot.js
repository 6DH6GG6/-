(function(){
'use strict';
if(document.getElementById('bot-wrap'))return;

var lnk=document.createElement('link');
lnk.rel='stylesheet';
lnk.href='https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;900&family=Cairo:wght@300;400;700;900&display=swap';
document.head.appendChild(lnk);

var css=document.createElement('style');
css.textContent=`
@keyframes bot-msg-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes bot-name-thunder{
  0%,100%{text-shadow:0 0 6px #00ff88,0 0 14px #00cc66}
  48%{text-shadow:0 0 6px #00ff88,0 0 14px #00cc66}
  50%{text-shadow:0 0 2px #fff,0 0 30px #00ff88,0 0 60px #00ff44,0 0 100px #00ff22;filter:brightness(2.5)}
  52%{text-shadow:0 0 6px #00ff88,0 0 14px #00cc66;filter:brightness(1)}
  54%{text-shadow:0 0 2px #fff,0 0 30px #00ff88,0 0 60px #00ff44;filter:brightness(2)}
  56%{text-shadow:0 0 6px #00ff88,0 0 14px #00cc66;filter:brightness(1)}
}
@keyframes bolt-strike{
  0%{opacity:0;transform:scaleY(0);transform-origin:top center}
  10%{opacity:1;transform:scaleY(1)}
  30%{opacity:.8}
  60%{opacity:.3}
  100%{opacity:0;transform:scaleY(1.1)}
}
@keyframes ember-float{
  0%{transform:translateY(0) translateX(0) scale(1);opacity:.9}
  50%{transform:translateY(-28px) translateX(var(--ex,4px)) scale(.7);opacity:.6}
  100%{transform:translateY(-56px) translateX(var(--ex2,8px)) scale(.3);opacity:0}
}
@keyframes bot-status-pulse{0%,100%{opacity:.7}50%{opacity:1}}
@keyframes media-panel-in{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
@keyframes img-panel-in{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
@keyframes bot-edit-in{from{opacity:0;transform:scaleY(.85)}to{opacity:1;transform:scaleY(1)}}
@keyframes red-gate-pulse{
  0%,100%{box-shadow:0 0 12px rgba(200,0,0,.4),inset 0 0 8px rgba(180,0,0,.2)}
  50%{box-shadow:0 0 28px rgba(255,0,0,.7),inset 0 0 16px rgba(200,0,0,.35)}
}
@keyframes green-blog-glow{
  0%,100%{box-shadow:0 0 8px rgba(0,200,80,.2)}
  50%{box-shadow:0 0 20px rgba(0,255,100,.4)}
}

#bot-wrap{
  position:fixed;inset:0;z-index:500;
  display:flex;flex-direction:column;
  background:#000;
  font-family:'Cairo',sans-serif;
  overflow:hidden;
}
#bot-bg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(40,0,0,.6),rgba(0,0,0,1) 80%);
  pointer-events:none;z-index:0;
}

/* ── هيدر ── */
#bot-header{
  position:relative;z-index:10;
  display:flex;align-items:center;gap:14px;
  padding:14px 18px 10px;
  border-bottom:1px solid rgba(0,180,60,.2);
  background:linear-gradient(180deg,rgba(0,10,0,.98),rgba(0,5,0,.95));
  flex-shrink:0;
}
#bot-avatar-wrap{position:relative;flex-shrink:0;}
#bot-avatar{
  width:52px;height:52px;border-radius:50%;
  object-fit:cover;border:2px solid rgba(0,180,60,.5);
  box-shadow:0 0 18px rgba(0,150,50,.4);
  display:block;
}
#bot-name-wrap{flex:1;position:relative;}
#bot-name{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(15px,3.5vw,20px);
  color:#00ff88;
  animation:bot-name-thunder 1s ease-in-out infinite;
  letter-spacing:2px;line-height:1.2;
  position:relative;display:inline-block;
}
#bot-thunder-wrap{
  display:inline-flex;align-items:center;
  position:relative;margin-right:6px;vertical-align:middle;
}
.bot-thunder-svg{
  width:1em;height:1em;
  display:inline-block;vertical-align:middle;
  filter:drop-shadow(0 0 4px #00ff88);
}
#bot-status{
  font-size:10px;color:rgba(0,200,80,.6);
  letter-spacing:3px;margin-top:2px;
  animation:bot-status-pulse 2s ease-in-out infinite;
}

/* ── منطقة الرسائل ── */
#bot-msgs{
  flex:1;overflow-y:auto;
  padding:14px 14px 10px;
  display:flex;flex-direction:column;gap:10px;
  position:relative;z-index:10;
  scroll-behavior:smooth;
}
#bot-msgs::-webkit-scrollbar{width:3px;}
#bot-msgs::-webkit-scrollbar-track{background:rgba(0,20,0,.2);}
#bot-msgs::-webkit-scrollbar-thumb{background:rgba(0,150,50,.3);border-radius:2px;}

/* ── فقاعات ── */
.bot-msg{
  display:flex;align-items:flex-end;gap:8px;
  animation:bot-msg-in .3s ease forwards;
  max-width:88%;position:relative;
}
.bot-msg.user{align-self:flex-start;flex-direction:row-reverse;}
.bot-msg.bot{align-self:flex-end;}
.bot-bubble{
  padding:10px 14px;border-radius:4px;
  font-size:clamp(12px,2.5vw,14px);line-height:1.7;
  position:relative;word-break:break-word;white-space:pre-wrap;
}
.bot-msg.user .bot-bubble{
  background:linear-gradient(135deg,rgba(0,20,5,.95),rgba(0,10,2,.98));
  border:1px solid rgba(0,150,50,.35);border-top-color:rgba(0,200,70,.5);
  color:#aaffcc;border-radius:4px 0 4px 4px;
}
.bot-msg.bot .bot-bubble{
  background:linear-gradient(135deg,rgba(5,0,0,.97),rgba(2,0,0,.99));
  border:1px solid rgba(150,0,0,.4);border-top-color:rgba(220,0,0,.55);
  color:#ffccaa;border-radius:0 4px 4px 4px;
}
.bot-bubble::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(0,200,60,.3),transparent);
}
.bot-msg.bot .bot-bubble::before{
  background:linear-gradient(90deg,transparent,rgba(200,0,0,.3),transparent);
}
.bot-mini-avatar{
  width:26px;height:26px;border-radius:50%;
  border:1px solid rgba(0,150,50,.4);object-fit:cover;flex-shrink:0;opacity:.8;
}

/* ── جمر يظهر مع رسائل البوت ── */
.bot-ember-wrap{
  position:absolute;top:0;right:0;left:0;bottom:0;
  pointer-events:none;overflow:visible;
}
.bot-ember{
  position:absolute;
  width:5px;height:5px;border-radius:50%;
  background:radial-gradient(circle,#ff6600,#ff2200 60%,transparent);
  box-shadow:0 0 6px #ff4400;
  animation:ember-float 1.2s ease-out forwards;
}

/* ── مدونة خضراء ── */
.bot-blog{
  background:linear-gradient(135deg,rgba(0,30,10,.97),rgba(0,15,5,.99));
  border:1px solid rgba(0,180,60,.35);border-top:2px solid rgba(0,220,80,.6);
  border-radius:4px;padding:12px 14px;
  color:#aaffcc;font-size:13px;line-height:1.8;
  animation:green-blog-glow 3s ease-in-out infinite;
  position:relative;overflow:hidden;
}
.bot-blog::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,#00ff88,transparent);
}
.bot-blog-title{
  font-family:'Cinzel',serif;font-size:12px;
  color:#00ff88;letter-spacing:3px;margin-bottom:8px;
  border-bottom:1px solid rgba(0,200,60,.2);padding-bottom:6px;
}

/* ── وبوابة حمراء ── */
.bot-red-gate{
  display:inline-flex;align-items:center;justify-content:center;
  min-width:160px;padding:12px 20px;
  background:linear-gradient(135deg,rgba(20,0,0,.97),rgba(8,0,0,.99));
  border:1px solid rgba(180,0,0,.5);border-top:2px solid rgba(255,0,0,.7);
  border-radius:3px;cursor:pointer;position:relative;overflow:hidden;
  animation:red-gate-pulse 2s ease-in-out infinite;
  gap:10px;transition:all .25s;
}
.bot-red-gate:hover{border-color:rgba(255,50,50,.9);transform:scale(1.03);}
.bot-red-gate-icon{font-size:22px;}
.bot-red-gate-text{
  font-family:'Cinzel',serif;font-size:11px;
  color:rgba(255,150,120,.9);letter-spacing:2px;line-height:1.5;text-align:center;
}

/* ── صور ── */
.bot-img-wrap{position:relative;display:inline-block;cursor:pointer;}
.bot-img-wrap img{
  max-width:220px;max-height:180px;
  border-radius:4px;border:1px solid rgba(150,0,0,.4);
  display:block;transition:transform .2s;
}
.bot-img-wrap:hover img{transform:scale(1.02);}
.bot-img-overlay{
  position:absolute;inset:0;border-radius:4px;
  background:rgba(0,0,0,.0);transition:background .2s;
  display:flex;align-items:center;justify-content:center;
}
.bot-img-wrap:hover .bot-img-overlay{background:rgba(0,0,0,.35);}
.bot-img-overlay-icon{font-size:22px;opacity:0;transition:opacity .2s;}
.bot-img-wrap:hover .bot-img-overlay-icon{opacity:1;}

/* ── فيديو/صوت ── */
.bot-media-wrap{
  position:relative;display:inline-block;
  border-radius:4px;overflow:hidden;
  border:1px solid rgba(150,0,0,.4);
  cursor:pointer;
}
.bot-media-wrap video,.bot-media-wrap audio{
  display:block;max-width:260px;pointer-events:none;
}
.bot-media-overlay{
  position:absolute;inset:0;
  background:rgba(0,0,0,.25);
  display:flex;align-items:center;justify-content:center;
  gap:8px;
}
.bot-media-play-btn{
  width:44px;height:44px;border-radius:50%;
  background:rgba(200,0,0,.8);border:2px solid rgba(255,100,80,.6);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;cursor:pointer;transition:all .2s;
}
.bot-media-play-btn:hover{background:rgba(255,0,0,.9);transform:scale(1.1);}

/* ── ملف/تطبيق ── */
.bot-file-card{
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 14px;
  background:rgba(10,0,0,.8);
  border:1px solid rgba(120,0,0,.4);border-right:3px solid rgba(200,0,0,.6);
  border-radius:3px;cursor:pointer;transition:all .2s;min-width:180px;
}
.bot-file-card:hover{border-right-color:#ff4400;background:rgba(20,0,0,.9);}
.bot-file-icon{font-size:22px;}
.bot-file-info{display:flex;flex-direction:column;gap:2px;}
.bot-file-name{font-family:'Cairo',sans-serif;font-size:12px;color:#ffaa88;}
.bot-file-meta{font-size:10px;color:rgba(200,100,80,.5);letter-spacing:1px;}

/* ── ألبوم ── */
.bot-album{display:flex;flex-wrap:wrap;gap:5px;max-width:240px;}
.bot-album img{
  width:72px;height:72px;object-fit:cover;
  border-radius:3px;border:1px solid rgba(140,0,0,.4);
  cursor:pointer;transition:transform .15s;
}
.bot-album img:hover{transform:scale(1.05);}

/* ── شريط التعديل ── */
#bot-edit-bar{
  display:none;align-items:center;gap:8px;
  padding:7px 14px;
  background:rgba(0,8,2,.97);
  border-top:1px solid rgba(0,150,50,.25);
  position:relative;z-index:11;
  animation:bot-edit-in .2s ease;flex-shrink:0;
}
#bot-edit-bar.show{display:flex;}
#bot-edit-input{
  flex:1;color:#aaffcc;font-family:'Cairo',sans-serif;font-size:13px;
  background:rgba(0,20,5,.55);
  border:1px solid rgba(0,140,50,.35);
  padding:8px 12px;outline:none;border-radius:2px;direction:rtl;
}
#bot-edit-input:focus{border-color:#00cc55;}
#bot-edit-send{
  background:linear-gradient(135deg,#001a05,#004d15,#00aa33);
  border:1px solid rgba(0,180,50,.5);color:#aaffcc;
  font-family:'Cinzel',serif;font-size:11px;letter-spacing:1px;
  padding:8px 14px;cursor:pointer;border-radius:2px;transition:all .2s;white-space:nowrap;
}
#bot-edit-send:hover{box-shadow:0 0 16px rgba(0,180,50,.4);}
#bot-edit-cancel{
  background:rgba(0,20,5,.4);border:1px solid rgba(0,100,30,.3);
  color:rgba(0,200,80,.5);font-size:15px;width:30px;height:30px;
  cursor:pointer;border-radius:2px;
  display:flex;align-items:center;justify-content:center;transition:all .2s;
}
#bot-edit-cancel:hover{color:#00ff88;}

/* ── حقل الإدخال ── */
#bot-input-area{
  position:relative;z-index:10;
  padding:10px 14px 14px;
  border-top:1px solid rgba(0,120,40,.2);
  background:linear-gradient(0deg,rgba(0,8,2,.98),rgba(0,4,1,.95));
  display:flex;gap:8px;align-items:center;flex-shrink:0;
  margin-bottom:env(safe-area-inset-bottom,0px);
}
#bot-input{
  flex:1;background:rgba(0,15,4,.6);
  border:1px solid rgba(0,140,50,.35);border-top-color:rgba(0,200,70,.45);
  color:#aaffcc;font-family:'Cairo',sans-serif;font-size:14px;
  padding:11px 14px;outline:none;border-radius:2px;direction:rtl;
  transition:border-color .25s,box-shadow .25s;
}
#bot-input:focus{border-color:#00aa44;box-shadow:0 0 16px rgba(0,150,50,.2),inset 0 0 8px rgba(0,60,20,.1);}
#bot-input::placeholder{color:rgba(0,160,60,.35);font-size:12px;letter-spacing:2px;}

/* ازرار الحقل */
.bot-action-btn{
  background:rgba(0,15,4,.5);border:1px solid rgba(0,120,40,.3);
  color:rgba(0,200,80,.7);font-size:16px;
  width:42px;height:42px;border-radius:2px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;position:relative;
}
.bot-action-btn:hover{color:#00ff88;border-color:rgba(0,200,70,.6);box-shadow:0 0 14px rgba(0,180,50,.3);}
.bot-action-btn:active{transform:scale(.92);}
#bot-send{
  background:linear-gradient(135deg,#001a05,#004d15 40%,#007722 60%,#004d15);
  border:1px solid rgba(0,180,50,.5);color:#aaffcc;font-size:18px;
  width:42px;height:42px;border-radius:2px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
#bot-send:hover{box-shadow:0 0 20px rgba(0,180,50,.5);border-color:rgba(0,220,80,.8);}
#bot-send:active{transform:scale(.93);}
#bot-img-input{display:none;}

/* ── لوحة الصورة الكاملة ── */
#bot-img-viewer{
  position:fixed;inset:0;z-index:800;
  background:rgba(0,0,0,.96);
  display:none;flex-direction:column;align-items:center;justify-content:center;
  animation:img-panel-in .3s ease;
}
#bot-img-viewer.show{display:flex;}
#bot-img-viewer-img{
  max-width:95vw;max-height:75vh;
  border-radius:4px;border:1px solid rgba(0,180,60,.3);
  object-fit:contain;
  transition:transform .3s,filter .3s;
  cursor:crosshair;
}
#bot-img-viewer-canvas{
  position:absolute;top:0;left:0;
  display:none;cursor:crosshair;
}
#bot-img-viewer-tools{
  display:flex;gap:8px;flex-wrap:wrap;justify-content:center;
  padding:14px;position:relative;z-index:2;
}
.img-tool-btn{
  background:rgba(0,20,5,.8);border:1px solid rgba(0,150,50,.4);
  color:#aaffcc;font-family:'Cinzel',serif;font-size:10px;
  padding:7px 13px;letter-spacing:2px;cursor:pointer;border-radius:2px;
  transition:all .2s;white-space:nowrap;
}
.img-tool-btn:hover{border-color:rgba(0,220,80,.7);box-shadow:0 0 12px rgba(0,180,50,.3);}
.img-tool-btn.active{background:rgba(0,100,30,.5);border-color:#00ff88;color:#00ff88;}

/* ── لوحة الميديا ── */
#bot-media-panel{
  position:fixed;inset:0;z-index:800;
  background:rgba(0,0,0,.97);
  display:none;flex-direction:column;
  animation:media-panel-in .3s ease;
}
#bot-media-panel.show{display:flex;}
#bot-media-panel-body{
  flex:1;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
#bot-media-panel video,#bot-media-panel audio{
  max-width:95vw;max-height:70vh;outline:none;
  border:1px solid rgba(0,150,50,.3);border-radius:4px;
}
#bot-media-panel audio{width:90vw;max-width:500px;}
#bot-media-controls{
  padding:12px 16px 18px;
  background:rgba(0,8,2,.99);
  border-top:1px solid rgba(0,150,50,.2);
  display:flex;flex-direction:column;gap:10px;flex-shrink:0;
}
.media-ctrl-row{display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap;}
.media-ctrl-btn{
  background:rgba(0,15,4,.7);border:1px solid rgba(0,130,45,.35);
  color:#aaffcc;font-size:12px;padding:7px 13px;
  border-radius:2px;cursor:pointer;transition:all .2s;
  font-family:'Cinzel',serif;letter-spacing:1px;white-space:nowrap;
}
.media-ctrl-btn:hover{border-color:rgba(0,220,80,.6);box-shadow:0 0 10px rgba(0,180,50,.3);}
.media-ctrl-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}
.media-ctrl-btn.danger:hover{border-color:rgba(255,0,0,.7);}
#media-seek{
  width:100%;accent-color:#00ff88;
  height:4px;cursor:pointer;border-radius:2px;
}
#media-speed-label,#media-quality-label{
  font-family:'Cinzel',serif;font-size:10px;
  color:rgba(0,200,60,.6);letter-spacing:2px;
}

/* ── overlay تعديل الصورة بالرسم ── */
#bot-draw-panel{
  position:fixed;inset:0;z-index:900;
  background:#000;display:none;flex-direction:column;
}
#bot-draw-panel.show{display:flex;}
#bot-draw-canvas{display:block;flex:1;cursor:crosshair;touch-action:none;}
#bot-draw-tools{
  padding:10px 14px;background:rgba(0,8,2,.99);
  border-top:1px solid rgba(0,150,50,.2);
  display:flex;gap:8px;flex-wrap:wrap;align-items:center;justify-content:center;
}
#bot-draw-text-input{
  background:rgba(0,20,5,.6);border:1px solid rgba(0,140,50,.35);
  color:#aaffcc;font-family:'Cairo',sans-serif;font-size:13px;
  padding:6px 10px;border-radius:2px;outline:none;
  direction:rtl;width:140px;
}
#bot-color-pick{
  width:34px;height:34px;border-radius:2px;
  border:1px solid rgba(0,150,50,.4);cursor:pointer;
  background:transparent;padding:2px;
}
</style>
`;
document.head.appendChild(css);

var html=`
<div id="bot-wrap">
  <div id="bot-bg"></div>
  <div id="bot-header">
    <div id="bot-avatar-wrap">
      <img id="bot-avatar" src="https://i.imgur.com/ft33w91.jpg" alt="ذو المنجل">
    </div>
    <div id="bot-name-wrap">
      <div id="bot-name">
        <span id="bot-thunder-wrap" aria-hidden="true">
          <svg class="bot-thunder-svg" id="bot-thunder-svg" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9,1 3,12 7,12 5,21 11,10 7,10 9,1" fill="#00ff88" stroke="#00cc55" stroke-width=".5"/>
          </svg>
        </span>
        ذو المنجل
      </div>
      <div id="bot-status">⬤ في الخدمة</div>
    </div>
  </div>
  <div id="bot-msgs"></div>
  <div id="bot-edit-bar">
    <button id="bot-edit-cancel">✕</button>
    <input id="bot-edit-input" type="text" placeholder="عدّل نصك..." autocomplete="off">
    <button id="bot-edit-send">✓ إرسال</button>
  </div>
  <div id="bot-input-area">
    <button id="bot-send" class="bot-action-btn" title="إرسال">⚔</button>
    <input id="bot-input" type="text" placeholder="· · · اكتب رسالتك · · ·" autocomplete="off">
    <button class="bot-action-btn" id="bot-edit-btn" title="تعديل قبل الإرسال">✏</button>
    <button class="bot-action-btn" id="bot-attach-btn" title="إرفاق صورة أو ملف">📎</button>
    <input id="bot-img-input" type="file" accept="image/*,video/*,audio/*,.pdf,.zip,.apk,*/*" multiple>
  </div>
</div>

<div id="bot-img-viewer">
  <canvas id="bot-img-viewer-canvas"></canvas>
  <img id="bot-img-viewer-img" src="" alt="">
  <div id="bot-img-viewer-tools">
    <button class="img-tool-btn" id="imgv-dl">⬇ تحميل</button>
    <button class="img-tool-btn" id="imgv-flip-h">↔ قلب أفقي</button>
    <button class="img-tool-btn" id="imgv-flip-v">↕ قلب عمودي</button>
    <button class="img-tool-btn" id="imgv-crop">✂ قص</button>
    <button class="img-tool-btn" id="imgv-draw">🖊 رسم/نص</button>
    <button class="img-tool-btn" id="imgv-share">↗ مشاركة</button>
    <button class="img-tool-btn danger" id="imgv-close" style="border-color:rgba(180,0,0,.4);color:#ffaa88;">✕ إغلاق</button>
  </div>
</div>

<div id="bot-draw-panel">
  <canvas id="bot-draw-canvas"></canvas>
  <div id="bot-draw-tools">
    <input id="bot-draw-text-input" type="text" placeholder="نص على الصورة...">
    <input type="color" id="bot-color-pick" value="#00ff88">
    <button class="img-tool-btn" id="draw-place-text">وضع نص</button>
    <button class="img-tool-btn" id="draw-undo">↩ تراجع</button>
    <button class="img-tool-btn" id="draw-dl">⬇ تحميل التعديل</button>
    <button class="img-tool-btn danger" id="draw-close" style="border-color:rgba(180,0,0,.4);color:#ffaa88;">✕ إغلاق</button>
  </div>
</div>

<div id="bot-media-panel">
  <div id="bot-media-panel-body"></div>
  <div id="bot-media-controls">
    <input type="range" id="media-seek" min="0" max="100" value="0" step="0.1">
    <div class="media-ctrl-row">
      <button class="media-ctrl-btn" id="mc-back">⏮ 10ث</button>
      <button class="media-ctrl-btn" id="mc-play">▶ تشغيل</button>
      <button class="media-ctrl-btn" id="mc-fwd">10ث ⏭</button>
    </div>
    <div class="media-ctrl-row">
      <span class="media-ctrl-btn" id="mc-speed-label" style="cursor:default">× السرعة: 1.0</span>
      <button class="media-ctrl-btn" id="mc-speed-down">🐢 أبطأ</button>
      <button class="media-ctrl-btn" id="mc-speed-up">🚀 أسرع</button>
      <button class="media-ctrl-btn" id="mc-reverse">⏪ عكس</button>
    </div>
    <div class="media-ctrl-row">
      <button class="media-ctrl-btn" id="mc-dl">⬇ تحميل</button>
      <button class="media-ctrl-btn" id="mc-share">↗ مشاركة</button>
      <button class="media-ctrl-btn danger" id="mc-close" style="border-color:rgba(180,0,0,.4);color:#ffaa88;">✕ إغلاق</button>
    </div>
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
var attachBtn=document.getElementById('bot-attach-btn');
var fileInput=document.getElementById('bot-img-input');

/* ── رعد البوت في كل ثانية ── */
(function(){
  var svg=document.getElementById('bot-thunder-svg');
  if(!svg)return;
  function flash(){
    svg.style.filter='drop-shadow(0 0 8px #fff) drop-shadow(0 0 16px #00ff88) brightness(3)';
    svg.style.transform='scaleY(1.15)';
    setTimeout(function(){
      svg.style.filter='drop-shadow(0 0 4px #00ff88)';
      svg.style.transform='scaleY(1)';
    },120);
  }
  setInterval(flash,1000);
})();

/* ── ضغطتان متتاليتان في أي مكان = تحديد حقل الإدخال ── */
var _lastTap=0;
document.addEventListener('click',function(e){
  if(e.target.closest('#bot-input-area'))return;
  if(e.target.closest('#bot-img-viewer'))return;
  if(e.target.closest('#bot-media-panel'))return;
  if(e.target.closest('#bot-draw-panel'))return;
  var now=Date.now();
  if(now-_lastTap<350){
    inputEl.focus();
  }
  _lastTap=now;
});

/* ── جمر أحمر عند وصول رسائل البوت ── */
function spawnEmbers(wrapEl){
  for(var i=0;i<6;i++){
    (function(idx){
      setTimeout(function(){
        var e=document.createElement('div');
        e.className='bot-ember';
        var tx=(Math.random()-.5)*50;
        var tx2=(Math.random()-.5)*70;
        e.style.setProperty('--ex',tx+'px');
        e.style.setProperty('--ex2',tx2+'px');
        e.style.left=(20+Math.random()*60)+'%';
        e.style.bottom='0';
        e.style.animationDuration=(0.8+Math.random()*.7)+'s';
        wrapEl.appendChild(e);
        setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e);},1500);
      },idx*90);
    })(i);
  }
}

/* ── بناء رسالة في DOM ── */
function addMsg(role,content,type){
  var wrap=document.createElement('div');
  wrap.className='bot-msg '+(role==='user'?'user':'bot');

  var bubble=document.createElement('div');
  bubble.className='bot-bubble';

  if(role==='bot'){
    var emberWrap=document.createElement('div');
    emberWrap.className='bot-ember-wrap';
    bubble.appendChild(emberWrap);
    setTimeout(function(){spawnEmbers(emberWrap);},80);
  }

  if(type==='dom'&&content instanceof Element){
    bubble.appendChild(content);
  } else if(type==='blog'){
    var blog=document.createElement('div');
    blog.className='bot-blog';
    if(content&&content.title){
      var bt=document.createElement('div');bt.className='bot-blog-title';bt.textContent=content.title;blog.appendChild(bt);
    }
    var bp=document.createElement('div');bp.textContent=typeof content==='string'?content:(content.body||content.text||'');blog.appendChild(bp);
    bubble.appendChild(blog);
  } else if(type==='red-gate'){
    var gate=buildRedGate(content);
    bubble.appendChild(gate);
  } else if(type==='image'){
    var imgEl=buildImageEl(content);
    bubble.appendChild(imgEl);
  } else if(type==='album'){
    var alb=buildAlbum(content);
    bubble.appendChild(alb);
  } else if(type==='video'||type==='audio'){
    var med=buildMediaEl(content,type);
    bubble.appendChild(med);
  } else if(type==='file'){
    var fc=buildFileCard(content);
    bubble.appendChild(fc);
  } else {
    var span=document.createElement('span');
    span.textContent=typeof content==='string'?content:(content?JSON.stringify(content):'');
    bubble.appendChild(span);
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

/* ── عناصر الوسائط ── */
function buildImageEl(src){
  var w=document.createElement('div');
  w.className='bot-img-wrap';
  var img=document.createElement('img');
  img.src=src;img.alt='';
  var ov=document.createElement('div');ov.className='bot-img-overlay';
  var ic=document.createElement('span');ic.className='bot-img-overlay-icon';ic.textContent='🔍';
  ov.appendChild(ic);w.appendChild(img);w.appendChild(ov);
  w.addEventListener('click',function(){openImgViewer(src);});
  return w;
}

function buildAlbum(images){
  var w=document.createElement('div');w.className='bot-album';
  images.forEach(function(src){
    var img=document.createElement('img');img.src=src;img.alt='';
    img.addEventListener('click',function(){openImgViewer(src);});
    w.appendChild(img);
  });
  return w;
}

function buildMediaEl(src,type){
  var w=document.createElement('div');w.className='bot-media-wrap';
  var el;
  if(type==='video'){el=document.createElement('video');el.src=src;el.preload='metadata';}
  else{el=document.createElement('audio');el.src=src;el.preload='metadata';}
  el.style.pointerEvents='none';
  var ov=document.createElement('div');ov.className='bot-media-overlay';
  var pb=document.createElement('div');pb.className='bot-media-play-btn';pb.textContent='▶';
  ov.appendChild(pb);w.appendChild(el);w.appendChild(ov);
  var tapTime=0;
  w.addEventListener('click',function(){
    var now=Date.now();
    if(now-tapTime<350){openMediaPanel(src,type);return;}
    tapTime=now;
    if(el.paused){el.play().catch(function(){});pb.textContent='⏸';}
    else{el.pause();pb.textContent='▶';}
  });
  return w;
}

function buildFileCard(item){
  var icons={'image':'🖼','video':'🎬','audio':'🎵','pdf':'📄','apk':'📲','zip':'🗜','rar':'🗜','exe':'💻','default':'📦'};
  var ext=(item.name||'').split('.').pop().toLowerCase();
  var icon=icons[ext]||icons[item.type]||icons.default;
  var w=document.createElement('div');w.className='bot-file-card';
  w.innerHTML='<span class="bot-file-icon">'+icon+'</span><div class="bot-file-info"><span class="bot-file-name">'+(item.name||'ملف')+'</span><span class="bot-file-meta">'+(ext.toUpperCase())+(item.size?' · '+item.size:'')+'</span></div>';
  w.addEventListener('click',function(){
    if(item.path){var a=document.createElement('a');a.href=item.path;a.download=item.name||'file';a.click();}
    else if(item.url){window.open(item.url,'_blank');}
  });
  return w;
}

function buildRedGate(data){
  var g=document.createElement('div');g.className='bot-red-gate';
  var icon=data&&data.icon?data.icon:'🔴';
  var label=data&&data.label?data.label:'بوابة';
  var sub=data&&data.sub?data.sub:'انقر للفتح';
  g.innerHTML='<span class="bot-red-gate-icon">'+icon+'</span><span class="bot-red-gate-text">'+label+'<br><small style="opacity:.6;font-size:9px;letter-spacing:1px;">'+sub+'</small></span>';
  g.addEventListener('click',function(){
    if(data&&data.src){
      var s=document.createElement('script');s.src=data.src;document.head.appendChild(s);
    } else if(data&&data.href){
      window.open(data.href,'_blank');
    } else if(data&&typeof data.action==='function'){
      data.action();
    }
  });
  return g;
}

/* ── عارض الصور ── */
var _ivFlipH=false,_ivFlipV=false,_ivSrc='';
function openImgViewer(src){
  _ivSrc=src;_ivFlipH=false;_ivFlipV=false;
  var v=document.getElementById('bot-img-viewer');
  var img=document.getElementById('bot-img-viewer-img');
  img.src=src;img.style.transform='';
  v.classList.add('show');
}
document.getElementById('imgv-close').addEventListener('click',function(){
  document.getElementById('bot-img-viewer').classList.remove('show');
});
document.getElementById('imgv-flip-h').addEventListener('click',function(){
  _ivFlipH=!_ivFlipH;applyImgTransform();
});
document.getElementById('imgv-flip-v').addEventListener('click',function(){
  _ivFlipV=!_ivFlipV;applyImgTransform();
});
function applyImgTransform(){
  var img=document.getElementById('bot-img-viewer-img');
  img.style.transform='scaleX('+(_ivFlipH?-1:1)+') scaleY('+(_ivFlipV?-1:1)+')';
}
document.getElementById('imgv-dl').addEventListener('click',function(){
  var img=document.getElementById('bot-img-viewer-img');
  var a=document.createElement('a');a.href=img.src;a.download='image';a.click();
});
document.getElementById('imgv-share').addEventListener('click',function(){
  var img=document.getElementById('bot-img-viewer-img');
  if(navigator.share){navigator.share({url:img.src}).catch(function(){});}
  else{navigator.clipboard&&navigator.clipboard.writeText(img.src);}
});
document.getElementById('imgv-crop').addEventListener('click',function(){
  var img=document.getElementById('bot-img-viewer-img');
  openDrawPanel(img.src);
});
document.getElementById('imgv-draw').addEventListener('click',function(){
  var img=document.getElementById('bot-img-viewer-img');
  openDrawPanel(img.src);
});

/* ── لوحة الرسم على الصورة ── */
var _drawCanvas,_drawCtx,_drawImg,_drawHistory=[];
function openDrawPanel(src){
  document.getElementById('bot-img-viewer').classList.remove('show');
  var panel=document.getElementById('bot-draw-panel');
  panel.classList.add('show');
  _drawCanvas=document.getElementById('bot-draw-canvas');
  _drawCtx=_drawCanvas.getContext('2d');
  _drawImg=new Image();
  _drawImg.crossOrigin='anonymous';
  _drawImg.onload=function(){
    _drawCanvas.width=_drawImg.width;
    _drawCanvas.height=_drawImg.height;
    _drawCtx.drawImage(_drawImg,0,0);
    _drawHistory=[_drawCtx.getImageData(0,0,_drawCanvas.width,_drawCanvas.height)];
  };
  _drawImg.src=src;

  var drawing=false,lastX=0,lastY=0;
  _drawCanvas.onpointerdown=function(e){
    drawing=true;
    var r=_drawCanvas.getBoundingClientRect();
    var sx=_drawCanvas.width/r.width,sy=_drawCanvas.height/r.height;
    lastX=(e.clientX-r.left)*sx;lastY=(e.clientY-r.top)*sy;
    _drawCtx.beginPath();_drawCtx.moveTo(lastX,lastY);
  };
  _drawCanvas.onpointermove=function(e){
    if(!drawing)return;
    var r=_drawCanvas.getBoundingClientRect();
    var sx=_drawCanvas.width/r.width,sy=_drawCanvas.height/r.height;
    var x=(e.clientX-r.left)*sx,y=(e.clientY-r.top)*sy;
    _drawCtx.lineTo(x,y);
    _drawCtx.strokeStyle=document.getElementById('bot-color-pick').value;
    _drawCtx.lineWidth=3;_drawCtx.lineCap='round';_drawCtx.stroke();
    lastX=x;lastY=y;
  };
  _drawCanvas.onpointerup=function(){
    drawing=false;
    _drawHistory.push(_drawCtx.getImageData(0,0,_drawCanvas.width,_drawCanvas.height));
  };
}
document.getElementById('draw-place-text').addEventListener('click',function(){
  if(!_drawCtx)return;
  var txt=document.getElementById('bot-draw-text-input').value.trim();
  if(!txt)return;
  _drawCtx.font='bold 32px Cairo,sans-serif';
  _drawCtx.fillStyle=document.getElementById('bot-color-pick').value;
  _drawCtx.textAlign='center';
  _drawCtx.fillText(txt,_drawCanvas.width/2,_drawCanvas.height/2);
  _drawHistory.push(_drawCtx.getImageData(0,0,_drawCanvas.width,_drawCanvas.height));
});
document.getElementById('draw-undo').addEventListener('click',function(){
  if(_drawHistory.length>1){
    _drawHistory.pop();
    _drawCtx.putImageData(_drawHistory[_drawHistory.length-1],0,0);
  }
});
document.getElementById('draw-dl').addEventListener('click',function(){
  if(!_drawCanvas)return;
  var a=document.createElement('a');a.href=_drawCanvas.toDataURL('image/png');a.download='edited.png';a.click();
});
document.getElementById('draw-close').addEventListener('click',function(){
  document.getElementById('bot-draw-panel').classList.remove('show');
});

/* ── عارض الميديا ── */
var _curMedia=null,_mediaSpeed=1.0,_mediaReversed=false;
function openMediaPanel(src,type){
  var panel=document.getElementById('bot-media-panel');
  var body=document.getElementById('bot-media-panel-body');
  body.innerHTML='';
  if(type==='video'){_curMedia=document.createElement('video');_curMedia.src=src;_curMedia.controls=false;}
  else{_curMedia=document.createElement('audio');_curMedia.src=src;_curMedia.controls=false;}
  body.appendChild(_curMedia);
  _mediaSpeed=1.0;_mediaReversed=false;
  document.getElementById('mc-speed-label').textContent='× السرعة: '+_mediaSpeed.toFixed(1);
  panel.classList.add('show');

  _curMedia.addEventListener('timeupdate',function(){
    if(!_curMedia.duration)return;
    document.getElementById('media-seek').value=(_curMedia.currentTime/_curMedia.duration)*100;
  });
  document.getElementById('media-seek').oninput=function(){
    if(_curMedia&&_curMedia.duration)_curMedia.currentTime=(_curMedia.duration*this.value/100);
  };
}
document.getElementById('mc-play').addEventListener('click',function(){
  if(!_curMedia)return;
  if(_curMedia.paused){_curMedia.play().catch(function(){});this.textContent='⏸ إيقاف';}
  else{_curMedia.pause();this.textContent='▶ تشغيل';}
});
document.getElementById('mc-back').addEventListener('click',function(){if(_curMedia)_curMedia.currentTime=Math.max(0,_curMedia.currentTime-10);});
document.getElementById('mc-fwd').addEventListener('click',function(){if(_curMedia)_curMedia.currentTime=Math.min(_curMedia.duration||999,_curMedia.currentTime+10);});
document.getElementById('mc-speed-up').addEventListener('click',function(){
  if(!_curMedia)return;
  _mediaSpeed=Math.min(3,Math.round((_mediaSpeed+0.25)*100)/100);
  _curMedia.playbackRate=_mediaSpeed;
  document.getElementById('mc-speed-label').textContent='× السرعة: '+_mediaSpeed.toFixed(2);
});
document.getElementById('mc-speed-down').addEventListener('click',function(){
  if(!_curMedia)return;
  _mediaSpeed=Math.max(0.25,Math.round((_mediaSpeed-0.25)*100)/100);
  _curMedia.playbackRate=_mediaSpeed;
  document.getElementById('mc-speed-label').textContent='× السرعة: '+_mediaSpeed.toFixed(2);
});
document.getElementById('mc-reverse').addEventListener('click',function(){
  if(!_curMedia)return;
  _mediaReversed=!_mediaReversed;
  this.textContent=_mediaReversed?'▶ عادي':'⏪ عكس';
  if(_mediaReversed){
    _curMedia.pause();
    var rev=setInterval(function(){
      if(!_mediaReversed||!_curMedia){clearInterval(rev);return;}
      _curMedia.currentTime=Math.max(0,_curMedia.currentTime-0.1);
      if(_curMedia.currentTime<=0)clearInterval(rev);
    },100);
    _curMedia._revInt=rev;
  } else {
    clearInterval(_curMedia._revInt);
    _curMedia.play().catch(function(){});
  }
});
document.getElementById('mc-dl').addEventListener('click',function(){
  if(!_curMedia||!_curMedia.src)return;
  var a=document.createElement('a');a.href=_curMedia.src;a.download='media';a.click();
});
document.getElementById('mc-share').addEventListener('click',function(){
  if(!_curMedia)return;
  if(navigator.share){navigator.share({url:_curMedia.src}).catch(function(){});}
  else if(navigator.clipboard){navigator.clipboard.writeText(_curMedia.src);}
});
document.getElementById('mc-close').addEventListener('click',function(){
  if(_curMedia){_curMedia.pause();clearInterval(_curMedia._revInt);}
  _curMedia=null;_mediaReversed=false;
  document.getElementById('bot-media-panel').classList.remove('show');
  document.getElementById('mc-play').textContent='▶ تشغيل';
});

/* ── إرفاق ملف من الجهاز ── */
attachBtn.addEventListener('click',function(){fileInput.click();});
fileInput.addEventListener('change',function(){
  var files=Array.from(this.files||[]);
  files.forEach(function(f){
    var type=f.type.split('/')[0];
    var url=URL.createObjectURL(f);
    if(type==='image'){addMsg('user',url,'image');}
    else if(type==='video'){addMsg('user',url,'video');}
    else if(type==='audio'){addMsg('user',url,'audio');}
    else{addMsg('user',{name:f.name,size:formatSize(f.size),url:url},'file');}
  });
  fileInput.value='';
});
function formatSize(b){
  if(b>=1048576)return(b/1048576).toFixed(1)+' MB';
  if(b>=1024)return(b/1024).toFixed(1)+' KB';
  return b+' B';
}

/* ── شريط التعديل ── */
editBtn.addEventListener('click',function(e){
  e.stopPropagation();
  var val=inputEl.value.trim();
  editInput.value=val;
  editBar.classList.add('show');
  editInput.focus();
  if(val)inputEl.value='';
});
editCancel.addEventListener('click',function(e){
  e.stopPropagation();editBar.classList.remove('show');editInput.value='';
});
editSend.addEventListener('click',function(e){
  e.stopPropagation();
  var val=editInput.value.trim();
  if(!val)return;
  editBar.classList.remove('show');editInput.value='';
  dispatchMessage(val);
});
editInput.addEventListener('keydown',function(e){
  if(e.key==='Enter'){editSend.click();}
  if(e.key==='Escape'){editCancel.click();}
});

/* ── إرسال وتوزيع ── */
function dispatchMessage(t){
  addMsg('user',t,'text');
  var handled=false;
  if(window.ADMIN&&typeof window.ADMIN.handleMessage==='function'){
    handled=ADMIN.handleMessage(t,function(role,content,type){addMsg(role,content,type);});
  }
  if(!handled){
    setTimeout(function(){
      addMsg('bot',window.ADMIN&&window.ADMIN.chatResponses?ADMIN.chatResponses.default:'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة','text');
    },300);
  }
}
function handleSend(){
  var t=inputEl.value.trim();if(!t)return;
  inputEl.value='';dispatchMessage(t);
}
sendEl.addEventListener('click',handleSend);
inputEl.addEventListener('keydown',function(e){if(e.key==='Enter')handleSend();});

/* ── رسالة الترحيب ── */
setTimeout(function(){
  var welcome=window.ADMIN&&window.ADMIN.getWelcome?ADMIN.getWelcome():'مرحباً بك ⚡ اكتب «اوامر» للقائمة';
  addMsg('bot',welcome,'text');
},600);

/* ── واجهة عامة ── */
window._botAddMsg=addMsg;
window._botDispatch=dispatchMessage;

})();
