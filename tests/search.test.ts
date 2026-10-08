import { describe, expect, it } from "vitest";
import { highlight, searchPosts, type SearchEntry } from "../src/utils/search";

const e = (t: string, d: string, g: string[] = [], x = ""): SearchEntry => ({ t, d, g, x, u: `/${t}/` });

const INDEX = [
  e("Docker tips for MySQL", "2025-12-31", ["docker", "mysql"], "Rotating passwords safely."),
  e("React hooks in depth", "2024-04-16", ["react"], "useState and friends."),
  e("Older React hooks notes", "2019-01-01", ["react"], "Class components to hooks."),
  e("Linq to SQL", "2008-01-01", ["linq"], "Query syntax with a hooks mention."),
];

describe("searchPosts", () => {
  it("returns nothing for an empty query", () => {
    expect(searchPosts(INDEX, "   ")).toEqual([]);
  });

  it("requires every term to match", () => {
    expect(searchPosts(INDEX, "docker mysql").map(r => r.t)).toEqual(["Docker tips for MySQL"]);
    expect(searchPosts(INDEX, "docker react")).toEqual([]);
  });

  it("ranks title matches above summary-only matches", () => {
    const titles = searchPosts(INDEX, "hooks").map(r => r.t);
    expect(titles.indexOf("Linq to SQL")).toBe(titles.length - 1);
  });

  it("puts the newer post first when scores tie", () => {
    const titles = searchPosts(INDEX, "react").map(r => r.t);
    expect(titles[0]).toBe("React hooks in depth");
  });

  it("is case-insensitive", () => {
    expect(searchPosts(INDEX, "LINQ")).toHaveLength(1);
  });
});

describe("highlight", () => {
  it("wraps matches in <mark> and escapes HTML", () => {
    expect(highlight("<b>React</b> hooks", ["react"])).toBe("&lt;b&gt;<mark>React</mark>&lt;/b&gt; hooks");
  });

  it("never matches inside an escaped entity", () => {
    expect(highlight("Tom & Jerry", ["amp"])).toBe("Tom &amp; Jerry");
  });

  it("ignores one-letter terms", () => {
    expect(highlight("a b c", ["a"])).toBe("a b c");
  });
});
