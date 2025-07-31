/**
 * @fileoverview SSR-Safe Card Component - Production Strategy Implementation
 * @description Card component using useTokens hook for JSON template integration
 * @version 4.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { useTokens } from '../../hooks/useTokens';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  'data-testid'?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  style,
  onClick,
  'data-testid': testId,
  ...props
}) => {
  // ✅ Hook safely accesses tokens through app-owned context
  const { colors, spacing, getToken } = useTokens();

  // Get additional tokens with fallbacks
  const borderRadius = {
    lg: (getToken('borderRadius.lg') as string) || '0.5rem',
  };
  const elevation = {
    sm: (getToken('elevation.sm') as string) || 'var(--shadow-sm)',
    md: (getToken('elevation.md') as string) || 'var(--shadow)',
    lg: (getToken('elevation.lg') as string) || 'var(--shadow-lg)',
  };

  // ✅ All styling comes from JSON templates (no hard-coded values)
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: colors.background?.paper || '#f8f9fa',
          border: `1px solid ${colors.border?.default || '#e5e7eb'}`,
          boxShadow: elevation.sm,
        };
      case 'elevated':
        return {
          backgroundColor: colors.background?.paper || '#f8f9fa',
          border: 'none',
          boxShadow: elevation.md,
        };
      case 'outlined':
        return {
          backgroundColor: colors.background?.default || '#ffffff',
          border: `2px solid ${colors.border?.default || '#e5e7eb'}`,
          boxShadow: 'none',
        };
      case 'flat':
        return {
          backgroundColor: colors.background?.paper || '#f8f9fa',
          border: 'none',
          boxShadow: 'none',
        };
      default:
        return {};
    }
  };

  const getPaddingStyles = (): React.CSSProperties => {
    switch (padding) {
      case 'none':
        return { padding: '0' };
      case 'sm':
        return { padding: spacing?.[3] || '0.75rem' };
      case 'md':
        return { padding: spacing?.[4] || '1rem' };
      case 'lg':
        return { padding: spacing?.[6] || '1.5rem' };
      case 'xl':
        return { padding: spacing?.[8] || '2rem' };
      default:
        return {};
    }
  };

  const baseStyles: React.CSSProperties = {
    // Layout
    display: 'block',
    position: 'relative',

    // Border radius from JSON templates
    borderRadius: borderRadius.lg,

    // Interactive styles (if clickable)
    cursor: onClick ? 'pointer' : 'default',

    // Smooth transitions
    transition: 'box-shadow 0.2s ease-in-out, transform 0.1s ease-in-out',
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getPaddingStyles(),
    ...style,
  };

  return (
    <div
      className={className}
      style={combinedStyles}
      onClick={onClick}
      data-testid={testId}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header component
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, style, ...props }) => {
  const { spacing, colors } = useTokens();

  const headerStyles: React.CSSProperties = {
    padding: `${spacing?.[4] || '1rem'} ${spacing?.[4] || '1rem'} ${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'}`,
    borderBottom: `1px solid ${colors.border?.muted || '#e5e7eb'}`,
    ...style,
  };

  return (
    <div className={className} style={headerStyles} {...props}>
      {children}
    </div>
  );
};

// Card Content component
export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  style,
  ...props
}) => {
  const { spacing } = useTokens();

  const contentStyles: React.CSSProperties = {
    padding: spacing?.[4] || '1rem',
    ...style,
  };

  return (
    <div className={className} style={contentStyles} {...props}>
      {children}
    </div>
  );
};

// Card Footer component
export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, style, ...props }) => {
  const { spacing, colors } = useTokens();

  const footerStyles: React.CSSProperties = {
    padding: `${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'} ${spacing?.[4] || '1rem'} ${spacing?.[4] || '1rem'}`,
    borderTop: `1px solid ${colors.border?.muted || '#e5e7eb'}`,
    ...style,
  };

  return (
    <div className={className} style={footerStyles} {...props}>
      {children}
    </div>
  );
};
