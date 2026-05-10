---
id: free-trial
title: The 3-test free trial — how it works
sidebar_label: Free trial
sidebar_position: 4
description: ImtehanHub gives every visitor 3 free tests before asking for sign-in. Here is exactly what counts, what resets, and what unlocks once you sign in.
keywords:
  - ImtehanHub free trial
  - free MCQ practice
  - try before sign in
  - Pakistani study app trial
slug: /getting-started/free-trial
---

# The 3-test free trial

**The free trial** lets every visitor take **3 full tests on ImtehanHub before being asked to sign in**. It exists because we believe you should be able to evaluate the product before creating an account, not after.

> **TL;DR** — Open the app, take 3 tests, see your results. On the 4th attempt the sign-in modal appears. Sign-in is free, takes one tap with Google, and resets your trial count to zero.

## What counts as one trial test?

A test counts toward your trial as soon as the **first question is answered**. Specifically:

| Action | Counts? |
|---|---|
| Browsing the chapter list | No |
| Clicking "Start Test" | No |
| Loading the test runner | No |
| Answering the first question | **Yes — counts as 1** |
| Submitting the test | Already counted |
| Closing the tab without submitting | Already counted (the test exists, it just has no result) |

This means you cannot accidentally use up your trial just by clicking around — only an actual answer attempt is counted.

## Where the counter lives

The trial counter is stored locally in your browser via `@capacitor/preferences` (which transparently uses `localStorage` on the web and native key-value storage on the Android app). The key is roughly `imtehanhub:trialTestsUsed`.

Practical implications:

- **Per-browser, per-device.** Three tests in Chrome on your phone, three more in Firefox on your laptop — they are independent because the counter is local.
- **Clearing browser data resets it.** Clearing site data for `imtehanhub.aoneahsan.com` resets the count to zero. We mention this for accuracy, not as a workaround — if you want unlimited free practice, signing in is faster and cleaner.
- **Incognito / private browsing starts fresh** every session.

## When the sign-in prompt appears

On the **4th test attempt**, ImtehanHub shows a `LoginPrompt` modal before the test starts. The modal:

- Explains why sign-in matters (history, streaks, bookmarks, leaderboard).
- Has **one** button: "Sign in with Google".
- Has a "Not now" link that takes you back to the chapter list.

If you click "Not now", the test does not start and your trial counter does not increase further. Come back later or on a different device.

## What sign-in unlocks

Signing in:

1. **Resets the trial counter to zero.** You are now on the regular free-tier quota.
2. **Switches the quota model.** Free tier = **3 tests/day, 10/week, 30/month**. The day/week/month windows are rolling — they reset at midnight Pakistan Standard Time (Asia/Karachi).
3. **Persists your history** across devices and sessions. Same Google account on phone + laptop = same history.
4. **Enables streaks** — taking a test on consecutive days builds a daily streak.
5. **Enables bookmarks** — star any question and find it later under `/app/bookmarks`.
6. **Enables the leaderboard entry** (privacy-safe — your display name + score, not your email).
7. **Enables community submissions** (after CNIC verification — see the [Community module](/docs/credits)).
8. **Enables push notifications** if you opt in (OneSignal — for streak reminders and new content alerts).

See [Trial counter, quotas, plan tiers](/docs/concepts/quotas-and-plans) for the full quota table and what Pro / Unlimited unlock.

## Plan tiers (preview)

| Tier | Price | Tests / day | Streak unlock | Add-on classes |
|---|---|---|---|---|
| **Free** | PKR 0 | 3 | Yes | Buy individually |
| **Add-on Class** | PKR 99/mo | 3 (free) + unlimited for 1 extra class | Yes | 1 included |
| **Pro** | PKR 299/mo or PKR 2,499/yr | Unlimited | Yes | All included |
| **Unlimited** | PKR 599/mo | Unlimited + everything | Yes | All included |

**Auto-upgrade to Pro at 3 successful referrals.** Share your referral code (visible on the [Profile page](/docs/getting-started/welcome)). When 3 friends sign up through your code and take at least one test, you are automatically promoted to Pro for one month.

## Why only 3 free trials?

Three tests is enough to:

- See the full **subject → chapter → test → result** flow.
- Get a **score ring** and a **per-topic breakdown** at least once.
- Try the **language toggle** (Urdu / English) on the result page.
- Decide whether to sign in.

Less than 3 (1 or 2) doesn't give you enough surface area to evaluate. More than 3 (5, 10) means we never get the signal to invest in your account-bound experience. Three is the floor that respects your time without giving away unlimited free practice forever.

## Common questions

### I used my 3 trials yesterday. Can I get more without signing in?

Not on the same device. Sign-in is the documented and supported path — it is one tap, free, and unlocks materially more.

### Does the trial counter reset over time?

No. The counter only resets on **sign-in** or when you **clear browser data**. There is no time-based reset.

### Will my 3 trial tests show up in my history after I sign in?

Trial test results are stored in your browser local storage but not synced to Firestore. After sign-in, your history starts fresh — past trial scores are not pulled in. Most students don't notice; the post-sign-in flow is so fast they take a few new tests within minutes.

### What if the modal blocks me before I can finish a test I started?

The trial counter increments **before** the test loads, so an in-progress test is not interrupted. You will only see the modal on the next "Start Test" click after you have hit the limit.

## Next

- [Sign in with Google](/docs/getting-started/sign-in) — what happens at sign-in.
- [Trial counter, quotas, plan tiers](/docs/concepts/quotas-and-plans) — the full quota table.
- [Quick Start](/docs/getting-started/quick-start) — if you have not taken your first test yet.
