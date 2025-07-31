/**
 * @fileoverview SSR-Safe Button Component - Production Strategy Implementation
 * @description Button component using useTokens hook for JSON template integration
 * @version 4.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { useTokens } from '../../hooks/useTokens';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  className,
  style,
  ...props
}) => {
  // ✅ Hook safely accesses tokens through app-owned context
  const { colors, spacing, typography, getToken } = useTokens();

  // Get additional tokens with fallbacks
  const borderRadius = {
    md: (getToken('borderRadius.md') as string) || '0.375rem',
  };
  const motion = {
    duration: {
      normal: (getToken('motion.duration.normal') as string) || '150ms',
    },
    easing: {
      easeInOut: (getToken('motion.easing.easeInOut') as string) || 'ease-in-out',
    },
  };

  // ✅ All styling comes from JSON templates (no hard-coded values)
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.primary?.[500] || '#3b82f6',
          color: colors.background?.default || '#ffffff',
          border: `1px solid ${colors.primary?.[500] || '#3b82f6'}`,
        };
      case 'secondary':
        return {
          backgroundColor: colors.secondary?.[100] || '#e9d5ff',
          color: colors.secondary?.[900] || '#581c87',
          border: `1px solid ${colors.secondary?.[300] || '#d8b4fe'}`,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colors.primary?.[500] || '#3b82f6',
          border: `1px solid ${colors.primary?.[500] || '#3b82f6'}`,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colors.text?.primary || '#000000',
          border: 'none',
        };
      case 'destructive':
        return {
          backgroundColor: colors.status?.error || '#ef4444',
          color: colors.background?.default || '#ffffff',
          border: `1px solid ${colors.status?.error || '#ef4444'}`,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): React.CSSProperties => {
    switch (size) {
      case 'sm':
        return {
          padding: `${spacing?.[2] || '0.5rem'} ${spacing?.[3] || '0.75rem'}`,
          fontSize: typography?.fontSize?.sm || '0.875rem',
          minHeight: '32px',
        };
      case 'md':
        return {
          padding: `${spacing?.[3] || '0.75rem'} ${spacing?.[4] || '1rem'}`,
          fontSize: typography?.fontSize?.base || '1rem',
          minHeight: '40px',
        };
      case 'lg':
        return {
          padding: `${spacing?.[4] || '1rem'} ${spacing?.[6] || '1.5rem'}`,
          fontSize: typography?.fontSize?.lg || '1.125rem',
          minHeight: '48px',
        };
      default:
        return {};
    }
  };

  const baseStyles: React.CSSProperties = {
    // Reset default button styles
    outline: 'none',
    border: 'none',
    margin: 0,
    textDecoration: 'none',
    appearance: 'none',
    background: 'none',

    // Layout
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',

    // Typography from JSON templates
    fontFamily: typography?.fontFamily?.sans?.join(', ') || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: typography?.fontWeight?.medium || 500,
    lineHeight: typography?.lineHeight?.normal || 1.5,

    // Spacing and layout from JSON templates
    borderRadius: borderRadius.md,

    // Transitions from JSON templates
    transition: `all ${motion.duration.normal} ${motion.easing.easeInOut}`,

    // States
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    userSelect: 'none',

    // Focus handling (removed pseudo-selector for SSR compatibility)
  };

  const loadingStyles: React.CSSProperties = loading
    ? {
        color: 'transparent',
        pointerEvents: 'none',
      }
    : {};

  const combinedStyles: React.CSSProperties = {
    ...baseStyles,
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...loadingStyles,
    ...style,
  };

  return (
    <button
      type={type}
      className={className}
      style={combinedStyles}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px',
            height: size === 'sm' ? '16px' : size === 'lg' ? '24px' : '20px',
            border: '2px solid transparent',
            borderTop: `2px solid ${variant === 'outline' || variant === 'ghost' ? (colors.primary?.[500] || '#3b82f6') : (colors.background?.default || '#ffffff')}`,
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
};
