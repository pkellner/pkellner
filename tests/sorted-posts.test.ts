import { afterEach, describe, expect, it, vi } from "vitest";
import type { CollectionEntry } from "astro:content";
import getSortedPosts from "../src/utils/getSortedPosts";

const entry = (id: string, date: string, draft = false) =>
  ({ id, slug: id, body: "", collection: "blog", data: { title: id, tags: [], draft, pubDatetime: new Date(date) } }) as unknown as CollectionEntry<"blog">;

const POSTS = [
  entry("2009-01-01-old", "2009-01-01T00:00:00Z"),
  entry("2026-03-10-new", "2026-03-10T10:00:00Z"),
  entry("2026-02-24-draft", "2026-02-24T10:00:00Z", true),
  entry("2099-01-01-future", "2099-01-01T00:00:00Z"),
];

afterEach(() => vi.unstubAllEnvs());

describe("getSortedPosts", () => {
  it("lists posts newest first", () => {
    vi.stubEnv("DEV", false);
    expect(getSortedPosts(POSTS).map(p => p.id)).toEqual(["2026-03-10-new", "2009-01-01-old"]);
  });

  it("hides drafts and scheduled posts in production", () => {
    vi.stubEnv("DEV", false);
    const ids = getSortedPosts(POSTS).map(p => p.id);
    expect(ids).not.toContain("2026-02-24-draft");
    expect(ids).not.toContain("2099-01-01-future");
  });

  it("shows drafts in development, still newest first", () => {
    vi.stubEnv("DEV", true);
    expect(getSortedPosts(POSTS).map(p => p.id)).toEqual([
      "2099-01-01-future",
      "2026-03-10-new",
      "2026-02-24-draft",
      "2009-01-01-old",
    ]);
  });

  it("returns an empty list for no input", () => {
    expect(getSortedPosts(undefined)).toEqual([]);
  });
});
