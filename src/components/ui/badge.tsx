/**
 * @fileoverview SSR-Safe Badge Component - Production Strategy Implementation
 * @description Badge component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Badge variant types
 */
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';

/**
 * Badge size types
 */
export type BadgeSize = 'default' | 'sm' | 'lg';

/**
 * Badge component props interface
 */
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children?: React.ReactNode;
}

/**
 * Badge component
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'default', className, style, children, ...props }, ref) => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Get additional tokens with fallbacks
    const borderRadius = {
      full: (getToken('borderRadius.full') as string) || '9999px',
    };
    
    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            paddingLeft: spacing[2],
            paddingRight: spacing[2],
            paddingTop: '2px',
            paddingBottom: '2px',
            fontSize: typography.fontSize.xs,
          };
        case 'lg':
          return {
            paddingLeft: spacing[3],
            paddingRight: spacing[3],
            paddingTop: spacing[1],
            paddingBottom: spacing[1],
            fontSize: typography.fontSize.sm,
          };
        default:
          return {
            paddingLeft: '10px', // ~2.5 in spacing
            paddingRight: '10px',
            paddingTop: '2px',
            paddingBottom: '2px',
            fontSize: typography.fontSize.xs,
          };
      }
    };
    
    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const baseStyles = {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'transparent',
      };
      
      switch (variant) {
        case 'secondary':
          return {
            ...baseStyles,
            backgroundColor: colors.secondary?.[100] || '#e9d5ff',
            color: colors.secondary?.[900] || '#581c87',
          };
        case 'destructive':
          return {
            ...baseStyles,
            backgroundColor: colors.danger?.[500] || '#ef4444',
            color: colors.background?.default || '#ffffff',
          };
        case 'outline':
          return {
            ...baseStyles,
            backgroundColor: 'transparent',
            borderColor: colors.border?.default || colors.neutral?.[200],
            color: colors.text?.primary || colors.neutral?.[900],
          };
        case 'success':
          return {
            ...baseStyles,
            backgroundColor: colors.success?.[500] || '#22c55e',
            color: colors.background?.default || '#ffffff',
          };
        case 'warning':
          return {
            ...baseStyles,
            backgroundColor: colors.warning?.[500] || '#f59e0b',
            color: colors.background?.default || '#ffffff',
          };
        case 'info':
          return {
            ...baseStyles,
            backgroundColor: colors.info?.[500] || '#3b82f6',
            color: colors.background?.default || '#ffffff',
          };
        default:
          return {
            ...baseStyles,
            backgroundColor: colors.primary?.[500] || '#3b82f6',
            color: colors.background?.default || '#ffffff',
          };
      }
    };
    
    const badgeStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: borderRadius.full,
      fontFamily: typography.fontFamily.sans.join(', '),
      fontWeight: typography.fontWeight.semibold,
      lineHeight: 1,
      transition: 'all 0.2s ease-in-out',
      cursor: 'default',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...style,
    };
    
    return (
      <div ref={ref} className={className} style={badgeStyles} {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = 'Badge';