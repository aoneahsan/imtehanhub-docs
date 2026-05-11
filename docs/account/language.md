---
id: language
title: Language toggle — English ↔ Urdu with full RTL
sidebar_label: Language toggle
sidebar_position: 3
description: Switch ImtehanHub between English and Urdu in one click. The language toggle in the app header flips every container label (Class / Subject / Chapter), navigation, buttons, and the document direction to RTL when Urdu is active.
keywords:
  - ImtehanHub Urdu mode
  - English Urdu bilingual app
  - RTL right to left Urdu
  - Pakistani exam app Urdu
  - language toggle app
slug: /account/language
---

# Language toggle

**The language toggle** in the app header flips ImtehanHub between English and Urdu. It changes every UI string, every taxonomy label (Class, Subject, Book, Chapter), the question stems and choices on bilingual content, and the document direction so the entire layout mirrors right-to-left when Urdu is active.

> **TL;DR** — Click EN / UR in the header. The app flips immediately. The choice persists across reloads and follows you to other devices when signed in.

## What changes when you flip

| Surface | English mode | Urdu mode |
|---|---|---|
| UI labels (Sign in, Take test, Profile) | English text | Urdu text |
| Container names (Class 9, Mathematics, Algebra) | `name` field | `urduName` field |
| Question stems and choices | English version | Urdu version (when available) |
| Buttons, menus, navigation | English | Urdu |
| Document direction (`<html dir>`) | `ltr` | `rtl` |
| Number digits in body copy | Arabic numerals (1, 2, 3) | Arabic numerals (we do not convert to Eastern Arabic) |
| Date format | `YYYY-MM-DD` / `MMM D, YYYY` | Same — dates are not localised yet |

The language toggle does **not** change the language of community submissions you read — those are stored bilingually and the active language picks the matching field.

## How container labels work

Every content entity in ImtehanHub carries both fields:

```ts
{
  name: 'Algebra and Trigonometry',
  urduName: 'الجبرا اور علم المثلث',
  // ...
}
```

The UI reads `name` in English mode and `urduName` in Urdu mode. If `urduName` is missing for a particular entity, the UI falls back to `name` so nothing breaks — but the entity is flagged as needing Urdu coverage and shown in the admin "Missing Urdu" list.

See the [bilingual model](/docs/concepts/bilingual) for the full design discussion.

## Question stems and choices

For questions, both languages live on the question doc:

```ts
{
  question: 'What is the chemical formula for water?',
  questionUrdu: 'پانی کا کیمیائی فارمولا کیا ہے؟',
  options: ['H2O', 'CO2', 'O2', 'NaCl'],
  optionsUrdu: ['ایچ ٹو او', 'سی او ٹو', 'او ٹو', 'این اے سی ایل'],
  // ...
}
```

A question shows the Urdu fields when Urdu is active **and** `questionUrdu` is non-empty. If Urdu is active but the Urdu translation is missing, the English version is shown with a small "Urdu coming soon" badge. We never silently drop the content.

Community submissions are different — the [bilingual gate](/docs/community/bilingual-gate) requires both languages at submission time, so community questions always have Urdu coverage.

## Right-to-left layout

When Urdu is active, the app sets `<html dir="rtl">`. CSS logical properties (`margin-inline-start`, `padding-inline-end`, etc.) cause the entire layout to mirror automatically: navigation flips, sidebars move to the right, icons that have directional meaning (next, previous) swap sides.

A handful of intentionally non-mirrored surfaces:

- Code blocks (always LTR — code is English-only).
- Numeric tables in subject pages where the column order matters.
- The leaderboard rank column.

Those use the `dir="ltr"` attribute locally to opt out of the global flip.

## Where the toggle lives

Three places to switch:

1. **App header** — a small EN / UR pill on every page, signed in or not.
2. **Profile page** — a more prominent card under Preferences with a short description.
3. **Per-question toggle** during a test — if you started a test in English and want to read this one question in Urdu (or vice versa), the question card has a small language flip that affects only that question.

The per-question flip does not change your global preference. Useful when a vocabulary question makes more sense in the source language.

## Persistence

The active language is stored on two layers, same pattern as the theme:

| Layer | Where | When it updates |
|---|---|---|
| Local | `@capacitor/preferences` (native) / `localStorage` (web) | Immediately on toggle |
| Remote | `users/{uid}.preferences.language` in Firestore | Debounced 500 ms after toggle (signed-in only) |

On a fresh browser or phone, the order is:

1. Read local preference. If present, apply.
2. If signed in, fetch remote preference. If newer, override local.
3. If neither exists, fall back to the device locale (Pakistani devices typically report `ur-PK`, so users get Urdu by default).

## The Urdu font

Body Urdu text uses **Noto Naskh Arabic** (Google Fonts), self-hosted to avoid third-party requests. Headings use a slightly heavier variant. Both ship with the standard ImtehanHub bundle so the first paint already has the Urdu font available — no FOIT (flash of invisible text) on Urdu-default users.

## Common questions

### Will all questions show in Urdu eventually?

Yes — that is the long-term goal. Official seeded content has partial Urdu coverage today (~70% of Class 9 and 10 MCQs). Community submissions are 100% bilingual by design. The admin "Missing Urdu" report drives the prioritisation.

### Can I read in Urdu but type my answers in English?

For MCQs you tap a choice — language doesn't matter. For Short / Long questions (community module), you write your answer; the language you write in is your call. Future grading rubrics may evaluate Urdu and English responses separately.

### What about Sindhi, Pashto, Punjabi, Saraiki, Balochi?

Not yet. Adding a third language is a substantial effort because the bilingual schema would become trilingual. We will revisit after Urdu coverage hits 90%.

### Does the language toggle affect search?

Yes — search at `/learn` and the visual sitemap match on the active language's field. A search for `الجبرا` only works when the index has Urdu coverage for that chapter.

## Next

- [Bilingual model](/docs/concepts/bilingual) — how the bilingual schema actually works.
- [Profile](/docs/account/profile) — your default board, display name, avatar.
- [Theme customizer](/docs/account/theme) — appearance and accent.
