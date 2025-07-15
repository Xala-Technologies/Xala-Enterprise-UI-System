/**
 * IconButton component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * IconButton variants using class-variance-authority
 */
const iconButtonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md font-medium',
    'transition-colors focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 w-8',
        md: 'h-9 w-9',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12',
      },
      shape: {
        square: 'rounded-md',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'square',
    },
  }
);

/**
 * IconButton component props interface
 */
export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  readonly icon: ReactNode;
  readonly label: string;
  readonly loading?: boolean;
  readonly tooltip?: string;
}

/**
 * Enhanced IconButton component
 * @param variant - Button variant (default, destructive, outline, secondary, ghost, link)
 * @param size - Button size (sm, md, lg, xl)
 * @param shape - Button shape (square, round)
 * @param icon - Icon to display
 * @param label - Accessible label for screen readers
 * @param loading - Loading state
 * @param tooltip - Optional tooltip text
 * @param className - Additional CSS classes
 * @returns Enhanced IconButton JSX element
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
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

    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size, shape }), className)}
        aria-label={label}
        title={tooltip || label}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * IconButton variants type exports
 */
export type IconButtonVariant = VariantProps<typeof iconButtonVariants>['variant'];
export type IconButtonSize = VariantProps<typeof iconButtonVariants>['size'];
export type IconButtonShape = VariantProps<typeof iconButtonVariants>['shape'];
