/**
 * @fileoverview Grid System v5.0.0 - Token-Based Design System
 * @description Comprehensive Grid system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput } from '../semantic';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// GRID VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Grid container variants following CVA pattern
 */
const gridVariants = cva(
  [
    'grid w-full',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        7: 'grid-cols-7',
        8: 'grid-cols-8',
        9: 'grid-cols-9',
        10: 'grid-cols-10',
        11: 'grid-cols-11',
        12: 'grid-cols-12',
        none: 'grid-cols-none',
      },
      rows: {
        1: 'grid-rows-1',
        2: 'grid-rows-2',
        3: 'grid-rows-3',
        4: 'grid-rows-4',
        5: 'grid-rows-5',
        6: 'grid-rows-6',
        none: 'grid-rows-none',
      },
      gap: {
        none: 'gap-0',
        px: 'gap-px',
        0.5: 'gap-0.5',
        1: 'gap-1',
        1.5: 'gap-1.5',
        2: 'gap-2',
        2.5: 'gap-2.5',
        3: 'gap-3',
        3.5: 'gap-3.5',
        4: 'gap-4',
        5: 'gap-5',
        6: 'gap-6',
        7: 'gap-7',
        8: 'gap-8',
        9: 'gap-9',
        10: 'gap-10',
        11: 'gap-11',
        12: 'gap-12',
        14: 'gap-14',
        16: 'gap-16',
        20: 'gap-20',
        24: 'gap-24',
        28: 'gap-28',
        32: 'gap-32',
      },
      gapX: {
        none: 'gap-x-0',
        px: 'gap-x-px',
        0.5: 'gap-x-0.5',
        1: 'gap-x-1',
        1.5: 'gap-x-1.5',
        2: 'gap-x-2',
        2.5: 'gap-x-2.5',
        3: 'gap-x-3',
        3.5: 'gap-x-3.5',
        4: 'gap-x-4',
        5: 'gap-x-5',
        6: 'gap-x-6',
        7: 'gap-x-7',
        8: 'gap-x-8',
        9: 'gap-x-9',
        10: 'gap-x-10',
        11: 'gap-x-11',
        12: 'gap-x-12',
        14: 'gap-x-14',
        16: 'gap-x-16',
        20: 'gap-x-20',
        24: 'gap-x-24',
        28: 'gap-x-28',
        32: 'gap-x-32',
      },
      gapY: {
        none: 'gap-y-0',
        px: 'gap-y-px',
        0.5: 'gap-y-0.5',
        1: 'gap-y-1',
        1.5: 'gap-y-1.5',
        2: 'gap-y-2',
        2.5: 'gap-y-2.5',
        3: 'gap-y-3',
        3.5: 'gap-y-3.5',
        4: 'gap-y-4',
        5: 'gap-y-5',
        6: 'gap-y-6',
        7: 'gap-y-7',
        8: 'gap-y-8',
        9: 'gap-y-9',
        10: 'gap-y-10',
        11: 'gap-y-11',
        12: 'gap-y-12',
        14: 'gap-y-14',
        16: 'gap-y-16',
        20: 'gap-y-20',
        24: 'gap-y-24',
        28: 'gap-y-28',
        32: 'gap-y-32',
      },
      flow: {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense',
      },
      autoRows: {
        auto: 'auto-rows-auto',
        min: 'auto-rows-min',
        max: 'auto-rows-max',
        fr: 'auto-rows-fr',
      },
      autoCols: {
        auto: 'auto-cols-auto',
        min: 'auto-cols-min',
        max: 'auto-cols-max',
        fr: 'auto-cols-fr',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 4,
      flow: 'row',
    },
  }
);

