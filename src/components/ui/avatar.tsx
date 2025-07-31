/**
 * @fileoverview SSR-Safe Avatar Component - Production Strategy Implementation
 * @description Avatar component using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready
 */

import React, { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { useTokens } from '../../hooks/useTokens';

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
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  /** Avatar size */
  size?: AvatarSize;
  /** Avatar color variant */
  variant?: AvatarVariant;
  /** Avatar shape */
  shape?: AvatarShape;
  /** Image source URL */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Person's name for generating initials */
  name?: string;
  /** Custom fallback content */
  fallback?: ReactNode;
  /** Show border around avatar */
  showBorder?: boolean;
  /** User status indicator */
  status?: UserStatus;
  /** Force showing fallback instead of image */
  showFallback?: boolean;
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
function StatusIndicator({ status, size }: { status: UserStatus; size: AvatarSize }): React.ReactElement {
  const { colors } = useTokens();
  
  const statusColors = {
    online: colors.success?.[500] || '#22c55e',
    offline: colors.neutral?.[400] || '#9ca3af',
    away: colors.warning?.[500] || '#f59e0b',
    busy: colors.danger?.[500] || '#ef4444',
  };
  
  const sizeMap = {
    xs: '6px',
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '14px',
    '2xl': '16px',
  };
  
  const indicatorStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    display: 'block',
    width: sizeMap[size],
    height: sizeMap[size],
    backgroundColor: statusColors[status],
    borderRadius: '50%',
    border: `2px solid ${colors.background?.default || '#ffffff'}`,
  };
  
  return <span style={indicatorStyles} aria-label={`Status: ${status}`} />;
}

/**
 * Avatar component
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({
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
    className,
    style,
    ...props
  }, ref) => {
    const { colors, typography, getToken } = useTokens();
    
    const borderRadius = {
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      full: (getToken('borderRadius.full') as string) || '9999px',
    };
    
    const shouldShowImage = src && !showFallback;
    const initials = name ? getInitials(name) : '';
    const fallbackContent = fallback || initials || '?';
    
    // Size mappings
    const sizeStyles = {
      xs: { width: '24px', height: '24px', fontSize: typography.fontSize.xs },
      sm: { width: '32px', height: '32px', fontSize: typography.fontSize.sm },
      md: { width: '40px', height: '40px', fontSize: typography.fontSize.base },
      lg: { width: '48px', height: '48px', fontSize: typography.fontSize.lg },
      xl: { width: '64px', height: '64px', fontSize: typography.fontSize.xl },
      '2xl': { width: '80px', height: '80px', fontSize: typography.fontSize['2xl'] },
    };
    
    // Variant color mappings
    const getVariantStyles = (): React.CSSProperties => {
      const baseOpacity = 0.1;
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: `rgba(${hexToRgb(colors.primary?.[500] || '#3b82f6')}, ${baseOpacity})`,
            color: colors.primary?.[500] || '#3b82f6',
          };
        case 'secondary':
          return {
            backgroundColor: `rgba(${hexToRgb(colors.secondary?.[500] || '#8b5cf6')}, ${baseOpacity})`,
            color: colors.secondary?.[500] || '#8b5cf6',
          };
        case 'success':
          return {
            backgroundColor: colors.success?.[100] || '#dcfce7',
            color: colors.success?.[700] || '#15803d',
          };
        case 'warning':
          return {
            backgroundColor: colors.warning?.[100] || '#fef3c7',
            color: colors.warning?.[700] || '#b45309',
          };
        case 'error':
          return {
            backgroundColor: colors.danger?.[100] || '#fee2e2',
            color: colors.danger?.[700] || '#b91c1c',
          };
        default:
          return {
            backgroundColor: colors.neutral?.[100] || '#f3f4f6',
            color: colors.neutral?.[600] || '#4b5563',
          };
      }
    };
    
    const avatarStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      userSelect: 'none',
      fontFamily: typography.fontFamily.sans.join(', '),
      fontWeight: typography.fontWeight.medium,
      textTransform: 'uppercase',
      borderRadius: shape === 'circle' ? borderRadius.full : borderRadius.md,
      border: showBorder ? `2px solid ${colors.border?.default || colors.neutral?.[200]}` : undefined,
      ...sizeStyles[size],
      ...getVariantStyles(),
      ...style,
    };
    
    const imageStyles: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      aspectRatio: '1 / 1',
    };
    
    const [imageError, setImageError] = React.useState(false);
    
    return (
      <div ref={ref} className={className} style={avatarStyles} {...props}>
        {shouldShowImage && !imageError ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            style={imageStyles}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            {fallbackContent}
          </div>
        )}
        {status && <StatusIndicator status={status} size={size} />}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/**
 * Helper function to convert hex to RGB
 */
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}