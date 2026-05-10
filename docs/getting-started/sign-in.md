---
id: sign-in
title: Sign in with Google — web and Android
sidebar_label: Sign in
sidebar_position: 3
description: ImtehanHub uses Google sign-in only — no passwords. Sign in to keep your test history, bookmarks, streaks, and leaderboard entry across devices.
keywords:
  - ImtehanHub sign in
  - Google sign in exam app
  - Pakistani study app account
  - Capacitor Google auth
  - Firebase auth Google
slug: /getting-started/sign-in
---

# Sign in with Google

**Sign-in** on ImtehanHub uses **Google OAuth only** — there is no email-and-password flow, no SMS one-time-code, and no third-party identity provider. The choice is deliberate: most Pakistani students already have a Google account through a Gmail address or an Android phone, so a single tap is faster and safer than reinventing password management.

> **TL;DR** — Click "Sign in" → choose a Google account → done. The first time, ImtehanHub creates a user document for you with `role: 'user'` and `planType: 'free'`. From then on, sign-in is one tap.

## Why Google-only?

Three engineering reasons drove this decision:

1. **No password storage.** ImtehanHub never stores or sees your password — Google handles authentication and returns a verified ID token. Even if our database were compromised, no password could leak.
2. **Same identity on web and Android.** Sign in once on the web; switch to the Android app; you are already signed in. Same Firebase user document, same history, same bookmarks.
3. **Faster sign-up = better conversion.** The 3-test free trial converts ~3× better when sign-up is one tap instead of an email-verify loop.

## How sign-in works on the web

On the web, ImtehanHub uses Firebase Authentication's `signInWithPopup` flow:

1. Click **Sign in with Google** in the navbar (or after using your 3 free trial tests, the modal appears automatically).
2. A Google account picker pops up. Choose the account you want to use.
3. Google verifies your identity and returns an ID token to ImtehanHub.
4. Firebase Auth validates the token and creates (or restores) your session.
5. ImtehanHub looks up your user document in Firestore. If you are new, a new document is created with `role: 'user'`, `planType: 'free'`, and your `displayName` + `photoURL` populated from your Google profile.
6. You land on the **Dashboard** (`/app/dashboard`).

Total time: about 4 seconds on a typical connection.

### What if the popup is blocked?

Some browsers block popups when triggered without a direct user gesture. ImtehanHub avoids this by only triggering sign-in on a click event. If you still see a "popup blocked" notice, click the address-bar popup icon and allow popups for `imtehanhub.aoneahsan.com`.

## How sign-in works on the Android app

On the Android app, ImtehanHub uses the native `@codetrix-studio/capacitor-google-auth` plugin instead of the web popup:

1. Tap **Sign in with Google** in the app.
2. Android shows the system Google account picker (the same one you see when adding an account in Settings).
3. The plugin returns a Google ID token to the app.
4. The app exchanges the token with Firebase via `signInWithCredential`.
5. The same Firestore user document is restored or created.

Why a different mechanism? Native Android sign-in:

- Does not need a browser popup (which is awkward on mobile).
- Uses the system account picker, which is already trusted and familiar.
- Works in low-bandwidth conditions because it uses Google Play Services.

## What gets created on first sign-in

A user document at `users/{uid}` in Firestore, shaped like this:

```ts
{
  id: 'firebase-uid',
  uid: 'firebase-uid',
  email: 'student@gmail.com',
  displayName: 'Your Name',
  photoURL: 'https://...',     // from Google profile
  role: 'user',                 // or 'institute_manager' / 'admin' if pre-assigned
  stats: { tests: 0, accuracy: 0, currentStreak: 0, bestStreak: 0, ... },
  themePreferences: null,
  planType: 'free',
  classIds: [],
  trialTestsUsed: 0,            // resets on sign-in
  instituteId: null,
  googleDriveConnected: false,
  preferredBoardId: null,
  createdAt: '2026-05-10T...',
  lastLoginAt: '2026-05-10T...',
}
```

You never see this document directly — it powers the dashboard, history, and stats.

## Admin promotion (special case)

If your email is in the `appConfig/global.adminEmails` list (managed in Firestore by the bootstrap admin), your role is automatically upgraded to `admin` on sign-in. The bootstrap admin is `aoneahsan@gmail.com` — you can reach Ahsan if you need an admin or institute-manager role for a legitimate reason.

## Signing out

In the navbar, open the user menu and click **Sign out**. ImtehanHub clears the Firebase session and your local theme + auth state. Your trial counter resets to zero (so you can try the trial flow again from a fresh slate if you want — but your history, stats, and bookmarks are still attached to your account if you sign back in).

## Connecting Google Drive (optional)

Sign-in does **not** automatically grant ImtehanHub access to your Google Drive. Drive access is a separate, optional permission requested only when you choose to upload an avatar or contribute resource images via the [community module](/docs/getting-started/welcome). Files go to your own Drive at `ImtehanHub/` — they never live on our servers.

## Common questions

### Can I have multiple ImtehanHub accounts?

Yes — each Google account creates a separate ImtehanHub account. Most students use one account; institute managers may use a separate work account.

### What if my Google account is part of a school G Suite / Workspace?

Workspace accounts work the same way as personal Gmail accounts. Some institutes restrict OAuth consent for third-party apps; if so, ask your institute admin to allow `imtehanhub.aoneahsan.com` in the Google Workspace Admin console.

### How do I delete my account?

Use the **self-service [data deletion](/docs/getting-started/welcome)** flow at `/data-deletion`. It deletes your user document, test sessions, bookmarks, leaderboard entry, and institute roster link. Your Google Drive files (if any) stay with you — they are yours, ImtehanHub never touched them.

### What about privacy?

See the live [Privacy Policy](https://imtehanhub.aoneahsan.com/privacy) for the full statement.

## Next

- [The 3-test free trial](/docs/getting-started/free-trial) — what counts, what resets.
- [Quick Start](/docs/getting-started/quick-start) — first test in 3 minutes.
- [Credits](/docs/credits) — the people behind ImtehanHub.
