/**
 * @fileoverview Spacing Component v5.0.0 - Token-Based Design System
 * @description Comprehensive Spacing system using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// SPACING VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Spacer variants following CVA pattern
 */
const spacerVariants = cva(
  [
    'block',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      size: {
        px: 'h-px w-px',
        0: 'h-0 w-0',
        0.5: 'h-0.5 w-0.5',
        1: 'h-1 w-1',
        1.5: 'h-1.5 w-1.5',
        2: 'h-2 w-2',
        2.5: 'h-2.5 w-2.5',
        3: 'h-3 w-3',
        3.5: 'h-3.5 w-3.5',
        4: 'h-4 w-4',
        5: 'h-5 w-5',
        6: 'h-6 w-6',
        7: 'h-7 w-7',
        8: 'h-8 w-8',
        9: 'h-9 w-9',
        10: 'h-10 w-10',
        11: 'h-11 w-11',
        12: 'h-12 w-12',
        14: 'h-14 w-14',
        16: 'h-16 w-16',
        20: 'h-20 w-20',
        24: 'h-24 w-24',
        28: 'h-28 w-28',
        32: 'h-32 w-32',
        36: 'h-36 w-36',
        40: 'h-40 w-40',
        44: 'h-44 w-44',
        48: 'h-48 w-48',
        52: 'h-52 w-52',
        56: 'h-56 w-56',
        60: 'h-60 w-60',
        64: 'h-64 w-64',
        72: 'h-72 w-72',
        80: 'h-80 w-80',
        96: 'h-96 w-96',
      },
      direction: {
        both: '',
        horizontal: 'h-0',
        vertical: 'w-0',
      },
      visible: {
        true: 'bg-red-200 border border-red-300',
        false: 'bg-transparent',
      },
    },
    defaultVariants: {
      size: 4,
      direction: 'both',
      visible: false,
    },
  }
);

