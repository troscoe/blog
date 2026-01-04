# Tasks: Blog Foundation

**Input**: Design documents from `/memory/plans/` and spec from `/memory/specs/001-blog-foundation.md`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅

**Tests**: Tests are included per spec requirements (Vitest, Playwright, axe-core, Lighthouse CI)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Project type**: Web application (static site)
- **Root structure**: `src/`, `public/`, `tests/` at repository root
- All paths are absolute from repository root

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic Astro structure

- [ ] T001 Initialize Node.js project with package.json (Node 20.x LTS)
- [ ] T002 [P] Install Astro 4.x and create basic astro.config.mjs
- [ ] T003 [P] Install and configure TypeScript with tsconfig.json
- [ ] T004 [P] Install Tailwind CSS and create tailwind.config.cjs
- [ ] T005 [P] Install @astrojs/react integration for component islands
- [ ] T006 [P] Install @astrojs/tailwind integration
- [ ] T007 [P] Initialize shadcn/ui with components.json configuration
- [ ] T008 [P] Create basic directory structure (src/components, src/pages, src/content, src/layouts, src/styles, src/lib)
- [ ] T009 [P] Create public/ directory with favicon.svg and robots.txt
- [ ] T010 [P] Configure ESLint and Prettier for code quality
- [ ] T011 [P] Create .gitignore for Node.js, dist/, and IDE files

**Checkpoint**: Project structure and tooling initialized

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T012 Configure Astro for GitHub Pages (set site, base, output: 'static') in astro.config.mjs
- [ ] T013 Create Content Collections schema in src/content/config.ts (BlogPost schema with Zod)
- [ ] T014 Create BaseLayout.astro in src/layouts/ (HTML structure, meta tags, global styles)
- [ ] T015 Create global.css in src/styles/ with Tailwind directives and typography settings
- [ ] T016 [P] Create utility functions in src/lib/utils.ts (cn helper for Tailwind)
- [ ] T017 [P] Create date formatting utility in src/lib/formatDate.ts
- [ ] T018 Install shadcn/ui components: card, button (npx shadcn-ui@latest add card button)
- [ ] T019 Create Header.astro component in src/components/ (site navigation)
- [ ] T020 Create Footer.astro component in src/components/ (copyright, links)
- [ ] T021 Setup Vitest for unit testing (install vitest, create vitest.config.ts)
- [ ] T022 Setup Playwright for e2e testing (install @playwright/test, create playwright.config.ts)
- [ ] T023 Setup axe-core for accessibility testing (install @axe-core/playwright)
- [ ] T024 Create GitHub Actions workflow in .github/workflows/deploy.yml for GitHub Pages deployment
- [ ] T025 Create GitHub Actions workflow in .github/workflows/test.yml for CI testing

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Blog Posts (Priority: P1) 🎯 MVP

**Goal**: Readers can browse and read blog posts in a fast-loading, clean interface

**Independent Test**: Create sample markdown posts and verify they render with proper formatting, FCP < 1.5s on 3G

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T026 [P] [US1] E2E test: Homepage displays list of posts in tests/e2e/homepage.spec.ts
- [ ] T027 [P] [US1] E2E test: Blog post page renders markdown correctly in tests/e2e/blog-post.spec.ts
- [ ] T028 [P] [US1] E2E test: Blog post page meets performance budget (<1.5s FCP) in tests/e2e/performance.spec.ts
- [ ] T029 [P] [US1] Accessibility test: Homepage has no a11y violations in tests/accessibility/homepage-a11y.spec.ts
- [ ] T030 [P] [US1] Accessibility test: Blog post page has no a11y violations in tests/accessibility/post-a11y.spec.ts
- [ ] T031 [P] [US1] Unit test: formatDate utility in tests/unit/formatDate.test.ts

### Implementation for User Story 1

