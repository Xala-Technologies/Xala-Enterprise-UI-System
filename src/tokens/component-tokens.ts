/**
 * @fileoverview Component Design Tokens - Component-Specific Layer
 * @description Component-specific token assignments using alias tokens
 * @version 3.0.0
 * @compliance WCAG 2.2 AAA
 */

import { aliasTokens } from './alias-tokens';

// =============================================================================
// BUTTON COMPONENT TOKENS
// =============================================================================

/**
 * Button component tokens - all button styling consolidated
 */
export const buttonComponentTokens = {
  // Primary button
  primary: {
    background: aliasTokens.color.interactive.primary,
    'background-hover': aliasTokens.color.interactive['primary-hover'],
    'background-active': aliasTokens.color.interactive['primary-active'],
    'background-disabled': aliasTokens.color.interactive['primary-disabled'],
    'background-loading': aliasTokens.color.interactive['primary-loading'],

    foreground: aliasTokens.color.foreground['on-brand'],
    'foreground-disabled': aliasTokens.color.foreground['on-brand'],

    border: aliasTokens.color.interactive.primary,
    'border-hover': aliasTokens.color.interactive['primary-hover'],
    'border-active': aliasTokens.color.interactive['primary-active'],
    'border-disabled': aliasTokens.color.interactive['primary-disabled'],
    'border-focus': aliasTokens.color.border.focus,

    shadow: aliasTokens.shadow.elevation.none,
    'shadow-hover': aliasTokens.shadow.elevation.low,
    'shadow-active': aliasTokens.shadow.elevation.none,
    'shadow-focus': aliasTokens.shadow.focus.default,

    padding: {
      sm: `${aliasTokens.spacing['component-padding'].sm} ${aliasTokens.spacing['component-padding'].md}`,
      md: `${aliasTokens.spacing['component-padding'].md} ${aliasTokens.spacing['component-padding'].lg}`,
      lg: `${aliasTokens.spacing['component-padding'].lg} ${aliasTokens.spacing['component-padding'].xl}`,
    },

    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.thin,
    'min-height': aliasTokens.spacing['touch-target'].minimum,

    typography: aliasTokens.typography.ui.medium,
    transition: aliasTokens.animation.transition.all,
  },

  // Secondary button
  secondary: {
    background: aliasTokens.color.interactive.secondary,
    'background-hover': aliasTokens.color.interactive['secondary-hover'],
    'background-active': aliasTokens.color.interactive['secondary-active'],
    'background-disabled': aliasTokens.color.interactive['secondary-disabled'],

    foreground: aliasTokens.color.foreground.primary,
    'foreground-disabled': aliasTokens.color.foreground.disabled,

    border: aliasTokens.color.border.primary,
    'border-hover': aliasTokens.color.border.secondary,
    'border-active': aliasTokens.color.border.secondary,
    'border-disabled': aliasTokens.color.border.disabled,
    'border-focus': aliasTokens.color.border.focus,

    shadow: aliasTokens.shadow.elevation.none,
    'shadow-hover': aliasTokens.shadow.elevation.low,
    'shadow-active': aliasTokens.shadow.elevation.none,
    'shadow-focus': aliasTokens.shadow.focus.default,

    padding: {
      sm: `${aliasTokens.spacing['component-padding'].sm} ${aliasTokens.spacing['component-padding'].md}`,
      md: `${aliasTokens.spacing['component-padding'].md} ${aliasTokens.spacing['component-padding'].lg}`,
      lg: `${aliasTokens.spacing['component-padding'].lg} ${aliasTokens.spacing['component-padding'].xl}`,
    },

    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.thin,
    'min-height': aliasTokens.spacing['touch-target'].minimum,

    typography: aliasTokens.typography.ui.medium,
    transition: aliasTokens.animation.transition.all,
  },

  // Ghost button
  ghost: {
    background: aliasTokens.color.interactive.tertiary,
    'background-hover': aliasTokens.color.interactive['tertiary-hover'],
    'background-active': aliasTokens.color.interactive['tertiary-active'],
    'background-disabled': aliasTokens.color.interactive['tertiary-disabled'],

    foreground: aliasTokens.color.interactive.primary,
    'foreground-disabled': aliasTokens.color.foreground.disabled,

    border: aliasTokens.color.utility.transparent,
    'border-hover': aliasTokens.color.utility.transparent,
    'border-active': aliasTokens.color.utility.transparent,
    'border-disabled': aliasTokens.color.utility.transparent,
    'border-focus': aliasTokens.color.border.focus,

    shadow: aliasTokens.shadow.elevation.none,
    'shadow-hover': aliasTokens.shadow.elevation.none,
    'shadow-active': aliasTokens.shadow.elevation.none,
    'shadow-focus': aliasTokens.shadow.focus.default,

    padding: {
      sm: `${aliasTokens.spacing['component-padding'].sm} ${aliasTokens.spacing['component-padding'].md}`,
      md: `${aliasTokens.spacing['component-padding'].md} ${aliasTokens.spacing['component-padding'].lg}`,
      lg: `${aliasTokens.spacing['component-padding'].lg} ${aliasTokens.spacing['component-padding'].xl}`,
    },

    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.none,
    'min-height': aliasTokens.spacing['touch-target'].minimum,

    typography: aliasTokens.typography.ui.medium,
    transition: aliasTokens.animation.transition.all,
  },

  // Danger button
  danger: {
    background: aliasTokens.color.state['error-primary'],
    'background-hover': aliasTokens.color.state['error-hover'],
    'background-active': aliasTokens.color.state['error-active'],
    'background-disabled': aliasTokens.color.state['error-disabled'],

    foreground: aliasTokens.color.foreground['on-accent'],
    'foreground-disabled': aliasTokens.color.foreground['on-accent'],

    border: aliasTokens.color.state['error-primary'],
    'border-hover': aliasTokens.color.state['error-hover'],
    'border-active': aliasTokens.color.state['error-active'],
    'border-disabled': aliasTokens.color.state['error-disabled'],
    'border-focus': aliasTokens.color.state['error-primary'],

    shadow: aliasTokens.shadow.elevation.none,
    'shadow-hover': aliasTokens.shadow.elevation.low,
    'shadow-active': aliasTokens.shadow.elevation.none,
    'shadow-focus': aliasTokens.shadow.focus.error,

    padding: {
      sm: `${aliasTokens.spacing['component-padding'].sm} ${aliasTokens.spacing['component-padding'].md}`,
      md: `${aliasTokens.spacing['component-padding'].md} ${aliasTokens.spacing['component-padding'].lg}`,
      lg: `${aliasTokens.spacing['component-padding'].lg} ${aliasTokens.spacing['component-padding'].xl}`,
    },

    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.thin,
    'min-height': aliasTokens.spacing['touch-target'].minimum,

    typography: aliasTokens.typography.ui.medium,
    transition: aliasTokens.animation.transition.all,
  },
} as const;

