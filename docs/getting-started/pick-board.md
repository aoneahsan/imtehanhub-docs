---
id: pick-board
title: Pick your board — Punjab, Federal, Sindh, KPK, Balochistan, AJK
sidebar_label: Pick your board
sidebar_position: 6
description: ImtehanHub supports all major Pakistani boards. Set your preferred board so question phrasing and exam style match the paper you will sit.
keywords:
  - Pakistani exam boards
  - Punjab board exam prep
  - Federal board MCQ
  - Sindh KPK Balochistan AJK
  - board-aligned study app
slug: /getting-started/pick-board
---

# Pick your board

**Pick your board** sets your preferred examination board so ImtehanHub can phrase questions, format the answer key, and surface past papers in the style of the board whose paper you will sit. Question content does not change — the **wording, layout, and emphasis** do.

> **TL;DR** — On the Profile page, set your preferred board to one of: **Punjab, Federal, Sindh, KPK, Balochistan, AJK**. Defaults to Federal if you skip the choice.

## What "board" means in Pakistan

In Pakistan, the **Board of Intermediate and Secondary Education (BISE)** is the authority that sets and grades the **Matric (Class 9-10)** and **Intermediate (1st-2nd Year)** exams. Each province has one or more BISEs, and the federal capital has its own.

The major boards on ImtehanHub:

| Board | Region | Common abbreviation |
|---|---|---|
| **Federal Board (FBISE)** | Islamabad Capital Territory + federal-affiliated schools nationwide | FBISE |
| **Punjab Board** | Punjab — multiple sub-boards (Lahore, Gujranwala, Multan, Faisalabad, Rawalpindi, Sahiwal, DG Khan, Sargodha, Bahawalpur) | PBISE / each city's BISE |
| **Sindh Board** | Sindh — multiple sub-boards (Karachi, Hyderabad, Sukkur, Larkana, Mirpurkhas) | SBISE / each city's BISE |
| **KPK Board** | Khyber Pakhtunkhwa — multiple sub-boards (Peshawar, Mardan, Swat, Abbottabad, DI Khan, Bannu, Kohat, Malakand) | KPK BISE |
| **Balochistan Board** | Balochistan (Quetta) | BBISE |
| **AJK Board** | Azad Jammu & Kashmir (Mirpur) | AJK BISE |

ImtehanHub treats sub-boards as variants of their parent board (Lahore Board questions are essentially Punjab Board questions with regional spelling). Setting **Punjab** covers all Punjab sub-boards.

## What changes when you set your board

| Surface | Without board set | With board set |
|---|---|---|
| Question wording | Generic Pakistani-curriculum style | Tuned to your board's paper style |
| MCQ option order | Standard A/B/C/D | Standard A/B/C/D (no change) |
| Past papers shown | All boards mixed | Your board first, others below |
| Topic emphasis | Even across syllabus | Weighted to topics your board emphasises |
| Exam-style mode | Generic | Mirrors your board's paper format (added 2026-04-25 onwards) |

What does **not** change: the underlying content (the same MCQ exists across boards), the textbook reference (page number stays accurate), the bilingual UI.

## How to set your board

1. Sign in (see [Sign in with Google](/docs/getting-started/sign-in)).
2. Open `/app/profile` (or click your avatar → Profile).
3. Find the **Preferred Board** select.
4. Pick one of: Federal, Punjab, Sindh, KPK, Balochistan, AJK.
5. Save.

The choice is stored on your user document at `users/{uid}.preferredBoardId`. ImtehanHub uses it the next time you open a chapter or take a test.

## What if you study under more than one board?

Some students (federal-employee families, military families, students who relocate) study under one board for Matric and a different one for Intermediate. ImtehanHub supports this:

- Switch your preferred board any time on the Profile page — the change is instant.
- Your **history** is not affected — past tests stay attached to whatever board you had set when you took them.
- **Bookmarks** are board-agnostic — you keep them across switches.

## What if you do not set a board?

ImtehanHub defaults to **Federal Board (FBISE)** style. Federal is the most "neutral" of the boards because:

- It is the only board whose syllabus is set centrally (others vary slightly).
- It is the board used by federal-affiliated schools across all provinces.
- Its question phrasing is closest to the textbook content.

If you are a student in Punjab, Sindh, KPK, Balochistan, or AJK, **set your board explicitly** — the difference is small but real, and you do not want to be surprised on exam day by phrasing you have not seen.

## Are all boards seeded equally?

The MCQ content is **the same set across boards** — currently 16,121+ MCQs covering 59 of 60 exam subjects. The board setting affects **presentation**, not which questions exist.

Past papers are **per-board** — Punjab past papers do not show up under Sindh, and vice versa. Past paper coverage varies; Federal and Punjab are the most complete.

## Boards and the Add-on Class plan

If you upgrade with the **Add-on Class** plan (PKR 99/mo), you unlock unlimited practice for **one specific class**. The class is yours regardless of board — switching board does not affect which class your add-on applies to. See [Quotas and plans](/docs/concepts/quotas-and-plans).

## Common questions

### Why does the same MCQ phrase differently between boards?

Boards adapt content to their teaching style. A Punjab Board MCQ might say "Which of the following statements is correct?" while a Federal Board MCQ on the same topic says "Choose the correct option." The underlying answer is identical.

### Can I see what board a past paper is from?

Yes — every past paper card shows board, year, paper number, and (where applicable) supplementary vs annual.

### What about Cambridge / O-Level / A-Level boards?

Out of scope. ImtehanHub focuses on Pakistani national-curriculum boards. Cambridge content has materially different syllabus, mark schemes, and grade thresholds.

### Does the leaderboard separate by board?

The current leaderboard is global (across all users and boards). A per-board view is on the post-V1 roadmap.

## Next

- [Pick your class](/docs/getting-started/pick-class) — Class 5 through 2nd Year.
- [Content hierarchy](/docs/concepts/content-hierarchy) — Class → Subject → Book → Chapter → Question.
- [The 3-test free trial](/docs/getting-started/free-trial) — what is included before sign-in.