const paddingVariants = cva(
  '',
  {
    variants: {
      p: {
        0: 'p-0',
        px: 'p-px',
        0.5: 'p-0.5',
        1: 'p-1',
        1.5: 'p-1.5',
        2: 'p-2',
        2.5: 'p-2.5',
        3: 'p-3',
        3.5: 'p-3.5',
        4: 'p-4',
        5: 'p-5',
        6: 'p-6',
        7: 'p-7',
        8: 'p-8',
        9: 'p-9',
        10: 'p-10',
        11: 'p-11',
        12: 'p-12',
        14: 'p-14',
        16: 'p-16',
        20: 'p-20',
        24: 'p-24',
        28: 'p-28',
        32: 'p-32',
      },
      px: {
        0: 'px-0',
        px: 'px-px',
        0.5: 'px-0.5',
        1: 'px-1',
        1.5: 'px-1.5',
        2: 'px-2',
        2.5: 'px-2.5',
        3: 'px-3',
        3.5: 'px-3.5',
        4: 'px-4',
        5: 'px-5',
        6: 'px-6',
        7: 'px-7',
        8: 'px-8',
        9: 'px-9',
        10: 'px-10',
        11: 'px-11',
        12: 'px-12',
        14: 'px-14',
        16: 'px-16',
        20: 'px-20',
        24: 'px-24',
        28: 'px-28',
        32: 'px-32',
      },
      py: {
        0: 'py-0',
        px: 'py-px',
        0.5: 'py-0.5',
        1: 'py-1',
        1.5: 'py-1.5',
        2: 'py-2',
        2.5: 'py-2.5',
        3: 'py-3',
        3.5: 'py-3.5',
        4: 'py-4',
        5: 'py-5',
        6: 'py-6',
        7: 'py-7',
        8: 'py-8',
        9: 'py-9',
        10: 'py-10',
        11: 'py-11',
        12: 'py-12',
        14: 'py-14',
        16: 'py-16',
        20: 'py-20',
        24: 'py-24',
        28: 'py-28',
        32: 'py-32',
      },
      pt: {
        0: 'pt-0',
        px: 'pt-px',
        0.5: 'pt-0.5',
        1: 'pt-1',
        1.5: 'pt-1.5',
        2: 'pt-2',
        2.5: 'pt-2.5',
        3: 'pt-3',
        3.5: 'pt-3.5',
        4: 'pt-4',
        5: 'pt-5',
        6: 'pt-6',
        7: 'pt-7',
        8: 'pt-8',
        9: 'pt-9',
        10: 'pt-10',
        11: 'pt-11',
        12: 'pt-12',
        14: 'pt-14',
        16: 'pt-16',
        20: 'pt-20',
        24: 'pt-24',
        28: 'pt-28',
        32: 'pt-32',
      },
      pr: {
        0: 'pr-0',
        px: 'pr-px',
        0.5: 'pr-0.5',
        1: 'pr-1',
        1.5: 'pr-1.5',
        2: 'pr-2',
        2.5: 'pr-2.5',
        3: 'pr-3',
        3.5: 'pr-3.5',
        4: 'pr-4',
        5: 'pr-5',
        6: 'pr-6',
        7: 'pr-7',
        8: 'pr-8',
        9: 'pr-9',
        10: 'pr-10',
        11: 'pr-11',
        12: 'pr-12',
        14: 'pr-14',
        16: 'pr-16',
        20: 'pr-20',
        24: 'pr-24',
        28: 'pr-28',
        32: 'pr-32',
      },
      pb: {
        0: 'pb-0',
        px: 'pb-px',
        0.5: 'pb-0.5',
        1: 'pb-1',
        1.5: 'pb-1.5',
        2: 'pb-2',
        2.5: 'pb-2.5',
        3: 'pb-3',
        3.5: 'pb-3.5',
        4: 'pb-4',
        5: 'pb-5',
        6: 'pb-6',
        7: 'pb-7',
        8: 'pb-8',
        9: 'pb-9',
        10: 'pb-10',
        11: 'pb-11',
        12: 'pb-12',
        14: 'pb-14',
        16: 'pb-16',
        20: 'pb-20',
        24: 'pb-24',
        28: 'pb-28',
        32: 'pb-32',
      },
      pl: {
        0: 'pl-0',
        px: 'pl-px',
        0.5: 'pl-0.5',
        1: 'pl-1',
        1.5: 'pl-1.5',
        2: 'pl-2',
        2.5: 'pl-2.5',
        3: 'pl-3',
        3.5: 'pl-3.5',
        4: 'pl-4',
        5: 'pl-5',
        6: 'pl-6',
        7: 'pl-7',
        8: 'pl-8',
        9: 'pl-9',
        10: 'pl-10',
        11: 'pl-11',
        12: 'pl-12',
        14: 'pl-14',
        16: 'pl-16',
        20: 'pl-20',
        24: 'pl-24',
        28: 'pl-28',
        32: 'pl-32',
      },
    },
  }
);

