# Implementation Plan: Blog Foundation

**Branch**: `001-blog-foundation` | **Date**: 2026-01-04 | **Spec**: [/memory/specs/001-blog-foundation.md](../specs/001-blog-foundation.md)

**Input**: Feature specification from `/memory/specs/001-blog-foundation.md`

## Summary

Build a static personal blog using Astro + shadcn/ui with markdown-based content, extreme performance (<1s FCP on 4G), and free hosting on GitHub Pages. The blog will be 100% static with zero server-side processing, meeting WCAG 2.1 AA accessibility standards and achieving Lighthouse scores ≥95 for performance, 100 for accessibility, and ≥95 for SEO.

## Technical Context

**Language/Version**: TypeScript 5.x + Node.js 20.x LTS
**Framework**: Astro 4.x (static site generator with islands architecture)
**UI Components**: React 18.x (islands only) + shadcn/ui
**Styling**: Tailwind CSS 3.x (required for shadcn/ui)
**Primary Dependencies**:
- Astro (SSG framework)
- React + React DOM (for UI component islands)
- Tailwind CSS + PostCSS + Autoprefixer
- @astrojs/react (React integration)
- @astrojs/tailwind (Tailwind integration)
- Radix UI primitives (via shadcn/ui components)
- Sharp (image optimization, included with Astro)

**Content Processing**:
- Astro Content Collections API (built-in frontmatter + validation)
- Shiki (syntax highlighting, built into Astro)
- Markdown/MDX support (built into Astro)

**Storage**: Static markdown files in `/src/content/posts/` directory (no database)
**Testing**: Vitest (unit), Playwright (e2e), axe-core (accessibility), Lighthouse CI (performance)
**Build Tool**: Vite (built into Astro)
**Target Platform**: Static hosting (GitHub Pages with Fastly CDN)
**Project Type**: Web (static site)
**Performance Goals**:
- First Contentful Paint: <1.0s on 4G, <1.5s on 3G
- Total Blocking Time: <200ms
- Cumulative Layout Shift: <0.1
- Page weight: <100KB homepage, <200KB article pages (excluding images)
- Lighthouse Performance: ≥95

**Constraints**:
- 100% static (no server-side rendering or API routes)
- Zero JavaScript required for core reading functionality
- WCAG 2.1 AA compliant (Lighthouse Accessibility: 100)
- Must work on GitHub Pages (no custom server logic)
- Must support custom domains with HTTPS

**Scale/Scope**:
- ~10-50 blog posts initially
- Single author
- ~5-10 pages (home, blog list, about, tags, individual posts)
- Support for code-heavy technical posts with syntax highlighting

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. Content-First ✅
- **Compliance**: Astro is specifically designed for content-focused sites
- **Validation**: Islands architecture ensures minimal JS, content loads first
- **No violations**

### II. Performance & Simplicity ✅
- **Compliance**: Static generation + CDN = optimal performance
- **Target**: <1.5s FCP on 3G aligns with constitution requirement
- **Simplicity**: Astro's zero-JS-by-default approach enforces simplicity
- **No violations**

### III. Markdown-Based Content ✅
- **Compliance**: All content in markdown files with frontmatter
- **Storage**: `/src/content/posts/*.md` files version-controlled in Git
- **Portability**: Content is portable, no proprietary formats
- **No violations**

### IV. Accessibility & Inclusivity ✅
- **Compliance**: shadcn/ui built on Radix UI (WCAG compliant primitives)
- **Testing**: axe-core + Lighthouse accessibility audits required
- **Target**: Lighthouse Accessibility score 100
- **Semantic HTML**: Astro encourages semantic markup
- **No violations**

### V. SEO & Discoverability ✅
- **Compliance**: Static HTML, meta tags, sitemap, RSS generation planned
- **Structure**: Clean URLs, proper heading hierarchy
- **Social**: Open Graph + Twitter Card metadata
- **No violations**

**Post-Design Re-Check**: To be validated after Phase 1 design artifacts are complete.

## Project Structure

### Documentation (this feature)

```text
memory/
├── constitution.md
├── specs/
│   └── 001-blog-foundation.md
├── plans/
│   ├── 001-blog-foundation-plan.md      # This file
│   ├── 001-blog-foundation-research.md  # Phase 0 output
│   └── 001-blog-foundation-data-model.md # Phase 1 output
└── tasks/
    └── 001-blog-foundation-tasks.md      # Phase 2 output (via /speckit.tasks)
```

### Source Code (repository root)

