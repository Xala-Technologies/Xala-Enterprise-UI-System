/**
 * @fileoverview Skeleton Component v6.0.0
 * @description Clean skeleton loading component
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'default' | 'text' | 'circular' | 'rectangular';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly width?: string | number;
  readonly height?: string | number;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    width,
    height,
    style,
    ...props 
  }, ref) => {
    const variantClasses = {
      default: 'rounded-md',
      text: 'rounded h-4',
      circular: 'rounded-full',
      rectangular: 'rounded-none',
    };

    const sizeClasses = {
      sm: variant === 'circular' ? 'h-8 w-8' : 'h-4',
      md: variant === 'circular' ? 'h-10 w-10' : 'h-6',
      lg: variant === 'circular' ? 'h-12 w-12' : 'h-8',
    };

    const customStyle = {
      width,
      height,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-pulse bg-muted',
          variantClasses[variant],
          !width && !height && sizeClasses[size],
          className
        )}
        style={customStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';