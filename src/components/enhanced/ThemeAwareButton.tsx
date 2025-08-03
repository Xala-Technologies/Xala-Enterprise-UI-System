/**
 * @fileoverview Theme-Aware Enhanced Button Component v5.0.0
 * @description Production-ready button component with multi-theme support and professional animations
 * @version 5.0.0
 * @compliance Design token-driven, WCAG 2.2 AAA, Professional sizing
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// THEME-AWARE BUTTON VARIANTS
// =============================================================================

/**
 * Theme-aware button variants that adapt to any theme
 */
const themeAwareButtonVariants = cva(
  [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-2',
    'focus-visible:ring-primary',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
    'motion-reduce:transition-none',
    'select-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary',
          'text-primary-foreground',
          'hover:bg-primary/90',
          'active:bg-primary/95',
          'shadow-sm',
          'hover:shadow-md',
        ],
        secondary: [
          'bg-secondary',
          'text-secondary-foreground',
          'hover:bg-secondary/80',
          'active:bg-secondary/90',
          'shadow-sm',
          'hover:shadow-md',
        ],
        destructive: [
          'bg-destructive',
          'text-destructive-foreground',
          'hover:bg-destructive/90',
          'active:bg-destructive/95',
          'shadow-sm',
          'hover:shadow-md',
        ],
        outline: [
          'border-2',
          'border-border',
          'bg-transparent',
          'text-foreground',
          'hover:bg-muted',
          'hover:border-primary/50',
          'active:bg-muted/80',
        ],
        ghost: [
          'bg-transparent',
          'text-foreground',
          'hover:bg-muted',
          'active:bg-muted/80',
        ],
        link: [
          'bg-transparent',
          'text-primary',
          'underline-offset-4',
          'hover:underline',
          'active:text-primary/80',
        ],
        elevated: [
          'bg-background',
          'text-foreground',
          'border',
          'border-border',
          'shadow-lg',
          'hover:shadow-xl',
          'hover:bg-muted/50',
          'active:shadow-md',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-4 text-base', // Professional standard (44px)
        lg: 'h-14 px-6 text-lg',   // Professional standard (56px)
        xl: 'h-16 px-8 text-xl',   // Professional standard (64px)
        icon: 'h-11 w-11',         // Square icon button
        'icon-sm': 'h-9 w-9',
        'icon-lg': 'h-14 w-14',
        'icon-xl': 'h-16 w-16',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
        fit: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      rounded: 'lg',
      width: 'auto',
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Enhanced button component props with full theme integration
 */
export interface ThemeAwareButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof themeAwareButtonVariants> {
  /** Button loading state */
  readonly loading?: boolean;
  
  /** Loading text */
  readonly loadingText?: string;
  
  /** Custom loading spinner */
  readonly loadingSpinner?: React.ReactNode;
  
  /** Left icon */
  readonly leftIcon?: React.ReactNode;
  
  /** Right icon */
  readonly rightIcon?: React.ReactNode;
  
  /** Enable theme-specific animations */
  readonly enableAnimations?: boolean;
  
  /** Custom elevation level (0-5) */
  readonly elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  
  /** Button as a link */
  readonly asChild?: boolean;
  
  /** Tooltip text */
  readonly tooltip?: string;
  
  /** Badge count */
  readonly badge?: number;
  
  /** Badge color */
  readonly badgeVariant?: 'default' | 'destructive' | 'secondary' | 'success' | 'warning';
}

// =============================================================================
// THEME-AWARE BUTTON COMPONENT
// =============================================================================

/**
 * Enhanced theme-aware button component with professional animations
 */
export const ThemeAwareButton = forwardRef<HTMLButtonElement, ThemeAwareButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      width,
      loading = false,
      loadingText,
      loadingSpinner,
      leftIcon,
      rightIcon,
      enableAnimations = true,
      elevation = 0,
      tooltip,
      badge,
      badgeVariant = 'destructive',
      children,
      disabled,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    // ✅ Access theme tokens
    const { 
      colors, 
      spacing, 
      elevation: elevationTokens,
      borderRadius,
      motion,
      componentSizing,
      typography,
      themeInfo 
    } = useTokens();
    
    // Calculate dynamic styling based on current theme
    const buttonStyles = useMemo((): React.CSSProperties => {
      // Animation settings
      const transitionDuration = enableAnimations 
        ? (motion?.duration?.normal || '200ms')
        : '0ms';
      const transitionEasing = motion?.easing?.easeOut || 'ease-out';
      
      // Get elevation shadow based on theme
      const elevationLevels = ['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
      const shadowKey = elevationLevels[elevation] || 'none';
      const boxShadow = elevationTokens?.[shadowKey] || 'none';
      
      // Get border radius from theme
      const borderRadiusValue = borderRadius?.lg || '8px';
      
      // Get component sizing from theme
      const minHeight = componentSizing?.button?.md || '44px';
      
      return {
        minHeight,
        borderRadius: borderRadiusValue,
        boxShadow: elevation > 0 ? boxShadow : undefined,
        transition: `all ${transitionDuration} ${transitionEasing}`,
        fontSize: typography?.fontSize?.base || '16px',
        fontWeight: typography?.fontWeight?.medium || 500,
        ...style,
      };
    }, [
      enableAnimations, 
      motion, 
      elevation, 
      elevationTokens, 
      borderRadius, 
      componentSizing, 
      typography,
      style
    ]);
    
    // Theme-aware hover effects
    const hoverStyles = useMemo((): React.CSSProperties => {
      if (!enableAnimations) return {};
      
      const elevationLevels = ['sm', 'md', 'lg', 'xl', '2xl', '2xl'] as const;
      const hoverShadowKey = elevationLevels[Math.min(elevation + 1, 5)] || 'md';
      const hoverShadow = elevationTokens?.[hoverShadowKey] || 'none';
      
      return {
        '--hover-shadow': elevation > 0 ? hoverShadow : 'none',
        '--hover-transform': variant === 'elevated' || variant === 'primary' 
          ? 'translateY(-1px)' 
          : 'none',
      };
    }, [enableAnimations, elevation, elevationTokens, variant]);

    // Badge styling
    const badgeStyles = useMemo((): React.CSSProperties => {
      const badgeColors = {
        default: colors?.neutral?.[600] || '#6b7280',
        destructive: colors?.semantic?.error || '#ef4444',
        secondary: colors?.neutral?.[500] || '#9ca3af',
        success: colors?.semantic?.success || '#10b981',
        warning: colors?.semantic?.warning || '#f59e0b',
      };
      
      return {
        backgroundColor: badgeColors[badgeVariant],
        color: '#ffffff',
      };
    }, [colors, badgeVariant]);

    const isDisabled = disabled || loading;
    const hasIcon = leftIcon || rightIcon;
    const isIconOnly = !children && hasIcon;

    // Default loading spinner
    const defaultLoadingSpinner = (
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    );

    return (
      <button
        ref={ref}
        className={cn(
          themeAwareButtonVariants({
            variant,
            size: isIconOnly ? `icon${size === 'sm' ? '-sm' : size === 'lg' ? '-lg' : size === 'xl' ? '-xl' : ''}` as any : size,
            rounded,
            width,
          }),
          className
        )}
        style={{ ...buttonStyles, ...hoverStyles }}
        disabled={isDisabled}
        title={tooltip}
        onMouseEnter={(e) => {
          if (enableAnimations && !isDisabled) {
            const target = e.currentTarget as HTMLElement;
            const hoverShadow = getComputedStyle(target).getPropertyValue('--hover-shadow') || '';
            const hoverTransform = getComputedStyle(target).getPropertyValue('--hover-transform') || '';
            
            if (hoverShadow) target.style.boxShadow = hoverShadow;
            if (hoverTransform) target.style.transform = hoverTransform;
          }
        }}
        onMouseLeave={(e) => {
          if (enableAnimations && !isDisabled) {
            const target = e.currentTarget as HTMLElement;
            target.style.boxShadow = buttonStyles.boxShadow || '';
            target.style.transform = '';
          }
        }}
        {...props}
      >
        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <span
            className="absolute -top-2 -right-2 min-w-[1.25rem] h-5 text-xs font-bold rounded-full flex items-center justify-center z-10"
            style={badgeStyles}
          >
            {badge > 99 ? '99+' : badge}
          </span>
        )}
        
        {/* Left Icon or Loading Spinner */}
        {loading && !rightIcon ? (
          <span className={cn('flex items-center', children && 'mr-2')}>
            {loadingSpinner || defaultLoadingSpinner}
          </span>
        ) : leftIcon ? (
          <span className={cn('flex items-center', children && 'mr-2')}>
            {leftIcon}
          </span>
        ) : null}
        
        {/* Button Content */}
        {loading && loadingText ? (
          <span>{loadingText}</span>
        ) : children ? (
          <span className="flex items-center justify-center">
            {children}
          </span>
        ) : null}
        
        {/* Right Icon or Loading Spinner */}
        {loading && rightIcon ? (
          <span className={cn('flex items-center', children && 'ml-2')}>
            {loadingSpinner || defaultLoadingSpinner}
          </span>
        ) : rightIcon && !loading ? (
          <span className={cn('flex items-center', children && 'ml-2')}>
            {rightIcon}
          </span>
        ) : null}
        
        {/* Theme indicator (dev mode) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute -bottom-6 left-0 text-xs bg-primary/10 text-primary px-2 py-1 rounded text-[10px] whitespace-nowrap">
            {themeInfo.name} ({themeInfo.mode})
          </div>
        )}
      </button>
    );
  }
);

ThemeAwareButton.displayName = 'ThemeAwareButton';

// =============================================================================
// BUTTON GROUP COMPONENT
// =============================================================================

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
  readonly orientation?: 'horizontal' | 'vertical';
  readonly spacing?: number;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', spacing = 1, ...props }, ref) => {
    const { spacing: spacingTokens } = useTokens();
    
    const groupStyles: React.CSSProperties = {
      gap: spacingTokens?.[spacing] || '4px',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          '[&>button:not(first)]:ml-0',
          '[&>button:not(last)]:mr-0',
          className
        )}
        style={groupStyles}
        role="group"
        {...props}
      >
        {children}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ThemeAwareButtonVariant = VariantProps<typeof themeAwareButtonVariants>;
export { themeAwareButtonVariants };