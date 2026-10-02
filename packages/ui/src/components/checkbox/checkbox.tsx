import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  indeterminate?: boolean;
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, indeterminate = false, invalid = false, ...props },
    forwardedRef,
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => internalRef.current!, []);
    React.useEffect(() => {
      if (internalRef.current)
        internalRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <input
        ref={internalRef}
        type="checkbox"
        className={cn(
          'h-4 w-4 shrink-0 rounded-[var(--radius-sm)] border border-input bg-background accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
          invalid && 'border-destructive',
          className,
        )}
        data-invalid={invalid ? '' : undefined}
        {...props}
        aria-invalid={invalid || props['aria-invalid'] || undefined}
      />
    );
  },
);

Checkbox.displayName = 'Checkbox';
