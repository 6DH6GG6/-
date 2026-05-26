(function(){
'use strict';

var BASE = 'https://6dh6gg6.github.io/-/';

var MEMBERS = [
  { id:'001', name:'جلجامشة الوردية',  img:'https://i.imgur.com/sDYtHw5.jpg',  href: BASE + '👣F👣D👣H👣/👣♤l💩جلجامشة💩l♤👣/👣GLGMSHA👣.html' },
  { id:'002', name:'سيد الظلام',        img:'',  href: BASE + '002.html' },
  { id:'003', name:'الأمير الأسود',     img:'',  href: BASE + '003.html' },
  { id:'004', name:'حارس العرش',        img:'',  href: BASE + '004.html' },
  { id:'005', name:'فارس العاصفة',      img:'',  href: BASE + '005.html' },
  { id:'006', name:'شبح الليل',         img:'',  href: BASE + '006.html' },
  { id:'007', name:'ملك الرماد',        img:'',  href: BASE + '007.html' },
  { id:'008', name:'وريث الأبدية',      img:'',  href: BASE + '008.html' },
  { id:'009', name:'صياد الأرواح',      img:'',  href: BASE + '009.html' },
  { id:'010', name:'سيف القدر',         img:'',  href: BASE + '010.html' },
  { id:'011', name:'أمير الثلج',        img:'',  href: BASE + '011.html' },
  { id:'012', name:'الظل الأزلي',       img:'',  href: BASE + '012.html' },
  { id:'013', name:'حاكم الكون',        img:'',  href: BASE + '013.html' },
  { id:'014', name:'قاطع الأفق',        img:'',  href: BASE + '014.html' },
  { id:'015', name:'روح الجبال',        img:'',  href: BASE + '015.html' },
  { id:'016', name:'ناسج الأقدار',      img:'',  href: BASE + '016.html' },
  { id:'017', name:'سيد الصمت',         img:'',  href: BASE + '017.html' },
  { id:'018', name:'حارق الأساطير',     img:'',  href: BASE + '018.html' },
  { id:'019', name:'عاصفة الشمال',      img:'',  href: BASE + '019.html' },
  { id:'020', name:'كاسر القيود',       img:'',  href: BASE + '020.html' },
  { id:'021', name:'ملاك الدمار',       img:'',  href: BASE + '021.html' },
  { id:'022', name:'حامل الصاعقة',      img:'',  href: BASE + '022.html' },
  { id:'023', name:'ذئب القمر',         img:'',  href: BASE + '023.html' },
  { id:'024', name:'إمبراطور الفراغ',   img:'',  href: BASE + '024.html' },
  { id:'025', name:'أسطورة الأبد',      img:'',  href: BASE + '025.html' },
];

var css = document.createElement('style');
css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#fad-root *{box-sizing:border-box;margin:0;padding:0}

#fad-root{
  position:fixed;inset:0;z-index:200;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

#fad-bg{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%,  #001a33 0%, transparent 65%),
    radial-gradient(ellipse 60% 40% at 20% 80%,  #001122 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 80%,  #000d1a 0%, transparent 60%),
    linear-gradient(180deg, #000510 0%, #001020 40%, #000a18 100%);
}

#fad-stars{position:absolute;inset:0;z-index:1;pointer-events:none}

#fad-ice-overlay{
  position:absolute;inset:0;z-index:2;pointer-events:none;
  background:
    repeating-linear-gradient(
      -45deg,
      transparent 0px, transparent 40px,
      rgba(100,200,255,.015) 40px, rgba(100,200,255,.015) 41px
    ),
    repeating-linear-gradient(
      45deg,
      transparent 0px, transparent 60px,
      rgba(150,220,255,.01) 60px, rgba(150,220,255,.01) 61px
    );
}

#fad-castle{
  position:absolute;bottom:0;left:50%;transform:translateX(-50%);
  width:min(1200px,100vw);z-index:3;pointer-events:none;
  opacity:.18;
  filter:drop-shadow(0 0 60px rgba(100,200,255,.3));
}

#fad-mist{
  position:absolute;bottom:0;left:0;right:0;height:40%;z-index:4;pointer-events:none;
  background:linear-gradient(0deg,rgba(0,30,60,.6) 0%,rgba(0,15,40,.3) 50%,transparent 100%);
}

