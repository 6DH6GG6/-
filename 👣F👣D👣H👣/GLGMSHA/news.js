(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     أحدث الأخبار — NEWS DATA
     عدّل هنا لإضافة أو تعديل الأخبار
  ═══════════════════════════════════════════════════════ */
  var NEWS = [
    {
      id: 1,
      category: 'إعلان',
      categoryColor: '#ff3355',
      title: 'انضمام أعضاء جدد إلى الإمبراطورية',
      body: 'يسعدنا الإعلان عن انضمام مجموعة من الأعضاء المميزين إلى صفوف إمبراطورية الظلال، نرحب بهم ونتمنى لهم رحلة ملوكية.',
      date: '٢٠٢٥/٠٦/١٠',
      time: '٠٩:٣٠ م',
      badge: 'جديد',
    },
    {
      id: 2,
      category: 'تحديث',
      categoryColor: '#cc1133',
      title: 'تحديث شامل لقسم الصور والفيديوهات',
      body: 'تم إضافة محتوى جديد وحصري في قسم الصور والفيديوهات، تفضّل بزيارة الأقسام للاطلاع على كل ما هو جديد.',
      date: '٢٠٢٥/٠٦/٠٨',
      time: '٠٣:١٥ م',
      badge: 'تحديث',
    },
    {
      id: 3,
      category: 'حدث',
      categoryColor: '#ff5577',
      title: 'فعالية خاصة قادمة قريباً',
      body: 'استعدوا لحدث استثنائي سيجمع أعضاء الإمبراطورية، تفاصيل أكثر ستُعلن قريباً عبر قسم الأخبار.',
      date: '٢٠٢٥/٠٦/٠٥',
      time: '١١:٠٠ ص',
      badge: 'قريباً',
    },
    {
      id: 4,
      category: 'إعلان',
      categoryColor: '#ff3355',
      title: 'روابط جديدة في قسم الروابط',
      body: 'تم تحديث قسم الروابط بمصادر وإضافات جديدة تخدم المجتمع، لا تتردد في زيارة القسم والاطلاع عليها.',
      date: '٢٠٢٥/٠٦/٠١',
      time: '٠٧:٤٥ م',
      badge: '',
    },
  ];

  /* ═══════════════ CSS ═══════════════ */
  var css = document.createElement('style');
  css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#news-root *{box-sizing:border-box;margin:0;padding:0}

#news-root{
  position:fixed;inset:0;z-index:500;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

/* ── نجوم ثابتة ── */
#news-stars-wrap{
  position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden;
}
.news-star{
  position:absolute;
  border-radius:50%;
  background:#fff;
}

/* ── تدرج خفيف ── */
#news-bg-grad{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(ellipse 70% 40% at 50% 0%, rgba(180,0,30,.18) 0%, transparent 70%),
    radial-gradient(ellipse 50% 30% at 0% 100%, rgba(120,0,20,.12) 0%, transparent 60%);
}

/* ── محتوى رئيسي ── */
#news-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  overflow-y:auto;overflow-x:hidden;
  padding:30px 16px 80px;
  scrollbar-width:thin;
  scrollbar-color:rgba(255,51,85,.35) transparent;
}
#news-main::-webkit-scrollbar{width:4px}
#news-main::-webkit-scrollbar-track{background:transparent}
#news-main::-webkit-scrollbar-thumb{background:rgba(255,51,85,.35);border-radius:2px}

/* ── رأس الصفحة ── */
#news-header{
  text-align:center;
  margin-bottom:32px;
  animation:newsDown .7s ease both;
}
#news-top-line{
  display:flex;align-items:center;justify-content:center;
  gap:12px;margin-bottom:8px;
  color:rgba(255,80,100,.4);
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:6px;
}
#news-top-line span{
  flex:1;max-width:100px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.5),transparent);
}
#news-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(20px,5vw,40px);
  font-weight:900;
  letter-spacing:clamp(3px,1vw,10px);
  color:transparent;
  background:linear-gradient(135deg,#ff6680 0%,#ff0033 40%,#cc0022 70%,#ff4466 100%);
  -webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 24px rgba(255,0,40,.5));
  margin-bottom:8px;
}
#news-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.6vw,14px);
  color:rgba(255,120,140,.45);
  letter-spacing:2px;
}
#news-divider{
  width:180px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(255,51,85,.45),transparent);
}

/* ── بطاقات الأخبار ── */
#news-list{
  display:flex;flex-direction:column;
  gap:0;
  width:min(720px,100%);
  margin:0 auto;
  animation:newsUp .8s ease .15s both;
}

