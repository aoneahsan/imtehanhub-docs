# Deployment Checklist — Batch 7

All code/content/SEO infrastructure for ImtehanHub Docs is complete. The remaining
steps are operations the maintainer (Ahsan Mahmood) must run — they touch external
systems (GitHub, Firebase Console, DNS, search engines) that the build agent cannot
authenticate against.

Tick each step as it's done. Update the `Last applied` line in the root project's
`CLAUDE.md` once Step 8 (initial deploy) is live.

---

## 1. Create the public GitHub repository

```bash
# On github.com — create the repo:
#   Name: imtehanhub-docs
#   Owner: aoneahsan
#   Visibility: Public
#   Do NOT initialise with README / .gitignore / LICENSE (we have ours)

# Then wire up the local repo:
cd /home/ahsan/Documents/01-code/projects/imtehanhub-docs
git remote add origin git@github.com:aoneahsan/imtehanhub-docs.git
git branch -M main
git push -u origin main
```

After the push, the repo will show 8 commits (`batch-0` through `batch-7`). Set the
repo description to: `Public documentation for ImtehanHub — Pakistani exam prep app
(private app repo). Built with Docusaurus. Author: Ahsan Mahmood.`

Add topics: `pakistan`, `education`, `docusaurus`, `documentation`, `firebase`,
`capacitor`, `exam-prep`, `react`.

---

## 2. Confirm or create the Firebase project for hosting

```bash
# Check what's in .firebaserc:
cat .firebaserc
# { "projects": { "default": "imtehanhub-docs" } }
```

If a Firebase project named `imtehanhub-docs` does not already exist:

```bash
# Either use the console (recommended for first-time): https://console.firebase.google.com
# Or via CLI:
npx -y firebase-tools@latest projects:create imtehanhub-docs --display-name="ImtehanHub Docs"
```

Inside the project, **enable Hosting** under Build → Hosting. No other Firebase
services are needed (no Firestore, no Functions — this is a static site).

---

## 3. First deploy

```bash
cd /home/ahsan/Documents/01-code/projects/imtehanhub-docs
yarn build                                    # confirm clean
npx -y firebase-tools@latest login            # interactive — one-time
npx -y firebase-tools@latest deploy --only hosting
```

Expected output ends with a `web.app` URL like `https://imtehanhub-docs.web.app`.
Open it in a browser and click through 5-10 pages to confirm everything renders.

---

## 4. Custom domain (DNS)

Add the custom domain via Firebase Console → Hosting → Add custom domain.

Use: `imtehanhub-docs.aoneahsan.com`

Firebase will give you a TXT record (for verification) and an A record (for routing).
Add both at your DNS provider (Cloudflare / wherever `aoneahsan.com` lives).

The `static/CNAME` file already declares `imtehanhub-docs.aoneahsan.com` for any
GitHub Pages fallback path.

DNS propagation: typically 5-60 minutes. Verify with:

```bash
dig +short imtehanhub-docs.aoneahsan.com
```

Once it resolves, https://imtehanhub-docs.aoneahsan.com serves the docs site with
the automatic Let's Encrypt SSL certificate Firebase issues.

---

## 5. Google Search Console

1. Open https://search.google.com/search-console
2. Add property → `https://imtehanhub-docs.aoneahsan.com` (URL prefix)
3. Verify via DNS TXT (same provider you used in Step 4)
4. Submit the sitemap: `https://imtehanhub-docs.aoneahsan.com/sitemap.xml`
5. Inspect the homepage URL → Request indexing
6. Inspect top 10 priority pages → Request indexing each:
    - `/docs/getting-started/welcome`
    - `/docs/concepts/content-hierarchy`
    - `/docs/community/overview`
    - `/docs/account/billing`
    - `/docs/mobile/install`
    - `/docs/privacy/overview`
    - `/docs/developers/overview`
    - `/docs/developers/seo/postbuild`
    - `/docs/credits`
    - `/changelog`

Check the Pages report weekly for the first month. Expect Indexed count to climb
slowly — new domains take 2-6 weeks to leave the Google sandbox.

---

## 6. Bing Webmaster Tools

