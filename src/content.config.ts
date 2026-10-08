import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      author: z
        .object({
          display_name: z.string(),
          login: z.string(),
          email: z.email(),
          url: z.string().optional(),
          author_login: z.string().optional(),
          author_email: z.email().optional(),
          wordpress_id: z.number().optional(),
          wordpress_url: z.url().optional(),
        })
        .default({
          display_name: "Peter Kellner",
          login: "admin",
          email: "peter@peterkellner.net",
          url: "",
        }),
      pubDatetime: z.date().optional(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      // WordPress-era posts keep their topics here; the site merges them with tags.
      categories: z.array(z.coerce.string()).optional(),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          error: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string().optional(),
      canonicalURL: z.string().optional(),
      permalink: z.string().optional(),
      date: z
        .string()
        .optional()
        .transform(str => (str ? new Date(str) : undefined)),
      pubDate: z
        .string()
        .or(z.date())
        .optional()
        .transform(val => (val ? new Date(val) : undefined)),
    }),
});

export const collections = { blog };
