import { cn } from '@nimjs/utils';
import * as React from 'react';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  dir: 'ltr' | 'rtl';
  id: string;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tabs parts must be rendered inside Tabs');
  return context;
}

export interface TabsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'defaultValue' | 'onChange'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  dir?: 'ltr' | 'rtl';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue = '',
      dir = 'ltr',
      onValueChange,
      orientation = 'horizontal',
      value,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const id = React.useId();
    const currentValue = value === undefined ? internalValue : value;
    return (
      <TabsContext.Provider
        value={{
          value: currentValue,
          orientation,
          dir,
          id,
          setValue(nextValue) {
            if (value === undefined) setInternalValue(nextValue);
            onValueChange?.(nextValue);
          },
        }}
      >
        <div ref={ref} dir={dir} data-orientation={orientation} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

export const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const tabs = useTabs();
  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex flex-wrap gap-1 rounded-[var(--radius-md)] bg-muted p-1',
        className,
      )}
      {...props}
      role="tablist"
      aria-orientation={tabs.orientation}
    />
  );
});
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> {
  value: string;
}

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ className, disabled, onClick, onKeyDown, value, ...props }, ref) => {
  const tabs = useTabs();
  const active = tabs.value === value;
  return (
    <button
      ref={ref}
      {...props}
      type="button"
      role="tab"
      id={`${tabs.id}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${tabs.id}-panel-${value}`}
      tabIndex={active ? 0 : -1}
      disabled={disabled}
      data-state={active ? 'active' : 'inactive'}
      data-value={value}
      className={cn(
        'rounded-[var(--radius-sm)] px-3 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        active && 'bg-background shadow-sm',
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) tabs.setValue(value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        const keys =
          tabs.orientation === 'horizontal'
            ? tabs.dir === 'rtl'
              ? ['ArrowLeft', 'ArrowRight']
              : ['ArrowRight', 'ArrowLeft']
            : ['ArrowDown', 'ArrowUp'];
        const list = event.currentTarget.closest('[role="tablist"]');
        const triggers = Array.from(
          list?.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not(:disabled)',
          ) ?? [],
        );
        const current = triggers.indexOf(event.currentTarget);
        if (current < 0) return;
        let next = -1;
        if (event.key === keys[0]) next = (current + 1) % triggers.length;
        else if (event.key === keys[1])
          next = (current - 1 + triggers.length) % triggers.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = triggers.length - 1;
        if (next >= 0) {
          event.preventDefault();
          triggers[next]?.focus();
          triggers[next]?.click();
        }
      }}
    />
  );
});
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const tabs = useTabs();
    return (
      <div
        ref={ref}
        className={cn(
          'mt-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        {...props}
        role="tabpanel"
        id={`${tabs.id}-panel-${value}`}
        aria-labelledby={`${tabs.id}-tab-${value}`}
        hidden={tabs.value !== value}
        tabIndex={0}
      />
    );
  },
);
TabsContent.displayName = 'TabsContent';
