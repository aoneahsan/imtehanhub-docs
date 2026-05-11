---
id: moderator
title: Becoming a moderator (hybrid promotion)
sidebar_label: Become a moderator
sidebar_position: 13
description: Community moderators resolve flag queues. Hybrid promotion — system flags eligible candidates from contribution + accuracy history, admin one-clicks to promote.
keywords:
  - community moderator promotion
  - peer moderation Pakistan
  - hybrid moderator candidate
  - flag queue resolver
slug: /community/moderator
---

# Becoming a moderator (hybrid promotion)

**Moderators** are promoted community members with the authority to resolve flags, issue strikes, and remove submissions. Promotion is **hybrid** — the system flags eligible candidates based on a long contribution and accuracy history, and an **admin one-click promotes** from the candidate list. You cannot self-apply.

> **TL;DR** — Build a clean track record (high-quality submissions, accurate flags, good comments, no strikes) over time. Eventually the system flags you as a candidate. An admin reviews and promotes. From then on, you have access to the moderator queue.

## Why hybrid promotion?

Two extremes were considered and rejected:

| Path | Why rejected |
|---|---|
| **Pure self-application** | Anyone can apply. Hard to filter. Low-quality applicants take admin time to evaluate. |
| **Pure admin-driven** | Admins overlook quiet-but-excellent contributors. Promotion stays small and slow. |

The hybrid path: **the system surfaces eligible candidates**, **the admin makes the call**. Best of both — broad coverage from the system, judgement from the admin.

## What the system looks for

Candidate eligibility is computed automatically against multiple signals:

| Signal | Threshold (illustrative) |
|---|---|
| Submissions made | At least 25, with at least 15 promoted to official |
| Submission accuracy | ≤ 1 upheld flag against your submissions in the last 6 months |
| Voting volume | At least 200 votes cast |
| Voting accuracy | ≥ 80% of your downvotes preceded a withdrawal or low score |
| Flagging accuracy | ≥ 80% of flags upheld; no rejected flags in the last 3 months |
| Comments | At least 20 comments, none soft-deleted in the last 6 months |
| Strikes | 0 active strikes |
| Account age | At least 6 months verified |
| Bilingual | At least one submission in each language |

When all signals are met, the system writes a record to `moderatorCandidates/{id}` with status `eligible`. The candidate list surfaces in the admin panel at `/admin/community/candidates`.

## What the admin does

The admin opens the candidate list and reviews each entry:

- **Scroll-through the candidate's contributions.** Are they consistently high-quality?
- **Read recent comments.** Are they constructive?
- **Check the audit log.** Any pattern of behaviour the system might have missed?
- **One-click promote** if the candidate looks right, or **dismiss** the candidacy if not.

A dismissed candidate stays in the list with a note from the admin. They become re-eligible after another 3 months of consistent activity.

## What promotion unlocks

Once promoted:

- Your `moderators/{uid}` document is created with `active: true`.
- A new menu in the navigation: **Moderator queue**.
- Read access to flag details (including flagger identity and contributor history).
- Authority to resolve flags (uphold or reject).
- Authority to issue strikes (only on submissions you have flagged-resolved against; for proactive strikes, refer to admin).
- An audit-log entry for every action.

What you do **not** get:

- Authority to **remove** users (admin-only).
- Authority to **promote other moderators** (admin-only).
- Read access to other users' verification records, billing data, or PII.

## How to use the moderator queue

Open `/admin/community/flags` (admin / moderator only). The queue is a list of open flags sorted by priority (severity + age). Click any flag to open its detail:

- The flagged submission.
- The flag reason and comment.
- The flagger's history.
- The contributor's history.
- Voting history on the submission.
- Any related flags.

Resolve as **Upheld** or **Rejected**:

- **Upheld** — the contributor receives a strike. The submission is corrected (you can edit), removed (drops from active pools), or marked with a public note.
- **Rejected** — the flagger receives a strike. The submission re-enters eligibility.

Document your reasoning in the resolution comment. Other moderators and admins can see it.

## Recusal

If you have a personal connection to either the flagger or the contributor (a friend, family member, co-worker), **recuse**. Use the "Recuse and reassign" button on the flag detail. Recusal is documented in the audit log; failing to recuse when you should is itself a strike-able offence.

## Demotion

Admins can demote a moderator at any time, with reason logged. Common triggers:

- Pattern of decisions later overturned by admins.
- Recusal violations.
- Long inactivity (no actions in 90 days).

A demoted moderator returns to regular contributor status. Past resolutions stand (we do not retroactively undo their work).

## Moderator-track achievements

Active moderators earn additional Reviewer-track achievements that go beyond what regular flaggers can earn. These do not directly raise quotas (your quotas are already at top tier) but appear as visible badges on your Profile.

## Common questions

### Can I apply to be a moderator?

No — there is no application form. Build the track record and the system flags you. Email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) only if you believe you are clearly eligible and have not been surfaced by the system after 12+ months.

### Are moderators paid?

No. ImtehanHub is free for students; moderation is volunteer work by community members who care about the platform. The reward is the elevated status, the badges, and the ability to shape the community directly.

### How many moderators are active?

Visible to admins; not publicly counted. The number scales gently with submission volume.

### Can a moderator's vote count more than a regular vote?

No. Moderator votes are weighted the same as regular verified-user votes. The privilege is in resolving flags, not in voting power.

### Can a moderator promote-to-official?

No — promote-to-official is admin-only. Moderators can recommend (write a note on the submission), but the final action is an admin's.

### What if I disagree with another moderator's resolution?

Comment on the resolution explaining your view. Admins can override. Moderator-vs-moderator disputes are rare and the admin's call is final.

## Next

- [Flagging](/docs/community/flagging) — what moderators resolve.
- [Strikes & bans](/docs/community/strikes-bans) — what moderators issue.
- [Promote to official](/docs/community/promote-to-official) — admin-only, but moderators can recommend.
