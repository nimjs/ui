import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

function Example({
  type = 'single',
  onValueChange,
}: {
  type?: 'single' | 'multiple';
  onValueChange?: (value: string | string[] | undefined) => void;
}) {
  return (
    <Accordion type={type} onValueChange={onValueChange}>
      <AccordionItem value="one">
        <AccordionTrigger>One</AccordionTrigger>
        <AccordionContent>First answer</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger>Two</AccordionTrigger>
        <AccordionContent>Second answer</AccordionContent>
      </AccordionItem>
      <AccordionItem value="three" disabled>
        <AccordionTrigger>Three</AccordionTrigger>
        <AccordionContent>Third answer</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe('Accordion', () => {
  it('opens one item at a time in single mode and blocks disabled items', async () => {
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    const first = screen.getByText('One').closest('details')!;
    const second = screen.getByText('Two').closest('details')!;
    fireEvent.click(screen.getByText('One'));
    await waitFor(() => expect(first.open).toBe(true));
    fireEvent.click(screen.getByText('Two'));
    await waitFor(() => expect(second.open).toBe(true));
    expect(first.open).toBe(false);
    fireEvent.click(screen.getByText('Three'));
    expect(screen.getByText('Three').closest('details')!.open).toBe(false);
    expect(onValueChange).toHaveBeenLastCalledWith('two');
  });

  it('keeps multiple items open in multiple mode', async () => {
    render(<Example type="multiple" />);
    const first = screen.getByText('One').closest('details')!;
    const second = screen.getByText('Two').closest('details')!;
    fireEvent.click(screen.getByText('One'));
    await waitFor(() => expect(first.open).toBe(true));
    fireEvent.click(screen.getByText('Two'));
    await waitFor(() => expect(second.open).toBe(true));
    expect(first.open).toBe(true);
  });
});
