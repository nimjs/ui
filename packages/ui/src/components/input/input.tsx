import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-[var(--radius-md)] border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
          invalid && 'border-destructive',
          className,
        )}
        type={type}
        data-invalid={invalid ? '' : undefined}
        {...props}
        aria-invalid={invalid || props['aria-invalid'] || undefined}
      />
    );
  },
);

Input.displayName = 'Input';
