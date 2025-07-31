/**
 * @fileoverview Footer Component v5.0.0 - Token-Based Design System
 * @description Generic Footer component using design tokens with SSR compatibility
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';
import { Typography } from './typography';
import { Button } from './button';
import { Separator } from './separator';

// =============================================================================
// FOOTER VARIANTS USING DESIGN TOKENS
// =============================================================================

/**
 * Footer variants following CVA pattern
 */
const footerVariants = cva(
  [
    'w-full mt-auto',
    'transition-all duration-200',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background border-t border-border',
        filled: 'bg-card',
        elevated: 'bg-card shadow-lg border-t border-border',
        minimal: 'bg-transparent',
        dark: 'bg-slate-900 text-slate-100',
        colored: 'bg-primary text-primary-foreground',
      },
      size: {
        sm: 'py-4 px-4',
        md: 'py-6 px-6',
        lg: 'py-8 px-8',
        xl: 'py-12 px-12',
      },
      sticky: {
        true: 'sticky bottom-0 z-40',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      sticky: false,
    },
  }
);

const footerSectionVariants = cva(
  'space-y-3',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

// =============================================================================
// FOOTER INTERFACES
// =============================================================================

export interface FooterProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  /** Copyright text */
  readonly copyright?: ReactNode;
  /** Company or brand name */
  readonly brand?: ReactNode;
  /** Footer sections/columns */
  readonly sections?: FooterSection[];
  /** Social media links */
  readonly socialLinks?: SocialLink[];
  /** Legal links */
  readonly legalLinks?: FooterLink[];
  /** Newsletter signup */
  readonly newsletter?: NewsletterProps;
  /** Show divider above footer */
  readonly showDivider?: boolean;
  /** Responsive behavior */
  readonly responsive?: boolean;
}

export interface FooterSection {
  readonly title?: ReactNode;
  readonly links?: FooterLink[];
  readonly content?: ReactNode;
  readonly align?: 'left' | 'center' | 'right';
}

export interface FooterLink {
  readonly label: ReactNode;
  readonly href?: string;
  readonly onClick?: () => void;
  readonly external?: boolean;
  readonly disabled?: boolean;
}

export interface SocialLink {
  readonly platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'youtube' | string;
  readonly href: string;
  readonly label?: string;
  readonly icon?: ReactNode;
}

export interface NewsletterProps {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly placeholder?: string;
  readonly buttonText?: ReactNode;
  readonly onSubmit?: (email: string) => void;
}

export interface FooterSectionComponentProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerSectionVariants> {
  readonly section: FooterSection;
}

// =============================================================================
// FOOTER SUB-COMPONENTS
// =============================================================================

/**
 * Footer section component
 */
