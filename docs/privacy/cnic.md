---
id: cnic
title: CNIC handling — hashing, denylist, why this design
sidebar_label: CNIC handling
sidebar_position: 2
description: ImtehanHub stores only a SHA256 hash of your CNIC number plus the last 4 digits and a Drive file ID — never the full number or the image bytes. This page explains the threat model, the design choices, and what happens if you are banned.
keywords:
  - CNIC privacy ImtehanHub
  - SHA256 hash CNIC
  - PII minimisation Pakistan
  - student verification privacy
  - Google Drive PII
slug: /privacy/cnic
---

# CNIC handling

**CNIC is the single most sensitive piece of personal data we touch**, and only because the community module would not work without it. This page is the deep technical answer to what we store, why we store the minimum, what threats the design defends against, and what happens if you are eventually banned.

> **TL;DR** — We store a SHA256 hash of your CNIC, the last 4 digits, and a Drive file ID. The CNIC image itself lives in **your** Google Drive, not ours. The hash powers a denylist that blocks banned users from re-verifying. We never store the full CNIC number or the image bytes.

## The threat model

Three concrete threats we defend against:

1. **Database breach.** If our Firestore is compromised, the attacker should not be able to reconstruct CNIC PII. A SHA256 hash of a 13-digit number is irreversible without the original input — and 10^13 candidates is brute-forceable but expensive enough to combine with last-4 to be useful.
2. **Ban evasion.** A banned user creates a new Google account and tries to re-verify with the same CNIC. The denylist hash mechanism blocks this.
3. **Insider misuse.** Even with admin database access, no employee can fetch the full CNIC number — it never lived in our database. They could only request a one-time Drive view (which is logged) during initial verification.

## Why a hash and not nothing

If we stored **no** representation of the CNIC, we could not detect ban evaders. A banned user makes a new Gmail account, runs CNIC verification again, and is back in the community module overnight — with no mechanism to stop them.

The hash is the minimum sufficient mechanism for the denylist. Without it, the trust system collapses.

We chose **SHA256** because:

- It is irreversible — given the hash alone, recovering the input requires 2^256 brute force, computationally infeasible.
- Even with the last-4 (narrowing the brute force to 10^9 candidates), it is expensive enough to deter casual attackers and meaningless without context.
- Industry-standard, easy to verify our implementation, no exotic dependencies.

We do **not** salt the hash because we need cross-account collision detection — two accounts using the same CNIC must produce the same hash. A per-user salt would defeat the denylist.

## Why last-4 and not full

The last-4 exists for one specific purpose: **admin reviewability**.

When you submit verification, you also type your full CNIC number into a form. We:

1. Compute the SHA256 hash immediately in the browser.
2. Send the hash + last-4 to the server.
3. Discard the full number from memory.

The last-4 stays so an admin reviewing your case can verify the visible digits on your uploaded CNIC image match the claimed last-4. Without the last-4, an admin would have to either request the full number (privacy violation) or take it on faith (security hole).

Last-4 alone reveals nothing of value — the first 8-9 digits of a Pakistani CNIC encode region, district, family register, and gender; the last 4 are essentially a serial. Knowing only the last 4 cannot identify a person, locate them, or be used for any fraud we are aware of.

## Why the image lives in your Drive

Three reasons:

1. **Compliance.** Storing image bytes of national identity cards anywhere on our infrastructure crosses a regulatory line we want to stay miles from. Pakistan's draft Personal Data Protection Bill and global best-practice both treat ID documents as a high-risk category. Not holding them at all is the safest design.
2. **User control.** You own the file. You can delete it from your Drive after verification and our verification status is unaffected. Most privacy-conscious users do exactly this.
3. **Cost.** We avoid file-storage costs entirely. Not the primary reason but a useful side effect.

The flow:

1. ImtehanHub asks for the `drive.file` OAuth scope — limited to **files ImtehanHub itself created** in your Drive, not your other files.
2. You upload (or take a photo) of the front and back of your CNIC.
3. The image is uploaded directly to `your-drive://ImtehanHub/CNIC/cnic-front-{timestamp}.jpg` (and similar for the back).
4. We store only the Drive file IDs in `verifications/{uid}.driveFileId`.
5. We never download or cache the image bytes.

During admin review, the admin generates a **time-limited Drive view link** (15 minutes) and views the image once. The view event is logged. No cache, no copy, no thumbnail.

## What the denylist actually looks like

