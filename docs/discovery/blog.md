---
id: blog
title: Blog — what gets posted, how to follow
sidebar_label: Blog
sidebar_position: 3
description: The ImtehanHub blog at /blog is admin-curated content covering exam strategy, syllabus updates, study tips, and product changelogs. Indexed by RSS at /feed.xml.
keywords:
  - ImtehanHub blog
  - Pakistani exam blog
  - study tips Pakistan
  - admin blog Firestore
slug: /discovery/blog
---

# Blog — what gets posted, how to follow

**The ImtehanHub blog** at `/blog` is admin-curated content for students, teachers, and parents. Posts cover exam strategy, syllabus changes by board, study technique guides, and major product changelogs. Posts are indexed in `/feed.xml` (RSS 2.0) so you can follow without checking the site daily.

> **TL;DR** — Visit `/blog` to read recent posts. Subscribe to `/feed.xml` in any RSS reader to receive new posts automatically. Posts are written in TipTap rich text and published via the admin CMS.

## What kinds of posts you'll find

Recurring content categories:

- **Exam strategy** — how to plan a 6-month board-exam prep, how to revise efficiently, how to use ImtehanHub during exam week.
- **Syllabus updates** — board-specific changes (Federal Board syllabus changes, Punjab Board exam-style updates).
- **Subject deep-dives** — long-form explainers on tricky chapters (Class 9 Algebra, FSc Organic Chemistry).
- **Product changelogs** — feature releases, new content seeded, community module milestones.
- **Community spotlights** — highlights of the best community contributors.

## Where blog data lives

Blog posts are stored in Firestore at `blogPosts/{slug}`:

```ts
{
  slug: 'how-to-revise-class-10-physics',
  title: 'How to revise Class 10 Physics in 30 days',
  urduTitle: 'دس جماعت طبیعیات کا اعادہ ۳۰ دنوں میں',
  excerpt: 'A practical 30-day plan...',
  body: { /* TipTap JSON content */ },
  authorId: 'admin-uid',
  publishedAt: '2026-05-08T...',
  updatedAt: '2026-05-08T...',
  tags: ['class-10', 'physics', 'revision'],
  status: 'published',         // or 'draft'
}
```

Admins create and edit through the admin CMS at `/admin/blog`. The CMS uses TipTap's full editor — headings, lists, tables, images, code, math.

## Reading a post

`/blog` lists posts reverse-chronologically with title, excerpt, tags, and publish date. Click any post to read at `/blog/:slug`.

The reading view:

- Renders the TipTap content with prose-friendly typography.
- Shows the author name and publish date at the top.
- Shows updated date if the post has been edited.
- Has a "Share" button at the bottom (see [Sharing](/docs/discovery/share)).
- Adds JSON-LD `Article` schema for SEO / AEO.

## Bilingual blog

A blog post can be in either English OR Urdu — most posts are English; some are Urdu (especially syllabus-specific posts targeting Urdu-medium students).

The post `language` field drives:

- The `og:locale` and `<html lang>` attributes.
- The font (Urdu posts use Noto Nastaliq Urdu).
- The page direction (RTL for Urdu).

There is no auto-translation. If both languages are wanted, the team writes them as two separate posts and cross-links them.

## RSS / feed.xml

Every published post auto-emits into `/feed.xml` — a valid RSS 2.0 feed. The build pipeline regenerates the feed on each deploy. See [Feed](/docs/discovery/feed) for the spec.

Add `https://imtehanhub.aoneahsan.com/feed.xml` to any RSS reader (Feedly, Inoreader, NewsBlur, FreshRSS) to follow.

## Search and tags

The blog list page supports:

- **Tag filter** — `?tag=physics` shows only posts tagged "physics".
- **Search** — `?q=revision` matches title and excerpt (full-body search not yet on; planned).
- **Date range** — `?range=30d` shows posts from the last 30 days.

Tag pages (`/blog/tags/physics`) are also public and indexed.

## Comments

Blog posts do not have comments. The community module's comment surface is per-question, not per-blog-post. If you want to discuss a post, mention it in a community submission's comment thread or email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Common questions

### Can I submit a blog post?

Not directly through the form. If you have a strong topic and outline, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) — guest contributions are considered case-by-case and credited.

### Are blog posts indexed by Google?

Yes — every post is in `/sitemap.xml` and crawlable. Article JSON-LD schema is emitted for rich-result eligibility.

### Why are some posts in Urdu only and not English?

When the audience is specifically Urdu-medium (Punjab Textbook Board syllabus updates, for example), the post stays Urdu-only.

### Can I get email notifications for new posts?

Not yet. The recommended workflow is RSS via `/feed.xml`. Email subscription is on the roadmap.

## Next

- [Feed](/docs/discovery/feed) — the RSS spec.
- [Knowledge base](/docs/discovery/knowledge-base) — long-form study content.
- [Sitemap page](/docs/discovery/sitemap-page) — see every page on the site.
