/**
 * @fileoverview Semantic Container Component v5.0.0 - Container Layout Abstraction
 * @description Semantic container that replaces layout containers with design tokens and semantic meaning
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC CONTAINER TYPES
// =============================================================================

/**
 * Container semantic element types
 */
export type ContainerElement = 
  | 'div' 
  | 'section' 
  | 'article' 
  | 'main' 
  | 'aside' 
  | 'header' 
  | 'footer'
  | 'nav';

/**
 * Container semantic intents for automatic configuration
 */
export type ContainerIntent = 
  | 'page'          // Main page container
  | 'content'       // Content wrapper
  | 'sidebar'       // Side navigation/content
  | 'header'        // Page/section header
  | 'footer'        // Page/section footer
  | 'card'          // Card-like container
  | 'modal'         // Modal content
  | 'hero'          // Hero section
  | 'article'       // Article content
  | 'grid-item';    // Grid item container

// =============================================================================
// CONTAINER VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const containerVariants = cva(
  [
    'w-full mx-auto',
    'transition-all duration-200 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      // Visual variants using design tokens
      variant: {
        default: 'bg-transparent',
        filled: 'bg-background',
        card: 'bg-card border border-border shadow-sm',
        elevated: 'bg-card border border-border shadow-md hover:shadow-lg transition-shadow',
        outlined: 'border border-border bg-transparent',
        ghost: 'bg-transparent',
        surface: 'bg-card shadow-sm',
        accent: 'bg-accent/10 border border-accent/20',
      },

      // Container sizes using design tokens
      size: {
        xs: 'max-w-xs',      // 320px
        sm: 'max-w-sm',      // 384px
        md: 'max-w-md',      // 448px
        lg: 'max-w-lg',      // 512px
        xl: 'max-w-xl',      // 576px
        '2xl': 'max-w-2xl',  // 672px
        '3xl': 'max-w-3xl',  // 768px
        '4xl': 'max-w-4xl',  // 896px
        '5xl': 'max-w-5xl',  // 1024px
        '6xl': 'max-w-6xl',  // 1152px
        '7xl': 'max-w-7xl',  // 1280px
        full: 'max-w-full',
        screen: 'max-w-screen-2xl',
        none: 'max-w-none',
      },

      // Spacing using 8pt grid system
      spacing: {
        none: 'p-0',
        xs: 'p-2',      // 8px
        sm: 'p-4',      // 16px
        md: 'p-6',      // 24px
        lg: 'p-8',      // 32px
        xl: 'p-12',     // 48px
        '2xl': 'p-16',  // 64px
        '3xl': 'p-20',  // 80px
      },

      // Vertical spacing
      spacingY: {
        none: 'py-0',
        xs: 'py-2',
        sm: 'py-4', 
        md: 'py-6',
        lg: 'py-8',
        xl: 'py-12',
        '2xl': 'py-16',
        '3xl': 'py-20',
      },

      // Border radius using design tokens
      radius: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md', 
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },

      // Responsive behavior
      responsive: {
        true: 'px-4 sm:px-6 lg:px-8',
        false: '',
      },

      // Center content
      center: {
        true: 'text-center',
        false: '',
      },

      // Full width breakout
      breakout: {
        none: '',
        sm: 'sm:max-w-full sm:px-6',
        md: 'md:max-w-full md:px-8', 
        lg: 'lg:max-w-full lg:px-12',
        xl: 'xl:max-w-full xl:px-16',
        full: 'max-w-full px-4 sm:px-6 lg:px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: '7xl',
      spacing: 'md',
      spacingY: 'none',
      radius: 'md',
      responsive: false,
      center: false,
      breakout: 'none',
    },
  }
);

// Intent-based compound variants for automatic configuration
const intentVariants = cva('', {
  variants: {
    intent: {
      page: '',
      content: '',
      sidebar: '',
      header: '',
      footer: '',
      card: '',
      modal: '',
      hero: '',
      article: '',
      'grid-item': '',
    },
  },
  compoundVariants: [
    // Page container - wide, responsive, with padding
    {
      intent: 'page',
      className: 'max-w-7xl px-4 sm:px-6 lg:px-8',
    },
    // Content container - reading width, centered
    {
      intent: 'content', 
      className: 'max-w-4xl px-6 py-8',
    },
    // Sidebar container - narrow, full height
    {
      intent: 'sidebar',
      className: 'max-w-xs p-4 bg-card border-r border-border h-full',
    },
    // Header container - full width, minimal padding
    {
      intent: 'header',
      className: 'max-w-full px-4 py-3 bg-background border-b border-border',
    },
    // Footer container - full width, accent background
    {
      intent: 'footer',
      className: 'max-w-full px-4 py-6 bg-muted/30 border-t border-border',
    },
    // Card container - elevated with padding
    {
      intent: 'card',
      className: 'max-w-md p-6 bg-card border border-border shadow-sm rounded-lg',
    },
    // Modal container - centered, elevated
    {
      intent: 'modal',
      className: 'max-w-lg p-6 bg-card border border-border shadow-xl rounded-xl',
    },
    // Hero container - full width, large padding
    {
      intent: 'hero',
      className: 'max-w-full px-4 py-16 sm:py-24 lg:py-32 text-center',
    },
    // Article container - reading width, generous padding
    {
      intent: 'article',
      className: 'max-w-3xl px-6 py-8 mx-auto',
    },
    // Grid item - flexible, card-like
    {
      intent: 'grid-item',
      className: 'p-4 bg-card border border-border rounded-md',
    },
  ],
});

