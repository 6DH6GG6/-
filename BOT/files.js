(function(){
'use strict';

if(!window.BOT_CORE){console.error('files.js: BOT_CORE missing');return;}
if(window.BOT_FILES)return;

var C=window.BOT_CORE;

var CSS=`
.bot-file-card{
  display:inline-flex;align-items:center;gap:10px;
  padding:10px 14px;min-width:180px;max-width:280px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);
  border-right:3px solid rgba(200,0,0,.6);
  border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;
}
.bot-file-card:hover{
  border-right-color:#ff2200;
  background:rgba(14,0,0,.95);
  transform:translateX(-2px);
}
.bot-file-icon{font-size:24px;flex-shrink:0;}
.bot-file-info{display:flex;flex-direction:column;gap:2px;min-width:0;}
.bot-file-name{
  font-size:12px;color:#ffaa88;
  font-family:var(--bot-font-main);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.bot-file-meta{font-size:10px;color:rgba(200,80,60,.5);letter-spacing:1px;}
.bot-file-actions{
  display:flex;gap:4px;margin-top:4px;
}
.bot-file-btn{
  background:rgba(15,0,0,.7);
  border:1px solid rgba(140,0,0,.35);
  color:#ff9977;
  font-family:var(--bot-font-sub);font-size:9px;
  padding:4px 8px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;letter-spacing:1px;
}
.bot-file-btn:hover{
  border-color:rgba(220,0,0,.6);
  box-shadow:0 0 8px rgba(180,0,0,.3);
}

.bot-apk-card{
  display:inline-flex;align-items:center;gap:12px;
  padding:12px 16px;min-width:220px;max-width:300px;
  background:rgba(8,0,0,.92);
  border:1px solid rgba(120,0,0,.4);
  border-top:2px solid rgba(200,0,0,.6);
  border-radius:var(--bot-radius);
  transition:all .2s;
}
.bot-apk-card:hover{border-top-color:#ff2200;}
.bot-apk-icon-wrap{
  width:48px;height:48px;border-radius:10px;
  background:linear-gradient(135deg,#1a0000,#4d0000);
  border:1px solid rgba(180,0,0,.4);
  display:flex;align-items:center;justify-content:center;
  font-size:26px;flex-shrink:0;
}
.bot-apk-info{display:flex;flex-direction:column;gap:3px;flex:1;min-width:0;}
.bot-apk-name{
  font-size:13px;color:#ffaa88;
  font-family:var(--bot-font-main);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.bot-apk-meta{font-size:10px;color:rgba(200,80,60,.5);letter-spacing:1px;}
.bot-apk-desc{font-size:11px;color:rgba(200,80,60,.4);margin-top:2px;line-height:1.4;}
.bot-apk-dl-btn{
  background:linear-gradient(135deg,#1a0000,#4d0000 40%,#770000 60%,#4d0000);
  border:1px solid rgba(180,0,0,.5);
  color:#ffaa88;
  font-family:var(--bot-font-sub);font-size:10px;
  padding:7px 12px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;
  white-space:nowrap;letter-spacing:1px;flex-shrink:0;
}
.bot-apk-dl-btn:hover{box-shadow:0 0 14px rgba(180,0,0,.5);}

.bot-html-card{
  display:inline-flex;flex-direction:column;gap:0;
  min-width:220px;max-width:300px;
  background:rgba(8,0,0,.92);
  border:1px solid rgba(120,0,0,.4);
  border-top:2px solid rgba(0,160,80,.5);
  border-radius:var(--bot-radius);
  overflow:hidden;transition:all .2s;cursor:pointer;
}
.bot-html-card:hover{border-top-color:#00ff88;}
.bot-html-preview{
  width:100%;height:80px;
  background:linear-gradient(135deg,#001a00,#000a05);
  display:flex;align-items:center;justify-content:center;
  font-size:28px;border-bottom:1px solid rgba(0,100,40,.3);
}
.bot-html-info{
  display:flex;align-items:center;gap:10px;
  padding:8px 12px;
}
.bot-html-name{
  flex:1;font-size:12px;color:#88ffaa;
  font-family:var(--bot-font-main);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.bot-html-actions{display:flex;gap:4px;}
.bot-html-btn{
  background:rgba(0,20,5,.8);
  border:1px solid rgba(0,120,50,.4);
  color:#88ffaa;
  font-family:var(--bot-font-sub);font-size:9px;
  padding:4px 8px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;
}
.bot-html-btn:hover{border-color:rgba(0,200,80,.6);}

.bot-glb-card{
  display:inline-flex;flex-direction:column;
  min-width:220px;max-width:300px;
  background:rgba(5,5,15,.95);
  border:1px solid rgba(60,80,200,.4);
  border-top:2px solid rgba(80,120,255,.6);
  border-radius:var(--bot-radius);
  overflow:hidden;cursor:pointer;transition:all .2s;
}
.bot-glb-card:hover{border-top-color:#6699ff;}
.bot-glb-preview{
  width:100%;height:100px;
  background:radial-gradient(ellipse at 50% 60%,#050520,#000008);
  display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
}
.bot-glb-canvas{
  position:absolute;inset:0;
  width:100%!important;height:100%!important;
}
.bot-glb-icon{font-size:36px;position:relative;z-index:2;}
.bot-glb-info{
  display:flex;align-items:center;gap:10px;
  padding:8px 12px;
}
.bot-glb-name{
  flex:1;font-size:12px;color:#aabbff;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.bot-glb-badge{
  font-size:9px;color:rgba(100,140,255,.6);
  border:1px solid rgba(80,100,200,.3);
  padding:2px 6px;border-radius:2px;letter-spacing:1px;
}
.bot-glb-actions{display:flex;gap:4px;padding:0 12px 10px;}
.bot-glb-btn{
  background:rgba(5,5,25,.8);
  border:1px solid rgba(60,80,200,.4);
  color:#aabbff;
  font-family:var(--bot-font-sub);font-size:9px;
  padding:4px 8px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;
}
.bot-glb-btn:hover{border-color:rgba(100,140,255,.7);}

.bot-txt-file{
  display:inline-flex;flex-direction:column;gap:5px;
  padding:10px 14px;min-width:180px;max-width:280px;
  background:rgba(8,0,0,.9);
  border:1px solid rgba(120,0,0,.4);
  border-top:2px solid rgba(200,0,0,.6);
  border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;
}
.bot-txt-file:hover{border-top-color:#ff2200;}
.bot-txt-header{display:flex;align-items:center;gap:8px;}
.bot-txt-icon{font-size:20px;}
.bot-txt-name{font-size:12px;color:#ffaa88;}
.bot-txt-preview{
  font-size:10px;color:rgba(200,80,60,.45);
  letter-spacing:.5px;line-height:1.5;
  overflow:hidden;max-height:36px;
  font-family:var(--bot-font-mono);
  direction:ltr;text-align:left;
}
.bot-txt-footer{
  display:flex;gap:4px;margin-top:2px;
}

#bot-txt-viewer{
  position:fixed;inset:0;z-index:900;
  background:rgba(0,0,0,.98);
  display:none;flex-direction:column;
}
#bot-txt-viewer.show{display:flex;}
#txv-topbar{
  display:flex;align-items:center;gap:8px;
  padding:10px 14px;
  background:rgba(6,0,0,.99);
  border-bottom:1px solid rgba(160,0,0,.3);
  flex-shrink:0;
}
#txv-icon{font-size:18px;}
#txv-title{
  flex:1;font-family:var(--bot-font-sub);
  font-size:12px;color:rgba(220,0,0,.6);letter-spacing:3px;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
#txv-line-count{
  font-size:10px;color:rgba(180,60,40,.4);letter-spacing:1px;
}
#txv-body{
  flex:1;overflow-y:auto;overflow-x:auto;
  padding:0;
  display:flex;
}
#txv-line-nums{
  padding:14px 8px;
  background:rgba(4,0,0,.8);
  border-right:1px solid rgba(100,0,0,.3);
  color:rgba(150,40,20,.4);
  font-family:var(--bot-font-mono);font-size:12px;
  line-height:1.8;
  text-align:right;
  user-select:none;flex-shrink:0;
  min-width:36px;
}
#txv-content{
  flex:1;padding:14px 16px;
  color:#ff9977;
  font-family:var(--bot-font-mono);font-size:13px;
  line-height:1.8;white-space:pre;
  direction:ltr;text-align:left;
  overflow-x:auto;
}
#txv-toolbar{
  display:flex;gap:5px;flex-wrap:wrap;
  padding:8px 12px;
  background:rgba(6,0,0,.99);
  border-top:1px solid rgba(160,0,0,.2);
  flex-shrink:0;
}

#bot-html-viewer{
  position:fixed;inset:0;z-index:900;
  background:#000;
  display:none;flex-direction:column;
}
#bot-html-viewer.show{display:flex;}
#htmlv-topbar{
  display:flex;align-items:center;gap:8px;
  padding:8px 12px;
  background:rgba(0,15,5,.99);
  border-bottom:1px solid rgba(0,100,40,.3);
  flex-shrink:0;
}
#htmlv-title{
  flex:1;font-family:var(--bot-font-sub);
  font-size:11px;color:rgba(0,200,80,.6);letter-spacing:3px;
}
#htmlv-iframe{
  flex:1;border:none;background:#fff;
}
#htmlv-toolbar{
  display:flex;gap:5px;flex-wrap:wrap;
  padding:6px 12px 10px;
  background:rgba(0,15,5,.99);
  border-top:1px solid rgba(0,80,30,.2);
  flex-shrink:0;
}
.htmlv-btn{
  background:rgba(0,15,5,.8);
  border:1px solid rgba(0,100,40,.4);
  color:#88ffaa;
  font-family:var(--bot-font-sub);font-size:9px;
  padding:5px 10px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;letter-spacing:1px;
}
.htmlv-btn:hover{border-color:rgba(0,200,80,.6);}
.htmlv-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}

#bot-3d-viewer{
  position:fixed;inset:0;z-index:900;
  background:radial-gradient(ellipse at 50% 50%,#050520,#000008);
  display:none;flex-direction:column;
}
#bot-3d-viewer.show{display:flex;}
#v3d-topbar{
  display:flex;align-items:center;gap:8px;
  padding:8px 12px;
  background:rgba(0,0,15,.99);
  border-bottom:1px solid rgba(60,80,200,.3);
  flex-shrink:0;
}
#v3d-title{
  flex:1;font-family:var(--bot-font-sub);
  font-size:11px;color:rgba(100,140,255,.6);letter-spacing:3px;
}
#v3d-canvas-wrap{
  flex:1;position:relative;overflow:hidden;
}
#v3d-canvas{
  position:absolute;inset:0;
  width:100%!important;height:100%!important;
}
#v3d-toolbar{
  display:flex;gap:5px;flex-wrap:wrap;
  padding:6px 12px 10px;
  background:rgba(0,0,15,.99);
  border-top:1px solid rgba(40,60,180,.2);
  flex-shrink:0;
}
.v3d-btn{
  background:rgba(5,5,25,.8);
  border:1px solid rgba(60,80,200,.4);
  color:#aabbff;
  font-family:var(--bot-font-sub);font-size:9px;
  padding:5px 10px;border-radius:var(--bot-radius);
  cursor:pointer;transition:all .2s;letter-spacing:1px;
}
.v3d-btn:hover{border-color:rgba(100,140,255,.7);}
.v3d-btn.danger{border-color:rgba(180,0,0,.4);color:#ffaa88;}
#v3d-hint{
  position:absolute;bottom:10px;left:50%;
  transform:translateX(-50%);
  font-size:10px;color:rgba(100,140,255,.4);
  letter-spacing:2px;pointer-events:none;
}
`;

(function(){
  var st=document.createElement('style');
  st.textContent=CSS;
  document.head.appendChild(st);
})();

var PANELS_HTML=`
<div id="bot-txt-viewer">
  <div id="txv-topbar">
    <span id="txv-icon">📄</span>
    <span id="txv-title">معاينة الملف</span>
    <span id="txv-line-count"></span>
  </div>
  <div id="txv-body">
    <div id="txv-line-nums"></div>
    <div id="txv-content"></div>
  </div>
  <div id="txv-toolbar">
    <button class="bot-file-btn" id="txv-wrap">التفاف</button>
    <button class="bot-file-btn" id="txv-copy">📋 نسخ</button>
    <button class="bot-file-btn" id="txv-dl">⬇ تنزيل</button>
    <button class="bot-file-btn danger" id="txv-close"
      style="border-color:rgba(180,0,0,.4);color:#ffaa88;">✕ إغلاق</button>
  </div>
</div>

<div id="bot-html-viewer">
  <div id="htmlv-topbar">
    <span style="font-size:16px;">🌐</span>
    <span id="htmlv-title">✦ عارض HTML ✦</span>
  </div>
  <iframe id="htmlv-iframe" sandbox="allow-scripts allow-same-origin allow-forms"
    allow="fullscreen"></iframe>
  <div id="htmlv-toolbar">
    <button class="htmlv-btn" id="htmlv-reload">↺ إعادة</button>
    <button class="htmlv-btn" id="htmlv-fullscreen">⛶ ملء</button>
    <button class="htmlv-btn" id="htmlv-open">↗ فتح</button>
    <button class="htmlv-btn" id="htmlv-dl">⬇ تنزيل</button>
    <button class="htmlv-btn danger" id="htmlv-close">✕ إغلاق</button>
  </div>
</div>

<div id="bot-3d-viewer">
  <div id="v3d-topbar">
    <span style="font-size:16px;">🧊</span>
    <span id="v3d-title">✦ عارض ثلاثي الأبعاد ✦</span>
  </div>
  <div id="v3d-canvas-wrap">
    <canvas id="v3d-canvas"></canvas>
    <div id="v3d-hint">اسحب للدوران · قرص للتكبير</div>
  </div>
  <div id="v3d-toolbar">
    <button class="v3d-btn" id="v3d-reset-cam">🎯 إعادة الكاميرا</button>
    <button class="v3d-btn" id="v3d-wireframe">◻ شبكي</button>
    <button class="v3d-btn" id="v3d-autorotate">↻ دوران تلقائي</button>
    <button class="v3d-btn" id="v3d-lights">💡 إضاءة</button>
    <button class="v3d-btn" id="v3d-screenshot">📸 لقطة</button>
    <button class="v3d-btn" id="v3d-dl">⬇ تنزيل</button>
    <button class="v3d-btn danger" id="v3d-close">✕ إغلاق</button>
  </div>
</div>
`;

(function(){
  var tmp=document.createElement('div');
  tmp.innerHTML=PANELS_HTML;
  while(tmp.firstChild)document.body.appendChild(tmp.firstChild);
})();

var _txvItem=null;
var _txvWrapped=false;
var _htmlSrc='';
var _3dSrc='';
var _3dRenderer=null;
var _3dScene=null;
var _3dCamera=null;
var _3dAnimId=null;
var _3dAutoRot=false;
var _3dWireframe=false;
var _3dLightMode=0;

function openTxtViewer(item){
  _txvItem=item;
  var content=item.content||item.text||'';
  var lines=content.split('\n');
  var ext=C.fileExt(item.name||'');
  var icons={js:'⚙',json:'{}',txt:'📝',html:'🌐',
    css:'🎨',py:'🐍',md:'📖',csv:'📊',
    sh:'🖥',xml:'🔧',ts:'⚙',cpp:'⚡',c:'⚡'};
  document.getElementById('txv-icon').textContent=icons[ext]||'📄';
  document.getElementById('txv-title').textContent=item.name||'ملف';
  document.getElementById('txv-line-count').textContent=lines.length+' سطر';
  document.getElementById('txv-content').textContent=content;
  var lineNums=lines.map(function(_,i){return i+1;}).join('\n');
  document.getElementById('txv-line-nums').textContent=lineNums;
  document.getElementById('bot-txt-viewer').classList.add('show');
}

document.getElementById('txv-wrap').addEventListener('click',function(){
  _txvWrapped=!_txvWrapped;
  document.getElementById('txv-content').style.whiteSpace=
    _txvWrapped?'pre-wrap':'pre';
  this.textContent=_txvWrapped?'لا التفاف':'التفاف';
});

document.getElementById('txv-copy').addEventListener('click',function(){
  var content=(_txvItem&&(_txvItem.content||_txvItem.text))||'';
  if(navigator.clipboard)navigator.clipboard.writeText(content);
  C.emit('ui:toast',{msg:'تم النسخ ✓'});
});

document.getElementById('txv-dl').addEventListener('click',function(){
  if(!_txvItem)return;
  var blob=new Blob([_txvItem.content||_txvItem.text||''],{type:'text/plain'});
  var a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=_txvItem.name||'file.txt';
  a.click();
});

document.getElementById('txv-close').addEventListener('click',function(){
  document.getElementById('bot-txt-viewer').classList.remove('show');
});

function openHtmlViewer(src,name){
  _htmlSrc=src;
  document.getElementById('htmlv-title').textContent=name||'✦ عارض HTML ✦';
  var iframe=document.getElementById('htmlv-iframe');
  iframe.src=src;
  document.getElementById('bot-html-viewer').classList.add('show');
}

function openHtmlViewerFromContent(html,name){
  var blob=new Blob([html],{type:'text/html'});
  var url=URL.createObjectURL(blob);
  openHtmlViewer(url,name);
  C.revokeObjectURL(url);
}

document.getElementById('htmlv-reload').addEventListener('click',function(){
  var iframe=document.getElementById('htmlv-iframe');
  iframe.src=iframe.src;
});

document.getElementById('htmlv-fullscreen').addEventListener('click',function(){
  var iframe=document.getElementById('htmlv-iframe');
  if(iframe.requestFullscreen)iframe.requestFullscreen();
});

document.getElementById('htmlv-open').addEventListener('click',function(){
  if(_htmlSrc)window.open(_htmlSrc,'_blank');
});

document.getElementById('htmlv-dl').addEventListener('click',function(){
  if(_htmlSrc){var a=document.createElement('a');a.href=_htmlSrc;a.download='page.html';a.click();}
});

document.getElementById('htmlv-close').addEventListener('click',function(){
  document.getElementById('bot-html-viewer').classList.remove('show');
  document.getElementById('htmlv-iframe').src='about:blank';
});

function open3DViewer(src,name){
  _3dSrc=src;
  document.getElementById('v3d-title').textContent=name||'✦ عارض ثلاثي الأبعاد ✦';
  document.getElementById('bot-3d-viewer').classList.add('show');
  _3dAutoRot=false;
  _3dWireframe=false;
  _3dLightMode=0;
  document.getElementById('v3d-autorotate').classList.remove('active');
  document.getElementById('v3d-wireframe').classList.remove('active');
  init3DScene(src);
}

function init3DScene(src){
  var wrap=document.getElementById('v3d-canvas-wrap');
  var canvas=document.getElementById('v3d-canvas');

  if(_3dAnimId){cancelAnimationFrame(_3dAnimId);_3dAnimId=null;}
  if(_3dRenderer){_3dRenderer.dispose&&_3dRenderer.dispose();}

  if(!window.THREE){
    C.loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',function(){
      C.loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',function(){
        C.loadScript('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',function(){
          _init3D(src,wrap,canvas);
        });
      });
    });
  } else {
    _init3D(src,wrap,canvas);
  }
}

