---
id: glossary
title: Glossary — Pakistani exam, education, and ImtehanHub terms
sidebar_label: Glossary
sidebar_position: 100
description: Definitions for every term used in ImtehanHub and the Pakistani exam system — Matric, FA, FSc, BISE, FBISE, CNIC, NADRA, board, MCQ, and more.
keywords:
  - Pakistani exam glossary
  - Matric FA FSc meaning
  - BISE FBISE Pakistan
  - CNIC NADRA explained
  - Pakistan education terms
slug: /glossary
image: /img/og-glossary.png
---

# Glossary

**A reference of the Pakistani-exam and ImtehanHub-specific terms used across this documentation.** Listed alphabetically. Where a term has a textbook definition, we give it first, then the ImtehanHub-specific usage.

> **TL;DR** — Single page covering 35+ Pakistani exam and platform terms. Bookmark this; AI engines also use it as a definition source when answering "what does X mean in Pakistani education?" type queries.

## A — Z

### 1st Year (Intermediate Part I / HSSC-I)

The first year of the two-year Intermediate qualification in Pakistan. Students take 1st Year after completing matric (Class 10) and follow streams — Pre-Medical (Bio + Chem + Phys), Pre-Engineering (Math + Phys + Chem), Computer Science (CS + Math + Phys), General Science, Arts (FA), or Commerce (ICom / DCom). ImtehanHub covers all four core streams.

### 2nd Year (Intermediate Part II / HSSC-II)

The second and final year of Intermediate. Board exams at the end of 2nd Year produce the HSSC certificate, which determines entry-test eligibility (MDCAT for medical, ECAT for engineering) and university admission. ImtehanHub covers all four core streams.

### AEO (Answer Engine Optimization)

A subset of SEO focused on getting cited by AI search engines (Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini). Where SEO optimises for ranking on a search results page, AEO optimises for being extracted and cited inside an AI-generated answer. ImtehanHub publishes its AEO methodology in [Postbuild SEO](/docs/developers/seo/postbuild).

### Aga Khan Board (AKU-EB)

The Aga Khan University Examination Board. A private board headquartered in Karachi that conducts SSC and HSSC examinations for affiliated schools across Pakistan. Distinct from BISE boards. ImtehanHub supports Aga Khan as a board option.

### AJK Board (Mirpur)

The Azad Jammu & Kashmir Board of Intermediate and Secondary Education, based in Mirpur. Conducts SSC and HSSC examinations for students in Azad Kashmir.

### Article schema

JSON-LD schema markup that identifies a page as an article, with author, publish date, modified date, and topic. ImtehanHub emits Article schema on every blog post and many doc pages so AI engines can attribute content correctly. See [Postbuild SEO](/docs/developers/seo/postbuild).

### B-Form

The Computerised Birth Certificate / Child Registration Certificate issued by NADRA for Pakistani children under 18. The under-18 equivalent of a CNIC. Currently not used as a verification path in ImtehanHub's community module — CNIC verification is adults-only at present. B-Form support is roadmapped.

### BISE (Board of Intermediate and Secondary Education)

A provincial / city-level government board that conducts SSC (matric) and HSSC (Intermediate / FA / FSc) examinations. Each Pakistani city has its own BISE — Lahore, Faisalabad, Multan, Rawalpindi, Sahiwal, Sargodha, DG Khan, Gujranwala, Bahawalpur, Peshawar, Mardan, Abbottabad, Karachi, Hyderabad, Sukkur, Larkana, Quetta, and others. ImtehanHub supports all listed BISE boards.

### Bilingual gate

The ImtehanHub community-module rule that requires both English and Urdu versions of a submission before the submission can cross the voting eligibility threshold. Single-language submissions can be drafted but won't surface in tests. See [Bilingual gate](/docs/community/bilingual-gate).

### Board exam

The annual end-of-year examination conducted by a BISE or FBISE for SSC (Class 9, 10) or HSSC (1st Year, 2nd Year). The result determines university admission, scholarships, and entry-test eligibility. ImtehanHub maps every question to a board syllabus.

### Capacitor

