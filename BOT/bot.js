(function(){
'use strict';

if(window.BOT_MAIN)return;

var C=window.BOT_CORE;
if(!C){console.error('bot.js: BOT_CORE missing');return;}

function _addMsg(role,content,type,opts){
  var UI=window.BOT_UI;
  if(UI&&UI.addMsg)return UI.addMsg(role,content,type,opts);
}

function dispatchMessage(text){
  var t=(text||'').trim();
  if(!t)return;

  var UI=window.BOT_UI;
  if(!UI)return;

  UI.addMsg('user',t,'text');

  var handled=false;
  if(window.ADMIN&&typeof window.ADMIN.handleMessage==='function'){
    handled=window.ADMIN.handleMessage(t,function(role,content,type,opts){
      UI.addMsg(role,content,type,opts);
    });
  }

  if(!handled){
    var def=(window.ADMIN&&window.ADMIN.chatResponses&&window.ADMIN.chatResponses.default)
      ||'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة';
    UI.addMsg('bot',def,'text');
  }
}

function _bindInput(){
  var inputEl=document.getElementById('bot-input');
  var sendEl=document.getElementById('bot-send');
  if(!inputEl||!sendEl)return;

  function send(){
    var t=inputEl.value.trim();
    if(!t)return;
    inputEl.value='';
    inputEl.style.height='auto';
    dispatchMessage(t);
  }

  sendEl.addEventListener('click',send);

  inputEl.addEventListener('keydown',function(e){
    if(e.key==='Enter'&&!e.shiftKey){
      e.preventDefault();
      send();
    }
  });
}

function _bindFiles(){
  var attachInput=document.getElementById('bot-attach-input');
  if(!attachInput)return;

  attachInput.addEventListener('change',function(){
    var files=Array.from(this.files||[]);
    this.value='';
    files.forEach(function(file){
      var UI=window.BOT_UI;
      if(!UI)return;
      var type=C.getContentType(file);
      var url=C.createObjectURL(file);

      if(type==='image'){UI.addMsg('user',url,'image');return;}
      if(type==='video'){UI.addMsg('user',{src:url,name:file.name},'video');return;}
      if(type==='audio'){UI.addMsg('user',{src:url,name:file.name},'audio');return;}
      if(type==='html'){
        C.readAsText(file,function(err,content){
          UI.addMsg('user',{name:file.name,content:content,url:url},'html');
        });
        return;
      }
      if(type==='glb'||type==='3d'){UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'glb');return;}
      if(type==='pdf'){UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'pdf');return;}
      if(type==='apk'){UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'apk');return;}
      if(type==='archive'){UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'archive');return;}
      if(type==='office'){UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'office');return;}
      if(['js','json','txt','code','md','csv'].includes(type)){
        C.readAsText(file,function(err,content){
          UI.addMsg('user',{name:file.name,content:content},'txt');
        });
        return;
      }
      UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'file');
    });
  });
}

window.BOT_REGISTER=window.BOT_REGISTER||function(entry){
  if(!entry||!entry.cmd)return;
  if(window.ADMIN&&typeof window.ADMIN.registerOrder==='function'){
    window.ADMIN.registerOrder(entry);
  } else {
    window._ADMIN_QUEUE=window._ADMIN_QUEUE||[];
    window._ADMIN_QUEUE.push({key:entry.cmd,entry:entry});
  }
};

function showWelcome(){
  var UI=window.BOT_UI;
  if(!UI)return;
  var welcome='⚡ مرحباً بك في عالم الظلام\nاكتب «اوامر» لعرض القائمة';
  if(window.ADMIN&&typeof window.ADMIN.getWelcome==='function'){
    welcome=window.ADMIN.getWelcome();
  }
  setTimeout(function(){UI.addMsg('bot',welcome,'text');},700);
}

C.whenReady(function(){
  _bindInput();
  _bindFiles();
  showWelcome();

  window.BOT_MAIN={
    dispatch:dispatchMessage,
    addMsg:_addMsg,
    addCommand:function(cmd,entry){
      if(window.ADMIN&&typeof window.ADMIN.registerOrder==='function'){
        var aliases=Array.isArray(cmd)?cmd:[cmd];
        window.ADMIN.registerOrder(Object.assign({cmd:aliases},entry));
      }
    }
  };

  C.emit('bot:ready',{});
});

})();
