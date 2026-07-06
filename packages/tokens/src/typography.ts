export const typographyTokens = {
  fontFamily: {
    body: '"Avenir Next", "Manrope", "Segoe UI", sans-serif',
    display: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", serif',
    mono: '"SFMono-Regular", "Cascadia Code", "Liberation Mono", monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  lineHeight: {
    tight: '1.2',
    snug: '1.35',
    normal: '1.5',
    relaxed: '1.7',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export type TypographyTokens = typeof typographyTokens;
