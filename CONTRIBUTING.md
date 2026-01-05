# Contributing Guide

Thank you for considering contributing to this blog! This document outlines the standards and processes for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/blog.git`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes: `npm run build && npm run preview`
7. Commit and push
8. Open a Pull Request

## Development Workflow

### Running the Project

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
npm run test:e2e
```

### Branch Naming

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes
- `chore/` - Maintenance tasks

Examples:
- `feature/dark-mode-toggle`
- `fix/mobile-navigation`
- `docs/update-readme`

## Coding Standards

### TypeScript

- Use TypeScript for type safety
- Define interfaces for component props
- Avoid `any` types when possible

```typescript
// Good
interface Props {
  title: string;
  description: string;
}

// Avoid
const props: any = Astro.props;
```

### Astro Components

- Use `.astro` extension for components
- Keep components focused and single-purpose
- Place frontmatter at the top

```astro
---
// Frontmatter: imports and logic
import Component from '../components/Component.astro';

interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!-- Template -->
<div>
  <h1>{title}</h1>
</div>
```

### CSS & Styling

- Use Tailwind utility classes
- Follow shadcn/ui conventions
- Keep custom CSS minimal
- Use CSS variables for theming

```astro
<!-- Good: Tailwind utilities -->
<div class="container mx-auto px-4 py-12">

<!-- Avoid: Inline styles -->
<div style="margin: 0 auto; padding: 48px 16px;">
```

### Accessibility

All contributions must meet WCAG 2.1 AA standards:

- Use semantic HTML (`<nav>`, `<main>`, `<article>`, etc.)
- Include ARIA labels where necessary
- Ensure keyboard navigation works
- Provide alt text for images
- Maintain color contrast ratios
- Test with screen readers when possible

```astro
<!-- Good -->
<nav aria-label="Main navigation">
  <a href="/blog/" aria-current="page">Home</a>
</nav>

<!-- Avoid -->
<div class="nav">
  <a href="/blog/">Home</a>
</div>
```

### Performance

- Keep page weight minimal (< 100KB homepage, < 200KB blog posts)
- Optimize images before adding them
- Avoid unnecessary JavaScript
- Use static generation by default
- Test with Lighthouse (Performance ≥95)

### Content

- Use markdown for blog posts
- Include all required frontmatter fields
- Follow the content schema in `src/content/config.ts`
- Write descriptive commit messages

## Pull Request Process

### Before Submitting

1. **Test your changes**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for errors**:
   ```bash
   npm run test
   ```

3. **Verify accessibility**: Test keyboard navigation and screen reader compatibility

4. **Run Lighthouse audit**: Ensure scores meet requirements (Performance ≥95, Accessibility 100, SEO ≥95)

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Changes Made
- List of specific changes
- Another change
- Another change

## Testing
- [ ] Tested locally with `npm run build && npm run preview`
- [ ] All tests pass
- [ ] Lighthouse audit completed (scores: P: XX, A: XX, SEO: XX)

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project coding standards
- [ ] Documentation updated (if needed)
- [ ] No console warnings or errors
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Tested in multiple browsers
```

### Review Process

1. All PRs require review before merging
2. Address reviewer feedback promptly
3. Keep PRs focused and atomic (one feature/fix per PR)
4. Squash commits if requested

## Constitution Principles

All contributions must align with the project's core principles:

### 1. Content-First
- Prioritize readability and content quality
- Keep UI elements minimal and unobtrusive
- Optimize for reading experience

### 2. Performance & Simplicity
- Target FCP < 1.0s on 4G
- Minimize dependencies
- Use static generation
- Keep bundle sizes small

### 3. Markdown-Based Content
- All blog posts in markdown
- Type-safe with Zod validation
- Version-controlled content

### 4. Accessibility & Inclusivity
- WCAG 2.1 AA compliance mandatory
- Test with assistive technologies
- Semantic HTML required
- Keyboard navigation support

### 5. SEO & Discoverability
- Proper meta tags
- XML sitemap
- RSS feed
- Structured data (JSON-LD)
- Fast load times

## Questions?

If you have questions or need help:

1. Check the [README.md](./README.md) for setup and usage
2. Review existing code for examples
3. Open an issue for discussion before major changes

Thank you for contributing!
