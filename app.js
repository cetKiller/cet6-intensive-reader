const PAPERS = window.CET6_DATA || [];
const CURATED = window.CET6_CURATED || {};
const TRANSLATIONS = window.CET6_TRANSLATIONS || {};
const ANNOTATIONS = window.CET6_ANNOTATIONS || {};
const LONG_SENTENCES = window.CET6_LONG_SENTENCES || {};

const LEXICON = {
  academic: {
    word: "academic",
    phonetic: "/ˌækəˈdemɪk/",
    pos: "adj.",
    zh: "学术的；学业方面的",
    collocation: "academic achievement / academic progress",
    note: "在本文中修饰 achievement，指学生的学业成绩。",
    forms: ["academic", "academically"]
  },
  achievement: {
    word: "achievement",
    phonetic: "/əˈtʃiːvmənt/",
    pos: "n.",
    zh: "成就；成绩",
    collocation: "academic achievement / a sense of achievement",
    note: "不可数与可数用法都常见；本文指学业表现。",
    forms: ["achievement", "achievements"]
  },
  absence: {
    word: "absence",
    phonetic: "/ˈæbsəns/",
    pos: "n.",
    zh: "缺席；不在场",
    collocation: "absence from school / in the absence of",
    note: "in the absence of 表示“在没有……的情况下”。",
    forms: ["absence", "absences", "absent"]
  },
  attendance: {
    word: "attendance",
    phonetic: "/əˈtendəns/",
    pos: "n.",
    zh: "出勤；到场人数",
    collocation: "school attendance / attendance policy",
    note: "attendance 既可以是“出勤行为”，也可以指“出席人数”。",
    forms: ["attendance", "attend", "attends", "attended"]
  },
  chronically: {
    word: "chronically",
    phonetic: "/ˈkrɒnɪkli/",
    pos: "adv.",
    zh: "长期地；慢性地",
    collocation: "chronically absent / chronically ill",
    note: "chronic 强调问题持续时间长，而不是某一次偶尔发生。",
    forms: ["chronic", "chronically"]
  },
  crisis: {
    word: "crisis",
    phonetic: "/ˈkraɪsɪs/",
    pos: "n.",
    zh: "危机；紧要关头",
    collocation: "attendance crisis / economic crisis",
    note: "复数是 crises，拼写和发音都要变化。",
    forms: ["crisis", "crises"]
  },
  instruction: {
    word: "instruction",
    phonetic: "/ɪnˈstrʌkʃn/",
    pos: "n.",
    zh: "教学；指导；指示",
    collocation: "classroom instruction / follow instructions",
    note: "本文取“课堂教学”之意，不是“说明书”。",
    forms: ["instruction", "instructions", "instruct"]
  },
  unexcused: {
    word: "unexcused",
    phonetic: "/ˌʌnɪkˈskjuːzd/",
    pos: "adj.",
    zh: "未经允许的；无故的",
    collocation: "unexcused absence / unexcused lateness",
    note: "excuse 作动词时表示“允许离开、为……辩解”。",
    forms: ["unexcused", "excused", "excuse", "excuses"]
  },
  reflection: {
    word: "reflection",
    phonetic: "/rɪˈflekʃn/",
    pos: "n.",
    zh: "反映；映像；思考",
    collocation: "a reflection of / on reflection",
    note: "a reflection of 表示“某事物的反映或体现”。",
    forms: ["reflection", "reflections", "reflect"]
  },
  eject: {
    word: "eject",
    phonetic: "/ɪˈdʒekt/",
    pos: "v.",
    zh: "驱逐；弹出",
    collocation: "be ejected from",
    note: "被赶出住所时常用被动形式 be ejected from。",
    forms: ["eject", "ejected", "ejecting"]
  },
  peer: {
    word: "peer",
    phonetic: "/pɪə(r)/",
    pos: "n.",
    zh: "同龄人；同辈",
    collocation: "peer group / peers with none",
    note: "peer pressure 是“同辈压力”。",
    forms: ["peer", "peers"]
  },
  signal: {
    word: "signal",
    phonetic: "/ˈsɪɡnəl/",
    pos: "n. / v.",
    zh: "信号；表明",
    collocation: "a strong signal of / signal a change",
    note: "本文反复用 signal 建立“缺课是危机信号”的核心论点。",
    forms: ["signal", "signals", "signaled", "signalling"]
  },
  intervene: {
    word: "intervene",
    phonetic: "/ˌɪntəˈviːn/",
    pos: "v.",
    zh: "干预；介入",
    collocation: "intervene effectively / intervene in",
    note: "名词形式 intervention 在政策类文章中很常见。",
    forms: ["intervene", "intervenes", "intervened", "intervention"]
  },
  disproportionately: {
    word: "disproportionately",
    phonetic: "/ˌdɪsprəˈpɔːʃənətli/",
    pos: "adv.",
    zh: "不成比例地；过分地",
    collocation: "disproportionately affect / disproportionately punish",
    note: "常用来指出政策或风险对某一群体的影响明显失衡。",
    forms: ["disproportionate", "disproportionately"]
  },
  channel: {
    word: "channel",
    phonetic: "/ˈtʃænl/",
    pos: "v. / n.",
    zh: "引导；输送；渠道",
    collocation: "channel resources to / through official channels",
    note: "作动词时强调把资源、精力有方向地投入。",
    forms: ["channel", "channels", "channelled", "channeled"]
  },
  hardship: {
    word: "hardship",
    phonetic: "/ˈhɑːdʃɪp/",
    pos: "n.",
    zh: "艰难；困苦",
    collocation: "economic hardship / face hardship",
    note: "既可作可数名词，也可作不可数名词。",
    forms: ["hardship", "hardships"]
  },
  policy: {
    word: "policy",
    phonetic: "/ˈpɒləsi/",
    pos: "n.",
    zh: "政策；方针",
    collocation: "education policy / attendance policy",
    note: "复数形式是 policies。",
    forms: ["policy", "policies"]
  },
  deplore: {
    word: "deplore",
    phonetic: "/dɪˈplɔː(r)/",
    pos: "v.",
    zh: "强烈谴责；对……深感遗憾",
    collocation: "deplore the loss / deplore the situation",
    note: "语气比 regret 更强，常见于正式评论。",
    forms: ["deplore", "deplored", "deplores"]
  },
  urge: {
    word: "urge",
    phonetic: "/ɜːdʒ/",
    pos: "v. / n.",
    zh: "敦促；强烈愿望",
    collocation: "urge sb. to do sth. / a strong urge to",
    note: "urge 后面接宾语和不定式，或接 that 从句。",
    forms: ["urge", "urged", "urges", "urging"]
  },
  attribute: {
    word: "attribute",
    phonetic: "/əˈtrɪbjuːt/",
    pos: "v.",
    zh: "把……归因于；归咎于",
    collocation: "attribute A to B / be attributed to",
    note: "阅读题常用 attribute A to B 表达因果关系。",
    forms: ["attribute", "attributed", "attributes"]
  },
  ensure: {
    word: "ensure",
    phonetic: "/ɪnˈʃʊə(r)/",
    pos: "v.",
    zh: "确保；保证",
    collocation: "ensure success / ensure that",
    note: "ensure 后常接 that 从句，强调确保结果发生。",
    forms: ["ensure", "ensures", "ensured", "ensuring"]
  },
  sustain: {
    word: "sustain",
    phonetic: "/səˈsteɪn/",
    pos: "v.",
    zh: "维持；支撑；遭受",
    collocation: "sustain a habit / sustainable",
    note: "阅读中 also sustain 可表示“维持某种状态”。",
    forms: ["sustain", "sustains", "sustained", "sustaining"]
  },
  evidence: {
    word: "evidence",
    phonetic: "/ˈevɪdəns/",
    pos: "n.",
    zh: "证据；迹象",
    collocation: "evidence suggests / provide evidence",
    note: "不可数名词；一条证据说 a piece of evidence。",
    forms: ["evidence"]
  },
  matter: {
    word: "matter",
    phonetic: "/ˈmætə(r)/",
    pos: "v. / n.",
    zh: "重要；事情；问题",
    collocation: "it matters / a matter of",
    note: "本文的 matters 是动词，意为“重要、有关系”。",
    forms: ["matter", "matters", "mattered", "mattering"]
  },
  assume: {
    word: "assume",
    phonetic: "/əˈsjuːm/",
    pos: "v.",
    zh: "假定；认为；承担",
    collocation: "assume that / assumption",
    note: "本文用 assume 点出政策背后的未经检验的前提。",
    forms: ["assume", "assumes", "assumed", "assuming", "assumption"]
  }
};

const FORM_INDEX = Object.entries(LEXICON).reduce((index, [key, entry]) => {
  for (const form of entry.forms || [key]) index[form.toLowerCase()] = key;
  return index;
}, {});

