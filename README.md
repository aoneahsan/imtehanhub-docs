# ImtehanHub Docs

Official documentation for **[ImtehanHub](https://imtehanhub.aoneahsan.com)** — a free, bilingual (Urdu + English) Pakistani exam-preparation platform covering Class 5 through 2nd Year (FA / FSc).

> Live docs: **[imtehanhub-docs.aoneahsan.com](https://imtehanhub-docs.aoneahsan.com)**
> Live app: **[imtehanhub.aoneahsan.com](https://imtehanhub.aoneahsan.com)**
> Author: **[Ahsan Mahmood](https://aoneahsan.com)** — `aoneahsan@gmail.com`

The **ImtehanHub application** is private (proprietary). **This documentation site** is open source under MIT so anyone can read it, learn from how it's built, or contribute corrections.

## Stack

- [Docusaurus 3](https://docusaurus.io) classic preset (TypeScript)
- React 19, MDX
- Firebase Hosting (free tier) at `imtehanhub-docs.aoneahsan.com`
- AI-bot-friendly: `robots.txt`, `llms.txt`, `ai.txt`, JSON-LD, sitemap.xml, RSS feed

## Local development

```bash
yarn install          # Install dependencies (yarn only — no npm/pnpm)
yarn build            # Production build into ./build (must be 0 errors)
yarn typecheck        # TypeScript check
yarn serve            # Serve the built site locally on port 3000
```

> `yarn start` runs the Docusaurus dev server — fine for local previews while writing docs. CI and deploys run `yarn build` only.

## Deploy (Firebase Hosting)

```bash
yarn build
npx -y firebase-tools@latest deploy --only hosting
```

The `firebase.json` is preconfigured with cache headers for static assets, correct content types for `llms.txt` / `ai.txt` / `sitemap.xml`, security headers, and a redirect from `/docs` to `/docs/getting-started/welcome`.

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
├── docusaurus.config.ts # Site config + SEO
├── sidebars.ts          # Diátaxis-aware sidebars
├── firebase.json
└── .firebaserc
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