#fad-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  display:flex;flex-direction:column;
  align-items:center;
  overflow-y:auto;
  overflow-x:hidden;
  padding:30px 20px 60px;
  scrollbar-width:thin;
  scrollbar-color:rgba(100,200,255,.3) transparent;
}
#fad-main::-webkit-scrollbar{width:4px}
#fad-main::-webkit-scrollbar-track{background:transparent}
#fad-main::-webkit-scrollbar-thumb{background:rgba(100,200,255,.3);border-radius:2px}

#fad-header{
  text-align:center;margin-bottom:28px;
  animation:fadSlideDown .9s ease both;
}

#fad-logo-line{
  display:flex;align-items:center;justify-content:center;
  gap:14px;margin-bottom:6px;
  color:rgba(100,200,255,.35);
  font-family:'Cinzel',serif;
  font-size:clamp(7px,1vw,10px);letter-spacing:8px;
}
#fad-logo-line span{flex:1;height:1px;max-width:120px;
  background:linear-gradient(90deg,transparent,rgba(100,200,255,.4),transparent)}

#fad-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(18px,4vw,42px);
  font-weight:900;
  letter-spacing:clamp(4px,1.5vw,14px);
  color:transparent;
  background:linear-gradient(135deg,#a8d8f0 0%,#e8f8ff 40%,#7ec8e3 70%,#c8eeff 100%);
  -webkit-background-clip:text;background-clip:text;
  text-shadow:none;
  filter:drop-shadow(0 0 30px rgba(100,200,255,.6));
  margin-bottom:10px;
}

#fad-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.5vw,15px);
  color:rgba(180,230,255,.5);
  letter-spacing:3px;
  margin-bottom:4px;
}

#fad-search-wrap{
  width:min(700px,95vw);
  margin-bottom:18px;
  position:relative;
  animation:fadSlideDown 1s ease .15s both;
}

#fad-search{
  width:100%;
  padding:16px 56px 16px 22px;
  background:rgba(0,20,40,.7);
  border:1px solid rgba(100,200,255,.25);
  border-top-color:rgba(180,230,255,.45);
  border-radius:2px;
  color:#c8eeff;
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(13px,2vw,16px);
  outline:none;
  transition:border-color .3s, box-shadow .3s;
  backdrop-filter:blur(10px);
  text-align:right;
  direction:rtl;
}
#fad-search::placeholder{color:rgba(100,180,220,.4)}
#fad-search:focus{
  border-color:rgba(100,200,255,.6);
  box-shadow:0 0 30px rgba(100,200,255,.15), inset 0 0 20px rgba(100,200,255,.04);
}

#fad-search-icon{
  position:absolute;left:18px;top:50%;transform:translateY(-50%);
  color:rgba(100,200,255,.5);font-size:18px;pointer-events:none;
}

#fad-search-count{
  position:absolute;right:18px;top:50%;transform:translateY(-50%);
  color:rgba(100,180,220,.4);font-size:11px;
  font-family:'Cinzel',serif;letter-spacing:1px;
}

#fad-desc{
  text-align:center;
  margin-bottom:28px;
  animation:fadSlideDown 1s ease .25s both;
}
#fad-desc-text{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,1.8vw,16px);
  color:rgba(150,210,240,.6);
  letter-spacing:2px;
  font-style:italic;
}
#fad-desc-line{
  width:200px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(100,200,255,.3),transparent);
}

#fad-grid{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:clamp(8px,1.5vw,16px);
  width:min(900px,97vw);
  animation:fadSlideUp 1s ease .35s both;
}

.fad-card{
  position:relative;
  aspect-ratio:3/4;
  cursor:pointer;
  overflow:hidden;
  border:1px solid rgba(100,200,255,.15);
  border-top-color:rgba(180,230,255,.3);
  background:rgba(0,15,30,.8);
  transition:transform .3s ease, box-shadow .3s ease, border-color .3s;
  animation:fadCardIn .6s ease both;
  text-decoration:none;
  display:block;
}
.fad-card:hover{
  transform:translateY(-6px) scale(1.03);
  border-color:rgba(100,200,255,.5);
  box-shadow:
    0 0 30px rgba(100,200,255,.2),
    0 20px 40px rgba(0,0,0,.6),
    inset 0 0 20px rgba(100,200,255,.04);
  z-index:5;
}
.fad-card.hidden{display:none}

