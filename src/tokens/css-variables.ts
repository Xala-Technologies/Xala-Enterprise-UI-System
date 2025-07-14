/**
 * Xala Design System - CSS Variables
 * WCAG AAA compliant theming system with design tokens
 */

import { xalaColors } from './xala-colors';

/**
 * CSS Variables for Xala Design System
 * All colors meet WCAG AAA accessibility standards
 */
export const cssVariables = {
  light: {
    // Primary colors
    '--xala-primary-50': xalaColors.primary[50],
    '--xala-primary-100': xalaColors.primary[100],
    '--xala-primary-200': xalaColors.primary[200],
    '--xala-primary-300': xalaColors.primary[300],
    '--xala-primary-400': xalaColors.primary[400],
    '--xala-primary-500': xalaColors.primary[500],
    '--xala-primary-600': xalaColors.primary[600],
    '--xala-primary-700': xalaColors.primary[700],
    '--xala-primary-800': xalaColors.primary[800],
    '--xala-primary-900': xalaColors.primary[900],

    // Secondary colors
    '--xala-secondary-50': xalaColors.secondary[50],
    '--xala-secondary-100': xalaColors.secondary[100],
    '--xala-secondary-200': xalaColors.secondary[200],
    '--xala-secondary-300': xalaColors.secondary[300],
    '--xala-secondary-400': xalaColors.secondary[400],
    '--xala-secondary-500': xalaColors.secondary[500],
    '--xala-secondary-600': xalaColors.secondary[600],
    '--xala-secondary-700': xalaColors.secondary[700],
    '--xala-secondary-800': xalaColors.secondary[800],
    '--xala-secondary-900': xalaColors.secondary[900],

    // Semantic colors
    '--xala-success-50': xalaColors.semantic.success[50],
    '--xala-success-100': xalaColors.semantic.success[100],
    '--xala-success-200': xalaColors.semantic.success[200],
    '--xala-success-300': xalaColors.semantic.success[300],
    '--xala-success-400': xalaColors.semantic.success[400],
    '--xala-success-500': xalaColors.semantic.success[500],
    '--xala-success-600': xalaColors.semantic.success[600],
    '--xala-success-700': xalaColors.semantic.success[700],
    '--xala-success-800': xalaColors.semantic.success[800],
    '--xala-success-900': xalaColors.semantic.success[900],

    '--xala-warning-50': xalaColors.semantic.warning[50],
    '--xala-warning-100': xalaColors.semantic.warning[100],
    '--xala-warning-200': xalaColors.semantic.warning[200],
    '--xala-warning-300': xalaColors.semantic.warning[300],
    '--xala-warning-400': xalaColors.semantic.warning[400],
    '--xala-warning-500': xalaColors.semantic.warning[500],
    '--xala-warning-600': xalaColors.semantic.warning[600],
    '--xala-warning-700': xalaColors.semantic.warning[700],
    '--xala-warning-800': xalaColors.semantic.warning[800],
    '--xala-warning-900': xalaColors.semantic.warning[900],

    '--xala-error-50': xalaColors.semantic.error[50],
    '--xala-error-100': xalaColors.semantic.error[100],
    '--xala-error-200': xalaColors.semantic.error[200],
    '--xala-error-300': xalaColors.semantic.error[300],
    '--xala-error-400': xalaColors.semantic.error[400],
    '--xala-error-500': xalaColors.semantic.error[500],
    '--xala-error-600': xalaColors.semantic.error[600],
    '--xala-error-700': xalaColors.semantic.error[700],
    '--xala-error-800': xalaColors.semantic.error[800],
    '--xala-error-900': xalaColors.semantic.error[900],

    '--xala-info-50': xalaColors.semantic.info[50],
    '--xala-info-100': xalaColors.semantic.info[100],
    '--xala-info-200': xalaColors.semantic.info[200],
    '--xala-info-300': xalaColors.semantic.info[300],
    '--xala-info-400': xalaColors.semantic.info[400],
    '--xala-info-500': xalaColors.semantic.info[500],
    '--xala-info-600': xalaColors.semantic.info[600],
    '--xala-info-700': xalaColors.semantic.info[700],
    '--xala-info-800': xalaColors.semantic.info[800],
    '--xala-info-900': xalaColors.semantic.info[900],

    // Neutral colors
    '--xala-neutral-50': xalaColors.neutral[50],
    '--xala-neutral-100': xalaColors.neutral[100],
    '--xala-neutral-200': xalaColors.neutral[200],
    '--xala-neutral-300': xalaColors.neutral[300],
    '--xala-neutral-400': xalaColors.neutral[400],
    '--xala-neutral-500': xalaColors.neutral[500],
    '--xala-neutral-600': xalaColors.neutral[600],
    '--xala-neutral-700': xalaColors.neutral[700],
    '--xala-neutral-800': xalaColors.neutral[800],
    '--xala-neutral-900': xalaColors.neutral[900],

    // Text colors (WCAG AAA compliant)
    '--xala-text-primary': xalaColors.text.primary,
    '--xala-text-secondary': xalaColors.text.secondary,
    '--xala-text-tertiary': xalaColors.text.tertiary,
    '--xala-text-inverse': xalaColors.text.inverse,
    '--xala-text-disabled': xalaColors.text.disabled,

    // Background colors
    '--xala-bg-primary': xalaColors.background.primary,
    '--xala-bg-secondary': xalaColors.background.secondary,
    '--xala-bg-tertiary': xalaColors.background.tertiary,
    '--xala-bg-inverse': xalaColors.background.inverse,
    '--xala-bg-overlay': xalaColors.background.overlay,

    // Border colors
    '--xala-border-light': xalaColors.border.light,
    '--xala-border-medium': xalaColors.border.medium,
    '--xala-border-dark': xalaColors.border.dark,
    '--xala-border-focus': xalaColors.border.focus,

    // Interactive states
    '--xala-hover-primary': xalaColors.interactive.hover.primary,
    '--xala-hover-secondary': xalaColors.interactive.hover.secondary,
    '--xala-hover-danger': xalaColors.interactive.hover.danger,

    '--xala-active-primary': xalaColors.interactive.active.primary,
    '--xala-active-secondary': xalaColors.interactive.active.secondary,
    '--xala-active-danger': xalaColors.interactive.active.danger,

    '--xala-focus-ring': xalaColors.interactive.focus.ring,
    '--xala-focus-outline': xalaColors.interactive.focus.outline,

    '--xala-disabled-bg': xalaColors.interactive.disabled.background,
    '--xala-disabled-text': xalaColors.interactive.disabled.text,
    '--xala-disabled-border': xalaColors.interactive.disabled.border,

    // Status colors
    '--xala-status-online': xalaColors.status.online,
    '--xala-status-offline': xalaColors.status.offline,
    '--xala-status-busy': xalaColors.status.busy,
    '--xala-status-away': xalaColors.status.away,

    // Semantic aliases for components
    '--xala-foreground': xalaColors.text.primary,
    '--xala-background': xalaColors.background.primary,
    '--xala-muted': xalaColors.text.tertiary,
    '--xala-muted-foreground': xalaColors.text.tertiary,
    '--xala-popover': xalaColors.background.primary,
    '--xala-popover-foreground': xalaColors.text.primary,
    '--xala-card': xalaColors.background.primary,
    '--xala-card-foreground': xalaColors.text.primary,
    '--xala-input': xalaColors.background.primary,
    '--xala-ring': xalaColors.interactive.focus.ring,
    '--xala-destructive': xalaColors.semantic.error[600],
    '--xala-destructive-foreground': xalaColors.text.inverse,
  },

  dark: {
    // Primary colors (adjusted for dark theme)
    '--xala-primary-50': xalaColors.primary[900],
    '--xala-primary-100': xalaColors.primary[800],
    '--xala-primary-200': xalaColors.primary[700],
    '--xala-primary-300': xalaColors.primary[600],
    '--xala-primary-400': xalaColors.primary[500],
    '--xala-primary-500': xalaColors.primary[400],
    '--xala-primary-600': xalaColors.primary[300],
    '--xala-primary-700': xalaColors.primary[200],
    '--xala-primary-800': xalaColors.primary[100],
    '--xala-primary-900': xalaColors.primary[50],

    // Secondary colors (adjusted for dark theme)
    '--xala-secondary-50': xalaColors.secondary[900],
    '--xala-secondary-100': xalaColors.secondary[800],
    '--xala-secondary-200': xalaColors.secondary[700],
    '--xala-secondary-300': xalaColors.secondary[600],
    '--xala-secondary-400': xalaColors.secondary[500],
    '--xala-secondary-500': xalaColors.secondary[400],
    '--xala-secondary-600': xalaColors.secondary[300],
    '--xala-secondary-700': xalaColors.secondary[200],
    '--xala-secondary-800': xalaColors.secondary[100],
    '--xala-secondary-900': xalaColors.secondary[50],

    // Semantic colors (adjusted for dark theme)
    '--xala-success-50': xalaColors.semantic.success[900],
    '--xala-success-100': xalaColors.semantic.success[800],
    '--xala-success-200': xalaColors.semantic.success[700],
    '--xala-success-300': xalaColors.semantic.success[600],
    '--xala-success-400': xalaColors.semantic.success[500],
    '--xala-success-500': xalaColors.semantic.success[400],
    '--xala-success-600': xalaColors.semantic.success[300],
    '--xala-success-700': xalaColors.semantic.success[200],
    '--xala-success-800': xalaColors.semantic.success[100],
    '--xala-success-900': xalaColors.semantic.success[50],

    '--xala-warning-50': xalaColors.semantic.warning[900],
    '--xala-warning-100': xalaColors.semantic.warning[800],
    '--xala-warning-200': xalaColors.semantic.warning[700],
    '--xala-warning-300': xalaColors.semantic.warning[600],
    '--xala-warning-400': xalaColors.semantic.warning[500],
    '--xala-warning-500': xalaColors.semantic.warning[400],
    '--xala-warning-600': xalaColors.semantic.warning[300],
    '--xala-warning-700': xalaColors.semantic.warning[200],
    '--xala-warning-800': xalaColors.semantic.warning[100],
    '--xala-warning-900': xalaColors.semantic.warning[50],

    '--xala-error-50': xalaColors.semantic.error[900],
    '--xala-error-100': xalaColors.semantic.error[800],
    '--xala-error-200': xalaColors.semantic.error[700],
    '--xala-error-300': xalaColors.semantic.error[600],
    '--xala-error-400': xalaColors.semantic.error[500],
    '--xala-error-500': xalaColors.semantic.error[400],
    '--xala-error-600': xalaColors.semantic.error[300],
    '--xala-error-700': xalaColors.semantic.error[200],
    '--xala-error-800': xalaColors.semantic.error[100],
    '--xala-error-900': xalaColors.semantic.error[50],

    '--xala-info-50': xalaColors.semantic.info[900],
    '--xala-info-100': xalaColors.semantic.info[800],
    '--xala-info-200': xalaColors.semantic.info[700],
    '--xala-info-300': xalaColors.semantic.info[600],
    '--xala-info-400': xalaColors.semantic.info[500],
    '--xala-info-500': xalaColors.semantic.info[400],
    '--xala-info-600': xalaColors.semantic.info[300],
    '--xala-info-700': xalaColors.semantic.info[200],
    '--xala-info-800': xalaColors.semantic.info[100],
    '--xala-info-900': xalaColors.semantic.info[50],

    // Neutral colors (inverted for dark theme)
    '--xala-neutral-50': xalaColors.neutral[900],
    '--xala-neutral-100': xalaColors.neutral[800],
    '--xala-neutral-200': xalaColors.neutral[700],
    '--xala-neutral-300': xalaColors.neutral[600],
    '--xala-neutral-400': xalaColors.neutral[500],
    '--xala-neutral-500': xalaColors.neutral[400],
    '--xala-neutral-600': xalaColors.neutral[300],
    '--xala-neutral-700': xalaColors.neutral[200],
    '--xala-neutral-800': xalaColors.neutral[100],
    '--xala-neutral-900': xalaColors.neutral[50],

    // Text colors (adjusted for dark theme)
    '--xala-text-primary': xalaColors.text.inverse,
    '--xala-text-secondary': xalaColors.neutral[200],
    '--xala-text-tertiary': xalaColors.neutral[300],
    '--xala-text-inverse': xalaColors.text.primary,
    '--xala-text-disabled': xalaColors.neutral[600],

    // Background colors (adjusted for dark theme)
    '--xala-bg-primary': xalaColors.background.inverse,
    '--xala-bg-secondary': xalaColors.neutral[800],
    '--xala-bg-tertiary': xalaColors.neutral[700],
    '--xala-bg-inverse': xalaColors.background.primary,
    '--xala-bg-overlay': 'rgba(255, 255, 255, 0.1)',

    // Border colors (adjusted for dark theme)
    '--xala-border-light': xalaColors.neutral[700],
    '--xala-border-medium': xalaColors.neutral[600],
    '--xala-border-dark': xalaColors.neutral[500],
    '--xala-border-focus': xalaColors.primary[400],

    // Interactive states (adjusted for dark theme)
    '--xala-hover-primary': xalaColors.primary[300],
    '--xala-hover-secondary': xalaColors.neutral[700],
    '--xala-hover-danger': xalaColors.semantic.error[400],

    '--xala-active-primary': xalaColors.primary[200],
    '--xala-active-secondary': xalaColors.neutral[600],
    '--xala-active-danger': xalaColors.semantic.error[300],

    '--xala-focus-ring': xalaColors.primary[400],
    '--xala-focus-outline': xalaColors.primary[300],

    '--xala-disabled-bg': xalaColors.neutral[800],
    '--xala-disabled-text': xalaColors.neutral[600],
    '--xala-disabled-border': xalaColors.neutral[700],

    // Status colors (adjusted for dark theme)
    '--xala-status-online': xalaColors.semantic.success[400],
    '--xala-status-offline': xalaColors.semantic.error[400],
    '--xala-status-busy': xalaColors.semantic.warning[400],
    '--xala-status-away': '#f97316',

    // Semantic aliases for components (dark theme)
    '--xala-foreground': xalaColors.text.inverse,
    '--xala-background': xalaColors.background.inverse,
    '--xala-muted': xalaColors.neutral[700],
    '--xala-muted-foreground': xalaColors.neutral[300],
    '--xala-popover': xalaColors.neutral[800],
    '--xala-popover-foreground': xalaColors.text.inverse,
    '--xala-card': xalaColors.neutral[800],
    '--xala-card-foreground': xalaColors.text.inverse,
    '--xala-input': xalaColors.neutral[800],
    '--xala-ring': xalaColors.primary[400],
    '--xala-destructive': xalaColors.semantic.error[400],
    '--xala-destructive-foreground': xalaColors.text.inverse,
  },
} as const;

