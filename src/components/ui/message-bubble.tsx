/**
 * @fileoverview SSR-Safe MessageBubble Component - Production Strategy Implementation
 * @description Specialized component for chat messages using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Norwegian Enterprise Standards
 */

import React, { forwardRef, type HTMLAttributes } from 'react';
import { useTokens } from '../../hooks/useTokens';

/**
 * MessageBubble variant types
 */
export type MessageBubbleVariant = 'user' | 'assistant' | 'system' | 'error' | 'warning';

/**
 * MessageBubble size types
 */
export type MessageBubbleSize = 'sm' | 'md' | 'lg';

/**
 * MessageBubble shape types
 */
export type MessageBubbleShape = 'rounded' | 'bubble' | 'square';

/**
 * MessageBubble animation types
 */
export type MessageBubbleAnimation = 'none' | 'fade' | 'slide' | 'typing';

/**
 * MessageBubble metadata position types
 */
export type MessageBubbleMetadataPosition = 'top' | 'bottom' | 'inline';

/**
 * MessageBubble metadata alignment types
 */
export type MessageBubbleMetadataAlignment = 'left' | 'center' | 'right';

/**
 * Message bubble props interface
 */
export interface MessageBubbleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Message content */
  readonly content: string | React.ReactNode;
  /** Message sender */
  readonly sender?: {
    name: string;
    avatar?: string;
    role?: 'user' | 'assistant' | 'system';
  };
  /** Message timestamp */
  readonly timestamp?: Date | string;
  /** Show timestamp */
  readonly showTimestamp?: boolean;
  /** Show avatar */
  readonly showAvatar?: boolean;
  /** Loading state for typing indicator */
  readonly isLoading?: boolean;
  /** Message actions */
  readonly actions?: React.ReactNode;
  /** Message metadata */
  readonly metadata?: {
    tokens?: number;
    model?: string;
    status?: 'sent' | 'delivered' | 'error';
    classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  };
  /** Custom avatar component */
  readonly avatar?: React.ReactNode;
  /** Error state */
  readonly error?: string;
  /** Retry function for failed messages */
  readonly onRetry?: () => void;
  /** Message bubble variant */
  readonly variant?: MessageBubbleVariant;
  /** Message bubble size */
  readonly size?: MessageBubbleSize;
  /** Message bubble shape */
  readonly shape?: MessageBubbleShape;
  /** Message bubble animation */
  readonly animation?: MessageBubbleAnimation;
}

/**
 * Format timestamp for display
 */
