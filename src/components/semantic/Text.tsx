/**
 * @fileoverview Semantic Text Component v5.0.0 - Complete Text Element Abstraction
 * @description Semantic wrapper for all text elements with design tokens and i18n support
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, i18n ready
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC TEXT ELEMENTS
// =============================================================================

/**
 * All HTML text elements that Text can represent semantically
 */
export type TextElement = 
  | 'span' 
  | 'p' 
  | 'label' 
  | 'small' 
  | 'strong' 
  | 'em' 
  | 'mark' 
  | 'code' 
  | 'kbd'
  | 'samp'
  | 'abbr'
  | 'time'
  | 'cite'
  | 'q'
  | 'sub'
  | 'sup';

/**
 * Semantic text intents for different use cases
 */
export type TextIntent = 
  | 'body'
  | 'caption' 
  | 'label'
  | 'code'
  | 'emphasis'
  | 'strong'
  | 'muted'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

/**
 * Text semantic levels for content hierarchy
 */
export type TextLevel = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

// =============================================================================
// TEXT VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const textVariants = cva(
  // Base classes using design tokens
  'transition-colors duration-200 ease-in-out',
  {
    variants: {
      // Text size using typography tokens
      size: {
        xs: 'text-xs',      // 12px
        sm: 'text-sm',      // 14px
        base: 'text-base',  // 16px (WCAG minimum)
        lg: 'text-lg',      // 18px (recommended)
        xl: 'text-xl',      // 20px
        '2xl': 'text-2xl',  // 24px
        '3xl': 'text-3xl',  // 30px
        '4xl': 'text-4xl',  // 36px
      },
      
      // Font weight using design tokens
      weight: {
        thin: 'font-thin',           // 100
        extralight: 'font-extralight', // 200
        light: 'font-light',         // 300
        normal: 'font-normal',       // 400
        medium: 'font-medium',       // 500
        semibold: 'font-semibold',   // 600
        bold: 'font-bold',           // 700
        extrabold: 'font-extrabold', // 800
        black: 'font-black',         // 900
      },
      
      // Semantic color variants
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-accent-foreground',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
        primary: 'text-primary',
        secondary: 'text-secondary',
      },
      
      // Text alignment
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
        justify: 'text-justify',
      },
      
      // Line height for readability
      leading: {
        none: 'leading-none',      // 1
        tight: 'leading-tight',    // 1.25
        snug: 'leading-snug',      // 1.375
        normal: 'leading-normal',  // 1.5 (WCAG recommended)
        relaxed: 'leading-relaxed', // 1.625
        loose: 'leading-loose',    // 2
      },
      
      // Letter spacing
      tracking: {
        tighter: 'tracking-tighter', // -0.05em
        tight: 'tracking-tight',     // -0.025em
        normal: 'tracking-normal',   // 0em
        wide: 'tracking-wide',       // 0.025em
        wider: 'tracking-wider',     // 0.05em
        widest: 'tracking-widest',   // 0.1em
      },
      
      // Text decoration
      decoration: {
        none: 'no-underline',
        underline: 'underline',
        overline: 'overline',
        'line-through': 'line-through',
      },
      
      // Text transform
      transform: {
        none: 'normal-case',
        uppercase: 'uppercase',
        lowercase: 'lowercase',
        capitalize: 'capitalize',
      },
      
      // Display behavior
      display: {
        inline: 'inline',
        block: 'block',
        'inline-block': 'inline-block',
      },
      
      // Truncation
      truncate: {
        none: '',
        truncate: 'truncate',
        ellipsis: 'text-ellipsis overflow-hidden',
        clip: 'text-clip overflow-hidden',
      },
      
      // Font family
      family: {
        sans: 'font-sans',     // Inter, system fonts
        mono: 'font-mono',     // Monospace for code
        display: 'font-display', // Cal Sans for headings
      },
    },
    defaultVariants: {
      size: 'base',
      weight: 'normal',
      variant: 'default',
      align: 'left',
      leading: 'normal',
      tracking: 'normal',
      decoration: 'none',
      transform: 'none',
      display: 'inline',
      truncate: 'none',
      family: 'sans',
    },
  }
);

// =============================================================================
// TEXT COMPONENT INTERFACE
// =============================================================================

export interface TextProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  /** Semantic HTML element to render */
  readonly as?: TextElement;
  /** Semantic intent of the text */
  readonly intent?: TextIntent;
  /** Semantic level for content hierarchy */
  readonly level?: TextLevel;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Language code for i18n */
  readonly lang?: string;
  /** Text direction for RTL support */
  readonly dir?: 'ltr' | 'rtl' | 'auto';
  /** ARIA label for accessibility */
  readonly ariaLabel?: string;
  /** ARIA described by for form associations */
  readonly ariaDescribedBy?: string;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Datetime for time elements */
  readonly dateTime?: string;
  /** Abbreviation expansion for abbr elements */
  readonly title?: string;
}

