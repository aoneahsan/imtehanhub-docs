---
id: notifications
title: Push notifications — OneSignal-powered, opt-in
sidebar_label: Notifications
sidebar_position: 8
description: ImtehanHub uses OneSignal for free push notifications — streak reminders, new content alerts, blog post drops. Opt-in, granular, never marketing-y.
keywords:
  - push notifications ImtehanHub
  - OneSignal Pakistan
  - streak reminder
  - new content notification
  - opt in push
slug: /discovery/notifications
---

# Push notifications

**Push notifications** on ImtehanHub are **off by default**. When you opt in, OneSignal delivers free push notifications to your browser (web) or your device (Android app) for events that matter — streak reminders, new content seeded for a chapter you study, new blog posts, and community mentions.

> **TL;DR** — Turn on notifications from `/app/profile`. Pick which categories you want. ImtehanHub never sends marketing or promotional pushes.

## Why OneSignal

ImtehanHub uses **OneSignal's free tier** for push because:

- Free for unlimited subscribers (up to OneSignal's per-day delivery cap).
- Works on both web push and Android (FCM under the hood).
- No backend infrastructure required (we never run a server).
- GDPR / privacy-respecting — opt-in only, easy unsubscribe.

The choice is consistent with the broader **zero-cost policy** — no paid third-party services, no Firebase Cloud Messaging direct (which would need server infrastructure), no cloud functions.

## Notification categories

Six categories you can independently toggle:

| Category | When it fires | Default |
|---|---|---|
| **Streak reminder** | 8 PM PKT if you have not yet taken a test today and your streak is at risk | Off |
| **Streak milestone** | Your daily streak hits 7 / 30 / 100 days | Off |
| **New content** | A chapter you have practised gets newly-seeded questions | Off |
| **Blog post** | A new blog post is published | Off |
| **Knowledge base** | A new or refreshed knowledge-base entry is published in a subject you study | Off |
| **Community mention** | Someone comments on or replies to your community submission | Off |

All categories are off by default. Opt in only to what you actually want.

## How to opt in

1. Sign in.
2. Open `/app/profile`.
3. Scroll to the **Notifications** section.
4. Toggle each category individually.
5. On the first toggle, your browser (or Android app) prompts for notification permission. Allow.
6. The settings save automatically.

If you previously denied permission, you may need to clear it from your browser / device settings before re-opting.

## What ImtehanHub never sends

To preserve trust and not become spam, ImtehanHub never sends:

- **Marketing pushes** ("Upgrade to Pro!").
- **Manipulative urgency** ("Only 2 hours left!").
- **Daily check-in pushes** beyond your opted-in streak reminder.
- **Pushes about content you have not engaged with** (e.g. blog posts in subjects you have never opened).

The category list is the full list. We do not have an "Other" bucket that quietly drops in promo content.

## Web push vs Android push

| | Web | Android |
|---|---|---|
| Underlying tech | Web Push API + OneSignal SDK | FCM (Firebase Cloud Messaging) + OneSignal SDK |
| Permission prompt | Browser-native | Android system + OneSignal prompt |
| Works when site closed? | Yes (browser push service is OS-managed) | Yes |
| Battery cost | Negligible | Negligible — uses Android's batched push channel |

Both surfaces deliver the same notifications.

## Quiet hours

Notifications are automatically muted between **10 PM and 7 AM Pakistan Standard Time**. Streak reminders that would fire late are suppressed; streak-milestone notifications are queued and delivered at 7 AM.

Quiet hours are not configurable — the rule is uniform.

## Unsubscribing

Three ways:

1. **Toggle off in `/app/profile`.** The cleanest path.
2. **Browser-level revoke.** Browser settings → Site permissions → Notifications → Block.
3. **OneSignal-level unsubscribe** via the unsubscribe link in any received push.

Unsubscribing deletes your OneSignal subscription record. Re-subscribing later creates a fresh record (you do not see backlog).

## Common questions

### Does ImtehanHub know I have notifications enabled?

Yes — the OneSignal subscription ID is stored in your user document. We use it only to send notifications you have opted into.

### Why was I not asked at sign-in?

Asking at sign-in is a known anti-pattern (high reject rate when out of context). Notifications are off by default and you opt in deliberately on the Profile page.

### Can I opt in to only the streak reminder?

Yes — categories are independent. Toggle just "Streak reminder" and leave the others off.

### Are notifications bilingual?

The notification text is generated in your account's language preference. Switch to Urdu in the app and future notifications arrive in Urdu.

### Can I customise the streak reminder time?

The 8 PM time is fixed for now. Customisation is on the roadmap.

### Will I get a notification when my submission is voted on?

Only when someone **comments** on it (the Community mention category). Plain votes (up / down) do not push — that volume would be too high.

## Next

- [Streaks](/docs/tests/streaks) — the practical streak guide.
- [Comments on submissions](/docs/community/comments) — the source of community-mention pushes.
- [Account & Settings — profile](/docs/getting-started/welcome) — where the toggle lives (full Account section in Batch 5).
