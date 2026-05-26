(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════
     قسم المدونات — BLOGS DATA
     عدّل العنوان والمحتوى والتاريخ هنا
  ══════════════════════════════════════════════════════ */
  var BLOGS = [
    {
      id:      1,
      title:   'رسالة إلى كل من يقرأ هذه الكلمات',
      date:    '٢٠٢٥/٠٦/١٠',
      preview: 'في زمن باتت فيه الكلمات أرخص من الصمت، أكتب إليك أنت...',
      content: `في زمن باتت فيه الكلمات أرخص من الصمت، أكتب إليك أنت.
أنت الذي توقف هنا بين كل هذا الضجيج، وقرر أن يمنح هذه السطور لحظة من وقته الثمين.

الإمبراطورية لم تُبنَ في يوم، بل شُيّدت حجراً فوق حجر، وحلماً فوق حلم.
كل عضو فيها يحمل قصة، وكل قصة تستحق أن تُروى.

أكتب اليوم لأقول لك: أنت جزء من شيء أكبر منك ومني.
شيء يتجاوز الأسماء والأرقام، ويصل إلى ما هو أعمق — إلى الروح.

شكراً لوجودك هنا. شكراً لكل لحظة دعم.
الإمبراطورية تعيش بكم.`,
    },
    {
      id:      2,
      title:   'لماذا اخترت هذا الطريق؟',
      date:    '٢٠٢٥/٠٥/٢٨',
      preview: 'كثيرون سألوني: لماذا؟ ولم أجد إجابة أبسط من...',
      content: `كثيرون سألوني: لماذا؟
لماذا هذا الطريق بالتحديد؟ لماذا كل هذا الجهد؟

ولم أجد إجابة أبسط من: لأنني لا أعرف طريقاً آخر.

منذ البداية كان هناك صوت بداخلي يقول: ابنِ شيئاً يستحق.
لا شيئاً مؤقتاً يزول مع أول ريح، بل شيئاً راسخاً كالجبال.

الإمبراطورية هي ذلك الشيء.
مكان يجمع الأقوياء لا ليتنافسوا، بل ليبنوا معاً.
مكان تجد فيه نفسك محاطاً بمن يرفعونك، لا بمن يسحبونك للأسفل.

هذا هو السبب. وهذا يكفيني.`,
    },
    {
      id:      3,
      title:   'الصمت أحياناً هو أعلى الكلام',
      date:    '٢٠٢٥/٠٥/١٥',
      preview: 'لا أكتب دائماً لأن عندي ما أقوله، أحياناً أكتب لأن الصمت...',
      content: `لا أكتب دائماً لأن عندي ما أقوله.
أحياناً أكتب لأن الصمت أصبح ثقيلاً أكثر مما ينبغي.

الصمت فن لا يتقنه إلا من عاش كثيراً ومرّ بأكثر.
أولئك الذين تعلموا أن بعض الأوجاع لا يُعبَّر عنها بكلمات،
وأن بعض الأفراح أجمل حين تبقى في القلب سراً.

لكن هناك لحظات يصبح الصمت فيها هرباً لا حكمة.
وفي تلك اللحظات، أجد نفسي هنا، أكتب.

ليس لأحد بعينه، بل للهواء، وللفراغ، ولمن يصادف هذه الكلمات صدفة
ويجد فيها شيئاً من نفسه.`,
    },
  ];

  /* ═══════════════ CSS ═══════════════ */
  var css = document.createElement('style');
  css.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Noto+Naskh+Arabic:wght@400;600;700&display=swap');

#bl-root *{box-sizing:border-box;margin:0;padding:0}

#bl-root{
  position:fixed;inset:0;z-index:500;
  background:#000;
  overflow:hidden;
  font-family:'Noto Naskh Arabic','Cinzel',serif;
  direction:rtl;
}

/* نجوم ثابتة */
#bl-stars{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.bl-star{position:absolute;border-radius:50%;background:#fff}

/* تدرج */
#bl-bg{
  position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(ellipse 65% 32% at 50% 0%,rgba(220,80,140,.1) 0%,transparent 65%),
    radial-gradient(ellipse 40% 24% at 0% 100%,rgba(180,50,100,.07) 0%,transparent 60%);
}

