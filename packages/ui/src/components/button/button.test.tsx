import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Button } from './button';

describe('Button', () => {
  it('renders accessible button text', () => {
    render(<Button>Launch</Button>);
    expect(
      screen.getByRole('button', {
        name: 'Launch',
      }),
    ).toBeInTheDocument();
  });

  it('keeps native button behavior for focus and disabled state', () => {
    let presses = 0;
    const { rerender } = render(
      <Button
        onClick={() => {
          presses += 1;
        }}
      >
        Launch
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Launch' });

    expect(button).toHaveAttribute('type', 'button');
    button.focus();
    expect(button).toHaveFocus();
    fireEvent.click(button);
    expect(presses).toBe(1);

    rerender(
      <Button
        disabled
        onClick={() => {
          presses += 1;
        }}
      >
        Launch
      </Button>,
    );
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(presses).toBe(1);
  });

  it('keeps its accessible name and blocks activation while loading', () => {
    let presses = 0;
    render(
      <Button
        loading
        onClick={() => {
          presses += 1;
        }}
      >
        Save
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(button);
    expect(presses).toBe(0);
  });
});
