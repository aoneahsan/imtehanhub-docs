---
id: leaderboard
title: Leaderboard — privacy-safe, denormalized
sidebar_label: Leaderboard
sidebar_position: 7
description: The ImtehanHub leaderboard at /app/leaderboard ranks users by score in a privacy-safe, denormalized way — only display name and score, no email, role, or activity exposed.
keywords:
  - ImtehanHub leaderboard
  - student ranking Pakistan
  - privacy safe leaderboard
  - denormalized Firestore
  - exam app rankings
slug: /discovery/leaderboard
---

# Leaderboard — privacy-safe, denormalized

**The leaderboard** at `/app/leaderboard` is a public-readable ranking of ImtehanHub users by score. It is **denormalized into its own collection** so that it can be readable by everyone without exposing private data on the user document. Display name + score + last-update timestamp, nothing else.

> **TL;DR** — Anyone signed in can view the leaderboard. Your displayed entry is your Google profile name + your score. Email, role, billing, activity, and stats stay private.

## Why a separate collection

The full user document at `users/{uid}` carries email, role, billing, full stats, achievements, theme preferences, board, and more. None of that should be public.

A separate `leaderboard/{uid}` collection holds only:

```ts
{
  uid: 'firebase-uid',
  displayName: 'Your Name',
  score: 72.4,                 // typically accuracy * sqrt(tests) or similar
  updatedAt: '2026-05-10T...',
}
```

Firestore security rules:

- **Read**: any authenticated user can read any leaderboard entry.
- **Write**: only the owner (`request.auth.uid == resource.data.uid`) can write — and the write is triggered by a signed-in user submitting a test, never by a manual call.

The user document at `users/{uid}` stays **read-restricted to the owner**. The leaderboard is a curated projection, not a window onto the user.

## What "score" means

The score is intentionally simple — it rewards both **accuracy** and **volume**. The exact formula is in `src/services/leaderboard-service.ts` and roughly:

```
score = accuracy * log2(testCount + 1)
```

This means:

- A student with 95% accuracy and 4 tests has a low-ish score (high accuracy, low volume).
- A student with 70% accuracy and 200 tests has a strong score (decent accuracy, sustained engagement).
- A student with 100% accuracy and 1000 tests is at the top.

The formula was tuned to avoid both extremes (high-accuracy-but-took-1-test gaming, and low-accuracy-but-spammed-tests gaming).

## Displayed information

For each entry, the leaderboard shows:

- Rank (1, 2, 3, ...).
- Display name (your Google profile name).
- Score (rounded to 1 decimal).
- A small trend indicator (↑ / → / ↓) compared to the same time last week.

What is **not** shown:

- Email.
- Role (admin / institute manager / user).
- Plan tier (Free / Pro / Unlimited).
- Class / subject specialisation.
- Streak.
- Any specific test history.

## Filters and views

The leaderboard supports:

- **All-time** (default).
- **Last 7 days** — score recomputed from tests submitted in the last week.
- **Last 30 days**.

Filter is via URL state: `/app/leaderboard?range=30d`.

A per-class leaderboard (`?class=c9`) is on the roadmap.

## Joining the leaderboard

Your entry is created automatically the first time you submit a test as a signed-in user. After every subsequent test, the entry's `score` and `updatedAt` are recomputed and written.

If you delete your account ([data deletion](/docs/getting-started/welcome)), your leaderboard entry is also deleted.

## Hiding from the leaderboard

A privacy toggle on `/app/profile` lets you opt out of the leaderboard. With opt-out:

- Your entry is removed from the leaderboard collection.
- Your tests still update your private stats.
- Your entry is **not** recreated on subsequent tests.

You can opt back in any time. The opt-out toggle is per-account and immediate.

## Display name

Your `displayName` on the leaderboard is your Google profile name (the one Google has, not your email). You can override it on the Profile page with a custom display name (alphanumeric, 3-20 chars, no obscenity).

Some students use their real name to show off; some use a pseudonym for privacy. Both are fine.

## Performance

With thousands of entries, the leaderboard query is paginated (top 50 by default; load more via Firestore cursor pagination). The full leaderboard is never loaded at once.

The `/app/leaderboard` page also caches the top 100 in TanStack Query for 60 seconds, so refreshes feel instant within that window.

## Common questions

### Can I see my rank globally?

Yes — your own entry shows your global rank at the top of the page, even if you are not in the top-50 visible window.

### Why can I not see the leaderboard without signing in?

Public leaderboard would expose all display names to anyone, which crosses a privacy line for many parents (uncomfortable with their child's name on a public-internet ranking). Sign-in keeps the surface within the verified-user community.

### Does the leaderboard influence pricing or features?

No — it is purely a ranking. Pro / Unlimited tiers are paid; the leaderboard is unrelated.

### Why is my old high score gone in the 7-day view?

The 7-day view scores only tests in the last 7 days. If you took a test 8 days ago and none since, you are not in the 7-day list (you remain in the all-time list).

### Can my institute see the leaderboard?

Same rules — your institute manager sees the leaderboard like any other signed-in user. They see only display name and score for everyone, including their own students.

## Next

- [Streaks and stats](/docs/concepts/streaks-and-stats) — what feeds the leaderboard score.
- [Achievements](/docs/concepts/achievements) — separate from rank but visible on Profile.
- [Account & Settings — profile](/docs/getting-started/welcome) — set your display name and opt-out toggle (full Account section lands in Batch 5).
