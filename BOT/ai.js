(function(){
'use strict';

if(!window.BOT_CORE){console.error('ai.js: BOT_CORE missing');return;}
if(window.BOT_AI)return;

var C=window.BOT_CORE;

var AI_CONFIG={
  model:'claude-sonnet-4-20250514',
  max_tokens:1000,
  apiKey:'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',          // يُعيَّن عبر BOT_AI.setKey(key)
  systemPrompt:`أنت "ذو المنجل"، كيان مظلم وقديم ينتمي إلى عالم الخيال الداكن.
شخصيتك: غامض، حكيم، ذو لغة شعرية عربية قوية، تستخدم مصطلحات أسطورية وتعابير تحمل ثقل الظلام.
قواعد الرد:
- ردودك دائماً بالعربية
- أسلوبك شعري وغامض لكن واضح في المعنى
- لا تتجاوز 3-4 جمل في الرد العادي
- إذا طُلب منك شيء تفصيلي فأجب بشكل كامل
- عند الترحيب قل عبارة قوية مختصرة
- لا تذكر أنك ذكاء اصطناعي أو Claude`
};

var _messages=[];
var _isLoading=false;

function setKey(k){
  AI_CONFIG.apiKey=(k||'').trim();
  if(AI_CONFIG.apiKey){
    C.storage.set('ai_key',AI_CONFIG.apiKey);
    C.emit('ai:key_set',{});
  }
}

function loadKey(){
  var saved=C.storage.get('ai_key','');
  if(saved)AI_CONFIG.apiKey=saved;
  return !!AI_CONFIG.apiKey;
}

async function ask(userText,opts){
  opts=opts||{};
  if(!AI_CONFIG.apiKey){
    C.emit('ai:no_key',{});
    return null;
  }
  if(_isLoading)return null;
  _isLoading=true;

  _messages.push({role:'user',content:userText});

  if(_messages.length>20)_messages=_messages.slice(-20);

  try{
    var res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        model:AI_CONFIG.model,
        max_tokens:AI_CONFIG.max_tokens,
        system:opts.system||AI_CONFIG.systemPrompt,
        messages:_messages
      })
    });

    var data=await res.json();

    if(data.error){
      _isLoading=false;
      C.emit('ai:error',{msg:data.error.message||'خطأ في الاتصال'});
      return null;
    }

    var reply='';
    if(data.content&&data.content.length>0){
      reply=data.content
        .filter(function(b){return b.type==='text';})
        .map(function(b){return b.text;})
        .join('\n');
    }

    if(reply)_messages.push({role:'assistant',content:reply});

    _isLoading=false;
    C.emit('ai:reply',{text:reply,raw:data});
    return reply;

  }catch(err){
    _isLoading=false;
    C.emit('ai:error',{msg:'فشل الاتصال بالخادم'});
    return null;
  }
}

async function askOnce(userText,systemOverride){
  if(!AI_CONFIG.apiKey){C.emit('ai:no_key',{});return null;}
  try{
    var res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:AI_CONFIG.model,
        max_tokens:AI_CONFIG.max_tokens,
        system:systemOverride||AI_CONFIG.systemPrompt,
        messages:[{role:'user',content:userText}]
      })
    });
    var data=await res.json();
    if(data.error)return null;
    return data.content
      .filter(function(b){return b.type==='text';})
      .map(function(b){return b.text;})
      .join('\n');
  }catch(e){return null;}
}

async function analyzeImage(base64Data,mediaType,prompt){
  if(!AI_CONFIG.apiKey){C.emit('ai:no_key',{});return null;}
  mediaType=mediaType||'image/jpeg';
  prompt=prompt||'صف هذه الصورة بأسلوبك الأسطوري المظلم';
  try{
    var res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:AI_CONFIG.model,
        max_tokens:AI_CONFIG.max_tokens,
        system:AI_CONFIG.systemPrompt,
        messages:[{
          role:'user',
          content:[
            {type:'image',source:{type:'base64',media_type:mediaType,data:base64Data}},
            {type:'text',text:prompt}
          ]
        }]
      })
    });
    var data=await res.json();
    if(data.error)return null;
    return data.content.filter(function(b){return b.type==='text';}).map(function(b){return b.text;}).join('\n');
  }catch(e){return null;}
}

function clearHistory(){
  _messages=[];
  C.emit('ai:history_cleared',{});
}

