import { describe, expect, it } from 'vitest';

import { colorTokens } from './colors';
import { motionTokens } from './motion';
import { spacingTokens } from './spacing';
import { lightTheme } from './themes/light';
import { typographyTokens } from './typography';

describe('lightTheme', () => {
  it('maps semantic colors from token primitives', () => {
    expect(lightTheme.semanticColors.primary).toBe(colorTokens.brand.redStrong);
    expect(lightTheme.semanticColors.background).toBe(
      colorTokens.neutral.white,
    );
    expect(lightTheme.semanticColors.accentForeground).toBe(
      colorTokens.brand.deep,
    );
  });

  it('exposes foundational design token layers', () => {
    expect(lightTheme.typography).toBe(typographyTokens);
    expect(lightTheme.spacing).toBe(spacingTokens);
    expect(lightTheme.motion).toBe(motionTokens);
  });
});
