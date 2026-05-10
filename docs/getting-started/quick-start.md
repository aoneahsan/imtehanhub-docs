---
id: quick-start
title: Quick Start — your first test in 3 minutes
sidebar_label: Quick Start
sidebar_position: 2
description: Take your first ImtehanHub test in three minutes — no sign-in needed for the first three attempts. The fastest way to see how the platform works.
keywords:
  - ImtehanHub quick start
  - free MCQ test Pakistan
  - first exam practice
  - try ImtehanHub
  - Pakistani exam prep tutorial
slug: /getting-started/quick-start
---

# Quick Start — your first test in 3 minutes

**Quick Start** is a three-minute walkthrough that takes you from opening the live app to seeing your first score. You do not need an account for this — the first **3 tests are free without sign-in**.

> **Goal:** see the entire test flow — pick subject → take test → read result — before deciding whether to sign in.

## Before you start

You need:

- A device with a browser (any modern browser on phone, tablet, or desktop) — or the [Android app](/docs/getting-started/welcome).
- A working internet connection (sign-in and submitting tests need a connection; the Android app caches past results for offline review).
- About 3 minutes.

You do **not** need: an account, a payment method, or any installation. The web app works directly from the URL.

## The 5-step path

### Step 1 — Open the app

Go to **[imtehanhub.aoneahsan.com](https://imtehanhub.aoneahsan.com)** in your browser. The home page loads in under two seconds on a typical broadband connection (1.2 MB initial JS bundle, served from Firebase Hosting's CDN).

You will see a hero with the tagline "امتحان کی تیاری، اب آسان! · Exam Prep, Made Easy!", a "Subjects" button in the navigation, and a count of MCQs available across all classes.

### Step 2 — Pick your class

Click **Subjects** in the top navigation. You land on the class grid:

- Class 5
- Class 6
- Class 7
- Class 8
- Class 9 (Matric)
- Class 10 (Matric)
- 1st Year (FA / FSc)
- 2nd Year (FA / FSc)

Pick the class that matches the textbook you are studying. If you are between two classes (for example, revising Class 9 material while in Class 10), pick the one whose textbook you are using right now.

### Step 3 — Pick a subject and chapter

Inside a class, you see the available subjects (English, Math, Physics, Chemistry, Biology, Computer Science, Urdu, Islamiat, Pakistan Studies, and others depending on the class). Click any subject — for example, **Physics** for Class 9.

You then see the chapter list for that subject. Each chapter card shows the chapter name (in English and Urdu), a short description, and the MCQ count. Pick **any chapter** to continue.

### Step 4 — Click "Start Test"

On the chapter page, click **Start Test**. ImtehanHub creates a new test session and drops you into the test runner with the first question on screen.

A typical first test contains **10 MCQs** drawn at random from that chapter. You will see:

- The question text (English by default — toggle to Urdu in account settings).
- 4 answer options (A, B, C, D).
- A timer (it does not auto-submit — it is for awareness only).
- A progress bar showing question N of N.
- A "Mark for review" toggle on each question.

Answer each question by clicking an option. Use **Next** and **Previous** to move between questions. When you are done with the last question, click **Submit**.

### Step 5 — Read your result

ImtehanHub takes you straight to the result page. You see:

- A **score ring** showing your percentage.
- A **per-topic breakdown** (which sub-topics within the chapter you got right or wrong).
- An **answer-by-answer review** below — click any question to expand the correct answer with a textbook reference (chapter and page number).
- A "Take another test" CTA.

That is the full flow. You have just used **1 of your 3 free trial tests**.

## What happens after 3 tests?

A trial counter is stored in your browser (via `@capacitor/preferences` or `localStorage` on web). On the **4th attempt**, ImtehanHub shows a Google sign-in modal. You can:

- **Sign in with Google** — your trial count resets and your history starts persisting across devices. Free-tier quota becomes 3 tests per day, 10 per week, 30 per month.
- **Or come back tomorrow** — the trial counter does not reset on its own; the modal will appear again on the next attempt.

See [The 3-test free trial](/docs/getting-started/free-trial) for the full mechanics, and [Sign in with Google](/docs/getting-started/sign-in) for what changes after sign-in.

## Common questions

### Why does my score drop suddenly on a hard chapter?

Each chapter has its own difficulty distribution. Check the per-topic breakdown — if you got most questions wrong on one specific topic, that is the topic to revise in your textbook. The page reference under each correct answer points you to the right page.

### Can I retake the same chapter test?

Yes. ImtehanHub draws a fresh random set of MCQs from the chapter on every attempt — you will rarely see the same question twice in a row.

### What if my chapter has no questions yet?

A small number of subjects are still being seeded (currently **59 of 60** exam subjects have questions; only Class 5 Computer Science is missing because no free online source exists). The chapter page will tell you if no questions are available, and you can request the content via the [book request](/docs/getting-started/welcome) flow.

### What about Short and Long questions?

MCQs are the default. Short and Long question modes exist as well; see [Question types](/docs/concepts/question-types) for the difference and when to use each.

## Next

- [Sign in with Google](/docs/getting-started/sign-in) — to keep your history across devices.
- [Pick your class](/docs/getting-started/pick-class) — guidance if you are between two classes.
- [Pick your board](/docs/getting-started/pick-board) — Punjab, Federal, Sindh, KPK, Balochistan, AJK.
