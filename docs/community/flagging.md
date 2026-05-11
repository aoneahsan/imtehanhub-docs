---
id: flagging
title: Flagging — process and consequences
sidebar_label: Flagging
sidebar_position: 9
description: Flag submissions you believe are wrong, off-topic, or low-quality. Confirmed flags strike the contributor; rejected flags strike the flagger. Pauses eligibility.
keywords:
  - flag community submission
  - moderator queue Pakistan
  - report wrong question
  - peer moderation
slug: /community/flagging
---

# Flagging

**Flagging** is the stronger negative signal in the ImtehanHub community module — used when a submission is wrong, off-topic, plagiarised, or otherwise unfit for the platform. Flags pause the submission's eligibility, surface it to a moderator queue, and produce a strike on either the contributor (if upheld) or the flagger (if rejected).

> **TL;DR** — Click the flag icon, pick a reason, optionally add a comment, submit. A moderator reviews. If they uphold your flag, the contributor gets a strike. If they reject your flag, you get a strike. Use flags only for genuine issues.

## When to flag

Flag when a submission is:

- **Wrong.** The marked correct answer is incorrect.
- **Off-topic.** The submission is about a different chapter than the one selected.
- **Plagiarism.** Copy-pasted from a copyrighted source.
- **Duplicate.** The same question already exists.
- **Misleading.** The question phrasing tricks the student in a way the textbook does not.
- **Low quality.** The options are obviously bad (massive length differences, "All of the above" without justification).

Do **not** flag for:

- "I disagree with the difficulty rating" — use a downvote instead.
- "I prefer different phrasing" — use a downvote.
- "The chapter is hard" — that is your problem, not the submission's.
- "The community member who submitted this is annoying" — flag the behaviour, not the person.

## How to flag

Open any submission detail page (`/community/submission/:id`) and click the **flag icon**. A dialog appears:

| Field | Notes |
|---|---|
| **Reason** | One of: Wrong answer, Off-topic, Plagiarism, Duplicate, Misleading, Low quality, Other |
| **Comment** | Free-text — explain what specifically is wrong, with reference to a textbook page or rule |
| **Severity** | Defaults based on the reason; can be adjusted (low / medium / high) |

Click **Submit flag**. Your flag is written to `communityFlags/{id}` with status `open`. The submission's `activeFlagCount` is incremented atomically, which immediately removes it from the eligibility pool (it stops appearing in tests until resolved).

## What happens after you flag

1. **The flag enters the moderator queue.** Visible at `/admin/community/flags` to admins and promoted moderators.
2. **The submission is paused** — it no longer appears in tests via the source picker until the flag closes.
3. **The contributor sees** that their submission has been flagged (with the reason and comment, but flagger identity is hidden by default).
4. **A moderator** picks up the flag, investigates, and resolves it as either **Upheld** or **Rejected**.
5. **An audit log entry** is written for the flag action.

## What moderators see

Moderators see:

- The submission itself.
- The flag reason + your comment.
- Your flagging history (other flags you have raised, with their outcomes).
- The contributor's submission history.
- Any other open flags on the same submission.
- Voting history on the submission.
- Your identity (so they can see if you are the contributor's known competitor — bad-faith flag).

## Outcomes

### Upheld

The moderator agrees your flag is correct. Three sub-outcomes:

- **Submission corrected** — a moderator or admin edits the submission to fix the issue. The submission re-enters eligibility.
- **Submission removed** — the submission is removed from active pools but kept in the audit log.
- **Submission stays with note** — for borderline cases, the moderator may add a public note instead of removing.

In all three, **the contributor receives a strike**.

### Rejected

The moderator disagrees with your flag. Two outcomes:

- **The submission re-enters eligibility** (the active flag count drops back to whatever it was minus 1).
- **You, the flagger, receive a strike.**

The flagger-strike rule is essential to the flagging system. Without it, flagging would be a free way to harass other contributors. With it, flagging is a serious action — you only flag when you are confident.

## Strike consequences

Strikes accumulate. **5 strikes = permanent ban** with the contributor's CNIC hash added to the denylist (preventing re-registration). See [Strikes, bans, denylist](/docs/community/strikes-bans).

Strikes do not auto-expire. An admin can manually pardon a strike if you appeal — but the bar for pardons is high.

## Daily flag quota

Default: **5 flags per day**. The quota is intentionally low — you should not be flagging more than 5 things in a day on a healthy community. Raised by Reviewer-track achievements (which require accurate flagging history).

## What if I flag in error?

You can **withdraw an open flag** from your "My flags" page (`/app/community/my-flags`). The flag is closed, the submission re-enters eligibility, no strike is issued. Withdrawal is documented in the audit log and counts against your "Reviewer accuracy" — too many withdrawals signal flag-bombing.

## What if a moderator decides wrong?

Comment on the moderator's resolution explaining your reasoning. An admin can override a moderator decision (this is rare). For genuine miscarriages, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Flag versus downvote

| Use a downvote when… | Use a flag when… |
|---|---|
| The submission is mediocre but not wrong | The submission is factually wrong |
| You disagree with phrasing | The submission is plagiarised |
| The difficulty rating seems off | The submission is off-topic |
| The options could be tighter | The submission breaks a rule |

The simple test: would you be comfortable explaining to a moderator why this submission should not appear in tests? If yes, flag. If no, downvote.

## Common questions

### Can I flag my own submission?

Yes — it is the documented way to request your own submission's deletion. Flag with reason "Other" and comment explaining you wish to withdraw. No strike issued for self-flagging.

### Can I see who else flagged the same submission?

You see the count of open flags. Identities are visible only to moderators.

### Can my flag be private?

The reason and comment are visible to the contributor. Your identity is hidden from the contributor by default. Admins can always see flagger identity for accountability.

### What if the moderator is a friend of the contributor?

Moderators are required to recuse themselves from flags involving people they know personally. The audit log makes recusal violations detectable.

## Next

- [Voting](/docs/community/voting) — the lighter signal.
- [Strikes, bans, denylist](/docs/community/strikes-bans) — what strikes lead to.
- [Becoming a moderator](/docs/community/moderator) — the hybrid promotion flow.
