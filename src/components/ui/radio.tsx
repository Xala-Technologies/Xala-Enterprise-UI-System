/**
 * Radio component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

/* eslint-disable no-unused-vars */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes } from 'react';

/**
 * Radio button icon component
 */
const RadioIcon = ({ className }: { className?: string }): React.ReactElement => (
  <div className={cn('w-2 h-2 rounded-full bg-current', className)} />
);

/**
 * Radio variants using class-variance-authority
 */
const radioVariants = cva(
  'aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      variant: {
        default:
          'border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        destructive:
          'border-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground',
        success:
          'border-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white',
        warning:
          'border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white',
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
 * Radio option interface
 */
export interface RadioOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
  readonly description?: string;
}

/**
 * Radio component props interface
 */
export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof radioVariants> {
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
}

/**
 * Radio Group component props interface
 */
export interface RadioGroupProps {
  readonly name: string;
  readonly options: RadioOption[];
  readonly value?: string;
  readonly defaultValue?: string;
  readonly onValueChange?: (value: string) => void;
  readonly variant?: RadioProps['variant'];
  readonly size?: RadioProps['size'];
  readonly orientation?: 'horizontal' | 'vertical';
  readonly label?: string;
  readonly description?: string;
  readonly error?: boolean;
  readonly errorText?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly id?: string;
}

/**
 * Enhanced Radio component
 * @param variant - Radio variant (default, destructive, success, warning)
 * @param size - Radio size (sm, default, lg)
 * @param label - Radio label
 * @param description - Additional description text
 * @param error - Error state
 * @param errorText - Error text to display
 * @param required - Whether radio is required
 * @param checked - Checked state
 * @param disabled - Disabled state
 * @param className - Additional CSS classes
 * @param id - Radio ID
 * @param props - Additional input props
 * @returns Enhanced Radio JSX element
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
      id,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Generate ID if not provided and label exists
    const radioId = id || (label ? `radio-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant = error || errorText ? 'destructive' : variant;

    // Determine radio state for aria and styling
    const radioState = checked ? 'checked' : 'unchecked';

    const radioElement = (
      <div className="radio-container relative flex items-center">
        <input
          id={radioId}
          ref={ref}
          type="radio"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          aria-invalid={error || !!errorText}
          aria-describedby={description || errorText ? `${radioId}-description` : undefined}
          aria-required={required}
          data-state={radioState}
          {...props}
        />

        {/* Visual radio button */}
        <div
          className={cn(radioVariants({ variant: actualVariant, size }), className)}
          data-state={radioState}
        >
          {/* Radio indicator */}
          {checked && (
            <div className="flex items-center justify-center w-full h-full">
              <RadioIcon
                className={cn({
                  'w-1 h-1': size === 'sm',
                  'w-2 h-2': size === 'default',
                  'w-2.5 h-2.5': size === 'lg',
                })}
              />
            </div>
          )}
        </div>
      </div>
    );

    if (!label && !description && !errorText) {
      return radioElement;
    }

    return (
      <div className="radio-field space-y-1.5">
        <div className="flex items-start space-x-3">
          {radioElement}

          {label && (
            <div className="flex-1 space-y-1">
              <label
                htmlFor={radioId}
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
                <p id={`${radioId}-description`} className="text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {errorText && (
          <p id={`${radioId}-description`} className="text-xs text-destructive ml-7">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * Radio Group component for managing multiple radio options
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      options,
      value,
      defaultValue,
      onValueChange,
      variant,
      size,
      orientation = 'vertical',
      label,
      description,
      error,
      errorText,
      required,
      disabled,
      className,
      id,
    },
    ref
  ): React.ReactElement => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '');

    // Generate ID if not provided and label exists
    const groupId =
      id || (label ? `radio-group-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleChange = (optionValue: string): void => {
      setSelectedValue(optionValue);
      onValueChange?.(optionValue);
    };

    const groupElement = (
      <div
        ref={ref}
        role="radiogroup"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={description || errorText ? `${groupId}-description` : undefined}
        aria-invalid={error || !!errorText}
        aria-required={required}
        className={cn(
          'radio-group',
          {
            'flex flex-col space-y-3': orientation === 'vertical',
            'flex flex-row space-x-6': orientation === 'horizontal',
          },
          className
        )}
      >
        {options.map(option => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            disabled={disabled || option.disabled}
            label={option.label}
            description={option.description}
            variant={variant}
            size={size}
            error={error}
          />
        ))}
      </div>
    );

    if (!label && !description && !errorText) {
      return groupElement;
    }

    return (
      <div className="radio-group-field space-y-2">
        {label && (
          <label
            id={`${groupId}-label`}
            className={cn('text-sm font-medium leading-none', {
              'text-destructive': error || errorText,
            })}
          >
            {label}
            {required && (
              <span className="text-destructive ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {description && (
          <p id={`${groupId}-description`} className="text-xs text-muted-foreground">
            {description}
          </p>
        )}

        {groupElement}

        {errorText && (
          <p id={`${groupId}-description`} className="text-xs text-destructive">
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

/**
 * Radio variants type exports
 */
export type RadioVariant = VariantProps<typeof radioVariants>['variant'];
export type RadioSize = VariantProps<typeof radioVariants>['size'];
