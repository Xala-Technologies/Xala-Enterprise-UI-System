/**
 * Button Base Component
 * Main Button component using design tokens and CVA
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ConfirmationDialog } from './ButtonConfirmation';
import { ClassificationIndicator, LoadingSpinner } from './ButtonIcon';

/**
 * Button variants using design tokens
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8',
        xl: 'h-12 px-12 text-base',
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

export interface ButtonPropsWithNorwegian 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  readonly loading?: boolean;
  readonly loadingText?: string;
  readonly icon?: React.ReactNode;
  readonly iconPosition?: 'left' | 'right';
  readonly ariaLabel?: string;
  readonly testId?: string;
  readonly labelKey?: string;
  readonly showConfirmation?: boolean;
  readonly onConfirm?: () => void;
  readonly onCancel?: () => void;
  readonly norwegian?: {
    readonly classification?: string;
    readonly municipality?: string;
    readonly actionType?: string;
    readonly priority?: string;
    readonly requiresConfirmation?: boolean;
    readonly confirmationMessageKey?: string;
  };
}

/**
 * Button component with forwardRef
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonPropsWithNorwegian>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      type = 'button',
      disabled = false,
      loading = false,
      loadingText,
      children,
      labelKey,
      icon,
      iconPosition = 'left',
      className = '',
      showConfirmation = false,
      onConfirm,
      onCancel,
      norwegian,
      ariaLabel,
      testId = 'button',
      onClick,
      ...buttonProps
    } = props;

    const isDisabled = disabled || loading;

    return (
      <>
        <button
          ref={ref}
          type={type}
          disabled={isDisabled}
          className={cn(buttonVariants({ variant, size, fullWidth }), className)}
          aria-label={ariaLabel || labelKey}
          aria-busy={loading}
          aria-disabled={isDisabled}
          data-testid={testId}
          data-variant={variant}
          data-size={size}
          onClick={onClick}
          {...buttonProps}
        >
          {iconPosition === 'left' && icon && <span className="mr-2">{icon}</span>}
          {loading && <LoadingSpinner size={size} />}
          <span className="button-text">
            {loading && loadingText ? loadingText : children}
          </span>
          {iconPosition === 'right' && icon && <span className="ml-2">{icon}</span>}
          {norwegian?.classification && (
            <ClassificationIndicator level={norwegian.classification} />
          )}
        </button>

        {showConfirmation && (
          <ConfirmationDialog
            isOpen={showConfirmation}
            messageKey={norwegian?.confirmationMessageKey || 'confirm.message'}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
      </>
    );
  }
);

Button.displayName = 'Button';
