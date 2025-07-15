/**
 * Button component with shadcn-ui style and enterprise compliance
 * Uses class-variance-authority for variants and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

/**
 * Loading spinner component for button
 */
const ButtonSpinner = ({
  size,
}: {
  size?: 'sm' | 'default' | 'lg' | 'icon';
}): React.ReactElement => (
  <div
    className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', {
      'h-3 w-3': size === 'sm' || size === 'icon',
      'h-4 w-4': size === 'default' || !size,
      'h-5 w-5': size === 'lg',
    })}
    aria-hidden="true"
  />
);

/**
 * Button variants using class-variance-authority
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 [&svg]:pointer-events-none [&svg]:size-4 [&svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline h-auto p-0',
        success: 'bg-green-600 text-white hover:bg-green-700 shadow-sm hover:shadow',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow',
        info: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

/**
 * Button component props interface
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly asChild?: boolean;
  readonly loading?: boolean;
  readonly loadingText?: string;
  readonly leftIcon?: React.ReactNode;
  readonly rightIcon?: React.ReactNode;
  readonly fullWidth?: boolean;
}

/**
 * Button component with enhanced features
 * @param variant - Button variant (default, destructive, outline, secondary, ghost, link, success, warning, info)
 * @param size - Button size (sm, default, lg, icon)
 * @param fullWidth - Whether button should take full width
 * @param loading - Loading state
 * @param loadingText - Text to show when loading
 * @param leftIcon - Icon to show on the left
 * @param rightIcon - Icon to show on the right
 * @param disabled - Disabled state
 * @param className - Additional CSS classes
 * @param children - Button content
 * @param asChild - Render as child element
 * @param props - Additional button props
 * @returns Enhanced Button JSX element
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      ...props
    },
    ref
  ): React.ReactElement => {
    const isDisabled = disabled || loading;
    const content = loading && loadingText ? loadingText : children;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <ButtonSpinner size={size || 'default'} />
        ) : (
          leftIcon && <span className="button-icon button-icon--left">{leftIcon}</span>
        )}

        {content && <span className="button-content">{content}</span>}

        {!loading && rightIcon && (
          <span className="button-icon button-icon--right">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Button variants type exports
 */
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