- [ ] T032 [P] [US1] Create BlogPostLayout.astro in src/layouts/ (individual post layout with meta tags)
- [ ] T033 [P] [US1] Create BlogPostCard.astro component in src/components/ (displays post preview)
- [ ] T034 [US1] Create homepage at src/pages/index.astro (lists recent posts using getCollection)
- [ ] T035 [US1] Create blog list page at src/pages/blog/index.astro (all posts, sorted by date)
- [ ] T036 [US1] Create dynamic blog post page at src/pages/blog/[slug].astro (renders individual posts)
- [ ] T037 [US1] Create 3 sample blog posts in src/content/posts/ (first-post.md, second-post.md, third-post.md)
- [ ] T038 [US1] Configure Shiki syntax highlighting in astro.config.mjs
- [ ] T039 [US1] Add meta tags generation (title, description, OG tags) to BlogPostLayout.astro
- [ ] T040 [US1] Optimize images with Astro Image component (create example in sample posts)
- [ ] T041 [US1] Test locally and verify FCP < 1.5s with Lighthouse

**Checkpoint**: At this point, User Story 1 should be fully functional - readers can browse and read posts

---

## Phase 4: User Story 2 - Navigate Between Posts (Priority: P2)

**Goal**: Readers can navigate between posts and find content by topic

**Independent Test**: Create posts with tags, verify navigation links work and tag filtering works

### Tests for User Story 2

- [ ] T042 [P] [US2] E2E test: Previous/next post navigation works in tests/e2e/post-navigation.spec.ts
- [ ] T043 [P] [US2] E2E test: Tag filtering displays correct posts in tests/e2e/tag-filter.spec.ts
- [ ] T044 [P] [US2] Accessibility test: Navigation elements are keyboard accessible in tests/accessibility/navigation-a11y.spec.ts

### Implementation for User Story 2

- [ ] T045 [P] [US2] Create Navigation.astro component with links to Home, Blog, About in src/components/
- [ ] T046 [US2] Add previous/next post navigation to BlogPostLayout.astro
- [ ] T047 [US2] Create tag page at src/pages/blog/tag/[tag].astro (filter posts by tag)
- [ ] T048 [US2] Create TagList.astro component in src/components/ (display tags for a post)
- [ ] T049 [US2] Add tags to sample blog posts in src/content/posts/
- [ ] T050 [US2] Integrate Navigation.astro into BaseLayout.astro
- [ ] T051 [US2] Add tag links to BlogPostCard.astro and individual post pages
- [ ] T052 [US2] Test tag filtering with multiple tags

**Checkpoint**: Navigation and tag filtering both work independently

---

## Phase 5: User Story 3 - Access on Any Device (Priority: P1)

**Goal**: Blog works perfectly on mobile, tablet, and desktop with full accessibility

**Independent Test**: Test on different screen sizes and with keyboard/screen reader

### Tests for User Story 3

- [ ] T053 [P] [US3] E2E test: Mobile viewport renders correctly in tests/e2e/responsive.spec.ts
- [ ] T054 [P] [US3] E2E test: Tablet viewport renders correctly in tests/e2e/responsive.spec.ts
- [ ] T055 [P] [US3] E2E test: Desktop viewport renders correctly in tests/e2e/responsive.spec.ts
- [ ] T056 [P] [US3] Accessibility test: Keyboard navigation covers all interactive elements in tests/accessibility/keyboard-nav.spec.ts
- [ ] T057 [P] [US3] Accessibility test: Screen reader announcements are correct in tests/accessibility/screen-reader.spec.ts
- [ ] T058 [P] [US3] Accessibility test: Color contrast meets WCAG 2.1 AA in tests/accessibility/color-contrast.spec.ts

### Implementation for User Story 3