function _init3D(src,wrap,canvas){
  var THREE=window.THREE;
  if(!THREE)return;

  var W=wrap.clientWidth,H=wrap.clientHeight;

  _3dScene=new THREE.Scene();
  _3dScene.background=new THREE.Color(0x000008);

  var fog=new THREE.FogExp2(0x000010,0.05);
  _3dScene.fog=fog;

  _3dCamera=new THREE.PerspectiveCamera(45,W/H,.01,1000);
  _3dCamera.position.set(2,1.5,3);

  _3dRenderer=new THREE.WebGLRenderer({canvas:canvas,antialias:true,alpha:true});
  _3dRenderer.setSize(W,H);
  _3dRenderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
  _3dRenderer.shadowMap.enabled=true;
  _3dRenderer.toneMapping=THREE.ACESFilmicToneMapping;
  _3dRenderer.toneMappingExposure=1.2;

  var ambientLight=new THREE.AmbientLight(0x404060,0.6);
  _3dScene.add(ambientLight);

  var dirLight=new THREE.DirectionalLight(0xffffff,1.2);
  dirLight.position.set(5,8,6);
  dirLight.castShadow=true;
  _3dScene.add(dirLight);

  var pointLight=new THREE.PointLight(0x4466ff,0.8,20);
  pointLight.position.set(-3,2,-3);
  _3dScene.add(pointLight);

  var rimLight=new THREE.DirectionalLight(0xff2200,0.3);
  rimLight.position.set(-5,-2,3);
  _3dScene.add(rimLight);

  var grid=new THREE.GridHelper(10,20,0x220011,0x110008);
  grid.position.y=-0.01;
  _3dScene.add(grid);

  var controls=null;
  if(THREE.OrbitControls){
    controls=new THREE.OrbitControls(_3dCamera,canvas);
    controls.enableDamping=true;
    controls.dampingFactor=0.08;
    controls.minDistance=0.1;
    controls.maxDistance=50;
  } else {
    _initSimpleOrbit(_3dCamera,canvas);
  }

  var ext=C.fileExt(src);
  var _loadedMesh=null;

  function afterLoad(obj){
    _loadedMesh=obj;
    var box=new THREE.Box3().setFromObject(obj);
    var size=box.getSize(new THREE.Vector3());
    var center=box.getCenter(new THREE.Vector3());
    var maxDim=Math.max(size.x,size.y,size.z);
    var scale=2/maxDim;
    obj.scale.setScalar(scale);
    obj.position.sub(center.multiplyScalar(scale));
    _3dScene.add(obj);

    var dist=2.5;
    _3dCamera.position.set(dist,dist*.8,dist);
    if(controls)controls.update();
  }

  if(ext==='glb'||ext==='gltf'){
    if(window.THREE&&THREE.GLTFLoader){
      var loader=new THREE.GLTFLoader();
      loader.load(src,function(gltf){
        afterLoad(gltf.scene);
      },undefined,function(err){
        _add3DPlaceholder(err);
      });
    } else {
      _add3DPlaceholder('GLTFLoader not available');
    }
  } else if(ext==='obj'){
    if(THREE.OBJLoader){
      var objLoader=new THREE.OBJLoader();
      objLoader.load(src,afterLoad,undefined,function(e){_add3DPlaceholder(e);});
    } else {
      _add3DFallbackShape();
    }
  } else {
    _add3DFallbackShape();
  }

  function _add3DPlaceholder(err){
    console.warn('3D load error:',err);
    _add3DFallbackShape();
  }

  function _add3DFallbackShape(){
    var geo=new THREE.IcosahedronGeometry(0.8,1);
    var mat=new THREE.MeshStandardMaterial({
      color:0x2244aa,metalness:.7,roughness:.3,
      emissive:0x112244,emissiveIntensity:.2
    });
    var mesh=new THREE.Mesh(geo,mat);
    mesh.castShadow=true;
    _3dScene.add(mesh);
    _loadedMesh=mesh;
  }

  document.getElementById('v3d-wireframe').onclick=function(){
    _3dWireframe=!_3dWireframe;
    this.classList.toggle('active',_3dWireframe);
    if(_loadedMesh){
      _loadedMesh.traverse&&_loadedMesh.traverse(function(child){
        if(child.isMesh&&child.material){
          if(Array.isArray(child.material)){
            child.material.forEach(function(m){m.wireframe=_3dWireframe;});
          } else {
            child.material.wireframe=_3dWireframe;
          }
        }
      });
    }
  };

  document.getElementById('v3d-autorotate').onclick=function(){
    _3dAutoRot=!_3dAutoRot;
    this.classList.toggle('active',_3dAutoRot);
    if(controls)controls.autoRotate=_3dAutoRot;
  };

  document.getElementById('v3d-lights').onclick=function(){
    _3dLightMode=(_3dLightMode+1)%4;
    var modes=[
      {ambient:0x404060,dir:0xffffff,point:0x4466ff},
      {ambient:0x600020,dir:0xff4422,point:0xff0000},
      {ambient:0x004020,dir:0x44ff88,point:0x00ff44},
      {ambient:0xffd080,dir:0xffee88,point:0xffaa00}
    ];
    var m=modes[_3dLightMode];
    ambientLight.color.setHex(m.ambient);
    dirLight.color.setHex(m.dir);
    pointLight.color.setHex(m.point);
    this.textContent=['💡 إضاءة','🔴 أحمر','💚 أخضر','🌟 ذهبي'][_3dLightMode];
  };

  document.getElementById('v3d-reset-cam').onclick=function(){
    _3dCamera.position.set(2,1.5,3);
    if(controls){controls.reset&&controls.reset();controls.update();}
  };

  document.getElementById('v3d-screenshot').onclick=function(){
    _3dRenderer.render(_3dScene,_3dCamera);
    var a=document.createElement('a');
    a.href=canvas.toDataURL('image/png');
    a.download='3d_'+Date.now()+'.png';
    a.click();
  };

  var resizeObs=new ResizeObserver(function(){
    var nw=wrap.clientWidth,nh=wrap.clientHeight;
    _3dCamera.aspect=nw/nh;
    _3dCamera.updateProjectionMatrix();
    _3dRenderer.setSize(nw,nh);
  });
  resizeObs.observe(wrap);

  (function animate(){
    _3dAnimId=requestAnimationFrame(animate);
    if(controls)controls.update();
    _3dRenderer.render(_3dScene,_3dCamera);
  })();
}

