(function(){
'use strict';

if(window.ADMIN)return;
if(!window.BOT_CORE){console.error('admin.js: BOT_CORE missing');return;}

var C=window.BOT_CORE;

var _commands={};
var _chatResponses={
  default:'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة'
};
var _ordersList=[];
var _loaded=false;

// ✅ المجلدات التي سيتم فحصها تلقائياً
var DIRS=[
  'ORDERS/',
  'CHAT/',
  'FILES/',
  'IMG/',
  'APPS/',
  'MEDIA/',
  'CMDS/'
];

function _norm(s){
  return(s||'').trim().replace(/\s+/g,' ').toLowerCase()
    .replace(/أ|إ|آ/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
}

function register(key,entry){
  _commands[_norm(key)]=entry;
}

function registerOrder(entry){
  if(!entry)return;
  entry._dir=window._CURRENT_LOAD_DIR||'ORDERS/';
  _ordersList.push(entry);
  var aliases=Array.isArray(entry.cmd)?entry.cmd:[entry.cmd];
  aliases.forEach(function(a){if(a)register(a,entry);});
}

function handleMessage(text,reply){
  var k=_norm(text);

  if(k==='اوامر'||k==='أوامر'||k==='الاوامر'||k==='commands'){
    _showMenu(reply);
    return true;
  }

  if(_commands[k]){
    var e=_commands[k];
    if(typeof e.run==='function'){e.run(text,reply);return true;}
    if(e.response){reply('bot',e.response,'text');return true;}
  }

  var keys=Object.keys(_commands);
  for(var i=0;i<keys.length;i++){
    if(k.startsWith(keys[i])||keys[i].startsWith(k)){
      var e2=_commands[keys[i]];
      if(typeof e2.run==='function'){e2.run(text,reply);return true;}
      if(e2.response){reply('bot',e2.response,'text');return true;}
    }
  }

  return false;
}

function _showMenu(reply){
  var visible=_ordersList.filter(function(o){return o._dir==='ORDERS/';});
  if(!visible.length){
    reply('bot','📂 لا توجد أوامر محملة بعد','text');
    return;
  }
  var lines=['⚔ قائمة الأوامر المتاحة\n'];
  visible.forEach(function(o,i){
    var cmds=Array.isArray(o.cmd)?o.cmd:[o.cmd||''];
    var desc=o.desc||o.description||'';
    lines.push((i+1)+'. '+cmds.join(' / ')+(desc?' — '+desc:''));
  });
  reply('bot',lines.join('\n'),'text');
}

function _loadScript(src,cb){
  var s=document.createElement('script');
  s.src=src+'?v='+Date.now();
  s.onload=function(){if(cb)cb(null);};
  s.onerror=function(){
    if(cb)cb(new Error('404'));
  };
  document.head.appendChild(s);
}

// ✅ قراءة manifest.json من المجلد ثم تحميل كل ملف فيه
function _loadDir(dir,cb){
  fetch(dir+'manifest.json?v='+Date.now())
    .then(function(r){
      if(!r.ok)throw new Error('no manifest');
      return r.json();
    })
    .then(function(files){
      if(!Array.isArray(files)||!files.length){cb();return;}
      var done=0;
      files.forEach(function(filename){
        window._CURRENT_LOAD_DIR=dir;
        _loadScript(dir+filename,function(){
          done++;
          if(done===files.length)cb();
        });
      });
    })
    .catch(function(){
      cb();
    });
}

function loadAll(cb){
  if(_loaded){if(cb)cb();return;}
  var i=0;
  function next(){
    if(i>=DIRS.length){
      _loaded=true;
      if(cb)cb();
      return;
    }
    _loadDir(DIRS[i++],next);
  }
  next();
}

function getWelcome(){
  return '⚡ يستيقظ الظلام...\nاكتب «اوامر» لعرض القائمة';
}

function onGateSuccess(data){}

C.whenReady(function(){
  loadAll(function(){
    var q=window._ADMIN_QUEUE||[];
    q.forEach(function(item){registerOrder(item.entry);});
    window._ADMIN_QUEUE=[];
  });
});

window.ADMIN={
  register:register,
  registerOrder:registerOrder,
  handleMessage:handleMessage,
  getWelcome:getWelcome,
  onGateSuccess:onGateSuccess,
  chatResponses:_chatResponses,
  ordersList:_ordersList,
  loadAll:loadAll
};

})();
