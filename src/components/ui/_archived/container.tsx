/**
 * @fileoverview Container Component v5.0.0 - Token-Based Design System
 * @description Comprehensive Container system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import {
  Box,
  Text,
  Heading,
  List,
  ListItem,
  Link,
} from '../semantic';

// =============================================================================
// CONTAINER VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Container variants following CVA pattern
 */
const containerVariants = cva(
  ['w-full mx-auto', 'transition-all duration-200', 'motion-reduce:transition-none'],
  {
    variants: {
      size: {
        xs: 'max-w-xs',
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        '6xl': 'max-w-6xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full',
        screen: 'max-w-screen-2xl',
        none: 'max-w-none',
      },
      padding: {
        none: 'px-0',
        xs: 'px-2',
        sm: 'px-4',
        md: 'px-6',
        lg: 'px-8',
        xl: 'px-12',
        '2xl': 'px-16',
        '3xl': 'px-20',
      },
      paddingY: {
        none: 'py-0',
        xs: 'py-2',
        sm: 'py-4',
        md: 'py-6',
        lg: 'py-8',
        xl: 'py-12',
        '2xl': 'py-16',
        '3xl': 'py-20',
      },
      variant: {
        default: 'bg-transparent',
        filled: 'bg-background',
        card: 'bg-card border border-border rounded-lg',
        elevated: 'bg-card border border-border rounded-lg shadow-md',
        outlined: 'border border-border rounded-lg bg-transparent',
      },
      breakout: {
        none: '',
        sm: 'sm:max-w-full sm:px-6',
        md: 'md:max-w-full md:px-8',
        lg: 'lg:max-w-full lg:px-12',
        xl: 'xl:max-w-full xl:px-16',
        full: 'max-w-full px-4 sm:px-6 lg:px-8',
      },
    },
    defaultVariants: {
      size: '7xl',
      padding: 'md',
      paddingY: 'none',
      variant: 'default',
      breakout: 'none',
    },
  }
);

const sectionVariants = cva(
  ['w-full', 'transition-all duration-200', 'motion-reduce:transition-none'],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        filled: 'bg-background',
        muted: 'bg-muted/50',
        accent: 'bg-accent/10',
        primary: 'bg-primary/5',
      },
      spacing: {
        none: 'py-0',
        xs: 'py-4',
        sm: 'py-8',
        md: 'py-12',
        lg: 'py-16',
        xl: 'py-20',
        '2xl': 'py-24',
        '3xl': 'py-32',
      },
      width: {
        full: 'w-full',
        screen: 'w-screen',
        container: 'w-full max-w-7xl mx-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'md',
      width: 'full',
    },
  }
);

const wrapperVariants = cva(['transition-all duration-200', 'motion-reduce:transition-none'], {
  variants: {
    display: {
      block: 'block',
      'inline-block': 'inline-block',
      flex: 'flex',
      'inline-flex': 'inline-flex',
      grid: 'grid',
      'inline-grid': 'inline-grid',
    },
    position: {
      static: 'static',
      relative: 'relative',
      absolute: 'absolute',
      fixed: 'fixed',
      sticky: 'sticky',
    },
    overflow: {
      visible: 'overflow-visible',
      hidden: 'overflow-hidden',
      scroll: 'overflow-auto',
      'scroll-x': 'overflow-x-auto overflow-y-hidden',
      'scroll-y': 'overflow-y-auto overflow-x-hidden',
    },
    zIndex: {
      0: 'z-0',
      10: 'z-10',
      20: 'z-20',
      30: 'z-30',
      40: 'z-40',
      50: 'z-50',
      auto: 'z-auto',
    },
  },
  defaultVariants: {
    display: 'block',
    position: 'static',
    overflow: 'visible',
    zIndex: 'auto',
  },
});

// =============================================================================
// CONTAINER INTERFACES
// =============================================================================

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /** Center content horizontally */
  readonly center?: boolean;
  /** Enable responsive behavior */
  readonly responsive?: boolean;
  /** Custom max width */
  readonly maxWidth?: string;
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** Section element to use */
  readonly as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav';
  /** Enable full viewport width */
  readonly fullWidth?: boolean;
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  /** Custom dimensions */
  readonly width?: string;
  readonly height?: string;
  readonly minWidth?: string;
  readonly minHeight?: string;
  readonly maxWidth?: string;
  readonly maxHeight?: string;
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface FlexContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flex direction */
  readonly direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  /** Flex wrap */
  readonly wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Justify content */
  readonly justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  /** Align items */
  readonly align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  /** Gap between items */
  readonly gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface CenteredContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width */
  readonly maxWidth?: ContainerProps['size'];
  /** Vertical centering */
  readonly vertical?: boolean;
  /** Minimum height when vertically centered */
  readonly minHeight?: string;
  /** Enable debug mode */
  readonly debug?: boolean;
}

// =============================================================================
// CONTAINER UTILITY HOOKS
// =============================================================================

/**
 * Debug styles hook
 */