const marginVariants = cva(
  '',
  {
    variants: {
      m: {
        0: 'm-0',
        px: 'm-px',
        0.5: 'm-0.5',
        1: 'm-1',
        1.5: 'm-1.5',
        2: 'm-2',
        2.5: 'm-2.5',
        3: 'm-3',
        3.5: 'm-3.5',
        4: 'm-4',
        5: 'm-5',
        6: 'm-6',
        7: 'm-7',
        8: 'm-8',
        9: 'm-9',
        10: 'm-10',
        11: 'm-11',
        12: 'm-12',
        14: 'm-14',
        16: 'm-16',
        20: 'm-20',
        24: 'm-24',
        28: 'm-28',
        32: 'm-32',
        auto: 'm-auto',
      },
      mx: {
        0: 'mx-0',
        px: 'mx-px',
        0.5: 'mx-0.5',
        1: 'mx-1',
        1.5: 'mx-1.5',
        2: 'mx-2',
        2.5: 'mx-2.5',
        3: 'mx-3',
        3.5: 'mx-3.5',
        4: 'mx-4',
        5: 'mx-5',
        6: 'mx-6',
        7: 'mx-7',
        8: 'mx-8',
        9: 'mx-9',
        10: 'mx-10',
        11: 'mx-11',
        12: 'mx-12',
        14: 'mx-14',
        16: 'mx-16',
        20: 'mx-20',
        24: 'mx-24',
        28: 'mx-28',
        32: 'mx-32',
        auto: 'mx-auto',
      },
      my: {
        0: 'my-0',
        px: 'my-px',
        0.5: 'my-0.5',
        1: 'my-1',
        1.5: 'my-1.5',
        2: 'my-2',
        2.5: 'my-2.5',
        3: 'my-3',
        3.5: 'my-3.5',
        4: 'my-4',
        5: 'my-5',
        6: 'my-6',
        7: 'my-7',
        8: 'my-8',
        9: 'my-9',
        10: 'my-10',
        11: 'my-11',
        12: 'my-12',
        14: 'my-14',
        16: 'my-16',
        20: 'my-20',
        24: 'my-24',
        28: 'my-28',
        32: 'my-32',
        auto: 'my-auto',
      },
      mt: {
        0: 'mt-0',
        px: 'mt-px',
        0.5: 'mt-0.5',
        1: 'mt-1',
        1.5: 'mt-1.5',
        2: 'mt-2',
        2.5: 'mt-2.5',
        3: 'mt-3',
        3.5: 'mt-3.5',
        4: 'mt-4',
        5: 'mt-5',
        6: 'mt-6',
        7: 'mt-7',
        8: 'mt-8',
        9: 'mt-9',
        10: 'mt-10',
        11: 'mt-11',
        12: 'mt-12',
        14: 'mt-14',
        16: 'mt-16',
        20: 'mt-20',
        24: 'mt-24',
        28: 'mt-28',
        32: 'mt-32',
        auto: 'mt-auto',
      },
      mr: {
        0: 'mr-0',
        px: 'mr-px',
        0.5: 'mr-0.5',
        1: 'mr-1',
        1.5: 'mr-1.5',
        2: 'mr-2',
        2.5: 'mr-2.5',
        3: 'mr-3',
        3.5: 'mr-3.5',
        4: 'mr-4',
        5: 'mr-5',
        6: 'mr-6',
        7: 'mr-7',
        8: 'mr-8',
        9: 'mr-9',
        10: 'mr-10',
        11: 'mr-11',
        12: 'mr-12',
        14: 'mr-14',
        16: 'mr-16',
        20: 'mr-20',
        24: 'mr-24',
        28: 'mr-28',
        32: 'mr-32',
        auto: 'mr-auto',
      },
      mb: {
        0: 'mb-0',
        px: 'mb-px',
        0.5: 'mb-0.5',
        1: 'mb-1',
        1.5: 'mb-1.5',
        2: 'mb-2',
        2.5: 'mb-2.5',
        3: 'mb-3',
        3.5: 'mb-3.5',
        4: 'mb-4',
        5: 'mb-5',
        6: 'mb-6',
        7: 'mb-7',
        8: 'mb-8',
        9: 'mb-9',
        10: 'mb-10',
        11: 'mb-11',
        12: 'mb-12',
        14: 'mb-14',
        16: 'mb-16',
        20: 'mb-20',
        24: 'mb-24',
        28: 'mb-28',
        32: 'mb-32',
        auto: 'mb-auto',
      },
      ml: {
        0: 'ml-0',
        px: 'ml-px',
        0.5: 'ml-0.5',
        1: 'ml-1',
        1.5: 'ml-1.5',
        2: 'ml-2',
        2.5: 'ml-2.5',
        3: 'ml-3',
        3.5: 'ml-3.5',
        4: 'ml-4',
        5: 'ml-5',
        6: 'ml-6',
        7: 'ml-7',
        8: 'ml-8',
        9: 'ml-9',
        10: 'ml-10',
        11: 'ml-11',
        12: 'ml-12',
        14: 'ml-14',
        16: 'ml-16',
        20: 'ml-20',
        24: 'ml-24',
        28: 'ml-28',
        32: 'ml-32',
        auto: 'ml-auto',
      },
    },
  }
);

// =============================================================================
// SPACING INTERFACES
// =============================================================================

