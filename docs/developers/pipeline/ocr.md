---
id: ocr
title: OCR fallback — Tesseract for image-only Pakistani textbooks
sidebar_label: OCR fallback
sidebar_position: 2
description: Tesseract OCR with English + Urdu language packs recovers text from scanned-image Pakistani textbook PDFs, then feeds the standard transform → validate → seed pipeline.
keywords:
  - Tesseract OCR Urdu English
  - Pakistani textbook OCR
  - scanned PDF text extraction
  - pdftoppm Tesseract pipeline
  - bilingual OCR Pakistan
slug: /developers/pipeline/ocr
---

# OCR fallback for image-only textbooks

**A significant fraction of Pakistani textbook PDFs are scanned images, not real text.** PDFs from older editions, low-budget print runs, or unofficial uploads often look like searchable PDFs but contain zero extractable text. The data pipeline's OCR fallback at `pipeline/ocr/` handles these — Tesseract with English + Urdu language packs recovers the text, then the same downstream stages take over.

> **TL;DR** — When PDF text extraction returns near-empty, `pdftoppm` renders each page to PNG at 300 DPI and Tesseract runs with `eng+urd` traineddata. Output goes through the regular transform / validate / seed pipeline. Quality is good enough for MCQs (which are short, structured text) and adequate for short-answer prose.

## When OCR fires

The pipeline tries the cheap path first:

```
1. pdftotext input.pdf -      → if output has > 50 words per page, done
                              → else fall back to OCR
2. pdftoppm -r 300 input.pdf  → page-N.png
3. tesseract page-N.png       → page-N.txt (eng+urd)
4. concatenate to one text file, feed into transform stage
```

The decision is automatic in `pipeline/extract-pdf-text.cjs`:

```javascript
// pipeline/extract-pdf-text.cjs (sketch)
async function extractText(pdfPath) {
  const direct = await pdftotext(pdfPath);
  const wordsPerPage = countWords(direct) / countPages(pdfPath);
  if (wordsPerPage >= 50) {
    return { method: 'pdftotext', text: direct };
  }
  const ocrText = await runOcr(pdfPath);
  return { method: 'ocr', text: ocrText, confidence: ocrText.confidence };
}
```

The "50 words per page" threshold catches the common pattern of scanned PDFs containing a sparse layer of digitised metadata (page numbers, title text) but no body text.

## The OCR step

```javascript
// pipeline/ocr/run-ocr.cjs (sketch)
async function runOcr(pdfPath) {
  const tmp = await mkdtemp();
  await execAsync(`pdftoppm -r 300 -png "${pdfPath}" "${tmp}/page"`);

  const pages = await listFiles(tmp, /^page-\d+\.png$/);
  const results = [];

  for (const page of pages) {
    const { stdout } = await execAsync(
      `tesseract "${tmp}/${page}" - -l eng+urd --psm 6 -c tessedit_char_whitelist=...`
    );
    results.push({ page, text: stdout, confidence: parseConfidence(stdout) });
    await unlink(`${tmp}/${page}`);
  }

  await rmdir(tmp);
  return joinTexts(results);
}
```

The flags matter:

- `-l eng+urd` — both languages enabled, Tesseract auto-selects per region.
- `--psm 6` — assume a single uniform block of text. Good default for textbook pages.
- `-r 300` — render at 300 DPI; lower DPI degrades Urdu recognition disproportionately.

## Language data — Urdu traineddata

Tesseract's default install ships English + a few others. Urdu must be added explicitly:

```bash
# Ubuntu / Debian
sudo apt-get install tesseract-ocr-urd
# Or download manually:
sudo cp urd.traineddata /usr/share/tesseract-ocr/{version}/tessdata/
```

We use the **`tessdata_best/urd.traineddata`** (the high-accuracy variant) because Pakistani Urdu uses Nastaliq script which is harder to recognise than Naskh. The "fast" variant from `tessdata_fast/` produces unusable output on Nastaliq.

## Post-OCR cleanup

OCR output is noisy. The pipeline runs a small cleanup pass before handing off to the transform stage:

