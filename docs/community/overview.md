---
id: overview
title: Community module — overview
sidebar_label: Overview
sidebar_position: 1
description: Verified Pakistani students contribute MCQs, short/long questions, and chapter explanations. Voted, flagged, moderated, and promoted to the official set when ready.
keywords:
  - ImtehanHub community
  - student question contribution
  - community moderation
  - bilingual MCQ submission
  - peer-reviewed exam content
slug: /community/overview
image: /img/og-community.png
---

# Community module — overview

**The community module** is the system that lets verified Pakistani students **contribute their own questions and explanations** to ImtehanHub. Other verified students vote and flag. Promoted moderators and admins resolve disputes. Submissions that pass a clear quality threshold are eligible to appear in real tests, and the very best ones are eventually promoted to the official question set.

> **TL;DR** — Verify your CNIC once → submit MCQs / Short / Long / Chapter Explanations → other students vote and flag → cross the threshold → your work appears in real tests. Earn achievements that raise your daily quotas.

## Why a community module exists

Three reasons:

1. **The Pakistani curriculum has more questions than any small content team can write.** 8 classes × ~10 subjects × 10-30 chapters × 20-50 MCQs each is over 30,000 MCQs before you count Short and Long forms. The official seed pipeline can scale to most of it; community contribution closes the long tail.
2. **Students phrase questions differently than textbooks.** A real exam often re-frames a textbook fact in ways the textbook itself does not. Students who have already passed a board exam know which framings actually appear — and contributing those questions trains the next cohort.
3. **It builds genuine ownership.** A student who has written 5 MCQs that other students answered correctly is engaged at a level no passive learner reaches. Engagement compounds over years of school.

## Who can participate

Only **verified contributors**. Verification means:

- You have signed in with Google.
- You have completed [CNIC verification](/docs/community/cnic-verification) — uploaded your CNIC image to your own Google Drive, and ImtehanHub has approved it.
- You are not banned or strike-limited.

Sign-in alone is not enough. The verification gate exists because:

- It raises the cost of bad-faith spam (creating throwaway Google accounts is easy; verifying CNICs is not).
- It enables the strike system (bans target the person, not just an account).
- It makes contributors accountable to their own identity.

## What you can submit

Four submission types, each with its own page in this section:

| Type | Effort | Visibility on chapter |
|---|---|---|
| **MCQ** | ~5-10 minutes | Joins the chapter's MCQ pool |
| **Short** | ~5-10 minutes | Joins the Short pool |
| **Long** | ~10-15 minutes | Joins the Long pool with marking-scheme guidance |
| **Chapter explanation** | ~20-30 minutes | A standalone explainer for a chapter or topic |

Every submission is **bilingual-friendly** — you can submit English-only or Urdu-only with a "translate later" checkbox; **both languages are required for promote-to-official**. See [Bilingual gate](/docs/community/bilingual-gate).

