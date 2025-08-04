/**
 * @fileoverview Dialog Component - CVA Pattern Implementation
 * @description Pure CSS dialog with CVA variants, no hooks, external state management
 * @version 5.0.0
 * @compliance CVA Pattern, No hooks, CSS-only styling, WCAG AAA
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Box, Text, Heading, Button } from '../semantic';

/**
 * Dialog overlay variants using CVA
 */
const dialogOverlayVariants = cva(
  // Base styles - CSS-only backdrop with semantic tokens
  'fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      variant: {
        default: 'bg-black/80',
        light: 'bg-black/60',
        dark: 'bg-black/90',
        blur: 'bg-white/20 backdrop-blur-md',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Dialog content variants using CVA
 */
const dialogContentVariants = cva(
  // Base styles using semantic Tailwind classes
  'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

/**
 * Dialog header variants
 */
const dialogHeaderVariants = cva('flex flex-col space-y-1.5 text-center sm:text-left', {
  variants: {
    size: {
      sm: 'mb-3',
      md: 'mb-4',
      lg: 'mb-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Dialog title variants
 */
const dialogTitleVariants = cva('text-lg font-semibold leading-none tracking-tight', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Dialog description variants
 */
const dialogDescriptionVariants = cva('text-sm text-muted-foreground', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

/**
 * Dialog component props interface
 */
export interface DialogProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Dialog overlay props interface
 */
export interface DialogOverlayProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof dialogOverlayVariants> {
  readonly open?: boolean;
}

/**
 * Dialog content props interface
 */
export interface DialogContentProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof dialogContentVariants> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Dialog header props interface
 */
export interface DialogHeaderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof dialogHeaderVariants> {
  readonly children: ReactNode;
}

/**
 * Dialog title props interface
 */
export interface DialogTitleProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof dialogTitleVariants> {
  readonly children: ReactNode;
}

/**
 * Dialog description props interface
 */
export interface DialogDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof dialogDescriptionVariants> {
  readonly children: ReactNode;
}

/**
 * Dialog footer props interface
 */
export interface DialogFooterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  readonly children: ReactNode;
}

/**
 * Dialog close button props interface
 */
export interface DialogCloseProps extends HTMLAttributes<HTMLButtonElement> {
  readonly children?: ReactNode;
}

/**
 * Dialog root component - Pure container, no state management
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, ...props }, ref): React.ReactElement => {
    return (
      <Box ref={ref} {...props}>
        {children}
      </Box>
    );
  }
);

Dialog.displayName = 'Dialog';

/**
 * Dialog overlay component with CVA variants
 */
export const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, variant, open = false, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(dialogOverlayVariants({ variant }), className)}
        data-state={open ? 'open' : 'closed'}
        {...props}
      />
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

/**
 * Dialog content component with CVA variants
 */
export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, size, open = false, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(dialogContentVariants({ size }), className)}
        data-state={open ? 'open' : 'closed'}
        {...props}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </Box>
    );
  }
);

DialogContent.displayName = 'DialogContent';

/**
 * Dialog header component with CVA variants
 */
export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, size, children, ...props }, ref): React.ReactElement => {
    return (
      <Box ref={ref} className={cn(dialogHeaderVariants({ size }), className)} {...props}>
        {children}
      </Box>
    );
  }
);

DialogHeader.displayName = 'DialogHeader';

/**
 * Dialog title component with CVA variants
 */
export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, size, children, id, style, ...props }, ref): React.ReactElement => {
    return (
      <Heading
        level={2}
        ref={ref}
        className={cn(dialogTitleVariants({ size }), className)}
        id={id}
        style={style}
      >
        {children}
      </Heading>
    );
  }
);

DialogTitle.displayName = 'DialogTitle';

/**
 * Dialog description component with CVA variants
 */
export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, size, children, id, style, ...props }, ref): React.ReactElement => {
    return (
      <Text
        as="p"
        ref={ref}
        className={cn(dialogDescriptionVariants({ size }), className)}
        id={id}
        style={style}
      >
        {children}
      </Text>
    );
  }
);

DialogDescription.displayName = 'DialogDescription';

/**
 * Dialog footer component
 */
export const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

DialogFooter.displayName = 'DialogFooter';

/**
 * Dialog close button component
 */
export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  (
    { className, children, onClick, disabled, type, id, style, ...props },
    ref
  ): React.ReactElement => {
    return (
      <Button
        ref={ref}
        className={cn(
          'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground',
          className
        )}
        onClick={onClick}
        disabled={disabled}
        type={type}
        id={id}
        style={style}
      >
        {children || (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        <Text as="span" className="sr-only">
          Close
        </Text>
      </Button>
    );
  }
);

DialogClose.displayName = 'DialogClose';
