# Scope — What We're Documenting

> **Frozen scope.** This is the definition of done for the ImtehanHub Docs project. If a topic isn't in this scope, it isn't part of "complete" — and conversely, every topic listed here MUST have a doc page by Batch 7.

**Source of truth:** the live ImtehanHub app + `imtehanhub/docs/ai-knowledge-base/*` (overview, features, modules, routes, users-and-roles, forms, tech-stack) + `imtehanhub/docs/v1/`, `v2/`, `v3/` module specs.

## Audience priorities

1. **Pakistani students (Class 5 → 2nd Year FA/FSc)** — primary audience. Most pages target this reader.
2. **Teachers and institute managers** — secondary; covered in dedicated section.
3. **Parents** — covered implicitly in privacy/billing sections.
4. **Developers/contributors** — covered in a dedicated `/docs/developers` section to make ImtehanHub a portfolio piece for the author and to attract corrections.

## Section map (matches `sidebars.ts`)

### 1. Getting Started (Tutorials — learning-oriented)
- ✅ Welcome (Batch 0 — done)
- Quick Start (3-minute path: open app → first test → result)
- Sign in with Google (web + native)
- The 3-test free trial (what counts, what resets, when to sign in)
- Picking your class (Class 5 through 2nd Year FA/FSc)
- Picking your board (Punjab, Federal, Sindh, KPK, Balochistan, AJK)

### 2. Core Concepts (Explanation — understanding-oriented)
- Content hierarchy (Class → Subject → Book → Chapter → Question)
- Question types (MCQ, Short, Long)
- Bilingual model (`urduName` everywhere, RTL flip)
- Trial counter, quotas, plan tiers
- Streaks and stats (what's tracked, how it's computed)
- Achievements model

### 3. Tests & Practice (How-to + Reference)
- Configure a test (class, subject, chapter, mode, board)
- Topic-level filters
- Test source picker (official / community / both with slider)
- During the test (timer, progress, navigation, mark-for-review)
- Submit and read your result (score ring, per-topic breakdown)
- Review mode (re-open past test, AI explanation)
- Streaks — daily, weekly, best
- Bookmarks — star any question, browse your collection
- Test history list

### 4. Discovery (How-to)
- Subjects browse — `/subjects/:class/:subject/:chapter`
- Blog — `/blog`
- Knowledge base — `/learn` (full-text search)
- Sitemap — `/sitemap` (visual + fuzzy search)
- Feed — `/feed` and `/feed.xml`
- Leaderboard — privacy-safe denormalized
- Push notifications (OneSignal)

### 5. Account & Settings (How-to)
- Profile (avatar, board preference)
- Theme customizer (appearance, accent, radius, scaling, font size, panel)
- Language toggle (EN ↔ UR, RTL flip)
- Billing — Free / Pro / Unlimited / Add-on Class
- Referrals — share code, 3 successful = auto-Pro
- Data deletion (self-service)
- Bookmarks page

### 6. Community Module (How-to + Reference)
- Overview — what the community module is and is not
- CNIC verification (why, how, what data is stored, denylist)
- Submitting MCQ
- Submitting Short
- Submitting Long
- Submitting Chapter Explanation
- Bilingual gate (why submissions need both languages)
- Voting — eligibility (net ≥ 10 && gross ≥ 15 && no active flag)
- Flagging — process and consequences
- Comments
- Achievements (25 badges across Contributor/Voter/Reviewer/Streak/Verifier/Linguist tracks)
- Daily quotas (10 sub / 50 vote / 5 flag / 5 comment) and how achievements raise them
- Strikes and 5-strike auto-ban
- Moderator queue (for promoted moderators)
- Hybrid moderator promotion (system flags eligible, admin one-click promotes)
- Promote-to-official flow
- Resource image attachments (Google Drive, public link, 8 images @ 8 MB cap)

### 7. For Institutes (How-to)
- What an institute account is
- Creating an institute (admin-granted)
- Inviting students
- Roster management
- Reading per-student progress

