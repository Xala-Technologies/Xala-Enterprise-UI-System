/**
 * @fileoverview Light Theme Implementation
 * @description Light theme tokens for Xala UI System v5.0.0
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards
 */

import type { PartialDeep } from 'type-fest';
import type { TokenSystem } from '../base';

/**
 * Light theme token overrides
 * Optimized for high contrast and readability in light environments
 */
export const lightTheme = {
  colors: {
    background: {
      light: '#ffffff',
      dark: '#fafafa',
    },
    foreground: {
      light: '#0a0a0a',
      dark: '#404040',
    },
    border: {
      light: '#e5e5e5',
      dark: '#d4d4d4',
    },
    surface: {
      light: '#ffffff',
      dark: '#fafafa',
    },
    surfaceAlt: {
      light: '#fafafa',
      dark: '#f5f5f5',
    },
  },
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
  },
};

export default lightTheme;
