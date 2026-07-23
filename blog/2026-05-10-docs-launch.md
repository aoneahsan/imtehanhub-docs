---
slug: 2026-05-10-docs-launch
title: "ImtehanHub documentation site launches"
authors: [ahsan]
tags: [release, docs]
description: The official ImtehanHub documentation site goes live at imtehanhub-docs.aoneahsan.com — a Docusaurus 3 site with full SEO, AI-bot allowlist, JSON-LD, and a Diátaxis-style structure.
---

The official **[ImtehanHub documentation site](https://imtehanhub-docs.aoneahsan.com)** is now live.

The site is built on [Docusaurus 3](https://docusaurus.io) and deployed to GitHub Pages. It uses the same brand language as the main app — Emerald 600 → Sky 500 gradient, Inter for type, full light/dark mode that respects OS preference.

{/* truncate */}

## Why a separate docs site?

The main app codebase is private. A public, GitHub-indexed documentation site does three things at once:

1. **Improves search visibility.** Google, Bing, ChatGPT, Perplexity, Claude, Gemini, and Copilot all weight GitHub-backed documentation heavily. New domains get sandboxed for months; documentation built on top of an established author profile passes link juice faster.
2. **Lowers the barrier to use.** Students and teachers shouldn't have to discover features by clicking around — they should be able to search "how to take a test on ImtehanHub" and land on a definitive page.
3. **Makes the project hireable.** ImtehanHub demonstrates bilingual ed-tech, growth engineering, programmatic SEO, free-tier Firebase architecture, and Capacitor hybrid mobile in production. Documenting all of this publicly turns the project into a portfolio piece anyone can verify.

## What's in this initial release (Batch 0)

This first cut ships:

- **Branded home page** with hero, 6 feature cards, and an explicit "Built by Ahsan Mahmood" callout.
- **Welcome doc** — the canonical 3-minute introduction for new students.
- **Credits page** — author attribution, contact paths, support channels, license.
- **Changelog** at `/changelog` (this post).
- **SEO baseline** — per-page metadata, JSON-LD (`WebSite`, `Organization`, `SoftwareApplication`), OG cards, sitemap, RSS feed.
- **AI-bot allowlist** — explicit `Allow:` for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot, Applebot-Extended, and more.
- **Crawler artefacts** — `robots.txt`, `llms.txt`, `ai.txt`, `humans.txt`, `.well-known/security.txt`.
- **GitHub Pages deploy** — a GitHub Actions workflow builds the site and publishes it on every push to `main`.
- **Diátaxis sidebar structure** — placeholders ready for content batches 1 through 7.

## What's next

The plan is to fill the docs in 7 content batches over the coming sessions. The plan, scope, and a JSON tracker live in [`_planning/`](https://github.com/aoneahsan/imtehanhub-docs/tree/main/_planning) — anyone can pick the project up mid-stream and continue from where the last session left off.

— **Ahsan Mahmood** ([aoneahsan.com](https://aoneahsan.com))
