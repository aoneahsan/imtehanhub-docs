---
id: quotas-and-plans
title: Trial counter, quotas, plan tiers
sidebar_label: Quotas & plans
sidebar_position: 4
description: Free, Pro, Unlimited, and Add-on Class — the four ImtehanHub plan tiers. Quotas, prices, what unlocks, and how the auto-Pro referral upgrade works.
keywords:
  - ImtehanHub pricing
  - free Pakistani study app
  - Pro plan PKR 299
  - Unlimited PKR 599
  - referral auto Pro upgrade
  - quota daily weekly monthly
slug: /concepts/quotas-and-plans
---

# Trial counter, quotas, plan tiers

**Quotas and plans** describe how much you can practise on ImtehanHub for free and what each paid tier unlocks. The product is **free for the vast majority of students** — paid tiers exist for power users who want unlimited daily practice or for students who only need extra capacity for a single class.

> **TL;DR** — Free tier covers daily/weekly/monthly practice for most students. Pro is PKR 299/mo (or PKR 2,499/yr). **3 successful referrals automatically upgrade you to Pro for one month** — no payment needed.

## The four tiers

| Tier | Price | Tests / day | Tests / week | Tests / month | Add-on classes |
|---|---|---|---|---|---|
| **Free** | PKR 0 | 3 | 10 | 30 | Buy individually |
| **Add-on Class** | PKR 99 / month | 3 (free) + unlimited for 1 extra class | same | same | 1 included |
| **Pro** | PKR 299 / month or PKR 2,499 / year | Unlimited | Unlimited | Unlimited | All included |
| **Unlimited** | PKR 599 / month | Unlimited + everything | Unlimited | Unlimited | All included |

Prices are in **Pakistani Rupees** and are accurate as of the last update of this document. Always check the live [Pricing page](https://imtehanhub.aoneahsan.com/pricing) for current pricing.

## The 3-test free trial (pre-sign-in)

Before you sign in, you get **3 free tests**. The counter is per-browser (stored in `@capacitor/preferences` / `localStorage`). On the 4th attempt, ImtehanHub asks you to sign in. See [The 3-test free trial](/docs/getting-started/free-trial) for the full mechanics.

After sign-in, the trial counter resets and the **regular free-tier quota** takes over.

## What each tier unlocks

### Free

- **3 tests per day, 10 per week, 30 per month** across all chapters and subjects.
- Full access to MCQ + Short + Long modes (where seeded).
- Bookmarks, leaderboard entry, streaks, achievements.
- Push notifications.
- Community module participation (after CNIC verification).
- Bilingual UI (Urdu + English).
- Web + Android.

### Add-on Class

- **Everything in Free**, plus:
- **Unlimited daily tests for one specific class** (you pick which class on activation).
- All other classes still at free-tier quota.

Useful when you are revising heavily for one class (typically Matric Class 10 board exam, or 2nd Year FA / FSc board exam) but do not need unlimited practice across all classes.

### Pro

- **Everything in Free**, plus:
- **Unlimited daily tests across all classes**.
- Priority access to new content as it is seeded.
- Faster AI review responses (when BYOK is enabled).
- Ad-free experience.

Pricing: **PKR 299 / month** or **PKR 2,499 / year** (saves about 30% compared to monthly).

### Unlimited

- **Everything in Pro**, plus:
- Earlier access to the latest features.
- Higher per-day limits on community submissions, votes, comments.
- Premium support channel.

Pricing: **PKR 599 / month**.

For most students, **Pro is the right paid tier**. Unlimited is for power users who also actively contribute to the community module and want raised quotas there.

## Auto-Pro upgrade via referrals

ImtehanHub has a built-in referral system:

1. On your Profile page, you see a personal **referral code** (a short string).
2. Share the code with friends.
3. When **3 friends sign up using your code AND each take at least one test**, you are **automatically upgraded to Pro for 1 month** — no payment required.
4. The upgrade is applied to your account immediately; you receive an in-app notification.

This was added in the 2026-05-05 release. The mechanic exists because:

- Word-of-mouth from a current student is more credible than ads.
- Referrers who take the time to share earn an upgrade.
- New students get a vetted recommendation instead of a random ad.

Successful referrals are tracked transparently in your account.

## Rate limits and how they reset

| Window | Reset time |
|---|---|
| **Daily** | Midnight Pakistan Standard Time (Asia/Karachi, UTC+5) |
| **Weekly** | Midnight Sunday → Monday PKT |
| **Monthly** | Midnight on the 1st of each month PKT |

The reset is **rolling within the window**, not "since you signed up". So a student who signs up on the 28th of a month gets the full monthly allowance immediately.

## Sign-up attribution (for our analytics, not your account)

Since the 2026-05-05 release, every sign-up is **attributed** with a `?source=` query parameter and any `utm_*` parameters from the URL you arrived through. The attribution is stored on your user document and used for product analytics — it does not affect your quotas, ads, or anything visible to you.

If you arrive via a referral link, both the **referrer's referral code** and the **source attribution** are captured. They are independent.

## Ads on the free tier

Free-tier users see ads via:

- **AdMob** on the Android app (interstitial after results, native ad in history list).
- **AdSense** on the web (banner on home, subject, dashboard pages).

Pro and Unlimited tiers are ad-free. Ad consent is requested on first visit through the `AdConsentDialog` component (matching Pakistan's data-protection conventions and Play Store consent requirements).

## How to upgrade

1. Open `/app/billing` in the app.
2. Pick your tier (Add-on Class, Pro, Pro Yearly, or Unlimited).
3. Pay via [aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=imtehanhub&project-identifier=com.aoneahsan.imtehanhub) (the support / payment URL).
4. Once payment is confirmed, your tier flips immediately and ad layouts disappear.

If a payment is delayed or the page is unresponsive, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) directly — we resolve manually.

## Common questions

### What happens if I hit my daily quota?

Free-tier users see a "Daily limit reached" screen. You can still browse content, see your past tests, and use bookmarks — only **starting a new test** is blocked until tomorrow.

### Can I downgrade from Pro to Free?

Yes — cancel from the Billing page. You stay on Pro until the end of the current billing period, then revert to Free. Your history, bookmarks, and stats are unaffected.

### Are the prices the same in USD?

Prices are PKR. International payment requires conversion through your card or Stripe / aoneahsan.com payment page.

### Does the auto-Pro referral upgrade stack?

The 1-month Pro upgrade is granted per "set of 3 successful referrals". The next 3 successful referrals after that earn another month. Refer 12 friends in a year → 4 months free Pro.

## Next

- [The 3-test free trial](/docs/getting-started/free-trial) — pre-sign-in mechanics.
- [Sign in with Google](/docs/getting-started/sign-in) — what unlocks at sign-in.
- [Streaks and stats](/docs/concepts/streaks-and-stats) — what gets tracked once you sign in.
