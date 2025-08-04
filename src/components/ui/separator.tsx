/**
 * @fileoverview SSR-Safe Separator Component - Production Strategy Implementation
 * @description Separator component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { Box } from '../semantic';

/**
 * Separator orientation types
 */
export type SeparatorOrientation = 'horizontal' | 'vertical';

/**
 * Separator variant types
 */
export type SeparatorVariant = 'default' | 'muted' | 'accent' | 'destructive';

/**
 * Separator size types
 */
export type SeparatorSize = 'sm' | 'md' | 'lg';

/**
 * Separator spacing types
 */
export type SeparatorSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Label position types
 */
export type LabelPosition = 'start' | 'center' | 'end';

/**
 * Separator Props interface
 */
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Separator orientation */
  orientation?: SeparatorOrientation;
  /** Separator color variant */
  variant?: SeparatorVariant;
  /** Separator thickness */
  size?: SeparatorSize;
  /** Spacing around separator */
  spacing?: SeparatorSpacing;
  /** Decorative separator (no semantic meaning) */
  decorative?: boolean;
  /** Label text for the separator */
  label?: string;
  /** Position of the label */
  labelPosition?: LabelPosition;
}

/**
 * Separator component
 */
export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      size = 'md',
      spacing = 'none',
      decorative = true,
      label,
      labelPosition = 'center',
      className,
      style,
      ...props
    },
    ref
  ) => {
        
    // Get variant color
    const getVariantColor = (): string => {
      switch (variant) {
        case 'muted':
          return colors.background?.subtle || colors.neutral?.[100] || '#f3f4f6';
        case 'accent':
          return colors.accent?.[500] || colors.primary?.[500] || '#3b82f6';
        case 'destructive':
          return `rgba(${hexToRgb(colors.danger?.[500] || '#ef4444')}, 0.2)`;
        default:
          return colors.border?.default || colors.neutral?.[200] || '#e5e7eb';
      }
    };
    
    // Get size value
    const getSize = (): string => {
      switch (size) {
        case 'sm':
          return '0.5px';
        case 'lg':
          return '2px';
        default:
          return '1px';
      }
    };
    
    // Get spacing value
    const getSpacingValue = (): string => {
      switch (spacing) {
        case 'sm':
          return spacingTokens[2];
        case 'md':
          return spacingTokens[4];
        case 'lg':
          return spacingTokens[6];
        case 'xl':
          return spacingTokens[8];
        default:
          return '0';
      }
    };
    
    // Base separator styles
    const separatorStyles: React.CSSProperties = {
      flexShrink: 0,
      backgroundColor: getVariantColor(),
      ...(orientation === 'horizontal' ? {
        width: '100%',
        height: getSize(),
        marginTop: getSpacingValue(),
        marginBottom: getSpacingValue(),
      } : {
        height: '100%',
        width: getSize(),
        marginLeft: getSpacingValue(),
        marginRight: getSpacingValue(),
      }),
    };
    // If there's a label, render with label wrapper
    if (label && orientation === 'horizontal') {
      const containerStyles: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop: getSpacingValue(),
        marginBottom: getSpacingValue(),
      };
      
      const labelStyles: React.CSSProperties = {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.sans.join(', '),
        color: colors.text?.secondary || colors.neutral?.[500],
        backgroundColor: colors.background?.default || '#ffffff',
        paddingLeft: spacingTokens[3],
        paddingRight: spacingTokens[3],
      };
      
      const lineStyles: React.CSSProperties = {
        flex: 1,
        height: getSize(),
        backgroundColor: getVariantColor(),
      };
      
      return (
        <Box
          ref={ref}
          className={className}
         
          {...props}
        >
          {labelPosition !== 'start' && (
            <Box
             
              role={decorative ? 'presentation' : 'separator'}
              aria-orientation={orientation}
            />
          )}

          <Text as="span">
            {label}
          </Text>

          {labelPosition !== 'end' && (
            <Box
             
              role={decorative ? 'presentation' : 'separator'}
              aria-orientation={orientation}
            />
          )}
        </Box>
      );
    }

    // Basic separator without label
    return (
      <Box
        ref={ref}
        className={className}
       
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

/**
 * Helper function to convert hex to RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}
