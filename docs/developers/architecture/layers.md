---
id: layers
title: Layer contracts — types, repos, services, stores, hooks, components
sidebar_label: Layer contracts
sidebar_position: 1
description: ImtehanHub's read-write flow uses six fixed layers — types, repositories, services, stores, hooks, components — walked end-to-end via "submit a test."
keywords:
  - ImtehanHub architecture layers
  - BaseRepository Firestore pattern
  - service repository pattern React
  - TanStack Query hook layer
  - Pakistani exam app codebase
slug: /developers/architecture/layers
---

# Layer contracts

**Every feature in ImtehanHub flows through the same six layers**, in the same order. The discipline matters because the same shape repeats hundreds of times: any drift produces a maintenance tax across the codebase.

> **TL;DR** — types → repositories → services → stores → hooks → components → pages. Skipping a layer is a smell. The example below walks "submit a test" across all six.

## The flow at a glance

```
┌─────────────────┐
│  Pages          │  Route entries (e.g. /app/test/take)
└──────┬──────────┘
       │ render
       ↓
┌─────────────────┐
│  Components     │  Radix-based UI, layout
└──────┬──────────┘
       │ uses
       ↓
┌─────────────────┐
│  Hooks          │  TanStack Query + custom (use-content.ts, use-tests.ts)
└──────┬──────────┘
       │ delegates
       ↓
┌─────────────────┐
│  Services       │  Business logic (test-service.ts, billing-service.ts)
└──────┬──────────┘
       │ calls
       ↓
┌─────────────────┐
│  Repositories   │  BaseRepository<T> wrappers (test-repository.ts)
└──────┬──────────┘
       │ runs
       ↓
┌─────────────────┐
│  Firestore SDK  │
└─────────────────┘
```

Client-only state (theme, modals, in-flight wizards) skips the right half and lives in **Zustand stores** persisted by the storage adapter.

## Layer 1 — types

Every entity has a TypeScript type file at `src/types/{domain}.ts`. The type is the contract — repos and services both depend on it, and a change here forces every consumer to react.

```typescript
// src/types/content.ts
export interface Class {
  id: ClassId;                  // 'class-9' | 'class-10' | '1st-year' | ...
  name: string;                 // 'Class 9'
  urduName: string;             // 'نویں جماعت'
  level: string;                // 'Matric (SSC-I)'
  active: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Rules:**

- Bilingual entities carry both `name` and `urduName`.
- IDs are typed string literals (`ClassId = 'class-5' | ... `) when the set is finite.
- Timestamps use `firebase/firestore`'s `Timestamp` type, not `Date`, so serialisation round-trips cleanly.
- No `any`. No exceptions.

## Layer 2 — repositories

Every Firestore collection has a repository at `src/repositories/{name}-repository.ts` extending `BaseRepository<T>`. The base class encapsulates the four CRUD operations, pagination, and `toEntity` mapping:

```typescript
// src/repositories/base-repository.ts (abridged)
export class BaseRepository<T extends { id: DocumentId }> {
  constructor(protected collectionName: string) {}

  async getById(id: string): Promise<T | null> { /* ... */ }
  async create(data: Omit<T, 'id'>): Promise<T> { /* ... */ }
  async update(id: string, patch: Partial<T>): Promise<void> { /* ... */ }
  async delete(id: string): Promise<void> { /* ... */ }
  async list(constraints?: QueryConstraint[]): Promise<T[]> { /* ... */ }
  async paginate(opts: PageOpts): Promise<PaginatedResult<T>> { /* ... */ }
}
```

Per-collection repositories add only what is collection-specific:

```typescript
// src/repositories/test-repository.ts
class TestRepository extends BaseRepository<TestResult> {
  constructor() { super('tests'); }

  async getByUser(uid: string, limit = 50) {
    return this.list([where('userId', '==', uid), orderBy('submittedAt', 'desc'), limitFn(limit)]);
  }
}

export const testRepository = new TestRepository();
```

**Rules:**

- One repository per collection. No combined repos.
- Repositories never know about services, stores, hooks, or React. They are pure.
- Pagination uses `paginate({ cursor, pageSize })`, not raw `startAfter`.
- Security rules duplicate the access logic — repositories don't enforce auth.

## Layer 3 — services

Services hold business logic. They consume repositories, never raw SDK calls. They are still pure (no React, no DOM), but they know about the **product**, not just the database.

```typescript
// src/services/test-service.ts (abridged)
import { testRepository } from '@/repositories/test-repository';
import { userRepository } from '@/repositories/user-repository';
import { leaderboardService } from './leaderboard-service';