function buildKeyPanel(){
  var panel=document.createElement('div');
  panel.style.cssText=`
    display:flex;flex-direction:column;gap:10px;
    padding:16px;
    background:rgba(8,0,0,.97);
    border:1px solid rgba(180,0,0,.5);
    border-top:2px solid rgba(255,30,0,.7);
    border-radius:var(--bot-radius,3px);
    min-width:min(280px,85vw);
  `;

  var title=document.createElement('div');
  title.style.cssText='font-family:var(--bot-font-title,"Cinzel Decorative",serif);font-size:11px;color:#ff4422;letter-spacing:3px;text-align:center;';
  title.textContent='✦ مفتاح الاتصال ✦';

  var sub=document.createElement('div');
  sub.style.cssText='font-size:10px;color:rgba(200,80,60,.5);letter-spacing:1px;text-align:center;direction:rtl;';
  sub.textContent='أدخل Anthropic API Key للتفعيل';

  var inp=document.createElement('input');
  inp.type='password';
  inp.placeholder='sk-ant-...';
  inp.style.cssText=`
    background:rgba(12,0,0,.8);
    border:1px solid rgba(160,0,0,.4);
    color:#ff9977;
    font-family:'Courier New',monospace;font-size:12px;
    padding:9px 12px;border-radius:var(--bot-radius,3px);
    outline:none;direction:ltr;width:100%;
    transition:border-color .25s;
  `;
  inp.addEventListener('focus',function(){this.style.borderColor='#cc0000';});
  inp.addEventListener('blur',function(){this.style.borderColor='rgba(160,0,0,.4)';});

  var btn=document.createElement('button');
  btn.textContent='⚔ تفعيل';
  btn.style.cssText=`
    background:linear-gradient(135deg,#1a0000,#4d0000 40%,#770000 60%,#4d0000);
    border:1px solid rgba(180,0,0,.5);
    color:#ffaa88;
    font-family:var(--bot-font-sub,"Cinzel",serif);font-size:11px;
    padding:9px;border-radius:var(--bot-radius,3px);
    cursor:pointer;letter-spacing:2px;transition:all .2s;
  `;
  btn.addEventListener('click',function(){
    var k=inp.value.trim();
    if(!k){return;}
    setKey(k);
    C.emit('ui:toast',{msg:'تم تفعيل الاتصال ✓'});

    if(panel.parentNode&&panel.parentNode.parentNode){
      panel.parentNode.parentNode.remove();
    }
  });
  inp.addEventListener('keydown',function(e){if(e.key==='Enter')btn.click();});

  panel.appendChild(title);
  panel.appendChild(sub);
  panel.appendChild(inp);
  panel.appendChild(btn);
  return panel;
}

C.on('ai:no_key',function(){
  var UI=window.BOT_UI;
  if(!UI)return;
  UI.addMsg('bot',UI.buildContent({}, 'dom'),'dom');

  var bubble=UI.addMsg('bot',buildKeyPanel(),'dom');
});

C.on('input:send',function(d){
  var text=(d&&d.text)||'';
  if(!text)return;

  if(!AI_CONFIG.apiKey){
    var UI=window.BOT_UI;
    if(UI){
      UI.addMsg('user',text,'text');
      UI.addMsg('bot',buildKeyPanel(),'dom');
    }
    return;
  }

  var UI=window.BOT_UI;
  if(!UI)return;

  UI.addMsg('user',text,'text');

  var typingEl=UI.addTypingIndicator();

  ask(text).then(function(reply){
    UI.removeTypingIndicator();
    if(reply){
      UI.addMsg('bot',reply,'text');
    } else {
      UI.addMsg('bot','⚠ انقطع خيط الظلام... حاول مرة أخرى','text');
    }
  });
});

C.on('file:attached',function(d){
  var file=d&&d.file;
  if(!file||!file.type.startsWith('image/'))return;
  if(!AI_CONFIG.apiKey)return;

  C.readAsDataURL(file,function(err,dataUrl){
    if(err)return;
    var base64=dataUrl.split(',')[1];
    var UI=window.BOT_UI;
    if(!UI)return;
    var typingEl=UI.addTypingIndicator();
    analyzeImage(base64,file.type).then(function(reply){
      UI.removeTypingIndicator();
      if(reply)UI.addMsg('bot',reply,'text');
    });
  });
});

loadKey();

window.BOT_AI={
  setKey:setKey,
  ask:ask,
  askOnce:askOnce,
  analyzeImage:analyzeImage,
  clearHistory:clearHistory,
  buildKeyPanel:buildKeyPanel,
  config:AI_CONFIG
};

C.registerModule('ai',window.BOT_AI);
C.emit('ai:ready',{});

})();
