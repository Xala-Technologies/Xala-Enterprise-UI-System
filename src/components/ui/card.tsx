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
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// CARD VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Card variants using token-based styling
 * Combines CVA with runtime token access for maximum flexibility
 */
const cardVariants = cva(
  // Base classes - framework-agnostic styling
  'relative block transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        default: '',
        elevated: '',
        outlined: '',
        flat: '',
      },
      padding: {
        none: 'p-0',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      },
      interactive: {
        true: 'cursor-pointer hover:shadow-lg',
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
    style,
    ...props
  }, ref) => {
    // ✅ Access design tokens for complete styling control
    const { colors, spacing, getToken } = useTokens();
    
    // Determine if card is interactive
    const isInteractive = interactive ?? !!onClick;

    // Get token-based styles for variant
    const getVariantStyles = (): React.CSSProperties => {
      const shadows = {
        sm: getToken('shadows.sm') as string || '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: getToken('shadows.md') as string || '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: getToken('shadows.lg') as string || '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      };

      switch (variant) {
        case 'default':
          return {
            backgroundColor: colors.background?.paper || '#ffffff',
            border: `1px solid ${colors.border?.default || '#e5e7eb'}`,
            boxShadow: shadows.sm,
          };
        case 'elevated':
          return {
            backgroundColor: colors.background?.paper || '#ffffff',
            border: 'none',
            boxShadow: shadows.md,
          };
        case 'outlined':
          return {
            backgroundColor: colors.background?.default || '#ffffff',
            border: `2px solid ${colors.border?.default || '#e5e7eb'}`,
            boxShadow: 'none',
          };
        case 'flat':
          return {
            backgroundColor: colors.background?.paper || '#ffffff',
            border: 'none',
            boxShadow: 'none',
          };
        default:
          return {};
      }
    };

    // Get token-based styles for padding
    const getPaddingStyles = (): React.CSSProperties => {
      if (padding === 'none') return { padding: '0' };
      
      switch (padding) {
        case 'sm':
          return { padding: spacing?.[3] || '0.75rem' };
        case 'md':
          return { padding: spacing?.[4] || '1rem' };
        case 'lg':
          return { padding: spacing?.[6] || '1.5rem' };
        case 'xl':
          return { padding: spacing?.[8] || '2rem' };
        default:
          return {};
      }
    };
    
    // Base styles from tokens
    const baseStyles: React.CSSProperties = {
      // Border radius from tokens
      borderRadius: getToken('borderRadius.lg') as string || '0.5rem',
      
      // Interactive styles
      cursor: isInteractive ? 'pointer' : 'default',
    };

    // Combine all styles
    const dynamicStyles: React.CSSProperties = {
      ...baseStyles,
      ...getVariantStyles(),
      ...getPaddingStyles(),
      ...style,
    };

    return (
      <div
        className={cn(cardVariants({ variant, padding, interactive: isInteractive }), className)}
        ref={ref}
        style={dynamicStyles}
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
// CARD HEADER COMPONENT
// =============================================================================

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, style, ...props }, ref) => {
    const { spacing, colors } = useTokens();

    const headerStyles: React.CSSProperties = {
      padding: `${spacing?.[4] || '1rem'} ${spacing?.[4] || '1rem'} ${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'}`,
      borderBottom: `1px solid ${colors.border?.muted || '#e5e7eb'}`,
      ...style,
    };

    return (
      <div 
        className={cn('flex flex-col space-y-1.5', className)} 
        style={headerStyles} 
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
  ({ children, className, style, ...props }, ref) => {
    const { spacing } = useTokens();

    const contentStyles: React.CSSProperties = {
      padding: spacing?.[4] || '1rem',
      ...style,
    };

    return (
      <div 
        className={className} 
        style={contentStyles} 
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
  ({ children, className, style, ...props }, ref) => {
    const { spacing, colors } = useTokens();

    const footerStyles: React.CSSProperties = {
      padding: `${spacing?.[2] || '0.5rem'} ${spacing?.[4] || '1rem'} ${spacing?.[4] || '1rem'} ${spacing?.[4] || '1rem'}`,
      borderTop: `1px solid ${colors.border?.muted || '#e5e7eb'}`,
      ...style,
    };

    return (
      <div 
        className={cn('flex items-center', className)} 
        style={footerStyles} 
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
