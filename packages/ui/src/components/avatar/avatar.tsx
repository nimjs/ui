import { cn } from '@nimjs/utils';
import * as React from 'react';

export const Avatar = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ 'aria-label': ariaLabel, className, role, ...props }, ref) => (
  <span
    ref={ref}
    role={role ?? (ariaLabel ? 'img' : undefined)}
    aria-label={ariaLabel}
    className={cn(
      'relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted align-middle',
      className,
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

export interface AvatarImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'alt'
> {
  alt: string;
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ alt, className, onError, src, ...props }, ref) => {
    const [failed, setFailed] = React.useState(false);
    React.useEffect(() => setFailed(false), [src]);
    if (failed) return null;
    return (
      <img
        ref={ref}
        src={src}
        className={cn('absolute inset-0 h-full w-full object-cover', className)}
        onError={(event) => {
          onError?.(event);
          setFailed(true);
        }}
        {...props}
        alt={alt}
      />
    );
  },
);
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-sm font-medium text-foreground', className)}
    {...props}
    aria-hidden="true"
  />
));
AvatarFallback.displayName = 'AvatarFallback';
