/**
 * Theme Configuration
 * 
 * Theme definitions, validation schema, factory functions, and utilities
 * for the design system theme management.
 */

import type { Theme } from '../lib/theme/theme-switcher';

/**
 * Color token structure for themes
 */
export interface ColorToken {
  readonly h: number; // Hue (0-360)
  readonly s: number; // Saturation (0-100)
  readonly l: number; // Lightness (0-100)
}

/**
 * Theme color palette structure
 */
export interface ThemeColors {
  // Background colors
  readonly background: ColorToken;
  readonly foreground: ColorToken;
  readonly card: ColorToken;
  readonly cardForeground: ColorToken;
  readonly popover: ColorToken;
  readonly popoverForeground: ColorToken;

  // Primary colors
  readonly primary: ColorToken;
  readonly primaryForeground: ColorToken;
  readonly primaryHover: ColorToken;
  readonly primaryActive: ColorToken;

  // Secondary colors
  readonly secondary: ColorToken;
  readonly secondaryForeground: ColorToken;
  readonly secondaryHover: ColorToken;
  readonly secondaryActive: ColorToken;

  // Muted colors
  readonly muted: ColorToken;
  readonly mutedForeground: ColorToken;
  readonly mutedHover: ColorToken;

  // Accent colors
  readonly accent: ColorToken;
  readonly accentForeground: ColorToken;
  readonly accentHover: ColorToken;

  // Destructive colors
  readonly destructive: ColorToken;
  readonly destructiveForeground: ColorToken;
  readonly destructiveHover: ColorToken;
  readonly destructiveActive: ColorToken;

  // Status colors
  readonly success: ColorToken;
  readonly successForeground: ColorToken;
  readonly successHover: ColorToken;
  readonly successMuted: ColorToken;

  readonly warning: ColorToken;
  readonly warningForeground: ColorToken;
  readonly warningHover: ColorToken;
  readonly warningMuted: ColorToken;

  readonly info: ColorToken;
  readonly infoForeground: ColorToken;
  readonly infoHover: ColorToken;
  readonly infoMuted: ColorToken;

  readonly error: ColorToken;
  readonly errorForeground: ColorToken;
  readonly errorHover: ColorToken;
  readonly errorMuted: ColorToken;

  // Border and input colors
  readonly border: ColorToken;
  readonly borderMuted: ColorToken;
  readonly input: ColorToken;
  readonly inputBorder: ColorToken;
  readonly ring: ColorToken;

  // Text colors
  readonly textPrimary: ColorToken;
  readonly textSecondary: ColorToken;
  readonly textMuted: ColorToken;
  readonly textDisabled: ColorToken;

  // Component-specific colors
  readonly sidebar: ColorToken;
  readonly sidebarForeground: ColorToken;
  readonly header: ColorToken;
  readonly headerForeground: ColorToken;
  readonly footer: ColorToken;
  readonly footerForeground: ColorToken;

  // Focus states
  readonly focusRing: ColorToken;
  readonly focusRingOffset: ColorToken;

  // Norwegian compliance colors
  readonly nsmOpen: ColorToken;
  readonly nsmRestricted: ColorToken;
  readonly nsmConfidential: ColorToken;
  readonly nsmSecret: ColorToken;
}

/**
 * Complete theme definition
 */
export interface ThemeDefinition {
  readonly name: string;
  readonly displayName: string;
  readonly type: 'light' | 'dark' | 'high-contrast';
  readonly colors: ThemeColors;
  readonly metadata?: {
    readonly description?: string;
    readonly author?: string;
    readonly version?: string;
    readonly accessibility?: {
      readonly contrastRatio?: 'AA' | 'AAA';
      readonly reducedMotion?: boolean;
    };
    readonly compliance?: {
      readonly norwegian?: boolean;
      readonly gdpr?: boolean;
      readonly wcag?: 'A' | 'AA' | 'AAA';
    };
  };
}

/**
 * Theme registry interface
 */
export interface ThemeRegistry {
  readonly [key: string]: ThemeDefinition;
}

/**
 * Predefined theme definitions
 */
