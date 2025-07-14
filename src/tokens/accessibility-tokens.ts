/**
 * @fileoverview Accessibility Tokens and Configuration
 * @module AccessibilityTokens
 * @description Configurable accessibility tokens for UI components
 */

// =============================================================================
// ACCESSIBILITY CONFIGURATION TYPES
// =============================================================================

/**
 * Accessibility levels supported by the UI system
 */
export type AccessibilityLevel = 'WCAG_2_1_AA' | 'WCAG_2_1_AAA' | 'WCAG_2_2_AA' | 'WCAG_2_2_AAA' | 'none';

/**
 * Main accessibility configuration
 */
export interface AccessibilityConfig { /** Global accessibility level */
  level: AccessibilityLevel;
  
  /** High contrast mode */
  highContrast: boolean;
  
  /** Reduced motion preferences */
  reduceMotion: boolean;
  
  /** Screen reader optimizations */
  screenReader: boolean;
  
  /** Keyboard navigation support */
  keyboardNavigation: boolean;
  
  /** Focus management */
  focusManagement: boolean;
  
  /** Color contrast requirements */
  colorContrast: { normal: number; // 4.5:1 for AA, 7:1 for AAA
    large: number;  // 3:1 for AA, 4.5:1 for AAA };
  
  /** Touch target sizes */
  touchTargets: { minimum: number; // 44px for AA, 48px for AAA
    recommended: number; };
  
  /** Text spacing requirements */
  textSpacing: { lineHeight: number; // 1.5 for AA
    paragraphSpacing: number; // 2x font size
    letterSpacing: number; // 0.12x font size
    wordSpacing: number; // 0.16x font size };
  
  /** Animation preferences */
  animation: { duration: number; // Max 5 seconds
    flickerThreshold: number; // 3 times per second
    pauseControl: boolean; };
  
  /** Custom accessibility features */
  custom?: { announcements?: boolean;
    landmarks?: boolean;
    skipLinks?: boolean;
    breadcrumbs?: boolean;
    errorSummary?: boolean;
    liveRegions?: boolean; }; }

// =============================================================================
// ACCESSIBILITY TOKEN DEFINITIONS
// =============================================================================

/**
 * Default accessibility configuration (WCAG 2.1 AA)
 */
export const defaultAccessibilityConfig: AccessibilityConfig = { level: 'WCAG_2_1_AA',
  highContrast: false,
  reduceMotion: false,
  screenReader: true,
  keyboardNavigation: true,
  focusManagement: true,
  colorContrast: { normal: 4.5,
    large: 3.0, },
  touchTargets: { minimum: 44,
    recommended: 48, },
  textSpacing: { lineHeight: 1.5,
    paragraphSpacing: 2.0,
    letterSpacing: 0.12,
    wordSpacing: 0.16, },
  animation: { duration: 5000,
    flickerThreshold: 3,
    pauseControl: true, },
  custom: { announcements: true,
    landmarks: true,
    skipLinks: true,
    breadcrumbs: true,
    errorSummary: true,
    liveRegions: true, }, };

/**
 * Enhanced accessibility configuration (WCAG 2.2 AAA)
 */
export const enhancedAccessibilityConfig: AccessibilityConfig = { level: 'WCAG_2_2_AAA',
  highContrast: true,
  reduceMotion: true,
  screenReader: true,
  keyboardNavigation: true,
  focusManagement: true,
  colorContrast: { normal: 7.0,
    large: 4.5, },
  touchTargets: { minimum: 48,
    recommended: 56, },
  textSpacing: { lineHeight: 1.8,
    paragraphSpacing: 2.5,
    letterSpacing: 0.15,
    wordSpacing: 0.20, },
  animation: { duration: 3000,
    flickerThreshold: 2,
    pauseControl: true, },
  custom: { announcements: true,
    landmarks: true,
    skipLinks: true,
    breadcrumbs: true,
    errorSummary: true,
    liveRegions: true, }, };

/**
 * Minimal accessibility configuration (none)
 */
export const minimalAccessibilityConfig: AccessibilityConfig = { level: 'none',
  highContrast: false,
  reduceMotion: false,
  screenReader: false,
  keyboardNavigation: false,
  focusManagement: false,
  colorContrast: { normal: 1.0,
    large: 1.0, },
  touchTargets: { minimum: 32,
    recommended: 40, },
  textSpacing: { lineHeight: 1.2,
    paragraphSpacing: 1.0,
    letterSpacing: 0.0,
    wordSpacing: 0.0, },
  animation: { duration: 10000,
    flickerThreshold: 10,
    pauseControl: false, },
  custom: { announcements: false,
    landmarks: false,
    skipLinks: false,
    breadcrumbs: false,
    errorSummary: false,
    liveRegions: false, }, };

// =============================================================================
// ACCESSIBILITY TOKEN SYSTEM
// =============================================================================

/**
 * Accessibility tokens generated from configuration
 */
export interface AccessibilityTokens { // Color tokens
  readonly colors: { readonly focus: string;
    readonly error: string;
    readonly success: string;
    readonly warning: string;
    readonly info: string;
    readonly contrast: { readonly text: string;
      readonly background: string;
      readonly border: string; }; };
  
  // Spacing tokens
  readonly spacing: { readonly focus: string;
    readonly touchTarget: string;
    readonly textSpacing: string;
    readonly skipLink: string; };
  
  // Typography tokens
  readonly typography: { readonly lineHeight: string;
    readonly letterSpacing: string;
    readonly wordSpacing: string;
    readonly fontSize: { readonly large: string;
      readonly xlarge: string; }; };
  
  // Animation tokens
  readonly animation: { readonly duration: string;
    readonly timing: string;
    readonly disabled: boolean; };
  
  // Z-index tokens
  readonly zIndex: { readonly skipLink: number;
    readonly focus: number;
    readonly modal: number;
    readonly tooltip: number; }; }

/**
 * Generate accessibility tokens from configuration
 */
export function generateAccessibilityTokens(config: AccessibilityConfig): AccessibilityTokens { return { colors: { focus: config.highContrast ? '#0000ff' : '#005fcc',
      error: config.highContrast ? '#cc0000' : '#d32f2f',
      success: config.highContrast ? '#008800' : '#2e7d32',
      warning: config.highContrast ? '#cc8800' : '#f57c00',
      info: config.highContrast ? '#0066cc' : '#1976d2',
      contrast: { text: config.highContrast ? '#000000' : '#212121',
        background: config.highContrast ? '#ffffff' : '#fafafa',
        border: config.highContrast ? '#000000' : '#e0e0e0', }, },
    spacing: { focus: '2px',
      touchTarget: `${config.touchTargets.minimum}px`,
      textSpacing: `${config.textSpacing.paragraphSpacing}em`,
      skipLink: '16px', },
    typography: { lineHeight: config.textSpacing.lineHeight.toString(),
      letterSpacing: `${config.textSpacing.letterSpacing}em`,
      wordSpacing: `${config.textSpacing.wordSpacing}em`,
      fontSize: { large: '18px',
        xlarge: '24px', }, },
    animation: { duration: config.reduceMotion ? '0ms' : `${config.animation.duration}ms`,
      timing: 'ease-in-out',
      disabled: config.reduceMotion, },
    zIndex: { skipLink: 9999,
      focus: 1000,
      modal: 1050,
      tooltip: 1070, }, }; }

// =============================================================================
// ACCESSIBILITY UTILITY FUNCTIONS
// =============================================================================

/**
 * Check if a color contrast ratio meets requirements
 */
export function meetsContrastRequirements(
  contrast: number,
  config: AccessibilityConfig,
  isLargeText: boolean = false
): boolean { const requirement = isLargeText ? config.colorContrast.large : config.colorContrast.normal;
  return contrast >= requirement; }

/**
 * Check if touch target size meets requirements
 */
export function meetsTouchTargetRequirements(
  size: number,
  config: AccessibilityConfig
): boolean { return size >= config.touchTargets.minimum; }

/**
 * Get ARIA attributes based on accessibility configuration
 */
export function getAriaAttributes(config: AccessibilityConfig): Record<string, string> { const attributes: Record<string, string> = {};
  
  if (config.screenReader) { attributes['aria-live'] = 'polite';
    attributes['aria-atomic'] = 'true'; }
  
  if (config.custom?.announcements) { attributes['aria-describedby'] = 'accessibility-announcements'; }
  
  return attributes; }

/**
 * Get keyboard navigation attributes
 */
export function getKeyboardAttributes(config: AccessibilityConfig): Record<string, string> { const attributes: Record<string, string> = {};
  
  if (config.keyboardNavigation) { attributes['tabindex'] = '0';
    attributes['role'] = 'button'; }
  
  return attributes; }

// =============================================================================
// ACCESSIBILITY PRESETS
// =============================================================================

/**
 * Predefined accessibility configurations
 */
export const accessibilityPresets = { none: minimalAccessibilityConfig,
  basic: defaultAccessibilityConfig,
  enhanced: enhancedAccessibilityConfig,
  government: { ...enhancedAccessibilityConfig,
    level: 'WCAG_2_2_AAA' as AccessibilityLevel,
    custom: { ...enhancedAccessibilityConfig.custom,
      announcements: true,
      landmarks: true,
      skipLinks: true,
      breadcrumbs: true,
      errorSummary: true,
      liveRegions: true, }, },
  enterprise: { ...defaultAccessibilityConfig,
    level: 'WCAG_2_1_AA' as AccessibilityLevel,
    custom: { ...defaultAccessibilityConfig.custom,
      announcements: true,
      landmarks: true,
      skipLinks: true,
      breadcrumbs: false,
      errorSummary: true,
      liveRegions: true, }, }, } as const;

// =============================================================================
// EXPORTS
// =============================================================================

export type AccessibilityPreset = keyof typeof accessibilityPresets;

export { meetsContrastRequirements as checkContrast,
    meetsTouchTargetRequirements as checkTouchTarget, generateAccessibilityTokens as generateA11yTokens, getAriaAttributes as getA11yAttributes,
    getKeyboardAttributes as getKeyboardA11y };
