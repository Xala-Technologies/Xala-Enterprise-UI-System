/**
 * @fileoverview Airbnb-Style Card Component v5.0.0
 * @description Professional card component with Airbnb's signature aesthetic
 * @version 5.0.0
 * @aesthetic Airbnb-inspired: clean, sophisticated, smooth animations
 */

import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useState, type HTMLAttributes } from 'react';
import { airbnbAestheticTokens } from '../../tokens/airbnb-aesthetic-tokens';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../../semantic';

// =============================================================================
// AIRBNB CARD VARIANTS
// =============================================================================

/**
 * Airbnb-style card variants with sophisticated styling
 */
const airbnbCardVariants = cva(
  [
    'relative',
    'overflow-hidden',
    'transition-all',
    'cursor-pointer',
    'group',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        listing: [
          'bg-white',
          'hover:bg-white',
          'border-0',
        ],
        experience: [
          'bg-white',
          'hover:bg-white',
          'border-0',
        ],
        host: [
          'bg-white',
          'hover:bg-white', 
          'border',
          'border-neutral-200',
        ],
        search: [
          'bg-white',
          'hover:bg-white',
          'border',
          'border-neutral-200',
          'hover:border-neutral-300',
        ],
      },
      size: {
        sm: 'w-full max-w-sm',
        md: 'w-full max-w-md', 
        lg: 'w-full max-w-lg',
        xl: 'w-full max-w-xl',
        full: 'w-full',
      },
      interactive: {
        true: 'hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'listing',
      size: 'md',
      interactive: true,
    },
  }
);

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Airbnb card component props
 */
export interface AirbnbCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof airbnbCardVariants> {
  /** Card image */
  readonly image?: {
    src: string;
    alt: string;
    aspectRatio?: 'square' | 'video' | 'wide';
  };
  
  /** Card title */
  readonly title?: string;
  
  /** Card subtitle */
  readonly subtitle?: string;
  
  /** Card description */
  readonly description?: string;
  
  /** Price information */
  readonly price?: {
    amount: string;
    period?: string;
    currency?: string;
  };
  
  /** Rating information */
  readonly rating?: {
    score: number;
    count?: number;
  };
  
  /** Host information */
  readonly host?: {
    name: string;
    avatar?: string;
    isSuperhost?: boolean;
  };
  
  /** Card badges */
  readonly badges?: Array<{
    text: string;
    variant?: 'success' | 'warning' | 'info' | 'neutral';
  }>;
  
  /** Favorite button */
  readonly showFavorite?: boolean;
  readonly isFavorite?: boolean;
  readonly onFavoriteClick?: () => void;
  
  /** Card click handler */
  readonly onClick?: () => void;
  
  /** Loading state */
  readonly loading?: boolean;
}

// =============================================================================
// AIRBNB CARD COMPONENT
// =============================================================================

/**
 * Airbnb-style card component with smooth animations and professional styling
 */
