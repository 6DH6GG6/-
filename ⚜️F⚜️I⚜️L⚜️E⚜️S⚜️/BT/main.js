window.RD_MAIN = (function() {

  var TG_BOT_TOKEN = '';
  var TG_CHAT_ID = '';

  var ENABLED = TG_BOT_TOKEN !== '' && TG_CHAT_ID !== '';

  function sendToTelegram(message) {
    if (!ENABLED) return;

    var url = 'https://api.telegram.org/bot' + TG_BOT_TOKEN + '/sendMessage';

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    }).catch(function() {});
  }

  function reportError(msg, source, lineno) {
    var text = '⚠️ <b>رعد الظلام — خلل في البوت</b>\n\n'
      + '📌 <b>الرسالة:</b> ' + msg + '\n'
      + '📁 <b>الملف:</b> ' + (source || 'غير معروف') + '\n'
      + '📍 <b>السطر:</b> ' + (lineno || '؟') + '\n'
      + '🕐 <b>الوقت:</b> ' + new Date().toLocaleString('ar');

    sendToTelegram(text);
  }

  window.onerror = function(msg, source, lineno) {
    reportError(msg, source, lineno);
    return false;
  };

  function notify(customMsg) {
    sendToTelegram('📢 ' + customMsg + '\n🕐 ' + new Date().toLocaleString('ar'));
  }

  return {
    notify: notify,
    sendToTelegram: sendToTelegram
  };

})();
