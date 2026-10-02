import { cn } from '@nimjs/utils';
import * as React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, ...props }, ref) => {
    const validMax = Number.isFinite(max) && max > 0 ? max : 100;
    const validValue =
      value === undefined || !Number.isFinite(value)
        ? undefined
        : Math.min(validMax, Math.max(0, value));
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={validMax}
        aria-valuenow={validValue}
        className={cn(
          'h-2 w-full overflow-hidden rounded-full bg-muted',
          className,
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="h-full rounded-full bg-primary transition-[width] motion-reduce:transition-none"
          style={{
            width:
              validValue === undefined
                ? '33.333%'
                : `${(validValue / validMax) * 100}%`,
          }}
        />
      </div>
    );
  },
);
Progress.displayName = 'Progress';
