import { slugifyStr } from "./slugify";

/** The frontmatter fields these helpers read. Matches the blog collection schema. */
export interface PostData {
  title: string;
  description?: string;
  pubDatetime?: Date;
  pubDate?: Date;
  date?: Date;
  tags: string[];
  categories?: string[];
  ogImage?: string | { src: string };
  draft?: boolean;
}

export interface PostLike {
  id: string;
  body?: string;
  data: PostData;
}

export type BrandColor = "red" | "amber" | "green" | "blue";
export const BRAND_COLORS: BrandColor[] = ["red", "amber", "green", "blue"];

/** When a post was published. Edits never move a post in the list. */
export function publishedAt(data: PostData): Date {
  return data.pubDatetime ?? data.pubDate ?? data.date ?? new Date(0);
}

/** Newest first. Ties fall back to the file name so the order is stable. */
export function sortNewestFirst<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) =>
      publishedAt(b.data).getTime() - publishedAt(a.data).getTime() ||
      b.id.localeCompare(a.id)
  );
}

/** "2024-12-31-my-post.md" -> "/2024/12/31/my-post/", the site's permalink shape. */
export function postPath(id: string): string {
  const base = id.replace(/\.mdx?$/, "");
  const parts = base.split("-");
  return `/${parts.slice(0, 3).join("/")}/${parts.slice(3).join("-")}/`;
}

/** Tags plus the WordPress-era categories, de-duplicated by their URL slug. */
export function topicsOf(data: PostData): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of [...(data.tags ?? []), ...(data.categories ?? [])]) {
    const name = String(t).trim();
    const slug = slugifyStr(name);
    if (!name || !slug || seen.has(slug)) continue;
    seen.add(slug);
    out.push(name);
  }
  return out;
}

export function tagPath(tag: string): string {
  return `/tags/${slugifyStr(tag)}/`;
}

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", ndash: "–", mdash: "—",
  hellip: "…", reg: "®", trade: "™", copy: "©",
};

/** Turns the HTML entities WordPress left in titles back into characters. */
export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

/** Plain-text summary from the description, or from the body when there is none. */
export function summaryOf(post: PostLike, max = 200): string {
  const strip = (s: string) =>
    s
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/^#+\s.*$/gm, " ")
      .replace(/[*_`>#|]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  let text = decodeEntities(strip(post.data.description ?? "")).replace(/\s+/g, " ").trim();
  if (!text) text = decodeEntities(strip(post.body ?? "")).replace(/\s+/g, " ").trim().replace(/^TL;DR\s*/i, "");
  if (text.length <= max) return text;
  let cut = text.slice(0, max - 1);
  // Drop the last word only when the cut landed in the middle of it.
  if (!/\s/.test(text[max - 1])) cut = cut.replace(/\s+\S*$/, "");
  return cut.trimEnd() + "…";
}

/** Minutes to read at 230 words a minute, never less than one. */
export function readingMinutes(body = ""): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

/** A stable logo color for any string, so a tag always gets the same color. */
export function colorFor(s: string): BrandColor {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return BRAND_COLORS[Math.abs(h) % 4];
}

/** Count of posts per year, with every year from the first to the last present. */
export function yearCounts(
  posts: PostLike[]
): { year: number; count: number }[] {
  const counts = new Map<number, number>();
  for (const p of posts) {
    const y = publishedAt(p.data).getUTCFullYear();
    counts.set(y, (counts.get(y) ?? 0) + 1);
  }
  if (!counts.size) return [];
  const years = [...counts.keys()];
  const out = [];
  for (let y = Math.min(...years); y <= Math.max(...years); y++)
    out.push({ year: y, count: counts.get(y) ?? 0 });
  return out;
}

/**
 * Posts sharing the most topics with `post`. `posts` should already be newest first;
 * among equal scores that order is kept.
 */
export function relatedPosts<T extends { id: string; topics: string[] }>(post: T, posts: T[], n = 3): T[] {
  const mine = new Set(post.topics.map(slugifyStr));
  return posts
    .filter(p => p.id !== post.id)
    .map((p, i) => ({ p, i, score: p.topics.filter(t => mine.has(slugifyStr(t))).length }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || a.i - b.i)
    .slice(0, n)
    .map(x => x.p);
}

export function ogImageSrc(data: PostData): string | undefined {
  const og = data.ogImage;
  if (!og) return undefined;
  return typeof og === "string" ? og : og.src;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jan 9, 2026", in UTC so the build machine's time zone never shifts a date. */
export function formatDate(d: Date): string {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export interface TopicCount {
  slug: string;
  name: string;
  count: number;
}

/** Every topic with its post count. The most common spelling of a topic wins. */
export function topicCounts(posts: { topics: string[] }[]): TopicCount[] {
  const map = new Map<string, { names: Map<string, number>; count: number }>();
  for (const p of posts)
    for (const t of p.topics) {
      const slug = slugifyStr(t);
      const e = map.get(slug) ?? { names: new Map(), count: 0 };
      e.count++;
      e.names.set(t, (e.names.get(t) ?? 0) + 1);
      map.set(slug, e);
    }
  return [...map].map(([slug, e]) => ({
    slug,
    count: e.count,
    name: [...e.names].sort((a, b) => b[1] - a[1])[0][0],
  }));
}

export function postsWithTopic<T extends { topics: string[] }>(posts: T[], slug: string): T[] {
  return posts.filter(p => p.topics.some(t => slugifyStr(t) === slug));
}
