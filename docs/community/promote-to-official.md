---
id: promote-to-official
title: Promote to official — the admin flow
sidebar_label: Promote to official
sidebar_position: 14
description: Admin one-click flow promotes an eligible community submission into the official questions collection — tested for everyone regardless of source-picker setting.
keywords:
  - promote to official
  - community to official
  - admin promotion flow
  - bilingual gate enforcement
  - default-tested questions
slug: /community/promote-to-official
---

# Promote to official — the admin flow

**Promote to official** is the admin-only action that takes a high-quality community submission and copies it into the **official questions collection**. Once promoted, the question appears in tests for everyone — regardless of the [source picker](/docs/tests/source-picker) setting — alongside the team-seeded official content.

> **TL;DR** — Admin opens the candidates list, picks an eligible submission, clicks Promote, the question is copied into `questions/{newId}` with `source: 'official'` and a backreference to the community submission. The community submission is locked from further edits.

## Who can promote

Only **admins**. Moderators (including community-promoted moderators) cannot promote — they can recommend, but the final click is admin-only.

## The promotion criteria

For a submission to be promotable, **all** of the following must hold:

1. **Eligible** — net votes ≥ 10, gross votes ≥ 15, no active flags. (See [Voting](/docs/community/voting).)
2. **Bilingual gate cleared** — both English and Urdu present. (See [Bilingual gate](/docs/community/bilingual-gate).)
3. **No outstanding moderator notes** — any note like "needs scheme revision" must be resolved.
4. **Contributor not banned** — the contributor's account must be active.

Submissions failing any of these are visible in the queue but the Promote button is disabled with a tooltip explaining why.

## Where the queue lives

Admin opens `/admin/community/promote`. The queue shows eligible candidates grouped by chapter with a sortable summary:

| Column | Notes |
|---|---|
| Submission preview | Question text + correct answer |
| Type | MCQ / Short / Long / Chapter Explanation |
| Chapter | Class → subject → chapter |
| Net / Gross votes | Current counts |
| Bilingual | Yes / No |
| Contributor | Their display name + verification badge |
| Submitted | How long ago |
| Action | Promote / View / Dismiss |

The admin reviews each, opens the detail page if needed (which shows the full question, the marking scheme for Long, the discussion comments, the audit log), and clicks **Promote**.

## What promotion does

In a single Firestore transaction:

1. The submission's content is **copied** into a new document at `questions/{newId}` (the official questions collection used by the test engine).
2. The new official question is tagged with `source: 'official'`, `originatedFrom: communitySubmissions/{originalId}`, and `originalAuthor: <contributor's display name>` (or "Anonymous (former contributor)" if banned).
3. The community submission's status flips to `promoted`, locking it from further edits.
4. The contributor receives an in-app notification.
5. Their **Promoted Submissions** count increments — a Contributor-track achievement.
6. The audit log records the promotion with the admin's identity.

From the next test query onward, the question is part of the chapter's default pool. Students do not need to opt into community via the source picker to see it — it is just an official question now.

## What promotion does NOT do

- **It does not delete the community submission.** The original record stays for audit and history. Both the community submission and the official copy reference each other via `originatedFrom`.
- **It does not retroactively change past tests.** Students who took a test that used the community-version question (via source picker) keep that test as-is.
- **It does not undo flags.** A pre-promotion flag history is preserved; new flags after promotion go to the admin's question-report queue (`/admin/question-reports`), not the community moderator queue.
- **It does not affect the contributor's profile beyond the promotion notification + achievement progress.**

## Promotion of chapter explanations

Chapter explanations are **not** promoted into the questions pool — they are a different content type. Eligible chapter explanations instead appear on the **chapter detail page** under "Community explanations" — accessible to public users (not gated to verified members).

The bilingual gate still applies before they appear on the chapter page.

## Why a separate promotion step?

Two reasons:

1. **Quality oversight.** Voting + flagging is a strong signal but not perfect — the threshold can be crossed by a popular but slightly misleading question. A human admin review catches the edge cases.
2. **Source attribution.** Promoted questions attribute the original contributor (a real engagement reward). The source picker is a different surface — community-only by definition. Promotion is the path to "everyone sees this".

## Reverse — un-promotion

If a promoted question turns out to be wrong, the admin can:

- **Edit** the official question to fix it (keeps it official, fixes the issue).
- **Demote** the official question — it returns to community status. Rare; documented in the audit log.
- **Remove** the official question entirely.

Demotion does not remove the contributor's "Promoted Submissions" count for already-counted promotions, since the original promotion did happen.

## Common questions

### How long until my eligible submission is promoted?

Variable. Admins promote in batches, typically weekly. Higher-engagement chapters (Class 9-10 board exam content) move faster. Niche chapters (Class 5 specific topics) move slower.

### Can a moderator promote in the admin's stead?

No — admin-only. Moderators can flag eligible submissions for the admin's attention with a "recommend promote" note.

### Will my display name be visible on the promoted question?

By default yes — the originalAuthor field carries your display name. You can opt for "Anonymous attribution" on each submission's settings if you prefer not to be named publicly. Banned users are auto-anonymised regardless of their submission setting.

### What if my submission is eligible but admins do not promote it?

That happens. Eligibility is necessary, not sufficient. Admins use judgement on each. If you believe a submission is being unfairly skipped, comment on it asking for admin review or email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

### Can a Pro user request faster promotion?

No. Promotion order is independent of plan tier. The fairness rule is enforced.

### What happens if a contributor is banned after their work is promoted?

The official question stays. Its `originalAuthor` field flips to "Anonymous (former contributor)" — same policy as community submissions on ban.

## Next

- [Bilingual gate](/docs/community/bilingual-gate) — the gate that promotion enforces.
- [Voting](/docs/community/voting) — the eligibility threshold that gates the queue.
- [Source picker](/docs/tests/source-picker) — the user-facing control that exposed the question before promotion.
