# Phase 0 Research: Blog Foundation

**Feature**: Blog Foundation | **Date**: 2026-01-04 | **Status**: Complete

## Research Objectives

1. Validate Astro + shadcn/ui integration via React islands
2. Confirm GitHub Pages deployment workflow
3. Design Content Collections schema for blog posts
4. Document performance optimization strategies
5. Identify testing approach for static Astro sites

## 1. Astro + shadcn/ui Integration

### Decision: Use React Islands for Interactive Components

**Approach**:
- Install `@astrojs/react` integration
- Configure shadcn/ui with Tailwind CSS
- Use React components as "islands" for interactive UI only
- Keep layout/structure components as native Astro components

**Implementation Pattern**:

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  site: 'https://yourusername.github.io',
  base: '/your-repo-name', // or '/' for user/org pages
  output: 'static' // Important for GitHub Pages
});
```

**shadcn/ui Setup**:
```bash
# Initialize shadcn/ui (creates components.json)
npx shadcn-ui@latest init

# Add components as needed
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
```

**Component Usage Pattern**:
```astro
---
// BlogPost.astro (Astro component - no JS shipped)
import { Card } from '@/components/ui/card';
const { title, excerpt } = Astro.props;
---

<Card class="blog-post-card">
  <h2>{title}</h2>
  <p>{excerpt}</p>
</Card>
```

For interactive components (like theme toggle, search):
```astro
---
import ThemeToggle from '@/components/ThemeToggle.tsx';
---

<!-- Only ships JS for this specific island -->
<ThemeToggle client:load />
```

**Rationale**:
- Astro components = zero JS (perfect for static content)
- React islands = minimal JS only where interactivity needed
- shadcn/ui works seamlessly with Tailwind + React
- Best of both worlds: performance + modern UI components

**Alternatives Considered**:
- ❌ Pure Astro components: No access to shadcn/ui ecosystem
- ❌ Full React app: Unnecessary JS bundle for static blog
- ✅ Hybrid approach: Zero JS by default + islands for interactivity

## 2. GitHub Pages Deployment

### Decision: GitHub Actions Workflow with Astro Build

**Deployment Configuration**:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Repository Settings Required**:
1. Enable GitHub Pages in repo settings
2. Set source to "GitHub Actions"
3. Configure custom domain (optional)

**Base Path Configuration**:
- User/org pages (`username.github.io`): `base: '/'`
- Project pages (`username.github.io/repo`): `base: '/repo'`

**Rationale**:
- Official Astro-recommended approach for GitHub Pages
- Automatic builds on push to main
- No manual deployment steps
- Free SSL + CDN included

**Alternatives Considered**:
- ❌ Manual gh-pages branch: Outdated, more complex
- ❌ Netlify/Vercel: Not free for commercial use, extra setup
- ✅ GitHub Actions: Native, free, automatic

## 3. Content Collections Schema

### Decision: Type-Safe Frontmatter with Zod Validation

**Schema Definition**:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content', // markdown/MDX files
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Your Name'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

**Frontmatter Example**:

```markdown
---
title: "My First Blog Post"
description: "An introduction to my new blog built with Astro"
pubDate: 2026-01-04
tags: ["astro", "blogging", "web-development"]
draft: false
heroImage: "/images/first-post.jpg"
heroImageAlt: "A laptop with code on the screen"
---

# Content starts here...
```

**Querying Posts**:

```typescript
// In any .astro file
import { getCollection } from 'astro:content';

// Get all published posts, sorted by date
const posts = (await getCollection('posts', ({ data }) => {
  return data.draft !== true;
})).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

**Rationale**:
- Type safety: Autocomplete + compile-time validation
- Zod schema catches errors early
- Built into Astro (no extra dependencies)
- Easy to extend with new fields

**Alternatives Considered**:
- ❌ Manual parsing: Error-prone, no type safety
- ❌ gray-matter: Extra dependency, no validation
- ✅ Content Collections: Native, validated, type-safe

