---
id: chapter-detail
title: Chapter detail page — what you see, how to start
sidebar_label: Chapter detail
sidebar_position: 2
description: Chapter detail page shows metadata, official MCQ counts, community submissions, learning resources, and a prominent Start Test call to action.
keywords:
  - chapter page ImtehanHub
  - exam chapter detail
  - start test from chapter
  - chapter explanations community
slug: /discovery/chapter-detail
---

# Chapter detail page

**The chapter detail page** is the deepest public surface in ImtehanHub. It sits at `/subjects/:class/:subject/:chapter` and bundles every piece of context a student needs to start practising — the chapter description, the topic list, question counts, community explanations, and a single prominent **Start Test** CTA.

> **TL;DR** — Click any chapter from the subject page. Read the overview. Pick a topic chip if you want to drill one specifically. Click **Start Test**. You are in.

## What the page shows

The page has six sections, top to bottom:

### 1. Chapter header

- Chapter name (English + Urdu).
- Chapter number within the subject.
- Page range in the official textbook (e.g. "pp. 38-67").
- Last-updated timestamp.
- A breadcrumb: Home › Subjects › Class 9 › Physics › Kinematics.

### 2. Description

A 2-4 paragraph overview of what the chapter covers, why it matters in the curriculum, and what comes next. Sourced from official textbook intros where possible; written by the team where not.

### 3. Topic chips

Each topic in the chapter rendered as a clickable chip. Clicking a chip takes you to the configure-test page with that topic pre-filtered (see [Topic filters](/docs/tests/topic-filters)).

Examples for Class 9 Physics → Kinematics:

- Equations of motion
- Average speed and velocity
- Vectors and scalars
- Free fall

### 4. Question counts

A simple table:

| Type | Official | Community (eligible) |
|---|---|---|
| MCQ | 42 | 8 |
| Short | 12 | 3 |
| Long | 5 | 1 |

The community count is the number of eligible community submissions — the ones that have crossed the [voting threshold](/docs/community/voting). They contribute to the pool when you set the [source picker](/docs/tests/source-picker) accordingly.

### 5. Community explanations (when present)

If any verified community member has written a [chapter explanation](/docs/community/submit-chapter-explanation) for this chapter and it has crossed the eligibility threshold, the top 3 are shown here as preview cards. Click any card to read the full explanation.

This section is **public** — non-signed-in users can read community explanations. They are part of the discovery surface, not gated.

### 6. Start Test CTA

The single most prominent button on the page. Pre-fills the configure form with the chapter selected. Defaults: MCQ mode, 10 questions, official source, no topic filter.

Below the CTA:

- "**Take a Short test instead**" link.
- "**Try a Long question**" link.
- "**Take a topic-filtered test**" — opens the configure form with the Advanced panel pre-expanded.

## SEO and AEO on chapter pages

Chapter pages are the **highest-value SEO surface** on ImtehanHub. Each one carries:

- Distinct `<title>` (`Class 9 Physics — Kinematics MCQs and Practice — ImtehanHub`).
- Distinct meta description.
- JSON-LD: `LearningResource` (per-chapter) + `BreadcrumbList`.
- Open Graph + Twitter card with the chapter's name and a generated image.
- A `<noscript>` body that mirrors the React-rendered content for AI crawlers.

A typical chapter page targets long-tail queries like "Class 9 Physics Kinematics MCQ", "Physics Class 9 chapter 2 questions", "kinematics MCQ practice Pakistan".

## Bookmarking the chapter

The header has a small **Save chapter** icon. Saved chapters appear on your Dashboard's "Pick up where you left off" card. This is distinct from per-question bookmarks ([Bookmarks](/docs/tests/bookmarks)) — a saved chapter is a navigation shortcut, not a question collection.

## Anonymous browsing

Public users (not signed in) see everything except:

- The Save chapter button (requires sign-in).
- A small banner on the Start Test button reminding them the trial counter applies.

## Common questions

### Can I see what topics other students struggle with on this chapter?

Aggregate per-topic difficulty is on the roadmap. Today the per-topic breakdown is per-test, not per-chapter (see [Streaks and stats](/docs/concepts/streaks-and-stats)).

### Why are some chapter cards greyed out?

A grey card means the chapter has zero seeded questions yet. You can still browse the chapter overview, but the Start Test button is disabled.

### Can I download the chapter as a PDF?

Not yet. The roadmap includes a "Print this chapter's MCQs" view that generates a printable A4 PDF for offline study.

### What if my textbook has a different page range?

The page range matches the **publisher** field tied to the chapter's book. If you have a different edition, the numbers may be off by a few pages. See [Pick your board](/docs/getting-started/pick-board) — board affects which book version is matched to your account.

## Next

- [Subjects browse](/docs/discovery/subjects) — the level above this page.
- [Configure a test](/docs/tests/configure) — what Start Test takes you to.
- [Community module overview](/docs/community/overview) — how the community explanations get there.