| Step | What it does |
|---|---|
| Whitespace normalisation | Collapse multiple spaces, fix Unicode-zero-width-space pollution |
| Common-substitution table | `0 → O`, `1 → I`, `5 → S` in English contexts where pure-text is more likely than digits |
| Urdu diacritic restoration | Heuristic — some diacritics are systematically dropped; restore the obvious ones |
| Hyphen-newline removal | Lines ending `-\n` are joined to fix line-break hyphenation |
| Page-number stripping | Footers like `12` or `Page 12` are removed |
| Header repetition removal | Repeated headers across pages (book title) are deduped |

After cleanup the text goes through the same `transform-ilmkidunya.cjs` (renamed `transform-pdf.cjs` for this path) that finds MCQ blocks, options, and correct-answer markers.

## Quality — what works and what doesn't

OCR + Tesseract on Pakistani textbooks is **good enough for MCQs** but has known weak spots:

| Content type | OCR quality | Notes |
|---|---|---|
| English MCQ stems | 95-99% | Tesseract handles English near-perfectly at 300 DPI |
| English MCQ options | 95-99% | Same |
| Urdu MCQ stems (Naskh / lightly-styled) | 85-92% | Most modern textbook prints |
| Urdu MCQ stems (Nastaliq / heavily-styled) | 60-75% | Older textbooks, calligraphic prints |
| English short-answer paragraphs | 85-92% | Multi-line prose loses occasional words |
| Urdu short-answer paragraphs | 70-85% | Line wrapping + diacritics |
| Mathematical formulae | 30-50% | Tesseract doesn't understand math; we OCR text then flag formulae for manual review |
| Diagrams / figures | 0% | Skipped — flagged for "image required" rendering |

For content where OCR confidence drops below a threshold (set per subject), the validate stage flags the question for **human review** rather than auto-seeding.

## The fallback chain

Three layers of recovery:

1. **`pdftotext` direct.** Works for actual searchable PDFs. ~70% of sourced PDFs.
2. **OCR with `eng+urd`.** Works for scanned PDFs with reasonable typeface. ~25% more.
3. **Manual transcription.** For the remaining ~5% — old textbook scans with Nastaliq styling — we have a small team of paid (rare exception) volunteers who transcribe pages manually. Their work goes through the same validate / seed pipeline.

The manual fallback is the exception to the zero-cost rule, and only because there is no automated path. Volume is small (a few hundred questions per year).

## Performance and cost

OCR is slow but cheap:

- One 100-page PDF takes ~5-8 minutes on a modern laptop (single CPU thread per page; Tesseract is CPU-bound).
- Memory peak: ~500 MB.
- No paid API.
- Runs on the developer machine, off any free-tier quota.

The full Class 9 + 10 OCR backlog (about 60 PDFs across all subjects) ran on a laptop overnight.

## Capacitor / mobile?

OCR runs on the developer machine, not in the app. The student-facing app reads pre-OCRed content from Firestore like any other content. No client-side Tesseract.

## Common questions

### Why Tesseract and not Google Vision OCR?

Google Vision OCR has a free tier (1,000 pages/month) but exceeds it quickly. Tesseract is free, local, accurate enough for our content, and doesn't depend on a third party. We considered the cloud option for the Nastaliq-heavy fallback but the manual transcription path turned out to be cheaper for the small volume.

### Can I add a new language?

Drop a `{lang}.traineddata` in tessdata and add the language code to the `tesseract -l` flag. Sindhi and Pashto-script traineddata exist and would work — adding them is roadmapped if those subjects gain demand.

### Does the OCR-flagged "uncertain" tag follow into the app?

No — by the time a question is in Firestore, it has passed validation. The uncertainty flag exists only during the pipeline. If a student reports a question via the in-app feedback button (`question-report-service`), it goes into the admin queue for re-review.

### What about LLM-based OCR (GPT-4 Vision etc.)?

Considered. Decided against because (a) it's paid, (b) it produces hallucinated text that looks confident, which is worse than honest Tesseract noise.

## Next

- [Pipeline overview](/docs/developers/pipeline/overview) — the full scrape → transform → validate → seed flow.
- [Postbuild SEO](/docs/developers/seo/postbuild) — how seeded content gets per-route HTML.
- [Community module](/docs/community/overview) — the parallel path with human authors.
