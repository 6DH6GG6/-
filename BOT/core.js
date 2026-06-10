(function(){
'use strict';

if(window.BOT_CORE)return;

window.BOT_CORE={
  version:'2.0.0',
  _ready:false,
  _queue:[],
  _modules:{},
  _listeners:{}
};

var C=window.BOT_CORE;

C.on=function(event,fn){
  if(!C._listeners[event])C._listeners[event]=[];
  C._listeners[event].push(fn);
};

C.emit=function(event,data){
  var fns=C._listeners[event]||[];
  fns.forEach(function(fn){try{fn(data);}catch(e){}});
};

C.registerModule=function(name,mod){
  C._modules[name]=mod;
  C.emit('module:loaded',{name:name});
  if(name==='ui'||name==='media'||name==='files'||name==='ai'){
    C._checkReady();
  }
};

C._checkReady=function(){
  var required=['ui','media','files'];
  var allOk=required.every(function(m){return !!C._modules[m];});
  if(allOk&&!C._ready){
    C._ready=true;
    C.emit('ready',{});
    C._flushQueue();
  }
};

C._flushQueue=function(){
  C._queue.forEach(function(fn){try{fn();}catch(e){}});
  C._queue=[];
};

C.whenReady=function(fn){
  if(C._ready){try{fn();}catch(e){}}
  else{C._queue.push(fn);}
};

C.norm=function(s){
  return(s||'').trim()
    .replace(/\s+/g,' ')
    .toLowerCase()
    .replace(/أ|إ|آ/g,'ا')
    .replace(/ة/g,'ه')
    .replace(/ى/g,'ي');
};

C.formatSize=function(b){
  if(b>=1073741824)return(b/1073741824).toFixed(1)+' GB';
  if(b>=1048576)return(b/1048576).toFixed(1)+' MB';
  if(b>=1024)return(b/1024).toFixed(1)+' KB';
  return b+' B';
};

C.loadScript=function(src,cb){
  var s=document.createElement('script');
  s.src=src;
  s.onload=function(){if(cb)cb(null);};
  s.onerror=function(){if(cb)cb(new Error('failed:'+src));};
  document.head.appendChild(s);
  return s;
};

C.loadStyle=function(href){
  var l=document.createElement('link');
  l.rel='stylesheet';l.href=href;
  document.head.appendChild(l);
};

C.once=function(event,fn){
  function wrap(data){
    fn(data);
    var arr=C._listeners[event]||[];
    var i=arr.indexOf(wrap);
    if(i>-1)arr.splice(i,1);
  }
  C.on(event,wrap);
};

C.debounce=function(fn,ms){
  var t;
  return function(){
    var args=arguments,ctx=this;
    clearTimeout(t);
    t=setTimeout(function(){fn.apply(ctx,args);},ms);
  };
};

C.uuid=function(){
  return 'xxxx-xxxx'.replace(/x/g,function(){
    return(Math.random()*16|0).toString(16);
  });
};

C.escapeHtml=function(s){
  return(s||'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
};

C.isMobile=function(){
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
};

C.fileExt=function(name){
  return(name||'').split('.').pop().toLowerCase();
};

C.fileType=function(name,mime){
  var ext=C.fileExt(name);
  var m=mime||'';

  if(m.startsWith('image/')||['jpg','jpeg','png','gif','webp','svg','bmp','ico','avif'].includes(ext))return'image';
  if(m.startsWith('video/')||['mp4','webm','ogg','mov','avi','mkv','flv','m4v','3gp'].includes(ext))return'video';
  if(m.startsWith('audio/')||['mp3','wav','ogg','flac','aac','m4a','opus','wma'].includes(ext))return'audio';

  if(ext==='pdf')return'pdf';
  if(ext==='apk')return'apk';
  if(['html','htm'].includes(ext))return'html';
  if(['glb','gltf'].includes(ext))return'glb';
  if(['fbx','obj','stl','ply','dae','3ds'].includes(ext))return'3d';
  if(['zip','rar','7z','tar','gz','bz2'].includes(ext))return'archive';
  if(['js','ts','jsx','tsx'].includes(ext))return'js';
  if(ext==='json')return'json';
  if(['txt','md','log','csv'].includes(ext))return'txt';
  if(['html','css','xml','yaml','yml','sh','bat','py','php','cpp','c','java','swift','kt'].includes(ext))return'code';
  if(['exe','msi','dmg','deb','rpm','ipa'].includes(ext))return'app';
  if(['doc','docx','xls','xlsx','ppt','pptx'].includes(ext))return'office';
  if(['ttf','otf','woff','woff2'].includes(ext))return'font';

  return'file';
};

C.getMimeIcon=function(type,ext){
  var map={
    image:'🖼',video:'🎬',audio:'🎵',
    pdf:'📄',apk:'📲',html:'🌐',
    glb:'🧊',js:'⚙',json:'{}',
    txt:'📝',code:'💻',archive:'🗜',
    app:'💾',office:'📊',font:'🔤',
    '3d':'🧊',file:'📦'
  };
  var extMap={
    py:'🐍',cpp:'⚡',c:'⚡',java:'☕',
    swift:'🍎',kt:'🤖',sh:'🖥',
    md:'📖',csv:'📊',xml:'🔧',
    yaml:'🔧',yml:'🔧'
  };
  return extMap[ext]||map[type]||'📦';
};

C.getContentType=function(file){
  if(!file)return'file';
  return C.fileType(file.name,file.type);
};

C.createObjectURL=function(file){
  return URL.createObjectURL(file);
};

C.revokeObjectURL=function(url){
  setTimeout(function(){URL.revokeObjectURL(url);},60000);
};

C.readAsText=function(file,cb){
  var r=new FileReader();
  r.onload=function(e){cb(null,e.target.result);};
  r.onerror=function(){cb(new Error('read error'));};
  r.readAsText(file);
};

C.readAsDataURL=function(file,cb){
  var r=new FileReader();
  r.onload=function(e){cb(null,e.target.result);};
  r.onerror=function(){cb(new Error('read error'));};
  r.readAsDataURL(file);
};

C.storage={
  set:function(k,v){try{localStorage.setItem('bot_'+k,JSON.stringify(v));}catch(e){}},
  get:function(k,def){try{var v=localStorage.getItem('bot_'+k);return v!==null?JSON.parse(v):def;}catch(e){return def;}},
  remove:function(k){try{localStorage.removeItem('bot_'+k);}catch(e){}},
  clear:function(){try{Object.keys(localStorage).filter(function(k){return k.startsWith('bot_');}).forEach(function(k){localStorage.removeItem(k);});}catch(e){}}
};

C.history={
  _data:[],
  _max:200,
  add:function(role,content,type){
    C.history._data.push({
      id:C.uuid(),
      role:role,
      content:typeof content==='string'?content:'[media]',
      type:type||'text',
      time:Date.now()
    });
    if(C.history._data.length>C.history._max){
      C.history._data.shift();
    }
    C.storage.set('history',C.history._data.slice(-50));
  },
  get:function(){return C.history._data;},
  clear:function(){C.history._data=[];C.storage.remove('history');},
  load:function(){
    var saved=C.storage.get('history',[]);
    C.history._data=saved;
  }
};

C.history.load();

C.fonts=[
  'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;900&family=Cairo:wght@300;400;700;900&display=swap'
];

C.fonts.forEach(function(href){
  if(!document.querySelector('link[href="'+href+'"]')){
    C.loadStyle(href);
  }
});

C.CSS_VARS=`
  :root{
    --bot-bg:#000;
    --bot-bg2:#050000;
    --bot-red:#ff2200;
    --bot-red2:#cc0000;
    --bot-red3:#880000;
    --bot-red-dim:rgba(180,0,0,.3);
    --bot-red-glow:rgba(255,0,0,.6);
    --bot-text:#ffbbaa;
    --bot-text2:#ff9988;
    --bot-text3:#ffaa88;
    --bot-border:rgba(140,0,0,.4);
    --bot-border2:rgba(180,0,0,.5);
    --bot-surface:rgba(8,0,0,.94);
    --bot-surface2:rgba(12,0,0,.92);
    --bot-radius:3px;
    --bot-font-main:'Cairo',sans-serif;
    --bot-font-title:'Cinzel Decorative',serif;
    --bot-font-sub:'Cinzel',serif;
    --bot-font-mono:'Courier New',monospace;
  }
`;

(function(){
  var st=document.createElement('style');
  st.textContent=C.CSS_VARS;
  document.head.appendChild(st);
})();

C.emit('core:ready',{});

})();
