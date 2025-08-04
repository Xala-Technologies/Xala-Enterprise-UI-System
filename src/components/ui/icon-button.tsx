/**
 * @fileoverview SSR-Safe IconButton Component - Production Strategy Implementation
 * @description Icon button component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput } from '../semantic';

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
        const isDisabled = disabled || loading;

    // Get border radius
    const borderRadius = {
      md: '0.375rem',
      full: '9999px',
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
          return { borderRadius: '0.375rem' };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'destructive':
          return {
            backgroundColor: '#ef4444',
            color: '#ffffff',
          };
        case 'outline':
          return {
            backgroundColor: '#ffffff',
            border: `1px solid ${'#e5e7eb'}`,
            color: '#111827',
          };
        case 'secondary':
          return {
            backgroundColor: '#f3f4f6',
            color: '#111827',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: '#111827',
          };
        case 'link':
          return {
            backgroundColor: 'transparent',
            color: '#3b82f6',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          };
        default:
          return {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
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
      <Text as="button"
        ref={ref}
        className={className}
       
        aria-label={label}
        title={tooltip || label}
        disabled={isDisabled}
        onMouseEnter={(e) => {
          if (!isDisabled) {
            switch (variant) {
              case 'destructive':
                e.currentTarget.style.backgroundColor = `${'#ef4444'}E6`; // 90% opacity
                break;
              case 'outline':
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#111827';
                break;
              case 'secondary':
                e.currentTarget.style.backgroundColor = `${'#f3f4f6'}CC`; // 80% opacity
                break;
              case 'ghost':
                e.currentTarget.style.backgroundColor = '#f3f4f6';
                e.currentTarget.style.color = '#111827';
                break;
              case 'link':
                e.currentTarget.style.textDecoration = 'underline';
                break;
              default:
                e.currentTarget.style.backgroundColor = `${'#3b82f6'}E6`; // 90% opacity
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
            e.currentTarget.style.outline = `2px solid ${'#3b82f6'}`;
            e.currentTarget.style.outlineOffset = '2px';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
        {...props}
      >
        {loading ? (
          <Box />
        ) : (
          icon
        )}
      </Text>
    );
  }
);

IconButton.displayName = 'IconButton';
