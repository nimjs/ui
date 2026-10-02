import { cn } from '@nimjs/utils';
import * as React from 'react';

interface AccordionContextValue {
  values: string[];
  toggle: (value: string, open: boolean) => void;
}
interface AccordionItemContextValue {
  disabled: boolean;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);
const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordion() {
  const context = React.useContext(AccordionContext);
  if (!context)
    throw new Error('Accordion parts must be rendered inside Accordion');
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      children,
      className,
      defaultValue,
      onValueChange,
      type = 'single',
      value,
      ...props
    },
    ref,
  ) => {
    const normalize = (input: string | string[] | undefined) =>
      input === undefined ? [] : Array.isArray(input) ? input : [input];
    const [internalValues, setInternalValues] = React.useState(() =>
      normalize(defaultValue),
    );
    const values = value === undefined ? internalValues : normalize(value);
    return (
      <AccordionContext.Provider
        value={{
          values,
          toggle(itemValue, open) {
            const next =
              type === 'single'
                ? open
                  ? [itemValue]
                  : []
                : open
                  ? [...values.filter((item) => item !== itemValue), itemValue]
                  : values.filter((item) => item !== itemValue);
            if (value === undefined) setInternalValues(next);
            onValueChange?.(type === 'single' ? next[0] : next);
          },
        }}
      >
        <div
          ref={ref}
          className={cn('divide-y divide-border', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends Omit<
  React.DetailsHTMLAttributes<HTMLDetailsElement>,
  'open' | 'value'
> {
  value: string;
  disabled?: boolean;
}

export const AccordionItem = React.forwardRef<
  HTMLDetailsElement,
  AccordionItemProps
>(
  (
    { children, className, disabled = false, value, ...props },
    forwardedRef,
  ) => {
    const accordion = useAccordion();
    const open = accordion.values.includes(value);
    const latestOpen = React.useRef(open);
    latestOpen.current = open;
    const internalRef = React.useRef<HTMLDetailsElement>(null);
    React.useImperativeHandle(forwardedRef, () => internalRef.current!, []);
    React.useEffect(() => {
      if (internalRef.current && internalRef.current.open !== open)
        internalRef.current.open = open;
    }, [open]);
    return (
      <AccordionItemContext.Provider value={{ disabled }}>
        <details
          ref={internalRef}
          open={open}
          data-state={open ? 'open' : 'closed'}
          data-disabled={disabled ? '' : undefined}
          className={cn('py-3', className)}
          {...props}
          onToggle={(event) => {
            const nextOpen = event.currentTarget.open;
            if (nextOpen === latestOpen.current) return;
            if (disabled) {
              event.currentTarget.open = latestOpen.current;
              return;
            }
            accordion.toggle(value, nextOpen);
            queueMicrotask(() => {
              if (internalRef.current)
                internalRef.current.open = latestOpen.current;
            });
          }}
        >
          {children}
        </details>
      </AccordionItemContext.Provider>
    );
  },
);
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className, onClick, onKeyDown, ...props }, ref) => {
  const item = React.useContext(AccordionItemContext);
  if (!item)
    throw new Error('AccordionTrigger must be rendered inside AccordionItem');
  return (
    <summary
      ref={ref}
      aria-disabled={item.disabled || undefined}
      tabIndex={item.disabled ? -1 : undefined}
      className={cn(
        'cursor-pointer rounded-[var(--radius-md)] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        item.disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (item.disabled) event.preventDefault();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (item.disabled && (event.key === 'Enter' || event.key === ' '))
          event.preventDefault();
      }}
    >
      {children}
    </summary>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-2 text-sm text-muted-foreground', className)}
    {...props}
  />
));
AccordionContent.displayName = 'AccordionContent';
