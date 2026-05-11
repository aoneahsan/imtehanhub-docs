---
id: search
title: Search and filters across the app
sidebar_label: Search
sidebar_position: 9
description: ImtehanHub has multiple search surfaces — global search across knowledge base, sitemap fuzzy search, blog tag filter, history filters, and bookmarks search. Each is tuned for its surface.
keywords:
  - ImtehanHub search
  - knowledge base search
  - blog tag filter
  - history filter
  - bookmarks search
slug: /discovery/search
---

# Search and filters across the app

**Search** on ImtehanHub is **per-surface** rather than one global universal search. Each surface has filters tuned to what you would naturally search there: knowledge-base full-text, blog tag-and-title, history by class/subject/mode/date, bookmarks by question text. The decision to keep search per-surface (rather than one big search bar) is a deliberate UX call.

> **TL;DR** — Use the search box on the page where the content lives. There is no single "search the whole site" bar — each surface knows what to match against.

## Why per-surface search

Three reasons:

1. **Different content needs different ranking.** Searching for "kinematics" in the knowledge base ranks long-form articles. Searching for "kinematics" in your bookmarks ranks individual question text. Same query, different intent — a single search bar would have to guess.
2. **Performance.** Full-text indexes are expensive. Per-surface indexes (computed at write time) keep searches sub-10 ms.
3. **Discoverability.** Users naturally search where they are looking. A history-search lives on the history page; a knowledge-search lives in the knowledge base. The location is the context.

## The search surfaces

### Knowledge base — full-text fuzzy search

`/learn` has a search bar at the top. Substring + synonym match against the pre-computed `searchBlob` field on each entry. See [Knowledge base](/docs/discovery/knowledge-base) for details.

### Sitemap — fuzzy card filter

`/sitemap` has a filter bar that narrows the visible card set. Substring match on title + description + tags. ~50-100 cards, < 2 ms per keystroke.

### Blog — tag + title

`/blog` supports `?tag=physics` (tag filter) and `?q=revision` (title-and-excerpt match). Full-body search is on the roadmap.

### Test history — multi-axis filter

`/app/history` supports filters via URL state:

| Filter | Param | Examples |
|---|---|---|
| Status | `?status=` | `submitted`, `in-progress`, `all` |
| Class | `?class=` | `c9`, `1st-year` |
| Subject | `?subject=` | `c9-physics` |
| Mode | `?mode=` | `mcq`, `short`, `long` |
| Date range | `?range=` | `7d`, `30d`, `all` |
| Search | `?q=` | matches chapter or subject name |

See [Test history](/docs/tests/history).

### Bookmarks — class / subject / mode / search

`/app/bookmarks` filters by class, subject, mode, date, and a text search across question stems. Each bookmark indexed with a small `searchBlob` for fast match.

### Subjects browse — sort + filter

`/subjects/:class` and `/subjects/:class/:subject` support sort (alphabetical / question count / activity) and group filter (Pre-Med / Pre-Eng / ICS at Intermediate level).

### Community feed — chapter / type / source

`/community/feed` filters submissions by class, subject, chapter, type (MCQ / Short / Long / Chapter Explanation), and verification status (eligible / pending).

## Common search-pattern: pre-computed search blob

Most fast searches on ImtehanHub use the same trick: a pre-computed lowercase blob field on each searchable document. At write time, the relevant fields (title + description + tags) are concatenated, lowercase-folded, and stored. At query time, the search runs a substring scan over the cached blob — no client-side string operations on every keystroke.

For 15,000+ entries, the cached approach scales to ~5-10 ms per keystroke. Without the cache, naive scanning would be 100-200 ms per keystroke (laggy).

The pattern is documented in detail in the developer docs (lands in Batch 6).

## URL state preservation

Every search and filter state lives in the URL. Examples:

- `/learn?q=newton&type=concept-guide` — filtered knowledge base.
- `/blog?tag=physics&range=30d` — filtered blog.
- `/app/history?subject=c9-physics&mode=mcq&range=7d&q=kinematics` — narrow history.
- `/app/bookmarks?class=c9&q=force` — narrow bookmarks.

Reload restores the same view. Bookmark a search-result URL to come back to it any time.

## What is NOT searchable

- **Test session question text in past results** — too granular to index for full-text. Use bookmarks instead (bookmark questions you want to find later).
- **Comments on community submissions** — comments are short-lived discussion, not reference content.
- **Audit log** — admin-only and has its own internal filters.

## Common questions

### Why no global search bar?

Because each surface needs different ranking. A single bar would have to either show a mediocre mix from each, or force users to pick a surface first (which is what they already do by being on a page). The per-surface approach is the cleaner UX.

### Can I search across English and Urdu at the same time?

Yes — search blobs include both languages. A query of "force" matches entries in either language; a query in Urdu matches both Urdu entries and any English entry that includes the Urdu term.

### Why does my search return 0 results when I know the entry exists?

Two common reasons:

1. **Search is substring, not semantic.** "Newton's laws" finds entries with that exact phrase but not entries about "force and motion". Search the broader topic.
2. **The entry's searchBlob has not been recomputed.** Recomputation runs on document write; if a field was edited but the blob recompute logic missed it, the entry might not match. Report via Contact.

### Is there an admin search across users?

Yes — `/admin/users` has a search by email / display name. Admin-only.

## Next

- [Knowledge base](/docs/discovery/knowledge-base) — the most full-text search-heavy surface.
- [Sitemap page](/docs/discovery/sitemap-page) — the fuzzy navigation search.
- [Sharing](/docs/discovery/share) — once you find what you wanted.
