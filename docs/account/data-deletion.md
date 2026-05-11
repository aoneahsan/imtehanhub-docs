---
id: data-deletion
title: Data deletion — self-service account deletion
sidebar_label: Data deletion
sidebar_position: 6
description: ImtehanHub supports full self-service account deletion at /app/profile. Click delete, type your email to confirm, and your account, history, tests, bookmarks, leaderboard entry, and CNIC verification are all removed within minutes. No customer-service ticket required.
keywords:
  - delete ImtehanHub account
  - data deletion student app
  - account removal Pakistan
  - GDPR-like data rights
  - self service delete
slug: /account/data-deletion
---

# Data deletion

**Account deletion is self-service**. You do not need to email us, file a ticket, or wait for a customer-service response. Open `/app/profile`, click **Delete account**, type your email to confirm, and the deletion runs immediately. Everything that ties to your account is gone within a few minutes.

> **TL;DR** — `/app/profile` → Delete account → type email to confirm → done. Your user document, tests, bookmarks, history, leaderboard entry, verification record, community submissions (re-attributed), and Drive avatar reference are removed within minutes.

## What gets deleted

Every collection that holds your data is purged. We list each one explicitly because vagueness here is a privacy red flag:

| Collection | What's removed |
|---|---|
| `users/{uid}` | Your entire user document — display name, email, role, stats, preferences, plan tier, all of it |
| `users/{uid}/tests/{testId}` | Every test you submitted |
| `users/{uid}/bookmarks/{questionId}` | Every bookmark |
| `users/{uid}/referralEvents/{...}` | Your referral history (the inbound side; outbound stays, see below) |
| `bookmarks/{uid}_{questionId}` | Cross-index bookmark rows |
| `leaderboard/{uid}` | Your leaderboard entry |
| `verifications/{uid}` | Your CNIC verification record (hash + last-4 + Drive file ID, never the image itself — image stays in your Drive) |
| `instituteInvitations/{...}` matching your email | Pending invitations directed at you |
| `users/{instituteId}/students.{uid}` | Your link inside any institute that accepted you |

A Cloud-Function-like client-driven cascade runs the deletes in parallel batches.

## What does **not** get deleted

Three categories of data are intentionally preserved, with full transparency:

### 1. Community submissions (re-attributed to "Anonymous")

If you submitted MCQs, short questions, long questions, or chapter explanations, those submissions stay on the platform — they have been voted on, used in tests, possibly promoted to official. We do **not** delete community content because that would silently remove value other students depend on.

What we do instead: every submission's `authorUid`, `authorDisplayName`, and `authorPhotoURL` are rewritten to:

```ts
{
  authorUid: 'deleted',
  authorDisplayName: 'Anonymous (former contributor)',
  authorPhotoURL: null,
}
```

Your contributions remain visible and useful, but your identity is detached. The audit log shows when the rewrite happened.

This is the same mechanism used when a moderator [bans](/docs/community/strikes-bans) an abusive contributor.

### 2. Outbound referrals

If a friend signed up using your referral code before you deleted your account, that signup stays attached to the friend's account (with `referredBy: 'deleted'`). The friend continues using their account normally. Your row in `users/{newUid}/referralEvents/{...}` is removed; their row in `users/{newUid}.referredBy` is anonymised.

### 3. CNIC hash on the denylist (only if banned)

If your account was banned for community abuse and your CNIC hash was added to `cnicDenylist`, the hash **stays on the denylist** even after you delete your account. Deleting the account is not a path to bypass a ban. We are explicit about this so the rule is not a surprise.

If you were not banned, no CNIC hash exists in the denylist and nothing persists there.

## What about my Drive files (CNIC, avatars)?

ImtehanHub never stored those files in the first place — they live in your own Google Drive. Deletion of your account removes our references to them (the public URL on `users/{uid}.photoURL`, the file ID on `verifications/{uid}.driveFileId`).

To delete the actual Drive files you need to delete them from Drive yourself:

1. Open [drive.google.com](https://drive.google.com).
2. Navigate to the `ImtehanHub/` folder.
3. Delete it (or just the `CNIC/` and `Avatars/` subfolders).

We recommend doing this **after** account deletion so the ImtehanHub references die first.

## The confirmation flow

Two safety gates:

1. **Type your email** — to prevent muscle-memory click-throughs, the dialog requires you to retype your full email address. The Delete button stays disabled until it matches.
2. **15-second cooldown** — a final 15-second timer with a Cancel button gives you a chance to back out. After 15s, the deletion fires.

There is no email confirmation step. The user is already signed in to a verified Google account; an additional email round-trip would only frustrate, not protect.

## How long it takes

| Step | Time |
|---|---|
| Cascade write (deletes propagated) | < 30 seconds |
| Firestore index updates (you no longer appear in leaderboard / search) | 1-5 minutes |
| Search-engine cache (sitemap re-emit + crawler refresh) | 1-7 days |

The user-visible effect is immediate — you are signed out, your URL redirects to the home page, and the account is gone from your perspective.

## Can I export my data before deleting?

Yes. The Profile page has an **Export my data** button that produces a JSON file with:

- Your user document.
- Every test you submitted (with question IDs and your answers).
- Your bookmarks.
- Your history rows.
- Your stats and achievements snapshot.

It does not include the questions themselves (those are not your data) or community content (that is the community's, not yours).

We recommend exporting before deleting if you might want to revisit your study history later.

## Audit log

Every deletion is logged to `accountDeletions/{uid}` with:

- `deletedAt`: timestamp.
- `reason`: optional free-text from a Why? prompt on the deletion dialog (we do not pressure for a reason; the field is skip-able).
- `wasBanned`: boolean.
- `wasInstituteManager`: boolean (these get a heads-up to migrate institute ownership first).

The audit row contains no PII — just the UID (which by this point points to nothing) and metadata.

## Common questions

### Can I delete my account if I'm an institute manager?

Yes, but you must first transfer the institute to another manager (any verified student in your roster) or deactivate the institute entirely. The Delete button is disabled until one of those is done.

### Will my deletion affect my friends I referred?

No. Their accounts and any Pro grants they earned are untouched. Only the link back to you is removed.

### Can I undo a deletion?

No. We do not retain "soft-deleted" accounts. Once deletion completes there is no path to recovery.

### Can I create a new account with the same Google email after deletion?

Yes. A fresh sign-in creates a brand-new account with a new UID, new referral code, and no history. The previous account is fully gone.

### What about Pakistani data-protection law?

Pakistan does not yet have a comprehensive personal-data law equivalent to GDPR. We honour the same baseline regardless — full export, full delete, transparent retention exceptions.

## Next

- [Privacy overview](/docs/privacy/overview) — what we store and where.
- [Profile](/docs/account/profile) — the page where the Delete button lives.
- [CNIC verification](/docs/community/cnic-verification) — what gets stored if you opted into community.