const SECTION_LABELS = {
  cloze: "选词填空",
  matching: "段落匹配",
  detailed: "仔细阅读"
};

const CIRCLED_NUMBERS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"];

const LONG_CONNECTORS = [
  "although",
  "though",
  "while",
  "whereas",
  "because",
  "since",
  "unless",
  "despite",
  "however",
  "therefore",
  "which",
  "that",
  "who",
  "whose",
  "when",
  "if"
];

const storage = {
  progress: readStorage("cet6-progress", {}),
  last: readStorage("cet6-last", null),
  words: readStorage("cet6-words", []),
  notes: readStorage("cet6-notes", {}),
  blanks: readStorage("cet6-blanks", {}),
  matches: readStorage("cet6-matches", {})
};

const state = {
  year: "all",
  query: "",
  translationVisible: true,
  focusMode: false,
  fontScale: 1,
  selectedSentence: null,
  activeGloss: null,
  activeBlank: null,
  questionsOpen: false,
  dockOpen: false,
  dockTab: "long",
  longSentenceKey: null,
  currentRouteKey: "",
  route: null
};

const app = document.getElementById("app");

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value = "") {
  return escapeHTML(value).replaceAll("`", "&#096;");
}

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeDisplayText(value = "") {
  return value
    .replace(/\s+([’'])/g, "$1")
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/\bout -of\b/g, "out-of")
    .replace(/\bsch ool\b/g, "school")
    .replace(/\borgani zation\b/g, "organization")
    .replace(/\babsen ces\b/g, "absences")
    .replace(/\bcomp elling\b/g, "compelling")
    .replace(/\beffic iency\b/g, "efficiency")
    .replace(/\blibra ry\b/g, "library")
    .replace(/\bpetroleum -based\b/g, "petroleum-based")
    .replace(/\bout -of-school\b/g, "out-of-school")
    .replace(/\bwaswithin\b/g, "was within")
    .replace(/\s+/g, " ")
    .trim();
}

function splitSentences(value) {
  const normalized = normalizeDisplayText(value);
  const protectedText = normalized
    .replaceAll("Mr.", "Mr<DOT>")
    .replaceAll("Mrs.", "Mrs<DOT>")
    .replaceAll("Dr.", "Dr<DOT>");
  return protectedText
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"'“])/)
    .map((sentence) => sentence.replaceAll("<DOT>", ".").trim())
    .filter(Boolean);
}

function getPaper(paperId) {
  return PAPERS.find((paper) => paper.id === paperId);
}

function getPassage(paper, passageId) {
  return paper?.passages.find((passage) => passage.id === passageId);
}

function curatedKey(paperId, passageId) {
  return `${paperId}:${passageId}`;
}

function getCurated(paperId, passageId) {
  return CURATED[curatedKey(paperId, passageId)] || null;
}

function getPassageTranslations(paperId, passageId) {
  const manual = getCurated(paperId, passageId)?.translations;
  if (manual) return manual;
  return TRANSLATIONS[curatedKey(paperId, passageId)] || null;
}

function getPassageAnnotations(paperId, passageId) {
  const manual = getCurated(paperId, passageId)?.glosses;
  if (manual) return manual;
  return ANNOTATIONS[curatedKey(paperId, passageId)] || [];
}

function getPassageLongSentences(paperId, passageId) {
  const manual = getCurated(paperId, passageId)?.longSentences;
  if (manual) return manual;
  return LONG_SENTENCES[curatedKey(paperId, passageId)] || [];
}

function getPaperDate(paper) {
  return `${paper.year} 年 ${paper.month} 月`;
}

function getProgress(paper) {
  const paperProgress = storage.progress[paper.id] || {};
  const done = paper.passages.filter((passage) => paperProgress[passage.id]?.visited).length;
  return {
    done,
    total: paper.passages.length,
    percent: Math.round((done / Math.max(paper.passages.length, 1)) * 100)
  };
}

function getOverallProgress() {
  const total = PAPERS.reduce((sum, paper) => sum + paper.passages.length, 0);
  const done = PAPERS.reduce((sum, paper) => sum + getProgress(paper).done, 0);
  return { done, total, percent: Math.round((done / Math.max(total, 1)) * 100) };
}

function getSectionPassages(paper, type) {
  return paper.passages.filter((passage) => passage.type === type);
}

function getLastTarget() {
  const lastPaper = getPaper(storage.last?.paperId);
  const lastPassage = getPassage(lastPaper, storage.last?.passageId);
  if (lastPaper && lastPassage) {
    return { paper: lastPaper, passage: lastPassage, curated: getCurated(lastPaper.id, lastPassage.id) };
  }
  const firstCuratedKey = Object.keys(CURATED)[0];
  if (firstCuratedKey) {
    const [paperId, passageId] = firstCuratedKey.split(":");
    const paper = getPaper(paperId);
    const passage = getPassage(paper, passageId);
    if (paper && passage) return { paper, passage, curated: getCurated(paperId, passageId) };
  }
  const paper = PAPERS[0];
  return { paper, passage: paper?.passages[0], curated: null };
}

function parseRoute() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [view = "library", paperId, passageId] = raw.split("/");
  if (view === "paper" && getPaper(paperId)) return { view, paperId };
  if (view === "reader") {
    const paper = getPaper(paperId);
    const passage = getPassage(paper, passageId);
    if (paper && passage) return { view, paperId, passageId };
  }
  if (view === "notebook") return { view };
  return { view: "library" };
}

function routeTo(target) {
  window.location.hash = `#/${target}`;
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return "尚未开始";
  const distance = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.round(distance / 60000);
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes} 分钟前`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} 小时前`;
  return `${Math.round(hours / 24)} 天前`;
}

function icon(name, size = 18) {
  return `<i data-lucide="${name}" width="${size}" height="${size}" aria-hidden="true"></i>`;
}

function render() {
  const nextRoute = parseRoute();
  const nextRouteKey = window.location.hash || "#/library";
  const sameRoute = state.currentRouteKey === nextRouteKey;
  const enteringDifferentReader =
    nextRoute.view === "reader" && state.currentRouteKey.startsWith("#/reader/") && !sameRoute;
  const previousScroll = sameRoute ? window.scrollY : 0;

  if (enteringDifferentReader) {
    state.questionsOpen = false;
    state.dockOpen = false;
    state.longSentenceKey = null;
  }
  state.route = nextRoute;

  if (nextRoute.view === "reader") {
    const paper = getPaper(nextRoute.paperId);
    const passage = getPassage(paper, nextRoute.passageId);
    if (!passage) {
      window.location.hash = "#/library";
      return;
    }
    markVisited(paper.id, passage.id);
    state.activeGloss = sameRoute ? state.activeGloss : null;
    state.selectedSentence = sameRoute ? state.selectedSentence : null;
    state.activeBlank = sameRoute ? state.activeBlank : null;
    app.innerHTML = renderReader(paper, passage);
    document.body.dataset.view = "reader";
  } else if (nextRoute.view === "paper") {
    const paper = getPaper(nextRoute.paperId);
    app.innerHTML = renderAppShell(renderPaper(paper), "library");
    document.body.dataset.view = "app";
  } else if (nextRoute.view === "notebook") {
    app.innerHTML = renderAppShell(renderNotebook(), "notebook");
    document.body.dataset.view = "app";
  } else {
    app.innerHTML = renderAppShell(renderLibrary(), "library");
    document.body.dataset.view = "app";
  }

  state.currentRouteKey = nextRouteKey;
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  requestAnimationFrame(() => {
    window.scrollTo({ top: previousScroll, behavior: "instant" });
  });
}

function markVisited(paperId, passageId) {
  storage.progress[paperId] ||= {};
  const existing = storage.progress[paperId][passageId] || {};
  storage.progress[paperId][passageId] = {
    ...existing,
    visited: true,
    updatedAt: existing.updatedAt || new Date().toISOString()
  };
  storage.last = { paperId, passageId, updatedAt: new Date().toISOString() };
  writeStorage("cet6-progress", storage.progress);
  writeStorage("cet6-last", storage.last);
}

function renderAppShell(content, activeNav) {
  return `
    <div class="app-shell">
      ${renderSidebar(activeNav)}
      <main class="app-main">${content}</main>
      ${renderMobileNav(activeNav)}
    </div>
  `;
}

