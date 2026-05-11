---
id: strikes-bans
title: Strikes, 5-strike auto-ban, and the denylist
sidebar_label: Strikes & bans
sidebar_position: 12
description: Confirmed wrongdoing in the community module produces strikes. Five strikes results in a permanent ban plus CNIC denylist entry.
keywords:
  - strike ban community
  - 5 strike auto ban
  - CNIC denylist
  - moderation consequences
  - banned user content
slug: /community/strikes-bans
---

# Strikes, 5-strike auto-ban, and the denylist

**Strikes** are formal warnings logged against your account when a moderation action against you is upheld. They accumulate. **At five strikes, your account is permanently banned**, and the SHA256 hash of your CNIC is added to a denylist that prevents re-registration with the same CNIC under a new Google account.

> **TL;DR** — Get a strike for: a flag against your submission upheld, OR a flag you raised rejected, OR repeated comment violations. Five strikes = permanent ban + CNIC denylist. Strikes never auto-expire; admins can pardon manually but rarely do.

## When strikes are issued

Three triggers:

| Trigger | Who gets the strike |
|---|---|
| A flag against your submission is **upheld** by a moderator | The contributor (you, if it was your submission) |
| A flag you raised is **rejected** by a moderator | The flagger (you, if you raised it) |
| Multiple comments soft-deleted for policy violations within a short window | The commenter |

Strikes are written to `strikes/{uid}/items/{strikeId}` as immutable records. Each record carries:

- The reason (which trigger fired).
- The submission / flag / comment ID involved.
- The moderator who issued the strike.
- A timestamp.
- An optional comment from the moderator.

## How many strikes lead to a ban

**Five.** Counting starts at 0; the fifth strike fires the ban automatically. There is no "warning at 4" — the count is visible on your Profile page from strike 1 onward, so you always know where you stand.

## What a ban does

When the ban fires:

1. Your `bans/{uid}` document is created with status `active`.
2. Your verification status flips to `banned`.
3. You lose access to all community-module features (submitting, voting, flagging, commenting).
4. **Your existing submissions stay live**, but their attribution flips to "Anonymous (former contributor)".
5. The SHA256 hash of your CNIC is added to `cnicDenylist/{cnicHash}` — preventing re-verification with the same CNIC under any Google account.
6. An audit log entry is written.
7. You receive an in-app notification explaining the ban with the strike history.

What a ban does **not** do:

- It does **not** delete your existing test history, bookmarks, leaderboard entry, or non-community account data.
- It does **not** prevent you from taking tests on ImtehanHub (you can still use the platform as a free-tier test taker).
- It does **not** delete your existing community submissions — they remain useful to other students.

## Why banned-user content stays live

Three reasons:

1. **Punishing other students by removing useful content is wrong.** A contributor who wrote 50 high-quality MCQs over a year does not become useless because they later violated policy. The MCQs still teach.
2. **The audit trail matters.** Removing content rewrites history. Anonymising the attribution is a cleaner solution.
3. **It removes the incentive for "scorched-earth" exits.** Without this rule, a contributor expecting a ban could flood the system with last-minute trash submissions to pollute the dataset. With this rule, their work is permanent regardless of their fate.

## The CNIC denylist

`cnicDenylist/{cnicHash}` is a list of SHA256 hashes of banned users' CNICs. When a new user attempts CNIC verification:

1. Their CNIC is hashed (locally on their device, not transmitted in plaintext).
2. The hash is checked against the denylist.
3. If matched, verification is rejected with reason "CNIC associated with a banned account".

The denylist effectively prevents ban evasion by switching Google accounts. The same physical person, with the same CNIC, cannot re-verify.

The denylist stores **only the hash** — no PII. An attacker with read access to the denylist still cannot reverse the hashes to recover CNIC numbers.

## Pardons

Admins can manually pardon a strike or unban an account in extreme cases (genuine miscarriage of moderator decision, identity theft, etc.). Pardons are rare. The audit log records the pardon with the admin's reasoning.

To request a pardon: email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) with your case. Include:

- Your account email.
- The strike ID (visible on your Profile).
- A clear explanation of why the strike or ban should be reversed.
- Any supporting evidence (e.g. textbook page proving the flag was wrong).

Pardons do not happen automatically and are not granted just for asking. The bar is meaningful evidence of unfair moderation.

## What strikes do not do

- **They do not lower your daily quotas** below the default. (Active strikes do prevent achievements that would raise quotas, however.)
- **They do not delete content.**
- **They do not affect your test stats, leaderboard entry, or streak.**
- **They do not show up to other students** — your strike count is private to you and to admins. Other students only see "Verified" status.

## Strikes interact with achievements

A strike pauses progression on Reviewer-track achievements. So a contributor at 4 strikes cannot earn a Gold Reviewer badge until the strike count drops (which only happens through pardons).

The Comeback achievement (see [Achievements](/docs/concepts/achievements)) does **not** apply to strike recovery. Comeback is for streak restarts after voluntary breaks, not moderation recoveries.

## Common questions

### What if I think a moderator is abusing their power?

Email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com). Admins can review moderator decisions and demote moderators who are systematically wrong.

### Can I see my own strike history?

Yes — `/app/profile/strikes` lists every strike, the trigger, the moderator, and the comment.

### Will I lose my Pro subscription if banned?

The community ban is independent of your billing. Your Pro / Unlimited subscription continues as usual; only the community-module features are revoked.

### What happens to my Drive files (CNIC, attachments)?

They remain in your own Google Drive, untouched. ImtehanHub does not have permission to delete from your Drive. You can manually clean up if you wish.

### Can I delete my own banned account?

Yes — the [data deletion](/docs/getting-started/welcome) flow works for banned users. It removes your user document and content **except your existing community submissions** (which stay attributed as "Anonymous (former contributor)" per the policy above).

### Is the denylist transparent?

The list of hashes is admin-only. No public-facing count of banned users is published. Banned users see their own status; everyone else sees nothing.

## Next

- [Flagging](/docs/community/flagging) — most strikes originate from flags.
- [Becoming a moderator](/docs/community/moderator) — moderators are the ones who issue strikes.
- [CNIC verification](/docs/community/cnic-verification) — the system the denylist guards.
