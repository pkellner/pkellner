import { colorFor } from "../utils/posts";
import { escapeHtml, highlight, type SearchEntry } from "../utils/search";

let index: SearchEntry[] | null = null;
let loading: Promise<SearchEntry[]> | null = null;

/** Fetches /search-index.json once per page. */
export function loadIndex(): Promise<SearchEntry[]> {
  if (index) return Promise.resolve(index);
  loading ??= fetch("/search-index.json")
    .then(r => r.json() as Promise<SearchEntry[]>)
    .then(d => (index = d));
  return loading;
}

export function resultHtml(p: SearchEntry, terms: string[], i: number, selected = false) {
  const date = new Date(`${p.d}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const tags = p.g.slice(0, 3).map(t => `#${escapeHtml(t)}`).join(" ");
  return `<a class="res${selected ? " sel" : ""}" href="${p.u}" role="option" aria-selected="${selected}" style="--c:var(--${colorFor(p.g[0] ?? "notes")});--i:${Math.min(i, 14)}"><i></i><b>${highlight(p.t, terms)}</b><span>${highlight(p.x, terms)}</span><small>${date} · ${tags}</small></a>`;
}
