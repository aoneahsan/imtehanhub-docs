---
id: cnic-verification
title: CNIC verification — why, how, what is stored
sidebar_label: CNIC verification
sidebar_position: 2
description: Submit, vote, flag, or comment in the community module after a one-time CNIC verification. Your CNIC image lives in your own Drive, never on our servers.
keywords:
  - CNIC verification ImtehanHub
  - student ID verification Pakistan
  - Google Drive PII storage
  - SHA256 CNIC denylist
  - community trust gate
slug: /community/cnic-verification
---

# CNIC verification

**CNIC verification** is the one-time identity check that unlocks the community module. You upload an image of your CNIC (Computerised National Identity Card) to your own Google Drive, share a temporary link with us, an admin reviews it, and your account is verified. Your CNIC image **never touches ImtehanHub's infrastructure**.

> **TL;DR** — Connect your Google Drive → upload CNIC photo → ImtehanHub stores only the SHA256 hash + last-4 digits + a Drive file ID. Admin reviews via temporary share link. After approval, you can submit, vote, flag, and comment.

## What ImtehanHub stores about your CNIC

Three pieces of data, all in `verifications/{uid}`:

| Field | What it is | Why we keep it |
|---|---|---|
| `cnicHash` | SHA256 hash of your CNIC number (no personal info derivable from it) | To enforce one-CNIC-per-account and to power the [denylist](/docs/community/strikes-bans) on bans |
| `cnicLast4` | The last 4 digits of your CNIC | So an admin reviewing can confirm the file matches the claimed CNIC without us holding the full number |
| `driveFileId` | The Google Drive file ID where your CNIC image lives | So the admin can request a temporary share link during review |

We **do not** store:

- The full CNIC number.
- The CNIC image bytes.
- A cached copy of the image after admin review.
- Your name, address, date of birth, photograph, signature, or any other PII derivable from the CNIC card.

The CNIC image lives **exclusively in your own Google Drive** at the path `ImtehanHub/CNIC/`. You can delete it from your Drive at any time without affecting your verification status (we do not need it after the initial review).

## Why this design

Three reasons:

1. **Privacy by data minimisation.** We hold the minimum needed for the system to work: a hash to check uniqueness, last-4 to help admins, and a Drive file ID to request a one-time view. If our database were breached, no CNIC PII could be reconstructed.
2. **Compliance.** Pakistan does not yet have a comprehensive personal-data protection law equivalent to GDPR, but Google Play and the Apple App Store both require strict justification for any sensitive PII collection. Storing only a hash + last-4 keeps us inside the safe minimum.
3. **Ban-evasion shield.** When a user is banned, the SHA256 hash is added to `cnicDenylist`. A new Google account cannot re-verify with the same CNIC. The hash is what makes this possible without storing the original number.

## The verification flow

### Step 1 — Sign in

You must be signed in with Google. See [Sign in with Google](/docs/getting-started/sign-in).

### Step 2 — Connect your Google Drive

Open `/app/profile/verification` (or `/app/community/contribute` — both link to the same flow).

Click **Connect Google Drive**. The Google OAuth screen requests the `drive.file` scope — this scope only allows ImtehanHub to access files **created by ImtehanHub itself** in your Drive, not your other files. Approve.

### Step 3 — Upload your CNIC

ImtehanHub's interface asks you to:

- Place your physical CNIC on a clean surface.
- Take a photo with both **front and back** clearly visible.
- Upload the image (or take it directly through the app's camera).

The image uploads to **your own Drive** at `ImtehanHub/CNIC/cnic-front-{timestamp}.jpg` and `ImtehanHub/CNIC/cnic-back-{timestamp}.jpg`.

ImtehanHub records:

- The Drive file IDs.
- The SHA256 hash of the CNIC number (you type it into the form for hashing — we never see it in plaintext).
- The last 4 digits (auto-extracted from the typed number).

The full CNIC number you typed is **immediately discarded** after hashing. It is not logged, not analytics-tracked, not retained.

### Step 4 — Submit

Click **Submit for verification**. Your `verifications/{uid}` document is created with status `pending`. You see a confirmation page with the expected review time (typically under 24 hours).

### Step 5 — Admin review

An admin opens `/admin/community/verifications`, sees your record, and clicks **Request Drive view**. ImtehanHub generates a **time-limited share link** (15 minutes) for your CNIC files. The admin reviews:

- Are the front and back images legible?
- Does the visible last-4 match the claimed last-4?
- Does the photo look like a genuine CNIC, not a screenshot of a stock image?
- Is the CNIC hash already in the denylist?

The admin approves or rejects.

### Step 6 — Approval

On approval, your `verifications/{uid}.status` flips to `approved`. The Verifier achievement unlocks. The community module surfaces (submit / vote / flag / comment) become available for your account.

### Step 7 — Optional cleanup

You can now **delete the CNIC files from your own Drive**. Verification status is unaffected — the hash + last-4 are sufficient for ongoing use. Many privacy-conscious users delete after approval.

## What if my verification is rejected?

You see the rejection reason on the verification page. Common reasons:

- Image illegible.
- Front and back not both uploaded.
- Last-4 mismatch.
- Suspected duplicate (CNIC already verified under a different account).
- CNIC on the denylist (previous ban).

You can re-submit unless your CNIC is on the denylist. If you believe the denylist hit is wrong (false positive — your CNIC genuinely was never used here), email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) with the case.

## What if I revoke ImtehanHub's Drive access?

You can revoke the `drive.file` permission at [myaccount.google.com/permissions](https://myaccount.google.com/permissions) any time. Your verification status is unaffected — the hash + last-4 remain. Future re-verification (if needed) would require granting access again.

## What if I delete the CNIC images from my Drive?

Same answer — verification status is unaffected. The Drive file ID we store would resolve to "file not found" on a future admin re-check, but admins do not re-check approved verifications.

## Common questions

### Why a SHA256 hash instead of nothing?

Without a hash, a banned user could create a new Google account and re-verify with the same CNIC. The hash is the only mechanism that lets the ban actually stick.

### Why is verification gated to CNIC and not, say, school ID?

CNIC is the only Pakistani document with a globally unique number. School IDs vary across institutions and reuse numbers across cohorts. Future iterations may add NADRA-issued school cards or B-Form for under-18 students.

### Can my parents verify on my behalf?

Technically yes (they can upload their own CNIC), but each verification ties to one Google account. If a parent verifies and a child uses the account, the child operates under the parent's identity. We do not currently distinguish.

### What about international students of Pakistani origin?

If you hold a Pakistani CNIC (overseas Pakistanis often do), you can verify normally. If not, you cannot currently verify.

### Is there an under-18 path?

Not yet. NADRA does issue a B-Form to under-18 children, and we are evaluating it as an alternative to CNIC for students under 18. Until that ships, under-18 users can use everything except community contribution.

### Can I see the audit log of my verification?

The audit log is admin-only by default. You can request a copy of any audit entries about you via [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) — we comply within reasonable time.

## Next

- [Submitting an MCQ](/docs/community/submit-mcq) — the most common first submission.
- [Voting](/docs/community/voting) — what verification unlocks if you do not want to submit yet.
- [Strikes, bans, denylist](/docs/community/strikes-bans) — how verification interacts with the ban system.