/* محتوى */
#bl-main{
  position:relative;z-index:10;
  width:100%;height:100%;
  overflow-y:auto;overflow-x:hidden;
  padding:28px 16px 90px;
  scrollbar-width:thin;
  scrollbar-color:rgba(255,100,160,.3) transparent;
}
#bl-main::-webkit-scrollbar{width:4px}
#bl-main::-webkit-scrollbar-thumb{background:rgba(255,100,160,.3);border-radius:2px}

/* رأس */
#bl-header{text-align:center;margin-bottom:32px;animation:blDown .7s ease both}
#bl-top-line{
  display:flex;align-items:center;justify-content:center;
  gap:12px;margin-bottom:8px;
  color:rgba(255,100,160,.38);
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:6px;
}
#bl-top-line span{
  flex:1;max-width:90px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,100,160,.45),transparent);
}
#bl-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(20px,5vw,40px);font-weight:900;
  letter-spacing:clamp(3px,.9vw,9px);
  color:transparent;
  background:linear-gradient(135deg,#ffb0d0 0%,#ff4488 40%,#cc1166 70%,#ff80b0 100%);
  -webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 0 22px rgba(255,60,130,.45));
  margin-bottom:6px;
}
#bl-subtitle{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(11px,1.6vw,14px);
  color:rgba(255,120,170,.38);letter-spacing:2px;
}
#bl-head-line{
  width:160px;height:1px;margin:10px auto 0;
  background:linear-gradient(90deg,transparent,rgba(255,100,160,.4),transparent);
}

/* قائمة المدونات */
#bl-list{
  display:flex;flex-direction:column;gap:16px;
  width:min(700px,100%);margin:0 auto;
  animation:blUp .8s ease .12s both;
}

/* بطاقة مدونة */
.bl-card{
  position:relative;
  background:rgba(255,60,120,.04);
  border:1px solid rgba(255,100,160,.18);
  border-top-color:rgba(255,150,190,.35);
  padding:22px 22px 18px;
  cursor:pointer;
  transition:border-color .25s, box-shadow .25s, transform .2s;
  overflow:hidden;
}
.bl-card:hover{
  border-color:rgba(255,100,160,.45);
  box-shadow:0 0 28px rgba(255,60,130,.1),inset 0 0 16px rgba(255,60,130,.04);
  transform:translateX(-3px);
}

/* علامة تنصيص في الزاوية */
.bl-quote-mark{
  position:absolute;top:10px;left:14px;
  font-family:'Cinzel Decorative',serif;
  font-size:42px;line-height:1;
  color:rgba(255,100,160,.1);
  pointer-events:none;
  user-select:none;
  font-style:italic;
}

/* خط جانبي وردي */
.bl-card::before{
  content:'';
  position:absolute;top:0;right:0;
  width:3px;height:100%;
  background:linear-gradient(180deg,#ff4488,#aa1155);
  opacity:.5;transition:opacity .25s;
}
.bl-card:hover::before{opacity:.9}

/* عنوان المدونة */
.bl-card-title{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(14px,2.4vw,18px);font-weight:700;
  color:rgba(255,200,225,.88);
  margin-bottom:8px;line-height:1.5;
  padding-left:30px; /* مسافة عن علامة التنصيص */
}

/* تاريخ */
.bl-card-date{
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;
  color:rgba(255,100,160,.38);margin-bottom:12px;
}

/* فاصل وردي شفاف */
.bl-pink-div{
  height:2px;
  background:linear-gradient(90deg,transparent,rgba(255,130,170,.22),transparent);
  margin-bottom:12px;
}

/* معاينة */
.bl-card-preview{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(12px,1.8vw,14px);
  color:rgba(210,150,175,.6);
  line-height:1.75;
}

/* سهم */
.bl-card-arrow{
  display:flex;align-items:center;gap:6px;
  margin-top:14px;
  font-family:'Noto Naskh Arabic',serif;font-size:12px;
  color:rgba(255,100,160,.45);
  transition:color .2s;
}
.bl-card:hover .bl-card-arrow{color:rgba(255,100,160,.9)}

/* ══════════════════════════════════════
   شاشة قراءة كاملة
══════════════════════════════════════ */
#bl-reader{
  display:none;
  position:fixed;inset:0;z-index:700;
  background:#000;
  flex-direction:column;
  animation:blReaderIn .28s ease both;
}
#bl-reader.active{display:flex}

