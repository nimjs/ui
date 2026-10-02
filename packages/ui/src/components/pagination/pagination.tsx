import { cn } from '@nimjs/utils';
import * as React from 'react';

export const Pagination = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, 'aria-label': ariaLabel = 'Pagination', ...props }, ref) => (
  <nav
    ref={ref}
    aria-label={ariaLabel}
    className={cn('text-sm', className)}
    {...props}
  />
));
Pagination.displayName = 'Pagination';

export const PaginationList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-wrap items-center gap-1', className)}
    {...props}
  />
));
PaginationList.displayName = 'PaginationList';

export const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={className} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isCurrent?: boolean;
}
export const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ children, className, isCurrent = false, ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isCurrent ? 'page' : undefined}
    className={cn(
      'inline-flex h-9 min-w-9 items-center justify-center rounded-[var(--radius-md)] px-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      isCurrent && 'bg-secondary font-semibold',
      className,
    )}
    {...props}
  >
    {children}
  </a>
));
PaginationLink.displayName = 'PaginationLink';
