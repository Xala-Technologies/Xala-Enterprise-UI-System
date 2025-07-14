/**
 * @fileoverview Semantic Spacing Tokens - Intent-based Spacing System
 * @description Semantic spacing assignments following industry standards (Airbnb, Booking.com, NSM)
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir
 */

import { globalSpacingPrimitives } from '../global-tokens';

// =============================================================================
// SEMANTIC SPACING TOKENS - Intent-based spacing assignments
// =============================================================================

/**
 * Layout spacing tokens - Page and section-level spacing
 */
export const layoutSpacingTokens = {
  // Container spacing
  container: {
    xs: globalSpacingPrimitives[4],    // 16px
    sm: globalSpacingPrimitives[6],    // 24px
    md: globalSpacingPrimitives[8],    // 32px
    lg: globalSpacingPrimitives[12],   // 48px
    xl: globalSpacingPrimitives[16],   // 64px
    '2xl': globalSpacingPrimitives[20], // 80px
  },

  // Section spacing
  section: {
    xs: globalSpacingPrimitives[6],    // 24px
    sm: globalSpacingPrimitives[8],    // 32px
    md: globalSpacingPrimitives[12],   // 48px
    lg: globalSpacingPrimitives[16],   // 64px
    xl: globalSpacingPrimitives[20],   // 80px
    '2xl': globalSpacingPrimitives[24], // 96px
  },

  // Grid spacing
  grid: {
    xs: globalSpacingPrimitives[2],    // 8px
    sm: globalSpacingPrimitives[3],    // 12px
    md: globalSpacingPrimitives[4],    // 16px
    lg: globalSpacingPrimitives[6],    // 24px
    xl: globalSpacingPrimitives[8],    // 32px
  },

  // Stack spacing
  stack: {
    xs: globalSpacingPrimitives[1],    // 4px
    sm: globalSpacingPrimitives[2],    // 8px
    md: globalSpacingPrimitives[4],    // 16px
    lg: globalSpacingPrimitives[6],    // 24px
    xl: globalSpacingPrimitives[8],    // 32px
  },
} as const;

/**
 * Component spacing tokens - Component-level spacing
 */
export const componentSpacingTokens = {
  // Padding tokens
  padding: {
    xs: globalSpacingPrimitives[1],    // 4px
    sm: globalSpacingPrimitives[2],    // 8px
    md: globalSpacingPrimitives[3],    // 12px
    lg: globalSpacingPrimitives[4],    // 16px
    xl: globalSpacingPrimitives[6],    // 24px
    '2xl': globalSpacingPrimitives[8], // 32px
  },

  // Margin tokens
  margin: {
    xs: globalSpacingPrimitives[1],    // 4px
    sm: globalSpacingPrimitives[2],    // 8px
    md: globalSpacingPrimitives[4],    // 16px
    lg: globalSpacingPrimitives[6],    // 24px
    xl: globalSpacingPrimitives[8],    // 32px
    '2xl': globalSpacingPrimitives[12], // 48px
  },

  // Gap tokens
  gap: {
    xs: globalSpacingPrimitives[1],    // 4px
    sm: globalSpacingPrimitives[2],    // 8px
    md: globalSpacingPrimitives[3],    // 12px
    lg: globalSpacingPrimitives[4],    // 16px
    xl: globalSpacingPrimitives[6],    // 24px
  },

  // Inset tokens
  inset: {
    xs: globalSpacingPrimitives[1],    // 4px
    sm: globalSpacingPrimitives[2],    // 8px
    md: globalSpacingPrimitives[3],    // 12px
    lg: globalSpacingPrimitives[4],    // 16px
    xl: globalSpacingPrimitives[6],    // 24px
  },
} as const;

/**
 * Interactive spacing tokens - Button, input, and interactive element spacing
 */
export const interactiveSpacingTokens = {
  // Button spacing
  button: {
    xs: `${globalSpacingPrimitives[2]} ${globalSpacingPrimitives[3]}`,    // 8px 12px
    sm: `${globalSpacingPrimitives[2]} ${globalSpacingPrimitives[4]}`,    // 8px 16px
    md: `${globalSpacingPrimitives[3]} ${globalSpacingPrimitives[6]}`,    // 12px 24px
    lg: `${globalSpacingPrimitives[4]} ${globalSpacingPrimitives[8]}`,    // 16px 32px
    xl: `${globalSpacingPrimitives[5]} ${globalSpacingPrimitives[10]}`,   // 20px 40px
  },

  // Input spacing
  input: {
    xs: `${globalSpacingPrimitives[1]} ${globalSpacingPrimitives[2]}`,    // 4px 8px
    sm: `${globalSpacingPrimitives[2]} ${globalSpacingPrimitives[3]}`,    // 8px 12px
    md: `${globalSpacingPrimitives[3]} ${globalSpacingPrimitives[4]}`,    // 12px 16px
    lg: `${globalSpacingPrimitives[4]} ${globalSpacingPrimitives[6]}`,    // 16px 24px
    xl: `${globalSpacingPrimitives[5]} ${globalSpacingPrimitives[8]}`,    // 20px 32px
  },

  // Touch target spacing (44px minimum for accessibility)
  touch: {
    minimum: globalSpacingPrimitives[11],  // 44px
    comfortable: globalSpacingPrimitives[12], // 48px
    spacious: globalSpacingPrimitives[14], // 56px
  },
} as const;

