---
id: profile
title: Profile — avatar, display name, board, opt-outs
sidebar_label: Profile
sidebar_position: 1
description: Your ImtehanHub profile at /app/profile lets you set your display name, upload an avatar to your own Google Drive, pick your default board, and toggle leaderboard visibility — all stored under your account.
keywords:
  - ImtehanHub profile
  - student profile Pakistan
  - Google Drive avatar
  - default board preference
  - leaderboard opt out
slug: /account/profile
---

# Profile

**Your profile** is the single page that controls everything ImtehanHub displays about you in the app: the name you appear under, the avatar that sits next to it, the board your tests default to, and a small set of privacy switches. It lives at `/app/profile`.

> **TL;DR** — Pick a display name, upload an avatar (stored in your own Google Drive, never on our servers), set a default board, and toggle leaderboard visibility. Email and role come from Google sign-in and are not editable.

## What the page shows

The profile page is a single card with four sections:

1. **Identity** — your Google profile photo, display name, email, and role badge.
2. **Avatar** — an upload control that puts your image in your own Google Drive.
3. **Preferences** — default board, theme link, and language link.
4. **Privacy** — leaderboard opt-out, account-deletion link.

Email and role are read-only. Everything else is editable in place; changes save on blur.

## Display name

Your **display name** is what appears on the leaderboard, on community submissions you author, and on the chat-like comment threads under community posts.

| Rule | Value |
|---|---|
| Allowed characters | letters (Latin or Urdu), digits, spaces, hyphens, underscores, dots |
| Length | 3 to 30 characters |
| Profanity | filtered against a small denylist (English + Urdu) |
| Uniqueness | not enforced — collisions are fine because the leaderboard also shows a rank number |

By default your name is taken from your Google profile. You can override it any time. The change propagates to the leaderboard on your next test submission and to community submissions on your next vote/post.

## Avatar — your Google Drive, not ours

ImtehanHub never stores user images. Avatars live in **your own Google Drive** at `ImtehanHub/Avatars/`, and we hold only the public file URL on your user document.

The flow:

1. Click **Upload avatar**.
2. Pick an image (JPEG / PNG / WebP, ≤ 5 MB, square preferred).
3. ImtehanHub asks for the `drive.file` OAuth scope — limited to files **ImtehanHub itself created**, not your other Drive files.
4. The image uploads to `ImtehanHub/Avatars/avatar-{timestamp}.jpg` in your Drive and is set to public-link visibility so the app can render it.
5. The public URL is written to `users/{uid}.photoURL`.

You can delete the file from your Drive any time. The app falls back to your Google profile photo, then to a generated initials badge.

The technical wiring (OAuth scope, file lifecycle, fallback chain) is documented in the Developer section landing in Batch 6.

## Default board

Pakistan has 19 examination boards across five provinces, the federal capital, AJK, and Gilgit-Baltistan. Your **default board** controls which board ImtehanHub pre-selects when you start a new test.

Supported boards include the major BISE boards (Lahore, Federal, Karachi, Peshawar, Quetta, AJK), the FBISE federal board, and Aga Khan / Punjab examination commission variants. The full list is on the [Pick your board](/docs/getting-started/pick-board) page.

Changing your default board does **not** retroactively change past test results — it only affects new tests until you change it again.

## Leaderboard opt-out

A switch labelled **Hide me from the leaderboard** removes your `leaderboard/{uid}` entry on toggle-on. Your tests still update your private stats and feed your achievements; only the public ranking is suppressed.

When you toggle back on, the next test you submit re-creates your leaderboard entry. There is no penalty or cooldown for opting in and out.

See [Leaderboard](/docs/discovery/leaderboard) for what the page actually shows.

## Email and role

Both come from Google sign-in:

- **Email** is the address you signed in with. It is not editable in the app. To change emails you must sign in with the new Google account (which creates a new ImtehanHub account — your history does not transfer).
- **Role** is one of `user`, `institute_manager`, or `admin`. The badge is visible on your profile only. Other surfaces (leaderboard, community posts) never display role to anyone else.

If you need to merge two accounts you accidentally created, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) — manual merges are possible within reason.

## Activity summary

Below the editable card the page shows a read-only summary:

- Total tests submitted.
- Average accuracy.
- Current streak (daily and weekly).
- Bookmarked questions count.
- Community submissions count.
- Joined date.

This is the same data that powers your [stats](/docs/concepts/streaks-and-stats), surfaced for convenience.

## What the profile does **not** store

- Your CNIC number, image, or any community-verification PII — those live in `verifications/{uid}` and only after you opt in. See [CNIC verification](/docs/community/cnic-verification).
- Your billing details. Stripe / payment tokens never touch our database; we only hold a plan tier flag. See [Billing](/docs/account/billing).
- Your password — ImtehanHub uses Google sign-in only, so no password exists.

## Common questions

### What if my Google photo updates?

ImtehanHub re-fetches your Google photo on every sign-in. If your custom avatar is set, it takes priority over the Google photo.

### Can I use an emoji-only display name?

No — at least 3 alphanumeric or letter-script characters are required. Pure emoji or pure punctuation names are rejected.

### Why is there no birthday field?

We do not collect age data. Pakistan does not yet require it and we honour data minimisation. Under-18 users use the app exactly the same way as adults, except for community contribution which is not yet age-gated either (B-Form support is roadmapped).

### Can my institute manager change my display name?

No — institute managers can invite, remove, and view roster, but they cannot modify any student's profile content. See [Institutes overview](/docs/institutes/overview).

## Next

- [Theme customizer](/docs/account/theme) — light/dark/accent/radius/scaling.
- [Language toggle](/docs/account/language) — switch EN ↔ UR with full RTL.
- [Billing](/docs/account/billing) — what each plan tier unlocks.