// =============================================================================
// INPUT COMPONENT TOKENS
// =============================================================================

/**
 * Input component tokens - all input styling consolidated
 */
export const inputComponentTokens = {
  // Base input
  base: {
    background: aliasTokens.color.background.primary,
    'background-hover': aliasTokens.color.background.primary,
    'background-focus': aliasTokens.color.background.primary,
    'background-disabled': aliasTokens.color.background.disabled,
    'background-error': aliasTokens.color.state['error-subtle'],
    'background-success': aliasTokens.color.state['success-subtle'],

    foreground: aliasTokens.color.foreground.primary,
    'foreground-placeholder': aliasTokens.color.foreground.placeholder,
    'foreground-disabled': aliasTokens.color.foreground.disabled,
    'foreground-error': aliasTokens.color.state['error-foreground'],
    'foreground-success': aliasTokens.color.state['success-foreground'],

    border: aliasTokens.color.border.primary,
    'border-hover': aliasTokens.color.border.secondary,
    'border-focus': aliasTokens.color.border.focus,
    'border-disabled': aliasTokens.color.border.disabled,
    'border-error': aliasTokens.color.state['error-border'],
    'border-success': aliasTokens.color.state['success-border'],

    shadow: aliasTokens.shadow.elevation.none,
    'shadow-focus': aliasTokens.shadow.focus.default,
    'shadow-error': aliasTokens.shadow.focus.error,
    'shadow-success': aliasTokens.shadow.focus.success,

    padding: {
      sm: `${aliasTokens.spacing['component-padding'].sm} ${aliasTokens.spacing['component-padding'].md}`,
      md: `${aliasTokens.spacing['component-padding'].md} ${aliasTokens.spacing['component-padding'].lg}`,
      lg: `${aliasTokens.spacing['component-padding'].lg} ${aliasTokens.spacing['component-padding'].xl}`,
    },

    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.thin,
    'min-height': aliasTokens.spacing['touch-target'].minimum,

    typography: aliasTokens.typography.body.medium,
    transition: aliasTokens.animation.transition.all,
  },

  // Label
  label: {
    foreground: aliasTokens.color.foreground.primary,
    'foreground-disabled': aliasTokens.color.foreground.disabled,
    'foreground-error': aliasTokens.color.state['error-foreground'],
    'foreground-success': aliasTokens.color.state['success-foreground'],

    typography: aliasTokens.typography.ui.small,
    margin: `0 0 ${aliasTokens.spacing['component-margin'].xs} 0`,
  },

  // Help text
  'help-text': {
    foreground: aliasTokens.color.foreground.secondary,
    'foreground-error': aliasTokens.color.state['error-foreground'],
    'foreground-success': aliasTokens.color.state['success-foreground'],

    typography: aliasTokens.typography.ui.small,
    margin: `${aliasTokens.spacing['component-margin'].xs} 0 0 0`,
  },
} as const;

