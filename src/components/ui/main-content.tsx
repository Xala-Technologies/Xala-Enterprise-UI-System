/**
 * @fileoverview MainContent Component v5.0.0 - Token-Based Design System
 * @description Generic MainContent component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';
import { Typography } from './typography';
import { Separator } from './separator';

// =============================================================================
// MAIN CONTENT VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Main content variants following CVA pattern
 */
const mainContentVariants = cva(
  [
    'flex-1 min-h-0',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background',
        filled: 'bg-card',
        elevated: 'bg-card shadow-sm border border-border',
        minimal: 'bg-transparent',
        padded: 'bg-background p-6',
        contained: 'bg-card border border-border rounded-lg',
      },
      spacing: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12',
      },
      maxWidth: {
        none: 'max-w-none',
        sm: 'max-w-sm mx-auto',
        md: 'max-w-md mx-auto',
        lg: 'max-w-lg mx-auto',
        xl: 'max-w-xl mx-auto',
        '2xl': 'max-w-2xl mx-auto',
        '4xl': 'max-w-4xl mx-auto',
        '6xl': 'max-w-6xl mx-auto',
        '7xl': 'max-w-7xl mx-auto',
        full: 'max-w-full',
        screen: 'max-w-screen-2xl mx-auto',
      },
      overflow: {
        visible: 'overflow-visible',
        hidden: 'overflow-hidden',
        scroll: 'overflow-auto',
        'scroll-x': 'overflow-x-auto overflow-y-hidden',
        'scroll-y': 'overflow-y-auto overflow-x-hidden',
      },
    },
    defaultVariants: {
      variant: 'default',
      spacing: 'md',
      maxWidth: 'none',
      overflow: 'scroll',
    },
  }
);

const mainContentHeaderVariants = cva(
  'flex items-center justify-between mb-6',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4 border-b border-border',
        false: '',
      },
    },
    defaultVariants: {
      sticky: false,
    },
  }
);

// =============================================================================
// MAIN CONTENT INTERFACES
// =============================================================================

export interface MainContentProps 
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'>,
    VariantProps<typeof mainContentVariants> {
  /** Main content title */
  readonly title?: ReactNode;
  /** Subtitle or description */
  readonly subtitle?: ReactNode;
  /** Actions or buttons for the header */
  readonly actions?: ReactNode;
  /** Show header divider */
  readonly showHeaderDivider?: boolean;
  /** Make header sticky */
  readonly stickyHeader?: boolean;
  /** Loading state */
  readonly loading?: boolean;
  /** Error state */
  readonly error?: string | Error | null;
  /** Empty state */
  readonly empty?: boolean;
  /** Empty state content */
  readonly emptyContent?: ReactNode;
  /** Loading content */
  readonly loadingContent?: ReactNode;
  /** Error content */
  readonly errorContent?: ReactNode;
  /** Container element to use */
  readonly as?: 'main' | 'section' | 'div' | 'article';
  /** Enable responsive behavior */
  readonly responsive?: boolean;
}

export interface MainContentHeaderProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof mainContentHeaderVariants> {
  readonly title?: ReactNode;
  readonly subtitle?: ReactNode;
  readonly actions?: ReactNode;
  readonly showDivider?: boolean;
}

export interface MainContentSectionProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly actions?: ReactNode;
  readonly collapsible?: boolean;
  readonly defaultCollapsed?: boolean;
}

// =============================================================================
// MAIN CONTENT SUB-COMPONENTS
// =============================================================================

/**
 * Main content header component
 */
export const MainContentHeader = forwardRef<HTMLDivElement, MainContentHeaderProps>(
  ({ title, subtitle, actions, showDivider = false, sticky, className, children, ...props }, ref) => {
    return (
      <>
        <div 
          ref={ref} 
          className={cn(mainContentHeaderVariants({ sticky }), className)} 
          {...props}
        >
          {/* Title and subtitle */}
          {(title || subtitle) && (
            <div className="flex-1 min-w-0">
              {title && (
                <Typography 
                  variant="h2" 
                  className="text-foreground font-semibold mb-1 truncate"
                >
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography 
                  variant="bodySmall" 
                  className="text-muted-foreground truncate"
                >
                  {subtitle}
                </Typography>
              )}
            </div>
          )}

          {/* Custom header content */}
          {children && <div className="flex-1">{children}</div>}

          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2 ml-4">
              {actions}
            </div>
          )}
        </div>
        
        {/* Divider */}
        {showDivider && !sticky && <Separator className="mb-6" />}
      </>
    );
  }
);

