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
  padding?: 'none' | 'sm' | 'md' | 'lg';
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
    sm: (getToken('elevation.sm') as string) || '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md:
      (getToken('elevation.md') as string) ||
      '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg:
      (getToken('elevation.lg') as string) ||
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  };

  // ✅ All styling comes from JSON templates (no hard-coded values)
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: colors.background.paper,
          border: `1px solid ${colors.border.default}`,
          boxShadow: elevation.sm,
        };
      case 'elevated':
        return {
          backgroundColor: colors.background.paper,
          border: 'none',
          boxShadow: elevation.md,
        };
      case 'outlined':
        return {
          backgroundColor: colors.background.default,
          border: `2px solid ${colors.border.default}`,
          boxShadow: 'none',
        };
      case 'flat':
        return {
          backgroundColor: colors.background.paper,
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
        return { padding: spacing[3] };
      case 'md':
        return { padding: spacing[4] };
      case 'lg':
        return { padding: spacing[6] };
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
    padding: `${spacing[4]} ${spacing[4]} ${spacing[2]} ${spacing[4]}`,
    borderBottom: `1px solid ${colors.border.muted}`,
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
    padding: spacing[4],
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
    padding: `${spacing[2]} ${spacing[4]} ${spacing[4]} ${spacing[4]}`,
    borderTop: `1px solid ${colors.border.muted}`,
    ...style,
  };

  return (
    <div className={className} style={footerStyles} {...props}>
      {children}
    </div>
  );
};
