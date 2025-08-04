/**
 * @fileoverview SSR-Safe Box Component - Production Strategy Implementation
 * @description Flexible layout container using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';

/**
 * Box variant types
 */
export type BoxVariant = 'default' | 'outline' | 'filled' | 'ghost' | 'elevated';

/**
 * Box size types
 */
export type BoxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';

/**
 * Box radius types
 */
export type BoxRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Box display types
 */
export type BoxDisplay =
  | 'block'
  | 'flex'
  | 'inline'
  | 'inline-block'
  | 'inline-flex'
  | 'grid'
  | 'hidden';

/**
 * Box flex types
 */
export type BoxFlex = 'initial' | '1' | 'auto' | 'none';

/**
 * Box direction types
 */
export type BoxDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';

/**
 * Box justify types
 */
export type BoxJustify = 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';

/**
 * Box align types
 */
export type BoxAlign = 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/**
 * Box gap types
 */
export type BoxGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Box wrap types
 */
export type BoxWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Box overflow types
 */
export type BoxOverflow =
  | 'visible'
  | 'hidden'
  | 'scroll'
  | 'auto'
  | 'x-hidden'
  | 'y-hidden'
  | 'x-scroll'
  | 'y-scroll'
  | 'x-auto'
  | 'y-auto';

/**
 * Box position types
 */
export type BoxPosition = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

/**
 * Box Props interface
 */
export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  /** Box variant */
  variant?: BoxVariant;
  /** Box padding size */
  size?: BoxSize;
  /** Border radius */
  radius?: BoxRadius;
  /** Display type */
  display?: BoxDisplay;
  /** Flex value */
  flex?: BoxFlex;
  /** Flex direction */
  direction?: BoxDirection;
  /** Justify content */
  justify?: BoxJustify;
  /** Align items */
  align?: BoxAlign;
  /** Gap between items */
  gap?: BoxGap;
  /** Flex wrap */
  wrap?: BoxWrap;
  /** Overflow behavior */
  overflow?: BoxOverflow;
  /** Position type */
  position?: BoxPosition;
  /** Child content */
  children?: React.ReactNode;
  /** Custom element type */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav' | 'span';
  /** Custom width */
  w?: string;
  /** Custom height */
  h?: string;
  /** Custom max width */
  maxW?: string;
  /** Custom max height */
  maxH?: string;
  /** Custom min width */
  minW?: string;
  /** Custom min height */
  minH?: string;
}

/**
 * Box component for flexible layout containers
 */
export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      variant = 'default',
      size = 'none',
      radius = 'md',
      display = 'block',
      flex = 'initial',
      direction = 'row',
      justify = 'start',
      align = 'start',
      gap = 'none',
      wrap = 'nowrap',
      overflow = 'visible',
      position = 'relative',
      children,
      as: Component = 'div',
      w,
      h,
      maxW,
      maxH,
      minW,
      minH,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Get border radius values
    const borderRadiusMap = {
      none: '0',
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      lg: (getToken('borderRadius.lg') as string) || '0.5rem',
      xl: (getToken('borderRadius.xl') as string) || '0.75rem',
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Get variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'outline':
          return {
            border: `1px solid ${colors.border?.default || colors.neutral?.[200]}`,
          };
        case 'filled':
          return {
            backgroundColor: colors.background?.subtle || colors.neutral?.[50],
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
          };
        case 'elevated':
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            boxShadow: shadows?.sm || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            border: `1px solid ${colors.border?.default || colors.neutral?.[200]}`,
          };
        default:
          return {};
      }
    };

    // Get padding based on size
    const getPadding = (): string | undefined => {
      switch (size) {
        case 'xs':
          return spacing[1];
        case 'sm':
          return spacing[2];
        case 'md':
          return spacing[4];
        case 'lg':
          return spacing[6];
        case 'xl':
          return spacing[8];
        case 'none':
        default:
          return undefined;
      }
    };

    // Get gap value
    const getGapValue = (): string => {
      switch (gap) {
        case 'xs':
          return spacing[1];
        case 'sm':
          return spacing[2];
        case 'md':
          return spacing[4];
        case 'lg':
          return spacing[6];
        case 'xl':
          return spacing[8];
        case 'none':
        default:
          return '0';
      }
    };

    // Get flex direction value
    const getFlexDirection = (): React.CSSProperties['flexDirection'] => {
      switch (direction) {
        case 'row-reverse':
          return 'row-reverse';
        case 'col':
          return 'column';
        case 'col-reverse':
          return 'column-reverse';
        default:
          return 'row';
      }
    };

    // Get justify content value
    const getJustifyContent = (): React.CSSProperties['justifyContent'] => {
      switch (justify) {
        case 'end':
          return 'flex-end';
        case 'center':
          return 'center';
        case 'between':
          return 'space-between';
        case 'around':
          return 'space-around';
        case 'evenly':
          return 'space-evenly';
        default:
          return 'flex-start';
      }
    };

    // Get align items value
    const getAlignItems = (): React.CSSProperties['alignItems'] => {
      switch (align) {
        case 'end':
          return 'flex-end';
        case 'center':
          return 'center';
        case 'baseline':
          return 'baseline';
        case 'stretch':
          return 'stretch';
        default:
          return 'flex-start';
      }
    };

    // Get overflow values
    const getOverflowStyles = (): React.CSSProperties => {
      switch (overflow) {
        case 'hidden':
          return { overflow: 'hidden' };
        case 'scroll':
          return { overflow: 'scroll' };
        case 'auto':
          return { overflow: 'auto' };
        case 'x-hidden':
          return { overflowX: 'hidden' };
        case 'y-hidden':
          return { overflowY: 'hidden' };
        case 'x-scroll':
          return { overflowX: 'scroll' };
        case 'y-scroll':
          return { overflowY: 'scroll' };
        case 'x-auto':
          return { overflowX: 'auto' };
        case 'y-auto':
          return { overflowY: 'auto' };
        default:
          return { overflow: 'visible' };
      }
    };

    // Get flex value
    const getFlexValue = (): string | number => {
      switch (flex) {
        case '1':
          return 1;
        case 'auto':
          return 'auto';
        case 'none':
          return 'none';
        default:
          return 'initial';
      }
    };
    // Build box styles
    const boxStyles: React.CSSProperties = {
      position,
      display,
      borderRadius: borderRadiusMap[radius],
      padding: getPadding(),
      fontFamily: typography.fontFamily.sans.join(', '),
      ...getVariantStyles(),
      ...(display === 'flex' || display === 'inline-flex'
        ? {
            flexDirection: getFlexDirection(),
            justifyContent: getJustifyContent(),
            alignItems: getAlignItems(),
            gap: getGapValue(),
            flexWrap: wrap,
            flex: getFlexValue(),
          }
        : {}),
      ...(display === 'grid'
        ? {
            gap: getGapValue(),
          }
        : {}),
      ...getOverflowStyles(),
      ...(w && { width: w }),
      ...(h && { height: h }),
      ...(maxW && { maxWidth: maxW }),
      ...(maxH && { maxHeight: maxH }),
      ...(minW && { minWidth: minW }),
      ...(minH && { minHeight: minH }),
      ...style,
    };

    return (
      <Component ref={ref} className={className} {...props}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
