# `_planning/` — Resumable State

This folder is the **single source of truth** for what the ImtehanHub Docs project is building, the plan to get there, and where the next session should pick up.

If you (or a future Claude session) ever runs the prompt:

> "Create full detailed docs for this project using Docusaurus, with each and every feature explained, deploy on Firebase, submit to GSC..."

…the **first action** is to read these three files:

| File | What it tells you |
|---|---|
| [`scope.md`](./scope.md) | What we're documenting (every module, every feature, every route, every concept). The frozen "definition of done" for the docs project. |
| [`plan.md`](./plan.md) | The 8-batch plan. Each batch lists the exact pages to create, with target word counts, sidebar slot, and frontmatter requirements. Batches are sized so each one fits comfortably in a single Claude session. |
| [`tracker.json`](./tracker.json) | The resumable state. Tells you which batch is next, what's been completed, when the last successful run was, and when the next eligible run is. |

## How resumability works

1. **On every re-run of the prompt**, read `tracker.json`.
2. If `status === 'all-batches-complete'` AND `lastSuccessfulRun` is within the last **7 days**, report "Already complete; nothing to do" and stop. (7-day cooldown so the prompt isn't re-running the whole pipeline weekly.)
3. If `status === 'all-batches-complete'` AND `lastSuccessfulRun` is older than 7 days, run the **maintenance pass** instead: bump `lastUpdated` dates, rerun build, re-deploy, submit refreshed sitemap to GSC + Bing + IndexNow.
4. Otherwise, find the next batch in `tracker.json.batches[]` with `status: 'pending'`, run only that batch, then update `tracker.json` and commit.

## What "complete" means

The docs project is **complete** when every batch in `plan.md` has `status: 'complete'` in `tracker.json` AND:

- [ ] `yarn build` is clean (zero errors, zero warnings beyond ones explicitly suppressed in config)
- [ ] `yarn typecheck` is clean
- [ ] The site is live at `https://imtehanhub-docs.aoneahsan.com`
- [ ] GitHub repo `aoneahsan/imtehanhub-docs` is public
- [ ] Submitted to: Google Search Console, Bing Webmaster Tools, Yandex Webmaster, IndexNow
- [ ] Linked from the main `imtehanhub` app footer
- [ ] All "human-only" steps from `plan.md` Batch 7 are confirmed by the user

## Skill bindings (per RULE #0)

Every batch MUST invoke the matching skill(s) BEFORE writing content:

| Batch | Skills to invoke |
|---|---|
| 1 — Foundations | `documentation-writer`, `copywriting`, `ai-seo` |
| 2 — Tests & Practice | `documentation-writer`, `copywriting` |
| 3 — Community Module | `documentation-writer`, `copywriting` |
| 4 — Discovery + Engagement | `documentation-writer`, `copywriting` |
| 5 — Account, Admin, Privacy | `documentation-writer`, `copywriting` |
| 6 — Developer / Contributor | `documentation-writer`, `react-best-practices`, `firebase-firestore-standard`, `capacitor-best-practices` |
| 7 — Polish + SEO + Deploy | `ai-seo`, `seo`, `firebase-hosting-basics` |

## Author

**Ahsan Mahmood** — `aoneahsan@gmail.com` — [aoneahsan.com](https://aoneahsan.com)
