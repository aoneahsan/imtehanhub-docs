---
id: bilingual
title: Bilingual model — Urdu and English, end-to-end
sidebar_label: Bilingual (UR + EN)
sidebar_position: 3
description: Every class, subject, chapter, and question carries an Urdu name. The language toggle flips labels and document direction to RTL when Urdu is active.
keywords:
  - bilingual exam app
  - Urdu English study app
  - RTL Pakistani app
  - urduName field model
  - localisation Pakistan
slug: /concepts/bilingual
---

# Bilingual model — Urdu and English, end-to-end

**The bilingual model** is the architectural decision to treat **Urdu and English as first-class citizens of every piece of content** — not an afterthought translation layer. Every class, every subject, every chapter, every question, and every UI label exists in both languages from the moment it is created.

> **TL;DR** — Toggle the language in the header. The whole UI re-renders, including layout (flips to RTL for Urdu), navigation labels, content names, question text, answer keys, and even the keyboard for input fields.

## Why bilingual from day one?

Most "bilingual" apps in Pakistan ship English-first and add Urdu later as a translation layer — usually third-party machine translation, often awkwardly broken on RTL layout. ImtehanHub takes the opposite approach: every content document carries both `name` (English) and `urduName` (Urdu) as required fields, validated by Zod schemas at ingestion time. A class without an `urduName` is rejected by the seed pipeline.

Three reasons this matters:

1. **Pakistani students think in both languages.** Most Class 5-8 students are taught in Urdu but read English textbooks. Most 1st-2nd Year FSc students are taught in English but discuss in Urdu. The right interface is one they can flip without losing their place.
2. **Question wording differs subtly.** A direct translation of an English MCQ often loses precision in Urdu. Native bilingual content lets us write the question correctly in each language rather than running it through a translator.
3. **RTL layout is more than text-direction.** Buttons, icons, padding, margins, breadcrumbs, even the chapter progress bar — they all need to flip. Doing it in CSS `:lang(ur)` selectors with a top-level `<html dir="rtl">` is much cleaner than retrofitting a left-to-right app.

## How the toggle works

ImtehanHub stores the language preference at two layers:

- **Local (always)** — in `@capacitor/preferences` (which transparently uses `localStorage` on the web). The current language is restored on every page load.
- **Remote (when signed in)** — synced to your user document so switching devices brings the same language with you.

When you click the EN / UR toggle in the header:

1. The Zustand `themeStore` updates `language: 'ur'`.
2. `<html dir>` is set to `rtl` (or `ltr` for English).
3. CSS variables for fonts switch — Urdu uses Noto Nastaliq Urdu / Jameel Noori Nastaleeq; English uses Inter.
4. All bound text re-renders. Every component reads either `class.name` or `class.urduName` based on the current language.
5. Navigation labels (Subjects, Dashboard, Profile, etc.) re-render from the i18n bundle.
6. Form inputs that accept Urdu (community submissions, comments) flip the keyboard hint.

## What gets translated

| Surface | Bilingual? |
|---|---|
| Class / subject / chapter names | **Yes** — `name` + `urduName` |
| Question text | **Yes** — `text` + `urduText` |
| Answer key | **Yes** — `answer` + `urduAnswer` |
| Topic tags | **Yes** |
| MCQ options (A/B/C/D) | **Yes** — option text in both languages |
| UI labels (Submit, Next, Profile, etc.) | **Yes** |
| Toast messages, error messages | **Yes** |
| Page titles + meta descriptions | English only (SEO is in English; Urdu sitemap is on the post-V1 roadmap) |
| Blog posts | One language per post (most are English; Urdu posts are tagged) |
| Knowledge base entries | One language per entry, with cross-link to the other when both exist |

## What does not get auto-translated

- **User-submitted comments** — kept in whatever language the user wrote, no translation.
- **User profile names** — your Google `displayName`, no transliteration.
- **Email subject lines** — currently English only.

## RTL layout details

Setting `dir="rtl"` flips:

- **Text direction** within paragraphs and headings.
- **Default flexbox direction** in many layouts (CSS logical properties).
- **Icon orientation** for arrow icons (back/forward icons swap visually).
- **Sidebar position** (sidebar moves to the right).
- **Breadcrumb separator direction** ("Home › Class 9 › Physics" becomes "طبیعیات › نہم جماعت › صفحہ اول" with separators going right-to-left).

What does NOT flip:

- **Numbers** — Urdu uses both Arabic numerals (0-9) and Eastern Arabic numerals (٠-٩); ImtehanHub displays Arabic numerals (0-9) for consistency with textbook conventions.
- **Code blocks** — code stays LTR even on Urdu pages.
- **English brand names within Urdu text** — preserved as-is.

## Bilingual gate (community submissions)

When a verified community member submits a question, **both English and Urdu fields are required**. The submission form uses Zod validation to block submit if either is missing. This is called the **bilingual gate** and exists because:

- One-language questions create gaps in the experience for the other language's users.
- Promoting a single-language community question to the official set would require a translation pass — which we want at submit-time, not later.

See the [Community module](/docs/credits) for the full submission flow including the bilingual gate.

## Fonts

ImtehanHub uses three font families:

- **Inter** — UI and body text in English.
- **JetBrains Mono** — code blocks, IDs, technical strings.
- **Noto Nastaliq Urdu** (with Jameel Noori Nastaleeq fallback) — all Urdu text.

The Urdu font loads only when needed (CSS font-display: swap), so English-only sessions do not pay the bandwidth cost.

## Common questions

### Can I write my answer in Urdu?

For Short and Long questions: yes. For MCQ: the answer is a button click, so language does not apply.

### Why does the question switch language but the option still shows in English?

Sometimes you will see this if the source data has the question text translated but the options are pending translation. This is a content-quality bug — please flag the question via the report button. The team treats single-side language gaps as a defect.

### Does the AI review work in Urdu?

AI review (BYOK) accepts Urdu answers if your API provider supports Urdu (OpenAI GPT-4 and Claude both do). The AI is asked to grade against the marking scheme regardless of language.

### Can I have a teacher account in English while my students use Urdu?

Yes — language is a per-user preference. Your account language does not affect anyone else.

## Next

- [Content hierarchy](/docs/concepts/content-hierarchy) — every level has both languages.
- [Question types](/docs/concepts/question-types) — MCQ, Short, Long all bilingual.
- [Pick your board](/docs/getting-started/pick-board) — board affects question phrasing within each language.