MainContentHeader.displayName = 'MainContentHeader';

/**
 * Main content section component
 */
export const MainContentSection = forwardRef<HTMLDivElement, MainContentSectionProps>(
  ({ 
    title, 
    description, 
    actions, 
    collapsible = false, 
    defaultCollapsed = false, 
    className, 
    children, 
    ...props 
  }, ref) => {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

    const toggleCollapse = React.useCallback(() => {
      if (collapsible) {
        setIsCollapsed(prev => !prev);
      }
    }, [collapsible]);

    return (
      <section ref={ref} className={cn('space-y-4', className)} {...props}>
        {/* Section header */}
        {(title || description || actions) && (
          <div className="flex items-start justify-between gap-4">
            {/* Title and description */}
            <div className="flex-1 min-w-0">
              {title && (
                <div className="flex items-center gap-2">
                  <Typography 
                    variant="h4" 
                    className="text-foreground font-medium"
                  >
                    {title}
                  </Typography>
                  {collapsible && (
                    <button
                      onClick={toggleCollapse}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
                    >
                      <svg 
                        className={cn('w-4 h-4 transition-transform', isCollapsed && 'rotate-180')} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
              {description && (
                <Typography 
                  variant="bodySmall" 
                  className="text-muted-foreground mt-1"
                >
                  {description}
                </Typography>
              )}
            </div>

            {/* Actions */}
            {actions && (
              <div className="flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        )}

        {/* Section content */}
        {!isCollapsed && children && (
          <div className="space-y-4">
            {children}
          </div>
        )}
      </section>
    );
  }
);

MainContentSection.displayName = 'MainContentSection';

// =============================================================================
// STATE COMPONENTS
// =============================================================================

/**
 * Loading state component
 */
const LoadingState: React.FC<{ content?: ReactNode }> = ({ content }) => {
  if (content) return <>{content}</>;
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
        <Typography variant="body" className="text-muted-foreground">
          Loading...
        </Typography>
      </div>
    </div>
  );
};

/**
 * Error state component
 */
const ErrorState: React.FC<{ error: string | Error; content?: ReactNode }> = ({ 
  error, 
  content 
}) => {
  if (content) return <>{content}</>;
  
  const errorMessage = error instanceof Error ? error.message : error;
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-2 max-w-md">
        <div className="text-destructive">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <Typography variant="h4" className="text-foreground font-medium">
          Something went wrong
        </Typography>
        <Typography variant="body" className="text-muted-foreground">
          {errorMessage}
        </Typography>
      </div>
    </div>
  );
};

/**
 * Empty state component
 */
const EmptyState: React.FC<{ content?: ReactNode }> = ({ content }) => {
  if (content) return <>{content}</>;
  
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center space-y-2 max-w-md">
        <div className="text-muted-foreground">
          <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <Typography variant="h4" className="text-foreground font-medium">
          No content found
        </Typography>
        <Typography variant="body" className="text-muted-foreground">
          There's nothing to display here yet.
        </Typography>
      </div>
    </div>
  );
};

// =============================================================================
// MAIN CONTENT COMPONENT
// =============================================================================

/**
 * MainContent Component with token-based styling
 * Provides comprehensive main content layouts for applications
 */
export const MainContent = forwardRef<HTMLElement, MainContentProps>(
  (
    {
      title,
      subtitle,
      actions,
      showHeaderDivider = false,
      stickyHeader = false,
      loading = false,
      error = null,
      empty = false,
      emptyContent,
      loadingContent,
      errorContent,
      as: Component = 'main',
      responsive = true,
      variant,
      spacing,
      maxWidth,
      overflow,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { colors, spacing: tokenSpacing } = useTokens();

    // Custom styles for token-based theming
    const mainContentStyles = React.useMemo((): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {};

      if (variant === 'filled') {
        baseStyles.backgroundColor = colors.background?.paper || '#ffffff';
      } else if (variant === 'elevated') {
        baseStyles.backgroundColor = colors.background?.paper || '#ffffff';
        baseStyles.borderColor = colors.border?.default || '#e5e7eb';
      }

      return { ...baseStyles, ...style };
    }, [colors, variant, style]);

    // Determine what to render
    const renderContent = (): ReactNode => {
      if (loading) {
        return <LoadingState content={loadingContent} />;
      }
      
      if (error) {
        return <ErrorState error={error} content={errorContent} />;
      }
      
      if (empty) {
        return <EmptyState content={emptyContent} />;
      }
      
      return children;
    };

    return (
      <Component
        ref={ref as any}
        role={Component === 'main' ? 'main' : undefined}
        aria-label={typeof title === 'string' ? title : 'Main content'}
        className={cn(
          mainContentVariants({ variant, spacing, maxWidth, overflow }),
          responsive && 'px-4 sm:px-6 lg:px-8',
          className
        )}
        style={mainContentStyles}
        {...props}
      >
        {/* Header */}
        {(title || subtitle || actions) && (
          <MainContentHeader
            title={title}
            subtitle={subtitle}
            actions={actions}
            showDivider={showHeaderDivider}
            sticky={stickyHeader}
          />
        )}

        {/* Content */}
        <div className={cn(
          'flex-1',
          (title || subtitle || actions) && !stickyHeader && 'space-y-6'
        )}>
          {renderContent()}
        </div>
      </Component>
    );
  }
);

MainContent.displayName = 'MainContent';

// =============================================================================
// MAIN CONTENT COMPOSITIONS
// =============================================================================

/**
 * Pre-built main content compositions for common use cases
 */
export const MainContentComposition = {
  /**
   * Simple main content with title
   */
  Simple: ({ 
    title, 
    children, 
    ...props 
  }: Omit<MainContentProps, 'children'> & { 
    title: ReactNode;
    children: ReactNode; 
  }) => (
    <MainContent
      title={title}
      variant="default"
      spacing="md"
      maxWidth="7xl"
      {...props}
    >
      {children}
    </MainContent>
  ),

  /**
   * Dashboard-style main content
   */
  Dashboard: ({ 
    title, 
    subtitle, 
    actions, 
    children, 
    ...props 
  }: Omit<MainContentProps, 'children'> & { children: ReactNode }) => (
    <MainContent
      title={title}
      subtitle={subtitle}
      actions={actions}
      variant="default"
      spacing="lg"
      maxWidth="none"
      stickyHeader
      showHeaderDivider
      {...props}
    >
      {children}
    </MainContent>
  ),

  /**
   * Card-style main content
   */
  Card: ({ 
    title, 
    children, 
    ...props 
  }: Omit<MainContentProps, 'children'> & { children: ReactNode }) => (
    <MainContent
      title={title}
      variant="contained"
      spacing="lg"
      maxWidth="4xl"
      {...props}
    >
      {children}
    </MainContent>
  ),

  /**
   * Article-style main content
   */
  Article: ({ 
    title, 
    subtitle, 
    children, 
    ...props 
  }: Omit<MainContentProps, 'children'> & { children: ReactNode }) => (
    <MainContent
      as="article"
      title={title}
      subtitle={subtitle}
      variant="default"
      spacing="xl"
      maxWidth="4xl"
      showHeaderDivider
      {...props}
    >
      {children}
    </MainContent>
  ),

  /**
   * Minimal main content
   */
  Minimal: ({ 
    children, 
    ...props 
  }: Omit<MainContentProps, 'children'> & { children: ReactNode }) => (
    <MainContent
      variant="minimal"
      spacing="none"
      maxWidth="none"
      {...props}
    >
      {children}
    </MainContent>
  ),
};

// Export variants for external usage
export { mainContentVariants, mainContentHeaderVariants };
export type MainContentVariant = VariantProps<typeof mainContentVariants>;
export type MainContentHeaderVariant = VariantProps<typeof mainContentHeaderVariants>;