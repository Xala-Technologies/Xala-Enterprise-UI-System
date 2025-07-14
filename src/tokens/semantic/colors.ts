/**
 * @fileoverview Semantic Color Tokens - Intent-based Color System
 * @description Semantic color assignments following industry standards (Airbnb, Booking.com, NSM)
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA, NSM, DigDir
 */

import { globalColorPrimitives } from '../global-tokens';

// =============================================================================
// SEMANTIC COLOR TOKENS - Intent-based color assignments
// =============================================================================

/**
 * Brand color tokens - Primary brand identity
 */
export const brandColorTokens = {
  primary: globalColorPrimitives.xala[500],
  'primary-hover': globalColorPrimitives.xala[600],
  'primary-active': globalColorPrimitives.xala[700],
  'primary-disabled': globalColorPrimitives.xala[300],
  'primary-subtle': globalColorPrimitives.xala[50],
  'primary-emphasis': globalColorPrimitives.xala[700],
  'primary-foreground': globalColorPrimitives.neutral[0],
} as const;

/**
 * Background color tokens - Surface and container colors
 */
export const backgroundColorTokens = {
  primary: globalColorPrimitives.neutral[0],
  secondary: globalColorPrimitives.neutral[50],
  tertiary: globalColorPrimitives.neutral[100],
  inverse: globalColorPrimitives.neutral[900],
  disabled: globalColorPrimitives.neutral[100],
  elevated: globalColorPrimitives.neutral[0],
  overlay: 'rgba(0, 0, 0, 0.5)',
  'overlay-light': 'rgba(0, 0, 0, 0.1)',
  'overlay-dark': 'rgba(0, 0, 0, 0.8)',
} as const;

/**
 * Foreground color tokens - Text and icon colors
 */
export const foregroundColorTokens = {
  primary: globalColorPrimitives.neutral[900],
  secondary: globalColorPrimitives.neutral[700],
  tertiary: globalColorPrimitives.neutral[500],
  inverse: globalColorPrimitives.neutral[0],
  disabled: globalColorPrimitives.neutral[400],
  placeholder: globalColorPrimitives.neutral[400],
  'on-brand': globalColorPrimitives.neutral[0],
  'on-accent': globalColorPrimitives.neutral[0],
} as const;

/**
 * Border color tokens - Outline and separator colors
 */
export const borderColorTokens = {
  primary: globalColorPrimitives.neutral[200],
  secondary: globalColorPrimitives.neutral[300],
  tertiary: globalColorPrimitives.neutral[100],
  inverse: globalColorPrimitives.neutral[700],
  disabled: globalColorPrimitives.neutral[200],
  focus: globalColorPrimitives.xala[500],
  'focus-visible': globalColorPrimitives.xala[600],
  interactive: globalColorPrimitives.xala[300],
} as const;

/**
 * Interactive color tokens - Button and link colors
 */
export const interactiveColorTokens = {
  primary: globalColorPrimitives.xala[500],
  'primary-hover': globalColorPrimitives.xala[600],
  'primary-active': globalColorPrimitives.xala[700],
  'primary-disabled': globalColorPrimitives.xala[300],
  'primary-subtle': globalColorPrimitives.xala[50],
  'primary-emphasis': globalColorPrimitives.xala[700],
  
  secondary: globalColorPrimitives.neutral[600],
  'secondary-hover': globalColorPrimitives.neutral[700],
  'secondary-active': globalColorPrimitives.neutral[800],
  'secondary-disabled': globalColorPrimitives.neutral[300],
  'secondary-subtle': globalColorPrimitives.neutral[50],
  'secondary-emphasis': globalColorPrimitives.neutral[800],
} as const;

/**
 * State color tokens - Success, warning, error, info states
 */
