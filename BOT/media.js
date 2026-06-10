(function(){
'use strict';

if(!window.BOT_CORE){console.error('media.js: BOT_CORE missing');return;}
if(window.BOT_MEDIA)return;

var C=window.BOT_CORE;

var CSS=`
.bot-img-wrap{
  position:relative;display:inline-block;
  cursor:pointer;border-radius:var(--bot-radius);overflow:hidden;
}
.bot-img-wrap img{
  max-width:220px;max-height:180px;display:block;
  border:1px solid rgba(140,0,0,.4);
  border-radius:var(--bot-radius);
  transition:transform .2s;
}
.bot-img-wrap:hover img{transform:scale(1.02);}
.bot-img-ov{
  position:absolute;inset:0;
  border-radius:var(--bot-radius);
  background:rgba(0,0,0,0);
  transition:background .2s;
  display:flex;align-items:center;justify-content:center;
}
.bot-img-wrap:hover .bot-img-ov{background:rgba(0,0,0,.35);}
.bot-img-ov-icon{font-size:22px;opacity:0;transition:opacity .2s;}
.bot-img-wrap:hover .bot-img-ov-icon{opacity:1;}
.bot-img-caption{
  font-size:10px;color:rgba(200,80,60,.5);
  letter-spacing:1px;margin-top:4px;
  text-align:center;direction:rtl;
}

.bot-album{display:flex;flex-wrap:wrap;gap:5px;max-width:260px;}
.bot-album-item{position:relative;cursor:pointer;}
.bot-album-item img{
  width:74px;height:74px;object-fit:cover;
  border-radius:var(--bot-radius);
  border:1px solid rgba(140,0,0,.4);
  transition:transform .15s,border-color .15s;display:block;
}
.bot-album-item:hover img{transform:scale(1.06);border-color:rgba(200,0,0,.6);}
.bot-album-count{
  position:absolute;inset:0;
  background:rgba(0,0,0,.65);
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-size:16px;font-family:var(--bot-font-sub);
  border-radius:var(--bot-radius);
}

.bot-video-wrap{
  position:relative;display:inline-block;
  border-radius:var(--bot-radius);overflow:hidden;
  border:1px solid rgba(140,0,0,.4);cursor:pointer;
}
.bot-video-wrap video{
  display:block;max-width:240px;pointer-events:none;
}
.bot-video-ov{
  position:absolute;inset:0;
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,.3);
  transition:background .2s;
}
.bot-video-wrap:hover .bot-video-ov{background:rgba(0,0,0,.45);}
.bot-video-play{
  width:48px;height:48px;border-radius:50%;
  background:rgba(180,0,0,.85);
  border:2px solid rgba(255,80,0,.6);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;transition:transform .2s,box-shadow .2s;
}
.bot-video-wrap:hover .bot-video-play{
  transform:scale(1.1);
  box-shadow:0 0 20px rgba(200,0,0,.6);
}
.bot-video-dur{
  position:absolute;bottom:6px;left:8px;
  font-size:10px;color:rgba(255,200,180,.8);
  font-family:var(--bot-font-sub);letter-spacing:1px;
  background:rgba(0,0,0,.5);padding:2px 5px;border-radius:2px;
}

.bot-audio-bar{
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 14px;min-width:200px;max-width:280px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);
  border-radius:var(--bot-radius);cursor:pointer;
  transition:border-color .2s;
}
.bot-audio-bar:hover{border-color:rgba(180,0,0,.6);}
.bot-audio-play{
  width:36px;height:36px;border-radius:50%;flex-shrink:0;
  background:rgba(120,0,0,.5);
  border:1px solid rgba(200,0,0,.5);
  display:flex;align-items:center;justify-content:center;
  font-size:14px;transition:all .2s;flex-shrink:0;
}
.bot-audio-bar:hover .bot-audio-play{background:rgba(180,0,0,.6);}
.bot-audio-info{flex:1;display:flex;flex-direction:column;gap:4px;min-width:0;}
.bot-audio-label{
  font-size:11px;color:rgba(200,80,60,.7);
  letter-spacing:1px;white-space:nowrap;
  overflow:hidden;text-overflow:ellipsis;
}
.bot-audio-waves{display:flex;align-items:center;gap:2px;height:24px;}
.wave-bar{
  width:3px;border-radius:2px;
  background:rgba(180,0,0,.5);
  animation:waveform .8s ease-in-out infinite;
  transform-origin:center;
}
.wave-bar.active{background:rgba(220,60,0,.8);}
.bot-audio-progress{
  width:100%;height:3px;
  background:rgba(100,0,0,.4);
  border-radius:2px;overflow:hidden;
}
.bot-audio-progress-fill{
  height:100%;
  background:linear-gradient(90deg,#880000,#cc2200);
  width:0%;transition:width .5s linear;
}

#bot-img-viewer{
  position:fixed;inset:0;z-index:900;
  background:rgba(0,0,0,.98);
  display:none;flex-direction:column;
}
#bot-img-viewer.show{display:flex;}
#imgv-topbar{
  display:flex;align-items:center;gap:8px;
  padding:10px 14px;
  background:rgba(6,0,0,.99);
  border-bottom:1px solid rgba(160,0,0,.3);
  flex-shrink:0;
}
#imgv-title{
  flex:1;font-family:var(--bot-font-sub);
  font-size:11px;color:rgba(220,0,0,.6);letter-spacing:3px;
}
#imgv-canvas-wrap{
  flex:1;display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  touch-action:none;
}
#imgv-canvas{
  display:block;max-width:100%;max-height:100%;
  cursor:crosshair;touch-action:none;
}
#imgv-toolbar{
  display:flex;gap:5px;flex-wrap:wrap;justify-content:center;
  padding:8px 10px 12px;
  background:rgba(6,0,0,.99);
  border-top:1px solid rgba(160,0,0,.2);
  flex-shrink:0;
}
.imgv-btn{
  background:rgba(12,0,0,.85);
  border:1px solid rgba(140,0,0,.4);
  color:#ff9988;
  font-family:var(--bot-font-sub);font-size:10px;
  padding:6px 10px;border-radius:var(--bot-radius);
  cursor:pointer;letter-spacing:1px;
  transition:all .2s;white-space:nowrap;
}
.imgv-btn:hover{
  border-color:rgba(220,0,0,.7);
  box-shadow:0 0 10px rgba(180,0,0,.3);
}
.imgv-btn.active{
  background:rgba(80,0,0,.5);
  border-color:#ff2200;color:#fff;
}
.imgv-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}
#imgv-color{
  width:28px;height:28px;border-radius:var(--bot-radius);
  border:1px solid rgba(160,0,0,.4);cursor:pointer;
  background:transparent;padding:2px;
}
#imgv-size{
  background:rgba(10,0,0,.8);
  border:1px solid rgba(140,0,0,.4);
  color:#ff9988;font-size:11px;
  padding:5px 6px;border-radius:var(--bot-radius);
  outline:none;width:50px;
}
#imgv-text-input{
  background:rgba(10,0,0,.8);
  border:1px solid rgba(140,0,0,.4);
  color:#ff9988;
  font-family:var(--bot-font-main);font-size:12px;
  padding:5px 9px;border-radius:var(--bot-radius);
  outline:none;direction:rtl;width:110px;
}

#bot-media-panel{
  position:fixed;inset:0;z-index:900;
  background:rgba(0,0,0,.98);
  display:none;flex-direction:column;
}
#bot-media-panel.show{display:flex;}
#media-topbar{
  display:flex;align-items:center;gap:8px;
  padding:10px 14px;
  background:rgba(6,0,0,.99);
  border-bottom:1px solid rgba(160,0,0,.3);
  flex-shrink:0;
}
#media-title{
  flex:1;font-family:var(--bot-font-sub);
  font-size:11px;color:rgba(220,0,0,.6);letter-spacing:3px;
}
#media-body{
  flex:1;display:flex;align-items:center;
  justify-content:center;position:relative;overflow:hidden;
}
#media-body video{
  max-width:100%;max-height:100%;
  outline:none;border-radius:var(--bot-radius);
}
#media-body audio{display:none;}
#audio-viz-canvas{
  display:block;width:100%;max-width:500px;height:140px;
}
#media-controls{
  padding:10px 14px 14px;
  background:rgba(6,0,0,.99);
  border-top:1px solid rgba(160,0,0,.2);
  flex-shrink:0;
  display:flex;flex-direction:column;gap:8px;
}
#media-seek{
  width:100%;accent-color:#cc0000;
  height:4px;cursor:pointer;border-radius:2px;
}
#media-time{
  font-size:10px;color:rgba(200,60,40,.5);
  letter-spacing:1px;text-align:center;
  font-family:var(--bot-font-sub);
}
.media-row{
  display:flex;gap:6px;flex-wrap:wrap;
  align-items:center;justify-content:center;
}
.mc-btn{
  background:rgba(12,0,0,.7);
  border:1px solid rgba(130,0,0,.4);
  color:#ff9988;
  font-family:var(--bot-font-sub);font-size:10px;
  padding:7px 11px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;white-space:nowrap;
}
.mc-btn:hover{
  border-color:rgba(220,0,0,.6);
  box-shadow:0 0 10px rgba(180,0,0,.3);
}
.mc-btn.active{
  background:rgba(80,0,0,.5);
  border-color:#ff2200;
}
.mc-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}
#mc-speed-lbl{
  font-family:var(--bot-font-sub);
  font-size:10px;color:rgba(200,0,0,.5);letter-spacing:2px;
  min-width:36px;text-align:center;
}
`;

(function(){
  var st=document.createElement('style');
  st.textContent=CSS;
  document.head.appendChild(st);
})();

var VIEWER_HTML=`
<div id="bot-img-viewer">
  <div id="imgv-topbar">
    <span style="font-size:16px;">🖼</span>
    <span id="imgv-title">✦ عارض الصور ✦</span>
  </div>
  <div id="imgv-canvas-wrap">
    <canvas id="imgv-canvas"></canvas>
  </div>
  <div id="imgv-toolbar">
    <input type="color" id="imgv-color" value="#ff2200">
    <input type="number" id="imgv-size" value="24" min="4" max="120">
    <input type="text" id="imgv-text-input" placeholder="نص...">
    <button class="imgv-btn" id="imgv-draw">🖊 رسم</button>
    <button class="imgv-btn" id="imgv-text-mode">T نص</button>
    <button class="imgv-btn" id="imgv-crop">✂ قص</button>
    <button class="imgv-btn" id="imgv-rotate">↻ دوران</button>
    <button class="imgv-btn" id="imgv-flip-h">↔ أفقي</button>
    <button class="imgv-btn" id="imgv-flip-v">↕ عمودي</button>
    <button class="imgv-btn" id="imgv-brightness">☀ إضاءة</button>
    <button class="imgv-btn" id="imgv-contrast">◑ تباين</button>
    <button class="imgv-btn" id="imgv-grayscale">◧ رمادي</button>
    <button class="imgv-btn" id="imgv-undo">↩ تراجع</button>
    <button class="imgv-btn" id="imgv-reset">↺ إعادة</button>
    <button class="imgv-btn" id="imgv-dl">⬇ تنزيل</button>
    <button class="imgv-btn" id="imgv-share">↗ مشاركة</button>
    <button class="imgv-btn" id="imgv-copy-img">📋 نسخ</button>
    <button class="imgv-btn danger" id="imgv-close">✕ إغلاق</button>
  </div>
</div>

<div id="bot-media-panel">
  <div id="media-topbar">
    <span id="media-icon" style="font-size:16px;">🎬</span>
    <span id="media-title">✦ مشغل الوسائط ✦</span>
  </div>
  <div id="media-body">
    <canvas id="audio-viz-canvas"></canvas>
  </div>
  <div id="media-controls">
    <input type="range" id="media-seek" min="0" max="100" value="0" step="0.1">
    <div id="media-time">0:00 / 0:00</div>
    <div class="media-row">
      <button class="mc-btn" id="mc-back10">⏮ 10</button>
      <button class="mc-btn" id="mc-back5">⏮ 5</button>
      <button class="mc-btn" id="mc-play">▶ تشغيل</button>
      <button class="mc-btn" id="mc-fwd5">5 ⏭</button>
      <button class="mc-btn" id="mc-fwd10">10 ⏭</button>
    </div>
    <div class="media-row">
      <button class="mc-btn" id="mc-slower">🐢 أبطأ</button>
      <span id="mc-speed-lbl">× 1.0</span>
      <button class="mc-btn" id="mc-faster">🚀 أسرع</button>
      <button class="mc-btn" id="mc-loop">🔁 تكرار</button>
      <button class="mc-btn" id="mc-mute">🔊 صوت</button>
    </div>
    <div class="media-row" id="mc-video-row">
      <button class="mc-btn" id="mc-flip-h">↔ أفقي</button>
      <button class="mc-btn" id="mc-flip-v">↕ عمودي</button>
      <button class="mc-btn" id="mc-pip">⧉ PIP</button>
      <button class="mc-btn" id="mc-fullscreen">⛶ ملء</button>
    </div>
    <div class="media-row" id="mc-audio-row" style="display:none;">
      <button class="mc-btn" id="mc-eq-bass">🔉 باس</button>
      <button class="mc-btn" id="mc-eq-treble">🎵 تريبل</button>
    </div>
    <div class="media-row">
      <button class="mc-btn" id="mc-dl">⬇ تنزيل</button>
      <button class="mc-btn" id="mc-share">↗ مشاركة</button>
      <button class="mc-btn danger" id="mc-close">✕ إغلاق</button>
    </div>
  </div>
</div>
`;

(function(){
  var tmp=document.createElement('div');
  tmp.innerHTML=VIEWER_HTML;
  while(tmp.firstChild)document.body.appendChild(tmp.firstChild);
})();

var _imgCanvas=document.getElementById('imgv-canvas');
var _imgCtx=_imgCanvas.getContext('2d');
var _imgHistory=[];
var _imgMode='none';
var _imgOriginal=null;
var _drawActive=false;
var _lastX=0,_lastY=0;
var _cropStart={x:0,y:0};
var _brightness=1,_contrast=1,_grayscale=0;

function openImgViewer(src,caption){
  _imgMode='none';
  _imgHistory=[];
  _brightness=1;_contrast=1;_grayscale=0;
  clearImgBtns();
  document.getElementById('bot-img-viewer').classList.add('show');
  if(caption)document.getElementById('imgv-title').textContent=caption;

  var img=new Image();
  img.crossOrigin='anonymous';
  img.onload=function(){
    _imgCanvas.width=img.width;
    _imgCanvas.height=img.height;
    _imgCtx.drawImage(img,0,0);
    _imgOriginal=_imgCtx.getImageData(0,0,img.width,img.height);
    _imgHistory=[_imgCtx.getImageData(0,0,img.width,img.height)];
    scaleImgCanvas();
  };
  img.src=src;
}

function scaleImgCanvas(){
  var wrap=document.getElementById('imgv-canvas-wrap');
  var mw=wrap.clientWidth*.95,mh=wrap.clientHeight*.95;
  var sc=Math.min(mw/_imgCanvas.width,mh/_imgCanvas.height,1);
  _imgCanvas.style.width=(_imgCanvas.width*sc)+'px';
  _imgCanvas.style.height=(_imgCanvas.height*sc)+'px';
}

function clearImgBtns(){
  document.querySelectorAll('.imgv-btn').forEach(function(b){
    b.classList.remove('active');
  });
}

function imgSaveHistory(){
  _imgHistory.push(_imgCtx.getImageData(0,0,_imgCanvas.width,_imgCanvas.height));
  if(_imgHistory.length>40)_imgHistory.shift();
}

function applyFilters(){
  if(!_imgHistory.length)return;
  var base=_imgHistory[_imgHistory.length-1];
  _imgCtx.putImageData(base,0,0);
  _imgCtx.filter=
    'brightness('+_brightness+') '+
    'contrast('+_contrast+') '+
    'grayscale('+_grayscale+')';
  var tmp=document.createElement('canvas');
  tmp.width=_imgCanvas.width;tmp.height=_imgCanvas.height;
  tmp.getContext('2d').putImageData(base,0,0);
  _imgCtx.filter='none';
  _imgCtx.clearRect(0,0,_imgCanvas.width,_imgCanvas.height);
  _imgCtx.filter=
    'brightness('+_brightness+') '+
    'contrast('+_contrast+') '+
    'grayscale('+_grayscale+')';
  _imgCtx.drawImage(tmp,0,0);
  _imgCtx.filter='none';
}

_imgCanvas.addEventListener('pointerdown',function(e){
  var r=_imgCanvas.getBoundingClientRect();
  var sx=_imgCanvas.width/r.width,sy=_imgCanvas.height/r.height;
  _lastX=(e.clientX-r.left)*sx;
  _lastY=(e.clientY-r.top)*sy;

  if(_imgMode==='draw'){
    _drawActive=true;
    _imgCtx.beginPath();
    _imgCtx.moveTo(_lastX,_lastY);
  }
  if(_imgMode==='crop'){
    _drawActive=true;
    _cropStart={x:_lastX,y:_lastY};
  }
});

_imgCanvas.addEventListener('pointermove',function(e){
  if(!_drawActive)return;
  var r=_imgCanvas.getBoundingClientRect();
  var sx=_imgCanvas.width/r.width,sy=_imgCanvas.height/r.height;
  var x=(e.clientX-r.left)*sx,y=(e.clientY-r.top)*sy;

  if(_imgMode==='draw'){
    _imgCtx.lineTo(x,y);
    _imgCtx.strokeStyle=document.getElementById('imgv-color').value;
    _imgCtx.lineWidth=parseInt(document.getElementById('imgv-size').value)||3;
    _imgCtx.lineCap='round';_imgCtx.lineJoin='round';
    _imgCtx.stroke();
  }
  if(_imgMode==='crop'){
    _imgCtx.putImageData(_imgHistory[_imgHistory.length-1],0,0);
    _imgCtx.strokeStyle='rgba(255,100,0,.9)';
    _imgCtx.lineWidth=2;_imgCtx.setLineDash([6,3]);
    _imgCtx.strokeRect(
      _cropStart.x,_cropStart.y,
      x-_cropStart.x,y-_cropStart.y
    );
    _imgCtx.setLineDash([]);
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
    var cx=Math.min(_cropStart.x,x),cy=Math.min(_cropStart.y,y);
    var cw=Math.abs(x-_cropStart.x),ch=Math.abs(y-_cropStart.y);
    if(cw>4&&ch>4){
      var data=_imgCtx.getImageData(cx,cy,cw,ch);
      _imgCanvas.width=cw;_imgCanvas.height=ch;
      _imgCtx.putImageData(data,0,0);
      imgSaveHistory();scaleImgCanvas();
    }
  }
});

document.getElementById('imgv-draw').addEventListener('click',function(){
  _imgMode=_imgMode==='draw'?'none':'draw';
  clearImgBtns();
  if(_imgMode==='draw')this.classList.add('active');
});

document.getElementById('imgv-text-mode').addEventListener('click',function(){
  var txt=document.getElementById('imgv-text-input').value.trim();
  if(!txt){C.emit('ui:toast',{msg:'اكتب نصاً أولاً'});return;}
  _imgMode='none';clearImgBtns();
  var color=document.getElementById('imgv-color').value;
  var size=parseInt(document.getElementById('imgv-size').value)||24;
  imgSaveHistory();
  _imgCtx.font='bold '+size+'px Cairo,sans-serif';
  _imgCtx.fillStyle=color;
  _imgCtx.textAlign='center';
  _imgCtx.shadowColor='rgba(0,0,0,.7)';
  _imgCtx.shadowBlur=5;
  _imgCtx.fillText(txt,_imgCanvas.width/2,_imgCanvas.height/2);
  _imgCtx.shadowBlur=0;
  imgSaveHistory();
});

document.getElementById('imgv-crop').addEventListener('click',function(){
  _imgMode=_imgMode==='crop'?'none':'crop';
  clearImgBtns();
  if(_imgMode==='crop')this.classList.add('active');
});

document.getElementById('imgv-rotate').addEventListener('click',function(){
  var tmp=document.createElement('canvas');
  tmp.width=_imgCanvas.height;tmp.height=_imgCanvas.width;
  var tc=tmp.getContext('2d');
  tc.translate(tmp.width/2,tmp.height/2);
  tc.rotate(Math.PI/2);
  tc.drawImage(_imgCanvas,-_imgCanvas.width/2,-_imgCanvas.height/2);
  _imgCanvas.width=tmp.width;_imgCanvas.height=tmp.height;
  _imgCtx.drawImage(tmp,0,0);
  imgSaveHistory();scaleImgCanvas();
});

document.getElementById('imgv-flip-h').addEventListener('click',function(){
  var tmp=document.createElement('canvas');
  tmp.width=_imgCanvas.width;tmp.height=_imgCanvas.height;
  var tc=tmp.getContext('2d');
  tc.scale(-1,1);tc.drawImage(_imgCanvas,-_imgCanvas.width,0);
  _imgCtx.drawImage(tmp,0,0);imgSaveHistory();
});

document.getElementById('imgv-flip-v').addEventListener('click',function(){
  var tmp=document.createElement('canvas');
  tmp.width=_imgCanvas.width;tmp.height=_imgCanvas.height;
  var tc=tmp.getContext('2d');
  tc.scale(1,-1);tc.drawImage(_imgCanvas,0,-_imgCanvas.height);
  _imgCtx.drawImage(tmp,0,0);imgSaveHistory();
});

document.getElementById('imgv-brightness').addEventListener('click',function(){
  _brightness=_brightness>=2?0.5:_brightness+0.25;
  applyFilters();
  this.textContent='☀ '+Math.round(_brightness*100)+'%';
});

document.getElementById('imgv-contrast').addEventListener('click',function(){
  _contrast=_contrast>=2?0.5:_contrast+0.25;
  applyFilters();
  this.textContent='◑ '+Math.round(_contrast*100)+'%';
});

document.getElementById('imgv-grayscale').addEventListener('click',function(){
  _grayscale=_grayscale>=1?0:_grayscale+0.25;
  applyFilters();
  this.classList.toggle('active',_grayscale>0);
});

document.getElementById('imgv-undo').addEventListener('click',function(){
  if(_imgHistory.length>1){
    _imgHistory.pop();
    _imgCtx.putImageData(_imgHistory[_imgHistory.length-1],0,0);
  }
});

document.getElementById('imgv-reset').addEventListener('click',function(){
  if(_imgOriginal){
    _imgCanvas.width=_imgOriginal.width;
    _imgCanvas.height=_imgOriginal.height;
    _imgCtx.putImageData(_imgOriginal,0,0);
    _imgHistory=[_imgOriginal];
    _brightness=1;_contrast=1;_grayscale=0;
    scaleImgCanvas();
  }
});

document.getElementById('imgv-dl').addEventListener('click',function(){
  var a=document.createElement('a');
  a.href=_imgCanvas.toDataURL('image/png');
  a.download='image_'+Date.now()+'.png';
  a.click();
});

document.getElementById('imgv-share').addEventListener('click',function(){
  _imgCanvas.toBlob(function(blob){
    var file=new File([blob],'image.png',{type:'image/png'});
    if(navigator.share&&navigator.canShare&&navigator.canShare({files:[file]})){
      navigator.share({files:[file]}).catch(function(){});
    } else {
      var url=URL.createObjectURL(blob);
      navigator.clipboard&&navigator.clipboard.writeText(url);
      C.emit('ui:toast',{msg:'تم نسخ الرابط'});
    }
  });
});

document.getElementById('imgv-copy-img').addEventListener('click',function(){
  _imgCanvas.toBlob(function(blob){
    if(window.ClipboardItem&&navigator.clipboard&&navigator.clipboard.write){
      navigator.clipboard.write([new ClipboardItem({'image/png':blob})]);
      C.emit('ui:toast',{msg:'تم نسخ الصورة ✓'});
    }
  });
});

document.getElementById('imgv-close').addEventListener('click',function(){
  document.getElementById('bot-img-viewer').classList.remove('show');
});

var _curMedia=null;
var _mediaSpeed=1.0;
var _mediaType='video';
var _looping=false;
var _muted=false;
var _bassNode=null,_trebleNode=null,_audioCtx=null;
var _seekTimer=null;

function openMediaPanel(src,type,name){
  _mediaType=type||'video';
  _mediaSpeed=1.0;
  _looping=false;_muted=false;

  var panel=document.getElementById('bot-media-panel');
  var body=document.getElementById('media-body');
  var vizCanvas=document.getElementById('audio-viz-canvas');

  body.querySelectorAll('video,audio').forEach(function(el){
    el.pause();el.src='';el.remove();
  });
  vizCanvas.style.display='none';

  document.getElementById('media-title').textContent=name||
    (type==='video'?'✦ مشغل الفيديو ✦':'✦ مشغل الصوت ✦');
  document.getElementById('media-icon').textContent=
    type==='video'?'🎬':'🎵';

  if(type==='video'){
    _curMedia=document.createElement('video');
    _curMedia.src=src;_curMedia.controls=false;
    _curMedia.style.cssText='max-width:100%;max-height:100%;';
    body.appendChild(_curMedia);
    document.getElementById('mc-video-row').style.display='flex';
    document.getElementById('mc-audio-row').style.display='none';
  } else {
    _curMedia=document.createElement('audio');
    _curMedia.src=src;
    body.appendChild(_curMedia);
    document.getElementById('mc-video-row').style.display='none';
    document.getElementById('mc-audio-row').style.display='flex';
    vizCanvas.style.display='block';
    initAudioViz(_curMedia,vizCanvas);
  }

  document.getElementById('mc-speed-lbl').textContent='× 1.0';
  document.getElementById('mc-play').textContent='▶ تشغيل';
  document.getElementById('mc-loop').classList.remove('active');
  document.getElementById('mc-mute').textContent='🔊 صوت';

  _curMedia.addEventListener('timeupdate',updateSeek);
  _curMedia.addEventListener('ended',function(){
    document.getElementById('mc-play').textContent='▶ تشغيل';
  });

  panel.classList.add('show');
}

function updateSeek(){
  if(!_curMedia||!_curMedia.duration)return;
  var pct=(_curMedia.currentTime/_curMedia.duration)*100;
  document.getElementById('media-seek').value=pct;
  document.getElementById('media-time').textContent=
    fmtTime(_curMedia.currentTime)+' / '+fmtTime(_curMedia.duration);
}

function fmtTime(s){
  s=Math.floor(s)||0;
  var m=Math.floor(s/60),sec=s%60;
  return m+':'+(sec<10?'0':'')+sec;
}

function initAudioViz(audio,canvas){
  if(!window.AudioContext&&!window.webkitAudioContext)return;
  if(_audioCtx){try{_audioCtx.close();}catch(e){}}
  _audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  var src2=_audioCtx.createMediaElementSource(audio);
  var analyser=_audioCtx.createAnalyser();
  analyser.fftSize=256;

  _bassNode=_audioCtx.createBiquadFilter();
  _bassNode.type='lowshelf';_bassNode.frequency.value=200;

  _trebleNode=_audioCtx.createBiquadFilter();
  _trebleNode.type='highshelf';_trebleNode.frequency.value=4000;

  src2.connect(_bassNode);
  _bassNode.connect(_trebleNode);
  _trebleNode.connect(analyser);
  analyser.connect(_audioCtx.destination);

  var bufLen=analyser.frequencyBinCount;
  var dataArr=new Uint8Array(bufLen);
  var ctx2=canvas.getContext('2d');
  canvas.width=500;canvas.height=140;

  function draw(){
    if(!_audioCtx)return;
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArr);
    ctx2.clearRect(0,0,500,140);
    var bw=500/bufLen;
    for(var i=0;i<bufLen;i++){
      var h=(dataArr[i]/255)*130;
      var alpha=0.35+dataArr[i]/512;
      ctx2.fillStyle='rgba(180,0,0,'+alpha+')';
      ctx2.fillRect(i*bw,140-h,bw-1,h);
      if(h>60){
        ctx2.fillStyle='rgba(255,80,0,'+(alpha*.6)+')';
        ctx2.fillRect(i*bw,140-h,bw-1,4);
      }
    }
  }
  draw();
}

document.getElementById('media-seek').oninput=function(){
  if(_curMedia&&_curMedia.duration){
    _curMedia.currentTime=_curMedia.duration*(this.value/100);
  }
};

document.getElementById('mc-play').addEventListener('click',function(){
  if(!_curMedia)return;
  if(_curMedia.paused){
    if(_audioCtx&&_audioCtx.state==='suspended')_audioCtx.resume();
    _curMedia.play().catch(function(){});
    this.textContent='⏸ إيقاف';
  } else {
    _curMedia.pause();this.textContent='▶ تشغيل';
  }
});

document.getElementById('mc-back5').addEventListener('click',function(){
  if(_curMedia)_curMedia.currentTime=Math.max(0,_curMedia.currentTime-5);
});
document.getElementById('mc-fwd5').addEventListener('click',function(){
  if(_curMedia)_curMedia.currentTime=Math.min(_curMedia.duration||9999,_curMedia.currentTime+5);
});
document.getElementById('mc-back10').addEventListener('click',function(){
  if(_curMedia)_curMedia.currentTime=Math.max(0,_curMedia.currentTime-10);
});
document.getElementById('mc-fwd10').addEventListener('click',function(){
  if(_curMedia)_curMedia.currentTime=Math.min(_curMedia.duration||9999,_curMedia.currentTime+10);
});

document.getElementById('mc-slower').addEventListener('click',function(){
  if(!_curMedia)return;
  _mediaSpeed=Math.max(.25,Math.round((_mediaSpeed-.25)*100)/100);
  _curMedia.playbackRate=_mediaSpeed;
  document.getElementById('mc-speed-lbl').textContent='× '+_mediaSpeed.toFixed(2);
});
document.getElementById('mc-faster').addEventListener('click',function(){
  if(!_curMedia)return;
  _mediaSpeed=Math.min(4,Math.round((_mediaSpeed+.25)*100)/100);
  _curMedia.playbackRate=_mediaSpeed;
  document.getElementById('mc-speed-lbl').textContent='× '+_mediaSpeed.toFixed(2);
});

document.getElementById('mc-loop').addEventListener('click',function(){
  if(!_curMedia)return;
  _looping=!_looping;
  _curMedia.loop=_looping;
  this.classList.toggle('active',_looping);
});

document.getElementById('mc-mute').addEventListener('click',function(){
  if(!_curMedia)return;
  _muted=!_muted;
  _curMedia.muted=_muted;
  this.textContent=_muted?'🔇 صامت':'🔊 صوت';
});

document.getElementById('mc-flip-h').addEventListener('click',function(){
  if(!_curMedia||_mediaType!=='video')return;
  var c=_curMedia.style.transform;
  _curMedia.style.transform=
    c.includes('scaleX(-1)')?c.replace('scaleX(-1)',''):c+' scaleX(-1)';
  this.classList.toggle('active');
});

document.getElementById('mc-flip-v').addEventListener('click',function(){
  if(!_curMedia||_mediaType!=='video')return;
  var c=_curMedia.style.transform;
  _curMedia.style.transform=
    c.includes('scaleY(-1)')?c.replace('scaleY(-1)',''):c+' scaleY(-1)';
  this.classList.toggle('active');
});

document.getElementById('mc-pip').addEventListener('click',function(){
  if(_curMedia&&_curMedia.requestPictureInPicture){
    _curMedia.requestPictureInPicture().catch(function(){});
  }
});

document.getElementById('mc-fullscreen').addEventListener('click',function(){
  if(_curMedia&&_curMedia.requestFullscreen){
    _curMedia.requestFullscreen().catch(function(){});
  }
});

document.getElementById('mc-eq-bass').addEventListener('click',function(){
  if(!_bassNode)return;
  _bassNode.gain.value=_bassNode.gain.value>=12?-12:_bassNode.gain.value+6;
  this.textContent='🔉 باس '+(_bassNode.gain.value>0?'+':'')+_bassNode.gain.value;
});

document.getElementById('mc-eq-treble').addEventListener('click',function(){
  if(!_trebleNode)return;
  _trebleNode.gain.value=_trebleNode.gain.value>=12?-12:_trebleNode.gain.value+6;
  this.textContent='🎵 تريبل '+(_trebleNode.gain.value>0?'+':'')+_trebleNode.gain.value;
});

document.getElementById('mc-dl').addEventListener('click',function(){
  if(!_curMedia||!_curMedia.src)return;
  var a=document.createElement('a');
  a.href=_curMedia.src;
  a.download='media_'+Date.now();
  a.click();
});

document.getElementById('mc-share').addEventListener('click',function(){
  if(!_curMedia)return;
  if(navigator.share){
    navigator.share({url:_curMedia.src}).catch(function(){});
  } else if(navigator.clipboard){
    navigator.clipboard.writeText(_curMedia.src);
    C.emit('ui:toast',{msg:'تم نسخ الرابط ✓'});
  }
});

document.getElementById('mc-close').addEventListener('click',function(){
  if(_curMedia){_curMedia.pause();_curMedia.src='';}
  _curMedia=null;
  if(_audioCtx){try{_audioCtx.close();}catch(e){}_audioCtx=null;}
  document.getElementById('bot-media-panel').classList.remove('show');
  document.getElementById('mc-play').textContent='▶ تشغيل';
});

function buildImage(src,opts){
  opts=opts||{};
  var w=document.createElement('div');w.className='bot-img-wrap';
  var img=document.createElement('img');
  img.src=typeof src==='string'?src:(src.src||src.url||src.path||'');
  img.alt='';img.loading='lazy';
  var ov=document.createElement('div');ov.className='bot-img-ov';
  var ic=document.createElement('span');ic.className='bot-img-ov-icon';ic.textContent='🔍';
  ov.appendChild(ic);w.appendChild(img);w.appendChild(ov);
  if(opts.caption){
    var cap=document.createElement('div');
    cap.className='bot-img-caption';
    cap.textContent=opts.caption;
    var wrap2=document.createElement('div');
    wrap2.appendChild(w);wrap2.appendChild(cap);
    w.addEventListener('click',function(){openImgViewer(img.src,opts.caption);});
    return wrap2;
  }
  w.addEventListener('click',function(){openImgViewer(img.src);});
  return w;
}

function buildAlbum(images,opts){
  opts=opts||{};
  var MAX_SHOW=9;
  var w=document.createElement('div');w.className='bot-album';
  var show=images.slice(0,MAX_SHOW);
  show.forEach(function(src,i){
    var item=document.createElement('div');item.className='bot-album-item';
    var img=document.createElement('img');
    img.src=typeof src==='string'?src:(src.src||src.url||'');
    img.alt='';img.loading='lazy';
    item.appendChild(img);
    if(i===MAX_SHOW-1&&images.length>MAX_SHOW){
      var cnt=document.createElement('div');cnt.className='bot-album-count';
      cnt.textContent='+'+(images.length-MAX_SHOW+1);
      item.appendChild(cnt);
    }
    item.addEventListener('click',function(){openImgViewer(img.src,'صورة '+(i+1));});
    w.appendChild(item);
  });
  return w;
}

function buildVideo(src,opts){
  opts=opts||{};
  var url=typeof src==='string'?src:(src.src||src.url||src.path||'');
  var w=document.createElement('div');w.className='bot-video-wrap';
  var vid=document.createElement('video');
  vid.src=url;vid.preload='metadata';
  vid.style.maxWidth='240px';
  var ov=document.createElement('div');ov.className='bot-video-ov';
  var pb=document.createElement('div');pb.className='bot-video-play';pb.textContent='▶';
  ov.appendChild(pb);w.appendChild(vid);w.appendChild(ov);

  if(opts.duration){
    var dur=document.createElement('div');dur.className='bot-video-dur';
    dur.textContent=opts.duration;w.appendChild(dur);
  }

  var tapTime=0;
  w.addEventListener('click',function(){
    var now=Date.now();
    if(now-tapTime<350){openMediaPanel(url,'video',opts.name);return;}
    tapTime=now;
    if(vid.paused){
      vid.play().catch(function(){});pb.textContent='⏸';
    } else {
      vid.pause();pb.textContent='▶';
    }
  });
  return w;
}

function buildAudio(src,opts){
  opts=opts||{};
  var url=typeof src==='string'?src:
    (src.src||src.url||src.path||'');
  var label=opts.name||(typeof src==='object'&&src.name)||'مقطع صوتي';

  var w=document.createElement('div');w.className='bot-audio-bar';
  var pb=document.createElement('div');pb.className='bot-audio-play';pb.textContent='▶';

  var info=document.createElement('div');info.className='bot-audio-info';
  var lbl=document.createElement('div');lbl.className='bot-audio-label';lbl.textContent=label;

  var waves=document.createElement('div');waves.className='bot-audio-waves';
  var BARS=22;
  for(var i=0;i<BARS;i++){
    var b=document.createElement('div');b.className='wave-bar';
    var h=4+Math.random()*20;
    b.style.setProperty('--wh',h+'px');
    b.style.animationDuration=(0.5+Math.random()*.7)+'s';
    b.style.animationDelay=(Math.random()*.5)+'s';
    b.style.height='4px';
    waves.appendChild(b);
  }

  var prog=document.createElement('div');prog.className='bot-audio-progress';
  var fill=document.createElement('div');fill.className='bot-audio-progress-fill';
  prog.appendChild(fill);

  info.appendChild(lbl);info.appendChild(waves);info.appendChild(prog);
  w.appendChild(pb);w.appendChild(info);

  var audio=new Audio(url);
  var playing=false;
  var tapTime=0;
  var progTimer=null;

  pb.addEventListener('click',function(e){
    e.stopPropagation();
    if(playing){
      audio.pause();pb.textContent='▶';playing=false;
      waves.querySelectorAll('.wave-bar').forEach(function(b){b.style.height='4px';});
      clearInterval(progTimer);
    } else {
      audio.play().catch(function(){});pb.textContent='⏸';playing=true;
      waves.querySelectorAll('.wave-bar').forEach(function(b){b.style.height='';});
      progTimer=setInterval(function(){
        if(!audio.duration)return;
        fill.style.width=((audio.currentTime/audio.duration)*100)+'%';
        if(audio.ended){
          pb.textContent='▶';playing=false;
          waves.querySelectorAll('.wave-bar').forEach(function(b){b.style.height='4px';});
          fill.style.width='0%';clearInterval(progTimer);
        }
      },400);
    }
  });

  var _tapTime=0;
  w.addEventListener('click',function(){
    var now=Date.now();
    if(now-_tapTime<350){openMediaPanel(url,'audio',label);}
    _tapTime=now;
  });

  return w;
}

C.on('ui:toast',function(d){
  if(window.BOT_UI)BOT_UI.toast(d.msg,d.duration);
});

window.BOT_MEDIA={
  buildImage:buildImage,
  buildAlbum:buildAlbum,
  buildVideo:buildVideo,
  buildAudio:buildAudio,
  openImgViewer:openImgViewer,
  openMediaPanel:openMediaPanel
};

C.registerModule('media',window.BOT_MEDIA);
C.emit('media:ready',{});

})();
