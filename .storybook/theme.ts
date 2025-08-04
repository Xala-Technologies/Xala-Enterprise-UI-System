/**
 * @fileoverview Storybook Theme Configuration
 * @description Custom theme for Xala Enterprise UI System documentation
 * @version 6.0.0
 * @compliance Norwegian Standards, Enterprise Grade
 */

import { create } from '@storybook/theming/create';

/**
 * Enterprise theme for Storybook UI
 * Follows Norwegian government design guidelines
 */
export default create({
  // Base theme
  base: 'light',

  // Brand
  brandTitle: 'Xala Enterprise UI System v6.1',
  brandUrl: 'https://github.com/xala-technologies/ui-system',
  brandImage: undefined, // Add logo path if available
  brandTarget: '_self',

  // Colors - Norwegian government palette
  colorPrimary: '#0062ba', // Norwegian blue
  colorSecondary: '#38bdf8', // Sky blue
  
  // UI Colors
  appBg: '#fafafa',
  appContentBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 8,
  
  // Typography - Norwegian standard fonts
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "Monaco", "Courier New", monospace',
  
  // Text colors
  textColor: '#0a0a0a',
  textInverseColor: '#ffffff',
  textMutedColor: '#737373',
  
  // Toolbar colors
  barTextColor: '#737373',
  barSelectedColor: '#0062ba',
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d4d4d4',
  inputTextColor: '#0a0a0a',
  inputBorderRadius: 6,
});

/**
 * Dark theme configuration for accessibility
 */
export const darkTheme = create({
  base: 'dark',
  
  brandTitle: 'Xala Enterprise UI System v6.1 (Dark)',
  brandUrl: 'https://github.com/xala-technologies/ui-system',
  
  colorPrimary: '#38bdf8',
  colorSecondary: '#0062ba',
  
  appBg: '#0a0a0a',
  appContentBg: '#171717',
  appBorderColor: '#262626',
  appBorderRadius: 8,
  
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "Monaco", "Courier New", monospace',
  
  textColor: '#fafafa',
  textInverseColor: '#0a0a0a',
  textMutedColor: '#a3a3a3',
  
  barTextColor: '#a3a3a3',
  barSelectedColor: '#38bdf8',
  barBg: '#171717',
  
  inputBg: '#262626',
  inputBorder: '#404040',
  inputTextColor: '#fafafa',
  inputBorderRadius: 6,
});

/**
 * High contrast theme for WCAG AAA compliance
 */
export const highContrastTheme = create({
  base: 'light',
  
  brandTitle: 'Xala Enterprise UI System v6.1 (High Contrast)',
  brandUrl: 'https://github.com/xala-technologies/ui-system',
  
  colorPrimary: '#000000',
  colorSecondary: '#0062ba',
  
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#000000',
  appBorderRadius: 0,
  
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode: '"JetBrains Mono", "Monaco", "Courier New", monospace',
  
  textColor: '#000000',
  textInverseColor: '#ffffff',
  textMutedColor: '#404040',
  
  barTextColor: '#000000',
  barSelectedColor: '#000000',
  barBg: '#ffffff',
  
  inputBg: '#ffffff',
  inputBorder: '#000000',
  inputTextColor: '#000000',
  inputBorderRadius: 0,
});