const useDebugStyles = (debug: boolean) => {
  return React.useMemo((): React.CSSProperties => {
    if (!debug) return {};

    return {
      outline: '2px dashed rgba(59, 130, 246, 0.5)',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      position: 'relative',
    };
  }, [debug]);
};

/**
 * Responsive container hook
 */
const useResponsiveContainer = (responsive: boolean, breakout: ContainerProps['breakout']) => {
  return React.useMemo(() => {
    if (!responsive) return '';

    const classes: string[] = [];

    // Add responsive padding
    classes.push('px-4 sm:px-6 lg:px-8');

    // Add responsive max-width if not using breakout
    if (!breakout || breakout === 'none') {
      classes.push('max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-7xl');
    }

    return classes.join(' ');
  }, [responsive, breakout]);
};

// =============================================================================
// CONTAINER SUB-COMPONENTS
// =============================================================================

/**
 * Section Component
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      as: Component = 'section',
      variant,
      spacing,
      width,
      fullWidth = false,
      debug = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const debugStyles = useDebugStyles(debug);

    const sectionStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };

      if (fullWidth) {
        styles.width = '100vw';
        styles.marginLeft = '50%';
        styles.transform = 'translateX(-50%)';
      }

      return styles;
    }, [fullWidth, debugStyles, style]);

    return (
      <Component
        ref={ref as any}
        className={cn(
          sectionVariants({ variant, spacing, width }),
          fullWidth && 'relative',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Section.displayName = 'Section';

/**
 * Wrapper Component
 */
