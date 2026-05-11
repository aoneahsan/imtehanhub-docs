---
id: theme
title: Theme customizer — appearance, accent, radius, scaling, font
sidebar_label: Theme customizer
sidebar_position: 2
description: ImtehanHub ships a full Radix UI theme customizer at /app/profile/theme — switch between light, dark, and system, pick an accent colour, change border radius, scale the UI, change font size, and choose between solid and translucent panels. Settings sync across devices when you sign in.
keywords:
  - ImtehanHub theme customizer
  - Radix UI theme settings
  - light dark mode Pakistani app
  - accent colour picker
  - UI scaling accessibility
slug: /account/theme
---

# Theme customizer

**The theme customizer** is a full visual settings modal at `/app/profile/theme` (also opened by clicking the palette icon in the app header). It exposes the entire Radix UI theme surface so you can tune the app to your eyes, your device, and the time of day. Settings persist locally on the device and sync across devices when you sign in.

> **TL;DR** — Seven knobs: Appearance, Accent, Gray Tone, Radius, Scaling, Font Size, Panel Background. All saved locally, mirrored to your account so a fresh phone or browser restores your look on first sign-in.

## Why a customizer at all

Pakistani students study in wildly different conditions — a small Android phone in a school van at noon, a laptop in a dim home at 11 pm, a parent-shared tablet over Wi-Fi. One theme cannot serve all of those. The customizer lets every student tune the app to their actual setup without us shipping multiple "skins."

It is also a deliberate accessibility surface. UI scaling, font size, and contrast all live here, in one place, with visual previews — no buried system settings to navigate.

## The seven options

### 1. Appearance — Light, Dark, System

Three card tiles. **System** follows your device's `prefers-color-scheme` and flips live when you change the OS setting (no app restart needed). **Light** and **Dark** override the system value.

The header also has a quick **appearance cycle** icon (sun → moon → laptop) for one-tap switching without opening the modal.

### 2. Accent colour

A grid of eight accent swatches: **Indigo, Violet, Blue, Cyan, Emerald, Pink, Amber, Crimson**. The active swatch shows a check mark. Picking a new accent retints buttons, links, charts, and every interactive surface app-wide.

The default is **Emerald** (ImtehanHub brand), but the chooser is intentionally generous because Radix gives us 25+ accent ramps for free.

### 3. Gray tone

Radix supports seven gray tones — `gray`, `mauve`, `slate`, `sage`, `olive`, `sand`, or `auto` (matched to your accent). The default is `auto`, which warms or cools the neutrals based on your accent so an Emerald theme has olive-ish grays and a Crimson theme has sand-ish grays.

If you prefer a strictly cool look regardless of accent, pick `slate` and the auto-matching turns off.

### 4. Border radius

Five tiles with visual radius previews: **none, small, medium, large, full**. The default is `medium`. Switching to `full` rounds buttons into pills and cards into soft tiles — a common preference on Android. `none` produces a sharp, document-like look popular with older students who prefer formal aesthetics.

### 5. UI scaling

Five percentages: **90%, 95%, 100%, 105%, 110%**. The default is 100%. Scaling changes the entire app's base font-size and spacing scale uniformly — buttons grow, cards grow, gaps grow. Useful on a large monitor (try 110%) or a small phone in landscape (try 95%).

### 6. Font size

Three options: **small, medium, large**. This affects body copy only, leaving the UI chrome at the scaling value above. Pick `large` when reading long answer explanations or chapter content on a phone.

### 7. Panel background

Two options: **solid** or **translucent**. Translucent uses subtle backdrop blur and 90% opacity, which looks great over the colourful homepage hero and feels more native on iOS / iPadOS. Solid is the default on Android because translucent surfaces can flicker on low-end devices.

## Persistence and cross-device sync

Two layers of storage:

| Layer | Storage | Audience |
|---|---|---|
| **Local** | `@capacitor/preferences` (native) / `localStorage` (web) | Every visitor, signed in or not |
| **Remote** | `users/{uid}.preferences` in Firestore | Only signed-in users; cross-device sync |

The flow:

1. You change a setting — local storage writes immediately.
2. A 500 ms debounce timer starts.
3. If you are signed in, the debounce fires and writes to Firestore.
4. On your next sign-in on any device, Firestore is fetched and overwrites local — your phone, tablet, and laptop converge on the same theme.

If Firestore is unreachable (offline), the local copy is still authoritative. The next online sign-in catches up.

## Boot loader and FOUC prevention

Theme + auth must resolve **before** the app renders any content, otherwise you would see a brief flash of light-mode UI before snapping to dark. ImtehanHub gates the first paint behind a full-screen **boot loader** that:

- Shows the ImtehanHub logo + a Radix-styled spinner.
- Rotates motivational quotes, study tips, and feature teasers every 3 seconds.
- Hides only after both the theme store has rehydrated AND the auth store has emitted its first state.
- Respects `prefers-reduced-motion` — the loader becomes static for users who request it.

You will see the boot loader for ~200-600 ms on first load and on hard reload, almost never on intra-app navigation.

## Reset to defaults

A small **Reset** button at the bottom of the modal restores every option to the ImtehanHub defaults:

```
appearance: 'light'
accent: 'emerald'
grayTone: 'auto'
radius: 'medium'
scaling: '100%'
fontSize: 'medium'
panelBackground: 'solid'
```

Reset is local-only by default; if you reset and sync is active, the defaults also flow to Firestore on the next debounce.

## Header palette icon

The icon in the top-right of the app header is the customizer entry point. It is visible to:

- Signed-in users.
- Signed-out visitors browsing public pages (the customizer works without an account; settings persist locally).

Tooltip text is bilingual (`Theme` / `تھیم`).

## Accessibility notes

- Every option is keyboard-navigable with visible focus rings.
- Card selectors expose `aria-pressed` for screen readers.
- Colour swatches include text labels for users on Windows High Contrast mode.
- All animations honour `prefers-reduced-motion`.

## Common questions

### Why card selectors instead of dropdowns?

Dropdowns hide the options behind a click. Cards let you compare visually — you can see all five radius options side by side, choose by eye, and verify the change instantly. The trade-off is more screen real estate, which we judged worth it for a settings surface visited rarely.

### Does the theme affect printed test results?

Printed pages always render in a print-optimised palette — black text, white background, no accent fills — regardless of your theme. Light/dark toggle does not bleed into print output.

### Can my institute force a theme?

Not currently. Theme is strictly personal. Institute managers cannot override student theme preferences.

## Next

- [Profile](/docs/account/profile) — display name, avatar, default board.
- [Language toggle](/docs/account/language) — EN ↔ UR and RTL flip.
- **Theme architecture** — how the Zustand store + Capacitor Preferences + Firestore sync is wired. Ships with the Developer section in Batch 6.
