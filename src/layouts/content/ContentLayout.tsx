/**
 * @fileoverview Content Layout Component v5.0.0 - Enterprise Content Layout System
 * @description Comprehensive content layout for articles, documentation, blog posts, and long-form content
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// CONTENT LAYOUT VARIANTS
// =============================================================================

const contentLayoutVariants = cva(
  [
    'w-full',
    'bg-background text-foreground',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      layout: {
        article: 'max-w-4xl mx-auto px-4 py-8',
        blog: 'max-w-3xl mx-auto px-4 py-6',
        documentation: 'max-w-6xl mx-auto px-4 py-8',
        magazine: 'max-w-5xl mx-auto px-6 py-12',
        minimal: 'max-w-2xl mx-auto px-4 py-6',
        wide: 'max-w-7xl mx-auto px-6 py-8',
        fullwidth: 'w-full px-4 py-8',
      },
      spacing: {
        tight: 'space-y-4',
        normal: 'space-y-6',
        relaxed: 'space-y-8',
        loose: 'space-y-12',
      },
      typography: {
        default: 'prose prose-neutral',
        large: 'prose prose-lg prose-neutral',
        xl: 'prose prose-xl prose-neutral',
        compact: 'prose prose-sm prose-neutral',
      },
    },
    defaultVariants: {
      layout: 'article',
      spacing: 'normal',
      typography: 'default',
    },
  }
);

const contentHeaderVariants = cva(
  [
    'text-center',
    'border-b border-border',
  ],
  {
    variants: {
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
      spacing: {
        sm: 'pb-6 mb-8',
        md: 'pb-8 mb-12',
        lg: 'pb-12 mb-16',
      },
      variant: {
        default: 'border-b border-border',
        minimal: 'border-b-0 pb-4 mb-6',
        emphasized: 'border-b-2 border-primary/20',
        gradient: 'border-b-0 pb-8 mb-12 bg-gradient-to-r from-transparent via-border to-transparent bg-[length:100%_1px] bg-bottom bg-no-repeat',
      },
    },
    defaultVariants: {
      alignment: 'center',
      spacing: 'md',
      variant: 'default',
    },
  }
);

const contentSidebarVariants = cva(
  [
    'hidden lg:block',
    'sticky top-8',
    'self-start',
  ],
  {
    variants: {
      position: {
        left: 'order-first mr-8',
        right: 'order-last ml-8',
      },
      width: {
        narrow: 'w-48',
        standard: 'w-56',
        wide: 'w-64',
      },
      variant: {
        default: 'bg-card border border-border rounded-lg p-6',
        minimal: 'bg-transparent border-0 p-4',
        floating: 'bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg',
      },
    },
    defaultVariants: {
      position: 'right',
      width: 'standard',
      variant: 'default',
    },
  }
);

const contentNavigationVariants = cva(
  [
    'border-t border-border',
    'pt-8 mt-12',
  ],
  {
    variants: {
      layout: {
        horizontal: 'flex justify-between items-center',
        vertical: 'space-y-4',
        grid: 'grid grid-cols-1 md:grid-cols-2 gap-4',
      },
      variant: {
        default: 'border-t border-border',
        minimal: 'border-t-0 pt-6 mt-8',
        cards: 'border-t-0 pt-8 mt-12',
      },
    },
    defaultVariants: {
      layout: 'horizontal',
      variant: 'default',
    },
  }
);

const contentMetaVariants = cva(
  [
    'flex items-center',
    'text-sm text-muted-foreground',
  ],
  {
    variants: {
      layout: {
        horizontal: 'flex-row space-x-4',
        vertical: 'flex-col space-y-2',
        inline: 'flex-row flex-wrap gap-2',
      },
      alignment: {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
      },
    },
    defaultVariants: {
      layout: 'horizontal',
      alignment: 'center',
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ContentLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'article' | 'blog' | 'documentation' | 'magazine' | 'minimal' | 'wide' | 'fullwidth';
  readonly spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  readonly typography?: 'default' | 'large' | 'xl' | 'compact';
  readonly withSidebar?: boolean;
  readonly sidebarPosition?: 'left' | 'right';
  readonly 'aria-label'?: string;
}

export interface ContentHeaderProps extends React.HTMLAttributes<HTMLElement> {
  readonly children?: ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly alignment?: 'left' | 'center' | 'right';
  readonly spacing?: 'sm' | 'md' | 'lg';
  readonly variant?: 'default' | 'minimal' | 'emphasized' | 'gradient';
  readonly meta?: ReactNode;
  readonly hero?: ReactNode;
}

export interface ContentSidebarProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: ReactNode;
  readonly position?: 'left' | 'right';
  readonly width?: 'narrow' | 'standard' | 'wide';
  readonly variant?: 'default' | 'minimal' | 'floating';
  readonly sticky?: boolean;
}

export interface ContentBodyProps extends React.HTMLAttributes<HTMLElement> {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface ContentNavigationProps extends React.HTMLAttributes<HTMLElement> {
  readonly previousPost?: {
    title: string;
    href: string;
    description?: string;
  };
  readonly nextPost?: {
    title: string;
    href: string;
    description?: string;
  };
  readonly layout?: 'horizontal' | 'vertical' | 'grid';
  readonly variant?: 'default' | 'minimal' | 'cards';
}

export interface ContentMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly author?: {
    name: string;
    avatar?: string;
    href?: string;
  };
  readonly publishedAt?: string;
  readonly updatedAt?: string;
  readonly readingTime?: string;
  readonly tags?: readonly string[];
  readonly layout?: 'horizontal' | 'vertical' | 'inline';
  readonly alignment?: 'left' | 'center' | 'right';
  readonly onTagClick?: (tag: string) => void;
}

export interface ContentTableOfContentsProps extends React.HTMLAttributes<HTMLElement> {
  readonly headings: readonly TOCHeading[];
  readonly activeId?: string;
  readonly title?: string;
  readonly maxLevel?: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface TOCHeading {
  readonly id: string;
  readonly text: string;
  readonly level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ContentShareProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly url?: string;
  readonly title?: string;
  readonly description?: string;
  readonly platforms?: readonly ('twitter' | 'facebook' | 'linkedin' | 'email' | 'copy')[];
  readonly orientation?: 'horizontal' | 'vertical';
}

// =============================================================================
// CONTENT HEADER COMPONENT
// =============================================================================

export const ContentHeader = forwardRef<HTMLElement, ContentHeaderProps>(
  (
    {
      children,
      title,
      subtitle,
      description,
      alignment = 'center',
      spacing = 'md',
      variant = 'default',
      meta,
      hero,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <header
        ref={ref}
        className={cn(contentHeaderVariants({ alignment, spacing, variant }), className)}
        {...props}
      >
        {hero && (
          <div className="mb-8">
            {hero}
          </div>
        )}

        {title && (
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4">
            {title}
          </h1>
        )}

        {subtitle && (
          <h2 className="text-xl md:text-2xl font-medium text-muted-foreground mb-4">
            {subtitle}
          </h2>
        )}

        {description && (
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {meta && (
          <div className="mt-6">
            {meta}
          </div>
        )}

        {children}
      </header>
    );
  }
);

ContentHeader.displayName = 'ContentHeader';

// =============================================================================
// CONTENT SIDEBAR COMPONENT
// =============================================================================

export const ContentSidebar = forwardRef<HTMLElement, ContentSidebarProps>(
  (
    {
      children,
      position = 'right',
      width = 'standard',
      variant = 'default',
      sticky = true,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, borderRadius } = useTokens();

    const sidebarStyles: React.CSSProperties = {
      backgroundColor: variant !== 'minimal' ? colors.background?.paper || colors.background?.default : 'transparent',
      borderColor: colors.border?.default,
    };

    return (
      <aside
        ref={ref}
        className={cn(
          contentSidebarVariants({ position, width, variant }),
          !sticky && 'static',
          className
        )}
        style={sidebarStyles}
        aria-label="Content sidebar"
        {...props}
      >
        {children}
      </aside>
    );
  }
);

ContentSidebar.displayName = 'ContentSidebar';

// =============================================================================
// CONTENT BODY COMPONENT
// =============================================================================

export const ContentBody = forwardRef<HTMLElement, ContentBodyProps>(
  (
    {
      children,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <main
        ref={ref}
        className={cn('flex-1', className)}
        role="main"
        {...props}
      >
        <article className="prose prose-neutral max-w-none">
          {children}
        </article>
      </main>
    );
  }
);

ContentBody.displayName = 'ContentBody';

// =============================================================================
// CONTENT META COMPONENT
// =============================================================================

export const ContentMeta = forwardRef<HTMLDivElement, ContentMetaProps>(
  (
    {
      author,
      publishedAt,
      updatedAt,
      readingTime,
      tags,
      layout = 'horizontal',
      alignment = 'center',
      onTagClick,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(contentMetaVariants({ layout, alignment }), className)}
        {...props}
      >
        {author && (
          <div className="flex items-center space-x-2">
            {author.avatar && (
              <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>
              {author.href ? (
                <a href={author.href} className="hover:text-foreground transition-colors">
                  {author.name}
                </a>
              ) : (
                author.name
              )}
            </span>
          </div>
        )}

        {publishedAt && (
          <time dateTime={publishedAt}>
            {new Date(publishedAt).toLocaleDateString()}
          </time>
        )}

        {readingTime && (
          <span>{readingTime}</span>
        )}

        {updatedAt && (
          <span>
            Updated {new Date(updatedAt).toLocaleDateString()}
          </span>
        )}

        {tags && tags.length > 0 && (
          <div className="flex items-center space-x-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ContentMeta.displayName = 'ContentMeta';

// =============================================================================
// CONTENT TABLE OF CONTENTS COMPONENT
// =============================================================================

export const ContentTableOfContents = forwardRef<HTMLElement, ContentTableOfContentsProps>(
  (
    {
      headings,
      activeId,
      title = 'Table of Contents',
      maxLevel = 3,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const filteredHeadings = headings.filter(heading => heading.level <= maxLevel);

    return (
      <nav
        ref={ref}
        className={cn('space-y-2', className)}
        aria-label="Table of contents"
        {...props}
      >
        <h3 className="font-semibold text-foreground mb-4">{title}</h3>
        <ul className="space-y-1">
          {filteredHeadings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                'text-sm',
                heading.level === 1 && 'font-medium',
                heading.level === 2 && 'ml-3',
                heading.level === 3 && 'ml-6',
                heading.level > 3 && 'ml-9'
              )}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  'block py-1 text-muted-foreground hover:text-foreground transition-colors',
                  activeId === heading.id && 'text-primary font-medium'
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
);

ContentTableOfContents.displayName = 'ContentTableOfContents';

// =============================================================================
// CONTENT NAVIGATION COMPONENT
// =============================================================================

export const ContentNavigation = forwardRef<HTMLElement, ContentNavigationProps>(
  (
    {
      previousPost,
      nextPost,
      layout = 'horizontal',
      variant = 'default',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    if (!previousPost && !nextPost) return <></>;

    return (
      <nav
        ref={ref}
        className={cn(contentNavigationVariants({ layout, variant }), className)}
        aria-label="Content navigation"
        {...props}
      >
        {previousPost && (
          <a
            href={previousPost.href}
            className="group flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors"
          >
            <div className="text-sm">
              <div className="text-muted-foreground mb-1">Previous</div>
              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                {previousPost.title}
              </div>
              {previousPost.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {previousPost.description}
                </div>
              )}
            </div>
          </a>
        )}

        {nextPost && (
          <a
            href={nextPost.href}
            className="group flex items-center justify-end space-x-3 p-4 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors text-right"
          >
            <div className="text-sm">
              <div className="text-muted-foreground mb-1">Next</div>
              <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                {nextPost.title}
              </div>
              {nextPost.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {nextPost.description}
                </div>
              )}
            </div>
          </a>
        )}
      </nav>
    );
  }
);

ContentNavigation.displayName = 'ContentNavigation';

// =============================================================================
// CONTENT SHARE COMPONENT
// =============================================================================

export const ContentShare = forwardRef<HTMLDivElement, ContentShareProps>(
  (
    {
      url = '',
      title = '',
      description = '',
      platforms = ['twitter', 'facebook', 'linkedin', 'email', 'copy'],
      orientation = 'horizontal',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const handleShare = (platform: string): void => {
      const encodedUrl = encodeURIComponent(url);
      const encodedTitle = encodeURIComponent(title);
      const encodedDesc = encodeURIComponent(description);

      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank');
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
          break;
        case 'email':
          window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`;
          break;
        case 'copy':
          navigator.clipboard?.writeText(url);
          break;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center space-x-2',
          orientation === 'vertical' && 'flex-col space-y-2 space-x-0',
          className
        )}
        {...props}
      >
        <span className="text-sm font-medium text-muted-foreground">Share:</span>
        <div className={cn(
          'flex space-x-2',
          orientation === 'vertical' && 'flex-col space-y-2 space-x-0'
        )}>
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => handleShare(platform)}
              className="p-2 bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
              aria-label={`Share on ${platform}`}
            >
              <span className="text-xs capitalize">{platform}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);

ContentShare.displayName = 'ContentShare';

// =============================================================================
// MAIN CONTENT LAYOUT COMPONENT
// =============================================================================

export const ContentLayout = forwardRef<HTMLDivElement, ContentLayoutProps>(
  (
    {
      children,
      layout = 'article',
      spacing = 'normal',
      typography = 'default',
      withSidebar = false,
      sidebarPosition = 'right',
      className,
      'aria-label': ariaLabel = 'Content',
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
    };

    const contentClasses = cn(
      contentLayoutVariants({ layout, spacing, typography }),
      withSidebar && 'flex flex-col lg:flex-row lg:space-x-8',
      className
    );

    return (
      <div
        ref={ref}
        className={contentClasses}
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

ContentLayout.displayName = 'ContentLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

ContentLayout.Header = ContentHeader;
ContentLayout.Sidebar = ContentSidebar;
ContentLayout.Body = ContentBody;
ContentLayout.Meta = ContentMeta;
ContentLayout.TableOfContents = ContentTableOfContents;
ContentLayout.Navigation = ContentNavigation;
ContentLayout.Share = ContentShare;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type ContentLayoutVariant = VariantProps<typeof contentLayoutVariants>;
export type ContentHeaderVariant = VariantProps<typeof contentHeaderVariants>;
export type ContentSidebarVariant = VariantProps<typeof contentSidebarVariants>;
export type ContentNavigationVariant = VariantProps<typeof contentNavigationVariants>;
export type ContentMetaVariant = VariantProps<typeof contentMetaVariants>;

export { 
  contentLayoutVariants, 
  contentHeaderVariants, 
  contentSidebarVariants, 
  contentNavigationVariants,
  contentMetaVariants,
};