export const THEME_DEFINITIONS: ThemeRegistry = {
  light: {
    name: 'light',
    displayName: 'Light',
    type: 'light',
    colors: {
      // Background colors
      background: { h: 0, s: 0, l: 100 },
      foreground: { h: 224, s: 71, l: 4 },
      card: { h: 0, s: 0, l: 100 },
      cardForeground: { h: 224, s: 71, l: 4 },
      popover: { h: 0, s: 0, l: 100 },
      popoverForeground: { h: 224, s: 71, l: 4 },

      // Primary colors
      primary: { h: 217, s: 91, l: 60 },
      primaryForeground: { h: 0, s: 0, l: 100 },
      primaryHover: { h: 221, s: 83, l: 53 },
      primaryActive: { h: 224, s: 76, l: 48 },

      // Secondary colors
      secondary: { h: 220, s: 14, l: 96 },
      secondaryForeground: { h: 215, s: 25, l: 27 },
      secondaryHover: { h: 220, s: 13, l: 91 },
      secondaryActive: { h: 216, s: 12, l: 84 },

      // Muted colors
      muted: { h: 220, s: 14, l: 96 },
      mutedForeground: { h: 220, s: 9, l: 46 },
      mutedHover: { h: 220, s: 13, l: 91 },

      // Accent colors
      accent: { h: 220, s: 14, l: 96 },
      accentForeground: { h: 215, s: 25, l: 27 },
      accentHover: { h: 220, s: 13, l: 91 },

      // Destructive colors
      destructive: { h: 0, s: 84, l: 60 },
      destructiveForeground: { h: 0, s: 0, l: 100 },
      destructiveHover: { h: 0, s: 72, l: 51 },
      destructiveActive: { h: 0, s: 74, l: 42 },

      // Status colors
      success: { h: 142, s: 71, l: 45 },
      successForeground: { h: 0, s: 0, l: 100 },
      successHover: { h: 142, s: 76, l: 36 },
      successMuted: { h: 141, s: 84, l: 93 },

      warning: { h: 45, s: 93, l: 47 },
      warningForeground: { h: 0, s: 0, l: 100 },
      warningHover: { h: 41, s: 96, l: 40 },
      warningMuted: { h: 55, s: 97, l: 88 },

      info: { h: 217, s: 91, l: 60 },
      infoForeground: { h: 0, s: 0, l: 100 },
      infoHover: { h: 221, s: 83, l: 53 },
      infoMuted: { h: 214, s: 95, l: 93 },

      error: { h: 0, s: 84, l: 60 },
      errorForeground: { h: 0, s: 0, l: 100 },
      errorHover: { h: 0, s: 72, l: 51 },
      errorMuted: { h: 0, s: 93, l: 94 },

      // Border and input colors
      border: { h: 220, s: 13, l: 91 },
      borderMuted: { h: 220, s: 14, l: 96 },
      input: { h: 0, s: 0, l: 100 },
      inputBorder: { h: 220, s: 13, l: 91 },
      ring: { h: 217, s: 91, l: 60 },

      // Text colors
      textPrimary: { h: 224, s: 71, l: 4 },
      textSecondary: { h: 215, s: 25, l: 27 },
      textMuted: { h: 220, s: 9, l: 46 },
      textDisabled: { h: 218, s: 11, l: 65 },

      // Component-specific colors
      sidebar: { h: 0, s: 0, l: 100 },
      sidebarForeground: { h: 224, s: 71, l: 4 },
      header: { h: 0, s: 0, l: 100 },
      headerForeground: { h: 224, s: 71, l: 4 },
      footer: { h: 220, s: 14, l: 96 },
      footerForeground: { h: 215, s: 25, l: 27 },

      // Focus states
      focusRing: { h: 217, s: 91, l: 60 },
      focusRingOffset: { h: 0, s: 0, l: 100 },

      // Norwegian compliance colors
      nsmOpen: { h: 142, s: 71, l: 45 },
      nsmRestricted: { h: 45, s: 93, l: 47 },
      nsmConfidential: { h: 21, s: 90, l: 48 },
      nsmSecret: { h: 0, s: 84, l: 60 },
    },
    metadata: {
      description: 'Default light theme with high contrast and accessibility',
      accessibility: {
        contrastRatio: 'AAA',
        reducedMotion: false,
      },
      compliance: {
        norwegian: true,
        gdpr: true,
        wcag: 'AAA',
      },
    },
  },

  dark: {
    name: 'dark',
    displayName: 'Dark',
    type: 'dark',
    colors: {
      // Background colors
      background: { h: 224, s: 71, l: 4 },
      foreground: { h: 210, s: 20, l: 98 },
      card: { h: 215, s: 28, l: 17 },
      cardForeground: { h: 210, s: 20, l: 98 },
      popover: { h: 215, s: 28, l: 17 },
      popoverForeground: { h: 210, s: 20, l: 98 },

      // Primary colors
      primary: { h: 213, s: 94, l: 68 },
      primaryForeground: { h: 224, s: 64, l: 33 },
      primaryHover: { h: 212, s: 96, l: 78 },
      primaryActive: { h: 214, s: 95, l: 93 },

      // Secondary colors
      secondary: { h: 215, s: 28, l: 17 },
      secondaryForeground: { h: 210, s: 20, l: 98 },
      secondaryHover: { h: 217, s: 19, l: 27 },
      secondaryActive: { h: 215, s: 14, l: 34 },

      // Muted colors
      muted: { h: 215, s: 28, l: 17 },
      mutedForeground: { h: 217, s: 10, l: 65 },
      mutedHover: { h: 217, s: 19, l: 27 },

      // Accent colors
      accent: { h: 215, s: 28, l: 17 },
      accentForeground: { h: 210, s: 20, l: 98 },
      accentHover: { h: 217, s: 19, l: 27 },

      // Destructive colors
      destructive: { h: 0, s: 91, l: 71 },
      destructiveForeground: { h: 0, s: 63, l: 31 },
      destructiveHover: { h: 0, s: 94, l: 82 },
      destructiveActive: { h: 0, s: 96, l: 89 },

      // Status colors
      success: { h: 142, s: 69, l: 58 },
      successForeground: { h: 144, s: 61, l: 20 },
      successHover: { h: 142, s: 77, l: 73 },
      successMuted: { h: 144, s: 61, l: 20 },

      warning: { h: 48, s: 96, l: 53 },
      warningForeground: { h: 28, s: 73, l: 26 },
      warningHover: { h: 50, s: 98, l: 64 },
      warningMuted: { h: 28, s: 73, l: 26 },

      info: { h: 213, s: 94, l: 68 },
      infoForeground: { h: 224, s: 64, l: 33 },
      infoHover: { h: 212, s: 96, l: 78 },
      infoMuted: { h: 224, s: 64, l: 33 },

      error: { h: 0, s: 91, l: 71 },
      errorForeground: { h: 0, s: 63, l: 31 },
      errorHover: { h: 0, s: 94, l: 82 },
      errorMuted: { h: 0, s: 63, l: 31 },

      // Border and input colors
      border: { h: 215, s: 28, l: 17 },
      borderMuted: { h: 217, s: 19, l: 27 },
      input: { h: 215, s: 28, l: 17 },
      inputBorder: { h: 217, s: 19, l: 27 },
      ring: { h: 213, s: 94, l: 68 },

      // Text colors
      textPrimary: { h: 210, s: 20, l: 98 },
      textSecondary: { h: 220, s: 14, l: 96 },
      textMuted: { h: 217, s: 10, l: 65 },
      textDisabled: { h: 218, s: 11, l: 65 },

      // Component-specific colors
      sidebar: { h: 215, s: 28, l: 17 },
      sidebarForeground: { h: 210, s: 20, l: 98 },
      header: { h: 215, s: 28, l: 17 },
      headerForeground: { h: 210, s: 20, l: 98 },
      footer: { h: 224, s: 71, l: 4 },
      footerForeground: { h: 210, s: 20, l: 98 },

      // Focus states
      focusRing: { h: 213, s: 94, l: 68 },
      focusRingOffset: { h: 224, s: 71, l: 4 },

      // Norwegian compliance colors
      nsmOpen: { h: 142, s: 69, l: 58 },
      nsmRestricted: { h: 48, s: 96, l: 53 },
      nsmConfidential: { h: 25, s: 95, l: 53 },
      nsmSecret: { h: 0, s: 91, l: 71 },
    },
    metadata: {
      description: 'Dark theme optimized for low-light environments',
      accessibility: {
        contrastRatio: 'AAA',
        reducedMotion: false,
      },
      compliance: {
        norwegian: true,
        gdpr: true,
        wcag: 'AAA',
      },
    },
  },

  'high-contrast': {
    name: 'high-contrast',
    displayName: 'High Contrast',
    type: 'high-contrast',
    colors: {
      // Background colors (pure black/white for maximum contrast)
      background: { h: 0, s: 0, l: 0 },
      foreground: { h: 0, s: 0, l: 100 },
      card: { h: 0, s: 0, l: 8 },
      cardForeground: { h: 0, s: 0, l: 100 },
      popover: { h: 0, s: 0, l: 8 },
      popoverForeground: { h: 0, s: 0, l: 100 },

      // Primary colors (bright blue for high visibility)
      primary: { h: 210, s: 100, l: 70 },
      primaryForeground: { h: 0, s: 0, l: 0 },
      primaryHover: { h: 210, s: 100, l: 80 },
      primaryActive: { h: 210, s: 100, l: 60 },

      // Secondary colors
      secondary: { h: 0, s: 0, l: 15 },
      secondaryForeground: { h: 0, s: 0, l: 100 },
      secondaryHover: { h: 0, s: 0, l: 25 },
      secondaryActive: { h: 0, s: 0, l: 35 },

      // Muted colors
      muted: { h: 0, s: 0, l: 15 },
      mutedForeground: { h: 0, s: 0, l: 85 },
      mutedHover: { h: 0, s: 0, l: 25 },

      // Accent colors
      accent: { h: 0, s: 0, l: 15 },
      accentForeground: { h: 0, s: 0, l: 100 },
      accentHover: { h: 0, s: 0, l: 25 },

      // Destructive colors (bright red)
      destructive: { h: 0, s: 100, l: 70 },
      destructiveForeground: { h: 0, s: 0, l: 0 },
      destructiveHover: { h: 0, s: 100, l: 80 },
      destructiveActive: { h: 0, s: 100, l: 60 },

      // Status colors (bright, high-contrast colors)
      success: { h: 120, s: 100, l: 60 },
      successForeground: { h: 0, s: 0, l: 0 },
      successHover: { h: 120, s: 100, l: 70 },
      successMuted: { h: 120, s: 100, l: 20 },

      warning: { h: 60, s: 100, l: 60 },
      warningForeground: { h: 0, s: 0, l: 0 },
      warningHover: { h: 60, s: 100, l: 70 },
      warningMuted: { h: 60, s: 100, l: 20 },

      info: { h: 210, s: 100, l: 70 },
      infoForeground: { h: 0, s: 0, l: 0 },
      infoHover: { h: 210, s: 100, l: 80 },
      infoMuted: { h: 210, s: 100, l: 20 },

      error: { h: 0, s: 100, l: 70 },
      errorForeground: { h: 0, s: 0, l: 0 },
      errorHover: { h: 0, s: 100, l: 80 },
      errorMuted: { h: 0, s: 100, l: 20 },

      // Border and input colors
      border: { h: 0, s: 0, l: 50 },
      borderMuted: { h: 0, s: 0, l: 30 },
      input: { h: 0, s: 0, l: 8 },
      inputBorder: { h: 0, s: 0, l: 50 },
      ring: { h: 210, s: 100, l: 70 },

      // Text colors
      textPrimary: { h: 0, s: 0, l: 100 },
      textSecondary: { h: 0, s: 0, l: 90 },
      textMuted: { h: 0, s: 0, l: 70 },
      textDisabled: { h: 0, s: 0, l: 50 },

      // Component-specific colors
      sidebar: { h: 0, s: 0, l: 8 },
      sidebarForeground: { h: 0, s: 0, l: 100 },
      header: { h: 0, s: 0, l: 8 },
      headerForeground: { h: 0, s: 0, l: 100 },
      footer: { h: 0, s: 0, l: 15 },
      footerForeground: { h: 0, s: 0, l: 100 },

      // Focus states (bright yellow for visibility)
      focusRing: { h: 60, s: 100, l: 70 },
      focusRingOffset: { h: 0, s: 0, l: 0 },

      // Norwegian compliance colors (high contrast versions)
      nsmOpen: { h: 120, s: 100, l: 60 },
      nsmRestricted: { h: 60, s: 100, l: 60 },
      nsmConfidential: { h: 30, s: 100, l: 60 },
      nsmSecret: { h: 0, s: 100, l: 70 },
    },
    metadata: {
      description: 'High contrast theme for maximum accessibility',
      accessibility: {
        contrastRatio: 'AAA',
        reducedMotion: true,
      },
      compliance: {
        norwegian: true,
        gdpr: true,
        wcag: 'AAA',
      },
    },
  },
} as const;

