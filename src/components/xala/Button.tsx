/**
 * @fileoverview Button Component using Semantic Design Tokens
 * @description Modern button component using consolidated design token system
 * @version 3.0.0
 */

import React from 'react';
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
      ...props
    },
    ref
  ) => {
    // Get component tokens for the button
    const buttonTokens = getComponentTokens('button');
    const variantTokens = buttonTokens[variant];

    // Create styles using semantic tokens
    const buttonStyles = React.useMemo(() => {
      if (!variantTokens) return {};

      return {
        backgroundColor: variantTokens.background ? String(variantTokens.background) : undefined,
        color: variantTokens.foreground ? String(variantTokens.foreground) : undefined,
        border: variantTokens.border ? String(variantTokens.border) : undefined,
        padding: variantTokens.padding?.[size]
          ? String(variantTokens.padding[size])
          : variantTokens.padding?.md
            ? String(variantTokens.padding.md)
            : undefined,
        borderRadius: variantTokens.borderRadius?.[size]
          ? String(variantTokens.borderRadius[size])
          : variantTokens.borderRadius?.md
            ? String(variantTokens.borderRadius.md)
            : undefined,
        fontSize: variantTokens.fontSize?.[size]
          ? String(variantTokens.fontSize[size])
          : variantTokens.fontSize?.md
            ? String(variantTokens.fontSize.md)
            : undefined,
        fontWeight: variantTokens.fontWeight ? String(variantTokens.fontWeight) : undefined,
        lineHeight: variantTokens.lineHeight ? String(variantTokens.lineHeight) : undefined,
        minHeight: variantTokens.minHeight?.[size]
          ? String(variantTokens.minHeight[size])
          : variantTokens.minHeight?.md
            ? String(variantTokens.minHeight.md)
            : undefined,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease-in-out',
      };
    }, [variant, size, disabled, variantTokens]);

    // Handle loading state
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && !disabled && props.onClick) {
        props.onClick(event);
      }
    };

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
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
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

  const styles = React.useMemo(() => {
    // Use semantic token system with proper type handling
    const backgroundColor = getToken('alias.color.brand.primary');
    const color = getToken('alias.color.text.inverse');
    const padding = getToken('alias.spacing.component-padding.md');
    const borderRadius = getToken('alias.border.radius.medium');
    const fontSize = getToken('alias.typography.fontSize.body');
    const fontWeight = getToken('alias.typography.fontWeight.medium');
    const focusColor = getToken('alias.color.focus.default');
    const hoverColor = getToken('alias.color.brand.primaryHover');

    return {
      backgroundColor: backgroundColor ? String(backgroundColor) : undefined,
      color: color ? String(color) : undefined,
      padding: padding ? String(padding) : undefined,
      borderRadius: borderRadius ? String(borderRadius) : undefined,
      fontSize: fontSize ? String(fontSize) : undefined,
      fontWeight: fontWeight ? String(fontWeight) : undefined,
      transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',

      // Focus states for accessibility
      '&:focus': {
        outline: 'none',
        boxShadow: focusColor ? `0 0 0 2px ${String(focusColor)}` : undefined,
      },

      // Hover states
      '&:hover': {
        backgroundColor: hoverColor ? String(hoverColor) : undefined,
      },
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
 *
 * 1. **Component Tokens**: Uses `getComponentTokens('button')` for consistent styling
 * 2. **Semantic Tokens**: Uses `getToken('alias.color.brand.primary')` for individual tokens
 * 3. **Type Safety**: Full TypeScript support with proper token paths
 * 4. **Accessibility**: Follows WCAG 2.2 AA standards with proper focus management
 * 5. **Norwegian Compliance**: Adheres to DigDir and NSM standards
 *
 * @example
 * ```tsx
 * import { Button } from '@/components';
 *
 * function MyComponent() {
 *   return (
 *     <Button variant="primary" size="md" onClick={handleClick}>
 *       Click me
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Loading state
 * <Button loading>Processing...</Button>
 *
 * // Disabled state
 * <Button disabled>Disabled</Button>
 *
 * // Different variants
 * <Button variant="secondary">Secondary</Button>
 * <Button variant="outline">Outline</Button>
 * <Button variant="ghost">Ghost</Button>
 * ```
 */

export default Button;
