import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Alert, AlertDescription, AlertTitle } from './alert/alert';
import { Badge } from './badge/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb/breadcrumb';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationList,
} from './pagination/pagination';
import { Separator } from './separator/separator';
import { Skeleton } from './skeleton/skeleton';
import { Spinner } from './spinner/spinner';
import { Textarea } from './textarea/textarea';

describe('presentational semantics', () => {
  it('forwards a badge ref without making the label interactive', () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>Preview</Badge>);
    expect(ref.current).toHaveTextContent('Preview');
    expect(
      screen.queryByRole('button', { name: 'Preview' }),
    ).not.toBeInTheDocument();
  });

  it('names navigation and marks the current location', () => {
    render(
      <>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationList>
            <PaginationItem>
              <PaginationLink href="?page=2" isCurrent>
                2
              </PaginationLink>
            </PaginationItem>
          </PaginationList>
        </Pagination>
      </>,
    );
    expect(
      screen.getByRole('navigation', { name: 'Breadcrumb' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Settings')).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      screen.getByRole('navigation', { name: 'Pagination' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('announces status while hiding purely visual placeholders', () => {
    render(
      <>
        <Alert>
          <AlertTitle>Saved</AlertTitle>
          <AlertDescription>Ready</AlertDescription>
        </Alert>
        <Spinner label="Loading results" />
        <Skeleton data-testid="skeleton" />
        <Separator data-testid="decorative" />
        <Separator decorative={false} orientation="vertical" />
      </>,
    );
    expect(
      screen.getByRole('status', { name: 'Loading results' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status', { name: '' })).toHaveTextContent('Saved');
    expect(screen.getByTestId('skeleton')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(screen.getByTestId('decorative')).toHaveAttribute('role', 'none');
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical',
    );
  });

  it('retains native textarea state and invalid semantics', () => {
    render(
      <>
        <label htmlFor="message">Message</label>
        <Textarea id="message" required invalid disabled />
      </>,
    );
    const control = screen.getByRole('textbox', { name: 'Message' });
    expect(control).toBeDisabled();
    expect(control).toBeRequired();
    expect(control).toHaveAttribute('aria-invalid', 'true');
  });
});