export const stateColorTokens = {
  // Success states
  success: globalColorPrimitives.green[500],
  'success-hover': globalColorPrimitives.green[600],
  'success-active': globalColorPrimitives.green[700],
  'success-disabled': globalColorPrimitives.green[300],
  'success-subtle': globalColorPrimitives.green[50],
  'success-emphasis': globalColorPrimitives.green[700],
  'success-foreground': globalColorPrimitives.green[700],
  'success-border': globalColorPrimitives.green[200],

  // Warning states
  warning: globalColorPrimitives.yellow[500],
  'warning-hover': globalColorPrimitives.yellow[600],
  'warning-active': globalColorPrimitives.yellow[700],
  'warning-disabled': globalColorPrimitives.yellow[300],
  'warning-subtle': globalColorPrimitives.yellow[50],
  'warning-emphasis': globalColorPrimitives.yellow[700],
  'warning-foreground': globalColorPrimitives.yellow[800],
  'warning-border': globalColorPrimitives.yellow[200],

  // Error states
  error: globalColorPrimitives.red[500],
  'error-hover': globalColorPrimitives.red[600],
  'error-active': globalColorPrimitives.red[700],
  'error-disabled': globalColorPrimitives.red[300],
  'error-subtle': globalColorPrimitives.red[50],
  'error-emphasis': globalColorPrimitives.red[700],
  'error-foreground': globalColorPrimitives.red[700],
  'error-border': globalColorPrimitives.red[200],

  // Info states
  info: globalColorPrimitives.blue[500],
  'info-hover': globalColorPrimitives.blue[600],
  'info-active': globalColorPrimitives.blue[700],
  'info-disabled': globalColorPrimitives.blue[300],
  'info-subtle': globalColorPrimitives.blue[50],
  'info-emphasis': globalColorPrimitives.blue[700],
  'info-foreground': globalColorPrimitives.blue[700],
  'info-border': globalColorPrimitives.blue[200],
} as const;

/**
 * Norwegian NSM classification color tokens
 * Based on NSM (Norwegian Security Authority) standards
 */
export const nsmClassificationColorTokens = {
  // ÅPEN (Open) - Green
  open: globalColorPrimitives.green[500],
  'open-subtle': globalColorPrimitives.green[50],
  'open-emphasis': globalColorPrimitives.green[700],
  'open-foreground': globalColorPrimitives.green[700],
  'open-border': globalColorPrimitives.green[200],

  // BEGRENSET (Restricted) - Yellow
  restricted: globalColorPrimitives.yellow[500],
  'restricted-subtle': globalColorPrimitives.yellow[50],
  'restricted-emphasis': globalColorPrimitives.yellow[700],
  'restricted-foreground': globalColorPrimitives.yellow[800],
  'restricted-border': globalColorPrimitives.yellow[200],

  // KONFIDENSIELT (Confidential) - Red
  confidential: globalColorPrimitives.red[500],
  'confidential-subtle': globalColorPrimitives.red[50],
  'confidential-emphasis': globalColorPrimitives.red[700],
  'confidential-foreground': globalColorPrimitives.red[700],
  'confidential-border': globalColorPrimitives.red[200],

  // HEMMELIG (Secret) - Dark Gray
  secret: globalColorPrimitives.neutral[800],
  'secret-subtle': globalColorPrimitives.neutral[100],
  'secret-emphasis': globalColorPrimitives.neutral[900],
  'secret-foreground': globalColorPrimitives.neutral[0],
  'secret-border': globalColorPrimitives.neutral[600],
} as const;

// =============================================================================
// CONSOLIDATED SEMANTIC COLOR TOKENS
// =============================================================================

/**
 * All semantic color tokens consolidated
 */
export const semanticColorTokens = {
  brand: brandColorTokens,
  background: backgroundColorTokens,
  foreground: foregroundColorTokens,
  border: borderColorTokens,
  interactive: interactiveColorTokens,
  state: stateColorTokens,
  nsm: nsmClassificationColorTokens,
} as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type BrandColorTokens = typeof brandColorTokens;
export type BackgroundColorTokens = typeof backgroundColorTokens;
export type ForegroundColorTokens = typeof foregroundColorTokens;
export type BorderColorTokens = typeof borderColorTokens;
export type InteractiveColorTokens = typeof interactiveColorTokens;
export type StateColorTokens = typeof stateColorTokens;
export type NSMClassificationColorTokens = typeof nsmClassificationColorTokens;
export type SemanticColorTokens = typeof semanticColorTokens; 