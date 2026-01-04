<!--
Sync Impact Report:
Version change: (new constitution) → 1.0.0
Modified principles: None (initial creation)
Added sections: All (initial creation)
Removed sections: None
Templates requiring updates: ✅ All templates available for use
Follow-up TODOs: None
-->

# Personal Blog Constitution

## Core Principles

### I. Content-First
The blog prioritizes high-quality content over complex features. Every feature must serve the reader's experience or the author's ability to create great content. Features that don't directly support these goals should be carefully evaluated before implementation.

**Rationale**: A blog exists to share ideas and knowledge. Technical complexity should never overshadow the content itself.

### II. Performance & Simplicity
The blog MUST load quickly and maintain a simple, distraction-free design. Pages should be optimized for performance with minimal dependencies. Target: First Contentful Paint < 1.5s on 3G connections.

**Rationale**: Readers value their time. A fast, simple blog respects that time and improves accessibility across all connection speeds.

### III. Markdown-Based Content
All blog posts and content MUST be written in Markdown format. Content should be portable, version-controllable, and editable in any text editor without proprietary tools.

**Rationale**: Markdown ensures content longevity and portability. Writers can focus on content, not formatting tools.

### IV. Accessibility & Inclusivity
The blog MUST meet WCAG 2.1 AA accessibility standards. This includes semantic HTML, proper heading hierarchy, alt text for images, keyboard navigation, and sufficient color contrast.

**Rationale**: Knowledge should be accessible to everyone, regardless of ability or assistive technology used.

### V. SEO & Discoverability
Content MUST be optimized for search engines and social sharing. This includes proper meta tags, structured data, semantic HTML, clean URLs, and sitemap generation.

**Rationale**: Great content deserves to be discovered. SEO ensures ideas reach those who need them.

## Technical Standards

### Technology Choices
- **Static Site Generation**: Prefer static generation for performance and security
- **Modern Web Standards**: Use standard HTML, CSS, and JavaScript; avoid heavy frameworks unless justified
- **Mobile-First**: Design for mobile devices first, then enhance for larger screens
- **Progressive Enhancement**: Core content must be accessible without JavaScript

### Security & Privacy
- HTTPS required for all pages
- No tracking scripts without explicit user consent
- Minimize third-party dependencies
- Regular security updates for all dependencies

## Development Workflow

### Content Creation
1. Write content in Markdown in a dedicated content directory
2. Include frontmatter for metadata (title, date, tags, description)
3. Preview locally before publishing
4. Commit to version control

### Feature Development
1. Validate feature against Core Principles
2. Create specification if adding complexity
3. Test on multiple devices and browsers
4. Verify accessibility compliance
5. Measure performance impact

### Quality Gates
- All changes must pass automated tests
- New features require documentation
- Performance budgets must not be exceeded
- Accessibility audits must pass

## Governance

This constitution guides all technical and editorial decisions for the blog. When in doubt, refer to the Core Principles, especially "Content-First."

**Amendment Process**: Constitution changes require documentation of rationale and impact assessment. Version increments follow semantic versioning (MAJOR.MINOR.PATCH).

**Compliance**: All features, content, and changes should be evaluated against this constitution. Deviations must be documented and justified.

**Version**: 1.0.0 | **Ratified**: 2026-01-04 | **Last Amended**: 2026-01-04
