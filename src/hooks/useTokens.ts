/**
 * @fileoverview useTokens Hook - SSR-Safe Design Token Access
 * @description Provides direct access to design tokens from current theme with type safety and SSR compatibility
 * @version 4.6.3
 * @compliance Enterprise Standards, Type-safe, Framework-agnostic, SSR-Safe
 */

import { useMemo } from 'react';
import { Logger } from '../lib/utils/multiplatform-logger';
import { useDesignSystem } from '../providers/DesignSystemProvider';
import type { ThemeTemplate } from '../tokens/themes/template-loader';

// Import base templates for fallback values
import baseDarkTemplate from '../tokens/themes/definitions/base-dark.json' with { type: 'json' };
import baseLightTemplate from '../tokens/themes/definitions/base-light.json' with { type: 'json' };

const logger = Logger.create({
  serviceName: 'ui-system-use-tokens',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// TOKEN INTERFACES (Type-safe access to theme structure)
// =============================================================================

export interface ColorTokens {
  primary?: Record<string, string>;
  secondary?: Record<string, string>;
  neutral?: Record<string, string>;
  success?: Record<string, string>;
  warning?: Record<string, string>;
  danger?: Record<string, string>;
  info?: Record<string, string>;
  accent?: Record<string, string>;
  background?: {
    default: string;
    paper: string;
    elevated: string;
    subtle?: string;
  };
  text?: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border?: {
    default: string;
    muted: string;
  };
  status?: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  // Industry-specific colors (conditional)
  commerce?: {
    sale: string;
    discount: string;
    featured: string;
    cart: string;
  };
  medical?: {
    critical: string;
    urgent: string;
    moderate: string;
    stable: string;
  };
  financial?: {
    profit: string;
    loss: string;
    neutral: string;
    premium: string;
  };
  academic?: {
    grade_a: string;
    grade_b: string;
    grade_c: string;
    grade_f: string;
  };
  productivity?: {
    focus: string;
    urgent: string;
    completed: string;
    pending: string;
  };
}

export interface TypographyTokens {
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: Record<string, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
  letterSpacing?: Record<string, string>;
}

export interface SpacingTokens extends Record<string, string> {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  6: string;
  8: string;
  12: string;
  16: string;
  24: string;
}

export interface BrandingTokens {
  logo: {
    primary: string;
    secondary: string;
  };
  // Dynamic branding based on theme category
  [key: string]: unknown;
}

export interface AccessibilityTokens {
  level: string;
  highContrast: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  colorBlindFriendly: boolean;
  screenReaderOptimized: boolean;
}

export interface ResponsiveTokens {
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
}

// =============================================================================
// DESIGN TOKENS INTERFACE
// =============================================================================

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  branding: BrandingTokens;
  accessibility: AccessibilityTokens;
  responsive: ResponsiveTokens;
  
  // Theme metadata
  theme: {
    id: string;
    name: string;
    category: string;
    mode: 'LIGHT' | 'DARK';
    version: string;
  };
}

// =============================================================================
// TOKEN UTILITIES
// =============================================================================

/**
 * Extract and normalize tokens from theme template
 */
function extractTokensFromTheme(theme: ThemeTemplate): DesignTokens {
  try {
    // Cast theme data to expected structure (since it comes from JSON)
    const themeData = theme as Record<string, unknown>;
    
    return {
      colors: normalizeColorTokens(themeData.colors as Record<string, unknown>),
      typography: normalizeTypographyTokens(themeData.typography as Record<string, unknown>),
      spacing: normalizeSpacingTokens(themeData.spacing as Record<string, unknown>),
      branding: normalizeBrandingTokens(themeData.branding as Record<string, unknown>),
      accessibility: normalizeAccessibilityTokens(themeData.accessibility as Record<string, unknown>),
      responsive: normalizeResponsiveTokens(themeData.responsive as Record<string, unknown>),
      theme: {
        id: theme.id,
        name: theme.name,
        category: theme.category,
        mode: theme.mode,
        version: theme.version,
      },
    };
  } catch (error) {
    logger.error('Failed to extract tokens from theme', { themeId: theme.id, error });
    throw new Error(`Token extraction failed for theme ${theme.id}`);
  }
}

/**
 * Get base template based on dark mode preference (SSR-safe)
 */
function getBaseTemplate(isDarkMode: boolean = false): ThemeTemplate {
  return isDarkMode ? (baseDarkTemplate as ThemeTemplate) : (baseLightTemplate as ThemeTemplate);
}

/**
 * SSR-safe media query check for dark mode
 */
function getSSRSafeDarkMode(): boolean {
  if (typeof window === 'undefined') {
    return false; // Default to light mode during SSR
  }
  
  return window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches || false;
}

/**
 * Normalize color tokens with type safety using base template fallbacks
 */
function normalizeColorTokens(colors: Record<string, unknown>): ColorTokens {
  const isDarkMode = getSSRSafeDarkMode();
  const baseTemplate = getBaseTemplate(isDarkMode);
  const baseColors = baseTemplate.colors as Record<string, unknown>;

  const normalized: ColorTokens = {
    primary: colors.primary as Record<string, string> || baseColors.primary as Record<string, string>,
    secondary: colors.secondary as Record<string, string> || baseColors.secondary as Record<string, string>,
    background: {
      default: (colors.background as Record<string, string>)?.default || (baseColors.background as Record<string, string>).default,
      paper: (colors.background as Record<string, string>)?.paper || (baseColors.background as Record<string, string>).paper,
      elevated: (colors.background as Record<string, string>)?.elevated || (baseColors.background as Record<string, string>).elevated,
    },
    text: {
      primary: (colors.text as Record<string, string>)?.primary || (baseColors.text as Record<string, string>).primary,
      secondary: (colors.text as Record<string, string>)?.secondary || (baseColors.text as Record<string, string>).secondary,
      muted: (colors.text as Record<string, string>)?.muted || (baseColors.text as Record<string, string>).muted,
    },
    border: {
      default: (colors.border as Record<string, string>)?.default || (baseColors.border as Record<string, string>).default,
      muted: (colors.border as Record<string, string>)?.muted || (baseColors.border as Record<string, string>).muted,
    },
    status: {
      success: (colors.status as Record<string, string>)?.success || (baseColors.status as Record<string, string>).success,
      warning: (colors.status as Record<string, string>)?.warning || (baseColors.status as Record<string, string>).warning,
      error: (colors.status as Record<string, string>)?.error || (baseColors.status as Record<string, string>).error,
      info: (colors.status as Record<string, string>)?.info || (baseColors.status as Record<string, string>).info,
    },
  };

  // Add industry-specific colors if present
  if (colors.commerce) {
    normalized.commerce = colors.commerce as ColorTokens['commerce'];
  }
  if (colors.medical) {
    normalized.medical = colors.medical as ColorTokens['medical'];
  }
  if (colors.financial) {
    normalized.financial = colors.financial as ColorTokens['financial'];
  }
  if (colors.academic) {
    normalized.academic = colors.academic as ColorTokens['academic'];
  }
  if (colors.productivity) {
    normalized.productivity = colors.productivity as ColorTokens['productivity'];
  }

  return normalized;
}

/**
 * Normalize typography tokens using base template fallbacks
 */
function normalizeTypographyTokens(typography: Record<string, unknown>): TypographyTokens {
  const isDarkMode = getSSRSafeDarkMode();
  const baseTemplate = getBaseTemplate(isDarkMode);
  const baseTypography = baseTemplate.typography as Record<string, unknown>;

  return {
    fontFamily: {
      sans: (typography.fontFamily as Record<string, string[]>)?.sans || (baseTypography.fontFamily as Record<string, string[]>).sans,
      serif: (typography.fontFamily as Record<string, string[]>)?.serif || (baseTypography.fontFamily as Record<string, string[]>).serif,
      mono: (typography.fontFamily as Record<string, string[]>)?.mono || (baseTypography.fontFamily as Record<string, string[]>).mono,
    },
    fontSize: typography.fontSize as Record<string, string> || baseTypography.fontSize as Record<string, string>,
    fontWeight: typography.fontWeight as Record<string, number> || baseTypography.fontWeight as Record<string, number>,
    lineHeight: typography.lineHeight as Record<string, number> || baseTypography.lineHeight as Record<string, number>,
  };
}

/**
 * Normalize spacing tokens using base template fallbacks
 */
function normalizeSpacingTokens(spacing: Record<string, unknown>): SpacingTokens {
  const isDarkMode = getSSRSafeDarkMode();
  const baseTemplate = getBaseTemplate(isDarkMode);
  const baseSpacing = baseTemplate.spacing as Record<string, string>;

  return { ...baseSpacing, ...spacing } as SpacingTokens;
}

/**
 * Normalize branding tokens using base template fallbacks
 */
function normalizeBrandingTokens(branding: Record<string, unknown>): BrandingTokens {
  const isDarkMode = getSSRSafeDarkMode();
  const baseTemplate = getBaseTemplate(isDarkMode);
  const baseBranding = baseTemplate.branding as Record<string, unknown>;

  return {
    logo: {
      primary: (branding.logo as Record<string, string>)?.primary || (baseBranding.logo as Record<string, string>).primary,
      secondary: (branding.logo as Record<string, string>)?.secondary || (baseBranding.logo as Record<string, string>).secondary,
    },
    ...branding,
  };
}

/**
 * Normalize accessibility tokens using base template fallbacks
 */
function normalizeAccessibilityTokens(accessibility: Record<string, unknown>): AccessibilityTokens {
  const isDarkMode = getSSRSafeDarkMode();
  const baseTemplate = getBaseTemplate(isDarkMode);
  const baseAccessibility = baseTemplate.accessibility as Record<string, unknown>;

  return {
    level: accessibility.level as string || baseAccessibility.level as string,
    highContrast: accessibility.highContrast as boolean ?? baseAccessibility.highContrast as boolean,
    reducedMotion: accessibility.reducedMotion as boolean ?? baseAccessibility.reducedMotion as boolean,
    focusIndicators: accessibility.focusIndicators as boolean ?? baseAccessibility.focusIndicators as boolean,
    colorBlindFriendly: accessibility.colorBlindFriendly as boolean ?? baseAccessibility.colorBlindFriendly as boolean,
    screenReaderOptimized: accessibility.screenReaderOptimized as boolean ?? baseAccessibility.screenReaderOptimized as boolean,
  };
}

/**
 * Normalize responsive tokens using base template fallbacks
 */
function normalizeResponsiveTokens(responsive: Record<string, unknown>): ResponsiveTokens {
  const isDarkMode = getSSRSafeDarkMode();
  const baseTemplate = getBaseTemplate(isDarkMode);
  const baseResponsive = baseTemplate.responsive as Record<string, unknown>;
  const baseBreakpoints = baseResponsive.breakpoints as Record<string, string>;
  const inputBreakpoints = responsive.breakpoints as Record<string, string> || {};

  return {
    breakpoints: {
      mobile: inputBreakpoints.mobile || baseBreakpoints.mobile,
      tablet: inputBreakpoints.tablet || baseBreakpoints.tablet,
      desktop: inputBreakpoints.desktop || baseBreakpoints.desktop,
      wide: inputBreakpoints.wide || baseBreakpoints.wide,
    },
  };
}

// =============================================================================
// USETOKEN HOOK
// =============================================================================

export interface UseTokensResult {
  tokens: DesignTokens;
  isLoading: boolean;
  error?: string;
  
  // Convenience accessors
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  branding: BrandingTokens;
  accessibility: AccessibilityTokens;
  responsive: ResponsiveTokens;
  shadows?: Record<string, string>;
  
  // Utility functions
  getToken: (path: string, fallback?: unknown) => unknown;
  hasToken: (path: string) => boolean;
  
  // Theme info
  themeInfo: {
    id: string;
    name: string;
    category: string;
    mode: 'LIGHT' | 'DARK';
    version: string;
  };
}

/**
 * Hook for accessing design tokens from current theme (SSR-safe)
 */
export const useTokens = (): UseTokensResult => {
  // ✅ SSR-safe hook usage
  if (typeof window === 'undefined') {
    // Return safe defaults during SSR
    const baseTokens = createBaseTemplateTokens();
    return {
      tokens: baseTokens,
      isLoading: false,
      error: undefined,
      colors: baseTokens.colors,
      typography: baseTokens.typography,
      spacing: baseTokens.spacing,
      branding: baseTokens.branding,
      accessibility: baseTokens.accessibility,
      responsive: baseTokens.responsive,
      shadows: undefined,
      getToken: (path: string, fallback?: unknown): unknown => {
        const keys = path.split('.');
        let value: unknown = baseTokens;
        for (const key of keys) {
          if (value && typeof value === 'object' && key in value) {
            value = (value as Record<string, unknown>)[key];
          } else {
            return fallback;
          }
        }
        return value;
      },
      hasToken: (path: string): boolean => {
        const keys = path.split('.');
        let value: unknown = baseTokens;
        for (const key of keys) {
          if (value && typeof value === 'object' && key in value) {
            value = (value as Record<string, unknown>)[key];
          } else {
            return false;
          }
        }
        return true;
      },
      themeInfo: baseTokens.theme,
    };
  }

  // ✅ Client-side: Use actual context and processing
  const { currentTemplate, isLoading } = useDesignSystem();

  const tokens = useMemo((): DesignTokens => {
    if (!currentTemplate) {
      // Return base template tokens when no theme is loaded
      return createBaseTemplateTokens();
    }

    try {
      return extractTokensFromTheme(currentTemplate);
    } catch (error) {
      logger.error('Failed to process theme tokens', { themeId: currentTemplate.id, error });
      return createBaseTemplateTokens();
    }
  }, [currentTemplate]);

  // Utility function to get nested token values
  const getToken = useMemo(() => {
    return (path: string, fallback?: unknown): unknown => {
      try {
        const keys = path.split('.');
        let value: unknown = tokens;
        
        for (const key of keys) {
          if (value && typeof value === 'object' && key in value) {
            value = (value as Record<string, unknown>)[key];
          } else {
            return fallback;
          }
        }
        
        return value;
      } catch (error) {
        logger.warn('Failed to get token', { path, error });
        return fallback;
      }
    };
  }, [tokens]);

  // Utility function to check if token exists
  const hasToken = useMemo(() => {
    return (tokenPath: string): boolean => {
      return getToken(tokenPath) !== undefined;
    };
  }, [getToken]);

  return {
    tokens,
    isLoading,
    error: undefined, // Simplified provider doesn't track error state
    
    // Convenience accessors
    colors: tokens.colors,
    typography: tokens.typography,
    spacing: tokens.spacing,
    branding: tokens.branding,
    accessibility: tokens.accessibility,
    responsive: tokens.responsive,
    shadows: getToken('shadows') as Record<string, string> | undefined,
    
    // Utility functions
    getToken,
    hasToken,
    
    // Theme info
    themeInfo: tokens.theme,
  };
};

// =============================================================================
// BASE TEMPLATE FALLBACK TOKENS (SSR-Safe)
// =============================================================================

/**
 * Create base template tokens using actual base JSON templates (SSR-safe)
 */
function createBaseTemplateTokens(): DesignTokens {
  try {
    const isDarkMode = getSSRSafeDarkMode();
    const baseTemplate = getBaseTemplate(isDarkMode);
    
    return extractTokensFromTheme(baseTemplate);
  } catch (error) {
    logger.error('Failed to load base template, using emergency fallback', { error });
    return createEmergencyFallbackTokens();
  }
}

/**
 * Create emergency fallback tokens (last resort when base templates fail)
 */
function createEmergencyFallbackTokens(): DesignTokens {
  logger.warn('Using emergency fallback tokens - base templates unavailable');
  
  return {
    colors: {
      primary: { 500: '#64748b' },
      secondary: { 500: '#6b7280' },
      background: {
        default: '#ffffff',
        paper: '#f8fafc',
        elevated: '#f1f5f9',
      },
      text: {
        primary: '#0f172a',
        secondary: '#475569',
        muted: '#94a3b8',
      },
      border: {
        default: '#e2e8f0',
        muted: '#f1f5f9',
      },
      status: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
    typography: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: { base: '1rem' },
      fontWeight: { normal: 400 },
      lineHeight: { normal: 1.5 },
    },
    spacing: {
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      6: '1.5rem',
      8: '2rem',
      12: '3rem',
      16: '4rem',
      24: '6rem',
    },
    branding: {
      logo: {
        primary: '/assets/logos/emergency-fallback.svg',
        secondary: '/assets/logos/emergency-fallback-alt.svg',
      },
    },
    accessibility: {
      level: 'WCAG_AA',
      highContrast: false,
      reducedMotion: false,
      focusIndicators: true,
      colorBlindFriendly: true,
      screenReaderOptimized: false,
    },
    responsive: {
      breakpoints: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
        wide: '1440px',
      },
    },
    theme: {
      id: 'emergency-fallback',
      name: 'Emergency Fallback Theme',
      category: 'BASE',
      mode: 'LIGHT',
      version: '1.0.0',
    },
  };
}

logger.info('SSR-safe useTokens hook initialized'); 