// Design tokens for @xala-mock/ui-system
// Norwegian-compliant design system with WCAG 2.2 AA colors

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './border-radius';
export * from './shadows';
export * from './validation';

// Core design token system
export interface DesignTokenSystem {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

// Norwegian municipality themes
export const municipalityThemes = {
  drammen: 'drammen',
  oslo: 'oslo',
  bergen: 'bergen',
  trondheim: 'trondheim',
  stavanger: 'stavanger',
} as const;

export type MunicipalityTheme = (typeof municipalityThemes)[keyof typeof municipalityThemes];

// Complete CSS custom properties collection
export const designTokens = {
  // Import all token collections
  colors: async () => import('./colors').then(m => m.colorTokens),
  spacing: async () => import('./spacing').then(m => m.spacingTokens),
  typography: async () => import('./typography').then(m => m.typographyTokens),
  borderRadius: async () => import('./border-radius').then(m => m.borderRadiusTokens),
  shadows: async () => import('./shadows').then(m => m.shadowTokens),
};

// Theme configuration for Norwegian municipalities
export interface NorwegianThemeConfig {
  municipality: MunicipalityTheme;
  mode: 'light' | 'dark';
  accessibility: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
  language: 'nb' | 'nn' | 'en';
}

// Generate complete CSS custom properties for a theme
export const generateThemeTokens = async (config: NorwegianThemeConfig) => {
  const [colors, spacing, typography, borderRadius, shadows] = await Promise.all([
    designTokens.colors(),
    designTokens.spacing(),
    designTokens.typography(),
    designTokens.borderRadius(),
    designTokens.shadows(),
  ]);

  return {
    ...colors,
    ...spacing,
    ...typography,
    ...borderRadius,
    ...shadows,
    // Theme-specific overrides can be added here
    '--theme-municipality': config.municipality,
    '--theme-mode': config.mode,
    '--theme-accessibility': config.accessibility,
    '--theme-language': config.language,
  };
};
