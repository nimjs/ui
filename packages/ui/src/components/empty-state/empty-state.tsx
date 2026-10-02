import { cn } from '@nimjs/utils';
import * as React from 'react';

export const EmptyState = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-border bg-card px-6 py-10 text-center text-card-foreground',
      className,
    )}
    {...props}
  />
));
EmptyState.displayName = 'EmptyState';

export const EmptyStateTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-lg font-semibold', className)} {...props}>
    {children}
  </h3>
));
EmptyStateTitle.displayName = 'EmptyStateTitle';

export const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('max-w-prose text-sm text-muted-foreground', className)}
    {...props}
  />
));
EmptyStateDescription.displayName = 'EmptyStateDescription';

export const EmptyStateActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('mt-2 flex flex-wrap justify-center gap-2', className)}
    {...props}
  />
));
EmptyStateActions.displayName = 'EmptyStateActions';
