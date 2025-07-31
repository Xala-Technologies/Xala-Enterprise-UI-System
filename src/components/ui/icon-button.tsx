/**
 * @fileoverview SSR-Safe IconButton Component - Production Strategy Implementation
 * @description Icon button component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * IconButton variant types
 */
export type IconButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

/**
 * IconButton size types
 */
export type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * IconButton shape types
 */
export type IconButtonShape = 'square' | 'round';

/**
 * IconButton component props interface
 */
export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: ReactNode;
  readonly label: string;
  readonly loading?: boolean;
  readonly tooltip?: string;
  readonly variant?: IconButtonVariant;
  readonly size?: IconButtonSize;
  readonly shape?: IconButtonShape;
}

/**
 * Enhanced IconButton component with token-based styling
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'md',
      shape = 'square',
      icon,
      label,
      loading = false,
      tooltip,
      disabled,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, getToken } = useTokens();
    const isDisabled = disabled || loading;

    // Get border radius
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return { height: '32px', width: '32px' };
        case 'lg':
          return { height: '40px', width: '40px' };
        case 'xl':
          return { height: '48px', width: '48px' };
        default:
          return { height: '36px', width: '36px' };
      }
    };

    // Shape styles
    const getShapeStyles = (): React.CSSProperties => {
      switch (shape) {
        case 'round':
          return { borderRadius: borderRadius.full };
        default:
          return { borderRadius: borderRadius.md };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'destructive':
          return {
            backgroundColor: colors.danger?.[500] || '#ef4444',
            color: colors.background?.default || '#ffffff',
          };
        case 'outline':
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.border?.default || colors.neutral?.[200] || '#e5e7eb'}`,
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        case 'secondary':
          return {
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
          };
        case 'link':
          return {
            backgroundColor: 'transparent',
            color: colors.primary?.[500] || '#3b82f6',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          };
        default:
          return {
            backgroundColor: colors.primary?.[500] || '#3b82f6',
            color: colors.background?.default || '#ffffff',
          };
      }
    };

    // Base button styles
    const buttonStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      transition: 'all 150ms ease-in-out',
      outline: 'none',
      border: 'none',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      pointerEvents: isDisabled ? 'none' : 'auto',
      opacity: isDisabled ? 0.5 : 1,
      ...getSizeStyles(),
      ...getShapeStyles(),
      ...getVariantStyles(),
      ...style,
    };

    // Loading spinner styles
    const spinnerStyles: React.CSSProperties = {
      height: '16px',
      width: '16px',
      borderRadius: borderRadius.full,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      animation: 'spin 1s linear infinite',
    };

    return (
      <button
        ref={ref}
        className={className}
        style={buttonStyles}
        aria-label={label}
        title={tooltip || label}
        disabled={isDisabled}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            switch (variant) {
              case 'destructive':
                e.currentTarget.style.backgroundColor = `${colors.danger?.[500] || '#ef4444'}E6`; // 90% opacity
                break;
              case 'outline':
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
                break;
              case 'secondary':
                e.currentTarget.style.backgroundColor = `${colors.neutral?.[100] || '#f3f4f6'}CC`; // 80% opacity
                break;
              case 'ghost':
                e.currentTarget.style.backgroundColor = colors.accent?.default || colors.neutral?.[100] || '#f3f4f6';
                e.currentTarget.style.color = colors.accent?.foreground || colors.text?.primary || '#111827';
                break;
              case 'link':
                e.currentTarget.style.textDecoration = 'underline';
                break;
              default:
                e.currentTarget.style.backgroundColor = `${colors.primary?.[500] || '#3b82f6'}E6`; // 90% opacity
                break;
            }
          }
        }}
        onMouseLeave={(e) => {
          if (!isDisabled) {
            const originalStyles = getVariantStyles();
            e.currentTarget.style.backgroundColor = originalStyles.backgroundColor || 'transparent';
            e.currentTarget.style.color = originalStyles.color || 'inherit';
            if (variant !== 'link') {
              e.currentTarget.style.textDecoration = 'none';
            }
          }
        }}
        onFocus={(e) => {
          if (!isDisabled) {
            e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
            e.currentTarget.style.outlineOffset = '2px';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        {...props}
      >
        {loading ? (
          <div style={spinnerStyles} />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
