/**
 * @fileoverview ActionBar Types and Interfaces v5.0.0 - Token-Based Design System
 * @description Type definitions for action bar system following SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

// =============================================================================
// ACTION BAR TYPES
// =============================================================================

export type ActionBarVariant = 'default' | 'ghost' | 'floating' | 'inline';
export type ActionBarSize = 'sm' | 'md' | 'lg';
export type ActionBarOrientation = 'horizontal' | 'vertical';
export type ActionBarVisibility = 'always' | 'hover' | 'focus' | 'hover-focus';
export type ActionBarPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center' | 'relative';
export type ActionBarRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';

// =============================================================================
// ACTION BUTTON TYPES
// =============================================================================

export type ActionButtonVariant = 'default' | 'ghost' | 'outline' | 'primary' | 'destructive' | 'success';
export type ActionButtonSize = 'sm' | 'md' | 'lg';
export type ActionButtonShape = 'square' | 'circle';

// =============================================================================
// ACTION TYPES
// =============================================================================

export type ActionType =
  | 'copy'
  | 'regenerate'
  | 'edit'
  | 'delete'
  | 'save'
  | 'share'
  | 'download'
  | 'bookmark'
  | 'flag'
  | 'thumbs-up'
  | 'thumbs-down'
  | 'retry'
  | 'expand'
  | 'collapse'
  | 'more';

// =============================================================================
// INTERFACES
// =============================================================================

/**
 * Action configuration interface
 * Follows ISP by providing focused interface for action definition
 */
export interface ActionConfig {
  readonly type: ActionType;
  readonly label: string;
  readonly norwegianLabel: string;
  readonly icon?: React.ReactNode;
  readonly iconPath?: string;
  readonly disabled?: boolean;
  readonly variant?: ActionButtonVariant;
  readonly size?: ActionButtonSize;
  readonly shape?: ActionButtonShape;
  readonly tooltip?: string;
  readonly norwegianTooltip?: string;
  readonly loading?: boolean;
  readonly confirmRequired?: boolean;
  readonly onClick: () => void;
}

/**
 * Action bar configuration interface
 * Follows SRP by handling only action bar configuration concerns
 */
interface BaseActionBarConfig {
  readonly variant?: ActionBarVariant;
  readonly size?: ActionBarSize;
  readonly orientation?: ActionBarOrientation;
  readonly visibility?: ActionBarVisibility;
  readonly position?: ActionBarPosition;
  readonly rounded?: ActionBarRounded;
  readonly maxButtons?: number;
  readonly showLabels?: boolean;
  readonly showTooltips?: boolean;
}

/**
 * Action bar props interface
 * Follows ISP by separating action configuration from UI configuration
 */
export interface ActionBarProps extends React.HTMLAttributes<HTMLDivElement>, BaseActionBarConfig {
  readonly actions: ActionConfig[];
  readonly disabled?: boolean;
  readonly loading?: boolean;
}