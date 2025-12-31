# Blog Post Creation Guidelines

This document provides comprehensive guidelines for creating blog posts for peterkellner.net. AI assistants should follow these patterns when helping create new content.

## Table of Contents

- [Blog Post Structure](#blog-post-structure)
- [Frontmatter Requirements](#frontmatter-requirements)
- [Image Guidelines](#image-guidelines)
- [OG Image Creation](#og-image-creation)
- [Writing Style](#writing-style)
- [SEO Best Practices](#seo-best-practices)
- [Deployment Checklist](#deployment-checklist)

---

## Blog Post Structure

Every blog post should follow this general structure:

### 1. Frontmatter (Required)

```yaml
---
title: Descriptive Title That Includes Key Technology Names
description: A compelling 1-2 sentence summary for SEO and social sharing.
pubDatetime: 2025-01-15T10:00:00.000Z
draft: false
tags:
  - primary-tech
  - secondary-tech
  - topic-area
categories:
  - main-category
ogImage: /images/your-custom-og-image.png  # Optional - if not provided, auto-generated
---
```

### 2. Title (H1)

Repeat the title as an H1 heading immediately after frontmatter.

### 3. TL;DR Section (REQUIRED)

**Keep it SHORT: 2-3 sentences maximum.** Just the core takeaway. Maybe one link.

```markdown
## TL;DR

Use AI to write password rotation scripts, but generate the actual passwords locally with `openssl rand -hex 24` so they never touch the AI. [Jump to the script](#the-complete-script).
```

**What NOT to do:**
- No tables in TL;DR
- No bullet lists
- No code blocks
- No multiple paragraphs
- If it takes more than 5 seconds to read, it's too long

### 4. Fun Image After TL;DR (REQUIRED)

Include a visually engaging image right after the TL;DR section. This same image should be used as the OG image for social media sharing.

```markdown
---

![Descriptive alt text about the topic](/images/your-post-og.png)

## Introduction
```

**Image requirements:**
- Should be fun, eye-catching, and represent the post topic
- Same image referenced in frontmatter `ogImage` field
- Placed after the `---` that ends TL;DR, before Introduction
- See [OG Image Creation](#og-image-creation) for design tips

### 5. Introduction/Motivation

Explain the problem being solved and why it matters. Personal anecdotes and real-world context make posts more engaging.

### 6. Main Content

- Use clear H2 and H3 headers for sections
- Include code blocks with proper syntax highlighting
- Add images to illustrate complex concepts
- Use tables for comparing options
- Include diagrams where helpful (can be ASCII art or SVG)

### 7. Conclusion

Summarize key takeaways and provide next steps or call to action.

### 8. Further Reading (Optional)

Link to authoritative external resources for readers who want to dive deeper.

---

## Frontmatter Requirements

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `title` | Descriptive, SEO-friendly title | `"Building a Real-Time Dashboard with Next.js"` |
| `description` | 1-2 sentence summary | `"How to create a live-updating status dashboard..."` |
| `pubDatetime` | ISO 8601 date | `2025-01-15T10:00:00.000Z` |
| `draft` | Boolean | `false` (for published) |
| `tags` | Array of lowercase tags | `["nextjs", "typescript", "react"]` |

### Optional Fields

| Field | Description | Example |
|-------|-------------|---------|
| `ogImage` | Custom OG image path | `/images/my-custom-og.png` |
| `categories` | Broader topic areas | `["react", "devops"]` |
| `modDatetime` | Last modified date | `2025-01-20T14:00:00.000Z` |
| `featured` | Show on homepage | `true` |

---

## Image Guidelines

### Where to Store Images

1. **Post-specific images**: `public/postimages2024/YYYY-MM-DD-slug/`
2. **OG images (custom)**: `public/images/`
3. **OG images (source SVG)**: `src/assets/images/`

### Image Naming Convention

```
# Post images
public/postimages2024/2025-01-15-my-post-slug/
  ├── hero-image.png
  ├── diagram-1.png
  ├── screenshot-1.png
  └── result.png

# Custom OG images
public/images/
  └── my-post-og.png

# Source SVGs for OG (auto-converted to PNG on build)
src/assets/images/
  └── my-post-og.svg
```

### Image Best Practices

1. **Use descriptive filenames**: `dashboard-running.png` not `img1.png`
2. **Optimize file sizes**: Keep images under 500KB when possible
3. **Include alt text**: Always provide meaningful descriptions
4. **Use appropriate formats**:
   - PNG: Screenshots, diagrams, images with text
   - JPEG: Photos, complex images
   - SVG: Icons, simple graphics (for source files only)

---

## OG Image Creation

Open Graph images are displayed when your post is shared on social media. They should be visually appealing and convey the post's topic.

### Automatic OG Generation

If no `ogImage` is specified in frontmatter, the build process automatically generates an OG image using the post title and extracted images.

### Custom OG Images

For a more engaging social media presence, create custom OG images:

#### Option 1: Create an SVG (Recommended)

Create an SVG in `src/assets/images/` with `og` in the filename. The build process will automatically convert it to PNG.

**Requirements:**
- Dimensions: 1200x630 pixels (standard OG size)
- Include `og` in filename: `mysql-password-rotation-og.svg`
- Keep text large and readable
- Use high contrast colors

**Example SVG structure:**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#16213e"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Main visual elements representing the topic -->
  <!-- ... icons, illustrations related to post topic ... -->

  <!-- Title text (large, readable) -->
  <text x="600" y="550" font-family="Arial" font-size="38" font-weight="bold"
        fill="#ffffff" text-anchor="middle">
    Your Post Title Here
  </text>

  <!-- Subtitle/tagline -->
  <text x="600" y="590" font-family="Arial" font-size="22"
        fill="#00d4aa" text-anchor="middle">
    A compelling subtitle
  </text>
</svg>
```

#### Option 2: Create PNG Directly

Place PNG files directly in `public/images/` with dimensions 1200x630 pixels.

### OG Image Design Tips

1. **Make it fun and relevant**: Include visual elements that represent the post topic
2. **Use bold colors**: Dark backgrounds with bright accent colors work well
3. **Keep text minimal**: Title and maybe one subtitle
4. **Include recognizable icons**: Tech logos, relevant symbols
5. **Add personality**: Playful elements make posts more shareable
6. **Test readability**: Text should be readable at small sizes (social media thumbnails)

### Referencing OG Images in Frontmatter

```yaml
# For PNG in public/images/
ogImage: /images/my-post-og.png

# The build process handles SVG conversion automatically
# Just reference the PNG path (it will be created from your SVG)
ogImage: /images/my-svg-source-og.png
```

---

## Writing Style

### Voice and Tone

- **Conversational**: Write as if explaining to a colleague
- **Technical but accessible**: Define terms, don't assume knowledge
- **Personal**: Share real experiences and motivations
- **Practical**: Focus on actionable information

### Code Examples

```markdown
**Good:**
\`\`\`bash
# Generate a secure password using OpenSSL
openssl rand -hex 24
\`\`\`

**Better (with context):**
\`\`\`bash
# Generate a 48-character hexadecimal password
# This uses your system's cryptographic random number generator
openssl rand -hex 24
# Output: a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3
\`\`\`
```

### Section Headers

- Use descriptive headers that can stand alone
- Include key terms for SEO
- Follow a logical hierarchy (H2 → H3 → H4)

### Tables for Comparisons

Use tables when comparing options:

```markdown
| Option | Best For | Complexity |
|--------|----------|------------|
| Docker Compose | Local dev | Low |
| Kubernetes | Production | High |
```

---

## SEO Best Practices

### Hyperlinks

Add hyperlinks to key terms throughout the post:

1. **Technologies**: Link to official documentation
   - `[MySQL](https://www.mysql.com/)`, `[Docker](https://www.docker.com/)`

2. **Concepts**: Link to Wikipedia or authoritative sources
   - `[environment variables](https://en.wikipedia.org/wiki/Environment_variable)`

3. **Tools**: Link to project pages
   - `[HashiCorp Vault](https://www.vaultproject.io/)`

4. **Cloud services**: Link to service pages
   - `[AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)`

### Keyword Placement

- Include primary keyword in title
- Use keyword variations in headers
- Naturally incorporate keywords in first paragraph

### Meta Description

Write a compelling description (150-160 characters) that:
- Summarizes the post value
- Includes primary keyword
- Encourages clicks

---

## Deployment Checklist

Before publishing a new blog post:

### 1. Content Review

- [ ] Title is descriptive and SEO-friendly
- [ ] Description is compelling (150-160 chars)
- [ ] All code examples are tested and correct
- [ ] Images have descriptive alt text
- [ ] Links are working and point to HTTPS URLs
- [ ] Grammar and spelling checked

### 2. Images

- [ ] Hero image included (recommended)
- [ ] Custom OG image created (optional but recommended)
- [ ] All images optimized for web
- [ ] Image paths are correct

### 3. Frontmatter

- [ ] `pubDatetime` is set correctly
- [ ] `draft: false` when ready to publish
- [ ] Tags are lowercase and relevant
- [ ] `ogImage` path is correct (if custom)

### 4. Build and Test

```bash
# Run the build to generate OG images and check for errors
npm run build

# Preview locally
npm run preview
# or
npm run dev

# Check the post at its URL
# http://localhost:4321/YYYY/MM/DD/post-slug/
```

### 5. Commit

```bash
# Stage all files including generated OG images
git add .

# Commit with descriptive message
git commit -m "Add blog post: Your Post Title"

# Push to deploy
git push
```

---

## Quick Reference: File Naming

```
New blog post files:

src/content/blog/
  └── YYYY-MM-DD-kebab-case-title.md

Post images:
public/postimages2024/
  └── YYYY-MM-DD-kebab-case-title/
      ├── hero.png
      └── other-images.png

Custom OG (source):
src/assets/images/
  └── kebab-case-title-og.svg

Custom OG (generated/direct):
public/images/
  └── kebab-case-title-og.png
```

---

## Example: Complete Blog Post Template

```markdown
---
title: Building a Real-Time Dashboard with Next.js and WebSockets
description: Learn how to create a live-updating status dashboard using Next.js, TypeScript, and WebSocket connections for instant data updates.
pubDatetime: 2025-01-15T10:00:00.000Z
draft: false
tags:
  - nextjs
  - typescript
  - websockets
  - react
categories:
  - react
  - web-development
ogImage: /images/realtime-dashboard-og.png
---

# Building a Real-Time Dashboard with Next.js and WebSockets

![Real-time dashboard in action](/postimages2024/2025-01-15-realtime-dashboard/dashboard-demo.png)

## TL;DR

**The Big Idea:** Use WebSockets with [Next.js](https://nextjs.org/) for instant UI updates without polling.

**Jump to:** [The Implementation](#the-implementation)

---

## Introduction

[Explain the problem and motivation...]

## The Implementation

### Setting Up WebSocket Server

\`\`\`typescript
// websocket-server.ts
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  // ...
});
\`\`\`

[Continue with implementation details...]

## Conclusion

[Summary and next steps...]

## Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [WebSocket API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
```
