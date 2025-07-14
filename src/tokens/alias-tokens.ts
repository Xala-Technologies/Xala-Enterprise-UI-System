/**
 * @fileoverview Alias Design Tokens - Semantic Layer
 * @description Semantic token assignments using global primitive tokens
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA
 */

import { globalAnimationDurations,
    globalAnimationEasings,
    globalBorderRadius,
    globalBorderWidths,
    globalBreakpoints,
    globalColorPrimitives,
    globalFontFamilies,
    globalFontSizes,
    globalFontWeights,
    globalLetterSpacing,
    globalLineHeights,
    globalShadows,
    globalSpacingPrimitives,
    globalZIndices, } from './global-tokens';

// =============================================================================
// SEMANTIC COLOR TOKENS - Intent-based color assignments
// =============================================================================

/**
 * Semantic color tokens - maps primitive colors to intent-based names
 * These tokens should be used instead of primitive colors in components
 */
export const aliasColorTokens = { // Brand colors
  brand: { primary: globalColorPrimitives.xala[500],
    'primary-hover': globalColorPrimitives.xala[600],
    'primary-active': globalColorPrimitives.xala[700],
    'primary-disabled': globalColorPrimitives.xala[300],
    'primary-subtle': globalColorPrimitives.xala[50],
    'primary-emphasis': globalColorPrimitives.xala[700], },
  
  // Background colors
  background: { primary: globalColorPrimitives.neutral[0],
    secondary: globalColorPrimitives.neutral[50],
    tertiary: globalColorPrimitives.neutral[100],
    inverse: globalColorPrimitives.neutral[900],
    disabled: globalColorPrimitives.neutral[100],
    elevated: globalColorPrimitives.neutral[0],
    overlay: 'rgba(0, 0, 0, 0.5)',
    'overlay-light': 'rgba(0, 0, 0, 0.1)',
    'overlay-dark': 'rgba(0, 0, 0, 0.8)', },
  
  // Foreground colors
  foreground: { primary: globalColorPrimitives.neutral[900],
    secondary: globalColorPrimitives.neutral[700],
    tertiary: globalColorPrimitives.neutral[500],
    inverse: globalColorPrimitives.neutral[0],
    disabled: globalColorPrimitives.neutral[400],
    placeholder: globalColorPrimitives.neutral[400],
    'on-brand': globalColorPrimitives.neutral[0],
    'on-accent': globalColorPrimitives.neutral[0], },
  
  // Border colors
  border: { primary: globalColorPrimitives.neutral[200],
    secondary: globalColorPrimitives.neutral[300],
    tertiary: globalColorPrimitives.neutral[100],
    inverse: globalColorPrimitives.neutral[700],
    disabled: globalColorPrimitives.neutral[200],
    focus: globalColorPrimitives.xala[500],
    'focus-visible': globalColorPrimitives.xala[600],
    interactive: globalColorPrimitives.xala[300], },
  
  // State colors
  state: { // Success states
    'success-primary': globalColorPrimitives.green[500],
    'success-hover': globalColorPrimitives.green[600],
    'success-active': globalColorPrimitives.green[700],
    'success-disabled': globalColorPrimitives.green[300],
    'success-subtle': globalColorPrimitives.green[50],
    'success-emphasis': globalColorPrimitives.green[700],
    'success-foreground': globalColorPrimitives.green[700],
    'success-border': globalColorPrimitives.green[200],
    
    // Warning states
    'warning-primary': globalColorPrimitives.yellow[500],
    'warning-hover': globalColorPrimitives.yellow[600],
    'warning-active': globalColorPrimitives.yellow[700],
    'warning-disabled': globalColorPrimitives.yellow[300],
    'warning-subtle': globalColorPrimitives.yellow[50],
    'warning-emphasis': globalColorPrimitives.yellow[700],
    'warning-foreground': globalColorPrimitives.yellow[800],
    'warning-border': globalColorPrimitives.yellow[200],
    
    // Error states
    'error-primary': globalColorPrimitives.red[500],
    'error-hover': globalColorPrimitives.red[600],
    'error-active': globalColorPrimitives.red[700],
    'error-disabled': globalColorPrimitives.red[300],
    'error-subtle': globalColorPrimitives.red[50],
    'error-emphasis': globalColorPrimitives.red[700],
    'error-foreground': globalColorPrimitives.red[700],
    'error-border': globalColorPrimitives.red[200],
    
    // Info states
    'info-primary': globalColorPrimitives.blue[500],
    'info-hover': globalColorPrimitives.blue[600],
    'info-active': globalColorPrimitives.blue[700],
    'info-disabled': globalColorPrimitives.blue[300],
    'info-subtle': globalColorPrimitives.blue[50],
    'info-emphasis': globalColorPrimitives.blue[700],
    'info-foreground': globalColorPrimitives.blue[700],
    'info-border': globalColorPrimitives.blue[200], },
  
  // Interactive colors
  interactive: { primary: globalColorPrimitives.xala[500],
    'primary-hover': globalColorPrimitives.xala[600],
    'primary-active': globalColorPrimitives.xala[700],
    'primary-disabled': globalColorPrimitives.xala[300],
    'primary-loading': globalColorPrimitives.xala[400],
    
    secondary: globalColorPrimitives.neutral[100],
    'secondary-hover': globalColorPrimitives.neutral[200],
    'secondary-active': globalColorPrimitives.neutral[300],
    'secondary-disabled': globalColorPrimitives.neutral[100],
    
    tertiary: globalColorPrimitives.transparent,
    'tertiary-hover': globalColorPrimitives.neutral[50],
    'tertiary-active': globalColorPrimitives.neutral[100],
    'tertiary-disabled': globalColorPrimitives.transparent,
    
    // Link colors
    link: globalColorPrimitives.xala[500],
    'link-hover': globalColorPrimitives.xala[600],
    'link-active': globalColorPrimitives.xala[700],
    'link-visited': globalColorPrimitives.xala[800],
    'link-disabled': globalColorPrimitives.neutral[400], },
  
  // Utility colors
  utility: { transparent: globalColorPrimitives.transparent,
    current: globalColorPrimitives.current,
    white: globalColorPrimitives.neutral[0],
    black: globalColorPrimitives.neutral[1000], }, } as const;

