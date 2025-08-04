/**
 * @fileoverview Semantic Button Component v5.0.0 - Enhanced Interactive Element
 * @description Complete button abstraction with design tokens and advanced functionality
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, Touch-friendly
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC BUTTON TYPES
// =============================================================================

/**
 * Button semantic intents
 */
export type ButtonIntent = 
  | 'primary'      // Main call-to-action
  | 'secondary'    // Secondary actions
  | 'outline'      // Outlined style
  | 'ghost'        // Minimal style
  | 'destructive'  // Dangerous actions
  | 'success'      // Success/confirm actions
  | 'warning'      // Warning actions
  | 'info'         // Informational actions
  | 'link';        // Link-style button

/**
 * Button semantic sizes (touch-friendly)
 */
export type ButtonSize = 
  | 'xs'   // 32px - Compact
  | 'sm'   // 36px - Small
  | 'md'   // 44px - Standard (WCAG minimum)
  | 'lg'   // 48px - Large
  | 'xl'   // 56px - Extra large
  | 'icon'; // Square icon button

/**
 * Button loading states
 */
export type ButtonLoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Icon position in button
 */
export type IconPosition = 'left' | 'right' | 'only';

// =============================================================================
// BUTTON VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const buttonVariants = cva(
  // Base classes using design tokens - WCAG AAA compliant
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      // Intent-based variants
      intent: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95 shadow-sm hover:shadow-md',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90 shadow-sm hover:shadow-md',
        outline: 'border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/95 shadow-sm hover:shadow-md',
        success: 'bg-success text-success-foreground hover:bg-success/90 active:bg-success/95 shadow-sm hover:shadow-md',
        warning: 'bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/95 shadow-sm hover:shadow-md',
        info: 'bg-info text-info-foreground hover:bg-info/90 active:bg-info/95 shadow-sm hover:shadow-md',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
      },
      
      // Touch-friendly sizes (WCAG AAA minimum 44px)
      size: {
        xs: 'h-8 px-3 text-xs min-w-[2rem]',          // 32px - Compact only
        sm: 'h-9 px-4 text-sm min-w-[2.25rem]',       // 36px - Small
        md: 'h-11 px-6 text-sm min-w-[2.75rem]',      // 44px - WCAG minimum
        lg: 'h-12 px-8 text-base min-w-[3rem]',       // 48px - Comfortable
        xl: 'h-14 px-10 text-lg min-w-[3.5rem]',      // 56px - Large
        icon: 'h-11 w-11 p-0',                        // 44px square
      },
      
      // Full width variant
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      
      // Loading state styling
      loading: {
        true: 'cursor-wait',
        false: '',
      },
      
      // Icon-only styling
      iconOnly: {
        true: 'px-0',
        false: '',
      },
      
      // Elevation for floating buttons
      elevation: {
        none: '',
        sm: 'shadow-sm hover:shadow-md',
        md: 'shadow-md hover:shadow-lg',
        lg: 'shadow-lg hover:shadow-xl',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      fullWidth: false,
      loading: false,
      iconOnly: false,
      elevation: 'none',
    },
  }
);

// =============================================================================
// BUTTON COMPONENT INTERFACE
// =============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button semantic intent */
  readonly intent?: ButtonIntent;
  /** Loading state of button */
  readonly loadingState?: ButtonLoadingState;
  /** Custom loading text */
  readonly loadingText?: string;
  /** Icon element */
  readonly icon?: React.ReactNode;
  /** Icon position */
  readonly iconPosition?: IconPosition;
  /** Success icon for success state */
  readonly successIcon?: React.ReactNode;
  /** Error icon for error state */
  readonly errorIcon?: React.ReactNode;
  /** Auto-hide loading state after success/error */
  readonly autoHideDelay?: number;
  /** Tooltip for icon-only buttons */
  readonly tooltip?: string;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Language code for i18n */
  readonly lang?: string;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Keyboard shortcut hint */
  readonly shortcut?: string;
}

// =============================================================================
// LOADING SPINNER COMPONENT
// =============================================================================

