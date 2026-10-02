import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Progress } from './progress';

describe('Progress', () => {
  it('clamps measured values and leaves unknown progress indeterminate', () => {
    const { rerender } = render(
      <Progress value={140} max={100} aria-label="Upload" />,
    );
    const progress = screen.getByRole('progressbar', { name: 'Upload' });
    expect(progress).toHaveAttribute('aria-valuenow', '100');
    rerender(<Progress aria-label="Upload" />);
    expect(progress).not.toHaveAttribute('aria-valuenow');
  });
});