export const testService = {
  async submit(uid: string, draft: TestDraft): Promise<TestResult> {
    const result = await scoreTest(draft);
    await testRepository.create({ ...result, userId: uid });
    await userRepository.update(uid, { 'stats.totalTests': increment(1), /* ... */ });
    await leaderboardService.updateScore(uid);
    return result;
  },
};
```

**Rules:**

- Services orchestrate across multiple repositories.
- Services own derived/computed business rules (scoring, trial counters, plan limits, anti-abuse).
- Services compose other services (the example above calls `leaderboardService.updateScore`).
- Services do **not** call `useState`, `useEffect`, or any React API.

## Layer 4 — stores (client state)

State that is **not** server-owned lives in Zustand stores at `src/stores/*-store.ts`. Each store is `create()(persist(...))` with the project's storage adapter so persistence works on web (`localStorage`) and native (`@capacitor/preferences`).

```typescript
// src/stores/auth-store.ts (excerpt)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      trialTestsRemaining: 3,
      signIn: async () => { /* ... */ },
      signOut: async () => { /* ... */ },
      decrementTrialTests: () => set((s) => ({ trialTestsRemaining: Math.max(0, s.trialTestsRemaining - 1) })),
    }),
    { name: 'auth-store', storage: createJSONStorage(() => zustandStorage) }
  )
);
```

**Rules:**

- One store per domain: `auth-store`, `theme-store`, `test-store`, `toast-store`, `ui-store`, `ai-store`.
- Persist what should survive a reload; skip transient flags (`isLoading` etc.).
- No server data in stores — that is TanStack Query's job.
- Selective subscriptions (`useAuthStore(s => s.user)`) prevent unnecessary re-renders.

## Layer 5 — hooks

Server data and side effects surface as hooks at `src/hooks/use-*.ts`. The convention is TanStack Query for reads, a thin wrapper around services for writes.

```typescript
// src/hooks/use-tests.ts (excerpt)
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testService } from '@/services/test-service';

export const testQueryKeys = {
  all: ['tests'] as const,
  byUser: (uid: string) => [...testQueryKeys.all, 'user', uid] as const,
};

export function useUserTests(uid: string) {
  return useQuery({
    queryKey: testQueryKeys.byUser(uid),
    queryFn: () => testService.getByUser(uid),
    staleTime: 60 * 1000,                       // 1 min — tests don't change behind your back
    enabled: !!uid,
  });
}

export function useSubmitTest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (draft: TestDraft) => testService.submit(getCurrentUid(), draft),
    onSuccess: () => qc.invalidateQueries({ queryKey: testQueryKeys.all }),
  });
}
```

**Rules:**

- One query-keys factory per domain.
- `staleTime` matches business reality (theme prefs: `Infinity`, leaderboard: 60s, tests: 60s).
- Mutations invalidate specific keys, not the whole query cache.
- React Hook Form forms read `defaultValues` via `useQuery` with `enabled: !!id` for edits.

## Layer 6 — components and pages

Components consume hooks and stores; pages compose components. No fetching in components — that is the hook layer's job.

```tsx
// src/pages/app/test/TakeTestPage.tsx (sketch)
function TakeTestPage() {
  const user = useAuthStore((s) => s.user);
  const { data: pool, isLoading } = useChapterQuestionPool(chapterId);
  const { mutate: submit } = useSubmitTest();

  if (!user) return <Navigate to="/sign-in" />;
  if (isLoading || !pool) return <Skeleton />;

  return <TestSurface pool={pool} onSubmit={submit} />;
}
```

**Rules:**

- No `<button>`, `<input>`, `<dialog>` — Radix UI primitives or `src/components/form-fields/*` only.
- No business logic — delegate to services via hooks.
- URL state via the `useUrlState` hooks, not raw `useState`.
- Accessibility: every interactive element has visible focus rings and ARIA labels.

## The full example — submitting a test

Tracking one user action across all six layers:

1. **Page** (`TakeTestPage.tsx`) reads `pool` via `useChapterQuestionPool`, renders `TestSurface`.
2. **Component** (`TestSurface.tsx`) calls `onSubmit(draft)`.
3. **Hook** (`useSubmitTest`) calls `testService.submit(uid, draft)`.
4. **Service** (`test-service.ts`) calls `testRepository.create`, updates `userRepository`, calls `leaderboardService.updateScore`.
5. **Repository** (`test-repository.ts`) runs `setDoc` via `BaseRepository.create`.
6. **Firestore** writes the doc, security rules verify.
7. Back up: hook's `onSuccess` invalidates `testQueryKeys.all`, the next render pulls the updated history.

No layer is skipped, no inline `getDoc`/`setDoc` calls anywhere in pages or components.

## Why this rigidity?

- **One pattern to learn.** A new feature is a 30-minute scaffold: add type, repo, service, hook, component, page.
- **Testability.** Repositories are mockable; services have no React; hooks are isolatable.
- **Refactor safety.** Renaming a Firestore field is a search across exactly one file (the repository). Everything else uses the typed name.
- **AI assist.** A coding agent can be told the rules and shipped against them.

The cost is a little upfront boilerplate. Worth it.

## Next

- [Routing](/docs/developers/architecture/routing) — every route in one config file.
- [State management](/docs/developers/architecture/state) — Zustand stores + persist + storage adapter.
- [Forms](/docs/developers/architecture/forms) — RHF + Zod + shared field components.
