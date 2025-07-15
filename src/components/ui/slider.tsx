/**
 * Slider component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

/* eslint-disable no-unused-vars */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

/**
 * Slider track variants using class-variance-authority
 */
const sliderTrackVariants = cva(
  'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-secondary',
        success: 'bg-green-100',
        warning: 'bg-yellow-100',
        destructive: 'bg-red-100',
      },
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false,
    },
  }
);

/**
 * Slider range variants
 */
const sliderRangeVariants = cva('absolute h-full bg-primary transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      destructive: 'bg-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Slider thumb variants
 */
const sliderThumbVariants = cva(
  'block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-grab active:cursor-grabbing',
  {
    variants: {
      variant: {
        default: 'border-primary',
        success: 'border-green-500',
        warning: 'border-yellow-500',
        destructive: 'border-red-500',
      },
      size: {
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

/**
 * Slider component props interface
 */
export interface SliderProps
  extends Omit<
      InputHTMLAttributes<HTMLInputElement>,
      'size' | 'type' | 'disabled' | 'value' | 'defaultValue'
    >,
    Omit<VariantProps<typeof sliderTrackVariants>, 'disabled'> {
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly value?: number[];
  readonly defaultValue?: number[];
  readonly disabled?: boolean;
  readonly onValueChange?: (value: number[]) => void;
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly showValue?: boolean;
  readonly showTicks?: boolean;
  readonly formatValue?: (value: number) => string;
  readonly marks?: Array<{ value: number; label: string }>;
}

/**
 * Enhanced Slider component
 * @param variant - Slider variant (default, success, warning, destructive)
 * @param size - Slider size (sm, default, lg)
 * @param min - Minimum value
 * @param max - Maximum value
 * @param step - Step increment
 * @param value - Current value(s)
 * @param defaultValue - Default value(s)
 * @param onValueChange - Callback when value changes
 * @param label - Slider label
 * @param helperText - Helper text below slider
 * @param errorText - Error text (overrides helperText when present)
 * @param successText - Success text (overrides helperText when present)
 * @param required - Whether slider is required
 * @param error - Error state
 * @param success - Success state
 * @param showValue - Whether to show current value
 * @param showTicks - Whether to show tick marks
 * @param formatValue - Function to format display value
 * @param marks - Array of mark objects for labeled ticks
 * @param disabled - Disabled state
 * @param className - Additional CSS classes
 * @param id - Slider ID
 * @param props - Additional input props
 * @returns Enhanced Slider JSX element
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      variant,
      size,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = [min],
      onValueChange,
      label,
      helperText,
      errorText,
      successText,
      required,
      error,
      success,
      showValue = false,
      showTicks = false,
      formatValue,
      marks,
      disabled,
      id,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [internalValue, setInternalValue] = React.useState(value || defaultValue);
    const [dragging, setDragging] = React.useState(false);

    // Generate ID if not provided and label exists
    const sliderId =
      id || (label ? `slider-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Update internal value when prop changes
    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    // Calculate percentage for positioning
    const getPercentage = React.useCallback(
      (val: number): number => {
        return ((val - min) / (max - min)) * 100;
      },
      [min, max]
    );

    // Format value for display
    const formatDisplayValue = React.useCallback(
      (val: number): string => {
        return formatValue ? formatValue(val) : val.toString();
      },
      [formatValue]
    );

    // Handle value change
    const handleValueChange = React.useCallback(
      (newValue: number[]): void => {
        setInternalValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange]
    );

    // Mouse/touch event handlers
    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>): void => {
        if (disabled) return;

        setDragging(true);
        const rect = event.currentTarget.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        const newValue = min + (percentage / 100) * (max - min);
        const snappedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, snappedValue));

        handleValueChange([clampedValue]);
        event.preventDefault();
      },
      [disabled, min, max, step, handleValueChange]
    );

    const handlePointerMove = React.useCallback(
      (event: PointerEvent): void => {
        if (!dragging || disabled || !sliderId) return;

        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const percentage = ((event.clientX - rect.left) / rect.width) * 100;
        const newValue = min + (percentage / 100) * (max - min);
        const snappedValue = Math.round(newValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, snappedValue));

        handleValueChange([clampedValue]);
      },
      [dragging, disabled, sliderId, min, max, step, handleValueChange]
    );

    const handlePointerUp = React.useCallback((): void => {
      setDragging(false);
    }, []);

    // Add global event listeners for dragging
    React.useEffect(() => {
      if (dragging) {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);

        return (): void => {
          document.removeEventListener('pointermove', handlePointerMove);
          document.removeEventListener('pointerup', handlePointerUp);
        };
      }

      return undefined;
    }, [dragging, handlePointerMove, handlePointerUp]);

    const currentValue = internalValue[0] || min;
    const percentage = getPercentage(currentValue);

    const sliderElement = (
      <div className="slider-container relative">
        <div
          id={sliderId}
          ref={ref}
          className={cn(sliderTrackVariants({ variant: actualVariant, size, disabled }), className)}
          onPointerDown={handlePointerDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-label={label}
          aria-describedby={displayHelperText ? `${sliderId}-helper` : undefined}
          aria-required={required}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          {/* Range fill */}
          <div
            className={cn(sliderRangeVariants({ variant: actualVariant }))}
            style={{ width: `${percentage}%` }}
          />

          {/* Thumb */}
          <div
            className={cn(
              'absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2',
              sliderThumbVariants({ variant: actualVariant, size })
            )}
            style={{ left: `${percentage}%` }}
          />

          {/* Tick marks */}
          {showTicks && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
                const tickValue = min + i * step;
                const tickPercentage = getPercentage(tickValue);
                return (
                  <div
                    key={i}
                    className="absolute w-0.5 h-full bg-muted-foreground/30"
                    style={{ left: `${tickPercentage}%` }}
                  />
                );
              })}
            </div>
          )}

          {/* Marks */}
          {marks && (
            <div className="absolute -bottom-6 left-0 w-full pointer-events-none">
              {marks.map(mark => {
                const markPercentage = getPercentage(mark.value);
                return (
                  <div
                    key={mark.value}
                    className="absolute transform -translate-x-1/2"
                    style={{ left: `${markPercentage}%` }}
                  >
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {mark.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Value display */}
        {showValue && (
          <div
            className="absolute -top-8 transform -translate-x-1/2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded shadow-md pointer-events-none"
            style={{ left: `${percentage}%` }}
          >
            {formatDisplayValue(currentValue)}
          </div>
        )}
      </div>
    );

    if (!label && !displayHelperText) {
      return <div className={cn('slider-wrapper', { 'pb-8': marks })}>{sliderElement}</div>;
    }

    return (
      <div className={cn('slider-field space-y-3', { 'pb-8': marks })}>
        {label && (
          <div className="flex justify-between items-center">
            <label
              htmlFor={sliderId}
              className={cn(
                'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                {
                  'text-destructive': error || errorText,
                  'text-green-700': success || successText,
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

            {showValue && (
              <span className="text-sm text-muted-foreground">
                {formatDisplayValue(currentValue)}
              </span>
            )}
          </div>
        )}

        {sliderElement}

        {displayHelperText && (
          <p
            id={`${sliderId}-helper`}
            className={cn('text-xs', {
              'text-destructive': error || errorText,
              'text-green-600': success || successText,
              'text-muted-foreground': !error && !errorText && !success && !successText,
            })}
          >
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

/**
 * Slider variants type exports
 */
export type SliderVariant = VariantProps<typeof sliderTrackVariants>['variant'];
export type SliderSize = VariantProps<typeof sliderTrackVariants>['size'];
