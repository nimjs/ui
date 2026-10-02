import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-[var(--radius-md)] border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
        invalid && 'border-destructive',
        className,
      )}
      data-invalid={invalid ? '' : undefined}
      {...props}
      aria-invalid={invalid || props['aria-invalid'] || undefined}
    />
  ),
);

Select.displayName = 'Select';
