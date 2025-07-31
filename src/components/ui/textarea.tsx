/**
 * @fileoverview Textarea Component v5.0.0 - Token-Based Design System
 * @description Modern Textarea component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

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
    const { colors, spacing, typography, getToken } = useTokens();
    
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
      md: (getToken('borderRadius.md') as string) || '0.375rem',
    };

    // Size styles
    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            paddingLeft: spacing[3],
            paddingRight: spacing[3],
            paddingTop: spacing[2],
            paddingBottom: spacing[2],
            fontSize: typography.fontSize.xs,
            minHeight: '80px',
          };
        case 'lg':
          return {
            paddingLeft: spacing[4],
            paddingRight: spacing[4],
            paddingTop: spacing[3],
            paddingBottom: spacing[3],
            fontSize: typography.fontSize.base,
            minHeight: '120px',
          };
        default:
          return {
            paddingLeft: spacing[3],
            paddingRight: spacing[3],
            paddingTop: spacing[2],
            paddingBottom: spacing[2],
            fontSize: typography.fontSize.sm,
            minHeight: '100px',
          };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (actualVariant) {
        case 'destructive':
          return {
            borderColor: colors.danger?.[500] || '#ef4444',
            color: colors.danger?.[500] || '#ef4444',
          };
        case 'success':
          return {
            borderColor: colors.success?.[500] || '#22c55e',
            color: colors.success?.[800] || '#166534',
          };
        case 'warning':
          return {
            borderColor: colors.warning?.[500] || '#f59e0b',
            color: colors.warning?.[800] || '#92400e',
          };
        default:
          return {
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
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
      borderRadius: borderRadius.md,
      border: '1px solid',
      backgroundColor: colors.background?.default || '#ffffff',
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
    const placeholderColor = colors.text?.secondary || colors.neutral?.[500] || '#6b7280';

    // Label styles
    const labelStyles: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.none,
      color: error || errorText 
        ? (colors.danger?.[500] || '#ef4444')
        : success || successText
        ? (colors.success?.[700] || '#15803d')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    // Helper text styles
    const helperTextStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      flex: 1,
      color: error || errorText 
        ? (colors.danger?.[500] || '#ef4444') 
        : success || successText
        ? (colors.success?.[600] || '#16a34a')
        : (colors.text?.secondary || colors.neutral?.[500] || '#6b7280'),
    };

    // Character count styles
    const getCharCountStyles = (): React.CSSProperties => {
      const isOverLimit = maxLength !== undefined && currentLength > maxLength;
      const isNearLimit = maxLength !== undefined && currentLength > maxLength * 0.9;
      
      return {
        fontSize: typography.fontSize.xs,
        marginLeft: 'auto',
        color: isOverLimit 
          ? (colors.danger?.[500] || '#ef4444')
          : isNearLimit
          ? (colors.warning?.[600] || '#d97706')
          : (colors.text?.secondary || colors.neutral?.[500] || '#6b7280'),
      };
    };

    // Required indicator styles
    const requiredStyles: React.CSSProperties = {
      marginLeft: spacing[1],
      color: colors.danger?.[500] || '#ef4444',
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
          style={textareaStyles}
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
                  e.currentTarget.style.outline = `2px solid ${colors.danger?.[500] || '#ef4444'}`;
                  break;
                case 'success':
                  e.currentTarget.style.outline = `2px solid ${colors.success?.[500] || '#22c55e'}`;
                  break;
                case 'warning':
                  e.currentTarget.style.outline = `2px solid ${colors.warning?.[500] || '#f59e0b'}`;
                  break;
                default:
                  e.currentTarget.style.outline = `2px solid ${colors.primary?.[500] || '#3b82f6'}`;
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1.5] }}>
        {label && (
          <label
            htmlFor={textareaId}
            style={labelStyles}
          >
            {label}
            {required && (
              <span style={requiredStyles} aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {textareaElement}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {displayHelperText && (
            <p
              id={`${textareaId}-helper`}
              style={helperTextStyles}
            >
              {displayHelperText}
            </p>
          )}

          {showCount && (
            <p style={getCharCountStyles()}>
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
