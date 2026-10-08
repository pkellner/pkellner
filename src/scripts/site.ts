import { burst, copyText, reduceMotion } from "./fx";
import { searchPosts, searchTerms, type SearchEntry } from "../utils/search";
import { loadIndex, resultHtml } from "./search-client";

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const root = document.documentElement;
const reduce = reduceMotion();
const finePointer = matchMedia("(pointer: fine)").matches;

// ---------- light / dark ----------
$("#theme-btn")?.addEventListener("click", e => {
  const cur = root.getAttribute("data-theme");
  const dark = cur ? cur === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  const apply = () => {
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
  };
  if (document.startViewTransition && !reduce) {
    const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
    root.style.setProperty("--vx", `${b.left + b.width / 2}px`);
    root.style.setProperty("--vy", `${b.top + b.height / 2}px`);
    document.startViewTransition(apply);
  } else apply();
});

// ---------- mobile menu ----------
const sheet = $("#sheet");
const menuBtn = $("#menu-btn");
const closeSheet = () => {
  sheet?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded", "false");
};
menuBtn?.addEventListener("click", () => {
  const open = sheet?.classList.toggle("open") ?? false;
  menuBtn.setAttribute("aria-expanded", String(open));
});

// ---------- scroll progress + compact header ----------
const progress = $("#progress");
const header = $(".top");
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const h = root.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    header?.classList.toggle("scrolled", scrollY > 40);
    ticking = false;
  });
};
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- page transitions: remember the click point, carry the card cover ----------
document.addEventListener("click", e => {
  const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
  if (!a || a.target === "_blank" || a.origin !== location.origin) return;
  try {
    sessionStorage.setItem("pk-vt", JSON.stringify({ x: e.clientX, y: e.clientY }));
  } catch {
    /* the wipe opens from the center instead */
  }
  const cover = a.matches(".pc") ? $(".pc-cover", a) : null;
  if (cover && !reduce) cover.style.viewTransitionName = "pk-cover";
});
addEventListener("pageshow", e => {
  if (e.persisted) $$(".pc-cover").forEach(c => (c.style.viewTransitionName = ""));
});

// ---------- copy buttons ----------
document.addEventListener("click", async e => {
  const btn = (e.target as Element).closest<HTMLElement>("[data-copy], .code .copy");
  if (!btn) return;
  const code = btn.closest(".code")?.querySelector("pre");
  const text = btn.dataset.copy ?? code?.innerText ?? "";
  const label = btn.querySelector("span") ?? btn;
  const old = label.textContent;
  const box = btn.getBoundingClientRect();
  const ok = await copyText(text, code ?? (btn.dataset.copyFallback ? $(btn.dataset.copyFallback) : null));
  label.textContent = ok ? "Copied" : "Press ⌘C";
  btn.classList.toggle("done", ok);
  if (ok) burst(box.left + box.width / 2, box.top + box.height / 2, 12);
  setTimeout(() => {
    label.textContent = old;
    btn.classList.remove("done");
  }, 1600);
});

// ---------- code blocks: window chrome, language label, copy button ----------
$$<HTMLPreElement>(".pk-prose pre.astro-code").forEach(pre => {
  const fig = document.createElement("figure");
  fig.className = "code";
  const lang = pre.dataset.language && pre.dataset.language !== "plaintext" ? pre.dataset.language : "code";
  fig.innerHTML = `<figcaption><i></i><i></i><i></i><span></span><button type="button" class="copy">Copy</button></figcaption>`;
  fig.querySelector("span")!.textContent = lang;
  pre.replaceWith(fig);
  fig.appendChild(pre);
});

// ---------- tables scroll inside their own box ----------
$$(".pk-prose table").forEach(t => {
  if (t.parentElement?.classList.contains("tbl")) return;
  const wrap = document.createElement("div");
  wrap.className = "tbl";
  t.replaceWith(wrap);
  wrap.appendChild(t);
});

