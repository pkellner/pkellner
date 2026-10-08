import { getCollection, type CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import {
  colorFor,
  decodeEntities,
  ogImageSrc,
  postPath,
  publishedAt,
  readingMinutes,
  summaryOf,
  topicsOf,
  type BrandColor,
} from "./posts";

export { postsWithTopic, topicCounts, type TopicCount } from "./posts";

/** What every card, row and list needs to know about a post, computed once per build. */
/** The post's file name, e.g. "2024-12-31-my-post.md". Its URL comes from this. */
export function fileNameOf(entry: CollectionEntry<"blog">): string {
  return (entry.filePath ?? entry.id).split("/").pop()!;
}

export interface PostView {
  id: string;
  url: string;
  title: string;
  date: Date;
  topics: string[];
  summary: string;
  minutes: number;
  color: BrandColor;
  og?: string;
  entry: CollectionEntry<"blog">;
}

export function toView(entry: CollectionEntry<"blog">): PostView {
  const topics = topicsOf(entry.data);
  return {
    id: entry.id,
    url: postPath(fileNameOf(entry)),
    title: decodeEntities(entry.data.title),
    date: publishedAt(entry.data),
    topics,
    summary: summaryOf(entry),
    minutes: readingMinutes(entry.body),
    color: colorFor(topics[0] ?? "notes"),
    og: ogImageSrc(entry.data),
    entry,
  };
}

let cache: PostView[] | null = null;

/** Published posts, newest first. Drafts appear only in `astro dev`. */
export async function getPosts(): Promise<PostView[]> {
  cache ??= getSortedPosts(await getCollection("blog")).map(toView);
  return cache;
}
