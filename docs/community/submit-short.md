---
id: submit-short
title: Submitting a short question
sidebar_label: Submit Short
sidebar_position: 4
description: How to write and submit a short-answer question through the ImtehanHub community module — bilingual stem, expected key points, validation rules.
keywords:
  - submit short question
  - community short answer
  - exam short question Pakistan
  - bilingual short answer
slug: /community/submit-short
---

# Submitting a short question

**A Short submission** is a written-answer question where the expected answer is **1-3 sentences** or a small worked example. ImtehanHub's auto-grader uses normalised text comparison (with optional AI review for BYOK users) — so writing a clean **model answer** and a list of **accepted alternatives** matters more than for an MCQ.

> **TL;DR** — Pick chapter, write the question (English + Urdu strongly recommended), write the model answer, list 2-3 acceptable alternative phrasings, submit. The accepted alternatives are what makes auto-grading fair across natural variation in student answers.

## What a Short tests

A Short should require the student to **actively recall** a fact, definition, formula, or short procedure. Examples:

- "State Newton's second law of motion."
- "Define the term 'matrix' and give an example of a 2×2 matrix."
- "What is the difference between speed and velocity?"
- "Why does iron rust faster in moist air than dry air?"

Avoid:

- **Long-form questions disguised as Short.** "Discuss the causes of the partition of British India" is a Long question, not a Short.
- **Questions that allow many equally-correct phrasings without bound.** Auto-grading needs predictability; a Short whose answer can be 50 different equally-good sentences is a poor fit.
- **Questions whose correct answer is a single word.** Those should be MCQ.

## The form fields

Open `/app/community/contribute`, pick **Short** as the type.

| Field | Notes |
|---|---|
| **Class → Subject → Chapter** | Same cascading dropdowns as MCQ |
| **Question text — English** | The question stem |
| **Question text — Urdu** | Same question in Urdu (or check "translate later") |
| **Model answer — English** | The canonical correct answer, 1-3 sentences |
| **Model answer — Urdu** | Same in Urdu |
| **Accepted alternatives** | A list of equally-correct phrasings (one per line) |
| **Page reference** | Where the answer appears in the textbook |
| **Topic tags** | 1-3 sub-topics |
| **Difficulty** | 1-5 |
| **Resource images** | Optional, up to 8 @ 8 MB |

## Writing a clean model answer

The model answer is what the auto-grader compares student answers against. Three principles:

1. **Use textbook phrasing.** The student is likely to write something close to what their textbook says. Match the textbook style.
2. **Be specific without padding.** "F = ma" is a better model answer than "Force equals mass multiplied by acceleration, where force F is measured in newtons, mass m in kilograms..." Padding lowers match rates.
3. **No alternatives in the model.** Put alternatives in the alternatives field, not in the model answer.

Examples:

| Question | Good model answer | Bad model answer |
|---|---|---|
| State Newton's second law. | F = ma | Newton's second law states that the net force on an object equals the product of its mass and acceleration. |
| Define a matrix. | A rectangular array of numbers arranged in rows and columns. | A matrix is a useful mathematical object that helps us solve systems of equations and represent linear transformations in many areas of science and engineering. |

The bad versions are not wrong — they're just hard to text-compare. They go in the "accepted alternatives" list instead.

## Accepted alternatives — the secret weapon

The auto-grader normalises the student's answer (lowercase, whitespace-trim, common-synonym substitution) and compares against the model AND every accepted alternative. A student matches if they hit any of them.

For "State Newton's second law of motion", good alternatives include:

- "F equals m a"
- "Force = mass times acceleration"
- "F = m × a"
- "Net force equals mass multiplied by acceleration"

The more high-quality alternatives you list, the fewer correct students get auto-marked wrong. Aim for **3-6 alternatives** per Short.

## How auto-grading works

When a student submits a Short answer:

1. Their answer is normalised: lowercased, multiple spaces collapsed, punctuation neutralised, common synonyms substituted ("equals" ↔ "=", "times" ↔ "multiplied by").
2. The normalised answer is compared (substring + edit-distance) to the model and every accepted alternative.
3. If any match passes the threshold, the answer is marked correct.
4. Otherwise, marked incorrect.

If the student has **BYOK enabled** and asks for AI review on the question, an LLM is asked to grade the student's answer against the model — this catches semantically-correct answers that the text comparison missed. See [Review mode](/docs/tests/review-mode).

## Bilingual considerations

For Urdu Short answers, the auto-grader handles the same normalisation in Urdu (Unicode normalisation, RTL whitespace handling). Accepted alternatives in Urdu are equally important — Urdu is more synonym-rich than English in many domains, so list more variants.

If you submit in only English with "translate later", the Urdu UI shows the question in English with a "Translation pending" badge. Other Urdu-only students cannot meaningfully test this Short until you (or a moderator) translates it.

## Common questions

### How many accepted alternatives is "enough"?

Three minimum, six is comfortable. Any answer your students might reasonably write should be covered.

### What if a student writes a correct answer I did not anticipate?

They can flag the question with reason "answer is correct, was marked wrong". The flag goes to the moderator queue. The moderator can add their phrasing to the accepted alternatives — at that point, future students with the same phrasing are auto-graded correctly.

### Should I include the formula and the prose version?

Yes — different students phrase differently. Include both the formula form ("F = ma") and the prose form ("Force equals mass times acceleration") in the alternatives.

### What about diagrams?

Short questions are text-only. If the answer fundamentally requires a diagram (e.g. "Draw the diagram of a parallel circuit"), use Long instead.

## Next

- [Submitting a long question](/docs/community/submit-long) — for multi-paragraph + diagram answers.
- [Bilingual gate](/docs/community/bilingual-gate) — when both languages are required.
- [Voting](/docs/community/voting) — what happens to your Short after submission.
