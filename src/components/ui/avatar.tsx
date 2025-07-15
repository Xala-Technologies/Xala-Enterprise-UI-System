/**
 * Avatar component - Pure presentational component
 * Supports initials, images, icons, and Norwegian accessibility standards
 * No client-side logic or state management
 */

import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

/**
 * Avatar container variants using design tokens
 */
const avatarVariants = cva(
  [
    'relative flex shrink-0 overflow-hidden rounded-full',
    'bg-muted text-muted-foreground',
    'select-none items-center justify-center',
    'font-medium uppercase',
  ],
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-16 w-16 text-xl',
        '2xl': 'h-20 w-20 text-2xl',
      },
      variant: {
        default: 'bg-muted text-muted-foreground',
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      shape: 'circle',
    },
  }
);

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
  readonly status?: 'online' | 'offline' | 'away' | 'busy';
  /** Force showing fallback instead of image */
  readonly showFallback?: boolean;
}

/**
 * Generate initials from a name
 * @param name - Full name string
 * @returns Initials (max 2 characters)
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
 * @param status - User status
 * @param size - Avatar size for proper indicator sizing
 * @returns Status indicator JSX element
 */
function StatusIndicator({
  status,
  size,
}: {
  readonly status: 'online' | 'offline' | 'away' | 'busy';
  readonly size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}): React.ReactElement | null {
  if (!status) return null;

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  }[status];

  const sizeClasses =
    {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-3.5 w-3.5',
      '2xl': 'h-4 w-4',
    }[size] || 'h-2.5 w-2.5';

  return (
    <span
      className={cn(
        'absolute bottom-0 right-0 block rounded-full ring-2 ring-background',
        statusClasses,
        sizeClasses
      )}
      aria-label={`Status: ${status}`}
    />
  );
}

/**
 * Avatar component - Pure presentational component
 * @param size - Avatar size
 * @param variant - Avatar color variant
 * @param shape - Avatar shape
 * @param src - Image source URL
 * @param alt - Image alt text
 * @param name - Person's name for generating initials
 * @param fallback - Custom fallback content
 * @param showBorder - Show border around avatar
 * @param status - User status indicator
 * @param showFallback - Force showing fallback instead of image
 * @param className - Additional CSS classes
 * @param props - Additional HTML attributes
 * @returns Avatar JSX element
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      size = 'md',
      variant = 'default',
      shape = 'circle',
      src,
      alt,
      name,
      fallback,
      showBorder = false,
      status,
      showFallback = false,
      ...props
    },
    ref
  ): React.ReactElement => {
    const shouldShowImage = src && !showFallback;
    const initials = name ? getInitials(name) : '';
    const fallbackContent = fallback || initials || '?';

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ size, variant, shape }),
          showBorder && 'ring-2 ring-border',
          className
        )}
        {...props}
      >
        {shouldShowImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="aspect-square h-full w-full object-cover"
            loading="lazy"
            onError={(e): void => {
              // Simply hide the image on error - parent controls fallback via showFallback prop
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">{fallbackContent}</div>
        )}
        {status && <StatusIndicator status={status} size={size || 'md'} />}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
