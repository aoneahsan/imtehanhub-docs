---
id: faq
title: ImtehanHub FAQ — every question students, parents, and teachers ask
sidebar_label: FAQ
sidebar_position: 99
description: Direct answers to the questions students, parents, and teachers ask about ImtehanHub — pricing, content coverage, privacy, mobile app, community, and more.
keywords:
  - ImtehanHub FAQ
  - Pakistani exam app questions
  - free exam prep Pakistan
  - matric FSc app questions
  - student parent FAQ
slug: /faq
image: /img/og-faq.png
---

# ImtehanHub FAQ

**ImtehanHub is a free, bilingual (Urdu + English) Pakistani exam-preparation platform** for students from Class 5 through 2nd Year (FA / FSc). Every MCQ, short question, and long question is keyed to the official textbook chapter and page. The web app and Android app share one account. This page answers the questions students, parents, and teachers ask most often.

> **TL;DR** — Free for 3 tests, then PKR 299/mo Pro or stay on Free with 3 tests/day. Class 5 to 2nd Year. Punjab, Federal, Sindh, KPK, Balochistan, AJK boards. Bilingual with full Urdu RTL. Google sign-in only. No credit card to start.

## About the product

### What is ImtehanHub?

ImtehanHub is a Pakistani exam-prep platform covering Class 5 through 2nd Year (FA / FSc). It pairs an official question bank seeded from Pakistani textbooks with a peer-contributed community module. Students take MCQ, short, and long question tests; track streaks, bookmarks, and stats; and earn achievements. The app is built by **Ahsan Mahmood** ([aoneahsan.com](https://aoneahsan.com)).

### Who is ImtehanHub for?

Three audiences:

- **Students** from Class 5 (10-11 years old) through 2nd Year (17-18 years old) preparing for board exams or revising during the school term.
- **Parents** who want their child to practice without screen-time bargaining over which YouTube channel is "study."
- **Tuition academies and small schools** that want a shared question bank and aggregate progress visibility across a roster (see [Institutes overview](/docs/institutes/overview)).

### What makes ImtehanHub different from other Pakistani exam apps?

Four deliberate choices:

| | ImtehanHub | Most competitors |
|---|---|---|
| Price floor | Free forever, 3 tests/day | Free trial then paywall |
| Language | Bilingual (EN + UR) with full RTL | Mostly English-only |
| Question source | Official textbooks + community peer review | Single-source, less transparent |
| Mobile | Native Android app (Capacitor) + web | Web-only or low-quality wrappers |

We do **not** claim to be the largest, the best-rated, or the most-downloaded. The platform is intentionally honest about what it does and doesn't do.

### Is ImtehanHub officially affiliated with any board (Punjab, Federal, BISE)?

No. ImtehanHub is an independent platform. Content is mapped to board syllabi and textbook chapters, but the boards themselves do not endorse, sponsor, or review the content.

## Pricing and plans

### Is ImtehanHub free?

Yes — the Free tier is permanent. You get 3 tests per day, 10 per week, 30 per month, on one selected class, with a light banner ad shown between test sets. No credit card required to start.

### How much do paid plans cost?

| Plan | Price | What you get |
|---|---|---|
| Free | PKR 0 | 3 tests/day, 1 class, light ads |
| Pro | PKR 299/mo or PKR 2,499/year | Unlimited tests, 1 class, no ads |
| Unlimited | PKR 599/mo | Unlimited tests, all classes (Class 5 → 2nd Year), no ads |
| Add-on Class | PKR 99/mo | Adds one extra class on top of Free or Pro |

Yearly Pro saves roughly two months. Cancel any time. Full details: [Billing](/docs/account/billing).

### How do I pay?

We use **[aoneahsan.com/payment](https://aoneahsan.com/payment?project-id=imtehanhub&project-identifier=com.aoneahsan.imtehanhub)** as the payment landing page. It accepts international cards plus major Pakistani methods — bank transfer, EasyPaisa, JazzCash. No card details are stored on our servers; the payment processor handles all PCI-sensitive data.

### Can I get free Pro?

Yes — **three** successful referrals = **one** automatic free month of Pro. Every account ships with a 6-character referral code on the Profile page. Share it; when three friends sign up using your code, the Pro grant lands automatically. Stack the milestones (6 referrals = 2 months, 9 = 3 months). See [Referrals](/docs/account/referrals).

### Is there a student discount?

The base price is already targeted at Pakistani students. Institutes get bulk pricing — see [Institutes overview](/docs/institutes/overview). For one-off discount requests in genuine hardship cases, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Content coverage

### Which classes are covered?

Class 5, 6, 7, 8, 9, 10, 1st Year (FA / FSc), and 2nd Year (FA / FSc). Classes 5–8 have core-subject coverage; 9–12 have all 8 subjects per board fully seeded.

### Which boards are supported?

Punjab (Lahore, Faisalabad, Rawalpindi, Multan, Sahiwal, Sargodha, DG Khan, Gujranwala, Bahawalpur), Federal (FBISE Islamabad), Sindh (Karachi, Hyderabad, Sukkur, Larkana), KPK (Peshawar, Mardan, DI Khan, Kohat, Swat, Bannu, Abbottabad, Malakand), Balochistan (Quetta), AJK (Mirpur), and Aga Khan + Punjab examination commission variants. See [Pick your board](/docs/getting-started/pick-board).

### How many questions are there?

As of mid-2026, the seeded official question bank has **~16,000 MCQs** across Class 9–12 (~4,000–5,000 per class across all 8 subjects). Short and long questions are rolling out subject-by-subject. The community module adds peer-contributed questions that get tested by students after voting eligibility — see [Community overview](/docs/community/overview).

### What about Class 5 Computer Science?

That's the one gap. No free online source carries Class 5 CS coverage today, so the chapter is partial and being filled manually. See [Pipeline overview](/docs/developers/pipeline/overview).

### Is the content accurate?

Every MCQ is keyed to a textbook chapter (and where possible, a page number). The seed pipeline runs schema + content checks before any question lands in the database — see the [validation step](/docs/developers/pipeline/overview). Errors do happen; report them via the in-app feedback button on any question, or email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

## Bilingual and Urdu

### Does ImtehanHub support Urdu?

Yes — fully. Every UI label, every question stem and choice, and every taxonomy label (Class, Subject, Chapter) has an Urdu rendering. A toggle in the header flips between English and Urdu. When Urdu is active, the document direction flips to RTL and the entire layout mirrors automatically. See [Language toggle](/docs/account/language).

### Is every question available in Urdu?

Official seeded content has partial Urdu coverage today (~70% of Class 9 and 10 MCQs). Community submissions are 100% bilingual by design — the [bilingual gate](/docs/community/bilingual-gate) requires both languages before a submission becomes eligible. The "Missing Urdu" admin report drives prioritisation.

### What font is used for Urdu?

**Noto Naskh Arabic** (Google Fonts), self-hosted to avoid third-party requests. Headings use a slightly heavier variant. Pakistani Urdu uses Nastaliq script too, which is harder to recognise programmatically — we use Naskh for clarity at small sizes and accept that calligraphic textbooks won't render exactly as their print versions.

### What about Sindhi, Pashto, Punjabi?

Not yet. Adding a third language is a substantial schema change (bilingual → trilingual). We will revisit after Urdu coverage hits 90%.

## Privacy and data

### What data does ImtehanHub store about me?

Plain inventory:

- Your Google email + UID, display name, profile photo URL.
- Your tests (questions, your answers, scores, durations, timestamps).
- Your bookmarks (just the foreign keys).
- Aggregate stats (total tests, accuracy, best/weakest chapter).
- Your plan tier and theme/language preferences.
- If you opted into the community module: a SHA256 hash of your CNIC + last-4 digits + a Drive file ID (the image itself never leaves your Google Drive).

Full inventory and retention rules: [Privacy overview](/docs/privacy/overview).

### Where does the CNIC image live?

In **your own Google Drive**, never on our infrastructure. We hold only the SHA256 hash, last-4 digits, and the Drive file ID. The full reasoning + threat model: [CNIC handling](/docs/privacy/cnic).

### Can I delete my account?

Yes, self-service. Open `/app/profile` → Delete account → type your email to confirm. Cascade purges within minutes — user doc, tests, bookmarks, leaderboard entry, verification record. Community submissions stay (re-attributed to "Anonymous (former contributor)") because other students depend on them. Full details: [Data deletion](/docs/account/data-deletion).

### Do you track me with cookies or ad pixels?

No third-party ad pixels — no Facebook Pixel, no TikTok Pixel, no LinkedIn Insight Tag. We use first-party bundled SDKs for Firebase Analytics, Amplitude, and Microsoft Clarity (the last with input masking, never identifying). See [Privacy overview](/docs/privacy/overview) for full third-party processor list.

### Is the app GDPR-compliant?

Pakistan does not yet have a comprehensive personal-data protection law. We apply a GDPR-equivalent baseline regardless — right to access (data export), right to deletion (self-service), right to correction, right to know (this site), right to object. Email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) for written DSAR requests.

## Mobile app

### Is there an Android app?

Yes — built with Capacitor, available on Google Play and as a sideloadable APK. Same account as the web; your data syncs automatically. See [Installing the Android app](/docs/mobile/install).

### Is there an iOS app?

Not yet. The iOS build is feature-ready but Apple Developer Account approval is pending. Pakistani student market is ~95%+ Android so we prioritised Android first. iOS users have a high-quality web experience on Safari (PWA installable to home screen, push notifications via Safari 16.4+).

### Does the app work offline?

Yes. Cached chapters can be read offline. Tests in cached chapters work fully offline — answers queue locally and sync when you reconnect. Bookmarks load instantly. Streaks compute locally. Community submissions (submit / vote / flag / comment) require online because of the CNIC trust gate. See [Offline mode](/docs/mobile/offline).

### What permissions does the app ask for?

Only when you actively use the feature: Internet (always), Notifications (opt-in), Camera (for CNIC / avatar uploads), Photos (alternative to camera), Network state (offline detection). The app does **not** request Location, Contacts, SMS, Phone, Calendar, or Microphone. Manifest verified pre-release.

## Community

### What is the community module?

A peer-contribution surface where verified students submit MCQs, short questions, long questions, and chapter explanations. The submissions get voted on by other verified students. Submissions that cross the eligibility bar (net votes ≥ 10, gross ≥ 15, no active flag) surface in tests for any student who has opted into community content. See [Community overview](/docs/community/overview).

### Why does the community module require CNIC verification?

Trust. Without identity verification, bad actors flood the platform with low-quality submissions. The verification is one-time, the image stays in your Drive (not ours), and we hold only a SHA256 hash + last-4 digits for the denylist that enforces bans. See [CNIC verification](/docs/community/cnic-verification).

### Can I become a moderator?

Yes — by contributing well. The system flags eligible candidates from contribution history (high accept rate, vote-correctness, no strikes). An admin one-clicks to promote. No application form. Rough eligibility: 30+ accepted submissions, vote-correctness > 80%, zero strikes, 30+ days as an active user. See [Moderator](/docs/community/moderator).

## Developer and open source

### Is ImtehanHub open source?

The **app codebase is private**. The **documentation repository** at [github.com/aoneahsan/imtehanhub-docs](https://github.com/aoneahsan/imtehanhub-docs) is **open source** (MIT) — typo fixes, clarifications, and new doc pages are welcome via PR. Architectural patterns are documented in detail in the [Developer section](/docs/developers/overview), so the codebase is replicable in your own market or country.

### What's the tech stack?

React 19 + TypeScript strict + Vite 8 + Tailwind v4 + Radix UI + Zustand 5 + TanStack Query 5 + React Hook Form + Zod + Firebase (free tier) + Capacitor 8 + TipTap 3 + OneSignal + Sentry + Amplitude + Microsoft Clarity. Zero paid runtime services. Full overview: [Developer stack](/docs/developers/overview).

### How does the project make money?

Pro subscriptions (PKR 299/mo), Unlimited (PKR 599/mo), Add-on Class (PKR 99/mo), and light banner ads on the Free tier. That's it. No data sales, no premium analytics products, no advertiser deals targeting students. The free tier is permanent and ad-supported by design.

### Can I fork ImtehanHub for my country?

Yes — the docs are MIT-licensed. Read the [Developer section](/docs/developers/overview), replicate the patterns in your own private repo, and ship a free / freemium app for your local market. If you'd like a conversation about it, email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com).

### Who built ImtehanHub?

**Ahsan Mahmood** — full-stack engineer based in Lahore, Pakistan. Single developer; the build, the seed pipeline, the docs, the SEO infrastructure, the design tokens, the admin tooling — all of it. Contacts:

- Portfolio: [aoneahsan.com](https://aoneahsan.com)
- LinkedIn: [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan)
- GitHub: [github.com/aoneahsan](https://github.com/aoneahsan)
- NPM: [npmjs.com/~aoneahsan](https://npmjs.com/~aoneahsan)
- Email: [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com)
- WhatsApp: +92 304 661 9706

Open to freelance / contract work in Capacitor, React, Firebase, and Cloudflare Workers, plus advisory conversations for solo developers building free / freemium apps.

## Getting started

### How do I start?

1. Open [imtehanhub.aoneahsan.com](https://imtehanhub.aoneahsan.com).
2. Click **Sign in with Google**.
3. Pick your class (Class 5 through 2nd Year FA / FSc).
4. Pick your board.
5. Tap **Take a test**.

You get 3 trial tests with no plan attached — full experience, no daily quota. After that the Free tier kicks in (3 tests/day) or you upgrade. Full walk-through: [Quick Start](/docs/getting-started/quick-start).

### I need help or want to report a bug

Email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) (monitored daily) or DM via [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan). Response time: same-week for most, same-day for serious bugs.

---

**Last updated**: 2026-05-11 · **Author**: Ahsan Mahmood
