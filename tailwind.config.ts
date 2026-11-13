import type { Config } from 'tailwindcss';

// Hallmark Formwork のトークン（app/tokens.css）を Tailwind のユーティリティ名に対応づける。
// 値はすべて var() で tokens.css を参照する（ここに色やフォントの実値を書かない）。
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: 'var(--color-paper)', 2: 'var(--color-paper-2)', 3: 'var(--color-paper-3)' },
        plate: { DEFAULT: 'var(--color-plate)', ink: 'var(--color-plate-ink)' },
        ink: { DEFAULT: 'var(--color-ink)', 2: 'var(--color-ink-2)' },
        muted: 'var(--color-muted)',
        rule: 'var(--color-rule)',
        accent: { DEFAULT: 'var(--color-accent)', ink: 'var(--color-accent-ink)', deep: 'var(--color-accent-deep)' },
        focus: 'var(--color-focus)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        line: 'var(--color-line)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        sans: ['var(--font-body)'],
        figure: ['var(--font-outlier)'],
      },
      fontSize: {
        display: ['var(--text-display)', { lineHeight: '1.2' }],
        'display-s': ['var(--text-display-s)', { lineHeight: '1.25' }],
        section: ['var(--text-section)', { lineHeight: '1.3' }],
        title: ['var(--text-title)', { lineHeight: '1.4' }],
        lead: ['var(--text-lead)', { lineHeight: '1.65' }],
      },
      maxWidth: {
        container: 'var(--container)',
      },
      borderWidth: {
        bar: 'var(--rule-bar)',
        hair: 'var(--rule-hair)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      transitionTimingFunction: {
        out: 'var(--ease-out)',
        in: 'var(--ease-in)',
        'in-out': 'var(--ease-in-out)',
      },
      transitionDuration: {
        micro: '120ms',
        short: '220ms',
        long: '420ms',
      },
      animation: {
        'maruai-wiggle': 'maruai-wiggle 0.55s ease-in-out',
        'maruai-float': 'maruai-float 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
