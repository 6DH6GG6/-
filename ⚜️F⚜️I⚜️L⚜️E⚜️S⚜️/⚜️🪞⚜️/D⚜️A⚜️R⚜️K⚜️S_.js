(function () {
  'use strict';

  if (document.getElementById('darks-welcome')) return;

  /* ══ خط Cairo ══ */
  if (!document.getElementById('cairo-font')) {
    var lnk = document.createElement('link');
    lnk.id = 'cairo-font';
    lnk.rel = 'stylesheet';
    lnk.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;700;900&display=swap';
    document.head.appendChild(lnk);
  }

  /* ══ CSS ══ */
  var css = document.createElement('style');
  css.textContent = `
  @keyframes dw-fadeOut {
    0%  { opacity:1; }
    100%{ opacity:0; }
  }

  @keyframes dw-nodeIn {
    0%  { opacity:0; transform:scale(.7); }
    100%{ opacity:1; transform:scale(1); }
  }

  @keyframes dw-starPop {
    0%  { opacity:1; transform:translate(-50%,-50%) scale(0) rotate(0deg); }
    55% { opacity:1; transform:translate(-50%,-50%) scale(1) rotate(30deg); }
    100%{ opacity:0; transform:translate(-50%,-50%) scale(1.15) rotate(45deg); }
  }

  /* ── دوران النجمة الكبيرة بلا توقف ── */
  @keyframes dw-bigStarRotate {
    from{ transform:rotate(0deg); }
    to  { transform:rotate(360deg); }
  }

  /* ════════════════ القائمة ════════════════ */
  #darks-welcome {
    position:fixed; inset:0; z-index:9999;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    background-color:#050005;
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    font-family:'Cairo', sans-serif;
    direction:rtl;
    overflow:hidden;
  }

  /* طبقة تعتيم فوق الخلفية */
  #darks-welcome::after {
    content:'';
    position:absolute; inset:0;
    background: rgba(5,0,5,0.72);
    pointer-events:none;
    z-index:0;
  }

  /* شبكة خلفية خفيفة */
  #darks-welcome::before {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(80,0,80,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(80,0,80,.07) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events:none;
    z-index:1;
  }

  /* إطار خارجي للقائمة */
  #dw-frame {
    position:relative;
    width:100%; height:100%;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding: 48px 60px;
    box-sizing:border-box;
    z-index:2;
    gap: clamp(16px, 3vh, 32px);
  }

  /* خطوط زاوية الإطار */
  #dw-frame::before, #dw-frame::after {
    content:'';
    position:absolute;
    width:80px; height:80px;
    border-color:#6b006b;
    border-style:solid;
  }
  #dw-frame::before { top:28px; right:28px; border-width:2px 2px 0 0; }
  #dw-frame::after  { bottom:28px; left:28px; border-width:0 0 2px 2px; }

  #dw-corner-tl, #dw-corner-br {
    position:absolute;
    width:80px; height:80px;
    border-color:#6b006b;
    border-style:solid;
    z-index:3;
  }
  #dw-corner-tl { top:28px; left:28px; border-width:2px 0 0 2px; }
  #dw-corner-br { bottom:28px; right:28px; border-width:0 2px 2px 0; }

  .dw-hline {
    width: min(700px, 85vw);
    height:1px;
    background: linear-gradient(90deg, transparent, #6b006b 20%, #aa00aa 50%, #6b006b 80%, transparent);
  }

  .dw-section {
    display:flex; align-items:center; gap:18px;
    width: min(700px, 85vw);
    margin: 0;
  }
  .dw-section .dw-hline { flex:1; width:auto; }
  .dw-section-sym {
    font-size:20px; color:#6b006b;
    flex-shrink:0;
  }

  #dw-title {
    font-size: clamp(22px, 4vw, 52px);
    font-weight:900;
    color:#d4a0ff;
    text-align:center;
    letter-spacing:6px;
    margin:0;
    line-height:1.2;
  }

  #dw-subtitle {
    font-size: clamp(13px, 2vw, 22px);
    font-weight:300;
    color:#7a007a;
    letter-spacing:12px;
    text-align:center;
    margin:0;
    text-transform:uppercase;
  }

  #dw-welcome-text {
    font-size: clamp(14px, 1.8vw, 20px);
    font-weight:400;
    color:#c0c0c0;
    text-align:center;
    letter-spacing:3px;
    line-height:2;
    margin:0;
    max-width:600px;
  }

  #dw-main-quote {
    font-size: clamp(16px, 2.2vw, 28px);
    font-weight:700;
    color:#ffffff;
    text-align:center;
    letter-spacing:2px;
    line-height:1.8;
    margin:0;
    max-width:680px;
  }

  #dw-tagline {
    font-size: clamp(11px, 1.3vw, 15px);
    font-weight:300;
    color:#555;
    letter-spacing:6px;
    text-align:center;
    margin:0;
  }

  #dw-enter-btn {
    margin-top:8px;
    padding: clamp(14px,2vh,20px) clamp(60px,8vw,110px);
    background: transparent;
    border: 1px solid #7a007a;
    color: #d4a0ff;
    font-family:'Cairo', sans-serif;
    font-size: clamp(14px, 1.8vw, 20px);
    font-weight:700;
    letter-spacing:8px;
    cursor:pointer;
    position:relative;
    transition: border-color .3s, color .3s;
    direction:rtl;
    outline:none;
  }
  #dw-enter-btn::before {
    content:'';
    position:absolute;
    top:-5px; right:-5px;
    width:14px; height:14px;
    border-top:1px solid #aa00aa;
    border-right:1px solid #aa00aa;
  }
  #dw-enter-btn::after {
    content:'';
    position:absolute;
    bottom:-5px; left:-5px;
    width:14px; height:14px;
    border-bottom:1px solid #aa00aa;
    border-left:1px solid #aa00aa;
  }
  #dw-enter-btn:hover {
    border-color:#d4a0ff;
    color:#ffffff;
  }

  /* ════════════════ الأزرار الستة ════════════════ */
  #dw-nodes-wrapper {
    position:fixed; inset:0; z-index:9998;
    display:none;
    background-color:#050005;
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow:hidden;
  }

  /* طبقة تعتيم فوق خلفية الأزرار */
  #dw-nodes-wrapper::after {
    content:'';
    position:absolute; inset:0;
    background: rgba(5,0,5,0.78);
    pointer-events:none;
    z-index:1;
  }

  #dw-nodes-wrapper::before {
    content:'';
    position:absolute; inset:0;
    background-image:
      linear-gradient(rgba(80,0,80,.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(80,0,80,.07) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events:none;
    z-index:2;
  }
  #dw-nodes-wrapper.active { display:block; }

  #dw-nodes-lightning {
    position:absolute; inset:0; z-index:4; pointer-events:none;
  }

  /* ── حاوية النجمة الكبيرة ── */
  #dw-big-star-wrap {
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    z-index:3; pointer-events:none;
  }

  /* ── العنصر الذي يدور ── */
  #dw-big-star-rotator {
    width: min(560px,90vw);
    height: min(560px,90vw);
    animation: dw-bigStarRotate 60s linear infinite;
    /* يضمن الدوران بدون توقف حتى عند إعادة الرسم */
    will-change: transform;
  }

  #dw-big-star-canvas {
    width: 100%;
    height: 100%;
    display:block;
  }

  .s3-universe {
    position:absolute; inset:0;
    display:flex; align-items:center; justify-content:center;
    z-index:5;
  }

  .fixed-nodes-layer { position:absolute; inset:0; pointer-events:none; }

  .vertex-node {
    position:absolute;
    width:clamp(95px,14vw,125px); height:clamp(105px,15vw,140px);
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    cursor:pointer; pointer-events:auto;
    opacity:0;
    animation:dw-nodeIn .5s ease forwards;
  }
  .hex-card {
    position:relative; width:100%; height:100%;
    background:rgba(8,2,15,0.92);
    clip-path:polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%);
    border:1px solid rgba(180,0,180,0.35);
    transition:all 0.3s ease;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    padding:8px; overflow:hidden;
  }
  .vertex-node:hover .hex-card {
    border-color:rgba(255,0,60,.7);
    background:rgba(30,0,20,.95);
  }
  .node-icon {
    font-size:clamp(20px,3vw,26px); z-index:2;
    margin-bottom:6px; transition:transform 0.3s;
  }
  .vertex-node:hover .node-icon { transform:scale(1.15); }
  .node-label {
    font-family:'Cairo',sans-serif;
    font-size:clamp(10px,1.3vw,12px); font-weight:700;
    color:#ffffff;
    z-index:2; text-align:center; pointer-events:none;
  }

  .dw-click-star {
    position:fixed; pointer-events:none; z-index:99999;
    width:38px; height:38px;
    animation: dw-starPop .55s ease forwards;
  }
  `;
  document.head.appendChild(css);

  /* ══ DOM القائمة ══ */
  var overlay = document.createElement('div');
  overlay.id = 'darks-welcome';
  overlay.innerHTML = `
    <div id="dw-corner-tl"></div>
    <div id="dw-corner-br"></div>
    <div id="dw-frame">

      <div class="dw-section">
        <div class="dw-hline"></div>
        <span class="dw-section-sym">⚜</span>
        <div class="dw-hline"></div>
      </div>

      <p id="dw-tagline">— DARKS SYSTEM —</p>

      <div class="dw-hline"></div>

      <h1 id="dw-title">⚜️ مرحباً بك أيها الظل ⚜️</h1>

      <p id="dw-subtitle">طـائـفـة الـظـلام</p>

      <div class="dw-section">
        <div class="dw-hline"></div>
        <span class="dw-section-sym">◈</span>
        <div class="dw-hline"></div>
      </div>

      <p id="dw-main-quote">
        هنا تبدأ الرحلة نحو العتمة المطلقة<br>
        اختر طريقك بحكمة .. الظلام يراقبك
      </p>

      <p id="dw-welcome-text">في المملكة</p>

      <div class="dw-hline"></div>

      <button id="dw-enter-btn">ادخل المملكة</button>

      <div class="dw-section">
        <div class="dw-hline"></div>
        <span class="dw-section-sym">⚜</span>
        <div class="dw-hline"></div>
      </div>

    </div>
  `;
  document.body.appendChild(overlay);

  /* ══ DOM الأزرار ══ */
  var nodesWrapper = document.createElement('div');
  nodesWrapper.id = 'dw-nodes-wrapper';
  nodesWrapper.innerHTML = `
    <canvas id="dw-nodes-lightning"></canvas>
    <div id="dw-big-star-wrap">
      <div id="dw-big-star-rotator">
        <canvas id="dw-big-star-canvas"></canvas>
      </div>
    </div>
    <div class="s3-universe">
      <div class="fixed-nodes-layer">
        <div class="vertex-node node-games"   data-script="games.js"   data-index="0">
          <div class="hex-card"><span class="node-icon">🎮</span><span class="node-label">قسم الألعاب</span></div>
        </div>
        <div class="vertex-node node-cinema"  data-script="cinema.js"  data-index="1">
          <div class="hex-card"><span class="node-icon">🦊</span><span class="node-label">عالم الانمي</span></div>
        </div>
        <div class="vertex-node node-hacker"  data-script="hacker.js"  data-index="2">
          <div class="hex-card"><span class="node-icon">👁️‍🗨️</span><span class="node-label">نظام الاختراق</span></div>
        </div>
        <div class="vertex-node node-slime"   data-script="slime.js"   data-index="3">
          <div class="hex-card"><span class="node-icon">🌀</span><span class="node-label">نظام سلايم</span></div>
        </div>
        <div class="vertex-node node-market"  data-script="market.js"  data-index="4">
          <div class="hex-card"><span class="node-icon">🪙</span><span class="node-label">التجارة والبيع</span></div>
        </div>
        <div class="vertex-node node-targets" data-script="targets.js" data-index="5">
          <div class="hex-card"><span class="node-icon">🎯</span><span class="node-label">قائمة الأهداف</span></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(nodesWrapper);

  /* ══ رسم النجمة السداسية الكبيرة على الـ canvas ══
     الدوران يتم عبر CSS على العنصر الأب (#dw-big-star-rotator)
     لذا canvas نفسه ثابت ولا يُمسح أبداً عند resize بشكل خاطئ
  ══ */
  function drawBigStar() {
    var cv   = document.getElementById('dw-big-star-canvas');
    var wrap = document.getElementById('dw-big-star-rotator');
    var size = wrap.offsetWidth || 500;
    cv.width  = size;
    cv.height = size;
    var cx = size / 2, cy = size / 2;
    var ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    function drawTriangle(rotate, color, lineW) {
      var r = size * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotate);
      ctx.beginPath();
      for (var i = 0; i < 3; i++) {
        var a = (i * 120 - 90) * Math.PI / 180;
        var x = Math.cos(a) * r, y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.lineWidth   = lineW;
      ctx.stroke();
      ctx.restore();
    }

    drawTriangle(0,       '#cc0000', 2.5);
    drawTriangle(Math.PI, '#cc0000', 2.5);
    drawTriangle(0,       'rgba(180,0,0,0.4)', 1);
    drawTriangle(Math.PI, 'rgba(180,0,0,0.4)', 1);

    [0.46, 0.38, 0.12].forEach(function(ratio, idx) {
      ctx.beginPath();
      ctx.arc(cx, cy, size * ratio, 0, Math.PI * 2);
      ctx.strokeStyle = idx === 0 ? 'rgba(140,0,0,0.5)' : idx === 1 ? 'rgba(180,0,0,0.3)' : 'rgba(200,0,0,0.4)';
      ctx.lineWidth   = idx === 0 ? 1.5 : 1;
      ctx.stroke();
    });

    for (var p = 0; p < 6; p++) {
      var pa = (p * 60 - 90) * Math.PI / 180;
      var pr = size * 0.44;
      var px = cx + Math.cos(pa) * pr;
      var py = cy + Math.sin(pa) * pr;
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
    }
  }

  /* ══ برق أحمر ══ */
  function initNodesLightning() {
    var nlc  = document.getElementById('dw-nodes-lightning');
    nlc.style.cssText = 'position:absolute;inset:0;z-index:4;pointer-events:none;';
    var nctx = nlc.getContext('2d');

    function resize() {
      nlc.width  = window.innerWidth;
      nlc.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function strike() {
      var W = nlc.width, H = nlc.height;
      var x1 = W * 0.1 + Math.random() * W * 0.8;
      var y1 = H * 0.02;
      var x2 = x1 + (Math.random() - 0.5) * 60;
      var y2 = y1 + H * 0.45 + Math.random() * H * 0.3;
      var frames = 7, f = 0;

      function draw() {
        nctx.clearRect(0, 0, W, H);
        var a = f < 2 ? 1 : Math.max(0, 1 - f / frames);
        nctx.beginPath(); nctx.moveTo(x1,y1); nctx.lineTo(x2,y2);
        nctx.strokeStyle = 'rgba(255,0,0,' + (a*0.35) + ')';
        nctx.lineWidth = 10; nctx.shadowColor='#ff0000'; nctx.shadowBlur=25; nctx.stroke();
        nctx.beginPath(); nctx.moveTo(x1,y1); nctx.lineTo(x2,y2);
        nctx.strokeStyle = 'rgba(255,80,80,' + a + ')';
        nctx.lineWidth = 1.5; nctx.shadowColor='#ff3333'; nctx.shadowBlur=8; nctx.stroke();
        nctx.shadowBlur = 0;
        f++;
        if (f <= frames) requestAnimationFrame(draw);
        else nctx.clearRect(0, 0, W, H);
      }
      draw();
    }

    setInterval(strike, 2000);
    setTimeout(strike, 400);
  }

  /* ══ توزيع الأزرار ══ */
  function positionNodes() {
    var nodes  = nodesWrapper.querySelectorAll('.vertex-node');
    var radius = window.innerWidth < 600 ? 145 : 235;
    nodes.forEach(function(node) {
      var idx   = parseInt(node.getAttribute('data-index'));
      var angle = (idx * 60) * Math.PI / 180 - Math.PI / 2;
      var x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
      var w = node.offsetWidth||110, h = node.offsetHeight||125;
      node.style.left = 'calc(50% + ' + x + 'px - ' + (w/2) + 'px)';
      node.style.top  = 'calc(50% + ' + y + 'px - ' + (h/2) + 'px)';
      node.style.animationDelay = (idx * 0.1) + 's';
    });
  }

  /* ══ تأثير النجمة السداسية الصغيرة عند النقر ══ */
  function spawnClickStar(clientX, clientY) {
    var sv = document.createElementNS('http://www.w3.org/2000/svg','svg');
    sv.setAttribute('viewBox','0 0 38 38');
    sv.classList.add('dw-click-star');
    sv.style.left = clientX + 'px';
    sv.style.top  = clientY + 'px';

    function tri(rot) {
      var p = document.createElementNS('http://www.w3.org/2000/svg','polygon');
      var cx=19, cy=19, r=16, pts=[];
      for (var i=0;i<3;i++) {
        var a = (i*120 + rot - 90) * Math.PI/180;
        pts.push((cx + Math.cos(a)*r).toFixed(2) + ',' + (cy + Math.sin(a)*r).toFixed(2));
      }
      p.setAttribute('points', pts.join(' '));
      p.setAttribute('fill','none');
      p.setAttribute('stroke','#ff0000');
      p.setAttribute('stroke-width','1.8');
      return p;
    }
    sv.appendChild(tri(0));
    sv.appendChild(tri(60));
    document.body.appendChild(sv);
    setTimeout(function(){ if(sv.parentNode) sv.parentNode.removeChild(sv); }, 560);
  }

  document.addEventListener('click', function(e) {
    spawnClickStar(e.clientX, e.clientY);
  });

  /* ══ أحداث أزرار الأقسام ══ */
  nodesWrapper.querySelectorAll('.vertex-node').forEach(function(node) {
    node.addEventListener('click', function(e) {
      e.stopPropagation();
      spawnClickStar(e.clientX, e.clientY);
      var target = this.getAttribute('data-script');
      if (window.SoundManager && typeof SoundManager.playClick==='function') SoundManager.playClick();
      var s = document.createElement('script'); s.src = target; document.head.appendChild(s);
    });
  });

  /* ══ زر الدخول ══ */
  document.getElementById('dw-enter-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    spawnClickStar(e.clientX, e.clientY);

    overlay.style.animation = 'dw-fadeOut .4s ease forwards';

    var music = new Audio('M🎶U🎶S🎶I🎶C_R🎶A🎶A🎶D_.ogg');
    music.loop=true; music.volume=0.6;
    music.play().catch(function(){});

    setTimeout(function() {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      nodesWrapper.classList.add('active');

      /* رسم النجمة مرة واحدة — الدوران عبر CSS animation لا يتوقف */
      drawBigStar();
      initNodesLightning();

      requestAnimationFrame(function(){ setTimeout(positionNodes, 80); });

      /* عند resize: نعيد رسم النجمة وتوزيع الأزرار فقط */
      window.addEventListener('resize', function() {
        positionNodes();
        drawBigStar();
      });
    }, 420);
  });

})();