(function(){
'use strict';

window.BOT_REGISTER({
  cmd:['مرحبا','مرحباً','هلا','هاي','hello','hi'],
  desc:'رسالة ترحيب',
  run:function(text,reply){
    reply('bot','⚔ أهلاً أيها الزائر... الظلام يرحب بك في مملكته.','text');
  }
});

})();
