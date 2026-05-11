---
id: overview
title: Privacy overview — what we store and where
sidebar_label: Privacy overview
sidebar_position: 1
description: Plain-language inventory of every piece of data ImtehanHub stores — what, where, who reads it, and how long it stays. Built around data minimisation.
keywords:
  - ImtehanHub privacy policy
  - student data Pakistan
  - data minimisation app
  - Firestore privacy student
  - exam app privacy
slug: /privacy/overview
---

# Privacy overview

**ImtehanHub stores only the data it needs to function.** No analytics IDs sold to third parties, no behavioural fingerprinting for ad targeting, no PII collected speculatively for future features. Everything we hold is listed below, in plain language, with the where, who-can-read, and how-long for each entry.

> **TL;DR** — Your Google email + UID, your tests, bookmarks, history, plan tier, theme, and preferences. CNIC verification adds a hash + last-4 + a file ID in your Drive (opt-in). Avatars live in your Drive, not ours. Everything is in Firestore under your UID; only you and admins can read it.

## The full inventory

Every field we store, grouped by collection:

### `users/{uid}` — your core account document

| Field | Description | Source | Visibility |
|---|---|---|---|
| `email` | Your Google email | Google sign-in | Read by you + admins |
| `displayName` | Your name (Google or custom override) | Sign-in or Profile edit | Read by everyone (leaderboard, community) |
| `photoURL` | Public URL to your avatar (Google photo or your Drive avatar) | Sign-in or upload | Read by everyone |
| `role` | `user` / `institute_manager` / `admin` | Default `user`, role flips via admin | Read by you + admins |
| `selectedClass` | Class 5 / 6 / 7 / 8 / 9 / 10 / 1st Year / 2nd Year | Your choice | Read by you + admins |
| `selectedBoard` | One of 19 Pakistani exam boards | Your choice | Read by you + admins |
| `plan` | `free` / `pro` / `unlimited` | Billing pipeline | Read by you + admins |
| `proExpiresAt` | When your Pro ends (if applicable) | Billing pipeline | Read by you + admins |
| `stats` | Aggregate counts: total tests, average accuracy, best chapter, weakest chapter, current streak | Recomputed on each submission | Read by you + admins |
| `preferences` | Theme settings, language, leaderboard opt-out, notification opt-ins | Your edits | Read by you + admins |
| `instituteId` | The institute you accepted into (if any) | Invitation acceptance | Read by you + your institute manager + admins |
| `referralCount` | Number of successful inbound referrals | Referral pipeline | Read by you + admins |
| `proGrantedReason` | `paid` / `referral_milestone_3` / etc. | Billing or referral pipeline | Read by you + admins |
| `createdAt` / `updatedAt` | Timestamps | Auto | Read by you + admins |

### `users/{uid}/tests/{testId}` — your tests

Every submitted test as a subcollection: question IDs, your answers, score, duration, mode, class/subject/chapter context, submission timestamp.

Visibility: **you only**. Not visible to institute managers (only aggregates are). Not visible to admins by default (we have admin tooling but it is audit-logged).

### `users/{uid}/bookmarks/{questionId}` — bookmarked questions

Just a reference (question ID + bookmark timestamp). Visibility: you only.

### `verifications/{uid}` — CNIC verification (opt-in, only if you joined community)

| Field | Description |
|---|---|
| `cnicHash` | SHA256 of your CNIC number (no PII derivable) |
| `cnicLast4` | Last 4 digits of your CNIC |
| `driveFileId` | Google Drive file ID where your CNIC image lives in **your own** Drive |
| `status` | `pending` / `approved` / `rejected` |
| `submittedAt` / `reviewedAt` | Timestamps |

See [CNIC handling](/docs/privacy/cnic) for the full discussion.

Visibility: you + admins reviewing. Once approved, only the hash and last-4 are needed; the Drive file ID exists but admins do not re-open approved files.

### `leaderboard/{uid}` — public ranking entry

Display name + score + last update timestamp. Visibility: any signed-in user.

You can [opt out](/docs/discovery/leaderboard) any time.

### `bookmarks/{uid_questionId}` — cross-index for bookmarks

Just the foreign keys (UID + question ID) for efficient querying. Visibility: you only.

### `instituteInvitations/{id}` — pending invitations

Your email + the inviting institute. Visibility: you + institute manager.

### `referralEvents/{id}` (under `users/{referrerUid}`)

A row per successful inbound referral. Holds the new user's UID (used only for de-duplication) and the timestamp. Visibility: referrer + admins (masked display).

### `accountDeletions/{uid}` — audit row after deletion

