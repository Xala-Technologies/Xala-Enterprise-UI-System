/**
 * Component Variant Token Maps
 * Maps component variants to design tokens for consistent theming
 */

import type { TokenSystem } from './transformers/typescript-types';

// =============================================================================
// VARIANT MAP TYPES
// =============================================================================

export interface VariantTokenMap {
  [variant: string]: {
    [property: string]: string | TokenReference;
  };
}

export interface TokenReference {
  token: string;
  fallback?: string;
}

export interface ComponentVariantMaps {
  button: VariantTokenMap;
  input: VariantTokenMap;
  card: VariantTokenMap;
  badge: VariantTokenMap;
  alert: VariantTokenMap;
  [component: string]: VariantTokenMap;
}

// =============================================================================
// BUTTON VARIANT MAPS
// =============================================================================

export const buttonVariantMap: VariantTokenMap = {
  primary: {
    background: { token: 'colors.primary.500', fallback: '#3b82f6' },
    backgroundHover: { token: 'colors.primary.600', fallback: '#2563eb' },
    backgroundActive: { token: 'colors.primary.700', fallback: '#1d4ed8' },
    backgroundDisabled: { token: 'colors.primary.300', fallback: '#93bbfc' },
    text: { token: 'colors.white', fallback: '#ffffff' },
    textDisabled: { token: 'colors.primary.100', fallback: '#dbeafe' },
    border: { token: 'colors.primary.500', fallback: '#3b82f6' },
    borderHover: { token: 'colors.primary.600', fallback: '#2563eb' },
    focusRing: { token: 'colors.primary.500', fallback: '#3b82f6' },
  },
  secondary: {
    background: { token: 'colors.neutral.200', fallback: '#e5e5e5' },
    backgroundHover: { token: 'colors.neutral.300', fallback: '#d4d4d4' },
    backgroundActive: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    backgroundDisabled: { token: 'colors.neutral.100', fallback: '#f5f5f5' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    textDisabled: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    border: { token: 'colors.neutral.300', fallback: '#d4d4d4' },
    borderHover: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    focusRing: { token: 'colors.neutral.500', fallback: '#737373' },
  },
  success: {
    background: { token: 'colors.success.500', fallback: '#10b981' },
    backgroundHover: { token: 'colors.success.600', fallback: '#059669' },
    backgroundActive: { token: 'colors.success.700', fallback: '#047857' },
    backgroundDisabled: { token: 'colors.success.300', fallback: '#86efac' },
    text: { token: 'colors.white', fallback: '#ffffff' },
    textDisabled: { token: 'colors.success.100', fallback: '#d1fae5' },
    border: { token: 'colors.success.500', fallback: '#10b981' },
    borderHover: { token: 'colors.success.600', fallback: '#059669' },
    focusRing: { token: 'colors.success.500', fallback: '#10b981' },
  },
  danger: {
    background: { token: 'colors.error.500', fallback: '#ef4444' },
    backgroundHover: { token: 'colors.error.600', fallback: '#dc2626' },
    backgroundActive: { token: 'colors.error.700', fallback: '#b91c1c' },
    backgroundDisabled: { token: 'colors.error.300', fallback: '#fca5a5' },
    text: { token: 'colors.white', fallback: '#ffffff' },
    textDisabled: { token: 'colors.error.100', fallback: '#fee2e2' },
    border: { token: 'colors.error.500', fallback: '#ef4444' },
    borderHover: { token: 'colors.error.600', fallback: '#dc2626' },
    focusRing: { token: 'colors.error.500', fallback: '#ef4444' },
  },
  ghost: {
    background: { token: 'colors.transparent', fallback: 'transparent' },
    backgroundHover: { token: 'colors.neutral.100', fallback: '#f5f5f5' },
    backgroundActive: { token: 'colors.neutral.200', fallback: '#e5e5e5' },
    backgroundDisabled: { token: 'colors.transparent', fallback: 'transparent' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    textDisabled: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    border: { token: 'colors.transparent', fallback: 'transparent' },
    borderHover: { token: 'colors.transparent', fallback: 'transparent' },
    focusRing: { token: 'colors.neutral.500', fallback: '#737373' },
  },
  outline: {
    background: { token: 'colors.transparent', fallback: 'transparent' },
    backgroundHover: { token: 'colors.neutral.50', fallback: '#fafafa' },
    backgroundActive: { token: 'colors.neutral.100', fallback: '#f5f5f5' },
    backgroundDisabled: { token: 'colors.transparent', fallback: 'transparent' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    textDisabled: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    border: { token: 'colors.neutral.300', fallback: '#d4d4d4' },
    borderHover: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    focusRing: { token: 'colors.neutral.500', fallback: '#737373' },
  },
};

// =============================================================================
// INPUT VARIANT MAPS
// =============================================================================

export const inputVariantMap: VariantTokenMap = {
  default: {
    background: { token: 'colors.white', fallback: '#ffffff' },
    backgroundDisabled: { token: 'colors.neutral.50', fallback: '#fafafa' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    textPlaceholder: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    textDisabled: { token: 'colors.neutral.500', fallback: '#737373' },
    border: { token: 'colors.neutral.300', fallback: '#d4d4d4' },
    borderFocus: { token: 'colors.primary.500', fallback: '#3b82f6' },
    borderError: { token: 'colors.error.500', fallback: '#ef4444' },
    focusRing: { token: 'colors.primary.500', fallback: '#3b82f6' },
  },
  filled: {
    background: { token: 'colors.neutral.100', fallback: '#f5f5f5' },
    backgroundDisabled: { token: 'colors.neutral.200', fallback: '#e5e5e5' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    textPlaceholder: { token: 'colors.neutral.500', fallback: '#737373' },
    textDisabled: { token: 'colors.neutral.600', fallback: '#525252' },
    border: { token: 'colors.transparent', fallback: 'transparent' },
    borderFocus: { token: 'colors.primary.500', fallback: '#3b82f6' },
    borderError: { token: 'colors.error.500', fallback: '#ef4444' },
    focusRing: { token: 'colors.primary.500', fallback: '#3b82f6' },
  },
  unstyled: {
    background: { token: 'colors.transparent', fallback: 'transparent' },
    backgroundDisabled: { token: 'colors.transparent', fallback: 'transparent' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    textPlaceholder: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
    textDisabled: { token: 'colors.neutral.500', fallback: '#737373' },
    border: { token: 'colors.transparent', fallback: 'transparent' },
    borderFocus: { token: 'colors.transparent', fallback: 'transparent' },
    borderError: { token: 'colors.transparent', fallback: 'transparent' },
    focusRing: { token: 'colors.transparent', fallback: 'transparent' },
  },
};

// =============================================================================
// CARD VARIANT MAPS
// =============================================================================

export const cardVariantMap: VariantTokenMap = {
  default: {
    background: { token: 'colors.white', fallback: '#ffffff' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    border: { token: 'colors.neutral.200', fallback: '#e5e5e5' },
    shadow: { token: 'shadows.md', fallback: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  },
  elevated: {
    background: { token: 'colors.white', fallback: '#ffffff' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    border: { token: 'colors.transparent', fallback: 'transparent' },
    shadow: { token: 'shadows.lg', fallback: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
  },
  outlined: {
    background: { token: 'colors.white', fallback: '#ffffff' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    border: { token: 'colors.neutral.300', fallback: '#d4d4d4' },
    shadow: { token: 'shadows.none', fallback: 'none' },
  },
  filled: {
    background: { token: 'colors.neutral.50', fallback: '#fafafa' },
    text: { token: 'colors.neutral.900', fallback: '#171717' },
    border: { token: 'colors.transparent', fallback: 'transparent' },
    shadow: { token: 'shadows.none', fallback: 'none' },
  },
};

// =============================================================================
// BADGE VARIANT MAPS
// =============================================================================

export const badgeVariantMap: VariantTokenMap = {
  primary: {
    background: { token: 'colors.primary.100', fallback: '#dbeafe' },
    text: { token: 'colors.primary.900', fallback: '#1e3a8a' },
    border: { token: 'colors.primary.200', fallback: '#bfdbfe' },
  },
  secondary: {
    background: { token: 'colors.neutral.100', fallback: '#f5f5f5' },
    text: { token: 'colors.neutral.700', fallback: '#404040' },
    border: { token: 'colors.neutral.200', fallback: '#e5e5e5' },
  },
  success: {
    background: { token: 'colors.success.100', fallback: '#d1fae5' },
    text: { token: 'colors.success.900', fallback: '#064e3b' },
    border: { token: 'colors.success.200', fallback: '#a7f3d0' },
  },
  warning: {
    background: { token: 'colors.warning.100', fallback: '#fef3c7' },
    text: { token: 'colors.warning.900', fallback: '#78350f' },
    border: { token: 'colors.warning.200', fallback: '#fde68a' },
  },
  danger: {
    background: { token: 'colors.error.100', fallback: '#fee2e2' },
    text: { token: 'colors.error.900', fallback: '#7f1d1d' },
    border: { token: 'colors.error.200', fallback: '#fecaca' },
  },
  info: {
    background: { token: 'colors.info.100', fallback: '#dbeafe' },
    text: { token: 'colors.info.900', fallback: '#1e3a8a' },
    border: { token: 'colors.info.200', fallback: '#bfdbfe' },
  },
};

// =============================================================================
// ALERT VARIANT MAPS
// =============================================================================

export const alertVariantMap: VariantTokenMap = {
  info: {
    background: { token: 'colors.info.50', fallback: '#eff6ff' },
    text: { token: 'colors.info.900', fallback: '#1e3a8a' },
    border: { token: 'colors.info.200', fallback: '#bfdbfe' },
    icon: { token: 'colors.info.500', fallback: '#3b82f6' },
  },
  success: {
    background: { token: 'colors.success.50', fallback: '#f0fdf4' },
    text: { token: 'colors.success.900', fallback: '#064e3b' },
    border: { token: 'colors.success.200', fallback: '#a7f3d0' },
    icon: { token: 'colors.success.500', fallback: '#10b981' },
  },
  warning: {
    background: { token: 'colors.warning.50', fallback: '#fffbeb' },
    text: { token: 'colors.warning.900', fallback: '#78350f' },
    border: { token: 'colors.warning.200', fallback: '#fde68a' },
    icon: { token: 'colors.warning.500', fallback: '#f59e0b' },
  },
  error: {
    background: { token: 'colors.error.50', fallback: '#fef2f2' },
    text: { token: 'colors.error.900', fallback: '#7f1d1d' },
    border: { token: 'colors.error.200', fallback: '#fecaca' },
    icon: { token: 'colors.error.500', fallback: '#ef4444' },
  },
};

// =============================================================================
// VARIANT MAP UTILITIES
// =============================================================================

/**
 * Resolve a token reference to its value
 */
export function resolveTokenReference(
  ref: string | TokenReference,
  tokens: TokenSystem
): string {
  if (typeof ref === 'string') {
    return ref;
  }

  const { token, fallback } = ref;
  const value = getTokenValue(tokens, token);
  return value || fallback || '';
}

/**
 * Get token value from dot notation path
 */
export function getTokenValue(tokens: TokenSystem, path: string): string | undefined {
  const parts = path.split('.');
  let current: any = tokens;

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * Generate CSS variables for a component variant
 */
export function generateVariantCSSVariables(
  component: string,
  variant: string,
  variantMap: VariantTokenMap,
  tokens: TokenSystem,
  prefix = ''
): Record<string, string> {
  const variables: Record<string, string> = {};
  const variantTokens = variantMap[variant];

  if (!variantTokens) {
    return variables;
  }

  Object.entries(variantTokens).forEach(([property, reference]) => {
    const value = resolveTokenReference(reference, tokens);
    const varName = `--${prefix}${component}-${variant}-${property}`;
    variables[varName] = value;
  });

  return variables;
}

/**
 * Generate all CSS variables for a component
 */
export function generateComponentCSSVariables(
  component: string,
  variantMap: VariantTokenMap,
  tokens: TokenSystem,
  prefix = ''
): Record<string, string> {
  const variables: Record<string, string> = {};

  Object.keys(variantMap).forEach(variant => {
    const variantVars = generateVariantCSSVariables(
      component,
      variant,
      variantMap,
      tokens,
      prefix
    );
    Object.assign(variables, variantVars);
  });

  return variables;
}

// =============================================================================
// COMPLETE COMPONENT VARIANT MAPS
// =============================================================================

export const componentVariantMaps: ComponentVariantMaps = {
  button: buttonVariantMap,
  input: inputVariantMap,
  card: cardVariantMap,
  badge: badgeVariantMap,
  alert: alertVariantMap,
};

// Export individual maps for tree shaking
export { buttonVariantMap, inputVariantMap, cardVariantMap, badgeVariantMap, alertVariantMap };