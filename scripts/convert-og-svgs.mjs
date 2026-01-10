#!/usr/bin/env node
/**
 * Pre-build script to convert SVG files in assets/images to PNG for OG image compatibility.
 * Social media platforms require PNG/JPEG for OG images - SVG is not supported.
 *
 * This script:
 * 1. Finds all SVG files in src/assets/images/ that contain "og" in the filename
 * 2. Converts them to PNG using @resvg/resvg-js (already in project dependencies)
 * 3. Saves the PNG to public/images/ with the same name
 *
 * Run: node scripts/convert-og-svgs.mjs
 */

import { Resvg } from "@resvg/resvg-js";
import fs from "node:fs";
import path from "node:path";

const ASSETS_DIR = path.join(process.cwd(), "src", "assets", "images");
const PUBLIC_DIR = path.join(process.cwd(), "public", "images");

// Ensure output directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

function convertSvgToPng(svgPath, pngPath) {
  try {
    const svg = fs.readFileSync(svgPath, "utf-8");
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: "width",
        value: 1200, // OG image standard width
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    fs.writeFileSync(pngPath, pngBuffer);

    const stats = fs.statSync(pngPath);
    console.log(
      `  ✓ Converted: ${path.basename(svgPath)} -> ${path.basename(pngPath)} (${Math.round(stats.size / 1024)}KB, ${pngData.width}x${pngData.height})`
    );
    return true;
  } catch (error) {
    console.error(`  ✗ Failed to convert ${svgPath}:`, error.message);
    return false;
  }
}

function main() {
  console.log("\n🖼️  Converting OG SVG images to PNG...\n");

  if (!fs.existsSync(ASSETS_DIR)) {
    console.log("  No assets/images directory found. Skipping.");
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const svgFiles = files.filter(
    (f) => f.endsWith(".svg") && f.toLowerCase().includes("og")
  );

  if (svgFiles.length === 0) {
    console.log("  No OG SVG files found to convert.");
    return;
  }

  let converted = 0;
  let failed = 0;

  for (const svgFile of svgFiles) {
    const svgPath = path.join(ASSETS_DIR, svgFile);
    const pngFile = svgFile.replace(/\.svg$/i, ".png");
    const pngPath = path.join(PUBLIC_DIR, pngFile);

    // Check if PNG already exists and is newer than SVG
    if (fs.existsSync(pngPath)) {
      const svgStat = fs.statSync(svgPath);
      const pngStat = fs.statSync(pngPath);

      if (pngStat.mtimeMs > svgStat.mtimeMs) {
        console.log(`  ⏭️  Skipping: ${svgFile} (PNG is up to date)`);
        continue;
      }
    }

    if (convertSvgToPng(svgPath, pngPath)) {
      converted++;
    } else {
      failed++;
    }
  }

  console.log(`\n  Done! Converted: ${converted}, Failed: ${failed}\n`);
}

main();