const gridItemVariants = cva(
  [
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      colSpan: {
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
        auto: 'col-auto',
      },
      colStart: {
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
        13: 'col-start-13',
        auto: 'col-start-auto',
      },
      colEnd: {
        1: 'col-end-1',
        2: 'col-end-2',
        3: 'col-end-3',
        4: 'col-end-4',
        5: 'col-end-5',
        6: 'col-end-6',
        7: 'col-end-7',
        8: 'col-end-8',
        9: 'col-end-9',
        10: 'col-end-10',
        11: 'col-end-11',
        12: 'col-end-12',
        13: 'col-end-13',
        auto: 'col-end-auto',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
        auto: 'row-auto',
      },
      rowStart: {
        1: 'row-start-1',
        2: 'row-start-2',
        3: 'row-start-3',
        4: 'row-start-4',
        5: 'row-start-5',
        6: 'row-start-6',
        7: 'row-start-7',
        auto: 'row-start-auto',
      },
      rowEnd: {
        1: 'row-end-1',
        2: 'row-end-2',
        3: 'row-end-3',
        4: 'row-end-4',
        5: 'row-end-5',
        6: 'row-end-6',
        7: 'row-end-7',
        auto: 'row-end-auto',
      },
      justifySelf: {
        auto: 'justify-self-auto',
        start: 'justify-self-start',
        end: 'justify-self-end',
        center: 'justify-self-center',
        stretch: 'justify-self-stretch',
      },
      alignSelf: {
        auto: 'self-auto',
        start: 'self-start',
        end: 'self-end',
        center: 'self-center',
        stretch: 'self-stretch',
        baseline: 'self-baseline',
      },
    },
    defaultVariants: {
      colSpan: 1,
      justifySelf: 'auto',
      alignSelf: 'auto',
    },
  }
);

const gridAreaVariants = cva(
  [
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      area: {
        header: '[grid-area:header]',
        sidebar: '[grid-area:sidebar]',
        main: '[grid-area:main]',
        footer: '[grid-area:footer]',
        aside: '[grid-area:aside]',
        nav: '[grid-area:nav]',
      },
    },
  }
);

// =============================================================================
// GRID INTERFACES
// =============================================================================

