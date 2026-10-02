import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Switch } from './switch';

describe('Switch', () => {
  it('uses native checked state with a switch role and label', () => {
    render(
      <>
        <label htmlFor="notifications">Notifications</label>
        <Switch id="notifications" defaultChecked />
      </>,
    );
    const control = screen.getByRole('switch', { name: 'Notifications' });
    expect(control).toBeChecked();
    fireEvent.click(control);
    expect(control).not.toBeChecked();
  });
});
