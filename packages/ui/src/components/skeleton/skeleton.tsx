import { cn } from '@nimjs/utils';
import * as React from 'react';

export const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    aria-hidden="true"
    className={cn(
      'animate-pulse rounded-[var(--radius-md)] bg-muted motion-reduce:animate-none',
      className,
    )}
    {...props}
  />
));
Skeleton.displayName = 'Skeleton';