UID + deletion timestamp + optional free-text reason + `wasBanned` / `wasInstituteManager` flags. No PII (UID at this point points to nothing). Retained for 12 months for fraud / abuse investigation, then purged.

### What we do **not** store

Listed explicitly because absence is hard to verify:

- No CNIC number, image, name, address, date of birth, parent name, school name, B-Form details.
- No browsing fingerprint (no IP-based behavioural ID, no device fingerprint hash).
- No third-party analytics IDs (no GA cookie chains, no Facebook pixel — we use first-party Microsoft Clarity + Amplitude + Firebase Analytics with privacy-respecting defaults).
- No password (Google sign-in only).
- No phone number unless you optionally provided it for institute manager applications.
- No payment card data — handled entirely by the payment processor.

## Who can read what

The three roles:

| Role | Can read |
|---|---|
| **User (you)** | Your own `users/{uid}` doc and all its subcollections (tests, bookmarks). Public docs (leaderboard, questions, blog). |
| **Institute manager** | Their `institutes/{id}` doc. Aggregate fields on `users/{uid}` for students in their roster (display name, joined date, stats — **not** test detail). |
| **Admin** | Everything for support and moderation purposes, but every admin read is audit-logged. |

Firestore security rules enforce all of the above at the database layer — not just on the client. See the [data model docs](/docs/concepts/content-hierarchy). A full security-rules reference ships with the Developer section in Batch 6.

## How long we keep things

| Data | Retention |
|---|---|
| Active account data | While the account exists |
| Deleted account data | Removed within 60 seconds of you triggering deletion; full purge across collections |
| `accountDeletions/{uid}` audit row | 12 months, then purged |
| `referralAuditLog` | 12 months, then anonymised |
| Community submissions (when contributor deletes account) | Indefinite, re-attributed to "Anonymous (former contributor)" |
| `cnicDenylist` hashes (only for banned users) | Indefinite — ban is permanent |
| Server logs (Firebase / hosting) | 30 days, IP-truncated, no user-correlation |

## Third-party processors

We use these external services, each with a specific purpose:

| Service | Purpose | Data shared |
|---|---|---|
| **Google Firebase (Firestore, Auth, Hosting)** | Database, sign-in, hosting | All collections listed above |
| **OneSignal** | Push notifications | A push token + your opt-in topics (no email or PII) |
| **Microsoft Clarity** | Anonymised UX analytics (heat-maps, session replays with PII masked) | Page paths + clicks + scrolls, **no** form inputs and **no** account identifiers |
| **Amplitude** | Product analytics | Event names + your masked UID, no email or PII |
| **Sentry** | Error tracking | Error stacks + minimal context; PII scrubbed |
| **Google Drive (yours)** | Avatar + CNIC image storage | Files live in your Drive, we hold only the file ID |

We do **not** use: Facebook Pixel, TikTok Pixel, LinkedIn Insight Tag, any third-party ad-targeting cookie.

## Pakistani context

Pakistan does not yet have a comprehensive personal-data protection law equivalent to GDPR or California's CCPA. The draft Personal Data Protection Bill has been circulating in parliament for several years. We do not wait for it — we apply the same baseline regardless:

- Right to access (data export from `/app/profile`).
- Right to deletion (self-service from `/app/profile`).
- Right to correction (Profile edits, real-time).
- Right to know (this page).
- Right to object to processing (opt-outs for leaderboard, notifications, community).

If you want a data subject access request in writing, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Children's data

ImtehanHub is for students from Class 5 upward — so primarily 10-18 year olds. We do not knowingly collect any data we would not collect from an adult, and the data we do collect (display name, school choice, board, test history) is the minimum required for the product to work.

For under-13 users, parental consent is implicit in the Google account creation (Google's Family Link covers that consent). We do not require additional school-level consent at present.

## Common questions

### Can my school force me to hand over my history?

We will never share your test history with anyone — including your institute manager — without your explicit consent. The institute view is aggregates only.

### Does the app track location?

No. The app does not request `ACCESS_FINE_LOCATION` or `ACCESS_COARSE_LOCATION`. The manifest does not declare those permissions.

### Are sessions encrypted?

Yes — TLS 1.2+ on every connection. Firebase enforces HTTPS on `*.web.app` and on our custom domain.

### What if there's a security incident?

We will publish an incident note on the blog and email all affected users within 72 hours of detection. We have not had one. The plan is documented internally and rehearsed.

## Next

- [CNIC handling](/docs/privacy/cnic) — the most-asked-about specific surface.
- [Data deletion](/docs/account/data-deletion) — self-service removal flow.
- [Privacy policy (legal)](https://imtehanhub.aoneahsan.com/privacy) — the formal legal document.
