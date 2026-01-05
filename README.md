# Personal Blog

A fast, accessible, and SEO-optimized blog built with Astro and shadcn/ui. Designed for performance with a focus on content-first principles.

## Features

- **Static Site Generation**: 100% static pages with zero JavaScript by default
- **Performance Optimized**: FCP < 1.0s on 4G, page weight < 100KB (homepage)
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML, ARIA labels, and keyboard navigation
- **SEO Ready**: XML sitemap, RSS feed, Open Graph tags, Twitter Cards, and JSON-LD structured data
- **Content Management**: Markdown-based posts with frontmatter and content collections
- **Tag Filtering**: Dynamic tag pages for browsing posts by category
- **Post Navigation**: Previous/next navigation between blog posts
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Dark Mode Ready**: CSS variables for easy theme customization

## Tech Stack

- **Framework**: [Astro 5.x](https://astro.build) - Zero-JS-by-default static site generator
- **Styling**: [Tailwind CSS 3.x](https://tailwindcss.com) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com) - Accessible component library
- **Content**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) - Type-safe markdown with Zod validation
- **Deployment**: [GitHub Pages](https://pages.github.com) - Free static hosting
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) - Automated builds and deployments

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/troscoe/blog.git
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:4321/blog](http://localhost:4321/blog) in your browser

## Development

### Available Scripts

```bash
npm run dev          # Start development server (localhost:4321)
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run test         # Run unit tests with Vitest
npm run test:e2e     # Run end-to-end tests with Playwright
```

### Project Structure

```
blog/
├── .github/
│   └── workflows/       # GitHub Actions (CI/CD)
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── components/      # Astro components
│   │   ├── BlogPostCard.astro
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── content/         # Markdown blog posts
│   │   ├── config.ts    # Content collections schema
│   │   └── posts/       # Blog post markdown files
│   ├── layouts/         # Page layouts
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── lib/             # Utility functions
│   │   ├── formatDate.ts
│   │   └── utils.ts
│   ├── pages/           # Routes (file-based routing)
│   │   ├── blog/
│   │   │   ├── [slug].astro    # Dynamic blog post pages
│   │   │   └── index.astro      # All posts page
│   │   ├── tag/
│   │   │   └── [tag].astro      # Dynamic tag filtering pages
│   │   ├── about.astro
│   │   ├── index.astro           # Homepage
│   │   ├── rss.xml.ts            # RSS feed generator
│   │   └── sitemap.xml.ts        # Sitemap generator
│   └── styles/
│       └── global.css            # Global styles + shadcn/ui theme
├── astro.config.mjs              # Astro configuration
├── tailwind.config.cjs           # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

## Creating Blog Posts

### Add a New Post

1. Create a new markdown file in `src/content/posts/`:

```bash
touch src/content/posts/my-new-post.md
```

2. Add frontmatter and content:

```markdown
---
title: 'My New Blog Post'
description: 'A brief description of your post'
pubDate: 2026-01-05
author: 'Tristan Roscoe'
tags: ['web-development', 'javascript']
draft: false
heroImage: '/blog/images/my-post-hero.jpg'  # Optional
heroImageAlt: 'Description of hero image'    # Optional
---

Your blog post content goes here in markdown format.

## Subheading

More content...
```

3. Build and preview:

```bash
npm run build
npm run preview
```

### Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Post title |
| `description` | string | Yes | Short description for meta tags |
| `pubDate` | date | Yes | Publication date |
| `author` | string | No | Author name (defaults to 'Tristan Roscoe') |
| `tags` | string[] | No | Array of tags for categorization |
| `draft` | boolean | No | If true, post won't be published |
| `updatedDate` | date | No | Last updated date |
| `heroImage` | string | No | Path to hero image |
| `heroImageAlt` | string | No | Alt text for hero image |

### Draft Posts

Set `draft: true` in frontmatter to hide a post from production:

```yaml
---
title: 'Work in Progress'
draft: true
---
```

## Deployment

### GitHub Pages Setup

1. Enable GitHub Pages in repository settings:
   - Go to **Settings** → **Pages**
   - Set **Source** to "GitHub Actions"

2. Push to the `main` branch:

```bash
git push origin main
```

3. GitHub Actions will automatically:
   - Run tests
   - Build the site
   - Deploy to GitHub Pages

4. Your site will be available at: `https://troscoe.github.io/blog/`

### Manual Deployment

```bash
npm run build
# The dist/ folder contains the static site
```

## Configuration

### Site URL

Update `astro.config.mjs` if using a custom domain:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/',  // Remove /blog if using root domain
  // ...
});
```

### Styling & Theme

Modify CSS variables in `src/styles/global.css` to customize the theme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... */
}
```

## Performance

### Metrics

- **Homepage**: < 100KB
- **Blog Post**: < 200KB
- **FCP**: < 1.0s on 4G
- **Lighthouse Scores**: Performance ≥95, Accessibility 100, SEO ≥95

### Optimization Techniques

- Static generation with zero JavaScript by default
- Optimized images with lazy loading
- Minimal CSS via Tailwind's tree-shaking
- Efficient font loading with font-display: swap
- Prefetching for instant navigation

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML structure
- ARIA labels for navigation
- Keyboard navigation support
- Skip-to-content link for screen readers
- Focus states for all interactive elements
- Responsive typography (16px → 20px)

## SEO Features

- XML sitemap at `/blog/sitemap.xml`
- RSS feed at `/blog/rss.xml`
- Open Graph meta tags
- Twitter Card meta tags
- JSON-LD structured data (BlogPosting schema)
- Canonical URLs
- Proper heading hierarchy

## License

MIT License - feel free to use this template for your own blog!

## Author

**Tristan Roscoe**

Built with [Astro](https://astro.build) and [shadcn/ui](https://ui.shadcn.com)
