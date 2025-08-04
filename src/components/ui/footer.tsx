/**
 * @fileoverview Footer Component - Enterprise Footer
 * @description Multi-column footer with company info, links, and social media with WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useCallback, useMemo } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';
import { cn } from '../../lib/utils/cn';

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

export interface FooterProps {
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
// FOOTER COMPONENT
// =============================================================================

export const Footer = ({
  companyInfo,
  sections,
  socialLinks = [],
  newsletter,
  legalLinks = [],
  copyrightText,
  showBackToTop = true,
  variant = 'default',
  className = ''
}: FooterProps): JSX.Element => {
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
        ? '#000000' 
        : '#ffffff',
      borderColor: '#e5e7eb',
      color: variant === 'dark' 
        ? '#ffffff' 
        : '#111827',
    };

    if (variant === 'minimal') {
      return {
        ...baseStyle,
        borderTop: '1px solid var(--border)',
        padding: '1rem',
      };
    }

    return {
      ...baseStyle,
      borderTop: '1px solid #e5e7eb',
      boxShadow: variant === 'default' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
    };
  }, [variant, colors, spacing, elevation]);

  // Render footer section
  const renderSection = useCallback((section: FooterSection) => (
    <Box key={section.id} className="space-y-4">
      <Heading level={3}
        className="font-semibold"
       
      >
        {section.title}
      </Heading>
      <List variant="unordered" className="space-y-3" role="list">
        {section.links.map(link => (
          <ListItem key={link.id}>
            <Link
              href={link.href}
              target={link.target || (link.isExternal ? '_blank' : '_self')}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center space-x-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {link.icon && (
                <Text as="span" aria-hidden="true">
                  {link.icon}
                </Text>
              )}
              <Text as="span">{link.label}</Text>
              {link.isExternal && (
                <Text as="span"
                  aria-label="(opens in new tab)"
                >
                  ↗
                </Text>
              )}
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  ), []);

  // Render social links
  const renderSocialLinks = useCallback(() => {
    if (socialLinks.length === 0) return null;

    return (
      <Box className="space-y-4">
        <Heading level={3}
          className="font-semibold"
        >
          Follow Us
        </Heading>
        <Box className="flex space-x-4">
          {socialLinks.map(social => (
            <Link
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[40px] min-h-[40px] flex items-center justify-center transition-all"
              aria-label={social.ariaLabel || social.platform}
            >
              {social.icon}
            </Link>
          ))}
        </Box>
      </Box>
    );
  }, [socialLinks]);

  // Render newsletter signup
  const renderNewsletter = useCallback(() => {
    if (!newsletter) return null;

    return (
      <Box className="space-y-4">
        <Box>
          <Heading level={3}
            className="font-semibold"
          >
            {newsletter.title || 'Newsletter'}
          </Heading>
          {newsletter.description && (
            <Text
              className="mt-2"
            >
              {newsletter.description}
            </Text>
          )}
        </Box>
        
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <Box>
            <Text as="label" htmlFor="newsletter-email" className="sr-only">
              Email address
            </Text>
            <input
              id="newsletter-email"
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={newsletter.placeholder || 'Enter your email'}
              required
              disabled={newsletter.isLoading}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </Box>
          
          <button
            type="submit"
            disabled={newsletter.isLoading || !newsletterEmail.trim()}
            className="w-full px-4 py-3 font-medium rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white transition-all"
          >
            {newsletter.isLoading ? (
              <Box className="flex items-center justify-center space-x-2">
                <Box
                  className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4"
                />
                <Text as="span">Subscribing...</Text>
              </Box>
            ) : (
              newsletter.buttonText || 'Subscribe'
            )}
          </button>
        </form>
      </Box>
    );
  }, [
    newsletter, 
    newsletterEmail,
    handleNewsletterSubmit
  ]);

  return (
    <Box as="footer"
      className={cn("relative", className)}
      role="contentinfo"
    >
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={handleBackToTop}
          className="absolute -top-6 right-8 p-3 rounded-full shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-primary text-white transition-all"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

      <Box
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Main Footer Content */}
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <Box className="lg:col-span-2 space-y-4">
            <Box className="flex items-center space-x-3">
              {companyInfo.logo && (
                <Box>
                  {companyInfo.logo}
                </Box>
              )}
              <Heading level={2}
                className="font-bold"
              >
                {companyInfo.name}
              </Heading>
            </Box>

            {companyInfo.description && (
              <Text
              >
                {companyInfo.description}
              </Text>
            )}

            {/* Contact Information */}
            {(companyInfo.address || companyInfo.contact) && (
              <Box className="space-y-2">
                {companyInfo.address && (
                  <address
                    className="not-italic"
                  >
                    {companyInfo.address.street && (
                      <Box>{companyInfo.address.street}</Box>
                    )}
                    {(companyInfo.address.city || companyInfo.address.postalCode) && (
                      <Box>
                        {companyInfo.address.city}
                        {companyInfo.address.postalCode && `, ${companyInfo.address.postalCode}`}
                      </Box>
                    )}
                    {companyInfo.address.country && (
                      <Box>{companyInfo.address.country}</Box>
                    )}
                  </address>
                )}

                {companyInfo.contact && (
                  <Box className="space-y-1">
                    {companyInfo.contact.phone && (
                      <Link
                        href={`tel:${companyInfo.contact.phone.replace(/\s/g, '')}`}
                        className="block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {companyInfo.contact.phone}
                      </Link>
                    )}
                    {companyInfo.contact.email && (
                      <Link
                        href={`mailto:${companyInfo.contact.email}`}
                        className="block hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        {companyInfo.contact.email}
                      </Link>
                    )}
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Footer Sections */}
          {sections.map(renderSection)}

          {/* Newsletter or Social Links */}
          {(newsletter || socialLinks.length > 0) && (
            <Box className="space-y-8">
              {renderNewsletter()}
              {renderSocialLinks()}
            </Box>
          )}
        </Box>

        {/* Bottom Section */}
        <Box
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 pt-8 border-t border-border"
        >
          {/* Copyright */}
          <Text className="text-sm text-muted-foreground">
            {copyrightText || `© ${new Date().getFullYear()} ${companyInfo.name}. All rights reserved.`}
          </Text>

          {/* Legal Links */}
          {legalLinks.length > 0 && (
            <Box as="nav"
              className="flex flex-wrap space-x-6"
              aria-label="Legal navigation"
            >
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.id}>
                  <Link
                    href={link.href}
                    target={link.target || (link.isExternal ? '_blank' : '_self')}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <Text as="span"
                    >
                      •
                    </Text>
                  )}
                </React.Fragment>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

// Legacy exports for backward compatibility
export { Footer as EnhancedFooter };
export type { FooterProps as EnhancedFooterProps };