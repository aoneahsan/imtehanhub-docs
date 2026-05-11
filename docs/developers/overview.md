---
id: overview
title: Developer overview — stack, philosophy, directory map
sidebar_label: Overview
sidebar_position: 1
description: Stack, philosophy, and directory map — React 19 + TS strict + Vite + Tailwind + Radix + Zustand + TanStack Query + RHF + Zod + Firebase free-tier + Capacitor.
keywords:
  - ImtehanHub stack
  - React 19 TypeScript strict
  - Capacitor Firebase free tier
  - Pakistani exam app architecture
  - Vite Tailwind Radix Zustand
slug: /developers/overview
image: /img/og-developer.png
---

# Developer overview

**ImtehanHub is a React 19 SPA** that runs identically as a web app and as a Capacitor-wrapped Android app. The codebase optimises for a single developer-hour: every layer has one canonical pattern, every dependency earns its place, every feature lands behind a free-tier-only constraint.

> **TL;DR** — TypeScript strict + Vite + Tailwind v4 + Radix UI + Zustand + TanStack Query + RHF + Zod + Firebase (free tier) + Capacitor. No paid services anywhere in the runtime path. The whole thing builds with `yarn build`.

## The stack

| Layer | Technology | Why |
|---|---|---|
| Language | TypeScript 5.9 (strict, `noUncheckedIndexedAccess`) | Bug-prevention compounds; the strict modes catch real issues in months of growth |
| Build | Vite 8 | Fastest cold start, best HMR, Rollup output |
| Styling | Tailwind v4 + Radix Themes | Utilities for layout, Radix for accessible primitives |
| UI primitives | Radix UI | Headless, accessible, theme-friendly — no native HTML for buttons / dialogs |
| Routing | React Router 7 | Familiar, fast, file-list-driven (not file-system magic) |
| Client state | Zustand 5 + persist + storage-adapter | Boring and reliable; no boilerplate |
| Server state | TanStack Query 5 | Caching, stale-while-revalidate, optimistic updates |
| Forms | React Hook Form + Zod + `@hookform/resolvers` | One pattern across every form in the app |
| Data | Firebase Firestore (free tier) | Real-time, security rules, no servers to run |
| Auth | Firebase Auth (Google sign-in only) | One auth path, zero password recovery flows |
| Files | Google Drive (user-owned, `drive.file` scope) | We never host user images |
| Mobile | Capacitor 8 | Web app → native Android, same codebase |
| Rich text | TipTap 3 | For admin authoring (blog, knowledge base) |
| Notifications | OneSignal | Free tier, web + native |
| Analytics | Firebase Analytics + Amplitude + Microsoft Clarity (no PII) | Three lenses, fail-open if env keys missing |
| Errors | Sentry | First-party SDK, PII-scrubbed |
| Ads | AdMob (mobile) + AdSense (web) | Free tier only — no banners on legal pages |

