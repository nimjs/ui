import { cn } from '@nimjs/utils';
import * as React from 'react';

interface FieldContextValue {
  controlId: string;
  descriptionId: string;
  errorId: string;
  disabled: boolean;
  invalid: boolean;
  required: boolean;
  hasDescription: boolean;
  hasError: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useField() {
  const context = React.useContext(FieldContext);
  if (!context) throw new Error('Field parts must be rendered inside Field');
  return context;
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  description?: boolean;
  error?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      children,
      className,
      description = false,
      disabled = false,
      error = false,
      invalid = false,
      required = false,
      ...props
    },
    ref,
  ) => {
    const id = React.useId();
    return (
      <FieldContext.Provider
        value={{
          controlId: `${id}-control`,
          descriptionId: `${id}-description`,
          errorId: `${id}-error`,
          disabled,
          invalid,
          required,
          hasDescription: description,
          hasError: error,
        }}
      >
        <div
          ref={ref}
          className={cn('space-y-2', className)}
          data-invalid={invalid ? '' : undefined}
          {...props}
        >
          {children}
        </div>
      </FieldContext.Provider>
    );
  },
);
Field.displayName = 'Field';

export const FieldLabel = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const field = useField();
  return (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-foreground',
        field.disabled && 'opacity-50',
        className,
      )}
      {...props}
      htmlFor={field.controlId}
    />
  );
});
FieldLabel.displayName = 'FieldLabel';

export interface FieldControlProps {
  children: React.ReactElement<
    React.HTMLAttributes<HTMLElement> & {
      disabled?: boolean;
      required?: boolean;
    }
  >;
}

export function FieldControl({ children }: FieldControlProps) {
  const field = useField();
  const describedBy =
    [
      children.props['aria-describedby'],
      field.hasDescription && field.descriptionId,
      field.hasError && field.errorId,
    ]
      .filter(Boolean)
      .join(' ') || undefined;
  return React.cloneElement(children, {
    id: field.controlId,
    'aria-describedby': describedBy,
    'aria-invalid':
      field.invalid || children.props['aria-invalid'] || undefined,
    disabled: field.disabled || children.props.disabled,
    required: field.required || children.props.required,
  } as React.HTMLAttributes<HTMLElement>);
}

export const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const field = useField();
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
      id={field.descriptionId}
    />
  );
});
FieldDescription.displayName = 'FieldDescription';

export const FieldError = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const field = useField();
  return (
    <p
      ref={ref}
      className={cn('text-sm text-destructive', className)}
      {...props}
      id={field.errorId}
    />
  );
});
FieldError.displayName = 'FieldError';