.news-card{
  position:relative;
  background:rgba(10,0,5,.85);
  border:1px solid rgba(255,51,85,.2);
  border-top-color:rgba(255,100,120,.4);
  margin-bottom:0;
  cursor:pointer;
  transition:border-color .25s, box-shadow .25s, transform .2s;
  overflow:hidden;
}
.news-card:not(:last-child){
  border-bottom:none;
}
.news-card:hover{
  border-color:rgba(255,51,85,.55);
  box-shadow:0 0 28px rgba(255,0,40,.15), inset 0 0 18px rgba(255,0,40,.04);
  transform:translateX(-3px);
  z-index:2;
}

/* خط أحمر جانبي */
.news-card::before{
  content:'';
  position:absolute;top:0;right:0;
  width:3px;height:100%;
  background:linear-gradient(180deg,#ff3355,#880020);
  opacity:.7;
  transition:opacity .25s;
}
.news-card:hover::before{opacity:1}

/* ── شريط وصف (العنوان) ── */
.news-card-head{
  padding:14px 20px 10px 14px;
  display:flex;align-items:flex-start;justify-content:space-between;
  gap:10px;
}
.news-card-meta{
  display:flex;flex-direction:column;gap:4px;flex:1;
}
.news-card-category-row{
  display:flex;align-items:center;gap:8px;
}
.news-card-category{
  font-family:'Cinzel',serif;
  font-size:9px;letter-spacing:2px;
  padding:2px 8px;
  border-radius:1px;
  font-weight:700;
}
.news-card-badge{
  font-family:'Noto Naskh Arabic',serif;
  font-size:9px;letter-spacing:1px;
  padding:2px 7px;
  background:rgba(255,51,85,.15);
  border:1px solid rgba(255,51,85,.3);
  color:#ff8899;
  border-radius:1px;
}
.news-card-title{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(13px,2.2vw,16px);
  font-weight:700;
  color:#ffd0d8;
  line-height:1.45;
}
.news-card-datetime{
  font-family:'Cinzel',serif;
  font-size:9px;letter-spacing:1px;
  color:rgba(255,100,120,.4);
  margin-top:3px;
}
.news-card-arrow{
  color:rgba(255,51,85,.4);
  font-size:20px;
  margin-top:2px;
  transition:color .2s, transform .2s;
  flex-shrink:0;
}
.news-card:hover .news-card-arrow{
  color:rgba(255,51,85,.9);
  transform:translateX(-4px);
}

/* ── فاصل وردي شفاف ── */
.news-pink-divider{
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,100,140,.3),transparent);
  margin:0 20px;
}

/* ── جسم الخبر ── */
.news-card-body{
  padding:10px 20px 16px 14px;
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,1.8vw,14px);
  color:rgba(220,160,170,.65);
  line-height:1.8;
}

/* ── طبقة تراكب عند القراءة الكاملة ── */
#news-overlay{
  display:none;
  position:fixed;inset:0;z-index:600;
  background:rgba(0,0,0,.97);
  overflow-y:auto;
  padding:30px 20px 80px;
  direction:rtl;
  animation:newsOverlayIn .3s ease both;
}
#news-overlay.active{display:block}

#news-overlay-inner{
  width:min(680px,100%);
  margin:0 auto;
  position:relative;
}

#news-overlay-back{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(255,51,85,.1);
  border:1px solid rgba(255,51,85,.3);
  color:#ff6680;
  font-family:'Noto Naskh Arabic',serif;
  font-size:13px;
  padding:9px 18px;
  cursor:pointer;
  margin-bottom:28px;
  transition:background .2s, border-color .2s;
}
#news-overlay-back:hover{background:rgba(255,51,85,.2);border-color:rgba(255,51,85,.6)}

#news-overlay-category{
  font-family:'Cinzel',serif;
  font-size:10px;letter-spacing:3px;
  margin-bottom:10px;
}
#news-overlay-title{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(18px,4vw,28px);
  font-weight:700;
  color:#ffd0d8;
  line-height:1.5;
  margin-bottom:12px;
}
#news-overlay-divider{
  height:1px;
  background:linear-gradient(90deg,rgba(255,51,85,.5),transparent);
  margin-bottom:18px;
}
#news-overlay-datetime{
  font-family:'Cinzel',serif;
  font-size:10px;letter-spacing:1px;
  color:rgba(255,100,120,.5);
  margin-bottom:22px;
}
#news-overlay-body{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(14px,2vw,17px);
  color:rgba(220,180,190,.8);
  line-height:2;
}