function _initSimpleOrbit(camera,canvas){
  var isDragging=false;
  var prevX=0,prevY=0;
  var theta=0,phi=Math.PI/4,radius=4;

  function update(){
    camera.position.set(
      radius*Math.sin(phi)*Math.sin(theta),
      radius*Math.cos(phi),
      radius*Math.sin(phi)*Math.cos(theta)
    );
    camera.lookAt(0,0,0);
  }

  canvas.addEventListener('mousedown',function(e){isDragging=true;prevX=e.clientX;prevY=e.clientY;});
  canvas.addEventListener('mousemove',function(e){
    if(!isDragging)return;
    theta-=(e.clientX-prevX)*0.01;
    phi=Math.max(.1,Math.min(Math.PI-.1,phi-(e.clientY-prevY)*0.01));
    prevX=e.clientX;prevY=e.clientY;update();
  });
  canvas.addEventListener('mouseup',function(){isDragging=false;});
  canvas.addEventListener('wheel',function(e){
    radius=Math.max(0.5,Math.min(20,radius+e.deltaY*0.01));update();
  },{passive:true});

  var tc={};
  canvas.addEventListener('touchstart',function(e){
    if(e.touches.length===1){isDragging=true;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY;}
    if(e.touches.length===2){tc.dist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);}
  },{passive:true});
  canvas.addEventListener('touchmove',function(e){
    if(e.touches.length===1&&isDragging){
      theta-=(e.touches[0].clientX-prevX)*0.012;
      phi=Math.max(.1,Math.min(Math.PI-.1,phi-(e.touches[0].clientY-prevY)*0.012));
      prevX=e.touches[0].clientX;prevY=e.touches[0].clientY;update();
    }
    if(e.touches.length===2){
      var d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
      radius=Math.max(0.5,Math.min(20,radius-(d-tc.dist)*0.02));
      tc.dist=d;update();
    }
  },{passive:true});
  canvas.addEventListener('touchend',function(){isDragging=false;});
  update();
}