- [ ] T059 [US3] Implement mobile-first responsive design in global.css (breakpoints for tablet, desktop)
- [ ] T060 [US3] Make Header.astro responsive (hamburger menu for mobile using React island)
- [ ] T061 [US3] Make BlogPostCard.astro responsive (stacks on mobile, grid on larger screens)
- [ ] T062 [US3] Ensure all interactive elements have visible focus states in global.css
- [ ] T063 [US3] Add proper ARIA labels to navigation and interactive elements
- [ ] T064 [US3] Test with keyboard-only navigation (Tab, Enter, Escape)
- [ ] T065 [US3] Run axe-core accessibility audit and fix violations
- [ ] T066 [US3] Verify semantic HTML structure (proper heading hierarchy h1->h2->h3)
- [ ] T067 [US3] Test with Chrome DevTools device emulation (iPhone, iPad, desktop)

**Checkpoint**: Blog is fully responsive and accessible

---

## Phase 6: User Story 4 - Search Engine Discovery (Priority: P2)

**Goal**: Blog posts are discoverable via search engines and shareable on social media

**Independent Test**: Verify meta tags, sitemap, and OG tags are present

### Tests for User Story 4

- [ ] T068 [P] [US4] E2E test: Meta tags are present on all pages in tests/e2e/meta-tags.spec.ts
- [ ] T069 [P] [US4] E2E test: Sitemap.xml is valid and contains all posts in tests/e2e/sitemap.spec.ts
- [ ] T070 [P] [US4] E2E test: Open Graph tags are correct in tests/e2e/og-tags.spec.ts

### Implementation for User Story 4

- [ ] T071 [US4] Create sitemap generator at src/pages/sitemap.xml.ts (lists all published posts)
- [ ] T072 [US4] Add Open Graph meta tags to BlogPostLayout.astro (og:title, og:description, og:image)
- [ ] T073 [US4] Add Twitter Card meta tags to BlogPostLayout.astro (twitter:card, twitter:title)
- [ ] T074 [US4] Create About page at src/pages/about.astro with meta tags
- [ ] T075 [US4] Ensure all pages have unique titles and descriptions
- [ ] T076 [US4] Add structured data (JSON-LD) for blog posts in BlogPostLayout.astro
- [ ] T077 [US4] Test sitemap generation (verify /sitemap.xml route)
- [ ] T078 [US4] Test social media preview with Twitter Card Validator / Facebook Debugger
- [ ] T079 [US4] Run Lighthouse SEO audit and aim for score ≥95

**Checkpoint**: SEO and social sharing are optimized

---

## Phase 7: User Story 5 - RSS Feed Subscription (Priority: P3)

**Goal**: Readers can subscribe to the blog via RSS

**Independent Test**: Validate RSS feed with W3C Feed Validator

### Tests for User Story 5

- [ ] T080 [P] [US5] E2E test: RSS feed is valid XML in tests/e2e/rss.spec.ts
- [ ] T081 [P] [US5] E2E test: RSS feed contains all published posts in tests/e2e/rss.spec.ts

### Implementation for User Story 5

- [ ] T082 [US5] Create RSS feed generator at src/pages/rss.xml.ts (generate RSS 2.0 or Atom feed)
- [ ] T083 [US5] Add RSS feed link to Header.astro (icon or text link)
- [ ] T084 [US5] Add RSS feed autodiscovery link tag to BaseLayout.astro head
- [ ] T085 [US5] Test RSS feed locally (/rss.xml)
- [ ] T086 [US5] Validate RSS feed with W3C Feed Validator
- [ ] T087 [US5] Test RSS feed in a feed reader (Feedly, Inoreader, or NetNewsWire)

**Checkpoint**: RSS feed is functional and valid

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final improvements, documentation, and deployment

