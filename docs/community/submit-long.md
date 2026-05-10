---
id: submit-long
title: Submitting a long question
sidebar_label: Submit Long
sidebar_position: 5
description: How to write and submit a long-answer question with a marking scheme through the ImtehanHub community module. Long questions are self-graded with optional AI review.
keywords:
  - submit long question
  - exam long answer
  - marking scheme breakdown
  - structured answer Pakistan
slug: /community/submit-long
---

# Submitting a long question

**A Long submission** is a multi-paragraph or worked-example question where the expected answer takes **10-15 minutes**. Long questions cannot be auto-graded by string comparison — they are **self-graded with a marking scheme** that you, the contributor, write alongside the question. Optional BYOK AI review can produce a draft mark.

> **TL;DR** — Pick chapter, write the question, write a **model answer**, write a **marking scheme** breaking the answer into 1-mark or 2-mark components. The student writes their answer, reads the scheme, and self-grades.

## What a Long tests

Long questions are for content that genuinely needs structured prose, derivations, or step-by-step working. Examples:

- "Derive the equation of motion v² = u² + 2as from first principles."
- "Discuss the causes and consequences of the partition of British India in 1947."
- "Solve the following system of equations using matrix inversion: [matrix here]."
- "Explain the photosynthesis process with a labelled diagram."

Avoid:

- **MCQs in disguise.** "What is the SI unit of force?" is an MCQ, not a Long.
- **Open-ended essays without a clear marking scheme.** "Discuss the meaning of life" cannot be marked.
- **Questions that depend on diagrams the contributor has not provided.** If the answer requires a diagram, attach a reference image.

## Form fields

Open `/app/community/contribute`, pick **Long**. Form:

| Field | Notes |
|---|---|
| **Class → Subject → Chapter** | Same cascading dropdowns |
| **Question text** | English + Urdu (or "translate later") |
| **Total marks** | Usually 5, 8, or 10 — match the textbook convention for Long questions |
| **Model answer** | English + Urdu — the full sample correct answer |
| **Marking scheme** | A list of mark-bearing components — see below |
| **Page reference** | Where the relevant content is in the textbook |
| **Topic tags** | 1-3 sub-topics |
| **Difficulty** | 1-5 |
| **Resource images** | Up to 8 @ 8 MB — diagrams, equations as images |

## The marking scheme

A marking scheme is a structured list of components, each worth a specific number of marks. For "Derive v² = u² + 2as" worth 5 marks, a scheme might be:

| Component | Marks |
|---|---|
| State that v = u + at | 1 |
| State that s = ut + ½at² | 1 |
| Substitute t = (v - u) / a from the first equation | 1 |
| Algebraic simplification with correct steps | 1 |
| Final form v² = u² + 2as | 1 |
| **Total** | **5** |

For a "Discuss the causes of the partition" worth 10 marks:

| Component | Marks |
|---|---|
| At least 3 distinct causes named | 3 |
| Each cause explained with date / event reference | 3 |
| At least 2 consequences described | 2 |
| Concluding analysis paragraph | 2 |
| **Total** | **10** |

The scheme should be **specific enough that two graders agree** but **flexible enough that students with different phrasings can earn marks**.

## How students answer Long questions

When a student takes a Long-mode test:

1. The question loads with a textarea (or rich-text editor for math/diagrams).
2. The student writes their answer (no auto-save token limit; tests have been submitted with 1500-word answers).
3. On submit, the student sees:
   - Their own answer.
   - Your model answer.
   - Your marking scheme.
   - A self-grade slider (0 to total marks).
4. The student assigns themselves a mark based on which scheme components they covered.
5. If they have BYOK enabled, they can ask the AI to grade their answer against the scheme — the AI returns a draft component-by-component grade, which the student can accept, adjust, or reject.

## Why self-grading?

Two reasons:

1. **Auto-grading subjective long-form answers is unreliable.** Even GPT-4 / Claude get this wrong about 20% of the time on real Pakistani board questions. Self-grading with a clear scheme, on the other hand, is mostly accurate because the scheme constrains the student.
2. **Self-grading itself is the learning.** Reading the scheme and identifying which components your answer covered is a form of active study. Students who self-grade carefully tend to remember the scheme structure better than students who get a binary auto-mark.

## Bilingual considerations for Long

The marking scheme is bilingual but the **scheme itself is the same in both languages** (it is structural, not linguistic). The model answer is bilingual.

If you submit Long in only English with "translate later", Urdu students can still take the test with the English question and English scheme — many Pakistani students are comfortable reading English questions even when their preferred UI is Urdu.

## Resource images for Long

Long questions are the most likely type to need images. Common cases:

- A circuit diagram for "Calculate the equivalent resistance".
- A chemistry mechanism diagram.
- A geometry figure for "Prove that triangle ABC is congruent to triangle XYZ".
- A historical map for partition / geography questions.

Attach up to **8 images at 8 MB each**. Images upload to your own Google Drive (`ImtehanHub/Attachments/`).

## Common questions

### Can I write a Long without a model answer?

No — the Zod schema rejects submissions without a model answer. The model is what the scheme ties back to.

### What if the textbook gives multiple acceptable approaches?

Write the scheme around the **most common textbook approach** but include a note in the model answer like "Note: an equally valid approach uses [alternative method] — students using this approach earn the same marks for analogous components." Moderators may extend the scheme over time.

### How long should my Long question take to write?

A high-quality Long submission takes 10-15 minutes (model answer + scheme + at least one diagram check). Plan for it.

### What if a student says my scheme is unfair?

They can flag the question with reason "scheme is unfair / incomplete". Goes to the moderator queue. If upheld, the scheme is revised.

## Next

- [Submitting a chapter explanation](/docs/community/submit-chapter-explanation) — the longest contribution type.
- [Voting](/docs/community/voting) — what happens to your Long after submit.
- [Review mode](/docs/tests/review-mode) — the AI review flow for Long questions.
