---
id: offline
title: Offline mode — what works without internet
sidebar_label: Offline mode
sidebar_position: 2
description: ImtehanHub Android caches your most-used chapters locally so you can take tests, read chapter content, and review bookmarks without internet. Submissions queue and sync when you reconnect. Designed for Pakistani 3G/4G dropouts and load-shedding scenarios.
keywords:
  - ImtehanHub offline mode
  - exam app offline Pakistan
  - offline tests Android
  - load shedding study
  - sync when online
slug: /mobile/offline
---

# Offline mode

**ImtehanHub is offline-first** on Android. Tests work without internet, chapter content reads from a local cache, bookmarks load instantly, and any actions you take while offline queue up and sync the moment a connection comes back. We built this assuming a typical Pakistani student's reality: load-shedding, patchy 3G, school Wi-Fi that drops at 3 pm.

> **TL;DR** — Cached chapters are read-anywhere. New tests in cached chapters work offline. Submissions queue and replay on reconnect. Bookmarks always work. Community submissions need internet (CNIC verification, voting, comments). Achievements compute locally and sync.

## What works offline

| Surface | Offline? | Notes |
|---|---|---|
| Reading cached chapter content | ✅ Yes | Each chapter you open is cached for 7 days |
| Taking a test in a cached chapter | ✅ Yes | Question pool, choices, timer, navigation all offline |
| Reviewing past test results | ✅ Yes | Results live in your local cache once submitted |
| Bookmarks list and bookmark detail | ✅ Yes | Bookmarks sync down on each online session |
| Theme customizer + language toggle | ✅ Yes | Stored locally in Capacitor Preferences |
| Profile (view only, edits queue) | ⚠️ View only | Edits queue and apply on reconnect |
| Streaks, stats display | ✅ Yes | Computed locally; the leaderboard reflects after sync |
| Daily-reminder push notifications | ✅ Local fallback | If no server push for the day, local notification fires |
| Reading blog posts | ✅ Yes (if visited before) | Last 10 read posts stay cached |
| Reading knowledge base entries | ✅ Yes (if visited before) | Last 20 viewed entries stay cached |

## What does **not** work offline

| Surface | Why |
|---|---|
| Sign in | Google OAuth requires internet |
| Discovering new content (subjects you have not opened) | The taxonomy is not pre-bundled — too large |
| Leaderboard live rankings | Needs server query |
| Community submissions (submit / vote / flag / comment) | Trust gating + denylist checks require online |
| CNIC verification flow | Drive upload + admin review require online |
| Billing actions (upgrade, cancel) | Payment redirect requires online |
| Push notifications from the server | Need the FCM channel |
| Online updates of cached chapters | The cache is read-only until you reconnect |

## How the cache fills

Three sources prime the local cache:

1. **Opportunistic** — every time you open a chapter while online, the chapter's question pool, content, and metadata is written to local storage and tagged with the current date. Next time you open the same chapter offline, it loads instantly from the cache.
2. **Pre-fetch on test start** — when you tap **Start test** for a chapter while online, the full question pool for that test is fetched in one go (not lazy-loaded per question) so the test never needs internet mid-way. This is the most common offline path.
3. **Explicit "Save for offline"** — a small download icon on each chapter card lets you pin a chapter to the cache, refreshing it on the next online session and skipping the 7-day expiry. Useful before a long trip or an exam day.

The cache lives in Capacitor Preferences (small key-value pairs) plus an IndexedDB cache for larger blobs (chapter content, question pools). Total cache size is bounded at 200 MB; oldest unaccessed entries are evicted as you approach the cap.

## How submissions queue

When you submit a test offline, the app:

1. Computes your score locally using the cached correct-answer keys.
2. Shows the result screen immediately (you do not need to wait for sync to see your score).
3. Writes the full submission payload to a local queue at `offlineQueue/tests/{id}`.
4. Displays a small **Pending sync** badge in the header.

When the network comes back:

1. The queue processor wakes up (online event listener + a periodic 60-second tick when foregrounded).
2. Each queued submission is sent to Firestore in batch.
3. On success the queue row is deleted and the badge clears.
4. On conflict (e.g. duplicate test id from a previous attempt) the row is kept with `status: conflict` and a manual retry prompt appears.

We have not seen genuine conflicts in production — the duplicate-id check is defensive. Most retries are clean.

## How bookmarks behave offline

Bookmarks are dual-store:

- A primary copy at `bookmarks/{uid}_{questionId}` in Firestore (the source of truth).
- A mirror in Capacitor Preferences as a Set of question IDs.

When you tap the star icon offline:

1. The local mirror updates immediately — the heart fills in, the bookmark appears in your local list.
2. A toggle event is queued.
3. On reconnect, all queued toggles replay against Firestore.

If you toggle the same bookmark on and off offline before reconnecting, only the final state syncs.

## How streaks behave offline

Your daily-test streak is computed from your test history. Locally, the app re-computes streak using submitted-tests timestamps including any queued submissions. If you take a test offline at 11 pm and it syncs at 6 am the next day, your streak is honoured for the date you actually took the test (the timestamp in the queue), not the date it synced.

The leaderboard only knows about synced submissions, so your rank may briefly lag your local streak number by a few minutes.

## Network detection

The app uses `@capacitor/network` to listen for online/offline transitions. A small banner appears at the top of the screen when you go offline:

> **You are offline.** Cached tests, bookmarks, and reading work. New actions will sync when you reconnect.

When you come back online:

> **You are online again.** Syncing [N] queued actions...

The banner auto-dismisses after a successful sync. If the sync hits a problem the banner stays with a Retry button.

## What happens if I clear the app data?

Clearing the app data through Android settings wipes:

- The local cache (chapter content, question pools).
- Capacitor Preferences (theme, language, bookmark mirror, queued submissions).

It does **not** wipe your account — your tests, bookmarks, history, plan tier all live in Firestore under your UID. After clearing and signing back in:

- Your bookmarks, history, plan tier are fetched fresh from Firestore.
- Cached chapters and queued submissions are gone.
- Any unsynced offline submissions are lost (so do not clear app data with pending sync — wait for the badge to clear).

## Storage size

Three rough numbers from production:

- App binary: ~25 MB.
- Capacitor Preferences (theme, language, mirrors, queues): typically < 1 MB.
- IndexedDB cache (chapter content, question pools): 5-200 MB depending on how much you have read offline.

Total practical maximum: ~250 MB after months of heavy use. The app surfaces a "Clear offline cache" button in Profile if you need to reclaim space; this only clears IndexedDB, not your account data.

## Common questions

### Will every chapter eventually be in my offline cache?

Only chapters you open. We deliberately do not pre-cache the whole curriculum — for a 9th-grader prepping all 8 subjects with ~20 chapters each, that is 160 chapter pools (several hundred MB). Opportunistic caching keeps the wallet light.

### What if I want to commit to one chapter for an exam day?

Use the **Save for offline** button. That pins the chapter — it refreshes on every online session and skips eviction. Pin the 4-5 chapters you are revising, and you are set for a load-shedding evening.

### Does offline work on the web?

Partial. The web service worker caches static assets and the last visited page, so a quick reload during a brief disconnect works. The full offline cache (chapter content, question pools, queued submissions) is Android-only because it relies on Capacitor Preferences + IndexedDB.

### Can I take a test in a chapter I have never opened?

Not offline. You must open the chapter once while online so its question pool can prime the cache.

## Next

- [Install the Android app](/docs/mobile/install) — Play / sideload guide.
- [Push notifications](/docs/discovery/notifications) — daily reminders even offline.
- [Bookmarks](/docs/tests/bookmarks) — what gets cached offline.