document.getElementById('v3d-dl').addEventListener('click',function(){
  if(_3dSrc){var a=document.createElement('a');a.href=_3dSrc;a.download=_3dSrc.split('/').pop()||'model.glb';a.click();}
});

document.getElementById('v3d-close').addEventListener('click',function(){
  document.getElementById('bot-3d-viewer').classList.remove('show');
  if(_3dAnimId){cancelAnimationFrame(_3dAnimId);_3dAnimId=null;}
  if(_3dRenderer){_3dRenderer.dispose&&_3dRenderer.dispose();_3dRenderer=null;}
});

function buildFile(item,opts){
  var name=item.name||'ملف';
  var ext=C.fileExt(name);
  var type=C.fileType(name,item.mime||'');
  var icon=C.getMimeIcon(type,ext);
  var url=item.path||item.url||item.src||'';

  var w=document.createElement('div');w.className='bot-file-card';
  var ic=document.createElement('span');ic.className='bot-file-icon';ic.textContent=icon;
  var info=document.createElement('div');info.className='bot-file-info';
  var nm=document.createElement('div');nm.className='bot-file-name';nm.textContent=name;
  var mt=document.createElement('div');mt.className='bot-file-meta';
  mt.textContent=(ext.toUpperCase()||'FILE')+(item.size?' · '+item.size:'');

  var acts=document.createElement('div');acts.className='bot-file-actions';
  if(url){
    var dlBtn=document.createElement('button');
    dlBtn.className='bot-file-btn';dlBtn.textContent='⬇ تنزيل';
    dlBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var a=document.createElement('a');a.href=url;a.download=name;a.click();
    });
    acts.appendChild(dlBtn);

    if(navigator.share){
      var shareBtn=document.createElement('button');
      shareBtn.className='bot-file-btn';shareBtn.textContent='↗ مشاركة';
      shareBtn.addEventListener('click',function(e){
        e.stopPropagation();
        navigator.share({url:url,title:name}).catch(function(){});
      });
      acts.appendChild(shareBtn);
    }
  }

  info.appendChild(nm);info.appendChild(mt);info.appendChild(acts);
  w.appendChild(ic);w.appendChild(info);

  w.addEventListener('click',function(){
    if(url){var a=document.createElement('a');a.href=url;a.download=name;a.click();}
  });
  return w;
}

