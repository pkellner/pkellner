import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import { unified } from "@astrojs/markdown-remark";
import rehypeExternalLinks from "rehype-external-links";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";


// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [sitemap()],
  // Fetch pages when a link is hovered or touched, so the next page is ready
  // by the time the transition finishes.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  // Astro 7 defaults to "jsx"-style whitespace; keep the HTML output as before.
  compressHTML: true,
  markdown: {
    // The remark/rehype pipeline, which these plugins need in Astro 7.
    processor: unified({
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