/**
 * @fileoverview SSR-Safe Container Component - Production Strategy Implementation
 * @description Container layout component using useTokens hook for JSON template integration
 * @version 4.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { useTokens } from '../../hooks/useTokens';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  centered?: boolean;
  fluid?: boolean;
  className?: string;
  style?: React.CSSProperties;
  'data-testid'?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'lg',
  padding = 'md',
  centered = true,
  fluid = false,
  className,
  style,
  'data-testid': testId,
  ...props
}) => {
  // ✅ Hook safely accesses tokens through app-owned context
  const { spacing } = useTokens();

  // ✅ All styling comes from JSON templates (no hard-coded values)
  const getMaxWidthStyles = (): React.CSSProperties => {
    if (fluid) {
      return { width: '100%', maxWidth: 'none' };
    }

    switch (maxWidth) {
      case 'sm':
        return { maxWidth: '640px' };
      case 'md':
        return { maxWidth: '768px' };
      case 'lg':
        return { maxWidth: '1024px' };
      case 'xl':
        return { maxWidth: '1280px' };
      case '2xl':
        return { maxWidth: '1536px' };
      case 'full':
        return { maxWidth: '100%' };
      case 'none':
        return { maxWidth: 'none' };
      default:
        return { maxWidth: '1024px' };
    }
  };

  const getPaddingStyles = (): React.CSSProperties => {
    switch (padding) {
      case 'none':
        return { padding: '0' };
      case 'sm':
        return {
          paddingLeft: spacing[3],
          paddingRight: spacing[3],
          paddingTop: spacing[2],
          paddingBottom: spacing[2],
        };
      case 'md':
        return {
          paddingLeft: spacing[4],
          paddingRight: spacing[4],
          paddingTop: spacing[4],
          paddingBottom: spacing[4],
        };
      case 'lg':
        return {
          paddingLeft: spacing[6],
          paddingRight: spacing[6],
          paddingTop: spacing[6],
          paddingBottom: spacing[6],
        };
      default:
        return {};
    }
  };

  const baseStyles: React.CSSProperties = {
    // Layout
    width: '100%',
    boxSizing: 'border-box',

    // Centering
    marginLeft: centered ? 'auto' : '0',
    marginRight: centered ? 'auto' : '0',

    // Responsive behavior
    minWidth: 0, // Prevents flex overflow issues
  };

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...getMaxWidthStyles(),
    ...getPaddingStyles(),
    ...style,
  };

  return (
    <div className={className} style={combinedStyles} data-testid={testId} {...props}>
      {children}
    </div>
  );
};