// =============================================================================
// CONTAINER COMPONENT INTERFACE
// =============================================================================

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof containerVariants> {
  /** Semantic HTML element to render */
  readonly as?: ContainerElement;
  /** Semantic intent for automatic configuration */
  readonly intent?: ContainerIntent;
  /** Custom max width override */
  readonly maxWidth?: string;
  /** Custom width override */
  readonly width?: string;
  /** Custom min height */
  readonly minHeight?: string;
  /** Enable debug outline */
  readonly debug?: boolean;
  /** Children content */
  readonly children?: React.ReactNode;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** ARIA landmark role override */
  readonly landmark?: 'banner' | 'navigation' | 'main' | 'complementary' | 'contentinfo' | 'region';
}

// =============================================================================
// SEMANTIC CONTAINER COMPONENT
// =============================================================================

export const Container = forwardRef<HTMLElement, ContainerProps>(
  (
    {
      as: Component = 'div',
      intent,
      variant = 'default',
      size = '7xl', 
      spacing = 'md',
      spacingY = 'none',
      radius = 'md',
      responsive = false,
      center = false,
      breakout = 'none',
      maxWidth,
      width,
      minHeight,
      debug = false,
      className,
      style,
      nsmLevel,
      landmark,
      children,
      ...props
    },
    ref
  ) => {
    // Get semantic element and role based on intent
    const getSemanticAttributes = () => {
      const attributes: Record<string, any> = {};
      
      // Auto-assign semantic element based on intent if not specified
      let semanticElement = Component;
      if (intent && Component === 'div') {
        switch (intent) {
          case 'page':
            semanticElement = 'main';
            break;
          case 'content':
            semanticElement = 'section';
            break;
          case 'sidebar':
            semanticElement = 'aside';
            break;
          case 'header':
            semanticElement = 'header';
            break;
          case 'footer':
            semanticElement = 'footer';
            break;
          case 'article':
            semanticElement = 'article';
            break;
          case 'hero':
            semanticElement = 'section';
            break;
        }
      }
      
      // Add ARIA landmark if specified or auto-assign based on element
      if (landmark) {
        attributes.role = landmark;
      } else if (!landmark && intent) {
        switch (intent) {
          case 'page':
            if (semanticElement !== 'main') attributes.role = 'main';
            break;
          case 'sidebar':
            if (semanticElement !== 'aside') attributes.role = 'complementary';
            break;
          case 'header':
            if (semanticElement !== 'header') attributes.role = 'banner';
            break;
          case 'footer':
            if (semanticElement !== 'footer') attributes.role = 'contentinfo';
            break;
          case 'content':
          case 'hero':
          case 'article':
            if (semanticElement === 'div') attributes.role = 'region';
            break;
        }
      }
      
      // Add Norwegian compliance data attribute
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return { semanticElement, attributes };
    };

    const { semanticElement, attributes } = getSemanticAttributes();
    
    // Custom styles with overrides
    const customStyles: React.CSSProperties = {
      ...(maxWidth && { maxWidth }),
      ...(width && { width }),
      ...(minHeight && { minHeight }),
      ...(debug && { 
        outline: '2px dashed rgba(59, 130, 246, 0.5)',
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
      }),
      ...style,
    };
    
    return React.createElement(
      semanticElement,
      {
        ref: ref as any,
        className: cn(
          containerVariants({
            variant,
            size,
            spacing,
            spacingY,
            radius,
            responsive,
            center,
            breakout,
          }),
          intent && intentVariants({ intent }),
          className
        ),
        style: customStyles,
        ...attributes,
        ...props,
      },
      children
    );
  }
);

Container.displayName = 'Container';

// =============================================================================
// SEMANTIC CONTAINER VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Page Container - Main page wrapper
 */
export const PageContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="page" {...props} />
);
PageContainer.displayName = 'PageContainer';

/**
 * Content Container - Content section wrapper
 */
export const ContentContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="content" {...props} />
);
ContentContainer.displayName = 'ContentContainer';

/**
 * Card Container - Card-like wrapper
 */
export const CardContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="card" {...props} />
);
CardContainer.displayName = 'CardContainer';

/**
 * Hero Container - Hero section wrapper
 */
export const HeroContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="hero" {...props} />
);
HeroContainer.displayName = 'HeroContainer';

/**
 * Article Container - Article content wrapper
 */
export const ArticleContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="article" {...props} />
);
ArticleContainer.displayName = 'ArticleContainer';

/**
 * Sidebar Container - Sidebar wrapper
 */
export const SidebarContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="sidebar" {...props} />
);
SidebarContainer.displayName = 'SidebarContainer';

/**
 * Modal Container - Modal content wrapper
 */
export const ModalContainer = forwardRef<HTMLElement, Omit<ContainerProps, 'intent'>>(
  (props, ref) => <Container ref={ref} intent="modal" {...props} />
);
ModalContainer.displayName = 'ModalContainer';

// Export variants for external use
export { containerVariants, intentVariants };
export type ContainerVariant = VariantProps<typeof containerVariants>;