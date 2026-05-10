---
id: achievements
title: Achievements — earning recognition for milestones
sidebar_label: Achievements
sidebar_position: 6
description: ImtehanHub awards achievements for milestones across testing, streaks, and community contribution. The community module alone has 25 distinct badges across six tracks.
keywords:
  - exam app achievements
  - study badges
  - community contributor recognition
  - gamified study
  - milestone unlock
slug: /concepts/achievements
---

# Achievements

**Achievements** are unlockable badges awarded for crossing meaningful milestones on ImtehanHub — your first test, your first week-long streak, your first community submission, your first 100 correct answers in a row, and so on. Each achievement is permanent and visible on your profile.

> **TL;DR** — Just use the app. Achievements unlock automatically. The **Community module alone has 25 distinct badges** across six tracks (Contributor, Voter, Reviewer, Streak, Verifier, Linguist).

## Why achievements?

Two reasons, in priority order:

1. **A signal of progress.** Pakistani board exam preparation is a long, often discouraging slog. Small recognitions along the way ("You completed 10 tests this week", "You wrote your first community submission", "Your daily streak hit 30 days") matter as motivation.
2. **A nudge toward useful behaviour.** The achievements are designed around behaviours that improve outcomes — daily practice (streaks), broad coverage (tests across subjects), community contribution (submitting, voting, flagging).

Achievements are **not** a leaderboard ranking system. They are personal milestones. There is no "race" to unlock them.

## Where achievements live

On your user document at `users/{uid}.stats.achievements`. The shape is a list of achievement IDs (strings):

```ts
achievements: [
  'first_test',
  'streak_7_days',
  'streak_30_days',
  'tests_50',
  'community_submitter_1',
  'community_voter_10',
  // ...
]
```

The list is append-only — once you earn an achievement, it stays earned forever.

## Categories of achievements

ImtehanHub achievements fall into several families:

### 1. Testing milestones

| Achievement | Trigger |
|---|---|
| First test | Submit your first test |
| Tests × 10 / 50 / 100 / 500 | Submit N tests total |
| First perfect score | 100% on any test |
| Cross-subject explorer | Take tests in 5+ different subjects |
| Long-question warrior | Submit a Long-question test |

### 2. Streak milestones

| Achievement | Trigger |
|---|---|
| Streak — 7 days | Daily streak hits 7 |
| Streak — 30 days | Daily streak hits 30 |
| Streak — 100 days | Daily streak hits 100 |
| Comeback | Restart a streak after a break (any new streak ≥ 3 days after a previous break) |

### 3. Accuracy milestones

| Achievement | Trigger |
|---|---|
| Solid 70 | All-time accuracy crosses 70% (with ≥ 50 questions answered) |
| Sharp 80 | 80% with ≥ 100 questions |
| Elite 90 | 90% with ≥ 200 questions |

### 4. Community module (25 distinct badges)

The [community module](/docs/credits) has the largest single batch of achievements — 25 across six tracks. Earning community achievements **raises your daily quotas** for community actions (submissions, votes, comments, flags).

Track families:

- **Contributor** — submit MCQs / Short / Long / Chapter Explanation. Higher tiers raise your daily submission quota.
- **Voter** — vote on community submissions. Higher tiers raise your daily vote quota.
- **Reviewer** — flag accurate submissions and your flags lead to actions. Higher tiers raise your daily flag quota and unlock visibility into the moderator queue.
- **Streak** — community-action streaks (daily contribution, daily voting).
- **Verifier** — successfully complete CNIC verification (one-time, but unlocks the entire community surface).
- **Linguist** — submissions that pass the bilingual gate cleanly without revisions.

The exact quota raises and unlock thresholds live in the community module's source. See the [Community module overview](/docs/credits) for the full list.

### 5. Bookmark milestones

| Achievement | Trigger |
|---|---|
| First bookmark | Star your first question |
| Bookmark collector | Bookmark 50 questions |

### 6. Feature-discovery achievements

| Achievement | Trigger |
|---|---|
| Bilingual practitioner | Take at least one test with Urdu UI |
| Theme tinkerer | Visit the theme customizer and change at least one option |
| Referrer | First successful referral via your referral code |
| Auto-Pro | Hit 3 successful referrals (auto-Pro upgrade) |

## How achievements are evaluated

Most achievements are checked **at write time**:

- Submit a test → check streak, total tests, accuracy thresholds.
- Save a bookmark → check first-bookmark, collector.
- Submit a community item → check Contributor / Linguist / Streak.
- Flag a community item that leads to action → check Reviewer.

A few are checked on **scheduled jobs** (daily for the streak rollover, monthly for "Cross-subject explorer" if you crossed 5 subjects in different months).

## Visibility

- **Your own achievements** are visible on your Profile page.
- **Other users' achievement counts** are visible on the leaderboard but not the specific badge list.
- **No achievement is shameful or negative** — there are no "demerit" badges.

## Achievement design principles

The achievement set is designed around three rules to avoid common gamification traps:

1. **No fake progress.** Achievements only fire on real, useful behaviour — taking a real test, submitting a real bilingual MCQ. There are no "click this button" or "complete the tutorial" badges that pad the list.
2. **Ramp, don't cap.** Tiered achievements (Tests 10 → 50 → 100 → 500) keep something to unlock for years. We do not cap at "100 = max" because some students will take thousands of tests over their full school career.
3. **Reward the prosocial behaviour.** Community contributors, voters, and reviewers earn meaningfully more than passive testers — because the community work builds the platform for everyone.

## Common questions

### Can I lose an achievement?

No. Once earned, an achievement is permanent.

### Do achievements give me real-money rewards?

No. Achievements are recognition, not currency. The closest thing to a "reward" is the **auto-Pro upgrade at 3 successful referrals**, which is a separate mechanic (see [Quotas and plans](/docs/concepts/quotas-and-plans)).

### Can I see what I have not yet unlocked?

Some — the Profile page shows progress toward upcoming tier achievements (like "8 / 30 days for the 30-day streak"). Hidden achievements (the rare ones) are not shown until earned.

### Is there an achievement leaderboard?

The general leaderboard shows score, not achievement count. A dedicated achievement leaderboard is on the post-V1 roadmap.

### Are community achievements gated by CNIC verification?

Yes — the Community module overall is gated by [CNIC verification](/docs/credits). Until you verify, none of the community achievements can be earned. The Verifier achievement specifically unlocks **at the moment of successful verification**.

## Next

- [Streaks and stats](/docs/concepts/streaks-and-stats) — what feeds the achievement triggers.
- [Quotas and plans](/docs/concepts/quotas-and-plans) — community achievements raise these.
- [Content hierarchy](/docs/concepts/content-hierarchy) — the structure achievements span.