/**
 * Theme validation schema
 */
export const validateTheme = (theme: unknown): theme is ThemeDefinition => {
  if (!theme || typeof theme !== 'object') return false;
  
  const t = theme as Record<string, unknown>;
  
  // Check required properties
  if (typeof t.name !== 'string') return false;
  if (typeof t.displayName !== 'string') return false;
  if (!['light', 'dark', 'high-contrast'].includes(t.type as string)) return false;
  if (!t.colors || typeof t.colors !== 'object') return false;
  
  // Validate color tokens
  const colors = t.colors as Record<string, unknown>;
  const requiredColors = [
    'background', 'foreground', 'primary', 'primaryForeground',
    'secondary', 'secondaryForeground', 'destructive', 'destructiveForeground'
  ];
  
  for (const colorName of requiredColors) {
    const color = colors[colorName];
    if (!color || typeof color !== 'object') return false;
    
    const c = color as Record<string, unknown>;
    if (typeof c.h !== 'number' || c.h < 0 || c.h > 360) return false;
    if (typeof c.s !== 'number' || c.s < 0 || c.s > 100) return false;
    if (typeof c.l !== 'number' || c.l < 0 || c.l > 100) return false;
  }
  
  return true;
};

/**
 * Convert color token to HSL string
 */
export const colorTokenToHSL = (token: ColorToken): string => {
  return `${token.h} ${token.s}% ${token.l}%`;
};

