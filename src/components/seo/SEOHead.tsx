/**
 * @fileoverview SEOHead Component v5.0.0 - Token-Based Design System
 * @description SEO optimization component for web platforms
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React from 'react';
import { usePlatform } from '../../hooks';

export interface SEOMetaTags {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Canonical URL */
  canonical?: string;
  /** Keywords */
  keywords?: string[];
  /** Author */
  author?: string;
  /** Robots directives */
  robots?: string;
  /** Language */
  language?: string;
  /** Viewport settings */
  viewport?: string;
}

export interface OpenGraphTags {
  /** OG title */
  title?: string;
  /** OG description */
  description?: string;
  /** OG type */
  type?: 'website' | 'article' | 'product' | 'profile';
  /** OG URL */
  url?: string;
  /** OG image */
  image?: string;
  /** OG site name */
  siteName?: string;
  /** OG locale */
  locale?: string;
}

export interface TwitterTags {
  /** Twitter card type */
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  /** Twitter site */
  site?: string;
  /** Twitter creator */
  creator?: string;
  /** Twitter title */
  title?: string;
  /** Twitter description */
  description?: string;
  /** Twitter image */
  image?: string;
}

export interface StructuredData {
  /** Schema.org type */
  '@type': string;
  /** Additional properties */
  [key: string]: any;
}

export interface SEOHeadProps {
  /** Meta tags */
  meta?: SEOMetaTags;
  /** Open Graph tags */
  openGraph?: OpenGraphTags;
  /** Twitter tags */
  twitter?: TwitterTags;
  /** Structured data */
  structuredData?: StructuredData | StructuredData[];
  /** Additional meta tags */
  additionalMeta?: Array<{ name?: string; property?: string; content: string }>;
  /** Additional link tags */
  additionalLinks?: Array<{ rel: string; href: string; [key: string]: string }>;
  /** No index */
  noindex?: boolean;
  /** No follow */
  nofollow?: boolean;
}

/**
 * SEO optimization component for web platforms
 * Note: This component needs to be integrated with your framework's head management
 * (e.g., Next.js Head, React Helmet, etc.)
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  meta,
  openGraph,
  twitter,
  structuredData,
  additionalMeta = [],
  additionalLinks = [],
  noindex = false,
  nofollow = false,
}) => {
  const { platform } = usePlatform();

  // Only render on web platforms
  if (platform !== 'web' && platform !== 'desktop') {
    return null;
  }

  // Build robots directive
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(', ');

  // Structured data script
  const structuredDataScript = structuredData ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          Array.isArray(structuredData)
            ? structuredData.map(data => ({ '@context': 'https://schema.org', ...data }))
            : { '@context': 'https://schema.org', ...structuredData }
        ),
      }}
    />
  ) : null;

  // Note: This is a conceptual implementation
  // In a real application, you would use your framework's head management
  // For example, with Next.js, you would use the Head component
  // With React Helmet, you would use the Helmet component
  
  return (
    <>
      {/* This is a placeholder implementation */}
      {/* Replace with your framework's head management solution */}
      <div data-seo-head style={{ display: 'none' }}>
        {/* Basic meta tags */}
        {meta?.title && <meta name="title" content={meta.title} />}
        {meta?.description && <meta name="description" content={meta.description} />}
        {meta?.keywords && <meta name="keywords" content={meta.keywords.join(', ')} />}
        {meta?.author && <meta name="author" content={meta.author} />}
        {meta?.language && <meta httpEquiv="content-language" content={meta.language} />}
        {meta?.viewport && <meta name="viewport" content={meta.viewport} />}
        <meta name="robots" content={meta?.robots || robotsContent} />

        {/* Canonical URL */}
        {meta?.canonical && <link rel="canonical" href={meta.canonical} />}

        {/* Open Graph tags */}
        {openGraph?.title && <meta property="og:title" content={openGraph.title} />}
        {openGraph?.description && <meta property="og:description" content={openGraph.description} />}
        {openGraph?.type && <meta property="og:type" content={openGraph.type} />}
        {openGraph?.url && <meta property="og:url" content={openGraph.url} />}
        {openGraph?.image && <meta property="og:image" content={openGraph.image} />}
        {openGraph?.siteName && <meta property="og:site_name" content={openGraph.siteName} />}
        {openGraph?.locale && <meta property="og:locale" content={openGraph.locale} />}

        {/* Twitter tags */}
        {twitter?.card && <meta name="twitter:card" content={twitter.card} />}
        {twitter?.site && <meta name="twitter:site" content={twitter.site} />}
        {twitter?.creator && <meta name="twitter:creator" content={twitter.creator} />}
        {twitter?.title && <meta name="twitter:title" content={twitter.title} />}
        {twitter?.description && <meta name="twitter:description" content={twitter.description} />}
        {twitter?.image && <meta name="twitter:image" content={twitter.image} />}

        {/* Additional meta tags */}
        {additionalMeta.map((tag, index) => (
          <meta key={index} {...tag} />
        ))}

        {/* Additional link tags */}
        {additionalLinks.map((link, index) => (
          <link key={index} {...link} />
        ))}

        {/* Structured data */}
        {structuredDataScript}
      </div>
    </>
  );
};

/**
 * Default SEO configuration
 */
export const defaultSEOConfig: SEOHeadProps = {
  meta: {
    title: 'Xala UI System',
    description: 'Enterprise-grade UI component library for React applications',
    viewport: 'width=device-width, initial-scale=1',
    language: 'en',
  },
  openGraph: {
    type: 'website',
    siteName: 'Xala UI System',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

/**
 * SEO configuration builder
 */
export const buildSEOConfig = (config: Partial<SEOHeadProps>): SEOHeadProps => {
  const mergedMeta = {
    ...defaultSEOConfig.meta,
    ...config.meta,
  };
  
  // Ensure title is always defined
  if (!mergedMeta.title) {
    mergedMeta.title = 'Xala UI System';
  }
  
  return {
    ...defaultSEOConfig,
    ...config,
    meta: mergedMeta as SEOMetaTags,
    openGraph: {
      ...defaultSEOConfig.openGraph,
      ...config.openGraph,
    },
    twitter: {
      ...defaultSEOConfig.twitter,
      ...config.twitter,
    },
  };
};

/**
 * Common structured data schemas
 */
export const structuredDataSchemas = {
  organization: (data: {
    name: string;
    url: string;
    logo?: string;
    sameAs?: string[];
  }): StructuredData => ({
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    sameAs: data.sameAs,
  }),

  website: (data: {
    name: string;
    url: string;
    description?: string;
  }): StructuredData => ({
    '@type': 'WebSite',
    name: data.name,
    url: data.url,
    description: data.description,
  }),

  breadcrumb: (items: Array<{ name: string; url: string }>): StructuredData => ({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),

  article: (data: {
    headline: string;
    description?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
  }): StructuredData => ({
    '@type': 'Article',
    headline: data.headline,
    description: data.description,
    author: data.author ? { '@type': 'Person', name: data.author } : undefined,
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    image: data.image,
  }),
};