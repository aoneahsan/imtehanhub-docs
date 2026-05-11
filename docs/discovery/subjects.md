---
id: subjects
title: Subjects browse — class → subject → chapter
sidebar_label: Subjects
sidebar_position: 1
description: Subject pages at /subjects, /subjects/:class, and /subjects/:class/:subject are the primary discovery surface for chapter exploration.
keywords:
  - browse subjects ImtehanHub
  - exam subjects Pakistan
  - chapter discovery
  - public study browse
slug: /discovery/subjects
---

# Subjects browse — class → subject → chapter

**The Subjects browse** is ImtehanHub's primary content-discovery surface. The pages at `/subjects`, `/subjects/:class`, `/subjects/:class/:subject`, and `/subjects/:class/:subject/:chapter` walk you down the [content hierarchy](/docs/concepts/content-hierarchy) — class → subject → chapter — without needing an account.

> **TL;DR** — Open `/subjects`, pick your class, pick a subject, pick a chapter, click **Start Test**. Public pages, no sign-in required to browse, prerendered for SEO.

## The four levels

| URL | What it shows |
|---|---|
| `/subjects` | All 8 classes in a card grid |
| `/subjects/:class` | All subjects for that class |
| `/subjects/:class/:subject` | All chapters for that subject |
| `/subjects/:class/:subject/:chapter` | Chapter detail with topic list and a Start Test CTA |

All four pages are **public** and **prerendered** — Google, Bing, ChatGPT, Perplexity, Claude, and Gemini can crawl them without executing JavaScript. See [SEO / AEO pipeline](/docs/credits) for the prerender mechanics (full developer docs land in Batch 6).

## What each card shows

### Class card (`/subjects`)

- Class name (English + Urdu).
- Stage label — Primary, Middle, Matric, Intermediate.
- Subject count.
- Total MCQ count across all subjects.
- "New content this week" badge if any seeded in the last 7 days.

### Subject card (`/subjects/:class`)

- Subject name (English + Urdu).
- Chapter count.
- Total MCQ count.
- Difficulty distribution (small bar — easy / medium / hard ratio).
- Last-updated timestamp.

### Chapter card (`/subjects/:class/:subject`)

- Chapter name (English + Urdu) + chapter number.
- Page range from the textbook.
- MCQ / Short / Long counts.
- Difficulty bar.
- Topic chips — clickable to jump straight into a topic-filtered test.

## Filters and sort

Each level page supports filters via URL state (so URLs are bookmarkable):

| Page | Filters |
|---|---|
| `/subjects` | Sort by class number, alphabetical |
| `/subjects/:class` | Filter by group (Pre-Med, Pre-Eng, ICS) at Intermediate; sort by name / question count |
| `/subjects/:class/:subject` | Filter by chapter number range; sort by chapter number / difficulty / activity |

The filter state is in the URL — `/subjects/c9?sort=questions` shows Class 9 subjects sorted by MCQ count.

## Why subjects pages are public

Three reasons:

1. **SEO and AEO.** Subject and chapter pages are the deepest indexable surface — the more pages a search engine crawls, the better the site ranks for long-tail queries ("Class 9 Physics Kinematics MCQ practice"). Hiding them behind sign-in would kill discoverability.
2. **Free trial reach.** A student can land on `/subjects/c9/physics/kinematics`, click Start Test, take their first trial test, and be hooked — all in 90 seconds without signing up.
3. **Knowledge-base linking.** The [knowledge base](/docs/discovery/knowledge-base) and [blog](/docs/discovery/blog) link to chapter pages directly. Public pages let those links resolve for everyone.

## Bilingual on browse pages

The browse pages respect your language toggle. Switch to Urdu and:

- Class names render in Urdu (نہم جماعت instead of "Class 9").
- Subject names render in Urdu (طبیعیات instead of "Physics").
- Chapter names render in Urdu.
- The page direction flips to RTL.

The card layout itself adapts — descriptions wrap right-to-left, icons mirror.

## Add to bookmarks (chapter level)

You cannot bookmark a class or a subject — bookmarks are per-question (see [Bookmarks](/docs/tests/bookmarks)). What you can do at the chapter level:

- Click **Save chapter for later** — saved as a "favourite chapter" on your Profile (added 2026-04 onwards). Lets you jump back into the chapter from your Dashboard.

## Common questions

### Why does my chapter card show "0 questions"?

The chapter exists in the data hierarchy but no questions have been seeded yet. Either the chapter was added recently (seeding pending) or no free online source exists. You can submit a [book request](/docs/getting-started/welcome) to flag the gap.

### What if I want to see ALL chapters across all classes?

Currently no — chapters are scoped to a specific class+subject for navigation clarity. The [knowledge base](/docs/discovery/knowledge-base) is the closest thing to a cross-class index.

### Can I bookmark a class?

Use **Save chapter for later** at the chapter level. Class-level pinning is on the roadmap.

### Are class pages translated to all boards?

The class structure is identical across boards — Class 9 is Class 9 in Punjab, Federal, Sindh, etc. Question wording within a chapter differs by board (see [Pick your board](/docs/getting-started/pick-board)) — the navigation does not.

## Next

- [Chapter detail page](/docs/discovery/chapter-detail) — what the deepest browse level shows.
- [Content hierarchy](/docs/concepts/content-hierarchy) — the structure these pages render.
- [Configure a test](/docs/tests/configure) — the natural next step after browsing.
