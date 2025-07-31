/**
 * State-Based Token Mapping
 * Maps component states (hover, focus, active, disabled) to design tokens
 */

import type { TokenReference } from './variant-maps';

// =============================================================================
// STATE MAP TYPES
// =============================================================================

export interface StateTokenMap {
  default: Record<string, string | TokenReference>;
  hover?: Record<string, string | TokenReference>;
  focus?: Record<string, string | TokenReference>;
  active?: Record<string, string | TokenReference>;
  disabled?: Record<string, string | TokenReference>;
  loading?: Record<string, string | TokenReference>;
  error?: Record<string, string | TokenReference>;
  success?: Record<string, string | TokenReference>;
  readonly?: Record<string, string | TokenReference>;
}

export interface InteractionStateMap {
  idle: Record<string, string | TokenReference>;
  hover: Record<string, string | TokenReference>;
  focus: Record<string, string | TokenReference>;
  active: Record<string, string | TokenReference>;
  disabled: Record<string, string | TokenReference>;
}

export interface ValidationStateMap {
  valid: Record<string, string | TokenReference>;
  invalid: Record<string, string | TokenReference>;
  warning: Record<string, string | TokenReference>;
  info: Record<string, string | TokenReference>;
}

// =============================================================================
// INTERACTION STATE MODIFIERS
// =============================================================================

export const interactionStateModifiers = {
  hover: {
    opacity: { token: 'opacity.90', fallback: '0.9' },
    transform: { token: 'transforms.scale.hover', fallback: 'scale(1.02)' },
    transition: { token: 'transitions.default', fallback: 'all 150ms ease-in-out' },
    brightness: { token: 'filters.brightness.hover', fallback: 'brightness(1.1)' },
  },
  focus: {
    outline: { token: 'accessibility.focusOutline', fallback: '2px solid' },
    outlineOffset: { token: 'accessibility.focusOutlineOffset', fallback: '2px' },
    outlineColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
    boxShadow: { token: 'shadows.focus', fallback: '0 0 0 3px rgba(59, 130, 246, 0.5)' },
  },
  active: {
    transform: { token: 'transforms.scale.active', fallback: 'scale(0.98)' },
    brightness: { token: 'filters.brightness.active', fallback: 'brightness(0.9)' },
  },
  disabled: {
    opacity: { token: 'opacity.50', fallback: '0.5' },
    cursor: { token: 'cursors.disabled', fallback: 'not-allowed' },
    pointerEvents: { token: 'interactions.disabled', fallback: 'none' },
  },
};

// =============================================================================
// BUTTON STATE MAPS
// =============================================================================

