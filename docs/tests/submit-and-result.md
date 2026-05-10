---
id: submit-and-result
title: Submit and read your result — score ring, per-topic breakdown
sidebar_label: Submit & result
sidebar_position: 5
description: After you submit, ImtehanHub takes you to the result page. Read the score ring, the per-topic breakdown, the answer-by-answer review with textbook references, and decide what to revise next.
keywords:
  - test result page
  - score ring
  - per topic breakdown
  - textbook reference answer
  - exam result reading
slug: /tests/submit-and-result
---

# Submit and read your result

**The result page** is where ImtehanHub turns a finished test into something actionable. It is more than a single percentage — the page is structured so that within 30 seconds, you know **what topic to revise next**.

> **TL;DR** — Score ring at the top, per-topic breakdown in the middle, answer-by-answer review at the bottom. Every wrong answer is paired with a textbook page reference so you can verify in your own book.

## The submit confirmation

Before the result, the submit dialog shows:

- **Total questions answered** vs. unanswered.
- **Marked-for-review** count (if any).
- **Time elapsed** so far.
- Two buttons: **Submit** (final) and **Keep working**.

If you have unanswered questions, the dialog warns "Unanswered questions count as incorrect — submit anyway?" The intent is to never let a student accidentally submit half-finished, but to keep the path clear when you really mean it.

## What happens on submit

In a single Firestore transaction:

1. Test session status flips from `in-progress` to `submitted`.
2. Score is computed (correct / total × 100, rounded to 1 decimal).
3. Per-topic accuracy is computed by grouping answered questions by their `topicTags`.
4. Your `users/{uid}.stats` is updated atomically (totals, accuracy, streak, per-subject).
5. A leaderboard write fires (denormalised, see [Streaks and stats](/docs/concepts/streaks-and-stats)).
6. Achievement triggers run — any newly-earned achievements are appended to your stats.

You are then navigated to `/app/test/results/:sessionId`. The page renders within a second on a typical connection.

## The score ring

A circular SVG ring at the top of the page with:

- **Your score** in the centre — large, brand-coloured if 70%+, amber 50-70%, red below 50%.
- **The ring colour** matches: green for ≥ 70%, amber for 50-69%, red for < 50%.
- **A small caption** with question count and time taken.

The thresholds (70 / 50) are not arbitrary. Pakistani board exam pass marks are typically 33-40%, but ImtehanHub's threshold is set to **competitive practice level** rather than minimum-pass.

## The per-topic breakdown

Below the score ring, a list of topics from this test with:

- **Topic name** (English + Urdu).
- **Accuracy on that topic** (e.g. "Equations of motion: 4 of 5 correct, 80%").
- A small bar visualising the accuracy.

The breakdown is sorted **lowest accuracy first** — your weakest topic surfaces at the top of the list. That is the topic to revise.

If you used a [topic filter](/docs/tests/topic-filters) on this test, only the filtered topics appear. Otherwise, every topic that has at least one question in the test is shown.

## The answer-by-answer review

Below the breakdown, every question from the test is listed with:

- The **question text**.
- **Your answer** vs. the **correct answer**, side-by-side.
- A **green checkmark** or a **red cross** to indicate right/wrong.
- A **textbook page reference** ("Punjab Textbook Board Class 9 Physics, p. 47") so you can open your book and verify.
- A **bookmark button** to save the question for later — see [Bookmarks](/docs/tests/bookmarks).
- A **Get AI explanation** button (visible only if you have BYOK enabled — see [Question types](/docs/concepts/question-types)).
- A **Report this question** link if you believe the answer is wrong.

For Short questions, the review shows your answer, the model answer, and the text-comparison match. For Long questions, the marking scheme is visible with a self-grade slider.

## What the textbook reference means

Each question's correct answer carries a **page reference** that points to the page in the actual textbook where the answer appears. The reference is tied to the **book** field (see [Content hierarchy](/docs/concepts/content-hierarchy)) — it changes if the publisher or edition changes.

If you set your [board](/docs/getting-started/pick-board) to Punjab, references match the Punjab Textbook Board edition. If your physical book is a different edition, the page may be off by 1-3 pages — check the chapter title at the top of each page to land on the right one.

## Reviewing immediately vs. later

You can:

- **Review now** — scroll through every wrong answer, open your textbook for the worst few, then take another test on the same chapter.
- **Review later** — close the page; the test sits in your [history](/docs/tests/history) forever. Re-open via `/app/history/:sessionId` to land on the same review state.

Most students review immediately for the first 1-2 wrong answers, then move on. The history-based deep review happens in pre-exam revision sessions.

## What gets logged

When you reach the result page, ImtehanHub also fires:

- A `test_completed` analytics event (Firebase + Clarity + Amplitude) with class, subject, mode, score, time, and source ratio. No PII.
- A streak update if today is a new streak day.
- A leaderboard update.
- Any achievement notifications (a small toast appears for each newly-earned achievement).

## CTAs at the bottom

Three buttons:

| Button | What it does |
|---|---|
| **Take another test on this chapter** | Re-runs configure with same chapter pre-selected |
| **Try a different chapter** | Goes back to the subject's chapter list |
| **Open AI explanation** | (BYOK users) Opens AI review for the worst question |

## Common questions

### What if my score is 0%?

The ring shows red and the per-topic breakdown shows your worst topics. Open the answer-by-answer review and look at the textbook references — usually the issue is "I have not yet read this chapter". Read the chapter, then retake the test.

### Why is my score not what I expected?

Two common reasons:

1. **Unanswered questions count as incorrect.** Check the answer-by-answer view — unanswered questions are flagged.
2. **Short questions are graded by text comparison.** A nearly-correct phrasing can be marked wrong if it does not match the model answer pattern. Use AI review (BYOK) for closer grading.

### Can I export my result?

Not directly. The history page shows past results; an export to PDF is on the roadmap. For now, screenshot the result page if you need a record.

### Does the result page show the correct answer for unanswered questions?

Yes — every question's correct answer is visible in the review section, regardless of whether you answered it.

## Next

- [Review mode](/docs/tests/review-mode) — re-open a past test and revise the answers.
- [Bookmarks](/docs/tests/bookmarks) — star questions to revisit.
- [Streaks and stats](/docs/concepts/streaks-and-stats) — what your stats track over time.
