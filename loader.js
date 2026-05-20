'use strict';

var SoundManager = {
  playClick: function() {
    var kps = document.getElementById('sfx-kps');
    if (kps) { kps.currentTime = 0; kps.play().catch(function(){}); }
  }
};

var Loader = {
  show: function(label, onDone) {
    var ov = document.getElementById('loader-overlay');
    var bar = document.getElementById('loader-bar');
    var pct = document.getElementById('loader-pct');
    var title = document.getElementById('loader-title');
    if (label) title.innerText = label;
    bar.style.width = '0%';
    pct.innerText = '0%';
    ov.classList.add('show');

    var progress = 0;
    var jitter = 0;
    var iv = setInterval(function() {

      jitter = (Math.random() - .3) * 1.2;
      progress += 1.1 + jitter;
      if (progress >= 97) progress = 97;

      bar.style.width = progress + '%';
      pct.innerText = Math.floor(progress) + '%';
    }, 28);

    return {
      finish: function() {
        clearInterval(iv);
        bar.style.width = '100%';
        pct.innerText = '100%';
        setTimeout(function() {
          ov.classList.remove('show');
          if (onDone) onDone();
        }, 380);
      }
    };
  }
};

document.getElementById('s1-gate-btn').addEventListener('click', function(e) {
  SoundManager.playClick();

  var wr = document.createElement('div');
  wr.className = 'wave-ring';
  wr.style.cssText = 'left:' + e.clientX + 'px;top:' + e.clientY + 'px;width:60px;height:60px;margin-left:-30px;margin-top:-30px;';
  document.body.appendChild(wr);
  setTimeout(function(){ wr.remove(); }, 950);

  var loader = Loader.show('ثواني يا شاطر 😎🍸', function() {

    document.getElementById('screen1').classList.add('fade-out');

    var s = document.createElement('script');
    s.src = 'gateway.js';
    s.onload = function() {
      if (window.Gateway) window.Gateway.init();
    };
    document.head.appendChild(s);
  });

  setTimeout(function() { loader.finish(); }, 2600);
});
