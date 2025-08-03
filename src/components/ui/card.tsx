/**
 * @fileoverview Card Component v5.0.0 - Token-Based Design System
 * @description Modern Card component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

// ✅ NO 'use client' directive - works in SSR
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// CARD VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Card variants using semantic Tailwind classes
 * Pure CVA implementation with design token classes
 */
const cardVariants = cva(
  // Base classes using semantic tokens
  'relative block rounded-lg border bg-card text-card-foreground transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: 'border-border bg-card shadow-sm',
        elevated: 'border-none bg-card shadow-md hover:shadow-lg',
        outlined: 'border-2 border-border bg-background shadow-none',
        flat: 'border-none bg-card shadow-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg transition-shadow',
        false: 'cursor-default',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  }
);

// =============================================================================
// CARD COMPONENT INTERFACE
// =============================================================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  readonly variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  readonly padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly interactive?: boolean;
}

// =============================================================================
// CARD COMPONENT
// =============================================================================

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padding = 'md',
    interactive,
    onClick,
    children,
    ...props
  }, ref) => {
    // Determine if card is interactive
    const isInteractive = interactive ?? !!onClick;

    return (
      <div
        className={cn(cardVariants({ variant, padding, interactive: isInteractive }), className)}
        ref={ref}
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// =============================================================================
// CARD TITLE COMPONENT
// =============================================================================

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  readonly children: React.ReactNode;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <h3 
        className={cn('text-lg font-semibold leading-none tracking-tight', className)} 
        ref={ref}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'CardTitle';

// =============================================================================
// CARD DESCRIPTION COMPONENT
// =============================================================================

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  readonly children: React.ReactNode;
}

export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p 
        className={cn('text-sm text-muted-foreground', className)} 
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'CardDescription';

// =============================================================================
// CARD HEADER COMPONENT
// =============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        className={cn('flex flex-col space-y-1.5 p-6 pb-2', className)} 
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// =============================================================================
// CARD CONTENT COMPONENT
// =============================================================================

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        className={cn('p-6 pt-0', className)} 
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

// =============================================================================
// CARD FOOTER COMPONENT
// =============================================================================

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div 
        className={cn('flex items-center p-6 pt-0', className)} 
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