// =============================================================================
// SEMANTIC SPACING TOKENS - Intent-based spacing assignments
// =============================================================================

/**
 * Semantic spacing tokens - maps primitive spacing to intent-based names
 */
export const aliasSpacingTokens = { // Component internal spacing
  'component-padding': { xs: globalSpacingPrimitives[2],
    sm: globalSpacingPrimitives[3],
    md: globalSpacingPrimitives[4],
    lg: globalSpacingPrimitives[6],
    xl: globalSpacingPrimitives[8], },
  
  // Component margins
  'component-margin': { xs: globalSpacingPrimitives[1],
    sm: globalSpacingPrimitives[2],
    md: globalSpacingPrimitives[4],
    lg: globalSpacingPrimitives[6],
    xl: globalSpacingPrimitives[8], },
  
  // Gap spacing (for flexbox/grid)
  'component-gap': { xs: globalSpacingPrimitives[1],
    sm: globalSpacingPrimitives[2],
    md: globalSpacingPrimitives[4],
    lg: globalSpacingPrimitives[6],
    xl: globalSpacingPrimitives[8], },
  
  // Layout spacing
  'layout-spacing': { xs: globalSpacingPrimitives[4],
    sm: globalSpacingPrimitives[6],
    md: globalSpacingPrimitives[8],
    lg: globalSpacingPrimitives[12],
    xl: globalSpacingPrimitives[16],
    '2xl': globalSpacingPrimitives[20],
    '3xl': globalSpacingPrimitives[24], },
  
  // Container spacing
  'container-padding': { xs: globalSpacingPrimitives[4],
    sm: globalSpacingPrimitives[6],
    md: globalSpacingPrimitives[8],
    lg: globalSpacingPrimitives[12],
    xl: globalSpacingPrimitives[16], },
  
  // Touch target sizes (WCAG AAA compliance)
  'touch-target': { minimum: globalSpacingPrimitives[11], // 44px minimum
    comfortable: globalSpacingPrimitives[12], // 48px comfortable
    large: globalSpacingPrimitives[14], // 56px large },
  
  // Focus ring spacing
  'focus-ring': { offset: globalSpacingPrimitives[1],
    width: globalSpacingPrimitives[1], }, } as const;

// =============================================================================
// SEMANTIC TYPOGRAPHY TOKENS - Intent-based typography assignments
// =============================================================================

/**
 * Semantic typography tokens - maps primitive typography to intent-based names
 */
export const aliasTypographyTokens = { // Font families
  'font-family': { primary: globalFontFamilies.sans,
    secondary: globalFontFamilies.serif,
    mono: globalFontFamilies.mono, },
  
  // Headings
  heading: { h1: { fontSize: globalFontSizes['5xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.tight, },
    h2: { fontSize: globalFontSizes['4xl'],
      fontWeight: globalFontWeights.bold,
      lineHeight: globalLineHeights.tight,
      letterSpacing: globalLetterSpacing.tight, },
    h3: { fontSize: globalFontSizes['3xl'],
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.snug,
      letterSpacing: globalLetterSpacing.normal, },
    h4: { fontSize: globalFontSizes['2xl'],
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.snug,
      letterSpacing: globalLetterSpacing.normal, },
    h5: { fontSize: globalFontSizes.xl,
      fontWeight: globalFontWeights.semibold,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, },
    h6: { fontSize: globalFontSizes.lg,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, }, },
  
  // Body text
  body: { large: { fontSize: globalFontSizes.lg,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.relaxed,
      letterSpacing: globalLetterSpacing.normal, },
    medium: { fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, },
    small: { fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, }, },
  
  // UI text
  ui: { large: { fontSize: globalFontSizes.lg,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, },
    medium: { fontSize: globalFontSizes.base,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, },
    small: { fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal, },
    'extra-small': { fontSize: globalFontSizes.xs,
      fontWeight: globalFontWeights.medium,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.wide, }, },
  
  // Code text
  code: { inline: { fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.normal,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.mono, },
    block: { fontSize: globalFontSizes.sm,
      fontWeight: globalFontWeights.normal,
      lineHeight: globalLineHeights.relaxed,
      letterSpacing: globalLetterSpacing.normal,
      fontFamily: globalFontFamilies.mono, }, }, } as const;

// =============================================================================
// SEMANTIC BORDER TOKENS - Intent-based border assignments
// =============================================================================

/**
 * Semantic border tokens - maps primitive borders to intent-based names
 */
export const aliasBorderTokens = { // Border radius
  radius: { none: globalBorderRadius.none,
    small: globalBorderRadius.sm,
    medium: globalBorderRadius.base,
    large: globalBorderRadius.lg,
    'extra-large': globalBorderRadius.xl,
    full: globalBorderRadius.full, },
  
  // Border widths
  width: { none: globalBorderWidths[0],
    thin: globalBorderWidths[1],
    medium: globalBorderWidths[2],
    thick: globalBorderWidths[4], },
  
  // Common border combinations
  style: { none: 'none',
    solid: 'solid',
    dashed: 'dashed',
    dotted: 'dotted', }, } as const;

// =============================================================================
// SEMANTIC SHADOW TOKENS - Intent-based shadow assignments
// =============================================================================

/**
 * Semantic shadow tokens - maps primitive shadows to intent-based names
 */
export const aliasShadowTokens = { // Elevation shadows
  elevation: { none: globalShadows.none,
    low: globalShadows.sm,
    medium: globalShadows.base,
    high: globalShadows.lg,
    'extra-high': globalShadows.xl, },
  
  // Component shadows
  component: { card: globalShadows.base,
    'card-hover': globalShadows.md,
    modal: globalShadows.xl,
    dropdown: globalShadows.lg,
    tooltip: globalShadows.md,
    popover: globalShadows.lg, },
  
  // Focus shadows
  focus: { default: `0 0 0 2px ${aliasColorTokens.interactive.primary}40`,
    error: `0 0 0 2px ${aliasColorTokens.state['error-primary']}40`,
    success: `0 0 0 2px ${aliasColorTokens.state['success-primary']}40`,
    warning: `0 0 0 2px ${aliasColorTokens.state['warning-primary']}40`, },
  
  // Inner shadows
  inner: { default: globalShadows.inner,
    pressed: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.1)', }, } as const;

// =============================================================================
// SEMANTIC ANIMATION TOKENS - Intent-based animation assignments
// =============================================================================

/**
 * Semantic animation tokens - maps primitive animations to intent-based names
 */
export const aliasAnimationTokens = { // Duration tokens
  duration: { 'instant': '0ms',
    'extra-fast': globalAnimationDurations.fast,
    'fast': globalAnimationDurations.normal,
    'normal': globalAnimationDurations.slow,
    'slow': globalAnimationDurations.slower, },
  
  // Easing tokens
  easing: { 'ease-in': globalAnimationEasings['ease-in'],
    'ease-out': globalAnimationEasings['ease-out'],
    'ease-in-out': globalAnimationEasings['ease-in-out'],
    'bounce-in': globalAnimationEasings['ease-in-back'],
    'bounce-out': globalAnimationEasings['ease-out-back'],
    'bounce-in-out': globalAnimationEasings['ease-in-out-back'], },
  
  // Common animations
  transition: { 'fade-in': `opacity ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-out']}`,
    'fade-out': `opacity ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-in']}`,
    'slide-in': `transform ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-out']}`,
    'slide-out': `transform ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-in']}`,
    'scale-in': `transform ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-out']}`,
    'scale-out': `transform ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-in']}`,
    'all': `all ${globalAnimationDurations.normal} ${globalAnimationEasings['ease-in-out']}`, }, } as const;

// =============================================================================
// SEMANTIC BREAKPOINT TOKENS - Intent-based breakpoint assignments
// =============================================================================

/**
 * Semantic breakpoint tokens - maps primitive breakpoints to intent-based names
 */
export const aliasBreakpointTokens = { // Device breakpoints
  device: { mobile: globalBreakpoints.xs,
    tablet: globalBreakpoints.md,
    desktop: globalBreakpoints.lg,
    'wide-desktop': globalBreakpoints.xl,
    'ultra-wide': globalBreakpoints['2xl'], },
  
  // Container breakpoints
  container: { small: globalBreakpoints.sm,
    medium: globalBreakpoints.md,
    large: globalBreakpoints.lg,
    'extra-large': globalBreakpoints.xl, }, } as const;

// =============================================================================
// SEMANTIC Z-INDEX TOKENS - Intent-based z-index assignments
// =============================================================================

/**
 * Semantic z-index tokens - maps primitive z-indices to intent-based names
 */
export const aliasZIndexTokens = { // Component layers
  component: { base: globalZIndices.base,
    elevated: globalZIndices.docked,
    floating: globalZIndices.dropdown,
    sticky: globalZIndices.sticky, },
  
  // Overlay layers
  overlay: { backdrop: globalZIndices.overlay,
    modal: globalZIndices.modal,
    popover: globalZIndices.popover,
    tooltip: globalZIndices.tooltip,
    toast: globalZIndices.toast,
    'skip-link': globalZIndices.skipLink, }, } as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type AliasColorTokens = typeof aliasColorTokens;
export type AliasSpacingTokens = typeof aliasSpacingTokens;
export type AliasTypographyTokens = typeof aliasTypographyTokens;
export type AliasBorderTokens = typeof aliasBorderTokens;
export type AliasShadowTokens = typeof aliasShadowTokens;
export type AliasAnimationTokens = typeof aliasAnimationTokens;
export type AliasBreakpointTokens = typeof aliasBreakpointTokens;
export type AliasZIndexTokens = typeof aliasZIndexTokens;

// =============================================================================
// CONSOLIDATED ALIAS TOKENS
// =============================================================================

/**
 * All alias tokens consolidated into a single object
 */
export const aliasTokens = { color: aliasColorTokens,
  spacing: aliasSpacingTokens,
  typography: aliasTypographyTokens,
  border: aliasBorderTokens,
  shadow: aliasShadowTokens,
  animation: aliasAnimationTokens,
  breakpoint: aliasBreakpointTokens,
  zIndex: aliasZIndexTokens, } as const;

export type AliasTokens = typeof aliasTokens; 