const formatTimestamp = (timestamp: Date | string): string => {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return 'Nå';
  if (diffMinutes < 60) return `${diffMinutes}m siden`;
  if (diffHours < 24) return `${diffHours}t siden`;
  if (diffDays < 7) return `${diffDays}d siden`;

  return date.toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Classification indicator component
 */
const ClassificationIndicator: React.FC<{ classification: string }> = ({ classification }) => {
  const { colors, spacing, typography, getToken } = useTokens();

  const borderRadius = {
    md: (getToken('borderRadius.md') as string) || '0.375rem',
  };

  const getClassificationStyles = (): React.CSSProperties => {
    switch (classification) {
      case 'ÅPEN':
        return {
          backgroundColor: `${colors.success?.[500] || '#22c55e'}33`, // 20% opacity
          color: colors.success?.[600] || '#16a34a',
          borderColor: `${colors.success?.[500] || '#22c55e'}4D`, // 30% opacity
        };
      case 'BEGRENSET':
        return {
          backgroundColor: `${colors.warning?.[500] || '#f59e0b'}33`, // 20% opacity
          color: colors.warning?.[600] || '#d97706',
          borderColor: `${colors.warning?.[500] || '#f59e0b'}4D`, // 30% opacity
        };
      case 'KONFIDENSIELT':
        return {
          backgroundColor: '#f97316' + '33', // orange-500 with 20% opacity
          color: '#ea580c', // orange-600
          borderColor: '#f97316' + '4D', // orange-500 with 30% opacity
        };
      case 'HEMMELIG':
        return {
          backgroundColor: `${colors.danger?.[500] || '#ef4444'}33`, // 20% opacity
          color: colors.danger?.[600] || '#dc2626',
          borderColor: `${colors.danger?.[500] || '#ef4444'}4D`, // 30% opacity
        };
      default:
        return {
          backgroundColor: colors.neutral?.[100] || '#f3f4f6',
          color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
          borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
        };
    }
  };

  const indicatorStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${spacing[1]} ${spacing[2]}`,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    borderRadius: borderRadius.md,
    border: '1px solid',
    ...getClassificationStyles(),
  };

  return (
    <span style={indicatorStyles}>
      {classification}
    </span>
  );
};

/**
 * Enhanced MessageBubble component with token-based styling
 */
export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      className,
      style,
      variant,
      size = 'md',
      shape = 'rounded',
      animation = 'fade',
      content,
      sender,
      timestamp,
      showTimestamp = false,
      showAvatar = false,
      isLoading = false,
      actions,
      metadata,
      avatar,
      error,
      onRetry,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, spacing, typography, getToken } = useTokens();
    
    // Determine variant from sender role if not explicitly set
    const messageVariant = variant || (sender?.role === 'user' ? 'user' : 'assistant');
    const effectiveAnimation = isLoading ? 'typing' : animation;

    // Get border radius
    const borderRadius = {
      sm: (getToken('borderRadius.sm') as string) || '0.125rem',
      md: (getToken('borderRadius.md') as string) || '0.375rem',
      lg: (getToken('borderRadius.lg') as string) || '0.5rem',
      xl: (getToken('borderRadius.xl') as string) || '0.75rem',
      '2xl': (getToken('borderRadius.2xl') as string) || '1rem',
      full: (getToken('borderRadius.full') as string) || '9999px',
    };

    // Size styles
    const getSizeStyles = (): { bubble: React.CSSProperties; avatar: React.CSSProperties } => {
      switch (size) {
        case 'sm':
          return {
            bubble: {
              padding: spacing[2],
              fontSize: typography.fontSize.sm,
              gap: spacing[2],
            },
            avatar: { width: '24px', height: '24px' },
          };
        case 'lg':
          return {
            bubble: {
              padding: spacing[6],
              fontSize: typography.fontSize.lg,
              gap: spacing[4],
            },
            avatar: { width: '40px', height: '40px' },
          };
        default:
          return {
            bubble: {
              padding: spacing[4],
              fontSize: typography.fontSize.base,
              gap: spacing[3],
            },
            avatar: { width: '32px', height: '32px' },
          };
      }
    };

    // Shape styles
    const getShapeStyles = (): React.CSSProperties => {
      switch (shape) {
        case 'bubble':
          if (messageVariant === 'user') {
            return {
              borderRadius: borderRadius['2xl'],
              borderBottomRightRadius: borderRadius.md,
            };
          } else {
            return {
              borderRadius: borderRadius['2xl'],
              borderBottomLeftRadius: borderRadius.md,
            };
          }
        case 'square':
          return { borderRadius: borderRadius.md };
        default:
          return { borderRadius: borderRadius.lg };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (messageVariant) {
        case 'user':
          return {
            backgroundColor: colors.primary?.[500] || '#3b82f6',
            color: colors.background?.default || '#ffffff',
            borderColor: `${colors.primary?.[500] || '#3b82f6'}33`, // 20% opacity
            marginLeft: 'auto',
            maxWidth: '80%',
          };
        case 'system':
          return {
            backgroundColor: `${colors.accent?.default || colors.neutral?.[100] || '#f3f4f6'}33`, // 20% opacity
            color: colors.accent?.foreground || colors.text?.primary || '#111827',
            borderColor: `${colors.accent?.default || colors.neutral?.[200] || '#e5e7eb'}4D`, // 30% opacity
            margin: '0 auto',
            maxWidth: '90%',
          };
        case 'error':
          return {
            backgroundColor: `${colors.danger?.[500] || '#ef4444'}1A`, // 10% opacity
            color: colors.danger?.[500] || '#ef4444',
            borderColor: `${colors.danger?.[500] || '#ef4444'}4D`, // 30% opacity
            margin: '0 auto',
            maxWidth: '90%',
          };
        case 'warning':
          return {
            backgroundColor: `${colors.warning?.[500] || '#f59e0b'}1A`, // 10% opacity
            color: colors.warning?.[600] || '#d97706',
            borderColor: `${colors.warning?.[500] || '#f59e0b'}4D`, // 30% opacity
            margin: '0 auto',
            maxWidth: '90%',
          };
        default: // assistant
          return {
            backgroundColor: `${colors.neutral?.[100] || '#f3f4f6'}80`, // 50% opacity
            color: colors.text?.primary || colors.neutral?.[900] || '#111827',
            borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            marginRight: 'auto',
            maxWidth: '85%',
          };
      }
    };

    // Avatar styles
    const getAvatarStyles = (avatarVariant: 'user' | 'assistant' | 'system'): React.CSSProperties => {
      const sizeStyles = getSizeStyles().avatar;
      
      const variantStyles = (() => {
        switch (avatarVariant) {
          case 'user':
            return {
              backgroundColor: `${colors.primary?.[500] || '#3b82f6'}1A`, // 10% opacity
              borderColor: `${colors.primary?.[500] || '#3b82f6'}33`, // 20% opacity
            };
          case 'system':
            return {
              backgroundColor: colors.neutral?.[100] || '#f3f4f6',
              borderColor: colors.border?.default || colors.neutral?.[200] || '#e5e7eb',
            };
          default: // assistant
            return {
              backgroundColor: `${colors.accent?.default || colors.neutral?.[100] || '#f3f4f6'}1A`, // 10% opacity
              borderColor: `${colors.accent?.default || colors.neutral?.[200] || '#e5e7eb'}33`, // 20% opacity
            };
        }
      })();

      return {
        flexShrink: 0,
        borderRadius: borderRadius.full,
        border: '1px solid',
        ...sizeStyles,
        ...variantStyles,
      };
    };

    const sizeStyles = getSizeStyles();
    const shapeStyles = getShapeStyles();
    const variantStyles = getVariantStyles();

    // Container styles
    const containerStyles: React.CSSProperties = {
      display: 'flex',
      width: '100%',
      gap: spacing[3],
      justifyContent: messageVariant === 'user' ? 'flex-end' : 'flex-start',
      ...style,
    };

    // Message content container styles
    const messageContentStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      alignItems: messageVariant === 'user' ? 'flex-end' : 'flex-start',
    };

    // Sender name styles
    const senderNameStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      marginBottom: spacing[1],
    };

    // Message bubble styles
    const bubbleStyles: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      width: '100%',
      border: '1px solid',
      transition: 'all 150ms ease-in-out',
      opacity: effectiveAnimation === 'typing' ? 0.6 : 1,
      animation: effectiveAnimation === 'typing' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : undefined,
      ...(error && {
        borderColor: colors.danger?.[500] || '#ef4444',
        backgroundColor: `${colors.danger?.[500] || '#ef4444'}1A`, // 10% opacity
      }),
      ...sizeStyles.bubble,
      ...shapeStyles,
      ...variantStyles,
    };

    // Content area styles
    const contentAreaStyles: React.CSSProperties = {
      flex: 1,
      minWidth: 0,
    };

    // Prose content styles
    const proseStyles: React.CSSProperties = {
      maxWidth: 'none',
      wordBreak: 'break-word',
      lineHeight: typography.lineHeight.relaxed,
    };

    // Error message styles
    const errorStyles: React.CSSProperties = {
      marginTop: spacing[2],
      fontSize: typography.fontSize.sm,
      color: colors.danger?.[500] || '#ef4444',
    };

    // Retry button styles
    const retryButtonStyles: React.CSSProperties = {
      marginLeft: spacing[2],
      textDecoration: 'underline',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'inherit',
      fontSize: 'inherit',
    };

    // Metadata styles
    const metadataStyles: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      color: colors.text?.secondary || colors.neutral?.[500] || '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      marginTop: spacing[2],
    };

    // Actions styles
    const actionsStyles: React.CSSProperties = {
      flexShrink: 0,
      marginLeft: spacing[2],
    };

    // Avatar image styles
    const avatarImageStyles: React.CSSProperties = {
      width: '100%',
      height: '100%',
      borderRadius: borderRadius.full,
      objectFit: 'cover' as const,
    };

    // Avatar text styles
    const avatarTextStyles: React.CSSProperties = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.medium,
      color: messageVariant === 'user' 
        ? (colors.background?.default || '#ffffff')
        : (colors.text?.primary || colors.neutral?.[900] || '#111827'),
    };

    return (
      <div
        ref={ref}
        className={className}
        style={containerStyles}
        {...props}
      >
        {/* Avatar (left side for assistant, hidden for user) */}
        {showAvatar && messageVariant !== 'user' && (
          <div style={{ flexShrink: 0 }}>
            {avatar || (
              <div
                style={getAvatarStyles(messageVariant as 'user' | 'assistant' | 'system')}
                role="img"
                aria-label={`${sender?.name || 'Assistant'} avatar`}
              >
                {sender?.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    style={avatarImageStyles}
                  />
                ) : (
                  <div style={avatarTextStyles}>
                    {sender?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Message content */}
        <div style={messageContentStyles}>
          {/* Sender name (if shown) */}
          {sender?.name && <div style={senderNameStyles}>{sender.name}</div>}

          {/* Message bubble */}
          <div style={bubbleStyles}>
            <div style={contentAreaStyles}>
              {/* Message content */}
              <div style={proseStyles}>{content}</div>

              {/* Error message */}
              {error && (
                <div style={errorStyles}>
                  {error}
                  {onRetry && (
                    <button 
                      onClick={onRetry} 
                      style={retryButtonStyles}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                    >
                      Prøv igjen
                    </button>
                  )}
                </div>
              )}

              {/* Message metadata */}
              {(metadata || showTimestamp) && (
                <div style={metadataStyles}>
                  {showTimestamp && timestamp && <span>{formatTimestamp(timestamp)}</span>}
                  {metadata?.tokens && <span>{metadata.tokens} tokens</span>}
                  {metadata?.model && <span>{metadata.model}</span>}
                  {metadata?.status && <span style={{ textTransform: 'capitalize' }}>{metadata.status}</span>}
                  {metadata?.classification && (
                    <ClassificationIndicator classification={metadata.classification} />
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            {actions && <div style={actionsStyles}>{actions}</div>}
          </div>
        </div>

        {/* Avatar (right side for user) */}
        {showAvatar && messageVariant === 'user' && (
          <div style={{ flexShrink: 0 }}>
            {avatar || (
              <div
                style={getAvatarStyles('user')}
                role="img"
                aria-label={`${sender?.name || 'User'} avatar`}
              >
                {sender?.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    style={avatarImageStyles}
                  />
                ) : (
                  <div style={avatarTextStyles}>
                    {sender?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

/**
 * Legacy variant exports for backward compatibility
 */
export const messageBubbleVariants = {} as any;
export const messageBubbleAvatarVariants = {} as any;
export const messageBubbleMetadataVariants = {} as any;
