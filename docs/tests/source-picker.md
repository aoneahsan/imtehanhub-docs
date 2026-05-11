---
id: source-picker
title: Test source picker — official, community, or both
sidebar_label: Source picker
sidebar_position: 3
description: Blend official questions (seeded from textbooks) with community questions (submitted by peers). Choose official-only, community-only, or a 0-100% mix.
keywords:
  - test source picker
  - official vs community questions
  - community submissions test
  - exam app source ratio
slug: /tests/source-picker
---

# Test source picker

**The source picker** is the test-configuration control that decides where your questions come from — **official** (seeded by the ImtehanHub content team), **community** (submitted by verified students), or a **blended ratio** between the two. It sits in the **Advanced** panel of the configure screen.

> **TL;DR** — Default is **100% official**. Slide right to mix in community questions. Set 100% community to test only community-submitted content. Community questions only show up on chapters where they have been verified and approved.

## What the slider does

A horizontal slider with two ends:

- **Left (0%)** — official only.
- **Right (100%)** — community only.
- **Anywhere in between** — your test draws that ratio of community to official.

If you set the slider to 30%, ImtehanHub aims for ~30% community questions and ~70% official. The actual ratio in your test is approximate — if a chapter has only 10 community questions and you ask for 30 questions at 30% community, you get the 9-10 community questions available plus 20-21 official questions.

## Why a source picker exists

Three product reasons:

1. **Quality assurance for community content.** Official questions are seeded from textbook sources by the content team. Community questions go through CNIC verification + voting + flagging + moderator review (see [Community module](/docs/credits)) but are still community-authored. The slider lets students decide how much community content they trust at a given moment.
2. **Driving community engagement.** Community contributors want their questions to be answered. The slider gives them visibility — "I see 12 community questions exist for this chapter. Let me try them."
3. **Promoting good community content.** Community questions that consistently get answered correctly and never get flagged are eligible for **promotion to official**. The slider creates the testing signal that informs promotion decisions.

## How "community" questions get there

A verified community contributor submits a question through the [Community submissions](/docs/credits) flow. The question goes through:

1. **Bilingual gate** — both English and Urdu must be present.
2. **Voting** — needs net votes ≥ 10 AND gross votes ≥ 15 AND no active flags to be eligible for testing.
3. **Flagging** — if any flag is active, the question is hidden from the test pool until the flag is reviewed.
4. **Moderator queue** — flagged questions go to a moderator. Result is either dismissal of the flag (question stays), correction of the question, or removal.
5. **Eligible for testing** — once the question passes voting and has no active flags, it appears in the source picker pool.
6. **Promote to official** — admins can promote eligible community questions into the official set. Promoted questions are no longer marked "community" and stay tested forever.

## Source labelling on the result page

After the test, every question on the result page is labelled with its source:

- **Official** — green badge.
- **Community** — blue badge with the contributor's display name (if they opted in to be credited).

You can click the source badge to see more about the question — the contributor's bio, voting history, and other questions they have submitted.

## Edge cases

### Chapter has zero community questions

The slider is hidden on the configure screen — no choice to make. The default is implicitly 100% official.

### Chapter has community questions but they fail eligibility

Same as above — the slider is hidden until at least one community question is eligible.

### You picked 100% community and the pool is too small

If the chapter has only 4 eligible community questions and you asked for 10, the test starts with only the 4 questions and a notice "Only 4 community questions available — your test has been shortened. To take a longer test, blend in official questions."

### A flagged question slips through

If a question gets flagged after your test starts but before you submit, it stays in your test (the flag does not retroactively remove it). On the result page, it is shown with a "Flag review pending" indicator. Once the flag is resolved, your stats are not retroactively recomputed (see [Streaks and stats](/docs/concepts/streaks-and-stats)) — but the question itself may be corrected for future tests.

## Setting the slider

The slider is a visual control in the Advanced panel. The current value is also persisted to the URL — `?source=70` means 70% community for that test. Bookmark a configuration with your preferred ratio and re-run it any time.

The default for new users is **0% community (100% official)** — ImtehanHub does not push community content on you. You opt in.

## How the slider interacts with topic filters

Topic filters and source picker apply **independently and conjunctively**:

- Filter to "Vectors" topic + 50% community → questions on Vectors, drawn 50/50 from official and community.
- Filter to "Equations of motion" + 100% community → only community-submitted questions on that topic.

Both filters narrow the pool. If the combined narrowing leaves fewer than 3 questions, the start button blocks with a clear "broaden your filters" message.

## Common questions

### Should I use community questions?

Once you have run a few official-only tests and feel confident with the chapter, blending in 20-30% community is a good way to see questions phrased differently than the textbook. It is also the most direct way to support the community.

### What if a community question is wrong?

Flag it via the question's report button. Flagging is the documented and supported feedback mechanism — see [Flagging](/docs/credits).

### Are community questions in both Urdu and English?

Yes — they must be (the bilingual gate enforces it). A community submission missing one language is rejected by the submission form.

### Is community content available for every chapter?

No. Community content concentrates on the chapters most students study (Class 9-10 board exam chapters, then 1st-2nd Year). Class 5-7 chapters often have zero community content because few students contribute at that level.

## Next

- [Configure a test](/docs/tests/configure) — the configure screen as a whole.
- [Question types](/docs/concepts/question-types) — official and community questions follow the same MCQ / Short / Long structure.
- [Credits](/docs/credits) — link to the community module overview (full docs in Batch 3).
