import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, label = 'Loading', ...props }, ref) => (
    <span
      ref={ref}
      role="status"
      aria-label={label}
      className={cn(
        'inline-block h-5 w-5 rounded-full border-2 border-current border-e-transparent motion-safe:animate-spin',
        className,
      )}
      {...props}
    />
  ),
);
Spinner.displayName = 'Spinner';
