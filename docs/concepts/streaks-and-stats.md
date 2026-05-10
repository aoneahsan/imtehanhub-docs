---
id: streaks-and-stats
title: Streaks and stats — what gets tracked, how it is computed
sidebar_label: Streaks & stats
sidebar_position: 5
description: ImtehanHub tracks a daily streak, total tests, accuracy, per-subject breakdown, and best-ever streak — all computed locally and synced to your user document.
keywords:
  - exam app streak
  - daily test streak
  - study app statistics
  - accuracy tracking
  - best streak record
slug: /concepts/streaks-and-stats
---

# Streaks and stats

**Streaks and stats** are the numbers ImtehanHub keeps about your practice — your **daily streak**, **best streak**, **total tests taken**, **average accuracy**, and a **per-subject breakdown**. They are computed every time you submit a test and stored on your user document so they survive across devices.

> **TL;DR** — Take at least one test per day to keep your streak alive. Stats update on submit, not on test-start. Streak resets to 0 if you skip a full day; "freeze" days do not exist (yet).

## What gets tracked

Every signed-in user has a `stats` object on `users/{uid}` that looks like this:

```ts
{
  totalTests: 47,
  totalQuestions: 1182,
  correctAnswers: 891,
  accuracy: 75.4,                    // percentage, rounded to 1 decimal
  currentStreak: 6,                  // consecutive days
  bestStreak: 23,                    // all-time
  lastTestDate: '2026-05-09',        // ISO date
  perSubject: {
    'c9-physics': { tests: 12, accuracy: 78.0 },
    'c9-chemistry': { tests: 8, accuracy: 71.5 },
    'c9-math': { tests: 15, accuracy: 80.2 },
    // ...
  },
  achievements: ['first_test', 'streak_7_days', ...],  // see Achievements doc
}
```

You see the visual representation on the **Dashboard** (`/app/dashboard`).

## How the daily streak works

The streak is **the number of consecutive days you have taken at least one test on**.

- Take a test today → streak = 1 (if it was 0) or +1 (if it was already running).
- Take another test the same day → streak unchanged (already counted).
- Skip a day → streak resets to 0 the next time you take a test.
- "Day" is defined as midnight to midnight in **Pakistan Standard Time (Asia/Karachi, UTC+5)**.

The reset rule is intentionally strict: there are no "freeze" days, no "save your streak" tokens, no recovery mechanic. The point of the streak is to encourage **the habit** — and habit research consistently shows that fake-recovery mechanics weaken the habit signal.

## Best streak

Your **best streak** is the longest consecutive-day streak you have ever had. Once you exceed your previous best, the new value is locked in for life. Resetting your current streak to 0 does not affect your best.

## Total tests, total questions, accuracy

| Stat | What counts |
|---|---|
| **Total tests** | Every submitted test (any type, any class, any subject). Abandoned tests do not count. |
| **Total questions** | Sum of questions across all submitted tests. |
| **Correct answers** | For MCQs — auto-graded. For Short — text-comparison match. For Long — your self-graded score. |
| **Accuracy** | `correctAnswers / totalQuestions * 100`, displayed to 1 decimal. |

Accuracy is the **all-time average** — it does not reset weekly or monthly. To see your recent trend, look at the per-test accuracy in your test history (`/app/history`).

## Per-subject breakdown

For every subject you have taken at least one test in, ImtehanHub tracks:

- Number of tests in that subject.
- Total questions answered.
- Accuracy in that subject.

The breakdown is shown on the Dashboard as a sortable table. Sort by tests to see which subjects you focus on; sort by accuracy to see where you are strongest or weakest.

## Per-topic breakdown (per test, not per user)

Per-topic breakdown is shown on the **result page** for each individual test, not on the all-time stats. So:

- Take a Class 9 Physics → Kinematics test → result page shows topic breakdown for that chapter only (Equations of Motion, Vectors, etc.).
- Open the test from history → same per-topic view re-rendered.

The reason topic-level stats are not aggregated to the user level: too many topics, too noisy a signal, and the actionable thing (which topic to revise) is more useful right after the test, not in a long-term graph.

## When stats update

Stats are written to Firestore **on submit**:

1. You answer the questions.
2. You click Submit.
3. ImtehanHub computes the score, persists the test session document, and runs an atomic update on `users/{uid}.stats`.
4. The updated stats appear immediately on the Dashboard.

If the update fails (network drop, Firestore permission glitch), the test session is still saved and the stats are recomputed from the session list on the next page load — no stat is permanently lost.

## Privacy and the leaderboard

The `stats` object is **private** — only you can read your own. The leaderboard does not pull from `stats`; it pulls from a separate denormalized `leaderboard` collection that contains only:

- `displayName` (your Google profile name, not your email).
- A score (typically `accuracy * tests` or similar).
- An update timestamp.

This separation means the leaderboard is publicly readable without exposing email, role, billing, or activity to other users. See the [Leaderboard](/docs/getting-started/welcome) page for the full read-rules.

## Re-computation and corrections

If you flag a wrong question and the moderator marks it correct in your favour, your `stats.accuracy` is **not** retroactively recomputed — the original test result stands. Recomputing past results creates ambiguity (what was the score yesterday?) and breaks streak-fairness.

The exception: if a question is removed from the active set (because the moderator deleted a duplicate), it is excluded from future recomputations, but past results still count it.

## Common questions

### Can I see a graph of my accuracy over time?

Not yet on the user-facing dashboard. Per-test accuracy is in your history list, and you can scroll through chronologically. A time-series chart is on the post-V1 roadmap.

### What if I take a test but do not submit it?

The test session is stored as `incomplete`. It does not count toward stats, does not affect streak, and is not visible on the leaderboard. You can re-open and finish it later from `/app/history`.

### Does my streak count tests submitted in the last few minutes of the day?

Yes — anything submitted **before midnight Pakistan Standard Time** counts for that day. ImtehanHub uses the device clock for the cutoff, so make sure your phone or laptop time is correct.

### I changed timezone — does my streak break?

ImtehanHub uses Pakistan Standard Time (Asia/Karachi) regardless of your device timezone. So a student studying abroad still has the same daily-cutoff rule. This avoids streak gaming by changing timezones.

### Are my stats visible to my institute manager?

If you have an `instituteId` set, your institute manager can see your test history, accuracy, and recent activity through the institute dashboard. They cannot see your bookmarks or your private settings.

## Next

- [Achievements](/docs/concepts/achievements) — badges earned at milestones.
- [Quotas and plans](/docs/concepts/quotas-and-plans) — daily / weekly / monthly limits.
- [Sign in with Google](/docs/getting-started/sign-in) — required to start tracking stats.
