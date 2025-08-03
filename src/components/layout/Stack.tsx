/**
 * @fileoverview Stack Component v5.0.0 - CVA Design System
 * @description Modern Stack layout component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-pattern
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Stack variants using semantic Tailwind classes with CVA pattern
 * All spacing uses semantic token classes
 */
const stackVariants = cva('flex', {
  variants: {
    direction: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
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
    gap: {
      0: 'gap-0',
      1: 'gap-1',
      2: 'gap-2',
      3: 'gap-3',
      4: 'gap-4',
      5: 'gap-5',
      6: 'gap-6',
      8: 'gap-8',
      10: 'gap-10',
      12: 'gap-12',
      16: 'gap-16',
      20: 'gap-20',
      24: 'gap-24',
      32: 'gap-32',
      40: 'gap-40',
    },
  },
  defaultVariants: {
    direction: 'vertical',
    align: 'stretch',
    justify: 'start',
    wrap: false,
    gap: 4,
  },
});

/**
 * Base variant props from class-variance-authority
 */
type BaseStackVariants = VariantProps<typeof stackVariants>;

/**
 * Stack component props interface with CVA variants
 */
export interface StackProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  /** HTML element type */
  readonly as?: keyof JSX.IntrinsicElements;
}

// =============================================================================
// STACK COMPONENT
// =============================================================================

/**
 * Stack component with pure CVA pattern styling
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, as: Component = 'div', ...props }, ref) => {
    const ElementType = Component as React.ElementType;

    return (
      <ElementType
        ref={ref}
        className={cn(
          stackVariants({
            direction,
            gap,
            align,
            justify,
            wrap,
          }),
          className
        )}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';

/**
 * Horizontal Stack component (convenience wrapper)
 * @param props - Stack props
 * @returns Horizontal Stack JSX element
 */
export const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Stack ref={ref} direction="horizontal" {...props} />
));

HStack.displayName = 'HStack';

/**
 * Vertical Stack component (convenience wrapper)
 * @param props - Stack props
 * @returns Vertical Stack JSX element
 */
export const VStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Stack ref={ref} direction="vertical" {...props} />
));

VStack.displayName = 'VStack';

/**
 * Stack variants type exports
 */
export type StackVariants = VariantProps<typeof stackVariants>;
export { stackVariants };

// Migration note: This component now uses semantic Box component instead of raw HTML elements
