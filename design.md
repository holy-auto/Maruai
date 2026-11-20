# Design: 丸愛装業（maruai-sougyo）

The locked system. Change it on purpose; the file is the rule.
Direction (2026-11-18, the client's request): corporate and trustworthy, with the craftsman's hand kept. It replaces the earlier Hallmark "Formwork" look, which read as dated.

## System
- Corporate: white base, deep navy as the company colour, thin rules, soft shadows, 4 to 6px corners, a sticky white header (logo, links, phone, 無料見積もり), an English eyebrow over every section head.
- Craftsman: headings and figures in Shippori Mincho B1 (明朝), a 弁柄/朱 accent, a thin gold for numbers and footer labels, the 代表's words on a navy band.
- Every home section head stays the homeowner's own question in Japanese (外壁も屋根も、防水も頼める？ …), with the English eyebrow above it.

## Tokens
`app/tokens.css` is the source of truth; Tailwind names in `tailwind.config.ts` map 1:1.
- paper `oklch(99.6% 0.002 85)` · paper-2 `oklch(96.6% 0.008 80)` (alternate band) · paper-3 `oklch(89.5% 0.01 80)` (lines)
- ink (navy) `oklch(26% 0.035 255)` · ink-2 `oklch(40% 0.025 255)` · muted `oklch(50% 0.02 255)`
- accent (朱) `oklch(54% 0.15 35)` · accent-deep `oklch(45% 0.14 35)` · accent-ink white · gold `oklch(68% 0.09 75)`
- fonts: `--font-display` / `--font-outlier` Shippori Mincho B1 600/700; `--font-body` Zen Kaku Gothic New 400/500/700
- radius: card 6px, control 4px · rule 1px · shadow-card soft navy

## Components (app/globals.css)
- `.eyebrow` (朱, tracked caps, short line before), `.eyebrow--light` (gold, on navy)
- `.btn--primary` 朱 / `.btn--secondary` white with navy border / `.btn--on-ink` outline on navy
- `.plate` white card, 1px line, soft shadow · `.photo` rounded, no frame · `.field` white, 1px border, navy focus ring
- Never Tailwind opacity modifiers on var() colours (`bg-paper/95`); use `color-mix()` or `opacity-*`.

## Layout
- `.container` 1440 max; sections `py-[var(--section-gap)]`, alternating paper / paper-2, navy for the hero overlay, the message and the footer; one 朱 contact band above the footer.
- Hero: full-width photo, navy gradient, white 明朝 headline, a white price card.
- Secondary pages: `PageHero` (paper-2 band, eyebrow, 明朝 h1, lead on the right).
- Japanese line breaks: `word-break: auto-phrase`; phrase spans with `inline-block` where a line must not break.

## Photographs
The client's own photographs first. Until they arrive: freely licensed real photographs from Wikimedia Commons (streets, tools, the work), never a house shown as a job, a worker only from behind; each captioned 「イメージ写真」 and credited in the footer from `lib/photoCredits.ts`. No generated images.

## Motion
Quiet: hover colour changes, a slight photo zoom on service cards, the header link underline. The floating mascot (まるあいくん) is kept as the client asked.
