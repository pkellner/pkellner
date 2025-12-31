# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Peter Kellner's personal blog built with AstroPaper theme (v4.4.0), a minimal, responsive, accessible and SEO-friendly Astro blog theme. The site is hosted at peterkellner.net.

## Key Technologies

- **Framework**: Astro 5.12.0 (Static Site Generator)
- **Languages**: TypeScript, JavaScript, CSS
- **UI Components**: React 18.2.0, AlpineJS 3.13.5
- **Styling**: TailwindCSS 3.4.1 with Typography plugin
- **Search**: FuseJS for fuzzy search
- **Image Generation**: Dynamic OG images using Satori

## Common Development Commands

```bash
# Install dependencies
npm install

# Development server (localhost:4321)
npm run dev

# Build for production with type checking
npm run build

# Clean build (removes dist folder first)
npm run buildclear

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code (no npm script, use directly)
npx prettier --write .

# Sync Astro types
npm run sync

# Commit with commitizen
npm run cz
```

## Architecture & Structure

### Content Management
- Blog posts are stored in `src/content/blog/` as Markdown files
- Posts support frontmatter with fields: title, author, pubDatetime, postSlug, featured, draft, tags, ogImage, description
- Draft posts are hidden in production but visible in development
- Posts are automatically sorted by date

### Key Directories
- `src/pages/` - Astro pages (routes)
- `src/components/` - Reusable components (Astro, React)
- `src/layouts/` - Page layouts
- `src/content/blog/` - Blog post markdown files
- `src/styles/` - Global styles
- `src/utils/` - Utility functions
- `public/` - Static assets

### Configuration
- Site config: `src/config.ts` - Contains SITE object with website URL, author, title, etc.
- Astro config: `astro.config.ts` - Integrations and markdown settings
- TypeScript: `tsconfig.json` - Strict mode enabled with path aliases

### Important Features
- **SEO**: Automatic sitemap generation, RSS feed, meta tags
- **Dark Mode**: Supported with system preference detection
- **Search**: Client-side fuzzy search across all posts
- **Pagination**: Configurable posts per page (default: 4)
- **Social Links**: Configured in `src/config.ts` SOCIALS array

## Development Guidelines

### Code Style
- ESLint configured with TypeScript support (flat config format)
- Prettier with Astro and TailwindCSS plugins
- Markdown linting with markdownlint
- Use conventional commits (enforced via commitizen)

### Testing Builds
**IMPORTANT**: Always run both `npm run build` and `npm run dev` to ensure there are no errors or warnings before committing changes.

### Adding New Posts

**Full details in [BLOG-GUIDELINES.md](./BLOG-GUIDELINES.md)** - Read this for comprehensive patterns and examples.

#### Blog Post Checklist

1. **Create file**: `src/content/blog/YYYY-MM-DD-kebab-case-title.md`
2. **Required frontmatter**:
   ```yaml
   ---
   title: Descriptive Title with Key Technologies
   description: Compelling 1-2 sentence summary for SEO (150-160 chars)
   pubDatetime: 2025-01-15T10:00:00.000Z
   draft: false
   tags: [primary-tech, secondary-tech, topic]
   ogImage: /images/your-post-og.png  # Optional custom OG
   ---
   ```
3. **Post structure**:
   - **TL;DR section first** (2-3 sentences MAX - just the core takeaway, maybe one link)
   - **Fun image right after TL;DR** (same image used for OG - visually represents the topic)
   - Clear H2/H3 sections
   - Code blocks with syntax highlighting
   - Tables for comparisons
   - Links to external resources (Wikipedia, official docs) for SEO
4. **Run build**: `npm run build` to generate OG images and verify

#### Creating Fun OG Images (IMPORTANT)

Every blog post should have a custom, engaging OG image for social media sharing:

1. **Create SVG** at `src/assets/images/your-post-og.svg` (1200x630 pixels)
   - Dark gradient backgrounds work well
   - Include visual elements representing the topic (icons, tech logos)
   - Large readable title text
   - Keep it fun and eye-catching

2. **Build converts to PNG**: The `prebuild` script auto-converts SVGs with `og` in filename to PNG

3. **Reference in frontmatter**: `ogImage: /images/your-post-og.png`

Example SVG structure:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#1a1a2e"/>
  <!-- Visual elements for topic -->
  <text x="600" y="550" font-size="38" fill="#fff" text-anchor="middle">Title Here</text>
</svg>
```

#### SEO: Add Hyperlinks

Link key terms throughout posts for SEO:
- **Technologies**: `[MySQL](https://www.mysql.com/)`, `[Docker](https://www.docker.com/)`
- **AWS services**: `[AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)`
- **Concepts**: `[environment variables](https://en.wikipedia.org/wiki/Environment_variable)`
- **Tools**: `[HashiCorp Vault](https://www.vaultproject.io/)`

### Deployment
- Site deploys to peterkellner.net
- CNAME file configured for custom domain
- Ensure all changes pass `npm run build` before committing

## Important Notes
- No test framework is currently set up
- Both npm and yarn lock files exist (prefer npm)
- Docker setup available via docker-compose.yml
- The theme is self-documented - blog posts serve as documentation