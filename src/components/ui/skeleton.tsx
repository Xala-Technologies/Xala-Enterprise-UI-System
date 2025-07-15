/**
 * Skeleton component with enterprise compliance
 * Uses semantic design tokens and pure presentational patterns
 */

import React from 'react';

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

/**
 * Skeleton variants using semantic design tokens
 */
const skeletonVariants = cva(
  [
    'animate-pulse rounded-md bg-muted',
    'relative overflow-hidden',
    'before:absolute before:inset-0',
    'before:-translate-x-full',
    'before:animate-shimmer',
    'before:bg-gradient-to-r',
    'before:from-transparent before:via-white/20 before:to-transparent',
  ],
  {
    variants: {
      variant: {
        default: 'bg-muted',
        card: 'bg-card border border-border',
        text: 'bg-muted/70',
        avatar: 'bg-muted rounded-full',
        button: 'bg-muted rounded-md',
      },
      speed: {
        slow: 'animate-pulse-slow',
        normal: 'animate-pulse',
        fast: 'animate-pulse-fast',
      },
    },
    defaultVariants: {
      variant: 'default',
      speed: 'normal',
    },
  }
);

/**
 * Skeleton component props interface
 */
export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  readonly width?: string | number;
  readonly height?: string | number;
  readonly circle?: boolean;
  readonly lines?: number;
  readonly lineHeight?: string;
  readonly spacing?: string;
  readonly shimmer?: boolean;
}

/**
 * Get skeleton dimensions - pure function
 */
const getSkeletonDimensions = (
  width?: string | number,
  height?: string | number,
  circle?: boolean
): React.CSSProperties => {
  const styles: React.CSSProperties = {};

  if (width !== undefined) {
    styles.width = typeof width === 'number' ? `${width}px` : width;
  }

  if (height !== undefined) {
    styles.height = typeof height === 'number' ? `${height}px` : height;
  }

  // For circles, ensure width and height are equal
  if (circle && width && !height) {
    styles.height = styles.width;
  } else if (circle && height && !width) {
    styles.width = styles.height;
  }

  return styles;
};

/**
 * Enhanced Skeleton component
 * @param variant - Skeleton styling variant
 * @param speed - Animation speed
 * @param width - Skeleton width
 * @param height - Skeleton height
 * @param circle - Render as circle
 * @param lines - Number of text lines to render
 * @param lineHeight - Height of each text line
 * @param spacing - Spacing between lines
 * @param shimmer - Enable shimmer effect
 * @param className - Additional CSS classes
 * @returns Enhanced Skeleton JSX element
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'default',
      speed = 'normal',
      width,
      height,
      circle = false,
      lines,
      lineHeight = '1rem',
      spacing = '0.5rem',
      shimmer = true,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const dimensions = getSkeletonDimensions(width, height, circle);
    const finalVariant = circle ? 'avatar' : variant;

    // Single skeleton
    if (!lines || lines <= 1) {
      return (
        <div
          ref={ref}
          className={cn(
            skeletonVariants({ variant: finalVariant, speed }),
            !shimmer && 'before:hidden',
            circle && 'rounded-full',
            className
          )}
          style={{ ...dimensions, ...style }}
          aria-hidden="true"
          {...props}
        />
      );
    }

    // Multiple lines
    return (
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        style={style}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? '75%' : '100%';

          return (
            <div
              key={index}
              className={cn(
                skeletonVariants({ variant: finalVariant, speed }),
                !shimmer && 'before:hidden'
              )}
              style={{
                width: lineWidth,
                height: lineHeight,
                marginBottom: index < lines - 1 ? spacing : 0,
              }}
            />
          );
        })}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';

/**
 * Skeleton Text Component - Convenience wrapper for text skeletons
 */
export interface SkeletonTextProps extends Omit<SkeletonProps, 'variant'> {
  readonly lines?: number;
  readonly lineHeight?: string;
  readonly spacing?: string;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ lines = 3, lineHeight = '1rem', spacing = '0.5rem', ...props }, ref): React.ReactElement => (
    <Skeleton
      ref={ref}
      variant="text"
      lines={lines}
      lineHeight={lineHeight}
      spacing={spacing}
      {...props}
    />
  )
);

SkeletonText.displayName = 'SkeletonText';

/**
 * Skeleton Avatar Component - Convenience wrapper for avatar skeletons
 */
export interface SkeletonAvatarProps extends Omit<SkeletonProps, 'variant' | 'circle'> {
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SkeletonAvatar = forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = 'md', ...props }, ref): React.ReactElement => {
    const sizeMap = {
      sm: 32,
      md: 40,
      lg: 48,
      xl: 64,
    };

    return (
      <Skeleton
        ref={ref}
        variant="avatar"
        circle
        width={sizeMap[size]}
        height={sizeMap[size]}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

/**
 * Skeleton Card Component - Convenience wrapper for card skeletons
 */
export interface SkeletonCardProps extends Omit<SkeletonProps, 'variant'> {
  readonly showAvatar?: boolean;
  readonly avatarSize?: 'sm' | 'md' | 'lg';
  readonly titleLines?: number;
  readonly contentLines?: number;
}

export const SkeletonCard = forwardRef<HTMLDivElement, SkeletonCardProps>(
  (
    {
      showAvatar = false,
      avatarSize = 'md',
      titleLines = 1,
      contentLines = 3,
      className,
      ...props
    },
    ref
  ): React.ReactElement => (
    <div ref={ref} className={cn('p-4 space-y-4', className)} aria-hidden="true" {...props}>
      {/* Header with optional avatar */}
      <div className="flex items-center space-x-3">
        {showAvatar && <SkeletonAvatar size={avatarSize} />}
        <div className="flex-1 space-y-2">
          <SkeletonText lines={titleLines} lineHeight="1.25rem" />
        </div>
      </div>

      {/* Content */}
      <SkeletonText lines={contentLines} />
    </div>
  )
);

SkeletonCard.displayName = 'SkeletonCard';

/**
 * Skeleton Button Component - Convenience wrapper for button skeletons
 */
export interface SkeletonButtonProps extends Omit<SkeletonProps, 'variant'> {
  readonly size?: 'sm' | 'md' | 'lg';
}

export const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = 'md', ...props }, ref): React.ReactElement => {
    const sizeMap = {
      sm: { width: 80, height: 32 },
      md: { width: 100, height: 40 },
      lg: { width: 120, height: 48 },
    };

    const dimensions = sizeMap[size];

    return (
      <Skeleton
        ref={ref}
        variant="button"
        width={dimensions.width}
        height={dimensions.height}
        {...props}
      />
    );
  }
);

SkeletonButton.displayName = 'SkeletonButton';

/**
 * Skeleton variants type exports
 */
export type SkeletonVariant = VariantProps<typeof skeletonVariants>['variant'];
export type SkeletonSpeed = VariantProps<typeof skeletonVariants>['speed'];
