/**
 * @fileoverview Enhanced Button Component v5.0.0 - CVA Pattern
 * @description Production-ready button component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance CVA-based, SSR-Safe, No hooks, Semantic tokens, WCAG 2.2 AAA
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

// =============================================================================
// THEME-AWARE BUTTON VARIANTS
// =============================================================================

/**
 * Enhanced button variants using semantic tokens - CVA pattern
 */
const enhancedButtonVariants = cva(
  // Base classes using semantic tokens
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        elevated: 'bg-card text-card-foreground border border-border shadow-lg hover:shadow-xl hover:bg-accent/50',
        success: 'bg-success text-success-foreground hover:bg-success/90 shadow-sm hover:shadow-md',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90 shadow-sm hover:shadow-md',
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
      loading: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Enhanced button component props using CVA pattern
 */
export interface EnhancedButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof enhancedButtonVariants> {
  /** Button loading state */
  readonly loading?: boolean;
  
  /** Loading text */
  readonly loadingText?: string;
  
  /** Left icon */
  readonly leftIcon?: React.ReactNode;
  
  /** Right icon */
  readonly rightIcon?: React.ReactNode;
  
  /** Button as a link */
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
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-transparent border-t-current',
        spinnerSizeClass
      )}
      aria-hidden="true"
    />
  );
};

// =============================================================================
// ENHANCED BUTTON COMPONENT
// =============================================================================

/**
 * Enhanced button component using CVA pattern
 */
export const EnhancedButton = forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    loadingText,
    leftIcon,
    rightIcon,
    disabled,
    children,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <LoadingSpinner size={size || undefined} />
            <span className={loading ? 'sr-only' : undefined}>
              {loadingText || children}
            </span>
          </>
        );
      }

      if (leftIcon) {
        return (
          <>
            <span className="flex items-center">{leftIcon}</span>
            <span>{children}</span>
          </>
        );
      }

      if (rightIcon) {
        return (
          <>
            <span>{children}</span>
            <span className="flex items-center">{rightIcon}</span>
          </>
        );
      }

      return children;
    };

    return (
      <button
        className={cn(enhancedButtonVariants({ variant, size, fullWidth, loading }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

EnhancedButton.displayName = 'EnhancedButton';

// =============================================================================
// BUTTON GROUP COMPONENT
// =============================================================================

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
  readonly orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex gap-2',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          className
        )}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

// Backward compatibility export
export const ThemeAwareButton = EnhancedButton;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type EnhancedButtonVariant = VariantProps<typeof enhancedButtonVariants>;
export { enhancedButtonVariants };

// Backward compatibility exports
export type ThemeAwareButtonProps = EnhancedButtonProps;
export type ThemeAwareButtonVariant = EnhancedButtonVariant;
export const themeAwareButtonVariants = enhancedButtonVariants;