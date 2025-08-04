/**
 * @fileoverview SSR-Safe Divider Component - Production Strategy Implementation
 * @description Divider component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { Box } from '../semantic';

/**
 * Divider orientation types
 */
export type DividerOrientation = 'horizontal' | 'vertical';

/**
 * Divider variant types
 */
export type DividerVariant = 'default' | 'primary' | 'secondary' | 'muted' | 'destructive' | 'success' | 'warning';

/**
 * Divider size types
 */
export type DividerSize = 'sm' | 'default' | 'lg';

/**
 * Divider style types
 */
export type DividerStyle = 'solid' | 'dashed' | 'dotted';

/**
 * Divider spacing types
 */
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Label position types
 */
export type LabelPosition = 'left' | 'center' | 'right';

/**
 * Divider component props interface
 */
export interface DividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Divider orientation */
  orientation?: DividerOrientation;
  /** Divider color variant */
  variant?: DividerVariant;
  /** Divider thickness */
  size?: DividerSize;
  /** Border style */
  borderStyle?: DividerStyle;
  /** Optional label text */
  label?: string;
  /** Label position */
  labelPosition?: LabelPosition;
  /** Spacing around divider */
  spacing?: DividerSpacing;
  /** Whether divider is decorative */
  decorative?: boolean;
}

/**
 * Divider component
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      size = 'default',
      borderStyle = 'solid',
      label,
      labelPosition = 'center',
      spacing = 'md',
      decorative = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
        // Get variant color with opacity
    const getVariantColor = (): string => {
      const opacity = 0.3;
      switch (variant) {
        case 'primary':
          return `rgba(${hexToRgb(colors.primary?.[500] || '#3b82f6')}, ${opacity})`;
        case 'secondary':
          return `rgba(${hexToRgb(colors.secondary?.[500] || '#8b5cf6')}, ${opacity})`;
        case 'muted':
          return `rgba(${hexToRgb(colors.text?.secondary || colors.neutral?.[500] || '#6b7280')}, 0.2)`;
        case 'destructive':
          return `rgba(${hexToRgb(colors.danger?.[500] || '#ef4444')}, ${opacity})`;
        case 'success':
          return `rgba(${hexToRgb(colors.success?.[500] || '#22c55e')}, ${opacity})`;
        case 'warning':
          return `rgba(${hexToRgb(colors.warning?.[500] || '#f59e0b')}, ${opacity})`;
        default:
          return colors.border?.default || colors.neutral?.[200] || '#e5e7eb';
      }
    };
    
    // Get border width based on size
    const getBorderWidth = (): string => {
      switch (size) {
        case 'sm':
          return '0.5px';
        case 'lg':
          return '2px';
        default:
          return '1px';
      }
    };
    
    // Get spacing values
    const getSpacingValue = (): string => {
      switch (spacing) {
        case 'none':
          return '0';
        case 'sm':
          return spacingTokens[2];
        case 'md':
          return spacingTokens[4];
        case 'lg':
          return spacingTokens[6];
        case 'xl':
          return spacingTokens[8];
        default:
          return spacingTokens[4];
      }
    };

    // Base divider styles
    const baseDividerStyles: React.CSSProperties = {
      borderColor: getVariantColor(),
      borderStyle: borderStyle,
      boxSizing: 'border-box',
      display: 'block',
      ...(orientation === 'horizontal' ? {
        width: '100%',
        height: 0,
        borderTopWidth: getBorderWidth(),
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginTop: getSpacingValue(),
        marginBottom: getSpacingValue(),
      } : {
        width: 0,
        height: '100%',
        borderLeftWidth: getBorderWidth(),
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
        marginLeft: getSpacingValue(),
        marginRight: getSpacingValue(),
      }),
    };
    
    // Simple divider without label
    if (!label) {
      return (
        <Box
          ref={ref}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={orientation || undefined}
          className={className}
         
          {...props}
        />
      );
    }

    // Labeled divider (only for horizontal orientation)
    if (orientation === 'vertical') {
      // Labels are not supported with vertical orientation
      return (
        <Box
          ref={ref}
          role={decorative ? 'presentation' : 'separator'}
          aria-orientation={orientation || undefined}
          className={className}
         
          {...props}
        />
      );
    }

    // Container styles for labeled divider
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      marginTop: getSpacingValue(),
      marginBottom: getSpacingValue(),
      width: '100%',
    };
    
    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.sans.join(', '),
      color: colors.text?.secondary || colors.neutral?.[500],
      backgroundColor: colors.background?.default || '#ffffff',
      paddingLeft: spacingTokens[2],
      paddingRight: spacingTokens[2],
      lineHeight: typography.lineHeight.tight,
    };
    
    // Label container styles
    const labelContainerStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: labelPosition,
      paddingLeft: labelPosition === 'center' ? spacingTokens[3] : labelPosition === 'right' ? spacingTokens[3] : 0,
      paddingRight: labelPosition === 'center' ? spacingTokens[3] : labelPosition === 'left' ? spacingTokens[3] : 0,
    };
    
    // Line segment styles
    const lineStyles: React.CSSProperties = {
      flex: 1,
      height: 0,
      borderTopWidth: getBorderWidth(),
      borderTopStyle: borderStyle,
      borderTopColor: getVariantColor(),
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
    };
    
    return (
      <Box
        ref={ref}
        role={decorative ? 'presentation' : 'separator'}
        aria-label={!decorative ? label : undefined}
        className={className}
       
        {...props}
      >
        {/* Left divider line (hidden when label is on the left) */}
        {labelPosition !== 'left' && (
          <Box />
        )}

        {/* Label */}
        <Box>
          <Text as="span">
            {label}
          </Text>
        </Box>

        {/* Right divider line (hidden when label is on the right) */}
        {labelPosition !== 'right' && (
          <Box />
        )}
      </Box>
    );
  }
);

Divider.displayName = 'Divider';

/**
 * Helper function to convert hex to RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}