export const FooterSectionComponent = forwardRef<HTMLDivElement, FooterSectionComponentProps>(
  ({ section, align, className, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        className={cn(footerSectionVariants({ align: align || section.align }), className)} 
        {...props}
      >
        {section.title && (
          <Typography variant="h5" className="font-semibold mb-4">
            {section.title}
          </Typography>
        )}
        
        {section.content && section.content}
        
        {section.links && (
          <ul className="space-y-2">
            {section.links.map((link, index) => (
              <li key={index}>
                <FooterLinkComponent link={link} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

FooterSectionComponent.displayName = 'FooterSectionComponent';

/**
 * Footer link component
 */
const FooterLinkComponent: React.FC<{ link: FooterLink }> = ({ link }) => {
  if (link.href) {
    return (
      <a
        href={link.href}
        target={link.external ? '_blank' : undefined}
        rel={link.external ? 'noopener noreferrer' : undefined}
        className={cn(
          'text-muted-foreground hover:text-foreground transition-colors duration-150',
          link.disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={link.disabled ? (e) => e.preventDefault() : undefined}
      >
        {link.label}
        {link.external && (
          <svg className="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    );
  }

  return (
    <button
      onClick={link.onClick}
      disabled={link.disabled}
      className={cn(
        'text-left text-muted-foreground hover:text-foreground transition-colors duration-150',
        link.disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {link.label}
    </button>
  );
};

/**
 * Social media links component
 */
const SocialLinks: React.FC<{ links: SocialLink[] }> = ({ links }) => {
  const getDefaultIcon = (platform: string) => {
    const iconSize = "w-5 h-5";
    
    switch (platform.toLowerCase()) {
      case 'facebook':
        return (
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541s4.541 2.033 4.541 4.541s-2.033 4.541-4.541 4.541zm7.049 0c-2.508 0-4.541-2.033-4.541-4.541s2.033-4.541 4.541-4.541s4.541 2.033 4.541 4.541s-2.033 4.541-4.541 4.541z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'github':
        return (
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className={iconSize} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return (
          <svg className={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center gap-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label || `Follow us on ${link.platform}`}
          className="text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          {link.icon || getDefaultIcon(link.platform)}
        </a>
      ))}
    </div>
  );
};

/**
 * Newsletter signup component
 */
const Newsletter: React.FC<{ newsletter: NewsletterProps }> = ({ newsletter }) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && newsletter.onSubmit) {
      newsletter.onSubmit(email.trim());
      setEmail('');
    }
  };

  return (
    <div className="space-y-3">
      {newsletter.title && (
        <Typography variant="h5" className="font-semibold">
          {newsletter.title}
        </Typography>
      )}
      {newsletter.description && (
        <Typography variant="bodySmall" className="text-muted-foreground">
          {newsletter.description}
        </Typography>
      )}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={newsletter.placeholder || 'Enter your email'}
          className="flex-1 px-3 py-2 text-sm rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          required
        />
        <Button type="submit" size="sm">
          {newsletter.buttonText || 'Subscribe'}
        </Button>
      </form>
    </div>
  );
};

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

/**
 * Footer Component with token-based styling
 * Provides comprehensive footer layouts for websites and applications
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      copyright,
      brand,
      sections = [],
      socialLinks = [],
      legalLinks = [],
      newsletter,
      showDivider = false,
      responsive = true,
      variant,
      size,
      sticky,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const { colors, spacing } = useTokens();
    const currentYear = new Date().getFullYear();

    // Custom styles for token-based theming
    const footerStyles = React.useMemo((): React.CSSProperties => {
      const baseStyles: React.CSSProperties = {};

      if (variant === 'dark') {
        baseStyles.backgroundColor = '#0f172a'; // Dark slate background
        baseStyles.color = '#f1f5f9'; // Light text
      } else if (variant === 'colored') {
        baseStyles.backgroundColor = colors.primary?.[500] || '#3b82f6';
        baseStyles.color = colors.primary?.foreground || '#ffffff';
      }

      return { ...baseStyles, ...style };
    }, [colors, variant, style]);

    return (
      <>
        {/* Divider */}
        {showDivider && <Separator />}

        {/* Footer */}
        <footer
          ref={ref}
          role="contentinfo"
          className={cn(footerVariants({ variant, size, sticky }), className)}
          style={footerStyles}
          {...props}
        >
          {children ? (
            children
          ) : (
            <div className={cn('mx-auto max-w-7xl', responsive && 'px-4 sm:px-6 lg:px-8')}>
              {/* Main footer content */}
              {(sections.length > 0 || newsletter) && (
                <div className={cn(
                  'grid gap-8 pb-8',
                  responsive && sections.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
                  responsive && sections.length <= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                  responsive && sections.length <= 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                  `grid-cols-1 md:grid-cols-${Math.min(sections.length, 6)}`
                )}>
                  {/* Newsletter */}
                  {newsletter && (
                    <div className={cn(sections.length > 0 && 'md:col-span-2')}>
                      <Newsletter newsletter={newsletter} />
                    </div>
                  )}

                  {/* Footer sections */}
                  {sections.map((section, index) => (
                    <FooterSectionComponent key={index} section={section} />
                  ))}
                </div>
              )}

              {/* Bottom footer */}
              {(copyright || brand || legalLinks.length > 0 || socialLinks.length > 0) && (
                <div className={cn(
                  'border-t border-border pt-6',
                  responsive ? 'flex flex-col gap-4 md:flex-row md:items-center md:justify-between' : 'flex items-center justify-between'
                )}>
                  {/* Left side - Brand and copyright */}
                  <div className="flex items-center gap-4">
                    {brand && <div>{brand}</div>}
                    {copyright && (
                      <Typography variant="bodySmall" className="text-muted-foreground">
                        {copyright}
                      </Typography>
                    )}
                    {!copyright && (
                      <Typography variant="bodySmall" className="text-muted-foreground">
                        © {currentYear} All rights reserved.
                      </Typography>
                    )}
                  </div>

                  {/* Center - Legal links */}
                  {legalLinks.length > 0 && (
                    <div className={cn('flex items-center gap-4', responsive && 'order-3 md:order-2')}>
                      {legalLinks.map((link, index) => (
                        <React.Fragment key={index}>
                          <FooterLinkComponent link={link} />
                          {index < legalLinks.length - 1 && (
                            <span className="text-muted-foreground">•</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                  {/* Right side - Social links */}
                  {socialLinks.length > 0 && (
                    <div className={cn(responsive && 'order-2 md:order-3')}>
                      <SocialLinks links={socialLinks} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </footer>
      </>
    );
  }
);

Footer.displayName = 'Footer';

// =============================================================================
// FOOTER COMPOSITIONS
// =============================================================================

/**
 * Pre-built footer compositions for common use cases
 */
export const FooterComposition = {
  /**
   * Simple footer with copyright and links
   */
  Simple: ({ 
    copyright, 
    links = [], 
    ...props 
  }: Omit<FooterProps, 'children'> & { 
    links?: FooterLink[] 
  }) => (
    <Footer
      copyright={copyright}
      legalLinks={links}
      variant="minimal"
      size="sm"
      {...props}
    />
  ),

  /**
   * Corporate footer with multiple sections
   */
  Corporate: ({ 
    brand, 
    sections, 
    socialLinks, 
    legalLinks, 
    ...props 
  }: Omit<FooterProps, 'children'>) => (
    <Footer
      brand={brand}
      sections={sections}
      socialLinks={socialLinks}
      legalLinks={legalLinks}
      variant="default"
      size="lg"
      showDivider
      {...props}
    />
  ),

  /**
   * Marketing footer with newsletter
   */
  Marketing: ({ 
    newsletter, 
    sections, 
    socialLinks, 
    ...props 
  }: Omit<FooterProps, 'children'>) => (
    <Footer
      newsletter={newsletter}
      sections={sections}
      socialLinks={socialLinks}
      variant="filled"
      size="xl"
      showDivider
      {...props}
    />
  ),

  /**
   * Minimal sticky footer
   */
  Sticky: ({ 
    copyright, 
    socialLinks, 
    ...props 
  }: Omit<FooterProps, 'children'>) => (
    <Footer
      copyright={copyright}
      socialLinks={socialLinks}
      variant="default"
      size="sm"
      sticky
      {...props}
    />
  ),
};

// Export variants for external usage
export { footerVariants, footerSectionVariants };
export type FooterVariant = VariantProps<typeof footerVariants>;
export type FooterSectionVariant = VariantProps<typeof footerSectionVariants>;