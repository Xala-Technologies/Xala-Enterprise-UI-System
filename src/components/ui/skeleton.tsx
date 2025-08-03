/**
 * @fileoverview SSR-Safe Skeleton Component - Production Strategy Implementation
 * @description Skeleton component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';
import { Box } from '../semantic';
import { cn } from '../../lib/utils/cn';

/**
 * Skeleton variant types
 */
export type SkeletonVariant = 'default' | 'card' | 'text' | 'avatar' | 'button';

/**
 * Skeleton animation speed types
 */
export type SkeletonSpeed = 'slow' | 'normal' | 'fast';

/**
 * Skeleton component props interface
 */
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Skeleton variant */
  variant?: SkeletonVariant;
  /** Animation speed */
  speed?: SkeletonSpeed;
  /** Skeleton width */
  width?: string | number;
  /** Skeleton height */
  height?: string | number;
  /** Render as circle */
  circle?: boolean;
  /** Number of text lines */
  lines?: number;
  /** Height of each text line */
  lineHeight?: string;
  /** Spacing between lines */
  spacing?: string;
  /** Enable shimmer effect */
  shimmer?: boolean;
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
 * Skeleton component
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
  ) => {
    const { colors, spacing: spacingTokens, getToken } = useTokens();
    
    // Get border radius values
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      full: (getToken('borderRadius.full') as string) || '9999px',
    };
    
    // Get variant background color
    const getVariantBackground = (): string => {
      switch (variant) {
        case 'card':
          return colors.background?.default || '#ffffff';
        case 'text':
          return `rgba(${hexToRgb(colors.neutral?.[200] || '#e5e7eb')}, 0.7)`;
        case 'avatar':
        case 'button':
        default:
          return colors.neutral?.[200] || '#e5e7eb';
      }
    };
    
    // Get animation duration based on speed
    const getAnimationDuration = (): string => {
      switch (speed) {
        case 'slow':
          return '3s';
        case 'fast':
          return '1s';
        default:
          return '1.5s';
      }
    };
    
    // Create shimmer gradient
    const shimmerGradient = shimmer ? `linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    )` : undefined;
    const dimensions = getSkeletonDimensions(width, height, circle);
    const finalVariant = circle ? 'avatar' : variant;
    
    // Base skeleton styles
    const baseSkeletonStyles: React.CSSProperties = {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: getVariantBackground(),
      borderRadius: circle || variant === 'avatar' ? borderRadius.full : borderRadius.md,
      animation: `pulse ${getAnimationDuration()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
      ...(variant === 'card' ? {
        border: `1px solid ${colors.border?.default || colors.neutral?.[200]}`,
      } : {}),
      ...dimensions,
    };
    
    // Shimmer overlay styles
    const shimmerStyles: React.CSSProperties = shimmer ? {
      position: 'absolute',
      inset: 0,
      transform: 'translateX(-100%)',
      background: shimmerGradient,
      animation: `shimmer ${getAnimationDuration()} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
    } : {};

    // Single skeleton
    if (!lines || lines <= 1) {
      return (
        <Box
          ref={ref}
          className={className}
          style={{
            ...baseSkeletonStyles,
            ...style,
          }}
          aria-hidden="true"
          {...props}
        >
          {shimmer && <Box style={shimmerStyles} />}
        </Box>
      );
    }

    // Multiple lines
    return (
      <Box
        ref={ref}
        className={className}
        style={{
          ...style,
        }}
        aria-hidden="true"
        {...props}
      >
        {Array.from({ length: lines }, (_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? '75%' : '100%';

          return (
            <Box
              key={index}
              style={{
                ...baseSkeletonStyles,
                width: lineWidth,
                height: lineHeight,
                marginBottom: index < lines - 1 ? spacing : 0,
              }}
            >
              {shimmer && <Box style={shimmerStyles} />}
            </Box>
          );
        })}
      </Box>
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
  ({ lines = 3, lineHeight = '1rem', spacing = '0.5rem', ...props }, ref) => (
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
  ({ size = 'md', ...props }, ref) => {
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
      style,
      ...props
    },
    ref
  ) => {
    return (
      <Box 
        ref={ref} 
        className={cn("p-4", className)}
        style={style}
        aria-hidden="true" 
        {...props}
      >
        {/* Header with optional avatar */}
        <Box className="flex items-center gap-3 mb-4">
          {showAvatar && <SkeletonAvatar size={avatarSize} />}
          <Box className="flex-1">
            <SkeletonText lines={titleLines} lineHeight="1.25rem" />
          </Box>
        </Box>

        {/* Content */}
        <SkeletonText lines={contentLines} />
      </Box>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

/**
 * Skeleton Button Component - Convenience wrapper for button skeletons
 */
export interface SkeletonButtonProps extends Omit<SkeletonProps, 'variant'> {
  readonly size?: 'sm' | 'md' | 'lg';
}

export const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = 'md', ...props }, ref) => {
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
