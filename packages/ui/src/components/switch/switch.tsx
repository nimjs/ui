import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  invalid?: boolean;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <span className="relative inline-flex h-6 w-11 shrink-0 align-middle">
      <input
        ref={ref}
        type="checkbox"
        role="switch"
        className={cn(
          'peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed',
          className,
        )}
        data-invalid={invalid ? '' : undefined}
        {...props}
        aria-invalid={invalid || props['aria-invalid'] || undefined}
      />
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors peer-checked:bg-primary peer-checked:[&>span]:translate-x-5 peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-aria-[invalid=true]:ring-2 peer-aria-[invalid=true]:ring-destructive peer-disabled:opacity-50',
          invalid && 'ring-2 ring-destructive',
        )}
      >
        <span className="ms-1 h-4 w-4 rounded-full bg-background shadow-sm transition-transform" />
      </span>
    </span>
  ),
);

Switch.displayName = 'Switch';
