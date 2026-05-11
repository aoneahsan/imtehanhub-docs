---
id: feed
title: Feed — /feed (HTML) and /feed.xml (RSS)
sidebar_label: Feed
sidebar_position: 6
description: Two complementary surfaces — /feed renders recent blog and knowledge-base updates as a readable stream; /feed.xml is the valid RSS 2.0 feed for any RSS reader.
keywords:
  - ImtehanHub feed
  - RSS feed Pakistan
  - blog RSS subscribe
  - feed.xml study app
slug: /discovery/feed
---

# Feed — /feed (HTML) and /feed.xml (RSS)

**The feed** has two sibling surfaces. **`/feed`** is a human-readable stream of recent blog posts and knowledge-base entries with previews. **`/feed.xml`** is a valid RSS 2.0 file that any RSS reader can subscribe to. They share the same source data; they differ in audience.

> **TL;DR** — `/feed` for humans (cards, summaries). `/feed.xml` for RSS readers (Feedly, Inoreader, NewsBlur, FreshRSS). Both auto-update every build.

## What is in the feed

Both surfaces include:

- **Blog posts** with a publish date in the last 90 days.
- **Knowledge-base entries** with a publish or refresh date in the last 90 days.

Older items are excluded by default (the `/blog` and `/learn` indexes are the canonical browse surfaces for older content). The cap on 90 days keeps the feed focused on recency.

## /feed (the HTML page)

A single page rendering the recent items as cards:

- Title (English + Urdu).
- Publish or update date.
- 1-2 sentence excerpt.
- Type badge (Blog / Knowledge / Changelog).
- Click to open the full entry.

Sorted reverse-chronological. Latest at the top.

The page also has prominent links to `/feed.xml` (the RSS counterpart) at both the top and bottom.

## /feed.xml (the RSS counterpart)

A standards-compliant RSS 2.0 file. The structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ImtehanHub — Blog and Knowledge Updates</title>
    <link>https://imtehanhub.aoneahsan.com</link>
    <atom:link href="https://imtehanhub.aoneahsan.com/feed.xml"
               rel="self" type="application/rss+xml"/>
    <description>Recent posts and refreshes from ImtehanHub.</description>
    <language>en-us</language>
    <lastBuildDate>Mon, 11 May 2026 00:00:00 +0500</lastBuildDate>
    <item>
      <title>How to revise Class 10 Physics in 30 days</title>
      <link>https://imtehanhub.aoneahsan.com/blog/how-to-revise-class-10-physics</link>
      <guid>https://imtehanhub.aoneahsan.com/blog/how-to-revise-class-10-physics</guid>
      <pubDate>Wed, 08 May 2026 12:00:00 +0500</pubDate>
      <category>Blog</category>
      <description>A practical 30-day plan for board-exam revision.</description>
    </item>
    ...
  </channel>
</rss>
```

The feed includes:

- `<atom:link rel="self">` (validates against W3C RSS validator).
- `<lastBuildDate>` updated each build.
- `<category>` per item.
- Absolute URLs for `<link>` and `<guid>`.

## How to subscribe in an RSS reader

Add the URL `https://imtehanhub.aoneahsan.com/feed.xml` to any RSS reader. Tested combinations:

| Reader | URL pattern |
|---|---|
| **Feedly** | "+ Add Content" → paste the URL |
| **Inoreader** | "Add subscription" → paste |
| **NewsBlur** | "Add Site" → paste |
| **FreshRSS** | "Subscriptions" → "Add" → paste |
| **Thunderbird** | "Subscribe" → "Add" → paste |

Most readers refresh feeds every 1-3 hours. ImtehanHub's feed updates on every site deploy.

## How the feed is generated

A build-time script reads recent `blogPosts/` and `aiKnowledgeBase/` documents from Firestore (via the Firebase Admin SDK as a devDep, which is why deploys carry a service-account key file marked private). It writes:

- `public/feed.xml` (RSS).
- `public/feed.html` (the human-rendered version, prerendered).

The same script writes `public/sitemap.xml` (URL list with `lastmod` per page).

This is the same `postbuild-seo.mjs` pipeline that prerenders 660+ static HTML pages. See the SEO docs (lands in Batch 6) for full mechanics.

## Common questions

### Why two URLs (`/feed` and `/feed.xml`)?

Different audiences. Humans want a readable cards page. RSS readers want a strict XML file. Serving both is cheap and avoids forcing humans through a raw XML download.

### Can I get a chapter-specific feed?

Not yet. The roadmap includes per-chapter and per-class feeds (e.g. `/feed/c9-physics.xml`).

### Can I get an Atom feed instead?

The current feed is RSS 2.0 only. Atom can be added if there is genuine demand.

### Is the feed translated?

The feed is one combined feed, not language-split. Items use their original language. A future `?lang=ur` parameter could filter to Urdu items.

### How do I follow without RSS?

Sign in and opt in to push notifications on `/app/profile`. Push notifications fire for new blog posts (opt-in, not on by default). See [Notifications](/docs/discovery/notifications).

## Next

- [Blog](/docs/discovery/blog) — what mostly populates the feed.
- [Sitemap page](/docs/discovery/sitemap-page) — the navigation counterpart.
- [Notifications](/docs/discovery/notifications) — the push-based alternative to RSS.
