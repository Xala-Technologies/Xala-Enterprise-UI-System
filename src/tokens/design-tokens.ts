/**
 * @fileoverview Consolidated Design Token System
 * @description Single source of truth for all design tokens following semantic token principles
 * @version 2.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir
 */

// =============================================================================
// GLOBAL TOKENS - Raw values (foundation layer)
// =============================================================================

/**
 * Global color palette - raw color values
 */
export const globalColors = {
  // Primary Xala brand colors
  xala: {
    50: '#e8f3ff',
    100: '#d1e7ff',
    200: '#a3cfff',
    300: '#75b7ff',
    400: '#479fff',
    500: '#1987ff', // Primary brand color
    600: '#0066cc',
    700: '#004d99',
    800: '#003366',
    900: '#001a33',
  },
  
  // Norwegian flag-inspired colors
  norway: {
    red: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Semantic colors
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    info: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
  },
  
  // Special colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
};

/**
 * Global spacing scale
 */
export const globalSpacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  32: '128px',
  40: '160px',
  48: '192px',
  56: '224px',
  64: '256px',
} as const;

/**
 * Global typography scale
 */
export const globalTypography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
  },
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

/**
 * Global border radius scale
 */
export const globalBorderRadius = {
  none: '0px',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
} as const;

/**
 * Global shadow scale
 */
export const globalShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
} as const;

// =============================================================================
// SEMANTIC TOKENS - Meaning-based tokens (semantic layer)
// =============================================================================

/**
 * Semantic color tokens - what colors mean in the system
 */
