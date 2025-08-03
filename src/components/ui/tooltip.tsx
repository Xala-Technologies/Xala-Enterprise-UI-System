/**
 * @fileoverview Tooltip Component - CVA Pattern Implementation
 * @description Pure CSS tooltip with CVA variants, no hooks, CSS hover behavior
 * @version 5.0.0
 * @compliance CVA Pattern, No hooks, CSS-only styling, WCAG AAA
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Box } from '../semantic';

/**
 * Tooltip content variants using CVA
 */
const tooltipContentVariants = cva(
  // Base styles using semantic Tailwind classes with CSS hover behavior
  'absolute z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-all duration-200 ease-in-out pointer-events-none',
  {
    variants: {
      side: {
        top: 'bottom-full mb-2 animate-slide-up-and-fade',
        bottom: 'top-full mt-2 animate-slide-down-and-fade',
        left: 'right-full mr-2 animate-slide-left-and-fade',
        right: 'left-full ml-2 animate-slide-right-and-fade',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
      size: {
        sm: 'px-2 py-1 text-xs max-w-xs',
        default: 'px-3 py-1.5 text-xs max-w-sm',
        lg: 'px-4 py-2 text-sm max-w-md',
      },
      delay: {
        instant: 'transition-delay-0',
        fast: 'transition-delay-300',
        normal: 'transition-delay-500',
        slow: 'transition-delay-700',
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
      side: 'top',
      align: 'center',
      size: 'default',
      delay: 'normal',
    },
  }
);

/**
 * Tooltip arrow variants using CVA
 */
const tooltipArrowVariants = cva(
  'absolute h-1.5 w-1.5 bg-primary rotate-45 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus:opacity-100 group-focus:visible transition-all duration-200 ease-in-out',
  {
    variants: {
      side: {
        top: 'top-full -mt-0.5',
        bottom: 'bottom-full -mb-0.5',
        left: 'left-full -ml-0.5',
        right: 'right-full -mr-0.5',
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
        class: 'left-3',
      },
      {
        side: ['top', 'bottom'],
        align: 'center',
        class: 'left-1/2 -translate-x-1/2',
      },
      {
        side: ['top', 'bottom'],
        align: 'end',
        class: 'right-3',
      },
      // Left/Right arrow positioning
      {
        side: ['left', 'right'],
        align: 'start',
        class: 'top-3',
      },
      {
        side: ['left', 'right'],
        align: 'center',
        class: 'top-1/2 -translate-y-1/2',
      },
      {
        side: ['left', 'right'],
        align: 'end',
        class: 'bottom-3',
      },
    ],
    defaultVariants: {
      side: 'top',
      align: 'center',
    },
  }
);

/**
 * Tooltip trigger variants
 */
const tooltipTriggerVariants = cva(
  'relative inline-block group'
);

/**
 * Tooltip component props interface
 */
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

/**
 * Tooltip trigger props interface
 */
export interface TooltipTriggerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly asChild?: boolean;
}

/**
 * Tooltip content props interface
 */
export interface TooltipContentProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipContentVariants> {
  readonly children: ReactNode;
  readonly showArrow?: boolean;
}

/**
 * Tooltip arrow props interface
 */
export interface TooltipArrowProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipArrowVariants> {}

/**
 * Tooltip root component - Pure container, no state management
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, ...props }, ref): React.ReactElement => {
    return (
      <Box ref={ref} {...props}>
        {children}
      </Box>
    );
  }
);

Tooltip.displayName = 'Tooltip';

/**
 * Tooltip trigger component with CVA variants
 */
export const TooltipTrigger = forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref): React.ReactElement => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(tooltipTriggerVariants(), className, children.props.className),
        ...props,
      });
    }

    return (
      <Box
        ref={ref}
        className={cn(tooltipTriggerVariants(), className)}
        tabIndex={0}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

/**
 * Tooltip content component with CVA variants
 */
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side, align, size, delay, showArrow = true, children, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(tooltipContentVariants({ side, align, size, delay }), className)}
        role="tooltip"
        aria-live="polite"
        {...props}
      >
        {showArrow && (
          <TooltipArrow side={side} align={align} />
        )}
        {children}
      </Box>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

/**
 * Tooltip arrow component with CVA variants
 */
export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, side, align, ...props }, ref): React.ReactElement => {
    return (
      <Box
        ref={ref}
        className={cn(tooltipArrowVariants({ side, align }), className)}
        {...props}
      />
    );
  }
);

TooltipArrow.displayName = 'TooltipArrow';