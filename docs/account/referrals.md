---
id: referrals
title: Referrals — share your code, 3 invites = auto-Pro
sidebar_label: Referrals
sidebar_position: 5
description: Every account ships with a 6-character referral code. Three successful signups using your code = one automatic free month of Pro. No forms, no approval.
keywords:
  - ImtehanHub referral code
  - free Pro Pakistan exam app
  - student referral program
  - 3 invites free month
  - share code earn Pro
slug: /account/referrals
---

# Referrals

**Every ImtehanHub account ships with a 6-character referral code** at sign-up. Share that code with your classmates, your school friends, your cousins. When **three** people sign up using your code, you automatically get **one month of Pro** — no payment screen, no admin approval, no waiting.

> **TL;DR** — Get your code at `/app/profile`. Share the link. Three referrals = one free Pro month. The grant happens within minutes of the third signup.

## How the code is generated

Codes are 6-character **Crockford Base32** strings (`23456789ABCDEFGHJKLMNPQRSTUVWXYZ` — no `0`, `O`, `1`, `I`, `L` to avoid look-alikes). Generated server-side at sign-up. We collision-check against the global `referralCodes/` index and regenerate if needed.

A typical code looks like `9PK4HR` or `M3N72B`.

The code is permanent for the lifetime of your account — you cannot rotate it, and we never reuse codes from deleted accounts.

## How to share

Three surfaces:

1. **`/app/profile`** — your code appears under "Referrals" with a Copy button and a pre-built share link.
2. **Share link** — `https://imtehanhub.aoneahsan.com/?source=referral&ref=YOUR_CODE`. Friends who open this link land on the homepage with your code pre-filled in the sign-up form.
3. **`/app/referrals`** — a dedicated page with your code, a count of completed referrals, the in-flight count, and a list of past referral events (anonymised — only "Referral #1, joined 2026-04-12").

The recommended share is via WhatsApp / Telegram — most Pakistani students use one or both. A pre-formatted message is one tap away on the Profile page.

## How a friend signs up with your code

1. They open the share link, or open the regular homepage and click **Sign in with Google**.
2. The sign-up form has a "Referral code" field. The share link auto-fills it; manual sign-ups can paste it.
3. They complete Google sign-in.
4. The first time their account is created, the backend runs the referral pipeline (described below).

The pipeline:

- Looks up the code in `referralCodes/{code}` and resolves the referrer's UID.
- Runs **anti-abuse checks** (see below).
- If the checks pass, increments the referrer's `referralCount` and appends a row to `users/{referrerUid}/referralEvents/{newUid}`.
- If the increment crosses the milestone, grants the referrer one month of Pro.

Most of this happens in ~1 second. The referrer sees the count update on their next visit to `/app/referrals`.

## The milestone — 3 referrals = 1 month Pro

The current milestone is **3**. On the third successful referral, the referrer's account is automatically granted:

- `plan: 'pro'`
- `proExpiresAt: now() + 30 days`
- `proGrantedReason: 'referral_milestone_3'`

If the referrer was already Pro (paid), the 30 days **extend** their existing expiry — there is no penalty for being already paid.

If the referrer hits 6 referrals, they get a second month. 9 referrals, a third month. Each milestone is 3 referrals.

## Anti-abuse checks

Three checks run on every inbound referral, in order:

1. **Self-referral** — if the new user's email matches the referrer's email (case-insensitive, after Gmail dot-and-plus normalisation), the referral is rejected. Logged to `referralAuditLog` as `self_referral_blocked`.
2. **Same-device peer** — if the new user signs up from a device fingerprint already used to sign up a different account that referred this code, the referral is held for manual review.
3. **Mass-signup rate limit** — if a single referrer accumulates more than 10 referrals in 24 hours, further referrals queue for manual review rather than auto-counting.

Failed-check referrals do **not** count toward the milestone but also do not penalise the referrer. We do not punish good-faith oversharing.

## Reconciliation — what if my Pro grant is missing?

Edge cases happen — a flaky network during the third referral signup, a referral that was held for review and later cleared. The `referralService.reconcile()` function runs on every sign-in and:

- Counts your `referralEvents` rows.
- Compares against expected milestones.
- If you are owed a Pro grant that never landed, grants it (with `proGrantedReason: 'referral_milestone_3_reconciled'`).

You should never need to ask for a missing grant manually, but if you do — email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) and we will investigate.

## What counts as a referral

A referral counts when **all three** of the following are true:

1. The new user signs up with your code present in the form (auto-filled or pasted).
2. The new user completes Google sign-in and creates an ImtehanHub account.
3. The anti-abuse checks pass.

A referral does **not** count if:

- The friend already had an ImtehanHub account before using your link.
- The friend signs up but the code field is empty.
- The friend is you on a second Google account (self-referral).

## Referral events visible to you

Your `/app/referrals` page lists each event with:

- An incrementing number (#1, #2, ...).
- The date of signup.
- A masked email (`a***@gmail.com`) so you can recognise it but no one else can.
- Status (`counted` / `held for review` / `rejected`).

You do **not** see the friend's full email, display name, or any other PII. Same privacy bar as the leaderboard.

## What the friend gets

The friend does not get a discount or extra trial tests from using a referral code. The benefit is one-sided to the referrer.

We deliberately did not build a "both get something" structure because it tends to drive low-quality signups (people get a code from a stranger just to claim the friend-side perk). One-sided keeps incentives aligned: you share with people you actually know.

## Common questions

### Can I refer my younger sibling?

Yes, as long as they sign up on a different Google account. Same household is fine. The self-referral check is by email, not IP.

### What if a friend already has an account?

Their signup does not count. We do not award referrals retroactively. Encourage them to make a new account on a different Google address if they really want to help — but that crosses into self-referral territory if it is your sibling's address.

### Does the referral pipeline work on the mobile app?

Yes — the Android app reads the same `?ref=` query string. Share links work universally.

### Can my institute use the referral system?

Institutes have their own bulk pricing path; referrals are for individual students. See [Institutes overview](/docs/institutes/overview).

## Next

- [Billing](/docs/account/billing) — Pro / Unlimited / Add-on plan details.
- [Free trial](/docs/getting-started/free-trial) — the 3-test counter.
- [Profile](/docs/account/profile) — find your referral code on the Profile page.