/**
 * Convert color token to CSS custom property value
 */
export const colorTokenToCSS = (token: ColorToken): string => {
  return colorTokenToHSL(token);
};

/**
 * Theme factory function
 */
export const createTheme = (
  name: string,
  displayName: string,
  type: 'light' | 'dark' | 'high-contrast',
  colors: Partial<ThemeColors>,
  metadata?: ThemeDefinition['metadata']
): ThemeDefinition => {
  // Get base theme for fallbacks
  const baseTheme = type === 'dark' ? THEME_DEFINITIONS.dark : 
                   type === 'high-contrast' ? THEME_DEFINITIONS['high-contrast'] :
                   THEME_DEFINITIONS.light;
  
  return {
    name,
    displayName,
    type,
    colors: { ...baseTheme.colors, ...colors },
    metadata,
  };
};

/**
 * Merge themes (useful for custom themes)
 */
export const mergeThemes = (
  baseTheme: ThemeDefinition, 
  overrides: Partial<ThemeDefinition>
): ThemeDefinition => {
  return {
    ...baseTheme,
    ...overrides,
    colors: {
      ...baseTheme.colors,
      ...(overrides.colors || {}),
    },
    metadata: {
      ...baseTheme.metadata,
      ...(overrides.metadata || {}),
    },
  };
};

