import { describe, expect, it } from "vitest";
import {
  BRAND_COLORS,
  colorFor,
  formatDate,
  postPath,
  publishedAt,
  readingMinutes,
  relatedPosts,
  sortNewestFirst,
  summaryOf,
  topicsOf,
  decodeEntities,
  topicCounts,
  postsWithTopic,
  yearCounts,
  type PostLike,
} from "../src/utils/posts";

const post = (id: string, date: string, extra: Partial<PostLike["data"]> = {}, body = ""): PostLike => ({
  id,
  body,
  data: { title: id, tags: [], pubDatetime: new Date(date), ...extra },
});

describe("publishedAt", () => {
  it("prefers pubDatetime, then pubDate, then date", () => {
    expect(publishedAt({ title: "a", tags: [], pubDatetime: new Date("2020-01-01") }).getUTCFullYear()).toBe(2020);
    expect(publishedAt({ title: "a", tags: [], pubDate: new Date("2019-01-01") }).getUTCFullYear()).toBe(2019);
    expect(publishedAt({ title: "a", tags: [], date: new Date("2018-01-01") }).getUTCFullYear()).toBe(2018);
  });

  it("falls back to the epoch so undated posts sort last", () => {
    expect(publishedAt({ title: "a", tags: [] }).getTime()).toBe(0);
  });
});

describe("sortNewestFirst", () => {
  it("puts the newest post first", () => {
    const sorted = sortNewestFirst([
      post("2009-01-01-old.md", "2009-01-01"),
      post("2026-03-10-new.md", "2026-03-10"),
      post("2015-06-01-mid.md", "2015-06-01"),
    ]);
    expect(sorted.map(p => p.id)).toEqual(["2026-03-10-new.md", "2015-06-01-mid.md", "2009-01-01-old.md"]);
  });

  it("breaks same-day ties by file name, newest name first", () => {
    const sorted = sortNewestFirst([post("2024-03-28-a.md", "2024-03-28"), post("2024-03-28-b.md", "2024-03-28")]);
    expect(sorted.map(p => p.id)).toEqual(["2024-03-28-b.md", "2024-03-28-a.md"]);
  });

  it("does not mutate its input", () => {
    const input = [post("a.md", "2001-01-01"), post("b.md", "2002-01-01")];
    sortNewestFirst(input);
    expect(input[0].id).toBe("a.md");
  });
});

describe("postPath", () => {
  it("turns a dated file name into the site's permalink", () => {
    expect(postPath("2024-12-31-replacing-legacy-throw.md")).toBe("/2024/12/31/replacing-legacy-throw/");
  });
  it("keeps dashes in the slug", () => {
    expect(postPath("2006-01-09-published-in-msdn.md")).toBe("/2006/01/09/published-in-msdn/");
  });
});

describe("topicsOf", () => {
  it("merges tags and categories and drops duplicates by slug", () => {
    expect(topicsOf({ title: "a", tags: ["React", "nextjs"], categories: ["react", "Web"] })).toEqual([
      "React",
      "nextjs",
      "Web",
    ]);
  });
  it("skips empty entries", () => {
    expect(topicsOf({ title: "a", tags: ["", "  "] })).toEqual([]);
  });
});

describe("summaryOf", () => {
  it("strips WordPress HTML from descriptions", () => {
    const p = post("x.md", "2008-06-29", { description: '<br /><p>Downloads for my &quot;talk&quot;.</p><br />' });
    expect(summaryOf(p)).toBe('Downloads for my "talk".');
  });
  it("uses the body when there is no description, skipping code", () => {
    const p = post("x.md", "2020-01-01", {}, "## TL;DR\n\nHello [world](https://x.y).\n\n```js\nsecret()\n```");
    expect(summaryOf(p)).toBe("Hello world.");
  });
  it("truncates on a word boundary", () => {
    const p = post("x.md", "2020-01-01", { description: "one two three four five six" });
    expect(summaryOf(p, 14)).toBe("one two three…");
  });
});

describe("readingMinutes", () => {
  it("is at least one minute", () => expect(readingMinutes("")).toBe(1));
  it("counts about 230 words a minute", () => expect(readingMinutes("word ".repeat(2300))).toBe(10));
});

describe("colorFor", () => {
  it("always returns one of the four logo colors, the same one each time", () => {
    for (const s of ["react", "c#", "asp.net-2.0", ""]) {
      expect(BRAND_COLORS).toContain(colorFor(s));
      expect(colorFor(s)).toBe(colorFor(s));
    }
  });
});

describe("yearCounts", () => {
  it("counts posts per year and fills empty years with zero", () => {
    expect(yearCounts([post("a", "2019-05-01"), post("b", "2019-07-01"), post("c", "2021-01-01")])).toEqual([
      { year: 2019, count: 2 },
      { year: 2020, count: 0 },
      { year: 2021, count: 1 },
    ]);
  });
  it("returns nothing for no posts", () => expect(yearCounts([])).toEqual([]));
});

describe("relatedPosts", () => {
  it("ranks by shared topics, keeps list order for ties, and never returns the post itself", () => {
    const me = { id: "me", topics: ["react", "hooks"] };
    const list = [
      { id: "none", topics: ["docker"] },
      { id: "one-new", topics: ["React"] },
      me,
      { id: "one-old", topics: ["react"] },
      { id: "both", topics: ["react", "hooks"] },
    ];
    expect(relatedPosts(me, list).map(p => p.id)).toEqual(["both", "one-new", "one-old"]);
  });
});

describe("formatDate", () => {
  it("formats in UTC", () => expect(formatDate(new Date("2026-01-09T23:30:00Z"))).toBe("Jan 9, 2026"));
});

describe("topicCounts", () => {
  it("groups spellings that share a slug and keeps the most common one", () => {
    const counts = topicCounts([{ topics: ["React"] }, { topics: ["react"] }, { topics: ["react", "Docker"] }]);
    expect(counts).toContainEqual({ slug: "react", name: "react", count: 3 });
    expect(counts).toContainEqual({ slug: "docker", name: "Docker", count: 1 });
  });
});

describe("postsWithTopic", () => {
  it("matches on the slug, so C# and c# are the same topic", () => {
    const posts = [{ id: 1, topics: ["C#"] }, { id: 2, topics: ["linq"] }];
    expect(postsWithTopic(posts, "c").map(p => p.id)).toEqual([1]);
  });
});

describe("decodeEntities", () => {
  it("decodes the entities found in old WordPress titles", () => {
    expect(decodeEntities("Microsoft&rsquo;s Office &amp; &quot;Ext&quot; &ndash; 5&#160;min &#038; more")).toBe(
      "Microsoft’s Office & \"Ext\" – 5\u00a0min & more"
    );
  });
  it("leaves unknown entities alone", () => {
    expect(decodeEntities("&bogus; stays")).toBe("&bogus; stays");
  });
});
