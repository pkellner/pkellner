import rss from "@astrojs/rss";
import { SITE } from "@config";
import { getPosts } from "@utils/collection";

export async function GET() {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts.map(p => ({
      link: p.url,
      title: p.title,
      description: p.summary,
      pubDate: p.date,
      categories: p.topics,
    })),
  });
}
