/**
 * @fileoverview Button Component v5.0.0 - Token-Based Design System
 * @description Modern Button component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// BUTTON VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Button variants using token-based styling
 * Combines CVA with runtime token access for maximum flexibility
 */
const buttonVariants = cva(
  // Base classes - framework-agnostic styling
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-150 ease-in-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: '',
        secondary: '',
        outline: '',
        ghost: '',
        destructive: '',
        success: '',
        warning: '',
        link: 'underline-offset-4 hover:underline',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        icon: '',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

// =============================================================================
// BUTTON COMPONENT INTERFACE
// =============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly loading?: boolean;
  readonly loadingText?: string;
  readonly icon?: React.ReactNode;
  readonly iconPosition?: 'left' | 'right';
  readonly asChild?: boolean;
}

// =============================================================================
// LOADING SPINNER COMPONENT
// =============================================================================

const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon' }> = ({ 
  size = 'md' 
}) => {
  const spinnerSize = {
    sm: '14px',
    md: '16px', 
    lg: '18px',
    xl: '20px',
    icon: '16px',
  }[size];

  return (
    <div
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: '2px solid transparent',
        borderTop: '2px solid currentColor',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
      aria-hidden="true"
    />
  );
};

// =============================================================================
// BUTTON COMPONENT
// =============================================================================

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    loadingText,
    icon,
    iconPosition = 'left',
    disabled,
    children,
    style,
    ...props
  }, ref) => {
    // ✅ Access design tokens for complete styling control
    const { colors, spacing, typography, getToken } = useTokens();
    
    const isDisabled = disabled || loading;
    
    // Get token-based styles for variant
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
            backgroundColor: colors.secondary?.[100] || '#f3f4f6',
            color: colors.secondary?.[900] || '#111827',
            border: `1px solid ${colors.secondary?.[300] || '#d1d5db'}`,
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
            color: colors.text?.primary || '#111827',
            border: 'none',
          };
        case 'destructive':
          return {
            backgroundColor: colors.status?.error || '#ef4444',
            color: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.status?.error || '#ef4444'}`,
          };
        case 'success':
          return {
            backgroundColor: colors.status?.success || '#10b981',
            color: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.status?.success || '#10b981'}`,
          };
        case 'warning':
          return {
            backgroundColor: colors.status?.warning || '#f59e0b',
            color: colors.background?.default || '#ffffff',
            border: `1px solid ${colors.status?.warning || '#f59e0b'}`,
          };
        case 'link':
          return {
            backgroundColor: 'transparent',
            color: colors.primary?.[500] || '#3b82f6',
            border: 'none',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          };
        default:
          return {};
      }
    };

    // Get token-based styles for size
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '36px',
            padding: `0 ${spacing?.[3] || '0.75rem'}`,
            fontSize: typography?.fontSize?.sm || '0.875rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        case 'md':
          return {
            height: '40px',
            padding: `${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'}`,
            fontSize: typography?.fontSize?.base || '1rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        case 'lg':
          return {
            height: '44px',
            padding: `0 ${spacing?.[8] || '2rem'}`,
            fontSize: typography?.fontSize?.base || '1rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        case 'xl':
          return {
            height: '48px',
            padding: `0 ${spacing?.[12] || '3rem'}`,
            fontSize: typography?.fontSize?.lg || '1.125rem',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        case 'icon':
          return {
            height: '40px',
            width: '40px',
            padding: '0',
            borderRadius: getToken('borderRadius.md') as string || '0.375rem',
          };
        default:
          return {};
      }
    };
    
    // Base styles from tokens
    const baseStyles: React.CSSProperties = {
      // Reset
      outline: 'none',
      border: 'none',
      margin: 0,
      textDecoration: 'none',
      appearance: 'none',
      
      // Layout
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing?.[2] || '0.5rem',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: fullWidth ? '100%' : 'auto',
      
      // Typography
      fontFamily: typography?.fontFamily?.sans?.join(', ') || '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: typography?.fontWeight?.medium || 500,
      lineHeight: typography?.lineHeight?.normal || 1.5,
      
      // Interaction
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled && !loading ? 0.5 : 1,
      userSelect: 'none',
      
      // Transitions
      transition: 'all 150ms ease-in-out',
    };

    // Combine all styles
    const dynamicStyles: React.CSSProperties = {
      ...baseStyles,
      ...getVariantStyles(),
      ...getSizeStyles(),
      ...style,
    };

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner size={size || undefined} />
            <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
              {loadingText || children}
            </span>
          </>
        );
      }

      if (icon && iconPosition === 'left') {
        return (
          <>
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
            <span>{children}</span>
          </>
        );
      }

      if (icon && iconPosition === 'right') {
        return (
          <>
            <span>{children}</span>
            <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
          </>
        );
      }

      return children;
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isDisabled}
        style={dynamicStyles}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';
