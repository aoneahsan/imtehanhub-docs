---
id: voting
title: Voting — eligibility threshold and process
sidebar_label: Voting
sidebar_position: 8
description: Verified members vote on community submissions. Eligibility requires net votes >= 10, gross votes >= 15, and no active flag. Voters earn achievements.
keywords:
  - community voting threshold
  - net gross votes
  - peer review submission
  - voting quota Pakistan
slug: /community/voting
---

# Voting

**Voting** is how the ImtehanHub community decides which submissions are good enough to appear in real tests. Each submission has an upvote and a downvote counter. The eligibility threshold is **net votes ≥ 10 AND gross votes ≥ 15 AND no active flags** — all three at once.

> **TL;DR** — Open any submission, click upvote or downvote. Once a submission crosses the threshold, it becomes eligible for inclusion in tests via the source picker. Your vote also earns you Voter-track achievements that raise your daily quota.

## Who can vote

Only **verified contributors** (see [CNIC verification](/docs/community/cnic-verification)). Sign-in alone does not enable voting. The verification gate applies the same way as for submissions, flagging, and commenting.

## Where to vote

Three places:

1. **The submission detail page** (`/community/submission/:id`) — the canonical voting surface.
2. **A community-questions feed** (`/community/feed`) — a list of recent submissions across all chapters; quick voting from the list.
3. **Inside a test** when source picker is set to community ≥ 1% — after answering, the question's source badge links to the submission and lets you vote.

## How votes are stored

Each vote is a document at `communityVotes/{submissionId}_{voterUid}` — the deterministic doc ID guarantees **one vote per voter per submission**. Voting again with the same voter on the same submission **changes** the existing vote (not adds a new one).

The fields are simple:

```ts
{
  submissionId: 'submission-id',
  voterUid: 'firebase-uid',
  vote: 1 | -1,           // +1 upvote, -1 downvote
  createdAt: '2026-05-10T...',
  updatedAt: '2026-05-10T...',
}
```

The submission document carries denormalised counters (`upvoteCount`, `downvoteCount`) that are updated atomically via `runTransaction` whenever a vote is cast or changed.

## The eligibility threshold

For a submission to **appear in tests** (when a student picks community in the source picker), three conditions must all hold:

| Condition | Why |
|---|---|
| **Net votes ≥ 10** | Net = upvotes - downvotes. Ten positive net votes is enough peer signal. |
| **Gross votes ≥ 15** | Gross = upvotes + downvotes. Guards against echo chambers — ten supporters and zero detractors is suspicious. |
| **`activeFlagCount === 0`** | If any open flag exists, the submission is paused while the flag is reviewed. |

All three conditions checked at the moment a test query runs. A submission can flicker in and out of eligibility as flags open and close. The conditions are also checked at promote-to-official time, with the additional bilingual gate.

## Why a threshold, not just upvotes?

Three reasons:

1. **Net guards against quality drift.** A submission with 50 upvotes and 60 downvotes (net = -10) should not appear, regardless of total interest.
2. **Gross guards against thin signals.** A submission with 10 upvotes and 0 downvotes (gross = 10) is too thin — perhaps no one bothered to actually answer it. The gross requirement of 15 forces wider engagement.
3. **No-flag guards against confirmed problems.** If even one student has flagged the submission and the flag is unresolved, the submission stays out of tests.

## Voting changes your stats

Every vote you cast:

- Counts toward your **daily voting quota** (default 50/day, raised by Voter achievements — see [Daily quotas](/docs/community/quotas)).
- Triggers the achievement engine — milestone vote counts (10 / 100 / 500 / 1000 lifetime votes) unlock progressive Voter achievements.
- Writes an audit log entry to `communityAuditLogs`.

Your vote is **not anonymous to moderators** — when investigating a flag, moderators can see who voted what. Your vote IS anonymous to other students and to the contributor (they see counts, not identities).

## Strategic voting (and why not to)

A few students try to "strategy vote" — downvote good submissions from competitors, upvote weak submissions from friends. Three things make this counterproductive:

1. **Moderators see your voting pattern.** A pattern of always downvoting one specific contributor or always upvoting another is visible in the audit log. It can lead to a Reviewer-track strike.
2. **The gross requirement** means strategy votes from a small group rarely move the threshold without triggering wider engagement.
3. **You earn nothing.** Voter achievements weight upvotes and downvotes equally, but downvotes against quality content tend to be reversed by other voters.

Vote based on the question quality, not the contributor. If the question is good, upvote. If wrong or weak, downvote. If genuinely problematic, flag (a stronger signal than a downvote).

## Removing your vote

You can change your vote any time (upvote → downvote, downvote → upvote) by clicking the opposite button. To completely remove your vote, click the same button again — the third click clears your vote (counter goes from -1 to 0 to +1, then 0).

Removing your vote is recorded in the audit log.

## Voting closes when

Two cases:

1. **Submission is removed.** If a flag is upheld and the submission is removed, voting on it is no longer possible (the page is gone).
2. **Submission is promoted to official.** Once promoted, the question is no longer a community submission — voting freezes at the final tally and is preserved as historical record.

Edits to a chapter explanation trigger a soft-revote (existing voters are asked to confirm), but otherwise voting is open indefinitely on active submissions.

## Common questions

### Why a fixed threshold?

We considered curve-based thresholds (relative to chapter activity) but settled on absolute. Absolute thresholds are predictable and explainable; curves create gaming surface ("I'll submit on a slow chapter to lower the bar").

### What if I disagree with the upheld flag?

Comment on the submission with your reasoning. The moderator's resolution is final unless an admin overrides it.

### Can I see the full vote history of a submission?

You see the current counts. Full vote-by-vote history is admin-only (it can reveal voter identities).

### What about my own submissions?

You cannot vote on your own submissions — the form blocks self-voting at the API layer.

## Next

- [Flagging](/docs/community/flagging) — the stronger negative signal.
- [Daily quotas](/docs/community/quotas) — how voting affects your quotas.
- [Promote to official](/docs/community/promote-to-official) — what happens after the threshold is crossed.