/**
 * Generate CSS string for theme variables
 */
export const generateCSSVariables = (theme: 'light' | 'dark' = 'light'): string => {
  const variables = cssVariables[theme];
  return Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
};

/**
 * Apply theme to document root
 */
export const applyTheme = (theme: 'light' | 'dark' = 'light'): void => {
  const root = document.documentElement;
  const variables = cssVariables[theme];
  
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};

/**
 * Create theme-specific CSS classes
 */
export const createThemeClasses = (): string => {
  return `
    .xala-theme-light {
      ${generateCSSVariables('light')}
    }
    
    .xala-theme-dark {
      ${generateCSSVariables('dark')}
    }
    
    :root {
      ${generateCSSVariables('light')}
    }
    
    @media (prefers-color-scheme: dark) {
      :root {
        ${generateCSSVariables('dark')}
      }
    }
  `;
};

/**
 * Utility function to get CSS variable value
 */
export const getCSSVariable = (variableName: string): string => {
  return `var(${variableName})`;
};

/**
 * Tailwind CSS configuration for Xala colors
 */
export const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          50: getCSSVariable('--xala-primary-50'),
          100: getCSSVariable('--xala-primary-100'),
          200: getCSSVariable('--xala-primary-200'),
          300: getCSSVariable('--xala-primary-300'),
          400: getCSSVariable('--xala-primary-400'),
          500: getCSSVariable('--xala-primary-500'),
          600: getCSSVariable('--xala-primary-600'),
          700: getCSSVariable('--xala-primary-700'),
          800: getCSSVariable('--xala-primary-800'),
          900: getCSSVariable('--xala-primary-900'),
          DEFAULT: getCSSVariable('--xala-primary-500'),
        },
        
        // Secondary colors
        secondary: {
          50: getCSSVariable('--xala-secondary-50'),
          100: getCSSVariable('--xala-secondary-100'),
          200: getCSSVariable('--xala-secondary-200'),
          300: getCSSVariable('--xala-secondary-300'),
          400: getCSSVariable('--xala-secondary-400'),
          500: getCSSVariable('--xala-secondary-500'),
          600: getCSSVariable('--xala-secondary-600'),
          700: getCSSVariable('--xala-secondary-700'),
          800: getCSSVariable('--xala-secondary-800'),
          900: getCSSVariable('--xala-secondary-900'),
          DEFAULT: getCSSVariable('--xala-secondary-500'),
        },
        
        // Semantic colors
        success: {
          50: getCSSVariable('--xala-success-50'),
          100: getCSSVariable('--xala-success-100'),
          200: getCSSVariable('--xala-success-200'),
          300: getCSSVariable('--xala-success-300'),
          400: getCSSVariable('--xala-success-400'),
          500: getCSSVariable('--xala-success-500'),
          600: getCSSVariable('--xala-success-600'),
          700: getCSSVariable('--xala-success-700'),
          800: getCSSVariable('--xala-success-800'),
          900: getCSSVariable('--xala-success-900'),
          DEFAULT: getCSSVariable('--xala-success-500'),
        },
        
        warning: {
          50: getCSSVariable('--xala-warning-50'),
          100: getCSSVariable('--xala-warning-100'),
          200: getCSSVariable('--xala-warning-200'),
          300: getCSSVariable('--xala-warning-300'),
          400: getCSSVariable('--xala-warning-400'),
          500: getCSSVariable('--xala-warning-500'),
          600: getCSSVariable('--xala-warning-600'),
          700: getCSSVariable('--xala-warning-700'),
          800: getCSSVariable('--xala-warning-800'),
          900: getCSSVariable('--xala-warning-900'),
          DEFAULT: getCSSVariable('--xala-warning-500'),
        },
        
        error: {
          50: getCSSVariable('--xala-error-50'),
          100: getCSSVariable('--xala-error-100'),
          200: getCSSVariable('--xala-error-200'),
          300: getCSSVariable('--xala-error-300'),
          400: getCSSVariable('--xala-error-400'),
          500: getCSSVariable('--xala-error-500'),
          600: getCSSVariable('--xala-error-600'),
          700: getCSSVariable('--xala-error-700'),
          800: getCSSVariable('--xala-error-800'),
          900: getCSSVariable('--xala-error-900'),
          DEFAULT: getCSSVariable('--xala-error-500'),
        },
        
        info: {
          50: getCSSVariable('--xala-info-50'),
          100: getCSSVariable('--xala-info-100'),
          200: getCSSVariable('--xala-info-200'),
          300: getCSSVariable('--xala-info-300'),
          400: getCSSVariable('--xala-info-400'),
          500: getCSSVariable('--xala-info-500'),
          600: getCSSVariable('--xala-info-600'),
          700: getCSSVariable('--xala-info-700'),
          800: getCSSVariable('--xala-info-800'),
          900: getCSSVariable('--xala-info-900'),
          DEFAULT: getCSSVariable('--xala-info-500'),
        },
        
        // Neutral colors
        neutral: {
          50: getCSSVariable('--xala-neutral-50'),
          100: getCSSVariable('--xala-neutral-100'),
          200: getCSSVariable('--xala-neutral-200'),
          300: getCSSVariable('--xala-neutral-300'),
          400: getCSSVariable('--xala-neutral-400'),
          500: getCSSVariable('--xala-neutral-500'),
          600: getCSSVariable('--xala-neutral-600'),
          700: getCSSVariable('--xala-neutral-700'),
          800: getCSSVariable('--xala-neutral-800'),
          900: getCSSVariable('--xala-neutral-900'),
        },
        
        // Semantic component colors
        foreground: getCSSVariable('--xala-foreground'),
        background: getCSSVariable('--xala-background'),
        muted: getCSSVariable('--xala-muted'),
        'muted-foreground': getCSSVariable('--xala-muted-foreground'),
        popover: getCSSVariable('--xala-popover'),
        'popover-foreground': getCSSVariable('--xala-popover-foreground'),
        card: getCSSVariable('--xala-card'),
        'card-foreground': getCSSVariable('--xala-card-foreground'),
        input: getCSSVariable('--xala-input'),
        ring: getCSSVariable('--xala-ring'),
        destructive: getCSSVariable('--xala-destructive'),
        'destructive-foreground': getCSSVariable('--xala-destructive-foreground'),
      },
    },
  },
};

/**
 * Export theme utilities
 */
export const xalaTheme = {
  cssVariables,
  generateCSSVariables,
  applyTheme,
  createThemeClasses,
  getCSSVariable,
  tailwindConfig,
};

export default xalaTheme; 