export interface SpacerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {
  /** Custom spacing value */
  readonly spacing?: string;
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface PaddingBoxProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paddingVariants> {
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface MarginBoxProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marginVariants> {
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  readonly direction?: 'horizontal' | 'vertical';
  /** Stack spacing */
  readonly spacing?: SpacerProps['size'];
  /** Stack alignment */
  readonly align?: 'start' | 'center' | 'end' | 'stretch';
  /** Stack justification */
  readonly justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Wrap items */
  readonly wrap?: boolean;
  /** Enable debug mode */
  readonly debug?: boolean;
}

export interface InlineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Inline spacing */
  readonly spacing?: SpacerProps['size'];
  /** Inline alignment */
  readonly align?: 'start' | 'center' | 'end' | 'baseline';
  /** Enable debug mode */
  readonly debug?: boolean;
}

// =============================================================================
// SPACING UTILITY HOOKS
// =============================================================================

/**
 * Debug styles hook
 */
const useDebugStyles = (debug: boolean) => {
  return React.useMemo((): React.CSSProperties => {
    if (!debug) return {};
    
    return {
      outline: '1px dashed rgba(34, 197, 94, 0.5)',
      backgroundColor: 'rgba(34, 197, 94, 0.05)',
    };
  }, [debug]);
};

/**
 * Custom spacing hook
 */
const useCustomSpacing = (spacing?: string) => {
  return React.useMemo((): React.CSSProperties => {
    if (!spacing) return {};
    
    return {
      width: spacing,
      height: spacing,
    };
  }, [spacing]);
};

// =============================================================================
// SPACING SUB-COMPONENTS
// =============================================================================

/**
 * Padding Box Component
 */
export const PaddingBox = forwardRef<HTMLDivElement, PaddingBoxProps>(
  ({
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const debugStyles = useDebugStyles(debug);

    return (
      <div
        ref={ref}
        className={cn(
          paddingVariants({ p, px, py, pt, pr, pb, pl }),
          className
        )}
        style={{ ...debugStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PaddingBox.displayName = 'PaddingBox';

/**
 * Margin Box Component
 */
export const MarginBox = forwardRef<HTMLDivElement, MarginBoxProps>(
  ({
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const debugStyles = useDebugStyles(debug);

    return (
      <div
        ref={ref}
        className={cn(
          marginVariants({ m, mx, my, mt, mr, mb, ml }),
          className
        )}
        style={{ ...debugStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MarginBox.displayName = 'MarginBox';

/**
 * Stack Component
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({
    direction = 'vertical',
    spacing = 4,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const debugStyles = useDebugStyles(debug);

    const stackClasses = cn(
      'flex',
      // Direction
      direction === 'vertical' && 'flex-col',
      direction === 'horizontal' && 'flex-row',
      // Spacing
      direction === 'vertical' && spacing === 1 && 'space-y-1',
      direction === 'vertical' && spacing === 2 && 'space-y-2',
      direction === 'vertical' && spacing === 3 && 'space-y-3',
      direction === 'vertical' && spacing === 4 && 'space-y-4',
      direction === 'vertical' && spacing === 5 && 'space-y-5',
      direction === 'vertical' && spacing === 6 && 'space-y-6',
      direction === 'vertical' && spacing === 8 && 'space-y-8',
      direction === 'horizontal' && spacing === 1 && 'space-x-1',
      direction === 'horizontal' && spacing === 2 && 'space-x-2',
      direction === 'horizontal' && spacing === 3 && 'space-x-3',
      direction === 'horizontal' && spacing === 4 && 'space-x-4',
      direction === 'horizontal' && spacing === 5 && 'space-x-5',
      direction === 'horizontal' && spacing === 6 && 'space-x-6',
      direction === 'horizontal' && spacing === 8 && 'space-x-8',
      // Alignment
      align === 'start' && 'items-start',
      align === 'center' && 'items-center',
      align === 'end' && 'items-end',
      align === 'stretch' && 'items-stretch',
      // Justification
      justify === 'start' && 'justify-start',
      justify === 'center' && 'justify-center',
      justify === 'end' && 'justify-end',
      justify === 'between' && 'justify-between',
      justify === 'around' && 'justify-around',
      justify === 'evenly' && 'justify-evenly',
      // Wrap
      wrap && 'flex-wrap',
    );

    return (
      <div
        ref={ref}
        className={cn(stackClasses, className)}
        style={{ ...debugStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

/**
 * Inline Component
 */
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({
    spacing = 2,
    align = 'center',
    debug = false,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const debugStyles = useDebugStyles(debug);

    const inlineClasses = cn(
      'flex flex-row flex-wrap',
      // Spacing
      spacing === 1 && 'gap-1',
      spacing === 2 && 'gap-2',
      spacing === 3 && 'gap-3',
      spacing === 4 && 'gap-4',
      spacing === 5 && 'gap-5',
      spacing === 6 && 'gap-6',
      spacing === 8 && 'gap-8',
      // Alignment
      align === 'start' && 'items-start',
      align === 'center' && 'items-center',
      align === 'end' && 'items-end',
      align === 'baseline' && 'items-baseline',
    );

    return (
      <div
        ref={ref}
        className={cn(inlineClasses, className)}
        style={{ ...debugStyles, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Inline.displayName = 'Inline';

// =============================================================================
// MAIN SPACER COMPONENT
// =============================================================================

/**
 * Spacer Component with token-based styling
 * Provides spacing utilities for layouts
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({
    size,
    direction,
    visible,
    spacing: customSpacing,
    debug = false,
    className,
    style,
    ...props
  }, ref) => {
    const { spacing: tokenSpacing } = useTokens();
    const debugStyles = useDebugStyles(debug);
    const customSpacingStyles = useCustomSpacing(customSpacing);

    const spacerStyles = React.useMemo((): React.CSSProperties => {
      return {
        ...debugStyles,
        ...customSpacingStyles,
        ...style,
      };
    }, [debugStyles, customSpacingStyles, style]);

    return (
      <div
        ref={ref}
        className={cn(
          spacerVariants({ size, direction, visible }),
          className
        )}
        style={spacerStyles}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

// =============================================================================
// SPACING COMPOSITIONS
// =============================================================================

/**
 * Pre-built spacing compositions for common use cases
 */
export const SpacingComposition = {
  /**
   * Vertical stack with consistent spacing
   */
  VStack: ({ 
    spacing = 4, 
    children, 
    ...props 
  }: Omit<StackProps, 'direction'> & { children: ReactNode }) => (
    <Stack
      direction="vertical"
      spacing={spacing}
      {...props}
    >
      {children}
    </Stack>
  ),

  /**
   * Horizontal stack with consistent spacing
   */
  HStack: ({ 
    spacing = 4, 
    children, 
    ...props 
  }: Omit<StackProps, 'direction'> & { children: ReactNode }) => (
    <Stack
      direction="horizontal"
      spacing={spacing}
      {...props}
    >
      {children}
    </Stack>
  ),

  /**
   * Centered content with padding
   */
  Center: ({ 
    padding = 8, 
    children, 
    ...props 
  }: Omit<PaddingBoxProps, 'p'> & { 
    padding?: PaddingBoxProps['p'];
    children: ReactNode; 
  }) => (
    <PaddingBox
      p={padding}
      className="flex items-center justify-center"
      {...props}
    >
      {children}
    </PaddingBox>
  ),

  /**
   * Inset content with consistent padding
   */
  Inset: ({ 
    padding = 6, 
    children, 
    ...props 
  }: Omit<PaddingBoxProps, 'p'> & { 
    padding?: PaddingBoxProps['p'];
    children: ReactNode; 
  }) => (
    <PaddingBox
      p={padding}
      {...props}
    >
      {children}
    </PaddingBox>
  ),

  /**
   * Padded section with consistent margins
   */
  Section: ({ 
    paddingY = 12, 
    marginY = 8, 
    children, 
    ...props 
  }: {
    paddingY?: PaddingBoxProps['py'];
    marginY?: MarginBoxProps['my'];
    children: ReactNode;
  } & Omit<PaddingBoxProps, 'py'> & Omit<MarginBoxProps, 'my'>) => (
    <MarginBox my={marginY}>
      <PaddingBox py={paddingY} {...props}>
        {children}
      </PaddingBox>
    </MarginBox>
  ),
};

// Export variants for external usage
export { spacerVariants, paddingVariants, marginVariants };
export type SpacerVariant = VariantProps<typeof spacerVariants>;
export type PaddingVariant = VariantProps<typeof paddingVariants>;
export type MarginVariant = VariantProps<typeof marginVariants>;