function renderSidebar(activeNav) {
  const overall = getOverallProgress();
  return `
    <aside class="sidebar">
      <a class="brand" href="#/library" aria-label="返回精读书架">
        <span class="brand-mark">C6</span>
        <span class="brand-copy">
          <strong>精读</strong>
          <small>CET-6 READER</small>
        </span>
      </a>
      <nav class="main-nav" aria-label="主导航">
        <a class="nav-item ${activeNav === "library" ? "active" : ""}" href="#/library">
          ${icon("library")}
          <span>精读书架</span>
        </a>
        <a class="nav-item ${activeNav === "notebook" ? "active" : ""}" href="#/notebook">
          ${icon("notebook-pen")}
          <span>学习笔记</span>
          <span class="nav-count">${storage.words.length + Object.keys(storage.notes).length}</span>
        </a>
      </nav>
      <div class="sidebar-spacer"></div>
      <div class="sidebar-progress">
        <div class="sidebar-progress-head">
          <span>精读进度</span>
          <strong>${overall.percent}%</strong>
        </div>
        <div class="progress-track"><span style="width:${overall.percent}%"></span></div>
        <p>${overall.done} / ${overall.total} 篇已打开</p>
      </div>
      <div class="sidebar-meta">
        <span>2024-2026</span>
        <span>15 套卷 · 60 篇</span>
      </div>
    </aside>
  `;
}

function renderMobileNav(activeNav) {
  return `
    <nav class="mobile-nav" aria-label="移动端导航">
      <a class="${activeNav === "library" ? "active" : ""}" href="#/library">
        ${icon("library", 20)}
        <span>书架</span>
      </a>
      <a class="${activeNav === "notebook" ? "active" : ""}" href="#/notebook">
        ${icon("notebook-pen", 20)}
        <span>笔记</span>
      </a>
    </nav>
  `;
}

function renderLibrary() {
  const target = getLastTarget();
  const overall = getOverallProgress();
  return `
    <header class="page-header library-header">
      <div>
        <p class="eyebrow">INTENSIVE READING WORKSPACE</p>
        <h1>精读书架</h1>
        <p class="page-intro">把每一篇六级阅读拆到句子、词块和篇章结构里。</p>
      </div>
      <div class="header-metrics" aria-label="阅读数据">
        <div><strong>${PAPERS.length}</strong><span>套卷</span></div>
        <div><strong>${overall.total}</strong><span>阅读篇目</span></div>
        <div><strong>${overall.done}</strong><span>已打开</span></div>
      </div>
    </header>

    <section class="continue-band">
      <div class="continue-copy">
        <span class="continue-label">${target.curated ? "精编样板" : storage.last ? "继续精读" : "开始精读"}</span>
        <h2>${escapeHTML(target.curated?.title || target.passage?.title || target.paper?.title)}</h2>
        <p>${escapeHTML(target.paper?.title || "")} · ${escapeHTML(target.passage?.label || "")}</p>
      </div>
      <button class="primary-button" data-action="open-passage" data-paper="${target.paper?.id}" data-passage="${target.passage?.id}">
        继续阅读
        ${icon("arrow-right", 18)}
      </button>
    </section>

    <section class="library-controls" aria-label="筛选套卷">
      <div class="segmented-control" role="group" aria-label="按年份筛选">
        ${renderYearButton("all", "全部", PAPERS.length)}
        ${renderYearButton("2024", "2024", PAPERS.filter((paper) => paper.year === 2024).length)}
        ${renderYearButton("2025", "2025", PAPERS.filter((paper) => paper.year === 2025).length)}
        ${renderYearButton("2026", "2026", PAPERS.filter((paper) => paper.year === 2026).length)}
      </div>
      <label class="search-field">
        ${icon("search", 18)}
        <input id="library-search" type="search" value="${escapeAttr(state.query)}" placeholder="搜索年份或套数" autocomplete="off" />
      </label>
    </section>

    <div id="paper-grid" class="paper-grid">
      ${renderPaperGrid()}
    </div>
  `;
}

function renderYearButton(value, label, count) {
  return `
    <button class="${state.year === value ? "active" : ""}" data-action="set-year" data-year="${value}">
      <span>${label}</span>
      <small>${count}</small>
    </button>
  `;
}

function filterPapers() {
  const normalizeSearch = (value) => value.toLowerCase().replace(/\s+/g, "");
  const query = normalizeSearch(state.query);
  return PAPERS.filter((paper) => {
    const yearMatch = state.year === "all" || String(paper.year) === state.year;
    const searchText = normalizeSearch(
      [paper.title, paper.shortTitle, paper.year, paper.month, paper.paperNo].join(" ")
    );
    const queryMatch =
      !query ||
      searchText.includes(query) ||
      normalizeSearch(paper.id).includes(query);
    return yearMatch && queryMatch;
  }).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    if (a.month !== b.month) return b.month - a.month;
    return a.paperNo - b.paperNo;
  });
}

