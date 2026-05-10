---
id: welcome
title: Welcome to ImtehanHub
sidebar_label: Welcome
sidebar_position: 1
description: Pakistani exam preparation in Urdu + English, free for students. Take your first test in under 3 minutes — no sign-in required for the first 3 attempts.
keywords:
  - ImtehanHub
  - Pakistani exam preparation
  - bilingual exam app
  - free MCQ practice
  - FA FSc exam prep
  - Class 5 to 12 study app
slug: /getting-started/welcome
---

# Welcome to ImtehanHub

**ImtehanHub** is a free, bilingual (Urdu + English) exam-preparation platform for Pakistani students from **Class 5 through 2nd Year (FA / FSc)**. Every MCQ, short question, and long question is keyed to the actual textbook chapter and page number — not a random internet source.

> **TL;DR** — Open [imtehanhub.aoneahsan.com](https://imtehanhub.aoneahsan.com), pick your class and a subject, and take a test. The first **3 tests are free without sign-in**. After that, sign in with Google to keep your history.

This documentation covers everything: how to take a test, how the bilingual UI works, how the community submission system works, what the Pro plan unlocks, what the Android app does differently, and how the SEO / data pipeline is built (in the **Developers** section).

## What ImtehanHub is

A study product designed around three opinionated decisions:

1. **Textbook-accurate.** Pakistani board curricula change between Punjab, Federal, Sindh, KPK, Balochistan and AJK. Every question references which chapter and which page in the official textbook the answer comes from. You can verify any answer against your own book.
2. **Bilingual from day one.** Every class, subject, chapter, and question carries an `urduName` field. Toggle the language and the entire interface flips to RTL — including the keyboard for Urdu input.
3. **Free for students.** No paywall friction. The free tier covers **3 tests/day, 10/week, 30/month**. Pro and Unlimited unlock more, and **3 successful referrals automatically upgrade you to Pro** — so the most-engaged free users earn their upgrade.

## What it is not

ImtehanHub is intentionally not:

- **Not a live-tutoring platform** — no video calls, no booking marketplace.
- **Not a homework-answer cheat tool** — every answer references the textbook so students must learn, not copy.
- **Not a social network** — there is no follow graph, no DMs.

If you came expecting any of those, this isn't the product for you.

## Take your first test in 3 minutes

You can do this without any account.

1. Go to **[imtehanhub.aoneahsan.com](https://imtehanhub.aoneahsan.com)**.
2. Click **Subjects** in the top navigation.
3. Pick your class — Class 5 through 2nd Year (FA / FSc).
4. Pick a subject (English, Math, Physics, Chemistry, Biology, Computer Science, Urdu, Islamiat, Pakistan Studies, etc.).
5. Pick a chapter, then click **Start Test**.
6. Answer the MCQs at your own pace. The timer is for awareness only — nothing auto-submits unless you choose to.
7. Submit and read your **Score Ring** + **per-topic breakdown**.

That's it. You've used one of your 3 free trial tests. You can take 2 more before ImtehanHub asks you to sign in.

## When you sign in (Google)

ImtehanHub uses **Google sign-in only** — there is no email/password flow.

- On the web: Firebase `signInWithPopup`.
- On Android: the native `@codetrix-studio/capacitor-google-auth` plugin, then a credential exchange with Firebase.

When you sign in for the first time:

- A user document is created automatically with `role: 'user'` and `planType: 'free'`.
- Your stats start tracking (total tests, accuracy, streak).
- You unlock features that need persistence: **bookmarks**, **leaderboard entry**, **history**, **achievements**, **community submissions**.

## What's next

Pick the section that matches what you want to do:

| If you want to… | Read |
|---|---|
| Take your first test and understand the result page | **Tests & Practice** |
| Switch the interface to Urdu | **Account & Settings → Language** |
| Submit your own MCQs to the platform | **Community Module → Contributing** |
| Manage students from a school/institute | **For Institutes** |
| Install the Android app and use it offline | **Mobile App** |
| Understand how your data is handled | **Privacy & Compliance** |
| Read the architecture or contribute corrections | **Developers** section (lands in Batch 6) — see [Credits](/docs/credits) for author and contact |

## Frequently asked

### Is ImtehanHub really free?

Yes. The free tier covers daily/weekly/monthly practice (3 / 10 / 30 tests). Pro and Unlimited unlock more, but they're optional — most students stay on free.

### Which boards are supported?

Punjab, Federal, Sindh, KPK, Balochistan, and AJK. Set your preferred board on the **Profile** page so the question phrasing matches your board's style.

### Does the app work offline?

The Android app caches your test history and bookmarks locally so you can review without an internet connection. Submitting new tests still needs a connection.

### Where do the questions come from?

A pipeline scrapes free, publicly-available Pakistani textbook content (e.g. ilmkidunya.com, gotest.pk), validates it, attaches textbook page references, and seeds it into Firestore. As of the latest content snapshot, that's **16,121+ MCQs across 59 of 60 exam subjects**. The community module lets verified students contribute additional questions — those go through a vote + flag + moderator queue before being promoted to the official set.

### Who built this?

ImtehanHub is designed and shipped by **[Ahsan Mahmood](https://aoneahsan.com)**. See the [Credits](/docs/credits) page for full attribution and links.
