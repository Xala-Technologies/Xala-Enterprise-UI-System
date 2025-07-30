/**
 * @fileoverview Dark Theme Implementation
 * @description Dark theme tokens for Xala UI System v5.0.0
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards
 */

import type { PartialDeep } from 'type-fest';
import type { TokenSystem } from '../base';

/**
 * Dark theme token overrides
 * Optimized for reduced eye strain and high contrast in dark environments
 */
export const darkTheme = {
  colors: {
    background: {
      light: '#0a0a0a',
      dark: '#171717',
    },
    foreground: {
      light: '#fafafa',
      dark: '#e5e5e5',
    },
    border: {
      light: '#262626',
      dark: '#404040',
    },
    surface: {
      light: '#171717',
      dark: '#262626',
    },
    surfaceAlt: {
      light: '#262626',
      dark: '#404040',
    },
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.6), 0 4px 6px rgba(0, 0, 0, 0.5)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.7), 0 10px 10px rgba(0, 0, 0, 0.6)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.8)',
  },
};

export default darkTheme;