export interface GridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /** Enable responsive behavior */
  readonly responsive?: boolean;
  /** Custom grid template columns */
  readonly templateColumns?: string;
  /** Custom grid template rows */
  readonly templateRows?: string;
  /** Custom grid template areas */
  readonly templateAreas?: string;
  /** Justify items */
  readonly justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  /** Align items */
  readonly alignItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  /** Justify content */
  readonly justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'around' | 'between' | 'evenly';
  /** Align content */
  readonly alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'around' | 'between' | 'evenly';
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface GridItemProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  /** Custom grid area name */
  readonly area?: string;
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface GridAreaProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridAreaVariants> {
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface ResponsiveGridProps extends Omit<GridProps, 'cols'> {
  /** Responsive column configuration */
  readonly cols?: {
    readonly default?: GridProps['cols'];
    readonly sm?: GridProps['cols'];
    readonly md?: GridProps['cols'];
    readonly lg?: GridProps['cols'];
    readonly xl?: GridProps['cols'];
    readonly '2xl'?: GridProps['cols'];
  };
}

// =============================================================================
// GRID UTILITY HOOKS
// =============================================================================

/**
 * Hook for responsive grid columns
 */
const useResponsiveGrid = (cols: ResponsiveGridProps['cols']) => {
  return React.useMemo(() => {
    if (!cols) return '';
    
    const classes: string[] = [];
    
    if (cols.default) classes.push(`grid-cols-${cols.default}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
    
    return classes.join(' ');
  }, [cols]);
};

/**
 * Debug styles hook
 */
const useDebugStyles = (debug: boolean) => {
  return React.useMemo((): React.CSSProperties => {
    if (!debug) return {};
    
    return {
      outline: '1px dashed rgba(255, 0, 0, 0.5)',
      backgroundColor: 'rgba(255, 0, 0, 0.05)',
    };
  }, [debug]);
};

// =============================================================================
// GRID SUB-COMPONENTS
// =============================================================================

/**
 * Grid Item Component
 */
export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({
    colSpan,
    colStart,
    colEnd,
    rowSpan,
    rowStart,
    rowEnd,
    justifySelf,
    alignSelf,
    area,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const debugStyles = useDebugStyles(debug);

    const itemStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };
      
      if (area) {
        styles.gridArea = area;
      }
      
      return styles;
    }, [area, debugStyles, style]);

    return (
      <Box
        ref={ref}
        className={cn(
          gridItemVariants({
            colSpan,
            colStart,
            colEnd,
            rowSpan,
            rowStart,
            rowEnd,
            justifySelf,
            alignSelf,
          }),
          className
        )}
       
        {...props}
      >
        {children}
      </Box>
    );
  }
);

GridItem.displayName = 'GridItem';

/**
 * Grid Area Component
 */
export const GridArea = forwardRef<HTMLDivElement, GridAreaProps>(
  ({
    area,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const debugStyles = useDebugStyles(debug);

    return (
      <Box
        ref={ref}
        className={cn(gridAreaVariants({ area }), className)}
       
        {...props}
      >
        {children}
      </Box>
    );
  }
);

GridArea.displayName = 'GridArea';

/**
 * Responsive Grid Component
 */
export const ResponsiveGrid = forwardRef<HTMLDivElement, ResponsiveGridProps>(
  ({
    cols,
    gap,
    gapX,
    gapY,
    rows,
    flow,
    autoRows,
    autoCols,
    templateColumns,
    templateRows,
    templateAreas,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
        const responsiveClasses = useResponsiveGrid(cols);
    const debugStyles = useDebugStyles(debug);

    const gridStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };
      
      if (templateColumns) styles.gridTemplateColumns = templateColumns;
      if (templateRows) styles.gridTemplateRows = templateRows;
      if (templateAreas) styles.gridTemplateAreas = templateAreas;
      if (justifyItems) styles.justifyItems = justifyItems;
      if (alignItems) styles.alignItems = alignItems;
      if (justifyContent) styles.justifyContent = justifyContent;
      if (alignContent) styles.alignContent = alignContent;
      
      return styles;
    }, [
      templateColumns,
      templateRows,
      templateAreas,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      debugStyles,
      style,
    ]);

    return (
      <Box
        ref={ref}
        className={cn(
          gridVariants({
            cols: cols?.default,
            gap,
            gapX,
            gapY,
            rows,
            flow,
            autoRows,
            autoCols,
          }),
          responsiveClasses,
          className
        )}
       
        {...props}
      >
        {children}
      </Box>
    );
  }
);

ResponsiveGrid.displayName = 'ResponsiveGrid';

// =============================================================================
// MAIN GRID COMPONENT
// =============================================================================

/**
 * Grid Component with token-based styling
 * Provides comprehensive grid layouts for applications
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({
    cols,
    rows,
    gap,
    gapX,
    gapY,
    flow,
    autoRows,
    autoCols,
    responsive = false,
    templateColumns,
    templateRows,
    templateAreas,
    justifyItems,
    alignItems,
    justifyContent,
    alignContent,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
        const debugStyles = useDebugStyles(debug);

    const gridStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };
      
      if (templateColumns) styles.gridTemplateColumns = templateColumns;
      if (templateRows) styles.gridTemplateRows = templateRows;
      if (templateAreas) styles.gridTemplateAreas = templateAreas;
      if (justifyItems) styles.justifyItems = justifyItems;
      if (alignItems) styles.alignItems = alignItems;
      if (justifyContent) styles.justifyContent = justifyContent;
      if (alignContent) styles.alignContent = alignContent;
      
      return styles;
    }, [
      templateColumns,
      templateRows,
      templateAreas,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      debugStyles,
      style,
    ]);

    return (
      <Box
        ref={ref}
        className={cn(
          gridVariants({
            cols,
            rows,
            gap,
            gapX,
            gapY,
            flow,
            autoRows,
            autoCols,
          }),
          responsive && 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
          className
        )}
       
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Grid.displayName = 'Grid';

// =============================================================================
// GRID COMPOSITIONS
// =============================================================================

/**
 * Pre-built grid compositions for common use cases
 */
export const GridComposition = {
  /**
   * Card grid layout
   */
  Cards: ({ 
    children, 
    ...props 
  }: Omit<GridProps, 'cols' | 'gap'> & { children: ReactNode }) => (
    <Grid
      cols={1}
      gap={6}
      responsive
      {...props}
    >
      {children}
    </Grid>
  ),

  /**
   * Dashboard layout with sidebar
   */
  Dashboard: ({ 
    sidebar, 
    main, 
    ...props 
  }: Omit<GridProps, 'cols' | 'templateAreas' | 'templateColumns'> & {
    sidebar: ReactNode;
    main: ReactNode;
  }) => (
    <Grid
      cols={4}
      gap={6}
      templateColumns="280px 1fr"
      templateAreas='"sidebar main"'
      className="min-h-screen"
      {...props}
    >
      <GridArea area="sidebar">{sidebar}</GridArea>
      <GridArea area="main">{main}</GridArea>
    </Grid>
  ),

  /**
   * Holy grail layout
   */
  HolyGrail: ({ 
    header, 
    sidebar, 
    main, 
    aside, 
    footer, 
    ...props 
  }: Omit<GridProps, 'templateAreas' | 'templateRows' | 'templateColumns'> & {
    header: ReactNode;
    sidebar: ReactNode;
    main: ReactNode;
    aside?: ReactNode;
    footer: ReactNode;
  }) => (
    <Grid
      templateRows="auto 1fr auto"
      templateColumns="250px 1fr 250px"
      templateAreas={`
        "header header header"
        "sidebar main ${aside ? 'aside' : 'main'}"
        "footer footer footer"
      `}
      gap="none"
      className="min-h-screen"
      {...props}
    >
      <GridArea area="header">{header}</GridArea>
      <GridArea area="sidebar">{sidebar}</GridArea>
      <GridArea area="main">{main}</GridArea>
      {aside && <GridArea area="aside">{aside}</GridArea>}
      <GridArea area="footer">{footer}</GridArea>
    </Grid>
  ),

  /**
   * Article layout
   */
  Article: ({ 
    children, 
    ...props 
  }: Omit<GridProps, 'templateColumns' | 'justifyItems'> & { children: ReactNode }) => (
    <Grid
      cols={1}
      templateColumns="1fr min(65ch, 100%) 1fr"
      justifyItems="center"
      gap={8}
      {...props}
    >
      <GridItem colStart={2}>
        {children}
      </GridItem>
    </Grid>
  ),

  /**
   * Masonry-style layout (CSS Grid approximation)
   */
  Masonry: ({ 
    children, 
    columns = 3, 
    ...props 
  }: Omit<GridProps, 'cols' | 'autoRows'> & { 
    children: ReactNode;
    columns?: number;
  }) => (
    <Grid
      cols={columns as GridProps['cols']}
      autoRows="min"
      gap={4}
      {...props}
    >
      {children}
    </Grid>
  ),

  /**
   * Gallery layout
   */
  Gallery: ({ 
    children, 
    ...props 
  }: Omit<GridProps, 'cols' | 'gap'> & { children: ReactNode }) => (
    <ResponsiveGrid
      cols={{
        default: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        '2xl': 6,
      }}
      gap={4}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  ),
};

// Export variants for external usage
export { gridVariants, gridItemVariants, gridAreaVariants };
export type GridVariant = VariantProps<typeof gridVariants>;
export type GridItemVariant = VariantProps<typeof gridItemVariants>;
export type GridAreaVariant = VariantProps<typeof gridAreaVariants>;
