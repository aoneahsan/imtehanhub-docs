---
id: community
title: Contributing — community module + docs PRs
sidebar_label: Contributing
sidebar_position: 1
description: Three contribution paths for ImtehanHub — public docs PRs, in-app community submissions, and direct issue reports to the maintainer (Ahsan Mahmood).
keywords:
  - contributing ImtehanHub
  - open source documentation
  - community module contribution
  - student contributor Pakistan
  - report bug ImtehanHub
slug: /developers/contributing/community
---

# Contributing

**ImtehanHub welcomes contributions through three explicit paths.** The app code is private and maintained by a single developer (Ahsan Mahmood). But the **documentation repo is public**, the **community module accepts in-app contributions**, and the **issues inbox is open to anyone**. This page walks each path.

> **TL;DR** — Docs fixes: PR to `aoneahsan/imtehanhub-docs`. Content contributions: submit MCQs / short / long / chapter explanations via `/app/community/contribute`. Bugs / ideas / general: email [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) or DM via [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan).

## Path 1 — Documentation PRs

This site you're reading lives at [github.com/aoneahsan/imtehanhub-docs](https://github.com/aoneahsan/imtehanhub-docs) (public). The app repo it documents stays private.

### What's welcome

- **Typo fixes.** Always merged within a day.
- **Clarity improvements.** Reword a confusing sentence, add a missing example, improve a code snippet.
- **Missing pages.** If you noticed a feature in the app that has no doc, open an issue or PR with a draft.
- **Translation hints.** Urdu translations of key landing pages are roadmapped — early proposals welcome.
- **Accessibility fixes.** Better alt text, better heading hierarchy, better link text.

### What's not in scope

- Marketing puffery ("the best app in Pakistan"). Honest framing is project policy.
- Fabricated statistics. Every number in the docs is traceable to the codebase or a named external source.
- Documentation of features that don't exist yet. The roadmap lives in the in-app blog; we update docs as features ship.

### The dev loop

```bash
git clone git@github.com:aoneahsan/imtehanhub-docs.git
cd imtehanhub-docs
yarn install
yarn start            # local dev server on http://localhost:3000
```

Edit any file in `docs/`, the dev server hot-reloads. When you're happy:

```bash
yarn build            # production build — must be clean (onBrokenLinks: throw)
yarn typecheck        # docusaurus tsc — must be clean
```

PR against `main`. Conventional commit messages:

```
docs(fix): correct grammar in /tests/configure intro paragraph
docs(community): add note about Naskh vs Nastaliq fonts to bilingual gate
docs(developers): clarify storage adapter Capacitor detection
```

### Review turnaround

Typo fixes: 24-48 hours. New pages / structural changes: 5-7 days. The single maintainer's bandwidth is the bottleneck.

## Path 2 — In-app content contribution

The [community module](/docs/community/overview) is the supported path for adding subject content (MCQs, short answers, long answers, chapter explanations). Anyone with a verified CNIC can submit; voting and flagging are open to all verified users.

The contribution flow:

1. Sign in via Google.
2. Verify your CNIC at `/app/profile/verification` — see [CNIC verification](/docs/community/cnic-verification).
3. Open `/app/community/contribute`.
4. Pick a kind (MCQ / Short / Long / Chapter explanation).
5. Fill the bilingual form (English + Urdu both required).
6. Submit.

Your submission goes through community voting. Once it crosses the eligibility bar (net votes ≥ 10, gross ≥ 15, no active flag), it surfaces in tests by default for any student who has opted into community content.

Quotas: 10 submissions / day, 50 votes / day, 5 flags / day, 5 comments / day. Achievements raise the caps.

### Why this path matters

Pakistani exam-prep coverage is long-tail. The pipeline-seeded content covers ~16k+ MCQs across Class 9-12; that's the spine. Community contributions extend into:

- Topics the textbook covers but free sources skip.
- Updated content for syllabus revisions.
- Subject-area depth for high-school competitive exam prep (NTS, MDCAT, ECAT, CSS-stream introductory questions).
- Class 5-8 coverage gaps where free online sources are thin.

Every accepted community question makes the platform incrementally better for the next student.

## Path 3 — Issues, ideas, bug reports

For anything that isn't a doc PR or a content contribution:

- **Email**: [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) — the single, monitored inbox.
- **LinkedIn DM**: [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan).
- **WhatsApp (Pakistan)**: +92 304 661 9706 (slower than email).
- **Portfolio site contact form**: [aoneahsan.com](https://aoneahsan.com).

What's useful to include:

- Specific URL or screen where the issue appears.
- What you expected vs what happened.
- A screenshot if it's UI.
- Your Android version + device model for mobile-specific bugs.
- Your Google account email so we can correlate with logs (only if you're comfortable — purely optional).

Response time: same-week for most, same-day for serious bugs.

## Becoming a moderator

The community module has a hybrid promotion path. The system flags eligible candidates based on contribution history (high accept rate, high vote-correctness, no flags); an admin reviews the list and one-clicks a promotion. There is no application form — the system finds you when you're ready.

Eligibility roughly means:

- 30+ accepted submissions.
- Vote-correctness > 80% on a sample.
- Zero strikes.
- 30+ days as an active user.

See [Moderator](/docs/community/moderator) for the full criteria.

## Style guide for docs

Briefly, because the repo has its own internal style cheat sheet:

- **Definition-first.** First paragraph defines the page's subject literally — "X is Y" — because AI engines extract the first sentence.
- **Headings match queries.** "What is X?", "How does X work?", "Can I X?" — questions a student would actually search.
- **Bilingual examples where they help.** Show the Urdu rendering when discussing Urdu features.
- **Tables for comparisons.** Tables extract better than prose for "X vs Y" content.
- **5-8 FAQ entries per page.** Highest-leverage AI-citation block.
- **3-6 internal links per page.** Hub-and-spoke; never orphan a page.
- **Author + lastUpdated** on every page (EEAT signal). Author is the maintainer unless someone else wrote the page.
- **No fabricated stats.** Every named number cites the source.
- **Honest limit framing.** Say what the feature doesn't do as clearly as what it does.

## Style guide for community submissions

For content quality, the community module enforces:

- **Bilingual.** Every submission requires English + Urdu.
- **Textbook-mapped.** Submissions reference a specific chapter (and ideally page number).
- **One concept per question.** MCQs especially — don't bury two questions in one stem.
- **Plain language.** Match the textbook's voice; don't load with jargon.
- **No copyright violation.** Don't copy past-paper PDFs verbatim. Re-formulate.
- **No personally identifying data.** No school names, no teacher names, no student names.

## Credit

Documentation contributors are listed on the [Credits](/docs/credits) page (alphabetical). Community moderators are visible on `/community` after promotion. Content contributors are visible on their own submission detail pages.

If you'd prefer not to be credited publicly, say so in the PR or email and we'll honour the request.

## Boundary: who runs this

ImtehanHub is built and maintained by **Ahsan Mahmood**:

| Channel | Where |
|---|---|
| GitHub | [github.com/aoneahsan](https://github.com/aoneahsan) |
| LinkedIn | [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan) |
| Portfolio | [aoneahsan.com](https://aoneahsan.com) |
| NPM | [npmjs.com/~aoneahsan](https://npmjs.com/~aoneahsan) |
| Email | [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com) |
| Phone / WhatsApp | +92 304 661 9706 |

Open to:
- Freelance / contract work in Capacitor, React, Firebase, Cloudflare Workers.
- Long-term collaboration on Pakistani edtech / fintech / AI-application projects.
- Advisory conversations for solo developers building free / freemium apps.

## Common questions

### Can I fork ImtehanHub for my own country / market?

The docs repo is MIT-licensed — fork, adapt, attribute. The app code is private but the architectural patterns are documented here; replicate them in your own codebase.

### Will you accept code contributions if I email a patch?

Genuine bug fixes — yes, with attribution. New features — usually no, because architectural consistency is the maintainer's job. Open an issue first to discuss.

### Are there bounties?

No. The financial model is paid plans (Pro / Unlimited / Add-on Class) plus light ads on Free. Community contribution is unpaid. Some contributors have earned in-app perks (free Pro extensions, recognition badges) at the maintainer's discretion.

### Where do I read the roadmap?

The in-app blog at `/blog` posts feature announcements as features ship. There is no public roadmap document — direction shifts too fast for a written plan to stay current.

## Next

- [Community overview](/docs/community/overview) — the in-app contribution path.
- [Developer overview](/docs/developers/overview) — what you'd be working with.
- [Credits](/docs/credits) — where contributors appear.
