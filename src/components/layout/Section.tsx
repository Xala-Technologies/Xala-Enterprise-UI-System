/**
 * @fileoverview Section Component v5.0.0 - CVA Design System
 * @description Modern Section component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-pattern
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Section variants using semantic Tailwind classes with CVA pattern
 * All spacing uses semantic token classes
 */
const sectionVariants = cva('w-full', {
  variants: {
    variant: {
      primary: 'bg-background text-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      muted: 'bg-muted text-muted-foreground',
      card: 'bg-card text-card-foreground border border-border rounded-lg',
      hero: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground',
      feature: 'bg-accent text-accent-foreground',
      testimonial: 'bg-muted/50 text-foreground border-l-4 border-primary',
      transparent: 'bg-transparent',
    },
    spacing: {
      none: 'space-y-0',
      xs: 'space-y-1',
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
      '2xl': 'space-y-12',
    },
    background: {
      transparent: 'bg-transparent',
      primary: 'bg-background',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      card: 'bg-card',
      accent: 'bg-accent',
      destructive: 'bg-destructive',
      success: 'bg-green-50',
      warning: 'bg-yellow-50',
    },
    padding: {
      none: 'p-0',
      xs: 'p-2',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-12',
      '2xl': 'p-16',
    },
    margin: {
      none: 'm-0',
      xs: 'm-2',
      sm: 'm-4',
      md: 'm-6',
      lg: 'm-8',
      xl: 'm-12',
      '2xl': 'm-16',
    },
    maxWidth: {
      none: 'max-w-none',
      sm: 'max-w-sm mx-auto',
      md: 'max-w-md mx-auto',
      lg: 'max-w-lg mx-auto',
      xl: 'max-w-xl mx-auto',
      '2xl': 'max-w-2xl mx-auto',
      '4xl': 'max-w-4xl mx-auto',
      '6xl': 'max-w-6xl mx-auto',
      '7xl': 'max-w-7xl mx-auto',
      full: 'max-w-full',
      prose: 'max-w-prose mx-auto',
    },
    textAlign: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    bordered: {
      true: 'border border-border',
      false: '',
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    },
  },
  defaultVariants: {
    variant: 'primary',
    spacing: 'md',
    background: 'transparent',
    padding: 'md',
    margin: 'none',
    maxWidth: 'none',
    textAlign: 'left',
    bordered: false,
    shadow: 'none',
  },
});

/**
 * Base variant props from class-variance-authority
 */
export interface SectionProps 
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  /** HTML element type */
  readonly as?: keyof JSX.IntrinsicElements;
  readonly testId?: string;
}

// =============================================================================
// SECTION COMPONENT
// =============================================================================

/**
 * Section component with pure CVA pattern styling
 */
export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    variant, 
    spacing, 
    background, 
    padding, 
    margin, 
    maxWidth,
    textAlign,
    bordered,
    shadow,
    as: Component = 'section', 
    testId,
    ...props 
  }, ref) => {
    const ElementType = Component as React.ElementType;

    return (
      <ElementType
        ref={ref}
        className={cn(
          sectionVariants({
            variant,
            spacing,
            background,
            padding,
            margin,
            maxWidth,
            textAlign,
            bordered,
            shadow,
          }),
          className
        )}
        data-testid={testId}
        {...props}
      />
    );
  }
);

Section.displayName = 'Section';

/**
 * Hero Section component (convenience wrapper)
 * @param props - Section props
 * @returns Hero Section JSX element
 */
export const HeroSection = forwardRef<HTMLElement, SectionProps>((props, ref) => (
  <Section ref={ref} variant="hero" padding="xl" textAlign="center" {...props} />
));

HeroSection.displayName = 'HeroSection';

/**
 * Feature Section component (convenience wrapper)
 * @param props - Section props
 * @returns Feature Section JSX element
 */
export const FeatureSection = forwardRef<HTMLElement, SectionProps>((props, ref) => (
  <Section ref={ref} variant="feature" padding="lg" maxWidth="4xl" {...props} />
));

FeatureSection.displayName = 'FeatureSection';

/**
 * Card Section component (convenience wrapper)
 * @param props - Section props
 * @returns Card Section JSX element
 */
export const CardSection = forwardRef<HTMLElement, SectionProps>((props, ref) => (
  <Section ref={ref} variant="card" shadow="md" padding="lg" {...props} />
));

CardSection.displayName = 'CardSection';

/**
 * Section variants type exports
 */
export type SectionVariants = VariantProps<typeof sectionVariants>;
export { sectionVariants };