You can also attach **resource images** to a submission (textbook page scans, your handwritten working, diagrams). Up to 8 images at 8 MB each, image/* only. Images go to your own Google Drive at `ImtehanHub/Attachments` — they never live on our infrastructure.

## What you can do as a non-submitter

Even if you do not submit your own questions, verification unlocks:

- **Voting** — upvote or downvote any other contributor's submission.
- **Flagging** — flag a submission you believe is wrong, off-topic, or low-quality.
- **Commenting** — discuss a submission in its detail page.

These actions earn you Voter / Reviewer achievements and raise your own quotas (see [Daily quotas](/docs/community/quotas)).

## The eligibility threshold

A submission becomes eligible to appear in real tests when:

1. **Net votes ≥ 10** (upvotes minus downvotes).
2. **Gross votes ≥ 15** (total upvotes + downvotes — guards against echo chambers).
3. **No active flags** (`activeFlagCount === 0`).

All three conditions must hold simultaneously. If a flag is opened on an eligible submission, it falls back to ineligible until the flag is resolved.

A separate question is whether a submission is **promoted to official** — that is an admin one-click action available only after the bilingual gate passes (both languages present and proofread). See [Promote to official](/docs/community/promote-to-official).

## Strikes, bans, and the denylist

The community module has consequences for bad-faith behaviour. Brief overview (full details in [Strikes and bans](/docs/community/strikes-bans)):

- **Creator strike** — issued when one of your submissions is flagged and the flag is upheld.
- **Flagger strike** — issued when you flag a submission and the flag is rejected.
- **5 strikes** — automatic permanent ban.
- **CNIC denylist** — on ban, the SHA256 hash of the banned CNIC is added to a denylist so the same person cannot re-verify with a new Google account.
- **Banned-user content** stays live and accessible — but is **re-attributed to "Anonymous (former contributor)"**. The platform does not punish other students by removing useful content the banned user wrote.

## Daily quotas

To prevent dump-and-disappear behaviour, daily quotas cap each action type:

| Action | Default daily quota |
|---|---|
| Submissions | 10 |
| Votes | 50 |
| Flags | 5 |
| Comments | 5 |

Quotas reset at midnight Pakistan Standard Time. Earning **Contributor / Voter / Reviewer achievements** raises your quotas — top-tier reviewers can flag many more submissions per day than first-week newcomers.

## Where the moderator queue lives

Flagged submissions go to the **moderator queue** at `/admin/community/flags`. Moderators are:

- **Admins** — always have moderator powers.
- **Promoted community moderators** — verified students promoted via the [hybrid moderator promotion](/docs/community/moderator) flow.

Moderators see flag context, voter history, contributor history, and previous strikes. They resolve flags as **upheld** (creator gets a strike, submission may be modified or removed) or **rejected** (flagger gets a strike).

## Audit log

Every privileged action — verification approval, submission promotion, vote cast, flag resolution, strike issuance, ban, denylist write, moderator promotion, achievement unlock, comment deletion — is recorded in `communityAuditLogs/{id}`, which is **append-only** (Firestore rules deny update and delete). The audit log is the source of truth for moderation history. Admins (and only admins) can read it.

## Pages in this section

- [CNIC verification](/docs/community/cnic-verification) — the verification gate.
- [Submitting an MCQ](/docs/community/submit-mcq) — the most common submission type.
- [Submitting a short question](/docs/community/submit-short)
- [Submitting a long question](/docs/community/submit-long)
- [Submitting a chapter explanation](/docs/community/submit-chapter-explanation)
- [Bilingual gate](/docs/community/bilingual-gate) — when each language is required.
- [Voting](/docs/community/voting) — the eligibility threshold.
- [Flagging](/docs/community/flagging) — when and how to flag.
- [Comments on submissions](/docs/community/comments)
- [Daily quotas](/docs/community/quotas) — and how achievements raise them.
- [Strikes, 5-strike auto-ban, denylist](/docs/community/strikes-bans)
- [Becoming a moderator](/docs/community/moderator) — hybrid promotion.
- [Promote to official](/docs/community/promote-to-official) — admin flow.

## Common questions

### Do I have to verify my CNIC to use ImtehanHub?

No — most of ImtehanHub does not need verification. Verification is only required for the community module (submitting, voting, flagging, commenting). Taking tests, bookmarking, viewing the leaderboard, and everything else works without it.

### Is verification expensive?

Free. The only cost is the time to upload a CNIC image to your own Google Drive (~30 seconds) and the wait for an admin to approve (typically under 24 hours).

### What if I do not have a CNIC?

CNIC issuance is a NADRA process for citizens age 18+. Younger students or non-Pakistani users cannot currently verify. We are exploring lighter verification paths for under-18 students; until then, you can use ImtehanHub for everything except community contribution.

### Can I delete my submissions?

You can request deletion via a flag on your own submission. Admin reviews. If approved, the submission is removed from active pools but the audit log of its existence remains.

## Next

- [CNIC verification](/docs/community/cnic-verification) — the first step.
- [Submitting an MCQ](/docs/community/submit-mcq) — the easiest submission to start with.
- [Voting](/docs/community/voting) — what to do if you do not want to submit yet.