// =============================================================================
// CARD COMPONENT TOKENS
// =============================================================================

/**
 * Card component tokens - all card styling consolidated
 */
export const cardComponentTokens = {
  // Base card
  base: {
    background: aliasTokens.color.background.primary,
    'background-hover': aliasTokens.color.background.primary,
    'background-active': aliasTokens.color.background.secondary,

    foreground: aliasTokens.color.foreground.primary,

    border: aliasTokens.color.border.primary,
    'border-hover': aliasTokens.color.border.secondary,
    'border-focus': aliasTokens.color.border.focus,

    shadow: aliasTokens.shadow.component.card,
    'shadow-hover': aliasTokens.shadow.component['card-hover'],
    'shadow-focus': aliasTokens.shadow.focus.default,

    padding: {
      sm: aliasTokens.spacing['component-padding'].md,
      md: aliasTokens.spacing['component-padding'].lg,
      lg: aliasTokens.spacing['component-padding'].xl,
    },

    'border-radius': aliasTokens.border.radius.large,
    'border-width': aliasTokens.border.width.thin,

    transition: aliasTokens.animation.transition.all,
  },

  // Elevated card
  elevated: {
    background: aliasTokens.color.background.elevated,
    'background-hover': aliasTokens.color.background.elevated,
    'background-active': aliasTokens.color.background.secondary,

    foreground: aliasTokens.color.foreground.primary,

    border: aliasTokens.color.utility.transparent,
    'border-hover': aliasTokens.color.utility.transparent,
    'border-focus': aliasTokens.color.border.focus,

    shadow: aliasTokens.shadow.elevation.medium,
    'shadow-hover': aliasTokens.shadow.elevation.high,
    'shadow-focus': aliasTokens.shadow.focus.default,

    padding: {
      sm: aliasTokens.spacing['component-padding'].md,
      md: aliasTokens.spacing['component-padding'].lg,
      lg: aliasTokens.spacing['component-padding'].xl,
    },

    'border-radius': aliasTokens.border.radius.large,
    'border-width': aliasTokens.border.width.none,

    transition: aliasTokens.animation.transition.all,
  },

  // Interactive card
  interactive: {
    background: aliasTokens.color.background.primary,
    'background-hover': aliasTokens.color.background.secondary,
    'background-active': aliasTokens.color.background.tertiary,

    foreground: aliasTokens.color.foreground.primary,

    border: aliasTokens.color.border.primary,
    'border-hover': aliasTokens.color.border.interactive,
    'border-focus': aliasTokens.color.border.focus,

    shadow: aliasTokens.shadow.component.card,
    'shadow-hover': aliasTokens.shadow.component['card-hover'],
    'shadow-focus': aliasTokens.shadow.focus.default,

    padding: {
      sm: aliasTokens.spacing['component-padding'].md,
      md: aliasTokens.spacing['component-padding'].lg,
      lg: aliasTokens.spacing['component-padding'].xl,
    },

    'border-radius': aliasTokens.border.radius.large,
    'border-width': aliasTokens.border.width.thin,

    transition: aliasTokens.animation.transition.all,
    cursor: 'pointer',
  },
} as const;

// =============================================================================
// MODAL COMPONENT TOKENS
// =============================================================================

/**
 * Modal component tokens - all modal styling consolidated
 */
