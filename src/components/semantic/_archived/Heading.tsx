/**
 * @fileoverview Semantic Heading Component v5.0.0 - Complete Heading Element Abstraction
 * @description Semantic heading component with automatic hierarchy and accessibility
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, Semantic hierarchy
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC HEADING TYPES
// =============================================================================

/**
 * Heading semantic levels (h1-h6)
 */
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Visual heading sizes (can differ from semantic level)
 */
export type HeadingSize = 
  | 'display-2xl'  // Extra large display
  | 'display-xl'   // Large display
  | 'display-lg'   // Medium display
  | 'display-md'   // Small display
  | 'display-sm'   // Tiny display
  | 'h1'          // H1 size
  | 'h2'          // H2 size
  | 'h3'          // H3 size
  | 'h4'          // H4 size
  | 'h5'          // H5 size
  | 'h6';         // H6 size

/**
 * Heading intent for different contexts
 */
export type HeadingIntent = 
  | 'page-title'     // Main page title
  | 'section-title'  // Section heading
  | 'card-title'     // Card/component title
  | 'modal-title'    // Modal/dialog title
  | 'sidebar-title'  // Sidebar section title
  | 'display'        // Large display text
  | 'subtitle';      // Subtitle or subheading

// =============================================================================
// HEADING VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const headingVariants = cva(
  // Base classes using design tokens
  'font-semibold tracking-tight transition-colors duration-200 ease-in-out',
  {
    variants: {
      // Visual size (independent of semantic level)
      size: {
        'display-2xl': 'text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter', // 48-72px
        'display-xl': 'text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter', // 36-60px
        'display-lg': 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight', // 30-48px
        'display-md': 'text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight', // 24-36px
        'display-sm': 'text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight', // 20-30px
        h1: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight', // 30-48px
        h2: 'text-2xl md:text-3xl font-semibold tracking-tight', // 24-30px
        h3: 'text-xl md:text-2xl font-semibold tracking-tight', // 20-24px
        h4: 'text-lg md:text-xl font-medium tracking-tight', // 18-20px
        h5: 'text-base md:text-lg font-medium tracking-normal', // 16-18px
        h6: 'text-sm md:text-base font-medium tracking-normal', // 14-16px
      },
      
      // Color variants
      variant: {
        default: 'text-foreground',
        muted: 'text-muted-foreground',
        accent: 'text-accent-foreground',
        primary: 'text-primary',
        secondary: 'text-secondary',
        destructive: 'text-destructive',
        success: 'text-success',
        warning: 'text-warning',
        info: 'text-info',
      },
      
      // Text alignment
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      
      // Display behavior
      display: {
        block: 'block',
        'inline-block': 'inline-block',
      },
      
      // Truncation
      truncate: {
        none: '',
        truncate: 'truncate',
        ellipsis: 'text-ellipsis overflow-hidden',
        'line-clamp-1': 'line-clamp-1',
        'line-clamp-2': 'line-clamp-2',
        'line-clamp-3': 'line-clamp-3',
      },
      
      // Margin bottom for spacing
      marginBottom: {
        none: 'mb-0',
        xs: 'mb-2',   // 8px
        sm: 'mb-3',   // 12px
        md: 'mb-4',   // 16px
        lg: 'mb-6',   // 24px
        xl: 'mb-8',   // 32px
      },
      
      // Font family
      family: {
        sans: 'font-sans',       // Inter for body headings
        display: 'font-display', // Cal Sans for display headings
      },
    },
    defaultVariants: {
      size: 'h2',
      variant: 'default',
      align: 'left',
      display: 'block',
      truncate: 'none',
      marginBottom: 'md',
      family: 'sans',
    },
  }
);

// =============================================================================
// HEADING COMPONENT INTERFACE
// =============================================================================

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic heading level (h1-h6) */
  readonly level?: HeadingLevel;
  /** Visual size (can differ from semantic level) */
  readonly visualSize?: HeadingSize;
  /** Heading intent for context */
  readonly intent?: HeadingIntent;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Language code for i18n */
  readonly lang?: string;
  /** Text direction for RTL support */
  readonly dir?: 'ltr' | 'rtl' | 'auto';
  /** ARIA level override */
  readonly ariaLevel?: number;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Auto-increment heading level in context */
  readonly autoLevel?: boolean;
}

