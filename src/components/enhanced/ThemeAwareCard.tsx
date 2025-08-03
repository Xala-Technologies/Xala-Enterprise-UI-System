/**
 * @fileoverview Theme-Aware Enhanced Card Component v5.0.0
 * @description Production-ready card component integrated with theme system
 * @version 5.0.0
 * @compliance Design token-driven, Multi-theme support, WCAG 2.2 AAA
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, type HTMLAttributes, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// THEME-AWARE CARD VARIANTS
// =============================================================================

/**
 * Theme-aware card variants that adapt to any theme
 */
const themeAwareCardVariants = cva(
  [
    'relative',
    'overflow-hidden', 
    'transition-all',
    'cursor-pointer',
    'group',
    'motion-reduce:transition-none',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background',
          'hover:bg-background',
          'border',
          'border-border',
          'hover:border-border',
        ],
        elevated: [
          'bg-background',
          'hover:bg-background',
          'border-0',
        ],
        outlined: [
          'bg-transparent',
          'hover:bg-muted/50',
          'border-2',
          'border-border',
          'hover:border-primary/20',
        ],
        ghost: [
          'bg-transparent',
          'hover:bg-muted/50',
          'border-0',
        ],
        filled: [
          'bg-muted',
          'hover:bg-muted/80',
          'border-0',
        ],
      },
      size: {
        sm: 'p-4',
        md: 'p-6', 
        lg: 'p-8',
        xl: 'p-10',
      },
      interactive: {
        true: 'hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'elevated',
      size: 'md',
      interactive: true,
      rounded: 'lg',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Enhanced card component props with full theme integration
 */
export interface ThemeAwareCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof themeAwareCardVariants> {
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
  
  /** Card click handler */
  readonly onClick?: () => void;
  
  /** Custom spacing multiplier */
  readonly spacing?: number;
  
  /** Enable theme-specific animations */
  readonly enableAnimations?: boolean;
  
  /** Custom elevation level (0-5) */
  readonly elevation?: 0 | 1 | 2 | 3 | 4 | 5;
}

// =============================================================================
// THEME-AWARE CARD COMPONENT
// =============================================================================

/**
 * Enhanced theme-aware card component
 */
export const ThemeAwareCard = forwardRef<HTMLDivElement, ThemeAwareCardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      rounded,
      header,
      children,
      footer,
      image,
      actions,
      loading = false,
      error = false,
      errorMessage,
      onClick,
      spacing = 1,
      enableAnimations = true,
      elevation = 2,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    // ✅ Access theme tokens
    const { 
      colors, 
      spacing: spacingTokens, 
      elevation: elevationTokens,
      borderRadius,
      motion,
      componentSizing,
      themeInfo 
    } = useTokens();
    
    // Calculate dynamic styling based on current theme
    const cardStyles = useMemo((): React.CSSProperties => {
      const baseSpacing = spacingTokens?.[4] || '16px';
      const customSpacing = typeof baseSpacing === 'string' 
        ? `calc(${baseSpacing} * ${spacing})` 
        : `${(parseInt(baseSpacing) || 16) * spacing}px`;
      
      // Get elevation shadow based on theme
      const elevationLevels = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
      const shadowKey = elevationLevels[elevation] || 'md';
      const boxShadow = elevationTokens?.[shadowKey] || 'none';
      
      // Get border radius from theme
      const borderRadiusValue = borderRadius?.lg || '8px';
      
      // Animation settings
      const transitionDuration = enableAnimations 
        ? (motion?.duration?.normal || '300ms')
        : '0ms';
      const transitionEasing = motion?.easing?.easeOut || 'ease-out';
      
      return {
        boxShadow: variant === 'elevated' ? boxShadow : 'none',
        borderRadius: borderRadiusValue,
        transition: `all ${transitionDuration} ${transitionEasing}`,
        '--card-spacing': customSpacing,
        ...style,
      };
    }, [
      spacingTokens, 
      spacing, 
      elevationTokens, 
      elevation, 
      borderRadius, 
      variant, 
      enableAnimations, 
      motion,
      style
    ]);
    
    // Theme-aware hover effects
    const hoverStyles = useMemo((): React.CSSProperties => {
      if (!interactive || !enableAnimations) return {};
      
      const elevationLevels = ['sm', 'md', 'lg', 'xl', '2xl', '2xl'] as const;
      const hoverShadowKey = elevationLevels[Math.min(elevation + 1, 5)] || 'lg';
      const hoverShadow = elevationTokens?.[hoverShadowKey] || 'none';
      
      return {
        '--hover-shadow': variant === 'elevated' ? hoverShadow : 'none',
        '--hover-transform': 'translateY(-2px)',
      };
    }, [interactive, enableAnimations, elevation, elevationTokens, variant]);

    const handleClick = (): void => {
      if (onClick && !loading && !error) {
        onClick();
      }
    };

    const getAspectRatioClass = (): string => {
      switch (image?.aspectRatio) {
        case 'square': return 'aspect-square';
        case 'video': return 'aspect-video';
        case 'wide': return 'aspect-[16/9]';
        case 'portrait': return 'aspect-[3/4]';
        default: return 'aspect-[4/3]';
      }
    };

    // Loading skeleton
    if (loading) {
      return (
        <div
          ref={ref}
          className={cn(
            themeAwareCardVariants({
              variant: 'default',
              size,
              interactive: false,
              rounded,
            }),
            'animate-pulse',
            className
          )}
          style={cardStyles}
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
            themeAwareCardVariants({
              variant: 'outlined',
              size,
              interactive: false,
              rounded,
            }),
            'border-destructive/50 bg-destructive/5',
            className
          )}
          style={cardStyles}
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
          themeAwareCardVariants({
            variant,
            size,
            interactive: interactive && !loading && !error,
            rounded,
          }),
          'focus-visible:ring-primary',
          className
        )}
        style={{ ...cardStyles, ...hoverStyles }}
        onClick={handleClick}
        onMouseEnter={(e) => {
          if (interactive && enableAnimations && !loading && !error) {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = getComputedStyle(target).getPropertyValue('--hover-shadow') || '';
            target.style.transform = getComputedStyle(target).getPropertyValue('--hover-transform') || '';
          }
        }}
        onMouseLeave={(e) => {
          if (interactive && enableAnimations && !loading && !error) {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = cardStyles.boxShadow || '';
            target.style.transform = '';
          }
        }}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick 
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick();
                }
              }
            : undefined
        }
        {...props}
      >
        {/* Background Image */}
        {image?.position === 'background' && (
          <div className="absolute inset-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}
        
        {/* Top Image */}
        {image?.position === 'top' && (
          <div className={cn('relative mb-4 -m-6 mx-0 overflow-hidden', getAspectRatioClass())}>
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                'w-full h-full object-cover transition-transform duration-300',
                'group-hover:scale-105'
              )}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setImageError(true)}
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
        
        {/* Theme indicator (dev mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-2 left-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded text-[10px]">
            {themeInfo.name} ({themeInfo.mode})
          </div>
        )}
      </div>
    );
  }
);

ThemeAwareCard.displayName = 'ThemeAwareCard';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ThemeAwareCardVariant = VariantProps<typeof themeAwareCardVariants>;
export { themeAwareCardVariants };