function renderPaperGrid() {
  const papers = filterPapers();
  if (!papers.length) {
    return `
      <div class="empty-state full-grid">
        ${icon("search", 28)}
        <h3>没有找到对应套卷</h3>
        <p>换一个年份或缩短搜索词。</p>
      </div>
    `;
  }
  return papers
    .map((paper) => {
      const progress = getProgress(paper);
      const curatedCount = paper.passages.filter((passage) => getCurated(paper.id, passage.id)).length;
      return `
        <article class="paper-card" data-action="open-paper" data-paper="${paper.id}" tabindex="0">
          <div class="paper-card-top">
            <div>
              <span class="paper-date">${getPaperDate(paper)}</span>
              <h3>第 ${paper.paperNo} 套</h3>
            </div>
            ${curatedCount ? `<span class="status-badge curated">${icon("sparkles", 14)} 精编</span>` : `<span class="status-badge">${progress.done ? "已开始" : "未开始"}</span>`}
          </div>
          <div class="paper-sections">
            ${renderPaperSectionStatus(paper, "cloze")}
            ${renderPaperSectionStatus(paper, "matching")}
            ${renderPaperSectionStatus(paper, "detailed")}
          </div>
          <div class="paper-card-footer">
            <div class="paper-progress-copy">
              <span>${progress.done} / ${progress.total} 篇</span>
              <small>${progress.percent}%</small>
            </div>
            <div class="progress-track"><span style="width:${progress.percent}%"></span></div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPaperSectionStatus(paper, type) {
  const passages = getSectionPassages(paper, type);
  const done = passages.filter((passage) => storage.progress[paper.id]?.[passage.id]?.visited).length;
  return `
    <div class="paper-section-row">
      <span>${SECTION_LABELS[type]}</span>
      <small>${done}/${passages.length}</small>
      <i class="${done === passages.length ? "complete" : ""}"></i>
    </div>
  `;
}

function renderPaper(paper) {
  if (!paper) return "";
  const progress = getProgress(paper);
  return `
    <div class="page-content paper-page">
      <a class="back-link" href="#/library">${icon("arrow-left", 17)} 返回书架</a>
      <header class="paper-header">
        <div>
          <p class="eyebrow">${getPaperDate(paper)} · CET-6 READING</p>
          <h1>${paper.title}</h1>
          <p class="page-intro">三种题型，四条精读路径。原文来自所附 PDF，精编内容单独标记。</p>
        </div>
        <div class="paper-summary-card">
          <span>套卷进度</span>
          <strong>${progress.done}<small> / ${progress.total} 篇</small></strong>
          <div class="progress-track"><span style="width:${progress.percent}%"></span></div>
        </div>
      </header>

      <section class="paper-section-list">
        ${renderPaperSectionGroup(paper, "cloze")}
        ${renderPaperSectionGroup(paper, "matching")}
        ${renderPaperSectionGroup(paper, "detailed")}
      </section>
    </div>
  `;
}

function renderPaperSectionGroup(paper, type) {
  const passages = getSectionPassages(paper, type);
  return `
    <section class="paper-group">
      <div class="paper-group-heading">
        <div class="section-number">${type === "cloze" ? "A" : type === "matching" ? "B" : "C"}</div>
        <div>
          <h2>${SECTION_LABELS[type]}</h2>
          <p>${type === "cloze" ? "在语境中辨认词性与搭配" : type === "matching" ? "定位段落信息与篇章功能" : "逐句拆解论证与长难句"}</p>
        </div>
      </div>
      <div class="passage-list">
        ${passages.map((passage) => renderPassageRow(paper, passage)).join("")}
      </div>
    </section>
  `;
}

function renderPassageRow(paper, passage) {
  const curated = getCurated(paper.id, passage.id);
  const visited = storage.progress[paper.id]?.[passage.id]?.visited;
  const questionCount = passage.questions?.length || passage.statements?.length || passage.wordBank?.length || 0;
  return `
    <button class="passage-row" data-action="open-passage" data-paper="${paper.id}" data-passage="${passage.id}">
      <span class="passage-type-mark ${visited ? "visited" : ""}">${visited ? icon("check", 15) : icon("book-open", 16)}</span>
      <span class="passage-row-main">
        <strong>${escapeHTML(curated?.title || passage.title || passage.label)}</strong>
        <small>${passage.sentenceCount} 句 · ${questionCount} 项学习锚点 · 约 ${passage.estimatedMinutes} 分钟</small>
      </span>
      ${curated ? `<span class="status-badge curated">${icon("sparkles", 13)} 精编</span>` : ""}
      ${icon("chevron-right", 18)}
    </button>
  `;
}

function renderNotebook() {
  const notes = Object.values(storage.notes).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  const overall = getOverallProgress();
  return `
    <div class="page-content notebook-page">
      <header class="page-header">
        <div>
          <p class="eyebrow">PERSONAL READING NOTES</p>
          <h1>学习笔记</h1>
          <p class="page-intro">生词、句子批注和精读进度都保存在这台设备上。</p>
        </div>
        <div class="header-metrics compact">
          <div><strong>${storage.words.length}</strong><span>生词</span></div>
          <div><strong>${notes.length}</strong><span>笔记</span></div>
          <div><strong>${overall.done}</strong><span>已读篇目</span></div>
        </div>
      </header>

      <div class="notebook-grid">
        <section class="notebook-panel">
          <div class="panel-heading">
            <div>
              <span class="eyebrow">VOCABULARY</span>
              <h2>生词本</h2>
            </div>
            <span class="count-pill">${storage.words.length}</span>
          </div>
          ${
            storage.words.length
              ? `<div class="saved-word-list">${storage.words.map(renderSavedWord).join("")}</div>`
              : renderEmptyState("bookmark", "还没有保存生词", "在精读器中点击带虚线的重点词，即可加入这里。")
          }
        </section>

        <section class="notebook-panel">
          <div class="panel-heading">
            <div>
              <span class="eyebrow">ANNOTATIONS</span>
              <h2>句子笔记</h2>
            </div>
            <span class="count-pill">${notes.length}</span>
          </div>
          ${
            notes.length
              ? `<div class="note-list">${notes.map(renderSavedNote).join("")}</div>`
              : renderEmptyState("notebook-pen", "还没有句子笔记", "选中一句话，在底部分析坞记录语法、翻译或理解。")
          }
        </section>
      </div>
    </div>
  `;
}

function renderSavedWord(saved) {
  const entry = LEXICON[saved.key] || null;
  const typeLabel =
    saved.type === "phrase"
      ? "短语"
      : saved.type === "special"
        ? "熟词僻义"
        : entry?.pos || "重点词";
  return `
    <article class="saved-word">
      <div>
        <strong>${escapeHTML(entry?.word || saved.word)}</strong>
        <span>${escapeHTML(typeLabel)}</span>
        <p>${escapeHTML(entry?.zh || saved.zh || "")}</p>
      </div>
      <button class="icon-button" data-action="remove-word" data-word="${escapeAttr(saved.key)}" data-phrase="${escapeAttr(saved.word)}" title="移除生词" aria-label="移除 ${escapeAttr(saved.word)}">
        ${icon("trash-2", 16)}
      </button>
    </article>
  `;
}

function renderSavedNote(note) {
  const paper = getPaper(note.paperId);
  const passage = getPassage(paper, note.passageId);
  return `
    <article class="saved-note">
      <div class="saved-note-meta">
        <span>${escapeHTML(paper?.shortTitle || note.paperId)}</span>
        <span>${escapeHTML(passage?.label || note.passageId)}</span>
        <span>${escapeHTML(note.locator || "篇章")}</span>
      </div>
      <p>${escapeHTML(note.text)}</p>
      <div class="saved-note-footer">
        <small>${formatRelativeTime(note.updatedAt)}</small>
        <a href="#/reader/${note.paperId}/${note.passageId}">回到原文 ${icon("arrow-right", 14)}</a>
      </div>
    </article>
  `;
}

function renderEmptyState(iconName, title, copy) {
  return `
    <div class="empty-state">
      ${icon(iconName, 28)}
      <h3>${title}</h3>
      <p>${copy}</p>
    </div>
  `;
}

function renderReader(paper, passage) {
  const curated = getCurated(paper.id, passage.id);
  const hasTranslation = Boolean(getPassageTranslations(paper.id, passage.id));
  const fontScale = state.fontScale;
  return `
    <div class="reader-view ${state.focusMode ? "focus-on" : ""} ${hasTranslation ? "has-translation" : "no-translation"} ${state.translationVisible ? "" : "translations-hidden"}" style="--reader-scale:${fontScale}">
      ${renderReaderTopbar(paper, passage, hasTranslation)}
      <main class="reader-main">
        ${renderReadingContent(paper, passage, curated)}
      </main>
      ${renderQuestionsPanel(paper, passage)}
      ${renderWordPanel()}
      ${renderAnalysisDock(paper, passage, curated)}
      <div id="toast" class="toast" role="status" aria-live="polite"></div>
    </div>
  `;
}

function renderReaderTopbar(paper, passage, hasTranslation) {
  const sectionPassages = paper.passages;
  return `
    <header class="reader-topbar">
      <div class="reader-topbar-left">
        <a class="icon-button" href="#/paper/${paper.id}" title="返回套卷" aria-label="返回套卷">
          ${icon("arrow-left", 19)}
        </a>
        <div class="reader-title-mini">
          <strong>${paper.title}</strong>
          <span>${passage.label}</span>
        </div>
      </div>
      <div class="reader-passage-switcher" aria-label="切换阅读篇目">
        ${sectionPassages
          .map(
            (item) => `
              <a class="${item.id === passage.id ? "active" : ""}" href="#/reader/${paper.id}/${item.id}">
                ${escapeHTML(item.type === "detailed" ? item.passageName?.replace("Passage", "Passage") || item.label : item.label)}
              </a>
            `
          )
          .join("")}
      </div>
      <div class="reader-tools">
        <button class="tool-button ${state.translationVisible && hasTranslation ? "active" : ""} ${hasTranslation ? "" : "unavailable"}" data-action="toggle-translation" title="${hasTranslation ? (state.translationVisible ? "隐藏译文" : "显示译文") : "本篇精编译文待校对"}" aria-label="${hasTranslation ? (state.translationVisible ? "隐藏译文" : "显示译文") : "本篇精编译文待校对"}" aria-pressed="${hasTranslation && state.translationVisible ? "true" : "false"}">
          ${icon("languages", 18)}
          <span>${hasTranslation ? (state.translationVisible ? "隐藏译文" : "显示译文") : "译文待校对"}</span>
        </button>
        <button class="tool-button ${state.focusMode ? "active" : ""}" data-action="toggle-focus" title="聚焦当前句" aria-label="聚焦当前句">
          ${icon("focus", 18)}
        </button>
        <div class="font-tools" aria-label="字号">
          <button class="icon-button small" data-action="font-down" title="减小字号" aria-label="减小字号">${icon("minus", 15)}</button>
          <span>${Math.round(state.fontScale * 100)}%</span>
          <button class="icon-button small" data-action="font-up" title="增大字号" aria-label="增大字号">${icon("plus", 15)}</button>
        </div>
        <button class="tool-button ${state.questionsOpen ? "active" : ""}" data-action="toggle-questions" title="查看题目与线索" aria-label="查看题目与线索">
          ${icon("panel-right", 18)}
          <span>题目</span>
        </button>
        <button class="tool-button" data-action="open-dock" data-tab="notes" title="打开笔记" aria-label="打开笔记">
          ${icon("notebook-pen", 18)}
        </button>
      </div>
    </header>
  `;
}

function renderReadingContent(paper, passage, curated) {
  const translations = getPassageTranslations(paper.id, passage.id);
  const hasTranslation = Boolean(translations);
  const blankMap = storage.blanks[`${paper.id}:${passage.id}`] || {};
  const annotations = getPassageAnnotations(paper.id, passage.id);
  const wordCount = annotations.filter((item) => item.type !== "phrase" && !item.phrase.includes(" ")).length;
  const phraseCount = annotations.length - wordCount;
  const longSentenceCount = getPassageLongSentences(paper.id, passage.id).length;
  return `
    <article class="reading-article">
      <header class="reading-header">
        <div class="reading-header-copy">
          <div class="reading-kicker">
            <span>${escapeHTML(getPaperDate(paper))}</span>
            <span>${escapeHTML(passage.label)}</span>
            ${curated ? `<span class="curated-kicker">${icon("sparkles", 13)} 精编</span>` : ""}
          </div>
          <h1>${escapeHTML(curated?.title || passage.title || passage.passageName || passage.label)}</h1>
          ${curated?.intro ? `<p class="reading-deck">${escapeHTML(curated.intro)}</p>` : ""}
          <div class="reading-meta-row">
            <span>${icon("file-text", 15)} ${passage.sentenceCount} 句</span>
            <span>${icon("clock", 15)} 约 ${passage.estimatedMinutes} 分钟</span>
            <span>${icon("highlighter", 15)} ${annotations.length} 个重点标注</span>
          </div>
        </div>
        <aside class="reading-study-rail" aria-label="精读标记">
          <button data-action="open-dock" data-tab="words"><strong>${wordCount}</strong><span>单词</span></button>
          <button data-action="open-dock" data-tab="phrases"><strong>${phraseCount}</strong><span>短语</span></button>
          <button data-action="open-dock" data-tab="long"><strong>${longSentenceCount}</strong><span>长句</span></button>
        </aside>
      </header>

      ${!hasTranslation ? renderTranslationNotice() : ""}
      ${passage.type === "cloze" ? renderWordBank(passage, blankMap) : ""}
      ${
        passage.type === "matching"
          ? `<div class="reading-mode-note">${icon("layers", 17)} 段落已按 A-N 编号，右侧“题目”中可查看 10 条信息陈述。</div>`
          : ""
      }
      <div class="reading-columns ${hasTranslation ? "dual" : "single"} ${state.translationVisible ? "" : "translations-hidden"}">
        <div class="column-labels">
          <span>ENGLISH SOURCE</span>
          ${hasTranslation ? `<span>语境译文</span>` : `<span>精读辅助</span>`}
        </div>
        <div class="continuous-reading-grid ${hasTranslation ? "dual" : "single"}">
          <div class="source-flow">
            ${passage.paragraphs
              .map((paragraph, paragraphIndex) =>
                renderSourceParagraph(paper, passage, curated, paragraph, paragraphIndex, blankMap)
              )
              .join("")}
          </div>
          ${
            hasTranslation
              ? `<div class="translation-flow">
                  ${passage.paragraphs
                    .map((paragraph, paragraphIndex) =>
                      renderTranslationParagraph(paper, passage, translations, paragraph, paragraphIndex)
                    )
                    .join("")}
                </div>`
              : ""
          }
        </div>
      </div>
      ${renderArticleFooter(paper, passage, curated)}
    </article>
  `;
}

function renderTranslationNotice() {
  return `
    <div class="translation-notice">
      ${icon("circle-alert", 18)}
      <div>
        <strong>原文已接入，精编译文待校对</strong>
        <p>这一篇目前保留真实试卷原文、词库与题干。重点词仍可查看，长难句会先提供结构线索。</p>
      </div>
    </div>
  `;
}

function renderWordBank(passage, blankMap) {
  const assigned = Object.keys(blankMap).length;
  return `
    <section class="word-bank" aria-label="选词填空词库">
      <div class="word-bank-heading">
        <div>
          <span class="eyebrow">WORD BANK</span>
          <strong>词库</strong>
          <small>${assigned ? `已整理 ${assigned} 个空` : state.activeBlank ? `正在整理第 ${state.activeBlank} 空` : "点击空格，再选择词库中的词"}</small>
        </div>
        ${
          assigned
            ? `<button class="text-button" data-action="clear-blanks">${icon("rotate-ccw", 15)} 清空</button>`
            : ""
        }
      </div>
      <div class="word-bank-grid">
        ${(passage.wordBank || [])
          .map(
            (item) => `
              <button class="bank-word" data-action="pick-bank-word" data-letter="${item.letter}" data-word="${escapeAttr(item.word)}">
                <span>${item.letter}</span>
                ${escapeHTML(item.word)}
              </button>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderSourceParagraph(paper, passage, curated, paragraph, paragraphIndex, blankMap) {
  const rawText = typeof paragraph === "string" ? paragraph : paragraph.text;
  const letter = typeof paragraph === "object" ? paragraph.letter : "";
  const sentences = splitSentences(rawText);
  const label = letter || `P${paragraphIndex + 1}`;
  return `
    <section class="article-paragraph source-paragraph" data-paragraph="${paragraphIndex}">
      <span class="flow-paragraph-label">${escapeHTML(label)}</span>
      <p class="flow-copy source-flow-copy">
        ${sentences
          .map((sentence, sentenceIndex) =>
            renderSourceSentence(paper, passage, curated, sentence, paragraphIndex, sentenceIndex, blankMap)
          )
          .join(" ")}
      </p>
    </section>
  `;
}

function renderSourceSentence(paper, passage, curated, sentence, paragraphIndex, sentenceIndex, blankMap) {
  const key = `${paper.id}:${passage.id}:${paragraphIndex}:${sentenceIndex}`;
  const selected = state.selectedSentence === key;
  const longSentences = getPassageLongSentences(paper.id, passage.id);
  const curatedLong = longSentences.find(
    (item) => item.paragraph === paragraphIndex && item.sentence === sentenceIndex
  );
  const autoLong = !curatedLong && !longSentences.length && isLongSentence(sentence);
  const locator = `P${paragraphIndex + 1} · S${sentenceIndex + 1}`;
  return `
    <span class="source-sentence-inline ${selected ? "sentence-selected" : ""}" role="button" tabindex="0" data-action="select-sentence" data-key="${key}" data-paper="${paper.id}" data-passage="${passage.id}" data-paragraph="${paragraphIndex}" data-sentence="${sentenceIndex}" data-locator="${locator}" data-sentence-text="${escapeAttr(sentence)}">
      <span class="sentence-marker">${CIRCLED_NUMBERS[sentenceIndex] || sentenceIndex + 1}</span>
      ${renderAnnotatedText(sentence, paper, passage, paragraphIndex, sentenceIndex, blankMap)}
      ${
        curatedLong || autoLong
          ? `<button class="sentence-analysis-chip" data-action="open-long-sentence" data-key="${key}" data-curated="${curatedLong ? "true" : "false"}">${icon("network", 13)} ${curatedLong ? "长难句" : "长句"}</button>`
          : ""
      }
    </span>
  `;
}

function renderTranslationParagraph(paper, passage, translations, paragraph, paragraphIndex) {
  const letter = typeof paragraph === "object" ? paragraph.letter : "";
  const label = letter || `P${paragraphIndex + 1}`;
  const paragraphTranslations = translations?.[paragraphIndex] || [];
  return `
    <section class="article-paragraph translation-paragraph" data-paragraph="${paragraphIndex}">
      <span class="flow-paragraph-label">${escapeHTML(label)}</span>
      <p class="flow-copy translation-flow-copy">
        ${
          paragraphTranslations.length
            ? paragraphTranslations
                .map((translation, sentenceIndex) => {
                  const key = `${paper.id}:${passage.id}:${paragraphIndex}:${sentenceIndex}`;
                  const selected = state.selectedSentence === key;
                  return `<span class="translation-inline ${selected ? "sentence-selected" : ""}" role="button" tabindex="0" data-action="select-sentence" data-key="${key}" data-paper="${paper.id}" data-passage="${passage.id}" data-paragraph="${paragraphIndex}" data-sentence="${sentenceIndex}" data-locator="P${paragraphIndex + 1} · S${sentenceIndex + 1}"><span class="sentence-marker">${CIRCLED_NUMBERS[sentenceIndex] || sentenceIndex + 1}</span>${escapeHTML(translation)}</span>`;
                })
                .join(" ")
            : `<span class="translation-empty">本段译文待校对</span>`
        }
      </p>
    </section>
  `;
}

function renderAnnotatedText(text, paper, passage, paragraphIndex, sentenceIndex, blankMap) {
  const normalized = normalizeDisplayText(text);
  const annotations = getPassageAnnotations(paper.id, passage.id)
    .filter((item) => normalized.toLowerCase().includes(item.phrase.toLowerCase()))
    .sort((a, b) => b.phrase.length - a.phrase.length);
  const phrasePattern = annotations.length
    ? `(?<![A-Za-z])(?:${annotations.map((item) => escapeRegExp(item.phrase)).join("|")})(?![A-Za-z])`
    : "";
  const tokenPattern = new RegExp(
    `(${phrasePattern ? `${phrasePattern}|` : ""}_{2,}\\d+_{2,}|\\b[A-Za-z][A-Za-z'-]*\\b)`,
    "gi"
  );
  return normalized
    .split(tokenPattern)
    .map((token) => {
      if (!token) return "";
      const annotation = annotations.find((item) => item.phrase.toLowerCase() === token.toLowerCase());
      if (annotation) {
        const isPhrase = annotation.type === "phrase" || annotation.phrase.includes(" ");
        const isSpecial = annotation.type === "special";
        const title = annotation.note ? `${annotation.zh} · ${annotation.note}` : annotation.zh;
        const lexiconKey = FORM_INDEX[token.toLowerCase()];
        return `<ruby class="${isPhrase ? "phrase-token" : "word-token"} ${isSpecial ? "special-token" : ""}" role="button" tabindex="0" data-action="inspect-annotation" data-phrase="${escapeAttr(token)}" data-zh="${escapeAttr(annotation.zh)}" data-note="${escapeAttr(annotation.note || "")}" data-type="${escapeAttr(isPhrase ? "phrase" : isSpecial ? "special" : "word")}" data-lexicon="${escapeAttr(lexiconKey || "")}" data-paper="${paper.id}" data-passage="${passage.id}" data-paragraph="${paragraphIndex}" data-sentence="${sentenceIndex}" data-context="${escapeAttr(normalized)}" aria-label="${escapeAttr(`${token}，${annotation.zh}`)}" title="${escapeAttr(title)}"><span>${escapeHTML(token)}</span><rt>${escapeHTML(annotation.zh)}</rt></ruby>`;
      }
      const blankMatch = token.match(/^_{2,}(\d+)_{2,}$/);
      if (blankMatch) {
        const blankNumber = Number(blankMatch[1]);
        const assignment = blankMap[blankNumber];
        return `<button class="cloze-blank ${state.activeBlank === blankNumber ? "active" : ""}" data-action="select-blank" data-blank="${blankNumber}" aria-label="第 ${blankNumber} 空">${blankNumber}${assignment ? `<strong>${escapeHTML(assignment.letter)}</strong>` : ""}</button>`;
      }
      if (!/^[A-Za-z]/.test(token)) return escapeHTML(token);
      return escapeHTML(token);
    })
    .join("");
}

function renderArticleFooter(paper, passage, curated) {
  return `
    <footer class="article-footer">
      <div>
        <span class="eyebrow">READING NOTE</span>
        <h3>${curated ? "这一篇的精读重点" : "原文阅读提示"}</h3>
        <p>${
          curated
            ? "注意作者如何从“缺课造成学业损失”转向“缺课暴露家庭与社区危机”，并用 neither 同时推翻两层政策假设。"
            : "当前篇目已完成原文与题干拆分。可先用重点词和自动识别的结构连接词建立阅读骨架。"
        }</p>
      </div>
      <button class="secondary-button" data-action="open-dock" data-tab="structure">
        ${icon("list-tree", 17)}
        查看篇章结构
      </button>
    </footer>
  `;
}

function isLongSentence(sentence) {
  const wordCount = (sentence.match(/\b[A-Za-z][A-Za-z'-]*\b/g) || []).length;
  const connectorCount = LONG_CONNECTORS.filter((connector) =>
    new RegExp(`\\b${connector}\\b`, "i").test(sentence)
  ).length;
  return wordCount >= 34 || (wordCount >= 24 && connectorCount >= 2);
}

function detectConnectors(sentence) {
  return LONG_CONNECTORS.filter((connector) =>
    new RegExp(`\\b${connector}\\b`, "i").test(sentence)
  );
}

function renderQuestionsPanel(paper, passage) {
  if (!state.questionsOpen) return "";
  return `
    <div class="questions-backdrop" data-action="close-questions"></div>
    <aside class="questions-panel" aria-label="题目与线索">
      <header class="questions-heading">
        <div>
          <span class="eyebrow">SOURCE QUESTIONS</span>
          <h2>${passage.type === "matching" ? "信息陈述" : passage.type === "cloze" ? "空格清单" : "题目原文"}</h2>
        </div>
        <button class="icon-button" data-action="close-questions" title="关闭题目" aria-label="关闭题目">${icon("x", 19)}</button>
      </header>
      <div class="questions-content">
        ${passage.type === "detailed" ? renderDetailedQuestions(paper, passage) : ""}
        ${passage.type === "matching" ? renderMatchingStatements(paper, passage) : ""}
        ${passage.type === "cloze" ? renderClozeOverview(paper, passage) : ""}
      </div>
    </aside>
  `;
}

function renderDetailedQuestions(paper, passage) {
  const curated = getCurated(paper.id, passage.id);
  return `
    <p class="panel-helper">这里保留题目原文，不做答案判定。点击带定位标记的题目，可跳到精编证据句。</p>
    <div class="question-list">
      ${passage.questions
        .map((question) => {
          const evidence = curated?.questionEvidence?.[question.number];
          return `
            <article class="question-item ${evidence ? "has-evidence" : ""}" ${evidence ? `data-action="focus-evidence" data-paragraph="${evidence.paragraph}" data-sentence="${evidence.sentence}" data-key="${paper.id}:${passage.id}:${evidence.paragraph}:${evidence.sentence}"` : ""}>
              <div class="question-number">${question.number}</div>
              <p>${escapeHTML(question.prompt)}</p>
              <div class="choice-list">
                ${question.choices
                  .map(
                    (choice) => `
                      <div><span>${choice.letter}</span>${escapeHTML(choice.text)}</div>
                    `
                  )
                  .join("")}
              </div>
              ${evidence ? `<span class="evidence-link">${icon("scan-line", 14)} 定位原文</span>` : ""}
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderMatchingStatements(paper, passage) {
  return `
    <p class="panel-helper">用下拉菜单记录你定位到的段落。这是阅读草稿，不参与评分。</p>
    <div class="statement-list">
      ${(passage.statements || [])
        .map((statement) => {
          const storeKey = `${paper.id}:${passage.id}`;
          const current = storage.matches[storeKey]?.[statement.number] || "";
          return `
            <article class="statement-item">
              <div class="statement-top">
                <span class="question-number">${statement.number}</span>
                <p>${escapeHTML(statement.text)}</p>
              </div>
              <label class="match-select">
                <span>段落</span>
                <select data-match-select data-paper="${paper.id}" data-passage="${passage.id}" data-statement="${statement.number}">
                  <option value="">—</option>
                  ${(passage.paragraphs || [])
                    .map(
                      (paragraph) =>
                        `<option value="${paragraph.letter}" ${current === paragraph.letter ? "selected" : ""}>${paragraph.letter}</option>`
                    )
                    .join("")}
                </select>
              </label>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderClozeOverview(paper, passage) {
  const blankMap = storage.blanks[`${paper.id}:${passage.id}`] || {};
  return `
    <p class="panel-helper">空格整理会保存在本机。这里只辅助理解词性和搭配，不进行正误判定。</p>
    <div class="blank-overview">
      ${(passage.wordBank || [])
        .filter((item) => Object.values(blankMap).some((value) => value.letter === item.letter))
        .map((item) => {
          const number = Object.keys(blankMap).find((blank) => blankMap[blank].letter === item.letter);
          return `<div><span>${number}</span><strong>${item.letter}</strong>${escapeHTML(item.word)}</div>`;
        })
        .join("") || `<div class="blank-overview-empty">还没有整理空格。</div>`}
    </div>
  `;
}

function renderWordPanel() {
  if (!state.activeGloss) return "";
  const gloss = state.activeGloss;
  const lexiconKey = gloss.lexiconKey || FORM_INDEX[gloss.phrase.toLowerCase()];
  const entry = lexiconKey ? LEXICON[lexiconKey] : null;
  const saved = isGlossSaved(gloss);
  const typeLabel =
    gloss.type === "special"
      ? "熟词僻义"
      : gloss.type === "phrase" || gloss.phrase.includes(" ")
        ? "重点短语"
        : "六级重点词";
  return `
    <aside class="word-panel" aria-label="重点词解释">
      <div class="word-panel-top">
        <div class="word-panel-title">
          <span class="word-dot"></span>
          <strong>${escapeHTML(gloss.phrase)}</strong>
          <span class="word-form">${escapeHTML(typeLabel)}</span>
        </div>
        <button class="icon-button" data-action="close-word" title="关闭词卡" aria-label="关闭词卡">${icon("x", 18)}</button>
      </div>
      <div class="word-pronunciation">
        <span>${escapeHTML(entry?.phonetic || "")}</span>
        <span>${escapeHTML(entry?.pos || typeLabel)}</span>
      </div>
      <p class="word-meaning">${escapeHTML(gloss.zh || entry?.zh || "")}</p>
      <dl class="word-details">
        <div><dt>语境说明</dt><dd>${escapeHTML(gloss.note || entry?.note || "结合当前上下文理解")}</dd></div>
        <div><dt>常见搭配</dt><dd>${escapeHTML(entry?.collocation || "在原文语境中积累")}</dd></div>
      </dl>
      ${
        gloss.sentence
          ? `<blockquote>${escapeHTML(gloss.sentence)}</blockquote>`
          : ""
      }
      <button class="primary-button full-width" data-action="toggle-gloss-save">
        ${icon(saved ? "check" : "bookmark", 17)}
        ${saved ? "已加入生词本" : "加入生词本"}
      </button>
    </aside>
  `;
}

function renderAnalysisDock(paper, passage, curated) {
  if (!state.dockOpen) return "";
  const tabs = [
    ["long", "长难句", "network"],
    ["words", "词块", "highlighter"],
    ["phrases", "短语", "quote"],
    ["notes", "笔记", "notebook-pen"],
    ["structure", "篇章", "list-tree"]
  ];
  return `
    <section class="analysis-dock" aria-label="精读分析坞">
      <header class="dock-heading">
        <div class="dock-tabs">
          ${tabs
            .map(
              ([value, label, iconName]) => `
                <button class="${state.dockTab === value ? "active" : ""}" data-action="set-dock-tab" data-tab="${value}">
                  ${icon(iconName, 16)}
                  ${label}
                </button>
              `
            )
            .join("")}
        </div>
        <button class="icon-button" data-action="close-dock" title="关闭分析坞" aria-label="关闭分析坞">${icon("chevron-down", 19)}</button>
      </header>
      <div class="dock-content">
        ${state.dockTab === "long" ? renderLongSentenceTab(paper, passage, curated) : ""}
        ${state.dockTab === "words" ? renderWordsTab(paper, passage) : ""}
        ${state.dockTab === "phrases" ? renderPhrasesTab(paper, passage) : ""}
        ${state.dockTab === "notes" ? renderNotesTab(paper, passage) : ""}
        ${state.dockTab === "structure" ? renderStructureTab(passage, curated) : ""}
      </div>
    </section>
  `;
}

function renderLongSentenceTab(paper, passage, curated) {
  const longSentences = getPassageLongSentences(paper.id, passage.id);
  if (longSentences.length) {
    const activeKey =
      state.longSentenceKey ||
      `${paper.id}:${passage.id}:${longSentences[0].paragraph}:${longSentences[0].sentence}`;
    const active =
      longSentences.find(
        (item) => `${paper.id}:${passage.id}:${item.paragraph}:${item.sentence}` === activeKey
      ) || longSentences[0];
    return `
      <div class="long-layout">
        <div class="long-list">
          ${longSentences
            .map((item) => {
              const key = `${paper.id}:${passage.id}:${item.paragraph}:${item.sentence}`;
              return `
                <button class="${active === item ? "active" : ""}" data-action="choose-long-sentence" data-key="${key}" data-paragraph="${item.paragraph}" data-sentence="${item.sentence}">
                  <span>${escapeHTML(item.label)}</span>
                  <strong>${escapeHTML(item.preview)}</strong>
                </button>
              `;
            })
            .join("")}
        </div>
        <article class="long-detail">
          <span class="eyebrow">${escapeHTML(active.label)}</span>
          <h3>句子主干</h3>
          <p class="sentence-main">${escapeHTML(active.main)}</p>
          <h4>结构拆解</h4>
          <ul>${active.clauses.map((clause) => `<li>${escapeHTML(clause)}</li>`).join("")}</ul>
          <div class="reading-tip"><strong>阅读顺序</strong><p>${escapeHTML(active.reading)}</p></div>
        </article>
      </div>
    `;
  }

  const candidates = getLongSentenceCandidates(passage);
  if (!candidates.length) {
    return renderEmptyState("network", "暂未识别到长难句", "本篇文章句子结构相对直接，可先使用词块层精读。");
  }
  return `
    <div class="auto-long-list">
      <div class="auto-long-intro">
        ${icon("circle-alert", 17)}
        <p>以下是自动识别的结构复杂句。精编语法拆解待校对，当前只展示客观连接词线索。</p>
      </div>
      ${candidates
        .slice(0, 6)
        .map(
          (item) => `
            <article class="auto-long-item">
              <div class="auto-long-meta"><span>${escapeHTML(item.locator)}</span><small>${item.wordCount} 词</small></div>
              <p>${escapeHTML(item.sentence)}</p>
              <div class="connector-row">
                ${item.connectors.map((connector) => `<span>${escapeHTML(connector)}</span>`).join("")}
                <small>先定位连接词，再找主句谓语。</small>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function getLongSentenceCandidates(passage) {
  const candidates = [];
  passage.paragraphs.forEach((paragraph, paragraphIndex) => {
    const text = typeof paragraph === "string" ? paragraph : paragraph.text;
    splitSentences(text).forEach((sentence, sentenceIndex) => {
      if (!isLongSentence(sentence)) return;
      const connectors = detectConnectors(sentence);
      candidates.push({
        sentence,
        paragraph: paragraphIndex,
        sentenceIndex,
        locator: `P${paragraphIndex + 1} · S${sentenceIndex + 1}`,
        wordCount: (sentence.match(/\b[A-Za-z][A-Za-z'-]*\b/g) || []).length,
        connectors: connectors.length ? connectors : ["结构层次"]
      });
    });
  });
  return candidates;
}

function renderWordsTab(paper, passage) {
  const words = getPassageAnnotations(paper.id, passage.id).filter(
    (item) => item.type !== "phrase" && !item.phrase.includes(" ")
  );
  if (!words.length) return renderEmptyState("highlighter", "本篇暂无标注词", "可在阅读器中选中句子并记录自己的词块。");
  return `
    <div class="word-chip-list">
      ${words
        .map((item) => {
          const key = FORM_INDEX[item.phrase.toLowerCase()];
          const entry = key ? LEXICON[key] : null;
          const meta = entry?.pos || (item.type === "special" ? "熟词僻义" : item.note) || "重点词";
          const content = `
            <span>${escapeHTML(item.phrase)}</span>
            <small>${escapeHTML(meta)}</small>
            <p>${escapeHTML(item.zh)}</p>
          `;
          return `<button class="word-chip-card" data-action="inspect-annotation" data-phrase="${escapeAttr(item.phrase)}" data-zh="${escapeAttr(item.zh)}" data-note="${escapeAttr(item.note || "")}" data-type="${escapeAttr(item.type || "word")}" data-lexicon="${escapeAttr(key || "")}">${content}</button>`;
        })
        .join("")}
    </div>
  `;
}

function renderPhrasesTab(paper, passage) {
  const phrases = getPassageAnnotations(paper.id, passage.id).filter(
    (item) => item.type === "phrase" || item.phrase.includes(" ")
  );
  if (!phrases.length) {
    return renderEmptyState("quote", "本篇暂无短语标注", "可以先用行内重点词和长句结构线索精读。");
  }
  return `
    <div class="phrase-sheet">
      ${phrases
        .map(
          (item) => `
            <button class="phrase-sheet-item" data-action="inspect-annotation" data-phrase="${escapeAttr(item.phrase)}" data-zh="${escapeAttr(item.zh)}" data-note="${escapeAttr(item.note || "")}" data-type="phrase">
              <strong>${escapeHTML(item.phrase)}</strong>
              <span>${escapeHTML(item.zh)}</span>
              ${item.note ? `<small>${escapeHTML(item.note)}</small>` : ""}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderNotesTab(paper, passage) {
  const key = state.selectedSentence || `${paper.id}:${passage.id}:context`;
  const note = storage.notes[key];
  const locator = state.selectedSentence
    ? `${paper.title} · ${passage.label} · ${humanSentenceLocator(state.selectedSentence)}`
    : `${paper.title} · ${passage.label} · 整篇`;
  return `
    <div class="notes-layout">
      <div class="notes-context">
        <span class="eyebrow">CURRENT NOTE</span>
        <h3>${escapeHTML(locator)}</h3>
        <p>${state.selectedSentence ? "笔记会与当前句子关联，并出现在学习笔记页。" : "先在正文中点击一句话，可建立句子级笔记。"}</p>
      </div>
      <textarea class="note-editor" data-note-input data-key="${key}" data-paper="${paper.id}" data-passage="${passage.id}" data-locator="${escapeAttr(locator)}" placeholder="记录结构、翻译、指代或理解...">${escapeHTML(note?.text || "")}</textarea>
    </div>
  `;
}

function humanSentenceLocator(key) {
  const parts = key.split(":");
  return `P${Number(parts[2]) + 1} · S${Number(parts[3]) + 1}`;
}

function renderStructureTab(passage, curated) {
  if (curated?.structure?.length) {
    return `
      <div class="structure-map">
        ${curated.structure
          .map(
            (item, index) => `
              <article class="structure-node">
                <div class="structure-index">${String(index + 1).padStart(2, "0")}</div>
                <div>
                  <div class="structure-meta"><span>${escapeHTML(item.range)}</span><strong>${escapeHTML(item.label)}</strong></div>
                  <h3>${escapeHTML(item.title)}</h3>
                  <p>${escapeHTML(item.detail)}</p>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }
  return `
    <div class="auto-structure">
      <div class="auto-long-intro">
        ${icon("list-tree", 17)}
        <p>根据段落原文生成结构索引。精编篇章功能标签待校对。</p>
      </div>
      ${passage.paragraphs
        .map((paragraph, index) => {
          const text = typeof paragraph === "string" ? paragraph : paragraph.text;
          const label = typeof paragraph === "object" && paragraph.letter ? paragraph.letter : `P${index + 1}`;
          return `
            <article>
              <span>${escapeHTML(label)}</span>
              <p>${escapeHTML(text.slice(0, 150))}${text.length > 150 ? "..." : ""}</p>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function openLongSentence(key, curatedFlag) {
  state.longSentenceKey = key;
  state.dockOpen = true;
  state.dockTab = "long";
  if (key) {
    const [paperId, passageId, paragraph, sentence] = key.split(":");
    state.selectedSentence = `${paperId}:${passageId}:${paragraph}:${sentence}`;
  }
  render();
  showToast(curatedFlag ? "已打开长难句结构拆解" : "已打开自动识别的长句线索");
}

function focusEvidence(key, paragraph, sentence) {
  state.selectedSentence = key;
  state.questionsOpen = false;
  render();
  requestAnimationFrame(() => {
    const sentence = document.querySelector(`.source-sentence-inline[data-key="${CSS.escape(key)}"]`);
    sentence?.scrollIntoView({ behavior: "smooth", block: "center" });
    sentence?.classList.add("evidence-flash");
  });
}

function inspectAnnotation(source) {
  state.activeGloss = {
    phrase: source.dataset.phrase,
    zh: source.dataset.zh,
    note: source.dataset.note,
    type: source.dataset.type,
    lexiconKey: source.dataset.lexicon || FORM_INDEX[source.dataset.phrase.toLowerCase()] || "",
    sentence: source.dataset.context || source.closest(".source-sentence-inline")?.dataset.sentenceText || ""
  };
  render();
}

function glossSaveKey(gloss) {
  return gloss.lexiconKey || gloss.phrase.toLowerCase();
}

function isGlossSaved(gloss) {
  const phrase = gloss.phrase.toLowerCase();
  const key = glossSaveKey(gloss);
  return storage.words.some(
    (item) => item.key === key || String(item.word || "").toLowerCase() === phrase
  );
}

function toggleSavedGloss() {
  const gloss = state.activeGloss;
  if (!gloss) return;
  const phrase = gloss.phrase.toLowerCase();
  const key = glossSaveKey(gloss);
  const existingIndex = storage.words.findIndex(
    (item) => item.key === key || String(item.word || "").toLowerCase() === phrase
  );
  if (existingIndex >= 0) {
    storage.words.splice(existingIndex, 1);
  } else {
    const entry = gloss.lexiconKey ? LEXICON[gloss.lexiconKey] : null;
    storage.words.unshift({
      key,
      word: gloss.phrase,
      zh: gloss.zh || entry?.zh || "",
      note: gloss.note || entry?.note || "",
      type: gloss.type,
      savedAt: new Date().toISOString()
    });
  }
  writeStorage("cet6-words", storage.words);
  render();
  showToast(existingIndex >= 0 ? "已从生词本移除" : "已加入生词本");
}

function setSearchQuery(value) {
  state.query = value;
  const grid = document.getElementById("paper-grid");
  if (grid) {
    grid.innerHTML = renderPaperGrid();
    if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  }
}

function showToast(message) {
  const toast = document.getElementById("toast") || document.createElement("div");
  toast.id = "toast";
  toast.className = "toast visible";
  toast.textContent = message;
  if (!toast.isConnected) app.appendChild(toast);
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    toast.classList.remove("visible");
  }, 1800);
}

app.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  if (!actionTarget) return;
  const action = actionTarget.dataset.action;

  if (action === "open-paper") {
    routeTo(`paper/${actionTarget.dataset.paper}`);
  } else if (action === "open-passage") {
    routeTo(`reader/${actionTarget.dataset.paper}/${actionTarget.dataset.passage}`);
  } else if (action === "set-year") {
    state.year = actionTarget.dataset.year;
    render();
  } else if (action === "toggle-translation") {
    const current = parseRoute();
    const paper = getPaper(current.paperId);
    const passage = getPassage(paper, current.passageId);
      if (!getPassageTranslations(paper.id, passage.id)) {
      showToast("当前篇目的精编译文还未校对，暂时不能显示或隐藏");
      return;
    }
    state.translationVisible = !state.translationVisible;
    render();
  } else if (action === "toggle-focus") {
    state.focusMode = !state.focusMode;
    if (state.focusMode && !state.selectedSentence) {
      const current = parseRoute();
      state.selectedSentence = `${current.paperId}:${current.passageId}:0:0`;
    }
    render();
  } else if (action === "font-down" || action === "font-up") {
    const direction = action === "font-down" ? -0.05 : 0.05;
    state.fontScale = Math.min(1.25, Math.max(0.85, Number((state.fontScale + direction).toFixed(2))));
    render();
  } else if (action === "toggle-questions") {
    state.questionsOpen = !state.questionsOpen;
    render();
  } else if (action === "close-questions") {
    state.questionsOpen = false;
    render();
  } else if (action === "open-dock") {
    state.dockOpen = true;
    state.dockTab = actionTarget.dataset.tab || "long";
    render();
  } else if (action === "close-dock") {
    state.dockOpen = false;
    render();
  } else if (action === "set-dock-tab") {
    state.dockTab = actionTarget.dataset.tab;
    render();
  } else if (action === "select-sentence") {
    state.selectedSentence = actionTarget.dataset.key;
    render();
  } else if (action === "inspect-annotation") {
    inspectAnnotation(actionTarget);
  } else if (action === "close-word") {
    state.activeGloss = null;
    render();
  } else if (action === "toggle-gloss-save") {
    toggleSavedGloss();
  } else if (action === "select-blank") {
    const blank = Number(actionTarget.dataset.blank);
    state.activeBlank = state.activeBlank === blank ? null : blank;
    render();
  } else if (action === "pick-bank-word") {
    if (!state.activeBlank) {
      showToast("先点击原文中的一个空格");
      return;
    }
    const current = parseRoute();
    const storageKey = `${current.paperId}:${current.passageId}`;
    storage.blanks[storageKey] ||= {};
    storage.blanks[storageKey][state.activeBlank] = {
      letter: actionTarget.dataset.letter,
      word: actionTarget.dataset.word
    };
    writeStorage("cet6-blanks", storage.blanks);
    state.activeBlank = null;
    render();
    showToast("已记录到当前空格");
  } else if (action === "clear-blanks") {
    const current = parseRoute();
    delete storage.blanks[`${current.paperId}:${current.passageId}`];
    writeStorage("cet6-blanks", storage.blanks);
    state.activeBlank = null;
    render();
  } else if (action === "open-long-sentence") {
    openLongSentence(actionTarget.dataset.key, actionTarget.dataset.curated === "true");
  } else if (action === "choose-long-sentence") {
    state.longSentenceKey = actionTarget.dataset.key;
    state.selectedSentence = actionTarget.dataset.key;
    render();
  } else if (action === "focus-evidence") {
    focusEvidence(actionTarget.dataset.key, actionTarget.dataset.paragraph, actionTarget.dataset.sentence);
  } else if (action === "remove-word") {
    storage.words = storage.words.filter(
      (item) =>
        item.key !== actionTarget.dataset.word &&
        String(item.word || "") !== actionTarget.dataset.phrase
    );
    writeStorage("cet6-words", storage.words);
    render();
  }
});

app.addEventListener("input", (event) => {
  if (event.target.id === "library-search") {
    setSearchQuery(event.target.value);
    return;
  }
  if (event.target.matches("[data-note-input]")) {
    const target = event.target;
    const key = target.dataset.key;
    const text = target.value;
    if (!text.trim()) {
      delete storage.notes[key];
    } else {
      storage.notes[key] = {
        text,
        paperId: target.dataset.paper,
        passageId: target.dataset.passage,
        locator: target.dataset.locator,
        updatedAt: new Date().toISOString()
      };
    }
    writeStorage("cet6-notes", storage.notes);
  }
});

app.addEventListener("change", (event) => {
  if (event.target.matches("[data-match-select]")) {
    const target = event.target;
    const key = `${target.dataset.paper}:${target.dataset.passage}`;
    storage.matches[key] ||= {};
    storage.matches[key][target.dataset.statement] = target.value;
    writeStorage("cet6-matches", storage.matches);
    showToast("已记录段落定位");
  }
});

app.addEventListener("pointerover", (event) => {
  const sentence = event.target.closest(".source-sentence-inline, .translation-inline");
  if (!sentence) return;
  const key = sentence.dataset.key;
  document.querySelectorAll(`[data-key="${CSS.escape(key)}"]`).forEach((item) => {
    item.classList.add("sentence-hover");
  });
});

app.addEventListener("pointerout", (event) => {
  const sentence = event.target.closest(".source-sentence-inline, .translation-inline");
  if (!sentence) return;
  if (event.relatedTarget && sentence.contains(event.relatedTarget)) return;
  document.querySelectorAll(".sentence-hover").forEach((item) => {
    item.classList.remove("sentence-hover");
  });
});

app.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".word-token, .phrase-token")) {
    event.preventDefault();
    inspectAnnotation(event.target);
  } else if ((event.key === "Enter" || event.key === " ") && event.target.matches(".source-sentence-inline, .translation-inline")) {
    event.preventDefault();
    state.selectedSentence = event.target.dataset.key;
    render();
  } else if ((event.key === "Enter" || event.key === " ") && event.target.matches(".paper-card[tabindex='0']")) {
    event.preventDefault();
    routeTo(`paper/${event.target.dataset.paper}`);
  }
});

window.addEventListener("hashchange", render);

if (!window.location.hash) {
  window.location.hash = "#/library";
} else {
  render();
}
