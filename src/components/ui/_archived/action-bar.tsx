/**
 * @fileoverview ActionBar Component v5.0.0 - Token-Based Design System (SOLID Refactored)
 * @description Main entry point for action bar system following SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

// Re-export all action bar components from the refactored components directory
export {
  ActionBar,
  ActionButton,
  defaultActions,
  createAction,
  createActions,
} from './action-bar/index';

export type {
  ActionBarProps,
  ActionBarVariant,
  ActionButtonProps,
  ActionButtonVariant,
  ActionConfig,
  ActionType,
  ActionBarSize,
  ActionBarOrientation,
  ActionBarVisibility,
  ActionBarPosition,
  ActionBarRounded,
  ActionButtonSize,
  ActionButtonShape,
} from './action-bar/index';
