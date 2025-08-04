/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type */
/**
 * @fileoverview LazyImage Component v5.0.0 - Token-Based Design System
 * @description Performance-optimized image component with lazy loading
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import type { ImgHTMLAttributes } from 'react';
import { Box, Text, Heading } from '../../semantic';
import type { ImgHTMLAttributes } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { cn } from '../../lib/utils/cn';
import { useSSR } from '../../hooks';
import { useSSR } from '../../hooks';

// =============================================================================
// LAZY IMAGE VARIANTS
// =============================================================================

const lazyImageVariants = cva(
  [
    'transition-opacity duration-300',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      loading: {
        eager: 'opacity-100',
        lazy: 'opacity-0',
        loaded: 'opacity-100',
        error: 'opacity-50',
      },
      objectFit: {
        contain: 'object-contain',
        cover: 'object-cover',
        fill: 'object-fill',
        none: 'object-none',
        'scale-down': 'object-scale-down',
      },
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-video',
        '4/3': 'aspect-[4/3]',
        '3/2': 'aspect-[3/2]',
        '16/9': 'aspect-[16/9]',
        '21/9': 'aspect-[21/9]',
      },
    },
    defaultVariants: {
      loading: 'lazy',
      objectFit: 'cover',
    },
  }
);

const imageSkeletonVariants = cva(
  [
    'animate-pulse',
    'bg-muted',
    'rounded-md',
  ],
  {
    variants: {
      size: {
        sm: 'h-20 w-20',
        md: 'h-32 w-32',
        lg: 'h-48 w-48',
        full: 'h-full w-full',
      },
    },
    defaultVariants: {
      size: 'full',
    },
  }
);

// =============================================================================
// LAZY IMAGE INTERFACES
// =============================================================================

export interface LazyImageProps 
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'>,
    VariantProps<typeof lazyImageVariants> {
  /** Image source */
  src: string;
  /** Fallback/placeholder image */
  placeholder?: string;
  /** Alternative text */
  alt: string;
  /** Responsive sources */
  srcSet?: string;
  /** Sizes for responsive images */
  sizes?: string;
  /** Loading priority */
  priority?: boolean;
  /** Blur placeholder data URL */
  blurDataURL?: string;
  /** Quality (1-100) */
  quality?: number;
  /** Decode async */
  decoding?: 'sync' | 'async' | 'auto';
  /** Error handler */
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** Load handler */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  /** Intersection observer options */
  observerOptions?: IntersectionObserverInit;
  /** Show skeleton while loading */
  showSkeleton?: boolean;
  /** Skeleton size */
  skeletonSize?: VariantProps<typeof imageSkeletonVariants>['size'];
}

// =============================================================================
// LAZY IMAGE HOOKS
// =============================================================================

/**
 * Hook for lazy loading images
 */
const useImageLazyLoad = ({
  src,
  priority = false,
  observerOptions = {},
  onLoad,
  onError,
}: {
  src: string;
  priority?: boolean;
  observerOptions?: IntersectionObserverInit;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (error: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle image load
  const handleLoad = useCallback((event: any) => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.(event as React.SyntheticEvent<HTMLImageElement, Event>);
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback((event: any) => {
    setIsError(true);
    setIsLoaded(false);
    onError?.(event as React.SyntheticEvent<HTMLImageElement, Event>);
  }, [onError]);

  // Set up intersection observer
  useEffect(() => {
    if (priority || !imgRef.current) {
      setIsIntersecting(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', 
        threshold: 0.01,
        ...observerOptions,
      }
    );

    observerRef.current.observe(imgRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, observerOptions]);

  // Load image when intersecting
  useEffect(() => {
    if (!isIntersecting || !imgRef.current) return;

    const img = imgRef.current;
    
    // Add event listeners
    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Start loading
    if (img.src !== src) {
      img.src = src;
    }

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [isIntersecting, src, handleLoad, handleError]);

  return {
    imgRef, 
    isLoaded,
    isError, 
    isIntersecting,
  };
};

// =============================================================================
// LAZY IMAGE COMPONENT
// =============================================================================

/**
 * Performance-optimized image component with lazy loading
 */
export const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  (
    {
      src,
      placeholder,
      alt,
      srcSet,
      sizes,
      priority = false,
      blurDataURL,
      quality = 75,
      decoding = 'async',
      onError,
      onLoad,
      observerOptions,
      showSkeleton = true,
      skeletonSize = 'full',
      loading: loadingProp,
      objectFit = 'cover',
      aspectRatio,
      className, style,
      ...props
    }, ref) => {
        const { isServer } = useSSR();
    const { imgRef, isLoaded, isError, isIntersecting } = useImageLazyLoad({
      src, 
      priority,
      observerOptions, 
      onLoad,
      onError,
    });

    // Combine refs
    React.useImperativeHandle(ref, () => imgRef.current!);

    // Determine loading state
    const loadingState = isError ? 'error' : isLoaded ? 'loaded' : isIntersecting ? 'lazy' : 'lazy';

    // Image styles
    const imageStyles = React.useMemo((): React.CSSProperties => ({
      ...style,
    }), [style]);

    // Placeholder styles
    const placeholderStyles = React.useMemo((): React.CSSProperties => ({
      position: 'absolute',
      inset: 0,
      backgroundColor: colors.background?.subtle || '#f3f4f6',
      ...(blurDataURL ? {
        backgroundImage: `url(${blurDataURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px)',
      } : {}),
    }), [colors, blurDataURL]);

    return (
      <Box className={cn('relative overflow-hidden', aspectRatio && `aspect-${aspectRatio}`)}>
        {/* Placeholder/skeleton */}
        {showSkeleton && !isLoaded && !isError && (
          <Box
            className={cn(
              imageSkeletonVariants({ size: skeletonSize }),
              'absolute inset-0'
            )}
           
            aria-hidden="true"
          />
        )}

        {/* Actual image */}
        <img
          ref={imgRef}
          alt={alt}
          src={priority || isServer ? src : placeholder || ''}
          srcSet={isIntersecting ? srcSet : undefined}
          sizes={sizes}
          decoding={decoding}
          loading={priority ? 'eager' : 'lazy'}
          className={cn(
            lazyImageVariants({ loading: loadingState, objectFit }),
            aspectRatio && 'w-full h-full',
            className
          )}
         
          {...props}
        />

        {/* Error state */}
        {isError && (
          <Box className="absolute inset-0 flex items-center justify-center bg-muted">
            <Box className="text-center p-4">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <Text className="text-sm text-muted-foreground">Failed to load image</Text>
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

LazyImage.displayName = 'LazyImage';

/**
 * Picture component with lazy loading support
 */
export interface LazyPictureProps extends Omit<LazyImageProps, 'srcSet'> {
  /** Picture sources */
  sources?: Array<{
    srcSet: string;
    media?: string;
    type?: string;
  }>;
}

export const LazyPicture = React.forwardRef<HTMLImageElement, LazyPictureProps>(
  ({ sources = [], ...imageProps }, ref) => {
    return (
      <picture>
        {sources.map((source, index) => (
          <source key={index} {...source} />
        ))}
        <LazyImage ref={ref} {...imageProps} />
      </picture>
    );
  }
);

LazyPicture.displayName = 'LazyPicture';

// Export variants for external use
export { lazyImageVariants, imageSkeletonVariants };
export type LazyImageVariant = VariantProps<typeof lazyImageVariants>;
export type ImageSkeletonVariant = VariantProps<typeof imageSkeletonVariants>;

// Import useCallback
import { useCallback } from 'react';
import { useCallback } from 'react';
