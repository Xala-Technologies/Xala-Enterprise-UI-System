/**
 * @fileoverview Enhanced Footer Component - Enterprise Footer
 * @description Multi-column footer with company info, links, and social media with WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useCallback, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INTERFACES
// =============================================================================

export interface FooterLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly target?: '_blank' | '_self';
  readonly icon?: React.ReactNode;
  readonly isExternal?: boolean;
}

export interface FooterSection {
  readonly id: string;
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface SocialLink {
  readonly id: string;
  readonly platform: string;
  readonly href: string;
  readonly icon: React.ReactNode;
  readonly ariaLabel?: string;
}

export interface FooterCompanyInfo {
  readonly name: string;
  readonly logo?: React.ReactNode;
  readonly description?: string;
  readonly address?: {
    readonly street?: string;
    readonly city?: string;
    readonly postalCode?: string;
    readonly country?: string;
  };
  readonly contact?: {
    readonly phone?: string;
    readonly email?: string;
  };
}

export interface NewsletterConfig {
  readonly title?: string;
  readonly description?: string;
  readonly placeholder?: string;
  readonly buttonText?: string;
  readonly onSubscribe: (email: string) => void;
  readonly isLoading?: boolean;
}

export interface EnhancedFooterProps {
  readonly companyInfo: FooterCompanyInfo;
  readonly sections: readonly FooterSection[];
  readonly socialLinks?: readonly SocialLink[];
  readonly newsletter?: NewsletterConfig;
  readonly legalLinks?: readonly FooterLink[];
  readonly copyrightText?: string;
  readonly showBackToTop?: boolean;
  readonly variant?: 'default' | 'minimal' | 'dark';
  readonly className?: string;
}

// =============================================================================
// ENHANCED FOOTER COMPONENT
// =============================================================================

export const EnhancedFooter = ({
  companyInfo,
  sections,
  socialLinks = [],
  newsletter,
  legalLinks = [],
  copyrightText,
  showBackToTop = true,
  variant = 'default',
  className = ''
}: EnhancedFooterProps): JSX.Element => {
  const { colors, spacing, typography, elevation, borderRadius, componentSizing, motion } = useTokens();
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  // Handle back to top
  const handleBackToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Handle newsletter subscription
  const handleNewsletterSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletter?.onSubscribe) {
      newsletter.onSubscribe(newsletterEmail.trim());
      setNewsletterEmail('');
    }
  }, [newsletterEmail, newsletter]);

  // Generate footer styles based on variant
  const footerStyles = useMemo(() => {
    const baseStyle = {
      backgroundColor: variant === 'dark' 
        ? colors.background?.default 
        : colors.background?.paper,
      borderColor: colors.border?.default,
      color: variant === 'dark' 
        ? colors.text?.primary 
        : colors.text?.primary,
    };

    if (variant === 'minimal') {
      return {
        ...baseStyle,
        borderTop: `1px solid ${colors.border?.muted}`,
        padding: `${spacing[8]} 0`,
      };
    }

    return {
      ...baseStyle,
      borderTop: `1px solid ${colors.border?.default}`,
      boxShadow: variant === 'default' ? elevation?.sm : 'none',
    };
  }, [variant, colors, spacing, elevation]);

  // Render footer section
  const renderSection = useCallback((section: FooterSection) => (
    <div key={section.id} className="space-y-4">
      <h3
        className="font-semibold"
        style={{
          color: colors.text?.primary,
          fontSize: typography.fontSize?.base || '1rem',
          lineHeight: typography.lineHeight?.tight || 1.25
        }}
      >
        {section.title}
      </h3>
      <ul className="space-y-3" role="list">
        {section.links.map(link => (
          <li key={link.id}>
            <a
              href={link.href}
              target={link.target || (link.isExternal ? '_blank' : '_self')}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center space-x-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                color: colors.text?.secondary,
                fontSize: typography.fontSize?.sm || '0.875rem',
                transition: `color ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`
              }}
            >
              {link.icon && (
                <span aria-hidden="true" style={{ width: '16px', height: '16px' }}>
                  {link.icon}
                </span>
              )}
              <span>{link.label}</span>
              {link.isExternal && (
                <span
                  aria-label="(opens in new tab)"
                  style={{
                    fontSize: typography.fontSize?.xs || '0.75rem',
                    color: colors.text?.muted
                  }}
                >
                  ↗
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ), [colors, typography, motion]);

  // Render social links
  const renderSocialLinks = useCallback(() => {
    if (socialLinks.length === 0) return null;

    return (
      <div className="space-y-4">
        <h3
          className="font-semibold"
          style={{
            color: colors.text?.primary,
            fontSize: typography.fontSize?.base || '1rem'
          }}
        >
          Follow Us
        </h3>
        <div className="flex space-x-4">
          {socialLinks.map(social => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                color: colors.text?.muted,
                transition: `all ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`,
                minWidth: '40px',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label={social.ariaLabel || `Follow us on ${social.platform}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    );
  }, [socialLinks, colors, typography, motion]);

  // Render newsletter signup
  const renderNewsletter = useCallback(() => {
    if (!newsletter) return null;

    return (
      <div className="space-y-4">
        <div>
          <h3
            className="font-semibold"
            style={{
              color: colors.text?.primary,
              fontSize: typography.fontSize?.base || '1rem'
            }}
          >
            {newsletter.title || 'Newsletter'}
          </h3>
          {newsletter.description && (
            <p
              className="mt-2"
              style={{
                color: colors.text?.secondary,
                fontSize: typography.fontSize?.sm || '0.875rem'
              }}
            >
              {newsletter.description}
            </p>
          )}
        </div>
        
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <div>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={newsletter.placeholder || 'Enter your email'}
              required
              disabled={newsletter.isLoading}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{
                backgroundColor: colors.background?.default,
                borderColor: colors.border?.default,
                color: colors.text?.primary,
                fontSize: typography.fontSize?.sm || '0.875rem',
                minHeight: componentSizing?.input?.md || '48px'
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={newsletter.isLoading || !newsletterEmail.trim()}
            className="w-full px-4 py-3 font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.primary?.[500] || '#3b82f6',
              color: 'white',
              minHeight: componentSizing?.button?.md || '44px',
              transition: `opacity ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`
            }}
          >
            {newsletter.isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div
                  className="animate-spin rounded-full border-2 border-white border-t-transparent"
                  style={{ width: '16px', height: '16px' }}
                />
                <span>Subscribing...</span>
              </div>
            ) : (
              newsletter.buttonText || 'Subscribe'
            )}
          </button>
        </form>
      </div>
    );
  }, [
    newsletter, 
    newsletterEmail, 
    colors, 
    typography, 
    componentSizing, 
    motion,
    handleNewsletterSubmit
  ]);

  return (
    <footer
      className={`relative ${className}`}
      style={footerStyles}
      role="contentinfo"
    >
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTop}
          className="absolute -top-6 right-8 p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{
            backgroundColor: colors.primary?.[500] || '#3b82f6',
            color: 'white',
            minWidth: '48px',
            minHeight: '48px',
            transition: `all ${motion?.duration?.normal || '200ms'} ${motion?.easing?.ease || 'ease'}`
          }}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ padding: `${spacing[12]} ${spacing[4]} ${spacing[8]}` }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              {companyInfo.logo && (
                <div style={{ width: '40px', height: '40px' }}>
                  {companyInfo.logo}
                </div>
              )}
              <h2
                className="font-bold"
                style={{
                  color: colors.text?.primary,
                  fontSize: typography.fontSize?.xl || '1.25rem'
                }}
              >
                {companyInfo.name}
              </h2>
            </div>

            {companyInfo.description && (
              <p
                style={{
                  color: colors.text?.secondary,
                  fontSize: typography.fontSize?.sm || '0.875rem',
                  lineHeight: typography.lineHeight?.relaxed || 1.625
                }}
              >
                {companyInfo.description}
              </p>
            )}

            {/* Contact Information */}
            {(companyInfo.address || companyInfo.contact) && (
              <div className="space-y-2">
                {companyInfo.address && (
                  <address
                    className="not-italic"
                    style={{
                      color: colors.text?.secondary,
                      fontSize: typography.fontSize?.sm || '0.875rem'
                    }}
                  >
                    {companyInfo.address.street && (
                      <div>{companyInfo.address.street}</div>
                    )}
                    {(companyInfo.address.city || companyInfo.address.postalCode) && (
                      <div>
                        {companyInfo.address.city}
                        {companyInfo.address.postalCode && ` ${companyInfo.address.postalCode}`}
                      </div>
                    )}
                    {companyInfo.address.country && (
                      <div>{companyInfo.address.country}</div>
                    )}
                  </address>
                )}

                {companyInfo.contact && (
                  <div className="space-y-1">
                    {companyInfo.contact.phone && (
                      <a
                        href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}
                        className="block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        style={{
                          color: colors.text?.secondary,
                          fontSize: typography.fontSize?.sm || '0.875rem'
                        }}
                      >
                        {companyInfo.contact.phone}
                      </a>
                    )}
                    {companyInfo.contact.email && (
                      <a
                        href={`mailto:${companyInfo.contact.email}`}
                        className="block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        style={{
                          color: colors.text?.secondary,
                          fontSize: typography.fontSize?.sm || '0.875rem'
                        }}
                      >
                        {companyInfo.contact.email}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {sections.map(renderSection)}

          {/* Newsletter or Social Links */}
          {(newsletter || socialLinks.length > 0) && (
            <div className="space-y-8">
              {renderNewsletter()}
              {renderSocialLinks()}
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pt-8"
          style={{
            marginTop: spacing[8],
            paddingTop: spacing[8],
            borderTop: `1px solid ${colors.border?.muted}`
          }}
        >
          {/* Copyright */}
          <p
            style={{
              color: colors.text?.muted,
              fontSize: typography.fontSize?.sm || '0.875rem'
            }}
          >
            {copyrightText || `© ${new Date().getFullYear()} ${companyInfo.name}. All rights reserved.`}
          </p>

          {/* Legal Links */}
          {legalLinks.length > 0 && (
            <nav
              className="flex flex-wrap space-x-6"
              aria-label="Legal navigation"
            >
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                  <a
                    href={link.href}
                    target={link.target || (link.isExternal ? '_blank' : '_self')}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    style={{
                      color: colors.text?.muted,
                      fontSize: typography.fontSize?.sm || '0.875rem'
                    }}
                  >
                    {link.label}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span
                      style={{
                        color: colors.border?.default,
                        fontSize: typography.fontSize?.sm || '0.875rem'
                      }}
                    >
                      •
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;