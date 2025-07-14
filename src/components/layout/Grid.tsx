/**
 * Grid layout component with responsive design and enterprise compliance
 * Uses design tokens and CSS variables for spacing and breakpoints
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Grid container variants using class-variance-authority
 */
const gridVariants = cva('grid w-full', {
  variants: {
    cols: {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
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
    responsive: {
      true: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      false: '',
    },
  },
  defaultVariants: {
    cols: 1,
    gap: 'md',
    responsive: false,
  },
});

/**
 * Grid item variants using class-variance-authority
 */
const gridItemVariants = cva('w-full', {
  variants: {
    span: {
      1: 'col-span-1',
      2: 'col-span-2',
      3: 'col-span-3',
      4: 'col-span-4',
      5: 'col-span-5',
      6: 'col-span-6',
      7: 'col-span-7',
      8: 'col-span-8',
      9: 'col-span-9',
      10: 'col-span-10',
      11: 'col-span-11',
      12: 'col-span-12',
      full: 'col-span-full',
    },
    start: {
      1: 'col-start-1',
      2: 'col-start-2',
      3: 'col-start-3',
      4: 'col-start-4',
      5: 'col-start-5',
      6: 'col-start-6',
      7: 'col-start-7',
      8: 'col-start-8',
      9: 'col-start-9',
      10: 'col-start-10',
      11: 'col-start-11',
      12: 'col-start-12',
    },
  },
  defaultVariants: {
    span: 1,
  },
});

/**
 * Grid component props interface
 */
export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

/**
 * Grid component
 * @param cols - Number of columns
 * @param gap - Gap between grid items
 * @param responsive - Enable responsive breakpoints
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Grid JSX element
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, responsive, ...props }, ref) => (
    <div ref={ref} className={cn(gridVariants({ cols, gap, responsive }), className)} {...props} />
  )
);

Grid.displayName = 'Grid';

/**
 * Grid item component props interface
 */
export interface GridItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {}

/**
 * Grid item component
 * @param span - Number of columns to span
 * @param start - Starting column
 * @param className - Additional CSS classes
 * @param props - Additional div props
 * @returns Grid item JSX element
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, start, ...props }, ref) => (
    <div ref={ref} className={cn(gridItemVariants({ span, start }), className)} {...props} />
  )
);

GridItem.displayName = 'GridItem';

/**
 * Grid variants type exports
 */
export type GridCols = VariantProps<typeof gridVariants>['cols'];
export type GridGap = VariantProps<typeof gridVariants>['gap'];
export type GridItemSpan = VariantProps<typeof gridItemVariants>['span'];
export type GridItemStart = VariantProps<typeof gridItemVariants>['start'];
