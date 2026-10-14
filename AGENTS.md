# ImtehanHub docs guide

**Last updated:** 2026-10-14. This public Docusaurus repository is `aoneahsan/imtehanhub-docs` on `main`; the private product is in `../imtehanhub/`. The canonical docs domain is `https://imtehanhub-docs.aoneahsan.com`, deployed only by `.github/workflows/deploy-pages.yml` to GitHub Pages.

## Rules

- Public repository: never add `.env`, credentials, service accounts, keystores, private hostnames or local vault paths. Use Yarn for local work.
- Describe verified product behavior only. The old Firebase app/backend will be replaced in a later Supabase redevelopment; do not make new availability or deployment claims until they are supported by app evidence.
- `docs/` holds the bilingual exam-prep guide; `blog/` is the changelog. Keep title, description, related links and current app boundaries honest. No iOS or browser-extension claim.
- Build with `yarn install --immutable`, `yarn typecheck`, `yarn build`. A push to `main` deploys automatically, so check the fresh local build in controlled Chrome before pushing. Use the existing Pages workflow and CNAME; never deploy this site to Firebase.
- The 2026-07 guide included stale model routing and an inaccurate assertion that this checkout had no remote. Git history preserves that record; this pair reflects the verified 2026-10 repository state.

## Context budget

| Context budget | Value |
|---|---|
| Last optimized | 2026-10-14 |
| Next routine optimization eligible | 2026-11-13 |
| Guide bytes | 1667 B |
| Covered subtree | Public docs repository root. |
| Method | Removed stale model, remote and duplicate fleet instructions; kept Pages and public-repo constraints. |
