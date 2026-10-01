import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from './input';

describe('Input', () => {
  it('uses native input naming, focus, and disabled state', () => {
    render(
      <>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" disabled />
      </>,
    );

    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeDisabled();
    input.focus();
    expect(input).not.toHaveFocus();
  });
});
