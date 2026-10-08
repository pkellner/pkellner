import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeExternalLinks from "rehype-external-links";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";


// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [react(), sitemap()],
  // Astro 7 defaults to "jsx"-style whitespace; keep the HTML output as before.
  compressHTML: true,
  markdown: {
    // The remark/rehype pipeline, which these plugins need in Astro 7.
    processor: unified({
      remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
      rehypePlugins: [
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
      ],
    }),
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true
    }
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"]
    }
  },
  scopedStyleStrategy: "where"
});