#!/usr/bin/env node
// Smoke tests for the built site in dist/. Run after `npm run build`:
//   npm run test:dist
// Checks that every page exists, lists are newest first, drafts stay hidden, and
// that no link in the theme (header, footer, lists, cards) points at a missing page.
// Links inside old post bodies are not checked; many point at long-gone sites.
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const BLOG = path.resolve("src/content/blog");
const failures = [];
let passed = 0;

function check(name, ok, detail = "") {
  if (ok) passed++;
  else failures.push(`${name}${detail ? `\n    ${detail}` : ""}`);
}

const read = rel => fs.readFileSync(path.join(DIST, rel), "utf8");
const exists = rel => fs.existsSync(path.join(DIST, rel));

if (!fs.existsSync(DIST)) {
  console.error("dist/ is missing. Run `npm run build` first.");
  process.exit(1);
}

// ---------- pages exist ----------
const PAGES = [
  "index.html",
  "posts/index.html",
  "posts/2/index.html",
  "tags/index.html",
  "tags/react/index.html",
  "search/index.html",
  "courses/index.html",
  "about/index.html",
  "contact/index.html",
  "404.html",
  "rss.xml",
  "search-index.json",
  "sitemap-index.xml",
];
for (const p of PAGES) check(`page exists: /${p}`, exists(p));
for (const p of PAGES.filter(p => p.endsWith(".html") && exists(p))) {
  check(`footer links 73rdstreet.com: /${p}`, read(p).includes('href="https://73rdstreet.com/"'));
}

// ---------- drafts ----------
const drafts = fs
  .readdirSync(BLOG)
  .filter(f => f.endsWith(".md"))
  .filter(f => /^draft:\s*true\s*$/m.test(fs.readFileSync(path.join(BLOG, f), "utf8").split(/^---\s*$/m)[1] ?? ""))
  .map(f => f.replace(/\.md$/, ""));

// ---------- search index ----------
const index = JSON.parse(read("search-index.json"));
check("search index has posts", index.length > 100, `found ${index.length}`);
const dates = index.map(e => e.d);
check(
  "search index is newest first",
  dates.every((d, i) => i === 0 || dates[i - 1] >= d),
  `first out-of-order pair at ${dates.findIndex((d, i) => i > 0 && dates[i - 1] < d)}`
);
for (const d of drafts) {
  const [y, m, day, ...rest] = d.split("-");
  const url = `/${y}/${m}/${day}/${rest.join("-")}/`;
  check(`draft stays hidden: ${d}`, !index.some(e => e.u === url) && !exists(`${url.slice(1)}index.html`));
}
const missing = index.filter(e => !exists(`${e.u.slice(1)}index.html`));
check("every search entry has a page", missing.length === 0, missing.slice(0, 5).map(e => e.u).join(", "));

// ---------- order on the pages people see ----------
const datetimes = html => [...html.matchAll(/<time[^>]*datetime="([^"]+)"/g)].map(m => m[1]);
const descending = arr => arr.every((d, i) => i === 0 || arr[i - 1] >= d);

const archive = datetimes(read("posts/index.html"));
check("archive lists every post", archive.length === index.length, `${archive.length} rows vs ${index.length} posts`);
check("archive is newest first", descending(archive));
check("page 2 is newest first", descending(datetimes(read("posts/2/index.html"))));
check("page 2 starts after page 1 ends", datetimes(read("posts/2/index.html"))[0] <= archive[19]);
check("tag page is newest first", descending(datetimes(read("tags/react/index.html"))));

const home = read("index.html");
const homeDates = datetimes(home);
check("home shows the newest post first", homeDates[0]?.slice(0, 10) === index[0].d, `${homeDates[0]} vs ${index[0].d}`);
check("home cards are newest first", descending(homeDates));

const rssDates = [...read("rss.xml").matchAll(/<pubDate>([^<]+)<\/pubDate>/g)].map(m => new Date(m[1]).toISOString());
check("RSS is newest first", rssDates.length > 100 && descending(rssDates));
const unxml = s => s.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const rssLinks = [...read("rss.xml").matchAll(/<link>https?:\/\/[^/]+(\/[^<]*)<\/link>/g)].map(m => unxml(m[1])).filter(l => l !== "/");
const deadRss = rssLinks.filter(l => !resolves(l));
check("every RSS link has a page", deadRss.length === 0, deadRss.slice(0, 5).join(", "));

// ---------- facts ----------
const about = read("about/index.html");
check("about: 73rd Street founded 1985", about.includes("1985") && !about.includes("1990"));
check("about: shows the deploy date", /Site deployed <time[^>]*datetime="\d{4}-\d{2}-\d{2}T/.test(about));
check("home: no 1990 founding date", !home.includes("1990"));
const tl = about.slice(about.indexOf('class="tl'), about.indexOf("</ol>", about.indexOf('class="tl')));
const timeline = [...tl.matchAll(/class="yr[^"]*"[^>]*>([^<]+)</g)].map(m => m[1].trim());
check("about timeline is newest first", timeline[0] === "Now" && timeline.includes("1985") && timeline.indexOf("2000") < timeline.indexOf("1985"), timeline.join(" > "));

// ---------- fonts are self-hosted ----------
check("no third-party font requests", !home.includes("fonts.googleapis.com") && !about.includes("fonts.gstatic.com"));
const css = fs.readdirSync(path.join(DIST, "_astro")).filter(f => f.endsWith(".css")).map(f => read(`_astro/${f}`)).join("\n");
const fontUrls = [...new Set([...css.matchAll(/url\((\/fonts\/[^)]+)\)/g)].map(m => m[1]))];
check("every font file the CSS uses exists", fontUrls.length >= 6 && fontUrls.every(u => exists(u.slice(1))), `${fontUrls.length} fonts`);

// ---------- internal links ----------
function htmlFiles(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlFiles(p));
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}
function resolves(href) {
  const clean = decodeURIComponent(href.split(/[?#]/)[0]);
  if (!clean || clean === "/") return true;
  const rel = clean.replace(/^\//, "");
  return exists(rel) || exists(path.join(rel, "index.html")) || exists(`${rel}.html`);
}
const broken = new Map();
for (const file of htmlFiles(DIST)) {
  // Theme links only: drop the post body.
  const html = fs.readFileSync(file, "utf8").replace(/<article class="pk-prose"[\s\S]*?<\/article>/, "");
  for (const [, href] of html.matchAll(/<a[^>]+href="(\/[^"]*)"/g)) {
    if (href.startsWith("//") || resolves(href)) continue;
    const page = "/" + path.relative(DIST, file);
    if (!broken.has(href)) broken.set(href, page);
  }
}
check(
  "theme links all resolve",
  broken.size === 0,
  [...broken].slice(0, 10).map(([h, p]) => `${h} (on ${p})`).join("\n    ")
);

// ---------- report ----------
if (failures.length) {
  console.error(`\n✗ ${failures.length} failed, ${passed} passed\n`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log(`✓ ${passed} dist checks passed`);
