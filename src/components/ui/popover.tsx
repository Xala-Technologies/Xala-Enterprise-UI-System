/**
 * @fileoverview Popover Component - CVA Pattern Implementation
 * @description Pure CSS popover with CVA variants, no hooks, CSS positioning
 * @version 5.0.0
 * @compliance CVA Pattern, No hooks, CSS-only styling, WCAG AAA
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Box, Text, Button } from '../semantic';

/**
 * Popover content variants using CVA
 */
const popoverContentVariants = cva(
  // Base styles using semantic Tailwind classes
  'absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  {
    variants: {
      side: {
        top: 'bottom-full mb-2 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        bottom: 'top-full mt-2 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        left: 'right-full mr-2 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        right: 'left-full ml-2 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
      size: {
        sm: 'w-56',
        default: 'w-72',
        lg: 'w-80',
        xl: 'w-96',
      },
    },
    compoundVariants: [
      // Top/Bottom positioning with alignment
      {
        side: ['top', 'bottom'],
        align: 'start',
        class: 'left-0',
      },
      {
        side: ['top', 'bottom'],
        align: 'center',
        class: 'left-1/2 -translate-x-1/2',
      },
      {
        side: ['top', 'bottom'],
        align: 'end',
        class: 'right-0',
      },
      // Left/Right positioning with alignment
      {
        side: ['left', 'right'],
        align: 'start',
        class: 'top-0',
      },
      {
        side: ['left', 'right'],
        align: 'center',
        class: 'top-1/2 -translate-y-1/2',
      },
      {
        side: ['left', 'right'],
        align: 'end',
        class: 'bottom-0',
      },
    ],
    defaultVariants: {
      side: 'bottom',
      align: 'center',
      size: 'default',
    },
  }
);

/**
 * Popover arrow variants using CVA
 */
const popoverArrowVariants = cva(
  'absolute h-2 w-2 bg-popover border border-popover-border rotate-45',
  {
    variants: {
      side: {
        top: 'top-full -mt-1 border-t-0 border-l-0',
        bottom: 'bottom-full -mb-1 border-b-0 border-r-0',
        left: 'left-full -ml-1 border-l-0 border-b-0',
        right: 'right-full -mr-1 border-r-0 border-t-0',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
    },
    compoundVariants: [
      // Top/Bottom arrow positioning
      {
        side: ['top', 'bottom'],
        align: 'start',
        class: 'left-4',
      },
      {
        side: ['top', 'bottom'],
        align: 'center',
        class: 'left-1/2 -translate-x-1/2',
      },
      {
        side: ['top', 'bottom'],
        align: 'end',
        class: 'right-4',
      },
      // Left/Right arrow positioning
      {
        side: ['left', 'right'],
        align: 'start',
        class: 'top-4',
      },
      {
        side: ['left', 'right'],
        align: 'center',
        class: 'top-1/2 -translate-y-1/2',
      },
      {
        side: ['left', 'right'],
        align: 'end',
        class: 'bottom-4',
      },
    ],
    defaultVariants: {
      side: 'bottom',
      align: 'center',
    },
  }
);

/**
 * Popover trigger variants
 */
const popoverTriggerVariants = cva(
  'relative inline-block'
);

/**
 * Popover component props interface
 */
export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  readonly open?: boolean;
  readonly children: ReactNode;
}

/**
 * Popover trigger props interface
 */
export interface PopoverTriggerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  readonly children: ReactNode;
  readonly asChild?: boolean;
}

/**
 * Popover content props interface
 */
export interface PopoverContentProps 
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof popoverContentVariants> {
  readonly open?: boolean;
  readonly children: ReactNode;
  readonly showArrow?: boolean;
}

/**
 * Popover arrow props interface
 */
export interface PopoverArrowProps 
  extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>,
    VariantProps<typeof popoverArrowVariants> {}

/**
 * Popover close button props interface
 */
export interface PopoverCloseProps extends HTMLAttributes<HTMLButtonElement> {
  readonly children?: ReactNode;
}

/**
 * Popover root component - Pure container, no state management
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, ...props }, ref): React.ReactElement => {
    return (
      <Box ref={ref} {...props}>
        {children}
      </Box>
    );
  }
);

Popover.displayName = 'Popover';

/**
 * Popover trigger component with CVA variants
 */
export const PopoverTrigger = forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref): React.ReactElement => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(popoverTriggerVariants(), className, children.props.className),
        ...props,
      });
    }

    return (
      <Box
        ref={ref}
        className={cn(popoverTriggerVariants(), className)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

/**
 * Popover content component with CVA variants
 */
export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, side, align, size, open = false, showArrow = true, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(popoverContentVariants({ side, align, size }), className)}
        data-state={open ? 'open' : 'closed'}
        {...props}
        role="dialog"
        aria-modal="false"
      >
        {showArrow && (
          <PopoverArrow side={side} align={align} />
        )}
        {children}
      </Box>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';

/**
 * Popover arrow component with CVA variants
 */
export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(
  ({ className, side, align, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(popoverArrowVariants({ side, align }), className)}
        {...props}
      />
    );
  }
);

PopoverArrow.displayName = 'PopoverArrow';

/**
 * Popover close button component
 */
export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ className, children, onClick, disabled, type, id, style, ...props }, ref): React.ReactElement => {
    return (
      <Button
        ref={ref}
        className={cn(
          'absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
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

PopoverClose.displayName = 'PopoverClose';