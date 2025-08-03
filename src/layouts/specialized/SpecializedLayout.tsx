/**
 * @fileoverview Specialized Layout System v5.0.0 - Enterprise Specialized Layouts
 * @description Comprehensive specialized layouts for error pages, maintenance, settings, and help
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// SPECIALIZED LAYOUT VARIANTS
// =============================================================================

const specializedLayoutVariants = cva(
  [
    'min-h-screen w-full',
    'bg-background text-foreground',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      layout: {
        error: 'flex items-center justify-center p-4',
        maintenance: 'flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 to-secondary/5',
        settings: 'container mx-auto py-8 px-4 max-w-6xl',
        help: 'container mx-auto py-6 px-4 max-w-5xl',
        comingSoon: 'flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-accent/10',
        notFound: 'flex items-center justify-center p-4',
      },
      spacing: {
        none: 'space-y-0',
        sm: 'space-y-4',
        md: 'space-y-6',
        lg: 'space-y-8',
        xl: 'space-y-12',
      },
    },
    defaultVariants: {
      layout: 'error',
      spacing: 'md',
    },
  }
);

const errorPageVariants = cva(
  [
    'text-center max-w-md mx-auto',
    'space-y-6',
  ],
  {
    variants: {
      variant: {
        default: 'p-8 bg-card border border-border rounded-lg shadow-sm',
        minimal: 'p-6',
        dramatic: 'p-12 bg-gradient-to-br from-destructive/5 to-destructive/10 rounded-xl',
        friendly: 'p-8 bg-card border border-border rounded-xl shadow-lg',
      },
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const maintenancePageVariants = cva(
  [
    'text-center max-w-2xl mx-auto',
    'space-y-8',
  ],
  {
    variants: {
      variant: {
        default: 'p-8 bg-card border border-border rounded-lg shadow-sm',
        branded: 'p-12 bg-card border border-border rounded-xl shadow-lg',
        minimal: 'p-6',
        countdown: 'p-10 bg-card border border-border rounded-xl shadow-lg',
      },
      showProgress: {
        true: 'pb-12',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      showProgress: false,
    },
  }
);

const settingsLayoutVariants = cva(
  [
    'grid gap-8',
  ],
  {
    variants: {
      layout: {
        sidebar: 'grid-cols-1 lg:grid-cols-[280px_1fr]',
        tabs: 'grid-cols-1',
        stacked: 'grid-cols-1 max-w-3xl mx-auto',
        wide: 'grid-cols-1 xl:grid-cols-[320px_1fr_280px]',
      },
      spacing: {
        tight: 'gap-4',
        normal: 'gap-6',
        relaxed: 'gap-8',
        loose: 'gap-12',
      },
    },
    defaultVariants: {
      layout: 'sidebar',
      spacing: 'normal',
    },
  }
);

const settingsSidebarVariants = cva(
  [
    'space-y-2',
  ],
  {
    variants: {
      variant: {
        default: 'bg-card border border-border rounded-lg p-6',
        minimal: 'bg-transparent border-0 p-0',
        floating: 'bg-card border border-border rounded-xl p-6 shadow-sm sticky top-8',
      },
      position: {
        left: 'order-first',
        right: 'order-last',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'left',
    },
  }
);

const helpLayoutVariants = cva(
  [
    'grid gap-8',
  ],
  {
    variants: {
      layout: {
        sidebar: 'grid-cols-1 lg:grid-cols-[280px_1fr]',
        search: 'grid-cols-1',
        categories: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        article: 'grid-cols-1 max-w-4xl mx-auto',
      },
      variant: {
        default: '',
        documentation: 'prose-style',
        faq: 'faq-style',
        support: 'support-style',
      },
    },
    defaultVariants: {
      layout: 'sidebar',
      variant: 'default',
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface SpecializedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'error' | 'maintenance' | 'settings' | 'help' | 'comingSoon' | 'notFound';
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  readonly 'aria-label'?: string;
}

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly errorCode?: string | number;
  readonly title?: string;
  readonly message?: string;
  readonly description?: string;
  readonly variant?: 'default' | 'minimal' | 'dramatic' | 'friendly';
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
  readonly actions?: ReactNode;
  readonly showHomeButton?: boolean;
  readonly showBackButton?: boolean;
  readonly homeHref?: string;
  readonly illustration?: ReactNode;
}

export interface MaintenancePageProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly title?: string;
  readonly message?: string;
  readonly description?: string;
  readonly variant?: 'default' | 'branded' | 'minimal' | 'countdown';
  readonly showProgress?: boolean;
  readonly progress?: number;
  readonly estimatedTime?: string;
  readonly contactInfo?: MaintenanceContact;
  readonly statusUrl?: string;
  readonly logo?: ReactNode;
  readonly illustration?: ReactNode;
}

export interface MaintenanceContact {
  readonly email?: string;
  readonly phone?: string;
  readonly supportUrl?: string;
}

export interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'sidebar' | 'tabs' | 'stacked' | 'wide';
  readonly spacing?: 'tight' | 'normal' | 'relaxed' | 'loose';
  readonly navigation?: readonly SettingsSection[];
  readonly currentSection?: string;
  readonly onSectionChange?: (sectionId: string) => void;
}

export interface SettingsSection {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly badge?: string | number;
  readonly disabled?: boolean;
  readonly children?: readonly SettingsSection[];
}

export interface SettingsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  readonly sections: readonly SettingsSection[];
  readonly currentSection?: string;
  readonly onSectionChange?: (sectionId: string) => void;
  readonly variant?: 'default' | 'minimal' | 'floating';
  readonly position?: 'left' | 'right';
}

export interface SettingsPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly title?: string;
  readonly description?: string;
  readonly actions?: ReactNode;
  readonly loading?: boolean;
  readonly error?: string;
}

export interface HelpLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly layout?: 'sidebar' | 'search' | 'categories' | 'article';
  readonly variant?: 'default' | 'documentation' | 'faq' | 'support';
  readonly navigation?: readonly HelpCategory[];
  readonly searchPlaceholder?: string;
  readonly onSearch?: (query: string) => void;
}

export interface HelpCategory {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: ReactNode;
  readonly articleCount?: number;
  readonly articles?: readonly HelpArticle[];
}

export interface HelpArticle {
  readonly id: string;
  readonly title: string;
  readonly excerpt?: string;
  readonly content?: string;
  readonly lastUpdated?: string;
  readonly helpful?: boolean;
  readonly category: string;
}

export interface HelpSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'results'> {
  readonly placeholder?: string;
  readonly onSearch?: (query: string) => void;
  readonly results?: readonly HelpSearchResult[];
  readonly loading?: boolean;
  readonly popularQueries?: readonly string[];
}

export interface HelpSearchResult {
  readonly id: string;
  readonly title: string;
  readonly excerpt: string;
  readonly category: string;
  readonly relevance: number;
}

export interface ComingSoonPageProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly title?: string;
  readonly message?: string;
  readonly description?: string;
  readonly launchDate?: string;
  readonly showCountdown?: boolean;
  readonly emailSignup?: boolean;
  readonly onEmailSignup?: (email: string) => void;
  readonly socialLinks?: readonly SocialLink[];
  readonly logo?: ReactNode;
  readonly illustration?: ReactNode;
}

export interface SocialLink {
  readonly platform: string;
  readonly url: string;
  readonly icon?: ReactNode;
}

// =============================================================================
// ERROR PAGE COMPONENT
// =============================================================================

export const ErrorPage = forwardRef<HTMLDivElement, ErrorPageProps>(
  (
    {
      errorCode = '404',
      title,
      message,
      description,
      variant = 'default',
      size = 'md',
      actions,
      showHomeButton = true,
      showBackButton = true,
      homeHref = '/',
      illustration,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const defaultTitles: Record<string, string> = {
      '400': 'Bad Request',
      '401': 'Unauthorized',
      '403': 'Forbidden',
      '404': 'Page Not Found',
      '500': 'Internal Server Error',
      '502': 'Bad Gateway',
      '503': 'Service Unavailable',
    };

    const defaultMessages: Record<string, string> = {
      '400': 'The request could not be understood by the server.',
      '401': 'You need to log in to access this page.',
      '403': 'You don\'t have permission to access this resource.',
      '404': 'The page you\'re looking for doesn\'t exist.',
      '500': 'Something went wrong on our end.',
      '502': 'The server received an invalid response.',
      '503': 'The service is temporarily unavailable.',
    };

    const finalTitle = title || defaultTitles[String(errorCode)] || 'Error';
    const finalMessage = message || defaultMessages[String(errorCode)] || 'An error occurred.';

    return (
      <div
        ref={ref}
        className={cn(errorPageVariants({ variant, size }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {illustration && (
          <div className="mb-6">
            {illustration}
          </div>
        )}

        <div className="space-y-4">
          <div className="text-6xl font-bold text-primary opacity-20">
            {errorCode}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {finalTitle}
          </h1>
          
          <p className="text-lg text-muted-foreground">
            {finalMessage}
          </p>
          
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {showHomeButton && (
            <a
              href={homeHref}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors text-center"
            >
              Go Home
            </a>
          )}
          
          {showBackButton && (
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 font-medium transition-colors"
            >
              Go Back
            </button>
          )}
          
          {actions}
        </div>
      </div>
    );
  }
);

ErrorPage.displayName = 'ErrorPage';

// =============================================================================
// MAINTENANCE PAGE COMPONENT
// =============================================================================

export const MaintenancePage = forwardRef<HTMLDivElement, MaintenancePageProps>(
  (
    {
      title = 'Under Maintenance',
      message = 'We\'ll be back soon!',
      description = 'We\'re currently performing scheduled maintenance to improve your experience. Please check back later.',
      variant = 'default',
      showProgress = false,
      progress = 0,
      estimatedTime,
      contactInfo,
      statusUrl,
      logo,
      illustration,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(maintenancePageVariants({ variant, showProgress }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {logo && (
          <div className="mb-8 flex justify-center">
            {logo}
          </div>
        )}

        {illustration && (
          <div className="mb-8">
            {illustration}
          </div>
        )}

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {message}
          </p>
          
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            {description}
          </p>
        </div>

        {estimatedTime && (
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Estimated completion: <span className="text-primary">{estimatedTime}</span>
            </p>
          </div>
        )}

        {showProgress && (
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        )}

        {(contactInfo || statusUrl) && (
          <div className="space-y-2 text-sm text-muted-foreground">
            {statusUrl && (
              <p>
                Check our{' '}
                <a
                  href={statusUrl}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  status page
                </a>
                {' '}for updates.
              </p>
            )}
            
            {contactInfo && (
              <div className="space-y-1">
                {contactInfo.email && (
                  <p>
                    Email:{' '}
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </p>
                )}
                
                {contactInfo.phone && (
                  <p>
                    Phone:{' '}
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </p>
                )}
                
                {contactInfo.supportUrl && (
                  <p>
                    <a
                      href={contactInfo.supportUrl}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact Support
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

MaintenancePage.displayName = 'MaintenancePage';

// =============================================================================
// SETTINGS SIDEBAR COMPONENT
// =============================================================================

export const SettingsSidebar = forwardRef<HTMLElement, SettingsSidebarProps>(
  (
    {
      sections,
      currentSection,
      onSectionChange,
      variant = 'default',
      position = 'left',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const renderSection = (section: SettingsSection, depth: number = 0): React.ReactElement => (
      <div key={section.id} className={cn(depth > 0 && 'ml-4')}>
        <button
          onClick={() => !section.disabled && onSectionChange?.(section.id)}
          disabled={section.disabled}
          className={cn(
            'w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors',
            currentSection === section.id
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-secondary/50 text-foreground',
            section.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <div className="flex items-center space-x-3">
            {section.icon && (
              <span className="flex-shrink-0">
                {section.icon}
              </span>
            )}
            <span className="font-medium">{section.label}</span>
          </div>
          
          {section.badge && (
            <span className="bg-secondary text-secondary-foreground text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
              {section.badge}
            </span>
          )}
        </button>
        
        {section.children && section.children.length > 0 && (
          <div className="mt-1 space-y-1">
            {section.children.map(child => renderSection(child, depth + 1))}
          </div>
        )}
      </div>
    );

    return (
      <nav
        ref={ref}
        className={cn(settingsSidebarVariants({ variant, position }), className)}
        aria-label="Settings navigation"
        {...props}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Settings</h2>
        <div className="space-y-1">
          {sections.map(section => renderSection(section))}
        </div>
      </nav>
    );
  }
);

SettingsSidebar.displayName = 'SettingsSidebar';

// =============================================================================
// SETTINGS PANEL COMPONENT
// =============================================================================

export const SettingsPanel = forwardRef<HTMLDivElement, SettingsPanelProps>(
  (
    {
      children,
      title,
      description,
      actions,
      loading = false,
      error,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, borderRadius } = useTokens();

    return (
      <div
        ref={ref}
        className={cn(
          'bg-card border border-border rounded-lg p-6 relative',
          loading && 'overflow-hidden',
          className
        )}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {(title || description || actions) && (
          <div className="flex items-start justify-between mb-6">
            <div>
              {title && (
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {children}
      </div>
    );
  }
);

SettingsPanel.displayName = 'SettingsPanel';

// =============================================================================
// HELP SEARCH COMPONENT
// =============================================================================

export const HelpSearch = forwardRef<HTMLDivElement, HelpSearchProps>(
  (
    {
      placeholder = 'Search for help...',
      onSearch,
      results,
      loading = false,
      popularQueries,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [query, setQuery] = React.useState('');

    const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      if (query.trim()) {
        onSearch?.(query.trim());
      }
    };

    return (
      <div
        ref={ref}
        className={cn('space-y-6', className)}
        {...props}
      >
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 pr-16 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            🔍
          </div>
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {popularQueries && popularQueries.length > 0 && !results && (
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Popular searches:</h3>
            <div className="flex flex-wrap gap-2">
              {popularQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => {
                    setQuery(query);
                    onSearch?.(query);
                  }}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm hover:bg-secondary/80 transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {results && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Search Results ({results.length})
            </h3>
            {results.map((result) => (
              <div
                key={result.id}
                className="p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
              >
                <h4 className="font-medium text-foreground mb-2">
                  {result.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-2">
                  {result.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {result.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Math.round(result.relevance * 100)}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

HelpSearch.displayName = 'HelpSearch';

// =============================================================================
// COMING SOON PAGE COMPONENT
// =============================================================================

export const ComingSoonPage = forwardRef<HTMLDivElement, ComingSoonPageProps>(
  (
    {
      title = 'Coming Soon',
      message = 'Something amazing is on the way!',
      description = 'We\'re working hard to bring you something special. Stay tuned for updates.',
      launchDate,
      showCountdown = false,
      emailSignup = false,
      onEmailSignup,
      socialLinks,
      logo,
      illustration,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const [email, setEmail] = React.useState('');
    const [timeLeft, setTimeLeft] = React.useState<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } | null>(null);

    React.useEffect(() => {
      if (showCountdown && launchDate) {
        const updateCountdown = (): void => {
          const now = new Date().getTime();
          const launch = new Date(launchDate).getTime();
          const difference = launch - now;

          if (difference > 0) {
            setTimeLeft({
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
              minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
              seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
          } else {
            setTimeLeft(null);
          }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
      }
    }, [showCountdown, launchDate]);

    const handleEmailSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      if (email.trim()) {
        onEmailSignup?.(email.trim());
        setEmail('');
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'text-center max-w-2xl mx-auto space-y-12 p-8',
          className
        )}
        {...props}
      >
        {logo && (
          <div className="mb-8 flex justify-center">
            {logo}
          </div>
        )}

        {illustration && (
          <div className="mb-8">
            {illustration}
          </div>
        )}

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {message}
          </p>
          
          <p className="text-base text-muted-foreground max-w-md mx-auto">
            {description}
          </p>
        </div>

        {showCountdown && timeLeft && (
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {value.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {unit}
                </div>
              </div>
            ))}
          </div>
        )}

        {emailSignup && (
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 font-medium transition-colors"
              >
                Notify Me
              </button>
            </div>
          </form>
        )}

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
                aria-label={`Follow us on ${link.platform}`}
              >
                {link.icon || link.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ComingSoonPage.displayName = 'ComingSoonPage';

// =============================================================================
// SETTINGS LAYOUT COMPONENT
// =============================================================================

export const SettingsLayout = forwardRef<HTMLDivElement, SettingsLayoutProps>(
  (
    {
      children,
      layout = 'sidebar',
      spacing = 'normal',
      navigation,
      currentSection,
      onSectionChange,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(settingsLayoutVariants({ layout, spacing }), className)}
        {...props}
      >
        {navigation && layout === 'sidebar' && (
          <SettingsSidebar
            sections={navigation}
            currentSection={currentSection}
            onSectionChange={onSectionChange}
          />
        )}
        
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    );
  }
);

SettingsLayout.displayName = 'SettingsLayout';

// =============================================================================
// HELP LAYOUT COMPONENT
// =============================================================================

export const HelpLayout = forwardRef<HTMLDivElement, HelpLayoutProps>(
  (
    {
      children,
      layout = 'sidebar',
      variant = 'default',
      navigation,
      searchPlaceholder,
      onSearch,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(helpLayoutVariants({ layout, variant }), className)}
        {...props}
      >
        {layout === 'search' && (
          <div className="mb-8">
            <HelpSearch
              placeholder={searchPlaceholder}
              onSearch={onSearch}
            />
          </div>
        )}

        {layout === 'categories' && navigation && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigation.map((category) => (
              <div
                key={category.id}
                className="p-6 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow"
              >
                {category.icon && (
                  <div className="mb-4">
                    {category.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                )}
                {category.articleCount && (
                  <p className="text-xs text-muted-foreground">
                    {category.articleCount} articles
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {(layout === 'sidebar' || layout === 'article') && children}
      </div>
    );
  }
);

HelpLayout.displayName = 'HelpLayout';

// =============================================================================
// MAIN SPECIALIZED LAYOUT COMPONENT
// =============================================================================

// Define the compound component type
type SpecializedLayoutComponent = React.ForwardRefExoticComponent<
  SpecializedLayoutProps & React.RefAttributes<HTMLDivElement>
> & {
  Error: typeof ErrorPage;
  Maintenance: typeof MaintenancePage;
  Settings: typeof SettingsLayout;
  SettingsSidebar: typeof SettingsSidebar;
  SettingsPanel: typeof SettingsPanel;
  Help: typeof HelpLayout;
  HelpSearch: typeof HelpSearch;
  ComingSoon: typeof ComingSoonPage;
};

const SpecializedLayoutBase = forwardRef<HTMLDivElement, SpecializedLayoutProps>(
  (
    {
      children,
      layout = 'error',
      spacing = 'md',
      className,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
    };

    const getAriaLabel = (): string => {
      if (ariaLabel) return ariaLabel;
      
      switch (layout) {
        case 'error': return 'Error page';
        case 'maintenance': return 'Maintenance page';
        case 'settings': return 'Settings page';
        case 'help': return 'Help page';
        case 'comingSoon': return 'Coming soon page';
        case 'notFound': return 'Page not found';
        default: return 'Specialized page';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(specializedLayoutVariants({ layout, spacing }), className)}
        style={layoutStyles}
        role="main"
        aria-label={getAriaLabel()}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SpecializedLayoutBase.displayName = 'SpecializedLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

// Create the compound component with proper typing
export const SpecializedLayout = SpecializedLayoutBase as SpecializedLayoutComponent;

// Attach compound components
SpecializedLayout.Error = ErrorPage;
SpecializedLayout.Maintenance = MaintenancePage;
SpecializedLayout.Settings = SettingsLayout;
SpecializedLayout.SettingsSidebar = SettingsSidebar;
SpecializedLayout.SettingsPanel = SettingsPanel;
SpecializedLayout.Help = HelpLayout;
SpecializedLayout.HelpSearch = HelpSearch;
SpecializedLayout.ComingSoon = ComingSoonPage;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type SpecializedLayoutVariant = VariantProps<typeof specializedLayoutVariants>;
export type ErrorPageVariant = VariantProps<typeof errorPageVariants>;
export type MaintenancePageVariant = VariantProps<typeof maintenancePageVariants>;
export type SettingsLayoutVariant = VariantProps<typeof settingsLayoutVariants>;
export type SettingsSidebarVariant = VariantProps<typeof settingsSidebarVariants>;
export type HelpLayoutVariant = VariantProps<typeof helpLayoutVariants>;

export { 
  specializedLayoutVariants, 
  errorPageVariants, 
  maintenancePageVariants, 
  settingsLayoutVariants,
  settingsSidebarVariants,
  helpLayoutVariants,
};