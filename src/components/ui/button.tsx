/**
 * @fileoverview Button Component v5.0.0 - Semantic Component Migration
 * @description Modern Button component using semantic components with i18n support
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Semantic components, i18n
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Text } from '../semantic';
import { useTranslation } from '../../i18n';

// =============================================================================
// BUTTON VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Button variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const buttonVariants = cva(
  // Base classes using semantic tokens
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        success: 'bg-success text-success-foreground hover:bg-success/90',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        xl: 'h-12 px-12 text-base',
        icon: 'h-10 w-10',
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
  const spinnerSizeClass = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4', 
    lg: 'h-4.5 w-4.5',
    xl: 'h-5 w-5',
    icon: 'h-4 w-4',
  }[size];

  return (
    <Text
      as="div"
      className={cn(
        'animate-spin rounded-full border-2 border-transparent border-t-current',
        spinnerSizeClass
      )}
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
    ...props
  }, ref) => {
    const { t } = useTranslation();
    const isDisabled = disabled || loading;

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner size={size || undefined} />
            <Text 
              as="span" 
              className={loading ? 'sr-only' : undefined}
            >
              {loadingText || t('components.button.loading')}
            </Text>
          </>
        );
      }

      if (icon && iconPosition === 'left') {
        return (
          <>
            <Text as="span" className="flex items-center">{icon}</Text>
            <Text as="span">{children}</Text>
          </>
        );
      }

      if (icon && iconPosition === 'right') {
        return (
          <>
            <Text as="span">{children}</Text>
            <Text as="span" className="flex items-center">{icon}</Text>
          </>
        );
      }

      return children;
    };

    return (
      <Text
        as="button"
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {renderContent()}
      </Text>
    );
  }
);

Button.displayName = 'Button';

// Migration note: This component now uses semantic Text component instead of raw HTML
// and includes i18n support for loading text
