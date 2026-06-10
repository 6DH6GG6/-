(function(){
'use strict';

if(window.BOT_MAIN)return;

var C=window.BOT_CORE;
if(!C){console.error('bot.js: BOT_CORE missing');return;}

function _addMsg(role,content,type,opts){
  var UI=window.BOT_UI;
  if(UI&&UI.addMsg)return UI.addMsg(role,content,type,opts);
}

window._botAddMsg=_addMsg;
window._botDispatch=dispatchMessage;

var _dispatching=false;

function dispatchMessage(text){
  if(_dispatching)return;
  _dispatching=true;

  var UI=window.BOT_UI;
  var AI=window.BOT_AI;
  if(!UI){_dispatching=false;return;}

  var t=(text||'').trim();
  if(!t){_dispatching=false;return;}

  UI.addMsg('user',t,'text');

  var handled=false;
  if(window.ADMIN&&typeof window.ADMIN.handleMessage==='function'){
    handled=window.ADMIN.handleMessage(t,function(role,content,type,opts){
      UI.addMsg(role,content,type,opts);
    });
  }

  if(handled){_dispatching=false;return;}

  if(AI&&AI.config&&AI.config.apiKey){
    var typingEl=UI.addTypingIndicator();
    AI.ask(t).then(function(reply){
      UI.removeTypingIndicator();
      if(reply){
        UI.addMsg('bot',reply,'text');
      } else {
        UI.addMsg('bot','⚠ انقطع خيط الظلام... حاول مرة أخرى','text');
      }
      _dispatching=false;
    }).catch(function(){
      UI.removeTypingIndicator();
      UI.addMsg('bot','⚠ خطأ في الاتصال','text');
      _dispatching=false;
    });
    return;
  }

  var def=(window.ADMIN&&window.ADMIN.chatResponses&&window.ADMIN.chatResponses.default)
    ||'لم أفهم طلبك 🔴 اكتب «اوامر» لعرض القائمة';
  UI.addMsg('bot',def,'text');
  _dispatching=false;
}

C.on('input:send',function(d){
  var text=(d&&d.text)||'';
  if(!text)return;
  dispatchMessage(text);
});

C.on('file:attached',function(d){
  var file=d&&d.file;
  if(!file)return;

  var UI=window.BOT_UI;
  var AI=window.BOT_AI;
  var type=C.getContentType(file);
  var url=C.createObjectURL(file);

  if(type==='image'){
    UI&&UI.addMsg('user',url,'image');

    if(AI&&AI.config&&AI.config.apiKey){
      C.readAsDataURL(file,function(err,dataUrl){
        if(err)return;
        var b64=dataUrl.split(',')[1];
        UI&&UI.addTypingIndicator();
        AI.analyzeImage(b64,file.type).then(function(reply){
          UI&&UI.removeTypingIndicator();
          if(reply)UI&&UI.addMsg('bot',reply,'text');
        });
      });
    }
    return;
  }

  if(type==='video'){UI&&UI.addMsg('user',{src:url,name:file.name},'video');return;}
  if(type==='audio'){UI&&UI.addMsg('user',{src:url,name:file.name},'audio');return;}

  if(type==='html'){
    C.readAsText(file,function(err,content){
      UI&&UI.addMsg('user',{name:file.name,content:content,url:url},'html');
    });
    return;
  }

  if(type==='glb'||type==='3d'){UI&&UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'glb');return;}
  if(type==='pdf'){UI&&UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'pdf');return;}
  if(type==='apk'){UI&&UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'apk');return;}
  if(type==='archive'){UI&&UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'archive');return;}
  if(type==='office'){UI&&UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'office');return;}

  if(['js','json','txt','code','md','csv'].includes(type)){
    C.readAsText(file,function(err,content){
      UI&&UI.addMsg('user',{name:file.name,content:content},'txt');
    });
    return;
  }

  UI&&UI.addMsg('user',{name:file.name,url:url,size:C.formatSize(file.size)},'file');
});

C.on('editor:open',function(d){
  var editor=document.getElementById('bot-code-editor');
  var ta=document.getElementById('code-textarea');
  var inputEl=document.getElementById('bot-input');
  if(!editor||!ta)return;
  if(inputEl)inputEl.classList.add('code-mode');
  ta.value=(d&&d.value)||'';
  editor.classList.add('show');
  ta.focus();
});

C.on('gate:open',function(d){
  if(window.ADMIN&&typeof window.ADMIN.onGateSuccess==='function'){
    window.ADMIN.onGateSuccess(d);
  }
});

window.BOT_REGISTER=window.BOT_REGISTER||function(entry){
  if(!entry||!entry.cmd)return;
  var aliases=Array.isArray(entry.cmd)?entry.cmd:[entry.cmd];
  aliases.forEach(function(a){
    var k=_norm(a);
    if(window.ADMIN&&typeof window.ADMIN.register==='function'){
      window.ADMIN.register(k,entry);
    } else {
      window._ADMIN_QUEUE=window._ADMIN_QUEUE||[];
      window._ADMIN_QUEUE.push({key:k,entry:entry});
    }
  });
};

function _norm(s){
  return(s||'').trim().replace(/\s+/g,' ').toLowerCase()
    .replace(/أ|إ|آ/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
}

function showWelcome(){
  var UI=window.BOT_UI;
  if(!UI)return;

  var welcome='⚡ الظلام يستيقظ...';

  if(window.ADMIN&&typeof window.ADMIN.getWelcome==='function'){
    welcome=window.ADMIN.getWelcome();
  } else if(!window.BOT_AI||!window.BOT_AI.config||!window.BOT_AI.config.apiKey){
    welcome='⚡ مرحباً بك في عالم الظلام\nاكتب «اوامر» لعرض القائمة';
  }

  setTimeout(function(){
    UI.addMsg('bot',welcome,'text');
  },700);
}

C.whenReady(function(){
  showWelcome();

  window.BOT_MAIN={
    dispatch:dispatchMessage,
    addMsg:_addMsg,

    addCommand:function(cmd,entry){
      if(window.ADMIN&&typeof window.ADMIN.register==='function'){
        var aliases=Array.isArray(cmd)?cmd:[cmd];
        aliases.forEach(function(a){
          window.ADMIN.register(a,Object.assign({cmd:a},entry));
        });
      }
    },

    send:function(entry){
      if(window.ADMIN&&typeof window.ADMIN.send==='function'){
        window.ADMIN.send(entry);
      }
    }
  };

  C.emit('bot:ready',{});
});

})();
