/**
 * Stack layout component with responsive design and enterprise compliance
 * Uses design tokens and CSS variables for spacing and alignment
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Stack variants using class-variance-authority
 */
const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
      '2xl': 'gap-12',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    gap: 'md',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

/**
 * Stack component props interface
 */
export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  readonly as?: keyof JSX.IntrinsicElements;
}

/**
 * Stack component
 * @param direction - Stack direction
 * @param gap - Gap between items
 * @param align - Alignment along cross axis
 * @param justify - Alignment along main axis
 * @param wrap - Enable wrapping
 * @param className - Additional CSS classes
 * @param as - HTML element type
 * @param props - Additional props
 * @returns Stack JSX element
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, as: Component = 'div', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(stackVariants({ direction, gap, align, justify, wrap }), className)}
      {...props}
    />
  )
);

Stack.displayName = 'Stack';

/**
 * Horizontal Stack component (convenience wrapper)
 * @param props - Stack props
 * @returns Horizontal Stack JSX element
 */
export const HStack = forwardRef<HTMLDivElement, StackProps>(({ direction, ...props }, ref) => (
  <Stack ref={ref} direction="horizontal" {...props} />
));

HStack.displayName = 'HStack';

/**
 * Vertical Stack component (convenience wrapper)
 * @param props - Stack props
 * @returns Vertical Stack JSX element
 */
export const VStack = forwardRef<HTMLDivElement, StackProps>(({ direction, ...props }, ref) => (
  <Stack ref={ref} direction="vertical" {...props} />
));

VStack.displayName = 'VStack';

/**
 * Stack variants type exports
 */
export type StackDirection = VariantProps<typeof stackVariants>['direction'];
export type StackGap = VariantProps<typeof stackVariants>['gap'];
export type StackAlign = VariantProps<typeof stackVariants>['align'];
export type StackJustify = VariantProps<typeof stackVariants>['justify'];
