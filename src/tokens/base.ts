/**
 * Base Design Token System
 * Core tokens that define the design language for Xala UI System v5.0.0
 * All tokens follow the 8pt grid and WCAG 2.2 AAA accessibility standards
 */

/**
 * @name TokenSystem
 * @description Base token system structure for theming and white-labeling
 */
export const baseTokens = {
  /**
   * Color Tokens
   * Primary colors and semantic color assignments
   */
  colors: {
    // Primary brand colors
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3', // Primary default
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      1000: '#0a0a0a',
    },
    // Secondary accent colors
    secondary: {
      50: '#fce4ec',
      100: '#f8bbd9',
      200: '#f48fb1',
      300: '#f06292',
      400: '#ec407a',
      500: '#e91e63', // Secondary default
      600: '#d81b60',
      700: '#c2185b',
      800: '#ad1457',
      900: '#880e4f',
      1000: '#4a0e2c',
    },
    // Success states
    success: {
      50: '#e8f5e8',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50', // Success default
      600: '#43a047',
      700: '#388e3c',
      800: '#2e7d32',
      900: '#1b5e20',
      1000: '#0d2d0d',
    },
    // Warning states
    warning: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107', // Warning default
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
      1000: '#331800',
    },
    // Error states
    error: {
      50: '#ffebee',
      100: '#ffcdd2',
      200: '#ef9a9a',
      300: '#e57373',
      400: '#ef5350',
      500: '#f44336', // Error default
      600: '#e53935',
      700: '#d32f2f',
      800: '#c62828',
      900: '#b71c1c',
      1000: '#3e0a0a',
    },
    // Info states
    info: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3', // Info default
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
      1000: '#051a33',
    },
    // Neutral colors
    neutral: {
      50: '#fafafa', // Lightest
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e', // Medium
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121', // Darkest
      1000: '#121212', // Extra dark for surfaces
    },
    // Semantic color assignments
    background: {
      light: '#ffffff',
      dark: '#121212',
    },
    foreground: {
      light: '#212121',
      dark: '#ffffff',
    },
    border: {
      light: '#e0e0e0',
      dark: '#424242',
    },
    surface: {
      light: '#ffffff',
      dark: '#1e1e1e',
    },
    surfaceAlt: {
      light: '#f5f5f5',
      dark: '#2e2e2e',
    }
  },

  /**
   * Typography
   * Font families, sizes, weights, and line heights
   */
  typography: {
    // Font families
    families: {
      primary: '"Nunito", "Helvetica Neue", -apple-system, sans-serif',
      secondary: '"Inter", "Segoe UI", -apple-system, sans-serif',
      mono: '"Fira Code", "Consolas", "Monaco", monospace',
    },
    // Font weights
    weights: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '900',
    },
    // Font sizes (follows 8pt grid)
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
    },
    // Line heights
    lineHeights: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    }
  },

  /**
   * Spacing
   * All spacing values follow the 8pt grid system
   */
  spacing: {
    '0': '0',
    '1': '0.25rem',  // 4px
    '2': '0.5rem',   // 8px
    '3': '0.75rem',  // 12px
    '4': '1rem',     // 16px
    '5': '1.25rem',  // 20px
    '6': '1.5rem',   // 24px
    '8': '2rem',     // 32px
    '10': '2.5rem',  // 40px
    '12': '3rem',    // 48px
    '16': '4rem',    // 64px
    '20': '5rem',    // 80px
    '24': '6rem',    // 96px
    '32': '8rem',    // 128px
    '40': '10rem',   // 160px
    '48': '12rem',   // 192px
    '56': '14rem',   // 224px
    '64': '16rem',   // 256px
  },

  /**
   * Border radius
   * From straight to fully rounded corners
   */
  radius: {
    none: '0',
    xs: '0.125rem',    // 2px
    sm: '0.25rem',     // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
    organic: '0.75rem 1.5rem 0.75rem 1.5rem',
  },

  /**
   * Shadows
   * Elevation levels for depth and hierarchy
   */
  shadows: {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.07), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
  },

  /**
   * Motion
   * Animation timing functions and durations
   */
  motion: {
    ease: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      sacred: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    duration: {
      instant: '150ms',
      fast: '250ms',
      normal: '350ms',
      slow: '500ms',
      slower: '750ms',
      slowest: '1000ms',
      sacred: '2000ms',
      prayer: '3000ms',
    },
  },

  /**
   * Component tokens
   * Default values for component design variants
   */
  components: {
    button: {
      padding: {
        sm: '0.5rem 1rem',    // 8px 16px
        md: '0.75rem 1.5rem', // 12px 24px
        lg: '1rem 2rem',      // 16px 32px
      },
      radius: {
        default: '0.375rem',  // 6px
        pill: '9999px',
        organic: '0.75rem 1.5rem 0.75rem 1.5rem',
      },
    },
    input: {
      padding: {
        sm: '0.5rem',     // 8px
        md: '0.75rem',    // 12px
        lg: '1rem',       // 16px
      },
      radius: '0.375rem', // 6px
      borderWidth: '1px',
    },
    card: {
      padding: {
        sm: '1rem',     // 16px
        md: '1.5rem',   // 24px
        lg: '2rem',     // 32px
      },
      radius: '0.5rem', // 8px
      borderWidth: '1px',
    }
  },

  /**
   * Screen breakpoints
   * Used for responsive design
   */
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Z-index scale
   * For managing stacking contexts
   */
  zIndex: {
    hide: -1,
    base: 0,
    raised: 1,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500,
    tooltip: 1600,
    overlay: 1800,
    top: 2000,
    auto: 'auto',
    docked: 100,
    banner: 500,
    skipLink: 9999,
  },
};

/**
 * Type definition for the token system
 * This enables strong typing when using tokens
 */
export type TokenSystem = typeof baseTokens;

/**
 * Export base tokens as default
 */
export default baseTokens;
