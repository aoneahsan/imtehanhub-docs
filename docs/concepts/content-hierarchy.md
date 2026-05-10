---
id: content-hierarchy
title: Content hierarchy — Class → Subject → Book → Chapter → Question
sidebar_label: Content hierarchy
sidebar_position: 1
description: Every piece of ImtehanHub content lives in a strict five-level hierarchy. Knowing the hierarchy makes navigation, search, and bookmarks predictable.
keywords:
  - ImtehanHub content structure
  - exam app data model
  - chapter question hierarchy
  - Pakistani textbook reference
  - Firestore content model
slug: /concepts/content-hierarchy
---

# Content hierarchy

**The content hierarchy** is the five-level tree that every ImtehanHub URL, every Firestore document, and every UI navigation step follows: **Class → Subject → Book → Chapter → Question**. The hierarchy is strict; nothing is skipped or merged.

> **TL;DR** — Every question references the chapter it comes from. Every chapter references its book. Every book references the subject. Every subject references the class. Every class references the curriculum. No orphan content, ever.

## Why a strict hierarchy?

Three product reasons:

1. **Verifiability.** When you read an answer, you can trace it back to the chapter, the book, and the page number. If you do not believe the answer, open your textbook and check.
2. **Predictable navigation.** If you bookmark a question and come back six months later, the URL still works because the hierarchy did not move.
3. **Auditability.** When a student flags a question as wrong, the moderator can see exactly which book and which chapter to check, instead of hunting through "an MCQ from somewhere on the internet".

## The five levels

### Level 1 — Class

The root of the tree. ImtehanHub covers eight classes: Class 5, 6, 7, 8, 9, 10, 1st Year (FA / FSc), 2nd Year (FA / FSc). See [Pick your class](/docs/getting-started/pick-class) for guidance on which one applies to you.

| Field on the class document | Meaning |
|---|---|
| `id` | Stable slug — `c5`, `c9`, `1st-year`, `2nd-year` |
| `name` | English name — "Class 9" |
| `urduName` | Urdu name — "نہم جماعت" |
| `description` | Short paragraph for the class landing page |
| `order` | Display order in the class grid |

### Level 2 — Subject

A class has many subjects. Each subject is taught in one or more classes and may be named differently per class.

| Field | Meaning |
|---|---|
| `id` | `c9-physics`, `c10-math`, `1st-year-pre-medical-biology` |
| `classId` | Parent class — `c9` |
| `name` | "Physics" |
| `urduName` | "طبیعیات" |
| `description` | Subject overview — what topics are covered, why it matters |
| `chapterCount` | Cached count |

A subject is the second URL segment: `/subjects/:classSlug/:subjectSlug`.

### Level 3 — Book (textbook)

Each subject has one or more **books** — the actual textbooks published by Pakistani textbook boards (Punjab Curriculum and Textbook Board, Sindh Textbook Board, KPK Textbook Board, Federal Board, etc.).

| Field | Meaning |
|---|---|
| `id` | `c9-physics-ptb-2024` |
| `subjectId` | Parent subject — `c9-physics` |
| `publisherId` | Punjab Textbook Board, Sindh Textbook Board, etc. |
| `boardId` | The board this textbook is approved for |
| `edition` | Year of edition — affects page references |
| `name` | "Physics for Class 9 — Punjab Textbook Board, 2024 Edition" |
| `urduName` | Urdu name |

Why books are a separate level: the **same chapter** ("Kinematics") may have **different page numbers** in the Punjab Textbook Board edition vs the Federal Textbook edition. Tying questions to a book keeps page references accurate.

### Level 4 — Chapter

A book has many chapters. The chapter is the unit of navigation, the unit of testing, and the unit of bookmarking.

| Field | Meaning |
|---|---|
| `id` | `c9-physics-kinematics` |
| `bookId` | Parent book |
| `name` | "Kinematics" |
| `urduName` | "حرکیات" |
| `description` | Chapter summary |
| `pageStart`, `pageEnd` | Page range in the textbook |
| `topics` | Sub-topics within the chapter (used for the per-topic breakdown on result page) |
| `questionCount` | Total questions across MCQ + Short + Long |

A chapter is the URL segment: `/subjects/:classSlug/:subjectSlug/:chapterSlug`.

### Level 5 — Question

The leaf. Each question references its chapter and a page in the textbook.

| Field | Meaning |
|---|---|
| `id` | Stable, never reused |
| `chapterId` | Parent chapter |
| `type` | `mcq` / `short` / `long` |
| `text` | Question text (English) |
| `urduText` | Question text (Urdu) |
| `options` | For MCQ — array of 4 options + correct index |
| `answer` | The correct answer / model answer |
| `urduAnswer` | Urdu version |
| `pageReference` | Page number in the source textbook |
| `topicTags` | Sub-topics this question covers |
| `difficulty` | 1-5 scale |
| `source` | `official` (seeded by the team) / `community` (submitted by a verified contributor) |

See [Question types](/docs/concepts/question-types) for the difference between MCQ, Short, and Long.

## How the hierarchy maps to URLs

The user-visible URLs follow the hierarchy exactly:

| URL | Level |
|---|---|
| `/subjects` | All classes |
| `/subjects/c9` | Class 9 — all subjects |
| `/subjects/c9/physics` | Class 9 Physics — all chapters |
| `/subjects/c9/physics/kinematics` | Class 9 Physics — Kinematics chapter — start-test page |

Inside the app:

| URL | Level |
|---|---|
| `/app/test/configure?chapter=c9-physics-kinematics` | Configure a test |
| `/app/test/session/:sessionId` | Live test |
| `/app/test/results/:sessionId` | Result |
| `/app/history/:sessionId` | Re-open a past test for review |

## Bilingual at every level

Every level has both `name` and `urduName`. When you toggle the language to Urdu, the entire navigation re-renders in Urdu and the layout flips to RTL. See [Bilingual model](/docs/concepts/bilingual) for how the toggle works.

## Community questions plug in at Level 5

Verified community contributors can submit questions through the [Community module](/docs/credits). A community-submitted question lives at the same level (5) and references a chapter the same way an official question does. The difference is the `source` field — `community` instead of `official`.

You can choose whether to draw test questions from official, community, or a mix using the **test source picker** when configuring a test.

## Common questions

### Why is "topic" not a separate level?

Topics are sub-fields within a chapter — too granular for a navigation level (a chapter has 5-15 topics, and most students think in chapters). Topic information powers the per-topic breakdown on the result page so you know which sub-area to revise.

### Can a question belong to two chapters?

No. Each question has exactly one `chapterId`. If a topic genuinely spans two chapters, we duplicate the question (with different IDs and slightly different framing) so each chapter can stand alone.

### What if my textbook page numbers do not match?

Page numbers depend on the **book** field. If your book is a different edition or publisher, the page reference may be off by a few pages. Set your **board** correctly (see [Pick your board](/docs/getting-started/pick-board)) so ImtehanHub picks the textbook closest to yours.

### Are deprecated chapters kept?

Old chapters that have been removed from the official syllabus are flagged but not deleted. You can still take tests from them for revision. The chapter card shows a "Removed from current syllabus" badge.

## Next

- [Question types — MCQ, Short, Long](/docs/concepts/question-types) — the three forms a question can take.
- [Pick your class](/docs/getting-started/pick-class) — start at the top of the hierarchy.
- [Pick your board](/docs/getting-started/pick-board) — affects which book gets matched to your account.
