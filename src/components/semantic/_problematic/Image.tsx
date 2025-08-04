/**
 * @fileoverview Semantic Image Component v5.0.0 - Complete Image Element Abstraction
 * @description Semantic image component with accessibility and performance optimization
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, Performance optimized
 */

import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC IMAGE TYPES
// =============================================================================

/**
 * Image semantic intents
 */
export type ImageIntent = 
  | 'default'      // Standard image
  | 'avatar'       // User avatar
  | 'logo'         // Brand logo
  | 'hero'         // Hero/banner image
  | 'thumbnail'    // Small preview image
  | 'gallery'      // Gallery image
  | 'product'      // Product image
  | 'background'   // Background image
  | 'icon'         // Icon image
  | 'decorative';  // Decorative image (aria-hidden)

/**
 * Image aspect ratios
 */
export type ImageAspectRatio = 
  | 'auto'         // Natural aspect ratio
  | 'square'       // 1:1
  | 'video'        // 16:9
  | 'photo'        // 4:3
  | 'portrait'     // 3:4
  | 'wide'         // 21:9
  | 'golden';      // Golden ratio ~1.618:1

/**
 * Image fit options
 */
export type ImageFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

/**
 * Image loading states
 */
export type ImageLoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * Image sizes for responsive images
 */
export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

// =============================================================================
// IMAGE VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const imageVariants = cva(
  // Base classes using design tokens
  'transition-all duration-200 ease-in-out',
  {
    variants: {
      // Visual variants
      variant: {
        default: '',
        rounded: 'rounded-md',
        circular: 'rounded-full',
        bordered: 'border-2 border-border',
        shadow: 'shadow-md hover:shadow-lg',
        elevated: 'shadow-lg hover:shadow-xl',
      },
      
      // Aspect ratios
      aspectRatio: {
        auto: 'aspect-auto',
        square: 'aspect-square',
        video: 'aspect-video',     // 16:9
        photo: 'aspect-[4/3]',     // 4:3
        portrait: 'aspect-[3/4]',  // 3:4
        wide: 'aspect-[21/9]',     // 21:9
        golden: 'aspect-[1.618/1]', // Golden ratio
      },
      
      // Object fit
      fit: {
        cover: 'object-cover',
        contain: 'object-contain',
        fill: 'object-fill',
        none: 'object-none',
        'scale-down': 'object-scale-down',
      },
      
      // Object position
      position: {
        center: 'object-center',
        top: 'object-top',
        bottom: 'object-bottom',
        left: 'object-left',
        right: 'object-right',
        'left-top': 'object-left-top',
        'right-top': 'object-right-top',
        'left-bottom': 'object-left-bottom',
        'right-bottom': 'object-right-bottom',
      },
      
      // Size variants
      size: {
        xs: 'w-8 h-8',         // 32px
        sm: 'w-12 h-12',       // 48px
        md: 'w-16 h-16',       // 64px
        lg: 'w-24 h-24',       // 96px
        xl: 'w-32 h-32',       // 128px
        '2xl': 'w-48 h-48',    // 192px
        full: 'w-full h-auto', // Full width, auto height
      },
      
      // Loading state styling
      loading: {
        true: 'animate-pulse bg-muted',
        false: '',
      },
      
      // Interactive state
      interactive: {
        true: 'cursor-pointer hover:opacity-90 hover:scale-105',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      aspectRatio: 'auto',
      fit: 'cover',
      position: 'center',
      size: 'full',
      loading: false,
      interactive: false,
    },
  }
);

// =============================================================================
// IMAGE COMPONENT INTERFACE
// =============================================================================

export interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'size' | 'loading'>,
    VariantProps<typeof imageVariants> {
  /** Image semantic intent */
  readonly intent?: ImageIntent;
  /** Aspect ratio */
  readonly aspectRatio?: ImageAspectRatio;
  /** Object fit */
  readonly fit?: ImageFit;
  /** Object position */
  readonly position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';
  /** Image size */
  readonly size?: ImageSize;
  /** Whether image is interactive */
  readonly interactive?: boolean;
  /** Fallback image source */
  readonly fallbackSrc?: string;
  /** Loading placeholder component */
  readonly placeholder?: React.ReactNode;
  /** Error placeholder component */
  readonly errorPlaceholder?: React.ReactNode;
  /** Priority loading for above-the-fold images */
  readonly priority?: boolean;
  /** Lazy loading */
  readonly lazy?: boolean;
  /** Responsive image sources */
  readonly srcSet?: string;
  /** Responsive image sizes */
  readonly sizes?: string;
  /** Language code for i18n */
  readonly lang?: string;
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Click handler for interactive images */
  readonly onImageClick?: () => void;
  /** Load event handler */
  readonly onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Error event handler */
  readonly onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

// =============================================================================
// DEFAULT PLACEHOLDERS
// =============================================================================

const LoadingPlaceholder: React.FC<{ size?: ImageSize }> = ({ size = 'full' }) => {
  return (
    <div className={cn(
      'flex items-center justify-center bg-muted animate-pulse',
      size === 'xs' && 'w-8 h-8',
      size === 'sm' && 'w-12 h-12',
      size === 'md' && 'w-16 h-16',
      size === 'lg' && 'w-24 h-24',
      size === 'xl' && 'w-32 h-32',
      size === '2xl' && 'w-48 h-48',
      size === 'full' && 'w-full h-full min-h-[8rem]'
    )}>
      <svg
        className="w-8 h-8 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  );
};

const ErrorPlaceholder: React.FC<{ size?: ImageSize }> = ({ size = 'full' }) => {
  return (
    <div className={cn(
      'flex items-center justify-center bg-muted border-2 border-dashed border-muted-foreground/25',
      size === 'xs' && 'w-8 h-8',
      size === 'sm' && 'w-12 h-12',
      size === 'md' && 'w-16 h-16',
      size === 'lg' && 'w-24 h-24',
      size === 'xl' && 'w-32 h-32',
      size === '2xl' && 'w-48 h-48',
      size === 'full' && 'w-full h-full min-h-[8rem]'
    )}>
      <svg
        className="w-8 h-8 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    </div>
  );
};

// =============================================================================
// SEMANTIC IMAGE COMPONENT
// =============================================================================

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      intent = 'default',
      variant = 'default',
      aspectRatio = 'auto',
      fit = 'cover',
      position = 'center',
      size = 'full',
      interactive = false,
      fallbackSrc,
      placeholder,
      errorPlaceholder,
      priority = false,
      lazy = true,
      srcSet,
      sizes,
      lang,
      nsmLevel,
      onImageClick,
      onLoad,
      onError,
      src,
      alt,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const [loadingState, setLoadingState] = useState<ImageLoadingState>('idle');
    const [currentSrc, setCurrentSrc] = useState(src);

    // Auto-configure based on intent
    const getIntentConfig = () => {
      if (!intent || intent === 'default') return {};
      
      const configs: Record<ImageIntent, Partial<ImageProps>> = {
        default: {},
        avatar: {
          variant: 'circular',
          aspectRatio: 'square',
          size: 'md',
          fit: 'cover',
        },
        logo: {
          fit: 'contain',
          priority: true,
        },
        hero: {
          aspectRatio: 'video',
          fit: 'cover',
          priority: true,
          lazy: false,
        },
        thumbnail: {
          variant: 'rounded',
          aspectRatio: 'square',
          size: 'sm',
          fit: 'cover',
        },
        gallery: {
          variant: 'rounded',
          aspectRatio: 'photo',
          fit: 'cover',
          interactive: true,
        },
        product: {
          variant: 'rounded',
          aspectRatio: 'square',
          fit: 'cover',
          interactive: true,
        },
        background: {
          fit: 'cover',
          size: 'full',
        },
        icon: {
          size: 'xs',
          fit: 'contain',
        },
        decorative: {
          // Will be marked with aria-hidden
        },
      };
      
      return configs[intent] || {};
    };

    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      // Decorative images should be hidden from screen readers
      if (intent === 'decorative') {
        attributes['aria-hidden'] = true;
        attributes.alt = '';
      } else if (alt) {
        attributes.alt = alt;
      }
      
      if (interactive) {
        attributes.tabIndex = 0;
        attributes.role = 'button';
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };

    // Handle image load
    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState('loaded');
      onLoad?.(event);
    };

    // Handle image error with fallback
    const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
      setLoadingState('error');
      
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setLoadingState('loading');
        return;
      }
      
      onError?.(event);
    };

    // Handle click for interactive images
    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
      if (!interactive) return;
      
      onClick?.(event);
      onImageClick?.();
    };

    // Handle keyboard interaction
    const handleKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
      if (!interactive) return;
      
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onImageClick?.();
      }
    };

    const intentConfig = getIntentConfig();
    const finalVariant = intentConfig.variant || variant;
    const finalAspectRatio = intentConfig.aspectRatio || aspectRatio;
    const finalFit = intentConfig.fit || fit;
    const finalSize = intentConfig.size || size;
    const finalInteractive = intentConfig.interactive || interactive;
    const finalPriority = intentConfig.priority || priority;
    const finalLazy = intentConfig.lazy !== undefined ? intentConfig.lazy : lazy;
    const accessibilityAttributes = getAccessibilityAttributes();

    // Show loading placeholder
    if (loadingState === 'loading' || (loadingState === 'idle' && finalLazy)) {
      if (placeholder) {
        return <>{placeholder}</>;
      }
      return <LoadingPlaceholder size={finalSize} />;
    }

    // Show error placeholder
    if (loadingState === 'error' && !fallbackSrc) {
      if (errorPlaceholder) {
        return <>{errorPlaceholder}</>;
      }
      return <ErrorPlaceholder size={finalSize} />;
    }

    return (
      <img
        ref={ref}
        src={currentSrc}
        srcSet={srcSet}
        sizes={sizes}
        loading={finalPriority ? 'eager' : finalLazy === true ? 'lazy' : 'eager'}
        className={cn(
          imageVariants({
            variant: finalVariant,
            aspectRatio: finalAspectRatio,
            fit: finalFit,
            position,
            size: finalSize,
            interactive: finalInteractive,
            loading: (loadingState as string) === 'loading',
          }),
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        onClick={handleClick}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...accessibilityAttributes}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';

// =============================================================================
// SEMANTIC IMAGE VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Avatar Image component
 */
export const Avatar = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="avatar" {...props} />
);
Avatar.displayName = 'Avatar';

/**
 * Logo Image component
 */
export const Logo = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="logo" {...props} />
);
Logo.displayName = 'Logo';

/**
 * Hero Image component
 */
export const HeroImage = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="hero" {...props} />
);
HeroImage.displayName = 'HeroImage';

/**
 * Thumbnail Image component
 */
export const Thumbnail = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="thumbnail" {...props} />
);
Thumbnail.displayName = 'Thumbnail';

/**
 * Gallery Image component
 */
export const GalleryImage = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="gallery" {...props} />
);
GalleryImage.displayName = 'GalleryImage';

/**
 * Product Image component
 */
export const ProductImage = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="product" {...props} />
);
ProductImage.displayName = 'ProductImage';

/**
 * Icon Image component
 */
export const IconImage = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="icon" {...props} />
);
IconImage.displayName = 'IconImage';

/**
 * Decorative Image component (hidden from screen readers)
 */
export const DecorativeImage = forwardRef<HTMLImageElement, Omit<ImageProps, 'intent'>>(
  (props, ref) => <Image ref={ref} intent="decorative" {...props} />
);
DecorativeImage.displayName = 'DecorativeImage';