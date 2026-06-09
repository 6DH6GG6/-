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
      src: 'https://example.com/FILES/🌆/032c017c80ddd679743fddb46fddf2f2.jpg'
    }
  ]
});

})();
