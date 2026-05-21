(function(){
'use strict';

if(document.getElementById('bc-panel')) return;

/* ══ خط Cinzel ══ */
if(!document.getElementById('bc-font')){
  var fl=document.createElement('link');
  fl.id='bc-font'; fl.rel='stylesheet';
  fl.href='https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;900&display=swap';
  document.head.appendChild(fl);
}

/* ══ CSS ══ */
var css=document.createElement('style');
css.id='bc-styles';
css.textContent=`
#bc-panel{
  position:fixed;inset:0;z-index:99990;
  display:none;align-items:center;justify-content:center;
  font-family:'Cinzel',serif;cursor:default;
}
#bc-panel.show{display:flex;}

/* خلفية حمراء داكنة ثابتة */
#bc-bg{
  position:absolute;inset:0;
  background:
    radial-gradient(ellipse at 50% 100%,rgba(160,0,0,.6) 0%,transparent 65%),
    radial-gradient(ellipse at 30% 40%, rgba(100,0,0,.4) 0%,transparent 55%),
    radial-gradient(ellipse at 70% 40%, rgba(100,0,0,.4) 0%,transparent 55%),
    linear-gradient(180deg,#0a0000 0%,#150000 40%,#200000 70%,#0d0000 100%);
}

/* البطاقة */
.bc-card-wrap{position:relative;z-index:99995;width:min(420px,94vw);}
.bc-card{
  position:relative;
  background:linear-gradient(160deg,rgba(22,4,4,.98),rgba(12,2,2,.99));
  border:1px solid rgba(180,0,0,.55);border-radius:2px;
  padding:34px 30px 26px;
  display:flex;flex-direction:column;align-items:center;overflow:hidden;
  box-shadow:0 0 60px rgba(139,0,0,.35),0 0 120px rgba(80,0,0,.2),inset 0 0 40px rgba(80,0,0,.15);
  animation:bcCardRise .5s cubic-bezier(.34,1.2,.64,1) both;
}
@keyframes bcCardRise{from{transform:translateY(24px) scale(.94);opacity:0;}to{transform:none;opacity:1;}}
.bc-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,transparent,#8b0000,#cc0000,#ff3300,#cc0000,#8b0000,transparent);
}

/* زوايا */
.bc-corner{position:absolute;width:18px;height:18px;border-color:#8b0000;border-style:solid;filter:drop-shadow(0 0 3px #cc0000);}
.bc-corner.tl{top:6px;right:6px;border-width:2px 2px 0 0;}
.bc-corner.tr{top:6px;left:6px;border-width:2px 0 0 2px;}
.bc-corner.bl{bottom:6px;right:6px;border-width:0 2px 2px 0;}
.bc-corner.br{bottom:6px;left:6px;border-width:0 0 2px 2px;}

/* جمجمة */
.bc-skull{position:absolute;font-size:11px;opacity:.12;}
.bc-skull.s1{top:10px;right:18px;}
.bc-skull.s2{bottom:10px;left:18px;transform:scaleX(-1);}

/* عنوان */
.bc-gate-title{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(13px,3vw,18px);color:#ff2200;
  text-shadow:0 0 12px rgba(255,0,0,.7),0 0 30px rgba(180,0,0,.4);
  letter-spacing:2px;text-align:center;margin-bottom:6px;line-height:1.5;
}

/* النص */
.bc-quote{
  font-family:'Cinzel Decorative',serif;
  font-size:clamp(11px,2.4vw,14px);color:#cc2200;
  text-shadow:0 0 8px rgba(200,0,0,.6);
  letter-spacing:1px;text-align:center;
  margin-bottom:16px;line-height:1.7;
}

/* فاصل */
.bc-divider{width:100%;display:flex;align-items:center;gap:8px;margin-bottom:16px;}
.bc-div-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,#8b0000,transparent);}
.bc-div-gem{width:7px;height:7px;background:#cc0000;transform:rotate(45deg);flex-shrink:0;box-shadow:0 0 8px #ff2200,0 0 16px #880000;}

/* حقل الإدخال */
.bc-input-wrap{position:relative;width:100%;margin-bottom:14px;cursor:pointer;}
.bc-input{
  width:100%;background:rgba(100,0,0,.08);
  border:1.5px solid rgba(150,0,0,.4);border-radius:2px;
  color:#ff6644;font-family:'Cinzel',serif;font-size:15px;
  padding:12px 46px 12px 14px;outline:none;
  text-align:center;letter-spacing:4px;direction:ltr;
  caret-color:#cc0000;
  transition:border-color .25s,box-shadow .25s;
  pointer-events:none;opacity:0.6;cursor:default;
}
.bc-input.active{pointer-events:auto;opacity:1;cursor:text;}
.bc-input:focus{border-color:#cc0000;box-shadow:0 0 18px rgba(180,0,0,.2),inset 0 0 8px rgba(100,0,0,.1);}
.bc-input::placeholder{color:rgba(150,50,30,.35);font-size:11px;letter-spacing:6px;}

.bc-input-hint{
  position:absolute;bottom:-18px;left:50%;transform:translateX(-50%);
  font-size:9px;color:rgba(180,60,40,.45);letter-spacing:2px;
  font-family:'Cinzel',serif;white-space:nowrap;
  transition:opacity .3s;pointer-events:none;
}
.bc-input-hint.hidden{opacity:0;}

.bc-eye{
  position:absolute;left:12px;top:50%;transform:translateY(-50%);
  background:none;border:none;cursor:pointer;padding:4px;
  color:rgba(180,50,30,.5);font-size:16px;line-height:1;
  transition:color .2s;
}
.bc-eye:hover{color:#cc2200;}

/* أزرار */
.bc-btns{display:flex;gap:9px;width:100%;margin-bottom:10px;}
.bc-submit{
  flex:1;
  background:linear-gradient(135deg,#3d0000,#8b0000 35%,#cc0000 50%,#8b0000 65%,#3d0000);
  border:1px solid rgba(200,0,0,.5);border-radius:2px;
  color:#ffddcc;font-family:'Cinzel Decorative',serif;
  font-size:13px;font-weight:700;padding:11px 0;
  cursor:pointer;letter-spacing:2px;
  box-shadow:0 0 18px rgba(139,0,0,.35);
  transition:all .2s;
}
.bc-submit:hover{box-shadow:0 0 30px rgba(180,0,0,.55);border-color:rgba(220,0,0,.75);}
.bc-submit:active{transform:scale(.97);}

.bc-back{
  background:rgba(80,0,0,.18);
  border:1px solid rgba(150,0,0,.35);border-radius:2px;
  color:rgba(220,100,80,.7);font-family:'Cinzel',serif;
  font-size:11px;padding:11px 16px;
  cursor:pointer;letter-spacing:1px;transition:all .2s;
}
.bc-back:hover{background:rgba(100,0,0,.3);color:#ff6644;border-color:rgba(180,0,0,.6);}
.bc-back:active{transform:scale(.97);}

/* رسالة خطأ */
.bc-err{
  font-size:11px;color:#ff3300;text-align:center;min-height:18px;
  text-shadow:0 0 8px #cc0000;letter-spacing:1px;
  opacity:0;transform:translateY(4px);
  transition:opacity .3s,transform .3s;
}
.bc-err.show{opacity:1;transform:translateY(0);animation:bcErrShake .4s ease;}
@keyframes bcErrShake{
  0%{transform:translateX(0);}20%{transform:translateX(-8px);}
  40%{transform:translateX(8px);}60%{transform:translateX(-5px);}
  80%{transform:translateX(5px);}100%{transform:translateX(0);}
}
`;
document.head.appendChild(css);

/* ══ HTML ══ */
var panel=document.createElement('div');
panel.id='bc-panel';
panel.innerHTML=`
  <div id="bc-bg"></div>
  <div class="bc-card-wrap">
    <div class="bc-card" id="bcCard">
      <div class="bc-corner tl"></div><div class="bc-corner tr"></div>
      <div class="bc-corner bl"></div><div class="bc-corner br"></div>
      <span class="bc-skull s1">💀</span><span class="bc-skull s2">💀</span>
      <div class="bc-gate-title">♦♠🔥 بوابة الظلام 🔥♠♦</div>
      <div class="bc-quote">🔑 أدخل كلمة السر المقدسة 🔑</div>
      <div class="bc-divider">
        <div class="bc-div-line"></div>
        <div class="bc-div-gem"></div>
        <div class="bc-div-line"></div>
      </div>
      <div class="bc-input-wrap" id="bcInputWrap">
        <input class="bc-input" id="bcInput" type="password"
               placeholder="· · · · · · · ·" maxlength="60" autocomplete="off" readonly>
        <button class="bc-eye" id="bcEye" title="إظهار / إخفاء">👁</button>
        <div class="bc-input-hint" id="bcInputHint">◈ انقر للكتابة ◈</div>
      </div>
      <div class="bc-btns">
        <button class="bc-submit" id="bcSubmit">⚔ دخول ⚔</button>
        <button class="bc-back"   id="bcBack" >↩ رجوع</button>
      </div>
      <div class="bc-err" id="bcErr">✖ كلمة السر خاطئة</div>
    </div>
  </div>
`;
document.body.appendChild(panel);

/* ══ موسيقى ══ */
var bgAudio=null;
function startMusic(){
  if(bgAudio) return;
  bgAudio=new Audio('Ggggg.ogg');
  bgAudio.loop=true; bgAudio.volume=0.55;
  bgAudio.play().catch(function(){});
}
function stopMusic(){
  if(!bgAudio) return;
  bgAudio.pause(); bgAudio.currentTime=0; bgAudio=null;
}

/* ══ DOM refs ══ */
var PASSWORD='666';
var bcInput    =document.getElementById('bcInput');
var bcInputWrap=document.getElementById('bcInputWrap');
var bcInputHint=document.getElementById('bcInputHint');
var bcEye      =document.getElementById('bcEye');
var bcSubmit   =document.getElementById('bcSubmit');
var bcBack     =document.getElementById('bcBack');
var bcErr      =document.getElementById('bcErr');
var showPw=false, inputActivated=false;

/* ══ تفعيل الحقل ══ */
bcInputWrap.addEventListener('click',function(e){
  if(e.target===bcEye) return;
  if(!inputActivated){
    inputActivated=true;
    bcInput.classList.add('active');
    bcInput.removeAttribute('readonly');
    bcInputHint.classList.add('hidden');
  }
  bcInput.focus();
});

/* ══ العين ══ */
bcEye.addEventListener('click',function(e){
  e.stopPropagation();
  showPw=!showPw;
  bcInput.type=showPw?'text':'password';
  bcEye.textContent=showPw?'🙈':'👁';
});

/* ══ التحقق من كلمة السر ══ */
function checkPassword(){
  if(bcInput.value.trim()===PASSWORD){
    bcErr.classList.remove('show');
    bcInput.style.borderColor='#006600';
    bcInput.style.color='#88ff88';
    bcSubmit.textContent='✓ جاري الفتح...';
    bcSubmit.style.pointerEvents='none';
    setTimeout(function(){
      panel.style.transition='opacity .4s';
      panel.style.opacity='0';
      setTimeout(function(){
        panel.classList.remove('show');
        panel.style.opacity='';
        panel.style.transition='';
        stopMusic();
        if(window.Gate2 && typeof window.Gate2.startGateOpen==='function'){
          window.Gate2.startGateOpen();
        }
      }, 420);
    }, 300);
  } else {
    bcErr.classList.remove('show');
    void bcErr.offsetWidth;
    bcErr.classList.add('show');
    bcInput.style.borderColor='#cc0000';
    setTimeout(function(){ bcInput.style.borderColor=''; bcErr.classList.remove('show'); },2500);
  }
}

bcSubmit.addEventListener('click',function(e){
  e.stopPropagation();
  checkPassword();
});

bcBack.addEventListener('click',function(e){
  e.stopPropagation();
  closePanel();
});

bcInput.addEventListener('keydown',function(e){
  if(e.key==='Enter') checkPassword();
});

/* ══ فتح / إغلاق ══ */
function openPanel(){
  inputActivated=false;
  bcInput.classList.remove('active');
  bcInput.setAttribute('readonly','readonly');
  bcInputHint.classList.remove('hidden');
  bcInput.value=''; bcInput.type='password';
  bcInput.style.borderColor=''; bcInput.style.color='';
  bcEye.textContent='👁'; showPw=false;
  bcErr.classList.remove('show');
  bcSubmit.textContent='⚔ دخول ⚔';
  bcSubmit.style.pointerEvents='';
  panel.style.transition='';
  panel.style.opacity='';
  panel.classList.add('show');
  startMusic();
}

function closePanel(){
  panel.classList.remove('show');
  stopMusic();
}

window.BloodCastle={ open:openPanel, close:closePanel };
openPanel();

})();