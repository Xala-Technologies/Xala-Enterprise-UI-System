/**
 * @fileoverview Sheet Component - CVA Pattern Implementation
 * @description Pure CSS sheet/drawer with CVA variants, no hooks, external state management
 * @version 5.0.0
 * @compliance CVA Pattern, No hooks, CSS-only styling, WCAG AAA
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Box, Heading, Text, Button } from '../semantic';

/**
 * Sheet overlay variants using CVA
 */
const sheetOverlayVariants = cva(
  // Base styles - CSS-only backdrop with semantic tokens
  'fixed inset-0 z-50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  {
    variants: {
      variant: {
        default: 'bg-black/80',
        dark: 'bg-black/90',
        light: 'bg-black/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * Sheet content variants using CVA
 */
const sheetContentVariants = cva(
  // Base styles using semantic Tailwind classes
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
      size: {
        sm: '',
        default: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      {
        side: ['top', 'bottom'],
        size: 'sm',
        class: 'max-h-48',
      },
      {
        side: ['top', 'bottom'],
        size: 'default',
        class: 'max-h-64',
      },
      {
        side: ['top', 'bottom'],
        size: 'lg',
        class: 'max-h-80',
      },
      {
        side: ['top', 'bottom'],
        size: 'xl',
        class: 'max-h-96',
      },
      {
        side: ['top', 'bottom'],
        size: 'full',
        class: 'max-h-screen',
      },
      {
        side: ['left', 'right'],
        size: 'sm',
        class: 'max-w-xs',
      },
      {
        side: ['left', 'right'],
        size: 'default',
        class: 'max-w-sm',
      },
      {
        side: ['left', 'right'],
        size: 'lg',
        class: 'max-w-md',
      },
      {
        side: ['left', 'right'],
        size: 'xl',
        class: 'max-w-lg',
      },
      {
        side: ['left', 'right'],
        size: 'full',
        class: 'max-w-full',
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'default',
    },
  }
);

/**
 * Sheet header variants
 */
const sheetHeaderVariants = cva(
  'flex flex-col space-y-2 text-center sm:text-left',
  {
    variants: {
      size: {
        sm: 'mb-3',
        default: 'mb-4',
        lg: 'mb-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Sheet title variants
 */
const sheetTitleVariants = cva(
  'text-lg font-semibold text-foreground',
  {
    variants: {
      size: {
        sm: 'text-base',
        default: 'text-lg',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Sheet description variants
 */
const sheetDescriptionVariants = cva(
  'text-sm text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Sheet component props interface
 */
export interface SheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Sheet overlay props interface
 */
export interface SheetOverlayProps 
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof sheetOverlayVariants> {
  readonly open?: boolean;
}

/**
 * Sheet content props interface
 */
export interface SheetContentProps 
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof sheetContentVariants> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Sheet header props interface
 */
export interface SheetHeaderProps 
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof sheetHeaderVariants> {
  readonly children: ReactNode;
}

/**
 * Sheet title props interface
 */
export interface SheetTitleProps 
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof sheetTitleVariants> {
  readonly children: ReactNode;
}

/**
 * Sheet description props interface
 */
export interface SheetDescriptionProps 
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof sheetDescriptionVariants> {
  readonly children: ReactNode;
}

/**
 * Sheet footer props interface
 */
export interface SheetFooterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  readonly children: ReactNode;
}

/**
 * Sheet close button props interface
 */
export interface SheetCloseProps extends HTMLAttributes<HTMLButtonElement> {
  readonly children?: ReactNode;
}

/**
 * Sheet root component - Pure container, no state management
 */
export const Sheet = forwardRef<HTMLDivElement, SheetProps>(
  ({ children, ...props }, ref): React.ReactElement => {
    return (
      <Box ref={ref} {...props}>
        {children}
      </Box>
    );
  }
);

Sheet.displayName = 'Sheet';

/**
 * Sheet overlay component with CVA variants
 */
export const SheetOverlay = forwardRef<HTMLDivElement, SheetOverlayProps>(
  ({ className, variant, open = false, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(sheetOverlayVariants({ variant }), className)}
        data-state={open ? 'open' : 'closed'}
        {...props}
      />
    );
  }
);

SheetOverlay.displayName = 'SheetOverlay';

/**
 * Sheet content component with CVA variants
 */
export const SheetContent = forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side, size, open = false, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(sheetContentVariants({ side, size }), className)}
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

SheetContent.displayName = 'SheetContent';

/**
 * Sheet header component with CVA variants
 */
export const SheetHeader = forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, size, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(sheetHeaderVariants({ size }), className)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

SheetHeader.displayName = 'SheetHeader';

/**
 * Sheet title component with CVA variants
 */
export const SheetTitle = forwardRef<HTMLHeadingElement, SheetTitleProps>(
  ({ className, size, children, id, style, ...props }, ref): React.ReactElement => {
    return (
      <Heading
        level={2}
        ref={ref}
        className={cn(sheetTitleVariants({ size }), className)}
        id={id}
        style={style}
      >
        {children}
      </Heading>
    );
  }
);

SheetTitle.displayName = 'SheetTitle';

/**
 * Sheet description component with CVA variants
 */
export const SheetDescription = forwardRef<HTMLParagraphElement, SheetDescriptionProps>(
  ({ className, size, children, id, style, ...props }, ref): React.ReactElement => {
    return (
      <Text
        as="p"
        ref={ref}
        className={cn(sheetDescriptionVariants({ size }), className)}
        id={id}
        style={style}
      >
        {children}
      </Text>
    );
  }
);

SheetDescription.displayName = 'SheetDescription';

/**
 * Sheet footer component
 */
export const SheetFooter = forwardRef<HTMLDivElement, SheetFooterProps>(
  ({ className, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(
          'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

SheetFooter.displayName = 'SheetFooter';

/**
 * Sheet close button component
 */
export const SheetClose = forwardRef<HTMLButtonElement, SheetCloseProps>(
  ({ className, children, onClick, disabled, type, id, style, ...props }, ref): React.ReactElement => {
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
        <Text as="span" className="sr-only">Close</Text>
      </Button>
    );
  }
);

SheetClose.displayName = 'SheetClose';