function buildTextFile(item,opts){
  var ext=C.fileExt(item.name||'');
  var icons={js:'⚙',json:'{}',txt:'📝',html:'🌐',
    css:'🎨',py:'🐍',md:'📖',csv:'📊',sh:'🖥',
    ts:'⚙',xml:'🔧',cpp:'⚡',c:'⚡'};
  var icon=icons[ext]||'📄';
  var content=item.content||item.text||'';

  var w=document.createElement('div');w.className='bot-txt-file';
  var hdr=document.createElement('div');hdr.className='bot-txt-header';
  var ic=document.createElement('span');ic.className='bot-txt-icon';ic.textContent=icon;
  var nm=document.createElement('span');nm.className='bot-txt-name';nm.textContent=item.name||'ملف';
  hdr.appendChild(ic);hdr.appendChild(nm);

  var prev=document.createElement('div');prev.className='bot-txt-preview';
  prev.textContent=content.slice(0,100)+(content.length>100?'...':'');

  var footer=document.createElement('div');footer.className='bot-txt-footer';
  var viewBtn=document.createElement('button');
  viewBtn.className='bot-file-btn';viewBtn.textContent='👁 عرض';
  viewBtn.addEventListener('click',function(e){e.stopPropagation();openTxtViewer(item);});

  var copyBtn=document.createElement('button');
  copyBtn.className='bot-file-btn';copyBtn.textContent='📋 نسخ';
  copyBtn.addEventListener('click',function(e){
    e.stopPropagation();
    if(navigator.clipboard)navigator.clipboard.writeText(content);
    C.emit('ui:toast',{msg:'تم النسخ ✓'});
  });

  footer.appendChild(viewBtn);footer.appendChild(copyBtn);

  if(item.path||item.url){
    var dlBtn=document.createElement('button');
    dlBtn.className='bot-file-btn';dlBtn.textContent='⬇';
    dlBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var blob=new Blob([content],{type:'text/plain'});
      var a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download=item.name||'file.txt';a.click();
    });
    footer.appendChild(dlBtn);
  }

  w.appendChild(hdr);w.appendChild(prev);w.appendChild(footer);
  w.addEventListener('click',function(){openTxtViewer(item);});
  return w;
}

