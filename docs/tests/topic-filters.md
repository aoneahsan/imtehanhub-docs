---
id: topic-filters
title: Topic-level filters within a chapter
sidebar_label: Topic filters
sidebar_position: 2
description: Filter a test to only the sub-topics you want to drill — useful when you have already mastered most of a chapter and only need to revise one or two areas.
keywords:
  - topic filter chapter
  - sub-topic test
  - drill specific topic
  - exam practice filter
slug: /tests/topic-filters
---

# Topic-level filters within a chapter

**Topic filters** let you narrow a test to specific sub-topics inside a chapter. Instead of testing the full chapter at random, you pick the sub-topics that need work and skip the ones you have already mastered.

> **TL;DR** — In the test configuration screen, expand **Advanced**, and check / uncheck topics for the selected chapter. Only checked topics contribute questions to the test.

## When to use a topic filter

Three common situations:

1. **You scored 80%+ overall but missed every question in one sub-topic.** Filter to that sub-topic and run a focused 10-question test.
2. **The chapter has a long syllabus and you have limited time today.** Pick the 2-3 topics most likely to appear on the exam.
3. **You are revising for a board exam and want to drill the highest-weight topic first.** Filter to it and take 3-5 sequential tests.

If you have not yet practised the chapter at all, **skip the filter** for the first attempt — full-chapter tests give a baseline that the per-topic breakdown can act on.

## Where topics come from

Every chapter document in Firestore has a `topics` array. Topics are populated when the chapter is seeded:

- Editorial topics from the official syllabus (e.g. Class 9 Physics → Kinematics → "Equations of motion", "Vectors and scalars").
- Topics tagged on individual questions during seeding — if at least 3 questions tag a topic, it appears in the filter.

The exact topic list per chapter is visible on the chapter detail page and on the configure screen's Advanced panel.

## How filtering works under the hood

When you check a subset of topics:

1. The Zod schema on the configure form accepts an optional `topicIds: string[]`.
2. On Start Test, the question pick query is `WHERE chapterId == X AND topicTags array-contains-any topicIds`.
3. Questions that touch any of the checked topics are eligible. Questions that touch only unchecked topics are excluded.
4. If a question touches both a checked and an unchecked topic, it is included (it is "in" via the checked side).

The minimum question count enforces that your filter selection still yields **at least 3 questions**. If your filter is too narrow, the start button shows "Need at least 3 questions — broaden your topics."

## Topic filters and the per-topic breakdown

The per-topic breakdown on the result page only shows the topics that contributed to this test. So a filtered test gives you a focused breakdown — much easier to act on than a full-chapter breakdown.

Example: filter to "Equations of motion" + "Vectors". Take a 10-question test. Result page shows accuracy across only those two topics, with question-level rows. You can immediately see which one needs more work.

## Topic filters across multiple tests

Take three sequential tests on the same filter (same topics, fresh question pick each time). Each test gets its own per-topic breakdown. ImtehanHub does **not** auto-roll-up filtered tests into a topic-level history — the per-topic stat is per-test, not per-user (see [Streaks and stats](/docs/concepts/streaks-and-stats)).

The reason: aggregating per-topic stats per user creates a moving target (which version of "Vectors" — last week's seed or this week's?) that is rarely actionable.

## Common questions

### Why does my filter only show 4 of the 7 topics in the chapter?

Topics with fewer than 3 questions are not shown — the filter is meant to produce a viable test. Topics with no questions at all are hidden entirely.

### Can I save a topic filter as a preset?

Not yet. The roadmap includes saved configurations.

### What if my topic is not listed?

Topics are taken from the chapter's `topics` array. If a topic you study is missing, it means none of the seeded questions tag it. Use the [book request](/docs/getting-started/welcome) flow to request additional questions.

### Does the topic filter apply to Short and Long modes too?

Yes — topic tags exist on Short and Long questions the same way as MCQs. The filter UI is identical across modes.

## Next

- [Configure a test](/docs/tests/configure) — the configuration screen the filter lives in.
- [Content hierarchy](/docs/concepts/content-hierarchy) — how topics fit under chapters.
- [Submit and read your result](/docs/tests/submit-and-result) — the per-topic breakdown a filtered test produces.
