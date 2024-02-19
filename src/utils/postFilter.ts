import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

function postFilter({ data }: CollectionEntry<"blog">) {
  const pubDatetime = data.pubDatetime || new Date(0); // Fallback to epoch if undefined

  const isPublishTimePassed =
    Date.now() >
    new Date(pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
}

export default postFilter;
