/**
 * @fileoverview Semantic Typography Tokens - Intent-based Typography System
 * @description Semantic typography assignments following industry standards (Airbnb, Booking.com, NSM)
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir
 */

import {
    globalFontFamilies,
    globalFontSizes,
    globalFontWeights,
    globalLetterSpacing,
    globalLineHeights,
} from '../global-tokens';

// =============================================================================
// SEMANTIC TYPOGRAPHY TOKENS - Intent-based typography assignments
// =============================================================================

/**
 * Heading typography tokens - Semantic heading scales
 */
export const headingTypographyTokens = {
  // Display headings (large, prominent)
  display: {
    large: {
      fontSize: globalFontSizes['6xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.tight,
      fontFamily: globalFontFamilies.sans,
    },
    medium: {
      fontSize: globalFontSizes['5xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.tight,
      fontFamily: globalFontFamilies.sans,
    },
    small: {
      fontSize: globalFontSizes['4xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
  },

  // Standard headings (h1-h6)
  heading: {
    h1: {
      fontSize: globalFontSizes['3xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    h2: {
      fontSize: globalFontSizes['2xl'],
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    h3: {
      fontSize: globalFontSizes.xl,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.snug,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    h4: {
      fontSize: globalFontSizes.lg,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.snug,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    h5: {
      fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    h6: {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.wide,
      fontFamily: globalFontFamilies.sans,
    },
  },
} as const;

/**
 * Body typography tokens - Content text styles
 */
export const bodyTypographyTokens = {
  // Body text variants
  body: {
    large: {
      fontSize: globalFontSizes.lg,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.relaxed,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    medium: {
      fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.relaxed,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    small: {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
  },

  // Lead text (introductory paragraphs)
  lead: {
    fontSize: globalFontSizes.xl,
    fontWeight: globalFontWeights.normal,
    lineHeight: globalLineHeights.relaxed,
    letterSpacing: globalLetterSpacing.normal,
    fontFamily: globalFontFamilies.sans,
  },

  // Caption text
  caption: {
    fontSize: globalFontSizes.xs,
    fontWeight: globalFontWeights.normal,
    lineHeight: globalLineHeights.normal,
    letterSpacing: globalLetterSpacing.normal,
    fontFamily: globalFontFamilies.sans,
  },
} as const;

/**
 * Label typography tokens - Form labels and UI labels
 */
export const labelTypographyTokens = {
  // Form labels
  form: {
    large: {
      fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    medium: {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    small: {
      fontSize: globalFontSizes.xs,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.wide,
      fontFamily: globalFontFamilies.sans,
    },
  },

  // UI labels
  ui: {
    large: {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.wide,
      fontFamily: globalFontFamilies.sans,
    },
    medium: {
      fontSize: globalFontSizes.xs,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.wide,
      fontFamily: globalFontFamilies.sans,
    },
    small: {
      fontSize: globalFontSizes.xs,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.wider,
      fontFamily: globalFontFamilies.sans,
    },
  },
} as const;

/**
 * Interactive typography tokens - Buttons, links, and interactive elements
 */
export const interactiveTypographyTokens = {
  // Button text
  button: {
    large: {
      fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.none,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    medium: {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.none,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    small: {
      fontSize: globalFontSizes.xs,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.none,
      letterSpacing: globalLetterSpacing.wide,
      fontFamily: globalFontFamilies.sans,
    },
  },

  // Link text
  link: {
    large: {
      fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.relaxed,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    medium: {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    small: {
      fontSize: globalFontSizes.xs,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
  },
} as const;

/**
 * Code typography tokens - Code and monospace text
 */
export const codeTypographyTokens = {
  // Inline code
  inline: {
    fontSize: globalFontSizes.sm,
    fontWeight: globalFontWeights.normal,
    lineHeight: globalLineHeights.normal,
    letterSpacing: globalLetterSpacing.normal,
    fontFamily: globalFontFamilies.mono,
  },

  // Code blocks
  block: {
    fontSize: globalFontSizes.sm,
    fontWeight: globalFontWeights.normal,
    lineHeight: globalLineHeights.relaxed,
    letterSpacing: globalLetterSpacing.normal,
    fontFamily: globalFontFamilies.mono,
  },
} as const;

/**
 * Norwegian compliance typography tokens
 * Based on DigDir and universal design principles
 */
export const norwegianTypographyTokens = {
  // Universal design typography (enhanced readability)
  universal: {
    // Generous line heights for better readability
    'line-height-generous': globalLineHeights.loose,
    'line-height-comfortable': globalLineHeights.relaxed,
    
    // Minimum font sizes for accessibility
    'font-size-minimum': globalFontSizes.sm,
    'font-size-comfortable': globalFontSizes.base,
    'font-size-large': globalFontSizes.lg,
  },

  // WCAG compliance typography
  wcag: {
    // Minimum contrast ratios are handled by color tokens
    'body-minimum': {
      fontSize: globalFontSizes.base,
      lineHeight: globalLineHeights.relaxed,
      fontWeight: globalFontWeights.normal,
    },
    'heading-minimum': {
      fontSize: globalFontSizes.lg,
      lineHeight: globalLineHeights.snug,
      fontWeight: globalFontWeights.semibold,
    },
  },

  // Norwegian government typography standards
  digdir: {
    // Standard government text styles
    'official-heading': {
      fontSize: globalFontSizes['2xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    'official-body': {
      fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.relaxed,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
    'official-caption': {
      fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.sans,
    },
  },
} as const;

// =============================================================================
// CONSOLIDATED SEMANTIC TYPOGRAPHY TOKENS
// =============================================================================

/**
 * All semantic typography tokens consolidated
 */
export const semanticTypographyTokens = {
  heading: headingTypographyTokens,
  body: bodyTypographyTokens,
  label: labelTypographyTokens,
  interactive: interactiveTypographyTokens,
  code: codeTypographyTokens,
  norwegian: norwegianTypographyTokens,
} as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type HeadingTypographyTokens = typeof headingTypographyTokens;
export type BodyTypographyTokens = typeof bodyTypographyTokens;
export type LabelTypographyTokens = typeof labelTypographyTokens;
export type InteractiveTypographyTokens = typeof interactiveTypographyTokens;
export type CodeTypographyTokens = typeof codeTypographyTokens;
export type NorwegianTypographyTokens = typeof norwegianTypographyTokens;
export type SemanticTypographyTokens = typeof semanticTypographyTokens; 