Anything paid (Firebase Functions, custom backends, paid APIs, AI compute) is explicitly **out of scope**. See the [zero-cost constraint](#the-zero-cost-constraint) below.

## Repository layout

```
imtehanhub/
├── src/
│   ├── config/                 — env, constants, routes, firebase
│   ├── types/                  — TS types per domain (admin, billing, content, ...)
│   ├── repositories/           — BaseRepository<T> + per-collection Firestore wrappers
│   ├── services/               — business logic (auth, billing, content, referrals, ...)
│   ├── stores/                 — Zustand stores (auth, theme, test, toast, ui, ai)
│   ├── hooks/                  — TanStack Query + custom hooks
│   ├── lib/                    — singletons (analytics, logger, storage, errors, seo, ...)
│   ├── components/             — Radix-based UI, layout, decorative SVG
│   ├── features/community/     — community module slice (own components/services/types)
│   └── pages/                  — page components (public/, app/, admin/, community/, error/)
├── pipeline/                   — free scrapers, transforms, validators, seeders
├── public/                     — robots, llms.txt, ai.txt, manifest, SVG assets
├── postbuild-seo.mjs           — generates per-route static HTMLs (660+) after Vite build
├── android/                    — Capacitor Android shell (committed; no node_modules)
├── docs/                       — module specs, audits, tracking JSONs
├── service-account/            — Firebase Admin key (in .gitignore for safety; private repo)
└── package.json
```

Each important folder has its own `CLAUDE.md` and `AGENTS.md` carrying the rules that apply inside it. The root files keep the global rules.

## The layer contract

Reads and writes flow through fixed layers, in fixed order. Skipping a layer is a smell.

```
UI components / pages
        ↓
TanStack Query hooks  (src/hooks/use-*.ts)
        ↓
Services              (src/services/*-service.ts)
        ↓
Repositories          (src/repositories/*-repository.ts, extending BaseRepository<T>)
        ↓
Firestore SDK         (firebase/firestore)
```

State that doesn't come from the server (theme, UI panels, in-flight wizards) lives in Zustand stores, persisted via the storage adapter.

The [layers reference](/docs/developers/architecture/layers) walks through one full flow (a user submitting a test) across every layer.

## Imports — always absolute

```typescript
// ✅ Always
import { contentService } from '@/services/content-service';
import type { Class } from '@/types/content';

// ❌ Never
import { contentService } from '../../services/content-service';
```

The `@` alias maps to `src/` via Vite + `tsconfig.json`'s `paths`. Relative imports are reserved for sibling files in the same directory only.

## The zero-cost constraint

Every dependency, every API, every service must fit a free-tier budget:

- **Firebase**: free tier only (Firestore 50K reads/day, Auth, Hosting). No Cloud Functions, no Firebase Storage.
- **AI/LLM**: BYOK only (user provides their own OpenAI / Claude key). No bundled API keys.
- **Files**: Google Drive (user's), or **FilesHub** for app-owned assets (`visibility: 'public'`).
- **Backends**: when truly needed, free Cloudflare Workers with project-prefixed secrets.
- **Email**: none — we do not send transactional or marketing email (everything lives in-app or in push).
- **Banned npm packages**: `@capacitor-firebase/crashlytics`, `@capacitor-firebase/performance` (Gradle plugin pain; we use Sentry instead).

This constraint is the whole product strategy — it's how a single developer ships and sustains a free Pakistani student tool. The repo's `CLAUDE.md` files cite specific incidents that produced each ban.

## Logging — never `console.*` directly

Every log goes through `src/utils/logger.ts`. Direct `console.log/info/debug/trace/warn/error/...` is ESLint-banned (`no-console: 'error'`). The logger:

- Mirrors the `console.*` surface 1-to-1.
- Defaults to level `warn` in both dev and prod.
- Reads `localStorage['imtehanhub:logLevel']` and `VITE_LOG_LEVEL` for overrides.
- Exposes `window.__setLogLevel(level)` / `__getLogLevel()` for devtools.
- Patches global `console.log/info/debug/trace` to no-ops at boot so third-party stragglers stay quiet.

Why: one switch silences the dev console for an exam-day demo without code edits. The full rule + verification grep lives in the root `CLAUDE.md`.

## URL state preservation

Every navigable UI state belongs in the URL:

| State | Mechanism | Example |
|---|---|---|
| Modal / dialog | search param | `?compose=1`, `?edit=JOB_ID` |
| Active tab | search param | `?tab=pending` |
| Multi-step form | search param | `?step=2` |
| Filter / sort / page | search param | `?status=failed&page=3` |
| Detail view | search param | `?view=USER_ID` |
| Search query | search param | `?q=term` |

Helper hooks live at `src/lib/hooks/useUrlState.ts`: `useUrlBooleanState`, `useUrlStringState`, `useUrlNullableString`, `useUrlNumberState`. Raw `useState` for refreshable UI is a code-review reject.

## Build pipeline

```bash
yarn dev                 # Vite dev server on port 5942 — USER starts this, not the agent
yarn typecheck           # tsc --noEmit, must be clean
yarn lint                # ESLint (no-console, no-unused-vars, exhaustive-deps), must be clean
yarn build               # vite build + postbuild-seo.mjs (static HTMLs)
yarn build:dynamic       # vite build + postbuild-seo.mjs --dynamic (pulls Firestore for per-entity HTML)
yarn preview             # Preview built app on port 5943
```

A clean `yarn build` produces `dist/` with **660+ static HTMLs** — one per public route, per class page, per subject, per chapter, plus blog and knowledge-base entries when seeded. See [postbuild SEO](/docs/developers/seo/postbuild) for the deep dive.

## Where to start reading

1. **[Layer contracts](/docs/developers/architecture/layers)** — types → repos → services → stores → hooks → components, walked through one flow.
2. **[Routing](/docs/developers/architecture/routing)** — single `src/config/routes.ts` table-of-routes, no React-Router magic strings.
3. **[State management](/docs/developers/architecture/state)** — Zustand + persist + Capacitor-aware storage.
4. **[Forms](/docs/developers/architecture/forms)** — RHF + Zod + project-wide field components.
5. **[Data pipeline](/docs/developers/pipeline/overview)** — how free scrapers + transforms + seeders produce official content.
6. **[Postbuild SEO](/docs/developers/seo/postbuild)** — why 660+ HTMLs, what JSON-LD ships, how dynamic entity-pages are generated.

## Contributing

ImtehanHub's app repo is private. This **documentation repo** (`aoneahsan/imtehanhub-docs`) is public — typo fixes, clarifications, and new pages are welcome via PR. For product contributions, the [community module](/docs/community/overview) is the supported path: submit MCQs, short/long questions, and chapter explanations directly through the app.

The dev team is one person: **Ahsan Mahmood** ([aoneahsan@gmail.com](mailto:aoneahsan@gmail.com), [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan), [aoneahsan.com](https://aoneahsan.com)). All issues, ideas, and architectural questions go to that inbox.

## Next

- [Layer contracts](/docs/developers/architecture/layers) — the canonical read-and-write path.
- [Routing](/docs/developers/architecture/routing) — every route in `src/config/routes.ts`.
- [Postbuild SEO](/docs/developers/seo/postbuild) — how the 660+ HTMLs are built.
