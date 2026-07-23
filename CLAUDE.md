# ImtehanHub Docs — Project Memory (CLAUDE.md)

**Last Updated**: 2026-07-23

Public documentation / knowledge-base site (Docusaurus 3) for **ImtehanHub** — a free, bilingual (Urdu + English) Pakistani exam-preparation platform for Class 5 → 2nd Year (FA/FSc). This repo is the docs surface only; the ImtehanHub **app** lives in a separate, private repo (`com.aoneahsan.imtehanhub`, https://imtehanhub.aoneahsan.com).

> **Finalization 2026-06-23:** repo flipped **PUBLIC** (free GitHub Pages, per fleet docs-public policy). Content verified complete (74 md/mdx, no real "coming soon" gaps) and SEO floor in place (robots AI-allowlist, llms.txt/ai.txt, JSON-LD WebSite+Organization+SoftwareApplication, build-time sitemap, cross-links to the app + Play Store). `yarn build` exits 0 in a standalone checkout (verified in isolation); the only in-place failure is the parent-monorepo `.gitmodules` quirk documented below — not a content defect, and it does not occur in CI.

---

## Task Speed Over Docs (IRON-SOLID — BEHAVIORAL)

Finish the real task fast + correctly FIRST; docs/trackers/sync are a footnote (≤~20% of effort) — never let recording outpace the fix. HARD STOP when doc work outpaces the change → ship, then ONE line if anything. No new summary/status/completion files unless asked; edit/delete over add; delete stale docs. Full rule: `~/.claude/CLAUDE.md`. (Est. 2026-06-19)

---

## Identity

| Field | Value |
| --- | --- |
| Slug | `imtehanhub-docs` |
| Live docs URL | https://imtehanhub-docs.aoneahsan.com (canonical in `docusaurus.config.ts`; deploy target **GitHub Pages**, custom domain via `static/CNAME`) |
| Parent app | **ImtehanHub** — https://imtehanhub.aoneahsan.com · app id `com.aoneahsan.imtehanhub` |
| Repo (declared) | https://github.com/aoneahsan/imtehanhub-docs (this docs repo is MIT/open; the app is private). **No git remote configured in this local checkout.** |
| Stack | Docusaurus 3.10.1 · React 19 · TypeScript 6 · Yarn 4.14.1 · Node ≥20 |
| License | MIT (`LICENSE` present) — docs only; app is proprietary |
| Author | Ahsan Mahmood — aoneahsan@gmail.com — https://aoneahsan.com |

---

## What's here

- `docs/` — 74 Markdown/MDX doc pages (Diátaxis-organized: getting-started, concepts, tests, community, discovery, account, institutes, mobile, privacy, developers, + compare/faq/glossary/credits).
- `blog/` — Changelog (routed at `/changelog`), 1 post so far (docs launch).
- `src/pages/index.tsx` — branded home page; `src/css/custom.css` — Emerald→Sky brand theme (light + dark).
- `static/` — `robots.txt` (AI-bot allowlist + sitemap directive), `llms.txt`, `ai.txt`, `humans.txt`, `.well-known/security.txt`, `CNAME`, per-route OG images (SVG + PNG), `logo.svg`, `favicon.svg`.
- `sidebars.ts` — two sidebars (Docs + Developer). `.github/workflows/deploy.yml` — GitHub Pages deploy (build + publish `build/` on push to `main`).
- `_planning/` — resumable build state (`scope.md`, `plan.md`, `tracker.json`).

---

## Build / deploy

```bash
yarn install          # yarn only (no npm/pnpm)
yarn typecheck        # tsc — must be clean
yarn build            # docusaurus build → ./build (0 errors)
```

**Deploy: GitHub Pages via `.github/workflows/deploy.yml`** — pushing to `main` builds and publishes `build/` automatically (one-time: repo Settings → Pages → Source: GitHub Actions). No Firebase.

**NEVER run `yarn start` / dev server here** (per global rule — the user runs servers).

### Known build caveat (environment, not project)
`yarn build` enables `future.faster` (eager VCS) + `showLastUpdateTime`. Docusaurus walks up to the git **superproject** (`/home/ahsan/Documents/01-code`) and runs `git submodule status` there. The parent meta-repo registers each project as a gitlink but has an **empty `.gitmodules`**, so that command exits 128 and aborts the build. **This is a parent-monorepo state issue, not a defect in this project** — verified on 2026-05-29 that the build succeeds (`[SUCCESS]`, sitemap generated) when the parent's `git submodule status` is neutralized. Fix belongs at the parent meta-repo level (populate/repair `.gitmodules` or drop the gitlinks), not here. Do NOT disable `showLastUpdateTime` to work around a parent-repo problem.

---

## Portfolio Info File — Weekly Update Rule
- Canonical portfolio info file: `/home/ahsan/Documents/ahsan-notebook/static/assets/personal/projects-info-as-portfolio-item/apps/IMTEHANHUB-DOCS_portfolio-info_<YYYY-MM-DD>.md`
- Update at least once per week (and on any material change). Keep the last-updated date in the filename.
- Keep a max-10-entry update history inside the file. On each refresh: prepend today's row, delete the previous dated file, write the new one.
- Tracker: `/home/ahsan/Documents/01-code/docs/tracking/portfolio-info-files-update-tracker.json`
- Last applied: 2026-05-29

## Package Manager Hierarchy: nvm → npm (global) → yarn (local) (IRON-SOLID)

Three tiers, each tool ONLY for its tier — for the best, most reproducible dev results:
- **`nvm`** → install/update Node.js (which bundles `npm`): `nvm install --lts`. Use nvm to get/update `npm` itself.
- **`npm`** → ALL global packages: `npm install -g yarn` (install yarn globally if missing) + `npm install -g <pkg>` (every other global CLI).
- **`yarn`** → ALL local project work: `yarn`, `yarn add <pkg>`, `yarn add -D <pkg>` inside the project.

❌ NEVER use `npm`/`pnpm` for LOCAL installs. NEVER use `pnpm` at all. ✅ Only `yarn.lock` in the project — delete `package-lock.json` and `pnpm-lock.yaml`.

## Package Upgrades: Use `npm-check-updates`
For dependency upgrades use `npx -y npm-check-updates -u && yarn install` (latest STABLE), NOT `yarn upgrade --latest`. Full rule in global `~/.claude/CLAUDE.md`. Last applied: 2026-05-29

## SEO + AEO + Ranking
Diagnostic + fix playbook: `~/.claude/rules/seo-aeo-ranking.md`. This site already ships robots.txt AI-allowlist, llms.txt, ai.txt, site-wide JSON-LD (WebSite + Organization + SoftwareApplication), per-route OG images, and a build-time sitemap. Last applied: 2026-05-29

---

## Share Feature — Web + Mobile Contract (IRON-SOLID)

All user-facing "share" actions follow the global contract: **web** (any browser, incl. mobile web) opens an in-app `WebShareModal` — a social grid (X, Facebook, LinkedIn, WhatsApp, Telegram, Reddit, Email web-intents) + a copy-link button; **native** (Capacitor) uses the OS share sheet via `@capacitor/share`. The web-vs-native split is decided at button-click via `Capacitor.isNativePlatform()`. ❌ Never use `navigator.share` as the primary web path with a silent clipboard fallback. **Full spec: `~/.claude/rules/share-feature.md`.**

---

## Generic Project Rules — MASTER SOURCE
Canonical 43-rule master prompt: `/home/ahsan/Documents/ahsan-notebook/static/assets/txt-files-important/generic-project-rules.md`. Mirror, don't duplicate. Keep this file and `AGENTS.md` in sync.

---

## Gitignore Hygiene (IRON-SOLID)
`.gitignore` stays current with the project structure — ignore only recoverable artifacts (build/`dist`/`www`/`node_modules`/logs/caches/IDE), never lose source. Custom rules always present: `*.ignore.*`, `project-record-ignore/`. This is a **PUBLIC** repo -> secrets/`.env`/keystores are NEVER tracked.
Full rule + private/public protocol: `~/.claude/rules/project-config.md`.
Gitignore Last Verified: 2026-06-24


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) for ANY work in
   this project — they cannot invoke /skills, which RULE #0 makes mandatory. Do ALL work (planning, implementation,
   review, exploration) in the MAIN context. A sub-agent is allowed ONLY when a CUSTOM agent exists in
   `.claude/agents/` for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a needed
   skill is missing, download/enable/install it (or use the nearest installed equivalent and say so) — never
   proceed skill-less.
3. **Model workflow:** PLAN and REVIEW on **Fable 5**; EXECUTE the approved plan on **Opus 4.8**. Plans in
   `~/.claude/plans/`; multi-phase features keep a resumable tracker (`docs/features/<slug>/00-tracker.json`),
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
