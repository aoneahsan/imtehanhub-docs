---
id: review-mode
title: Review mode — re-open a past test, optionally with AI explanation
sidebar_label: Review mode
sidebar_position: 6
description: Open any past test from your history to re-read the questions, see the correct answers with textbook references, and optionally get an AI explanation if you provided your own API key.
keywords:
  - test review mode
  - re-open past test
  - AI answer explanation BYOK
  - exam review history
slug: /tests/review-mode
---

# Review mode

**Review mode** is the read-only view of any test you have ever submitted on ImtehanHub. It re-renders the result page exactly as it was, plus the option to ask an AI for an explanation on any single question — using your own API key (BYOK) if you have configured one.

> **TL;DR** — Open `/app/history`, click any test, click any question. You see your answer, the correct answer, the textbook reference, and (if BYOK enabled) a "Get AI explanation" button.

## What review mode shows

The page at `/app/history/:sessionId` is the result page from the time you submitted the test, frozen and re-rendered:

- **Score ring** — your final score on this test.
- **Per-topic breakdown** — sorted weakest topic first.
- **Answer-by-answer view** — every question with your answer, the correct answer, the textbook page reference.
- **Time taken** — total elapsed time.
- **Configuration** — class, subject, chapter, mode, source ratio, topic filter (if any).

The page is stable: the question text, the correct answer, and the textbook reference are stored on the test session document, so they never change even if the underlying question is edited later.

## Why review mode matters

Three uses:

1. **Pre-exam revision.** Open every test you have taken on a chapter, scan the wrong answers, focus on the topics that show up repeatedly.
2. **Self-grading Long answers.** For Long questions, you self-grade with the marking scheme. Review mode lets you redo the self-grade later if you realise you marked yourself too generously.
3. **Verifying questionable answers.** If you suspect a question was wrong, review mode shows you the source data so you can flag it confidently.

## Requesting an AI explanation (BYOK)

ImtehanHub supports **Bring Your Own Key (BYOK)** for AI explanations. You provide your own OpenAI or Anthropic Claude API key in `/app/profile` (or in `/admin/ai-settings` for admins). The key is stored encrypted on your user document.

In review mode, every question has a **Get AI explanation** button (visible only if BYOK is configured):

1. Click the button.
2. ImtehanHub builds a prompt with the question, your answer, the correct answer, and the chapter context.
3. The prompt is sent to your provider via your key.
4. The response is rendered below the question — typically a 200-400 word explanation of why the correct answer is correct, with reasoning steps.
5. The cost (usually fractions of a cent) is logged to your BYOK cost tracker.

The AI does **not** see your name, email, or any account-level data. It sees the question text, the answer key, and the chapter name — that is it.

## Why BYOK?

ImtehanHub does **not** ship with a default AI provider key for two reasons:

1. **Zero-cost free-tier policy.** Routing every AI request through our key would create a cost on every BYOK-disabled student. We do not want to pass that cost on (turning Pro into a paid tier solely to cover AI is anti-student).
2. **Privacy and pace.** With BYOK, you control the rate limit, the model choice (GPT-4o vs Claude Sonnet vs cheaper alternatives), and the cost. We never see your prompts.

If you do not have a BYOK key, the **Get AI explanation** button is hidden. Everything else in review mode works without an API key.

## Re-grading Long answers

For Long questions, the answer-by-answer view shows:

- **The marking scheme** — broken into mark-bearing components.
- **Your written answer** — exactly as you submitted.
- **Your self-grade** — the score you assigned at submit time.
- A **slider to adjust the self-grade** if you realise it was off.

Adjusting the self-grade **does not** update your stats retroactively (we do not recompute past stats — see [Streaks and stats](/docs/concepts/streaks-and-stats)). But the adjusted self-grade is saved on the test session and visible on every future review.

## Reporting a wrong question from review mode

If you re-read a question and become convinced the answer key is wrong:

1. Click **Report this question** under the answer.
2. Pick a reason: **Wrong answer**, **Question is unclear**, **Page reference is off**, **Other**.
3. Optionally add a comment.

Your report goes into the admin's question-report queue (`/admin/question-reports`). An admin reviews and either dismisses, corrects, or removes the question. You will see the resolution in your own report list.

If your report leads to a change, you earn the **Reviewer** community-track achievement (see [Achievements](/docs/concepts/achievements)) — even if you are not yet a verified community member.

## Bookmarking from review mode

Every question in review mode has a bookmark button. Saving from review is useful for revision lists — bookmark all the questions you got wrong in the last 5 tests, then later browse `/app/bookmarks` and drill them. See [Bookmarks](/docs/tests/bookmarks).

## Common questions

### Can I retake a test from review mode?

Yes — there is a "Retake this chapter" CTA at the bottom that pre-fills the configure form with the same class / subject / chapter / mode.

### Is the AI explanation persisted?

The AI response is shown live in the page but **not saved** to your test session by default (to keep Firestore writes minimal). If you want to keep an explanation, copy it. A "Save explanation" toggle is on the roadmap.

### Does review mode work offline?

Yes for past tests — they are cached locally on the Android app. AI explanations require a connection (the AI request is live).

### What if my BYOK provider is rate-limited?

The "Get AI explanation" button shows an error toast with the provider's message. Wait a minute or switch providers in `/app/profile`.

## Next

- [Submit and read your result](/docs/tests/submit-and-result) — the page review mode mirrors.
- [Bookmarks](/docs/tests/bookmarks) — save individual questions across tests.
- [Test history list](/docs/tests/history) — find a past test to review.