export const modalComponentTokens = {
  // Backdrop
  backdrop: {
    background: aliasTokens.color.background.overlay,
    'z-index': aliasTokens.zIndex.overlay.backdrop,
    animation: aliasTokens.animation.transition['fade-in'],
  },

  // Modal container
  container: {
    background: aliasTokens.color.background.primary,
    foreground: aliasTokens.color.foreground.primary,

    border: aliasTokens.color.border.primary,
    shadow: aliasTokens.shadow.component.modal,

    padding: aliasTokens.spacing['component-padding'].xl,
    'border-radius': aliasTokens.border.radius.large,
    'border-width': aliasTokens.border.width.thin,

    'z-index': aliasTokens.zIndex.overlay.modal,
    'max-width': '90vw',
    'max-height': '90vh',

    animation: aliasTokens.animation.transition['scale-in'],
  },

  // Modal header
  header: {
    foreground: aliasTokens.color.foreground.primary,
    'border-bottom': aliasTokens.color.border.primary,

    padding: `0 0 ${aliasTokens.spacing['component-padding'].md} 0`,
    'border-bottom-width': aliasTokens.border.width.thin,

    typography: aliasTokens.typography.heading.h3,
  },

  // Modal footer
  footer: {
    'border-top': aliasTokens.color.border.primary,

    padding: `${aliasTokens.spacing['component-padding'].md} 0 0 0`,
    'border-top-width': aliasTokens.border.width.thin,

    gap: aliasTokens.spacing['component-gap'].md,
  },
} as const;

// =============================================================================
// TOAST COMPONENT TOKENS
// =============================================================================

/**
 * Toast component tokens - all toast styling consolidated
 */
export const toastComponentTokens = {
  // Base toast
  base: {
    background: aliasTokens.color.background.inverse,
    foreground: aliasTokens.color.foreground.inverse,

    border: aliasTokens.color.utility.transparent,
    shadow: aliasTokens.shadow.elevation.high,

    padding: aliasTokens.spacing['component-padding'].lg,
    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.none,

    'z-index': aliasTokens.zIndex.overlay.toast,
    'min-width': '320px',
    'max-width': '480px',

    typography: aliasTokens.typography.body.medium,
    animation: aliasTokens.animation.transition['slide-in'],
  },

  // Success toast
  success: {
    background: aliasTokens.color.state['success-primary'],
    foreground: aliasTokens.color.foreground['on-accent'],

    border: aliasTokens.color.state['success-primary'],
    shadow: aliasTokens.shadow.elevation.high,

    padding: aliasTokens.spacing['component-padding'].lg,
    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.none,

    'z-index': aliasTokens.zIndex.overlay.toast,
    'min-width': '320px',
    'max-width': '480px',

    typography: aliasTokens.typography.body.medium,
    animation: aliasTokens.animation.transition['slide-in'],
  },

  // Error toast
  error: {
    background: aliasTokens.color.state['error-primary'],
    foreground: aliasTokens.color.foreground['on-accent'],

    border: aliasTokens.color.state['error-primary'],
    shadow: aliasTokens.shadow.elevation.high,

    padding: aliasTokens.spacing['component-padding'].lg,
    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.none,

    'z-index': aliasTokens.zIndex.overlay.toast,
    'min-width': '320px',
    'max-width': '480px',

    typography: aliasTokens.typography.body.medium,
    animation: aliasTokens.animation.transition['slide-in'],
  },

  // Warning toast
  warning: {
    background: aliasTokens.color.state['warning-primary'],
    foreground: aliasTokens.color.state['warning-foreground'],

    border: aliasTokens.color.state['warning-primary'],
    shadow: aliasTokens.shadow.elevation.high,

    padding: aliasTokens.spacing['component-padding'].lg,
    'border-radius': aliasTokens.border.radius.medium,
    'border-width': aliasTokens.border.width.none,

    'z-index': aliasTokens.zIndex.overlay.toast,
    'min-width': '320px',
    'max-width': '480px',

    typography: aliasTokens.typography.body.medium,
    animation: aliasTokens.animation.transition['slide-in'],
  },
} as const;

// =============================================================================
// CONSOLIDATED COMPONENT TOKENS
// =============================================================================

/**
 * All component tokens consolidated into a single object
 */
export const componentTokens = {
  button: buttonComponentTokens,
  input: inputComponentTokens,
  card: cardComponentTokens,
  modal: modalComponentTokens,
  toast: toastComponentTokens,
} as const;

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type ButtonComponentTokens = typeof buttonComponentTokens;
export type InputComponentTokens = typeof inputComponentTokens;
export type CardComponentTokens = typeof cardComponentTokens;
export type ModalComponentTokens = typeof modalComponentTokens;
export type ToastComponentTokens = typeof toastComponentTokens;
export type ComponentTokens = typeof componentTokens;
