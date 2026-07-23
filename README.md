# ImtehanHub Docs

Official documentation for **[ImtehanHub](https://imtehanhub.aoneahsan.com)** — a free, bilingual (Urdu + English) Pakistani exam-preparation platform covering Class 5 through 2nd Year (FA / FSc).

> Live docs: **[imtehanhub-docs.aoneahsan.com](https://imtehanhub-docs.aoneahsan.com)**
> Live app: **[imtehanhub.aoneahsan.com](https://imtehanhub.aoneahsan.com)**
> Author: **[Ahsan Mahmood](https://aoneahsan.com)** — `aoneahsan@gmail.com`

The **ImtehanHub application** is private (proprietary). **This documentation site** is open source under MIT so anyone can read it, learn from how it's built, or contribute corrections.

## Stack

- [Docusaurus 3](https://docusaurus.io) classic preset (TypeScript)
- React 19, MDX
- GitHub Pages + custom domain at `imtehanhub-docs.aoneahsan.com` (`static/CNAME`)
- AI-bot-friendly: `robots.txt`, `llms.txt`, `ai.txt`, JSON-LD, sitemap.xml, RSS feed

## Local development

```bash
yarn install          # Install dependencies (yarn only — no npm/pnpm)
yarn build            # Production build into ./build (must be 0 errors)
yarn typecheck        # TypeScript check
yarn serve            # Serve the built site locally on port 3000
```

> `yarn start` runs the Docusaurus dev server — fine for local previews while writing docs. CI and deploys run `yarn build` only.

## Deploy (GitHub Pages)

Deployment is automatic. Every push to `main` runs the [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) workflow, which builds the site with `yarn build` and publishes `build/` to GitHub Pages via the official `upload-pages-artifact` / `deploy-pages` actions. You can also trigger it manually from the Actions tab (**Deploy to GitHub Pages → Run workflow**).

The custom domain `imtehanhub-docs.aoneahsan.com` is set by [`static/CNAME`](./static/CNAME) (copied into `build/` on every build). One-time repo setup: **Settings → Pages → Source: GitHub Actions**.

## Project structure

```
imtehanhub-docs/
├── _planning/           # Resumable planning state (scope, plan, tracker.json)
├── blog/                # Changelog (routed at /changelog)
├── docs/                # The actual docs content
│   ├── getting-started/
│   ├── credits.md
│   └── ... (filled per batch)
├── src/
│   ├── css/custom.css   # Brand styles (Emerald → Sky gradient)
│   └── pages/index.tsx  # Branded home page
├── static/
│   ├── img/             # Logo, favicon, OG image (SVG)
│   ├── robots.txt       # AI-bot allowlist
│   ├── llms.txt         # llmstxt.org format
│   ├── ai.txt           # AI training/citation policy
│   ├── humans.txt
│   ├── CNAME            # Custom domain
│   └── .well-known/security.txt
├── .github/workflows/   # deploy.yml — build + publish to GitHub Pages
├── docusaurus.config.ts # Site config + SEO
└── sidebars.ts          # Diátaxis-aware sidebars
```

## Resumability

This project is being built in batches. Pick up where the last session left off via:

- [`_planning/scope.md`](./_planning/scope.md) — what we're documenting
- [`_planning/plan.md`](./_planning/plan.md) — the 8-batch plan with per-page deliverables
- [`_planning/tracker.json`](./_planning/tracker.json) — current batch status, next action, last-successful-run timestamp

## License

- **This documentation site** — MIT (see [LICENSE](./LICENSE)).
- **The ImtehanHub application** — proprietary, private repo.

## Author

**Ahsan Mahmood**

- Portfolio: [aoneahsan.com](https://aoneahsan.com)
- Email: [aoneahsan@gmail.com](mailto:aoneahsan@gmail.com)
- LinkedIn: [linkedin.com/in/aoneahsan](https://linkedin.com/in/aoneahsan)
- GitHub: [github.com/aoneahsan](https://github.com/aoneahsan)
- Phone / WhatsApp: +92 304 6619706
