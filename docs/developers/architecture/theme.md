---
id: theme
title: Theme customizer architecture — store, sync, boot loader
sidebar_label: Theme architecture
sidebar_position: 6
description: ImtehanHub's theme customizer is a Radix UI theme surface backed by a Zustand store, persisted through the Capacitor storage adapter, synced to Firestore on sign-in, and gated behind a boot loader that prevents the dark-mode flash.
keywords:
  - Radix UI theme architecture
  - Zustand theme store
  - cross-device theme sync Firestore
  - boot loader FOUC prevention
  - dark mode flash fix
slug: /developers/architecture/theme
---

# Theme customizer architecture

**The theme customizer is the most-used persisted store in the app**. Every user touches it (default values still apply); active users tune it heavily. Getting it right means three concerns lock together: a Zustand store with sensible defaults, a Capacitor-aware persistence layer, Firestore sync on sign-in, and a boot loader that prevents the wrong-theme flash on cold start.

> **TL;DR** — `useThemeStore` (Zustand + persist) holds seven knobs. `zustandStorage` adapter persists to `@capacitor/preferences` on Android, `localStorage` on web. On sign-in, `users/{uid}.preferences` overrides local. A `BootLoader` component blocks first paint until both the theme store rehydrates and the auth store emits its first state.

## The store

```typescript
// src/stores/theme-store.ts (excerpt)
type Appearance = 'light' | 'dark' | 'system';
type AccentColor = 'tomato' | 'red' | /* ... 25 Radix accents */ | 'gray';
type GrayColor = 'auto' | 'gray' | 'mauve' | 'slate' | 'sage' | 'olive' | 'sand';
type Radius = 'none' | 'small' | 'medium' | 'large' | 'full';
type Scaling = '90%' | '95%' | '100%' | '105%' | '110%';
type PanelBackground = 'solid' | 'translucent';

interface ThemeState {
  appearance: Appearance;
  accentColor: AccentColor;
  grayColor: GrayColor;
  radius: Radius;
  scaling: Scaling;
  panelBackground: PanelBackground;
  setAppearance: (a: Appearance) => void;
  setAccentColor: (c: AccentColor) => void;
  // ... setters for each
  cycleAppearance: () => void;
  resetToDefaults: () => void;
}

const defaults = {
  appearance: 'light' as Appearance,
  accentColor: 'green' as AccentColor,
  grayColor: 'auto' as GrayColor,
  radius: 'medium' as Radius,
  scaling: '100%' as Scaling,
  panelBackground: 'translucent' as PanelBackground,
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      ...defaults,
      setAppearance: (appearance) => set({ appearance }),
      setAccentColor: (accentColor) => set({ accentColor }),
      // ...
      cycleAppearance: () => set((s) => ({
        appearance: s.appearance === 'light' ? 'dark' : s.appearance === 'dark' ? 'system' : 'light',
      })),
      resetToDefaults: () => set({ ...defaults }),
    }),
    {
      name: 'theme-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
```

Six knobs are persisted (every field of `defaults`). Setters are individual to keep call sites typed.

## The renderer

`src/App.tsx` reads the store and configures the Radix `<Theme>` wrapper:

```tsx
function App() {
  const { appearance, accentColor, grayColor, radius, scaling, panelBackground } = useThemeStore(
    useShallow((s) => ({
      appearance: s.appearance, accentColor: s.accentColor, grayColor: s.grayColor,
      radius: s.radius, scaling: s.scaling, panelBackground: s.panelBackground,
    }))
  );

  const resolved = useResolvedAppearance(appearance);   // 'light' | 'dark' — derives from system if 'system'

  return (
    <Theme
      appearance={resolved}
      accentColor={accentColor}
      grayColor={grayColor === 'auto' ? undefined : grayColor}
      radius={radius}
      scaling={scaling}
      panelBackground={panelBackground}
    >
      <RouterProvider router={router} />
    </Theme>
  );
}
```

`useShallow` is important — without it, every theme change would re-render every route. With it, only the `<Theme>` props that changed cause a re-render, and React's reconciliation does the work.

## System-appearance resolution

`useResolvedAppearance` is a small hook that listens to `prefers-color-scheme` and returns the concrete value:

```typescript
function useResolvedAppearance(appearance: Appearance): 'light' | 'dark' {
  const [systemDark, setSystemDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  if (appearance === 'system') return systemDark ? 'dark' : 'light';
  return appearance;
}
```

A user on `appearance === 'system'` flips along with their OS in real time.

## The customizer modal

`src/pages/app/ThemeCustomizerPage.tsx` renders all seven knobs as card selectors (never dropdowns — see the [user-facing theme doc](/docs/account/theme)). Each card calls the relevant setter:

```tsx
<RadioCards.Root value={appearance} onValueChange={(v) => setAppearance(v as Appearance)}>
  <RadioCards.Item value="light"><SunIcon /> Light</RadioCards.Item>
  <RadioCards.Item value="dark"><MoonIcon /> Dark</RadioCards.Item>
  <RadioCards.Item value="system"><MonitorIcon /> System</RadioCards.Item>
</RadioCards.Root>
```