```text
blog/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions for deployment
│
├── public/                         # Static assets (favicon, robots.txt, etc.)
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── components/                 # React components (shadcn/ui + custom)
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   └── ...
│   │   ├── BlogPostCard.astro     # Astro components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Navigation.astro
│   │
│   ├── content/                    # Content collections
│   │   ├── config.ts              # Content schema definitions
│   │   └── posts/                 # Blog posts
│   │       ├── first-post.md
│   │       └── ...
│   │
│   ├── layouts/                    # Page layouts
│   │   ├── BaseLayout.astro       # Base HTML structure
│   │   ├── BlogPostLayout.astro   # Individual post layout
│   │   └── BlogListLayout.astro   # Post list layout
│   │
│   ├── pages/                      # File-based routing
│   │   ├── index.astro            # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro        # Blog list page
│   │   │   ├── [slug].astro       # Individual post pages
│   │   │   └── tag/
│   │   │       └── [tag].astro    # Tag filter pages
│   │   ├── about.astro
│   │   ├── rss.xml.ts             # RSS feed generator
│   │   └── sitemap.xml.ts         # Sitemap generator
│   │
│   ├── styles/                     # Global styles
│   │   └── global.css             # Tailwind directives + custom CSS
│   │
│   └── lib/                        # Utility functions
│       ├── utils.ts               # General utilities
│       └── formatDate.ts          # Date formatting
│
├── tests/                          # Test suites
│   ├── unit/                      # Vitest unit tests
│   ├── e2e/                       # Playwright e2e tests
│   └── accessibility/             # axe-core a11y tests
│
├── .vscode/                        # VS Code settings
├── astro.config.mjs               # Astro configuration
├── tailwind.config.cjs            # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── components.json                # shadcn/ui configuration
├── package.json
└── README.md
```

**Structure Decision**: Web application (static site) structure selected because this is a content-focused website. Astro's file-based routing in `src/pages/` provides clean URL structure. Content stored in `src/content/posts/` using Astro's Content Collections API for type-safe frontmatter and automatic validation.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution violations detected. All architectural decisions align with the five core principles:
- Content-First: Astro is purpose-built for content sites
- Performance & Simplicity: Static generation is the simplest, fastest approach
- Markdown-Based: All content in portable markdown files
- Accessibility: shadcn/ui provides accessible components by default
- SEO: Static HTML optimized for search engines

## Implementation Phases

### Phase 0: Research & Technology Validation

**Objective**: Validate technology choices and resolve any unknowns.

**Research Tasks**:
1. Verify Astro + shadcn/ui integration approach (React islands)
2. Confirm GitHub Pages deployment workflow with GitHub Actions
3. Research Astro Content Collections schema for blog post metadata
4. Identify best practices for Tailwind + Astro setup
5. Validate performance optimization techniques for Astro

**Output**: `001-blog-foundation-research.md` documenting:
- Astro + React + shadcn/ui integration patterns
- GitHub Pages deployment configuration
- Content Collections schema design
- Performance optimization checklist

### Phase 1: Design & Contracts

**Objective**: Define data models and page contracts.

**Design Artifacts**:
1. **Data Model** (`001-blog-foundation-data-model.md`):
   - Blog Post schema (frontmatter fields)
   - Tag/Category structure
   - Site configuration types

2. **Page Contracts**:
   - Homepage: List of recent posts
   - Blog list page: All posts with pagination
   - Individual post page: Full post content + metadata
   - Tag pages: Filtered post lists
   - About page: Static content

3. **Component Contracts**:
   - Which components are Astro vs React islands
   - Props and interfaces for each component

**Output**: Data model document + component architecture

### Phase 2: Task Breakdown

**Objective**: Generate actionable task list (done via `/speckit.tasks` command).

Tasks will cover:
- Project initialization
- Astro + dependencies setup
- shadcn/ui integration
- Content Collections configuration
- Page/component implementation
- Styling and responsive design
- GitHub Pages deployment setup
- Testing infrastructure
- Performance optimization

## Key Technical Decisions

### Why Astro?
- Zero JavaScript by default (only interactive islands)
- Built-in markdown/MDX support with Content Collections
- Fastest SSG for content-focused sites
- Perfect for blogs (used by major tech blogs)
- Built-in image optimization

### Why shadcn/ui?
- Accessible by default (Radix UI primitives)
- Copy-paste components (no NPM package bloat)
- Customizable with Tailwind
- Works with Astro via React islands
- Modern, professional design

### Why GitHub Pages?
- 100% free for public repositories
- Custom domain + free SSL
- Global CDN (Fastly)
- Simple deployment via GitHub Actions
- No vendor lock-in

### Why TypeScript?
- Type safety for configuration and frontmatter
- Better developer experience with autocomplete
- Catch errors at build time
- Aligns with modern web development best practices

## Next Steps

After this plan is approved:
1. Execute Phase 0 research (document Astro + shadcn/ui integration)
2. Execute Phase 1 design (data model + component contracts)
3. Run `/speckit.tasks` to generate actionable task breakdown
4. Begin implementation with `/speckit.implement`
