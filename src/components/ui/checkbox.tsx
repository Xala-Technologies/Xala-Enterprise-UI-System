/**
 * Checkbox component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

/**
 * Check icon component
 */
const CheckIcon = ({ className }: { className?: string }): React.ReactElement => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Indeterminate icon component
 */
const IndeterminateIcon = ({ className }: { className?: string }): React.ReactElement => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

/**
 * Checkbox variants using class-variance-authority
 */
const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        destructive:
          'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:border-destructive',
        success:
          'border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white data-[state=checked]:border-green-500',
        warning:
          'border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white data-[state=checked]:border-yellow-500',
      },
      size: {
        sm: 'h-3 w-3',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Checkbox component props interface
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxVariants> {
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly indeterminate?: boolean;
  readonly required?: boolean;
}

/**
 * Checkbox component with enhanced features
 * @param variant - Checkbox variant (default, destructive, success, warning)
 * @param size - Checkbox size (sm, default, lg)
 * @param label - Checkbox label
 * @param description - Additional description text
 * @param error - Error state
 * @param errorText - Error text to display
 * @param indeterminate - Indeterminate state
 * @param required - Whether checkbox is required
 * @param checked - Checked state
 * @param disabled - Disabled state
 * @param className - Additional CSS classes
 * @param id - Checkbox ID
 * @param props - Additional input props
 * @returns Enhanced Checkbox JSX element
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      errorText,
      indeterminate = false,
      required,
      checked,
      disabled,
      id,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Generate ID if not provided and label exists
    const checkboxId =
      id || (label ? `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : variant;

    // Determine checkbox state for aria and styling
    const checkboxState = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';

    const checkboxElement = (
      <div className="checkbox-container relative flex items-center">
        <input
          id={checkboxId}
          ref={ref}
          type="checkbox"
          className={cn(checkboxVariants({ variant: actualVariant, size }), className)}
          checked={checked}
          disabled={disabled}
          aria-invalid={error || !!errorText}
          aria-describedby={description || errorText ? `${checkboxId}-description` : undefined}
          aria-required={required}
          data-state={checkboxState}
          {...props}
        />

        {/* Visual indicator overlay */}
        <div
          className={cn(
            'absolute pointer-events-none flex items-center justify-center text-current transition-opacity duration-200',
            {
              'h-3 w-3': size === 'sm',
              'h-4 w-4': size === 'default',
              'h-5 w-5': size === 'lg',
              'opacity-100': checked || indeterminate,
              'opacity-0': !checked && !indeterminate,
            }
          )}
        >
          {indeterminate ? (
            <IndeterminateIcon className="h-full w-full" />
          ) : checked ? (
            <CheckIcon className="h-full w-full" />
          ) : null}
        </div>
      </div>
    );

    if (!label && !description && !errorText) {
      return checkboxElement;
    }

    return (
      <div className="checkbox-field space-y-1.5">
        <div className="flex items-start space-x-3">
          {checkboxElement}

          {label && (
            <div className="flex-1 space-y-1">
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
                  {
                    'text-destructive': error || errorText,
                  }
                )}
              >
                {label}
                {required && (
                  <span className="text-destructive ml-1" aria-label="required">
                    *
                  </span>
                )}
              </label>

              {description && (
                <p id={`${checkboxId}-description`} className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {errorText && (
          <p id={`${checkboxId}-description`} className="text-xs text-destructive ml-7">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

/**
 * Checkbox variants type exports
 */
export type CheckboxVariant = VariantProps<typeof checkboxVariants>['variant'];
export type CheckboxSize = VariantProps<typeof checkboxVariants>['size'];
