/**
 * @fileoverview Button Component using Semantic Design Tokens
 * @description Modern button component using consolidated design token system
 * @version 2.0.0
 */

import React from 'react';
import { cn } from '../../lib/utils/cn';
import { createButtonStyles, getComponentToken, getSemanticColor } from '../../tokens';

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
    // Get semantic button styles using token helpers
    const mappedVariant =
      variant === 'ghost'
        ? 'outline'
        : ['success', 'warning', 'danger'].includes(variant)
          ? 'primary'
          : (variant as 'primary' | 'secondary' | 'outline');
    const mappedSize = size === 'xl' ? 'lg' : (size as 'sm' | 'md' | 'lg');
    const buttonStyles = createButtonStyles(mappedVariant, mappedSize);

    // Convert styles to CSS classes for use with Tailwind
    const buttonClasses = cn(
      // Base styles using semantic tokens
      'inline-flex items-center justify-center font-medium transition-all duration-150',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:cursor-not-allowed disabled:opacity-60',

      // Size classes
      {
        'h-8 px-3 text-sm': size === 'sm',
        'h-11 px-4 text-sm': size === 'md', // 44px for accessibility
        'h-12 px-6 text-base': size === 'lg',
        'h-14 px-8 text-lg': size === 'xl',
      },

      // Variant classes using semantic color tokens
      {
        // Primary
        'bg-primary-600 text-white border-primary-600 hover:bg-primary-700 hover:border-primary-700 active:bg-primary-800 focus:ring-primary-500':
          variant === 'primary',

        // Secondary
        'bg-neutral-100 text-neutral-900 border-neutral-200 hover:bg-neutral-200 hover:border-neutral-300 active:bg-neutral-300 focus:ring-neutral-500':
          variant === 'secondary',

        // Outline
        'bg-transparent text-primary-600 border-primary-600 hover:bg-primary-600 hover:text-white active:bg-primary-700 focus:ring-primary-500':
          variant === 'outline',

        // Ghost
        'bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100 active:bg-neutral-200 focus:ring-neutral-500':
          variant === 'ghost',

        // Success
        'bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700 active:bg-green-800 focus:ring-green-500':
          variant === 'success',

        // Warning
        'bg-yellow-600 text-white border-yellow-600 hover:bg-yellow-700 hover:border-yellow-700 active:bg-yellow-800 focus:ring-yellow-500':
          variant === 'warning',

        // Danger
        'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 active:bg-red-800 focus:ring-red-500':
          variant === 'danger',
      },

      // Border radius using semantic tokens
      {
        'rounded-sm': size === 'sm',
        'rounded-md': size === 'md',
        'rounded-lg': size === 'lg',
        'rounded-xl': size === 'xl',
      },

      // Loading state
      {
        'cursor-wait': loading,
      },

      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
        style={{
          // Apply semantic token styles as CSS custom properties
          ...buttonStyles,
          // Override with any additional styles
          ...(loading && {
            pointerEvents: 'none',
          }),
        }}
      >
        {loading && <LoadingSpinner size={size === 'sm' ? 'sm' : 'md'} className="mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// =============================================================================
// LOADING SPINNER COMPONENT
// =============================================================================

interface LoadingSpinnerProps {
  size?: 'sm' | 'md';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', className }) => {
  const spinnerSize = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        spinnerSize,
        className
      )}
      style={{
        borderTopColor: 'transparent',
        borderRightColor: 'currentColor',
        borderBottomColor: 'currentColor',
        borderLeftColor: 'currentColor',
      }}
    />
  );
};

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

/**
 * Button with semantic token usage example
 */
export const SemanticButton: React.FC<ButtonProps> = props => {
  const styles = React.useMemo(() => {
    const { variant = 'primary', size = 'md' } = props;

    // Use semantic token helpers
    return {
      backgroundColor: getSemanticColor('interactive.primary'),
      color: getSemanticColor('text.inverse'),
      height: getComponentToken('button', `height.${size}`),
      padding: getComponentToken('button', `padding.${size}`),
      borderRadius: getComponentToken('button', `borderRadius.${size}`),
      fontSize: getComponentToken('button', 'fontSize') || '14px',
      fontWeight: getComponentToken('button', 'fontWeight') || '500',

      // Hover states
      '&:hover': {
        backgroundColor: getSemanticColor('interactive.primaryHover'),
      },

      // Focus states for accessibility
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${getSemanticColor('interactive.focus')}`,
      },
    };
  }, [props.variant, props.size]);

  return (
    <button
      {...props}
      style={styles}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-150',
        'focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
        props.className
      )}
    />
  );
};

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/**
 * Usage examples for the new semantic token system
 */
export const ButtonExamples: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button variant="primary" size="sm">
          Primary Small
        </Button>
        <Button variant="primary" size="md">
          Primary Medium
        </Button>
        <Button variant="primary" size="lg">
          Primary Large
        </Button>
      </div>

      <div className="space-x-2">
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <div className="space-x-2">
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="space-x-2">
        <Button variant="primary" loading>
          Loading
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </div>

      <div className="space-x-2">
        <SemanticButton variant="primary">Using Semantic Tokens</SemanticButton>
      </div>
    </div>
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
 * 1. **Semantic Colors**: Uses `getSemanticColor('interactive.primary')` instead of hardcoded colors
 * 2. **Component Tokens**: Uses `getComponentToken('button', 'height.md')` for consistent sizing
 * 3. **Helper Functions**: Uses `createButtonStyles()` to generate complete style objects
 * 4. **Platform Awareness**: Styles adapt to mobile/desktop automatically
 * 5. **Accessibility**: Follows WCAG 2.2 AA standards with proper focus management
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
 */

export default Button;