export const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  (
    {
      display,
      position,
      overflow,
      zIndex,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      debug = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const debugStyles = useDebugStyles(debug);

    const wrapperStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };

      if (width) styles.width = width;
      if (height) styles.height = height;
      if (minWidth) styles.minWidth = minWidth;
      if (minHeight) styles.minHeight = minHeight;
      if (maxWidth) styles.maxWidth = maxWidth;
      if (maxHeight) styles.maxHeight = maxHeight;

      return styles;
    }, [width, height, minWidth, minHeight, maxWidth, maxHeight, debugStyles, style]);

    return (
      <Box
        ref={ref}
        className={cn(wrapperVariants({ display, position, overflow, zIndex }), className)}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Wrapper.displayName = 'Wrapper';

/**
 * Flex Container Component
 */
export const FlexContainer = forwardRef<HTMLDivElement, FlexContainerProps>(
  (
    {
      direction = 'row',
      wrap = 'nowrap',
      justify = 'start',
      align = 'stretch',
      gap = 'md',
      debug = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const debugStyles = useDebugStyles(debug);

    const flexClasses = cn(
      'flex',
      // Direction
      direction === 'row' && 'flex-row',
      direction === 'row-reverse' && 'flex-row-reverse',
      direction === 'col' && 'flex-col',
      direction === 'col-reverse' && 'flex-col-reverse',
      // Wrap
      wrap === 'nowrap' && 'flex-nowrap',
      wrap === 'wrap' && 'flex-wrap',
      wrap === 'wrap-reverse' && 'flex-wrap-reverse',
      // Justify
      justify === 'start' && 'justify-start',
      justify === 'end' && 'justify-end',
      justify === 'center' && 'justify-center',
      justify === 'between' && 'justify-between',
      justify === 'around' && 'justify-around',
      justify === 'evenly' && 'justify-evenly',
      // Align
      align === 'start' && 'items-start',
      align === 'end' && 'items-end',
      align === 'center' && 'items-center',
      align === 'baseline' && 'items-baseline',
      align === 'stretch' && 'items-stretch',
      // Gap
      gap === 'none' && 'gap-0',
      gap === 'xs' && 'gap-1',
      gap === 'sm' && 'gap-2',
      gap === 'md' && 'gap-4',
      gap === 'lg' && 'gap-6',
      gap === 'xl' && 'gap-8',
      gap === '2xl' && 'gap-12'
    );

    return (
      <Box ref={ref} className={cn(flexClasses, className)} {...props}>
        {children}
      </Box>
    );
  }
);

FlexContainer.displayName = 'FlexContainer';

/**
 * Centered Container Component
 */
export const CenteredContainer = forwardRef<HTMLDivElement, CenteredContainerProps>(
  (
    {
      maxWidth = '7xl',
      vertical = false,
      minHeight = '100vh',
      debug = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const debugStyles = useDebugStyles(debug);

    const centeredStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };

      if (vertical) {
        styles.minHeight = minHeight;
      }

      return styles;
    }, [vertical, minHeight, debugStyles, style]);

    return (
      <Box
        ref={ref}
        className={cn(
          'w-full mx-auto',
          // Max width
          maxWidth === 'xs' && 'max-w-xs',
          maxWidth === 'sm' && 'max-w-sm',
          maxWidth === 'md' && 'max-w-md',
          maxWidth === 'lg' && 'max-w-lg',
          maxWidth === 'xl' && 'max-w-xl',
          maxWidth === '2xl' && 'max-w-2xl',
          maxWidth === '3xl' && 'max-w-3xl',
          maxWidth === '4xl' && 'max-w-4xl',
          maxWidth === '5xl' && 'max-w-5xl',
          maxWidth === '6xl' && 'max-w-6xl',
          maxWidth === '7xl' && 'max-w-7xl',
          maxWidth === 'full' && 'max-w-full',
          maxWidth === 'screen' && 'max-w-screen-2xl',
          maxWidth === 'none' && 'max-w-none',
          // Vertical centering
          vertical && 'flex items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

CenteredContainer.displayName = 'CenteredContainer';

// =============================================================================
// MAIN CONTAINER COMPONENT
// =============================================================================

/**
 * Container Component with token-based styling
 * Provides comprehensive container layouts for applications
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size,
      padding,
      paddingY,
      variant,
      breakout,
      center = false,
      responsive = false,
      maxWidth,
      debug = false,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const debugStyles = useDebugStyles(debug);
    const responsiveClasses = useResponsiveContainer(responsive, breakout);

    const containerStyles = React.useMemo((): React.CSSProperties => {
      const styles: React.CSSProperties = { ...debugStyles, ...style };

      if (maxWidth) {
        styles.maxWidth = maxWidth;
      }

      if (center) {
        styles.textAlign = 'center';
      }

      return styles;
    }, [maxWidth, center, debugStyles, style]);

    return (
      <Box
        ref={ref}
        className={cn(
          containerVariants({ size, padding, paddingY, variant, breakout }),
          responsive && responsiveClasses,
          className
        )}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

Container.displayName = 'Container';

// =============================================================================
// CONTAINER COMPOSITIONS
// =============================================================================

/**
 * Pre-built container compositions for common use cases
 */
export const ContainerComposition = {
  /**
   * Page container
   */
  Page: ({
    children,
    ...props
  }: Omit<ContainerProps, 'size' | 'padding'> & { children: ReactNode }) => (
    <Container size="7xl" padding="md" responsive {...props}>
      {children}
    </Container>
  ),

  /**
   * Article container
   */
  Article: ({
    children,
    ...props
  }: Omit<ContainerProps, 'size' | 'padding'> & { children: ReactNode }) => (
    <Container size="4xl" padding="lg" paddingY="xl" center {...props}>
      {children}
    </Container>
  ),

  /**
   * Card container
   */
  Card: ({
    children,
    ...props
  }: Omit<ContainerProps, 'variant' | 'padding'> & { children: ReactNode }) => (
    <Container variant="card" padding="lg" paddingY="lg" {...props}>
      {children}
    </Container>
  ),

  /**
   * Hero section container
   */
  Hero: ({
    children,
    ...props
  }: Omit<SectionProps, 'spacing' | 'variant'> & { children: ReactNode }) => (
    <Section spacing="3xl" variant="default" width="full" {...props}>
      <Container size="7xl" padding="md" center>
        {children}
      </Container>
    </Section>
  ),

  /**
   * Content section
   */
  Content: ({ children, ...props }: Omit<SectionProps, 'spacing'> & { children: ReactNode }) => (
    <Section spacing="xl" width="container" {...props}>
      {children}
    </Section>
  ),

  /**
   * Sidebar layout
   */
  Sidebar: ({
    sidebar,
    main,
    ...props
  }: Omit<FlexContainerProps, 'direction'> & {
    sidebar: ReactNode;
    main: ReactNode;
  }) => (
    <FlexContainer direction="row" gap="lg" className="min-h-screen" {...props}>
      <Box className="w-64 flex-shrink-0">{sidebar}</Box>
      <Box className="flex-1 min-w-0">{main}</Box>
    </FlexContainer>
  ),

  /**
   * Split layout
   */
  Split: ({
    left,
    right,
    ratio = '1:1',
    ...props
  }: Omit<FlexContainerProps, 'direction'> & {
    left: ReactNode;
    right: ReactNode;
    ratio?: '1:1' | '1:2' | '2:1' | '1:3' | '3:1';
  }) => {
    const leftFlex =
      ratio === '1:2'
        ? 'flex-1'
        : ratio === '2:1'
          ? 'flex-2'
          : ratio === '1:3'
            ? 'flex-1'
            : ratio === '3:1'
              ? 'flex-3'
              : 'flex-1';
    const rightFlex =
      ratio === '1:2'
        ? 'flex-2'
        : ratio === '2:1'
          ? 'flex-1'
          : ratio === '1:3'
            ? 'flex-3'
            : ratio === '3:1'
              ? 'flex-1'
              : 'flex-1';

    return (
      <FlexContainer direction="row" gap="lg" {...props}>
        <Box className={cn(leftFlex, 'min-w-0')}>{left}</Box>
        <Box className={cn(rightFlex, 'min-w-0')}>{right}</Box>
      </FlexContainer>
    );
  },
};

// Export variants for external usage
export { containerVariants, sectionVariants, wrapperVariants };
export type ContainerVariant = VariantProps<typeof containerVariants>;
export type SectionVariant = VariantProps<typeof sectionVariants>;
export type WrapperVariant = VariantProps<typeof wrapperVariants>;