// ---------- magnetic buttons, tilting cards ----------
if (!reduce && finePointer) {
  document.addEventListener("pointermove", e => {
    const t = e.target as Element;
    const b = t.closest<HTMLElement>(".btn");
    if (b) {
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * 8}px`);
      b.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * 8}px`);
    }
    const c = t.closest<HTMLElement>(".pc");
    if (c) {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 7}deg`);
      c.style.setProperty("--rx", `${(0.5 - (e.clientY - r.top) / r.height) * 7}deg`);
    }
  });
  document.addEventListener("pointerout", e => {
    const t = e.target as Element;
    const rel = e.relatedTarget as Node | null;
    const b = t.closest<HTMLElement>(".btn");
    if (b && !b.contains(rel)) {
      b.style.removeProperty("--mx");
      b.style.removeProperty("--my");
    }
    const c = t.closest<HTMLElement>(".pc");
    if (c && !c.contains(rel)) {
      c.style.removeProperty("--rx");
      c.style.removeProperty("--ry");
    }
  });
}

// ---------- reveal on scroll where CSS scroll timelines are missing (Safari, Firefox) ----------
if (!reduce && !CSS.supports("animation-timeline: view()") && "IntersectionObserver" in window) {
  document.body.classList.add("no-sat");
  const io = new IntersectionObserver(
    entries =>
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" }
  );
  $$(".rv").forEach(el => io.observe(el));
}

// ---------- search palette ----------
const pal = $("#pal");
const palQ = $<HTMLInputElement>("#pal-q");
const palList = $("#pal-list");
let index: SearchEntry[] | null = null;
let sel = 0;
let results: SearchEntry[] = [];

function renderPalette() {
  if (!palList || !palQ) return;
  if (!index) {
    palList.innerHTML = `<p class="mono muted" style="font-size:.75rem;padding:10px 14px">Loading posts…</p>`;
    return;
  }
  const q = palQ.value.trim();
  const terms = searchTerms(q);
  results = q ? searchPosts(index, q).slice(0, 8) : index.slice(0, 6);
  if (sel >= results.length) sel = 0;
  palList.innerHTML =
    (q ? "" : `<p class="mono muted" style="font-size:.7rem;padding:6px 14px">LATEST POSTS</p>`) +
    (results.map((p, i) => resultHtml(p, terms, i, i === sel)).join("") ||
      `<div class="empty" style="margin:8px"><b>No matches.</b>Try fewer words.</div>`);
}

function openPalette() {
  if (!pal || !palQ) return;
  pal.hidden = false;
  palQ.value = "";
  sel = 0;
  renderPalette();
  loadIndex().then(d => {
    index = d;
    renderPalette();
  });
  setTimeout(() => palQ.focus(), 10);
}
const closePalette = () => pal && (pal.hidden = true);

$$("[data-open-search]").forEach(b => b.addEventListener("click", openPalette));
pal?.addEventListener("click", e => {
  const t = e.target as Element;
  if (t.hasAttribute("data-close") || t.closest(".res")) closePalette();
});
palQ?.addEventListener("input", () => {
  sel = 0;
  renderPalette();
});
palQ?.addEventListener("keydown", e => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + results.length) % Math.max(1, results.length);
    renderPalette();
    $(".res.sel", palList!)?.scrollIntoView({ block: "nearest" });
  }
  if (e.key === "Enter" && results[sel]) {
    e.preventDefault();
    location.href = results[sel].u;
  }
});
document.addEventListener("keydown", e => {
  const typing = /INPUT|TEXTAREA|SELECT/.test((document.activeElement as HTMLElement)?.tagName ?? "");
  if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
    e.preventDefault();
    if (pal?.hidden) openPalette();
    else closePalette();
  }
  if (e.key === "Escape") {
    if (pal && !pal.hidden) closePalette();
    closeSheet();
  }
});
