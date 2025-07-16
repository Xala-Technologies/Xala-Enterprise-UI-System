/**
 * @fileoverview MessageBubble Component - Norwegian Compliance
 * @description Specialized component for chat messages in AI interfaces
 * @version 1.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Enterprise Standards
 */

import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/utils/cn';

/**
 * MessageBubble component variants using semantic design tokens
 */
const messageBubbleVariants = cva(
  'relative flex w-full gap-3 p-4 rounded-lg border transition-colors',
  {
    variants: {
      variant: {
        user: 'bg-primary text-primary-foreground border-primary/20 ml-auto max-w-[80%]',
        assistant: 'bg-muted/50 text-foreground border-border mr-auto max-w-[85%]',
        system: 'bg-accent/20 text-accent-foreground border-accent/30 mx-auto max-w-[90%]',
        error: 'bg-destructive/10 text-destructive border-destructive/30 mx-auto max-w-[90%]',
        warning: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30 mx-auto max-w-[90%]',
      },
      size: {
        sm: 'p-2 text-sm gap-2',
        md: 'p-4 text-base gap-3',
        lg: 'p-6 text-lg gap-4',
      },
      shape: {
        rounded: 'rounded-lg',
        bubble: 'rounded-2xl',
        square: 'rounded-md',
      },
      animation: {
        none: '',
        fade: 'animate-in fade-in duration-300',
        slide: 'animate-in slide-in-from-bottom-2 duration-300',
        typing: 'animate-pulse',
      },
    },
    compoundVariants: [
      {
        variant: 'user',
        shape: 'bubble',
        className: 'rounded-2xl rounded-br-md',
      },
      {
        variant: 'assistant',
        shape: 'bubble',
        className: 'rounded-2xl rounded-bl-md',
      },
    ],
    defaultVariants: {
      variant: 'assistant',
      size: 'md',
      shape: 'rounded',
      animation: 'fade',
    },
  }
);

/**
 * MessageBubble avatar variants
 */
const messageBubbleAvatarVariants = cva(
  'flex-shrink-0 rounded-full bg-muted border border-border',
  {
    variants: {
      size: {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
      },
      variant: {
        user: 'bg-primary/10 border-primary/20',
        assistant: 'bg-accent/10 border-accent/20',
        system: 'bg-muted border-border',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'assistant',
    },
  }
);

/**
 * MessageBubble metadata variants
 */
const messageBubbleMetadataVariants = cva('text-xs text-muted-foreground flex items-center gap-2', {
  variants: {
    position: {
      top: 'mb-2',
      bottom: 'mt-2',
      inline: 'inline-flex',
    },
    alignment: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    },
  },
  defaultVariants: {
    position: 'bottom',
    alignment: 'left',
  },
});

/**
 * Message bubble props interface
 */
export interface MessageBubbleProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof messageBubbleVariants> {
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
  const classificationColors = {
    ÅPEN: 'bg-green-500/20 text-green-600 border-green-500/30',
    BEGRENSET: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    KONFIDENSIELT: 'bg-orange-500/20 text-orange-600 border-orange-500/30',
    HEMMELIG: 'bg-red-500/20 text-red-600 border-red-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-xs font-medium rounded-md border',
        classificationColors[classification as keyof typeof classificationColors] ||
          'bg-muted text-muted-foreground border-border'
      )}
    >
      {classification}
    </span>
  );
};

/**
 * MessageBubble component for chat interfaces
 *
 * @example
 * ```tsx
 * // User message
 * <MessageBubble
 *   variant="user"
 *   content="Hello, how can you help me today?"
 *   sender={{ name: "Ibrahim", role: "user" }}
 *   timestamp={new Date()}
 *   showTimestamp
 *   showAvatar
 * />
 *
 * // Assistant message with metadata
 * <MessageBubble
 *   variant="assistant"
 *   content="I can help you with various tasks. What would you like to know?"
 *   sender={{ name: "AI Assistant", role: "assistant" }}
 *   metadata={{
 *     tokens: 45,
 *     model: "gpt-4",
 *     classification: "ÅPEN"
 *   }}
 * />
 *
 * // Loading message
 * <MessageBubble
 *   variant="assistant"
 *   content="Thinking..."
 *   isLoading
 *   animation="typing"
 * />
 * ```
 */
export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      animation,
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
  ) => {
    // Determine variant from sender role if not explicitly set
    const messageVariant = variant || (sender?.role === 'user' ? 'user' : 'assistant');
    const effectiveAnimation = isLoading ? 'typing' : animation;

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full gap-3',
          messageVariant === 'user' ? 'justify-end' : 'justify-start'
        )}
        {...props}
      >
        {/* Avatar (left side for assistant, hidden for user) */}
        {showAvatar && messageVariant !== 'user' && (
          <div className="flex-shrink-0">
            {avatar || (
              <div
                className={cn(
                  messageBubbleAvatarVariants({
                    size,
                    variant: messageVariant as 'user' | 'assistant' | 'system',
                  })
                )}
                role="img"
                aria-label={`${sender?.name || 'Assistant'} avatar`}
              >
                {sender?.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-medium">
                    {sender?.name?.[0]?.toUpperCase() || 'A'}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Message content */}
        <div
          className={cn(
            'flex flex-col min-w-0',
            messageVariant === 'user' ? 'items-end' : 'items-start'
          )}
        >
          {/* Sender name (if shown) */}
          {sender?.name && <div className="text-xs text-muted-foreground mb-1">{sender.name}</div>}

          {/* Message bubble */}
          <div
            className={cn(
              messageBubbleVariants({
                variant: messageVariant,
                size,
                shape,
                animation: effectiveAnimation,
              }),
              error && 'border-destructive bg-destructive/10',
              className
            )}
          >
            <div className="flex-1 min-w-0">
              {/* Message content */}
              <div className="prose prose-sm max-w-none break-words">{content}</div>

              {/* Error message */}
              {error && (
                <div className="mt-2 text-sm text-destructive">
                  {error}
                  {onRetry && (
                    <button onClick={onRetry} className="ml-2 underline hover:no-underline">
                      Prøv igjen
                    </button>
                  )}
                </div>
              )}

              {/* Message metadata */}
              {(metadata || showTimestamp) && (
                <div className={cn(messageBubbleMetadataVariants({ position: 'bottom' }))}>
                  {showTimestamp && timestamp && <span>{formatTimestamp(timestamp)}</span>}
                  {metadata?.tokens && <span>{metadata.tokens} tokens</span>}
                  {metadata?.model && <span>{metadata.model}</span>}
                  {metadata?.status && <span className="capitalize">{metadata.status}</span>}
                  {metadata?.classification && (
                    <ClassificationIndicator classification={metadata.classification} />
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            {actions && <div className="flex-shrink-0 ml-2">{actions}</div>}
          </div>
        </div>

        {/* Avatar (right side for user) */}
        {showAvatar && messageVariant === 'user' && (
          <div className="flex-shrink-0">
            {avatar || (
              <div
                className={cn(
                  messageBubbleAvatarVariants({
                    size,
                    variant: 'user',
                  })
                )}
                role="img"
                aria-label={`${sender?.name || 'User'} avatar`}
              >
                {sender?.avatar ? (
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs font-medium text-primary-foreground">
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
 * MessageBubble component variants export
 */
export { messageBubbleAvatarVariants, messageBubbleMetadataVariants, messageBubbleVariants };
