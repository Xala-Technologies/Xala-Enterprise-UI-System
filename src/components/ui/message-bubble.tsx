/**
 * @fileoverview SSR-Safe MessageBubble Component - Production Strategy Implementation
 * @description Specialized component for chat messages using useTokens hook for JSON template integration
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Norwegian Enterprise Standards
 */

import React, { forwardRef, type HTMLAttributes } from 'react';

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
  
  const borderRadius = {
    md: '0.375rem',
  };

  const getClassificationStyles = (): React.CSSProperties => {
    switch (classification) {
      case 'ÅPEN':
        return {
          backgroundColor: `${'#22c55e'}33`, // 20% opacity
          color: '#16a34a',
          borderColor: `${'#22c55e'}4D`, // 30% opacity
        };
      case 'BEGRENSET':
        return {
          backgroundColor: `${'#f59e0b'}33`, // 20% opacity
          color: '#d97706',
          borderColor: `${'#f59e0b'}4D`, // 30% opacity
        };
      case 'KONFIDENSIELT':
        return {
          backgroundColor: '#f97316' + '33', // orange-500 with 20% opacity
          color: '#ea580c', // orange-600
          borderColor: '#f97316' + '4D', // orange-500 with 30% opacity
        };
      case 'HEMMELIG':
        return {
          backgroundColor: `${'#ef4444'}33`, // 20% opacity
          color: '#dc2626',
          borderColor: `${'#ef4444'}4D`, // 30% opacity
        };
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#6b7280',
          borderColor: '#e5e7eb',
        };
    }
  };

  const indicatorStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${'0.25rem'} ${'0.5rem'}`,
    fontSize: '0.75rem',
    fontWeight: '500',
    borderRadius: '0.375rem',
    border: '1px solid',
    ...getClassificationStyles(),
  };

  return (
    <Text as="span">
      {classification}
    </Text>
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
        
    // Determine variant from sender role if not explicitly set
    const messageVariant = variant || (sender?.role === 'user' ? 'user' : 'assistant');
    const effectiveAnimation = isLoading ? 'typing' : animation;

    // Get border radius
    const borderRadius = {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      full: '9999px',
    };

    // Size styles
    const getSizeStyles = (): { bubble: React.CSSProperties; avatar: React.CSSProperties } => {
      switch (size) {
        case 'sm':
          return {
            bubble: {
              padding: '0.5rem',
              fontSize: '0.875rem',
              gap: '0.5rem',
            },
            avatar: { width: '24px', height: '24px' },
          };
        case 'lg':
          return {
            bubble: {
              padding: '1.5rem',
              fontSize: '1.125rem',
              gap: '1rem',
            },
            avatar: { width: '40px', height: '40px' },
          };
        default:
          return {
            bubble: {
              padding: '1rem',
              fontSize: '1rem',
              gap: '0.75rem',
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
              borderBottomRightRadius: '0.375rem',
            };
          } else {
            return {
              borderRadius: borderRadius['2xl'],
              borderBottomLeftRadius: '0.375rem',
            };
          }
        case 'square':
          return { borderRadius: '0.375rem' };
        default:
          return { borderRadius: '0.5rem' };
      }
    };

    // Variant styles
    const getVariantStyles = (): React.CSSProperties => {
      switch (messageVariant) {
        case 'user':
          return {
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            borderColor: `${'#3b82f6'}33`, // 20% opacity
            marginLeft: 'auto',
            maxWidth: '80%',
          };
        case 'system':
          return {
            backgroundColor: `${'#f3f4f6'}33`, // 20% opacity
            color: '#111827',
            borderColor: `${'#e5e7eb'}4D`, // 30% opacity
            margin: '0 auto',
            maxWidth: '90%',
          };
        case 'error':
          return {
            backgroundColor: `${'#ef4444'}1A`, // 10% opacity
            color: '#ef4444',
            borderColor: `${'#ef4444'}4D`, // 30% opacity
            margin: '0 auto',
            maxWidth: '90%',
          };
        case 'warning':
          return {
            backgroundColor: `${'#f59e0b'}1A`, // 10% opacity
            color: '#d97706',
            borderColor: `${'#f59e0b'}4D`, // 30% opacity
            margin: '0 auto',
            maxWidth: '90%',
          };
        default: // assistant
          return {
            backgroundColor: `${'#f3f4f6'}80`, // 50% opacity
            color: '#111827',
            borderColor: '#e5e7eb',
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
              backgroundColor: `${'#3b82f6'}1A`, // 10% opacity
              borderColor: `${'#3b82f6'}33`, // 20% opacity
            };
          case 'system':
            return {
              backgroundColor: '#f3f4f6',
              borderColor: '#e5e7eb',
            };
          default: // assistant
            return {
              backgroundColor: `${'#f3f4f6'}1A`, // 10% opacity
              borderColor: `${'#e5e7eb'}33`, // 20% opacity
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
      gap: '0.75rem',
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
      fontSize: '0.75rem',
      color: '#6b7280',
      marginBottom: '0.25rem',
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
        borderColor: '#ef4444',
        backgroundColor: `${'#ef4444'}1A`, // 10% opacity
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
      lineHeight: '1.625',
    };

    // Error message styles
    const errorStyles: React.CSSProperties = {
      marginTop: '0.5rem',
      fontSize: '0.875rem',
      color: '#ef4444',
    };

    // Retry button styles
    const retryButtonStyles: React.CSSProperties = {
      marginLeft: '0.5rem',
      textDecoration: 'underline',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      border: 'none',
      color: 'inherit',
      fontSize: 'inherit',
    };

    // Metadata styles
    const metadataStyles: React.CSSProperties = {
      fontSize: '0.75rem',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginTop: '0.5rem',
    };

    // Actions styles
    const actionsStyles: React.CSSProperties = {
      flexShrink: 0,
      marginLeft: '0.5rem',
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
      fontSize: '0.75rem',
      fontWeight: '500',
      color: messageVariant === 'user' 
        ? ('#ffffff')
        : ('#111827'),
    };

    return (
      <Box
        ref={ref}
        className={className}
       
        {...props}
      >
        {/* Avatar (left side for assistant, hidden for user) */}
        {showAvatar && messageVariant !== 'user' && (
          <Box>
            {avatar || (
              <Box
               
                role="img"
                aria-label={`${sender?.name || 'Assistant'} avatar`}
              >
                {sender?.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                   
                  />
                ) : (
                  <Box>
                    {sender?.name?.[0]?.toUpperCase() || 'A'}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Message content */}
        <Box>
          {/* Sender name (if shown) */}
          {sender?.name && <Box>{sender.name}</Box>}

          {/* Message bubble */}
          <Box>
            <Box>
              {/* Message content */}
              <Box>{content}</Box>

              {/* Error message */}
              {error && (
                <Box>
                  {error}
                  {onRetry && (
                    <Text as="button" 
                      onClick={onRetry} 
                     
                      onMouseEnter={(e) => {
                        e.currentTarget.style.textDecoration = 'none';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.textDecoration = 'underline';
                      }}
                    >
                      Prøv igjen
                    </Text>
                  )}
                </Box>
              )}

              {/* Message metadata */}
              {(metadata || showTimestamp) && (
                <Box>
                  {showTimestamp && timestamp && <Text as="span">{formatTimestamp(timestamp)}</Text>}
                  {metadata?.tokens && <Text as="span">{metadata.tokens} tokens</Text>}
                  {metadata?.model && <Text as="span">{metadata.model}</Text>}
                  {metadata?.status && <Text as="span">{metadata.status}</Text>}
                  {metadata?.classification && (
                    <ClassificationIndicator classification={metadata.classification} />
                  )}
                </Box>
              )}
            </Box>

            {/* Actions */}
            {actions && <Box>{actions}</Box>}
          </Box>
        </Box>

        {/* Avatar (right side for user) */}
        {showAvatar && messageVariant === 'user' && (
          <Box>
            {avatar || (
              <Box
               
                role="img"
                aria-label={`${sender?.name || 'User'} avatar`}
              >
                {sender?.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                   
                  />
                ) : (
                  <Box>
                    {sender?.name?.[0]?.toUpperCase() || 'U'}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    );
  }
);

MessageBubble.displayName = 'MessageBubble';

/**
 * Legacy variant exports for backward compatibility
 */
export const messageBubbleVariants = {};
export const messageBubbleAvatarVariants = {};
export const messageBubbleMetadataVariants = {};
