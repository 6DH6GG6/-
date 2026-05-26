// ============================================================
//  supporters.js — قسم أسماء من دعموني
//  يُستدعى من SSS.html عبر: loadSection('supporters')
// ============================================================

(function () {

  /* ─── بيانات الداعمين ─── يمكن تعديلها بحرية ─── */
  const SUPPORTERS = [
    {
      id: 1,
      name: "شيرا",
      avatar: "https://i.pravatar.cc/150?img=1",          // ← غيّر الرابط
      description: "صديقة وفية دعمتني من البداية، شكراً لك من القلب على كل لحظة وقفتِ فيها بجانبي. أنتِ جزء لا يُنسى من هذه الرحلة.",
      extraImage: "https://i.pravatar.cc/400?img=1",       // ← صورة تظهر داخل القائمة (اختياري)
      extraImagePos: "top"   // top | middle | bottom
    },
    {
      id: 2,
      name: "نورة",
      avatar: "https://i.pravatar.cc/150?img=5",
      description: "دعم لا يُقدّر بثمن، قلب طيب وروح جميلة. شكراً يا نورة على كل كلمة تشجيع.",
      extraImage: "https://i.pravatar.cc/400?img=5",
      extraImagePos: "middle"
    },
    {
      id: 3,
      name: "ليان",
      avatar: "https://i.pravatar.cc/150?img=9",
      description: "من أجمل من قابلتهم في هذا الطريق، شكراً لكِ على دعمك المستمر والصادق.",
      extraImage: "",          // فارغ = لا توجد صورة إضافية
      extraImagePos: "bottom"
    },
    {
      id: 4,
      name: "سارة",
      avatar: "https://i.pravatar.cc/150?img=20",
      description: "دعم حقيقي ومشاعر صادقة، يسعدني أنكِ جزء من مسيرتي.",
      extraImage: "https://i.pravatar.cc/400?img=20",
      extraImagePos: "top"
    },
    {
      id: 5,
      name: "ريم",
      avatar: "https://i.pravatar.cc/150?img=32",
      description: "شكراً يا ريم على كل مشاركة وكل تعليق دافئ يجعل يومي أجمل.",
      extraImage: "https://i.pravatar.cc/400?img=32",
      extraImagePos: "bottom"
    }
  ];

  /* ─── CSS الخاص بالقسم ─── */
  const CSS = `
    /* ========== نجوم الخلفية ========== */
    #supporters-section {
      position: relative;
      min-height: 100vh;
      background: #000;
      overflow: hidden;
      font-family: 'Tajawal', 'Cairo', sans-serif;
      direction: rtl;
      padding-bottom: 60px;
    }
    .sup-stars-canvas {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    /* ========== عنوان القسم ========== */
    .sup-title-wrap {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 48px 16px 32px;
    }
    .sup-main-title {
      font-size: clamp(1.8rem, 5vw, 3rem);
      font-weight: 900;
      color: #ff2e2e;
      text-shadow: 0 0 18px #ff2e2e88, 0 0 40px #ff000055;
      letter-spacing: 2px;
      margin: 0;
    }
    .sup-subtitle {
      color: #ff8fab;
      font-size: clamp(0.85rem, 2.5vw, 1.1rem);
      margin-top: 8px;
      opacity: 0.85;
    }
    .sup-divider {
      width: 120px;
      height: 3px;
      background: linear-gradient(90deg, transparent, #ff2e2e, #ff69b4, transparent);
      margin: 14px auto 0;
      border-radius: 99px;
    }

    /* ========== قائمة الداعمين ========== */
    .sup-list {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      gap: 18px;
      padding: 10px 16px 20px;
      max-width: 700px;
      margin: 0 auto;
    }

    /* ========== شريط داعم ========== */
    .sup-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: linear-gradient(135deg, #1a0010ee, #2a000aee);
      border: 1.5px solid #ff2e2e55;
      border-radius: 16px;
      padding: 14px 18px;
      cursor: pointer;
      transition: border-color .25s, box-shadow .25s, transform .2s;
      box-shadow: 0 2px 18px #ff000022;
      overflow: hidden;
      position: relative;
    }
    .sup-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, #ff2e2e08, transparent 60%);
      pointer-events: none;
    }
    .sup-card:hover {
      border-color: #ff2e2e;
      box-shadow: 0 4px 30px #ff2e2e44;
      transform: translateY(-2px);
    }
    .sup-card:active {
      transform: scale(0.98);
    }

    /* أفاتار */
    .sup-avatar {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      object-fit: cover;
      border: 2.5px solid #ff2e2e;
      box-shadow: 0 0 10px #ff2e2e66;
      flex-shrink: 0;
    }
    .sup-avatar-placeholder {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      border: 2.5px solid #ff2e2e;
      background: #1a0010;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
    }

    /* معلومات */
    .sup-info {
      flex: 1;
      min-width: 0;
    }
    .sup-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ff2e2e;
      margin: 0 0 4px;
      text-shadow: 0 0 8px #ff2e2e66;
    }
    .sup-desc-preview {
      font-size: 0.82rem;
      color: #ff8fab99;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    /* سهم */
    .sup-arrow {
      color: #ff2e2e99;
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    /* ========== Overlay — قائمة مليئة للشاشة ========== */
    .sup-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      background: #000;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      opacity: 0;
      transform: translateY(40px);
      transition: opacity .3s, transform .3s;
      pointer-events: none;
    }
    .sup-overlay.sup-open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }

    /* نجوم الـ overlay */
    .sup-overlay-stars {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
    }

    /* زر إغلاق */
    .sup-close-btn {
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 10001;
      background: #1a0010;
      border: 1.5px solid #ff2e2e;
      color: #ff2e2e;
      border-radius: 50%;
      width: 44px;
      height: 44px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 0 14px #ff2e2e55;
      transition: background .2s, transform .2s;
    }
    .sup-close-btn:hover { background: #ff2e2e; color: #fff; transform: scale(1.1); }

    /* محتوى الـ overlay */
    .sup-overlay-inner {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 600px;
      padding: 70px 20px 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* صورة دائرية علوية */
    .sup-ov-avatar {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #ff2e2e;
      box-shadow: 0 0 24px #ff2e2e77;
      margin-bottom: 14px;
    }
    .sup-ov-avatar-ph {
      width: 110px;
      height: 110px;
      border-radius: 50%;
      border: 3px solid #ff2e2e;
      background: #1a0010;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.4rem;
      margin-bottom: 14px;
    }

    /* اسم داخل الـ overlay */
    .sup-ov-name {
      font-size: clamp(1.4rem, 4vw, 2rem);
      font-weight: 900;
      color: #ff2e2e;
      text-shadow: 0 0 14px #ff2e2e88;
      margin: 0 0 18px;
    }

    /* صورة موضعية (top/middle/bottom) */
    .sup-ov-extra-img {
      width: 100%;
      max-width: 420px;
      border-radius: 14px;
      border: 2px solid #ff2e2e55;
      box-shadow: 0 4px 24px #ff2e2e33;
      object-fit: cover;
      display: block;
      margin: 0 auto 18px;
    }

    /* وصف داخل الـ overlay */
    .sup-ov-desc {
      width: 100%;
      max-width: 500px;
      background: linear-gradient(135deg, #1a001088, #2a000a88);
      border: 1px solid #ff2e2e33;
      border-radius: 14px;
      padding: 20px 22px;
      color: #ffd6e7;
      font-size: clamp(0.9rem, 2.5vw, 1.05rem);
      line-height: 1.85;
      text-align: center;
      backdrop-filter: blur(6px);
      margin: 0 0 18px;
    }

    .sup-ov-divider {
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #ff2e2e, transparent);
      border-radius: 99px;
      margin: 10px auto 18px;
    }

    /* ======= Responsive ======= */
    @media (max-width: 480px) {
      .sup-card { padding: 12px 12px; gap: 12px; }
      .sup-avatar, .sup-avatar-placeholder { width: 52px; height: 52px; }
      .sup-ov-avatar, .sup-ov-avatar-ph { width: 88px; height: 88px; }
    }
  `;

  /* ─── رسم النجوم ─── */
  function drawStars(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 220; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.4 + 0.2;
      const alpha = Math.random() * 0.7 + 0.2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();
    }
  }

  /* ─── بناء HTML القسم ─── */
  function buildSection() {
    const wrap = document.createElement('div');
    wrap.id = 'supporters-section';

    // نجوم خلفية
    const canvas = document.createElement('canvas');
    canvas.className = 'sup-stars-canvas';
    canvas.id = 'sup-stars-bg';
    wrap.appendChild(canvas);

    // عنوان
    wrap.innerHTML += `
      <div class="sup-title-wrap">
        <h1 class="sup-main-title">💖 من دعمني</h1>
        <p class="sup-subtitle">هؤلاء الأشخاص الرائعون وقفوا بجانبي وكانوا جزءاً من مسيرتي</p>
        <div class="sup-divider"></div>
      </div>
    `;

    // قائمة الداعمين
    const list = document.createElement('div');
    list.className = 'sup-list';

    SUPPORTERS.forEach(sup => {
      const card = document.createElement('div');
      card.className = 'sup-card';
      card.setAttribute('data-id', sup.id);

      const avatarHTML = sup.avatar
        ? `<img class="sup-avatar" src="${sup.avatar}" alt="${sup.name}" loading="lazy" onerror="this.outerHTML='<div class=\\'sup-avatar-placeholder\\'>👤</div>'">`
        : `<div class="sup-avatar-placeholder">👤</div>`;

      const shortDesc = sup.description.length > 60
        ? sup.description.slice(0, 58) + '…'
        : sup.description;

      card.innerHTML = `
        ${avatarHTML}
        <div class="sup-info">
          <p class="sup-name">${sup.name}</p>
          <p class="sup-desc-preview">${shortDesc}</p>
        </div>
        <span class="sup-arrow">◀</span>
      `;

      card.addEventListener('click', () => openOverlay(sup));
      list.appendChild(card);
    });

    wrap.appendChild(list);

    // Overlay
    const overlay = buildOverlay();
    wrap.appendChild(overlay);

    return wrap;
  }

  /* ─── بناء الـ Overlay ─── */
  function buildOverlay() {
    const ov = document.createElement('div');
    ov.className = 'sup-overlay';
    ov.id = 'sup-overlay';

    const ovStars = document.createElement('canvas');
    ovStars.className = 'sup-overlay-stars';
    ovStars.id = 'sup-overlay-stars';
    ov.appendChild(ovStars);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'sup-close-btn';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', closeOverlay);
    ov.appendChild(closeBtn);

    const inner = document.createElement('div');
    inner.className = 'sup-overlay-inner';
    inner.id = 'sup-overlay-inner';
    ov.appendChild(inner);

    return ov;
  }

  /* ─── فتح الـ Overlay ─── */
  function openOverlay(sup) {
    const ov = document.getElementById('sup-overlay');
    const inner = document.getElementById('sup-overlay-inner');
    const ovStars = document.getElementById('sup-overlay-stars');

    // رسم النجوم داخل الـ overlay
    drawStars(ovStars);

    // بناء صورة الأفاتار
    const avatarHTML = sup.avatar
      ? `<img class="sup-ov-avatar" src="${sup.avatar}" alt="${sup.name}" onerror="this.outerHTML='<div class=\\'sup-ov-avatar-ph\\'>👤</div>'">`
      : `<div class="sup-ov-avatar-ph">👤</div>`;

    // صورة إضافية
    const extraImgHTML = sup.extraImage
      ? `<img class="sup-ov-extra-img" src="${sup.extraImage}" alt="صورة ${sup.name}" loading="lazy" onerror="this.style.display='none'">`
      : '';

    // تجميع المحتوى حسب موضع الصورة الإضافية
    let topContent = '';
    let midContent = '';
    let botContent = '';

    if (sup.extraImage) {
      if (sup.extraImagePos === 'top') topContent = extraImgHTML;
      else if (sup.extraImagePos === 'middle') midContent = extraImgHTML;
      else botContent = extraImgHTML;
    }

    inner.innerHTML = `
      ${topContent}
      ${avatarHTML}
      <h2 class="sup-ov-name">${sup.name}</h2>
      <div class="sup-ov-divider"></div>
      ${midContent}
      <div class="sup-ov-desc">${sup.description}</div>
      ${botContent}
    `;

    // فتح
    ov.classList.add('sup-open');
    document.body.style.overflow = 'hidden';
  }

  /* ─── إغلاق الـ Overlay ─── */
  function closeOverlay() {
    const ov = document.getElementById('sup-overlay');
    ov.classList.remove('sup-open');
    document.body.style.overflow = '';
  }

  /* ─── تهيئة القسم ─── */
  function init(container) {
    // حقن CSS
    if (!document.getElementById('sup-style')) {
      const style = document.createElement('style');
      style.id = 'sup-style';
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    // حقن خط عربي إن لم يوجد
    if (!document.getElementById('sup-font')) {
      const link = document.createElement('link');
      link.id = 'sup-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap';
      document.head.appendChild(link);
    }

    container.innerHTML = '';
    const section = buildSection();
    container.appendChild(section);

    // رسم النجوم بعد الإلحاق
    requestAnimationFrame(() => {
      const bg = document.getElementById('sup-stars-bg');
      if (bg) drawStars(bg);
    });

    // إعادة رسم النجوم عند تغيير الحجم
    window.addEventListener('resize', () => {
      const bg = document.getElementById('sup-stars-bg');
      const ovStars = document.getElementById('sup-overlay-stars');
      if (bg) drawStars(bg);
      if (ovStars) drawStars(ovStars);
    });

    // إغلاق الـ overlay عند الضغط على خارجه
    const ov = document.getElementById('sup-overlay');
    if (ov) {
      ov.addEventListener('click', (e) => {
        if (e.target === ov) closeOverlay();
      });
    }
  }

  /* ─── تصدير ─── */
  window.SupportersSection = { init };

})();