function buildAPK(item,opts){
  var w=document.createElement('div');w.className='bot-apk-card';
  var iconWrap=document.createElement('div');iconWrap.className='bot-apk-icon-wrap';
  iconWrap.textContent=item.icon||'📲';
  var info=document.createElement('div');info.className='bot-apk-info';
  var nm=document.createElement('div');nm.className='bot-apk-name';nm.textContent=item.name||'تطبيق.apk';
  var mt=document.createElement('div');mt.className='bot-apk-meta';
  mt.textContent=(item.version?'v'+item.version+' · ':'')+
    (item.size||'APK')+(item.pkg?' · '+item.pkg:'');
  info.appendChild(nm);info.appendChild(mt);
  if(item.desc){
    var desc=document.createElement('div');desc.className='bot-apk-desc';
    desc.textContent=item.desc;info.appendChild(desc);
  }
  var dlBtn=document.createElement('button');dlBtn.className='bot-apk-dl-btn';
  dlBtn.textContent='⬇ تحميل';
  dlBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var url=item.path||item.url||item.src||'';
    if(url){var a=document.createElement('a');a.href=url;a.download=item.name||'app.apk';a.click();}
    else{C.emit('ui:toast',{msg:'الرابط غير متاح'});}
  });
  w.appendChild(iconWrap);w.appendChild(info);w.appendChild(dlBtn);
  return w;
}

