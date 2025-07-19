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
1. Create a new `.md` file in `src/content/blog/`
2. Include required frontmatter fields
3. Use `draft: true` for work-in-progress posts
4. Run build to ensure no TypeScript errors

### Deployment
- Site deploys to peterkellner.net
- CNAME file configured for custom domain
- Ensure all changes pass `npm run build` before committing

## Important Notes
- No test framework is currently set up
- Both npm and yarn lock files exist (prefer npm)
- Docker setup available via docker-compose.yml
- The theme is self-documented - blog posts serve as documentation