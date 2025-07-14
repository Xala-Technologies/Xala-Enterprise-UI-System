/**
 * @fileoverview Global Design Tokens - Primitive Layer
 * @description Foundational design tokens for the UI system
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA
 */

// =============================================================================
// COLOR PRIMITIVES - Raw color values (Foundation Layer)
// =============================================================================

/**
 * Global color palette - primitive color values
 * These are the raw color values that form the foundation of our semantic system
 */
export const globalColorPrimitives = { // Xala Brand Colors
  xala: { 50: '#e8f3ff',
    100: '#d1e7ff',
    200: '#a3cfff',
    300: '#75b7ff',
    400: '#479fff',
    500: '#1987ff', // Primary brand color
    600: '#0066cc',
    700: '#004d99',
    800: '#003366',
    900: '#001a33', },
  
  // Neutral Color Scale
  neutral: { 0: '#ffffff',
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
    950: '#0a0a0a',
    1000: '#000000', },
  
  // Semantic Color Scales
  green: { 50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d', },
  
  yellow: { 50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f', },
  
  red: { 50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d', },
  
  blue: { 50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a', },
  
  // Special colors
  transparent: 'transparent',
  current: 'currentColor', } as const;

// =============================================================================
// SPACING PRIMITIVES - Raw spacing values
// =============================================================================

/**
 * Global spacing scale - primitive spacing values
 * Following 4px base unit system with logical progressions
 */
export const globalSpacingPrimitives = { 0: '0px',
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
  11: '44px', // Minimum touch target size
  12: '48px',
  14: '56px',
  16: '64px',
  18: '72px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px', } as const;

// =============================================================================
// TYPOGRAPHY PRIMITIVES - Raw typography values
// =============================================================================

/**
 * Font family primitives
 */
export const globalFontFamilies = { sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  serif: [
    'Georgia',
    'Times New Roman',
    'serif',
  ],
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'monospace',
  ], } as const;

/**
 * Font size primitives - following type scale
 */
export const globalFontSizes = { xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px', } as const;

/**
 * Font weight primitives
 */
export const globalFontWeights = { thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900', } as const;

/**
 * Line height primitives
 */
export const globalLineHeights = { none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2', } as const;

/**
 * Letter spacing primitives
 */
export const globalLetterSpacing = { tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em', } as const;

// =============================================================================
// BORDER PRIMITIVES - Raw border values
// =============================================================================

/**
 * Border radius primitives
 */
export const globalBorderRadius = { none: '0px',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px', } as const;

/**
 * Border width primitives
 */
export const globalBorderWidths = { 0: '0px',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px', } as const;

// =============================================================================
// SHADOW PRIMITIVES - Raw shadow values
// =============================================================================

/**
 * Shadow primitives - following design system standards
 */
export const globalShadows = { none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)', } as const;

// =============================================================================
// BREAKPOINT PRIMITIVES - Raw breakpoint values
// =============================================================================

/**
 * Breakpoint primitives for responsive design
 */
export const globalBreakpoints = { xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px', } as const;

// =============================================================================
// ANIMATION PRIMITIVES - Raw animation values
// =============================================================================

/**
 * Animation duration primitives
 */
export const globalAnimationDurations = { fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms', } as const;

/**
 * Animation easing primitives
 */
export const globalAnimationEasings = { linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'ease-in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'ease-in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', } as const;

// =============================================================================
// Z-INDEX PRIMITIVES - Raw z-index values
// =============================================================================

/**
 * Z-index primitives for layering
 */
export const globalZIndices = { auto: 'auto',
  base: '0',
  docked: '10',
  dropdown: '1000',
  sticky: '1100',
  banner: '1200',
  overlay: '1300',
  modal: '1400',
  popover: '1500',
  skipLink: '1600',
  toast: '1700',
  tooltip: '1800', } as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type GlobalColorPrimitive = typeof globalColorPrimitives;
export type GlobalSpacingPrimitive = typeof globalSpacingPrimitives;
export type GlobalFontFamily = typeof globalFontFamilies;
export type GlobalFontSize = typeof globalFontSizes;
export type GlobalFontWeight = typeof globalFontWeights;
export type GlobalLineHeight = typeof globalLineHeights;
export type GlobalLetterSpacing = typeof globalLetterSpacing;
export type GlobalBorderRadius = typeof globalBorderRadius;
export type GlobalBorderWidth = typeof globalBorderWidths;
export type GlobalShadow = typeof globalShadows;
export type GlobalBreakpoint = typeof globalBreakpoints;
export type GlobalAnimationDuration = typeof globalAnimationDurations;
export type GlobalAnimationEasing = typeof globalAnimationEasings;
export type GlobalZIndex = typeof globalZIndices; 