Each change is immediate — no Save button. Persistence is automatic via Zustand's `persist` middleware.

## Cross-device sync

For signed-in users, preferences sync via Firestore. The sync hook `src/hooks/use-theme-sync.ts` does two things:

1. **On sign-in**: fetch `users/{uid}.preferences` and call setters on `useThemeStore` to overwrite the local state.
2. **On every theme change**: debounce 500 ms, then write the current store snapshot to `users/{uid}.preferences`.

```typescript
// src/hooks/use-theme-sync.ts (sketch)
export function useThemeSync(uid: string | null) {
  const theme = useThemeStore();

  useEffect(() => {
    if (!uid) return;
    let cancelled = false;

    (async () => {
      const remote = await userRepository.getPreferences(uid);
      if (cancelled || !remote) return;
      // Apply remote (overwrites local)
      theme.setAppearance(remote.appearance);
      theme.setAccentColor(remote.accentColor);
      // ...
    })();

    return () => { cancelled = true; };
  }, [uid]);

  // Debounced write on local change
  const debouncedWrite = useMemo(
    () => debounce((prefs: Partial<ThemeState>) => userRepository.updatePreferences(uid!, prefs), 500),
    [uid]
  );

  useEffect(() => {
    if (!uid) return;
    debouncedWrite({
      appearance: theme.appearance,
      accentColor: theme.accentColor,
      // ...
    });
    return () => debouncedWrite.cancel();
  }, [uid, theme.appearance, theme.accentColor, /* ... */, debouncedWrite]);
}
```

Conflict resolution is **remote wins on sign-in**. Within a session, the latest local change wins (because there's no concurrent writer). If you sign in on a fresh device, you get your existing preferences; if you sign out, your local preferences stay on the device.

## The boot loader — FOUC prevention

A theme store that only resolves after JS hydrates means **first paint is in the default theme**. For a user whose preference is dark, the brief flash of light is jarring. The fix is to gate first render behind a boot loader until the store has rehydrated:

```tsx
// src/main.tsx (sketch)
function Root() {
  const themeHydrated = useThemeHydrated();
  const authReady = useAuthReady();

  if (!themeHydrated || !authReady) {
    return <BootLoader />;
  }

  return <App />;
}
```

`useThemeHydrated` reads Zustand's `persist` rehydration state. `useAuthReady` returns true once Firebase Auth has emitted at least one `onAuthStateChanged` event (signed in or signed out).

The boot loader itself:

- Full-screen SVG logo + Radix `<Spinner>`.
- Rotates a copy bank of motivational lines, study tips, and feature teasers every 3 seconds.
- Uses CSS variables for theme so it actually renders in the user's preferred theme — even before the rest of the app does (the CSS variables are inlined into the HTML head at build time).
- Respects `prefers-reduced-motion` — the spinner becomes static, the copy stops rotating.
- Aria-labelled `role="status"` for screen readers.

In practice you see the boot loader for ~200-600 ms on first load, almost never on intra-app navigation.

## CSS variable bootstrap (avoiding the JS-required theme)

The HTML head bundles a tiny synchronous script that reads `theme-store` from `localStorage` and writes CSS variables before React runs:

```html
<script>
  try {
    var s = JSON.parse(localStorage.getItem('theme-store'));
    var appearance = s?.state?.appearance ?? 'light';
    var accent = s?.state?.accentColor ?? 'green';
    // Resolve 'system' via matchMedia
    if (appearance === 'system') {
      appearance = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.dataset.appearance = appearance;
    document.documentElement.dataset.accent = accent;
  } catch (e) { /* fall back to defaults */ }
</script>
```

CSS then reads `data-appearance` and `data-accent` to set background and accent before React touches the DOM. This is the difference between "no flash" and "noticeable flash" on slow first paint.

On Android the same script runs but the storage values are seeded by Capacitor Preferences on first launch via a small Java shim in the Capacitor plugin layer (a follow-up improvement; today the script only reads `localStorage` which works after the first online run primes it).

## Performance budget

A typical theme change should fire:

- One Zustand store write.
- One async `STORAGE.SET` (fire-and-forget — UI doesn't await).
- One `<Theme>` re-render (the only React re-render of the entire app).
- One debounced Firestore write 500 ms later for signed-in users.

That keeps "click a swatch" → "everything is repainted" under 16 ms in practice.

## Testing

The store has unit tests against the persist round-trip and the `system` → resolved mapping. The customizer page has a Playwright smoke test (manual, not in the auto suite per project policy) that verifies clicking each card swaps the DOM data-attribute. The sync hook has integration tests against a Firestore emulator (also dev-only).

## Next

- [User-facing theme doc](/docs/account/theme) — what the seven knobs do for the student.
- [State management](/docs/developers/architecture/state) — the bigger picture of stores.
- [Storage adapter](/docs/developers/architecture/storage) — the persistence backend.
