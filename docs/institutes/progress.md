---
id: progress
title: Progress dashboard — reading aggregate student progress
sidebar_label: Progress dashboard
sidebar_position: 3
description: Aggregate test counts, accuracy, per-class breakdown across your roster — no individual student answers or detailed history exposed. Privacy-preserving by design.
keywords:
  - institute progress dashboard
  - school student progress
  - academy reporting Pakistan
  - aggregate test analytics
  - privacy preserving dashboard
slug: /institutes/progress
---

# Progress dashboard

**The progress dashboard** at `/app/institute/progress` is the institute manager's analytics surface. It rolls up activity across the entire roster into a small set of aggregate metrics — enough to answer "how is my batch doing?" without exposing what any individual student answered on any individual test.

> **TL;DR** — Aggregate metrics only: total tests taken, average accuracy, distribution across classes / subjects, week-over-week activity trend. No per-student question detail.

## The four panels

### 1. Activity at a glance

A small grid of four large numbers:

- **Total tests submitted** by all roster students in the selected window.
- **Average accuracy** across those submissions (volume-weighted, so a student with 50 tests pulls more than a student with 2).
- **Active students** in the window (took at least one test).
- **Total time spent** (sum of per-test durations).

Default window: last 30 days. Switchable to 7 days, 90 days, or all-time.

### 2. Activity trend

A line chart of test submissions per day across the window. Lets you see at a glance whether your students are warming up to a board-exam deadline, dropping off after a holiday week, or staying steady.

The trend line uses D3.js with a subtle area fill and hover tooltips showing exact counts and dates.

### 3. Class and subject breakdown

A stacked bar chart of test counts split by class. If your institute runs both 9th and 10th batches, you see two bars; if you only run a 10th-Pre-Medical batch, you see one.

Each bar is further sub-divided by subject (Biology, Chemistry, Physics, ...). Click a bar and a side panel shows the top 5 chapters by submission count within that class+subject.

This is the panel you use to spot **coverage gaps**: if every student is hammering Biology Chapter 3 and ignoring Chapter 8, that is a teaching signal.

### 4. Per-student summary table

A TanStack-Table grid with one row per roster student and these columns:

- Display name (or fallback initials).
- Tests in window.
- Average accuracy in window.
- Best chapter (the chapter where this student scored highest, name only).
- Weakest chapter (lowest scoring chapter, name only).
- Last activity date.

The grid is searchable, sortable, and paginated. The columns are visibility-toggleable from a small menu.

What you do **not** see in this table: which specific questions each student answered, which they got wrong, or any individual test result. Privacy is built in at the data layer — the per-student summary reads from `users/{uid}` aggregate fields (`stats.totalTests`, `stats.averageAccuracy`, `stats.bestChapter`, etc.), not from the underlying test documents.

## What you cannot see — and why

The dashboard intentionally **does not** show:

- A specific student's test history (which test they took on which day).
- Question-level answers (which choices they picked).
- Bookmarks, community submissions, or comments.
- Their plan tier or billing.
- Their leaderboard ranking (visible to them but not aggregated to you).

Privacy by data minimisation: institute managers are entitled to confidence that their students are using the tool, not to a microscope on every click. The aggregates we surface answer the questions a teacher would otherwise ask the student in class — "how many tests this week? how's accuracy trending? where are the gaps?" — without requiring the student to disclose anything they did not consent to.

If a student wants to share their detailed history with you, they can export their data from `/app/profile` (see [Data deletion](/docs/account/data-deletion) for the export button) and email you the JSON. The institute layer never does this for them.

## Date windows and URL state

Window selection is reflected in the URL:

```
/app/institute/progress?range=7d
/app/institute/progress?range=30d
/app/institute/progress?range=90d
/app/institute/progress?range=all
```

This means you can bookmark a specific view or share a link with a co-teacher. Per our [URL-state preservation rule](/docs/concepts/content-hierarchy), reload always restores the same view.

A custom date range (`?from=2026-04-01&to=2026-04-30`) is on the roadmap.

## Exporting

The **Export** button on each panel produces:

- Activity grid → a one-row CSV.
- Activity trend → a per-day CSV.
- Class/subject breakdown → a long-format CSV grouped by class, subject, chapter.
- Per-student table → the same columns as the on-screen grid, CSV.

The exports include only what is already visible on the dashboard — no extra fields. They are meant for offline reporting (e.g. monthly emails to a school principal or a batch-end review).

## How metrics are computed

| Metric | Computation |
|---|---|
| Total tests | Count of test docs in the window across all roster UIDs |
| Average accuracy | `sum(correctAnswers) / sum(totalQuestions)` across the window — volume-weighted, not per-student-averaged |
| Active students | Distinct UIDs with at least one test in the window |
| Best/weakest chapter (per student) | Computed and cached on `users/{uid}.stats.bestChapter` after each test submission; read directly on dashboard fetch |
| Activity trend | Pre-bucketed daily counts cached in `institutes/{id}/dailyActivity/{date}` to avoid expensive daily aggregations on every page load |

Caching means the dashboard loads instantly; data lags by at most one minute behind reality.

## Performance for large rosters

We tested up to 500 students on a single institute and the dashboard loads in under 800 ms. The per-student table paginates at 50 rows; the aggregate panels read pre-cached counts; the trend chart reads daily-bucketed data.

If your institute has more than 500 students, expect ~2-3 seconds on first load with subsequent loads cached at the network layer. We are happy to optimise further on request if you hit edge cases.

## Common questions

### Can I see a single student's question-by-question answers?

No — that is private to the student. If you need that detail for an academic intervention, ask the student to share their data export.

### Why is "average accuracy" a different number than a specific student's profile shows?

Yours is **volume-weighted** across the roster. A single student's profile is their own ratio. Both are correct; they answer different questions.

### Are these metrics updated in real-time?

Counts and trend buckets update within 60 seconds of a test submission. Per-student `stats` (best/weakest chapter) update on the next test submission after the relevant chapter changes.

### Can a parent get this dashboard for their child?

Not through the institute panel — that is manager-only. A future "Parent" role is roadmapped that would give a parent a similar aggregate view for a single child, with the child's explicit opt-in.

## Next

- [Manage students](/docs/institutes/manage) — keep the roster clean.
- [Overview](/docs/institutes/overview) — what an institute is.
- [Streaks and stats](/docs/concepts/streaks-and-stats) — what the student-side stats panel shows.
