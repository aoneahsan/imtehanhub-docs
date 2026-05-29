# ImtehanHub Docs — Project Memory (CLAUDE.md)

**Last Updated**: 2026-05-29

Public documentation / knowledge-base site (Docusaurus 3) for **ImtehanHub** — a free, bilingual (Urdu + English) Pakistani exam-preparation platform for Class 5 → 2nd Year (FA/FSc). This repo is the docs surface only; the ImtehanHub **app** lives in a separate, private repo (`com.aoneahsan.imtehanhub`, https://imtehanhub.aoneahsan.com).

---

## Identity

| Field | Value |
| --- | --- |
| Slug | `imtehanhub-docs` |
| Live docs URL | https://imtehanhub-docs.aoneahsan.com (canonical in `docusaurus.config.ts`; deploy target Firebase Hosting, project `imtehanhub-docs`) |
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
- `sidebars.ts` — two sidebars (Docs + Developer). `firebase.json` / `.firebaserc` — Firebase Hosting config.
- `_planning/` — resumable build state (`scope.md`, `plan.md`, `tracker.json`).

---

## Build / deploy

```bash
yarn install          # yarn only (no npm/pnpm)
yarn typecheck        # tsc — must be clean
yarn build            # docusaurus build → ./build (0 errors)
npx -y firebase-tools@latest deploy --only hosting
```

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

## Package Upgrades: Use `npm-check-updates`
For dependency upgrades use `npx -y npm-check-updates -u && yarn install` (latest STABLE), NOT `yarn upgrade --latest`. Full rule in global `~/.claude/CLAUDE.md`. Last applied: 2026-05-29

## SEO + AEO + Ranking
Diagnostic + fix playbook: `~/.claude/rules/seo-aeo-ranking.md`. This site already ships robots.txt AI-allowlist, llms.txt, ai.txt, site-wide JSON-LD (WebSite + Organization + SoftwareApplication), per-route OG images, and a build-time sitemap. Last applied: 2026-05-29

---

## Generic Project Rules — MASTER SOURCE
Canonical 43-rule master prompt: `/home/ahsan/Documents/ahsan-notebook/static/assets/txt-files-important/generic-project-rules.md`. Mirror, don't duplicate. Keep this file and `AGENTS.md` in sync.