Feeds Yahoo, DuckDuckGo, and **ChatGPT Search**. Higher priority than the raw
traffic numbers suggest.

1. https://www.bing.com/webmasters
2. Add site → import from Google Search Console (one-click if Step 5 is done)
3. Submit sitemap
4. URL submission tool → submit top 10 pages

---

## 7. Yandex Webmaster

Smaller but covers Russian-language LLMs and adds another crawler.

1. https://webmaster.yandex.com
2. Add site → verify via HTML file (upload to `static/`) or DNS
3. Submit sitemap

---

## 8. IndexNow

Push URL changes instantly to Bing / Yandex / Naver / others.

1. Generate an API key (32-character hex string): https://www.bing.com/indexnow
2. Save the key as `static/{key}.txt` containing the key as the file content
3. Re-deploy so the key file is accessible at `https://imtehanhub-docs.aoneahsan.com/{key}.txt`
4. On every future content push, ping:
   `https://api.indexnow.org/IndexNow?url=<full-url>&key=<key>`

A small helper script for the Vercel-of-Docusaurus path is roadmapped — for now,
manual ping after each deploy is fine.

---

## 9. Footer link in the main ImtehanHub app

**Already done in this batch.** The footer in
`/home/ahsan/Documents/01-code/projects/imtehanhub/src/components/layout/Footer.tsx`
now includes a `Documentation ↗` link to https://imtehanhub-docs.aoneahsan.com in
the Connect column.

The next time the main app is deployed (separate flow — `yarn build` + Firebase
deploy in that project), the footer link will be live. After deployment, click the
link and verify it opens the docs site in a new tab (or new browser on mobile via
`openExternalUrl`).

---

## 10. Third-party presence (where AI actually finds you)

These take longer but matter more for AI citations than raw SEO. Princeton GEO
study (KDD 2024) shows AI engines cite Wikipedia (~7.8% of ChatGPT citations) and
Reddit (~1.8%) far more than primary domains.

| Surface | Action |
|---|---|
| Wikipedia | Get a paragraph mention in an existing Pakistani-education article (cite a primary source — the live app counts) |
| Reddit | Genuine answers in r/Pakistan, r/PakistaniEducation, r/csstudents — link only when relevant |
| Product Hunt | Launch the app (not the docs) — drives a backlink + Hacker News crosspost potential |
| AlternativeTo | Profile for the app, cross-link to docs |
| GitHub Topics | Tag the docs repo with the topics in Step 1 |
| YouTube | Short walkthrough videos of features — Google AI Overviews surface YouTube heavily for how-to queries |

None of these are quick wins. Treat as ongoing background work.

---

## 11. Update the project's CLAUDE.md `Last applied` date

After Step 3 (initial deploy) is live, update:

```
/home/ahsan/Documents/01-code/projects/imtehanhub-docs/_planning/tracker.json
  → status: all-batches-complete
  → lastSuccessfulRun: YYYY-MM-DD
  → nextEligibleRun: YYYY-MM-DD + 7 days
```

And add a small "Last applied: YYYY-MM-DD" note to the main imtehanhub project's
root `CLAUDE.md` under the "SEO + AEO + Ranking" section, so a future re-run knows
when this prompt last successfully completed.

---

## Verification: success criteria

- [ ] `https://imtehanhub-docs.aoneahsan.com` resolves and serves the docs
- [ ] `https://imtehanhub-docs.aoneahsan.com/sitemap.xml` returns valid XML with all routes
- [ ] `https://imtehanhub-docs.aoneahsan.com/llms.txt` returns the markdown index
- [ ] `https://imtehanhub-docs.aoneahsan.com/ai.txt` returns the AI policy
- [ ] `https://imtehanhub-docs.aoneahsan.com/robots.txt` allows GPTBot / ClaudeBot / PerplexityBot
- [ ] GSC sitemap submitted and processing
- [ ] Bing Webmaster sitemap submitted
- [ ] Main app footer "Documentation ↗" link works
- [ ] Tracker `lastSuccessfulRun` updated

When all eleven items above are checked, this prompt has fully completed. Next
eligible re-run: today + 7 days (see `nextEligibleRun` in tracker.json).
