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
 * Base variant props from class-variance-authority
 */
type BaseStackVariants = VariantProps<typeof stackVariants>;

/**
 * Stack component props interface with flexible string support
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Stack direction - accepts known values or any string */
  readonly direction?: BaseStackVariants['direction'] | string;
  /** Gap between items - accepts known values or any string */
  readonly gap?: BaseStackVariants['gap'] | string;
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
 * Stack component with token-based styling
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, as: Component = 'div', style, ...props }, ref) => {
    // ✅ Access design tokens for dynamic spacing control
    const { spacing } = useTokens();
    
    const ElementType = Component as React.ElementType;

    // Convert string values to known variants or use as fallback
    const normalizedDirection =
      direction === 'horizontal' || direction === 'vertical'
        ? (direction as BaseStackVariants['direction'])
        : ('vertical' as const);

    const gapOptions = ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
    const normalizedGap = gap && gapOptions.includes(gap as typeof gapOptions[number])
      ? (gap as BaseStackVariants['gap'])
      : ('md' as const);

    // Get dynamic gap styles from tokens when needed
    const getDynamicGapStyle = (): React.CSSProperties => {
      // If using a custom gap value (not in predefined options), use tokens
      if (gap && !gapOptions.includes(gap as typeof gapOptions[number])) {
        const gapValue = spacing?.[gap as keyof typeof spacing] || gap;
        return {
          gap: gapValue,
        };
      }
      return {};
    };

    const dynamicStyles: React.CSSProperties = {
      ...getDynamicGapStyle(),
      ...style,
    };

    return (
      <ElementType
        ref={ref}
        className={cn(
          stackVariants({
            direction: normalizedDirection,
            gap: normalizedGap,
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
