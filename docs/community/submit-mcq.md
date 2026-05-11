---
id: submit-mcq
title: Submitting an MCQ
sidebar_label: Submit MCQ
sidebar_position: 3
description: Step-by-step guide to writing and submitting a multiple-choice question through the ImtehanHub community module — bilingual fields, validation rules.
keywords:
  - submit MCQ ImtehanHub
  - community MCQ submission
  - bilingual question writing
  - exam MCQ contribution
slug: /community/submit-mcq
---

# Submitting an MCQ

**An MCQ submission** is the most common community contribution on ImtehanHub. You write a multiple-choice question with four options, mark the correct one, attach a textbook page reference, and submit. Other verified students vote on it; if it crosses the [eligibility threshold](/docs/community/voting) it joins the chapter's MCQ pool for real tests.

> **TL;DR** — Open `/app/community/contribute`, pick the chapter, fill the form (English + Urdu strongly recommended), attach a page reference, optionally attach a textbook image, submit. Cross the threshold (net ≥ 10, gross ≥ 15, no flags) and your MCQ appears in tests.

## Before you start

You need:

- A verified account (see [CNIC verification](/docs/community/cnic-verification)).
- A specific chapter in mind — submissions are always tied to a chapter, not a subject in general.
- The textbook page where the answer is found.
- Both the English and Urdu version of the question — you can submit single-language with "translate later" checked, but both are required for promote-to-official.

## The form

Open `/app/community/contribute`. Pick **MCQ** as the type. The form has:

### 1. Class → Subject → Chapter

Three cascading dropdowns, same as the test configuration screen. Pick the chapter your question belongs to.

### 2. Question text — English

The question stem in English. Keep it short and unambiguous. Aim for under 30 words.

Examples of good MCQ stems:

- "What is the SI unit of force?"
- "Which of the following is a vector quantity?"
- "Which equation describes the second law of motion?"

Avoid:

- Negation traps ("Which of the following is NOT...?") — they confuse non-native English speakers.
- Multiple-correct phrasing ("Which of the following statements are correct?") — MCQ is for one correct answer.

### 3. Question text — Urdu

The same question in Urdu. The text input flips to RTL automatically. Use standard textbook-style Urdu, not colloquial.

### 4. Four options

Each option needs **both languages**. Write Option A through D for English first, then the Urdu equivalents.

Conventions for good options:

- **All four options should be plausible.** A random absurd option lowers the question's quality.
- **Similar length across options.** A noticeably longer option signals the right answer.
- **No "All of the above" / "None of the above"** unless the chapter genuinely teaches them as a concept. They are usually a sign of a weak question.

### 5. Mark the correct option

A radio group (A / B / C / D). Exactly one correct option.

### 6. Textbook page reference

Format: `Publisher Class Subject, p. <page>`. Example: `Punjab Textbook Board Class 9 Physics, p. 47`.

The form auto-suggests the publisher based on the selected chapter — you usually only type the page number. The reference appears below the correct answer on the result page so anyone testing can verify.

### 7. Topic tags

Pick 1-3 sub-topics from the chapter's topic list. Topic tags drive the per-topic breakdown on the result page (see [Submit and read your result](/docs/tests/submit-and-result)) and the topic filter (see [Topic filters](/docs/tests/topic-filters)).

### 8. Difficulty

A 1-5 slider:

- 1: Recall (definition, formula).
- 2: Recognition (identify the right item from a set).
- 3: Application (apply a known method).
- 4: Analysis (multi-step reasoning).
- 5: Synthesis (combine ideas, harder than typical board exam).

Be honest. The difficulty seeds the chapter's distribution, which feeds the test difficulty balance.

### 9. Optional resource images

Attach up to **8 images at 8 MB each** (image/* only). Useful for:

- A scan of the textbook page (so reviewers can verify the page reference).
- Your own diagram (helps for geometry, physics, biology questions).
- A working that supports the answer.

Images upload to your own Google Drive at `ImtehanHub/Attachments/{submission-id}/` and a public-link URL is stored on the submission. Like CNIC, the images live in your Drive — not on ours.

### 10. "Translate later" checkbox

If you only have one language ready, check **"I'll translate later"** to bypass the bilingual requirement at submission time. Single-language submissions can still be voted on but **cannot be promoted to official** until both languages are present.

## Submitting

Click **Submit**. ImtehanHub:

1. Validates the form via Zod (chapter must exist, options must be filled, correct option must be marked, etc.).
2. Checks your **daily quota** — submissions are capped at 10/day for default users (see [Daily quotas](/docs/community/quotas)).
3. Writes the submission to `communitySubmissions/{id}` with status `pending`.
4. Writes an audit log entry.
5. Navigates you to your submission's detail page (`/community/submission/:id`).

Your submission is **immediately visible** on the chapter's community pool — other verified students can vote and flag from the moment you submit.

## What happens next

| Phase | Trigger | Outcome |
|---|---|---|
| Voting | Other verified students vote | Net + gross vote counts climb |
| Eligibility | Net ≥ 10 AND gross ≥ 15 AND no flags | Your MCQ joins the chapter's official-pool-via-source-picker |
| Flagging | Anyone flags | Eligibility paused, flag goes to moderator queue |
| Promotion | Admin reviews high-quality eligible submissions with both languages present | Your MCQ is **promoted to official** — it appears in default tests for everyone, regardless of source picker setting |

## Common rejection reasons

Submissions can be flagged and removed for:

- **Wrong answer.** The marked correct option is not actually correct.
- **Bad source.** The page reference does not contain the answer.
- **Duplicate.** The same question already exists in the official set or another community submission.
- **Off-topic.** The question is not about the selected chapter.
- **Bilingual mismatch.** The English and Urdu versions ask different things.
- **Plagiarism.** The question is copy-pasted from a copyrighted source (a third-party paid test prep service).

A flag for any of these reasons goes to the moderator queue. If upheld, you receive a [strike](/docs/community/strikes-bans).

## Common questions

### Can I edit my submission after submitting?

Yes, until the first vote is cast. After voting starts, edits would change the question that voters already saw — the form locks. You can withdraw and re-submit if needed (at the cost of a new submission and lost votes).

### Can I see who voted on my submission?

You see vote counts (net up, net down, gross). Individual voter identities are not shown to you (privacy). Moderators can see voter details when investigating flags.

### How long until my MCQ becomes eligible?

Depends on chapter activity. Popular chapters (Class 9-10 Physics) cross the threshold within hours. Niche chapters may take days. Promotion to official is faster for high-quality submissions in active chapters.

### What if my MCQ is correct but the textbook is wrong?

This happens — Pakistani textbooks have known errata. Note in the question's submitter notes (a free-form field) that the textbook contains an error. Moderators will weigh accuracy of the underlying physics/math/etc. over the textbook page.

## Next

- [Bilingual gate](/docs/community/bilingual-gate) — when single-language is OK and when both are required.
- [Voting](/docs/community/voting) — how the threshold actually works.
- [Submitting a short question](/docs/community/submit-short) — the next submission type to try.