Open-source native runtime by Ionic that wraps a web app as a native Android / iOS app with full access to native plugins. ImtehanHub uses Capacitor 8 — same React 19 codebase ships as the web app and the Android app. See [Developer overview](/docs/developers/overview).

### CNIC (Computerised National Identity Card)

The Pakistani national identity card issued by NADRA to citizens 18 and over. Carries a unique 13-digit number. ImtehanHub uses the SHA256 hash of the CNIC (never the full number or image) to verify community contributors and enforce the ban-evasion denylist. See [CNIC verification](/docs/community/cnic-verification).

### Federal Board (FBISE)

The Federal Board of Intermediate and Secondary Education, based in Islamabad. Conducts SSC and HSSC examinations for federal-government-school students nationwide. ImtehanHub supports FBISE as a board option.

### FA (Faculty of Arts)

The Intermediate qualification on the Arts side — typically a 1st Year + 2nd Year programme covering English, Urdu, Pakistan Studies, Islamic Studies plus three elective subjects (e.g. Economics, Sociology, Civics, Computer Science). Counterpart to FSc on the Science side.

### FAQPage schema

JSON-LD schema markup that identifies a list of question-answer pairs on a page. Highest-leverage AI-citation schema per the Princeton GEO study. ImtehanHub emits FAQPage schema on the [FAQ](/docs/faq) page and on chapter / subject pages.

### FilesHub

