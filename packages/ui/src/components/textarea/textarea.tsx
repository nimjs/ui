import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid = false, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-24 w-full rounded-[var(--radius-md)] border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
        invalid && 'border-destructive',
        className,
      )}
      data-invalid={invalid ? '' : undefined}
      {...props}
      aria-invalid={invalid || props['aria-invalid'] || undefined}
    />
  ),
);

Textarea.displayName = 'Textarea';
