---
id: analytics-errors
title: Analytics + errors — Firebase, Amplitude, Clarity, Sentry
sidebar_label: Analytics & errors
sidebar_position: 7
description: Every tracked action fans out to Firebase Analytics, Amplitude, and Microsoft Clarity. Errors go to Sentry with PII scrubbed. All four fail-open on missing env keys.
keywords:
  - Firebase Amplitude Clarity Sentry
  - analytics fan-out React
  - error tracking Sentry React
  - fail open analytics
  - privacy-preserving analytics
slug: /developers/architecture/analytics-errors
---

# Analytics + errors

**ImtehanHub fans every tracked event out to three analytics platforms** (Firebase, Amplitude, Microsoft Clarity), and routes every error to Sentry. All four providers are wrapped in a single facade so call sites don't know which platforms are configured, and all four fail-open — a missing env key is a warning, never a crash.

> **TL;DR** — `track(name, props)` from `src/lib/analytics/` fans out to Firebase + Amplitude + Clarity. `logger.error(err, context)` from `src/lib/errors/` reports to Sentry with PII scrubbed. Missing env keys = provider stays disabled, others continue.

## The three analytics platforms — why three

Each tool sees a different slice of reality:

| Platform | What it's best at | Why we use it |
|---|---|---|
| **Firebase Analytics** | Funnel + cohort views inside the Firebase console, free, plays well with Firestore | We're already on Firebase free tier |
| **Amplitude** | Product analytics — retention, paths, segments | Free tier covers a Pakistani-scale app |
| **Microsoft Clarity** | Anonymised session replays + heat maps | Lets us *watch* a session without storing PII |

We deliberately do not use Google Analytics 4 (overlaps with Firebase), Mixpanel (paid quickly), or behavioural-ad networks (privacy mismatch).

## The track facade

```typescript
// src/lib/analytics/track.ts (sketch)
import { analytics as firebaseAnalytics } from '@/config/firebase';
import { logEvent } from 'firebase/analytics';
import * as amplitude from '@amplitude/analytics-browser';
import { clarity } from '@/lib/analytics/clarity';
import { logger } from '@/utils/logger';

export function track(name: string, props: Record<string, unknown> = {}): void {
  try {
    if (firebaseAnalytics) {
      logEvent(firebaseAnalytics, name, props);
    }
  } catch (e) { logger.warn('[analytics] firebase track failed', e); }

  try {
    if (amplitude.getInstance().getApiKey()) {
      amplitude.track(name, props);
    }
  } catch (e) { logger.warn('[analytics] amplitude track failed', e); }

  try {
    clarity?.track(name, props);
  } catch (e) { logger.warn('[analytics] clarity track failed', e); }
}
```

Each provider is wrapped in its own `try/catch` so a misbehaving SDK can't poison the others. Each is gated on "is this provider configured" — no env key, no call.

## Event taxonomy

Every event name uses snake_case + a verb-noun shape:

| Event | When |
|---|---|
| `test_started` | User taps Start on the configure page |
| `test_submitted` | After scoring, before result render |
| `bookmark_added` / `bookmark_removed` | Star toggle |
| `signin_attempted` / `signin_succeeded` / `signin_failed` | Google sign-in flow |
| `theme_changed` | Any theme knob touched (with which knob in props) |
| `community_submission_created` | Community submission of any kind |
| `community_vote_cast` | Upvote/downvote |
| `community_flag_raised` | A flag is filed |
| `referral_signup_observed` | Inbound referral signup (from referrer's perspective) |
| `subscription_upgrade_initiated` | Click Upgrade — opens payment in new tab |
| `page_view` | Route change (fired by `use-page-view-tracking.ts`) |

Props are typed via TypeScript helpers:

```typescript
// src/lib/analytics/event-types.ts (sketch)
type Events =
  | { name: 'test_started'; props: { classId: ClassId; subjectId: string; chapterId: string; mode: 'mcq' | 'short' | 'long' } }
  | { name: 'test_submitted'; props: { /* ... */ score: number; durationSec: number } }
  | { name: 'theme_changed'; props: { knob: 'appearance' | 'accentColor' | /* ... */; value: string } }
  // ...

export function trackTyped<E extends Events>(event: E): void {
  return track(event.name, event.props);
}
```

Typed helpers reject calls that lie about props at compile time. The plain `track(name, props)` form is still available for ad-hoc one-offs but the typed form is preferred.

## Microsoft Clarity — privacy mode

Clarity is wired in privacy-strict mode:

- All form inputs are masked (`<input type="text">` shows `***` in replays).
- Buttons, links, and labels are visible (you need to see what a user clicked).
- No user identifier is passed to Clarity — replays are session-only and not cross-correlatable.

The config:

```typescript
// src/lib/analytics/clarity.ts (sketch)
if (import.meta.env.VITE_CLARITY_PROJECT_ID) {
  window.clarity('mask', 'input, textarea, select');
  window.clarity('mask', '[data-mask]');
  // No identify() call — sessions are anonymous
}
```

That gives us heat maps and rage-click detection without ever knowing whose session it was.

## Fail-open posture

The four providers are wired so that missing env keys = silent disable, never a runtime error:

```typescript
// src/config/firebase.ts (sketch)
export const analytics = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  ? getAnalytics(firebaseApp)
  : null;
```

```typescript
// src/main.tsx (sketch)
if (import.meta.env.VITE_AMPLITUDE_API_KEY) {
  amplitude.init(import.meta.env.VITE_AMPLITUDE_API_KEY, { /* ... */ });
}
```

Local development without analytics env keys "just works" — events are silently dropped. Reviewable in the logger at `debug` level.

## Sentry — error tracking

Errors go through `src/lib/errors/error-service.ts`:

```typescript
// src/lib/errors/error-service.ts (sketch)
import * as Sentry from '@sentry/react';
import { logger } from '@/utils/logger';

export const errorService = {
  init() {
    if (!import.meta.env.VITE_SENTRY_DSN) return;
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [Sentry.browserTracingIntegration()],
      tracesSampleRate: 0.1,
      beforeSend(event) {
        // Scrub PII
        if (event.user) {
          delete event.user.email;
          delete event.user.username;
        }
        if (event.request?.headers) {
          delete event.request.headers['Authorization'];
          delete event.request.headers['Cookie'];
        }
        return event;
      },
    });
  },

  report(err: unknown, context?: Record<string, unknown>): void {
    logger.error('[error] caught', err, context);
    if (import.meta.env.VITE_SENTRY_DSN) {
      Sentry.captureException(err, { extra: context });
    }
  },
};
```

Every caught error in services / hooks / repositories flows through `errorService.report`, which:

1. Logs via `logger.error` (so devs see it in the console).
2. Captures to Sentry if configured.
3. PII-scrubs `beforeSend`.

## Error boundary

The root layout wraps the router in a Sentry error boundary:

```tsx
<Sentry.ErrorBoundary fallback={<ServerErrorPage />} showDialog={false}>
  <RouterProvider router={router} />
</Sentry.ErrorBoundary>
```

A render-time crash anywhere in the tree falls through to the branded `/500` page (`src/pages/error/ServerErrorPage.tsx`) and the error is reported with the React component stack.

## Banned packages reminder

Two Capacitor packages are explicitly banned:

- `@capacitor-firebase/crashlytics`
- `@capacitor-firebase/performance`

Both produce noisy runtime errors on Android, require Gradle plugin wiring, and force Firebase Console configuration. We use Sentry for crash reporting (already wired) and Amplitude / Clarity for perf-adjacent metrics. The CLAUDE.md root file has the verification grep:

```bash
grep -rE "@capacitor-firebase/(crashlytics|performance)" --include="package.json" .
# must return zero matches
```

## Logger as the unified entry point

For non-error diagnostic logging, use the logger directly:

```typescript
import { logger } from '@/utils/logger';

logger.debug('[test] starting submission', { uid, chapterId });
logger.info('[referral] granted pro', { uid, expiresAt });
logger.warn('[storage] write failed, falling back', err);
logger.error('[gdrive] upload rejected', err);
```

Logger levels default to `warn` in both dev and prod. Override at runtime:

```typescript
window.__setLogLevel('debug');     // see everything in this tab
```

Or set `VITE_LOG_LEVEL=debug` for build-time defaults.

## Performance metrics — without the banned packages

For the few real-user performance signals we want:

- **Page-view latency** — `use-page-view-tracking.ts` emits `page_view` with `loadDurationMs` measured against `performance.now()` between route start and first paint.
- **API call durations** — TanStack Query hooks log `queryDurationMs` in the `onSettled` handler.
- **Long tasks** — a tiny `PerformanceObserver` listens for `longtask` entries and emits `long_task_observed` events.

All of those flow through `track()` and land in Amplitude where they aggregate cleanly.

## Common questions

### Does anonymised analytics need consent?

In Pakistan, no specific law applies. Internationally, our analytics fingerprint (no advertising IDs, no cross-site tracking, no PII in events) keeps us inside GDPR's "legitimate interests" category. If we ever ship in the EU formally we'll add a banner.

### What about Google Tag Manager / Facebook Pixel / ad pixels?

None present. We do not load third-party tags. The analytics SDKs ship as first-party bundled npm packages.

### Why doesn't Firebase Analytics conflict with Amplitude?

They observe overlapping events but serve different teams. Firebase Analytics surfaces in the Firebase Console (next to Firestore data); Amplitude has stronger funnel + retention analysis. We pay for neither.

### Will Sentry exhaust the free tier?

Free tier = 5,000 errors / month. At our user volume that's plenty. Sampling traces at 10% keeps performance-trace spend down. If we approach the cap we'll raise it via better filtering.

## Next

- [State management](/docs/developers/architecture/state) — where store changes get tracked.
- [Layer contracts](/docs/developers/architecture/layers) — where errors are caught and reported.
- [Data pipeline](/docs/developers/pipeline/overview) — instrumentation outside the app.
