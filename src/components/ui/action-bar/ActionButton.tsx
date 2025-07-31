/**
 * @fileoverview ActionButton Component v5.0.0 - Token-Based Design System
 * @description Individual action button component following SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils/cn';
import { useTokens } from '../../../hooks/useTokens';
import type { ActionConfig } from './types';

// =============================================================================
// ACTION BUTTON VARIANTS
// =============================================================================

const actionButtonVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium text-sm',
    'border border-transparent',
    'transition-all duration-150 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 px-8',
      },
      shape: {
        square: 'rounded-md',
        circle: 'rounded-full aspect-square',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'square',
    },
  }
);

// =============================================================================
// ACTION BUTTON INTERFACES
// =============================================================================

export interface ActionButtonProps extends 
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
  Pick<ActionConfig, 'icon' | 'label' | 'loading' | 'disabled' | 'variant' | 'size' | 'shape'> {
  readonly showLabel?: boolean;
  readonly tooltipText?: string;
}

// =============================================================================
// ACTION BUTTON COMPONENT
// =============================================================================

/**
 * ActionButton Component
 * Follows SRP by handling only individual button rendering and behavior
 */
export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      icon,
      label,
      loading = false,
      disabled = false,
      variant = 'default',
      size = 'md',
      shape = 'square',
      showLabel = true,
      tooltipText,
      className,
      onClick,
      style,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing } = useTokens();

    // Handle loading state
    const isDisabled = disabled || loading;

    // Get token-based styles for variants
    const getVariantStyles = React.useMemo((): React.CSSProperties => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: colors.primary?.[500] || '#3b82f6',
            color: colors.background?.default || '#ffffff',
            borderColor: colors.primary?.[500] || '#3b82f6',
          };
        case 'destructive':
          return {
            backgroundColor: colors.status?.error || '#ef4444',
            color: colors.background?.default || '#ffffff',
            borderColor: colors.status?.error || '#ef4444',
          };
        case 'success':
          return {
            backgroundColor: colors.status?.success || '#10b981',
            color: colors.background?.default || '#ffffff',
            borderColor: colors.status?.success || '#10b981',
          };
        case 'outline':
          return {
            backgroundColor: 'transparent',
            color: colors.text?.primary || '#111827',
            borderColor: colors.border?.default || '#e2e8f0',
          };
        case 'ghost':
          return {
            backgroundColor: 'transparent',
            color: colors.text?.primary || '#111827',
            border: 'none',
          };
        default:
          return {
            backgroundColor: colors.background?.paper || '#f9fafb',
            color: colors.text?.primary || '#111827',
            borderColor: colors.border?.default || '#e2e8f0',
          };
      }
    }, [variant, colors]);

    // Get size-specific styles
    const getSizeStyles = React.useMemo((): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '32px',
            padding: showLabel ? `0 ${spacing?.[3] || '0.75rem'}` : `${spacing?.[2] || '0.5rem'}`,
            fontSize: '0.75rem',
          };
        case 'lg':
          return {
            height: '40px',
            padding: showLabel ? `0 ${spacing?.[8] || '2rem'}` : `${spacing?.[3] || '0.75rem'}`,
            fontSize: '0.875rem',
          };
        default: // md
          return {
            height: '36px',
            padding: showLabel ? `${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'}` : `${spacing?.[2] || '0.5rem'}`,
            fontSize: '0.875rem',
          };
      }
    }, [size, spacing, showLabel]);

    // Combine dynamic styles
    const dynamicStyles: React.CSSProperties = {
      ...getVariantStyles,
      ...getSizeStyles,
      borderRadius: shape === 'circle' ? '50%' : '0.375rem',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transition: 'all 150ms ease-in-out',
      ...style,
    };

    // Loading spinner styles
    const spinnerStyles = React.useMemo((): React.CSSProperties => ({
      width: '14px',
      height: '14px',
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }), []);

    return (
      <button
        ref={ref}
        className={cn(actionButtonVariants({ variant, size, shape }), className)}
        style={dynamicStyles}
        disabled={isDisabled}
        onClick={onClick}
        title={tooltipText}
        aria-label={ariaLabel || label}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <div style={spinnerStyles} aria-hidden="true" />
            {showLabel && <span style={{ visibility: 'hidden' }}>{label}</span>}
          </>
        ) : (
          <>
            {icon && (
              <span 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  marginRight: showLabel ? spacing?.[2] || '0.5rem' : 0,
                }}
              >
                {icon}
              </span>
            )}
            {showLabel && label && <span>{label}</span>}
          </>
        )}
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

// Export variants type for external usage
export type ActionButtonVariant = VariantProps<typeof actionButtonVariants>;