/* شريط علوي للقارئ */
#bl-reader-top{
  flex-shrink:0;
  padding:12px 18px;
  display:flex;align-items:center;justify-content:space-between;
  gap:10px;
  border-bottom:1px solid rgba(255,100,160,.14);
  background:rgba(0,0,0,.65);
  backdrop-filter:blur(8px);
}
#bl-reader-back{
  display:flex;align-items:center;gap:7px;
  background:rgba(255,80,140,.1);
  border:1px solid rgba(255,80,140,.3);
  color:#ff80b0;font-family:'Noto Naskh Arabic',serif;font-size:13px;
  padding:8px 16px;cursor:pointer;
  transition:background .2s,border-color .2s;white-space:nowrap;
}
#bl-reader-back:hover{background:rgba(255,80,140,.22);border-color:rgba(255,80,140,.7)}

/* زر نسخ */
#bl-copy-btn{
  display:flex;align-items:center;gap:6px;
  background:rgba(255,80,140,.1);
  border:1px solid rgba(255,80,140,.3);
  color:#ff80b0;font-family:'Noto Naskh Arabic',serif;font-size:12px;
  padding:8px 16px;cursor:pointer;
  transition:background .2s,border-color .2s;white-space:nowrap;
}
#bl-copy-btn:hover{background:rgba(255,80,140,.22);border-color:rgba(255,80,140,.7)}
#bl-copy-btn.copied{color:#80ffb0;border-color:rgba(80,255,140,.5);background:rgba(80,255,140,.08)}

/* محتوى القارئ */
#bl-reader-body{
  flex:1;overflow-y:auto;
  padding:clamp(20px,5vw,50px) clamp(16px,8vw,80px);
  scrollbar-width:thin;
  scrollbar-color:rgba(255,100,160,.25) transparent;
}
#bl-reader-body::-webkit-scrollbar{width:4px}
#bl-reader-body::-webkit-scrollbar-thumb{background:rgba(255,100,160,.25);border-radius:2px}

#bl-reader-inner{max-width:660px;margin:0 auto}

#bl-reader-quote{
  font-family:'Cinzel Decorative',serif;
  font-size:64px;line-height:.8;
  color:rgba(255,100,160,.12);
  margin-bottom:-10px;
  display:block;
}
#bl-reader-title{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(18px,3.5vw,26px);font-weight:700;
  color:rgba(255,210,225,.9);
  line-height:1.5;margin-bottom:10px;
}
#bl-reader-date{
  font-family:'Cinzel',serif;font-size:9px;letter-spacing:2px;
  color:rgba(255,100,160,.38);margin-bottom:18px;
}
#bl-reader-divider{
  height:1px;
  background:linear-gradient(90deg,rgba(255,100,160,.4),transparent);
  margin-bottom:24px;
}
#bl-reader-text{
  font-family:'Noto Naskh Arabic',serif;
  font-size:clamp(14px,2.2vw,17px);
  color:rgba(220,180,195,.78);
  line-height:2.1;
  white-space:pre-line;
}

/* زر إغلاق */
#bl-close{
  position:fixed;top:14px;left:16px;z-index:550;
  width:38px;height:38px;
  background:rgba(0,0,0,.85);
  border:1px solid rgba(255,80,140,.3);
  color:rgba(255,100,160,.7);font-size:18px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;backdrop-filter:blur(10px);
}
#bl-close:hover{background:rgba(255,80,140,.16);border-color:rgba(255,80,140,.7);color:#fff}