export const AirbnbCard = forwardRef<HTMLDivElement, AirbnbCardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      image,
      title,
      subtitle,
      description,
      price,
      rating,
      host,
      badges,
      showFavorite = false,
      isFavorite = false,
      onFavoriteClick,
      onClick,
      loading = false,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    // ✅ Access design tokens
        
    // Get dynamic styling from Airbnb tokens
    const cardStyles: React.CSSProperties = {
      borderRadius: airbnbAestheticTokens.borderRadius.component.card,
      boxShadow: loading 
        ? 'none' 
        : airbnbAestheticTokens.shadows.card.rest,
      transition: `all ${airbnbAestheticTokens.animation.duration.normal} ${airbnbAestheticTokens.animation.easing.airbnb}`,
      ...style,
    };
    
    // Hover effect styles
    const hoverStyles: React.CSSProperties = {
      '--hover-shadow': airbnbAestheticTokens.shadows.card.hover,
      '--hover-transform': airbnbAestheticTokens.animation.component.card.hover.transform,
    } as React.CSSProperties;

    const handleClick = (): void => {
      if (onClick && !loading) {
        onClick();
      }
    };

    const handleFavoriteClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
      if (onFavoriteClick) {
        onFavoriteClick();
      }
    };

    const getAspectRatioClass = (): string => {
      switch (image?.aspectRatio) {
        case 'square': return 'aspect-square';
        case 'video': return 'aspect-video';
        case 'wide': return 'aspect-[4/3]';
        default: return 'aspect-[4/3]'; // Default Airbnb listing ratio
      }
    };

    return (
      <Box
        ref={ref}
        className={cn(
          airbnbCardVariants({
            variant,
            size,
            interactive: interactive && !loading,
          }),
          loading && 'animate-pulse',
          className
        )}
       
        onClick={handleClick}
        onMouseEnter={(e) => {
          if (interactive && !loading) {
            e.currentTarget.style.boxShadow = airbnbAestheticTokens.shadows.card.hover;
          }
        }}
        onMouseLeave={(e) => {
          if (interactive && !loading) {
            e.currentTarget.style.boxShadow = airbnbAestheticTokens.shadows.card.rest;
          }
        }}
        {...props}
      >
        {/* Image Section */}
        {image && (
          <Box className="relative mb-3">
            <Box 
              className={cn(
                'relative overflow-hidden bg-neutral-100',
                getAspectRatioClass()
              )}
             
            >
              {loading ? (
                <Box className="w-full h-full bg-neutral-200 animate-pulse" />
              ) : (
                <>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={cn(
                      'w-full h-full object-cover transition-all duration-300',
                      'group-hover:scale-105',
                      !isImageLoaded && 'opacity-0',
                      imageError && 'hidden'
                    )}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={() => setImageError(true)}
                    loading="lazy"
                  />
                  
                  {/* Image placeholder while loading */}
                  {!isImageLoaded && !imageError && (
                    <Box className="absolute inset-0 bg-neutral-200 animate-pulse flex items-center justify-center">
                      <Box className="w-8 h-8 border-2 border-neutral-300 border-t-neutral-500 rounded-full animate-spin" />
                    </Box>
                  )}
                  
                  {/* Error state */}
                  {imageError && (
                    <Box className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                      <Box className="text-neutral-400 text-center">
                        <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <Text as="span" className="text-xs">Image not available</Text>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </Box>
            
            {/* Favorite Button */}
            {showFavorite && !loading && (
              <button
                onClick={handleFavoriteClick}
                className={cn(
                  'absolute top-3 right-3',
                  'w-8 h-8 rounded-full',
                  'bg-white/90 backdrop-blur-sm',
                  'hover:bg-white hover:scale-110',
                  'flex items-center justify-center',
                  'transition-all duration-200',
                  'group/favorite'
                )}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <svg 
                  className={cn(
                    'w-4 h-4 transition-colors duration-200',
                    isFavorite 
                      ? 'text-red-500 fill-current' 
                      : 'text-neutral-600 group-hover/favorite:text-red-500'
                  )}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            )}
            
            {/* Badges */}
            {badges && badges.length > 0 && !loading && (
              <Box className="absolute top-3 left-3 flex flex-col gap-1">
                {badges.map((badge, index) => (
                  <Text as="span"
                    key={index}
                    className={cn(
                      'px-2 py-1 text-xs font-medium rounded-md',
                      'bg-white/90 backdrop-blur-sm text-neutral-800',
                      badge.variant === 'success' && 'bg-green-100 text-green-800',
                      badge.variant === 'warning' && 'bg-yellow-100 text-yellow-800',
                      badge.variant === 'info' && 'bg-blue-100 text-blue-800',
                    )}
                  >
                    {badge.text}
                  </Text>
                ))}
              </Box>
            )}
          </Box>
        )}
        
        {/* Content Section */}
        <Box className="p-4">
          {/* Rating */}
          {rating && !loading && (
            <Box className="flex items-center gap-1 mb-1">
              <svg className="w-3 h-3 text-neutral-800 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <Text as="span" className="text-sm font-medium text-neutral-800">
                {rating.score.toFixed(1)}
              </Text>
              {rating.count && (
                <Text as="span" className="text-sm text-neutral-500">
                  ({rating.count})
                </Text>
              )}
            </Box>
          )}
          
          {/* Title and Subtitle */}
          {loading ? (
            <Box className="space-y-2 mb-3">
              <Box className="h-4 bg-neutral-200 rounded animate-pulse" />
              <Box className="h-3 bg-neutral-200 rounded w-3/4 animate-pulse" />
            </Box>
          ) : (
            <>
              {title && (
                <Heading level={3} 
                  className="font-medium text-neutral-800 mb-1 line-clamp-2"
                 
                >
                  {title}
                </Heading>
              )}
              
              {subtitle && (
                <Text 
                  className="text-neutral-600 mb-2 line-clamp-1"
                 
                >
                  {subtitle}
                </Text>
              )}
            </>
          )}
          
          {/* Description */}
          {description && !loading && (
            <Text 
              className="text-neutral-600 mb-3 line-clamp-2"
             
            >
              {description}
            </Text>
          )}
          
          {/* Host Info */}
          {host && !loading && (
            <Box className="flex items-center gap-2 mb-3">
              {host.avatar ? (
                <img
                  src={host.avatar}
                  alt={`${host.name}'s profile`}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <Box className="w-6 h-6 rounded-full bg-neutral-300 flex items-center justify-center">
                  <Text as="span" className="text-xs text-neutral-600 font-medium">
                    {host.name.charAt(0).toUpperCase()}
                  </Text>
                </Box>
              )}
              <Text as="span" className="text-sm text-neutral-600">
                Hosted by {host.name}
              </Text>
              {host.isSuperhost && (
                <Text as="span" className="text-xs bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded font-medium">
                  Superhost
                </Text>
              )}
            </Box>
          )}
          
          {/* Price */}
          {price && !loading && (
            <Box className="flex items-baseline gap-1">
              <Text as="span" 
                className="font-semibold text-neutral-800"
               
              >
                {price.currency || '$'}{price.amount}
              </Text>
              {price.period && (
                <Text as="span" 
                  className="text-neutral-600"
                 
                >
                  {price.period}
                </Text>
              )}
            </Box>
          )}
          
          {/* Loading price */}
          {loading && (
            <Box className="h-4 bg-neutral-200 rounded w-1/3 animate-pulse" />
          )}
        </Box>
      </Box>
    );
  }
);

AirbnbCard.displayName = 'AirbnbCard';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type AirbnbCardVariant = VariantProps<typeof airbnbCardVariants>;
export { airbnbCardVariants };