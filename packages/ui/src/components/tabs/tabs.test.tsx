import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

function Example({
  value,
  onValueChange,
}: {
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Tabs defaultValue="one" value={value} onValueChange={onValueChange}>
      <TabsList aria-label="Sections">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two" disabled>
          Two
        </TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">First panel</TabsContent>
      <TabsContent value="two">Second panel</TabsContent>
      <TabsContent value="three">Third panel</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('moves focus and selection with arrows, Home, and End while skipping disabled tabs', () => {
    render(<Example />);
    const first = screen.getByRole('tab', { name: 'One' });
    const third = screen.getByRole('tab', { name: 'Three' });
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(third).toHaveFocus();
    expect(third).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Three' })).toHaveTextContent(
      'Third panel',
    );
    fireEvent.keyDown(third, { key: 'Home' });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: 'End' });
    expect(third).toHaveFocus();
  });

  it('keeps controlled selection until the parent changes value', () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <Example value="one" onValueChange={onValueChange} />,
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(onValueChange).toHaveBeenCalledWith('three');
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    rerender(<Example value="three" onValueChange={onValueChange} />);
    expect(screen.getByRole('tab', { name: 'Three' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });

  it('uses vertical arrow keys and reverses horizontal arrows in RTL', () => {
    const { rerender } = render(
      <Tabs defaultValue="one" orientation="vertical">
        <TabsList aria-label="Vertical">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First</TabsContent>
        <TabsContent value="two">Second</TabsContent>
      </Tabs>,
    );
    const first = screen.getByRole('tab', { name: 'One' });
    const second = screen.getByRole('tab', { name: 'Two' });
    fireEvent.keyDown(first, { key: 'ArrowDown' });
    expect(second).toHaveAttribute('aria-selected', 'true');
    rerender(
      <Tabs defaultValue="one" dir="rtl">
        <TabsList aria-label="RTL">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsContent value="one">First</TabsContent>
        <TabsContent value="two">Second</TabsContent>
      </Tabs>,
    );
    fireEvent.keyDown(second, { key: 'ArrowRight' });
    expect(first).toHaveAttribute('aria-selected', 'true');
  });
});