```
cnicDenylist/{cnicHash}
  bannedAt: timestamp
  bannedReason: string         // e.g. 'community_strikes_5'
  bannedByUid: string          // moderator UID
  appealStatus: 'none' | 'pending' | 'rejected' | 'approved'
```

When a new user submits CNIC verification:

1. Compute SHA256 of their typed CNIC.
2. Check `cnicDenylist/{hash}`.
3. If present, reject the verification with reason `denied_by_denylist`. The user sees: "This CNIC is on our denylist. If you believe this is in error, email aoneahsan@gmail.com." We do not surface the ban reason to the new account.

The denylist is read-once per verification attempt, write-once when a ban happens, audit-logged on both.

## What about a stolen CNIC?

If your CNIC has been used by someone else to register on ImtehanHub (e.g. a sibling or a friend who knew your number), you may see one of:

- Verification rejected with "already verified under a different account."
- The other account got banned and your CNIC is now on the denylist.

In either case, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) with the case. We will:

1. Investigate the other account's activity.
2. If genuine fraud, transfer the verification (or remove the denylist entry) to you.
3. Audit-log the resolution.

This is a hands-on process. We have run it ~5 times in production with no false negatives.

## What if I want my CNIC hash deleted entirely?

The `verifications/{uid}` row deletes automatically when you delete your account (see [Data deletion](/docs/account/data-deletion)). The hash is gone from the verifications collection.

The **denylist hash** is a separate question. If you were banned, the denylist hash stays even after account deletion — that is the whole point. If you were not banned, no hash exists in the denylist, so nothing persists there.

If you believe you were wrongly banned and want the denylist entry removed, email and we will review. False positives have been rare (one case in production, resolved).

## Why not an alternative ID — NTN, school ID, B-Form?

Considered each:

- **NTN (National Tax Number)** — most students do not have one. The age skew (taxpayers are adults) defeats the purpose.
- **School ID** — varies wildly across institutions, reuses numbers across cohorts. We cannot trust it as a unique identifier.
- **B-Form (under-18 ID)** — promising, and we plan to add it as an alternative path. The NADRA B-Form has a similar 13-digit structure, allowing the same hash-and-denylist design. Currently roadmapped.

CNIC is the only Pakistani document with a genuinely unique, nationally-issued ID for adults. We default to it for that reason.

## What an attacker would need to do harm

A reasonable test of the design — what does it take to recover real PII?

Database breach scenario:

1. Attacker exfiltrates `verifications/` and `cnicDenylist/`.
2. Attacker has SHA256 hashes + last-4 digits.
3. To recover a specific CNIC, the attacker must brute-force the remaining 9 digits → ~10^9 candidates per hash.
4. SHA256 on commodity hardware: ~10^9 hashes/second on a single GPU. So ~1 second per CNIC.
5. With the recovered CNIC number, the attacker still does not have the holder's name, address, school, parents, or any other PII unless they cross-reference with NADRA (which is not online-accessible).

The cost is real but low; the upside is also low (just a CNIC number is limited PII). The Drive image — the actually-sensitive artifact — is not in our database and cannot be exfiltrated from us.

Comparison: if we had stored full numbers and images, the same breach would yield 100% PII for every verified user. The current design is a meaningful improvement.

## Common questions

### Why not just trust users without verification?

Then bad actors flood the community module with low-quality submissions and abuse. Verification is the price of trust. We tried to make the price as cheap as possible.

### Why don't admins re-check approved CNIC files periodically?

Once approved, the Drive file is no longer needed — the hash + last-4 are sufficient for ongoing operation. Re-checking would mean re-fetching the image, increasing exposure unnecessarily. Approved is approved.

### Can I see what data ImtehanHub holds about my CNIC verification?

Yes — the Profile page shows your verification status, the last-4 you submitted, and the Drive file ID. The hash is shown only on request (it is technically yours, but rendering it without prompt is noise).

### What about face-verification (live selfie + CNIC match)?

Considered. Decided against for now because:
- It requires storing a face image, which is more sensitive than a CNIC.
- It is biased against students with intermittent connectivity, low-end devices, or visible disabilities.
- The current text-match (last-4 + CNIC visible on image) catches the abuse patterns we have seen.

Re-evaluating as the community grows.

## Next

- [Privacy overview](/docs/privacy/overview) — full data inventory.
- [CNIC verification flow](/docs/community/cnic-verification) — the user-facing how-to.
- [Strikes, bans, denylist](/docs/community/strikes-bans) — how the denylist gets populated.
