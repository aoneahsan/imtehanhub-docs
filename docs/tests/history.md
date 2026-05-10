---
id: history
title: Test history — every test you have ever taken
sidebar_label: Test history
sidebar_position: 8
description: Your test history at /app/history shows every test you have ever submitted on ImtehanHub, plus any in-progress tests waiting to be resumed.
keywords:
  - test history ImtehanHub
  - past tests list
  - resume incomplete test
  - exam history Pakistan
slug: /tests/history
---

# Test history

**The history page** at `/app/history` is the canonical list of every test you have ever started on ImtehanHub — submitted or in-progress. It is the place to resume a half-finished test, browse past results for revision, or jump back into a chapter you struggled with.

> **TL;DR** — Open `/app/history`, find the test, click. Submitted tests open in [review mode](/docs/tests/review-mode); in-progress tests resume from where you left off.

## What the page shows

A reverse-chronological list of test sessions, one per row, with:

- **Date and time** of the test.
- **Class → Subject → Chapter** name path.
- **Mode badge** (MCQ / Short / Long).
- **Score** if submitted, "In progress" if not.
- **Time taken**.
- **Action button** — "Review" for submitted tests, "Resume" for in-progress.

Clicking a row navigates to `/app/history/:sessionId` — that resolves to either review mode (submitted) or the test runner (in-progress) based on the session status.

## Filters

The history list supports filters via URL state (so the URL is bookmarkable):

| Filter | Param | Examples |
|---|---|---|
| Status | `?status=` | `submitted`, `in-progress`, `all` |
| Class | `?class=` | `c9`, `1st-year` |
| Subject | `?subject=` | `c9-physics` |
| Mode | `?mode=` | `mcq`, `short`, `long` |
| Date range | `?range=` | `7d`, `30d`, `all` |
| Search | `?q=` | matches chapter or subject name |

Combine freely: `/app/history?class=c9&subject=physics&status=submitted&range=30d` shows your last 30 days of Class 9 Physics tests.

## Resuming an in-progress test

Tests in `in-progress` status sit at the top of the list (under a header). Click **Resume**:

1. ImtehanHub re-loads the test runner at `/app/test/session/:sessionId`.
2. Your saved answers and marks-for-review are restored.
3. The timer resumes (it had paused when you left).
4. You can finish and submit — submission counts toward your stats and streak the same as a single-sitting test.

If you abandoned a test 6 months ago and just resumed today, that is fine. The test still belongs to the chapter and questions it had at submit time (even if the chapter has been updated since — the question snapshots are preserved on the session).

## Why some tests appear and others don't

Every "Start Test" click creates a session, but the session only appears in history if you **answered at least one question**. This avoids cluttering the list with sessions you closed before answering anything.

If you are sure you took a test and it is missing, two possibilities:

1. You closed the tab before answering — the session was discarded server-side.
2. You used a different account (e.g. signed in with a different Google account on a friend's device).

## Actions on a history row

Each row has a small kebab menu with:

- **Take another test on this chapter** — pre-fill the configure form.
- **Bookmark this test** (note: bookmarks are per-question, not per-test; this is shorthand for "open the test and bookmark every wrong answer").
- **Delete this test** — removes the session from history. Your stats are **not** retroactively recomputed (per the same rule as everything else; see [Streaks and stats](/docs/concepts/streaks-and-stats)). The leaderboard entry is unchanged.

Deleting a test is intentional and rare — most students never need to. The button exists primarily for "I accidentally took a test on the wrong chapter" cleanup.

## History on the Android app

The Android app's history list works identically. The list is cached locally so you can browse past results offline. Resuming an in-progress test requires a connection (Firestore needs to read the session state).

A native ad (`AdNative` component) appears every 8-10 rows in the free tier. Pro and Unlimited see no ads.

## Common questions

### Is there a search across question text?

Not in the history list (which is per-test, not per-question). For per-question search, use [Bookmarks](/docs/tests/bookmarks) — bookmarks are searchable by the question text in their detail view.

### Can my institute manager see my history?

Yes — if you have an `instituteId` set, your manager sees a per-student progress report that includes your test history. They cannot see your answers; they see scores and timestamps. See the For Institutes section (lands in Batch 5).

### Does deleting a test delete the bookmarks made in it?

No. Bookmarks live in their own collection (`bookmarks/`) and reference the question, not the test session. Deleting a test does not affect any bookmark you made from it.

### How long does history go back?

Forever. There is no auto-archive. Some students have hundreds of tests across years — the list still loads quickly because Firestore queries are paginated (20 per page).

### Can I export my history?

Not yet. CSV / PDF export is on the roadmap.

## Next

- [Review mode](/docs/tests/review-mode) — open a past test and re-read the answers.
- [Streaks and stats](/docs/concepts/streaks-and-stats) — the all-time numbers that history rolls up to.
- [Configure a test](/docs/tests/configure) — start a new test.
