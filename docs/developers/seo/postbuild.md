---
id: postbuild
title: postbuild-seo.mjs — 660+ static HTMLs, JSON-LD, sitemap
sidebar_label: Postbuild SEO
sidebar_position: 1
description: After Vite builds the SPA, postbuild-seo.mjs clones dist/index.html into one file per known route with route-specific title, description, canonical, OG, Twitter, JSON-LD, and a noscript body — so AI crawlers that don't execute JavaScript still see the real content.
keywords:
  - SPA prerendering static HTML
  - postbuild SEO React
  - JSON-LD schema React app
  - AI crawler ChatGPT prerender
  - Pakistani exam app SEO
slug: /developers/seo/postbuild
---

# postbuild-seo.mjs

**Vite produces a single `index.html`** that loads React, which then renders the right page. Crawlers that execute JavaScript (Googlebot, modern Bingbot) handle this fine. **AI crawlers — GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User, anthropic-ai — do not execute JavaScript**. To them, every route serves identical HTML. They cannot distinguish a Class 9 Physics chapter from the homepage, and they cannot extract per-page content for citation.

`postbuild-seo.mjs` fixes that. After Vite builds, the script clones `dist/index.html` into **660+ per-route static HTML files**, each with route-specific metadata and a `<noscript>` body containing the actual hero content. Firebase Hosting serves the right HTML by path; the SPA still hydrates and takes over for interactive use.

> **TL;DR** — Vite emits `dist/index.html` (one file). The postbuild script reads the project's route table, clones the HTML per route, swaps in title / description / canonical / OG / Twitter / JSON-LD / `<noscript>` body, and writes `dist/{route}.html`. Firebase `cleanUrls: true` resolves `/about` → `dist/about.html`. AI crawlers see the real per-page content.

## Why this matters for AEO

Princeton's GEO study (KDD 2024) showed AI search engines select citations based on extractable per-page content. A static homepage HTML with "Loading..." in the noscript body is invisible to those engines no matter how good the React app is.

The fix isn't framework choice (Next.js SSR, Remix, etc.) — those have their own trade-offs. The fix is a postbuild pass that emits real HTML per route, kept simple and explicit.

## What the script does

```javascript
// postbuild-seo.mjs (sketch — actual file is ~1400 lines)
import fs from 'node:fs';
import path from 'node:path';

const APP = { name: 'ImtehanHub', url: 'https://imtehanhub.aoneahsan.com', /* ... */ };
const CLASSES = [/* class-5 ... 2nd-year */];

const PUBLIC_PAGES = [
  {
    path: '/about',
    title: 'About ImtehanHub — Free Pakistani Exam Prep for Class 5 to 2nd Year',
    description: '...',
    keywords: ['about ImtehanHub', /* ... */],
    h1: 'About ImtehanHub',
    breadcrumbs: [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }],
    jsonLd: [/* AboutPage, Organization, BreadcrumbList */],
  },
  /* ...20 more */
];

const indexHtml = fs.readFileSync('dist/index.html', 'utf8');

for (const page of PUBLIC_PAGES) {
  const html = buildPageHtml(indexHtml, page);
  const outPath = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
}

// Then: classes, subjects, chapters (static taxonomy) — same shape.
// Then: blog, knowledge-base (dynamic, only with --dynamic flag).
```

`buildPageHtml` performs targeted string replacements:

| Token in `index.html` | Replaced with |
|---|---|
| `<title>...</title>` | `<title>{page.title}</title>` |
| `<meta name="description" content="...">` | `<meta name="description" content="{page.description}">` |
| `<meta name="keywords" content="...">` | route-specific keywords |
| `<link rel="canonical" href="...">` | absolute canonical URL |
| OG / Twitter tags | route-specific |
| `<!-- POSTBUILD_JSON_LD -->` | one `<script type="application/ld+json">` per schema in `page.jsonLd` |
| `<!-- POSTBUILD_NOSCRIPT_BODY -->` | a `<noscript>` block with H1, description, breadcrumb links, key navigation |

The placeholder comments are present in the source `index.html` so Vite preserves them through the build.

## The static route set

The script statically knows about ~21 routes:

| Group | Routes |
|---|---|
| Top-level | `/`, `/about`, `/pricing`, `/privacy`, `/terms`, `/contact`, `/permissions` |
| Discovery | `/sitemap`, `/feed`, `/blog`, `/learn`, `/subjects` |
| Class index | `/class/class-5` through `/class/2nd-year` (8 pages) |
| Sample subjects | A handful of high-traffic subjects with deeper SEO content |

These pages always exist and never need a database query — they ship out of every build.

## The dynamic route set (`--dynamic` flag)

```bash
yarn build:dynamic
# = vite build + node postbuild-seo.mjs --dynamic
```

With `--dynamic`, the script ALSO:

1. Initialises `firebase-admin` against `service-account/imtehanhubai.json`.
2. Queries `subjects/` and emits `/subject/{id}.html` per subject (~60).
3. Queries `chapters/` and emits `/subject/{subjectId}/{chapterId}.html` per chapter (~580).
4. Queries `blogPosts/` and emits `/blog/{slug}.html`.
5. Queries `knowledgeBaseEntries/` and emits `/learn/{slug}.html`.

Total: **660+ HTMLs** as of the last successful production build.

For dev iteration, `yarn build` (without `--dynamic`) skips the Firestore queries and emits only the static set — fast.

## JSON-LD coverage

Every static route ships JSON-LD. The combinations:

| Route group | JSON-LD blocks |
|---|---|
| `/` (homepage) | `Organization`, `WebSite` (with SearchAction), `WebApplication` |
| `/about` | `AboutPage`, `Organization`, `BreadcrumbList` |
| `/pricing` | `Product` (the app, with `Offer` entries per plan), `FAQPage` (8-12 Q&A), `BreadcrumbList` |
| `/privacy`, `/terms` | `WebPage`, `BreadcrumbList` |
| `/class/{id}` | `EducationalOrganization`, `Course` (the class), `BreadcrumbList`, `FAQPage` |
| `/subject/{id}` | `Course`, `BreadcrumbList`, `FAQPage` |
| `/subject/{subjectId}/{chapterId}` | `LearningResource`, `BreadcrumbList`, `FAQPage`, `HowTo` (study steps) |
| `/blog/{slug}` | `Article` (with `author`, `datePublished`, `dateModified`), `BreadcrumbList` |
| `/learn/{slug}` | `LearningResource` or `Article`, `BreadcrumbList`, `FAQPage` |

Helpers in `src/lib/seo/jsonld.ts` are the single source of truth for shape — the postbuild script imports them so the React `<SEO>` component and the prerender stay aligned.

## The `<noscript>` body

Each HTML's `<noscript>` block carries:

```html
<noscript>
  <h1>{page.h1}</h1>
  <p>{page.description}</p>
  <nav aria-label="Breadcrumb">
    {page.breadcrumbs.map((b) => `<a href="${b.path}">${b.name}</a>`)}
  </nav>
  <ul>
    {topLinks.map((l) => `<li><a href="${l.path}">${l.name}</a></li>`)}
  </ul>
</noscript>
```

This is what AI crawlers see when they `curl` the URL. It is intentionally minimal — title + description + breadcrumb + 5-10 internal links — because:

