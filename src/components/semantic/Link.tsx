/**
 * @fileoverview Semantic Link Component v5.0.0 - Complete Link Element Abstraction
 * @description Semantic link component with accessibility and design tokens
 * @version 5.0.0
 * @compliance WCAG AAA, SSR-Safe, Framework-agnostic, Norwegian compliance, Keyboard navigation
 */

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';

// =============================================================================
// SEMANTIC LINK TYPES
// =============================================================================

/**
 * Link semantic intents
 */
export type LinkIntent = 
  | 'default'      // Standard link
  | 'navigation'   // Navigation link
  | 'breadcrumb'   // Breadcrumb link
  | 'external'     // External link
  | 'download'     // Download link
  | 'email'        // Email link (mailto:)
  | 'phone'        // Phone link (tel:)
  | 'anchor'       // In-page anchor link
  | 'destructive'; // Dangerous action link

/**
 * Link visual variants
 */
export type LinkVariant = 
  | 'default'      // Standard underlined link
  | 'subtle'       // Subtle hover underline
  | 'button'       // Button-like appearance
  | 'nav'          // Navigation item
  | 'unstyled';    // No default styling

/**
 * Link sizes
 */
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Link target options
 */
export type LinkTarget = '_self' | '_blank' | '_parent' | '_top';

// =============================================================================
// LINK VARIANTS USING CVA AND DESIGN TOKENS
// =============================================================================

const linkVariants = cva(
  // Base classes using design tokens - WCAG AAA compliant
  'inline-flex items-center gap-1 transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
  {
    variants: {
      // Visual variants
      variant: {
        default: 'text-primary hover:text-primary/80 underline underline-offset-4 hover:underline-offset-2',
        subtle: 'text-foreground hover:text-primary hover:underline underline-offset-4',
        button: 'bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md no-underline',
        nav: 'text-muted-foreground hover:text-foreground hover:bg-accent px-3 py-2 rounded-md font-medium no-underline',
        unstyled: 'text-inherit no-underline hover:no-underline',
      },
      
      // Sizes using typography tokens
      size: {
        xs: 'text-xs',      // 12px
        sm: 'text-sm',      // 14px
        md: 'text-base',    // 16px
        lg: 'text-lg',      // 18px
        xl: 'text-xl',      // 20px
      },
      
      // State variants
      state: {
        default: '',
        active: 'text-primary font-medium bg-accent',
        disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
        visited: 'text-purple-700 dark:text-purple-300',
      },
      
      // Special styling for external links
      external: {
        true: 'after:content-["↗"] after:text-xs after:opacity-70',
        false: '',
      },
      
      // Full width option
      fullWidth: {
        true: 'w-full justify-center',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      state: 'default',
      external: false,
      fullWidth: false,
    },
  }
);

// =============================================================================
// LINK COMPONENT INTERFACE
// =============================================================================

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /** Link semantic intent */
  readonly intent?: LinkIntent;
  /** Visual variant */
  readonly variant?: LinkVariant;
  /** Link size */
  readonly size?: LinkSize;
  /** Link state */
  readonly state?: 'default' | 'active' | 'disabled' | 'visited';
  /** Whether link is external */
  readonly external?: boolean;
  /** Icon element */
  readonly icon?: React.ReactNode;
  /** Icon position */
  readonly iconPosition?: 'left' | 'right';
  /** Children content */
  readonly children?: React.ReactNode;
  /** Language code for i18n */
  readonly lang?: string;
  /** Text direction for RTL support */
  readonly dir?: 'ltr' | 'rtl' | 'auto';
  /** Norwegian compliance classification */
  readonly nsmLevel?: 'OPEN' | 'RESTRICTED' | 'CONFIDENTIAL' | 'SECRET';
  /** Screen reader description for complex links */
  readonly ariaDescription?: string;
  /** Auto-detect external links */
  readonly autoExternal?: boolean;
  /** Custom external link indicator */
  readonly externalIcon?: React.ReactNode;
}

// =============================================================================
// EXTERNAL LINK ICON
// =============================================================================

