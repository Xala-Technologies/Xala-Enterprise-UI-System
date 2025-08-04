/**
 * @fileoverview Typography Component v5.0.0 - Token-Based Design System
 * @description Modern Typography component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// TYPOGRAPHY VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Typography variants using token-based styling
 * Combines CVA with runtime token access for maximum flexibility
 */
const typographyVariants = cva(
  // Base classes - framework-agnostic styling
  '',
  {
    variants: {
      variant: {
        h1: '',
        h2: '',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
        body: '',
        bodyLarge: '',
        bodySmall: '',
        lead: '',
        large: '',
        small: '',
        muted: '',
        code: '',
        blockquote: '',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      truncate: {
        true: 'truncate',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'body',
      align: 'left',
      truncate: false,
    },
  }
);

/**
 * Typography variant types
 */
export type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body' | 'bodyLarge' | 'bodySmall'
  | 'lead' | 'large' | 'small' | 'muted'
  | 'code' | 'blockquote';

/**
 * Typography color types
 */
export type TypographyColor = 
  | 'default' | 'muted' | 'primary' | 'secondary'
  | 'destructive' | 'success' | 'warning' | 'info';

/**
 * Typography alignment types
 */
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Typography component props interface
 */
export interface TypographyProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** Typography variant */
  readonly variant?: TypographyVariant;
  /** Text color */
  readonly textColor?: TypographyColor;
  /** Text alignment */
  readonly align?: TypographyAlign;
  /** HTML element type */
  readonly as?: React.ElementType;
  /** Truncate long text */
  readonly truncate?: boolean;
}

/**
 * Typography component
 */
export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    { 
      variant = 'body',
      textColor = 'default',
      align = 'left',
      as: Component = 'p',
      truncate,
      className,
      style,
      ...props 
    },
    ref
  ) => {
        
    // Get variant styles
    const getVariantStyles = (): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {
        fontFamily: "Inter, system-ui, sans-serif",
        color: colors.neutral?.[900],
      };
      
      switch (variant) {
        case 'h1':
          return {
            ...baseStyles,
            fontSize: typography.fontSize['4xl'],
            fontWeight: '${typography_fontWeight_extrabold}',
            letterSpacing: typography.letterSpacing?.tight || '-0.025em',
            lineHeight: '1.25',
            marginBottom: '1.25rem',
          };
        case 'h2':
          return {
            ...baseStyles,
            fontSize: typography.fontSize['3xl'],
            fontWeight: '600',
            letterSpacing: typography.letterSpacing?.tight || '-0.025em',
            lineHeight: '1.25',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid',
            borderBottomColor: colors.neutral?.[200],
          };
        case 'h3':
          return {
            ...baseStyles,
            fontSize: typography.fontSize['2xl'],
            fontWeight: '600',
            letterSpacing: typography.letterSpacing?.tight || '-0.025em',
            lineHeight: '1.25',
            marginBottom: '0.75rem',
          };
        case 'h4':
          return {
            ...baseStyles,
            fontSize: '1.25rem',
            fontWeight: '600',
            letterSpacing: typography.letterSpacing?.tight || '-0.025em',
            lineHeight: '1.25',
            marginBottom: '0.75rem',
          };
        case 'h5':
          return {
            ...baseStyles,
            fontSize: '1.125rem',
            fontWeight: '600',
            letterSpacing: typography.letterSpacing?.tight || '-0.025em',
            lineHeight: '1.25',
            marginBottom: '0.5rem',
          };
        case 'h6':
          return {
            ...baseStyles,
            fontSize: '1rem',
            fontWeight: '600',
            letterSpacing: typography.letterSpacing?.tight || '-0.025em',
            lineHeight: '1.25',
            marginBottom: '0.5rem',
          };
        case 'bodyLarge':
          return {
            ...baseStyles,
            fontSize: '1.125rem',
            lineHeight: '1.625',
          };
        case 'bodySmall':
          return {
            ...baseStyles,
            fontSize: '0.875rem',
            lineHeight: '1.5',
          };
        case 'lead':
          return {
            ...baseStyles,
            fontSize: '1.25rem',
            color: colors.neutral?.[500],
            lineHeight: '1.625',
          };
        case 'large':
          return {
            ...baseStyles,
            fontSize: '1.125rem',
            fontWeight: '600',
          };
        case 'small':
          return {
            ...baseStyles,
            fontSize: '0.875rem',
            fontWeight: '500',
            lineHeight: '1',
          };
        case 'muted':
          return {
            ...baseStyles,
            fontSize: '0.875rem',
            color: colors.neutral?.[500],
          };
        case 'code':
          return {
            fontFamily: typography.fontFamily.mono.join(', '),
            fontSize: '0.875rem',
            fontWeight: '600',
            backgroundColor: colors.background?.subtle || colors.neutral?.[100],
            color: colors.neutral?.[900],
            paddingLeft: '0.3rem',
            paddingRight: '0.3rem',
            paddingTop: '0.2rem',
            paddingBottom: '0.2rem',
            borderRadius: '0.375rem',
          };
        case 'blockquote':
          return {
            ...baseStyles,
            fontStyle: 'italic',
            marginTop: '1.5rem',
            paddingLeft: '1.5rem',
            borderLeftWidth: '2px',
            borderLeftStyle: 'solid',
            borderLeftColor: colors.neutral?.[300],
          };
        default:
          return {
            ...baseStyles,
            lineHeight: '1.625',
          };
      }
    };
    
    // Get text color
    const getTextColor = (): string => {
      switch (textColor) {
        case 'muted':
          return '#6b7280';
        case 'primary':
          return '#3b82f6';
        case 'secondary':
          return colors.secondary?.[500] || '#8b5cf6';
        case 'destructive':
          return '#ef4444';
        case 'success':
          return colors.success?.[600] || '#16a34a';
        case 'warning':
          return colors.warning?.[600] || '#d97706';
        case 'info':
          return colors.info?.[600] || '#2563eb';
        default:
          return '#111827';
      }
    };
    
    // Build final styles
    const typographyStyles: React.CSSProperties = {
      ...getVariantStyles(),
      color: getTextColor(),
      textAlign: align,
      ...(truncate ? {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      } : {}),
      ...style,
    };
    
    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, align, truncate }), className)}
       
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';

/**
 * Get appropriate HTML element from variant
 */
export function getElementFromVariant(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'code':
      return 'code';
    case 'blockquote':
      return 'blockquote';
    case 'lead':
    case 'large':
    case 'small':
    case 'muted':
    case 'body':
    case 'bodyLarge':
    case 'bodySmall':
    default:
      return 'p';
  }
}

/**
 * Convenience components for common typography patterns
 */
export const Heading = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ variant = 'h1', ...props }, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant={variant} {...props} />
  )
);

Heading.displayName = 'Heading';

export const Text = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ variant = 'body', ...props }, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant={variant} {...props} />
  )
);

Text.displayName = 'Text';

export const Code = forwardRef<HTMLElement, TypographyProps>(
  ({ variant = 'code', ...props }, ref) => <Typography ref={ref} variant={variant} {...props} />
);

Code.displayName = 'Code';

export const Blockquote = forwardRef<HTMLQuoteElement, TypographyProps>(
  ({ variant = 'blockquote', ...props }, ref) => (
    <Typography ref={ref as React.Ref<HTMLElement>} variant={variant} {...props} />
  )
);

Blockquote.displayName = 'Blockquote';