/* Keyframes */
@keyframes blDown{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
@keyframes blUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes blReaderIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  `;
  document.head.appendChild(css);

  /* ═══════════════ HTML ═══════════════ */
  var html = `
<div id="bl-root">
  <div id="bl-stars"></div>
  <div id="bl-bg"></div>

  <button id="bl-close">✕</button>

  <!-- قائمة المدونات -->
  <div id="bl-main">
    <div id="bl-header">
      <div id="bl-top-line"><span></span>✦ BLOGS ✦<span></span></div>
      <div id="bl-title">المدونات</div>
      <div id="bl-subtitle">IMPERIAL WRITINGS</div>
      <div id="bl-head-line"></div>
    </div>
    <div id="bl-list"></div>
  </div>

  <!-- قارئ ملء الشاشة -->
  <div id="bl-reader">
    <div id="bl-reader-top">
      <button id="bl-reader-back">← رجوع</button>
      <button id="bl-copy-btn">⎘ نسخ المدونة</button>
    </div>
    <div id="bl-reader-body">
      <div id="bl-reader-inner">
        <span id="bl-reader-quote">"</span>
        <div id="bl-reader-title"></div>
        <div id="bl-reader-date"></div>
        <div id="bl-reader-divider"></div>
        <div id="bl-reader-text"></div>
      </div>
    </div>
  </div>
</div>
  `;
  var tmp = document.createElement('div');
  tmp.innerHTML = html;
  while (tmp.firstChild) document.body.appendChild(tmp.firstChild);

  /* ═══════════════ نجوم ثابتة ═══════════════ */
  (function () {
    var wrap = document.getElementById('bl-stars');
    for (var i = 0; i < 130; i++) {
      var s  = document.createElement('div');
      s.className = 'bl-star';
      var sz = Math.random() * 1.7 + 0.3;
      s.style.cssText =
        'width:'  + sz + 'px;height:' + sz + 'px;' +
        'top:'    + (Math.random() * 100) + '%;' +
        'left:'   + (Math.random() * 100) + '%;' +
        'opacity:' + (Math.random() * 0.5 + 0.1).toFixed(2) + ';';
      wrap.appendChild(s);
    }
  })();

  /* ═══════════════ بناء البطاقات ═══════════════ */
  var list = document.getElementById('bl-list');

  BLOGS.forEach(function (b) {
    var card = document.createElement('div');
    card.className = 'bl-card';
    card.innerHTML =
      '<div class="bl-quote-mark">"</div>' +
      '<div class="bl-card-title">' + b.title + '</div>' +
      '<div class="bl-card-date">' + b.date + '</div>' +
      '<div class="bl-pink-div"></div>' +
      '<div class="bl-card-preview">' + b.preview + '</div>' +
      '<div class="bl-card-arrow">اقرأ المزيد ←</div>';

    card.addEventListener('click', function () { openReader(b); });
    list.appendChild(card);
  });

  /* ═══════════════ القارئ ═══════════════ */
  var reader    = document.getElementById('bl-reader');
  var rdTitle   = document.getElementById('bl-reader-title');
  var rdDate    = document.getElementById('bl-reader-date');
  var rdText    = document.getElementById('bl-reader-text');
  var copyBtn   = document.getElementById('bl-copy-btn');
  var rdBody    = document.getElementById('bl-reader-body');

  var currentContent = '';

  function openReader(b) {
    rdTitle.textContent = b.title;
    rdDate.textContent  = b.date;
    rdText.textContent  = b.content;
    currentContent      = b.content;
    copyBtn.textContent = '⎘ نسخ المدونة';
    copyBtn.classList.remove('copied');
    reader.classList.add('active');
    rdBody.scrollTop = 0;
  }

  document.getElementById('bl-reader-back').addEventListener('click', function () {
    reader.classList.remove('active');
  });

  copyBtn.addEventListener('click', function () {
    if (!currentContent) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentContent).then(function () {
        showCopied();
      }).catch(function () { fallbackCopy(); });
    } else {
      fallbackCopy();
    }
  });

  function fallbackCopy() {
    var ta = document.createElement('textarea');
    ta.value = currentContent;
    ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showCopied(); } catch(e){}
    document.body.removeChild(ta);
  }

  function showCopied() {
    copyBtn.textContent = '✓ تم النسخ';
    copyBtn.classList.add('copied');
    setTimeout(function () {
      copyBtn.textContent = '⎘ نسخ المدونة';
      copyBtn.classList.remove('copied');
    }, 2200);
  }

  /* ═══════════════ زر إغلاق القسم ═══════════════ */
  document.getElementById('bl-close').addEventListener('click', function () {
    var root = document.getElementById('bl-root');
    if (root) {
      root.style.transition = 'opacity .4s';
      root.style.opacity    = '0';
      setTimeout(function () { root.remove(); }, 420);
    }
  });

})();