const ExternalLinkIcon: React.FC<{ size: LinkSize | undefined }> = ({ size = 'md' }) => {
  const iconSizeClass = {
    xs: 'h-2.5 w-2.5',
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
    xl: 'h-4.5 w-4.5',
  }[size];

  return (
    <svg
      className={cn('stroke-current stroke-2 opacity-70', iconSizeClass)}
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
};

// =============================================================================
// SEMANTIC LINK COMPONENT
// =============================================================================

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      intent = 'default',
      variant = 'default',
      size = 'md',
      state = 'default',
      external = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      autoExternal = true,
      externalIcon,
      lang,
      dir,
      nsmLevel,
      ariaDescription,
      href,
      target,
      rel,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Auto-configure based on intent
    const getIntentConfig = () => {
      if (!intent || intent === 'default') return {};
      
      const configs: Record<LinkIntent, Partial<LinkProps>> = {
        default: {},
        navigation: {
          variant: 'nav',
        },
        breadcrumb: {
          variant: 'subtle',
          size: 'sm',
        },
        external: {
          external: true,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        download: {
          target: '_blank',
        },
        email: {
          // href will be automatically prefixed with mailto:
        },
        phone: {
          // href will be automatically prefixed with tel:
        },
        anchor: {
          variant: 'subtle',
        },
        destructive: {
          variant: 'button',
          // Could add destructive styling here
        },
      };
      
      return configs[intent] || {};
    };

    // Auto-detect external links
    const isExternalLink = () => {
      if (!autoExternal || !href) return external;
      
      try {
        const url = new URL(href, window.location.origin);
        return url.origin !== window.location.origin;
      } catch {
        // If URL parsing fails, assume it's not external
        return external;
      }
    };

    // Process href based on intent
    const getProcessedHref = () => {
      if (!href) return href;
      
      switch (intent) {
        case 'email':
          return href.startsWith('mailto:') ? href : `mailto:${href}`;
        case 'phone':
          return href.startsWith('tel:') ? href : `tel:${href}`;
        default:
          return href;
      }
    };

    // Enhanced accessibility attributes
    const getAccessibilityAttributes = () => {
      const attributes: Record<string, any> = {};
      
      if (state === 'disabled') {
        attributes['aria-disabled'] = true;
        attributes.tabIndex = -1;
      }
      
      if (state === 'active') {
        attributes['aria-current'] = 'page';
      }
      
      if (ariaDescription) {
        attributes['aria-describedby'] = ariaDescription;
      }
      
      if (lang) {
        attributes.lang = lang;
      }
      
      if (dir) {
        attributes.dir = dir;
      }
      
      // Add Norwegian compliance data attribute if specified
      if (nsmLevel) {
        attributes['data-nsm-level'] = nsmLevel;
      }
      
      return attributes;
    };

    const intentConfig = getIntentConfig();
    const finalVariant = intentConfig.variant || variant;
    const finalSize = intentConfig.size || size;
    const finalTarget = intentConfig.target || target;
    const finalRel = intentConfig.rel || rel;
    const finalExternal = intentConfig.external || isExternalLink();
    const processedHref = getProcessedHref();
    const accessibilityAttributes = getAccessibilityAttributes();

    // Handle click for disabled state
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (state === 'disabled') {
        event.preventDefault();
        return;
      }
      
      onClick?.(event);
    };

    // Render content with icon
    const renderContent = () => {
      const content = (
        <>
          {icon && iconPosition === 'left' && (
            <span className="flex items-center" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>{children}</span>
          {icon && iconPosition === 'right' && (
            <span className="flex items-center" aria-hidden="true">
              {icon}
            </span>
          )}
          {finalExternal && (
            <span className="flex items-center" aria-hidden="true">
              {externalIcon || <ExternalLinkIcon size={finalSize} />}
            </span>
          )}
        </>
      );

      return content;
    };

    return (
      <a
        ref={ref}
        href={processedHref}
        target={finalTarget}
        rel={finalRel}
        className={cn(
          linkVariants({
            variant: finalVariant,
            size: finalSize,
            state,
            external: finalExternal,
            fullWidth,
          }),
          className
        )}
        onClick={handleClick}
        {...accessibilityAttributes}
        {...props}
      >
        {renderContent()}
      </a>
    );
  }
);

Link.displayName = 'Link';

// =============================================================================
// SEMANTIC LINK VARIANTS FOR CONVENIENCE
// =============================================================================

/**
 * Navigation Link component
 */
export const NavigationLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="navigation" {...props} />
);
NavigationLink.displayName = 'NavigationLink';

/**
 * External Link component
 */
export const ExternalLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="external" {...props} />
);
ExternalLink.displayName = 'ExternalLink';

/**
 * Email Link component  
 */
export const EmailLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="email" {...props} />
);
EmailLink.displayName = 'EmailLink';

/**
 * Phone Link component
 */
export const PhoneLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="phone" {...props} />
);
PhoneLink.displayName = 'PhoneLink';

/**
 * Download Link component
 */
export const DownloadLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="download" {...props} />
);
DownloadLink.displayName = 'DownloadLink';

/**
 * Anchor Link component (for in-page navigation)
 */
export const AnchorLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="anchor" {...props} />
);
AnchorLink.displayName = 'AnchorLink';

/**
 * Breadcrumb Link component
 */
export const BreadcrumbLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'intent'>>(
  (props, ref) => <Link ref={ref} intent="breadcrumb" {...props} />
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

/**
 * Button Link component (link styled as button)
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'variant'>>(
  (props, ref) => <Link ref={ref} variant="button" {...props} />
);
ButtonLink.displayName = 'ButtonLink';