function buildHTML(item,opts){
  var url=item.path||item.url||item.src||'';
  var name=item.name||'صفحة.html';
  var content=item.content||item.html||'';

  var w=document.createElement('div');w.className='bot-html-card';

  var prev=document.createElement('div');prev.className='bot-html-preview';
  prev.textContent='🌐';

  var info=document.createElement('div');info.className='bot-html-info';
  var nm=document.createElement('div');nm.className='bot-html-name';nm.textContent=name;
  var acts=document.createElement('div');acts.className='bot-html-actions';

  var viewBtn=document.createElement('button');viewBtn.className='bot-html-btn';
  viewBtn.textContent='👁 عرض';
  viewBtn.addEventListener('click',function(e){
    e.stopPropagation();
    if(content)openHtmlViewerFromContent(content,name);
    else if(url)openHtmlViewer(url,name);
  });

  var openBtn=document.createElement('button');openBtn.className='bot-html-btn';
  openBtn.textContent='↗ فتح';
  openBtn.addEventListener('click',function(e){
    e.stopPropagation();
    if(url)window.open(url,'_blank');
    else if(content){
      var blob=new Blob([content],{type:'text/html'});
      window.open(URL.createObjectURL(blob),'_blank');
    }
  });

  if(url){
    var dlBtn=document.createElement('button');dlBtn.className='bot-html-btn';
    dlBtn.textContent='⬇';
    dlBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var a=document.createElement('a');a.href=url;a.download=name;a.click();
    });
    acts.appendChild(dlBtn);
  }

  acts.appendChild(viewBtn);acts.appendChild(openBtn);
  info.appendChild(nm);info.appendChild(acts);
  w.appendChild(prev);w.appendChild(info);

  w.addEventListener('click',function(){
    if(content)openHtmlViewerFromContent(content,name);
    else if(url)openHtmlViewer(url,name);
  });
  return w;
}

function build3D(item,opts){
  var url=item.path||item.url||item.src||'';
  var name=item.name||'نموذج.glb';
  var ext=C.fileExt(name).toUpperCase();

  var w=document.createElement('div');w.className='bot-glb-card';

  var prev=document.createElement('div');prev.className='bot-glb-preview';
  var icon=document.createElement('div');icon.className='bot-glb-icon';icon.textContent='🧊';
  prev.appendChild(icon);

  var info=document.createElement('div');info.className='bot-glb-info';
  var nm=document.createElement('div');nm.className='bot-glb-name';nm.textContent=name;
  var badge=document.createElement('div');badge.className='bot-glb-badge';badge.textContent=ext;
  info.appendChild(nm);info.appendChild(badge);

  var acts=document.createElement('div');acts.className='bot-glb-actions';
  var viewBtn=document.createElement('button');viewBtn.className='bot-glb-btn';
  viewBtn.textContent='🧊 عرض ثلاثي';
  viewBtn.addEventListener('click',function(e){
    e.stopPropagation();open3DViewer(url,name);
  });
  var dlBtn=document.createElement('button');dlBtn.className='bot-glb-btn';
  dlBtn.textContent='⬇ تنزيل';
  dlBtn.addEventListener('click',function(e){
    e.stopPropagation();
    var a=document.createElement('a');a.href=url;a.download=name;a.click();
  });
  acts.appendChild(viewBtn);acts.appendChild(dlBtn);

  w.appendChild(prev);w.appendChild(info);w.appendChild(acts);
  w.addEventListener('click',function(){open3DViewer(url,name);});
  return w;
}

function buildPDF(item,opts){
  var url=item.path||item.url||item.src||'';
  var name=item.name||'ملف.pdf';

  var w=document.createElement('div');w.className='bot-file-card';
  w.style.borderRightColor='rgba(255,100,50,.7)';
  var ic=document.createElement('span');ic.className='bot-file-icon';ic.textContent='📄';
  var info=document.createElement('div');info.className='bot-file-info';
  var nm=document.createElement('div');nm.className='bot-file-name';nm.textContent=name;
  var mt=document.createElement('div');mt.className='bot-file-meta';
  mt.textContent='PDF'+(item.size?' · '+item.size:'')+(item.pages?' · '+item.pages+' صفحة':'');
  var acts=document.createElement('div');acts.className='bot-file-actions';

  if(url){
    var viewBtn=document.createElement('button');viewBtn.className='bot-file-btn';
    viewBtn.textContent='👁 فتح';
    viewBtn.addEventListener('click',function(e){
      e.stopPropagation();window.open(url,'_blank');
    });
    var dlBtn=document.createElement('button');dlBtn.className='bot-file-btn';
    dlBtn.textContent='⬇ تنزيل';
    dlBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var a=document.createElement('a');a.href=url;a.download=name;a.click();
    });
    acts.appendChild(viewBtn);acts.appendChild(dlBtn);
  }

  info.appendChild(nm);info.appendChild(mt);info.appendChild(acts);
  w.appendChild(ic);w.appendChild(info);
  if(url){
    w.style.cursor='pointer';
    w.addEventListener('click',function(){window.open(url,'_blank');});
  }
  return w;
}

