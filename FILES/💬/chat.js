(function(){
'use strict';

/* ============================================================
   chat.js — وحدة الشات والمحادثات
   تحمّل: CH1.js · CH2.js · CH3.js · وأي ملف في قائمة FILES
   كل ملف يسجّل نفسه عبر BOT_REGISTER()
   ============================================================ */

var FILES=[
  'FILES/💬/CH1.js',
  'FILES/💬/CH2.js',
  'CH3.js'
  /* أضف ملفات شات جديدة هنا */
];

function load(src,cb){
  var s=document.createElement('script');
  s.src=src;
  s.onload=function(){if(cb)cb();};
  s.onerror=function(){console.warn('[chat.js] فشل تحميل:',src);if(cb)cb();};
  document.head.appendChild(s);
}

function loadAll(){
  var i=0;
  function next(){
    if(i>=FILES.length)return;
    load(FILES[i++],next);
  }
  next();
}

loadAll();

})();
