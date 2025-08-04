/**
 * @fileoverview Semantic Box Component v5.0.0 - Complete HTML Element Abstraction
 * @description Semantic wrapper that replaces all container HTML elements with design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC ELEMENT TYPES
// =============================================================================

/**
 * All HTML elements that Box can represent semantically
 */
export type SemanticElement = 
  | 'div' 
  | 'section' 
  | 'article' 
  | 'main' 
  | 'aside' 
  | 'header' 
  | 'footer' 
  | 'nav' 
  | 'span'
  | 'figure'
  | 'figcaption'
  | 'details'
  | 'summary'
  | 'input'
  | 'textarea'
  | 'select'
  | 'optgroup';

/**
 * Semantic roles for enhanced accessibility
 */
export type SemanticRole = 
  | 'banner'
  | 'navigation' 
  | 'main'
  | 'complementary'
  | 'contentinfo'
  | 'region'
  | 'article'
  | 'section'
  | 'group'
  | 'presentation'
  | 'none'
  | 'dialog'
  | 'tooltip';

// =============================================================================
// BOX VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const boxVariants = cva(
  // Base classes using design tokens
  'transition-colors duration-200 ease-in-out',
  {
    variants: {
      // Visual variants
      variant: {
        default: '',
        outline: 'border border-border bg-background',
        filled: 'bg-muted border border-border',
        ghost: 'bg-transparent',
        elevated: 'bg-background border border-border shadow-md hover:shadow-lg transition-shadow',
        surface: 'bg-card border border-border shadow-sm',
        accent: 'bg-accent text-accent-foreground',
        muted: 'bg-muted text-muted-foreground',
      },
      
      // Semantic spacing using 8pt grid
      spacing: {
        none: 'p-0',
        xs: 'p-1',      // 4px
        sm: 'p-2',      // 8px  
        md: 'p-4',      // 16px
        lg: 'p-6',      // 24px
        xl: 'p-8',      // 32px
        '2xl': 'p-10',  // 40px
        '3xl': 'p-12',  // 48px
      },
      
      // Border radius using design tokens
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',    // 2px
        md: 'rounded-md',    // 6px
        lg: 'rounded-lg',    // 8px
        xl: 'rounded-xl',    // 12px
        '2xl': 'rounded-2xl', // 16px
        '3xl': 'rounded-3xl', // 24px
        full: 'rounded-full',
      },
      
      // Layout display types
      display: {
        block: 'block',
        flex: 'flex',
        'inline-flex': 'inline-flex',
        grid: 'grid',
        'inline-block': 'inline-block',
        inline: 'inline',
        hidden: 'hidden',
      },
      
      // Flex direction
      direction: {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        col: 'flex-col',
        'col-reverse': 'flex-col-reverse',
      },
      
      // Justify content
      justify: {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
      
      // Align items
      align: {
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        baseline: 'items-baseline',
        stretch: 'items-stretch',
      },
      
      // Gap spacing
      gap: {
        none: 'gap-0',
        xs: 'gap-1',
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8',
        '2xl': 'gap-10',
      },
      
      // Flex wrap
      wrap: {
        nowrap: 'flex-nowrap',
        wrap: 'flex-wrap',
        'wrap-reverse': 'flex-wrap-reverse',
      },
      
      // Width utilities
      width: {
        auto: 'w-auto',
        full: 'w-full',
        screen: 'w-screen',
        min: 'w-min',
        max: 'w-max',
        fit: 'w-fit',
      },
      
      // Height utilities
      height: {
        auto: 'h-auto',
        full: 'h-full',
        screen: 'h-screen',
        min: 'h-min',
        max: 'h-max',
        fit: 'h-fit',
      },
      
      // Position
      position: {
        static: 'static',
        relative: 'relative',
        absolute: 'absolute',
        fixed: 'fixed',
        sticky: 'sticky',
      },
      
      // Overflow
      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
        scroll: 'overflow-scroll',
        auto: 'overflow-auto',
        'x-hidden': 'overflow-x-hidden',
        'y-hidden': 'overflow-y-hidden',
        'x-scroll': 'overflow-x-scroll',
        'y-scroll': 'overflow-y-scroll',
        'x-auto': 'overflow-x-auto',
        'y-auto': 'overflow-y-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'none',
      radius: 'md',
      display: 'block',
      direction: 'row',
      justify: 'start',
      align: 'start',
      gap: 'none',
      wrap: 'nowrap',
      width: 'auto',
      height: 'auto',
      position: 'relative',
      overflow: 'visible',
    },
  }
);

