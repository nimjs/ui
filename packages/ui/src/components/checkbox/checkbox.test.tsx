import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('supports native unchecked, checked, disabled, and indeterminate states', () => {
    const { rerender } = render(
      <>
        <label htmlFor="updates">Updates</label>
        <Checkbox id="updates" />
      </>,
    );
    const control = screen.getByRole('checkbox', {
      name: 'Updates',
    }) as HTMLInputElement;
    expect(control).not.toBeChecked();
    fireEvent.click(control);
    expect(control).toBeChecked();
    rerender(
      <>
        <label htmlFor="updates">Updates</label>
        <Checkbox id="updates" indeterminate disabled />
      </>,
    );
    expect(control.indeterminate).toBe(true);
    expect(control).toBeDisabled();
  });
});
