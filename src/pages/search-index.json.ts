import type { APIRoute } from "astro";
import { getPosts } from "@utils/collection";
import type { SearchEntry } from "@utils/search";

/** Every published post, newest first, for the ⌘K palette and /search/. */
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const entries: SearchEntry[] = posts.map(p => ({
    t: p.title,
    u: p.url,
    d: p.date.toISOString().slice(0, 10),
    g: p.topics.slice(0, 6),
    x: p.summary,
  }));
  return new Response(JSON.stringify(entries), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
