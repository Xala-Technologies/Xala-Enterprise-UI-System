/**
 * Xala Design System Components
 * Based on Equinor Design System with WCAG AAA accessibility compliance
 */

// Form components
export { Button, ButtonGroup, IconButton, type ButtonProps, type ButtonSize, type ButtonVariant } from './Button';
export { Input, type InputProps, type InputSize, type InputVariant } from './Input';

// Re-export accessibility utilities
export { xalaAccessibility } from '@/lib/accessibility/wcag-aaa';

// Re-export design tokens
export { xalaTheme } from '@/tokens/css-variables';
export { xalaColors } from '@/tokens/xala-colors';

/**
 * Xala component library version
 */
export const XALA_VERSION = '1.0.0';

/**
 * Xala design system info
 */
export const XALA_INFO = {
  name: 'Xala Design System',
  version: XALA_VERSION,
  description: 'Enterprise-grade design system with WCAG AAA accessibility compliance',
  author: 'Xala Technologies',
  license: 'MIT',
  wcagCompliance: 'AAA',
  accessibility: {
    contrastRatio: '7:1 for normal text, 4.5:1 for large text',
    touchTargets: '44px minimum',
    keyboardNavigation: 'Full support',
    screenReader: 'Optimized',
    reducedMotion: 'Supported',
  },
};

/**
 * Component categories for organization
 */
export const XALA_CATEGORIES = {
  FORM: 'Form Components',
  NAVIGATION: 'Navigation Components',
  FEEDBACK: 'Feedback Components',
  DATA_DISPLAY: 'Data Display Components',
  LAYOUT: 'Layout Components',
  OVERLAY: 'Overlay Components',
} as const;

/**
 * Component registry for dynamic imports
 */
export const XALA_COMPONENTS = {
  // Form components
  Button: {
    name: 'Button',
    category: XALA_CATEGORIES.FORM,
    description: 'Interactive button component with multiple variants',
    wcagCompliant: true,
    touchOptimized: true,
  },
  Input: {
    name: 'Input',
    category: XALA_CATEGORIES.FORM,
    description: 'Text input component with validation states',
    wcagCompliant: true,
    touchOptimized: true,
  },
} as const; 