/**
 * Get theme by name
 */
export const getTheme = (themeName: string): ThemeDefinition | null => {
  return THEME_DEFINITIONS[themeName] || null;
};

/**
 * Get available theme names
 */
export const getAvailableThemes = (): readonly string[] => {
  return Object.keys(THEME_DEFINITIONS);
};

/**
 * Convert theme to CSS custom properties
 */
export const themeToCSS = (theme: ThemeDefinition): string => {
  const cssVars: string[] = [];
  
  Object.entries(theme.colors).forEach(([key, value]) => {
    // Convert camelCase to kebab-case
    const cssKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    cssVars.push(`  --color-${cssKey}: ${colorTokenToCSS(value)};`);
  });
  
  return `[data-theme="${theme.name}"] {\n${cssVars.join('\n')}\n}`;
};

/**
 * Generate CSS for all themes
 */
export const generateAllThemeCSS = (): string => {
  return Object.values(THEME_DEFINITIONS)
    .map(theme => themeToCSS(theme))
    .join('\n\n');
};

/**
 * Theme utilities
 */
export const themeUtils = {
  validate: validateTheme,
  create: createTheme,
  merge: mergeThemes,
  get: getTheme,
  getAvailable: getAvailableThemes,
  toCSS: themeToCSS,
  generateCSS: generateAllThemeCSS,
  colorToHSL: colorTokenToHSL,
  colorToCSS: colorTokenToCSS,
} as const;