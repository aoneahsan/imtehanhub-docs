---
id: quotas
title: Daily quotas — and how achievements raise them
sidebar_label: Daily quotas
sidebar_position: 11
description: Submissions, votes, flags, and comments each have a daily quota. Default quotas are deliberately low; earning Contributor / Voter / Reviewer achievements raises them progressively.
keywords:
  - community daily quota
  - submission quota
  - vote quota raise
  - flag quota Pakistan
  - earn higher limits
slug: /community/quotas
---

# Daily quotas — and how achievements raise them

**Daily quotas** cap how many of each community action you can perform per day. The defaults are deliberately low to prevent dump-and-disappear behaviour and bad-faith flag-bombing. As you accumulate **Contributor / Voter / Reviewer achievements**, your quotas rise — power users can do far more per day than newcomers.

> **TL;DR** — Defaults are 10 submissions / 50 votes / 5 flags / 5 comments per day. Each tier of community achievement raises the corresponding quota.

## Why quotas exist

Three reasons:

1. **Prevent dump-and-disappear.** A new contributor uploading 50 submissions on day one and never returning leaves a huge moderation burden with no follow-up. Daily caps force a sustained rhythm.
2. **Prevent flag-bombing.** Without a flag cap, a hostile contributor could flag every competitor's submission. With 5 flags/day, the flagger has to pick which 5 to flag — they pick the genuinely problematic ones.
3. **Reward sustained good faith.** Quotas rise as you build trust through accurate flagging, useful votes, and quality submissions. The reward is doing more, not less.

## Default quotas

| Action | Default daily quota |
|---|---|
| **Submissions** | 10 |
| **Votes** | 50 |
| **Flags** | 5 |
| **Comments** | 5 |

All quotas reset at midnight **Pakistan Standard Time (Asia/Karachi)**. A submission counts toward your quota the moment the form posts successfully (regardless of whether it gets approved or flagged later).

## Where quotas live

Each user has a per-day record at `dailyQuotas/{uid_dateKey}`:

```ts
{
  uid: 'firebase-uid',
  date: '2026-05-10',
  submissions: 3,
  votes: 22,
  flags: 0,
  comments: 1,
  capSubmissions: 10,    // your current cap
  capVotes: 50,
  capFlags: 5,
  capComments: 5,
}
```

The cap fields are recomputed when you earn a new achievement that raises a quota. The counters reset on the date rollover.

## How achievements raise quotas

Achievements in the Contributor / Voter / Reviewer / Linguist tracks come in tiers (typically Bronze → Silver → Gold). Each tier raises the corresponding quota:

| Track | Default | Bronze (e.g. 10 submissions made) | Silver (50) | Gold (200) |
|---|---|---|---|---|
| **Contributor** | 10 sub/day | 12 | 15 | 20 |
| **Voter** | 50 vote/day | 60 | 80 | 100 |
| **Reviewer** | 5 flag/day | 7 | 10 | 15 |
| **Linguist** | (translation participation) | adds 2 sub | adds 5 sub | adds 10 sub |

The exact numbers in this table are illustrative — see [Achievements](/docs/concepts/achievements) and the live Profile page for your current caps. The trajectory is what matters: gradual, earnable raises tied to demonstrated good behaviour.

## What happens when you hit the cap

The form / vote / flag button on the relevant page is disabled with a clear "Daily quota reached" message and a tooltip showing your current cap and what would raise it.

You can still:

- Read submissions.
- Browse the chapter feed.
- View other users' contributor profiles.

You cannot:

- Submit a new MCQ / Short / Long / explanation today.
- Cast a new vote today.
- Open a new flag today.
- Post a new comment today.

The block resets at midnight PKT.

## Strike effects on quotas

Strikes do not directly reduce your quota cap — but **active strikes prevent quota-raising achievements from triggering**. So a contributor with 4 strikes against them is stuck at default caps until they earn a strike pardon (rare, admin-discretion) or until the strike count drops via natural attrition (it does not).

## Plan tier and quotas

| Plan | Quota effect |
|---|---|
| Free | Default + achievement-based raises |
| Add-on Class | Same as Free |
| Pro | Same as Free (Pro affects test quota, not community quota) |
| **Unlimited** | Default + 1.5× multiplier on community quotas |

The Unlimited tier is the only one that directly raises community quotas — because Unlimited subscribers tend to also be heavier community participants. Pro subscribers do not get a community boost; they pay for unlimited testing, which is a separate axis.

## Common questions

### Can I save unused quota for tomorrow?

No — quota resets to your full daily cap at midnight PKT regardless of how much you used today.

### Are quotas per-account or per-CNIC?

Per-account. If you have multiple verified accounts (rare), each has its own quota. The CNIC denylist prevents most abuse here — bans propagate to the underlying CNIC, not just the account.

### What if I run out of votes mid-test?

Voting from inside a test runner does not consume your daily vote quota — that is a low-friction surface. Votes from the dedicated submission page or feed do consume quota.

### Can I trade quota with another user?

No. Quotas are per-account and not transferable.

### Why is the flag quota only 5?

Because 5 well-considered flags per day is more useful than 50 careless ones. Reviewer-tier achievements raise it for users who have demonstrated they flag accurately.

### Can I see my historical quota usage?

Your last 30 days of quota records are visible on `/app/community/my-activity`. Older records are aggregated.

## Next

- [Achievements](/docs/concepts/achievements) — the full list and the tier raises.
- [Voting](/docs/community/voting) — counts toward your daily vote quota.
- [Flagging](/docs/community/flagging) — counts toward your daily flag quota.
