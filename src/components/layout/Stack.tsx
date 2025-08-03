/**
 * @fileoverview Stack Component v5.0.0 - Token-Based Design System
 * @description Modern Stack layout component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Stack variants using design tokens through CSS custom properties
 * Base classes only - spacing handled via tokens
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
  },
  defaultVariants: {
    direction: 'vertical',
    align: 'stretch',
    justify: 'start',
    wrap: false,
  },
});

/**
 * Base variant props from class-variance-authority
 */
type BaseStackVariants = VariantProps<typeof stackVariants>;

/**
 * Stack component props interface with enhanced token support
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  readonly direction?: BaseStackVariants['direction'] | string;
  /** Gap between items - uses design tokens (0-40) or custom CSS value */
  readonly gap?: string | number;
  /** Alignment along cross axis */
  readonly align?: BaseStackVariants['align'];
  /** Alignment along main axis */
  readonly justify?: BaseStackVariants['justify'];
  /** Enable wrapping */
  readonly wrap?: BaseStackVariants['wrap'];
  /** HTML element type */
  readonly as?: keyof JSX.IntrinsicElements;
}

// =============================================================================
// STACK COMPONENT
// =============================================================================

/**
 * Stack component with pure token-based styling
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap = 4, align, justify, wrap, as: Component = 'div', style, ...props }, ref) => {
    // ✅ Access design tokens for spacing control
    const { spacing } = useTokens();
    
    const ElementType = Component as React.ElementType;

    // Normalize direction
    const normalizedDirection =
      direction === 'horizontal' || direction === 'vertical'
        ? (direction as BaseStackVariants['direction'])
        : ('vertical' as const);

    // Get gap value from tokens or use custom value
    const getGapValue = (): string => {
      if (gap === undefined || gap === null) {
        return spacing?.[4] || '16px'; // Default to spacing[4]
      }
      
      // If gap is a number, use it as a spacing token key
      if (typeof gap === 'number') {
        return spacing?.[gap as keyof typeof spacing] || `${gap * 4}px`; // Fallback to 4px per unit
      }
      
      // If gap is a string, check if it's a spacing token key first
      if (typeof gap === 'string') {
        // Try to use as spacing token key
        const tokenValue = spacing?.[gap as keyof typeof spacing];
        if (tokenValue) {
          return tokenValue;
        }
        // Otherwise, use as direct CSS value
        return gap;
      }
      
      return spacing?.[4] || '16px'; // Safe fallback
    };

    const dynamicStyles: React.CSSProperties = {
      gap: getGapValue(),
      ...style,
    };

    return (
      <ElementType
        ref={ref}
        className={cn(
          stackVariants({
            direction: normalizedDirection,
            align,
            justify,
            wrap,
          }),
          className
        )}
        style={dynamicStyles}
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
export type StackDirection = BaseStackVariants['direction'] | string;
export type StackGap = BaseStackVariants['gap'] | string;
export type StackAlign = BaseStackVariants['align'];
export type StackJustify = BaseStackVariants['justify'];
