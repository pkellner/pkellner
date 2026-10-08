import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";
import { sortNewestFirst } from "./posts";

/** Published posts, newest first by publish date. */
const getSortedPosts = (posts?: CollectionEntry<"blog">[]) => {
  if (!posts) return [];
  return sortNewestFirst(posts.filter(postFilter));
};

export default getSortedPosts;