/**
 * Content spacing tokens - Text and content element spacing
 */
export const contentSpacingTokens = {
  // Text spacing
  text: {
    'letter-tight': '-0.025em',
    'letter-normal': '0em',
    'letter-wide': '0.025em',
    'letter-wider': '0.05em',
    'letter-widest': '0.1em',
  },

  // Line spacing
  line: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Paragraph spacing
  paragraph: {
    xs: globalSpacingPrimitives[2],    // 8px
    sm: globalSpacingPrimitives[3],    // 12px
    md: globalSpacingPrimitives[4],    // 16px
    lg: globalSpacingPrimitives[6],    // 24px
    xl: globalSpacingPrimitives[8],    // 32px
  },

  // List spacing
  list: {
    xs: globalSpacingPrimitives[1],    // 4px
    sm: globalSpacingPrimitives[2],    // 8px
    md: globalSpacingPrimitives[3],    // 12px
    lg: globalSpacingPrimitives[4],    // 16px
    xl: globalSpacingPrimitives[6],    // 24px
  },
} as const;

/**
 * Platform-specific spacing tokens - Mobile, tablet, desktop optimizations
 */
export const platformSpacingTokens = {
  // Mobile spacing
  mobile: {
    container: globalSpacingPrimitives[4],  // 16px
    section: globalSpacingPrimitives[6],    // 24px
    component: globalSpacingPrimitives[3],  // 12px
    touch: globalSpacingPrimitives[11],     // 44px
  },

  // Tablet spacing
  tablet: {
    container: globalSpacingPrimitives[6],  // 24px
    section: globalSpacingPrimitives[8],    // 32px
    component: globalSpacingPrimitives[4],  // 16px
    touch: globalSpacingPrimitives[11],     // 44px
  },

  // Desktop spacing
  desktop: {
    container: globalSpacingPrimitives[8],  // 32px
    section: globalSpacingPrimitives[12],   // 48px
    component: globalSpacingPrimitives[6],  // 24px
    touch: globalSpacingPrimitives[10],     // 40px
  },
} as const;

/**
 * Norwegian compliance spacing tokens
 * Based on DigDir and universal design principles
 */
export const norwegianSpacingTokens = {
  // Universal design spacing (generous spacing for accessibility)
  universal: {
    minimum: globalSpacingPrimitives[11],   // 44px - Minimum touch target
    comfortable: globalSpacingPrimitives[12], // 48px - Comfortable touch target
    generous: globalSpacingPrimitives[16],  // 64px - Generous spacing
  },

  // WCAG compliance spacing
  wcag: {
    'focus-outline': '2px', // 2px - Focus outline
    'focus-offset': '2px',  // 2px - Focus offset
    'target-size': globalSpacingPrimitives[11],    // 44px - Minimum target size
  },

  // Norwegian government spacing standards
  digdir: {
    'form-spacing': globalSpacingPrimitives[6],    // 24px - Form element spacing
    'content-spacing': globalSpacingPrimitives[8], // 32px - Content spacing
    'section-spacing': globalSpacingPrimitives[12], // 48px - Section spacing
  },
} as const;

// =============================================================================
// CONSOLIDATED SEMANTIC SPACING TOKENS
// =============================================================================

/**
 * All semantic spacing tokens consolidated
 */
export const semanticSpacingTokens = {
  layout: layoutSpacingTokens,
  component: componentSpacingTokens,
  interactive: interactiveSpacingTokens,
  content: contentSpacingTokens,
  platform: platformSpacingTokens,
  norwegian: norwegianSpacingTokens,
} as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type LayoutSpacingTokens = typeof layoutSpacingTokens;
export type ComponentSpacingTokens = typeof componentSpacingTokens;
export type InteractiveSpacingTokens = typeof interactiveSpacingTokens;
export type ContentSpacingTokens = typeof contentSpacingTokens;
export type PlatformSpacingTokens = typeof platformSpacingTokens;
export type NorwegianSpacingTokens = typeof norwegianSpacingTokens;
export type SemanticSpacingTokens = typeof semanticSpacingTokens; 