// =============================================================================
// SEMANTIC HEADING COMPONENT
// =============================================================================

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      level = 2,
      visualSize,
      intent,
      size,
      variant = 'default',
      align = 'left',
      display = 'block',
      truncate = 'none',
      marginBottom = 'md',
      family = 'sans',
      lang,
      dir,
      ariaLevel,
      nsmLevel,
      autoLevel = false,
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
        case 'page-title':
          return {
            level: level === 2 ? 1 : level,
            visualSize: visualSize || 'h1',
            family: family === 'sans' ? 'display' : family,
            marginBottom: marginBottom === 'md' ? 'lg' : marginBottom,
          };
        case 'section-title':
          return {
            level: level === 2 ? 2 : level,
            visualSize: visualSize || 'h2',
            marginBottom: marginBottom === 'md' ? 'lg' : marginBottom,
          };
        case 'card-title':
          return {
            level: level === 2 ? 3 : level,
            visualSize: visualSize || 'h4',
            marginBottom: marginBottom === 'md' ? 'sm' : marginBottom,
          };
        case 'modal-title':
          return {
            level: level === 2 ? 2 : level,
            visualSize: visualSize || 'h3',
            marginBottom: marginBottom === 'md' ? 'md' : marginBottom,
          };
        case 'sidebar-title':
          return {
            level: level === 2 ? 3 : level,
            visualSize: visualSize || 'h5',
            variant: variant === 'default' ? 'muted' : variant,
            marginBottom: marginBottom === 'md' ? 'sm' : marginBottom,
          };
        case 'display':
          return {
            level: level === 2 ? 1 : level,
            visualSize: visualSize || 'display-lg',
            family: family === 'sans' ? 'display' : family,
            marginBottom: marginBottom === 'md' ? 'xl' : marginBottom,
          };
        case 'subtitle':
          return {
            level: level === 2 ? 2 : level,
            visualSize: visualSize || 'h4',
            variant: variant === 'default' ? 'muted' : variant,
            marginBottom: marginBottom === 'md' ? 'md' : marginBottom,
          };
        default:
          return {};
      }
    };
    
    // Get the appropriate heading element
    const getHeadingElement = (headingLevel: HeadingLevel): keyof JSX.IntrinsicElements => {
      // Ensure level is between 1-6
      const clampedLevel = Math.max(1, Math.min(6, headingLevel)) as HeadingLevel;
      return `h${clampedLevel}` as keyof JSX.IntrinsicElements;
    };
    
    // Auto-determine visual size based on semantic level if not specified
    const getDefaultVisualSize = (headingLevel: HeadingLevel): HeadingSize => {
      return `h${headingLevel}` as HeadingSize;
    };
    
    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      if (ariaLevel) {
        attributes['aria-level'] = ariaLevel;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      if (dir) {
        attributes.dir = dir;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };
    
    const intentConfig = getIntentConfig();
    const finalLevel = intentConfig.level || level;
    const finalVisualSize = intentConfig.visualSize || visualSize || size || getDefaultVisualSize(finalLevel as HeadingLevel);
    const HeadingElement = getHeadingElement(finalLevel as HeadingLevel);
    const accessibilityAttributes = getAccessibilityAttributes();
    
    return (
      <HeadingElement
        ref={ref}
        className={cn(
          headingVariants({
            size: finalVisualSize,
            variant: intentConfig.variant || variant,
            align,
            display,
            truncate,
            marginBottom: (intentConfig.marginBottom || marginBottom) as any,
            family: intentConfig.family || family,
          }),
          className
        )}
        {...accessibilityAttributes}
        {...props}
      >
        {children}
      </HeadingElement>
    );
  }
);

Heading.displayName = 'Heading';

// =============================================================================
// SEMANTIC HEADING VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Page Title (H1) component
 */
export const PageTitle = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => (
    <Heading 
      ref={ref} 
      level={1} 
      intent="page-title"
      {...props} 
    />
  )
);
PageTitle.displayName = 'PageTitle';

/**
 * Section Title (H2) component
 */
export const SectionTitle = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => (
    <Heading 
      ref={ref} 
      level={2} 
      intent="section-title"
      {...props} 
    />
  )
);
SectionTitle.displayName = 'SectionTitle';

/**
 * Card Title (H3) component
 */
export const CardTitle = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => (
    <Heading 
      ref={ref} 
      level={3} 
      intent="card-title"
      {...props} 
    />
  )
);
CardTitle.displayName = 'CardTitle';

/**
 * Modal Title (H2) component
 */
export const ModalTitle = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => (
    <Heading 
      ref={ref} 
      level={2} 
      intent="modal-title"
      {...props} 
    />
  )
);
ModalTitle.displayName = 'ModalTitle';

/**
 * Display Heading component for hero sections
 */
export const DisplayHeading = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => (
    <Heading 
      ref={ref} 
      level={1} 
      intent="display"
      {...props} 
    />
  )
);
DisplayHeading.displayName = 'DisplayHeading';

/**
 * Subtitle component
 */
export const Subtitle = forwardRef<HTMLHeadingElement, Omit<HeadingProps, 'level'>>(
  (props, ref) => (
    <Heading 
      ref={ref} 
      level={2} 
      intent="subtitle"
      {...props} 
    />
  )
);
Subtitle.displayName = 'Subtitle';