const ADMIN = {
  pass: "طائفة الظلام_666",
  awaitingPass: false,
  passVerified: false,

  pathFiles: [
    "/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/🔥 ملفـــــات التحكـــــــم 🔥/img.js",
    "/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/🔥 ملفـــــات التحكـــــــم 🔥/vid.js",
    "/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/🔥 ملفـــــات التحكـــــــم 🔥/oudio.js",
    "/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/🔥 ملفـــــات التحكـــــــم 🔥/files.js",
  ],

  chatFiles: [
    "/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/🔥 ملفـــــات التحكـــــــم 🔥/chat.js",
    "/storage/emulated/0/𝑇🔥𝐸🔥𝐼🔥𝑂/𝐻𝐴𝐶𝐾𝐸𝑅_📟/🔥💀👑 نضام البوتات 👑💀🔥/💬 شات 💬/welcom.js",
  ],

  paths: {
    images: {},
    videos: {},
    audio:  {},
    files:  {},
  },

  mediaCommands: [
    { cmd: "موقع الظلام",  label: "موقع الظلام",   type: "webpage", value: { name: "موقع الظلام",  path: "index.html" } },
    { cmd: "لوحة التحكم", label: "لوحة التحكم",  type: "webpage", value: { name: "لوحة التحكم", path: "dashboard.html" } },
    { cmd: "سكريبت",      label: "سكريبت JS",      type: "webpage", value: { name: "سكريبت",        path: "assets/script.js" } },
    { cmd: "رابط خارجي",  label: "رابط خارجي",    type: "webpage", value: { name: "موقع خارجي",   path: "https://example.com" } },
    { cmd: "جلجامشة",     label: "جلجامشة",        type: "image",   value: { name: "جلجامشة",      pathKey: "جلجامشة",        src: "images" } },
    { cmd: "صورة",         label: "خلفية رعد",      type: "image",   value: { name: "خلفية رعد",    pathKey: "خلفية_رعد",      src: "images" } },
    { cmd: "فيديو",        label: "فيديو المقدمة", type: "video",   value: { name: "مقدمة",         pathKey: "مقدمة",          src: "videos" } },
    { cmd: "ملف",          label: "ملاحظات",         type: "file",    value: { name: "ملاحظات.txt",  pathKey: "ملاحظات",        src: "files" } },
    { cmd: "صوت",          label: "موسيقى البوت",  type: "audio",   value: { name: "موسيقى البوت", pathKey: "موسيقى_البوت",   src: "audio" } },
    { cmd: "البوم",        label: "ألبوم الظلام",  type: "album",   value: { name: "ألبوم الظلام", images: ["assets/bg_thunder.jpg","assets/logo.png","assets/dark1.gif"] } },
    { cmd: "تطبيق",        label: "تطبيق.apk",      type: "file",    value: { name: "تطبيق.apk",    pathKey: "تطبيق",          src: "files" } },
    { cmd: "برنامج",       label: "برنامج.zip",     type: "file",    value: { name: "برنامج.zip",   pathKey: "برنامج",         src: "files" } },
    { cmd: "رعد_صوت",      label: "صوت الرعد",      type: "audio",   value: { name: "صوت رعد",      pathKey: "صوت_الرعد",      src: "audio" } },
    { cmd: "عرض",          label: "فيديو العرض",   type: "video",   value: { name: "عرض",           pathKey: "عرض",            src: "videos" } },
    { cmd: "شعار",         label: "شعار البوت",     type: "image",   value: { name: "شعار البوت",   pathKey: "شعار_البوت",     src: "images" } },
    { cmd: "كود",          label: "ملف كود.py",     type: "file",    value: { name: "كود.py",        pathKey: "كود_py",         src: "files" } },
  ],

  PAGE_SIZE: 5,
  menuPage: 0,
  awaitingMenuChoice: false,

  chatCommands: {},

  normalize(str) {
    return str.trim().normalize("NFC").replace(/\s+/g, " ");
  },

  resolvePath(path) {
    if (!path) return path;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    if (path.startsWith("/")) return path;
    if (path.startsWith("file://")) return path;
    return path;
  },

  resolveItem(item) {
    if (!item || !item.value) return item;
    if (item.value.images) return { ...item, value: { ...item.value } };
    if (item.value.pathKey) {
      const raw = this.paths[item.value.src][item.value.pathKey] || "";
      return { ...item, value: { name: item.value.name, path: this.resolvePath(raw) } };
    }
    if (item.value.path) return { ...item, value: { ...item.value, path: this.resolvePath(item.value.path) } };
    return item;
  },

  loadScript(src, onload) {
    if (!src || src.trim() === "") return;
    const s = document.createElement("script");
    s.src = src;
    s.onerror = () => console.warn("فشل تحميل:", src);
    if (onload) s.onload = onload;
    document.head.appendChild(s);
  },

  loadPathFiles() {
    this.pathFiles.forEach(path => {
      this.loadScript(path, () => {
        if (window._PATHS_IMAGES) { Object.assign(this.paths.images, window._PATHS_IMAGES); window._PATHS_IMAGES = null; }
        if (window._PATHS_VIDEOS) { Object.assign(this.paths.videos, window._PATHS_VIDEOS); window._PATHS_VIDEOS = null; }
        if (window._PATHS_AUDIO)  { Object.assign(this.paths.audio,  window._PATHS_AUDIO);  window._PATHS_AUDIO  = null; }
        if (window._PATHS_FILES)  { Object.assign(this.paths.files,  window._PATHS_FILES);  window._PATHS_FILES  = null; }
      });
    });
  },

  loadChatFiles() {
    this.chatFiles.forEach(path => {
      this.loadScript(path, () => {
        if (window._CHAT_DATA) {
          Object.keys(window._CHAT_DATA).forEach(key => {
            const nk = this.normalize(key);
            if (!this.chatCommands[nk]) this.chatCommands[nk] = [];
            this.chatCommands[nk] = this.chatCommands[nk].concat(window._CHAT_DATA[key]);
          });
          window._CHAT_DATA = null;
        }
      });
    });
  },

  chatResponses: {
    welcome: "مرحباً بك في رعد الظلام ⚡ اكتب «اوامر» لعرض قائمة الأوامر.",
    default: "لم أفهم طلبك 🔴 اكتب «اوامر» لعرض قائمة الأوامر."
  },

  adminReplies: {
    admin: "مرحبا بك!",
    bot:   "كنت بإنتضارك!",
    SSS:   "لنبدء العمل!"
  },

  buildMenuText(page) {
    const start = page * this.PAGE_SIZE;
    const slice = this.mediaCommands.slice(start, start + this.PAGE_SIZE);
    const hasMore = (start + this.PAGE_SIZE) < this.mediaCommands.length;
    const lines = slice.map((c, i) => `${start + i + 1} 『${c.label}』`).join("\n");
    const moreHint = hasMore ? `\nلعرض المزيد من الأوامر عليك بكتابة اوامر ${page + 2} ✅` : "";
    return (
`━━━━━━━━༻❖༺━━━━━━━━

⚜️ قائمـــــــــــة الأوامــــــــــــر ⚜️

${lines}${moreHint}

🥂 ↓التوقيع↓ 🥂
👑 الإمبراطور شادو 👑

━━━━━━━━༻❖༺━━━━━━━━`
    );
  },

  sendAll(items, addMsg) {
    items.forEach((item, i) => {
      const resolved = this.resolveItem(item);
      setTimeout(() => addMsg("bot", resolved.value, resolved.type), i * 120);
    });
  },

  handleMessage(text, addMsg) {
    const t = this.normalize(text);

    if (this.awaitingPass) {
      this.awaitingPass = false;
      if (t === this.pass) {
        this.passVerified = true;
        addMsg("bot", "✅ تم التحقق! اختر أحد الأوامر:", "admin-choice");
      } else {
        addMsg("bot", "اخطأت ❌");
      }
      return true;
    }

    if (t === "اجلبلي") {
      this.awaitingPass = true;
      addMsg("bot", "🔐 أدخل كلمة سر المطور:");
      return true;
    }

    if (this.passVerified && ["admin", "bot", "SSS"].includes(t)) {
      this.passVerified = false;
      addMsg("bot", this.adminReplies[t] || this.chatResponses.default);
      return true;
    }

    const menuMatch = t.match(/^اوامر\s*(\d*)$/);
    if (menuMatch) {
      const page = menuMatch[1] ? parseInt(menuMatch[1]) - 1 : 0;
      this.menuPage = Math.max(0, page);
      this.awaitingMenuChoice = true;
      addMsg("bot", this.buildMenuText(this.menuPage));
      return true;
    }

    if (this.awaitingMenuChoice) {
      const num = parseInt(t);
      if (!isNaN(num) && num >= 1 && num <= this.mediaCommands.length) {
        this.awaitingMenuChoice = false;
        this.sendAll([this.mediaCommands[num - 1]], addMsg);
        return true;
      }
    }

    const allItems = [
      ...this.mediaCommands.filter(c => this.normalize(c.cmd) === t),
      ...(this.chatCommands[t] || [])
    ];

    if (allItems.length > 0) {
      this.awaitingMenuChoice = false;
      this.sendAll(allItems, addMsg);
      return true;
    }

    return false;
  },

  getWelcome() {
    return this.chatResponses.welcome;
  }
};

ADMIN.loadPathFiles();
ADMIN.loadChatFiles();
