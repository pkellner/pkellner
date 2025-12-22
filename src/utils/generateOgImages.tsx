import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { type CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const fetchFonts = async () => {
  // Regular Font
  const fontFileRegular = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf"
  );
  const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

  // Bold Font
  const fontFileBold = await fetch(
    "https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf"
  );
  const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

  return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const options: SatoriOptions = {
  width: 1200,
  height: 630,
  embedFont: true,
  fonts: [
    {
      name: "IBM Plex Mono",
      data: fontRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "IBM Plex Mono",
      data: fontBold,
      weight: 600,
      style: "normal",
    },
  ],
};

function svgBufferToPngBuffer(svg: string) {
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}

/**
 * Extract image paths from markdown content
 */
export function extractImagesFromMarkdown(content: string): string[] {
  const imageRegex = /!\[.*?\]\((\/[^)]+)\)/g;
  const images: string[] = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    images.push(match[1]);
  }

  return images;
}

/**
 * Load and resize images for OG image generation
 * Returns up to 3 images as Buffers
 */
export async function loadImagesForOg(
  imagePaths: string[],
  publicDir: string
): Promise<Buffer[]> {
  const images: Buffer[] = [];
  const maxImages = 3;

  for (const imagePath of imagePaths.slice(0, maxImages)) {
    try {
      const fullPath = path.join(publicDir, imagePath);

      if (!fs.existsSync(fullPath)) {
        console.log(`Image not found: ${fullPath}`);
        continue;
      }

      // Read and resize image using sharp
      const imageBuffer = await sharp(fullPath)
        .resize(600, 400, {
          fit: "cover",
          position: "center",
        })
        .png()
        .toBuffer();

      images.push(imageBuffer);
    } catch (error) {
      console.error(`Error loading image ${imagePath}:`, error);
    }
  }

  return images;
}

export async function generateOgImageForPost(
  post: CollectionEntry<"blog">,
  images?: Buffer[]
) {
  const svg = await satori(postOgImage({ post, images }), options);
  return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite() {
  const svg = await satori(siteOgImage(), options);
  return svgBufferToPngBuffer(svg);
}
