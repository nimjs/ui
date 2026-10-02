import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Select } from './select';

describe('Select', () => {
  it('uses native labels, groups, disabled options, and value changes', () => {
    render(
      <>
        <label htmlFor="city">City</label>
        <Select id="city" defaultValue="a">
          <optgroup label="Available">
            <option value="a">Athens</option>
            <option value="b">Berlin</option>
          </optgroup>
          <option value="c" disabled>
            Cairo
          </option>
        </Select>
      </>,
    );
    const control = screen.getByRole('combobox', {
      name: 'City',
    }) as HTMLSelectElement;
    expect(control.value).toBe('a');
    expect(screen.getByRole('option', { name: 'Cairo' })).toBeDisabled();
    fireEvent.change(control, { target: { value: 'b' } });
    expect(control.value).toBe('b');
  });
});
