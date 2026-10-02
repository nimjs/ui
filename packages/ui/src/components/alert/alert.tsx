import { cn } from '@nimjs/utils';
import * as React from 'react';

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, role = 'status', ...props }, ref) => (
  <div
    ref={ref}
    role={role}
    className={cn(
      'rounded-[var(--radius-md)] border border-border bg-muted p-4 text-foreground',
      className,
    )}
    {...props}
  />
));
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-semibold', className)} {...props}>
    {children}
  </h3>
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('mt-1 text-sm text-muted-foreground', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
