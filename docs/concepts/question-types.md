---
id: question-types
title: Question types — MCQ, Short, Long
sidebar_label: Question types
sidebar_position: 2
description: ImtehanHub supports three question types — MCQ, Short, and Long. Each one tests a different skill and is graded differently. Here is when to use which.
keywords:
  - MCQ short long question
  - Pakistani exam question types
  - exam preparation modes
  - objective subjective questions
slug: /concepts/question-types
---

# Question types — MCQ, Short, Long

**Question types** describe the three forms a question can take on ImtehanHub: **MCQ (multiple-choice)**, **Short** (a 1-3 sentence written answer), and **Long** (a structured multi-paragraph answer with diagrams or working). Each type tests a different skill and is graded by a different mechanism.

> **TL;DR** — Use **MCQ** for daily fast practice and recall. Use **Short** to drill key facts and definitions you must write from memory. Use **Long** for full exam-style practice with marking-scheme breakdowns.

## At a glance

| Type | Time / question | Auto-graded? | Best for | Typical seeded count per chapter |
|---|---|---|---|---|
| **MCQ** | ~30-60 seconds | Yes | Daily practice, recall, recognition | 20-50 |
| **Short** | ~2-3 minutes | Yes (text comparison + AI review optional) | Definitions, formulas, key facts | 5-15 |
| **Long** | ~10-15 minutes | Self-grade with marking scheme + optional AI review | Exam-style practice | 3-8 |

## MCQ (multiple-choice)

The default mode. Each MCQ has:

- A question stem (e.g. "What is the SI unit of force?").
- 4 options labelled A, B, C, D.
- Exactly one correct option.
- A textbook page reference attached to the correct answer.

MCQs are auto-graded — instant score on submit. They are the highest-volume content on ImtehanHub: **16,121+ MCQs** across 59 of 60 exam subjects (one subject still missing because no free online source exists).

When to use MCQ:

- **Daily practice.** A 10-MCQ test takes 5-7 minutes. Easy to fit into a study day.
- **Pre-lesson recall.** Run an MCQ set before opening your textbook to see what you already know.
- **Pre-exam revision.** A 50-MCQ test across a full chapter highlights weak topics fast.
- **Streak maintenance.** Even a 3-question MCQ counts toward your daily streak.

## Short questions

A short question is a written-answer question expecting **1-3 sentences** or a small worked example. Examples:

- "State Newton's second law of motion."
- "Define the term 'matrix' and give an example of a 2×2 matrix."
- "Briefly explain why rust forms on iron."

Short questions are graded by:

1. **Text comparison** — your answer is normalised (lowercase, whitespace-trim, common-synonym substitution) and checked against the model answer. Exact and near-exact matches are auto-graded as correct.
2. **AI review (optional, BYOK)** — if you have provided your own OpenAI or Claude API key (Bring Your Own Key — see the [Credits](/docs/credits) page for the rationale), ImtehanHub can ask the AI to grade based on the marking scheme rather than literal match.

Short answers test **active recall** more rigorously than MCQs because guessing is impossible.

## Long questions

A long question expects a structured, multi-paragraph response, sometimes with a diagram or worked steps. Examples:

- "Derive the equation of motion v² = u² + 2as from first principles."
- "Discuss the causes and consequences of the partition of British India in 1947."
- "Solve the following system of equations using matrix inversion: ..."

Long questions are **self-graded with a marking scheme**. After you submit your answer, ImtehanHub shows:

- A **model answer** (full solution or sample structured response).
- A **marking scheme** breaking the answer into 1-mark and 2-mark components.
- A **self-grade slider** — you assign yourself a mark out of the total based on what you wrote.

If you have BYOK enabled, the **AI review** can read your written answer (text or photo of handwriting via OCR) and produce a draft mark-by-mark grade based on the scheme. You always have the final say.

## Topic-level filtering inside a chapter

When configuring a test, you can filter by **topic within a chapter**. For example, in Class 9 Physics → Kinematics, you can pick only "Equations of motion" topics and skip "Vectors". The filter applies across all three question types — pick MCQ + topic filter to drill exactly the questions you want.

## How questions are sourced

Two sources, marked clearly:

- **Official** — seeded by the ImtehanHub content pipeline from publicly-available Pakistani textbook content (ilmkidunya.com, gotest.pk, board past papers). Validated, page-referenced, version-controlled.
- **Community** — submitted by verified students through the [Community module](/docs/credits). Voted on by other users, flagged if wrong, moderated, and (if approved) promoted into the official set.

You choose the mix on the test configuration page using the **test source picker** — official-only, community-only, or a slider between the two.

## Question quality controls

Every question, regardless of source, must have:

- A **textbook page reference** (so you can verify in your own book).
- A **bilingual version** (English + Urdu).
- At least one **topic tag** (drives per-topic breakdown).
- A **difficulty rating** (1-5 scale, used to balance test difficulty).
- A **report button** — flag a wrong question and the admin reviews it. See [Flagging](/docs/credits) for the community-flag flow.

## Common questions

### Why are some chapters MCQ-only?

Short and Long content is being rolled out per subject. The pipeline scrapes free Pakistani textbook content, validates it, and seeds it into Firestore. As of the latest snapshot, MCQs are seeded for nearly every subject; Short and Long are partial. Subjects without Short / Long yet show only the MCQ option on test configure.

### Is the AI review accurate enough to trust for a real exam?

It is **a draft grader**, not the official grader. AI review (when enabled via BYOK) gives you a starting point for self-grading. Always read the marking scheme and adjust. For high-stakes practice, take a Long question paper, hand-grade with the scheme, then optionally use AI to spot what you missed.

### Can I submit my own MCQ / Short / Long question?

Yes — verified community members can submit any of the three types. See the [Community module](/docs/credits) for the verification flow and submission rules.

### Do question difficulties get tuned over time?

Yes. As students take tests, the system tracks the success rate per question. A question that 95% of students get right is downgraded in difficulty; a question that 30% of students get right is upgraded. The recalibration runs as part of the maintenance pass.

## Next

- [Content hierarchy](/docs/concepts/content-hierarchy) — where questions sit in the tree.
- [Bilingual model](/docs/concepts/bilingual) — Urdu and English versions of every question.
- [Quick Start](/docs/getting-started/quick-start) — take your first MCQ test.
