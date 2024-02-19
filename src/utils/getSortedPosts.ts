import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts?: CollectionEntry<"blog">[]) => {
  if (!posts) return [];

  return posts
    .filter(postFilter)
    .sort(
      (a, b) => {
        // Ensure we have valid dates for comparison, defaulting to a very old date if undefined
        const defaultDate = new Date(0); // Epoch time, i.e., January 1, 1970
        const dateA = new Date(a.data.modDatetime ?? a.data.pubDatetime ?? defaultDate);
        const dateB = new Date(b.data.modDatetime ?? b.data.pubDatetime ?? defaultDate);

        return Math.floor(dateB.getTime() / 1000) - Math.floor(dateA.getTime() / 1000);
      }
    );
};

export default getSortedPosts;
