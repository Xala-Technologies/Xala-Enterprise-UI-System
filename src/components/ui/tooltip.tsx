/**
 * Tooltip component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Tooltip variants using class-variance-authority
 */
const tooltipVariants = cva(
  [
    'absolute z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5',
    'text-xs text-popover-foreground shadow-md',
    'animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95',
  ],
  {
    variants: {
      side: {
        top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
        bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
        left: 'right-full top-1/2 mr-2 -translate-y-1/2',
        right: 'left-full top-1/2 ml-2 -translate-y-1/2',
      },
    },
    defaultVariants: {
      side: 'top',
    },
  }
);

/**
 * Tooltip content props interface
 */
export interface TooltipContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tooltipVariants> {
  readonly content: string;
}

/**
 * Tooltip trigger props interface
 */
export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly content: string;
  readonly side?: 'top' | 'bottom' | 'left' | 'right';
  readonly disabled?: boolean;
  readonly delayDuration?: number; // Not implemented
}

/**
 * Enhanced Tooltip component
 * @param children - Element to attach tooltip to
 * @param content - Tooltip text content
 * @param side - Tooltip position (top, bottom, left, right)
 * @param disabled - Whether tooltip is disabled
 * @param delayDuration - Delay before showing tooltip (not implemented)
 * @param className - Additional CSS classes
 * @returns Enhanced Tooltip JSX element
 */
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      side = 'top',
      disabled = false,
      delayDuration: _delayDuration,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    if (disabled || !content) {
      return <div ref={ref}>{children}</div>;
    }

    return (
      <div ref={ref} className={cn('relative inline-block group', className)} {...props}>
        {children}
        <div
          className={cn(
            'invisible opacity-0 group-hover:visible group-hover:opacity-100',
            'transition-all duration-200',
            tooltipVariants({ side })
          )}
          role="tooltip"
          aria-hidden="true"
        >
          {content}
        </div>
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

/**
 * Enhanced TooltipContent component for custom positioning
 * @param content - Tooltip text content
 * @param side - Tooltip position
 * @param className - Additional CSS classes
 * @returns TooltipContent JSX element
 */
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ content, side = 'top', className, ...props }, ref): React.ReactElement => {
    return (
      <div ref={ref} className={cn(tooltipVariants({ side }), className)} role="tooltip" {...props}>
        {content}
      </div>
    );
  }
);

TooltipContent.displayName = 'TooltipContent';

/**
 * Simple TooltipTrigger wrapper component
 * @param children - Trigger element
 * @param className - Additional CSS classes
 * @returns TooltipTrigger JSX element
 */
export const TooltipTrigger = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref): React.ReactElement => {
    return (
      <div ref={ref} className={cn('inline-block', className)} {...props}>
        {children}
      </div>
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

/**
 * Tooltip variants type exports
 */
export type TooltipSide = VariantProps<typeof tooltipVariants>['side'];
