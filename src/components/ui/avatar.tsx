/**
 * @fileoverview Avatar Component v6.0.0
 * @description Clean avatar component for user profiles
 * @version 6.0.0
 */

import React, { forwardRef, useState } from 'react';
import { cn } from '../../lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  readonly src?: string;
  readonly alt?: string;
  readonly fallback?: string;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleError = () => {
      setHasError(true);
    };

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const getInitials = (name?: string) => {
      if (!name) return '';
      return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    return (
      <span
        ref={ref}
        className={cn(avatarVariants({ size }), className)}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className={cn(
              'aspect-square h-full w-full object-cover transition-opacity',
              isLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onError={handleError}
            onLoad={handleLoad}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
            <span className="text-sm font-medium">
              {getInitials(fallback || alt)}
            </span>
          </div>
        )}
      </span>
    );
  }
);

Avatar.displayName = 'Avatar';