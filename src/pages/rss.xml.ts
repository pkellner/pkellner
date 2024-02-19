import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts.map(({ data, slug }) => {
      // Ensure there's a valid date string or timestamp for new Date()
      const dateStr = data.modDatetime ?? data.pubDatetime ?? new Date().toISOString();
      return {
        link: `posts/${slug}/`,
        title: data.title,
        description: data.description,
        pubDate: new Date(dateStr),
      };
    }),
  });
}

