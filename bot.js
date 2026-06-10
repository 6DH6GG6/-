(function(){
'use strict';
if(document.getElementById('bot-wrap'))return;

var lnk=document.createElement('link');
lnk.rel='stylesheet';
lnk.href='https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;900&family=Cairo:wght@300;400;700;900&display=swap';
document.head.appendChild(lnk);

var css=document.createElement('style');
css.textContent=`
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
@keyframes bot-msg-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes bot-name-thunder{
  0%,100%{text-shadow:0 0 6px #c00,0 0 14px #900}
  50%{text-shadow:0 0 2px #fff,0 0 30px #f00,0 0 60px #c00,0 0 100px #800;filter:brightness(2.5)}
  52%{text-shadow:0 0 6px #c00,0 0 14px #900;filter:brightness(1)}
  54%{text-shadow:0 0 2px #fff,0 0 30px #f00,0 0 60px #c00;filter:brightness(2)}
  56%{text-shadow:0 0 6px #c00,0 0 14px #900;filter:brightness(1)}
}
@keyframes bolt-anim{0%{opacity:1}100%{opacity:0;transform:translateY(-40px) scaleY(1.4)}}
@keyframes ember-float{
  0%{transform:translateY(0) translateX(0) scale(1);opacity:.9}
  50%{transform:translateY(-28px) translateX(var(--ex,4px)) scale(.7);opacity:.6}
  100%{transform:translateY(-56px) translateX(var(--ex2,8px)) scale(.3);opacity:0}
}
@keyframes pulse-red{0%,100%{box-shadow:0 0 10px rgba(200,0,0,.3)}50%{box-shadow:0 0 28px rgba(255,0,0,.6)}}
@keyframes typing-dot{0%,80%,100%{transform:scale(0);opacity:.4}40%{transform:scale(1);opacity:1}}
@keyframes gate-door-open{from{transform:rotateY(0deg)}to{transform:rotateY(-88deg)}}
@keyframes gate-door-open-r{from{transform:rotateY(0deg)}to{transform:rotateY(88deg)}}
@keyframes char-in{from{opacity:0;transform:translateX(6px)}to{opacity:1;transform:translateX(0)}}
@keyframes waveform{0%,100%{height:4px}50%{height:var(--wh,16px)}}
@keyframes mini-gate-pulse{0%,100%{box-shadow:0 0 10px rgba(180,0,0,.3),inset 0 0 8px rgba(120,0,0,.2)}50%{box-shadow:0 0 30px rgba(255,0,0,.6),inset 0 0 16px rgba(160,0,0,.3)}}
@keyframes sweep{0%{left:-100%}100%{left:200%}}
@keyframes door-l-open{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(-85deg)}}
@keyframes door-r-open{from{transform:perspective(400px) rotateY(0deg)}to{transform:perspective(400px) rotateY(85deg)}}

#bot-wrap{
  position:fixed;inset:0;z-index:500;
  display:flex;flex-direction:column;
  background:radial-gradient(ellipse 90% 80% at 50% 5%,#0d0000 0%,#050000 40%,#000 100%);
  font-family:'Cairo',sans-serif;
  overflow:hidden;
}
#bot-bg-grid{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:linear-gradient(rgba(180,0,0,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(180,0,0,.04) 1px,transparent 1px);
  background-size:36px 36px;
}

#bot-header{
  position:relative;z-index:10;
  display:flex;align-items:center;gap:14px;
  padding:12px 16px 10px;
  border-bottom:1px solid rgba(180,0,0,.25);
  background:linear-gradient(180deg,rgba(12,0,0,.99),rgba(6,0,0,.97));
  flex-shrink:0;
}
#bot-avatar{
  width:50px;height:50px;border-radius:50%;
  object-fit:cover;border:2px solid rgba(180,0,0,.5);
  box-shadow:0 0 18px rgba(150,0,0,.4);display:block;flex-shrink:0;
}
#bot-name-wrap{flex:1;}
#bot-name{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(14px,3.5vw,19px);
  color:#ff2200;
  animation:bot-name-thunder 1s ease-in-out infinite;
  letter-spacing:2px;line-height:1.2;display:inline-flex;align-items:center;gap:6px;
}
#bot-thunder-svg{width:1em;height:1em;filter:drop-shadow(0 0 4px #f00);}
#bot-status{font-size:10px;color:rgba(220,0,0,.55);letter-spacing:3px;margin-top:2px;}

#bot-msgs{
  flex:1;overflow-y:auto;
  padding:14px 12px 10px;
  display:flex;flex-direction:column;gap:10px;
  position:relative;z-index:10;
  scroll-behavior:smooth;
}
#bot-msgs::-webkit-scrollbar{width:3px;}
#bot-msgs::-webkit-scrollbar-thumb{background:rgba(180,0,0,.3);border-radius:2px;}

.bot-msg{
  display:flex;align-items:flex-end;gap:8px;
  animation:bot-msg-in .3s ease forwards;
  max-width:90%;position:relative;
}
.bot-msg.user{align-self:flex-start;flex-direction:row-reverse;}
.bot-msg.bot{align-self:flex-end;}
.bot-bubble{
  padding:10px 14px;border-radius:3px;
  font-size:clamp(12px,2.5vw,14px);line-height:1.75;
  position:relative;word-break:break-word;
  background:rgba(0,0,0,.0);
}
.bot-msg.user .bot-bubble{
  background:rgba(12,0,0,.92);
  border:1px solid rgba(180,0,0,.35);
  border-top:1px solid rgba(220,0,0,.5);
  color:#ff9988;
}
.bot-msg.bot .bot-bubble{
  background:rgba(8,0,0,.94);
  border:1px solid rgba(140,0,0,.4);
  border-top:1px solid rgba(200,0,0,.55);
  color:#ffbbaa;
}
.bot-bubble-text{white-space:pre-wrap;display:block;}
.bot-mini-avatar{width:26px;height:26px;border-radius:50%;border:1px solid rgba(160,0,0,.4);object-fit:cover;flex-shrink:0;}
.bot-ember-wrap{position:absolute;top:0;right:0;left:0;bottom:0;pointer-events:none;overflow:visible;}
.bot-ember{
  position:absolute;width:5px;height:5px;border-radius:50%;
  background:radial-gradient(circle,#ff4400,#cc0000 60%,transparent);
  box-shadow:0 0 6px #ff2200;
  animation:ember-float 1.2s ease-out forwards;
}
.bot-typing{display:flex;align-items:center;gap:5px;padding:12px 16px;}
.bot-typing span{
  width:7px;height:7px;border-radius:50%;background:#880000;
  display:inline-block;animation:typing-dot .8s ease-in-out infinite;
}
.bot-typing span:nth-child(2){animation-delay:.2s;}
.bot-typing span:nth-child(3){animation-delay:.4s;}

#bot-input-area{
  position:relative;z-index:10;
  padding:10px 12px 14px;
  border-top:1px solid rgba(160,0,0,.2);
  background:linear-gradient(0deg,rgba(8,0,0,.99),rgba(4,0,0,.97));
  display:flex;gap:8px;align-items:flex-end;flex-shrink:0;
  margin-bottom:env(safe-area-inset-bottom,0px);
}
#bot-input-wrap{flex:1;position:relative;}
#bot-input{
  width:100%;
  background:rgba(10,0,0,.7);
  border:1px solid rgba(160,0,0,.4);
  border-top-color:rgba(200,0,0,.5);
  color:#ffbbaa;font-family:'Cairo',sans-serif;font-size:14px;
  padding:11px 14px;outline:none;border-radius:2px;direction:rtl;
  transition:border-color .25s,box-shadow .25s;
  resize:none;min-height:44px;max-height:160px;overflow-y:auto;
  line-height:1.6;display:block;
}
#bot-input:focus{border-color:#cc0000;box-shadow:0 0 16px rgba(160,0,0,.2);}
#bot-input::placeholder{color:rgba(180,0,0,.3);font-size:12px;letter-spacing:2px;}
#bot-input.code-mode{
  font-family:'Courier New',monospace;font-size:13px;
  min-height:120px;letter-spacing:.5px;
  background:rgba(5,0,0,.95);
  border-color:rgba(200,0,0,.6);
  color:#ff8866;
}
.bot-action-btn{
  background:rgba(10,0,0,.6);border:1px solid rgba(140,0,0,.35);
  color:rgba(220,0,0,.7);font-size:16px;
  width:42px;height:42px;border-radius:2px;
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
.bot-action-btn:hover{color:#ff2200;border-color:rgba(200,0,0,.6);box-shadow:0 0 14px rgba(180,0,0,.3);}
.bot-action-btn:active{transform:scale(.92);}
#bot-send{
  background:linear-gradient(135deg,#1a0000,#4d0000 40%,#770000 60%,#4d0000);
  border:1px solid rgba(180,0,0,.5);color:#ffaa88;font-size:18px;
  width:42px;height:42px;border-radius:2px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;flex-shrink:0;
}
#bot-send:hover{box-shadow:0 0 20px rgba(180,0,0,.5);border-color:rgba(220,0,0,.8);}
#bot-img-input{display:none;}

#bot-code-editor{
  display:none;
  position:fixed;inset:0;z-index:600;
  background:rgba(0,0,0,.98);
  flex-direction:column;
}
#bot-code-editor.show{display:flex;}
#code-editor-topbar{
  display:flex;align-items:center;gap:8px;padding:10px 14px;
  background:rgba(6,0,0,.99);border-bottom:1px solid rgba(160,0,0,.3);
  flex-shrink:0;
}
#code-editor-lang{
  background:rgba(15,0,0,.8);border:1px solid rgba(160,0,0,.4);
  color:#ff8866;font-family:'Cinzel',serif;font-size:11px;
  padding:5px 10px;border-radius:2px;cursor:pointer;outline:none;
}
#code-editor-title{flex:1;font-family:'Cinzel',serif;font-size:12px;color:rgba(220,0,0,.6);letter-spacing:3px;}
#code-textarea{
  flex:1;background:rgba(5,0,0,.98);
  border:none;outline:none;resize:none;
  color:#ff9977;font-family:'Courier New',monospace;font-size:13px;
  padding:16px;line-height:1.8;tab-size:2;
  direction:ltr;text-align:left;
}
#code-editor-toolbar{
  display:flex;gap:6px;flex-wrap:wrap;padding:8px 14px;
  background:rgba(6,0,0,.99);border-top:1px solid rgba(160,0,0,.2);
  flex-shrink:0;
}
.code-tool-btn{
  background:rgba(15,0,0,.7);border:1px solid rgba(140,0,0,.35);
  color:#ff9977;font-family:'Cinzel',serif;font-size:10px;
  padding:6px 11px;border-radius:2px;cursor:pointer;letter-spacing:1px;
  transition:all .2s;white-space:nowrap;
}
.code-tool-btn:hover{border-color:rgba(220,0,0,.6);box-shadow:0 0 10px rgba(180,0,0,.3);}
.code-tool-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}

#bot-img-viewer{
  position:fixed;inset:0;z-index:800;
  background:rgba(0,0,0,.98);
  display:none;flex-direction:column;
}
#bot-img-viewer.show{display:flex;}
#imgv-canvas-wrap{
  flex:1;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
#imgv-canvas{display:block;max-width:100%;max-height:100%;cursor:crosshair;touch-action:none;}
#bot-img-viewer-toolbar{
  display:flex;gap:6px;flex-wrap:wrap;justify-content:center;
  padding:10px 12px 14px;
  background:rgba(6,0,0,.99);border-top:1px solid rgba(160,0,0,.2);
  flex-shrink:0;
}
.imgv-btn{
  background:rgba(12,0,0,.85);border:1px solid rgba(140,0,0,.4);
  color:#ff9988;font-family:'Cinzel',serif;font-size:10px;
  padding:7px 11px;border-radius:2px;cursor:pointer;letter-spacing:1px;
  transition:all .2s;white-space:nowrap;
}
.imgv-btn:hover{border-color:rgba(220,0,0,.7);box-shadow:0 0 10px rgba(180,0,0,.3);}
.imgv-btn.active{background:rgba(80,0,0,.5);border-color:#ff2200;color:#fff;}
.imgv-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}
#imgv-color-pick{width:30px;height:30px;border-radius:2px;border:1px solid rgba(160,0,0,.4);cursor:pointer;background:transparent;padding:2px;}
#imgv-text-input{
  background:rgba(10,0,0,.8);border:1px solid rgba(140,0,0,.4);
  color:#ff9988;font-family:'Cairo',sans-serif;font-size:12px;
  padding:6px 10px;border-radius:2px;outline:none;direction:rtl;width:120px;
}
#imgv-size-input{
  background:rgba(10,0,0,.8);border:1px solid rgba(140,0,0,.4);
  color:#ff9988;font-size:11px;padding:6px 8px;border-radius:2px;outline:none;width:55px;
}

#bot-media-panel{
  position:fixed;inset:0;z-index:800;
  background:rgba(0,0,0,.98);
  display:none;flex-direction:column;
}
#bot-media-panel.show{display:flex;}
#media-panel-body{flex:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
#media-panel-body video{max-width:100%;max-height:100%;outline:none;border-radius:3px;}
#media-panel-body audio{display:none;}
#audio-viz-canvas{display:block;width:100%;max-width:500px;height:120px;}
#media-panel-controls{
  padding:10px 14px 14px;background:rgba(6,0,0,.99);
  border-top:1px solid rgba(160,0,0,.2);flex-shrink:0;
  display:flex;flex-direction:column;gap:8px;
}
#media-seek{width:100%;accent-color:#cc0000;height:4px;cursor:pointer;border-radius:2px;}
.media-ctrl-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;justify-content:center;}
.mc-btn{
  background:rgba(12,0,0,.7);border:1px solid rgba(130,0,0,.4);
  color:#ff9988;font-family:'Cinzel',serif;font-size:10px;
  padding:7px 12px;border-radius:2px;cursor:pointer;transition:all .2s;white-space:nowrap;
}
.mc-btn:hover{border-color:rgba(220,0,0,.6);box-shadow:0 0 10px rgba(180,0,0,.3);}
.mc-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}
#mc-speed-lbl{font-family:'Cinzel',serif;font-size:10px;color:rgba(200,0,0,.5);letter-spacing:2px;}

.bot-file-card{
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 14px;min-width:180px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);border-right:3px solid rgba(200,0,0,.6);
  border-radius:3px;cursor:pointer;transition:all .2s;
}
.bot-file-card:hover{border-right-color:#ff2200;background:rgba(14,0,0,.95);}
.bot-file-icon{font-size:22px;}
.bot-file-name{font-size:12px;color:#ffaa88;font-family:'Cairo',sans-serif;}
.bot-file-meta{font-size:10px;color:rgba(200,80,60,.5);letter-spacing:1px;}

.bot-txt-file{
  display:inline-flex;flex-direction:column;gap:6px;
  padding:10px 14px;min-width:180px;max-width:280px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);border-top:2px solid rgba(200,0,0,.6);
  border-radius:3px;cursor:pointer;transition:all .2s;
}
.bot-txt-file:hover{border-top-color:#ff2200;}
.bot-txt-file-header{display:flex;align-items:center;gap:8px;}
.bot-txt-file-icon{font-size:20px;}
.bot-txt-file-name{font-size:12px;color:#ffaa88;}
.bot-txt-file-preview{font-size:10px;color:rgba(200,80,60,.45);letter-spacing:.5px;line-height:1.5;overflow:hidden;max-height:36px;}

#txt-view-panel{
  position:fixed;inset:0;z-index:800;
  background:rgba(0,0,0,.98);
  display:none;flex-direction:column;
}
#txt-view-panel.show{display:flex;}
#txt-view-topbar{
  display:flex;align-items:center;gap:8px;padding:10px 14px;
  background:rgba(6,0,0,.99);border-bottom:1px solid rgba(160,0,0,.3);flex-shrink:0;
}
#txt-view-title{flex:1;font-family:'Cinzel',serif;font-size:12px;color:rgba(220,0,0,.6);letter-spacing:3px;}
#txt-view-body{
  flex:1;overflow-y:auto;padding:16px;
  color:#ff9977;font-family:'Courier New',monospace;font-size:13px;
  line-height:1.8;white-space:pre-wrap;direction:ltr;
}
#txt-view-tools{
  display:flex;gap:6px;flex-wrap:wrap;padding:8px 14px;
  background:rgba(6,0,0,.99);border-top:1px solid rgba(160,0,0,.2);flex-shrink:0;
}

.bot-apk-card{
  display:inline-flex;align-items:center;gap:12px;
  padding:12px 16px;min-width:200px;
  background:rgba(8,0,0,.92);
  border:1px solid rgba(120,0,0,.4);border-top:2px solid rgba(200,0,0,.6);
  border-radius:3px;cursor:pointer;transition:all .2s;
}
.bot-apk-card:hover{border-top-color:#ff2200;}
.bot-apk-icon{font-size:28px;}
.bot-apk-info{display:flex;flex-direction:column;gap:3px;}
.bot-apk-name{font-size:13px;color:#ffaa88;}
.bot-apk-meta{font-size:10px;color:rgba(200,80,60,.5);letter-spacing:1px;}
.bot-apk-dl-btn{
  background:linear-gradient(135deg,#1a0000,#4d0000);
  border:1px solid rgba(180,0,0,.5);
  color:#ffaa88;font-family:'Cinzel',serif;font-size:10px;
  padding:6px 12px;border-radius:2px;cursor:pointer;
  transition:all .2s;white-space:nowrap;letter-spacing:1px;
}
.bot-apk-dl-btn:hover{box-shadow:0 0 12px rgba(180,0,0,.4);}

.bot-img-wrap{
  position:relative;display:inline-block;cursor:pointer;
  border-radius:3px;overflow:hidden;
}
.bot-img-wrap img{
  max-width:220px;max-height:180px;display:block;
  border:1px solid rgba(140,0,0,.4);border-radius:3px;
  transition:transform .2s;
}
.bot-img-wrap:hover img{transform:scale(1.02);}
.bot-img-ov{
  position:absolute;inset:0;border-radius:3px;
  background:rgba(0,0,0,.0);transition:background .2s;
  display:flex;align-items:center;justify-content:center;
}
.bot-img-wrap:hover .bot-img-ov{background:rgba(0,0,0,.35);}
.bot-img-ov-icon{font-size:22px;opacity:0;transition:opacity .2s;}
.bot-img-wrap:hover .bot-img-ov-icon{opacity:1;}

.bot-album{display:flex;flex-wrap:wrap;gap:5px;max-width:260px;}
.bot-album img{
  width:74px;height:74px;object-fit:cover;
  border-radius:3px;border:1px solid rgba(140,0,0,.4);
  cursor:pointer;transition:transform .15s;
}
.bot-album img:hover{transform:scale(1.06);}

.bot-audio-bar{
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 14px;min-width:200px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);border-radius:3px;cursor:pointer;
}
.bot-audio-play{
  width:34px;height:34px;border-radius:50%;flex-shrink:0;
  background:rgba(120,0,0,.5);border:1px solid rgba(200,0,0,.5);
  display:flex;align-items:center;justify-content:center;
  font-size:14px;transition:all .2s;
}
.bot-audio-bar:hover .bot-audio-play{background:rgba(180,0,0,.6);}
.bot-audio-waves{display:flex;align-items:center;gap:2px;flex:1;height:28px;}
.bot-audio-bar{position:relative;}
.wave-bar{
  width:3px;border-radius:2px;background:rgba(180,0,0,.6);
  animation:waveform .8s ease-in-out infinite;
  transform-origin:center;
}

.mini-gate-wrap{
  position:relative;width:min(300px,85vw);cursor:pointer;
  user-select:none;-webkit-tap-highlight-color:transparent;
}
.mini-gate-canvas{position:absolute;inset:0;pointer-events:none;z-index:2;border-radius:3px;}
.mini-gate-body{
  position:relative;z-index:3;
  display:flex;align-items:center;gap:12px;
  padding:12px 16px;border-radius:3px;
  background:rgba(12,0,0,.97);
  border:1px solid rgba(180,0,0,.5);
  border-top:2px solid rgba(255,30,0,.7);
  animation:mini-gate-pulse 2.5s ease-in-out infinite;
  transition:transform .2s,box-shadow .2s;
  overflow:hidden;
}
.mini-gate-wrap:hover .mini-gate-body{transform:scale(1.03);}
.mini-gate-sweep{
  position:absolute;top:0;left:-100%;width:100%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,40,0,.07),transparent);
  animation:sweep 2.5s linear infinite;pointer-events:none;z-index:1;
}
.mini-gate-icon{font-size:22px;}
.mini-gate-text{font-family:'Cinzel',serif;font-size:11px;color:#ff4422;letter-spacing:2px;line-height:1.5;}
.mini-gate-hint{font-size:9px;color:rgba(255,80,0,.45);letter-spacing:2px;margin-top:2px;}
.mini-gate-arr{font-size:14px;color:rgba(255,60,0,.6);animation:pulse-red 1.5s ease-in-out infinite;}
.mini-gate-door-wrap{
  width:min(300px,85vw);height:160px;
  perspective:500px;position:relative;
  background:rgba(5,0,0,.9);
  border:1px solid rgba(160,0,0,.4);
  border-radius:3px;overflow:hidden;
  display:none;
}
.mini-gate-door-wrap.open{display:flex;align-items:center;justify-content:center;}
.mini-door-l,.mini-door-r{
  width:50%;height:100%;
  background:linear-gradient(180deg,#1a0000,#0d0000);
  border:1px solid rgba(160,0,0,.5);
  transform-origin:left center;
  display:flex;align-items:center;justify-content:center;
  position:absolute;
}
.mini-door-l{left:0;transform-origin:left center;}
.mini-door-r{right:0;transform-origin:right center;}
.mini-door-l.opening{animation:door-l-open .8s ease forwards;}
.mini-door-r.opening{animation:door-r-open .8s ease forwards;}
.mini-door-glyph{font-size:28px;opacity:.4;}
.mini-gate-pw-wrap{
  display:none;
  flex-direction:column;align-items:center;gap:8px;
  padding:12px 16px;
  background:rgba(8,0,0,.97);
  border:1px solid rgba(160,0,0,.4);border-radius:3px;
  width:min(300px,85vw);
}
.mini-gate-pw-wrap.show{display:flex;}
.mini-gate-pw-input{
  width:100%;background:rgba(12,0,0,.8);
  border:1px solid rgba(160,0,0,.4);border-radius:2px;
  color:#ff9977;font-family:'Cinzel',serif;font-size:15px;
  padding:9px 14px;outline:none;text-align:center;letter-spacing:5px;direction:ltr;
  caret-color:#cc0000;transition:border-color .25s;
}
.mini-gate-pw-input:focus{border-color:#cc0000;}
.mini-gate-pw-submit{
  width:100%;padding:9px;
  background:linear-gradient(135deg,#2a0000,#660000 40%,#990000 55%,#660000);
  border:1px solid rgba(180,0,0,.5);border-radius:2px;
  color:#ffddcc;font-family:'Cinzel Decorative',serif;font-size:12px;
  cursor:pointer;letter-spacing:2px;transition:all .2s;
}
.mini-gate-pw-submit:hover{box-shadow:0 0 20px rgba(180,0,0,.5);}
.mini-gate-pw-err{font-size:10px;color:#ff3300;letter-spacing:1px;min-height:14px;}

.bot-webpage-card{
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 14px;min-width:180px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);border-top:2px solid rgba(200,0,0,.6);
  border-radius:3px;cursor:pointer;transition:all .2s;
}
.bot-webpage-card:hover{border-top-color:#ff2200;}
`;
document.head.appendChild(css);

var html=`
<div id="bot-wrap">
  <div id="bot-bg-grid"></div>
  <div id="bot-header">
    <img id="bot-avatar" src="https://i.imgur.com/ft33w91.jpg" alt="">
    <div id="bot-name-wrap">
      <div id="bot-name">
        <svg id="bot-thunder-svg" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="9,1 3,12 7,12 5,21 11,10 7,10 9,1" fill="#ff2200" stroke="#cc0000" stroke-width=".5"/>
        </svg>
        ذو المنجل
      </div>
      <div id="bot-status">⬤ في الخدمة</div>
    </div>
  </div>
  <div id="bot-msgs"></div>
  <div id="bot-input-area">
    <button id="bot-send" title="إرسال">⚔</button>
    <div id="bot-input-wrap">
      <textarea id="bot-input" placeholder="· · · اكتب رسالتك · · ·" rows="1" autocomplete="off"></textarea>
    </div>
    <button class="bot-action-btn" id="bot-code-btn" title="تحرير كود">⌨</button>
    <button class="bot-action-btn" id="bot-attach-btn" title="إرفاق">📎</button>
    <input id="bot-img-input" type="file" accept="image/*,video/*,audio/*,.pdf,.zip,.apk,.txt,.js,.json,*/*" multiple>
  </div>
</div>

<div id="bot-code-editor">
  <div id="code-editor-topbar">
    <select id="code-editor-lang">
      <option value="js">JavaScript</option>
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="python">Python</option>
      <option value="json">JSON</option>
      <option value="txt">Text</option>
    </select>
    <div id="code-editor-title">✦ محرر الكود ✦</div>
  </div>
  <textarea id="code-textarea" spellcheck="false" autocomplete="off" dir="ltr"></textarea>
  <div id="code-editor-toolbar">
    <button class="code-tool-btn" id="ce-indent">← مسافة</button>
    <button class="code-tool-btn" id="ce-unindent">مسافة →</button>
    <button class="code-tool-btn" id="ce-home">⏮ بداية</button>
    <button class="code-tool-btn" id="ce-end">نهاية ⏭</button>
    <button class="code-tool-btn" id="ce-select-all">تحديد كل</button>
    <button class="code-tool-btn" id="ce-copy">نسخ</button>
    <button class="code-tool-btn" id="ce-wrap">التفاف</button>
    <button class="code-tool-btn" id="ce-send-code">⚔ إرسال</button>
    <button class="code-tool-btn danger" id="ce-close">✕ إغلاق</button>
  </div>
</div>

<div id="bot-img-viewer">
  <div id="imgv-canvas-wrap">
    <canvas id="imgv-canvas"></canvas>
  </div>
  <div id="bot-img-viewer-toolbar">
    <input type="color" id="imgv-color-pick" value="#ff2200">
    <input type="number" id="imgv-size-input" value="24" min="8" max="120" placeholder="حجم">
    <input type="text" id="imgv-text-input" placeholder="نص على الصورة...">
    <button class="imgv-btn" id="imgv-draw-mode">🖊 رسم</button>
    <button class="imgv-btn" id="imgv-text-mode">T نص</button>
    <button class="imgv-btn" id="imgv-crop-mode">✂ قص</button>
    <button class="imgv-btn" id="imgv-rotate-cw">↻ دوران</button>
    <button class="imgv-btn" id="imgv-flip-h">↔ أفقي</button>
    <button class="imgv-btn" id="imgv-flip-v">↕ عمودي</button>
    <button class="imgv-btn" id="imgv-undo">↩ تراجع</button>
    <button class="imgv-btn" id="imgv-dl">⬇ تنزيل</button>
    <button class="imgv-btn" id="imgv-share">↗ مشاركة</button>
    <button class="imgv-btn danger" id="imgv-close">✕ إغلاق</button>
  </div>
</div>

<div id="bot-media-panel">
  <div id="media-panel-body">
    <canvas id="audio-viz-canvas"></canvas>
  </div>
  <div id="media-panel-controls">
    <input type="range" id="media-seek" min="0" max="100" value="0" step="0.1">
    <div class="media-ctrl-row">
      <button class="mc-btn" id="mc-back5">⏮ 5ث</button>
      <button class="mc-btn" id="mc-play">▶ تشغيل</button>
      <button class="mc-btn" id="mc-fwd5">5ث ⏭</button>
      <span id="mc-speed-lbl">× 1.0</span>
      <button class="mc-btn" id="mc-slower">🐢</button>
      <button class="mc-btn" id="mc-faster">🚀</button>
    </div>
    <div class="media-ctrl-row" id="mc-video-row">
      <button class="mc-btn" id="mc-flip-h">↔ أفقي</button>
      <button class="mc-btn" id="mc-flip-v">↕ عمودي</button>
      <button class="mc-btn" id="mc-quality-down">📉 جودة</button>
      <button class="mc-btn" id="mc-quality-up">📈 جودة</button>
    </div>
    <div class="media-ctrl-row" id="mc-audio-row" style="display:none;">
      <button class="mc-btn" id="mc-pitch-down">🎵 رقيق</button>
      <button class="mc-btn" id="mc-pitch-up">🎵 غليظ</button>
    </div>
    <div class="media-ctrl-row">
      <button class="mc-btn" id="mc-dl">⬇ تنزيل</button>
      <button class="mc-btn" id="mc-share">↗ مشاركة</button>
      <button class="mc-btn danger" id="mc-close">✕ إغلاق</button>
    </div>
  </div>
</div>

<div id="txt-view-panel">
  <div id="txt-view-topbar">
    <span style="font-size:18px;">📄</span>
    <span id="txt-view-title">معاينة الملف</span>
  </div>
  <div id="txt-view-body"></div>
  <div id="txt-view-tools">
    <button class="code-tool-btn" id="tvp-dl">⬇ تنزيل</button>
    <button class="code-tool-btn danger" id="tvp-close">✕ إغلاق</button>
  </div>
</div>
`;

var tmp=document.createElement('div');
tmp.innerHTML=html;
while(tmp.firstChild)document.body.appendChild(tmp.firstChild);

var msgsEl=document.getElementById('bot-msgs');
var inputEl=document.getElementById('bot-input');
var sendEl=document.getElementById('bot-send');
var attachBtn=document.getElementById('bot-attach-btn');
var fileInput=document.getElementById('bot-img-input');
var codeBtn=document.getElementById('bot-code-btn');

(function(){
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
        setTimeout(function(){if(e.parentNode)e.parentNode.removeChild(e);},1500);
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
      msgsEl.scrollTop=msgsEl.scrollHeight;
      setTimeout(next,18+Math.random()*12);
    } else {
      if(typeof done==='function')done();
    }
  }
  next();
}

function addMsg(role,content,type,opts){
  var wrap=document.createElement('div');
  wrap.className='bot-msg '+(role==='user'?'user':'bot');
  var bubble=document.createElement('div');
  bubble.className='bot-bubble';
  if(role==='bot'){
    var ew=document.createElement('div');ew.className='bot-ember-wrap';bubble.appendChild(ew);
    setTimeout(function(){spawnEmbers(ew);},80);
  }
  var inner=buildContent(content,type,opts);
  if(inner)bubble.appendChild(inner);
  if(role==='bot'){
    var av=document.createElement('img');
    av.className='bot-mini-avatar';
    av.src='https://i.imgur.com/ft33w91.jpg';av.alt='';
    wrap.appendChild(av);
  }
  wrap.appendChild(bubble);
  msgsEl.appendChild(wrap);
  msgsEl.scrollTop=msgsEl.scrollHeight;
  if(role==='bot'&&(type==='text'||!type)&&typeof content==='string'){
    var span=inner;
    typeText(span,content,function(){
      playTTS(content);
    });
  }
  return bubble;
}

function buildContent(content,type,opts){
  type=type||'text';
  if(type==='text'||!type){
    var s=document.createElement('span');
    s.className='bot-bubble-text';
    if(typeof content==='string')s.textContent=content;
    return s;
  }
  if(type==='dom'&&content instanceof Element)return content;
  if(type==='image')return buildImgWrap(content);
  if(type==='album')return buildAlbum(content);
  if(type==='video')return buildVideoEl(content);
  if(type==='audio')return buildAudioBar(content,opts);
  if(type==='file')return buildFileCard(content);
  if(type==='txt'||type==='js'||type==='json'||type==='code')return buildTxtFile(content);
  if(type==='apk'||type==='app')return buildApkCard(content);
  if(type==='webpage')return buildWebpageCard(content);
  if(type==='gate'||type==='hell_gate')return buildMiniGate(content);
  var s=document.createElement('span');s.className='bot-bubble-text';
  s.textContent=typeof content==='string'?content:JSON.stringify(content);
  return s;
}

function buildImgWrap(src){
  var w=document.createElement('div');w.className='bot-img-wrap';
  var img=document.createElement('img');img.src=src;img.alt='';
  var ov=document.createElement('div');ov.className='bot-img-ov';
  var ic=document.createElement('span');ic.className='bot-img-ov-icon';ic.textContent='🔍';
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
function buildVideoEl(src){
  var w=document.createElement('div');
  w.style.cssText='position:relative;display:inline-block;border-radius:3px;overflow:hidden;border:1px solid rgba(140,0,0,.4);cursor:pointer;';
  var vid=document.createElement('video');vid.src=src;vid.preload='metadata';
  vid.style.cssText='display:block;max-width:240px;pointer-events:none;';
  var ov=document.createElement('div');
  ov.style.cssText='position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.3);';
  var pb=document.createElement('div');
  pb.style.cssText='width:44px;height:44px;border-radius:50%;background:rgba(180,0,0,.8);display:flex;align-items:center;justify-content:center;font-size:18px;';
  pb.textContent='▶';
  ov.appendChild(pb);w.appendChild(vid);w.appendChild(ov);
  var tapTime=0;
  w.addEventListener('click',function(){
    var now=Date.now();
    if(now-tapTime<350){openMediaPanel(src,'video');return;}
    tapTime=now;
    if(vid.paused){vid.play().catch(function(){});pb.textContent='⏸';}
    else{vid.pause();pb.textContent='▶';}
  });
  return w;
}
function buildAudioBar(src,opts){
  var label=(opts&&opts.name)?opts.name:'صوت';
  var w=document.createElement('div');w.className='bot-audio-bar';
  var pb=document.createElement('div');pb.className='bot-audio-play';pb.textContent='▶';
  var waves=document.createElement('div');waves.className='bot-audio-waves';
  var bars=20;
  for(var i=0;i<bars;i++){
    var b=document.createElement('div');b.className='wave-bar';
    var h=4+Math.random()*22;
    b.style.setProperty('--wh',h+'px');
    b.style.animationDuration=(0.5+Math.random()*.7)+'s';
    b.style.animationDelay=(Math.random()*.5)+'s';
    b.style.height='4px';
    waves.appendChild(b);
  }
  var lbl=document.createElement('span');
  lbl.style.cssText='font-size:10px;color:rgba(200,60,40,.5);letter-spacing:1px;white-space:nowrap;';
  lbl.textContent=label;
  w.appendChild(pb);w.appendChild(waves);w.appendChild(lbl);
  var audio=new Audio(src);
  var playing=false;
  var tapTime=0;
  pb.addEventListener('click',function(e){
    e.stopPropagation();
    if(playing){audio.pause();pb.textContent='▶';playing=false;waves.querySelectorAll('.wave-bar').forEach(function(b){b.style.height='4px';});}
    else{audio.play().catch(function(){});pb.textContent='⏸';playing=true;waves.querySelectorAll('.wave-bar').forEach(function(b){b.style.height='';});}
  });
  w.addEventListener('click',function(){
    var now=Date.now();
    if(now-tapTime<350){openMediaPanel(src,'audio');}
    tapTime=now;
  });
  return w;
}
function buildFileCard(item){
  var icons={'image':'🖼','video':'🎬','audio':'🎵','pdf':'📄','zip':'🗜','rar':'🗜','exe':'💻','default':'📦'};
  var ext=(item.name||'').split('.').pop().toLowerCase();
  var icon=icons[ext]||icons.default;
  var w=document.createElement('div');w.className='bot-file-card';
  var ni=document.createElement('span');ni.className='bot-file-icon';ni.textContent=icon;
  var info=document.createElement('div');
  var nm=document.createElement('div');nm.className='bot-file-name';nm.textContent=item.name||'ملف';
  var mt=document.createElement('div');mt.className='bot-file-meta';mt.textContent=(ext.toUpperCase()||'')+(item.size?' · '+item.size:'');
  info.appendChild(nm);info.appendChild(mt);
  w.appendChild(ni);w.appendChild(info);
  w.addEventListener('click',function(){
    if(item.path){var a=document.createElement('a');a.href=item.path;a.download=item.name||'file';a.click();}
    else if(item.url){var a=document.createElement('a');a.href=item.url;a.download=item.name||'file';a.click();}
  });
  return w;
}
function buildTxtFile(item){
  var icons={js:'⚙',json:'{}',txt:'📝',html:'🌐',css:'🎨',py:'🐍'};
  var ext=(item.name||'').split('.').pop().toLowerCase();
  var icon=icons[ext]||'📄';
  var w=document.createElement('div');w.className='bot-txt-file';
  var hdr=document.createElement('div');hdr.className='bot-txt-file-header';
  var ic=document.createElement('span');ic.className='bot-txt-file-icon';ic.textContent=icon;
  var nm=document.createElement('span');nm.className='bot-txt-file-name';nm.textContent=item.name||'ملف';
  hdr.appendChild(ic);hdr.appendChild(nm);
  var prev=document.createElement('div');prev.className='bot-txt-file-preview';
  prev.textContent=(item.content||item.text||'').slice(0,80)+'...';
  w.appendChild(hdr);w.appendChild(prev);
  w.addEventListener('click',function(){openTxtView(item);});
  return w;
}
function buildApkCard(item){
  var w=document.createElement('div');w.className='bot-apk-card';
  var ic=document.createElement('span');ic.className='bot-apk-icon';ic.textContent='📲';
  var info=document.createElement('div');info.className='bot-apk-info';
  var nm=document.createElement('div');nm.className='bot-apk-name';nm.textContent=item.name||'تطبيق.apk';
  var mt=document.createElement('div');mt.className='bot-apk-meta';mt.textContent=(item.version?'v'+item.version+' · ':'')+( item.size||'APK');
  var desc=document.createElement('div');desc.style.cssText='font-size:11px;color:rgba(200,80,60,.45);margin-top:2px;';desc.textContent=item.desc||'';
  var dlBtn=document.createElement('button');dlBtn.className='bot-apk-dl-btn';dlBtn.textContent='⬇ تحميل';
  info.appendChild(nm);info.appendChild(mt);if(item.desc)info.appendChild(desc);
  w.appendChild(ic);w.appendChild(info);w.appendChild(dlBtn);
  dlBtn.addEventListener('click',function(e){
    e.stopPropagation();
    if(item.path||item.url){var a=document.createElement('a');a.href=item.path||item.url;a.download=item.name||'app.apk';a.click();}
  });
  return w;
}
function buildWebpageCard(item){
  var w=document.createElement('div');w.className='bot-webpage-card';
  var ic=document.createElement('span');ic.style.fontSize='20px';ic.textContent='🌐';
  var info=document.createElement('div');
  var nm=document.createElement('div');nm.style.cssText='font-size:12px;color:#ffaa88;';nm.textContent=item.name||'صفحة';
  var pt=document.createElement('div');pt.style.cssText='font-size:10px;color:rgba(200,80,60,.45);margin-top:2px;word-break:break-all;';pt.textContent=item.path||item.url||'';
  info.appendChild(nm);info.appendChild(pt);
  w.appendChild(ic);w.appendChild(info);
  w.addEventListener('click',function(){
    var url=item.path||item.url||'';
    if(url.endsWith('.js')){var s=document.createElement('script');s.src=url;document.head.appendChild(s);}
    else{window.open(url,'_blank');}
  });
  return w;
}

function buildMiniGate(data){
  data=data||{};
  var container=document.createElement('div');
  container.style.display='flex';container.style.flexDirection='column';container.style.gap='6px';

  var miniWrap=document.createElement('div');miniWrap.className='mini-gate-wrap';

  var cv=document.createElement('canvas');cv.className='mini-gate-canvas';
  var sweep=document.createElement('div');sweep.className='mini-gate-sweep';
  var body=document.createElement('div');body.className='mini-gate-body';
  body.innerHTML='<span class="mini-gate-icon">🔥</span><div><div class="mini-gate-text">♦♠ '+(data.label||'بوابة الجحيم')+'♠♦</div><div class="mini-gate-hint">انقر للدخول</div></div><span class="mini-gate-arr">◀</span>';

  miniWrap.appendChild(cv);miniWrap.appendChild(sweep);miniWrap.appendChild(body);
  container.appendChild(miniWrap);

  var pwWrap=document.createElement('div');pwWrap.className='mini-gate-pw-wrap';
  var pwTitle=document.createElement('div');pwTitle.style.cssText='font-family:Cinzel Decorative,serif;font-size:11px;color:#ff4422;letter-spacing:3px;';pwTitle.textContent='🔑 كلمة السر';
  var pwInp=document.createElement('input');pwInp.className='mini-gate-pw-input';pwInp.type='password';pwInp.placeholder='· · · · · · · ·';pwInp.maxLength=60;
  var pwBtn=document.createElement('button');pwBtn.className='mini-gate-pw-submit';pwBtn.textContent='⚔ دخول';
  var pwErr=document.createElement('div');pwErr.className='mini-gate-pw-err';
  pwWrap.appendChild(pwTitle);pwWrap.appendChild(pwInp);pwWrap.appendChild(pwBtn);pwWrap.appendChild(pwErr);
  container.appendChild(pwWrap);

  var doorWrap=document.createElement('div');doorWrap.className='mini-gate-door-wrap';
  var dL=document.createElement('div');dL.className='mini-door-l';dL.innerHTML='<span class="mini-door-glyph">⚜</span>';
  var dR=document.createElement('div');dR.className='mini-door-r';dR.innerHTML='<span class="mini-door-glyph">⚜</span>';
  doorWrap.appendChild(dL);doorWrap.appendChild(dR);
  container.appendChild(doorWrap);

  initMiniLightning(cv,miniWrap);

  miniWrap.addEventListener('click',function(){
    pwWrap.classList.toggle('show');
    if(pwWrap.classList.contains('show'))setTimeout(function(){pwInp.focus();},100);
  });

  var correctPw=data.password||GATE_PW||'666';
  function tryOpen(){
    if(pwInp.value.trim()===correctPw){
      pwErr.textContent='';
      pwWrap.classList.remove('show');
      doorWrap.classList.add('open');
      dL.classList.add('opening');dR.classList.add('opening');
      var sfx=new Audio('open.ogg');sfx.volume=0.8;sfx.play().catch(function(){});
      setTimeout(function(){
        doorWrap.classList.remove('open');
        dL.classList.remove('opening');dR.classList.remove('opening');
        if(data.src){var s=document.createElement('script');s.src=data.src;document.head.appendChild(s);}
        else if(data.action&&typeof data.action==='function'){data.action();}
        else if(data.url){window.open(data.url,'_blank');}
      },5000);
    } else {
      pwErr.textContent='✖ كلمة السر خاطئة';
      pwInp.style.borderColor='#cc0000';
      setTimeout(function(){pwInp.style.borderColor='';pwErr.textContent='';},2200);
    }
  }
  pwBtn.addEventListener('click',tryOpen);
  pwInp.addEventListener('keydown',function(e){if(e.key==='Enter')tryOpen();});

  return container;
}

function initMiniLightning(cv,container){
  var ctx=cv.getContext('2d');
  var W,H;
  function resize(){
    W=cv.width=container.offsetWidth||280;
    H=cv.height=container.offsetHeight||58;
  }
  setTimeout(resize,50);
  var bolts=[];
  function spawnBolt(){
    var x=W*0.05+Math.random()*W*0.9,pts=[{x:x,y:0}];
    for(var i=0;i<6;i++){x+=(Math.random()-.5)*40;pts.push({x:x,y:(i+1)*(H/6)});}
    return{pts:pts,life:1,decay:.18+Math.random()*.14};
  }
  function frame(){
    ctx.clearRect(0,0,W,H);
    if(Math.random()<.15)bolts.push(spawnBolt());
    for(var i=bolts.length-1;i>=0;i--){
      var b=bolts[i];
      ctx.beginPath();ctx.moveTo(b.pts[0].x,b.pts[0].y);
      for(var j=1;j<b.pts.length;j++)ctx.lineTo(b.pts[j].x,b.pts[j].y);
      ctx.strokeStyle='rgba(255,0,0,'+b.life+')';ctx.lineWidth=1.5;
      ctx.shadowColor='#ff0000';ctx.shadowBlur=10;ctx.stroke();ctx.shadowBlur=0;
      b.life-=b.decay;if(b.life<=0)bolts.splice(i,1);
    }
    requestAnimationFrame(frame);
  }
  setInterval(function(){bolts.push(spawnBolt());},2000);
  bolts.push(spawnBolt());
  frame();
}

var GATE_PW='666';

var _imgSrc='',_imgFlipH=false,_imgFlipV=false,_imgRot=0;
var _imgCanvas,_imgCtx,_imgHistory=[],_imgMode='none';
var _drawActive=false,_lastX=0,_lastY=0;
var _dragTextEl=null,_dragOX=0,_dragOY=0;

function openImgViewer(src){
  _imgSrc=src;_imgFlipH=false;_imgFlipV=false;_imgRot=0;
  _imgMode='none';_imgHistory=[];
  document.getElementById('bot-img-viewer').style.display='flex';
  _imgCanvas=document.getElementById('imgv-canvas');
  _imgCtx=_imgCanvas.getContext('2d');
  var img=new Image();img.crossOrigin='anonymous';
  img.onload=function(){
    _imgCanvas.width=img.width;_imgCanvas.height=img.height;
    _imgCtx.drawImage(img,0,0);
    _imgHistory=[_imgCtx.getImageData(0,0,_imgCanvas.width,_imgCanvas.height)];
    scaleCanvas();
  };
  img.src=src;
  clearModeBtn();
}
function scaleCanvas(){
  var wrap=document.getElementById('imgv-canvas-wrap');
  var mw=wrap.clientWidth*.95,mh=wrap.clientHeight*.95;
  var sc=Math.min(mw/_imgCanvas.width,mh/_imgCanvas.height,1);
  _imgCanvas.style.width=(_imgCanvas.width*sc)+'px';
  _imgCanvas.style.height=(_imgCanvas.height*sc)+'px';
}
function clearModeBtn(){
  document.querySelectorAll('.imgv-btn').forEach(function(b){b.classList.remove('active');});
}
function imgSaveHistory(){
  _imgHistory.push(_imgCtx.getImageData(0,0,_imgCanvas.width,_imgCanvas.height));
  if(_imgHistory.length>30)_imgHistory.shift();
}

_imgCanvas=document.getElementById('imgv-canvas');
_imgCanvas.addEventListener('pointerdown',function(e){
  if(_imgMode==='draw'){
    _drawActive=true;
    var r=_imgCanvas.getBoundingClientRect();
    var sx=_imgCanvas.width/r.width,sy=_imgCanvas.height/r.height;
    _lastX=(e.clientX-r.left)*sx;_lastY=(e.clientY-r.top)*sy;
    _imgCtx.beginPath();_imgCtx.moveTo(_lastX,_lastY);
  }
  if(_imgMode==='crop'){
    var r=_imgCanvas.getBoundingClientRect();
    var sx=_imgCanvas.width/r.width,sy=_imgCanvas.height/r.height;
    _lastX=(e.clientX-r.left)*sx;_lastY=(e.clientY-r.top)*sy;
    _drawActive=true;
  }
});
_imgCanvas.addEventListener('pointermove',function(e){
  if(!_drawActive)return;
  var r=_imgCanvas.getBoundingClientRect();
  var sx=_imgCanvas.width/r.width,sy=_imgCanvas.height/r.height;
  var x=(e.clientX-r.left)*sx,y=(e.clientY-r.top)*sy;
  if(_imgMode==='draw'){
    _imgCtx.lineTo(x,y);
    _imgCtx.strokeStyle=document.getElementById('imgv-color-pick').value;
    _imgCtx.lineWidth=parseInt(document.getElementById('imgv-size-input').value)||3;
    _imgCtx.lineCap='round';_imgCtx.lineJoin='round';_imgCtx.stroke();
    _lastX=x;_lastY=y;
  }
  if(_imgMode==='crop'){
    _imgCtx.putImageData(_imgHistory[_imgHistory.length-1],0,0);
    _imgCtx.strokeStyle='rgba(255,0,0,.8)';_imgCtx.lineWidth=2;_imgCtx.setLineDash([6,3]);
    _imgCtx.strokeRect(_lastX,_lastY,x-_lastX,y-_lastY);_imgCtx.setLineDash([]);
  }
});
_imgCanvas.addEventListener('pointerup',function(e){
  if(!_drawActive)return;
  _drawActive=false;
  if(_imgMode==='draw')imgSaveHistory();
  if(_imgMode==='crop'){
    var r=_imgCanvas.getBoundingClientRect();
    var sx=_imgCanvas.width/r.width,sy=_imgCanvas.height/r.height;
    var x=(e.clientX-r.left)*sx,y=(e.clientY-r.top)*sy;
    var cx=Math.min(_lastX,x),cy=Math.min(_lastY,y),cw=Math.abs(x-_lastX),ch=Math.abs(y-_lastY);
    if(cw>4&&ch>4){
      var data=_imgCtx.getImageData(cx,cy,cw,ch);
      _imgCanvas.width=cw;_imgCanvas.height=ch;
      _imgCtx.putImageData(data,0,0);
      imgSaveHistory();scaleCanvas();
    }
  }
});

document.getElementById('imgv-draw-mode').addEventListener('click',function(){
  _imgMode=_imgMode==='draw'?'none':'draw';clearModeBtn();if(_imgMode==='draw')this.classList.add('active');
});
document.getElementById('imgv-text-mode').addEventListener('click',function(){
  _imgMode='text';clearModeBtn();this.classList.add('active');
  var txt=document.getElementById('imgv-text-input').value.trim();
  if(!txt)return;
  var color=document.getElementById('imgv-color-pick').value;
  var size=parseInt(document.getElementById('imgv-size-input').value)||24;
  _imgCtx.font='bold '+size+'px Cairo,sans-serif';
  _imgCtx.fillStyle=color;
  _imgCtx.textAlign='center';
  _imgCtx.shadowColor='rgba(0,0,0,.6)';_imgCtx.shadowBlur=4;
  _imgCtx.fillText(txt,_imgCanvas.width/2,_imgCanvas.height/2);
  _imgCtx.shadowBlur=0;
  imgSaveHistory();
});
document.getElementById('imgv-crop-mode').addEventListener('click',function(){
  _imgMode=_imgMode==='crop'?'none':'crop';clearModeBtn();if(_imgMode==='crop')this.classList.add('active');
});
document.getElementById('imgv-rotate-cw').addEventListener('click',function(){
  _imgRot=(_imgRot+90)%360;
  var tmp=new OffscreenCanvas?new OffscreenCanvas(_imgCanvas.height,_imgCanvas.width):document.createElement('canvas');
  tmp.width=_imgCanvas.height;tmp.height=_imgCanvas.width;
  var tc=tmp.getContext('2d');
  tc.translate(tmp.width/2,tmp.height/2);tc.rotate(Math.PI/2);
  tc.drawImage(_imgCanvas,-_imgCanvas.width/2,-_imgCanvas.height/2);
  _imgCanvas.width=tmp.width;_imgCanvas.height=tmp.height;
  _imgCtx.drawImage(tmp,0,0);imgSaveHistory();scaleCanvas();
});
document.getElementById('imgv-flip-h').addEventListener('click',function(){
  var tmp=document.createElement('canvas');tmp.width=_imgCanvas.width;tmp.height=_imgCanvas.height;
  var tc=tmp.getContext('2d');tc.scale(-1,1);tc.drawImage(_imgCanvas,-_imgCanvas.width,0);
  _imgCtx.drawImage(tmp,0,0);imgSaveHistory();
});
document.getElementById('imgv-flip-v').addEventListener('click',function(){
  var tmp=document.createElement('canvas');tmp.width=_imgCanvas.width;tmp.height=_imgCanvas.height;
  var tc=tmp.getContext('2d');tc.scale(1,-1);tc.drawImage(_imgCanvas,0,-_imgCanvas.height);
  _imgCtx.drawImage(tmp,0,0);imgSaveHistory();
});
document.getElementById('imgv-undo').addEventListener('click',function(){
  if(_imgHistory.length>1){_imgHistory.pop();_imgCtx.putImageData(_imgHistory[_imgHistory.length-1],0,0);}
});
document.getElementById('imgv-dl').addEventListener('click',function(){
  var a=document.createElement('a');a.href=_imgCanvas.toDataURL('image/png');a.download='edited.png';a.click();
});
document.getElementById('imgv-share').addEventListener('click',function(){
  _imgCanvas.toBlob(function(blob){
    var url=URL.createObjectURL(blob);
    if(navigator.share){navigator.share({files:[new File([blob],'image.png',{type:'image/png'})]}).catch(function(){navigator.clipboard&&navigator.clipboard.writeText(url);});}
    else if(navigator.clipboard){navigator.clipboard.writeText(url);}
  });
});
document.getElementById('imgv-close').addEventListener('click',function(){
  document.getElementById('bot-img-viewer').style.display='none';
});

var _curMedia=null,_mediaSpeed=1.0,_mediaType='video';
var _audioCtx=null,_pitchNode=null;

function openMediaPanel(src,type){
  _mediaType=type;_mediaSpeed=1.0;
  var panel=document.getElementById('bot-media-panel');
  var body=document.getElementById('media-panel-body');
  var vizCanvas=document.getElementById('audio-viz-canvas');
  vizCanvas.style.display='none';
  body.querySelectorAll('video,audio').forEach(function(el){el.pause();el.src='';el.remove();});
  if(type==='video'){
    _curMedia=document.createElement('video');_curMedia.src=src;_curMedia.controls=false;
    body.appendChild(_curMedia);
    document.getElementById('mc-video-row').style.display='flex';
    document.getElementById('mc-audio-row').style.display='none';
  } else {
    _curMedia=document.createElement('audio');_curMedia.src=src;
    body.appendChild(_curMedia);
    document.getElementById('mc-video-row').style.display='none';
    document.getElementById('mc-audio-row').style.display='flex';
    vizCanvas.style.display='block';
    initAudioViz(_curMedia,vizCanvas);
  }
  document.getElementById('mc-speed-lbl').textContent='× '+_mediaSpeed.toFixed(1);
  panel.style.display='flex';
  _curMedia.addEventListener('timeupdate',function(){
    if(!_curMedia.duration)return;
    document.getElementById('media-seek').value=(_curMedia.currentTime/_curMedia.duration)*100;
  });
}
function initAudioViz(audio,canvas){
  if(!window.AudioContext&&!window.webkitAudioContext)return;
  var ac=new(window.AudioContext||window.webkitAudioContext)();
  var src2=ac.createMediaElementSource(audio);
  var analyser=ac.createAnalyser();analyser.fftSize=256;
  src2.connect(analyser);analyser.connect(ac.destination);
  var bufLen=analyser.frequencyBinCount;
  var dataArr=new Uint8Array(bufLen);
  var ctx2=canvas.getContext('2d');
  canvas.width=500;canvas.height=120;
  function draw(){
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArr);
    ctx2.clearRect(0,0,500,120);
    var bw=500/bufLen;
    for(var i=0;i<bufLen;i++){
      var h=(dataArr[i]/255)*110;
      ctx2.fillStyle='rgba(180,0,0,'+(0.4+dataArr[i]/512)+')';
      ctx2.fillRect(i*bw,120-h,bw-1,h);
    }
  }
  draw();
}
document.getElementById('media-seek').oninput=function(){if(_curMedia&&_curMedia.duration)_curMedia.currentTime=_curMedia.duration*this.value/100;};
document.getElementById('mc-play').addEventListener('click',function(){
  if(!_curMedia)return;
  if(_curMedia.paused){_curMedia.play().catch(function(){});this.textContent='⏸ إيقاف';}
  else{_curMedia.pause();this.textContent='▶ تشغيل';}
});
document.getElementById('mc-back5').addEventListener('click',function(){if(_curMedia)_curMedia.currentTime=Math.max(0,_curMedia.currentTime-5);});
document.getElementById('mc-fwd5').addEventListener('click',function(){if(_curMedia)_curMedia.currentTime=Math.min(_curMedia.duration||999,_curMedia.currentTime+5);});
document.getElementById('mc-slower').addEventListener('click',function(){if(!_curMedia)return;_mediaSpeed=Math.max(.25,Math.round((_mediaSpeed-.25)*100)/100);_curMedia.playbackRate=_mediaSpeed;document.getElementById('mc-speed-lbl').textContent='× '+_mediaSpeed.toFixed(2);});
document.getElementById('mc-faster').addEventListener('click',function(){if(!_curMedia)return;_mediaSpeed=Math.min(4,Math.round((_mediaSpeed+.25)*100)/100);_curMedia.playbackRate=_mediaSpeed;document.getElementById('mc-speed-lbl').textContent='× '+_mediaSpeed.toFixed(2);});
document.getElementById('mc-flip-h').addEventListener('click',function(){if(_curMedia&&_mediaType==='video'){var c=_curMedia.style.transform;_curMedia.style.transform=c.includes('scaleX(-1)')?c.replace('scaleX(-1)',''):c+' scaleX(-1)';}});
document.getElementById('mc-flip-v').addEventListener('click',function(){if(_curMedia&&_mediaType==='video'){var c=_curMedia.style.transform;_curMedia.style.transform=c.includes('scaleY(-1)')?c.replace('scaleY(-1)',''):c+' scaleY(-1)';}});
document.getElementById('mc-quality-down').addEventListener('click',function(){if(_curMedia&&_mediaType==='video'){var q=parseFloat(_curMedia.style.filter&&_curMedia.style.filter.match(/blur\((\S+)px\)/)?_curMedia.style.filter.match(/blur\((\S+)px\)/)[1]:0);_curMedia.style.filter='blur('+(q+1)+'px) brightness(.9)';}});
document.getElementById('mc-quality-up').addEventListener('click',function(){if(_curMedia&&_mediaType==='video'){_curMedia.style.filter='';}});
document.getElementById('mc-pitch-down').addEventListener('click',function(){if(_curMedia){_curMedia.preservesPitch=false;_curMedia.playbackRate=Math.max(.25,_curMedia.playbackRate-.25);document.getElementById('mc-speed-lbl').textContent='× '+_curMedia.playbackRate.toFixed(2);}});
document.getElementById('mc-pitch-up').addEventListener('click',function(){if(_curMedia){_curMedia.preservesPitch=false;_curMedia.playbackRate=Math.min(4,_curMedia.playbackRate+.25);document.getElementById('mc-speed-lbl').textContent='× '+_curMedia.playbackRate.toFixed(2);}});
document.getElementById('mc-dl').addEventListener('click',function(){if(!_curMedia||!_curMedia.src)return;var a=document.createElement('a');a.href=_curMedia.src;a.download='media';a.click();});
document.getElementById('mc-share').addEventListener('click',function(){if(!_curMedia)return;if(navigator.share){navigator.share({url:_curMedia.src}).catch(function(){});}else if(navigator.clipboard){navigator.clipboard.writeText(_curMedia.src);}});
document.getElementById('mc-close').addEventListener('click',function(){
  if(_curMedia){_curMedia.pause();_curMedia.src='';}_curMedia=null;
  document.getElementById('bot-media-panel').style.display='none';
  document.getElementById('mc-play').textContent='▶ تشغيل';
});

function openTxtView(item){
  document.getElementById('txt-view-title').textContent=item.name||'ملف';
  document.getElementById('txt-view-body').textContent=item.content||item.text||'';
  document.getElementById('txt-view-panel').style.display='flex';
  document.getElementById('tvp-dl').onclick=function(){
    var blob=new Blob([item.content||item.text||''],{type:'text/plain'});
    var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=item.name||'file.txt';a.click();
  };
}
document.getElementById('tvp-close').addEventListener('click',function(){document.getElementById('txt-view-panel').style.display='none';});

(function(){
  var editor=document.getElementById('bot-code-editor');
  var ta=document.getElementById('code-textarea');
  codeBtn.addEventListener('click',function(){
    var cur=inputEl.value;
    ta.value=cur;
    inputEl.classList.add('code-mode');
    editor.classList.add('show');
    ta.focus();
  });
  document.getElementById('ce-close').addEventListener('click',function(){editor.classList.remove('show');});
  document.getElementById('ce-send-code').addEventListener('click',function(){
    var val=ta.value.trim();if(!val)return;
    editor.classList.remove('show');
    inputEl.classList.remove('code-mode');
    inputEl.value='';
    dispatchMessage(val);
  });
  document.getElementById('ce-indent').addEventListener('click',function(){
    var s=ta.selectionStart,e=ta.selectionEnd;
    ta.value=ta.value.slice(0,s)+'  '+ta.value.slice(e);
    ta.selectionStart=ta.selectionEnd=s+2;ta.focus();
  });
  document.getElementById('ce-unindent').addEventListener('click',function(){
    var s=ta.selectionStart;
    if(ta.value.slice(s-2,s)==='  '){ta.value=ta.value.slice(0,s-2)+ta.value.slice(s);ta.selectionStart=ta.selectionEnd=s-2;}
    ta.focus();
  });
  document.getElementById('ce-home').addEventListener('click',function(){ta.selectionStart=ta.selectionEnd=0;ta.focus();});
  document.getElementById('ce-end').addEventListener('click',function(){ta.selectionStart=ta.selectionEnd=ta.value.length;ta.focus();});
  document.getElementById('ce-select-all').addEventListener('click',function(){ta.select();ta.focus();});
  document.getElementById('ce-copy').addEventListener('click',function(){ta.select();document.execCommand('copy');});
  document.getElementById('ce-wrap').addEventListener('click',function(){ta.style.whiteSpace=ta.style.whiteSpace==='pre'?'pre-wrap':'pre';});
  ta.addEventListener('keydown',function(e){
    if(e.key==='Tab'){e.preventDefault();var s=this.selectionStart;this.value=this.value.slice(0,s)+'  '+this.value.slice(this.selectionEnd);this.selectionStart=this.selectionEnd=s+2;}
  });
})();

attachBtn.addEventListener('click',function(){fileInput.click();});
fileInput.addEventListener('change',function(){
  var files=Array.from(this.files||[]);
  files.forEach(function(f){
    var type=f.type.split('/')[0];
    var url=URL.createObjectURL(f);
    var ext=f.name.split('.').pop().toLowerCase();
    if(type==='image'){addMsg('user',url,'image');}
    else if(type==='video'){addMsg('user',url,'video');}
    else if(type==='audio'){addMsg('user',url,'audio',{name:f.name});}
    else if(['txt','js','json','html','css','py'].includes(ext)){
      var reader=new FileReader();
      reader.onload=function(ev){addMsg('user',{name:f.name,content:ev.target.result},ext);};
      reader.readAsText(f);
    }
    else if(ext==='apk'){addMsg('user',{name:f.name,size:formatSize(f.size),url:url},'apk');}
    else{addMsg('user',{name:f.name,size:formatSize(f.size),url:url},'file');}
  });
  fileInput.value='';
});
function formatSize(b){if(b>=1048576)return(b/1048576).toFixed(1)+' MB';if(b>=1024)return(b/1024).toFixed(1)+' KB';return b+' B';}

function playTTS(text){
  if(!window.speechSynthesis||!text)return;
  var utter=new SpeechSynthesisUtterance(text);
  utter.lang='ar-SA';utter.rate=1;utter.pitch=1;
  window.speechSynthesis.speak(utter);
}

function addTypingIndicator(){
  var wrap=document.createElement('div');wrap.className='bot-msg bot';wrap.id='bot-typing-indicator';
  var av=document.createElement('img');av.className='bot-mini-avatar';av.src='https://i.imgur.com/ft33w91.jpg';av.alt='';
  var bubble=document.createElement('div');bubble.className='bot-bubble';
  var typing=document.createElement('div');typing.className='bot-typing';
  typing.innerHTML='<span></span><span></span><span></span>';
  bubble.appendChild(typing);wrap.appendChild(av);wrap.appendChild(bubble);
  msgsEl.appendChild(wrap);msgsEl.scrollTop=msgsEl.scrollHeight;
  return wrap;
}
function removeTypingIndicator(){
  var el=document.getElementById('bot-typing-indicator');if(el)el.remove();
}

function dispatchMessage(t){
  addMsg('user',t,'text');
  var typingEl=addTypingIndicator();
  var delay=400+Math.random()*500;
  setTimeout(function(){
    removeTypingIndicator();
    var handled=false;
    if(window.ADMIN&&typeof window.ADMIN.handleMessage==='function'){
      handled=ADMIN.handleMessage(t,function(role,content,type){addMsg(role,content,type);});
    }
    if(!handled){
      addMsg('bot',window.ADMIN&&window.ADMIN.chatResponses?ADMIN.chatResponses.default:'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة','text');
    }
  },delay);
}

function handleSend(){
  var t=inputEl.value.trim();if(!t)return;
  inputEl.value='';inputEl.style.height='auto';
  dispatchMessage(t);
}
sendEl.addEventListener('click',handleSend);
inputEl.addEventListener('keydown',function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend();}});

setTimeout(function(){
  var welcome=window.ADMIN&&window.ADMIN.getWelcome?ADMIN.getWelcome():'مرحباً بك ⚡ اكتب «اوامر» للقائمة';
  addMsg('bot',welcome,'text');
},600);

window._botAddMsg=addMsg;
window._botDispatch=dispatchMessage;

})();