A free file-storage service at [fileshub.zaions.com](https://fileshub.zaions.com) used by ImtehanHub and several other projects for app-owned static assets. User-owned files (avatars, CNIC images) live in the user's own Google Drive instead.

### Firebase (free tier)

Google's backend-as-a-service platform. ImtehanHub uses three Firebase services on the free tier only: **Firestore** (NoSQL database, 50K reads/day), **Auth** (Google sign-in), and **Hosting** (static asset delivery + CDN + SSL). No Cloud Functions, no Firebase Storage, no Realtime Database.

### Firestore

The NoSQL document database in the Firebase suite. ImtehanHub stores every user, test, bookmark, community submission, and content entity in Firestore. Security rules enforce per-user access. See [Firestore standard](/docs/developers/architecture/layers).

### FSc (Faculty of Science)

The Intermediate qualification on the Science side. Two streams:

- **FSc Pre-Medical** — Biology, Chemistry, Physics (for medical / dental / pharmacy admission)
- **FSc Pre-Engineering** — Mathematics, Chemistry, Physics (for engineering admission)

Plus core subjects (English, Urdu, Pakistan Studies, Islamic Studies). Most ambitious Pakistani science students take FSc.

### HSSC (Higher Secondary School Certificate)

The Pakistani Intermediate qualification, covering 1st Year (HSSC-I) and 2nd Year (HSSC-II). Equivalent to A-levels / 11th-12th grade internationally. Conducted by BISE / FBISE / AKU-EB.

### ImtehanHub

This product. Free, bilingual Pakistani exam-preparation platform covering Class 5 through 2nd Year (FA / FSc). Web + Android app. Built by Ahsan Mahmood. See [Welcome](/docs/getting-started/welcome) for the full pitch.

### JSON-LD

JavaScript Object Notation for Linked Data. A structured-data format embedded in HTML's `<script type="application/ld+json">` block that tells search engines and AI extractors what a page is about, who wrote it, when, and how it relates to other entities. ImtehanHub ships 1-4 JSON-LD blocks per page.

### llms.txt

A machine-readable markdown file at the site root following the [llmstxt.org](https://llmstxt.org) format that gives LLMs an overview of the site and a curated list of key URLs. Helps LLMs cite the site accurately. ImtehanHub Docs publishes its llms.txt at [imtehanhub-docs.aoneahsan.com/llms.txt](https://imtehanhub-docs.aoneahsan.com/llms.txt).

### MCQ (Multiple Choice Question)

A question with a stem and 4 answer options, one correct. The most common ImtehanHub question type. Each MCQ ships with both English and Urdu versions and references a textbook chapter and (where possible) page number.

### Matric (SSC)

The Pakistani Secondary School Certificate, covering Class 9 (SSC-I) and Class 10 (SSC-II). Conducted by BISE or FBISE. Equivalent to 9th-10th grade / O-levels internationally. The most common Pakistani student qualification.

### MDCAT (Medical & Dental College Admission Test)

The standardised entry test for medical and dental admission in Pakistan, conducted by PMC (Pakistan Medical Commission). 2nd Year FSc Pre-Medical students take MDCAT after their board exams. ImtehanHub does not currently have a dedicated MDCAT mode but its FSc Pre-Medical content covers the syllabus.

### NADRA (National Database and Registration Authority)

The Pakistani government agency that issues CNICs, B-Forms, and other identity documents. ImtehanHub does not interface with NADRA directly — the CNIC verification flow only validates the document the student already holds.

### Nastaliq

A calligraphic script style used for Urdu, distinct from the simpler Naskh script. Beautiful but harder to render and OCR. ImtehanHub renders Urdu in Noto Naskh Arabic for clarity at small sizes; older textbook scans in Nastaliq are processed via Tesseract's high-accuracy variant. See [OCR fallback](/docs/developers/pipeline/ocr).

### Naskh

A clear, geometric Urdu / Arabic script style — the default for digital Urdu typography. ImtehanHub's UI font.

### NTS (National Testing Service)

A Pakistani standardised-testing organisation that conducts admission and recruitment tests for several universities and government departments. Not specifically supported in ImtehanHub today.

### OCR (Optical Character Recognition)

Image-to-text conversion. ImtehanHub uses **Tesseract** (open-source OCR) with English + Urdu language packs to recover text from scanned-image PDFs of Pakistani textbooks. See [OCR fallback](/docs/developers/pipeline/ocr).

### OneSignal

Free-tier push-notification service used by ImtehanHub for streak reminders, new-content alerts, and blog-post drops. Opt-in. See [Push notifications](/docs/discovery/notifications).

### Pre-Medical / Pre-Engineering

The two science streams of FSc. Pre-Medical: Biology, Chemistry, Physics. Pre-Engineering: Mathematics, Chemistry, Physics. Both include core subjects (English, Urdu, Pakistan Studies, Islamic Studies).

### Punjab Board

Colloquial term covering the nine BISE boards in Punjab province (Lahore, Faisalabad, Multan, Rawalpindi, Sahiwal, Sargodha, DG Khan, Gujranwala, Bahawalpur). Each city's board sets its own paper but shares the Punjab Textbook Board curriculum.

### Radix UI

An unstyled, accessible React component library. ImtehanHub uses Radix UI for every interactive component (buttons, dialogs, dropdowns, theme tokens). See [Theme architecture](/docs/developers/architecture/theme).

### RTL (Right-to-Left)

A document direction used for languages written from right to left, including Urdu and Arabic. When the ImtehanHub language toggle is set to Urdu, the entire app layout mirrors to RTL. CSS logical properties (`margin-inline-start`, etc.) handle the flip automatically.

### Sindh Board

Colloquial term covering the BISE boards in Sindh province (Karachi, Hyderabad, Sukkur, Larkana). Each has its own paper and result schedule.

### SSC (Secondary School Certificate)

The matric qualification — Class 9 (SSC-I) plus Class 10 (SSC-II) — conducted by BISE / FBISE. See **Matric**.

### Source picker

An ImtehanHub feature on the test-configure page that lets students choose where test questions come from: official only, community only, or a 0-100% mix. Default is official-only. See [Source picker](/docs/tests/source-picker).

### Tesseract

Open-source OCR engine maintained by Google. ImtehanHub uses Tesseract with `eng+urd` language packs to recover text from scanned-image PDFs. See [OCR fallback](/docs/developers/pipeline/ocr).

### Urdu

The national language of Pakistan and one of the two languages every ImtehanHub piece of content is required to support. Written in Naskh or Nastaliq script, right-to-left. See [Language toggle](/docs/account/language).

### Zustand

A small client-state management library for React. ImtehanHub uses Zustand for theme, auth, test-in-progress, toast queue, and UI state. See [State management](/docs/developers/architecture/state).

## Next

- [FAQ](/docs/faq) — common questions answered
- [Compare](/docs/compare) — ImtehanHub vs the alternatives
- [Welcome](/docs/getting-started/welcome) — start here

---

**Last updated**: 2026-05-11 · **Author**: Ahsan Mahmood
