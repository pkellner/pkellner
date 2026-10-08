// Page-to-page transitions that work in every browser.
//
// Browsers with cross-document View Transitions (Chrome, Edge, Safari 18.2+, iOS 18.2+)
// get the native diamond wipe defined in base.css; this file only remembers where the
// visitor clicked so the wipe opens from there, and names the clicked card's cover so it
// morphs into the post header.
//
// Every other browser (Firefox, older Safari and iOS) gets the "diamond curtain": a
// logo-colored diamond grows from the click point and covers the page, the browser
// navigates, and the next page opens out of the center (see the inline script in
// Layout.astro and the html.pk-cin rules in base.css).

import { reduceMotion } from "./fx";

const COLORS = ["red", "blue", "green", "amber"];
const CURTAIN_KEY = "pk-curtain";
const ORIGIN_KEY = "pk-vt";
const reduce = reduceMotion();

/** Cross-document view transitions ship together with the pagereveal event. */
export const nativeTransitions =
  "onpagereveal" in window && typeof document.startViewTransition === "function";

function store(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode: transitions fall back to their defaults */
  }
}

function nextColor(): string {
  let i: number;
  try {
    i = (Number(sessionStorage.getItem("pk-curtain-i")) + 1) % COLORS.length;
    sessionStorage.setItem("pk-curtain-i", String(i));
  } catch {
    i = Math.floor(Math.random() * COLORS.length);
  }
  return COLORS[i];
}

/** Links we animate: same site, a page (not a feed or file), not a new tab or download. */
function isPageLink(a: HTMLAnchorElement): boolean {
  if (a.origin !== location.origin) return false;
  if (a.target && a.target !== "_self") return false;
  if (a.hasAttribute("download")) return false;
  if (/\.(xml|json|png|jpe?g|gif|svg|webp|pdf|zip|txt)$/i.test(a.pathname)) return false;
  // Same page with only a different #hash: let the browser scroll.
  if (a.pathname === location.pathname && a.search === location.search && a.hash) return false;
  return true;
}

/** Plays the curtain over this page, then goes to `url`. */
export function curtainTo(url: string, x: number, y: number) {
  const color = nextColor();
  store(CURTAIN_KEY, { color, t: Date.now() });

  const el = document.createElement("div");
  el.className = "pk-curtain";
  el.style.background = `var(--${color})`;
  el.innerHTML = "<span>PK</span>";
  document.body.appendChild(el);

  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) * 1.5;
  const diamond = (d: number) => `polygon(${x}px ${y - d}px, ${x + d}px ${y}px, ${x}px ${y + d}px, ${x - d}px ${y}px)`;
  let gone = false;
  const go = () => {
    if (gone) return;
    gone = true;
    location.href = url;
  };
  if (el.animate) {
    el.animate([{ clipPath: diamond(0) }, { clipPath: diamond(r) }], {
      duration: 420,
      easing: "cubic-bezier(.7,0,.3,1)",
      fill: "forwards",
    }).onfinish = go;
  }
  // Navigate even if the animation never reports back.
  setTimeout(go, 480);
}

function clickPoint(e: MouseEvent, a: Element) {
  // Keyboard activation reports 0,0: use the link's center instead.
  if (e.clientX || e.clientY) return { x: e.clientX, y: e.clientY };
  const b = a.getBoundingClientRect();
  return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
}

/** Navigates with whichever transition this browser supports. */
export function navigate(url: string, x = innerWidth / 2, y = innerHeight / 2) {
  store(ORIGIN_KEY, { x, y });
  if (!nativeTransitions && !reduce) curtainTo(url, x, y);
  else location.href = url;
}

document.addEventListener("click", e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
  if (!a || !isPageLink(a)) return;
  const { x, y } = clickPoint(e, a);
  store(ORIGIN_KEY, { x, y });

  if (nativeTransitions) {
    // Let the card's cover morph into the post header.
    const cover = !reduce && a.matches(".pc") ? a.querySelector<HTMLElement>(".pc-cover") : null;
    if (cover) cover.style.viewTransitionName = "pk-cover";
    return;
  }
  if (reduce) return;
  e.preventDefault();
  curtainTo(a.href, x, y);
});

// Coming back with the Back button can restore this page from memory with the curtain
// still covering it, or with a cover still named. Clean both up.
addEventListener("pageshow", e => {
  if (!e.persisted) return;
  document.querySelectorAll(".pk-curtain").forEach(el => el.remove());
  document.querySelectorAll<HTMLElement>(".pc-cover").forEach(c => (c.style.viewTransitionName = ""));
});

// ---------- leaving the site ----------
// External links (Pluralsight, Microsoft MVP, GitHub...) can sit on a redirect chain for
// seconds. The browser navigates as usual (no delay, no iframe); this only covers the
// wait with a departure screen, warms up connections on intent, and offers a way out.

