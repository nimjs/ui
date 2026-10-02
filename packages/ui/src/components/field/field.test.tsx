import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Input } from '../input/input';

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
} from './field';

describe('Field', () => {
  it('connects the label, help, and error to a native control', () => {
    render(
      <Field description error invalid required>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <Input type="email" />
        </FieldControl>
        <FieldDescription>Work address</FieldDescription>
        <FieldError>Invalid email</FieldError>
      </Field>,
    );
    const control = screen.getByRole('textbox', { name: 'Email' });
    expect(control).toBeRequired();
    expect(control).toHaveAttribute('aria-invalid', 'true');
    const ids = control.getAttribute('aria-describedby')?.split(' ');
    expect(ids).toHaveLength(2);
    expect(document.getElementById(ids![0]!)).toHaveTextContent('Work address');
    expect(document.getElementById(ids![1]!)).toHaveTextContent(
      'Invalid email',
    );
  });
});
