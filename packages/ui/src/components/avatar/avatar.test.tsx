import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

describe('Avatar', () => {
  it('shows fallback content when its image fails', () => {
    const { container } = render(
      <Avatar aria-label="Ada Lovelace">
        <AvatarFallback>AL</AvatarFallback>
        <AvatarImage src="/missing.png" alt="" />
      </Avatar>,
    );
    const image = container.querySelector('img')!;
    fireEvent.error(image);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Ada Lovelace' }),
    ).toBeInTheDocument();
    expect(screen.getByText('AL')).toHaveAttribute('aria-hidden', 'true');
  });
});
