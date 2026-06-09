(function(){
'use strict';

/* ============================================================
   admin.js — المدير الرئيسي للأوامر والمحتوى
   يُحمِّل: chat.js · img.js · vid.js · audio.js · 3d.js
   ويدير: الكتالوج · الشات · الأوامر · البوابة الحمراء
   ============================================================ */

var MODULES=[
  'chat.js',
  'img.js',
  'vid.js',
  'audio.js',
  '3d.js'
];

/* ── قاموس الكتالوج الرئيسي ── */
var catalog={};

/* ── بيانات الشات المباشر ── */
var chatData={};

/* ── ردود افتراضية ── */
var chatResponses={
  welcome:'مرحباً بك ⚡ اكتب «اوامر» لعرض قائمة الأوامر.',
  default:'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة.'
};

/* ── مرجع addMsg العالمي ── */
var _addMsg=null;

/* ── حجم الصفحة في قائمة الأوامر ── */
var PAGE_SIZE=6;
var _menuPage=0;
var _awaitMenu=false;
var _allCmds=[];

/* ============================================================
   تحميل الوحدات
   ============================================================ */
function loadScript(src,cb){
  var s=document.createElement('script');
  s.src=src;
  s.onload=function(){if(cb)cb(null);};
  s.onerror=function(){if(cb)cb(new Error('failed:'+src));};
  document.head.appendChild(s);
}

function loadModules(){
  var i=0;
  function next(){
    if(i>=MODULES.length){onAllLoaded();return;}
    var m=MODULES[i++];
    loadScript(m,function(){next();});
  }
  next();
}

function onAllLoaded(){
  buildCmds();
  /* فرّغ طابور التسجيل المسبق */
  if(window._ADMIN_QUEUE&&window._ADMIN_QUEUE.length){
    window._ADMIN_QUEUE.forEach(function(q){_register(q.key,q.entry);});
    window._ADMIN_QUEUE=[];
  }
}

/* ============================================================
   واجهة التسجيل العامة — تستخدمها الوحدات لتسجيل أوامرها
   ============================================================ */
window.BOT_REGISTER=function(entry){
  if(!entry||!entry.cmd)return;
  var key=norm(Array.isArray(entry.cmd)?entry.cmd[0]:entry.cmd);
  /* دعم أسماء مستعارة متعددة */
  var aliases=Array.isArray(entry.cmd)?entry.cmd:[entry.cmd];
  aliases.forEach(function(a){
    var k=norm(a);
    _register(k,entry);
  });
};

function _register(key,entry){
  if(!key||!entry)return;
  if(window.ADMIN&&window.ADMIN._ready){
    catalog[key]=entry;
    var exists=_allCmds.some(function(c){return c.cmd===key;});
    if(!exists)_allCmds.push({cmd:key,label:entry.label||key,entry:entry});
  } else {
    window._ADMIN_QUEUE=window._ADMIN_QUEUE||[];
    window._ADMIN_QUEUE.push({key:key,entry:entry});
  }
}

/* ============================================================
   بناء قائمة الأوامر من الكتالوج
   ============================================================ */
function buildCmds(){
  _allCmds=[];
  Object.keys(catalog).forEach(function(k){
    var e=catalog[k];
    if(!_allCmds.some(function(c){return c.cmd===k;})){
      _allCmds.push({cmd:k,label:e.label||k,entry:e});
    }
  });
}

/* ============================================================
   نص قائمة الأوامر
   ============================================================ */
function buildMenuText(page){
  var start=page*PAGE_SIZE;
  var slice=_allCmds.slice(start,start+PAGE_SIZE);
  var hasMore=(start+PAGE_SIZE)<_allCmds.length;
  var lines=slice.map(function(c,i){
    return (start+i+1)+'. 『'+(c.label||c.cmd)+'』';
  }).join('\n');
  var more=hasMore?'\n\nلمزيد اكتب: اوامر '+(page+2)+' ✅':'';
  return '━━━━━━━━༻❖༺━━━━━━━━\n\n⚜️ قائمة الأوامر ⚜️\n\n'+lines+more+'\n\n━━━━━━━━༻❖༺━━━━━━━━';
}

/* ============================================================
   تطبيع النص
   ============================================================ */
function norm(s){return(s||'').trim().replace(/\s+/g,' ').toLowerCase();}

/* ============================================================
   إرسال عنصر من الكتالوج
   ============================================================ */
function sendEntry(entry,addMsg){
  if(!entry)return;
  var type=entry.type||'text';

  /* ── إرسال متعدد في آن واحد أو بتأخير ── */
  if(type==='multi'&&Array.isArray(entry.items)){
    entry.items.forEach(function(item,i){
      var delay=(entry.delay||0)*i;
      setTimeout(function(){sendEntry(item,addMsg);},delay);
    });
    return;
  }

  /* ── نصوص/شات ── */
  if(type==='text'||type==='chat'){
    var msgs=Array.isArray(entry.messages)?entry.messages:
             (entry.text?[entry.text]:[entry.value||'']);
    var interval=entry.interval||150;
    msgs.forEach(function(m,i){
      setTimeout(function(){addMsg('bot',m,'text');},i*interval);
    });
    return;
  }

  /* ── مدونة خضراء ── */
  if(type==='blog'){
    addMsg('bot',{title:entry.title||'',body:entry.body||entry.text||''},'blog');
    return;
  }

  /* ── صورة واحدة ── */
  if(type==='image'){
    addMsg('bot',entry.path||entry.src||entry.url,'image');
    return;
  }

  /* ── ألبوم صور ── */
  if(type==='album'){
    addMsg('bot',entry.images,'album');
    return;
  }

  /* ── صورة + نصوص ── */
  if(type==='chat+image'){
    var msgs2=Array.isArray(entry.messages)?entry.messages:[];
    var interval2=entry.interval||200;
    msgs2.forEach(function(m,i){
      setTimeout(function(){addMsg('bot',m,'text');},i*interval2);
    });
    if(entry.path||entry.src){
      setTimeout(function(){
        addMsg('bot',entry.path||entry.src,'image');
      },msgs2.length*interval2);
    }
    return;
  }

  /* ── فيديو ── */
  if(type==='video'){
    addMsg('bot',{src:entry.path||entry.src||entry.url,name:entry.name||'فيديو'},'video');
    return;
  }

  /* ── صوت ── */
  if(type==='audio'){
    addMsg('bot',{src:entry.path||entry.src||entry.url,name:entry.name||'مقطع'},'audio');
    return;
  }

  /* ── ملف/تطبيق ── */
  if(type==='file'||type==='app'||type==='apk'||type==='package'){
    addMsg('bot',{
      name:entry.name||'ملف',
      path:entry.path||entry.src||entry.url||'',
      size:entry.size||'',
      type:type
    },'file');
    return;
  }

  /* ── بوابة حمراء ── */
  if(type==='red-gate'||type==='gate'){
    addMsg('bot',{
      icon:entry.icon||'🔴',
      label:entry.label||'بوابة',
      sub:entry.sub||'انقر للفتح',
      src:entry.src||null,
      href:entry.href||null,
      action:entry.action||null
    },'red-gate');
    return;
  }

  /* ── نموذج 3D ── */
  if(type==='3d'||type==='model'){
    var wrap=document.createElement('div');
    wrap.style.cssText='padding:10px 14px;background:rgba(0,10,2,.9);border:1px solid rgba(0,180,60,.35);border-radius:4px;display:inline-flex;align-items:center;gap:10px;cursor:pointer;';
    wrap.innerHTML='<span style="font-size:22px;">🧊</span><span style="font-family:Cinzel,serif;font-size:11px;color:#aaffcc;letter-spacing:2px;">'+(entry.name||'نموذج 3D')+'<br><small style="opacity:.6">نموذج ثلاثي الأبعاد</small></span>';
    wrap.addEventListener('click',function(){
      var src=entry.path||entry.src||entry.url||'';
      if(src)window.open(src,'_blank');
    });
    addMsg('bot',wrap,'dom');
    return;
  }

  /* ── رابط ── */
  if(type==='link'||type==='webpage'){
    var a=document.createElement('a');
    a.href=entry.href||entry.url||entry.path||'#';
    a.target='_blank';a.rel='noopener';
    a.style.cssText='display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(0,15,4,.8);border:1px solid rgba(0,150,50,.4);border-radius:3px;color:#aaffcc;font-family:Cinzel,serif;font-size:12px;text-decoration:none;letter-spacing:2px;';
    a.innerHTML='🔗 '+(entry.label||entry.name||a.href);
    addMsg('bot',a,'dom');
    return;
  }

  /* ── fallback نص ── */
  addMsg('bot',JSON.stringify(entry),'text');
}

/* ============================================================
   المعالج الرئيسي للرسائل
   ============================================================ */
function handleMessage(text,addMsg){
  _addMsg=addMsg;
  var t=norm(text);

  /* قائمة الأوامر */
  var menuMatch=t.match(/^اوامر\s*(\d*)$/);
  if(menuMatch){
    buildCmds();
    var page=menuMatch[1]?Math.max(0,parseInt(menuMatch[1])-1):0;
    _menuPage=page;_awaitMenu=true;
    addMsg('bot',buildMenuText(_menuPage),'text');
    return true;
  }

  /* اختيار رقم من القائمة */
  if(_awaitMenu){
    var num=parseInt(t);
    if(!isNaN(num)&&num>=1&&num<=_allCmds.length){
      _awaitMenu=false;
      setTimeout(function(){sendEntry(_allCmds[num-1].entry,addMsg);},80);
      return true;
    }
    /* إذا كتب شيئاً آخر نلغي انتظار القائمة ونكمل */
    _awaitMenu=false;
  }

  /* بحث مباشر في الكتالوج */
  if(catalog[t]){
    setTimeout(function(){sendEntry(catalog[t],addMsg);},80);
    return true;
  }

  /* بحث في الشات */
  if(chatData[t]){
    var replies=Array.isArray(chatData[t])?chatData[t]:[chatData[t]];
    replies.forEach(function(r,i){
      setTimeout(function(){addMsg('bot',r,'text');},i*180);
    });
    return true;
  }

  /* بحث جزئي */
  var keys=Object.keys(catalog);
  for(var k=0;k<keys.length;k++){
    if(t.indexOf(keys[k])!==-1||keys[k].indexOf(t)!==-1){
      var found=catalog[keys[k]];
      setTimeout(function(){sendEntry(found,addMsg);},80);
      return true;
    }
  }

  return false;
}

/* ============================================================
   WINDOW.ADMIN — الواجهة العامة
   ============================================================ */
window.ADMIN={
  _ready:true,
  chatResponses:chatResponses,

  getWelcome:function(){return chatResponses.welcome;},

  handleMessage:handleMessage,

  /* تسجيل مدخل مباشرة (تستخدمه الوحدات) */
  register:function(key,entry){
    var k=norm(key);
    catalog[k]=entry;
    var exists=_allCmds.some(function(c){return c.cmd===k;});
    if(!exists)_allCmds.push({cmd:k,label:entry.label||k,entry:entry});
  },

  /* تسجيل شات مباشر */
  registerChat:function(trigger,replies){
    chatData[norm(trigger)]=replies;
  },

  /* إرسال عنصر برمجياً */
  send:function(entry){
    if(_addMsg)sendEntry(entry,_addMsg);
  },

  /* إضافة رسالة مباشرة */
  addMsg:function(role,content,type){
    if(window._botAddMsg)window._botAddMsg(role,content,type);
  },

  onGateSuccess:function(){
    if(window._botAddMsg)window._botAddMsg('bot','⚜️ مرحباً بك في مملكة الظلام ⚜️','text');
  }
};

/* ── فرّغ الطابور المسبق من BOT_REGISTER ── */
window._ADMIN_QUEUE=window._ADMIN_QUEUE||[];
window._ADMIN_QUEUE.forEach(function(q){
  catalog[q.key]=q.entry;
  _allCmds.push({cmd:q.key,label:q.entry.label||q.key,entry:q.entry});
});
window._ADMIN_QUEUE=[];

/* ── تحميل الوحدات ── */
loadModules();

})();
