---
id: storage
title: Storage adapter — Capacitor Preferences ↔ localStorage
sidebar_label: Storage adapter
sidebar_position: 5
description: ImtehanHub abstracts persistent client storage behind a single adapter that routes to @capacitor/preferences on Android and localStorage on the web. Both Zustand stores and ad-hoc reads go through it, so the same code persists data on both platforms.
keywords:
  - Capacitor Preferences storage
  - Zustand storage adapter
  - localStorage Capacitor fallback
  - cross-platform storage React
  - native key value storage
slug: /developers/architecture/storage
---

# Storage adapter

**Persistent client storage in ImtehanHub goes through one adapter** at `src/lib/storage/storage-adapter.ts`. The adapter detects whether the code is running inside Capacitor's WebView (Android app) or a plain browser (web) and routes reads / writes to the right backend. Calling `localStorage.setItem` directly anywhere else in the codebase is a code-review reject.

> **TL;DR** — `STORAGE.GET/SET/REMOVE/CLEAR` for ad-hoc reads. `zustandStorage` for Zustand `persist` middleware. Both branch on `Capacitor` global presence: native uses `@capacitor/preferences`, web uses `localStorage`. Errors are swallowed (storage full / unavailable degrades gracefully).

## Why an adapter at all

WebView storage on Android is **per-WebView-session**. A user who clears their browser data or whose WebView restarts (rare but possible on low-memory devices) loses every `localStorage` entry. `@capacitor/preferences` writes to the native KV store — `SharedPreferences` on Android — which survives WebView restarts, app updates, and in many cases device restarts.

On web, `localStorage` is the correct backend. The same product would not work without one. So the adapter is the shape that lets the same React code do the right thing on both.

## The adapter shape

```typescript
// src/lib/storage/storage-adapter.ts
import { Preferences } from '@capacitor/preferences';

const isCapacitor = typeof window !== 'undefined' && 'Capacitor' in window;

export const STORAGE = {
  async GET<T>(key: string): Promise<T | null> {
    try {
      if (isCapacitor) {
        const { value } = await Preferences.get({ key });
        return value ? (JSON.parse(value) as T) : null;
      }
      const value = localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  },

  async SET<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (isCapacitor) {
        await Preferences.set({ key, value: serialized });
      } else {
        localStorage.setItem(key, serialized);
      }
    } catch {
      // Storage full or unavailable
    }
  },

  async REMOVE(key: string): Promise<void> { /* mirror shape */ },
  async CLEAR(): Promise<void> { /* mirror shape */ },
};

// Zustand persist middleware adapter — string-in/string-out
export const zustandStorage = {
  async getItem(name: string): Promise<string | null> { /* ... */ },
  async setItem(name: string, value: string): Promise<void> { /* ... */ },
  async removeItem(name: string): Promise<void> { /* ... */ },
};
```

Two exports because the use cases differ. Application code wants typed `T` in / `T | null` out with JSON parsing handled. Zustand `persist` wants raw strings.

## How Zustand uses it

Each persisted store wires the adapter in:

```typescript
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '@/lib/storage/storage-adapter';

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({ /* state + actions */ }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
```

`createJSONStorage` is Zustand's helper that wraps any string-in/string-out adapter with JSON serialisation. Once wired, every state update writes to the right backend automatically.

## How ad-hoc reads use it

For one-off persisted values that aren't worth a whole store (e.g. an onboarding "you saw the tour" flag), use `STORAGE` directly:

```typescript
// On first visit of a feature
await STORAGE.SET('onboarded:community', true);

// Check on entry
const onboarded = await STORAGE.GET<boolean>('onboarded:community');
if (!onboarded) showOnboardingTour();
```

`STORAGE` is async on both platforms (because Capacitor Preferences is async). Browser `localStorage` would normally be sync but we wrap it so call sites stay uniform.

## Async means lifecycle care

Because `STORAGE.GET` is async, components that read on mount must handle the loading state:

```typescript
function FeatureBanner() {
  const [dismissed, setDismissed] = useState<boolean | null>(null);   // null = loading

  useEffect(() => {
    STORAGE.GET<boolean>('banner:newCommunity').then((v) => setDismissed(v ?? false));
  }, []);

  if (dismissed === null) return null;            // don't flash banner while loading
  if (dismissed) return null;
  return <Banner onDismiss={() => { setDismissed(true); STORAGE.SET('banner:newCommunity', true); }} />;
}
```

