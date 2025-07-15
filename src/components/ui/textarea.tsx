/**
 * Textarea component with shadcn-ui style and enterprise compliance
 * Uses design tokens and CSS variables for theming
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

/**
 * Textarea variants using class-variance-authority
 */
const textareaVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-input focus-visible:ring-ring',
        destructive: 'border-destructive focus-visible:ring-destructive text-destructive',
        success: 'border-green-500 focus-visible:ring-green-500 text-green-800',
        warning: 'border-yellow-500 focus-visible:ring-yellow-500 text-yellow-800',
      },
      size: {
        sm: 'px-3 py-2 text-xs min-h-[80px]',
        default: 'px-3 py-2 min-h-[100px]',
        lg: 'px-4 py-3 text-base min-h-[120px]',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'vertical',
    },
  }
);

/**
 * Textarea component props interface
 */
export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  readonly label?: string;
  readonly helperText?: string;
  readonly errorText?: string;
  readonly successText?: string;
  readonly required?: boolean;
  readonly error?: boolean;
  readonly success?: boolean;
  readonly maxLength?: number;
  readonly showCharacterCount?: boolean;
  readonly autoResize?: boolean;
}

/**
 * Enhanced Textarea component
 * @param variant - Textarea variant (default, destructive, success, warning)
 * @param size - Textarea size (sm, default, lg)
 * @param resize - Resize behavior (none, vertical, horizontal, both)
 * @param label - Textarea label
 * @param helperText - Helper text below textarea
 * @param errorText - Error text (overrides helperText when present)
 * @param successText - Success text (overrides helperText when present)
 * @param required - Whether textarea is required
 * @param error - Error state
 * @param success - Success state
 * @param maxLength - Maximum character length
 * @param showCharacterCount - Whether to show character count
 * @param autoResize - Whether to auto-resize based on content
 * @param className - Additional CSS classes
 * @param id - Textarea ID
 * @param value - Textarea value (for controlled components)
 * @param props - Additional textarea props
 * @returns Enhanced Textarea JSX element
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      size,
      resize,
      label,
      helperText,
      errorText,
      successText,
      required,
      error,
      success,
      maxLength,
      showCharacterCount = false,
      autoResize = false,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ): React.ReactElement => {
    // Generate ID if not provided and label exists
    const textareaId =
      id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    // Determine actual variant based on state
    const actualVariant =
      error || errorText ? 'destructive' : success || successText ? 'success' : variant;

    // Helper text to display
    const displayHelperText = errorText || successText || helperText;

    // Character count for display
    const currentLength = typeof value === 'string' ? value.length : 0;
    const showCount = showCharacterCount && (maxLength !== undefined || currentLength > 0);

    // Auto-resize handler
    const handleChange = React.useCallback(
      (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        if (autoResize) {
          const textarea = event.target;
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
        onChange?.(event);
      },
      [autoResize, onChange]
    );

    // Auto-resize effect for initial content
    React.useEffect(() => {
      if (autoResize && ref && 'current' in ref && ref.current) {
        const textarea = ref.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoResize, ref, value]);

    const textareaElement = (
      <textarea
        id={textareaId}
        ref={ref}
        className={cn(
          textareaVariants({ variant: actualVariant, size, resize }),
          {
            'resize-none': autoResize, // Disable manual resize when auto-resize is enabled
          },
          className
        )}
        aria-invalid={error || !!errorText}
        aria-describedby={displayHelperText || showCount ? `${textareaId}-helper` : undefined}
        aria-required={required}
        maxLength={maxLength}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );

    if (!label && !displayHelperText && !showCount) {
      return textareaElement;
    }

    return (
      <div className="textarea-field space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
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
        )}

        {textareaElement}

        <div className="flex justify-between items-start">
          {displayHelperText && (
            <p
              id={`${textareaId}-helper`}
              className={cn('text-xs flex-1', {
                'text-destructive': error || errorText,
                'text-green-600': success || successText,
                'text-muted-foreground': !error && !errorText && !success && !successText,
              })}
            >
              {displayHelperText}
            </p>
          )}

          {showCount && (
            <p
              className={cn('text-xs text-muted-foreground ml-auto', {
                'text-destructive': maxLength !== undefined && currentLength > maxLength,
                'text-yellow-600': maxLength !== undefined && currentLength > maxLength * 0.9,
              })}
            >
              {currentLength}
              {maxLength !== undefined && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

/**
 * Textarea variants type exports
 */
export type TextareaVariant = VariantProps<typeof textareaVariants>['variant'];
export type TextareaSize = VariantProps<typeof textareaVariants>['size'];
export type TextareaResize = VariantProps<typeof textareaVariants>['resize'];
