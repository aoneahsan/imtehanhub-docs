---
id: during-test
title: During the test — timer, progress, navigation, mark-for-review
sidebar_label: During the test
sidebar_position: 4
description: What you see and what you can do during a test on ImtehanHub. Timer behaviour, question navigation, mark-for-review, and partial-save on disconnect.
keywords:
  - test session ImtehanHub
  - exam timer behaviour
  - mark for review
  - test runner UI
  - offline test recovery
slug: /tests/during-test
---

# During the test

**The test runner** is the screen at `/app/test/session/:sessionId` — the page where you actually take a test on ImtehanHub. It is built for focus: minimal chrome, clear question text, easy navigation, and a timer that informs without rushing you.

> **TL;DR** — One question at a time, click an option to answer, **Next** to move on. Use **Mark for review** to flag questions you want to come back to. The timer is for awareness — nothing auto-submits unless you choose to.

## What you see on screen

The runner has four main areas:

| Area | What's there |
|---|---|
| **Top** | Question N of M, mode badge (MCQ / Short / Long), test timer |
| **Centre** | Question text + answer options |
| **Bottom** | Previous / Next buttons + Mark-for-review toggle + Submit |
| **Side panel** | Question grid with status — answered, unanswered, marked-for-review |

On mobile, the side panel is a slide-out drawer accessed by tapping the question count.

## The question itself

For an **MCQ**: the question text on top, four options labelled A / B / C / D below. Clicking an option selects it (a soft brand-coloured highlight); clicking again deselects. Only one option can be selected at a time.

For a **Short** question: the question text, then a textarea for your answer. Word count below. Required minimum length is enforced (typically 5 words).

For a **Long** question: the question text, marking-scheme summary (visible only after submit), then a textarea for your structured answer. You can use rich-text formatting (paragraphs, lists) via the TipTap editor; see [Question types](/docs/concepts/question-types).

The question text appears in your **selected language** (English or Urdu). Toggle from the navbar at any time — the test re-renders without losing your answers.

## The timer

The timer counts **up** from the moment the first question loads, showing total elapsed time. It is **not a countdown**, and **nothing auto-submits**. The timer exists for awareness:

- Helps you self-pace ("I have spent 4 minutes on this MCQ — that is too long, mark and move on").
- On the result page, shows total time so you can compare your speed across tests.

Some chapters have **target times** (suggested time per question, set during seeding). When you exceed the target on a question, the timer's pill border shifts to amber. Still no auto-submit.

### Timer pause

The timer pauses when:

- The browser tab is backgrounded for more than 30 seconds (the test runner uses the Page Visibility API).
- The Android app is sent to the background.
- You explicitly tap the **Pause** icon in the timer pill (added 2026-04 onwards).

The timer resumes when you bring the test back into focus. This avoids inflated time when you are interrupted.

## Question navigation

Three ways to move:

1. **Next / Previous** at the bottom — linear traversal.
2. **Question grid** in the side panel — click any question number to jump.
3. **Keyboard shortcuts** (web only):
   - `→` or `n` — next question.
   - `←` or `p` — previous question.
   - `1`, `2`, `3`, `4` — pick option A, B, C, D.
   - `m` — toggle mark-for-review.
   - `Enter` on the last question — open the Submit confirmation.

The keyboard shortcuts speed you up materially on long tests. They are documented in a small "Keyboard shortcuts" tooltip on the side panel.

## Mark for review

Click the **flag icon** next to a question to mark it for review. The question gets a yellow indicator in the side panel grid. Marked questions:

- Are highlighted on the side panel for fast jumping.
- Appear in a "Marked for review" section on the submit confirmation, so you can confirm before submitting.
- Do **not** affect grading — marking is purely an organisational tool.

Use mark-for-review when you are unsure of an answer and want to revisit it after attempting the easier questions.

## Saving your progress

ImtehanHub saves your answer state on **every option click** and **every keystroke** in a Short / Long answer field. Specifically:

- **Answers** are written to the `testSessions/{sessionId}/answers/{questionId}` subcollection.
- **Marks-for-review** are written to `testSessions/{sessionId}.markedForReview` array.
- **Local cache** keeps a copy in `@capacitor/preferences` for offline resilience.

### Refresh recovery

Because your progress is saved on every answer, an **interrupted test is restored automatically** — you do not lose your work. If you refresh the page, close the tab, or the app force-quits mid-test, re-opening the same test brings you straight back to it, at your **first unanswered question**, with every answer and mark intact. No "start over", no lost session.

You can also re-open an in-progress test from `/app/history` or the Dashboard's "Continue test" card. Both routes restore the same saved state.

## Submitting

Click **Submit** when you are ready. ImtehanHub:

1. Shows a **submit confirmation** dialog listing how many questions are unanswered and how many are marked-for-review.
2. Asks "Submit anyway?" with two buttons: **Submit** (final) and **Keep working**.
3. On Submit: writes the test session as `submitted`, computes the score, updates your stats, and navigates to `/app/test/results/:sessionId`.

You can submit a test with unanswered questions — they are simply graded as incorrect. The intent is to make submission low-friction; the grading is honest.

## What if I close the tab without submitting?

The test session stays in `in-progress` status. It does not count toward your stats, does not affect your streak, and is not on the leaderboard. You can return to it any time via:

- The Dashboard's "Continue test" card.
- The History list (`/app/history`) with an "In progress" filter.

There is no time limit on resumption — a test you started in March can be resumed in October if you want.

## Offline behaviour

The web app needs a connection to start a test (it has to write the test session to Firestore). Once started:

- **Web:** if the connection drops, your answers continue to save to local cache. They sync the moment the connection returns. Submission also requires a connection.
- **Android:** the same, with longer offline windows because `@capacitor/preferences` is more durable than localStorage.

Long offline runs are tested and reliable; you can take a 30-minute test on a moving train and submit when you reach a station.

## Common questions

### Why does the timer pause sometimes?

The Page Visibility API tells us when you switch tabs or send the app to the background. We pause to avoid penalising honest interruptions (a phone call, a quick check on something). If you suspect tampering, the result page shows the **uninterrupted timer** and the **wall-clock total** so reviewers can see both.

### Can I change my answer after picking?

Yes — click a different option. Only your final selection counts.

### Can I take a test in two sittings?

Yes — close the tab, return later, resume. Your timer pauses while the test is not visible.

### Can my institute manager see my test in progress?

If you have an `instituteId` set, the manager can see the test exists and is in progress, but cannot see your specific answers until you submit.

## Next

- [Submit and read your result](/docs/tests/submit-and-result) — the result page after submission.
- [Configure a test](/docs/tests/configure) — set up your next test.
- [Bookmarks](/docs/tests/bookmarks) — star questions during the test for later review.
