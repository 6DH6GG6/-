'use strict';

/* ══════════════════════════════════════════════
   GW — Gateway Controller
   يُحمَّل كـ gateway.js داخل gateway.html
══════════════════════════════════════════════ */

var GW = (function(){

  /* ─── الصوت ─── */
  var _sounds = {};
  function _getAudio(id){ return document.getElementById(id) || _sounds[id] || null; }
  function playClick(){
    var a = _getAudio('sfx-kps');
    if(a){ a.currentTime=0; a.play().catch(function(){}); }
  }
  function playOpen(){
    var a = _getAudio('sfx-open');
    if(a){ a.currentTime=0; a.play().catch(function(){}); }
  }
  function playMusic(){
    var a = _getAudio('sfx-music');
    if(a){ a.volume=.55; a.play().catch(function(){}); }
  }

  /* ─── Loader ─── */
  var _loaderActive = false;
  function showLoader(label, onDone){
    var ov   = document.getElementById('loader-overlay');
    var bar  = document.getElementById('loader-bar');
    var pct  = document.getElementById('loader-pct');
    var ttl  = document.getElementById('loader-title');
    if(!ov) return { finish: function(){ if(onDone) onDone(); } };
    if(label && ttl) ttl.innerText = label;
    bar.style.width = '0%';
    pct.innerText = '0%';
    ov.classList.add('show');
    _loaderActive = true;

    var progress = 0;
    var iv = setInterval(function(){
      var jitter = (Math.random()-.3)*1.4;
      progress += 1.2 + jitter;
      if(progress >= 97) progress = 97;
      bar.style.width = progress + '%';
      pct.innerText = Math.floor(progress) + '%';
    }, 26);

    return {
      finish: function(){
        clearInterval(iv);
        bar.style.width = '100%';
        pct.innerText = '100%';
        setTimeout(function(){
          ov.classList.remove('show');
          _loaderActive = false;
          if(onDone) onDone();
        }, 380);
      }
    };
  }

  /* ─── Three.js ─── */
  var scene, camera, renderer, doorL, doorR;
  var doorsOpening = false, doorAngle = 0;
  var OPEN_ANGLE  = Math.PI / 2;
  var DOOR_SPEED  = Math.PI / (5 * 60);
  var backGlow, threeInited = false;

  function initThree(){
    if(threeInited || !window.THREE) return;
    threeInited = true;
    var canvas = document.getElementById('three-canvas');
    if(!canvas) return;

    renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    scene    = new THREE.Scene();
    camera   = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .01, 200);
    camera.position.set(0,0,7.5);

    scene.add(new THREE.AmbientLight(0x110022, 2.5));
    var dL = new THREE.DirectionalLight(0x6600aa, 3);
    dL.position.set(0,2,5); scene.add(dL);
    backGlow = new THREE.PointLight(0xaa44ff, 0, 18);
    backGlow.position.set(0,0,-2); scene.add(backGlow);

    function resizeR(){
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resizeR); resizeR();

    var ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
    canvas.addEventListener('click', function(e){
      if(doorsOpening) return;
      mouse.x =  (e.clientX/window.innerWidth)*2 - 1;
      mouse.y = -(e.clientY/window.innerHeight)*2 + 1;
      ray.setFromCamera(mouse, camera);
      if(ray.intersectObjects(scene.children, true).length > 0) onGateClick();
    });

    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js';
    s.onload = loadGLB; s.onerror = buildFallback;
    document.head.appendChild(s);

    (function animate(){
      requestAnimationFrame(animate);
      if(doorsOpening){
        doorAngle = Math.min(doorAngle + DOOR_SPEED, OPEN_ANGLE);
        if(doorL) doorL.rotation.y =  -doorAngle;
        if(doorR) doorR.rotation.y = -doorAngle;
        if(backGlow) backGlow.intensity = (doorAngle / OPEN_ANGLE) * 5;
      }
      renderer.render(scene, camera);
    })();
  }

  function loadGLB(){
    if(!window.THREE || !window.THREE.GLTFLoader){ buildFallback(); return; }
    new THREE.GLTFLoader().load('GggG.glb', function(gltf){
      var model = gltf.scene;
      model.traverse(function(c){
        if(c.name === 'Door_L') doorL = c;
        if(c.name === 'Door_R') doorR = c;
      });
      var box = new THREE.Box3().setFromObject(model);
      var sz  = box.getSize(new THREE.Vector3());
      var cn  = box.getCenter(new THREE.Vector3());
      var sc  = 4.5 / Math.max(sz.x, sz.y, sz.z);
      model.scale.setScalar(sc);
      model.position.set(-cn.x*sc, -cn.y*sc, -cn.z*sc);
      scene.add(model);
    }, null, buildFallback);
  }

  function buildFallback(){
    var mat = new THREE.MeshStandardMaterial({color:0x150025,roughness:.25,metalness:.9,side:THREE.DoubleSide});
    var frm = new THREE.MeshStandardMaterial({color:0x3a0055,roughness:.1, metalness:1, side:THREE.DoubleSide});
    function aB(g,m,x,y,z){ var mesh=new THREE.Mesh(g,m); mesh.position.set(x,y,z); scene.add(mesh); return mesh; }
    aB(new THREE.BoxGeometry(3.1,.18,.14), frm, 0, 1.82,.01);
    aB(new THREE.BoxGeometry(3.1,.18,.14), frm, 0,-1.82,.01);
    aB(new THREE.BoxGeometry(.18,3.64,.14),frm,-1.46,0,.01);
    aB(new THREE.BoxGeometry(.18,3.64,.14),frm, 1.46,0,.01);
    var gL = new THREE.BoxGeometry(1.3,3.6,.09); gL.translate( .65,0,-.15);
    doorL = new THREE.Mesh(gL, mat.clone()); doorL.position.set(-1.3,0,.07); scene.add(doorL);
    var gR = new THREE.BoxGeometry(1.3,3.6,.09); gR.translate(-.65,0,-.15);
    doorR = new THREE.Mesh(gR, mat.clone()); doorR.position.set( 1.3,0,.07); scene.add(doorR);
  }

  /* ─── Lightning ─── */
  var _glCV, _glCTX, _glW, _glH, _glBolts=[], _glActive=false;
  function initGL(){
    _glCV  = document.getElementById('s2-lightning');
    if(!_glCV) return;
    _glCTX = _glCV.getContext('2d');
    _resizeGL();
    window.addEventListener('resize', _resizeGL);
  }
  function _resizeGL(){ if(!_glCV)return; _glW=_glCV.width=window.innerWidth; _glH=_glCV.height=window.innerHeight; }
  function _spawnBolt(){
    var cx=_glW/2, cy=_glH*.48;
    var a=-Math.PI/2+(Math.random()-.5)*Math.PI*1.6;
    var pts=[{x:cx,y:cy}], x=cx, y=cy;
    for(var i=0;i<10;i++){ x+=Math.cos(a)*30+(Math.random()-.5)*50; y+=Math.sin(a)*30+(Math.random()-.5)*30; pts.push({x:x,y:y}); }
    return{pts:pts,life:1,decay:.08+Math.random()*.1};
  }
  function _glLoop(){
    if(!_glActive||!_glCTX){ if(_glCTX) _glCTX.clearRect(0,0,_glW,_glH); return; }
    _glCTX.clearRect(0,0,_glW,_glH);
    if(Math.random()<.25) _glBolts.push(_spawnBolt());
    for(var i=_glBolts.length-1;i>=0;i--){
      var b=_glBolts[i];
      _glCTX.beginPath(); _glCTX.moveTo(b.pts[0].x,b.pts[0].y);
      for(var j=1;j<b.pts.length;j++) _glCTX.lineTo(b.pts[j].x,b.pts[j].y);
      _glCTX.strokeStyle='rgba(255,0,0,'+b.life+')'; _glCTX.lineWidth=3;
      _glCTX.shadowColor='rgba(255,0,0,1)'; _glCTX.shadowBlur=20;
      _glCTX.stroke(); _glCTX.shadowBlur=0;
      b.life-=b.decay; if(b.life<=0) _glBolts.splice(i,1);
    }
    requestAnimationFrame(_glLoop);
  }
  function startGL(){ if(_glActive||!_glCTX)return; _glActive=true; _glBolts=[]; requestAnimationFrame(_glLoop); }
  function stopGL(){ _glActive=false; _glBolts=[]; if(_glCTX) _glCTX.clearRect(0,0,_glW,_glH); }

  /* ─── Embers ─── */
  function initEmbers(){
    var cv=document.getElementById('s2-embers'); if(!cv)return;
    var ctx=cv.getContext('2d'), W, H, sparks=[];
    function resize(){ W=cv.width=window.innerWidth; H=cv.height=window.innerHeight; }
    resize(); window.addEventListener('resize',resize);
    function mk(){ return{x:Math.random()*W,y:H+10,vx:(Math.random()-.5)*1.2,vy:-(1+Math.random()*2.5),life:1,s:1.5+Math.random()*2.5}; }
    for(var i=0;i<30;i++){ var sp=mk(); sp.y=Math.random()*H; sparks.push(sp); }
    (function loop(){
      ctx.clearRect(0,0,W,H);
      if(sparks.length<60 && Math.random()<.4) sparks.push(mk());
      for(var i=sparks.length-1;i>=0;i--){
        var s=sparks[i]; s.x+=s.vx; s.y+=s.vy; s.life-=.007;
        ctx.beginPath(); ctx.arc(s.x,s.y,s.s*s.life,0,Math.PI*2);
        ctx.fillStyle='rgba(150,0,255,'+(s.life*.8)+')'; ctx.fill();
        if(s.life<=0||s.y<-10) sparks.splice(i,1);
      }
      requestAnimationFrame(loop);
    })();
  }

  /* ─── Thunder Menu Lightning ─── */
  var _tmCV, _tmCTX, _tmW, _tmH, _tmBolts=[], _tmActive=false, _barIv=null;
  function initTMLight(){
    _tmCV=document.getElementById('tm-lightning'); if(!_tmCV)return;
    _tmCTX=_tmCV.getContext('2d');
    function rz(){ _tmW=_tmCV.width=window.innerWidth; _tmH=_tmCV.height=window.innerHeight; }
    rz(); window.addEventListener('resize',rz);
  }
  function _tmSpawn(){
    var pts=[],x=Math.random()*_tmW,y=0; pts.push({x:x,y:y});
    for(var i=0;i<9;i++){ x+=(Math.random()-.5)*130; y+=_tmH/9+Math.random()*45; pts.push({x:x,y:y}); }
    var c=Math.random()>.45?'201,168,76':'245,224,144';
    return{pts:pts,life:1,decay:.06+Math.random()*.09,color:c};
  }
  function _tmLoop(){
    if(!_tmActive||!_tmCTX)return;
    _tmCTX.clearRect(0,0,_tmW,_tmH);
    if(Math.random()<.16) _tmBolts.push(_tmSpawn());
    for(var i=_tmBolts.length-1;i>=0;i--){
      var b=_tmBolts[i];
      _tmCTX.beginPath(); _tmCTX.moveTo(b.pts[0].x,b.pts[0].y);
      for(var j=1;j<b.pts.length;j++) _tmCTX.lineTo(b.pts[j].x,b.pts[j].y);
      _tmCTX.strokeStyle='rgba('+b.color+','+b.life+')'; _tmCTX.lineWidth=1.5+b.life*2.5;
      _tmCTX.stroke(); b.life-=b.decay; if(b.life<=0) _tmBolts.splice(i,1);
    }
    requestAnimationFrame(_tmLoop);
  }

  function showTM(){
    _tmActive=true; _tmBolts=[];
    document.getElementById('thunder-menu').classList.add('show');
    requestAnimationFrame(_tmLoop);
    var bar=document.getElementById('tm-bar'), p=0;
    if(_barIv) clearInterval(_barIv);
    _barIv=setInterval(function(){ p+=.33; if(p>=100){p=100;clearInterval(_barIv);} bar.style.width=p+'%'; },16);
  }
  function hideTM(){
    _tmActive=false;
    if(_barIv) clearInterval(_barIv);
    document.getElementById('thunder-menu').classList.remove('show');
    if(_tmCTX) _tmCTX.clearRect(0,0,_tmW,_tmH);
    _tmBolts=[]; document.getElementById('tm-bar').style.width='0%';
  }

  /* ─── نقر على البوابة → برق → قائمة ─── */
  function onGateClick(){
    playClick();
    startGL();
    setTimeout(function(){ stopGL(); showTM(); }, 900);
  }

  /* ─── Password ─── */
  var PASSWORD = '666';

  function openPW(){
    document.getElementById('pw-panel').classList.add('show');
    setTimeout(function(){ var i=document.getElementById('pw-input'); if(i) i.focus(); }, 300);
  }
  function closePW(){
    document.getElementById('pw-panel').classList.remove('show');
    var i=document.getElementById('pw-input'); if(i) i.value='';
    document.getElementById('pw-err').classList.remove('show');
  }
  function checkPW(){
    var inp=document.getElementById('pw-input'); if(!inp)return;
    if(inp.value.trim()===PASSWORD){
      closePW();
      _enterMain();
    } else {
      var e=document.getElementById('pw-err');
      if(e){ e.classList.add('show'); setTimeout(function(){ e.classList.remove('show'); },3000); }
      startGL(); setTimeout(stopGL, 900);
    }
  }

  /* ─── فتح البوابة → تشغيل enter.js ─── */
  function _enterMain(){
    doorsOpening=true; doorAngle=0;
    var glow=document.getElementById('s2-glow'); if(glow) glow.classList.add('lit');
    startGL();
    playOpen();

    setTimeout(function(){
      stopGL(); if(glow) glow.classList.remove('lit');
      var pc=document.getElementById('purple-cover');
      var bc=document.getElementById('black-cover');
      if(pc) pc.classList.add('show');
      setTimeout(function(){
        if(bc) bc.classList.add('show');
        setTimeout(function(){

          /* ✅ تشغيل enter.js بعد فتح البوابة */
          var ldr = showLoader('جاري فتح المملكة...', function(){
            if(bc) bc.classList.remove('show');
            setTimeout(function(){ if(pc) pc.classList.remove('show'); }, 600);

            /* تحميل enter.js */
            var enterScript = document.createElement('script');
            enterScript.src = 'enter.js';
            enterScript.onerror = function(){
              console.warn('[GW] enter.js غير موجود، محاولة main.js...');
              var fallback = document.createElement('script');
              fallback.src = 'main.js';
              fallback.onload = function(){ if(window.MainApp) window.MainApp.init(); };
              document.head.appendChild(fallback);
            };
            document.head.appendChild(enterScript);

            playMusic();
          });
          setTimeout(function(){ ldr.finish(); }, 2000);

        }, 400);
      }, 500);
    }, 5000);
  }

  /* ─── معالجات أزرار القائمة ─── */
  function _bindMenuBtns(){
    var btnEnter = document.getElementById('btn-enter');
    var btnGangs = document.getElementById('btn-gangs');
    if(btnEnter) btnEnter.addEventListener('click', function(){
      playClick(); hideTM();
      var ldr = showLoader('تحقق من هويتك...', function(){ openPW(); });
      setTimeout(function(){ ldr.finish(); }, 1800);
    });
    if(btnGangs) btnGangs.addEventListener('click', function(){
      playClick(); hideTM();
      var ldr = showLoader('جاري التحميل...', function(){
        var s = document.createElement('script');
        s.src = 'gangs.js';
        s.onload = function(){ if(window.GangsApp) window.GangsApp.init(); };
        document.head.appendChild(s);
      });
      setTimeout(function(){ ldr.finish(); }, 2000);
    });
  }

  /* ─── init ─── */
  function init(){
    initEmbers();
    initGL();
    initTMLight();
    initThree();
    _bindMenuBtns();
  }

  if(document.getElementById('three-canvas')){
    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  return { init:init, playClick:playClick, checkPW:checkPW, closePW:closePW, openPW:openPW };

})();