The `null` sentinel prevents flashing the banner to a user who has already dismissed it.

## Key naming convention

Keys are colon-namespaced:

| Prefix | Owner |
|---|---|
| `auth-store` | Zustand auth store |
| `theme-store` | Zustand theme store |
| `test-store` | Zustand test-in-progress store |
| `onboarded:*` | One-off onboarding flags |
| `banner:*` | Dismissible banners |
| `cache:*` | TanStack Query persisted cache slices (rare) |
| `community:*` | Community draft persistence |
| `imtehanhub:logLevel` | Logger level override |

The convention keeps a quick `await STORAGE.CLEAR()` (for the rare account-sign-out reset) predictable.

## Storage budgets

Both backends have caps:

| Backend | Soft cap | Notes |
|---|---|---|
| `localStorage` (web) | 5-10 MB per origin | Throws `QuotaExceededError` once full |
| `@capacitor/preferences` (Android) | Effectively unlimited for KV | Backed by SharedPreferences; tens of MB is fine |

Either way, **large blobs do not belong here**. The offline cache (chapter content, question pools) uses IndexedDB via the offline-cache layer, not Capacitor Preferences.

## Error swallowing — why

The adapter wraps every operation in `try { ... } catch { return null }`. This is deliberate:

- A failed read is recoverable — fall back to the default value.
- A failed write is loggable but should not crash the user-facing UI.
- Common failure modes: storage full, private-browsing mode (some browsers throw on `localStorage.setItem`), corrupted JSON.

Logging happens via the project's `logger.warn` in the catch blocks (not shown in the abridged code above) so devtools still surface the failure to the developer.

## What goes through the adapter vs what doesn't

| Data | Where |
|---|---|
| Theme settings, language | Adapter (Zustand store) |
| Auth user, trial counter | Adapter (Zustand store) |
| In-progress test draft | Adapter (Zustand store) |
| Onboarding flags, dismissed banners | Adapter (`STORAGE` direct) |
| Logger level | `localStorage` directly (logger boots before adapter, by design) |
| Offline chapter cache (large) | IndexedDB via `idb` library, not the adapter |
| Server data (questions, leaderboard) | TanStack Query cache (in-memory) |
| Secrets / tokens | Nowhere persisted; Firebase Auth handles ID-token refresh in memory |
| CNIC numbers, payment cards | Nowhere — these never enter our system |

The logger is the only documented exception that touches `localStorage` directly, because the logger has to be available before the adapter module finishes loading.

## Multi-tab / multi-window behaviour

On web, `localStorage` writes from one tab fire a `storage` event in other tabs. Zustand's `persist` does **not** subscribe to this event by default — so two tabs of the same app can drift apart for the duration of their sessions.

The product impact is small (theme change in one tab doesn't reflect in the other until refresh) but worth knowing. If it matters for a future feature, wire `window.addEventListener('storage', ...)` into the specific store.

On Android, only one WebView exists, so the multi-tab problem doesn't apply.

## Testing

For unit tests, mock `@capacitor/preferences`:

```typescript
vi.mock('@capacitor/preferences', () => ({
  Preferences: {
    get: vi.fn(async ({ key }) => ({ value: mockData[key] ?? null })),
    set: vi.fn(async ({ key, value }) => { mockData[key] = value; }),
    remove: vi.fn(async ({ key }) => { delete mockData[key]; }),
    clear: vi.fn(async () => { mockData = {}; }),
  },
}));
```

Then exercise the adapter or stores normally.

## Migrating data between versions

When a store's shape changes (e.g. add a new theme field), Zustand `persist`'s `version` + `migrate` options handle the upgrade:

```typescript
persist((set) => (...), {
  name: 'theme-store',
  version: 2,
  migrate: (persisted, fromVersion) => {
    if (fromVersion === 1) {
      return { ...persisted as object, panelBackground: 'translucent' };
    }
    return persisted;
  },
  storage: createJSONStorage(() => zustandStorage),
});
```

Always provide a migration — silently dropping a user's stored preferences on a deploy is a bad day.

## Next

- [State management](/docs/developers/architecture/state) — where the adapter plugs in.
- [Theme architecture](/docs/developers/architecture/theme) — the most-frequently-persisted store.
- [Offline mode (user docs)](/docs/mobile/offline) — IndexedDB-backed offline cache.