const SITE_NAMES: Record<string, string> = {
  "pluralsight.pxf.io": "Pluralsight",
  "pluralsight.com": "Pluralsight",
  "app.pluralsight.com": "Pluralsight",
  "mvp.microsoft.com": "Microsoft MVP",
  "siliconvalley-codecamp.com": "Silicon Valley Code Camp",
  "github.com": "GitHub",
  "linkedin.com": "LinkedIn",
  "x.com": "X",
  "techhub.social": "Mastodon",
  "youtube.com": "YouTube",
  "mae.cornell.edu": "Cornell Engineering",
  "cornell.edu": "Cornell University",
  "73rdstreet.com": "73rd Street Associates",
};
/** Where known redirectors end up, so we can warm up the final site too. */
const REDIRECT_TARGETS: Record<string, string> = {
  "pluralsight.pxf.io": "https://www.pluralsight.com",
};

const bareHost = (h: string) => h.replace(/^www\./, "");
export const siteName = (host: string) => SITE_NAMES[bareHost(host)] ?? bareHost(host);

function isOutbound(a: HTMLAnchorElement): boolean {
  return /^https?:$/.test(a.protocol) && a.origin !== location.origin && (!a.target || a.target === "_self") && !a.hasAttribute("download");
}

const warmed = new Set<string>();
function warmUp(a: HTMLAnchorElement) {
  for (const origin of [a.origin, REDIRECT_TARGETS[a.host]]) {
    if (!origin || warmed.has(origin)) continue;
    warmed.add(origin);
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    document.head.appendChild(link);
  }
}
for (const type of ["pointerenter", "touchstart", "focusin"]) {
  document.addEventListener(
    type,
    e => {
      const a = (e.target as Element).closest?.<HTMLAnchorElement>("a[href]");
      if (a && isOutbound(a)) warmUp(a);
    },
    { capture: true, passive: true }
  );
}

let departTimer = 0;
function closeDeparture() {
  clearTimeout(departTimer);
  document.querySelector(".pk-depart")?.remove();
}

function showDeparture(a: HTMLAnchorElement, x: number, y: number) {
  closeDeparture();
  const name = siteName(a.host);
  const el = document.createElement("div");
  el.className = "pk-depart";
  // A card grows into the screen (a container transform) and keeps its color and badge.
  const card = a.matches(".card") ? a : null;
  if (card) {
    const r = card.getBoundingClientRect();
    el.classList.add("pk-depart--card");
    el.style.setProperty("--t", `${r.top}px`);
    el.style.setProperty("--r", `${innerWidth - r.right}px`);
    el.style.setProperty("--b", `${innerHeight - r.bottom}px`);
    el.style.setProperty("--l", `${r.left}px`);
  }
  // Links that carry a badge (credential cards, timeline years, fact numbers) show it on
  // the departure card in their own color.
  const badgeEl = a.querySelector<HTMLElement>(".yr");
  const badgeText = a.dataset.badge ?? badgeEl?.textContent?.trim();
  if (badgeText) {
    el.classList.add("pk-depart--badge");
    el.style.setProperty("--accent", badgeEl?.style.getPropertyValue("--c") || a.style.getPropertyValue("--c") || "var(--amber)");
    el.style.setProperty("--on-accent", badgeEl?.style.getPropertyValue("--oc") || a.style.getPropertyValue("--oc") || "#10131c");
  } else if (card) {
    el.style.setProperty("--accent", card.style.getPropertyValue("--c") || "var(--amber)");
  }
  el.setAttribute("role", "status");
  el.setAttribute("aria-live", "polite");
  el.style.setProperty("--dx", `${x}px`);
  el.style.setProperty("--dy", `${y}px`);
  el.innerHTML = `<div class="pk-depart-card">
      <span class="pk-depart-tile" aria-hidden="true">PK</span>
      <p class="pk-depart-from">Leaving PeterKellner.net</p>
      <p class="pk-depart-to">Opening <b></b></p>
      <p class="pk-depart-host"></p>
      <div class="pk-depart-bar" aria-hidden="true"><i></i></div>
      <div class="pk-depart-slow" hidden>
        <p>This site is taking a while.</p>
        <div><a class="btn btn--sm btn--blue" rel="noopener">Try again</a><button class="btn btn--sm" type="button">Stay here</button></div>
      </div>
    </div>`;
  el.querySelector("b")!.textContent = name;
  if (badgeText) el.querySelector(".pk-depart-tile")!.textContent = badgeText;
  // Show where the visitor ends up, not the affiliate redirect in between.
  el.querySelector(".pk-depart-host")!.textContent = bareHost(new URL(REDIRECT_TARGETS[a.host] ?? a.href).host);
  el.querySelector<HTMLAnchorElement>(".pk-depart-slow a")!.href = a.href;
  el.querySelector(".pk-depart-slow button")!.addEventListener("click", () => {
    window.stop();
    closeDeparture();
  });
  document.body.appendChild(el);
  departTimer = window.setTimeout(() => {
    const slow = el.querySelector<HTMLElement>(".pk-depart-slow");
    if (slow) slow.hidden = false;
  }, 6000);
}

document.addEventListener("click", e => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
  if (!a || !isOutbound(a) || a.closest(".pk-depart")) return;
  warmUp(a);
  const { x, y } = clickPoint(e, a);
  // Let the browser navigate normally; the screen just covers the wait.
  showDeparture(a, x, y);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && document.querySelector(".pk-depart")) {
    window.stop();
    closeDeparture();
  }
});

// Back from the other site: this page may come back from memory with the screen up.
addEventListener("pageshow", e => {
  if (e.persisted) closeDeparture();
});
