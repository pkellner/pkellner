import getPagination from "./getPagination";
import { postsWithTopic, topicCounts, type PostView } from "./collection";
import { slugifyStr } from "./slugify";

/** Everything a tag page needs, for page 1 or a later page. */
export function tagPageProps(all: PostView[], slug: string, name: string, page: number | string, isIndex = false) {
  const posts = postsWithTopic(all, slug);
  const near = topicCounts(posts)
    .filter(t => t.slug !== slug)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map(t => ({ slug: slugifyStr(t.name), name: t.name }));
  return {
    ...getPagination({ posts, page, isIndex }),
    tag: slug,
    tagName: name,
    total: posts.length,
    first: posts[posts.length - 1].date,
    last: posts[0].date,
    near,
  };
}
