---
id: state
title: State management — Zustand + persist + Capacitor-aware storage
sidebar_label: State management
sidebar_position: 3
description: ImtehanHub uses Zustand for client state, TanStack Query for server state, and React Hook Form for form state. Persisted stores route through a Capacitor-aware storage adapter so the same code persists to localStorage on web and @capacitor/preferences on Android.
keywords:
  - Zustand Capacitor storage
  - React Zustand persist middleware
  - TanStack Query server state
  - state separation client server
  - Pakistani exam app stores
slug: /developers/architecture/state
---

# State management

**ImtehanHub splits state into three buckets**, each managed by its dedicated tool. Client state goes in Zustand. Server state goes in TanStack Query. Form state goes in React Hook Form. There is no global "everything is in Redux" store, and there is no "ad-hoc `useState` in a parent component" pattern either.

> **TL;DR** — Zustand for theme/auth/test/toast/ui/ai (persisted via storage adapter). TanStack Query for Firestore reads (cached + invalidated by domain). RHF for form values + Zod for validation. Each tool stays inside its lane.

## The three buckets

| Bucket | Tool | Examples |
|---|---|---|
| **Client state** | Zustand 5 + persist + storage adapter | Theme settings, language, auth user, trial counter, current test draft, toast queue, UI panel openness |
| **Server state** | TanStack Query 5 | Subject lists, chapter content, leaderboard, bookmarks, test history, community submissions |
| **Form state** | React Hook Form + Zod | Every form in the app — sign-in, profile edits, submission forms, admin authoring |

If a piece of state belongs in two buckets at once, redesign it so it belongs in exactly one.

## Zustand stores

Each store sits at `src/stores/{name}-store.ts`. The naming and shape are uniform:

```typescript
// src/stores/auth-store.ts (excerpt — see Layer contracts for full)
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      trialTestsRemaining: 3,

      signIn: async () => { /* ... */ },
      signOut: async () => { /* ... */ },
      decrementTrialTests: () => set((s) => ({ trialTestsRemaining: Math.max(0, s.trialTestsRemaining - 1) })),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        trialTestsRemaining: s.trialTestsRemaining,
      }),
    }
  )
);
```

Six stores ship today:

| Store | Persists | Purpose |
|---|---|---|
| `auth-store` | user, isAuthenticated, trialTestsRemaining | Current account + trial counter |
| `theme-store` | every theme setting | Radix theme customizer state |
| `test-store` | active test draft | In-flight test (resumable on reload) |
| `toast-store` | nothing | Transient toast queue |
| `ui-store` | sidebar / dialog open flags only when meaningful | Misc UI panels |
| `ai-store` | BYOK keys, model preferences | AI provider settings |

## Selective subscriptions — performance discipline

Reading the entire store re-renders on any change. Always select the specific slice you need:

```typescript
// ❌ Re-renders on every theme/auth/test update
const store = useAuthStore();

// ✅ Re-renders only when user changes
const user = useAuthStore((s) => s.user);

// ✅ For multiple fields — use shallow comparison
import { useShallow } from 'zustand/react/shallow';
const { user, isAuthenticated } = useAuthStore(
  useShallow((s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }))
);
```

`useShallow` is the canonical answer when you need two or three fields from the same store.

## Persist + storage adapter

Zustand's `persist` middleware writes serialised state through whatever storage you give it. On web, that should be `localStorage`. On Android, that must be `@capacitor/preferences` because `localStorage` is per-WebView and survives only as long as the WebView session.

A single adapter at `src/lib/storage/storage-adapter.ts` handles both:

```typescript
// src/lib/storage/storage-adapter.ts (excerpt)
import { Preferences } from '@capacitor/preferences';

const isCapacitor = typeof window !== 'undefined' && 'Capacitor' in window;

export const zustandStorage = {
  async getItem(name: string): Promise<string | null> {
    try {
      if (isCapacitor) {
        const { value } = await Preferences.get({ key: name });
        return value ?? null;
      }
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  async setItem(name: string, value: string): Promise<void> {
    try {
      if (isCapacitor) {
        await Preferences.set({ key: name, value });
      } else {
        localStorage.setItem(name, value);
      }
    } catch {
      // Storage full or unavailable — silently degrade
    }
  },
  async removeItem(name: string): Promise<void> { /* same shape */ },
};
```

