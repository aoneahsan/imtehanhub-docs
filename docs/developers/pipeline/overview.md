---
id: overview
title: Data pipeline — free scrapers, transforms, validation, seeding
sidebar_label: Pipeline overview
sidebar_position: 1
description: Free Pakistani exam-prep sites scraped, transformed, validated, and seeded to Firestore by Node.js scripts. Zero paid APIs, zero LLM calls in the official pipeline.
keywords:
  - free Pakistani exam content
  - web scraper Node.js
  - Firestore seeding script
  - exam question pipeline
  - ilmkidunya scraping
slug: /developers/pipeline/overview
---

# Data pipeline

**The official MCQ / short / long question content** in ImtehanHub comes from a Node.js pipeline at `pipeline/`. Free Pakistani exam-prep sites are the source; structured intermediate JSON files are the storage; per-subject seeders push the final data to Firestore. No paid APIs, no LLM calls, no scraped PII.

> **TL;DR** — `scrape-*.cjs` pulls raw HTML, `transform-*.cjs` normalises into typed JSON, `seed-subject.cjs --subject X` writes to Firestore. The full pipeline runs locally on a developer machine; production reads the seeded data, never re-scrapes.

## Why a custom pipeline

Three constraints shaped the design:

1. **Zero-cost.** No paid scraping service, no AI-API content generation. The whole pipeline must run on a developer laptop.
2. **Pakistani curriculum coverage.** Free Pakistani exam-prep sites (ilmkidunya.com, gotest.pk, others) carry the highest concentration of board-mapped MCQs in Urdu English. No commercial dataset matches this for Class 5-12.
3. **Validation at the gate.** Web-scraped content is messy. Every question must pass schema + content checks before it's allowed into the seeder.

## The pipeline stages

```
┌─────────────────────────┐
│ 1. SCRAPE               │  scrape-ilmkidunya.cjs, scrape-ilmkidunya-short.cjs,
│                         │  scrape-ilmkidunya-long.cjs, scrape-gotest.cjs
│ HTML → raw JSON         │  Output: pipeline/intermediate/{source}/{subject}/raw.json
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│ 2. TRANSFORM            │  transform-ilmkidunya.cjs (also handles short/long)
│                         │
│ raw JSON → typed JSON   │  Output: pipeline/intermediate/{source}/{subject}/transformed.json
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│ 3. VALIDATE             │  validate-subject.cjs
│                         │
│ typed JSON → report     │  Output: pipeline/logs/validate-{subject}-{ts}.json
└──────────┬──────────────┘
           │
           ↓
┌─────────────────────────┐
│ 4. SEED                 │  seed-subject.cjs --subject {id} [--force]
│                         │
│ typed JSON → Firestore  │  Writes: classes/, subjects/, books/, chapters/, questions/
└─────────────────────────┘
```

Each stage is idempotent — re-running with the same input is safe.

## Stage 1 — scraping

Each source has its own scraper. `scrape-ilmkidunya.cjs` is the workhorse — handles MCQs for Class 9 / 10 / 11 / 12 across the seeded subjects. Key concerns:

```javascript
// pipeline/scrape-ilmkidunya.cjs (sketch)
const sources = await loadSubjectSourceList('biology-9');
for (const src of sources) {
  const html = await fetchWithRetry(src.url);
  const $ = cheerio.load(html);

  const questions = [];
  $('.mcq-block').each((_, el) => {
    questions.push({
      stem: $(el).find('.stem').text().trim(),
      stemUrdu: $(el).find('.stem-urdu').text().trim(),
      options: $(el).find('.options li').map((_, li) => $(li).text().trim()).get(),
      optionsUrdu: $(el).find('.options-urdu li').map((_, li) => $(li).text().trim()).get(),
      correctIndex: parseInt($(el).find('.correct').attr('data-index'), 10),
      sourceUrl: src.url,
      chapterHint: src.chapter,
    });
  });

  await writeRawJson('biology-9', src.chapter, questions);
  await sleep(POLITENESS_MS);   // never hammer a free source
}
```

Conventions:

- **Polite scraping.** `POLITENESS_MS` (default 1500-3000 ms) between requests. No parallel fetch storms.
- **User-Agent honesty.** Identifies as `ImtehanHubScraper/1.0 (+aoneahsan.com)` so the source's admin can email if there's a problem.
- **Retry-and-resume.** Each chapter is a separate output file. Re-running skips already-fetched chapters unless `--refresh` is passed.
- **No JS execution.** Cheerio + node-fetch only. Sites that require a headless browser are not in scope (the pool of static-HTML sources is wide enough).

Image-only PDFs (a common case for older textbooks) flow through an OCR fallback — see [OCR](/docs/developers/pipeline/ocr).

## Stage 2 — transform

The transform pass normalises raw scrape output into the project's typed JSON schema:

```javascript
// pipeline/transform-ilmkidunya.cjs (sketch)
function transformQuestion(raw) {
  const cleanedStem = stripHtml(raw.stem);
  const cleanedStemUrdu = stripHtml(raw.stemUrdu);

  return {
    id: makeQuestionId(raw),
    type: 'mcq',
    stem: cleanedStem,
    stemUrdu: cleanedStemUrdu,
    options: raw.options.map(stripHtml),
    optionsUrdu: raw.optionsUrdu.map(stripHtml),
    correctIndex: raw.correctIndex,
    classId: deriveClass(raw.chapterHint),
    subjectId: deriveSubject(raw.chapterHint),
    chapterId: deriveChapter(raw.chapterHint),
    source: 'ilmkidunya',
    sourceUrl: raw.sourceUrl,
    seededAt: new Date().toISOString(),
  };
}
```

