# Plan — 8 Batches to Production

> Each batch is sized to fit comfortably in a single Claude session: not so small it's wasteful, not so large quality drops. Aim: **8–14 pages per content batch + verification pass + ONE commit per batch**. Each page targets **800–1200 unique words** with the Diátaxis pattern (definition-first, FAQ, internal links).

| Batch | Theme | Pages | Status |
|---|---|---|---|
| **0** | Scaffold + branding + SEO baseline + planning files | 2 (welcome + credits) | ✅ Complete |
| **1** | Getting Started + Core Concepts | 11 | Pending |
| **2** | Tests & Practice (test engine end-to-end) | 9 | Pending |
| **3** | Community Module (full feature) | 14 | Pending |
| **4** | Discovery + Engagement (subjects/blog/learn/leaderboard/notifications) | 10 | Pending |
| **5** | Account + Institutes + Mobile + Privacy/Compliance | 13 | Pending |
| **6** | Developer / Contributor section (architecture, data pipeline, SEO pipeline) | 12 | Pending |
| **7** | Polish + SEO sweep + Firebase deploy + GSC submission | maintenance | Pending |

**Total target:** ~71 user-facing doc pages + 12 developer pages + this Batch 0 (welcome + credits) = ~85 pages.

---

## Per-batch contract

Every batch must:

1. Invoke the matching skills BEFORE writing (per `_planning/README.md` skill bindings table).
2. Read `_planning/tracker.json`, find the next pending batch.
3. Read `_planning/scope.md` to confirm the section's coverage list.
4. Read 1–2 representative pages from earlier batches to match tone.
5. Write **all** pages for the batch. No partials.
6. Update sidebars.ts to include the new doc IDs.
7. Run `yarn typecheck && yarn build`. Fix any error before committing.
8. Update `_planning/tracker.json`: mark batch complete, set `lastUpdated`, set `nextBatch`.
9. Update root `CLAUDE.md` (if rules / status changed).
10. ONE commit per batch with conventional message: `docs(batch-N): <theme> — N pages, ~Xk words`.
11. Push to remote.

---

## Batch 1 — Getting Started + Core Concepts (11 pages)

**Skills:** `documentation-writer` + `copywriting` + `ai-seo`.

**Sidebar slots:** `getting-started/*` and `concepts/*`.

| File | Title | Sidebar | Word target |
|---|---|---|---|
| `getting-started/quick-start.md` | Quick Start — first test in 3 minutes | Getting Started | 700 |
| `getting-started/sign-in.md` | Sign in with Google (web + native Android) | Getting Started | 800 |
| `getting-started/free-trial.md` | The 3-test free trial — how it works | Getting Started | 600 |
| `getting-started/pick-class.md` | Pick your class — Class 5 → 2nd Year FA/FSc | Getting Started | 900 |
| `getting-started/pick-board.md` | Pick your board — Punjab, Federal, Sindh, KPK, Balochistan, AJK | Getting Started | 900 |
| `concepts/content-hierarchy.md` | Content hierarchy — Class → Subject → Book → Chapter → Question | Core Concepts | 1000 |
| `concepts/question-types.md` | Question types — MCQ, Short, Long | Core Concepts | 900 |
| `concepts/bilingual.md` | Bilingual model — `urduName` everywhere, RTL flip | Core Concepts | 1000 |
| `concepts/quotas-and-plans.md` | Trial counter, quotas, plan tiers — what unlocks when | Core Concepts | 900 |
| `concepts/streaks-and-stats.md` | Streaks and stats — what's tracked, how it's computed | Core Concepts | 800 |
| `concepts/achievements.md` | Achievements model | Core Concepts | 800 |

**Done when:** all 11 pages live, sidebars updated, build clean, ONE commit + push, tracker updated.

---

## Batch 2 — Tests & Practice (9 pages)

**Skills:** `documentation-writer` + `copywriting`.

**Sidebar slot:** `tests/*`.