## 4. Performance Optimization Strategies

### Decision: Multi-Layered Optimization Approach

**Level 1: Astro Configuration**
```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'auto', // Inline small CSS
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
    },
  },
});
```

**Level 2: Image Optimization**
```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image
  src={heroImage}
  alt="Hero image"
  width={800}
  height={600}
  format="webp"
  quality={80}
  loading="lazy"
/>
```

**Level 3: Font Optimization**
- Use system fonts or self-host Google Fonts
- Subset fonts to only needed characters
- Use `font-display: swap` for FOIT prevention

**Level 4: Tailwind Purging**
```javascript
// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  // Unused styles automatically purged
};
```

**Level 5: Lighthouse CI**
```yaml
# .github/workflows/lighthouse.yml
# Run Lighthouse on every PR to enforce budgets
```

**Performance Budgets**:
- FCP: <1.0s (4G), <1.5s (3G)
- Page weight: <100KB (homepage), <200KB (posts)
- Lighthouse Performance: ≥95
- TBT: <200ms
- CLS: <0.1

**Rationale**:
- Astro's static output is inherently fast
- Image optimization via Sharp (built-in)
- Tailwind purging removes unused CSS
- Budgets enforced via CI

**Alternatives Considered**:
- ❌ No optimization: Violates performance requirements
- ❌ Manual optimization: Error-prone, inconsistent
- ✅ Automated + budgets: Enforced, measurable

## 5. Testing Strategy

### Decision: Multi-Level Testing Pyramid

**Unit Tests (Vitest)**:
```typescript
// tests/unit/formatDate.test.ts
import { describe, it, expect } from 'vitest';
import { formatDate } from '@/lib/formatDate';

describe('formatDate', () => {
  it('formats dates correctly', () => {
    const date = new Date('2026-01-04');
    expect(formatDate(date)).toBe('January 4, 2026');
  });
});
```

**E2E Tests (Playwright)**:
```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage displays blog posts', async ({ page }) => {
  await page.goto('http://localhost:4321');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.locator('.blog-post-card')).toHaveCount(3);
});
```

**Accessibility Tests (axe-core + Playwright)**:
```typescript
// tests/accessibility/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage should not have accessibility violations', async ({ page }) => {
  await page.goto('http://localhost:4321');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

**Lighthouse CI** (in GitHub Actions):
- Performance: ≥95
- Accessibility: 100
- SEO: ≥95
- Best Practices: ≥95

**Rationale**:
- Unit tests: Fast feedback for utilities
- E2E tests: Validate user flows
- A11y tests: Enforce WCAG 2.1 AA
- Lighthouse: Performance budgets

**Alternatives Considered**:
- ❌ No testing: Risky for regressions
- ❌ Manual testing: Not scalable
- ✅ Automated pyramid: Fast + comprehensive

## Summary of Decisions

| Area | Decision | Rationale |
|------|----------|-----------|
| Framework | Astro 4.x | Zero JS by default, perfect for blogs |
| UI Components | shadcn/ui via React islands | Accessible, modern, minimal JS |
| Styling | Tailwind CSS | Required for shadcn/ui, automatic purging |
| Content | Content Collections + Zod | Type-safe, validated frontmatter |
| Hosting | GitHub Pages | Free, custom domain, automatic SSL |
| Deployment | GitHub Actions | Native, automatic, no manual steps |
| Images | Astro Image + Sharp | WebP/AVIF, automatic optimization |
| Testing | Vitest + Playwright + axe | Unit, E2E, accessibility coverage |
| Performance | Multi-layer optimization | Meets <1s FCP requirement |

## Implementation Readiness

✅ All technology choices validated
✅ Integration patterns documented
✅ Deployment workflow confirmed
✅ Testing strategy defined
✅ Performance optimization planned

**Status**: Ready to proceed to Phase 1 (Data Model + Component Design)
