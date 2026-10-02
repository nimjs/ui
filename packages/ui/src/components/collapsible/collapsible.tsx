import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface CollapsibleProps extends Omit<
  React.DetailsHTMLAttributes<HTMLDetailsElement>,
  'open' | 'onToggle'
> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Collapsible = React.forwardRef<
  HTMLDetailsElement,
  CollapsibleProps
>(
  (
    { children, className, defaultOpen = false, onOpenChange, open, ...props },
    forwardedRef,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const currentOpen = open === undefined ? internalOpen : open;
    const internalRef = React.useRef<HTMLDetailsElement>(null);
    const latestOpen = React.useRef(currentOpen);
    latestOpen.current = currentOpen;
    React.useImperativeHandle(forwardedRef, () => internalRef.current!, []);
    React.useEffect(() => {
      if (
        open !== undefined &&
        internalRef.current &&
        internalRef.current.open !== open
      )
        internalRef.current.open = open;
    }, [open]);

    return (
      <details
        ref={internalRef}
        open={currentOpen}
        data-state={currentOpen ? 'open' : 'closed'}
        className={cn('group', className)}
        {...props}
        onToggle={(event) => {
          const nextOpen = event.currentTarget.open;
          if (nextOpen === latestOpen.current) return;
          if (open === undefined) setInternalOpen(nextOpen);
          onOpenChange?.(nextOpen);
          if (open !== undefined) {
            queueMicrotask(() => {
              if (internalRef.current)
                internalRef.current.open = latestOpen.current;
            });
          }
        }}
      >
        {children}
      </details>
    );
  },
);
Collapsible.displayName = 'Collapsible';

export const CollapsibleTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className, ...props }, ref) => (
  <summary
    ref={ref}
    className={cn(
      'cursor-pointer rounded-[var(--radius-md)] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      className,
    )}
    {...props}
  >
    {children}
  </summary>
));
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

export const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-2 text-sm text-muted-foreground', className)}
    {...props}
  />
));
CollapsibleContent.displayName = 'CollapsibleContent';
