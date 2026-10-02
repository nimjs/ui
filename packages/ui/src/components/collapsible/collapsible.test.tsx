import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible';

describe('Collapsible', () => {
  it('uses native summary activation for uncontrolled disclosure', async () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>More information</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByText('Details');
    const details = trigger.closest('details')!;
    expect(details.open).toBe(false);
    fireEvent.click(trigger);
    await waitFor(() => expect(details.open).toBe(true));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it('accepts a controlled open state', () => {
    const { rerender } = render(
      <Collapsible open={false}>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>More information</CollapsibleContent>
      </Collapsible>,
    );
    const details = screen.getByText('Details').closest('details')!;
    expect(details.open).toBe(false);
    rerender(
      <Collapsible open>
        <CollapsibleTrigger>Details</CollapsibleTrigger>
        <CollapsibleContent>More information</CollapsibleContent>
      </Collapsible>,
    );
    expect(details.open).toBe(true);
  });
});