- [ ] T088 [P] Create README.md with project overview, setup instructions, and deployment guide
- [ ] T089 [P] Create 404 page at src/pages/404.astro (friendly error page)
- [ ] T090 [P] Add loading states and error handling for edge cases
- [ ] T091 Optimize bundle size (check dist/ output, ensure < 100KB homepage)
- [ ] T092 Run full Lighthouse audit across all pages (Performance ≥95, Accessibility 100, SEO ≥95)
- [ ] T093 Test build process (npm run build) and preview (npm run preview)
- [ ] T094 Configure GitHub Pages in repository settings (Actions source)
- [ ] T095 Deploy to GitHub Pages via GitHub Actions
- [ ] T096 Verify live site loads correctly with custom domain (if applicable)
- [ ] T097 Test performance on real 3G/4G connections (WebPageTest or Chrome DevTools throttling)
- [ ] T098 Add analytics placeholder (no-op initially, per constitution privacy requirements)
- [ ] T099 Document content creation workflow in README.md (how to add new posts)
- [ ] T100 Create CONTRIBUTING.md with coding standards and PR process

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (P1), US3 (P1): Highest priority, start first
  - US2 (P2), US4 (P2): Medium priority, start after P1 stories
  - US5 (P3): Lowest priority, can wait until end
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational - Integrates with US1 (adds navigation)
- **User Story 3 (P1)**: Can start after Foundational - No dependencies, focuses on responsive/a11y
- **User Story 4 (P2)**: Can start after Foundational - Integrates with US1 (adds meta tags)
- **User Story 5 (P3)**: Can start after Foundational - Independent RSS generation

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Components before pages (e.g., BlogPostCard before homepage)
- Layouts before pages that use them
- Sample content before pages that display it
- Verify tests pass after implementation

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002-T011)
- All Foundational tasks marked [P] can run in parallel (T016-T017, T018-T020, T021-T023)
- Once Foundational completes:
  - US1 and US3 can run in parallel (both P1, different files)
  - US2 and US4 can run in parallel after US1 (both P2)
- All tests for a user story marked [P] can be written in parallel
- Models/components within a story marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1 + 3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1 (View Posts - P1)
4. Complete Phase 5: User Story 3 (Responsive/A11y - P1)
5. **STOP and VALIDATE**: Test both stories independently
6. Deploy to GitHub Pages
7. **MVP COMPLETE** - Blog is readable, fast, accessible

### Incremental Delivery (Recommended)

1. Setup + Foundational → Foundation ready
2. Add US1 + US3 → Test → Deploy (MVP with reading + accessibility)
3. Add US2 → Test → Deploy (adds navigation + tags)
4. Add US4 → Test → Deploy (adds SEO + social sharing)
5. Add US5 → Test → Deploy (adds RSS feed)
6. Polish → Final deployment

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (T026-T041)
   - Developer B: User Story 3 (T053-T067)
   - Developer C: User Story 2 (T042-T052) - starts after US1 basics done
3. Integrate and test together
4. Continue with US4, US5, and Polish

---

## Estimated Task Counts

- **Phase 1 (Setup)**: 11 tasks
- **Phase 2 (Foundational)**: 14 tasks (CRITICAL PATH)
- **Phase 3 (US1)**: 16 tasks (6 tests + 10 implementation)
- **Phase 4 (US2)**: 11 tasks (3 tests + 8 implementation)
- **Phase 5 (US3)**: 15 tasks (6 tests + 9 implementation)
- **Phase 6 (US4)**: 12 tasks (3 tests + 9 implementation)
- **Phase 7 (US5)**: 8 tasks (2 tests + 6 implementation)
- **Phase 8 (Polish)**: 13 tasks

**Total**: 100 tasks

**Critical Path**: Setup → Foundational → US1 → US3 → Deploy (MVP = ~56 tasks)

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story (US1-US5)
- Each user story should be independently completable and testable
- Verify tests fail before implementing (TDD approach per constitution)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Constitution compliance: All tasks align with 5 core principles
- Performance budgets enforced via Lighthouse CI in Phase 8

---

## Quick Start Checklist

Before starting implementation:

- [ ] Read constitution.md to understand principles
- [ ] Read spec: 001-blog-foundation.md
- [ ] Read plan: 001-blog-foundation-plan.md
- [ ] Read research: 001-blog-foundation-research.md
- [ ] Verify Node.js 20.x is installed
- [ ] Verify git is configured
- [ ] Have GitHub repository ready for deployment

Ready to implement! 🚀