| File | Title | Word target |
|---|---|---|
| `tests/configure.md` | Configure a test — class, subject, chapter, mode, board | 1000 |
| `tests/topic-filters.md` | Topic-level filters within a chapter | 700 |
| `tests/source-picker.md` | Test source picker — official / community / both | 900 |
| `tests/during-test.md` | During the test — timer, progress, navigation, mark-for-review | 900 |
| `tests/submit-and-result.md` | Submit and read your result — score ring, per-topic breakdown | 1100 |
| `tests/review-mode.md` | Review mode — re-open past test, AI explanation | 900 |
| `tests/bookmarks.md` | Bookmarks — star any question, browse your collection | 800 |
| `tests/history.md` | Test history list | 700 |
| `tests/streaks.md` | Streaks — daily, weekly, best | 800 |

---

## Batch 3 — Community Module (14 pages)

**Skills:** `documentation-writer` + `copywriting`.

**Sidebar slot:** `community/*`.

| File | Title | Word target |
|---|---|---|
| `community/overview.md` | Community module — overview | 1100 |
| `community/cnic-verification.md` | CNIC verification — why, how, what's stored | 1200 |
| `community/submit-mcq.md` | Submitting an MCQ | 900 |
| `community/submit-short.md` | Submitting a short question | 800 |
| `community/submit-long.md` | Submitting a long question | 800 |
| `community/submit-chapter-explanation.md` | Submitting a chapter explanation | 900 |
| `community/bilingual-gate.md` | Why submissions need both languages | 700 |
| `community/voting.md` | Voting — eligibility and process | 900 |
| `community/flagging.md` | Flagging — process and consequences | 900 |
| `community/comments.md` | Comments on submissions | 700 |
| `community/quotas.md` | Daily quotas and how achievements raise them | 900 |
| `community/strikes-bans.md` | Strikes, 5-strike auto-ban, denylist | 1000 |
| `community/moderator.md` | Becoming a moderator (hybrid promotion) | 1000 |
| `community/promote-to-official.md` | Promote-to-official — admin flow | 900 |

---

## Batch 4 — Discovery + Engagement (10 pages)

**Skills:** `documentation-writer` + `copywriting`.

**Sidebar slot:** `discovery/*`.

| File | Title | Word target |
|---|---|---|
| `discovery/subjects.md` | Subjects browse | 900 |
| `discovery/chapter-detail.md` | Chapter detail page — what you see, how to start | 800 |
| `discovery/blog.md` | Blog — what gets posted, how to follow | 700 |
| `discovery/knowledge-base.md` | Knowledge base — `/learn` and full-text search | 900 |
| `discovery/sitemap-page.md` | The visual sitemap — `/sitemap` and fuzzy search | 700 |
| `discovery/feed.md` | Feed — `/feed` and `/feed.xml` | 600 |
| `discovery/leaderboard.md` | Leaderboard — privacy-safe denormalized | 900 |
| `discovery/notifications.md` | Push notifications — OneSignal setup | 800 |
| `discovery/search.md` | Search and filters across the app | 700 |
| `discovery/share.md` | Sharing pages and questions | 600 |

---

## Batch 5 — Account + Institutes + Mobile + Privacy (13 pages)

**Skills:** `documentation-writer` + `copywriting`.

**Sidebar slots:** `account/*`, `institutes/*`, `mobile/*`, `privacy/*`.

| File | Title | Word target |
|---|---|---|
| `account/profile.md` | Profile — avatar, board preference | 800 |
| `account/theme.md` | Theme customizer | 1100 |
| `account/language.md` | Language toggle (EN ↔ UR, RTL) | 800 |
| `account/billing.md` | Billing — Free / Pro / Unlimited / Add-on Class | 1100 |
| `account/referrals.md` | Referrals — share code, 3 = auto-Pro | 900 |
| `account/data-deletion.md` | Data deletion — self-service | 900 |
| `institutes/overview.md` | What an institute account is | 800 |
| `institutes/manage.md` | Inviting students + roster management | 1000 |
| `institutes/progress.md` | Reading per-student progress | 800 |
| `mobile/install.md` | Installing the Android app | 800 |
| `mobile/offline.md` | Offline mode — what works, what doesn't | 1000 |
| `privacy/overview.md` | Data we store and where | 1100 |
| `privacy/cnic.md` | CNIC handling, denylist, why hashing | 1000 |

