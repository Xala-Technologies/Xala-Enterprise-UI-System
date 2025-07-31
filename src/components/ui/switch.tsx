/**
 * Switch component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

/* eslint-disable no-unused-vars */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { useTokens } from '@/hooks/useTokens';

/**
 * Switch track variants using class-variance-authority
 */
const switchTrackVariants = cva(
  'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        destructive: 'data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input',
        success: 'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input',
        warning: 'data-[state=checked]:bg-yellow-500 data-[state=unchecked]:bg-input',
      },
      size: {
        sm: 'h-4 w-7',
        default: 'h-6 w-11',
        lg: 'h-7 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Switch thumb variants using class-variance-authority
 */
const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
        lg: 'h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

/**
 * Switch component props interface
 */
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof switchTrackVariants> {
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
}

/**
 * Enhanced Switch component
 * @param variant - Switch variant (default, destructive, success, warning)
 * @param size - Switch size (sm, default, lg)
 * @param label - Switch label
 * @param description - Additional description text
 * @param error - Error state
 * @param errorText - Error text to display
 * @param required - Whether switch is required
 * @param checked - Checked state
 * @param disabled - Disabled state
 * @param onCheckedChange - Callback when checked state changes
 * @param className - Additional CSS classes
 * @param id - Switch ID
 * @param props - Additional input props
 * @returns Enhanced Switch JSX element
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      variant,
      size,
      label,
      description,
      error,
      errorText,
      required,
      checked = false,
      disabled,
      onCheckedChange,
      id,
      onChange,
      ...props
    },
    ref
  ): React.ReactElement => {
    const tokens = useTokens();
    
    // Generate ID if not provided and label exists
    const switchId =
      id || (label ? `switch-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : variant;

    // Determine switch state for aria and styling
    const switchState = checked ? 'checked' : 'unchecked';

    // Handle change events
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newChecked = event.target.checked;
        onCheckedChange?.(newChecked);
        onChange?.(event);
      },
      [onCheckedChange, onChange]
    );

    const switchElement = (
      <div className="switch-container relative">
        <input
          id={switchId}
          ref={ref}
          type="checkbox"
          role="switch"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          aria-invalid={error || !!errorText}
          aria-describedby={description || errorText ? `${switchId}-description` : undefined}
          aria-required={required}
          data-state={switchState}
          onChange={handleChange}
          {...props}
        />

        {/* Switch track */}
        <div
          className={cn(switchTrackVariants({ variant: actualVariant, size }), className)}
          data-state={switchState}
        >
          {/* Switch thumb */}
          <div className={cn(switchThumbVariants({ size }))} data-state={switchState} />
        </div>
      </div>
    );

    if (!label && !description && !errorText) {
      return switchElement;
    }

    return (
      <div className="switch-field space-y-1.5">
        <div className="flex items-start space-x-3">
          {switchElement}

          {label && (
            <div className="flex-1 space-y-1">
              <label
                htmlFor={switchId}
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
                <p id={`${switchId}-description`} className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {errorText && (
          <p id={`${switchId}-description`} className="text-xs text-destructive ml-14">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

/**
 * Switch variants type exports
 */
export type SwitchVariant = VariantProps<typeof switchTrackVariants>['variant'];
export type SwitchSize = VariantProps<typeof switchTrackVariants>['size'];