export const buttonStateMap: StateTokenMap = {
  default: {
    transition: { token: 'transitions.button', fallback: 'all 150ms ease-in-out' },
    cursor: { token: 'cursors.pointer', fallback: 'pointer' },
    userSelect: { token: 'interactions.userSelect.none', fallback: 'none' },
  },
  hover: {
    transform: { token: 'transforms.scale.sm', fallback: 'scale(1.02)' },
    shadow: { token: 'shadows.hover', fallback: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
  },
  focus: {
    outline: { token: 'accessibility.focusOutline', fallback: '2px solid transparent' },
    outlineOffset: { token: 'accessibility.focusOutlineOffset', fallback: '2px' },
    ringWidth: { token: 'accessibility.focusRingWidth', fallback: '2px' },
    ringColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
    ringOpacity: { token: 'opacity.50', fallback: '0.5' },
  },
  active: {
    transform: { token: 'transforms.scale.press', fallback: 'scale(0.98)' },
  },
  disabled: {
    opacity: { token: 'opacity.disabled', fallback: '0.5' },
    cursor: { token: 'cursors.notAllowed', fallback: 'not-allowed' },
    pointerEvents: { token: 'interactions.none', fallback: 'none' },
  },
  loading: {
    cursor: { token: 'cursors.wait', fallback: 'wait' },
    pointerEvents: { token: 'interactions.none', fallback: 'none' },
  },
};

// =============================================================================
// INPUT STATE MAPS
// =============================================================================

export const inputStateMap: StateTokenMap = {
  default: {
    transition: { token: 'transitions.input', fallback: 'border-color 150ms ease-in-out' },
    cursor: { token: 'cursors.text', fallback: 'text' },
  },
  hover: {
    borderColor: { token: 'colors.neutral.400', fallback: '#a3a3a3' },
  },
  focus: {
    outline: { token: 'accessibility.focusOutline', fallback: 'none' },
    borderColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
    ringWidth: { token: 'accessibility.focusRingWidth', fallback: '2px' },
    ringColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
    ringOpacity: { token: 'opacity.20', fallback: '0.2' },
  },
  disabled: {
    opacity: { token: 'opacity.disabled', fallback: '0.5' },
    cursor: { token: 'cursors.notAllowed', fallback: 'not-allowed' },
    backgroundColor: { token: 'colors.neutral.50', fallback: '#fafafa' },
  },
  readonly: {
    cursor: { token: 'cursors.default', fallback: 'default' },
    backgroundColor: { token: 'colors.neutral.50', fallback: '#fafafa' },
  },
  error: {
    borderColor: { token: 'colors.error.500', fallback: '#ef4444' },
    ringColor: { token: 'colors.error.500', fallback: '#ef4444' },
  },
  success: {
    borderColor: { token: 'colors.success.500', fallback: '#10b981' },
    ringColor: { token: 'colors.success.500', fallback: '#10b981' },
  },
};

// =============================================================================
// LINK STATE MAPS
// =============================================================================

export const linkStateMap: StateTokenMap = {
  default: {
    transition: { token: 'transitions.link', fallback: 'color 150ms ease-in-out' },
    cursor: { token: 'cursors.pointer', fallback: 'pointer' },
    textDecoration: { token: 'typography.textDecoration.none', fallback: 'none' },
  },
  hover: {
    textDecoration: { token: 'typography.textDecoration.underline', fallback: 'underline' },
    color: { token: 'colors.primary.600', fallback: '#2563eb' },
  },
  focus: {
    outline: { token: 'accessibility.focusOutline', fallback: '2px solid' },
    outlineOffset: { token: 'accessibility.focusOutlineOffset', fallback: '2px' },
    outlineColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
  },
  active: {
    color: { token: 'colors.primary.700', fallback: '#1d4ed8' },
  },
  disabled: {
    opacity: { token: 'opacity.disabled', fallback: '0.5' },
    cursor: { token: 'cursors.notAllowed', fallback: 'not-allowed' },
    pointerEvents: { token: 'interactions.none', fallback: 'none' },
  },
};

// =============================================================================
// CARD STATE MAPS
// =============================================================================

export const cardStateMap: StateTokenMap = {
  default: {
    transition: { token: 'transitions.card', fallback: 'all 200ms ease-in-out' },
  },
  hover: {
    transform: { token: 'transforms.card.hover', fallback: 'translateY(-2px)' },
    shadow: { token: 'shadows.xl', fallback: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' },
  },
  focus: {
    outline: { token: 'accessibility.focusOutline', fallback: '2px solid' },
    outlineOffset: { token: 'accessibility.focusOutlineOffset', fallback: '2px' },
    outlineColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
  },
  active: {
    transform: { token: 'transforms.card.active', fallback: 'translateY(0)' },
    shadow: { token: 'shadows.md', fallback: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
  },
};

// =============================================================================
// CHECKBOX/RADIO STATE MAPS
// =============================================================================

export const checkboxStateMap: StateTokenMap = {
  default: {
    transition: { token: 'transitions.checkbox', fallback: 'all 150ms ease-in-out' },
    cursor: { token: 'cursors.pointer', fallback: 'pointer' },
  },
  hover: {
    borderColor: { token: 'colors.primary.600', fallback: '#2563eb' },
    backgroundColor: { token: 'colors.primary.50', fallback: '#eff6ff' },
  },
  focus: {
    outline: { token: 'accessibility.focusOutline', fallback: 'none' },
    ringWidth: { token: 'accessibility.focusRingWidth', fallback: '2px' },
    ringColor: { token: 'colors.primary.500', fallback: '#3b82f6' },
    ringOffset: { token: 'accessibility.focusRingOffset', fallback: '2px' },
  },
  active: {
    transform: { token: 'transforms.scale.sm', fallback: 'scale(0.95)' },
  },
  disabled: {
    opacity: { token: 'opacity.disabled', fallback: '0.5' },
    cursor: { token: 'cursors.notAllowed', fallback: 'not-allowed' },
  },
};

// =============================================================================
// STATE UTILITIES
// =============================================================================

/**
 * Merge state tokens with base tokens
 */
export function mergeStateTokens(
  baseTokens: Record<string, string | TokenReference>,
  stateTokens?: Record<string, string | TokenReference>
): Record<string, string | TokenReference> {
  if (!stateTokens) {
    return baseTokens;
  }
  
  return { ...baseTokens, ...stateTokens };
}

/**
 * Generate CSS for state-based styles
 */
export function generateStateCSS(
  selector: string,
  state: string,
  tokens: Record<string, string | TokenReference>,
  resolver: (ref: string | TokenReference) => string
): string {
  const stateSelector = state === 'default' ? selector : `${selector}:${state}`;
  const properties = Object.entries(tokens)
    .map(([prop, value]) => {
      const resolved = resolver(value);
      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  ${cssProp}: ${resolved};`;
    })
    .join('\n');

  return `${stateSelector} {\n${properties}\n}`;
}

/**
 * Generate all state CSS for a component
 */
export function generateComponentStateCSS(
  selector: string,
  stateMap: StateTokenMap,
  resolver: (ref: string | TokenReference) => string
): string {
  const states = Object.entries(stateMap)
    .filter(([state]) => state !== 'loading' && state !== 'error' && state !== 'success')
    .map(([state, tokens]) => generateStateCSS(selector, state, tokens, resolver))
    .join('\n\n');

  // Add special states with attribute selectors
  const specialStates = ['loading', 'error', 'success', 'readonly']
    .filter(state => state in stateMap)
    .map(state => {
      const tokens = stateMap[state as keyof StateTokenMap]!;
      const attrSelector = `${selector}[data-${state}="true"]`;
      return generateStateCSS(attrSelector, 'default', tokens, resolver);
    })
    .join('\n\n');

  return [states, specialStates].filter(Boolean).join('\n\n');
}

// =============================================================================
// ANIMATION STATE MAPS
// =============================================================================

export const animationStateMap = {
  entering: {
    from: {
      opacity: { token: 'opacity.0', fallback: '0' },
      transform: { token: 'transforms.scale.sm', fallback: 'scale(0.95)' },
    },
    to: {
      opacity: { token: 'opacity.100', fallback: '1' },
      transform: { token: 'transforms.scale.default', fallback: 'scale(1)' },
    },
    duration: { token: 'durations.normal', fallback: '200ms' },
    easing: { token: 'easings.easeOut', fallback: 'cubic-bezier(0, 0, 0.2, 1)' },
  },
  exiting: {
    from: {
      opacity: { token: 'opacity.100', fallback: '1' },
      transform: { token: 'transforms.scale.default', fallback: 'scale(1)' },
    },
    to: {
      opacity: { token: 'opacity.0', fallback: '0' },
      transform: { token: 'transforms.scale.sm', fallback: 'scale(0.95)' },
    },
    duration: { token: 'durations.fast', fallback: '150ms' },
    easing: { token: 'easings.easeIn', fallback: 'cubic-bezier(0.4, 0, 1, 1)' },
  },
};

// =============================================================================
// EXPORTS
// =============================================================================

export {
  buttonStateMap,
  inputStateMap,
  linkStateMap,
  cardStateMap,
  checkboxStateMap,
  interactionStateModifiers,
  animationStateMap,
};