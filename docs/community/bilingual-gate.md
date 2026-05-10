---
id: bilingual-gate
title: Bilingual gate — when both languages are required
sidebar_label: Bilingual gate
sidebar_position: 7
description: Community submissions can be single-language at submit time, but both English and Urdu are required to be promoted to the official question set. Here is how the gate actually works.
keywords:
  - bilingual gate ImtehanHub
  - Urdu English submission
  - translate later
  - promote to official
slug: /community/bilingual-gate
---

# Bilingual gate — when both languages are required

**The bilingual gate** is the rule that says a community submission must have **both English and Urdu versions** to be promoted to the official question set. At **submit time**, you can submit a single-language version with "translate later" checked. At **promote-to-official time**, the gate enforces both.

> **TL;DR** — Submit single-language is fine for voting and chapter visibility. Both languages are required for the admin to promote your submission to the **default-tested official set**. Translate later is supported.

## Why the gate exists

ImtehanHub is bilingual end-to-end (see [Bilingual model](/docs/concepts/bilingual)). Every official class, subject, chapter, and question carries both `name`/`urduName` and `text`/`urduText`. Promoting a single-language community submission would create gaps in the official set — Urdu-only students suddenly seeing English questions, or vice versa.

Two implementation reasons:

1. **Auto-graded fairness.** A Short question with only an English model answer auto-grades incorrectly for a student writing in Urdu.
2. **AI translation is not safe enough.** Running an LLM to backfill the missing language has a 5-10% error rate on technical content (formulas, named entities, board-specific phrasing). The bilingual gate forces a human translator in the loop.

## Submit-time vs promote-time

| Stage | English required? | Urdu required? |
|---|---|---|
| Submit (with "translate later" checked) | One of the two | One of the two |
| Submit (without "translate later") | Yes | Yes |
| Voting eligibility (net 10, gross 15, no flags) | Whatever was submitted | Whatever was submitted |
| Appears in source picker for tests | Yes (single-language is enough) | Yes (single-language is enough) |
| **Promote to official** | **Yes — required** | **Yes — required** |

So a single-language submission can:

- Receive votes.
- Cross the eligibility threshold.
- Appear in tests via the [source picker](/docs/tests/source-picker) when students opt for community questions.

But it cannot become **default-tested official content** until the missing language is filled in.

## How "translate later" works

When you check "I'll translate later" on the submission form:

- One of the two language fields is allowed to be empty (or set to "translation pending").
- The submission is created with a `translationStatus: 'pending-{language}'` flag.
- It appears in your "My submissions" list with a badge "Translation pending".
- Other verified members in the **Linguist** track (community achievement) see it in their "Help translate" queue.

You can return at any time and add the missing translation yourself. Or a Linguist may translate it.

## Who can translate

Three paths:

1. **The original submitter** — opens their submission and adds the missing language. No verification needed beyond their own.
2. **A Linguist achievement holder** — community member with the Linguist achievement (earned by N successful translations passing the bilingual gate) can volunteer.
3. **An admin** — admins can translate any submission directly.

Every translation goes through the same form. The translator is named separately from the original author on the submission record.

## What counts as "both languages present"

The bilingual gate checks that:

- The question text is present in both languages.
- For MCQ: all four options are present in both.
- For Short / Long: the model answer is present in both.
- For chapter explanations: the body is present in both, with at least 80% overlap in section structure.

The check is **structural, not semantic** — a translation that is structurally complete but semantically lazy (literal word-for-word that loses meaning) can still pass the gate but is likely to be flagged by users on quality grounds.

## What if the submission is in only Urdu?

Same rules apply with the languages swapped. ImtehanHub does not privilege English — many Class 5-8 Urdu-medium students prefer to write in Urdu first. The gate enforces both languages regardless of which one was submitted first.

## Promotion to official also requires no active flags

In addition to bilingual completeness, promote-to-official requires:

- The submission has crossed the eligibility threshold (net 10, gross 15).
- `activeFlagCount === 0` — no open flags.
- An admin's explicit approval.

So the bilingual gate is **necessary but not sufficient** for promotion.

## Common questions

### What if my translation has minor errors?

Submit it. Other students will flag specific issues; you can fix them.

### Can I submit Urdu first and translate to English later?

Yes — the gate is symmetric.

### Does the bilingual gate apply to comments?

No. Comments can be in any single language.

### Does it apply to flag reasons?

No. Flag reasons can be in any single language; moderators understand both.

### Is there a bilingual gate for the chapter explanation's body?

Yes — both languages required for promotion. But chapter explanations are not promoted into the question pool (they are public-facing study aids), so the practical impact is that single-language explanations stay community-only and do not appear on the chapter's "Official explanations" surface.

### What about questions in Pashto / Punjabi / Sindhi?

Currently out of scope. ImtehanHub is bilingual (Urdu + English) end-to-end. Regional-language support is on the post-V2 roadmap.

## Next

- [Submitting an MCQ](/docs/community/submit-mcq) — the form has the "translate later" checkbox.
- [Promote to official](/docs/community/promote-to-official) — the admin flow that the gate guards.
- [Bilingual model](/docs/concepts/bilingual) — the broader design rationale in Core Concepts.
