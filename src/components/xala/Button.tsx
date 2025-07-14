/**
 * Xala Button Component
 * Based on Equinor Design System with WCAG AAA accessibility compliance
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

/**
 * Button variants using class-variance-authority
 */
const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'whitespace-nowrap',

    // Touch targets and accessibility
    'min-h-[44px] min-w-[44px]', // WCAG AAA minimum touch target size
    'touch-manipulation',

    // Motion preferences
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
          'focus-visible:ring-primary',
          'aria-pressed:bg-primary/80',
        ],
        secondary: [
          'bg-secondary text-secondary-foreground shadow hover:bg-secondary/90',
          'focus-visible:ring-secondary',
          'aria-pressed:bg-secondary/80',
        ],
        destructive: [
          'bg-destructive text-destructive-foreground shadow hover:bg-destructive/90',
          'focus-visible:ring-destructive',
          'aria-pressed:bg-destructive/80',
        ],
        outline: [
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-ring',
          'aria-pressed:bg-accent/80',
        ],
        ghost: [
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:ring-ring',
          'aria-pressed:bg-accent/80',
        ],
        link: [
          'text-primary underline-offset-4 hover:underline',
          'focus-visible:ring-primary',
          'aria-pressed:text-primary/80',
        ],
        success: [
          'bg-success text-success-foreground shadow hover:bg-success/90',
          'focus-visible:ring-success',
          'aria-pressed:bg-success/80',
        ],
        warning: [
          'bg-warning text-warning-foreground shadow hover:bg-warning/90',
          'focus-visible:ring-warning',
          'aria-pressed:bg-warning/80',
        ],
        info: [
          'bg-info text-info-foreground shadow hover:bg-info/90',
          'focus-visible:ring-info',
          'aria-pressed:bg-info/80',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        default: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        xl: 'h-12 px-10 text-base',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      loading: {
        true: 'cursor-not-allowed opacity-75',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
      loading: false,
    },
  }
);

/**
 * Button component props interface
 */
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  readonly children: ReactNode;

  /** Loading state */
  readonly loading?: boolean;

  /** Icon to display before text */
  readonly startIcon?: ReactNode;

  /** Icon to display after text */
  readonly endIcon?: ReactNode;

  /** Loading icon override */
  readonly loadingIcon?: ReactNode;

  /** Full width button */
  readonly fullWidth?: boolean;

  /** Accessible label for screen readers */
  readonly 'aria-label'?: string;

  /** Accessible description */
  readonly 'aria-describedby'?: string;

  /** Button press state for toggle buttons */
  readonly 'aria-pressed'?: boolean;

  /** Expanded state for collapsible content */
  readonly 'aria-expanded'?: boolean;

  /** Controls another element */
  readonly 'aria-controls'?: string;

  /** Popup type */
  readonly 'aria-haspopup'?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
}

/**
 * Loading spinner component
 */
const LoadingSpinner = ({ size = 16 }: { size?: number }): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
    aria-hidden="true"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

/**
 * Button component
 * @param variant - Button style variant
 * @param size - Button size
 * @param loading - Loading state
 * @param disabled - Disabled state
 * @param fullWidth - Full width button
 * @param startIcon - Icon before text
 * @param endIcon - Icon after text
 * @param loadingIcon - Custom loading icon
 * @param children - Button content
 * @param className - Additional CSS classes
 * @param onClick - Click handler
 * @param props - Additional button props
 * @returns Button JSX element
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      loading = false,
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      loadingIcon,
      children,
      className,
      onClick,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      'aria-pressed': ariaPressed,
      'aria-expanded': ariaExpanded,
      'aria-controls': ariaControls,
      'aria-haspopup': ariaHasPopup,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
      // Ensure consistent behavior across browsers
      if (event.key === 'Enter' || event.key === ' ') {
        if (isDisabled) {
          event.preventDefault();
          return;
        }
      }
      props.onKeyDown?.(event);
    };

    // Icon size based on button size
    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : size === 'xl' ? 20 : 16;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, fullWidth, loading }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        aria-pressed={ariaPressed}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-haspopup={ariaHasPopup}
        aria-disabled={isDisabled}
        {...props}
      >
        {/* Loading state */}
        {loading && (
          <span className="flex items-center" aria-hidden="true">
            {loadingIcon || <LoadingSpinner size={iconSize} />}
          </span>
        )}

        {/* Start icon */}
        {!loading && startIcon && (
          <span className="flex items-center" aria-hidden="true">
            {startIcon}
          </span>
        )}

        {/* Button content */}
        {children && (
          <span className={cn(loading && 'opacity-0', 'flex items-center')}>{children}</span>
        )}

        {/* End icon */}
        {!loading && endIcon && (
          <span className="flex items-center" aria-hidden="true">
            {endIcon}
          </span>
        )}

        {/* Screen reader loading announcement */}
        {loading && <span className="sr-only">Loading...</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Button group component for related actions
 */
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Button group orientation */
  readonly orientation?: 'horizontal' | 'vertical';

  /** Button group size */
  readonly size?: 'sm' | 'default' | 'lg';

  /** Connected buttons without gaps */
  readonly attached?: boolean;

  /** Children buttons */
  readonly children: ReactNode;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = 'horizontal',
      size = 'default',
      attached = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          attached ? (orientation === 'horizontal' ? '-space-x-px' : '-space-y-px') : 'gap-2',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Button) {
            return React.cloneElement(child, {
              size: child.props.size || size,
              className: cn(
                child.props.className,
                attached &&
                  orientation === 'horizontal' && [
                    'rounded-none',
                    index === 0 && 'rounded-l-md',
                    index === React.Children.count(children) - 1 && 'rounded-r-md',
                  ],
                attached &&
                  orientation === 'vertical' && [
                    'rounded-none',
                    index === 0 && 'rounded-t-md',
                    index === React.Children.count(children) - 1 && 'rounded-b-md',
                  ]
              ),
            });
          }
          return child;
        })}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

/**
 * Icon button component for icon-only buttons
 */
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'startIcon' | 'endIcon'> {
  /** Icon to display */
  readonly icon: ReactNode;

  /** Accessible label (required for icon buttons) */
  readonly 'aria-label': string;

  /** Tooltip text */
  readonly title?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, loading, loadingIcon, className, ...props }, ref) => {
    return (
      <Button ref={ref} size="icon" className={cn('p-0', className)} {...props}>
        {loading ? loadingIcon || <LoadingSpinner /> : icon}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

/**
 * Export button variants and types
 */
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

export { buttonVariants };
