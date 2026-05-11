---
id: share
title: Sharing pages and questions
sidebar_label: Share
sidebar_position: 10
description: Share any ImtehanHub page directly from your browser. Test results have a built-in share card. Referral codes are baked into shared URLs so 3 successful referrals auto-upgrade you to Pro.
keywords:
  - share ImtehanHub
  - referral link
  - share test result
  - WhatsApp study app
  - exam result share Pakistan
slug: /discovery/share
---

# Sharing pages and questions

**Sharing on ImtehanHub** uses standard web URLs — every public page is shareable just by copying the address bar. Specific surfaces (test results, referral codes, blog posts) have a more polished share button that pre-fills the share text and includes your referral code. Three friends sign up through your link AND each take a test → you auto-upgrade to Pro.

> **TL;DR** — Click the **Share** button where you see it. Your referral code is auto-appended to the URL. Three successful referrals = one month of Pro for free.

## What is shareable

Any **public** URL on ImtehanHub:

- Home (`/`)
- Subjects browse (`/subjects/...`)
- Chapter detail (`/subjects/c9/physics/kinematics`)
- Blog posts (`/blog/:slug`)
- Knowledge-base entries (`/learn/:id/:slug`)
- About / Pricing / Contact

What is **not** shareable as a public URL:

- App pages requiring sign-in (`/app/...`).
- Admin pages.
- Specific test sessions (those carry your auth context).

## The share button

On surfaces with a polished share UX (test results, blog posts, knowledge-base entries, chapter pages), a **Share** button opens the native share sheet (Web Share API on mobile and recent desktop browsers; falls back to a copy-to-clipboard dialog).

The pre-filled share content includes:

- The page title.
- A short description.
- The URL with your referral code appended (`?ref=XXXX`).

Example shared link from a Class 9 Physics chapter:

> Class 9 Physics — Kinematics MCQs and Practice — ImtehanHub
> Practice MCQs, short, and long questions for Kinematics, all referenced to your textbook. Free for Pakistani students.
> https://imtehanhub.aoneahsan.com/subjects/c9/physics/kinematics?ref=ABC123

## Referral codes

Every signed-in user has a referral code visible on their Profile page (`/app/profile`). Format: 4-8 alphanumeric characters, case-insensitive, unique per account.

The code:

- Auto-appends to URLs you share via the Share button.
- Can be appended manually to any URL: `https://imtehanhub.aoneahsan.com/?ref=ABC123`.
- Is captured on the recipient's first visit (stored in `localStorage` as `imtehanhub:referredBy=ABC123`).
- Is recorded on their user document on sign-up.

When **3 friends sign up using your code AND each take at least one test**, you are auto-upgraded to **Pro for 1 month**. The mechanic is described in detail under [Quotas and plans](/docs/concepts/quotas-and-plans).

## Sharing a test result

After you submit a test, the result page shows a **Share result** button. Click to share:

- Your score.
- The chapter and class.
- A "Try this chapter yourself" link with your referral code appended.

The share text is intentionally not braggy — students react better to "I scored 80% on Class 9 Kinematics — try the same chapter" than to "I'm the best!" content.

## Sharing on WhatsApp

WhatsApp is the primary share channel for Pakistani students. The Web Share API on Android opens WhatsApp natively. On desktop, the fallback dialog has a "Share via WhatsApp" option that opens `web.whatsapp.com` with the share text pre-filled.

Share-text length is kept under WhatsApp's preview-friendly limit (~150 chars before the URL).

## Sharing on social media

The share sheet exposes Twitter / Facebook / LinkedIn options on supported platforms. Open Graph tags ensure the shared link previews with the correct title, description, and image (a chapter-specific OG card on chapter pages, a generic ImtehanHub card on others).

## Sharing a community submission

The community submission detail page (`/community/submission/:id`) has its own Share button. The shared link includes the submission ID — the recipient (if signed in and verified) sees the submission directly.

## Print

Some students prefer to print rather than share digitally. Most surfaces support browser-native print:

- Knowledge-base entries print cleanly with hidden navigation.
- Chapter detail prints the topic list and counts (useful for offline study).
- Test results print the score ring + per-topic breakdown + answer-by-answer review.

A dedicated "print this chapter's MCQs as A4 PDF" feature is on the roadmap.

## Common questions

### What if I do not want to use my referral code?

Strip the `?ref=` parameter manually from the URL before sharing. The recipient will not be tagged as your referral.

### Can I have multiple referral codes?

One per account. If you want to track different sources, append your own UTM parameters: `?ref=ABC123&utm_source=whatsapp&utm_campaign=class9-revision`.

### Does ImtehanHub track who I shared with?

Only when the recipient signs up using your code. We do not see who you shared with otherwise — the share itself happens through your browser's share sheet, which is OS-mediated.

### Can I disable the referral code on my shares?

Yes — toggle "Append referral code to shared links" off on `/app/profile`. Default is on.

### Do referral codes work on shared community submissions?

Yes — the same code is appended.

## Next

- [Quotas and plans](/docs/concepts/quotas-and-plans) — the auto-Pro at 3 referrals mechanic.
- [Search](/docs/discovery/search) — find what you want to share.
- [Blog](/docs/discovery/blog) — popular sharing target.