// =============================================================================
// BOX COMPONENT INTERFACE
// =============================================================================

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  /** Semantic HTML element to render */
  readonly as?: SemanticElement;
  /** ARIA role for enhanced accessibility */
  readonly role?: SemanticRole;
  /** Semantic intent of the content */
  readonly intent?: 'navigation' | 'content' | 'sidebar' | 'footer' | 'header' | 'article';
  /** Custom width override */
  readonly w?: string;
  /** Custom height override */
  readonly h?: string;
  /** Custom max width */
  readonly maxW?: string;
  /** Custom max height */
  readonly maxH?: string;
  /** Custom min width */
  readonly minW?: string;
  /** Custom min height */
  readonly minH?: string;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
}

// =============================================================================
// SEMANTIC BOX COMPONENT
// =============================================================================

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = 'div',
      variant = 'default',
      spacing = 'none',
      radius = 'md',
      display = 'block',
      direction = 'row',
      justify = 'start',
      align = 'start',
      gap = 'none',
      wrap = 'nowrap',
      width = 'auto',
      height = 'auto',
      position = 'relative',
      overflow = 'visible',
      role,
      intent,
      w,
      h,
      maxW,
      maxH,
      minW,
      minH,
      className,
      style,
      nsmLevel,
      children,
      ...props
    },
    ref
  ) => {
    // Enhanced accessibility attributes based on semantic element and intent
    const getSemanticAttributes = () => {
      const attributes: Record<string, any> = {};
      
      // Add semantic role if specified
      if (role) {
        attributes.role = role;
      }
      
      // Auto-assign roles based on element and intent
      if (!role && intent) {
        switch (intent) {
          case 'navigation':
            attributes.role = Component === 'nav' ? undefined : 'navigation';
            break;
          case 'content':
            attributes.role = Component === 'main' ? undefined : 'main';
            break;
          case 'sidebar':
            attributes.role = 'complementary';
            break;
          case 'footer':
            attributes.role = Component === 'footer' ? undefined : 'contentinfo';
            break;
          case 'header':
            attributes.role = Component === 'header' ? undefined : 'banner';
            break;
          case 'article':
            attributes.role = Component === 'article' ? undefined : 'article';
            break;
        }
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };
    
    // Custom style overrides
    const customStyles: React.CSSProperties = {
      ...(w && { width: w }),
      ...(h && { height: h }),
      ...(maxW && { maxWidth: maxW }),
      ...(maxH && { maxHeight: maxH }),
      ...(minW && { minWidth: minW }),
      ...(minH && { minHeight: minH }),
      ...style,
    };
    
    const semanticAttributes = getSemanticAttributes();
    
    return (
      <Component
        ref={ref as any}
        className={cn(
          boxVariants({
            variant,
            spacing,
            radius,
            display,
            direction,
            justify,
            align,
            gap,
            wrap,
            width,
            height,
            position,
            overflow,
          }),
          className
        )}
        style={customStyles}
        {...semanticAttributes}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

// =============================================================================
// SEMANTIC BOX VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Semantic Section component
 */
export const Section = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="section" role="region" {...props} />
);
Section.displayName = 'Section';

/**
 * Semantic Article component
 */
export const Article = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="article" role="article" {...props} />
);
Article.displayName = 'Article';

/**
 * Semantic Header component
 */
export const Header = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="header" role="banner" intent="header" {...props} />
);
Header.displayName = 'Header';

/**
 * Semantic Footer component
 */
export const Footer = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="footer" role="contentinfo" intent="footer" {...props} />
);
Footer.displayName = 'Footer';

/**
 * Semantic Main component
 */
export const Main = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="main" role="main" intent="content" {...props} />
);
Main.displayName = 'Main';

/**
 * Semantic Nav component
 */
export const Nav = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="nav" role="navigation" intent="navigation" {...props} />
);
Nav.displayName = 'Nav';

/**
 * Semantic Aside component
 */
export const Aside = forwardRef<HTMLElement, Omit<BoxProps, 'as'>>(
  (props, ref) => <Box ref={ref} as="aside" role="complementary" intent="sidebar" {...props} />
);
Aside.displayName = 'Aside';