Every store that needs persistence uses `createJSONStorage(() => zustandStorage)`. Raw `localStorage` calls anywhere else in the codebase are a code-review reject.

## `partialize` — persist only what should survive

Zustand persists every field by default. Most stores want to skip transient state:

```typescript
partialize: (s) => ({
  user: s.user,
  isAuthenticated: s.isAuthenticated,
  trialTestsRemaining: s.trialTestsRemaining,
  // skip: isLoading, error
}),
```

The skipped fields reset to their initial values on every page load. That is usually what you want for `isLoading` and `error`.

## TanStack Query — server state

Server reads always flow through TanStack Query, never through ad-hoc `useEffect` + `setState`. The pattern:

```typescript
// src/hooks/use-content.ts (excerpt)
export const contentQueryKeys = {
  classes: ['classes'] as const,
  classById: (id: ClassId) => ['classes', id] as const,
  subjectsByClass: (id: ClassId) => ['subjects', 'byClass', id] as const,
};

export function useClasses() {
  return useQuery({
    queryKey: contentQueryKeys.classes,
    queryFn: () => contentService.getAllClasses(),
    staleTime: 60 * 60 * 1000,        // 1 hour — classes are nearly static
  });
}
```

Stale-time choices reflect product reality:

| Domain | staleTime | Why |
|---|---|---|
| Classes / subjects taxonomy | 1 hour | Almost never changes |
| Chapter question pool | 5 minutes | Admin edits or community promotions infrequent |
| Leaderboard | 60 seconds | Refreshable but doesn't need real-time |
| User profile | 30 seconds | User can change in another tab |
| Test history | 60 seconds | Doesn't change behind the user's back |
| Community submission detail | 0 | Vote counts move; always refresh |

## Mutations — invalidate by domain

```typescript
export function useSubmitTest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: testService.submit,
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: testQueryKeys.byUser(vars.uid) });
      qc.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
}
```

Targeted invalidation beats `qc.invalidateQueries()` (which nukes everything) — it keeps the cache warm.

## Avoiding the watch-everything anti-pattern

A new dev's instinct is to slap `watch()` on a React Hook Form and re-render the whole form on every keystroke. The forms section covers this in detail (`sub-usewatch-over-watch`), but the principle is universal: subscribe deep, not shallow.

In Zustand:
```typescript
// ❌ One change re-renders every consumer
const everything = useAuthStore();

// ✅ Each consumer subscribes to what it actually needs
const userName = useAuthStore((s) => s.user?.displayName);
```

In TanStack Query:
```typescript
// ❌ Reads the whole result on every render
const { data: tests } = useUserTests(uid);
const count = tests?.length ?? 0;

// ✅ Use select to derive only what's needed (Query will only re-render if derived value changes)
const { data: count } = useUserTests(uid, { select: (tests) => tests.length });
```

## State that crosses boundaries — auth → user prefs

When a user signs in, two things must happen:
1. The auth store updates (`user`, `isAuthenticated`).
2. Server preferences (theme, language) overwrite the local cache.

The orchestration lives in `src/hooks/use-auth-init.ts`:

```typescript
useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const user = await userService.fetchOrCreate(firebaseUser);
      useAuthStore.getState().setUser(user);
      const remotePrefs = user.preferences;
      if (remotePrefs) useThemeStore.getState().mergeFromRemote(remotePrefs);
    } else {
      useAuthStore.getState().setUser(null);
    }
  });
  return unsub;
}, []);
```

This is the only place the two stores cross-reference. Cross-store reaches anywhere else are a smell.

## When to stop reaching for global state

A surprising amount of state belongs in **local `useState`** — modal openness for a one-shot transient modal, in-progress drag-and-drop, hover state, validation flags. The triage:

- **Will refresh wipe it and that's OK?** → local `useState`.
- **Should refresh restore it?** → URL search param.
- **Should it survive sign-out?** → Zustand persisted store.
- **Does it come from the server?** → TanStack Query.

In doubt, local state. Globalising prematurely is the most common architectural mistake.

## Next

- [Storage adapter](/docs/developers/architecture/storage) — the `@capacitor/preferences` ↔ `localStorage` wrapper.
- [Forms](/docs/developers/architecture/forms) — RHF + Zod patterns.
- [Layer contracts](/docs/developers/architecture/layers) — where state plugs into the data flow.
