---
id: knowledge-base
title: Knowledge base — /learn with full-text search
sidebar_label: Knowledge base
sidebar_position: 4
description: The ImtehanHub knowledge base at /learn is a public, searchable collection of long-form study aids — chapter explanations, formula sheets, exam-style worked examples, and concept guides.
keywords:
  - knowledge base ImtehanHub
  - study aids Pakistan
  - exam prep articles
  - searchable learn pages
  - Firestore content search
slug: /discovery/knowledge-base
---

# Knowledge base — /learn with full-text search

**The knowledge base** at `/learn` is ImtehanHub's library of long-form study content — chapter explainers, formula sheets, exam-style worked examples, and concept guides. Every entry is **public**, **searchable**, and **bilingual where applicable**. Think of it as the "encyclopedia" sibling of the [blog](/docs/discovery/blog).

> **TL;DR** — Open `/learn`, search or browse by class / subject / type. Each entry opens at `/learn/:id/:slug`. Entries are richer and more permanent than blog posts; they are indexed and refreshed periodically.

## How it differs from the blog

| | Blog | Knowledge base |
|---|---|---|
| Cadence | Reverse-chronological news | Permanent reference |
| Length | 500-1500 words | 800-3000 words |
| Editing | Rarely edited after publish | Refreshed when curriculum changes |
| Surface | `/blog`, `/blog/:slug` | `/learn`, `/learn/:id/:slug` |
| Tags | Free tags | Tied to chapter / subject / topic |
| Search | Tag + title | Full-text |
| RSS | Yes (`/feed.xml`) | Combined into `/feed.xml` |

A blog post on "Class 10 Physics revision" is news ("here's how to plan your week"). A knowledge-base entry on "Newton's laws of motion explained" is reference (everything you need to know about that concept, kept current).

## Where knowledge-base data lives

`aiKnowledgeBase/{id}` in Firestore (the prefix `aiKnowledgeBase` is historical — the collection holds all knowledge-base entries, AI-assisted or not):

```ts
{
  id: 'auto',
  slug: 'newtons-laws-explained',
  title: 'Newton\'s laws of motion explained',
  urduTitle: 'نیوٹن کے قوانینِ حرکت',
  excerpt: 'A complete student-friendly explainer...',
  body: { /* TipTap JSON content */ },
  bodyEn: { /* English version */ },
  bodyUr: { /* Urdu version */ },
  type: 'concept-guide',       // 'concept-guide' | 'formula-sheet' | 'worked-example' | 'chapter-explainer'
  classId: 'c9',
  subjectId: 'c9-physics',
  chapterIds: ['c9-physics-kinematics'],
  tags: ['newton', 'mechanics', 'force'],
  authorId: 'admin-uid',
  status: 'published',
  publishedAt: '2026-04-15T...',
  updatedAt: '2026-05-01T...',
  searchBlob: 'newtons laws motion force mass acceleration...',  // pre-computed lowercase blob for fast substring search
}
```

The `searchBlob` field is the secret to fast full-text search — see below.

## Browsing

`/learn` shows entries grouped by:

- **Class** — pick Class 5, 6, ..., 2nd Year FA/FSc.
- **Subject** — drilling further.
- **Type** — concept guide, formula sheet, worked example, chapter explainer.

Each entry card shows title (English + Urdu), excerpt, type badge, and last-updated date.

## Full-text search

The search bar at the top of `/learn` does **substring matching against the pre-computed `searchBlob`** field. Matching:

- Lowercase-folded.
- Common-synonym substituted ("equals" ↔ "=", "kinematics" ↔ "motion equations").
- Result is sorted by relevance (number of match hits + recency boost).

Performance: with ~500 entries indexed, search is **5-10 ms per keystroke** because the blob is pre-computed at write time, not at query time. The query is a simple `array-contains` on the blob (split into chunks).

This is the same fuzzy-search pattern used on the [Sitemap page](/docs/discovery/sitemap-page) — see the developer notes in Batch 6 for the implementation.

## Reading an entry

Each entry opens at `/learn/:id/:slug`. The reading view:

- Renders TipTap content with prose-friendly typography.
- Shows the type badge, class, subject, and relevant chapters.
- Has a "Take a test on this chapter" CTA at the bottom (jumps to the configure-test page).
- Cross-links to related entries.

JSON-LD `Article` is emitted for SEO. `BreadcrumbList` includes Home › Knowledge › Class 9 › Physics › Newton's laws.

## Bilingual entries

Entries can have **both** English and Urdu bodies. The reader's language toggle picks which to render. Switching languages mid-entry re-renders without losing scroll position.

If only one language exists, the toggle is disabled with a "Translation pending" message.

## Who writes knowledge-base entries

- **The team** — most entries are admin-authored.
- **Promoted community members** — chapter explanations from the [community module](/docs/community/submit-chapter-explanation) that cross the eligibility threshold and pass admin review can be **promoted into the knowledge base** as authored entries.
- **AI-assisted seeding** — admins can use BYOK to draft an entry from chapter content. The draft always goes through admin review before publish.

## Editing and freshness

Knowledge-base entries are refreshed when:

- A board changes the syllabus (Federal Board annual update).
- A textbook is updated to a new edition (page references shift).
- Better explanations or examples emerge.

The `updatedAt` field tracks the last refresh and shows in the reading view ("Last updated: 1 May 2026").

## Common questions

### Can I bookmark a knowledge-base entry?

Bookmarks are per-question, not per-knowledge-entry. Use the **Save for later** button on entry cards (added 2026-04 onwards) — saved entries appear in your Profile.

### Why is the search not perfect?

Substring + synonym substitution is fast but not semantic. A query like "force" finds entries with "force" in the blob; it does not find entries about "Newton's laws" unless they also mention force. For semantic search, the AI knowledge-base API (BYOK-powered, V2) is the more flexible path; see Module 23 in the project's roadmap.

### Are entries indexed by AI search engines?

Yes. The `<noscript>` body is rendered server-side via the postbuild SEO pipeline. GPTBot / ClaudeBot / PerplexityBot can read the full content without JavaScript. See the SEO docs (lands in Batch 6).

### What's the difference between a chapter explanation in the community module and a knowledge-base entry?

Both are long-form study aids. Community chapter explanations live in the community surface and are voted by community members. Knowledge-base entries are admin-published reference content — typically more carefully edited and more permanent. The two surfaces cross-link.

## Next

- [Blog](/docs/discovery/blog) — news-format content.
- [Sitemap page](/docs/discovery/sitemap-page) — discover everything else.
- [Search and filters](/docs/discovery/search) — search across the whole site.
