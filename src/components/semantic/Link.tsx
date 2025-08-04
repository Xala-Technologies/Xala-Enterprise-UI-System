/**
 * @fileoverview Clean Link Component v6.0.0
 * @description Essential link component using semantic HTML
 * @version 6.0.0
 */

import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils/cn';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly variant?: 'default' | 'muted' | 'destructive' | 'underline';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly external?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant = 'default', size = 'md', external = false, className, children, target, rel, ...props }, ref) => {
    const variantClasses = {
      default: 'text-primary hover:text-primary/80 transition-colors',
      muted: 'text-muted-foreground hover:text-foreground transition-colors',
      destructive: 'text-destructive hover:text-destructive/80 transition-colors',
      underline: 'text-foreground underline underline-offset-4 hover:no-underline transition-all',
    };

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    const finalTarget = external ? '_blank' : target;
    const finalRel = external ? 'noopener noreferrer' : rel;

    return (
      <a
        ref={ref}
        className={cn(
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        target={finalTarget}
        rel={finalRel}
        {...props}
      >
        {children}
        {external && (
          <span className="ml-1 inline-block" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);

// Convenience components
export const ExternalLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'external'>>(
  (props, ref) => <Link ref={ref} external {...props} />
);

export const InternalLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'external'>>(
  (props, ref) => <Link ref={ref} external={false} {...props} />
);

export const EmailLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'href'>>(
  ({ children, ...props }, ref) => (
    <Link ref={ref} href={`mailto:${children}`} {...props}>
      {children}
    </Link>
  )
);

export const PhoneLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'href'>>(
  ({ children, ...props }, ref) => (
    <Link ref={ref} href={`tel:${children}`} {...props}>
      {children}
    </Link>
  )
);

export const DownloadLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link ref={ref} download {...props} />
);

Link.displayName = 'Link';
ExternalLink.displayName = 'ExternalLink';
InternalLink.displayName = 'InternalLink';
EmailLink.displayName = 'EmailLink';
PhoneLink.displayName = 'PhoneLink';
DownloadLink.displayName = 'DownloadLink';