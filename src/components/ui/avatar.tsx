/**
 * @fileoverview Avatar Component v5.0.0 - CVA Pattern Implementation
 * @description Modern Avatar component using CVA patterns with semantic Tailwind classes
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, CVA-based
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { Box, Image, Text } from '../semantic';

// =============================================================================
// CVA VARIANTS
// =============================================================================

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden select-none items-center justify-center font-medium uppercase transition-colors',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
        '2xl': 'h-20 w-20 text-xl',
      },
      variant: {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-amber-100 text-amber-700',
        error: 'bg-red-100 text-red-700',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
      bordered: {
        true: 'border-2 border-border',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      shape: 'circle',
      bordered: false,
    },
  }
);

const statusIndicatorVariants = cva(
  'absolute bottom-0 right-0 block rounded-full border-2 border-background',
  {
    variants: {
      size: {
        xs: 'h-1.5 w-1.5',
        sm: 'h-2 w-2',
        md: 'h-2.5 w-2.5',
        lg: 'h-3 w-3',
        xl: 'h-3.5 w-3.5',
        '2xl': 'h-4 w-4',
      },
      status: {
        online: 'bg-green-500',
        offline: 'bg-gray-400',
        away: 'bg-amber-500',
        busy: 'bg-red-500',
      },
    },
    defaultVariants: {
      size: 'md',
      status: 'online',
    },
  }
);

/**
 * Avatar size options
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Avatar variant options
 */
export type AvatarVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

/**
 * Avatar shape options
 */
export type AvatarShape = 'circle' | 'square';

/**
 * User status options
 */
export type UserStatus = 'online' | 'offline' | 'away' | 'busy';

/**
 * Avatar props interface
 */
export interface AvatarProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  /** Image source URL */
  readonly src?: string;
  /** Image alt text */
  readonly alt?: string;
  /** Person's name for generating initials */
  readonly name?: string;
  /** Custom fallback content */
  readonly fallback?: ReactNode;
  /** Show border around avatar */
  readonly showBorder?: boolean;
  /** User status indicator */
  readonly status?: UserStatus;
  /** Force showing fallback instead of image */
  readonly showFallback?: boolean;
}

/**
 * Generate initials from a name
 */
function getInitials(name: string): string {
  if (!name) return '';
  
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

/**
 * Status indicator component
 */
function StatusIndicator({ 
  status, 
  size, 
  className 
}: { 
  status: UserStatus; 
  size: AvatarSize; 
  className?: string;
}): React.ReactElement {
  return (
    <Text 
      as="span"
      className={cn(statusIndicatorVariants({ status, size }), className)}
      aria-label={`Status: ${status}`} 
    />
  );
}

/**
 * AvatarImage component for displaying images
 */
export const AvatarImage = forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
));
AvatarImage.displayName = 'AvatarImage';

/**
 * AvatarFallback component for fallback content
 */
export const AvatarFallback = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Box
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = 'AvatarFallback';

/**
 * Avatar component
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({
    size = 'md',
    variant = 'default',
    shape = 'circle',
    bordered = false,
    src,
    alt,
    name,
    fallback,
    showBorder,
    status,
    showFallback = false,
    className,
    children,
    ...props
  }, ref) => {
    const shouldShowImage = src && !showFallback;
    const initials = name ? getInitials(name) : '';
    const fallbackContent = fallback || initials || '?';
    
    // Use showBorder prop to override bordered variant
    const actualBordered = showBorder !== undefined ? showBorder : bordered;
    
    return (
      <Box 
        ref={ref} 
        className={cn(
          avatarVariants({ 
            size, 
            variant, 
            shape, 
            bordered: actualBordered 
          }), 
          className
        )} 
        {...props}
      >
        {children || (
          <>
            {shouldShowImage ? (
              <AvatarImage
                src={src}
                alt={alt || name || 'Avatar'}
                loading="lazy"
              />
            ) : (
              <AvatarFallback>
                {fallbackContent}
              </AvatarFallback>
            )}
            {status && (
              <StatusIndicator 
                status={status} 
                size={size} 
              />
            )}
          </>
        )}
      </Box>
    );
  }
);

Avatar.displayName = 'Avatar';

// Export CVA variants for external use
export { avatarVariants, statusIndicatorVariants };