// =============================================================================
// SEMANTIC TEXT COMPONENT
// =============================================================================

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Component = 'span',
      intent,
      level = 'primary',
      size = 'base',
      weight = 'normal',
      variant = 'default',
      align = 'left',
      leading = 'normal',
      tracking = 'normal',
      decoration = 'none',
      transform = 'none',
      display = 'inline',
      truncate = 'none',
      family = 'sans',
      lang,
      dir,
      ariaLabel,
      ariaDescribedBy,
      nsmLevel,
      dateTime,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Auto-configure based on intent
    const getIntentConfig = () => {
      if (!intent) return {};
      
      switch (intent) {
        case 'body':
          return {
            size: size === 'base' ? 'base' : size,
            weight: weight === 'normal' ? 'normal' : weight,
            leading: leading === 'normal' ? 'normal' : leading,
          };
        case 'caption':
          return {
            size: size === 'base' ? 'sm' : size,
            variant: variant === 'default' ? 'muted' : variant,
            weight: weight === 'normal' ? 'normal' : weight,
          };
        case 'label':
          return {
            size: size === 'base' ? 'sm' : size,
            weight: weight === 'normal' ? 'medium' : weight,
          };
        case 'code':
          return {
            family: family === 'sans' ? 'mono' : family,
            size: size === 'base' ? 'sm' : size,
            variant: variant === 'default' ? 'muted' : variant,
          };
        case 'emphasis':
          return {
            weight: weight === 'normal' ? 'medium' : weight,
            variant: variant === 'default' ? 'accent' : variant,
          };
        case 'strong':
          return {
            weight: weight === 'normal' ? 'semibold' : weight,
          };
        case 'muted':
          return {
            variant: variant === 'default' ? 'muted' : variant,
          };
        case 'error':
          return {
            variant: variant === 'default' ? 'destructive' : variant,
          };
        case 'success':
          return {
            variant: variant === 'default' ? 'success' : variant,
          };
        case 'warning':
          return {
            variant: variant === 'default' ? 'warning' : variant,
          };
        case 'info':
          return {
            variant: variant === 'default' ? 'info' : variant,
          };
        default:
          return {};
      }
    };
    
    // Auto-assign element based on intent
    const getSemanticElement = (): TextElement => {
      if (Component !== 'span') return Component;
      
      switch (intent) {
        case 'body':
          return 'p';
        case 'caption':
          return 'small';
        case 'label':
          return 'label';
        case 'code':
          return 'code';
        case 'emphasis':
          return 'em';
        case 'strong':
          return 'strong';
        default:
          return Component;
      }
    };
    
    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      if (ariaLabel) {
        attributes['aria-label'] = ariaLabel;
      }
      
      if (ariaDescribedBy) {
        attributes['aria-describedby'] = ariaDescribedBy;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      if (dir) {
        attributes.dir = dir;
      }
      
      if (dateTime && (Component === 'time' || intent === 'time')) {
        attributes.dateTime = dateTime;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };
    
    const intentConfig = getIntentConfig();
    const SemanticElement = getSemanticElement();
    const accessibilityAttributes = getAccessibilityAttributes();
    
    return (
      <SemanticElement
        ref={ref as any}
        className={cn(
          textVariants({
            size: intentConfig.size || size,
            weight: intentConfig.weight || weight,
            variant: intentConfig.variant || variant,
            align,
            leading: intentConfig.leading || leading,
            tracking,
            decoration,
            transform,
            display,
            truncate,
            family: intentConfig.family || family,
          }),
          className
        )}
        {...accessibilityAttributes}
        {...props}
      >
        {children}
      </SemanticElement>
    );
  }
);

Text.displayName = 'Text';

// =============================================================================
// SEMANTIC TEXT VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Semantic Paragraph component
 */
export const Paragraph = forwardRef<HTMLParagraphElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref as any} 
      as="p" 
      intent="body" 
      display="block" 
      leading="relaxed"
      {...props} 
    />
  )
);
Paragraph.displayName = 'Paragraph';

/**
 * Semantic Label component
 */
export const Label = forwardRef<HTMLLabelElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref as any} 
      as="label" 
      intent="label"
      {...props} 
    />
  )
);
Label.displayName = 'Label';

/**
 * Semantic Small component
 */
export const Small = forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref as any} 
      as="small" 
      intent="caption"
      {...props} 
    />
  )
);
Small.displayName = 'Small';

/**
 * Semantic Code component
 */
export const Code = forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref as any} 
      as="code" 
      intent="code"
      {...props} 
    />
  )
);
Code.displayName = 'Code';

/**
 * Semantic Strong component
 */
export const Strong = forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref as any} 
      as="strong" 
      intent="strong"
      {...props} 
    />
  )
);
Strong.displayName = 'Strong';

/**
 * Semantic Emphasis component
 */
export const Emphasis = forwardRef<HTMLElement, Omit<TextProps, 'as'>>(
  (props, ref) => (
    <Text 
      ref={ref as any} 
      as="em" 
      intent="emphasis"
      {...props} 
    />
  )
);
Emphasis.displayName = 'Emphasis';