.fad-card-img{
  position:absolute;inset:0;
  width:100%;height:75%;
  object-fit:cover;
  object-position:center top;
  opacity:.75;
  transition:opacity .3s, transform .3s;
  background:linear-gradient(135deg,#001020,#002040);
}
.fad-card:hover .fad-card-img{opacity:.9;transform:scale(1.05)}

/* placeholder shown when img src is empty or fails */
.fad-card-placeholder{
  position:absolute;inset:0;
  width:100%;height:75%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:linear-gradient(160deg,#001828 0%,#002a40 50%,#001020 100%);
  gap:6px;
}
.fad-card-placeholder .ph-icon{
  font-size:clamp(22px,3vw,34px);
  opacity:.35;
  filter:drop-shadow(0 0 8px rgba(100,200,255,.4));
}
.fad-card-placeholder .ph-text{
  font-family:'Cinzel',serif;
  font-size:clamp(7px,.8vw,9px);
  color:rgba(100,200,255,.25);
  letter-spacing:2px;
  text-transform:uppercase;
}

.fad-card-fade{
  position:absolute;bottom:0;left:0;right:0;height:60%;
  background:linear-gradient(0deg,rgba(0,5,15,1) 0%,rgba(0,10,25,.9) 40%,transparent 100%);
  pointer-events:none;
}

.fad-card-id{
  position:absolute;top:6px;right:7px;
  font-family:'Cinzel',serif;
  font-size:8px;color:rgba(100,200,255,.25);
  letter-spacing:1px;
  transition:color .3s;
}
.fad-card:hover .fad-card-id{color:rgba(100,200,255,.6)}

.fad-card-name{
  position:absolute;bottom:8px;left:0;right:0;
  text-align:center;
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(8px,1.1vw,12px);
  font-weight:700;
  color:#c8eeff;
  text-shadow:0 0 15px rgba(100,200,255,.8), 0 2px 8px rgba(0,0,0,.9);
  padding:0 4px;
  line-height:1.3;
  transition:color .3s;
}
.fad-card:hover .fad-card-name{color:#fff}

.fad-card::after{
  content:'';
  position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(180,230,255,.08) 0%,transparent 50%,rgba(100,200,255,.04) 100%);
  opacity:0;transition:opacity .3s;pointer-events:none;
}
.fad-card:hover::after{opacity:1}

#fad-no-results{
  display:none;
  grid-column:1/-1;
  text-align:center;padding:60px;
  font-family:'Cinzel',serif;
  color:rgba(100,180,220,.3);
  font-size:14px;letter-spacing:3px;
}

@keyframes fadSlideDown{
  from{opacity:0;transform:translateY(-20px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes fadSlideUp{
  from{opacity:0;transform:translateY(30px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes fadCardIn{
  from{opacity:0;transform:scale(.9)}
  to{opacity:1;transform:scale(1)}
}
@keyframes twinkle{
  0%,100%{opacity:.3}50%{opacity:1}
}

#fad-close{
  position:fixed;top:18px;left:20px;z-index:300;
  width:38px;height:38px;
  background:rgba(0,20,40,.8);
  border:1px solid rgba(100,200,255,.25);
  color:rgba(100,200,255,.7);
  font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#fad-close:hover{
  background:rgba(100,200,255,.15);
  border-color:rgba(100,200,255,.6);
  color:#fff;
}
`;
document.head.appendChild(css);

function buildCard(m, i){
  var hasImg = m.img && m.img.trim() !== '';
  var imgHtml = hasImg
    ? `<img class="fad-card-img" src="${m.img}" alt="${m.name}"
         onload="this.style.display='block'"
         onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"/>`
    : '';

  var placeholderDisplay = hasImg ? 'none' : 'flex';

  return `<a class="fad-card"
      href="${m.href}"
      data-name="${m.name}"
      data-id="${m.id}"
      style="animation-delay:${(i * 0.04).toFixed(2)}s">
      ${imgHtml}
      <div class="fad-card-placeholder" style="display:${placeholderDisplay}">
        <div class="ph-icon">❄</div>
        <div class="ph-text">قريباً</div>
      </div>
      <div class="fad-card-fade"></div>
      <div class="fad-card-id">#${m.id}</div>
      <div class="fad-card-name">${m.name}</div>
    </a>`;
}

var html = `
<div id="fad-root">
  <div id="fad-bg"></div>
  <canvas id="fad-stars"></canvas>
  <div id="fad-ice-overlay"></div>

  <svg id="fad-castle" viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg" fill="none">
    <defs>
      <linearGradient id="iceG" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#a8d8f0" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#004080" stop-opacity="0.3"/>
      </linearGradient>
    </defs>
    <rect x="400" y="200" width="400" height="300" fill="url(#iceG)" opacity=".5"/>
    <polygon points="400,200 600,60 800,200" fill="url(#iceG)" opacity=".6"/>
    <rect x="350" y="250" width="80" height="250" fill="url(#iceG)" opacity=".4"/>
    <rect x="770" y="250" width="80" height="250" fill="url(#iceG)" opacity=".4"/>
    <polygon points="350,250 390,150 430,250" fill="url(#iceG)" opacity=".5"/>
    <polygon points="770,250 810,150 850,250" fill="url(#iceG)" opacity=".5"/>
    <rect x="280" y="320" width="60" height="180" fill="url(#iceG)" opacity=".3"/>
    <rect x="860" y="320" width="60" height="180" fill="url(#iceG)" opacity=".3"/>
    <polygon points="280,320 310,240 340,320" fill="url(#iceG)" opacity=".4"/>
    <polygon points="860,320 890,240 920,320" fill="url(#iceG)" opacity=".4"/>
    <rect x="565" y="260" width="70" height="90" fill="rgba(100,200,255,.15)" rx="35"/>
    <rect x="460" y="300" width="40" height="55" fill="rgba(100,200,255,.1)" rx="20"/>
    <rect x="700" y="300" width="40" height="55" fill="rgba(100,200,255,.1)" rx="20"/>
    <path d="M0 480 Q150 440 300 470 Q450 500 600 450 Q750 400 900 460 Q1050 500 1200 470 L1200 500 L0 500 Z" fill="rgba(180,230,255,.15)"/>
    <path d="M0 490 Q200 460 400 485 Q600 510 800 475 Q1000 440 1200 480 L1200 500 L0 500 Z" fill="rgba(200,240,255,.1)"/>
  </svg>

  <div id="fad-mist"></div>
  <button id="fad-close">✕</button>

  <div id="fad-main">
    <div id="fad-header">
      <div id="fad-logo-line">
        <span></span>❄ · SHADOW EMPIRE · ❄<span></span>
      </div>
      <div id="fad-title">إمبراطورية الظلال</div>
      <div id="fad-subtitle">REALM OF ETERNAL SHADOWS</div>
    </div>

    <div id="fad-search-wrap">
      <input id="fad-search" type="text" placeholder="ابحث بالاسم أو الرقم السري..." autocomplete="off"/>
      <span id="fad-search-icon">🔍</span>
      <span id="fad-search-count"></span>
    </div>

    <div id="fad-desc">
      <div id="fad-desc-text">"هنا يكتب التاريخ بأقلام ذهبية"</div>
      <div id="fad-desc-line"></div>
    </div>

    <div id="fad-grid">
      ${MEMBERS.map(function(m, i){ return buildCard(m, i); }).join('')}
      <div id="fad-no-results">❄ لا توجد نتائج ❄</div>
    </div>
  </div>
</div>
`;

var tmp = document.createElement('div');
tmp.innerHTML = html;
while(tmp.firstChild) document.body.appendChild(tmp.firstChild);

// Stars animation
(function(){
  var cv = document.getElementById('fad-stars');
  if(!cv) return;
  var ctx = cv.getContext('2d'), W, H, stars = [];

  function resize(){
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for(var i = 0; i < 120; i++){
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + .3,
      speed: .003 + Math.random() * .008,
      phase: Math.random() * Math.PI * 2
    });
  }

  var t = 0;
  (function loop(){
    ctx.clearRect(0, 0, W, H);
    t += .016;
    stars.forEach(function(s){
      var op = .15 + .85 * (Math.sin(t * s.speed * 60 + s.phase) + 1) / 2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(180,230,255,' + op + ')';
      ctx.fill();
    });
    requestAnimationFrame(loop);
  })();
})();

// Search
var searchEl = document.getElementById('fad-search');
var countEl  = document.getElementById('fad-search-count');
var cards    = document.querySelectorAll('.fad-card');
var noRes    = document.getElementById('fad-no-results');

function doSearch(){
  var q = searchEl.value.trim().toLowerCase();
  var visible = 0;
  cards.forEach(function(c){
    var name = c.getAttribute('data-name').toLowerCase();
    var id   = c.getAttribute('data-id').toLowerCase();
    var match = !q || name.includes(q) || id.includes(q);
    c.classList.toggle('hidden', !match);
    if(match) visible++;
  });
  noRes.style.display = visible === 0 ? 'block' : 'none';
  countEl.textContent = q ? (visible + '/25') : '';
}

searchEl.addEventListener('input', doSearch);

document.getElementById('fad-close').addEventListener('click', function(){
  var root = document.getElementById('fad-root');
  if(root){
    root.style.transition = 'opacity .5s';
    root.style.opacity = '0';
    setTimeout(function(){ root.remove(); }, 500);
  }
});

})();
