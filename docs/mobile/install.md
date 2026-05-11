---
id: install
title: Installing the Android app
sidebar_label: Install Android app
sidebar_position: 1
description: The Android app wraps the web app with native splash, push notifications, faster sign-in, and offline tests. Install from Google Play or sideload the APK.
keywords:
  - install ImtehanHub Android
  - Pakistani exam app Android
  - Capacitor Android Pakistan
  - sideload APK exam prep
  - Google Play exam app
slug: /mobile/install
image: /img/og-install.png
---

# Installing the Android app

**ImtehanHub on Android** is the same app you use on the web, packaged with Capacitor to give native splash, push notifications, slightly faster load, and offline reads. Most students will get more out of it on a phone than on a laptop — phones are simply where most studying happens.

> **TL;DR** — Google Play link for verified installs, or sideload the APK from the website if Play is not available in your region. Same login, same data, same plan tier — your account follows you across web and mobile.

## Option 1 — Google Play (recommended)

Open Play and search for **ImtehanHub** or use the direct link:

> [play.google.com/store/apps/details?id=com.aoneahsan.imtehanhub](https://play.google.com/store/apps/details?id=com.aoneahsan.imtehanhub)

Install. Sign in with the same Google account you use on the web. Your tests, bookmarks, history, leaderboard, achievements, and plan tier are already there — they live in your account, not on the device.

Why prefer Play:

- Automatic updates so you stay on the latest version.
- Google Play Protect scans the binary, which is a useful trust signal for parents.
- Permission prompts are clearer (Play surfaces them up-front in the listing).

## Option 2 — Sideload the APK

If Google Play is unavailable on your device (older phones, regional issues), download the APK directly:

> [imtehanhub.aoneahsan.com/app/download](https://imtehanhub.aoneahsan.com)

Open the APK on your phone. Android will warn that it is from an unknown source — that warning is for any non-Play install, not specific to us. Tap **Settings**, allow installations from your browser (or file manager), then return and tap Install.

Sideloaded installs do not auto-update. You must visit the download page periodically and reinstall when a new version is out. The app shows an in-app banner when an update is available.

If you need an older version (e.g. the new build conflicts with your device), email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) — older APKs are kept for 12 months.

## What the app gives you over the web

| Surface | Web | Android app |
|---|---|---|
| Sign in | Google sign-in via popup | Native Google sign-in via Capacitor plugin (faster, no popup blocker) |
| Splash screen | Browser tab → app render (~600 ms) | Native splash (~300 ms) |
| Push notifications | Browser permission required | First-class via OneSignal / Capacitor |
| Offline | Service-worker caching | Capacitor Preferences + offline cache (more storage) |
| Camera (CNIC upload) | File input | Native camera with proper aspect crop |
| Status bar | Browser chrome | Themed (emerald in light, dark grey in dark) |
| Back button | Browser back | Native back, routed to in-app navigation |
| Share | Web Share API (mobile browsers) | Native Android share sheet |
| App icon | None / PWA install banner | Real Android icon on the home screen |

If you have to pick one, install the Android app — every gap above closes in your favour.

## System requirements

| Requirement | Minimum |
|---|---|
| Android version | 7.0 (API 24) — released 2016, covers > 99% of active Pakistani devices |
| RAM | 2 GB recommended; 1 GB works for most surfaces but the test card may janky-scroll on long questions |
| Storage | 50 MB initial, up to 300 MB after cached chapter content |
| Network | Wi-Fi or 3G/4G/5G; the app degrades gracefully on patchy connections |

The app does **not** require Google Mobile Services for the core experience — sign-in does (it is Google sign-in), but tests, bookmarks, and history work on devices without GMS (e.g. some HMOS / Huawei devices) if you sideload.

## Sign-in on the app

The first launch shows the Google sign-in button. Tap, pick your Google account from the system picker, and you are in. No password — same as the web.

If you have multiple Google accounts on the device, the picker lets you choose. Make sure you pick the same one you signed up with — different Google accounts create different ImtehanHub accounts.

## Permissions the app requests

The app requests these permissions only when you actively use the corresponding feature:

| Permission | Triggered by | What it is used for |
|---|---|---|
| Internet | Always | Required for sync, never optional |
| Notifications | Opt-in on first run | Push notifications for daily reminders, achievements, community activity |
| Camera | Upload a CNIC photo or avatar | Capture image directly without leaving the app |
| Photos / Media | Upload a CNIC photo or avatar (alternative to camera) | Pick from gallery |
| Network state | Always | Detect online/offline transitions for offline-cache UX |

The app does **not** request: Location, Contacts, SMS, Phone, Calendar, Microphone, or any other sensitive permission. This is enforced in the manifest and verified pre-release. See the [Privacy overview](/docs/privacy/overview) for the full list.

## Updating the app

Play handles updates automatically. The first time you launch a new version, the app may briefly run a one-time migration (theme preferences, cached content) — usually invisible.

For sideloaded installs the in-app banner tells you when an update is out:

> **A new ImtehanHub version is available.** [What's new] [Update]

Tap Update and the latest APK download begins.

## Uninstalling

Standard Android uninstall:

1. Long-press the ImtehanHub icon.
2. Tap App info → Uninstall.

Uninstalling removes the app and its locally cached data (theme, offline content, queued community drafts). Your **account** is untouched — sign in on web or a fresh install and everything is back.

To delete your account permanently, use the in-app Delete account flow on `/app/profile` before uninstalling. See [Data deletion](/docs/account/data-deletion).

## iOS support

Not yet. The iOS build is feature-ready but Apple Developer Account approval is pending, and we have prioritised Android first because the Pakistani student market is 95%+ Android. iOS will ship — we will announce on the blog when it does.

In the meantime, iOS users have a high-quality web experience on Safari (PWA installable to home screen, push notifications via Safari 16.4+).

## Common questions

### Can I install on a tablet?

Yes. The app responsive-scales to tablets cleanly. Phone-style layout on portrait, two-column where it makes sense on landscape and tablets.

### Does it work without Google sign-in?

No — Google sign-in is the only auth path. We do not maintain email + password auth because the security and account-recovery burden is high and the Pakistani student market overwhelmingly uses Google accounts.

### What about Chromebooks?

The web app on Chromebook works perfectly. The Android-app-on-Chromebook path (Play Store on ChromeOS) is supported but we have not heavily tested it — please report any quirks.

### Battery use?

Background battery drain is minimal — the app is event-driven, not polling. Foreground use is comparable to any content-heavy app (test card rendering, syntax highlighting on code questions). Expect ~5% per hour of active use.

## Next

- [Offline mode](/docs/mobile/offline) — what works without internet.
- [Push notifications](/docs/discovery/notifications) — opt-in reminder system.
- [Sign in with Google](/docs/getting-started/sign-in) — auth details.
