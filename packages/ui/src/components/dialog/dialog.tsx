import { cn } from '@nimjs/utils';
import * as React from 'react';

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  contentId: string;
  titleId: string;
  descriptionId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);
let openModalCount = 0;
let originalBodyOverflow = '';

function useDialog() {
  const context = React.useContext(DialogContext);
  if (!context) throw new Error('Dialog parts must be rendered inside Dialog');
  return context;
}

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  defaultOpen = false,
  onOpenChange,
  open,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const id = React.useId();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const isOpen = open === undefined ? internalOpen : open;
  return (
    <DialogContext.Provider
      value={{
        open: isOpen,
        setOpen(nextOpen) {
          if (open === undefined) setInternalOpen(nextOpen);
          onOpenChange?.(nextOpen);
        },
        contentId: `${id}-content`,
        titleId: `${id}-title`,
        descriptionId: `${id}-description`,
        triggerRef,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, type = 'button', ...props }, forwardedRef) => {
  const dialog = useDialog();
  return (
    <button
      ref={(node) => {
        dialog.triggerRef.current = node;
        if (typeof forwardedRef === 'function') forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      type={type}
      aria-haspopup="dialog"
      aria-expanded={dialog.open}
      aria-controls={dialog.contentId}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) dialog.setOpen(true);
      }}
    />
  );
});
DialogTrigger.displayName = 'DialogTrigger';

export type DialogContentProps = Omit<
  React.DialogHTMLAttributes<HTMLDialogElement>,
  'open'
>;

export const DialogContent = React.forwardRef<
  HTMLDialogElement,
  DialogContentProps
>(
  (
    { children, className, onCancel, onPointerDown, ...props },
    forwardedRef,
  ) => {
    const dialog = useDialog();
    const internalRef = React.useRef<HTMLDialogElement>(null);
    React.useImperativeHandle(forwardedRef, () => internalRef.current!, []);

    React.useEffect(() => {
      const node = internalRef.current;
      if (!node || !dialog.open) return;
      node.showModal();
      if (openModalCount === 0) {
        originalBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      openModalCount += 1;
      return () => {
        if (node.open) node.close();
        openModalCount -= 1;
        if (openModalCount === 0)
          document.body.style.overflow = originalBodyOverflow;
        dialog.triggerRef.current?.focus();
      };
    }, [dialog.open, dialog.triggerRef]);

    return (
      <dialog
        ref={internalRef}
        id={dialog.contentId}
        aria-labelledby={dialog.titleId}
        aria-describedby={dialog.descriptionId}
        className={cn(
          'w-[min(32rem,calc(100vw-2rem))] max-h-[calc(100vh-2rem)] overflow-auto rounded-[var(--radius-lg)] border border-border bg-card p-6 text-card-foreground shadow-xl backdrop:bg-foreground/50',
          className,
        )}
        {...props}
        onCancel={(event) => {
          onCancel?.(event);
          const wasPrevented = event.defaultPrevented;
          event.preventDefault();
          if (!wasPrevented) dialog.setOpen(false);
        }}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          const bounds = event.currentTarget.getBoundingClientRect();
          const outside =
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom;
          if (
            !event.defaultPrevented &&
            event.target === event.currentTarget &&
            outside
          )
            dialog.setOpen(false);
        }}
      >
        {children}
      </dialog>
    );
  },
);
DialogContent.displayName = 'DialogContent';

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ children, className, ...props }, ref) => {
  const dialog = useDialog();
  return (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold', className)}
      {...props}
      id={dialog.titleId}
    >
      {children}
    </h2>
  );
});
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const dialog = useDialog();
  return (
    <p
      ref={ref}
      className={cn('mt-2 text-sm text-muted-foreground', className)}
      {...props}
      id={dialog.descriptionId}
    />
  );
});
DialogDescription.displayName = 'DialogDescription';

export const DialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, type = 'button', ...props }, ref) => {
  const dialog = useDialog();
  return (
    <button
      ref={ref}
      type={type}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) dialog.setOpen(false);
      }}
    />
  );
});
DialogClose.displayName = 'DialogClose';
