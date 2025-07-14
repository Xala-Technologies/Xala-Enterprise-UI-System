// Color tokens for @xala-mock/ui-system
// Norwegian-compliant colors with WCAG 2.2 AA contrast ratios

// Base Norwegian flag-inspired color palette
export const baseColors = {
  // Primary colors - Norwegian flag inspired
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Norwegian red
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626', // Main red
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Success green
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a', // Main green
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning orange
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c', // Main orange
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },

  // Neutral grays
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Pure colors for accessibility
  white: '#ffffff',
  black: '#000000',
};

// Norwegian municipality theme colors
export const municipalityColors = {
  drammen: {
    primary: baseColors.primary[500], // Blue
    secondary: baseColors.red[600], // Red
    accent: baseColors.green[600], // Green
  },
  oslo: {
    primary: baseColors.red[600], // Red
    secondary: baseColors.white, // White
    accent: baseColors.primary[700], // Dark Blue
  },
  bergen: {
    primary: '#0369a1', // Navy
    secondary: baseColors.orange[600], // Orange
    accent: baseColors.primary[500], // Blue
  },
  trondheim: {
    primary: baseColors.green[600], // Green
    secondary: baseColors.primary[500], // Blue
    accent: baseColors.orange[500], // Orange
  },
  stavanger: {
    primary: '#7c3aed', // Purple
    secondary: baseColors.red[600], // Red
    accent: baseColors.green[600], // Green
  },
};

// Light/Dark mode variants
export const lightModeColors = {
  background: {
    primary: baseColors.white,
    secondary: baseColors.gray[50],
    tertiary: baseColors.gray[100],
  },
  surface: {
    primary: baseColors.white,
    secondary: baseColors.gray[50],
    elevated: baseColors.white,
  },
  text: {
    primary: baseColors.gray[900],
    secondary: baseColors.gray[600],
    disabled: baseColors.gray[400],
    inverse: baseColors.white,
  },
  border: {
    primary: baseColors.gray[200],
    secondary: baseColors.gray[300],
    focus: baseColors.primary[500],
  },
};

export const darkModeColors = {
  background: {
    primary: baseColors.gray[900],
    secondary: baseColors.gray[800],
    tertiary: baseColors.gray[700],
  },
  surface: {
    primary: baseColors.gray[800],
    secondary: baseColors.gray[700],
    elevated: baseColors.gray[600],
  },
  text: {
    primary: baseColors.white,
    secondary: baseColors.gray[300],
    disabled: baseColors.gray[500],
    inverse: baseColors.gray[900],
  },
  border: {
    primary: baseColors.gray[700],
    secondary: baseColors.gray[600],
    focus: baseColors.primary[400],
  },
};

// State colors for interactions
export const stateColors = {
  hover: {
    primary: baseColors.primary[600],
    secondary: baseColors.gray[100],
    surface: baseColors.gray[50],
  },
  active: {
    primary: baseColors.primary[700],
    secondary: baseColors.gray[200],
    surface: baseColors.gray[100],
  },
  disabled: {
    background: baseColors.gray[100],
    text: baseColors.gray[400],
    border: baseColors.gray[200],
  },
  focus: {
    ring: baseColors.primary[500],
    background: baseColors.primary[50],
  },
};

// Semantic color mappings
export const semanticColors = {
  success: baseColors.green[600],
  warning: baseColors.orange[600],
  error: baseColors.red[600],
  info: baseColors.primary[600],
};

// Complete color system export
export const colors = {
  ...baseColors,
  municipality: municipalityColors,
  light: lightModeColors,
  dark: darkModeColors,
  states: stateColors,
  semantic: semanticColors,
};

// CSS custom properties for color tokens
export const colorTokens = {
  // Primary colors
  '--color-primary-50': baseColors.primary[50],
  '--color-primary-100': baseColors.primary[100],
  '--color-primary-200': baseColors.primary[200],
  '--color-primary-300': baseColors.primary[300],
  '--color-primary-400': baseColors.primary[400],
  '--color-primary-500': baseColors.primary[500],
  '--color-primary-600': baseColors.primary[600],
  '--color-primary-700': baseColors.primary[700],
  '--color-primary-800': baseColors.primary[800],
  '--color-primary-900': baseColors.primary[900],

  // Red colors
  '--color-red-50': baseColors.red[50],
  '--color-red-100': baseColors.red[100],
  '--color-red-200': baseColors.red[200],
  '--color-red-300': baseColors.red[300],
  '--color-red-400': baseColors.red[400],
  '--color-red-500': baseColors.red[500],
  '--color-red-600': baseColors.red[600],
  '--color-red-700': baseColors.red[700],
  '--color-red-800': baseColors.red[800],
  '--color-red-900': baseColors.red[900],

  // Green colors
  '--color-green-50': baseColors.green[50],
  '--color-green-100': baseColors.green[100],
  '--color-green-200': baseColors.green[200],
  '--color-green-300': baseColors.green[300],
  '--color-green-400': baseColors.green[400],
  '--color-green-500': baseColors.green[500],
  '--color-green-600': baseColors.green[600],
  '--color-green-700': baseColors.green[700],
  '--color-green-800': baseColors.green[800],
  '--color-green-900': baseColors.green[900],

  // Orange colors
  '--color-orange-50': baseColors.orange[50],
  '--color-orange-100': baseColors.orange[100],
  '--color-orange-200': baseColors.orange[200],
  '--color-orange-300': baseColors.orange[300],
  '--color-orange-400': baseColors.orange[400],
  '--color-orange-500': baseColors.orange[500],
  '--color-orange-600': baseColors.orange[600],
  '--color-orange-700': baseColors.orange[700],
  '--color-orange-800': baseColors.orange[800],
  '--color-orange-900': baseColors.orange[900],

  // Gray colors
  '--color-gray-50': baseColors.gray[50],
  '--color-gray-100': baseColors.gray[100],
  '--color-gray-200': baseColors.gray[200],
  '--color-gray-300': baseColors.gray[300],
  '--color-gray-400': baseColors.gray[400],
  '--color-gray-500': baseColors.gray[500],
  '--color-gray-600': baseColors.gray[600],
  '--color-gray-700': baseColors.gray[700],
  '--color-gray-800': baseColors.gray[800],
  '--color-gray-900': baseColors.gray[900],

  // Pure colors
  '--color-white': baseColors.white,
  '--color-black': baseColors.black,

  // Semantic colors
  '--color-success': semanticColors.success,
  '--color-warning': semanticColors.warning,
  '--color-error': semanticColors.error,
  '--color-info': semanticColors.info,
};
