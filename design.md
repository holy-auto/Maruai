# Design: 丸愛装業（maruai-sougyo）

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: editorial
- Shape of the first page: Conversational FAQ (draw ca3a40); every section head is the homeowner's own question
- Theme: Formwork (deal 1/3), pour: cast
- Axes: mid/display-condensed/warm · posture: restrained (orange under 5% of any screen)
- Redesign: full · job: hire (the action: an estimate enquiry by phone, LINE or the form)

## Tokens
`app/tokens.css` is the source of truth; `app/globals.css` carries the base rules (Tailwind v3 `@layer base`) and the Formwork components. Tailwind names (tailwind.config.ts) map 1:1 to the tokens:
```css
:root {
  --color-paper: oklch(74% 0.008 80);  --color-paper-2: oklch(69% 0.009 80);  --color-paper-3: oklch(64% 0.01 80);
  --color-plate: oklch(82% 0.007 80);  --color-plate-ink: oklch(95% 0.006 80);
  --color-ink: oklch(18% 0.005 270);  --color-ink-2: oklch(28% 0.006 80);  --color-muted: oklch(31.5% 0.008 80);  --color-rule: oklch(64% 0.01 80);
  --color-accent: oklch(66% 0.21 38);  --color-accent-ink: oklch(18% 0.005 270);  --color-accent-deep: oklch(48% 0.17 38);  --color-focus: oklch(42% 0.15 38);
  --font-display: Oswald (Latin, figures) + Zen Kaku Gothic New 700 (Japanese);  --font-body: Zen Kaku Gothic New 400/500;  --font-outlier: Oswald (figures only)
  --radius-card: 0;  --radius-pill: 0;  --rule-hair: 1px;  --rule-bar: 3px;  --shadow-card: 6px 6px 0 var(--color-ink);
}
```
Tailwind: `bg-paper` `bg-paper-2` `bg-paper-3` `bg-plate` `text-plate-ink` `text-ink` `text-ink-2` `text-muted` `bg-accent` `text-accent-ink` `bg-accent-deep` `border-ink` `border-bar` `border-hair` `shadow-card` `font-display` `font-body` `font-figure` `text-display` `text-display-s` `text-section` `text-title` `text-lead`. Spacing: Tailwind's 4px scale or `var(--space-*)`. Never a colour or font literal in a component (no `bg-white`, `text-gray-*`, `#fff`, hex, Tailwind palette colours).

## Japanese type
- Heads: `font-display`, weight 700, line-height 1.3 (h3 1.4), `palt`, one colour, one weight. Never one word set apart by colour, weight or a highlight (38iii); stress is a line break.
- Body: Zen Kaku Gothic New 400, 16px minimum, line-height 1.75, measure 38em. Labels: `.label` (14px, 500, ink-2, sentence case, untracked).
- Weights in use: 400, 500, 700 only. No English eyebrow or tracked capitals anywhere (54, 67): open a section with its question as the `h2`, nothing above it.
- Numbers: `font-figure` (Oswald) with `tabular-nums` for prices, areas, percentages, phone numbers.
- No em or en dash (——, –) in copy; a comma, a full stop or parentheses instead. No 「！」 in new copy.

## Surfaces
- Radius 0 everywhere. Depth is cast: a `.plate` (plate fill, 3px ink border, hard 6px ink shadow), one or two a page. No blurred shadows, no gradients, no glow, no icon-in-a-circle tiles, no coloured pill badges, no card inside a card.
- Rules: a 3px ink `border-bar` across the top of a section or table; 1px `border-paper-3` hairlines between rows.
- Bands: `bg-paper-2` (a darker pour) or one `bg-ink` band with `text-plate-ink` (use `grained--light` on it). Two bands a page at most; never an orange field.
- Photographs: black and white through `[data-slot] > img`; 2px ink frame (`.photo`); caption beneath in `.label`. Only the client's own photographs (no library photo fits a house painter). No readdy.ai or other generated images.
- Icons: Remix Icon only, 16 to 24px, `currentColor`, inline beside text, never in a tile; `aria-hidden="true"`.

## Controls
- Primary: `.btn .btn--primary` (orange, Oswald/Zen 700, 48px, presses down 3px). One filled primary a page.
- Secondary: `.btn .btn--secondary` (pressed-in paper-2, 2px ink border), or `.link` (ink, underlined, orange on hover). On the ink band: `.btn--on-ink`.
- Inputs: `.field` (pressed-in, 2px ink border, focus by outline). Labels `<label class="label">`.
- Every control: hover, `:active`, `:focus-visible` (2px focus ring, instant), `:disabled`.

## Layout
- `.container` (1440 max, 64px gutters, 24 under 60rem, 16 under 40rem); 12 columns, 32px gap.
- Section padding: a section on the same paper as its neighbours takes half a gap top and bottom (`py-[calc(var(--section-gap)/2)]`, or `--section-gap-l`), so two neighbours part by one full gap; a band (a change of paper) takes `py-[var(--section-gap-s)]`. Mix the steps.
- Japanese line breaks: heads, leads and display-face text break at phrase boundaries (`word-break: auto-phrase`, set in the base CSS); never let a head break inside a word. Section head `h2` at `text-section` on columns 1 to 6 or 1 to 7; the body reaches ten of twelve columns.
- Compositions: Rows (title on 1 to 5, the answer on 6 to 12, hairlines between), Table, Comparison as two plates, Statement on the ink band, Form beside the facts, Index. Never the same composition in neighbouring sections.
- Secondary pages: `PageHero` (Banner posture: `h1` on columns 1 to 7, the lead on 8 to 12, a bar rule beneath), then the content.

## Motion
- Character: still. A control presses in over 120ms; state lands at once. Nothing on scroll, no reveal, no pulse, no bounce, no parallax. The floating mascot (まるあいくん) is kept as the client asked.

## Exports
`app/tokens.css` and the Tailwind names above.
