---
id: configure
title: Configure a test — class, subject, chapter, mode
sidebar_label: Configure a test
sidebar_position: 1
description: Walk through the test configuration screen — pick class, subject, chapter, question count, mode (MCQ/Short/Long), source picker, and time limit.
keywords:
  - configure test ImtehanHub
  - pick chapter test
  - MCQ Short Long mode
  - test source picker
  - exam app test setup
slug: /tests/configure
---

# Configure a test

**Test configuration** is the screen where every test on ImtehanHub starts. You decide what to test, how many questions, which mode, and where the questions come from. The configuration takes 10-30 seconds; the test that follows is shaped entirely by your choices here.

> **TL;DR** — Pick **class → subject → chapter → mode → count**, then click **Start Test**. Reasonable defaults are pre-filled for first-time users.

## When you land on this page

You usually arrive at `/app/test/configure` in one of three ways:

1. From a **chapter detail page** (`/subjects/:class/:subject/:chapter`) — the chapter is pre-selected, you only confirm mode + count.
2. From the **Dashboard** (`/app/dashboard`) — you start blank and pick everything.
3. From **Quick Test** suggestions on the Dashboard — class + subject suggested based on your weakest area, chapter still your choice.

The form on this page is built with **React Hook Form + Zod** (see [Forms](/docs/concepts/content-hierarchy)) — invalid combinations (like a class without seeded questions for the chosen mode) block the submit button and show an inline error.

## The five inputs

### 1. Class

Pre-filled to your most recently used class. If you are switching between classes, the dropdown shows all classes you have access to:

- All free-tier students see **all classes** (Class 5 → 2nd Year FA / FSc).
- **Add-on Class** users see all classes plus an "Unlimited" badge on their add-on class.
- **Pro / Unlimited** users see all classes with the unlimited badge on every entry.

The class drives the next dropdown — pick a class and the subject list refreshes.

### 2. Subject

Subjects available for the selected class. Class 9 has Math, Physics, Chemistry, Biology, Computer Science, English, Urdu, Islamiat, Pakistan Studies. Class 5 has the primary-curriculum subjects.

Each subject card shows:

- Subject name (English + Urdu)
- Total chapter count
- Total MCQ count across the subject
- "New" badge if at least one chapter received content in the last 7 days

### 3. Chapter

The list of chapters for the selected subject. Each chapter card shows:

- Chapter name and number
- Page range in the textbook (when available)
- Total questions across MCQ / Short / Long
- Difficulty distribution (a small bar showing how many easy / medium / hard questions)

You can pick **one chapter at a time**. Cross-chapter tests (mixed sets across multiple chapters) are not yet supported — the closest equivalent is taking sequential single-chapter tests, which is fine for daily revision.

### 4. Mode (MCQ / Short / Long)

Three radio cards:

| Mode | When to use | Average time |
|---|---|---|
| **MCQ** | Daily practice, recall, recognition | 5-7 minutes for 10 questions |
| **Short** | Drilling key facts and definitions | 15-20 minutes for 5 questions |
| **Long** | Exam-style practice with marking scheme | 30-45 minutes for 3 questions |

If a mode has no seeded questions for the selected chapter, the card is disabled with a "No questions yet" tooltip. See [Question types](/docs/concepts/question-types) for what each mode tests.

### 5. Question count

A slider with chapter-specific bounds:

- **Minimum:** 3 questions (so quick attempts always exist).
- **Maximum:** the total seeded for that chapter and mode (often 20-50 for MCQ, 5-15 for Short, 3-8 for Long).

For a balanced 10-minute session, **10 MCQs** is the most common pick. For a deep dive, **20-30 MCQs** covers most chapters comprehensively.

## Optional inputs

### Topic filter (within the chapter)

Click "Advanced" and the **topic filter** opens. The chapter's topics are listed as checkboxes — uncheck the topics you want to skip. The chapter "Kinematics" might break into:

- Equations of motion
- Average speed and velocity
- Vectors and scalars
- Free fall

Pick only the topics you want this test to draw from. See [Topic-level filters within a chapter](/docs/tests/topic-filters) for the full mechanics.

### Source picker (official / community / both)

Click "Advanced" again and the **source picker** appears. The default is **Official only**. The slider lets you blend in community-submitted questions (after community module is enabled). See [Test source picker](/docs/tests/source-picker).

### Board override

If your account has a `preferredBoardId` set (see [Pick your board](/docs/getting-started/pick-board)), questions are tuned to that board's wording. You can override per-test from the Advanced panel — useful if you want to practise a different board's style for a specific test.

## What happens when you click "Start Test"

1. ImtehanHub validates the configuration through the Zod schema (mode + count + chapter must be valid for your plan and quota).
2. The test session is created in Firestore at `testSessions/{sessionId}` with status `in-progress`, your config, and a randomised question pick from the chapter (filtered by topic + source if applied).
3. You are navigated to `/app/test/session/:sessionId`.
4. The first question loads.
5. The trial counter or daily quota is incremented.

See [During the test](/docs/tests/during-test) for the test-runner UI.

## Quotas at the configure step

Before the test starts, ImtehanHub checks your quota:

- **Pre-sign-in:** if you have already used your 3 free trial tests, the LoginPrompt modal appears and the test does not start. See [The 3-test free trial](/docs/getting-started/free-trial).
- **Free tier (signed in):** if you have hit the day / week / month limit, a "Daily limit reached" screen explains when your next test unlocks.
- **Pro / Unlimited:** the start button is always live.

The quota check happens on the configure page so you do not waste time setting up a test you cannot start.

## Restoring a recent configuration

If you abandon configuration partway (close the tab, switch app), ImtehanHub remembers your last selections via the URL state pattern (see [URL state preservation](/docs/getting-started/welcome) — the section on URL state in `useUrlState`). Returning to `/app/test/configure?class=c9&subject=physics&chapter=kinematics&mode=mcq` restores the form to that exact state.

## Common questions

### Why can I only test one chapter at a time?

Chapter-level tests give the cleanest per-topic breakdown on the result page. A multi-chapter test mixes contexts and the breakdown becomes harder to act on. The roadmap includes a "Subject-level mixed test" mode, but the chapter-level test is the daily-practice primitive.

### Can I configure a test on the Android app?

Yes — the configuration screen is identical. The Android app uses the same React Hook Form components and the same Zod schemas. The only difference is the "Start Test" button is at the bottom of the screen for thumb-reach.

### What if my chapter shows zero questions?

The chapter exists in the data hierarchy but has not been seeded yet. Submit a [book request](/docs/getting-started/welcome) to flag the gap, or check back next week — the seed pipeline runs continuously.

### Can I save a configuration as a "template"?

Not yet. The roadmap includes "Quick start templates" — saved configurations you can re-run with one click. Today, the URL itself is your template.

## Next

- [Topic-level filters within a chapter](/docs/tests/topic-filters) — narrow a test to specific sub-topics.
- [Test source picker](/docs/tests/source-picker) — blend official + community questions.
- [During the test](/docs/tests/during-test) — what happens after Start Test.