1. AI extractors pick the first informative block.
2. Heavy noscript bodies bloat the HTML.
3. The full rich content lives on the page-content data file (see [Per-page-uniqueness floor](#per-page-uniqueness-floor) below).

## Per-page-uniqueness floor

For programmatic pages (subject pages, chapter pages) the noscript body alone isn't enough. AI engines need ~1000+ unique words per page to consider the page worth citing. The data lives in typed content files at `src/data/{contentType}/batch-NN.ts`:

```typescript
// src/data/chapters/batch-07.ts (sketch)
export const CHAPTER_CONTENT_BATCH_07 = {
  'class-9_biology_chapter-3': {
    distinctTitle: 'Class 9 Biology — Cell Biology MCQs & Notes (Punjab Board)',
    distinctDescription: '...140-160 chars...',
    intro: '...80-120 words definition-first...',
    useCases: [/* 3-5 × 50-80 words */],
    howItWorks: [/* 4-6 numbered steps */],
    examples: [/* 2-3 worked examples */],
    faq: [/* 5-8 Q&A */],
    tips: [/* 3-6 short items */],
    keywords: [/* 5-8 */],
    lastUpdated: '2026-05-06',
    author: 'Ahsan Mahmood',
  },
  /* ...14 more */
};
```

The postbuild script reads these batches and embeds them as a hidden but indexable text block inside the `<noscript>` body. The React app reads the same source to render the actual page content for users.

This is the **per-page-uniqueness floor** from the global SEO playbook at `~/.claude/rules/seo-aeo-ranking.md`. The tracker at `docs/tracking/imtehanhub-seo-content-tracker.json` drives the batch enrichment plan.

## sitemap.xml and friends

`postbuild-seo.mjs` also emits:

- `dist/sitemap.xml` — every URL the script generated, with `<lastmod>` set to current build time or per-entity `updatedAt`.
- `dist/feed.xml` — RSS 2.0 of the 50 most recent blog posts + knowledge base entries.
- `dist/robots.txt` — crawler allowlist + `Sitemap:` directive (see [robots policy](#robots-policy)).
- `dist/llms.txt` — llmstxt.org-format markdown for LLMs.
- `dist/ai.txt` — explicit AI-training / retrieval policy.
- `dist/humans.txt` — credits.
- `dist/.well-known/security.txt` — RFC 9116 security contact.

Each file is regenerated every build. Stale dates are impossible.

## Firebase Hosting wiring

`firebase.json` ties everything together:

```json
{
  "hosting": {
    "public": "dist",
    "cleanUrls": true,
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ],
    "headers": [
      { "source": "/llms.txt", "headers": [{ "key": "Content-Type", "value": "text/markdown" }] },
      { "source": "/ai.txt", "headers": [{ "key": "Content-Type", "value": "text/plain" }] },
      { "source": "/sitemap.xml", "headers": [{ "key": "Content-Type", "value": "application/xml" }] },
      { "source": "/feed.xml", "headers": [{ "key": "Content-Type", "value": "application/rss+xml" }] },
      { "source": "**/*.html", "headers": [{ "key": "Cache-Control", "value": "max-age=300, must-revalidate" }] },
      { "source": "**/*.@(js|css|svg|png|jpg|jpeg|webp|woff2)", "headers": [{ "key": "Cache-Control", "value": "max-age=31536000, immutable" }] }
    ]
  }
}
```

`cleanUrls: true` makes `/about` resolve to `dist/about.html`. The wildcard rewrite is the SPA fallback for routes not pre-generated (e.g. an `/admin/users/abc123` deep link — those hydrate from `index.html` because they're auth-only anyway).

## Robots policy

`robots.txt` explicitly allows the AI bots that should index us:

```
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: Applebot
Allow: /

# Scrapers we block
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

Sitemap: https://imtehanhub.aoneahsan.com/sitemap.xml
```

Allow-listing AI bots is intentional. We want AI citations.

## Build pipeline integration

```jsonc
// package.json scripts
{
  "build": "tsc -p tsconfig.json && vite build && node postbuild-seo.mjs",
  "build:dynamic": "tsc -p tsconfig.json && vite build && node postbuild-seo.mjs --dynamic",
  "build:seo-public": "node postbuild-seo.mjs --sync-public"
}
```

`--sync-public` writes the crawler artifacts (sitemap/feed/robots/llms.txt/etc.) into `public/` instead of `dist/`. Used during dev to refresh the artifacts without a full build.

## Common questions

### Will Vite's "preserve comments in HTML" survive minification?

Yes — Vite preserves `<!-- POSTBUILD_* -->` placeholder comments through the production HTML pipeline because they aren't inside script tags.

### What if I add a new public page?

Three places to update: `src/config/routes.ts`, the router, and `postbuild-seo.mjs`'s `PUBLIC_PAGES` array. Forgetting the third means the page ships without prerendered HTML — the SPA still serves it but AI crawlers won't see anything.

### Why not use Astro / Eleventy / Next.js?

Considered each. Postbuild HTML cloning is the lightest-weight win: no framework migration, full control over JSON-LD shapes, identical output for static and dynamic routes. We may revisit if the prerender script grows past ~3,000 lines.

### How long does `yarn build:dynamic` take?

About 35-45 seconds on a developer laptop. Vite build is ~12s, Firestore queries are ~10s (one bulk read per collection), HTML cloning is ~10s for 660 files.

## Next

- [Pipeline overview](/docs/developers/pipeline/overview) — where Firestore content comes from.
- [Routing](/docs/developers/architecture/routing) — the route table the postbuild script reads.
- [Contributing](/docs/developers/contributing/community) — how to add new pages with SEO baked in.
