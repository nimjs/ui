import { cn } from '@nimjs/utils';
import * as React from 'react';

interface RadioGroupContextValue {
  name: string;
  value: string | undefined;
  disabled: boolean;
  required: boolean;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(
  null,
);

export interface RadioGroupProps extends Omit<
  React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'onChange'
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
  invalid?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = React.forwardRef<
  HTMLFieldSetElement,
  RadioGroupProps
>(
  (
    {
      children,
      className,
      defaultValue,
      disabled = false,
      invalid = false,
      name,
      onValueChange,
      orientation = 'vertical',
      required = false,
      value,
      ...props
    },
    ref,
  ) => {
    const generatedName = React.useId();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value === undefined ? internalValue : value;
    return (
      <RadioGroupContext.Provider
        value={{
          name: name ?? generatedName,
          value: currentValue,
          disabled,
          required,
          onValueChange(nextValue) {
            if (value === undefined) setInternalValue(nextValue);
            onValueChange?.(nextValue);
          },
        }}
      >
        <fieldset
          ref={ref}
          role="radiogroup"
          aria-invalid={invalid || undefined}
          data-orientation={orientation}
          data-invalid={invalid ? '' : undefined}
          className={cn(
            'flex gap-2',
            orientation === 'vertical' ? 'flex-col' : 'flex-row',
            className,
          )}
          {...props}
          disabled={disabled}
        >
          {children}
        </fieldset>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioGroupItemProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'name' | 'checked' | 'defaultChecked'
> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, onChange, value, ...props }, ref) => {
  const group = React.useContext(RadioGroupContext);
  if (!group)
    throw new Error('RadioGroupItem must be rendered inside RadioGroup');
  return (
    <input
      ref={ref}
      type="radio"
      {...props}
      name={group.name}
      value={value}
      checked={group.value === value}
      disabled={group.disabled || props.disabled}
      required={group.required || props.required}
      className={cn(
        'h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      onChange={(event) => {
        onChange?.(event);
        if (!event.defaultPrevented) group.onValueChange(value);
      }}
    />
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';
