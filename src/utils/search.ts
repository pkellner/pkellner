/** One row of /search-index.json. Short keys keep the file small. */
export interface SearchEntry {
  /** title */
  t: string;
  /** url */
  u: string;
  /** date, YYYY-MM-DD */
  d: string;
  /** topics */
  g: string[];
  /** summary */
  x: string;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function searchTerms(query: string): string[] {
  return query.toLowerCase().split(/\s+/).filter(Boolean);
}

/**
 * Every term must appear somewhere. Title hits outrank topic hits, which outrank
 * summary hits; a hit at the start of a word scores extra. Newer posts win ties.
 */
export function searchPosts(entries: SearchEntry[], query: string): SearchEntry[] {
  const terms = searchTerms(query);
  if (!terms.length) return [];
  const scored: { e: SearchEntry; s: number }[] = [];
  for (const e of entries) {
    const title = e.t.toLowerCase();
    const topics = e.g.join(" ").toLowerCase();
    const summary = e.x.toLowerCase();
    let score = 0;
    let all = true;
    for (const w of terms) {
      let s = 0;
      if (title.includes(w)) s += 10 + (new RegExp(`(^|\\W)${escapeRe(w)}`).test(title) ? 6 : 0);
      if (topics.includes(w)) s += 7;
      if (summary.includes(w)) s += 2;
      if (!s) {
        all = false;
        break;
      }
      score += s;
    }
    if (all) scored.push({ e, s: score });
  }
  return scored
    .sort((a, b) => b.s - a.s || (a.e.d < b.e.d ? 1 : a.e.d > b.e.d ? -1 : 0))
    .map(x => x.e);
}

/** Escapes text for HTML and wraps each search term in <mark>. */
export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function highlight(text: string, terms: string[]): string {
  const usable = terms.filter(t => t.length > 1);
  if (!usable.length) return escapeHtml(text);
  // Split the raw text first so a term can never match inside an escaped entity.
  const re = new RegExp(`(${usable.map(escapeRe).join("|")})`, "gi");
  return text
    .split(re)
    .map((part, i) => (i % 2 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part)))
    .join("");
}
