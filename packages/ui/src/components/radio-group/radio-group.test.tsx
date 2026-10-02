import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RadioGroup, RadioGroupItem } from './radio-group';

describe('RadioGroup', () => {
  it('supports uncontrolled selection and a disabled group', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup defaultValue="a" onValueChange={onValueChange} disabled>
        <legend>Plan</legend>
        <label htmlFor="plan-a">Basic</label>
        <RadioGroupItem id="plan-a" value="a" />
        <label htmlFor="plan-b">Pro</label>
        <RadioGroupItem id="plan-b" value="b" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Basic' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeDisabled();
  });

  it('reports value changes and follows controlled state', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <RadioGroup value="a" onValueChange={onValueChange}>
        <legend>Plan</legend>
        <label htmlFor="plan-a">Basic</label>
        <RadioGroupItem id="plan-a" value="a" />
        <label htmlFor="plan-b">Pro</label>
        <RadioGroupItem id="plan-b" value="b" />
      </RadioGroup>,
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Pro' }));
    expect(onValueChange).toHaveBeenCalledWith('b');
    rerender(
      <RadioGroup value="b" onValueChange={onValueChange}>
        <legend>Plan</legend>
        <label htmlFor="plan-a">Basic</label>
        <RadioGroupItem id="plan-a" value="a" />
        <label htmlFor="plan-b">Pro</label>
        <RadioGroupItem id="plan-b" value="b" />
      </RadioGroup>,
    );
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked();
  });
});
