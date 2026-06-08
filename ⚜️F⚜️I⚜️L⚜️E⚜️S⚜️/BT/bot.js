(function() {

  const BOT_IMG = "https://i.pravatar.cc/150?img=8";
  const MUSIC_SRC = "assets/theme.mp3";

  const style = document.createElement("style");
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap');
    *{margin:0;padding:0;box-sizing:border-box;}
    :root{
      --red:#8b0000;--red2:#c0392b;--red3:#ff2222;
      --black:#0a0a0a;--black2:#111;--black3:#1a1a1a;
      --purple:#7b2fff;--gold:#c9a84c;
      --border:1px solid var(--red);
      --border2:2px solid var(--red);
    }
    html,body{height:100%;background:var(--black);color:#eee;font-family:'Tajawal',sans-serif;direction:rtl;overflow:hidden;}
    #bot-app{display:flex;flex-direction:column;height:100vh;}

    #topbar{
      display:flex;align-items:center;gap:12px;
      background:var(--black2);border-bottom:var(--border2);
      padding:10px 16px;flex-shrink:0;
      box-shadow:0 2px 20px #8b000044;
    }
    #bot-avatar-wrap{position:relative;flex-shrink:0;}
    #bot-avatar{
      width:52px;height:52px;border-radius:50%;
      border:2px solid var(--purple);
      box-shadow:0 0 14px var(--purple),0 0 28px #7b2fff55;
      object-fit:cover;pointer-events:none;user-select:none;
    }
    #online-dot{
      position:absolute;bottom:2px;right:2px;
      width:12px;height:12px;border-radius:50%;
      background:#00e676;border:2px solid var(--black2);
      animation:pulse-dot 2s infinite;
    }
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.3;transform:scale(0.7);}}
    #bot-name{color:var(--red2);font-size:20px;font-weight:900;letter-spacing:1px;text-shadow:0 0 10px #c0392b88;}

    #messages{
      flex:1;overflow-y:auto;padding:16px;
      display:flex;flex-direction:column;gap:10px;
      scrollbar-width:thin;scrollbar-color:var(--red) var(--black2);
    }
    #messages::-webkit-scrollbar{width:4px;}
    #messages::-webkit-scrollbar-thumb{background:var(--red);}

    .bubble-wrap{display:flex;align-items:flex-end;gap:8px;}
    .bubble-wrap.user{flex-direction:row-reverse;}
    .bubble{
      max-width:72%;padding:10px 14px;border-radius:14px;
      background:var(--black3);border:var(--border);
      font-size:15px;line-height:1.6;word-break:break-word;
      white-space:pre-wrap;
      box-shadow:0 2px 12px #8b000033;
      animation:fadeUp .25s ease;
    }
    .bubble-wrap.user .bubble{background:#1a0000;border-color:var(--red3);}
    @keyframes fadeUp{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}

    .media-img{
      max-width:240px;border-radius:10px;
      border:2px solid var(--red);cursor:pointer;
      display:block;margin-top:6px;
      transition:transform .2s;
    }
    .media-img:hover{transform:scale(1.03);}

    .file-bubble{
      display:flex;align-items:center;gap:10px;
      background:var(--black3);border:var(--border);
      border-radius:12px;padding:10px 14px;cursor:pointer;
      transition:background .2s;
    }
    .file-bubble:hover{background:#1a0000;}
    .file-icon{font-size:26px;}
    .file-name{font-size:14px;color:#ddd;}

    /* ===== VIDEO BUBBLE ===== */
    .video-bubble{
      position:relative;width:260px;border-radius:12px;
      overflow:hidden;border:2px solid var(--red);
      background:#000;user-select:none;cursor:pointer;
    }
    .video-bubble video{
      width:100%;display:block;max-height:160px;object-fit:cover;
    }
    /* صورة مصغرة canvas */
    .vb-thumb{
      width:100%;display:block;max-height:160px;object-fit:cover;
      position:absolute;top:0;left:0;z-index:1;pointer-events:none;
    }
    .vb-play-icon{
      position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
      font-size:38px;z-index:2;pointer-events:none;
      transition:opacity .2s;
      filter:drop-shadow(0 0 6px #000);
    }
    /* شريط التقدم في الـ bubble */
    .vb-progress-wrap{
      position:absolute;bottom:0;left:0;right:0;height:5px;
      background:#ffffff22;z-index:3;cursor:pointer;
    }
    .vb-progress-bar{
      height:100%;width:0%;background:var(--red3);
      transition:width .08s linear;
    }
    /* مقبض السحب */
    .vb-progress-thumb{
      position:absolute;top:50%;right:auto;
      width:12px;height:12px;border-radius:50%;
      background:#fff;border:2px solid var(--red3);
      transform:translate(50%,-50%);
      pointer-events:none;
      display:none;
    }
    .vb-progress-wrap:hover .vb-progress-thumb{ display:block; }

    .audio-bubble{
      display:flex;align-items:center;gap:10px;
      background:var(--black3);border:var(--border);
      border-radius:30px;padding:8px 16px;cursor:pointer;
    }
    .audio-play{font-size:22px;}

    .album-grid{
      display:grid;grid-template-columns:repeat(3,1fr);gap:3px;
      width:240px;border:2px solid var(--red);border-radius:10px;overflow:hidden;cursor:pointer;
    }
    .album-grid img,.album-grid .album-more{
      width:100%;aspect-ratio:1;object-fit:cover;display:block;
    }
    .album-more{
      background:#1a1a1a;display:flex;align-items:center;justify-content:center;
      font-size:22px;color:#aaa;
    }

    .admin-choice-wrap{display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;}
    .admin-btn{
      background:#1a0000;border:1px solid var(--red);
      color:#eee;padding:6px 14px;border-radius:8px;cursor:pointer;font-family:'Tajawal',sans-serif;
      transition:background .2s;font-size:14px;
    }
    .admin-btn:hover{background:var(--red);}

    #bottombar{
      display:flex;align-items:center;gap:8px;
      background:var(--black2);border-top:var(--border2);
      padding:10px 12px;flex-shrink:0;
    }
    #msg-input{
      flex:1;background:var(--black);border:var(--border2);border-radius:10px;
      color:#eee;font-size:15px;font-family:'Tajawal',sans-serif;
      padding:10px 14px;outline:none;direction:rtl;
      resize:none;height:44px;overflow:hidden;
    }
    #msg-input:focus{border-color:var(--red3);box-shadow:0 0 8px #ff222233;}
    #edit-btn{
      background:var(--black3);border:var(--border);border-radius:10px;
      color:#ccc;padding:10px;cursor:pointer;font-size:18px;display:none;
      transition:background .2s;
    }
    #edit-btn:hover{background:#1a0000;}
    #send-btn{
      background:var(--red);border:none;border-radius:10px;
      color:#fff;padding:10px 16px;cursor:pointer;font-size:20px;
      transition:all .2s;
      box-shadow:0 0 10px #8b000088;
    }
    #send-btn:hover{background:var(--red2);transform:scale(1.06);}

    .overlay{
      position:fixed;inset:0;background:#000000cc;z-index:1000;
      display:flex;flex-direction:column;align-items:center;justify-content:center;
      backdrop-filter:blur(4px);animation:fadeIn .2s;
    }
    @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
    .overlay-header{
      display:flex;gap:10px;padding:10px;flex-wrap:wrap;justify-content:center;
    }
    .ov-btn{
      background:#1a0000;border:1px solid var(--red);color:#eee;
      padding:7px 14px;border-radius:8px;cursor:pointer;font-family:'Tajawal',sans-serif;
      font-size:14px;transition:background .2s;
    }
    .ov-btn:hover{background:var(--red);}
    .ov-img{max-width:90vw;max-height:80vh;border-radius:12px;border:2px solid var(--red);}

    /* ===== VIDEO OVERLAY ===== */
    .ov-video-wrap{
      position:relative;width:90vw;max-width:700px;
      display:flex;align-items:center;justify-content:center;
    }
    .ov-video{
      width:100%;border-radius:12px;border:2px solid var(--red);
      display:block;background:#000;cursor:pointer;
    }
    /* شريط التقدم الكبير مع سحب */
    .ov-seekbar-wrap{
      position:absolute;bottom:0;left:0;right:0;
      padding:10px 8px 6px;
      background:linear-gradient(transparent,#00000099);
      border-radius:0 0 12px 12px;
      z-index:3;
      display:flex;flex-direction:column;gap:4px;
    }
    .ov-time-row{
      display:flex;justify-content:space-between;
      font-size:11px;color:#ccc;font-family:'Tajawal',sans-serif;
      padding:0 2px;
    }
    .ov-progress-track{
      position:relative;height:5px;background:#ffffff33;
      border-radius:4px;cursor:pointer;
    }
    .ov-progress-fill{
      height:100%;width:0%;background:var(--red3);
      border-radius:4px;pointer-events:none;
    }
    .ov-progress-knob{
      position:absolute;top:50%;
      width:14px;height:14px;border-radius:50%;
      background:#fff;border:2px solid var(--red3);
      transform:translate(50%,-50%);
      right:100%;
      pointer-events:none;
      transition:transform .1s;
    }
    .ov-progress-track:hover .ov-progress-knob{ transform:translate(50%,-50%) scale(1.3); }
    .ov-quality-label{
      position:absolute;top:8px;left:8px;
      background:#00000099;color:#fff;
      font-size:12px;padding:2px 8px;border-radius:6px;
      font-family:'Tajawal',sans-serif;pointer-events:none;
      z-index:4;
    }

    .ov-file-content{
      background:var(--black3);border:var(--border2);border-radius:12px;
      padding:20px;max-width:90vw;max-height:70vh;overflow-y:auto;
      white-space:pre-wrap;font-size:14px;width:600px;
    }
    .ov-audio-wrap{
      background:var(--black3);border:var(--border2);border-radius:20px;
      padding:24px 40px;display:flex;flex-direction:column;align-items:center;gap:14px;
    }
    .ov-audio-title{font-size:22px;}
    .ov-audio audio{width:300px;}
    .album-ov-grid{
      display:grid;grid-template-columns:repeat(5,1fr);gap:4px;
      max-width:95vw;max-height:75vh;overflow-y:auto;padding:8px;
    }
    .album-ov-grid img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:6px;cursor:pointer;border:1px solid var(--red);}

    .edit-overlay{
      position:fixed;inset:0;background:#000000ee;z-index:2000;
      display:flex;flex-direction:column;
      animation:fadeIn .2s;
    }
    .edit-toolbar{
      display:flex;gap:6px;flex-wrap:wrap;padding:10px 12px;
      background:var(--black2);border-bottom:var(--border);
    }
    .edit-textarea{
      flex:1;background:var(--black3);color:#eee;font-size:15px;
      font-family:'Tajawal',sans-serif;direction:rtl;border:none;outline:none;
      padding:16px;resize:none;
    }
    .edit-arrows{
      display:flex;gap:6px;padding:10px 12px;
      background:var(--black2);border-top:var(--border);justify-content:center;flex-wrap:wrap;
    }
    .arr-btn{
      background:var(--black3);border:var(--border);color:#eee;
      padding:8px 14px;border-radius:8px;cursor:pointer;font-size:16px;
    }
    .arr-btn:hover{background:var(--red);}
  `;
  document.head.appendChild(style);

  document.body.innerHTML = `
    <div id="bot-app">
      <div id="topbar">
        <div id="bot-avatar-wrap">
          <img id="bot-avatar" src="${BOT_IMG}" alt="bot">
          <div id="online-dot"></div>
        </div>
        <span id="bot-name">رعد الظلام</span>
      </div>
      <div id="messages"></div>
      <div id="bottombar">
        <textarea id="msg-input" placeholder="اكتب رسالتك..." rows="1"></textarea>
        <button id="edit-btn">✏️</button>
        <button id="send-btn">⚡</button>
      </div>
    </div>
  `;

  const msgList = document.getElementById("messages");
  const msgInput = document.getElementById("msg-input");
  const sendBtn  = document.getElementById("send-btn");
  const editBtn  = document.getElementById("edit-btn");

  const music = new Audio(MUSIC_SRC);
  music.loop = true;
  music.volume = 0.35;
  let musicStarted = false;
  document.body.addEventListener("click", () => {
    if (!musicStarted) { music.play().catch(() => {}); musicStarted = true; }
  }, { once: true });

  msgInput.addEventListener("input", () => {
    editBtn.style.display = msgInput.value.trim() ? "flex" : "none";
    msgInput.style.height = "44px";
    msgInput.style.height = Math.min(msgInput.scrollHeight, 120) + "px";
  });

  function scrollBottom() {
    setTimeout(() => { msgList.scrollTop = msgList.scrollHeight; }, 50);
  }

  // ===== مستويات الجودة =====
  const QUALITIES = [
    { label: "منخفضة", filter: "blur(1.5px) brightness(0.85)" },
    { label: "متوسطة", filter: "none" },
    { label: "عالية",  filter: "contrast(1.08) saturate(1.1)" },
  ];
  const Q_DEFAULT = 1;

  // ===== توليد صورة مصغرة من الفيديو =====
  function generateThumbnail(videoSrc, callback) {
    const tmpVid = document.createElement("video");
    tmpVid.src = videoSrc;
    tmpVid.muted = true;
    tmpVid.preload = "metadata";
    tmpVid.crossOrigin = "anonymous";
    tmpVid.addEventListener("loadeddata", () => {
      tmpVid.currentTime = Math.min(1, tmpVid.duration * 0.1);
    });
    tmpVid.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      canvas.width  = tmpVid.videoWidth  || 320;
      canvas.height = tmpVid.videoHeight || 180;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(tmpVid, 0, 0, canvas.width, canvas.height);
      try {
        callback(canvas.toDataURL("image/jpeg", 0.7));
      } catch(e) {
        callback(null);
      }
      tmpVid.src = "";
    });
    tmpVid.addEventListener("error", () => callback(null));
  }

  // ===== صياغة الوقت =====
  function fmtTime(s) {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  // ===== بناء شريط seek قابل للسحب =====
  function makeSeekBar(vid, wrapClass, fillClass, knobClass) {
    const wrap = document.createElement("div");
    wrap.className = wrapClass;
    // منطقة لمس كبيرة مخفية فوق الشريط
    wrap.style.cssText += ";padding:10px 0;margin:-10px 0;cursor:pointer;";

    const track = document.createElement("div");
    track.style.cssText = "position:relative;height:5px;background:#ffffff33;border-radius:4px;";

    const fill = document.createElement("div");
    fill.className = fillClass;

    const knob = document.createElement("div");
    knob.className = knobClass;
    knob.style.cssText = "position:absolute;top:50%;right:auto;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid var(--red3);transform:translate(50%,-50%);pointer-events:none;";

    fill.appendChild(knob);
    track.appendChild(fill);
    wrap.appendChild(track);

    let dragging = false;

    function getRatio(e) {
      const rect = track.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    }

    function seekTo(e) {
      const ratio = getRatio(e);
      if (vid.duration) vid.currentTime = ratio * vid.duration;
      fill.style.width = (ratio * 100) + "%";
    }

    wrap.addEventListener("mousedown",  (e) => { dragging = true; seekTo(e); e.stopPropagation(); e.preventDefault(); });
    wrap.addEventListener("touchstart", (e) => { dragging = true; seekTo(e); e.stopPropagation(); }, { passive: false });
    window.addEventListener("mousemove",  (e) => { if (dragging) { seekTo(e); e.preventDefault(); } });
    window.addEventListener("touchmove",  (e) => { if (dragging) { seekTo(e); e.preventDefault(); } }, { passive: false });
    window.addEventListener("mouseup",  () => { dragging = false; });
    window.addEventListener("touchend", () => { dragging = false; });

    vid.addEventListener("timeupdate", () => {
      if (!dragging && vid.duration) {
        fill.style.width = (vid.currentTime / vid.duration * 100) + "%";
      }
    });

    return wrap;
  }

  // ===== قائمة مشغّلات الـ bubble النشطة =====
  // لإيقافها عند فتح overlay
  const activeBubbleVids = [];

  function addMsg(side, content, type) {
    if (type === undefined) type = "text";
    const wrap = document.createElement("div");
    wrap.className = `bubble-wrap ${side}`;

    if (type === "text") {
      const b = document.createElement("div");
      b.className = "bubble";
      b.textContent = content;
      wrap.appendChild(b);

    } else if (type === "admin-choice") {
      const b = document.createElement("div");
      b.className = "bubble";
      b.textContent = content;
      const btnWrap = document.createElement("div");
      btnWrap.className = "admin-choice-wrap";
      ["admin", "bot", "SSS"].forEach(cmd => {
        const btn = document.createElement("button");
        btn.className = "admin-btn";
        btn.textContent = cmd;
        btn.onclick = () => {
          addMsg("user", cmd);
          ADMIN.handleMessage(cmd, addMsg);
        };
        btnWrap.appendChild(btn);
      });
      b.appendChild(btnWrap);
      wrap.appendChild(b);

    } else if (type === "image") {
      const b = document.createElement("div");
      b.className = "bubble";
      const img = document.createElement("img");
      img.className = "media-img";
      img.src = content.path;
      img.alt = content.name || "";
      img.onclick = () => openImageOverlay(content.path);
      b.appendChild(img);
      wrap.appendChild(b);

    } else if (type === "file") {
      const fb = document.createElement("div");
      fb.className = "file-bubble";
      fb.innerHTML = `<span class="file-icon">📃</span><span class="file-name">${content.name}</span>`;
      fb.onclick = () => openFileOverlay(content);
      wrap.appendChild(fb);

    } else if (type === "video") {
      // ===== VIDEO BUBBLE مع thumbnail =====
      const vb = document.createElement("div");
      vb.className = "video-bubble";

      const vid = document.createElement("video");
      vid.src = content.path;
      vid.preload = "metadata";
      vid.muted = false;
      vid.volume = 1;
      vid.style.position = "relative";
      vid.style.zIndex = "0";

      // صورة مصغرة
      const thumbImg = document.createElement("img");
      thumbImg.className = "vb-thumb";
      thumbImg.style.display = "none";

      // زر تشغيل كبير فوق الصورة المصغرة
      const playIcon = document.createElement("div");
      playIcon.className = "vb-play-icon";
      playIcon.textContent = "▶️";

      // شريط seek صغير
      const seekWrap = makeSeekBar(vid, "vb-progress-wrap", "vb-progress-bar", "vb-progress-thumb");

      vb.appendChild(vid);
      vb.appendChild(thumbImg);
      vb.appendChild(playIcon);
      vb.appendChild(seekWrap);

      // توليد الصورة المصغرة
      generateThumbnail(content.path, (dataUrl) => {
        if (dataUrl) {
          thumbImg.src = dataUrl;
          thumbImg.style.display = "block";
          playIcon.style.display = "block";
        }
      });

      let isPlaying = false;
      activeBubbleVids.push(vid);

      // نقرة واحدة = تشغيل/إيقاف | نقرتان = قائمة
      let clickTimer = null;

      vb.addEventListener("click", (e) => {
        if (seekWrap.contains(e.target)) return;
        if (clickTimer) {
          clearTimeout(clickTimer);
          clickTimer = null;
          showVideoActions(vb, content.path, vid);
        } else {
          clickTimer = setTimeout(() => {
            clickTimer = null;
            if (isPlaying) {
              vid.pause();
              isPlaying = false;
              thumbImg.style.display = "block";
              playIcon.style.display = "block";
              playIcon.textContent = "▶️";
            } else {
              // إخفاء الصورة المصغرة عند التشغيل
              thumbImg.style.display = "none";
              playIcon.textContent = "⏸️";
              setTimeout(() => { playIcon.style.display = "none"; }, 600);
              vid.play().catch(() => {});
              isPlaying = true;
            }
          }, 260);
        }
      });

      vid.addEventListener("ended", () => {
        isPlaying = false;
        thumbImg.style.display = "block";
        playIcon.style.display = "block";
        playIcon.textContent = "▶️";
      });

      wrap.appendChild(vb);

    } else if (type === "audio") {
      const ab = document.createElement("div");
      ab.className = "audio-bubble";
      ab.innerHTML = `<span class="audio-play">🎵</span><span>${content.name}</span>`;
      const aud = new Audio(content.path);
      let playing = false;
      ab.onclick = () => {
        if (playing) { aud.pause(); ab.querySelector(".audio-play").textContent = "🎵"; playing = false; }
        else { aud.play(); ab.querySelector(".audio-play").textContent = "⏸️"; playing = true; }
      };
      let lt2;
      ab.addEventListener("pointerdown", () => { lt2 = setTimeout(() => showAudioActions(ab, content), 600); });
      ab.addEventListener("pointerup", () => clearTimeout(lt2));
      wrap.appendChild(ab);

    } else if (type === "album") {
      const b = document.createElement("div");
      b.className = "bubble";
      const grid = document.createElement("div");
      grid.className = "album-grid";
      const imgs = content.images;
      imgs.slice(0, 4).forEach(src => {
        const im = document.createElement("img");
        im.src = src;
        grid.appendChild(im);
      });
      if (imgs.length > 4) {
        const more = document.createElement("div");
        more.className = "album-more";
        more.textContent = `+${imgs.length - 4}`;
        grid.appendChild(more);
      }
      grid.onclick = () => openAlbumOverlay(imgs);
      b.appendChild(grid);
      wrap.appendChild(b);
    }

    msgList.appendChild(wrap);
    scrollBottom();
  }

  function botReply(html, delay) {
    setTimeout(function() {
      const wrap = document.createElement("div");
      wrap.className = "bubble-wrap bot";
      const b = document.createElement("div");
      b.className = "bubble";
      b.innerHTML = html;
      wrap.appendChild(b);
      msgList.appendChild(wrap);
      scrollBottom();
    }, delay || 0);
  }

  function openImageOverlay(src) {
    const ov = makeOverlay();
    const hdr = document.createElement("div");
    hdr.className = "overlay-header";
    hdr.innerHTML = `<button class="ov-btn" id="dl-img">⬇️ تحميل</button>
      <button class="ov-btn">↗️ مشاركة</button>
      <button class="ov-btn" onclick="this.closest('.overlay').remove()">✖️ إغلاق</button>`;
    hdr.querySelector("#dl-img").onclick = () => { const a = document.createElement("a"); a.href = src; a.download = ""; a.click(); };
    const img = document.createElement("img");
    img.className = "ov-img";
    img.src = src;
    ov.appendChild(hdr);
    ov.appendChild(img);
    document.body.appendChild(ov);
  }

  function openFileOverlay(content) {
    const ov = makeOverlay();
    const hdr = document.createElement("div");
    hdr.className = "overlay-header";
    hdr.innerHTML = `<button class="ov-btn">⬇️ تحميل</button>
      <button class="ov-btn" id="copy-file-btn">📋 نسخ</button>
      <button class="ov-btn">↗️ مشاركة</button>
      <button class="ov-btn" onclick="this.closest('.overlay').remove()">✖️ إغلاق</button>`;
    const box = document.createElement("div");
    box.className = "ov-file-content";
    box.textContent = `[محتوى الملف: ${content.name}]\n\nاربط المسار الفعلي لعرض المحتوى.`;
    hdr.querySelector("#copy-file-btn").onclick = () => navigator.clipboard.writeText(box.textContent);
    ov.appendChild(hdr);
    ov.appendChild(box);
    document.body.appendChild(ov);
  }

  // ===== VIDEO OVERLAY مع seek قابل للسحب =====
  function openVideoOverlay(src, bubbleVid) {
    // إيقاف الـ bubble
    if (bubbleVid) { bubbleVid.pause(); }

    const ov = makeOverlay();
    let qIndex = Q_DEFAULT;
    let isPlaying = false;

    const ctrlTop = document.createElement("div");
    ctrlTop.className = "overlay-header";

    const vidWrap = document.createElement("div");
    vidWrap.className = "ov-video-wrap";

    const vid = document.createElement("video");
    vid.className = "ov-video";
    vid.src = src;
    vid.preload = "auto";
    vid.volume = 1;
    vid.style.filter = QUALITIES[qIndex].filter;

    const qualityLabel = document.createElement("div");
    qualityLabel.className = "ov-quality-label";
    qualityLabel.textContent = QUALITIES[qIndex].label;

    // شريط seek كبير مع وقت
    const seekbarWrap = document.createElement("div");
    seekbarWrap.className = "ov-seekbar-wrap";

    const timeRow = document.createElement("div");
    timeRow.className = "ov-time-row";
    const timeCurrent = document.createElement("span");
    timeCurrent.textContent = "0:00";
    const timeDuration = document.createElement("span");
    timeDuration.textContent = "0:00";
    timeRow.appendChild(timeCurrent);
    timeRow.appendChild(timeDuration);

    const track = document.createElement("div");
    track.className = "ov-progress-track";
    const fill = document.createElement("div");
    fill.className = "ov-progress-fill";
    const knob = document.createElement("div");
    knob.className = "ov-progress-knob";
    fill.appendChild(knob);
    track.appendChild(fill);

    seekbarWrap.appendChild(timeRow);
    seekbarWrap.appendChild(track);

    // سحب seek
    let dragging = false;
    function seekTo(e) {
      const rect = track.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      if (vid.duration) vid.currentTime = ratio * vid.duration;
      fill.style.width = (ratio * 100) + "%";
      timeCurrent.textContent = fmtTime(vid.currentTime);
    }
    track.addEventListener("mousedown",  (e) => { dragging = true; seekTo(e); e.stopPropagation(); });
    track.addEventListener("touchstart", (e) => { dragging = true; seekTo(e); e.stopPropagation(); }, { passive: true });
    window.addEventListener("mousemove",  (e) => { if (dragging) seekTo(e); });
    window.addEventListener("touchmove",  (e) => { if (dragging) seekTo(e); }, { passive: true });
    window.addEventListener("mouseup",  () => { dragging = false; });
    window.addEventListener("touchend", () => { dragging = false; });

    vid.addEventListener("loadedmetadata", () => {
      timeDuration.textContent = fmtTime(vid.duration);
    });
    vid.addEventListener("timeupdate", () => {
      if (!dragging && vid.duration) {
        const pct = (vid.currentTime / vid.duration * 100);
        fill.style.width = pct + "%";
        timeCurrent.textContent = fmtTime(vid.currentTime);
      }
    });

    // نقر الفيديو = تشغيل/إيقاف
    vid.addEventListener("click", () => {
      if (isPlaying) { vid.pause(); isPlaying = false; }
      else { vid.play().catch(() => {}); isPlaying = true; }
    });
    vid.addEventListener("ended", () => { isPlaying = false; });

    function applyQuality() {
      vid.style.filter = QUALITIES[qIndex].filter;
      qualityLabel.textContent = QUALITIES[qIndex].label;
    }

    // أزرار التحكم
    [
      ["⬇️ تحميل",   () => { const a = document.createElement("a"); a.href = src; a.download = ""; a.click(); }],
      ["↗️ مشاركة",  () => {}],
      ["⏪ 5ث",      () => { vid.currentTime = Math.max(0, vid.currentTime - 5); }],
      ["5ث ⏩",      () => { vid.currentTime = Math.min(vid.duration || 0, vid.currentTime + 5); }],
      ["⏩ +0.25x",  () => { vid.playbackRate = Math.min(vid.playbackRate + 0.25, 3); }],
      ["⏪ -0.25x",  () => { vid.playbackRate = Math.max(vid.playbackRate - 0.25, 0.25); }],
      ["🔄 عكس",     () => { vid.style.transform = vid.style.transform === "scaleX(-1)" ? "" : "scaleX(-1)"; }],
      ["🔊+",        () => { vid.volume = Math.min(vid.volume + 0.1, 1); }],
      ["🔉-",        () => { vid.volume = Math.max(vid.volume - 0.1, 0); }],
      ["📈 جودة+",   () => { if (qIndex < QUALITIES.length - 1) { qIndex++; applyQuality(); } }],
      ["📉 جودة-",   () => { if (qIndex > 0) { qIndex--; applyQuality(); } }],
      ["✖️ إغلاق",   () => { vid.pause(); ov.remove(); }],
    ].forEach(([label, fn]) => {
      const btn = document.createElement("button");
      btn.className = "ov-btn";
      btn.textContent = label;
      btn.onclick = fn;
      ctrlTop.appendChild(btn);
    });

    vidWrap.appendChild(vid);
    vidWrap.appendChild(qualityLabel);
    vidWrap.appendChild(seekbarWrap);

    ov.appendChild(ctrlTop);
    ov.appendChild(vidWrap);
    document.body.appendChild(ov);

    vid.play().then(() => { isPlaying = true; }).catch(() => {});
  }

  function showVideoActions(el, src, bubbleVid) {
    const ov = makeOverlay();
    ov.innerHTML = `<div class="overlay-header">
      <button class="ov-btn" id="va-open">▶️ فتح</button>
      <button class="ov-btn" id="va-del">🗑️ حذف</button>
      <button class="ov-btn" onclick="this.closest('.overlay').remove()">✖️ إلغاء</button>
    </div>`;
    ov.querySelector("#va-open").onclick = () => { ov.remove(); openVideoOverlay(src, bubbleVid); };
    ov.querySelector("#va-del").onclick   = () => { ov.remove(); el.closest(".bubble-wrap").remove(); };
    document.body.appendChild(ov);
  }

  function showAudioActions(el, content) {
    const ov = makeOverlay();
    const wrap = document.createElement("div");
    wrap.className = "ov-audio-wrap";
    wrap.innerHTML = `<div class="ov-audio-title">🎶 ${content.name}</div>
      <audio class="ov-audio" src="${content.path}" controls></audio>`;
    const hdr = document.createElement("div");
    hdr.className = "overlay-header";
    hdr.innerHTML = `<button class="ov-btn" id="au-del">🗑️ حذف</button>
      <button class="ov-btn" onclick="this.closest('.overlay').remove()">✖️ إغلاق</button>`;
    hdr.querySelector("#au-del").onclick = () => { ov.remove(); el.closest(".bubble-wrap").remove(); };
    ov.appendChild(hdr);
    ov.appendChild(wrap);
    document.body.appendChild(ov);
  }

  function openAlbumOverlay(imgs) {
    const ov = makeOverlay();
    const hdr = document.createElement("div");
    hdr.className = "overlay-header";
    hdr.innerHTML = `<button class="ov-btn">↗️ مشاركة</button>
      <button class="ov-btn" onclick="this.closest('.overlay').remove()">✖️ إغلاق</button>`;
    const grid = document.createElement("div");
    grid.className = "album-ov-grid";
    imgs.forEach(src => {
      const im = document.createElement("img");
      im.src = src;
      im.onclick = () => openImageOverlay(src);
      grid.appendChild(im);
    });
    ov.appendChild(hdr);
    ov.appendChild(grid);
    document.body.appendChild(ov);
  }

  function makeOverlay() {
    const ov = document.createElement("div");
    ov.className = "overlay";
    ov.addEventListener("click", e => { if (e.target === ov) ov.remove(); });
    return ov;
  }

  function openEditOverlay(initialText, onDone) {
    const ov = document.createElement("div");
    ov.className = "edit-overlay";
    const toolbar = document.createElement("div");
    toolbar.className = "edit-toolbar";
    const ta = document.createElement("textarea");
    ta.className = "edit-textarea";
    ta.value = initialText;
    const arrows = document.createElement("div");
    arrows.className = "edit-arrows";

    [
      ["🗑️ حذف",  () => { ta.setRangeText("", ta.selectionStart, ta.selectionEnd, "end"); }],
      ["↩️ تراجع",() => document.execCommand("undo")],
      ["↪️ تقدم", () => document.execCommand("redo")],
      ["📋 نسخ",  () => navigator.clipboard.writeText(ta.value)],
      ["✂️ قص",   () => { navigator.clipboard.writeText(ta.value.slice(ta.selectionStart, ta.selectionEnd)); ta.setRangeText("", ta.selectionStart, ta.selectionEnd, "end"); }],
      ["✅ تم",   () => { onDone(ta.value); ov.remove(); }],
      ["✖️ إغلاق",() => ov.remove()],
    ].forEach(([label, fn]) => {
      const b = document.createElement("button");
      b.className = "arr-btn"; b.textContent = label; b.onclick = fn;
      toolbar.appendChild(b);
    });

    [
      ["⬆️",      () => moveCaret(ta, "up")],
      ["⬇️",      () => moveCaret(ta, "down")],
      ["⬅️",      () => moveCaret(ta, "left")],
      ["➡️",      () => moveCaret(ta, "right")],
      ["⏫ أعلى", () => { ta.selectionStart = 0; ta.selectionEnd = 0; ta.focus(); }],
      ["↕️ وسط",  () => { const m = Math.floor(ta.value.length/2); ta.selectionStart = m; ta.selectionEnd = m; ta.focus(); }],
      ["⏬ أسفل", () => { ta.selectionStart = ta.value.length; ta.selectionEnd = ta.value.length; ta.focus(); }],
    ].forEach(([label, fn]) => {
      const b = document.createElement("button");
      b.className = "arr-btn"; b.textContent = label; b.onclick = fn;
      arrows.appendChild(b);
    });

    ov.appendChild(toolbar);
    ov.appendChild(ta);
    ov.appendChild(arrows);
    document.body.appendChild(ov);
    ta.focus();
  }

  function moveCaret(ta, dir) {
    const pos = ta.selectionStart;
    const val = ta.value;
    if      (dir === "left")  ta.selectionStart = ta.selectionEnd = Math.max(0, pos - 1);
    else if (dir === "right") ta.selectionStart = ta.selectionEnd = Math.min(val.length, pos + 1);
    else if (dir === "up")  { const b = val.lastIndexOf("\n", pos-1); ta.selectionStart = ta.selectionEnd = b >= 0 ? b : 0; }
    else if (dir === "down"){ const a = val.indexOf("\n", pos); ta.selectionStart = ta.selectionEnd = a >= 0 ? a+1 : val.length; }
    ta.focus();
  }

  editBtn.onclick = () => {
    openEditOverlay(msgInput.value, (edited) => {
      msgInput.value = edited;
      msgInput.dispatchEvent(new Event("input"));
    });
  };

  function sendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;
    addMsg("user", text);
    msgInput.value = "";
    msgInput.style.height = "44px";
    editBtn.style.display = "none";
    setTimeout(() => {
      let handled = ADMIN.handleMessage(text, addMsg);
      if (!handled && window.RD_MODULES && window.RD_MODULES.length > 0) {
        window.RD_MODULES.forEach(function(mod) {
          if (mod && typeof mod.handle === "function") {
            const result = mod.handle(text, botReply);
            if (result) handled = true;
          }
        });
      }
      if (!handled) addMsg("bot", ADMIN.chatResponses.default, "text");
    }, 400);
  }

  sendBtn.onclick = sendMessage;
  msgInput.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });

  setTimeout(() => addMsg("bot", ADMIN.getWelcome()), 700);
})();
