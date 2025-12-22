import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { slugifyStr } from "@utils/slugify";
import {
  generateOgImageForPost,
  extractImagesFromMarkdown,
  loadImagesForOg,
} from "@utils/generateOgImages";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Cache directory for OG images
const CACHE_DIR = path.join(process.cwd(), "public", "og-cache");

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

/**
 * Check if cached image is still valid (exists and newer than source)
 */
function isCacheValid(cacheFile: string, sourceFile: string): boolean {
  if (!fs.existsSync(cacheFile)) {
    return false;
  }

  if (!fs.existsSync(sourceFile)) {
    // Source doesn't exist, use cache anyway
    return true;
  }

  const cacheStat = fs.statSync(cacheFile);
  const sourceStat = fs.statSync(sourceFile);

  return cacheStat.mtimeMs > sourceStat.mtimeMs;
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
  const sourceFile = path.join(contentDir, post.id);
  const cacheFile = path.join(CACHE_DIR, `${slug}.png`);

  // Check if we have a valid cached version
  if (isCacheValid(cacheFile, sourceFile)) {
    const cachedImage = fs.readFileSync(cacheFile);
    console.log(`[OG Cache] HIT: ${slug}`);
    return new Response(new Uint8Array(cachedImage), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  console.log(`[OG Cache] MISS: ${slug}`);

  // Find the markdown file for this post
  let rawContent = "";
  try {
    if (fs.existsSync(sourceFile)) {
      rawContent = fs.readFileSync(sourceFile, "utf-8");
    }
  } catch (error) {
    console.error(`Error reading post file:`, error);
  }

  // Extract and load images from the markdown
  const imagePaths = extractImagesFromMarkdown(rawContent);
  if (imagePaths.length > 0) {
    console.log(`[OG] Found ${imagePaths.length} images in ${slug}:`, imagePaths.slice(0, 3));
  }
  const images = await loadImagesForOg(imagePaths, publicDir);
  if (images.length > 0) {
    console.log(`[OG] Loaded ${images.length} images for ${slug}`);
  } else if (imagePaths.length > 0) {
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

  return new Response(new Uint8Array(optimizedPng), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