export const semanticColors = {
  // Primary brand colors
  primary: {
    50: globalColors.xala[50],
    100: globalColors.xala[100],
    200: globalColors.xala[200],
    300: globalColors.xala[300],
    400: globalColors.xala[400],
    500: globalColors.xala[500],
    600: globalColors.xala[600],
    700: globalColors.xala[700],
    800: globalColors.xala[800],
    900: globalColors.xala[900],
  },
  
  // Text colors
  text: {
    primary: globalColors.neutral[900],
    secondary: globalColors.neutral[600],
    tertiary: globalColors.neutral[500],
    inverse: globalColors.white,
    disabled: globalColors.neutral[400],
    link: globalColors.xala[600],
    linkHover: globalColors.xala[700],
  },
  
  // Background colors
  background: {
    primary: globalColors.white,
    secondary: globalColors.neutral[50],
    tertiary: globalColors.neutral[100],
    inverse: globalColors.neutral[900],
    disabled: globalColors.neutral[100],
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Surface colors
  surface: {
    primary: globalColors.white,
    secondary: globalColors.neutral[50],
    tertiary: globalColors.neutral[100],
    elevated: globalColors.white,
    overlay: globalColors.white,
  },
  
  // Border colors
  border: {
    primary: globalColors.neutral[200],
    secondary: globalColors.neutral[300],
    tertiary: globalColors.neutral[400],
    strong: globalColors.neutral[500],
    inverse: globalColors.neutral[700],
    disabled: globalColors.neutral[200],
  },
  
  // State colors
  state: {
    success: globalColors.semantic.success[600],
    warning: globalColors.semantic.warning[600],
    error: globalColors.semantic.error[600],
    info: globalColors.semantic.info[600],
    successBackground: globalColors.semantic.success[50],
    warningBackground: globalColors.semantic.warning[50],
    errorBackground: globalColors.semantic.error[50],
    infoBackground: globalColors.semantic.info[50],
  },
  
  // Interactive colors
  interactive: {
    primary: globalColors.xala[600],
    primaryHover: globalColors.xala[700],
    primaryActive: globalColors.xala[800],
    primaryDisabled: globalColors.neutral[300],
    secondary: globalColors.neutral[100],
    secondaryHover: globalColors.neutral[200],
    secondaryActive: globalColors.neutral[300],
    focus: globalColors.xala[500],
  },
} as const;

/**
 * Semantic spacing tokens
 */
export const semanticSpacing = {
  // Component spacing
  component: {
    xs: globalSpacing[1],
    sm: globalSpacing[2],
    md: globalSpacing[4],
    lg: globalSpacing[6],
    xl: globalSpacing[8],
  },
  
  // Layout spacing
  layout: {
    xs: globalSpacing[4],
    sm: globalSpacing[6],
    md: globalSpacing[8],
    lg: globalSpacing[12],
    xl: globalSpacing[16],
  },
  
  // Accessibility spacing
  accessibility: {
    touchTarget: globalSpacing[11], // 44px minimum touch target
    focusRing: globalSpacing[1],
    textSpacing: globalSpacing[2],
  },
} as const;

/**
 * Semantic typography tokens
 */
export const semanticTypography = {
  // Heading styles
  heading: {
    h1: {
      fontSize: globalTypography.fontSize['4xl'],
      fontWeight: globalTypography.fontWeight.bold,
      lineHeight: globalTypography.lineHeight.tight,
    },
    h2: {
      fontSize: globalTypography.fontSize['3xl'],
      fontWeight: globalTypography.fontWeight.bold,
      lineHeight: globalTypography.lineHeight.tight,
    },
    h3: {
      fontSize: globalTypography.fontSize['2xl'],
      fontWeight: globalTypography.fontWeight.semibold,
      lineHeight: globalTypography.lineHeight.normal,
    },
    h4: {
      fontSize: globalTypography.fontSize.xl,
      fontWeight: globalTypography.fontWeight.semibold,
      lineHeight: globalTypography.lineHeight.normal,
    },
    h5: {
      fontSize: globalTypography.fontSize.lg,
      fontWeight: globalTypography.fontWeight.semibold,
      lineHeight: globalTypography.lineHeight.normal,
    },
    h6: {
      fontSize: globalTypography.fontSize.base,
      fontWeight: globalTypography.fontWeight.semibold,
      lineHeight: globalTypography.lineHeight.normal,
    },
  },
  
  // Body text styles
  body: {
    large: {
      fontSize: globalTypography.fontSize.lg,
      fontWeight: globalTypography.fontWeight.normal,
      lineHeight: globalTypography.lineHeight.relaxed,
    },
    medium: {
      fontSize: globalTypography.fontSize.base,
      fontWeight: globalTypography.fontWeight.normal,
      lineHeight: globalTypography.lineHeight.normal,
    },
    small: {
      fontSize: globalTypography.fontSize.sm,
      fontWeight: globalTypography.fontWeight.normal,
      lineHeight: globalTypography.lineHeight.normal,
    },
  },
  
  // UI text styles
  ui: {
    button: {
      fontSize: globalTypography.fontSize.sm,
      fontWeight: globalTypography.fontWeight.medium,
      lineHeight: globalTypography.lineHeight.tight,
    },
    caption: {
      fontSize: globalTypography.fontSize.xs,
      fontWeight: globalTypography.fontWeight.normal,
      lineHeight: globalTypography.lineHeight.normal,
    },
    label: {
      fontSize: globalTypography.fontSize.sm,
      fontWeight: globalTypography.fontWeight.medium,
      lineHeight: globalTypography.lineHeight.normal,
    },
  },
} as const;

// =============================================================================
// COMPONENT TOKENS - Component-specific tokens
// =============================================================================

/**
 * Component-specific tokens
 */
export const componentTokens = {
  button: {
    height: {
      sm: '32px',
      md: globalSpacing[11], // 44px for accessibility
      lg: '48px',
      xl: '56px',
    },
    padding: {
      sm: `${globalSpacing[2]} ${globalSpacing[3]}`,
      md: `${globalSpacing[3]} ${globalSpacing[4]}`,
      lg: `${globalSpacing[4]} ${globalSpacing[6]}`,
      xl: `${globalSpacing[5]} ${globalSpacing[8]}`,
    },
    borderRadius: {
      sm: globalBorderRadius.sm,
      md: globalBorderRadius.base,
      lg: globalBorderRadius.md,
      full: globalBorderRadius.full,
    },
  },
  
  input: {
    height: {
      sm: '32px',
      md: globalSpacing[11], // 44px for accessibility
      lg: '48px',
    },
    padding: {
      sm: `${globalSpacing[2]} ${globalSpacing[3]}`,
      md: `${globalSpacing[3]} ${globalSpacing[4]}`,
      lg: `${globalSpacing[4]} ${globalSpacing[5]}`,
    },
    borderRadius: globalBorderRadius.base,
    borderWidth: '1px',
  },
  
  card: {
    padding: {
      sm: globalSpacing[4],
      md: globalSpacing[6],
      lg: globalSpacing[8],
    },
    borderRadius: globalBorderRadius.lg,
    shadow: globalShadows.md,
  },
  
  modal: {
    padding: globalSpacing[6],
    borderRadius: globalBorderRadius.lg,
    shadow: globalShadows.xl,
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

// =============================================================================
// PLATFORM TOKENS - Platform-specific overrides
// =============================================================================

/**
 * Platform-specific token overrides
 */
export const platformTokens = {
  mobile: {
    component: {
      button: {
        height: {
          sm: '40px',
          md: globalSpacing[11], // 44px minimum
          lg: '52px',
          xl: '60px',
        },
        padding: {
          sm: `${globalSpacing[3]} ${globalSpacing[4]}`,
          md: `${globalSpacing[4]} ${globalSpacing[5]}`,
          lg: `${globalSpacing[5]} ${globalSpacing[6]}`,
          xl: `${globalSpacing[6]} ${globalSpacing[8]}`,
        },
      },
      input: {
        height: {
          sm: '40px',
          md: globalSpacing[11], // 44px minimum
          lg: '52px',
        },
        padding: {
          sm: `${globalSpacing[3]} ${globalSpacing[4]}`,
          md: `${globalSpacing[4]} ${globalSpacing[5]}`,
          lg: `${globalSpacing[5]} ${globalSpacing[6]}`,
        },
      },
    },
  },
  
  desktop: {
    component: {
      button: {
        height: {
          sm: '32px',
          md: '36px',
          lg: '44px',
          xl: '52px',
        },
      },
      input: {
        height: {
          sm: '32px',
          md: '36px',
          lg: '44px',
        },
      },
    },
  },
} as const;

// =============================================================================
// EXPORTS & UTILITIES
// =============================================================================

/**
 * Complete design token system
 */
export const designTokens = {
  global: {
    colors: globalColors,
    spacing: globalSpacing,
    typography: globalTypography,
    borderRadius: globalBorderRadius,
    shadows: globalShadows,
  },
  semantic: {
    colors: semanticColors,
    spacing: semanticSpacing,
    typography: semanticTypography,
  },
  component: componentTokens,
  platform: platformTokens,
} as const;

/**
 * Utility function to get token value with fallback
 */
export function getToken(path: string, fallback?: string): string {
  const keys = path.split('.');
  let current: any = designTokens;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback || '';
    }
  }
  
  return current || fallback || '';
}

/**
 * Norwegian compliance configuration
 */
export const norwegianCompliance = {
  accessibility: {
    minimumTouchTarget: globalSpacing[11], // 44px
    focusRingWidth: globalSpacing[1],
    contrastRatio: {
      AA: 4.5,
      AAA: 7,
    },
  },
  nsm: {
    classification: {
      ÅPEN: semanticColors.state.info,
      BEGRENSET: semanticColors.state.warning,
      KONFIDENSIELT: semanticColors.state.error,
      HEMMELIG: globalColors.neutral[900],
    },
  },
} as const;

export default designTokens; 