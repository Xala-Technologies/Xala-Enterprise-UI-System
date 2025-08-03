/**
 * @fileoverview Communication Layout System v5.0.0 - Enterprise Communication Layouts
 * @description Comprehensive communication layouts for chat, forums, feeds, and comments
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// COMMUNICATION LAYOUT VARIANTS
// =============================================================================

const communicationLayoutVariants = cva(
  [
    'w-full h-screen',
    'bg-background text-foreground',
    'flex flex-col',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      layout: {
        chat: 'grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr_280px]',
        forum: 'container mx-auto px-4 py-6 max-w-6xl',
        feed: 'max-w-2xl mx-auto px-4 py-6',
        comments: 'max-w-4xl mx-auto px-4 py-6',
        messaging: 'grid grid-cols-1 md:grid-cols-[280px_1fr]',
        discussion: 'max-w-5xl mx-auto px-4 py-8',
      },
      density: {
        comfortable: 'space-y-6',
        compact: 'space-y-4',
        dense: 'space-y-2',
      },
    },
    defaultVariants: {
      layout: 'chat',
      density: 'comfortable',
    },
  }
);

const chatContainerVariants = cva(
  [
    'flex flex-col',
    'bg-card border border-border',
    'overflow-hidden',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-lg',
        fullscreen: 'rounded-none border-0',
        floating: 'rounded-xl shadow-lg',
        minimal: 'border-0 bg-transparent',
      },
      height: {
        auto: 'h-auto',
        full: 'h-full',
        viewport: 'h-screen',
        fixed: 'h-96',
      },
    },
    defaultVariants: {
      variant: 'default',
      height: 'full',
    },
  }
);

const chatSidebarVariants = cva(
  [
    'flex flex-col',
    'bg-card border-r border-border',
    'overflow-y-auto',
  ],
  {
    variants: {
      position: {
        left: 'order-first',
        right: 'order-last',
      },
      width: {
        narrow: 'w-56',
        standard: 'w-64 lg:w-72',
        wide: 'w-80',
      },
      collapsible: {
        true: 'lg:block hidden',
        false: 'block',
      },
    },
    defaultVariants: {
      position: 'left',
      width: 'standard',
      collapsible: false,
    },
  }
);

const messageListVariants = cva(
  [
    'flex-1 overflow-y-auto',
    'px-4 py-6',
    'space-y-4',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        contrast: 'bg-secondary/20',
        minimal: 'bg-transparent px-0',
      },
      scrollBehavior: {
        smooth: 'scroll-smooth',
        auto: 'scroll-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      scrollBehavior: 'smooth',
    },
  }
);

const messageItemVariants = cva(
  [
    'flex space-x-3',
    'group',
  ],
  {
    variants: {
      alignment: {
        left: 'justify-start',
        right: 'justify-end flex-row-reverse space-x-reverse',
      },
      variant: {
        default: 'items-start',
        bubble: 'items-end',
        compact: 'items-center',
      },
    },
    defaultVariants: {
      alignment: 'left',
      variant: 'default',
    },
  }
);

const forumPostVariants = cva(
  [
    'bg-card border border-border rounded-lg',
    'p-6',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: 'hover:shadow-md',
        featured: 'border-primary/50 bg-primary/5',
        pinned: 'border-yellow-500/50 bg-yellow-50 dark:bg-yellow-900/20',
        locked: 'opacity-75 pointer-events-none',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const feedItemVariants = cva(
  [
    'bg-card border border-border rounded-lg',
    'p-4 md:p-6',
    'transition-all duration-200 ease-in-out',
    'hover:shadow-sm',
  ],
  {
    variants: {
      variant: {
        default: 'border-border',
        highlighted: 'border-primary/30 bg-primary/5',
        compact: 'p-3',
      },
      interaction: {
        none: '',
        hover: 'hover:bg-card/80',
        clickable: 'cursor-pointer hover:bg-card/80 hover:border-primary/30',
      },
    },
    defaultVariants: {
      variant: 'default',
      interaction: 'hover',
    },
  }
);

const commentThreadVariants = cva(
  [
    'space-y-4',
  ],
  {
    variants: {
      nesting: {
        flat: '',
        nested: 'ml-8 border-l-2 border-border pl-4',
        threaded: 'ml-6 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border',
      },
      maxDepth: {
        3: '[&_.comment-level-3]:ml-0 [&_.comment-level-3]:border-l-0',
        5: '[&_.comment-level-5]:ml-0 [&_.comment-level-5]:border-l-0',
        unlimited: '',
      },
    },
    defaultVariants: {
      nesting: 'nested',
      maxDepth: 5,
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface CommunicationLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'chat' | 'forum' | 'feed' | 'comments' | 'messaging' | 'discussion';
  readonly density?: 'comfortable' | 'compact' | 'dense';
  readonly 'aria-label'?: string;
}

export interface ChatLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly variant?: 'default' | 'fullscreen' | 'floating' | 'minimal';
  readonly height?: 'auto' | 'full' | 'viewport' | 'fixed';
  readonly showSidebar?: boolean;
  readonly sidebarContent?: ReactNode;
  readonly onlineUsers?: readonly ChatUser[];
}

export interface ChatSidebarProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: ReactNode;
  readonly position?: 'left' | 'right';
  readonly width?: 'narrow' | 'standard' | 'wide';
  readonly collapsible?: boolean;
  readonly users?: readonly ChatUser[];
  readonly channels?: readonly ChatChannel[];
}

export interface ChatUser {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly status: 'online' | 'away' | 'busy' | 'offline';
  readonly lastSeen?: string;
}

export interface ChatChannel {
  readonly id: string;
  readonly name: string;
  readonly type: 'public' | 'private' | 'direct';
  readonly unreadCount?: number;
  readonly lastMessage?: string;
  readonly lastActivity?: string;
}

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly messages: readonly ChatMessage[];
  readonly variant?: 'default' | 'contrast' | 'minimal';
  readonly scrollBehavior?: 'smooth' | 'auto';
  readonly currentUserId?: string;
  readonly onMessageClick?: (message: ChatMessage) => void;
  readonly onMessageReact?: (messageId: string, reaction: string) => void;
}

export interface ChatMessage {
  readonly id: string;
  readonly content: string;
  readonly author: ChatUser;
  readonly timestamp: string;
  readonly type: 'text' | 'image' | 'file' | 'system';
  readonly reactions?: readonly MessageReaction[];
  readonly replies?: readonly ChatMessage[];
  readonly edited?: boolean;
  readonly attachments?: readonly MessageAttachment[];
}

export interface MessageReaction {
  readonly emoji: string;
  readonly count: number;
  readonly users: readonly string[];
}

export interface MessageAttachment {
  readonly id: string;
  readonly name: string;
  readonly size: string;
  readonly type: string;
  readonly url: string;
  readonly thumbnail?: string;
}

export interface MessageInputProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly value?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly onSend?: (message: string, attachments?: readonly File[]) => void;
  readonly onTyping?: (isTyping: boolean) => void;
  readonly maxLength?: number;
  readonly showAttachments?: boolean;
  readonly showEmoji?: boolean;
  readonly showFormatting?: boolean;
}

export interface ForumPostProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly post: ForumPost;
  readonly variant?: 'default' | 'featured' | 'pinned' | 'locked';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly showStats?: boolean;
  readonly onReply?: (postId: string) => void;
  readonly onVote?: (postId: string, vote: 'up' | 'down') => void;
}

export interface ForumPost {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly author: ForumUser;
  readonly createdAt: string;
  readonly updatedAt?: string;
  readonly category: string;
  readonly tags: readonly string[];
  readonly stats: {
    readonly views: number;
    readonly replies: number;
    readonly votes: number;
    readonly score: number;
  };
  readonly status: 'open' | 'closed' | 'pinned' | 'locked';
  readonly lastReply?: {
    readonly author: ForumUser;
    readonly timestamp: string;
  };
}

export interface ForumUser {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly role: 'user' | 'moderator' | 'admin';
  readonly reputation?: number;
  readonly joinDate: string;
}

export interface FeedItemProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly item: FeedItem;
  readonly variant?: 'default' | 'highlighted' | 'compact';
  readonly interaction?: 'none' | 'hover' | 'clickable';
  readonly showActions?: boolean;
  readonly onLike?: (itemId: string) => void;
  readonly onShare?: (itemId: string) => void;
  readonly onComment?: (itemId: string) => void;
}

export interface FeedItem {
  readonly id: string;
  readonly type: 'post' | 'article' | 'photo' | 'video' | 'link' | 'event';
  readonly content: string;
  readonly author: FeedUser;
  readonly timestamp: string;
  readonly media?: readonly FeedMedia[];
  readonly stats: {
    readonly likes: number;
    readonly comments: number;
    readonly shares: number;
  };
  readonly userInteraction?: {
    readonly liked: boolean;
    readonly shared: boolean;
    readonly commented: boolean;
  };
}

export interface FeedUser {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly verified?: boolean;
  readonly role?: string;
}

export interface FeedMedia {
  readonly id: string;
  readonly type: 'image' | 'video' | 'audio';
  readonly url: string;
  readonly thumbnail?: string;
  readonly alt?: string;
  readonly width?: number;
  readonly height?: number;
}

export interface CommentThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly comments: readonly Comment[];
  readonly nesting?: 'flat' | 'nested' | 'threaded';
  readonly maxDepth?: 3 | 5 | 'unlimited';
  readonly currentUserId?: string;
  readonly onReply?: (commentId: string, content: string) => void;
  readonly onVote?: (commentId: string, vote: 'up' | 'down') => void;
  readonly onEdit?: (commentId: string, content: string) => void;
  readonly onDelete?: (commentId: string) => void;
}

export interface Comment {
  readonly id: string;
  readonly content: string;
  readonly author: CommentUser;
  readonly timestamp: string;
  readonly editedAt?: string;
  readonly parentId?: string;
  readonly depth: number;
  readonly stats: {
    readonly votes: number;
    readonly score: number;
  };
  readonly userVote?: 'up' | 'down';
  readonly replies: readonly Comment[];
}

export interface CommentUser {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly role?: 'user' | 'moderator' | 'admin' | 'author';
}

// =============================================================================
// CHAT SIDEBAR COMPONENT
// =============================================================================

export const ChatSidebar = forwardRef<HTMLElement, ChatSidebarProps>(
  (
    {
      children,
      position = 'left',
      width = 'standard',
      collapsible = false,
      users,
      channels,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    return (
      <aside
        ref={ref}
        className={cn(chatSidebarVariants({ position, width, collapsible }), className)}
        aria-label="Chat sidebar"
        {...props}
      >
        {/* Channels Section */}
        {channels && (
          <div className="p-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground mb-3">Channels</h3>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  className="w-full flex items-center justify-between p-2 rounded-lg text-left hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">#{channel.name}</span>
                  </div>
                  {channel.unreadCount && channel.unreadCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {channel.unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Online Users Section */}
        {users && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Online Users ({users.filter(u => u.status === 'online').length})
            </h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="relative">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div
                      className={cn(
                        'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background',
                        user.status === 'online' && 'bg-green-500',
                        user.status === 'away' && 'bg-yellow-500',
                        user.status === 'busy' && 'bg-red-500',
                        user.status === 'offline' && 'bg-gray-400'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {children}
      </aside>
    );
  }
);

ChatSidebar.displayName = 'ChatSidebar';

// =============================================================================
// MESSAGE LIST COMPONENT
// =============================================================================

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  (
    {
      messages,
      variant = 'default',
      scrollBehavior = 'smooth',
      currentUserId,
      onMessageClick,
      onMessageReact,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: scrollBehavior });
    }, [messages, scrollBehavior]);

    return (
      <div
        ref={ref}
        className={cn(messageListVariants({ variant, scrollBehavior }), className)}
        {...props}
      >
        {messages.map((message) => {
          const isOwnMessage = currentUserId === message.author.id;

          return (
            <div
              key={message.id}
              className={cn(
                messageItemVariants({
                  alignment: isOwnMessage ? 'right' : 'left',
                  variant: 'default'
                })
              )}
            >
              {!isOwnMessage && (
                <div className="flex-shrink-0">
                  {message.author.avatar ? (
                    <img
                      src={message.author.avatar}
                      alt={message.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <span className="text-xs font-medium">
                        {message.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex-1 max-w-xs md:max-w-md lg:max-w-lg">
                {!isOwnMessage && (
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {message.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                )}

                <div
                  className={cn(
                    'p-3 rounded-lg',
                    isOwnMessage
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-secondary text-secondary-foreground'
                  )}
                  onClick={() => onMessageClick?.(message)}
                >
                  <p className="text-sm break-words">{message.content}</p>
                  
                  {isOwnMessage && (
                    <div className="text-xs opacity-70 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString()}
                      {message.edited && <span className="ml-1">(edited)</span>}
                    </div>
                  )}
                </div>

                {/* Reactions */}
                {message.reactions && message.reactions.length > 0 && (
                  <div className="flex items-center space-x-1 mt-1">
                    {message.reactions.map((reaction) => (
                      <button
                        key={reaction.emoji}
                        onClick={() => onMessageReact?.(message.id, reaction.emoji)}
                        className="flex items-center space-x-1 px-2 py-1 bg-secondary/50 hover:bg-secondary rounded-full text-xs transition-colors"
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center space-x-2 p-2 bg-secondary/30 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                        <a
                          href={attachment.url}
                          className="text-sm text-primary hover:text-primary/80"
                          download
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isOwnMessage && (
                <div className="flex-shrink-0">
                  {message.author.avatar ? (
                    <img
                      src={message.author.avatar}
                      alt={message.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-foreground">
                        {message.author.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';

// =============================================================================
// MESSAGE INPUT COMPONENT
// =============================================================================

export const MessageInput = forwardRef<HTMLDivElement, MessageInputProps>(
  (
    {
      value = '',
      placeholder = 'Type a message...',
      disabled = false,
      loading = false,
      onSend,
      onTyping,
      maxLength = 1000,
      showAttachments = true,
      showEmoji = true,
      showFormatting = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [message, setMessage] = React.useState(value);
    const [isTyping, setIsTyping] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      if (message.trim() && !disabled && !loading) {
        onSend?.(message.trim());
        setMessage('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const newValue = e.target.value;
      if (newValue.length <= maxLength) {
        setMessage(newValue);
        
        // Auto-resize textarea
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        // Handle typing indicator
        if (!isTyping && newValue.length > 0) {
          setIsTyping(true);
          onTyping?.(true);
        } else if (isTyping && newValue.length === 0) {
          setIsTyping(false);
          onTyping?.(false);
        }
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'border-t border-border bg-card p-4',
          className
        )}
        {...props}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled || loading}
                rows={1}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ maxHeight: '120px' }}
              />
              
              {maxLength && (
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {message.length}/{maxLength}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!message.trim() || disabled || loading}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              ) : (
                'Send'
              )}
            </button>
          </div>

          {/* Action Bar */}
          {(showAttachments || showEmoji || showFormatting) && (
            <div className="flex items-center space-x-2">
              {showAttachments && (
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Attach file"
                >
                  📎
                </button>
              )}
              
              {showEmoji && (
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Add emoji"
                >
                  😊
                </button>
              )}

              {showFormatting && (
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                    aria-label="Bold"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                    aria-label="Italic"
                  >
                    <em>I</em>
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    );
  }
);

MessageInput.displayName = 'MessageInput';

// =============================================================================
// FORUM POST COMPONENT
// =============================================================================

export const ForumPost = forwardRef<HTMLDivElement, ForumPostProps>(
  (
    {
      post,
      variant = 'default',
      size = 'md',
      showStats = true,
      onReply,
      onVote,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <article
        ref={ref}
        className={cn(forumPostVariants({ variant, size }), className)}
        {...props}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-lg font-medium">
                  {post.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {post.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="font-medium">{post.author.name}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  {post.author.role !== 'user' && (
                    <>
                      <span>•</span>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize">
                        {post.author.role}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {showStats && (
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="text-center">
                    <div className="font-medium">{post.stats.votes}</div>
                    <div>votes</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{post.stats.replies}</div>
                    <div>replies</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{post.stats.views}</div>
                    <div>views</div>
                  </div>
                </div>
              )}
            </div>

            <div className="prose prose-sm max-w-none mb-4">
              <p>{post.content}</p>
            </div>

            {post.tags.length > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {onVote && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onVote(post.id, 'up')}
                      className="p-1 text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      aria-label="Upvote"
                    >
                      ▲
                    </button>
                    <span className="text-sm font-medium">{post.stats.score}</span>
                    <button
                      onClick={() => onVote(post.id, 'down')}
                      className="p-1 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      aria-label="Downvote"
                    >
                      ▼
                    </button>
                  </div>
                )}

                {onReply && post.status === 'open' && (
                  <button
                    onClick={() => onReply(post.id)}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Reply
                  </button>
                )}
              </div>

              {post.lastReply && (
                <div className="text-xs text-muted-foreground">
                  Last reply by <span className="font-medium">{post.lastReply.author.name}</span>{' '}
                  {new Date(post.lastReply.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }
);

ForumPost.displayName = 'ForumPost';

// =============================================================================
// FEED ITEM COMPONENT
// =============================================================================

export const FeedItem = forwardRef<HTMLDivElement, FeedItemProps>(
  (
    {
      item,
      variant = 'default',
      interaction = 'hover',
      showActions = true,
      onLike,
      onShare,
      onComment,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <article
        ref={ref}
        className={cn(feedItemVariants({ variant, interaction }), className)}
        {...props}
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {item.author.avatar ? (
              <img
                src={item.author.avatar}
                alt={item.author.name}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-sm font-medium">
                  {item.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium text-foreground">{item.author.name}</span>
              {item.author.verified && (
                <span className="text-blue-500" aria-label="Verified">✓</span>
              )}
              <span className="text-sm text-muted-foreground">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>

            <div className="prose prose-sm max-w-none mb-3">
              <p>{item.content}</p>
            </div>

            {item.media && item.media.length > 0 && (
              <div className="mb-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                {item.media.map((media) => (
                  <div key={media.id} className="rounded-lg overflow-hidden">
                    {media.type === 'image' && (
                      <img
                        src={media.url}
                        alt={media.alt || ''}
                        className="w-full h-auto object-cover"
                      />
                    )}
                    {media.type === 'video' && (
                      <video
                        controls
                        poster={media.thumbnail}
                        className="w-full h-auto"
                      >
                        <source src={media.url} />
                      </video>
                    )}
                  </div>
                ))}
              </div>
            )}

            {showActions && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => onLike?.(item.id)}
                    className={cn(
                      'flex items-center space-x-1 text-sm transition-colors',
                      item.userInteraction?.liked
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-muted-foreground hover:text-red-500'
                    )}
                  >
                    <span>{item.userInteraction?.liked ? '❤️' : '🤍'}</span>
                    <span>{item.stats.likes}</span>
                  </button>

                  <button
                    onClick={() => onComment?.(item.id)}
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span>💬</span>
                    <span>{item.stats.comments}</span>
                  </button>

                  <button
                    onClick={() => onShare?.(item.id)}
                    className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-green-600 transition-colors"
                  >
                    <span>🔗</span>
                    <span>{item.stats.shares}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }
);

FeedItem.displayName = 'FeedItem';

// =============================================================================
// COMMENT THREAD COMPONENT
// =============================================================================

export const CommentThread = forwardRef<HTMLDivElement, CommentThreadProps>(
  (
    {
      comments,
      nesting = 'nested',
      maxDepth = 5,
      currentUserId,
      onReply,
      onVote,
      onEdit,
      onDelete,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const renderComment = (comment: Comment): React.ReactElement => {
      const isOwnComment = currentUserId === comment.author.id;
      const canReply = comment.depth < (maxDepth === 'unlimited' ? 999 : maxDepth);

      return (
        <div
          key={comment.id}
          className={cn(
            'space-y-3',
            comment.depth > 0 && nesting !== 'flat' && 'ml-6 border-l-2 border-border pl-4',
            `comment-level-${comment.depth}`
          )}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {comment.author.avatar ? (
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-xs font-medium">
                    {comment.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium text-foreground">{comment.author.name}</span>
                {comment.author.role && comment.author.role !== 'user' && (
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs capitalize">
                    {comment.author.role}
                  </span>
                )}
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.timestamp).toLocaleString()}
                </span>
                {comment.editedAt && (
                  <span className="text-xs text-muted-foreground">(edited)</span>
                )}
              </div>

              <div className="prose prose-sm max-w-none mb-3">
                <p>{comment.content}</p>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                {onVote && (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onVote(comment.id, 'up')}
                      className={cn(
                        'p-1 rounded transition-colors',
                        comment.userVote === 'up'
                          ? 'text-green-600 bg-green-50'
                          : 'text-muted-foreground hover:text-green-600 hover:bg-green-50'
                      )}
                      aria-label="Upvote"
                    >
                      ▲
                    </button>
                    <span className="font-medium">{comment.stats.score}</span>
                    <button
                      onClick={() => onVote(comment.id, 'down')}
                      className={cn(
                        'p-1 rounded transition-colors',
                        comment.userVote === 'down'
                          ? 'text-red-600 bg-red-50'
                          : 'text-muted-foreground hover:text-red-600 hover:bg-red-50'
                      )}
                      aria-label="Downvote"
                    >
                      ▼
                    </button>
                  </div>
                )}

                {onReply && canReply && (
                  <button
                    onClick={() => onReply(comment.id, '')}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Reply
                  </button>
                )}

                {isOwnComment && onEdit && (
                  <button
                    onClick={() => onEdit(comment.id, comment.content)}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                )}

                {isOwnComment && onDelete && (
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>

          {comment.replies.length > 0 && (
            <div className="space-y-3">
              {comment.replies.map(renderComment)}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(commentThreadVariants({ nesting, maxDepth }), className)}
        {...props}
      >
        {comments.map(renderComment)}
      </div>
    );
  }
);

CommentThread.displayName = 'CommentThread';

// =============================================================================
// CHAT LAYOUT COMPONENT
// =============================================================================

export const ChatLayout = forwardRef<HTMLDivElement, ChatLayoutProps>(
  (
    {
      children,
      variant = 'default',
      height = 'full',
      showSidebar = true,
      sidebarContent,
      onlineUsers,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(chatContainerVariants({ variant, height }), className)}
        {...props}
      >
        {showSidebar && (
          <ChatSidebar users={onlineUsers}>
            {sidebarContent}
          </ChatSidebar>
        )}
        
        <div className="flex flex-col flex-1 min-w-0">
          {children}
        </div>
      </div>
    );
  }
);

ChatLayout.displayName = 'ChatLayout';

// =============================================================================
// MAIN COMMUNICATION LAYOUT COMPONENT
// =============================================================================

export const CommunicationLayout = forwardRef<HTMLDivElement, CommunicationLayoutProps>(
  (
    {
      children,
      layout = 'chat',
      density = 'comfortable',
      className,
      'aria-label': ariaLabel = 'Communication interface',
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
    };

    return (
      <div
        ref={ref}
        className={cn(communicationLayoutVariants({ layout, density }), className)}
        style={layoutStyles}
        role="main"
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommunicationLayout.displayName = 'CommunicationLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

CommunicationLayout.Chat = ChatLayout;
CommunicationLayout.ChatSidebar = ChatSidebar;
CommunicationLayout.MessageList = MessageList;
CommunicationLayout.MessageInput = MessageInput;
CommunicationLayout.ForumPost = ForumPost;
CommunicationLayout.FeedItem = FeedItem;
CommunicationLayout.CommentThread = CommentThread;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type CommunicationLayoutVariant = VariantProps<typeof communicationLayoutVariants>;
export type ChatContainerVariant = VariantProps<typeof chatContainerVariants>;
export type ChatSidebarVariant = VariantProps<typeof chatSidebarVariants>;
export type MessageListVariant = VariantProps<typeof messageListVariants>;
export type MessageItemVariant = VariantProps<typeof messageItemVariants>;
export type ForumPostVariant = VariantProps<typeof forumPostVariants>;
export type FeedItemVariant = VariantProps<typeof feedItemVariants>;
export type CommentThreadVariant = VariantProps<typeof commentThreadVariants>;

export { 
  communicationLayoutVariants, 
  chatContainerVariants, 
  chatSidebarVariants, 
  messageListVariants,
  messageItemVariants,
  forumPostVariants,
  feedItemVariants,
  commentThreadVariants,
};