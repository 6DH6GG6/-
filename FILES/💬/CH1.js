(function(){
'use strict';

BOT_REGISTER({
  cmd: ['حماس', 'حماسة', 'حمّاس'],
  label: 'حماس 🔥',
  type: 'multi',
  delay: 220,
  items: [
    {
      type: 'text',
      messages: [
        '🔥 أشعل النار في دواخلك!',
        '⚡ لا شيء يوقف من أراد النصر!',
        '💀 الظلام يولد أقوى المحاربين!',
        '⚜️ كن أسطورة لا تُنسى!',
        '☠️ ارتقِ فوق حدودك.. الآن!'
      ],
      interval: 280
    },
    {
      type: 'image',
      path: 'IMG/hamas.jpg'
    }
  ]
});

})();
