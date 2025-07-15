/**
 * @fileoverview Button Component using Semantic Design Tokens
 * @description Modern button component using consolidated design token system
 * @version 3.0.0
 */

import * as React from 'react';
import { cn } from '../../lib/utils/cn';
import { getComponentTokens, getToken } from '../../tokens';

// =============================================================================
// TYPES
// =============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      children,
      className,
      onClick,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Handle click events
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
      if (loading || disabled) return;
      onClick?.(e);
    };

    // Generate button styles using design tokens
    const buttonStyles = React.useMemo((): React.CSSProperties => {
      const tokens = getComponentTokens('button');

      return {
        padding: String(tokens[`padding-${size}`] || getToken('spacing.3') || '0.75rem'),
        fontSize: String(tokens[`fontSize-${size}`] || getToken('fontSize.sm') || '0.875rem'),
        borderRadius: String(tokens.borderRadius || getToken('borderRadius.md') || '0.375rem'),
        backgroundColor: String(
          tokens[`bg-${variant}`] || getToken('colors.primary.500') || 'hsl(var(--primary))'
        ),
        color: String(
          tokens[`text-${variant}`] || getToken('colors.white') || 'hsl(var(--primary-foreground))'
        ),
        border:
          variant === 'outline'
            ? `1px solid ${String(getToken('colors.border') || 'hsl(var(--border))')}`
            : 'none',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
      };
    }, [variant, size, loading, disabled]);

    return (
      <button
        ref={ref}
        {...props}
        onClick={handleClick}
        disabled={disabled || loading}
        style={buttonStyles}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-60',
          loading && 'relative',
          className
        )}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

// =============================================================================
// EXAMPLES AND DOCUMENTATION
// =============================================================================

/**
 * Button with semantic token usage example
 */
export const SemanticButton: React.FC<ButtonProps> = props => {
  const { variant = 'primary', size = 'md', className, ...restProps } = props;

  const styles = React.useMemo((): React.CSSProperties => {
    const tokens = getComponentTokens('button');

    return {
      padding: String(tokens[`padding-${size}`] || getToken('spacing.3') || '0.75rem'),
      fontSize: String(tokens[`fontSize-${size}`] || getToken('fontSize.sm') || '0.875rem'),
      borderRadius: String(tokens.borderRadius || getToken('borderRadius.md') || '0.375rem'),
      backgroundColor: String(
        tokens[`bg-${variant}`] || getToken('colors.primary.500') || '#3b82f6'
      ),
      color: String(tokens[`text-${variant}`] || getToken('colors.white') || '#ffffff'),
      transition: 'all 0.15s ease-in-out',
    };
  }, [variant, size]);

  return (
    <button
      {...restProps}
      style={styles}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150',
        'focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
        className
      )}
    />
  );
};

// =============================================================================
// DOCUMENTATION
// =============================================================================

/**
 * Button component documentation
 *
 * This component demonstrates the proper usage of semantic design tokens:
 * - Uses getComponentTokens() for component-specific tokens
 * - Falls back to getToken() for base design tokens
 * - Supports all standard button variants and sizes
 * - Includes loading states and accessibility features
 * - Follows Norwegian government design standards
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" loading={isLoading}>
 *   Save Changes
 * </Button>
 * ```
 */

export default Button;
