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
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
  },
  semanticColors: {
    background: colorTokens.neutral.white,
    foreground: colorTokens.neutral[900],
    card: colorTokens.neutral.white,
    cardForeground: colorTokens.neutral[900],
    muted: colorTokens.neutral[100],
    mutedForeground: colorTokens.neutral[600],
    foregroundSubtle: colorTokens.neutral[500],
    border: colorTokens.neutral[200],
    borderStrong: colorTokens.neutral[300],
    input: colorTokens.neutral[300],
    primary: colorTokens.brand.violet,
    primaryHover: colorTokens.brand.violetHover,
    primaryActive: colorTokens.brand.violetActive,
    primaryForeground: colorTokens.neutral.white,
    secondary: colorTokens.neutral[100],
    secondaryForeground: colorTokens.neutral[900],
    accent: colorTokens.brand.pale,
    accentForeground: colorTokens.brand.violet,
    surfaceRaised: colorTokens.neutral.white,
    surfaceSubtle: colorTokens.neutral[50],
    ring: colorTokens.brand.vivid,
    destructive: colorTokens.semantic.danger,
    destructiveForeground: colorTokens.neutral.white,
  },
} as const;

export type LightTheme = typeof lightTheme;
