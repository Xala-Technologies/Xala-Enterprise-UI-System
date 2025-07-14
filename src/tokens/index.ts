/**
 * @fileoverview Design Tokens Index
 * @description Export consolidated design token system and maintain backward compatibility
 * @version 2.0.0
 */

// =============================================================================
// PRIMARY EXPORT - NEW CONSOLIDATED DESIGN TOKEN SYSTEM
// =============================================================================

// Export the new consolidated design token system
export * from './design-tokens';
export {
    componentTokens, designTokens,
    getToken, norwegianCompliance, platformTokens, semanticColors,
    semanticSpacing,
    semanticTypography
} from './design-tokens';

// Export token helpers and utilities
export * from './token-helpers';
export {
    createButtonStyles, createCardStyles, createInputStyles, generateCSSString, generateCSSVariables, getComponentToken, getDebugTokens, getPlatformToken, getResponsiveToken, getSemanticColor,
    getSemanticSpacing, tokensToCSSObject, validateToken
} from './token-helpers';

// =============================================================================
// BACKWARD COMPATIBILITY - LEGACY EXPORTS
// =============================================================================

// Keep legacy exports for backward compatibility
export * from './border-radius';
export * from './colors';
export * from './shadows';
export * from './spacing';
export * from './typography';
export * from './validation';

// Legacy CSS variables - will be deprecated
export * from './css-variables';

// =============================================================================
// MIGRATION GUIDE
// =============================================================================

/**
 * MIGRATION GUIDE - Moving from old to new token system
 * 
 * OLD WAY (deprecated):
 * import { baseColors } from '@/tokens';
 * color: baseColors.primary[500];
 * 
 * NEW WAY (recommended):
 * import { semanticColors } from '@/tokens';
 * color: semanticColors.primary[500];
 * 
 * EVEN BETTER (semantic):
 * import { semanticColors } from '@/tokens';
 * color: semanticColors.interactive.primary;
 * 
 * BEST PRACTICE (using helpers):
 * import { getSemanticColor } from '@/tokens';
 * color: getSemanticColor('interactive.primary');
 * 
 * COMPONENT STYLES:
 * import { createButtonStyles } from '@/tokens';
 * const buttonStyles = createButtonStyles('primary', 'md');
 */

// =============================================================================
// LEGACY COMPATIBILITY LAYER
// =============================================================================

// Re-export legacy token systems for backward compatibility
export interface DesignTokenSystem {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

// Norwegian municipality themes (legacy)
export const municipalityThemes = {
  drammen: 'drammen',
  oslo: 'oslo',
  bergen: 'bergen',
  trondheim: 'trondheim',
  stavanger: 'stavanger',
} as const;

export type MunicipalityTheme = (typeof municipalityThemes)[keyof typeof municipalityThemes];

// Legacy theme configuration
export interface NorwegianThemeConfig {
  municipality: MunicipalityTheme;
  mode: 'light' | 'dark';
  accessibility: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
  language: 'nb' | 'nn' | 'en';
}

// Legacy async token loading (deprecated)
export const designTokensLegacy = {
  colors: async (): Promise<Record<string, any>> => import('./colors').then(m => m.colorTokens),
  spacing: async (): Promise<Record<string, any>> => import('./spacing').then(m => m.spacingTokens),
  typography: async (): Promise<Record<string, any>> => import('./typography').then(m => m.typographyTokens),
  borderRadius: async (): Promise<Record<string, any>> => import('./border-radius').then(m => m.borderRadiusTokens),
  shadows: async (): Promise<Record<string, any>> => import('./shadows').then(m => m.shadowTokens),
};

// Legacy theme generation (deprecated)
export const generateThemeTokens = async (config: NorwegianThemeConfig): Promise<Record<string, any>> => {
  const [colors, spacing, typography, borderRadius, shadows] = await Promise.all([
    designTokensLegacy.colors(),
    designTokensLegacy.spacing(),
    designTokensLegacy.typography(),
    designTokensLegacy.borderRadius(),
    designTokensLegacy.shadows(),
  ]);

  return {
    ...colors,
    ...spacing,
    ...typography,
    ...borderRadius,
    ...shadows,
    '--theme-municipality': config.municipality,
    '--theme-mode': config.mode,
    '--theme-accessibility': config.accessibility,
    '--theme-language': config.language,
  };
};

// =============================================================================
// DEPRECATION WARNINGS
// =============================================================================

/**
 * @deprecated Use `designTokens` from the new consolidated system instead
 */
export const legacyDesignTokens = designTokensLegacy;

/**
 * @deprecated Use `semanticColors` from the new consolidated system instead
 */
export const themeColors = designTokensLegacy.colors;

/**
 * @deprecated CSS variables will be auto-generated from design tokens
 */
export const cssVars = null;

/**
 * @deprecated Theme manager will be replaced with new token system
 */
export const themeManager = null;

/**
 * @deprecated Themes will be generated from design tokens
 */
export const themes = null;