### 8. Mobile App (How-to + Reference)
- Installing the Android app (Play Store when published; APK sideload meanwhile)
- Offline mode (what works, what doesn't, how state syncs)
- Push notifications setup (OneSignal)
- Battery / data tips
- Differences from the web app

### 9. Privacy & Compliance (Reference)
- Data we store (and where)
- CNIC handling (Drive only, denylist via sha256 hash, never in Firestore)
- Account deletion (what gets deleted, what stays)
- Cookie policy
- Terms of service
- Play Store compliance posture
- AdMob / AdSense disclosure

### 10. Credits (Reference)
- ✅ Credits page (Batch 0 — done)

## Developers section (separate sidebar)

### 11. Developer Overview
- Tech stack snapshot (React 19, Vite 8, Tailwind v4, Radix UI, Capacitor 8, Firebase free tier)
- Architectural philosophy (zero-cost, free-source-only, one-commit-per-prompt, ONE PROJECT AT A TIME)
- Directory map

### 12. Architecture
- Layer contracts: types → repositories → services → stores → hooks → components → pages
- Routing model (`src/config/routes.ts`)
- State management (Zustand + persist via `@capacitor/preferences`)
- Forms (RHF + Zod + project-wide field components)
- Storage adapter (Capacitor Preferences ↔ localStorage)
- Theme customizer architecture
- Analytics fan-out (Firebase + Clarity + Amplitude)
- Error fan-out (Sentry + analytics fallback)
- URL state preservation pattern (`useUrlBooleanState`, `useUrlStringState`, etc.)
- Offline-first mechanics

### 13. Data Pipeline
- Free scrapers (ilmkidunya.com, gotest.pk)
- Transform stage (raw → validated)
- OCR fallback for scanned textbooks (Tesseract)
- Firestore seeding
- Source attribution
- Why no Ollama / no paid APIs

### 14. SEO / AEO Pipeline
- `postbuild-seo.mjs` — what it does, how it generates 660+ HTML files
- Per-route JSON-LD (`WebSite`, `Organization`, `Article`, `FAQPage`, `HowTo`, `Course`, `LearningResource`, `BreadcrumbList`)
- Static HTML for SPA crawlers (`<noscript>` body)
- llms.txt / ai.txt / humans.txt / .well-known/security.txt
- Sitemap + feed regeneration each build
- Programmatic-SEO entries
- Firebase Hosting headers for crawler-text files

### 15. Contributing
- How to contribute via the community module (linked back to user-facing community section)
- How to file documentation corrections (PR via this docs repo)
- Code of conduct (basic, professional)

## Out of scope

- Per-question content (16,121 MCQs — those live in the app, not the docs).
- Internal admin SOPs (those live in the private app repo).
- Marketing landing pages (those are part of the main app).

## Cross-cutting requirements

Every page must have:

- Distinct `title` (50–60 chars), distinct `description` (140–160 chars), `keywords` array (5–8 terms).
- Definition-first intro paragraph (the first sentence is a literal definition — AI engines extract it).
- At least one of: numbered steps, comparison table, FAQ block. Three of them on landing pages.
- Author + last-updated date implicit via `showLastUpdateTime: true`.
- Internal links to ≥ 3 related pages (no orphan pages).
- Any code snippet rendered with the right Prism language tag.

## Cross-cutting things to avoid

- No fabricated statistics. Cite ImtehanHub's own progress.json or named sources only.
- No keyword stuffing (Princeton GEO study: keyword stuffing reduces AI visibility by 10%).
- No claims the app doesn't actually do. If a feature is in spec but not shipped, mark it explicitly as "planned".
- No emojis in body copy unless the user explicitly asked for them (per workspace rule).

## Definition of done (whole project)

Site complete + GitHub public + deployed to `imtehanhub-docs.aoneahsan.com` + submitted to GSC + linked from main app footer + every section above has at least one published page + tracker.json shows `status: all-batches-complete`.