const LoadingSpinner: React.FC<{ size: ButtonSize | undefined }> = ({ size = 'md' }) => {
  const spinnerSizeClass = {
    xs: 'h-3 w-3',
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
// SUCCESS/ERROR ICONS
// =============================================================================

const CheckIcon: React.FC<{ size: ButtonSize | undefined }> = ({ size = 'md' }) => {
  const iconSizeClass = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5',
    xl: 'h-5 w-5',
    icon: 'h-4 w-4',
  }[size];

  return (
    <svg
      className={cn('stroke-current stroke-2', iconSizeClass)}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
};

const ErrorIcon: React.FC<{ size: ButtonSize | undefined }> = ({ size = 'md' }) => {
  const iconSizeClass = {
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4.5 w-4.5',
    xl: 'h-5 w-5',
    icon: 'h-4 w-4',
  }[size];

  return (
    <svg
      className={cn('stroke-current stroke-2', iconSizeClass)}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

// =============================================================================
// SEMANTIC BUTTON COMPONENT
// =============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      intent = 'primary',
      size = 'md',
      fullWidth = false,
      elevation = 'none',
      loadingState = 'idle',
      loadingText,
      icon,
      iconPosition = 'left',
      successIcon,
      errorIcon,
      autoHideDelay,
      tooltip,
      lang,
      nsmLevel,
      shortcut,
      className,
      disabled,
      children,
      onClick,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const isLoading = loadingState === 'loading';
    const isSuccess = loadingState === 'success';
    const isError = loadingState === 'error';
    const isDisabled = disabled || isLoading;
    const isIconOnly = iconPosition === 'only' || (!children && !!icon);

    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      if (isLoading) {
        attributes['aria-busy'] = true;
        attributes['aria-disabled'] = true;
      }
      
      if (isDisabled) {
        attributes['aria-disabled'] = true;
      }
      
      if (tooltip && isIconOnly) {
        attributes['aria-label'] = tooltip;
        attributes.title = tooltip;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      if (shortcut) {
        attributes['aria-keyshortcuts'] = shortcut;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };

    // Render button content based on state
    const renderContent = () => {
      // Loading state
      if (isLoading) {
        return (
          <>
            <LoadingSpinner size={size || 'md'} />
            {!isIconOnly && (
              <span className="sr-only md:not-sr-only">
                {loadingText || 'Loading...'}
              </span>
            )}
          </>
        );
      }

      // Success state
      if (isSuccess) {
        return (
          <>
            {successIcon || <CheckIcon size={size || 'md'} />}
            {!isIconOnly && (
              <span className="sr-only md:not-sr-only">
                Success
              </span>
            )}
          </>
        );
      }

      // Error state
      if (isError) {
        return (
          <>
            {errorIcon || <ErrorIcon size={size || 'md'} />}
            {!isIconOnly && (
              <span className="sr-only md:not-sr-only">
                Error
              </span>
            )}
          </>
        );
      }

      // Normal state with icon
      if (icon && !isIconOnly) {
        if (iconPosition === 'left') {
          return (
            <>
              <span className="flex items-center" aria-hidden="true">
                {icon}
              </span>
              <span>{children}</span>
            </>
          );
        }

        if (iconPosition === 'right') {
          return (
            <>
              <span>{children}</span>
              <span className="flex items-center" aria-hidden="true">
                {icon}
              </span>
            </>
          );
        }
      }

      // Icon only
      if (isIconOnly && icon) {
        return (
          <span className="flex items-center" aria-hidden="true">
            {icon}
          </span>
        );
      }

      // Text only
      return children;
    };

    const accessibilityAttributes = getAccessibilityAttributes();

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            intent,
            size,
            fullWidth,
            loading: isLoading,
            iconOnly: isIconOnly,
            elevation,
          }),
          className
        )}
        disabled={isDisabled}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...accessibilityAttributes}
        {...props}
      >
        {renderContent()}
      </button>
    );
  }
);

Button.displayName = 'Button';

// =============================================================================
// SEMANTIC BUTTON VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Primary Button component
 */
export const PrimaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'intent'>>(
  (props, ref) => <Button ref={ref} intent="primary" {...props} />
);
PrimaryButton.displayName = 'PrimaryButton';

/**
 * Secondary Button component
 */
export const SecondaryButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'intent'>>(
  (props, ref) => <Button ref={ref} intent="secondary" {...props} />
);
SecondaryButton.displayName = 'SecondaryButton';

/**
 * Outline Button component
 */
export const OutlineButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'intent'>>(
  (props, ref) => <Button ref={ref} intent="outline" {...props} />
);
OutlineButton.displayName = 'OutlineButton';

/**
 * Ghost Button component
 */
export const GhostButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'intent'>>(
  (props, ref) => <Button ref={ref} intent="ghost" {...props} />
);
GhostButton.displayName = 'GhostButton';

/**
 * Destructive Button component
 */
export const DestructiveButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'intent'>>(
  (props, ref) => <Button ref={ref} intent="destructive" {...props} />
);
DestructiveButton.displayName = 'DestructiveButton';

/**
 * Icon Button component
 */
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'size' | 'iconPosition'>>(
  (props, ref) => <Button ref={ref} size="icon" iconPosition="only" {...props} />
);
IconButton.displayName = 'IconButton';