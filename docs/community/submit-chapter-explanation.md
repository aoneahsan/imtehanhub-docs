---
id: submit-chapter-explanation
title: Submitting a chapter explanation
sidebar_label: Submit Chapter Explanation
sidebar_position: 6
description: A chapter explanation is a standalone explainer for a full chapter or topic — bridging the gap between textbook prose and exam-ready understanding. The longest community contribution type.
keywords:
  - chapter explanation submission
  - community study notes Pakistan
  - exam explainer
  - peer-written textbook companion
slug: /community/submit-chapter-explanation
---

# Submitting a chapter explanation

**A chapter explanation** is a standalone explainer for a chapter or major topic — written by a student who has already studied it and wants to teach it back. Unlike MCQ / Short / Long submissions which test knowledge, a chapter explanation **delivers** knowledge. It is the longest community contribution type and the most impactful for other students.

> **TL;DR** — Pick chapter, write a 600-1500 word explanation in English + Urdu (translate later allowed), structure it with headings, attach diagrams or worked examples, submit. Other students rate it; high-rated explanations appear under the chapter on the public discovery pages.

## When to write a chapter explanation

Three good moments:

1. **Right after you have understood a chapter the textbook taught poorly.** The explanation is freshest in your head and you remember exactly which textbook sentences confused you.
2. **After a board exam where the chapter appeared.** You know which parts the exam emphasised and which were padding.
3. **When you tutor a younger sibling or classmate through the chapter.** Whatever you said to them probably belongs in the explanation.

If you are still confused about a chapter, do not write the explanation — read other students' explanations first and submit your own next year.

## Structure

A good chapter explanation has:

- **Lead paragraph** — what the chapter is about, in one or two sentences.
- **Why it matters** — what comes next in the curriculum that depends on this chapter.
- **Key concepts** — 3-7 numbered or bulleted concepts.
- **Worked examples** — 1-3 examples with full working (use rich-text or attached image).
- **Common confusions** — what students typically get wrong on this chapter.
- **Tips for the exam** — board-specific tips you have observed.
- **Further reading** — links or page references for students who want to go deeper.

The form does not enforce this structure rigidly, but the highest-rated explanations follow it.

## Form fields

Open `/app/community/contribute`, pick **Chapter Explanation**. Form:

| Field | Notes |
|---|---|
| **Class → Subject → Chapter** | Pick the chapter the explanation is for |
| **Title** | A short title — usually the chapter name + a hint of your angle ("Kinematics — the equations explained simply") |
| **Body — English** | 600-1500 words, rich-text editor (TipTap) with headings, lists, code, math |
| **Body — Urdu** | Same in Urdu — use the language toggle in the editor |
| **Author display name** | Defaults to your Google profile name; you can pick a pseudonym |
| **Resource images** | Up to 8 @ 8 MB — diagrams, scans, your own photos of working |
| **Tags** | 1-5 free tags |

## Writing in TipTap

The body editor is built with [TipTap 3](https://tiptap.dev) (the same editor used by the admin blog). It supports:

- Headings H1-H4.
- Ordered and unordered lists.
- Bold, italic, underline, strikethrough.
- Inline code and code blocks.
- Math via LaTeX (supported as of 2026-04 onwards).
- Image embeds (auto-uploaded to your Drive).
- Horizontal rules.

It does NOT support:

- Tables (use bullet lists instead).
- Embedded videos (link out instead).
- Custom HTML.

The output is sanitised for safety before storage and rendering. See `src/lib/sanitize-html.ts` in the source.

## Where chapter explanations appear

Once your explanation crosses the **eligibility threshold** (net votes ≥ 10, gross ≥ 15, no flags):

- It appears on the **chapter detail page** (`/subjects/:class/:subject/:chapter`) in a "Community explanations" section, ranked by votes.
- It appears in the **knowledge base** (`/learn`) under the chapter's tag.
- It is indexed by the search bar.

Public users (not signed in) can read approved explanations — they are part of the public discovery surface, not gated to authenticated users.

## Author attribution

Your **display name** is shown on the explanation. By default this is your Google profile name. You can:

- Use a pseudonym (any string you want; not validated).
- Submit anonymously (the explanation shows "Anonymous").
- Link to your other contributions (your contributor profile collects all your explanations + MCQs / Short / Long submissions).

If you are banned, your explanations stay live but the attribution flips to "Anonymous (former contributor)" — same policy as MCQ/Short/Long submissions.

## Bilingual considerations

Chapter explanations benefit most from being bilingual. A student who learned in Urdu often returns to read in English when the textbook switches them to English in higher classes — having both versions of the same explanation is valuable.

If you are only fluent enough to write in one language, **submit in that language** with "translate later" checked. A community Linguist (achievement-bearing) may translate it later.

## Common questions

### How long is too long?

Above ~2500 words, the explanation reads like an essay rather than a study aid. If you have more to say, split into multiple explanations (e.g. one per topic within the chapter).

### Can I include math?

Yes — LaTeX support was added in the 2026-04 release. Wrap math in `$...$` for inline or `$$...$$` for display.

### Can I link to YouTube videos?

Yes — but only as plain links (not embeds). The link format is preserved through sanitisation.

### Can I update my explanation after publishing?

Yes — chapter explanations are editable by the author indefinitely. (This differs from MCQ submissions which lock after the first vote.) Edits trigger a re-vote — anyone who voted on the previous version is asked to re-confirm.

### Can two contributors collaborate on one explanation?

Not directly. The submission has one author. You can co-write offline and submit under either author's name (with the other's permission).

## Common rejection reasons

- **Plagiarism.** Copy-pasted from a textbook publisher's PDF or another website.
- **Not actually about the chapter.** Off-topic or only tangentially related.
- **Misleading.** Contains factual errors that would confuse readers.
- **Promotional.** Pitches a tutoring service or other paid product.

## Next

- [Bilingual gate](/docs/community/bilingual-gate) — single-language submission rules.
- [Voting](/docs/community/voting) — eligibility rules apply equally to explanations.
- [Submitting an MCQ](/docs/community/submit-mcq) — the lighter contribution type.
