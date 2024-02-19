// import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z
        .object({
          display_name: z.string(),
          login: z.string(),
          email: z.string().email(),
          url: z.string().optional(),
          author_login: z.string().optional(),
          author_email: z.string().email().optional(),
          wordpress_id: z.number().optional(),
          wordpress_url: z.string().url().optional(),
        })
        .default({
          display_name: "Peter Kellner",
          login: "admin",
          email: "peter@peterkellner.net",
          url: "",
        }),
      pubDatetime: z.date().optional(), // This is already required by default as no .optional() or .nullable() is applied
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string().optional(), // This is already required by default as no .optional() or .nullable() is applied
      canonicalURL: z.string().optional(),
      permalink: z.string().optional(),
      date: z
        .string()
        .optional()
        .transform((str) => str ? new Date(str) : undefined),
      pubDate: z
        .string()
        .or(z.date())
        .optional()
        .transform((val) => val ? new Date(val) : undefined),
    }),

});


export const collections = { blog };
