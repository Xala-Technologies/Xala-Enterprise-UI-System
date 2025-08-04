/**
 * @fileoverview Textarea Component v5.0.0 - Token-Based Design System
 * @description Modern Textarea component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box } from '../semantic';

// =============================================================================
// TEXTAREA VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Textarea variants using token-based styling
 * Combines CVA with runtime token access for maximum flexibility
 */
const textareaVariants = cva(
  // Base classes - framework-agnostic styling
  'flex w-full border transition-all duration-150 ease-in-out resize-y min-h-[100px] placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        destructive: '',
        success: '',
        warning: '',
      },
      size: {
        sm: 'min-h-[80px]',
        default: 'min-h-[100px]',
        lg: 'min-h-[120px]',
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
 * Textarea variant types
 */
export type TextareaVariant = 'default' | 'destructive' | 'success' | 'warning';

/**
 * Textarea size types
 */
export type TextareaSize = 'sm' | 'default' | 'lg';

/**
 * Textarea resize types
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

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
  readonly variant?: TextareaVariant;
  readonly size?: TextareaSize;
  readonly resize?: TextareaResize;
}

/**
 * Enhanced Textarea component with token-based styling
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      style,
      variant = 'default',
      size = 'default',
      resize = 'vertical',
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

    // Get border radius
    const borderRadius = {
      md: '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            fontSize: '0.75rem',
            minHeight: '80px',
          };
        case 'lg':
          return {
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            fontSize: '1rem',
            minHeight: '120px',
          };
        default:
          return {
            paddingLeft: '0.75rem',
            paddingRight: '0.75rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            fontSize: '0.875rem',
            minHeight: '100px',
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (actualVariant) {
        case 'destructive':
          return {
            borderColor: '#ef4444',
            color: '#ef4444',
          };
        case 'success':
          return {
            borderColor: '#22c55e',
            color: colors.success?.[800] || '#166534',
          };
        case 'warning':
          return {
            borderColor: '#f59e0b',
            color: colors.warning?.[800] || '#92400e',
          };
        default:
          return {
            borderColor: '#e5e7eb',
            color: '#111827',
          };
      }
    };

    // Resize styles
    const getResizeStyles = (): React.CSSProperties => {
      if (autoResize) {
        return { resize: 'none' };
      }
      
      switch (resize) {
        case 'none':
          return { resize: 'none' };
        case 'horizontal':
          return { resize: 'horizontal' };
        case 'both':
          return { resize: 'both' };
        default: // vertical
          return { resize: 'vertical' };
      }
    };

    const sizeStyles = getSizeStyles();
    const variantStyles = getVariantStyles();
    const resizeStyles = getResizeStyles();

    // Textarea styles
    const textareaStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      borderRadius: '0.375rem',
      border: '1px solid',
      backgroundColor: '#ffffff',
      outline: 'none',
      transition: 'all 150ms ease-in-out',
      ...(props.disabled && {
        cursor: 'not-allowed',
        opacity: 0.5,
      }),
      ...sizeStyles,
      ...variantStyles,
      ...resizeStyles,
      ...style,
    };

    // Placeholder styles
    const placeholderColor = '#6b7280';

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: '0.875rem',
      fontWeight: '500',
      lineHeight: '1',
      color: error || errorText 
        ? ('#ef4444')
        : success || successText
        ? (colors.success?.[700] || '#15803d')
        : ('#111827'),
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      flex: 1,
      color: error || errorText 
        ? ('#ef4444') 
        : success || successText
        ? (colors.success?.[600] || '#16a34a')
        : ('#6b7280'),
    };

    // Character count styles
    const getCharCountStyles = (): React.CSSProperties => {
      const isOverLimit = maxLength !== undefined && currentLength > maxLength;
      const isNearLimit = maxLength !== undefined && currentLength > maxLength * 0.9;
      
      return {
        fontSize: '0.75rem',
        marginLeft: 'auto',
        color: isOverLimit 
          ? ('#ef4444')
          : isNearLimit
          ? (colors.warning?.[600] || '#d97706')
          : ('#6b7280'),
      };
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: '0.25rem',
      color: '#ef4444',
    };

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
      <>
        {/* CSS for placeholder styling */}
        <style dangerouslySetInnerHTML={{
          __html: `
            #${textareaId}::placeholder {
              color: ${placeholderColor};
            }
          `
        }} />
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(textareaVariants({ variant: actualVariant, size, resize: autoResize ? 'none' : resize }), className)}
         
          aria-invalid={error || !!errorText}
          aria-describedby={displayHelperText || showCount ? `${textareaId}-helper` : undefined}
          aria-required={required}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          onFocus={(e) => {
            if (!props.disabled) {
              switch (actualVariant) {
                case 'destructive':
                  e.currentTarget.style.outline = `2px solid ${'#ef4444'}`;
                  break;
                case 'success':
                  e.currentTarget.style.outline = `2px solid ${'#22c55e'}`;
                  break;
                case 'warning':
                  e.currentTarget.style.outline = `2px solid ${'#f59e0b'}`;
                  break;
                default:
                  e.currentTarget.style.outline = `2px solid ${'#3b82f6'}`;
                  break;
              }
              e.currentTarget.style.outlineOffset = '2px';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
          }}
          {...props}
        />
      </>
    );

    if (!label && !displayHelperText && !showCount) {
      return textareaElement;
    }

    return (
      <Box>
        {label && (
          <Text as="label"
            htmlFor={textareaId}
           
          >
            {label}
            {required && (
              <Text as="span" aria-label="required">
                *
              </Text>
            )}
          </Text>
        )}

        {textareaElement}

        <Box>
          {displayHelperText && (
            <Text
              id={`${textareaId}-helper`}
             
            >
              {displayHelperText}
            </Text>
          )}

          {showCount && (
            <Text>
              {currentLength}
              {maxLength !== undefined && `/${maxLength}`}
            </Text>
          )}
        </Box>
      </Box>
    );
  }
);

Textarea.displayName = 'Textarea';