function buildArchive(item,opts){
  var url=item.path||item.url||item.src||'';
  var name=item.name||'archive.zip';
  var ext=C.fileExt(name).toUpperCase();
  var icons={zip:'🗜',rar:'🗜','7z':'🗜',tar:'📦',gz:'📦',bz2:'📦'};
  var icon=icons[ext.toLowerCase()]||'🗜';

  var w=document.createElement('div');w.className='bot-file-card';
  var ic=document.createElement('span');ic.className='bot-file-icon';ic.textContent=icon;
  var info=document.createElement('div');info.className='bot-file-info';
  var nm=document.createElement('div');nm.className='bot-file-name';nm.textContent=name;
  var mt=document.createElement('div');mt.className='bot-file-meta';
  mt.textContent=ext+(item.size?' · '+item.size:'')+(item.files?' · '+item.files+' ملف':'');
  var acts=document.createElement('div');acts.className='bot-file-actions';
  if(url){
    var dlBtn=document.createElement('button');dlBtn.className='bot-file-btn';
    dlBtn.textContent='⬇ تنزيل';
    dlBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var a=document.createElement('a');a.href=url;a.download=name;a.click();
    });
    acts.appendChild(dlBtn);
  }
  info.appendChild(nm);info.appendChild(mt);info.appendChild(acts);
  w.appendChild(ic);w.appendChild(info);
  w.style.cursor='pointer';
  w.addEventListener('click',function(){
    if(url){var a=document.createElement('a');a.href=url;a.download=name;a.click();}
  });
  return w;
}

function buildOffice(item,opts){
  var url=item.path||item.url||item.src||'';
  var name=item.name||'document';
  var ext=C.fileExt(name).toLowerCase();
  var icons={doc:'📝',docx:'📝',xls:'📊',xlsx:'📊',ppt:'📋',pptx:'📋'};
  var colors={doc:'rgba(0,80,180,.6)',docx:'rgba(0,80,180,.6)',
    xls:'rgba(0,140,60,.6)',xlsx:'rgba(0,140,60,.6)',
    ppt:'rgba(200,60,0,.6)',pptx:'rgba(200,60,0,.6)'};
  var icon=icons[ext]||'📄';
  var color=colors[ext]||'rgba(180,0,0,.6)';

  var w=document.createElement('div');w.className='bot-file-card';
  w.style.borderRightColor=color;
  var ic=document.createElement('span');ic.className='bot-file-icon';ic.textContent=icon;
  var info=document.createElement('div');info.className='bot-file-info';
  var nm=document.createElement('div');nm.className='bot-file-name';nm.textContent=name;
  var mt=document.createElement('div');mt.className='bot-file-meta';
  mt.textContent=ext.toUpperCase()+(item.size?' · '+item.size:'');
  var acts=document.createElement('div');acts.className='bot-file-actions';
  if(url){
    var viewBtn=document.createElement('button');viewBtn.className='bot-file-btn';
    viewBtn.textContent='👁 عرض';
    viewBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var gView='https://docs.google.com/viewer?url='+encodeURIComponent(url)+'&embedded=true';
      window.open(gView,'_blank');
    });
    var dlBtn=document.createElement('button');dlBtn.className='bot-file-btn';
    dlBtn.textContent='⬇ تنزيل';
    dlBtn.addEventListener('click',function(e){
      e.stopPropagation();
      var a=document.createElement('a');a.href=url;a.download=name;a.click();
    });
    acts.appendChild(viewBtn);acts.appendChild(dlBtn);
  }
  info.appendChild(nm);info.appendChild(mt);info.appendChild(acts);
  w.appendChild(ic);w.appendChild(info);
  return w;
}

C.on('file:attached',function(d){
  var file=d.file;
  if(!file)return;
  var type=C.getContentType(file);
  var url=C.createObjectURL(file);
  var UI=window.BOT_UI;
  if(!UI)return;

  if(type==='image'){UI.addMsg('user',url,'image');}
  else if(type==='video'){UI.addMsg('user',{src:url,name:file.name},'video');}
  else if(type==='audio'){UI.addMsg('user',{src:url,name:file.name},'audio');}
  else if(type==='html'){
    C.readAsText(file,function(err,content){
      UI.addMsg('user',{name:file.name,content:content,url:url},'html');
    });
  }
  else if(type==='glb'||type==='3d'){
    UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'glb');
  }
  else if(type==='pdf'){
    UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'pdf');
  }
  else if(type==='apk'){
    UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'apk');
  }
  else if(type==='archive'){
    UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'archive');
  }
  else if(type==='office'){
    UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'office');
  }
  else if(['js','json','txt','code','md','csv'].includes(type)){
    C.readAsText(file,function(err,content){
      UI.addMsg('user',{name:file.name,content:content},'txt');
    });
  }
  else{
    UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'file');
  }
});

window.BOT_FILES={
  buildFile:buildFile,
  buildTextFile:buildTextFile,
  buildAPK:buildAPK,
  buildHTML:buildHTML,
  build3D:build3D,
  buildPDF:buildPDF,
  buildArchive:buildArchive,
  buildOffice:buildOffice,
  openTxtViewer:openTxtViewer,
  openHtmlViewer:openHtmlViewer,
  openHtmlViewerFromContent:openHtmlViewerFromContent,
  open3DViewer:open3DViewer
};

C.registerModule('files',window.BOT_FILES);
C.emit('files:ready',{});

})();
