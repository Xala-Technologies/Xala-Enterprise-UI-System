/**
 * @fileoverview Box Component - Norwegian Compliance
 * @description Flexible layout container component for chat interfaces
 * @version 1.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Enterprise Standards
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

/**
 * Box component variants using semantic design tokens
 */
const boxVariants = cva('relative', {
  variants: {
    variant: {
      default: '',
      outline: 'border border-border',
      filled: 'bg-muted',
      ghost: 'bg-transparent',
      elevated: 'bg-background shadow-sm border border-border',
    },
    size: {
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
      none: '',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    display: {
      block: 'block',
      flex: 'flex',
      inline: 'inline',
      'inline-block': 'inline-block',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      hidden: 'hidden',
    },
    flex: {
      initial: 'flex-initial',
      '1': 'flex-1',
      auto: 'flex-auto',
      none: 'flex-none',
    },
    direction: {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      col: 'flex-col',
      'col-reverse': 'flex-col-reverse',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    align: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
    gap: {
      none: 'gap-0',
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    },
    wrap: {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    },
    overflow: {
      visible: 'overflow-visible',
      hidden: 'overflow-hidden',
      scroll: 'overflow-scroll',
      auto: 'overflow-auto',
      'x-hidden': 'overflow-x-hidden',
      'y-hidden': 'overflow-y-hidden',
      'x-scroll': 'overflow-x-scroll',
      'y-scroll': 'overflow-y-scroll',
      'x-auto': 'overflow-x-auto',
      'y-auto': 'overflow-y-auto',
    },
    position: {
      static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'none',
    radius: 'md',
    display: 'block',
    flex: 'initial',
    direction: 'row',
    justify: 'start',
    align: 'start',
    gap: 'none',
    wrap: 'nowrap',
    overflow: 'visible',
    position: 'relative',
  },
});

/**
 * Box Props interface
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
  /** Child content */
  readonly children?: React.ReactNode;
  /** Custom element type - limited to common HTML elements */
  readonly as?:
    | 'div'
    | 'section'
    | 'article'
    | 'main'
    | 'aside'
    | 'header'
    | 'footer'
    | 'nav'
    | 'span';
  /** Custom width */
  readonly w?: string;
  /** Custom height */
  readonly h?: string;
  /** Custom max width */
  readonly maxW?: string;
  /** Custom max height */
  readonly maxH?: string;
  /** Custom min width */
  readonly minW?: string;
  /** Custom min height */
  readonly minH?: string;
}

/**
 * Box component for flexible layout containers
 *
 * @example
 * ```tsx
 * // Basic container
 * <Box size="md" variant="outline">
 *   <p>Content here</p>
 * </Box>
 *
 * // Flex container
 * <Box display="flex" direction="col" gap="md" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Box>
 *
 * // Chat message container
 * <Box
 *   variant="elevated"
 *   size="sm"
 *   display="flex"
 *   direction="col"
 *   gap="xs"
 *   maxW="lg"
 * >
 *   <span>User message content</span>
 * </Box>
 *
 * // Custom element
 * <Box as="article" variant="filled" size="lg">
 *   <h2>Article Title</h2>
 *   <p>Article content...</p>
 * </Box>
 * ```
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      variant,
      size,
      radius,
      display,
      flex,
      direction,
      justify,
      align,
      gap,
      wrap,
      overflow,
      position,
      children,
      as: Component = 'div',
      w,
      h,
      maxW,
      maxH,
      minW,
      minH,
      style,
      ...props
    },
    ref
  ) => {
    const customStyles = {
      ...(w && { width: w }),
      ...(h && { height: h }),
      ...(maxW && { maxWidth: maxW }),
      ...(maxH && { maxHeight: maxH }),
      ...(minW && { minWidth: minW }),
      ...(minH && { minHeight: minH }),
      ...style,
    };

    return (
      <Component
        ref={ref}
        className={cn(
          boxVariants({
            variant,
            size,
            radius,
            display,
            flex,
            direction,
            justify,
            align,
            gap,
            wrap,
            overflow,
            position,
          }),
          className
        )}
        style={customStyles}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

/**
 * Box component variants export
 */
export { boxVariants };
