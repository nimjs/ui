import { colorTokens } from '../colors';
import { motionTokens } from '../motion';
import { spacingTokens } from '../spacing';
import { typographyTokens } from '../typography';

export const lightTheme = {
  name: 'light',
  typography: typographyTokens,
  spacing: spacingTokens,
  motion: motionTokens,
  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
  semanticColors: {
    background: colorTokens.neutral.white,
    foreground: colorTokens.neutral[900],
    card: colorTokens.neutral.white,
    cardForeground: colorTokens.neutral[900],
    muted: colorTokens.neutral[100],
    mutedForeground: colorTokens.neutral[600],
    border: colorTokens.neutral[200],
    input: colorTokens.neutral[300],
    primary: colorTokens.brand.redStrong,
    primaryForeground: colorTokens.neutral.white,
    secondary: colorTokens.neutral[100],
    secondaryForeground: colorTokens.neutral[900],
    accent: colorTokens.accent.glow,
    accentForeground: colorTokens.brand.deep,
    ring: colorTokens.brand.red,
    destructive: colorTokens.semantic.danger,
    destructiveForeground: colorTokens.neutral.white,
  },
} as const;

export type LightTheme = typeof lightTheme;