---

## Batch 6 — Developer / Contributor (12 pages)

**Skills:** `documentation-writer` + `react-best-practices` + `firebase-firestore-standard` + `capacitor-best-practices`.

**Sidebar slots:** `developers/*`, `developers/architecture/*`, `developers/pipeline/*`, `developers/seo/*`, `developers/contributing/*`.

| File | Title | Word target |
|---|---|---|
| `developers/overview.md` | Developer Overview — stack, philosophy, directory map | 1200 |
| `developers/architecture/layers.md` | Layer contracts (types → repos → services → stores → hooks → components → pages) | 1200 |
| `developers/architecture/routing.md` | Routing model — `src/config/routes.ts` | 900 |
| `developers/architecture/state.md` | State management — Zustand + persist | 1000 |
| `developers/architecture/forms.md` | Forms — RHF + Zod + project-wide field components | 1000 |
| `developers/architecture/storage.md` | Storage adapter — Capacitor Preferences ↔ localStorage | 800 |
| `developers/architecture/theme.md` | Theme customizer architecture | 1000 |
| `developers/architecture/analytics-errors.md` | Analytics + error fan-out | 900 |
| `developers/pipeline/overview.md` | Free scrapers, transforms, validation, seeding | 1200 |
| `developers/pipeline/ocr.md` | OCR fallback for scanned textbooks (Tesseract) | 800 |
| `developers/seo/postbuild.md` | `postbuild-seo.mjs` — 660+ static HTMLs, JSON-LD, sitemap | 1200 |
| `developers/contributing/community.md` | Contributing via the community module + docs PRs | 900 |

---

## Batch 7 — Polish + SEO sweep + Deploy (maintenance)

**Skills:** `ai-seo` + `seo` + `firebase-hosting-basics`.

Tasks:

1. Per-page SEO audit — every page has distinct title/description, definition-first intro, 1 of {numbered steps, table, FAQ}, ≥ 3 internal links.
2. Convert `og-image.svg` → `og-image.png` (1200×630) so social platforms render the card. Use `convert` or `rsvg-convert` if available; otherwise mark as user-deliverable.
3. Generate per-page OG images for top 10 landing pages (optional polish).
4. Refresh `llms.txt` to list the new key URLs.
5. Refresh `ai.txt` `Last Updated` date.
6. Run final `yarn build` — confirm 0 errors, 0 warnings.
7. Run `npx -y firebase-tools@latest deploy --only hosting`.
8. Confirm DNS for `imtehanhub-docs.aoneahsan.com` (user-only step).
9. Submit `sitemap.xml` to:
   - Google Search Console
   - Bing Webmaster Tools (feeds Yahoo, DuckDuckGo, ChatGPT Search)
   - Yandex Webmaster
   - IndexNow (programmatic ping)
10. Add a footer link to docs from the main `imtehanhub` app.
11. Update `_planning/tracker.json`: `status: all-batches-complete`, `lastSuccessfulRun: today`, `nextEligibleRun: today + 7 days`.
12. ONE commit + push.

**Human-only steps to call out:**

- Approve creation of public GitHub repo `aoneahsan/imtehanhub-docs` and push.
- Add Firebase project (or confirm existing project ID) for hosting.
- Configure DNS CNAME from `imtehanhub-docs.aoneahsan.com` → Firebase Hosting.
- GSC + Bing + Yandex verification (DNS TXT or HTML file upload).
- Add IndexNow API key file once issued.

---

## Quality gates (every batch)

- `yarn typecheck` — clean
- `yarn build` — clean (treat any new warnings as errors)
- Internal links resolve (Docusaurus `onBrokenLinks: 'throw'` handles this)
- No fabricated stats; every named number traceable to `imtehanhub/docs/progress.json` or named external source
- Every page has the required frontmatter (id, title, description, keywords, slug)
- Tracker updated, commit pushed
