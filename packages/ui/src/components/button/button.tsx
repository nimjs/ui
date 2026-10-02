import { cn } from '@nimjs/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:opacity-90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
        outline:
          'border border-border bg-background text-foreground hover:bg-muted',
        ghost: 'bg-transparent text-foreground hover:bg-muted',
        destructive:
          'bg-destructive text-destructive-foreground hover:opacity-90',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      loading = false,
      size,
      variant,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn('relative', buttonVariants({ size, variant }), className)}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        data-loading={loading ? '' : undefined}
        {...props}
      >
        <span className={loading ? 'opacity-0' : undefined}>{children}</span>
        {loading && (
          <span
            aria-hidden="true"
            className="absolute inline-flex h-4 w-4 rounded-full border-2 border-current border-e-transparent motion-safe:animate-spin"
          />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { buttonVariants };
