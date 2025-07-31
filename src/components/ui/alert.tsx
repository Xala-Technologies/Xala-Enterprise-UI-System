/**
 * @fileoverview SSR-Safe Alert Component - Production Strategy Implementation
 * @description Alert component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * Alert variant types
 */
export type AlertVariant = 'default' | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Alert component props interface
 */
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  children?: React.ReactNode;
}

/**
 * Alert component
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', className, style, children, ...props }, ref) => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Get additional tokens with fallbacks
    const borderRadius = {
      lg: (getToken('borderRadius.lg') as string) || '0.5rem',
    };
    
    const getVariantStyles = (): React.CSSProperties => {
      const baseStyles = {
        backgroundColor: colors?.background?.paper || '#f8f9fa',
        borderWidth: '1px',
        borderStyle: 'solid',
      };
      
      switch (variant) {
        case 'destructive':
          return {
            ...baseStyles,
            borderColor: colors.status?.error || colors.danger?.[500] || '#ef4444',
            color: colors.status?.error || colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            ...baseStyles,
            borderColor: colors.status?.success || colors.success?.[500] || '#22c55e',
            color: colors.status?.success || colors.success?.[500] || '#22c55e',
          };
        case 'warning':
          return {
            ...baseStyles,
            borderColor: colors.status?.warning || colors.warning?.[500] || '#f59e0b',
            color: colors.status?.warning || colors.warning?.[500] || '#f59e0b',
          };
        case 'info':
          return {
            ...baseStyles,
            borderColor: colors.status?.info || colors.info?.[500] || '#3b82f6',
            color: colors.status?.info || colors.info?.[500] || '#3b82f6',
          };
        default:
          return {
            ...baseStyles,
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
      }
    };
    
    const alertStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      fontFamily: typography.fontFamily.sans.join(', '),
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.normal,
      ...getVariantStyles(),
      ...style,
    };
    
    return (
      <div ref={ref} role="alert" className={className} style={alertStyles} {...props}>
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Alert Title component props interface
 */
export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

/**
 * Alert Title component
 */
export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, style, children, ...props }, ref) => {
    const { spacing, typography } = useTokens();
    
    const titleStyles: React.CSSProperties = {
      marginBottom: spacing[1],
      fontFamily: typography.fontFamily.sans.join(', '),
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: '0.025em',
      color: 'currentColor',
      ...style,
    };
    
    return (
      <h5 ref={ref} className={className} style={titleStyles} {...props}>
        {children}
      </h5>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

/**
 * Alert Description component props interface
 */
export interface AlertDescriptionProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Alert Description component
 */
export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, style, children, ...props }, ref) => {
    const { typography } = useTokens();
    
    const descriptionStyles: React.CSSProperties = {
      fontFamily: typography.fontFamily.sans.join(', '),
      fontSize: typography.fontSize.sm,
      lineHeight: typography.lineHeight.relaxed,
      color: 'currentColor',
      opacity: 0.9,
      ...style,
    };
    
    return (
      <div ref={ref} className={className} style={descriptionStyles} {...props}>
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

/**
 * Alert Icon wrapper for proper positioning
 */
export interface AlertIconProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const AlertIcon: React.FC<AlertIconProps> = ({ style, children, ...props }) => {
  const { spacing } = useTokens();
  
  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    left: spacing[4],
    top: spacing[4],
    color: 'currentColor',
    ...style,
  };
  
  return (
    <div style={iconStyles} {...props}>
      {children}
    </div>
  );
};

/**
 * Alert Content wrapper for icon offset
 */
export interface AlertContentProps extends HTMLAttributes<HTMLDivElement> {
  hasIcon?: boolean;
  children?: React.ReactNode;
}

export const AlertContent: React.FC<AlertContentProps> = ({ hasIcon = false, style, children, ...props }) => {
  const { spacing } = useTokens();
  
  const contentStyles: React.CSSProperties = {
    paddingLeft: hasIcon ? `calc(${spacing[4]} + ${spacing[6]})` : undefined,
    ...style,
  };
  
  return (
    <div style={contentStyles} {...props}>
      {children}
    </div>
  );
};