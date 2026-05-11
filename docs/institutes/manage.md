---
id: manage
title: Manage students — invite, accept, remove
sidebar_label: Manage students
sidebar_position: 2
description: Invite by email, students accept via in-app banner, roster auto-updates. Revoke pending invites or remove students any time. Personal accounts stay untouched.
keywords:
  - invite students ImtehanHub
  - institute roster management
  - student invitation flow
  - academy student onboarding
  - school account management
slug: /institutes/manage
---

# Manage students

**The institute manager's job** in ImtehanHub is to keep a clean roster: invite students who should be in it, remove students who should not, and react when the auto-discount tier changes. This page documents every action that surface exposes.

> **TL;DR** — Type comma-separated emails into the invite form, students get an in-app notification when they next sign in, they tap Accept, your roster updates, your discount tier recomputes.

## Inviting students

### Single invitation

1. Open `/app/institute` and scroll to the **Invitations** section.
2. Type a student's email (any Google-account email — `@gmail.com`, school addresses on Google Workspace, custom domains on Workspace).
3. Click **Invite**.

The invitation lands in `instituteInvitations/{...}` with status `pending`. The student receives:

- An in-app banner on `/app` the next time they sign in (or immediately if they are signed in already).
- A web push notification if they enabled them.
- No email — we do not send invitation emails to keep our inbox-permission footprint small. The in-app banner is sufficient because students must sign in to accept.

### Bulk invitations

The same form accepts comma- or newline-separated emails. Up to 200 in one batch. We validate each address client-side; invalid ones are flagged with a red underline so you can fix them before submitting.

Common bulk-invitation source: paste a list exported from your school's Google Workspace admin console.

### Re-inviting

If you invite the same email twice, the second invite is a no-op — the existing pending invite is updated with a fresh `lastNotifiedAt` timestamp so the student gets a reminder banner.

## What the student sees

When the student next signs in, the homepage banner reads:

> **Iqbal Sciences Academy** has invited you to join their institute on ImtehanHub.
> Accepting links your account to the institute. They will see your aggregate progress (test counts, average accuracy) but not your individual tests, bookmarks, or community content. [Accept] [Decline]

Accept and the link is created in two writes:

1. `users/{studentUid}.instituteId` is set.
2. `institutes/{instituteId}.students[uid]` is set with `joinedAt`.

The roster size recomputes and the discount tier is reapplied.

Decline and the invitation row is deleted. We do not retain declined invites.

## Roster view

The Roster section at `/app/institute` lists every accepted student with:

- Display name (or a short fallback if the student has not customised one).
- Joined date.
- Last activity date (last test submission).
- An action menu: View progress, Remove.

The list is sortable by name, join date, or last-activity. A simple text search filters by name.

The roster is paginated at 50 entries per page. Larger rosters (100+ students) load lazily via a TanStack Query infinite scroll.

## Removing a student

Click **Remove** on the row, confirm the prompt, and the link is severed:

1. `users/{studentUid}.instituteId` is set to `null`.
2. The `students[uid]` entry is deleted from `institutes/{instituteId}.students`.
3. The institute's `studentCount` is recomputed and the discount tier reapplied.

The student is notified by a banner on their next visit:

> You have been removed from **Iqbal Sciences Academy**'s institute. Your account is unaffected and continues to work normally.

Removed students keep all their history, bookmarks, tests, and community contributions. The institute layer is purely additive; removing it leaves the personal account intact.

We do not require a reason for removal. Discretion is yours.

## Revoking a pending invitation

If you invited someone who has not accepted yet (and you change your mind, or the student already has an account from elsewhere), click **Revoke** on the pending invitation row. The `instituteInvitations/{...}` doc is deleted; the next time the student signs in the banner is gone.

Revoking does not affect the student in any other way.

## Inviting students who already have an account

This is the common case. The flow is identical:

1. You invite by email.
2. The student signs in (they already have an account, so they go straight to `/app`).
3. The banner appears.
4. They accept or decline.

The invite-by-email mechanism uses the email on the student's `users` document — not their current Google session email if those differ — so a student who signed up with `name@gmail.com` will receive the banner only when signed in as `name@gmail.com`.

## What if the email does not match any existing account?

The invitation row is created with status `pending`. Nothing happens until that email is used to create an ImtehanHub account. The moment a new student signs up with that email:

1. The sign-up pipeline checks for any pending invitations against the new email.
2. The banner appears on their first `/app` visit.

This is the natural onboarding path for a school inviting all its 9th-graders before any of them have an account yet — the invites sit dormant and trigger as students sign up over the following weeks.

## Discount tier recomputation

Every time the roster size changes (an accept or a remove), `instituteService.updateStudentCount` runs and:

1. Counts accepted students.
2. Maps to a tier (`1-9`, `10-29`, `30-99`, `100+`).
3. Writes the new tier on `institutes/{instituteId}.discountTier`.
4. The billing service reads `discountTier` at renewal time and applies the percentage.

Mid-period tier changes do not retroactively refund or surcharge — they apply on next renewal.

## Bulk export

A **Export roster** button on the Roster section produces a CSV with:

- Email.
- Display name.
- Joined date.
- Last activity date.
- Status (`active` / `inactive` — inactive = no test in 30 days).

This is for the manager's offline record-keeping; we do not send the export to anyone.

## Common questions

### Can a student belong to two institutes?

No. One institute link per user. A student must leave the current institute before accepting a new one.

### Can I email-blast my entire student body about new content?

Not through the institute panel. Push notifications go through OneSignal at the platform level for everyone — institute managers cannot target their roster specifically. (Roadmapped as part of the assignment system.)

### What if a student deletes their account while on my roster?

The link is severed automatically. Your roster size drops by one and the discount tier recomputes if you cross a threshold.

### Can I see which students are on Free vs Pro vs Unlimited?

No. Plan tier is private to the student. The Roster view shows only activity, not billing.

## Next

- [Progress dashboard](/docs/institutes/progress) — the aggregate metrics view.
- [Overview](/docs/institutes/overview) — what an institute account is.
- [Data deletion](/docs/account/data-deletion) — what happens if a student or manager deletes their account.