Outputs go to `pipeline/intermediate/{source}/{subject}/transformed.json`, ready for validation.

The transform also handles **deduplication** — same stem across two sources collapses to one canonical entry with both URLs in a `sources[]` array.

## Stage 3 — validate

`validate-subject.cjs` runs schema and content checks:

| Check | Severity |
|---|---|
| Required fields present (`stem`, `options`, `correctIndex`) | Error — drops the question |
| `options.length === 4` for MCQs | Error |
| `0 <= correctIndex < options.length` | Error |
| `stem.length >= 10` | Error |
| Urdu fields present and non-empty | Warning — flagged for translation later, question still seeds |
| No duplicate stem within the subject | Warning — merged into `sources[]` |
| ChapterId resolves to a real chapter in the taxonomy | Error |
| Profanity / placeholder text (`TODO`, `FIXME`) | Error |

The validate report (`pipeline/logs/validate-{subject}-{ts}.json`) lists every dropped or flagged question with the reason. A subject does not seed if any error-level issues remain.

## Stage 4 — seed

`seed-subject.cjs --subject biology-9 [--force]` does the Firestore writes:

```javascript
// pipeline/seed-subject.cjs (sketch)
const transformed = await loadTransformed(subjectId);
const batches = chunk(transformed.questions, 500);   // Firestore batch limit

for (const batch of batches) {
  const wb = firestore.batch();
  for (const q of batch) {
    wb.set(firestore.doc(`questions/${q.id}`), q);
  }
  await wb.commit();
  logger.info(`[seed] wrote ${batch.length} questions for ${subjectId}`);
}
```

Conventions:

- **Firebase Admin SDK.** Uses `service-account/imtehanhubai.json` (kept out of git via `.gitignore`).
- **Batches of 500.** Firestore's `WriteBatch` limit.
- **`--force` flag.** Without it, existing question IDs are skipped (idempotent re-runs). With it, they are overwritten.
- **Class / subject / book / chapter parents** are upserted in their own collections before questions are seeded, so dangling references are impossible.

After seeding, the admin "Release readiness" dashboard at `/admin/release-checks` re-validates the in-Firestore data against the same checks.

## Current coverage (as of 2026-04-16)

| Class | Subject | MCQs | Status |
|---|---|---|---|
| 9 | All 8 subjects | ~4,200 | Seeded |
| 10 | All 8 subjects | ~4,800 | Seeded |
| 11 (1st Year) | All 8 subjects | ~3,400 | Seeded |
| 12 (2nd Year) | All 8 subjects | ~3,600 | Seeded |
| 5-8 | 4 core subjects each | ~120 each | Partial — extending in batches |
| Short / long questions | All 8 subjects, Class 9 + 10 | Extending | Pipeline ready; URL templates being confirmed |

The one gap: **Class 5 Computer Science** has no free online source. Roadmapped manually.

## Helper scripts

A handful of supporting scripts:

- `discover-classes-9-10.cjs` — crawls a source's index page to discover subject / chapter URLs before scraping.
- `discover-gotest-posts.cjs` — same for gotest.pk's slug structure.
- `build-c10-configs.cjs` / `build-c11-c12-configs.cjs` — builds subject-source URL configs for batch scraping.
- `extend-books-c58.cjs` / `extend-books-json.cjs` — adds new book entries to the curriculum without re-seeding everything.
- `cleanup-subject.cjs` — purges a subject from Firestore (rare; used when a source turns out to have systematic errors).

Each takes its own flags; all live under `pipeline/` so they don't pollute `src/`.

## What never lives in the pipeline

- **LLM-generated content.** AI question generation exists in the app (admin tool, BYOK), but that produces "community" submissions that go through the same review pipeline as student submissions — never auto-promoted to official.
- **Paid API calls.** No Judge0, no commercial scraping API, no question banks behind subscriptions.
- **User data.** The pipeline only handles official content. Student data is untouched.

## Common questions

### Won't the source site block me?

The polite-pacing + honest User-Agent has kept us in good standing. We monitor source-side rate limits and back off proactively. If a source asks us to stop, we stop.

### Why not Cheerio + Puppeteer for JS-heavy sites?

We considered, decided against:
- Puppeteer / Playwright cost RAM and time per request.
- Free static-HTML sources cover the curriculum already.
- Some sites JS-load to hide content behind ads — scraping that would be impolite.

### Can I add a new source?

Yes — add a new `scrape-{source}.cjs`, output to `pipeline/intermediate/{source}/`, then plug into the transform stage by adding a `source: '{source}'` branch. The validate stage doesn't care about the source — it only cares about the final shape.

### How do I run the full pipeline for one subject?

```bash
node pipeline/scrape-ilmkidunya.cjs --subject biology-9
node pipeline/transform-ilmkidunya.cjs --subject biology-9
node pipeline/validate-subject.cjs --subject biology-9
node pipeline/seed-subject.cjs --subject biology-9
```

Or for everything at once:

```bash
node pipeline/seed-subject.cjs --subject all --force
```

## Next

- [OCR fallback](/docs/developers/pipeline/ocr) — Tesseract for image-only PDFs.
- [Postbuild SEO](/docs/developers/seo/postbuild) — how seeded content becomes 660+ HTMLs.
- [Community module](/docs/community/overview) — the parallel path: peer-contributed content.
