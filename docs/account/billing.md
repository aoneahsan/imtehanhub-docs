---
id: billing
title: Billing — Free, Pro, Unlimited, and Add-on Class
sidebar_label: Billing
sidebar_position: 4
description: ImtehanHub has four plan tiers — Free (3 tests/day, 1 class), Pro (PKR 299/mo, unlimited tests, 1 class), Unlimited (PKR 599/mo, unlimited tests, all classes), and Add-on Class (PKR 99/mo to add one extra class to Free or Pro). Pakistani pricing, plain rules.
keywords:
  - ImtehanHub pricing
  - Pakistani exam app pricing
  - Free Pro Unlimited plans
  - PKR exam prep app
  - student subscription Pakistan
slug: /account/billing
---

# Billing

**ImtehanHub has four plan tiers**, all priced in Pakistani Rupees, all without hidden fees, all cancellable any time. The plans are designed around two questions: **how many tests do you want to take per day**, and **how many classes do you study at once**.

> **TL;DR** — Free: 3 tests/day, 1 class. Pro (PKR 299/mo): unlimited tests, 1 class. Unlimited (PKR 599/mo): unlimited tests, all classes. Add-on Class (PKR 99/mo): adds one extra class to Free or Pro.

## The four plans

| Plan | Monthly | Yearly | Tests | Classes | Community | Ads |
|---|---|---|---|---|---|---|
| **Free** | PKR 0 | — | 3 tests/day, 10/week, 30/month | 1 selected class | Read + vote + flag | Light banner |
| **Pro** | PKR 299 | PKR 2,499 | Unlimited | 1 selected class | Full (submit + comment + earn) | None |
| **Unlimited** | PKR 599 | — | Unlimited | All classes (5 → 2nd Year) | Full + early-access betas | None |
| **Add-on Class** | PKR 99 | — | Same as base plan | +1 class on top of Free or Pro | Same as base | Same as base |

A yearly Pro subscription saves roughly two months (PKR 2,499 vs PKR 3,588 over twelve months). Unlimited is monthly-only.

## What "1 class" means

A **class** in ImtehanHub is one of: Class 5, 6, 7, 8, 9, 10, 1st Year (FA/FSc), 2nd Year (FA/FSc). Free and Pro both let you pick **one** of these eight; the rest are locked.

When you change your selected class, you do not lose any prior history — your past tests remain visible under your old class label, you just cannot take new tests there until you switch back or buy Add-on Class.

Switching is rate-limited to **once per 14 days** on Free and Pro. Unlimited has no rate limit because all classes are unlocked anyway.

## The 3-test free trial

Every new account starts with a **3-test trial counter**. The counter is plan-agnostic — it works even before you pick a tier — and ticks down once per submitted test. After three submissions you must either pick a paid plan or wait for the next quota window if you stay on Free.

The trial counter is separate from the Free plan's daily quota. The intent is to let you sample the full experience (no quota cap, no ads suppression rules) for three tests before deciding.

See [Free trial](/docs/getting-started/free-trial) for the exact flow.

## Add-on Class — granular upgrades

Add-on Class is for the common case where a student is preparing for two classes simultaneously — e.g. a 10th-grader doing 10th board prep **and** a Pre-medical entry test. Pro is single-class; adding a second Pro is wasteful.

For PKR 99/month you add **one** extra class on top of Free or Pro. You can stack multiple Add-on Classes (e.g. Pro + 2 Add-on = 3 classes) up to a soft cap of 5 total. Beyond that, Unlimited at PKR 599/month is cheaper.

Add-on Class is monthly-only.

## What's the same across all plans

Every plan, including Free, includes:

- All 5,000+ official MCQs across seeded subjects.
- The full community module (read + vote + flag everywhere; submit + comment on Pro and Unlimited).
- Bookmarks, history, streaks, leaderboard.
- Theme customizer and language toggle.
- Mobile app on Android (and the Android version of the same app).
- Push notifications (opt-in).
- All future seeded content for your selected class.

## What's different on Free

Three deliberate trade-offs:

1. **Test quota** — 3 per day, 10 per week, 30 per month. Plenty for revision; not enough for cramming.
2. **Single class** — you pick one class and stick with it (or buy Add-on Class for a second).
3. **Light banner ads** — a small ad shows between test sets and on the home page. Never inside the question card, never on legal/privacy pages, never on the leaderboard. Ads are explicitly disabled for users under reasonable detection (we treat all student devices as conservative).

Free will always be free. We do not plan to remove the tier.

## Payment

We currently accept payments at **[aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=imtehanhub&project-identifier=com.aoneahsan.imtehanhub)** — a single payment landing page that supports international cards and major Pakistani payment methods (bank transfer, EasyPaisa, JazzCash).

The flow:

1. Click **Upgrade to Pro** (or Unlimited / Add-on) on `/app/billing`.
2. A new tab opens to the payment page with your plan pre-selected.
3. Pay using any supported method.
4. The payment confirmation triggers a plan flag on your `users/{uid}` document within minutes.
5. The app surfaces the new plan immediately on next page navigation (or a manual refresh).

We never store card details. The payment processor handles all PCI-sensitive data; we hold only a plan tier and an expiry timestamp.

## Cancelling

Plans renew monthly or yearly by default. To cancel:

1. Open `/app/billing`.
2. Click **Cancel renewal** under your active plan card.
3. Confirm. Your plan continues until the end of the paid period, then drops to Free.

We do not pro-rate refunds for mid-period cancellation, but we honour case-by-case refund requests within 7 days of payment — email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Pakistani price reasoning

Pricing was set with a Pakistani student parent in mind:

- PKR 299/month is roughly the cost of one **past-paper booklet** at a stationery shop.
- PKR 599/month covers two children studying different classes if the family shares one account (we explicitly allow per-family use, see FAQ).
- PKR 99 Add-on is the price of a small notebook.

We do not believe in PKR 49 "loss-leader" pricing — it cheapens the product perception and runs the company at a loss. PKR 299 is the floor we can sustain while shipping new content monthly.

## Common questions

### Can two students in one family share one Pro account?

Yes — within reason. We do not enforce single-device or single-IP. Two siblings sharing one Pro is fine; ten people on one account would trigger a manual review (we look at submission-rate anomalies, not raw access counts).

### What happens to my data if I downgrade?

Nothing. All your history, bookmarks, streaks, and community contributions are preserved. The plan flag only affects what new actions you can take.

### Is there a student discount?

The base price is already targeted at students. Institutes get bulk pricing — see [Institutes overview](/docs/institutes/overview).

### Are payment receipts available?

Yes — every successful payment generates an emailed PDF receipt and is also visible at `/app/billing` under "Payment history."

## Next

- [Referrals](/docs/account/referrals) — share your code, hit 3 invites, get auto-Pro.
- [Free trial](/docs/getting-started/free-trial) — what the 3-test counter does.
- [Institutes overview](/docs/institutes/overview) — multi-student bulk plans.
