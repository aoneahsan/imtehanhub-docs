#!/usr/bin/env python3
"""
Generate per-route OG images (1200x630 PNG) for the top 10 high-traffic doc pages.

Design system (DFII evaluation):
  Aesthetic name: "Emerald-to-Sky bilingual badge"
  - Impact:       4 (distinctive emerald->sky gradient, no AI-default purple)
  - Fit:          5 (matches brand tokens used in the app)
  - Feasibility:  5 (single SVG template + per-route substitutions)
  - Performance:  5 (~100KB per PNG, well under social-card budget)
  - Consistency risk: 1 (one template, no per-route colour drift)
  DFII = 4+5+5+5 - 1 = 18  (capped at 15 in the rubric — execute fully).

  Differentiation anchor: the uppercase letter-spaced eyebrow pill above the
  title. At thumbnail size (~120px wide on a phone preview), the title goes
  unreadable but the eyebrow pill stays identifiable.

Usage:
  python3 scripts/generate-og-images.py     # writes static/img/og-*.png
"""
import os
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
IMG_DIR = REPO / 'static' / 'img'
IMG_DIR.mkdir(parents=True, exist_ok=True)

# 10 top-traffic pages with their per-route copy.
# Each: slug, eyebrow (uppercase pill), title (large), subtitle (medium).
ROUTES = [
    ('welcome',         'GETTING STARTED', 'Welcome to ImtehanHub',          'Free Pakistani exam prep — Class 5 to 2nd Year, bilingual.'),
    ('faq',             'FAQ',             'Every question students ask',     'Pricing, content, privacy, mobile — all answered honestly.'),
    ('compare',         'COMPARE',         'ImtehanHub vs alternatives',      'Tuition academies, past papers, paid apps, YouTube — honest.'),
    ('credits',         'AUTHOR',          'Built by Ahsan Mahmood',          'Full-stack engineer in Lahore. Open to contract work.'),
    ('billing',         'PRICING',         'Free forever or PKR 299/mo Pro',  'Four plan tiers. Cancel any time. No hidden fees.'),
    ('install',         'ANDROID APP',     'Install ImtehanHub on Android',   'Native sign-in, offline tests, push notifications.'),
    ('community',       'COMMUNITY',       'Peer-contributed exam questions', 'Submit, vote, flag, earn — CNIC-verified contributors.'),
    ('developer',       'DEVELOPER',       'Stack, layers, philosophy',       'React 19 + Capacitor + Firebase free tier. Open docs.'),
    ('glossary',        'GLOSSARY',        'Pakistani exam terms defined',    'Matric, FA, FSc, BISE, CNIC, NADRA — 35+ definitions.'),
    ('privacy',         'PRIVACY',         'Every byte we store, explained',  'Data minimisation. Self-service delete. CNIC stays in your Drive.'),
]


def xml_escape(s: str) -> str:
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def build_svg(eyebrow: str, title: str, subtitle: str) -> str:
    """Build one per-route 1200x630 SVG. Brand background + logo + footer
    stay constant; eyebrow pill, title, and subtitle are per-route."""
    e = xml_escape(eyebrow)
    t = xml_escape(title)
    s = xml_escape(subtitle)

    # Eyebrow pill width: rough char-width estimate at 22px letter-spaced.
    pill_width = max(140, 24 + len(eyebrow) * 14)

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="ImtehanHub Documentation — {e}">
  <defs>
    <linearGradient id="og-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#059669"/>
      <stop offset="100%" stop-color="#0EA5E9"/>
    </linearGradient>
    <linearGradient id="og-card" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#og-bg)"/>
  <circle cx="980" cy="120" r="220" fill="#FFFFFF" opacity="0.08"/>
  <circle cx="120" cy="540" r="180" fill="#FFFFFF" opacity="0.06"/>

  <!-- Logo block (top-left, 120x120) -->
  <g transform="translate(96 96)">
    <rect width="120" height="120" rx="28" fill="#FFFFFF" opacity="0.18"/>
    <g transform="translate(12 12)">
      <path d="M0 28 L48 6 L96 28 L48 50 Z" fill="#FFFFFF"/>
      <path d="M16 36 L16 64 L48 80 L80 64 L80 36" stroke="#FFFFFF" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- Eyebrow pill (differentiation anchor — uppercase letter-spaced) -->
  <g transform="translate(96 270)">
    <rect width="{pill_width}" height="44" rx="22" fill="#FFFFFF" opacity="0.22"/>
    <text x="20" y="30" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="700" fill="#FFFFFF" letter-spacing="2.5">{e}</text>
  </g>

  <!-- Title -->
  <text x="96" y="385" font-family="Inter, system-ui, sans-serif" font-size="64" font-weight="800" fill="#FFFFFF">{t}</text>

  <!-- Subtitle -->
  <text x="96" y="450" font-family="Inter, system-ui, sans-serif" font-size="30" font-weight="500" fill="#FFFFFF" opacity="0.92">{s}</text>

  <!-- Footer URL bar (brand consistency) -->
  <rect x="96" y="520" width="1008" height="60" rx="8" fill="url(#og-card)"/>
  <text x="120" y="560" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="500" fill="#FFFFFF">imtehanhub-docs.aoneahsan.com  ·  Built by Ahsan Mahmood (aoneahsan.com)</text>
</svg>
'''


def main():
    ok = 0
    failed = []
    for slug, eyebrow, title, subtitle in ROUTES:
        svg_path = IMG_DIR / f'og-{slug}.svg'
        png_path = IMG_DIR / f'og-{slug}.png'
        svg_path.write_text(build_svg(eyebrow, title, subtitle), encoding='utf-8')

        # Render via rsvg-convert at exact 1200x630
        try:
            subprocess.run(
                ['rsvg-convert', '--width=1200', '--height=630',
                 '--background-color=transparent', str(svg_path),
                 '-o', str(png_path)],
                check=True, capture_output=True,
            )
            size_kb = png_path.stat().st_size // 1024
            print(f'  [{size_kb:3d}KB]  og-{slug}.png')
            ok += 1
        except subprocess.CalledProcessError as e:
            print(f'  FAIL    og-{slug}.png — {e.stderr.decode()[:200]}', file=sys.stderr)
            failed.append(slug)

    print(f'\nGenerated {ok}/{len(ROUTES)} OG images')
    if failed:
        print(f'Failed: {", ".join(failed)}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
