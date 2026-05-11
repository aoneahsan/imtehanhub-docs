---
id: comments
title: Comments on submissions
sidebar_label: Comments
sidebar_position: 10
description: Verified members can comment on community submissions to discuss the question, suggest improvements, or flag issues — bilingual, admin soft-delete.
keywords:
  - community comments ImtehanHub
  - submission discussion
  - peer feedback
  - bilingual comments
slug: /community/comments
---

# Comments on submissions

**Comments** are short threaded discussions on a community submission's detail page. Use them to clarify your reasoning, suggest improvements, share an alternative approach, or ask the contributor to fix something. Comments are bilingual-friendly, admin-moderable, and **do not** affect voting or eligibility.

> **TL;DR** — Open a submission, scroll to the Comments section, write your comment in English or Urdu, submit. Daily comment quota is 5 (raised by Voter achievements). Comments are visible to all verified users.

## Who can comment

Only **verified contributors** (CNIC-verified). Sign-in alone is not enough — same trust gate as voting, flagging, and submitting.

## Where comments live

Each submission's comments are at `communityComments/{submissionId}/items/{commentId}` — a Firestore subcollection. The submission document carries a denormalised `commentCount`. Sorted reverse-chronological (newest first) by default.

## What to write

Three productive uses:

1. **Clarify your downvote.** "I downvoted because option C is also technically correct under the alternate convention used in the Federal Board edition." This helps the contributor understand and possibly improve.
2. **Suggest an improvement.** "The wording 'always equal' is too strong — perhaps 'usually equal' is more accurate. See p. 47 paragraph 3."
3. **Ask a clarifying question.** "Is this question targeting the Federal or Punjab board phrasing? They differ on whether velocity is treated as a vector here."

What not to use comments for:

- **Personal attacks.** Do not insult the contributor. Comments are public; bad behaviour stays in the audit log.
- **Substituting for a flag.** If something is wrong, flag it. Comments are for discussion, not moderation.
- **Spam, ads, or off-topic links.**

## Comment moderation

Admins can soft-delete any comment with a reason. Soft-deletion replaces the visible content with `[Comment removed by moderator: <reason>]` while keeping the audit record. Repeated comment deletions count toward Reviewer-track accuracy and can lead to strikes (commenting strike, not a separate strike type — counted alongside flagger strikes).

Admins do **not** delete comments for disagreement; they delete only for policy violations (insults, spam, ads, off-topic).

## Daily comment quota

Default: **5 per day**. Raised by Voter and Reviewer achievements that signal you are a good-faith community member. The quota resets at midnight Pakistan Standard Time.

The 5/day default is intentionally low to prevent comment-bombing. A healthy contributor leaves a few high-quality comments rather than a flood.

## Bilingual comments

You can write a comment in any language. Comments are **not** translated automatically. The comment is rendered in the language you wrote it; readers see it in that language regardless of their UI preference.

If you want both languages, write two comments (one English, one Urdu) — they thread separately. Most contributors only need one.

## Notifications

The contributor of a submission receives a notification when:

- Someone comments on their submission for the first time today.
- Someone replies to their own comment.

Notifications respect your push-notification preferences (off by default — opt in on `/app/profile`). See the Notifications page (lands in Batch 4).

## Comments and the audit log

Every comment write and delete is recorded in `communityAuditLogs`. The audit log is the source of truth for who said what and when, and it is **append-only** — even if a comment is deleted, the deletion event itself is logged.

## Common questions

### Can I edit a comment after posting?

For 5 minutes after posting. After that, the comment is locked to preserve the conversation context for everyone who has already read it. If you need a substantive correction, post a follow-up comment.

### Can I reply to a comment?

Yes — replies thread one level deep (not infinite nesting). Replies notify the parent comment's author.

### Can I delete my own comment?

Yes — within 5 minutes of posting. After that, the comment is permanent (you can request admin deletion if there is a real reason).

### What if someone insults me in a comment?

Flag the comment (the comment carries a small flag icon). The admin reviews. Insults typically lead to a strike for the commenter.

### Are comments visible to the public?

No — only to verified members. Public users see the submission and votes, but not the discussion.

### Can comments contain images?

No. Comments are text-only. If you need to share an image, attach it to a fresh submission or use a chapter explanation.

## Common rejections

A comment that is plain insult or off-topic gets soft-deleted. Repeat offenders accumulate strikes. Five strikes = permanent ban (same rule as for submissions).

## Next

- [Voting](/docs/community/voting) — discuss in comments and vote separately.
- [Flagging](/docs/community/flagging) — when discussion is not enough.
- [Daily quotas](/docs/community/quotas) — comment quota and how to raise it.
