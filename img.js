(function(){
'use strict';

/* ============================================================
   img.js — محمّل تلقائي لملفات IMG/
   يقرأ IMG/index.json ← يحمّل كل ملف .js ← كل ملف يسجل
   نفسه عبر window.IMG_REGISTER في admin.js
   ============================================================ */

var IMG_BASE = '/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/IMG/img.js';

/* ── واجهة التسجيل — يستخدمها كل ملف داخل IMG/ ──────────
   مثال الاستخدام داخل شات.js:
   IMG_REGISTER({
     cmd: 'مرحبا',
     type: 'chat',
     messages: ['أهلاً وسهلاً! 👋', 'كيف حالك؟']
   });

   مثال داخل صورة.js:
   IMG_REGISTER({
     cmd: 'تعدد صور',
     type: 'album',
     images: ['IMG/1.jpg','IMG/2.jpg','IMG/3.jpg']
   });

   مثال داخل gif.js:
   IMG_REGISTER({
     cmd: 'صورة متحركة',
     type: 'image',
     path: 'IMG/anim.gif',
     label: 'صورة متحركة رائعة'
   });
   ============================================================ */

window.IMG_REGISTER = function(entry){
  if(!entry || !entry.cmd) return;
  var key = entry.cmd.trim().replace(/\s+/g,' ');
  // أضف مباشرة لكتالوج admin.js إذا كان محملاً
  if(window.ADMIN && typeof window.ADMIN._registerEntry === 'function'){
    window.ADMIN._registerEntry(key, entry);
  } else {
    // اضف للطابور إذا admin.js لم يُحمَّل بعد
    window._IMG_QUEUE = window._IMG_QUEUE || [];
    window._IMG_QUEUE.push({key:key, entry:entry});
  }
};

/* ── تحميل الملفات ────────────────────────────────────────*/
function loadScript(src, cb){
  var s = document.createElement('script');
  s.src = src;
  s.onload = function(){ if(cb) cb(null); };
  s.onerror = function(){ if(cb) cb(new Error('failed: '+src)); };
  document.head.appendChild(s);
}

function loadAll(files){
  if(!files || !files.length) return;
  var i = 0;
  function next(){
    if(i >= files.length) return;
    var f = files[i++];
    // تأكد من أنه ملف .js
    if(!/\.js$/i.test(f)) { next(); return; }
    loadScript(IMG_BASE + f, function(err){
      if(err) console.warn('[img.js] لم يُحمَّل:', f);
      next();
    });
  }
  next();
}

/* ── قراءة index.json من IMG/ ───────────────────────────*/
function init(){
  var x = new XMLHttpRequest();
  x.open('GET', IMG_BASE + 'index.json', true);
  x.onload = function(){
    if(x.status === 200){
      try{
        var data = JSON.parse(x.responseText);
        var files = Array.isArray(data) ? data : (data.files || []);
        loadAll(files);
      } catch(e){
        console.warn('[img.js] خطأ في تحليل index.json');
      }
    } else {
      console.warn('[img.js] لم يُعثر على IMG/index.json — status:', x.status);
    }
  };
  x.onerror = function(){
    console.warn('[img.js] تعذّر الوصول إلى IMG/index.json');
  };
  x.send();
}

init();

})();
