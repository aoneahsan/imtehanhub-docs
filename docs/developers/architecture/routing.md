---
id: routing
title: Routing — one table-of-routes, no magic strings
sidebar_label: Routing
sidebar_position: 2
description: ImtehanHub uses React Router 7 with all routes declared in src/config/routes.ts as typed constants. No magic strings in components, no decentralised route definitions, and every back-button target is explicit.
keywords:
  - React Router 7 best practice
  - centralised routes constants
  - typed routes TypeScript
  - back button routing
  - SPA routing Pakistani app
slug: /developers/architecture/routing
---

# Routing

**Every route in ImtehanHub is named once** in `src/config/routes.ts`. Components reference routes by constant, not by string literal, so a typo is a compile error and a rename is a single edit.

> **TL;DR** — All paths live in `ROUTES` exported from `src/config/routes.ts`. Back buttons resolve via the sibling `BACK_ROUTES` map. URL state is added through search params; never invent path-based variants of the same page.

## The routes table

```typescript
// src/config/routes.ts (shape)
export const ROUTES = {
  // Public
  HOME: '/',
  ABOUT: '/about',
  PRICING: '/pricing',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SITEMAP: '/sitemap',
  FEED: '/feed',
  CONTACT: '/contact',
  PERMISSIONS: '/permissions',
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,
  LEARN: '/learn',
  LEARN_ENTRY: (slug: string) => `/learn/${slug}`,
  SUBJECTS: '/subjects',
  CLASS_SUBJECTS: (classId: string) => `/class/${classId}`,
  SUBJECT: (subjectId: string) => `/subject/${subjectId}`,
  CHAPTER: (subjectId: string, chapterId: string) => `/subject/${subjectId}/${chapterId}`,

  // App (authenticated)
  DASHBOARD: '/app',
  PROFILE: '/app/profile',
  THEME: '/app/profile/theme',
  BILLING: '/app/billing',
  REFERRALS: '/app/referrals',
  BOOKMARKS: '/app/bookmarks',
  HISTORY: '/app/history',
  LEADERBOARD: '/app/leaderboard',
  TEST_CONFIGURE: '/app/test',
  TEST_TAKE: '/app/test/take',
  TEST_RESULT: '/app/test/result',
  // ...

  // Community
  COMMUNITY: '/community',
  COMMUNITY_SUBMISSION: (id: string) => `/community/submission/${id}`,
  COMMUNITY_GUIDELINES: '/community/guidelines',
  COMMUNITY_CONTRIBUTE: '/app/community/contribute',

  // Admin
  ADMIN: '/admin',
  // ...

  // Error
  UNAUTHORIZED: '/401',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
  SERVER_ERROR: '/500',
} as const;
```

Pages with dynamic segments are **functions returning a path** so callers stay type-safe:

```tsx
// ❌ Magic string — easy to mistype, no rename support
navigate(`/subject/${id}/${chapterId}`);

// ✅ Typed builder — IDE-discoverable
navigate(ROUTES.CHAPTER(id, chapterId));
```

## Route registration

The router is declared in `src/main.tsx` with `createBrowserRouter` and a flat array of `<Route>` entries that reference the constants:

```tsx
const router = createBrowserRouter([
  { path: ROUTES.HOME, element: <HomePage /> },
  { path: ROUTES.SUBJECTS, element: <SubjectsPage /> },
  { path: ROUTES.SUBJECT(':subjectId'), element: <SubjectDetailPage /> },
  { path: ROUTES.CHAPTER(':subjectId', ':chapterId'), element: <ChapterDetailPage /> },
  // ...
]);
```

The `:subjectId` / `:chapterId` placeholders match React Router's pattern syntax. The constant function returns `/subject/:subjectId/:chapterId` when passed the literal `:subjectId` and `:chapterId` strings — making registration and navigation share one source.

## Back-button routing

The Android hardware back button and the in-app "Back" controls resolve through a single map at the bottom of `routes.ts`:

```typescript
export const BACK_ROUTES: Record<string, string> = {
  [ROUTES.THEME]: ROUTES.PROFILE,
  [ROUTES.BILLING]: ROUTES.DASHBOARD,
  [ROUTES.REFERRALS]: ROUTES.PROFILE,
  [ROUTES.BOOKMARKS]: ROUTES.DASHBOARD,
  // ...
};
```

The `use-back-button.ts` hook (`src/hooks/`) wires Capacitor's hardware-back listener to this map: pop history if possible, otherwise navigate to the mapped fallback. Explicit fallbacks beat `history.go(-1)` because deep-linked entries have no history to pop.

## URL state via search params

Modals, tabs, multi-step wizards, filters, pagination — all live in search params, never invent path-based variants:

```typescript
// ❌ Two paths for "same page with modal open"
/app/jobs        (modal closed)
/app/jobs/new    (modal open)

// ✅ One path + search param
/app/jobs        (modal closed)
/app/jobs?compose=1  (modal open)
```

Helper hooks at `src/lib/hooks/useUrlState.ts` wrap React Router's `useSearchParams` with type-safe getters / setters:

```typescript
const [composeOpen, setComposeOpen] = useUrlBooleanState('compose');
const [activeTab, setActiveTab] = useUrlStringState('tab', 'pending');
const [page, setPage] = useUrlNumberState('page', 1);
```

Defaults are omitted from the URL (`?page=1` is rewritten to no `page` param) so URLs stay short.

## Lazy loading

Heavy pages (admin, test surfaces, community moderation) lazy-load:

```tsx
const TakeTestPage = lazy(() => import('@/pages/app/test/TakeTestPage'));

{ path: ROUTES.TEST_TAKE, element: <Suspense fallback={<Skeleton />}><TakeTestPage /></Suspense> },
```

A page should lazy-load when:
- It is gated behind auth (most app pages).
- Its bundle exceeds ~30 KB gzipped.
- It is only reached after a deliberate user action (admin pages, take-test, take-survey).

Pages on the critical first-paint path (home, class detail, subject detail) stay eager so the prerendered HTML hydrates without flashing.

## Scroll-to-top on route change

A small effect in `src/App.tsx` resets scroll on each path change unless a hash is present:

```typescript
useEffect(() => {
  if (!location.hash) {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}, [location.pathname]);
```

`#section` deep links still land at the anchor. Without this, students get the disorienting "scrolled halfway down the page" effect on chapter navigation.

## Auth-gated routes

Every `/app/*` and `/admin/*` route renders inside an `<AuthGuard>` wrapper:

```tsx
function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <BootLoader />;
  if (!isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;
  return <>{children}</>;
}
```

Admin routes also check `user.role === 'admin'` and redirect to `/403` on mismatch. Institute-manager routes do the same with `'institute_manager'`.

## Redirects

Legacy paths or renamed pages redirect with `replace: true` so the back button doesn't bounce:

```tsx
{ path: '/jobs/new', element: <Navigate to="/app/test?compose=1" replace /> },
```

Redirects are co-located with the canonical route in `routes.ts` (via a `LEGACY_REDIRECTS` map) so the file stays the single source of truth.

## SEO collision check

`postbuild-seo.mjs` reads from `routes.ts` (or a mirror) to generate per-route HTML. When a new route lands, the postbuild script must know about it — see [Postbuild SEO](/docs/developers/seo/postbuild). Adding a route is therefore a three-step task: add to `routes.ts`, register in the router, declare to postbuild.

## Common pitfalls

| Pitfall | Fix |
|---|---|
| Inline path strings in components | Replace with `ROUTES.X` |
| Multiple paths for "same page with X" | Collapse to one path + search param |
| Forgetting `BACK_ROUTES` entry for a new app page | Hardware back button silently falls through to `/app` |
| Lazy-loading a critical-path page | Hydration flashes; un-lazy and re-measure |
| Path-based wizard steps | Use `?step=N` so reload restores the step |

## Next

- [Layer contracts](/docs/developers/architecture/layers) — types → repos → services → stores → hooks → components.
- [Postbuild SEO](/docs/developers/seo/postbuild) — how routes become 660+ static HTMLs.
- [State management](/docs/developers/architecture/state) — auth gating + Zustand stores.
