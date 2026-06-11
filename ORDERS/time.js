(function(){
'use strict';

window.BOT_REGISTER({
  cmd:['الوقت','وقت','time'],
  desc:'يعرض الوقت الحالي',
  run:function(text,reply){
    var now=new Date();
    var h=now.getHours(),m=now.getMinutes(),s=now.getSeconds();
    var pad=function(n){return n<10?'0'+n:n;};
    reply('bot','⏱ الوقت الآن: '+pad(h)+':'+pad(m)+':'+pad(s),'text');
  }
});

})();
