(function(){
'use strict';

var BASE='SLAYM/';

var SUPPORTED={
  image:['jpg','jpeg','png','gif','webp','svg','bmp','ico','avif'],
  video:['mp4','webm','ogg','mkv','mov','avi'],
  audio:['mp3','wav','ogg','flac','aac','m4a'],
  document:['pdf','txt','md','csv','json','xml','html','htm'],
  package:['zip','rar','7z','tar','gz'],
  app:['apk','exe','dmg','deb'],
  model:['glb','gltf','obj','fbx'],
  font:['ttf','woff','woff2'],
  code:['js','css','py','php','sh','bat'],
  link:['url','lnk'],
};

function getExt(name){return(name.split('.').pop()||'').toLowerCase();}
function getType(name){
  var ext=getExt(name);
  for(var t in SUPPORTED){if(SUPPORTED[t].indexOf(ext)!==-1)return t;}
  return 'file';
}
function formatSize(b){
  if(b>=1048576)return(b/1048576).toFixed(1)+' MB';
  if(b>=1024)return(b/1024).toFixed(1)+' KB';
  return b+' B';
}

var catalog={};
var chatData={};
var chatResponses={
  welcome:'مرحباً بك ⚡ اكتب «اوامر» لعرض قائمة الأوامر.',
  default:'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة.'
};

function normalize(s){return s.trim().replace(/\s+/g,' ');}

function loadCatalog(cb){
  var x=new XMLHttpRequest();
  x.open('GET',BASE+'catalog.json',true);
  x.onload=function(){
    if(x.status===200){
      try{
        var data=JSON.parse(x.responseText);
        if(data.files&&Array.isArray(data.files)){
          data.files.forEach(function(f){
            var key=normalize(f.name||f.path||'');
            catalog[key]=f;
          });
        }
        if(data.chat)Object.assign(chatData,data.chat);
        if(data.responses)Object.assign(chatResponses,data.responses);
      }catch(e){}
    }
    if(typeof cb==='function')cb();
  };
  x.onerror=function(){if(typeof cb==='function')cb();};
  x.send();
}

function resolveUrl(path){
  if(!path)return'';
  if(/^https?:\/\//.test(path))return path;
  if(path.startsWith('/'))return path;
  return BASE+path;
}

function buildRenderer(item){
  var path=resolveUrl(item.path||item.src||item.url||'');
  var name=item.name||item.path||'';
  var type=item.type||getType(name);
  var ext=getExt(name);

  if(type==='image'){
    var img=document.createElement('img');
    img.src=path;img.alt=name;
    img.style.cssText='max-width:220px;max-height:180px;border-radius:4px;border:1px solid rgba(140,0,0,.4);display:block;cursor:pointer;';
    img.addEventListener('click',function(){window.open(path,'_blank');});
    return img;
  }

  if(type==='video'){
    var vid=document.createElement('video');
    vid.src=path;vid.controls=true;vid.preload='metadata';
    vid.style.cssText='max-width:260px;border-radius:4px;border:1px solid rgba(140,0,0,.4);display:block;';
    return vid;
  }

  if(type==='audio'){
    var aud=document.createElement('audio');
    aud.src=path;aud.controls=true;
    aud.style.cssText='width:240px;display:block;margin:4px 0;';
    return aud;
  }

  if(type==='model'){
    var wrap=document.createElement('div');
    wrap.style.cssText='padding:10px;background:rgba(10,0,20,.7);border:1px solid rgba(100,0,200,.4);border-radius:4px;display:inline-flex;align-items:center;gap:10px;cursor:pointer;';
    wrap.innerHTML='<span style="font-size:22px;">🧊</span><span style="font-family:Cinzel,serif;font-size:11px;color:#d4a0ff;letter-spacing:2px;">'+name+'<br><small style="opacity:.6">نموذج ثلاثي الأبعاد</small></span>';
    wrap.addEventListener('click',function(){window.open(path,'_blank');});
    return wrap;
  }

  if(type==='link'||item.type==='webpage'){
    var a=document.createElement('a');
    a.href=path;a.target='_blank';a.rel='noopener';
    a.style.cssText='display:inline-flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(15,0,30,.7);border:1px solid rgba(100,0,180,.4);border-radius:3px;color:#c0a0ff;font-family:Cinzel,serif;font-size:12px;text-decoration:none;letter-spacing:2px;';
    a.innerHTML='🔗 '+name;
    return a;
  }

  if(type==='document'&&ext==='pdf'){
    var pdfw=document.createElement('div');
    pdfw.style.cssText='padding:8px 14px;background:rgba(15,0,0,.7);border:1px solid rgba(140,0,0,.4);border-radius:4px;display:inline-flex;align-items:center;gap:10px;cursor:pointer;';
    pdfw.innerHTML='<span style="font-size:20px;">📄</span><span style="font-family:Cairo,sans-serif;font-size:12px;color:#ffaa88;">'+name+'</span>';
    pdfw.addEventListener('click',function(){window.open(path,'_blank');});
    return pdfw;
  }

  var dw=document.createElement('div');
  dw.style.cssText='padding:8px 14px;background:rgba(10,0,0,.7);border:1px solid rgba(120,0,0,.35);border-radius:4px;display:inline-flex;align-items:center;gap:10px;cursor:pointer;';
  var icon='📦';
  if(type==='code')icon='💻';
  else if(type==='app')icon='📲';
  else if(type==='package')icon='🗜️';
  else if(type==='font')icon='🔤';
  dw.innerHTML='<span style="font-size:18px;">'+icon+'</span><span style="font-family:Cairo,sans-serif;font-size:12px;color:#ffaa88;">'+name+'<br><small style="opacity:.5">'+ext.toUpperCase()+(item.size?' · '+formatSize(item.size):'')+'</small></span>';
  dw.addEventListener('click',function(){
    var a2=document.createElement('a');a2.href=path;a2.download=name;a2.click();
  });
  return dw;
}

function buildAlbum(images){
  var wrap=document.createElement('div');
  wrap.style.cssText='display:flex;flex-wrap:wrap;gap:6px;max-width:260px;';
  images.forEach(function(src){
    var img=document.createElement('img');
    img.src=resolveUrl(src);
    img.style.cssText='width:76px;height:76px;object-fit:cover;border-radius:3px;border:1px solid rgba(140,0,0,.4);cursor:pointer;';
    img.addEventListener('click',function(){window.open(resolveUrl(src),'_blank');});
    wrap.appendChild(img);
  });
  return wrap;
}

var PAGE_SIZE=5;

function buildMenuText(cmds,page){
  var start=page*PAGE_SIZE;
  var slice=cmds.slice(start,start+PAGE_SIZE);
  var hasMore=(start+PAGE_SIZE)<cmds.length;
  var lines=slice.map(function(c,i){return(start+i+1)+' 『'+(c.label||c.name||c.cmd)+'』';}).join('\n');
  var moreHint=hasMore?'\nلعرض المزيد اكتب: اوامر '+(page+2)+' ✅':'';
  return '━━━━━━━━༻❖༺━━━━━━━━\n\n⚜️ قائمة الأوامر ⚜️\n\n'+lines+moreHint+'\n\n━━━━━━━━༻❖༺━━━━━━━━';
}

var menuPage=0;
var awaitingMenu=false;
var allCommands=[];

function buildCommands(){
  allCommands=[];
  Object.keys(catalog).forEach(function(k){
    var item=catalog[k];
    allCommands.push({
      cmd:k,
      label:item.label||item.name||k,
      item:item
    });
  });
}

// ── SLAM: أوامر المطور السرية ────────────────────────────
// هذه الأوامر لا تظهر في قائمة «اوامر» العادية
// لا يمكن تشغيلها إلا بعد فتح SLAM بكلمة السر
var DEV_COMMANDS=[
  {
    trigger:'slam:gate3d',
    label:'فتح البوابة ثلاثية الأبعاد',
    handler:function(addMsg){
      if(!window.SLAM){addMsg('bot','⚠️ slaym.js غير محمل','text');return;}
      var path=window.SLAM.glbPath;
      var el=buildRenderer({type:'model',path:path,name:path});
      addMsg('bot',el,'dom');
    }
  },
  {
    trigger:'slam:reload',
    label:'إعادة تحميل الكتالوج',
    handler:function(addMsg){
      catalog={};chatData={};
      loadCatalog(function(){
        buildCommands();
        addMsg('bot','✅ تم إعادة تحميل الكتالوج — '+allCommands.length+' عنصر','text');
      });
    }
  },
  {
    trigger:'slam:list',
    label:'عرض محتويات الكتالوج',
    handler:function(addMsg){
      var keys=Object.keys(catalog);
      if(!keys.length){addMsg('bot','الكتالوج فارغ','text');return;}
      var txt='📦 محتويات الكتالوج:\n\n';
      keys.forEach(function(k,i){txt+=(i+1)+'. '+k+'\n';});
      addMsg('bot',txt,'text');
    }
  },
  {
    trigger:'slam:lock',
    label:'قفل وصول المطور',
    handler:function(addMsg){
      if(window.SLAM) window.SLAM.lockDev();
      addMsg('bot','🔒 تم قفل وصول المطور','text');
    }
  }
];

// تسجيل أوامر المطور في slaym.js عند توفره
function registerSlamCommands(){
  if(!window.SLAM) return;
  window.SLAM.devCommands=DEV_COMMANDS.map(function(c){
    return{trigger:c.trigger,label:c.label};
  });
}

// ── مرجع addMsg عالمي لـ slaym.js ───────────────────────
var _globalAddMsg=null;

window.ADMIN={
  chatResponses:chatResponses,

  getWelcome:function(){return chatResponses.welcome;},

  onGateSuccess:function(){
    if(_globalAddMsg) _globalAddMsg('bot','⚜️ مرحباً بك في مملكة الظلام ⚜️','text');
  },

  // يستدعيه slaym.js بعد التحقق الناجح
  _slamDevGranted:function(){
    if(!_globalAddMsg) return;
    if(window.SLAM){
      var bubble=window.SLAM.buildConfirmBubble();
      _globalAddMsg('bot',bubble,'dom');
      var cmdList=window.SLAM.buildDevCmdList(function(trigger){
        ADMIN.handleMessage(trigger,_globalAddMsg);
      });
      if(cmdList) _globalAddMsg('bot',cmdList,'dom');
    }
  },

  handleMessage:function(text,addMsg){
    _globalAddMsg=addMsg;
    var t=normalize(text);

    // ── فتح نافذة SLAM (الأمر السري للمطور) ─────────────
    // الزوار لا يعرفون هذا الأمر
    if(t==='slam'){
      if(window.SLAM) window.SLAM.openGate();
      else addMsg('bot','⚠️ النظام غير متاح حالياً','text');
      return true;
    }

    // ── أوامر المطور السرية (تعمل فقط بعد فتح SLAM) ─────
    if(t.indexOf('slam:')===0){
      if(!window.SLAM||!window.SLAM.isDevUnlocked()){
        addMsg('bot','🔒 هذا الأمر محمي — يجب فتح SLAM أولاً','text');
        return true;
      }
      for(var d=0;d<DEV_COMMANDS.length;d++){
        if(DEV_COMMANDS[d].trigger===t){
          DEV_COMMANDS[d].handler(addMsg);
          return true;
        }
      }
      addMsg('bot','❓ أمر مطور غير معروف','text');
      return true;
    }

    // ── قائمة الأوامر العادية ────────────────────────────
    var menuMatch=t.match(/^اوامر\s*(\d*)$/);
    if(menuMatch){
      buildCommands();
      var page=menuMatch[1]?parseInt(menuMatch[1])-1:0;
      menuPage=Math.max(0,page);
      awaitingMenu=true;
      addMsg('bot',buildMenuText(allCommands,menuPage),'text');
      return true;
    }

    if(awaitingMenu){
      var num=parseInt(t);
      if(!isNaN(num)&&num>=1&&num<=allCommands.length){
        awaitingMenu=false;
        var chosen=allCommands[num-1];
        setTimeout(function(){sendItem(chosen.item,addMsg);},100);
        return true;
      }
    }

    var direct=catalog[t];
    if(direct){
      awaitingMenu=false;
      setTimeout(function(){sendItem(direct,addMsg);},100);
      return true;
    }

    var chatReply=chatData[t];
    if(chatReply){
      awaitingMenu=false;
      var replies=Array.isArray(chatReply)?chatReply:[chatReply];
      replies.forEach(function(r,i){
        setTimeout(function(){addMsg('bot',r,'text');},i*150);
      });
      return true;
    }

    return false;
  },

  sendFile:function(item,addMsg){sendItem(item,addMsg);},

  // ── IMG: تسجيل مدخل من ملفات IMG/ ──────────────────────
  // يُستدعى من window.IMG_REGISTER عبر img.js
  _registerEntry:function(key, entry){
    if(!key || !entry) return;
    catalog[key] = entry;
    // أضف للأوامر إن كانت مبنية
    if(allCommands.length){
      // تحقق عدم التكرار
      var exists = allCommands.some(function(c){return c.cmd===key;});
      if(!exists){
        allCommands.push({cmd:key, label:entry.label||key, item:entry});
      }
    }
  },
};

function sendItem(item,addMsg){
  if(!item)return;
  var type=item.type||getType(item.name||item.path||'');

  if(type==='chat+image'){
    var msgs=Array.isArray(item.messages)?item.messages:[];
    msgs.forEach(function(m,i){
      setTimeout(function(){addMsg('bot',m,'text');},i*180);
    });
    if(item.path){
      setTimeout(function(){
        var el=buildRenderer({type:'image',path:item.path,name:item.path});
        addMsg('bot',el,'dom');
      },msgs.length*180);
    }
    return;
  }

  if(type==='mini-gate'||item.gateSecret){
    addMsg('bot',null,'mini-gate');
    return;
  }

  if(type==='album'&&item.images){
    addMsg('bot',buildAlbum(item.images),'dom');
    return;
  }

  if(type==='chat'){
    var msg=Array.isArray(item.value)?item.value:[item.value||item.text||''];
    msg.forEach(function(m,i){setTimeout(function(){addMsg('bot',m,'text');},i*150);});
    return;
  }

  if(type==='webpage'||type==='link'){
    var el=buildRenderer(item);
    addMsg('bot',el,'dom');
    return;
  }

  var el=buildRenderer(item);
  addMsg('bot',el,'dom');
}

loadCatalog(function(){
  buildCommands();
  registerSlamCommands();
  // فرّغ طابور IMG_REGISTER إن كانت ملفات IMG/ حُمِّلت قبل admin.js
  if(window._IMG_QUEUE && window._IMG_QUEUE.length){
    window._IMG_QUEUE.forEach(function(q){
      window.ADMIN._registerEntry(q.key, q.entry);
    });
    window._IMG_QUEUE=[];
  }
});

})();
