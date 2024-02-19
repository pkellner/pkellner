import type { JekyllCollectionEntry } from "./astro-jekyll.d.ts";
import type {CollectionEntry} from "astro:content";

const DATETIME: RegExp = /^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2})(?::(\d{2})(?::(\d{2}))?)?(?:\s*([+-]\d{4}))?)?/;

/**
 * Parses a Jekyll-formatted datetime into a JavaScript Date object.
 * @param text The Jekyll datetime to parse.
 * @returns A date object representing the Jekyll datetime or undefined if the text isn't a datetime string.
 */
export function parseJekyllDateTime(text: string): Date | undefined {
  const match = DATETIME.exec(text);

  if (!match) {
    return undefined;
  }

  match.shift(); // remove the overall match

  let dateString = `${match.shift()}-${match.shift()}-${match.shift()}T`;
  if (match[0]) {
    dateString += match.shift(); // hours

    if (match[0]) {
      dateString += `:${match.shift()}`; // minutes
    } else {
      dateString += ":00"; // Date object requires minutes
    }

    if (match[0]) {
      dateString += `:${match.shift()}`; // seconds
    }

    if (match[0]) {
      dateString += `${match.shift()}`; // timezone offset
    }
  } else {
    dateString += "00:00";
  }

  return new Date(dateString);
}

/**
 * Formats the permalink based on Jekyll's configuration and post data.
 * @param permalink The Jekyll permalink format to fill.
 * @param post The post containing the data to insert into the permalink.
 * @returns The formatted permalink.
 */
export function formatJekyllPermalink(permalink: string, post: JekyllCollectionEntry): string {
  const { date } = post.data;
  let result = permalink;

  const replacements: Array<[RegExp, string]> = [
    [/:year/g, date.getFullYear().toString()],
    [/:short_year/g, date.getFullYear().toString().slice(2, 4)],
    [/:month/g, (date.getMonth() + 1).toString().padStart(2, "0")],
    [/:i_month/g, (date.getMonth() + 1).toString()],
    [/:day/g, date.getDate().toString().padStart(2, "0")],
    [/:i_day/g, date.getDate().toString()],
    [/:hour/g, date.getHours().toString().padStart(2, "0")],
    [/:minute/g, date.getMinutes().toString().padStart(2, "0")],
    [/:second/g, date.getSeconds().toString().padStart(2, "0")],
    [/:title/g, post.slug],
    [/:slug/g, post.slug],
  ];

  replacements.forEach(([pattern, value]) => {
    result = result.replace(pattern, value);
  });

  return result;
}

interface FormatJekyllPostOptions {
  permalink?: string;
}

/**
 * Formats an Astro post with Jekyll frontmatter data in a way
 * that Astro can understand.
 * @param options Options for formatting.
 * @returns A function that takes a post and returns it formatted.
 */
export function formatJekyllPost({ permalink = "/blog/:year/:month/:i_day/:title/" }: FormatJekyllPostOptions = {}): (post: CollectionEntry<'blog'>) => CollectionEntry<'blog'> {
  return (post: CollectionEntry<'blog'>): CollectionEntry<'blog'> => {
    let slug : any = post.slug;

    let postDate: Date | undefined = parseJekyllDateTime(slug);
    if (postDate) {
      slug = slug.slice(11);
      post.slug = slug;
    }

    if (post.data.date) {
      postDate = typeof post.data.date === "string" ? parseJekyllDateTime(post.data.date) : post.data.date;
    }

    post.data.date = postDate;
    post.data.pubDate = postDate;

    let url = post.data.permalink ?? formatJekyllPermalink(permalink, post as any);

    if (!url.startsWith("/")) {
      url = "/" + url;
    }

    const urlParts = url.split("/");
    urlParts.shift(); // remove first empty space
    urlParts.shift(); // remove "blog"
    if (url.endsWith("/")) {
      urlParts.pop(); // remove last empty space
    }

    slug = urlParts.join("/");
    post.slug = slug;

    return post;
  };
}
