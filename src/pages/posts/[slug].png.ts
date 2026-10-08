import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { slugifyStr } from "@utils/slugify";
import {
  generateOgImageForPost,
  extractImagesFromMarkdown,
  loadImagesForOg,
} from "@utils/generateOgImages";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Cache directory for OG images
const CACHE_DIR = path.join(process.cwd(), "public", "og-cache");

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// The cache is keyed by content, not file times: a fresh git checkout (as on GitHub
// Actions) gives every file a new timestamp, which made every image look stale.
// manifest.json maps each image to a fingerprint of everything that shapes it.
const MANIFEST = path.join(CACHE_DIR, "manifest.json");
const manifest: Record<string, string> = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf-8")) : {};
const TEMPLATE_SOURCES = ["src/utils/generateOgImages.tsx", "src/utils/og-templates/post.tsx"]
  .map(f => fs.readFileSync(path.join(process.cwd(), f), "utf-8"))
  .join("\n");

/** Fingerprint of the post's markdown, the images it shows and the template code. */
function fingerprint(markdown: string, imagePaths: string[], publicDir: string): string {
  const h = createHash("sha256").update(TEMPLATE_SOURCES).update(markdown);
  for (const p of imagePaths) {
    const file = path.join(publicDir, p);
    if (fs.existsSync(file)) h.update(fs.readFileSync(file));
  }
  return h.digest("hex").slice(0, 16);
}

function saveManifest() {
  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 1) + "\n");
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.map(post => ({
    params: { slug: slugifyStr(post.data.title) },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { post } = props;
  const slug = slugifyStr(post.data.title);

  // Paths
  const contentDir = path.join(process.cwd(), "src", "content", "blog");
  const publicDir = path.join(process.cwd(), "public");
  const sourceFile = post.filePath ? path.join(process.cwd(), post.filePath) : path.join(contentDir, `${post.id}.md`);
  const cacheFile = path.join(CACHE_DIR, `${slug}.png`);

  const rawContent = fs.existsSync(sourceFile) ? fs.readFileSync(sourceFile, "utf-8") : "";
  const imagePaths = extractImagesFromMarkdown(rawContent);
  const key = fingerprint(rawContent, imagePaths, publicDir);

  if (manifest[slug] === key && fs.existsSync(cacheFile)) {
    return new Response(new Uint8Array(fs.readFileSync(cacheFile)), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  console.log(`[OG Cache] MISS: ${slug}`);
  const images = await loadImagesForOg(imagePaths, publicDir);
  if (imagePaths.length > 0 && images.length === 0) {
    console.log(`[OG] WARNING: Found image paths but failed to load any for ${slug}`);
  }

  // Generate the OG image
  const pngBuffer = await generateOgImageForPost(post, images);

  // Optimize with sharp (reduce file size by ~30-50%)
  const optimizedPng = await sharp(pngBuffer)
    .png({
      compressionLevel: 9,
      palette: true,
      quality: 80,
    })
    .toBuffer();

  // Save to cache
  fs.writeFileSync(cacheFile, optimizedPng);
  manifest[slug] = key;
  saveManifest();

  return new Response(new Uint8Array(optimizedPng), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
