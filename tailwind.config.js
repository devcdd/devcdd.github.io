// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: [
          '"JetBrains Mono Variable"',
          '"Pretendard Variable"',
          'Pretendard',
          ...fontFamily.sans,
        ],
        display: [
          '"JetBrains Mono Variable"',
          '"Pretendard Variable"',
          'Pretendard',
          ...fontFamily.sans,
        ],
        mono: [
          '"JetBrains Mono Variable"',
          '"Pretendard Variable"',
          'Pretendard',
          ...fontFamily.mono,
        ],
      },
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#dce8ff',
          200: '#bfd5ff',
          300: '#91b8ff',
          400: '#5b8eff',
          500: '#2f63ff',
          600: '#183fcb',
          700: '#1633a1',
          800: '#172d7c',
          900: '#18285f',
          950: '#0d1638',
        },
        gray: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: 'var(--copy)',
            a: {
              color: theme('colors.primary.500'),
              textDecoration: 'none',
              fontWeight: '600',
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: 'var(--copy-strong)',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.300'),
              color: 'var(--copy-muted)',
            },
            hr: {
              borderColor: 'var(--border)',
            },
            strong: {
              color: 'var(--copy-strong)',
            },
            code: {
              color: theme('colors.primary.700'),
              backgroundColor: 'var(--surface-muted)',
              borderRadius: theme('borderRadius.md'),
              paddingInline: theme('spacing.1'),
              paddingBlock: '0.125rem',
            },
            'code::before, code::after': {
              content: 'none',
            },
          },
        },
        invert: {
          css: {
            color: 'var(--copy)',
            a: {
              color: theme('colors.primary.500'),
              textDecoration: 'none',
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: 'var(--copy-strong)',
            },
            blockquote: {
              borderLeftColor: theme('colors.primary.600'),
              color: 'var(--copy-muted)',
            },
            hr: {
              borderColor: 'var(--border)',
            },
            strong: {
              color: 'var(--copy-strong)',
            },
            code: {
              color: theme('colors.primary.300'),
              backgroundColor: 'var(--surface-muted)',
            },
            'code::before, code::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
