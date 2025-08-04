/**
 * @fileoverview Clean Image Component v6.0.0
 * @description Essential image component with loading states
 * @version 6.0.0
 */

import React, { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils/cn';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  readonly variant?: 'default' | 'rounded' | 'circular';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly aspectRatio?: 'square' | 'video' | 'photo' | 'auto';
  readonly fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  readonly priority?: boolean;
  readonly lazy?: boolean;
  readonly fallbackSrc?: string;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ 
    variant = 'default', 
    size = 'md', 
    aspectRatio = 'auto',
    fit = 'cover',
    priority = false,
    lazy = true,
    fallbackSrc,
    className, 
    onError,
    onLoad,
    ...props 
  }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const variantClasses = {
      default: '',
      rounded: 'rounded-lg',
      circular: 'rounded-full',
    };

    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
      full: 'w-full h-full',
    };

    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      photo: 'aspect-[4/3]',
      auto: '',
    };

    const fitClasses = {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      'scale-down': 'object-scale-down',
    };

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      if (fallbackSrc && !hasError) {
        setHasError(true);
        event.currentTarget.src = fallbackSrc;
      }
      onError?.(event);
    };

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setIsLoaded(true);
      onLoad?.(event);
    };

    return (
      <img
        ref={ref}
        className={cn(
          'transition-opacity duration-300',
          variantClasses[variant],
          size !== 'full' && sizeClasses[size],
          aspectRatioClasses[aspectRatio],
          fitClasses[fit],
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100',
          className
        )}
        loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';