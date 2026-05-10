---
id: bookmarks
title: Bookmarks — star any question, browse your collection
sidebar_label: Bookmarks
sidebar_position: 7
description: Star any question on ImtehanHub during a test, on the result page, or in review mode. Your bookmarks live at /app/bookmarks and follow you across devices.
keywords:
  - exam app bookmarks
  - star MCQ
  - save question for later
  - revision list
slug: /tests/bookmarks
---

# Bookmarks — star any question

**Bookmarks** let you star any question on ImtehanHub and find it later under `/app/bookmarks`. Use them to build your own revision list — the questions you got wrong, the ones you want to teach a younger sibling, the ones you suspect might appear on the exam.

> **TL;DR** — Click the star icon on any question (during a test, on the result page, or in review mode). Browse all your bookmarks at `/app/bookmarks`. Bookmarks survive across devices when you sign in.

## Where the star button appears

| Surface | Bookmark button visible? |
|---|---|
| During a test (test runner) | Yes — top right of each question |
| On the result page | Yes — beside each question in the answer-by-answer view |
| In review mode (history) | Yes — same as result page |
| On the chapter detail page | No (chapter-level bookmarking is not supported) |

The button is a star icon. Filled = bookmarked, hollow = not bookmarked. Clicking toggles.

## Where bookmarks live

Bookmarks are stored in Firestore at `bookmarks/{bookmarkId}`:

```ts
{
  id: 'auto',
  userId: 'firebase-uid',
  questionId: 'q9-physics-kin-12',
  chapterId: 'c9-physics-kinematics',
  subjectId: 'c9-physics',
  classId: 'c9',
  createdAt: '2026-05-10T...',
  note: '',                    // optional note (added 2026-04-onwards)
}
```

Firestore security rules: only the owner (`userId == request.auth.uid`) can read or write their bookmarks. There is no shared / public bookmark collection.

## Browsing bookmarks

Open `/app/bookmarks`. You see a list of every question you have bookmarked, grouped by:

- **Class → Subject → Chapter** (the navigation hierarchy from [Content hierarchy](/docs/concepts/content-hierarchy)).

Filter controls:

- **Class** — show bookmarks only from a specific class.
- **Subject** — narrow further.
- **Mode** — MCQ / Short / Long.
- **Date** — last week / last month / all time.

Each bookmark card shows:

- The question text (truncated to ~150 chars).
- The chapter and class.
- A "Take a test on this chapter" link.
- A "Remove bookmark" button.

Clicking the question opens it in **read-only review mode** — same UI as a single question from a past test, but standalone (not tied to a test session).

## Building a revision list

A common workflow:

1. Take a test on a chapter you are weak in.
2. On the result page, star every question you got wrong.
3. Repeat across 3-5 chapters.
4. Open `/app/bookmarks` the day before your exam.
5. Browse top-down, re-read each question, verify the answer in your textbook.

For the deep practice variant: take a test, star the wrong answers, review one week later, then **take a fresh test on the same chapter** to confirm you have learned them.

## Adding a note to a bookmark

Click any bookmark to open its detail view. Add a personal note (e.g. "Confused on whether velocity or speed", "Check page 47 again before exam"). Notes are private to you.

## Bookmark and the test source picker

Bookmarks track the **specific question** — not the source. A community-submitted question you bookmarked stays bookmarked even if it gets promoted to official later. The bookmark still resolves to the correct question text.

## Common questions

### How many bookmarks can I have?

No hard limit. Practical limit is your Firestore free-tier write budget (50K writes per day across all your usage), which only matters if you bookmark thousands at once.

### Can I share a bookmark?

Not directly — bookmarks are private. If you want to share a question with a classmate, take a screenshot or send the chapter link.

### Can I bookmark from the leaderboard?

No — the leaderboard does not show questions, only player rankings. Bookmark only works on actual question views.

### What happens if a bookmarked question is removed?

If a question is removed (e.g. moderator removed a duplicate), your bookmark resolves to a "This question has been removed" placeholder with the chapter context. You can delete the bookmark or keep it as a reminder.

### Are bookmarks bilingual?

The bookmark itself is language-neutral — it points to a question. The question text shows up in your current UI language (English or Urdu) when you view the bookmark.

## Next

- [Submit and read your result](/docs/tests/submit-and-result) — where most bookmarks get added.
- [Review mode](/docs/tests/review-mode) — open a past test and bookmark from there.
- [Content hierarchy](/docs/concepts/content-hierarchy) — the structure bookmarks group by.