/* ── زر رجوع ── */
#news-close{
  position:fixed;top:16px;left:18px;z-index:550;
  width:38px;height:38px;
  background:rgba(0,0,0,.85);
  border:1px solid rgba(255,51,85,.3);
  color:rgba(255,80,100,.7);
  font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#news-close:hover{background:rgba(255,51,85,.15);border-color:rgba(255,51,85,.7);color:#fff}

/* ── Keyframes ── */
@keyframes newsDown{
  from{opacity:0;transform:translateY(-18px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes newsUp{
  from{opacity:0;transform:translateY(24px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes newsOverlayIn{
  from{opacity:0;transform:translateY(20px)}
  to{opacity:1;transform:translateY(0)}
}
  `;
  document.head.appendChild(css);

  /* ═══════════════ HTML skeleton ═══════════════ */
  var html = `
<div id="news-root">

  <div id="news-stars-wrap"></div>
  <div id="news-bg-grad"></div>

  <button id="news-close">✕</button>

  <div id="news-main">

    <div id="news-header">
      <div id="news-top-line">
        <span></span>◆ LATEST NEWS ◆<span></span>
      </div>
      <div id="news-title">أحدث الأخبار</div>
      <div id="news-subtitle">IMPERIAL BULLETINS</div>
      <div id="news-divider"></div>
    </div>

    <div id="news-list"></div>

  </div>

  <!-- طبقة قراءة كاملة -->
  <div id="news-overlay">
    <div id="news-overlay-inner">
      <button id="news-overlay-back">← رجوع</button>
      <div id="news-overlay-category"></div>
      <div id="news-overlay-title"></div>
      <div id="news-overlay-divider"></div>
      <div id="news-overlay-datetime"></div>
      <div id="news-overlay-body"></div>
    </div>
  </div>

</div>
  `;

  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  /* ═══════════════ نجوم ثابتة ═══════════════ */
  (function () {
    var wrap = document.getElementById('news-stars-wrap');
    var count = 130;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('div');
      s.className = 'news-star';
      var size = Math.random() * 1.8 + 0.3;
      var op   = (Math.random() * 0.5 + 0.15).toFixed(2);
      s.style.cssText = [
        'width:'  + size + 'px',
        'height:' + size + 'px',
        'top:'    + (Math.random() * 100) + '%',
        'left:'   + (Math.random() * 100) + '%',
        'opacity:' + op,
      ].join(';');
      wrap.appendChild(s);
    }
  })();

  /* ═══════════════ بناء البطاقات ═══════════════ */
  var list = document.getElementById('news-list');

  NEWS.forEach(function (item) {
    /* بطاقة */
    var card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <div class="news-card-head">
        <div class="news-card-meta">
          <div class="news-card-category-row">
            <span class="news-card-category"
              style="background:rgba(${hexToRgb(item.categoryColor)},.15);
                     border:1px solid rgba(${hexToRgb(item.categoryColor)},.4);
                     color:${item.categoryColor}">
              ${item.category}
            </span>
            ${item.badge ? `<span class="news-card-badge">${item.badge}</span>` : ''}
          </div>
          <div class="news-card-title">${item.title}</div>
          <div class="news-card-datetime">${item.date} · ${item.time}</div>
        </div>
        <span class="news-card-arrow">‹</span>
      </div>
      <div class="news-pink-divider"></div>
      <div class="news-card-body">${item.body}</div>
    `;

    card.addEventListener('click', function () { openOverlay(item); });
    list.appendChild(card);
  });

  /* ═══════════════ طبقة القراءة الكاملة ═══════════════ */
  var overlay     = document.getElementById('news-overlay');
  var ovCat       = document.getElementById('news-overlay-category');
  var ovTitle     = document.getElementById('news-overlay-title');
  var ovDatetime  = document.getElementById('news-overlay-datetime');
  var ovBody      = document.getElementById('news-overlay-body');

  function openOverlay(item) {
    ovCat.textContent      = item.category;
    ovCat.style.color      = item.categoryColor;
    ovTitle.textContent    = item.title;
    ovDatetime.textContent = item.date + ' · ' + item.time;
    ovBody.textContent     = item.body;
    overlay.classList.add('active');
    overlay.scrollTop = 0;
  }

  document.getElementById('news-overlay-back').addEventListener('click', function () {
    overlay.classList.remove('active');
  });

  /* ═══════════════ زر الإغلاق ═══════════════ */
  document.getElementById('news-close').addEventListener('click', function () {
    var root = document.getElementById('news-root');
    if (root) {
      root.style.transition = 'opacity .45s';
      root.style.opacity    = '0';
      setTimeout(function () { root.remove(); }, 450);
    }
  });

  /* ═══════════════ مساعد: hex → r,g,b ═══════════════ */
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    var n = parseInt(hex, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
  }

})();
