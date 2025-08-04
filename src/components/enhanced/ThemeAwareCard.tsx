/**
 * @fileoverview Enhanced Card Component v5.0.0 - CVA Pattern
 * @description Production-ready card component using CVA pattern with semantic tokens
 * @version 5.0.0
 * @compliance CVA-based, SSR-Safe, No hooks, Semantic tokens, WCAG 2.2 AAA
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { Box } from '../semantic';

// =============================================================================
// ENHANCED CARD VARIANTS
// =============================================================================

/**
 * Enhanced card variants using semantic tokens - CVA pattern
 */
const enhancedCardVariants = cva(
  // Base classes using semantic tokens
  'relative block rounded-lg border bg-card text-card-foreground transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-border bg-card shadow-sm',
        elevated: 'border-none bg-card shadow-md hover:shadow-lg',
        outlined: 'border-2 border-border bg-background shadow-none',
        flat: 'border-none bg-card shadow-none',
        ghost: 'border-none bg-transparent shadow-none hover:bg-muted/50',
        filled: 'border-none bg-muted shadow-none hover:bg-muted/80',
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
      variant: 'elevated',
      padding: 'md',
      interactive: false,
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Enhanced card component props using CVA pattern
 */
export interface EnhancedCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof enhancedCardVariants> {
  /** Card header content */
  readonly header?: React.ReactNode;
  
  /** Card body content */
  readonly children: React.ReactNode;
  
  /** Card footer content */
  readonly footer?: React.ReactNode;
  
  /** Card image */
  readonly image?: {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
    position?: 'top' | 'background';
  };
  
  /** Card actions */
  readonly actions?: React.ReactNode;
  
  /** Loading state */
  readonly loading?: boolean;
  
  /** Error state */
  readonly error?: boolean;
  readonly errorMessage?: string;
}

// =============================================================================
// ENHANCED CARD COMPONENT
// =============================================================================

/**
 * Enhanced card component using CVA pattern
 */
export const EnhancedCard = forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({
    className,
    variant = 'elevated',
    padding = 'md',
    interactive,
    header,
    children,
    footer,
    image,
    actions,
    loading = false,
    error = false,
    errorMessage,
    onClick,
    ...props
  }, ref) => {
    // Determine if card is interactive
    const isInteractive = interactive ?? !!onClick;

    const getAspectRatioClass = (): string => {
      switch (image?.aspectRatio) {
        case 'square': return 'aspect-square';
        case 'video': return 'aspect-video';
        case 'wide': return 'aspect-[16/9]';
        case 'portrait': return 'aspect-[3/4]';
        default: return 'aspect-[4/3]';
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (onClick && !loading && !error) {
        onClick(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (onClick && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleClick();
      }
    };

    // Loading skeleton
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            enhancedCardVariants({
              variant: 'default',
              padding,
              interactive: false,
            }),
            'animate-pulse',
            className
          )}
          {...props}
        >
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
            <div className="h-20 bg-muted rounded animate-pulse" />
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-1/4 animate-pulse" />
              <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
            </div>
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div
          ref={ref}
          className={cn(
            enhancedCardVariants({
              variant: 'outlined',
              padding,
              interactive: false,
            }),
            'border-destructive/50 bg-destructive/5',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3 text-destructive">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium text-sm">Card Error</p>
              {errorMessage && (
                <p className="text-xs text-muted-foreground mt-1">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          enhancedCardVariants({
            variant,
            padding,
            interactive: isInteractive && !loading && !error,
          }),
          className
        )}
        onClick={handleClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? handleKeyDown : undefined}
        {...props}
      >
        {/* Background Image */}
        {image?.position === 'background' && (
          <div className="absolute inset-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        
        {/* Top Image */}
        {image?.position === 'top' && (
          <div className={cn('relative mb-4 -m-6 mx-0 overflow-hidden rounded-t-lg', getAspectRatioClass())}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        {/* Card Content */}
        <div className={cn('relative', image?.position === 'background' && 'text-white z-10')}>
          {/* Header */}
          {header && (
            <div className="mb-4">
              {header}
            </div>
          )}
          
          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
          
          {/* Footer */}
          {footer && (
            <div className="mt-4">
              {footer}
            </div>
          )}
          
          {/* Actions */}
          {actions && (
            <div className="mt-6 flex gap-2 justify-end">
              {actions}
            </div>
          )}
        </div>
      </div>
    );
  }
);

EnhancedCard.displayName = 'EnhancedCard';

// Backward compatibility export
export const ThemeAwareCard = EnhancedCard;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type EnhancedCardVariant = VariantProps<typeof enhancedCardVariants>;
export { enhancedCardVariants };

// Backward compatibility exports
export type ThemeAwareCardProps = EnhancedCardProps;
export type ThemeAwareCardVariant = EnhancedCardVariant;
export const themeAwareCardVariants = enhancedCardVariants;