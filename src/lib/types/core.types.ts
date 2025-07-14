/**
 * @fileoverview Core type definitions for UI System
 * @module CoreTypes
 * @description Enterprise UI System - Core functionality without compliance overhead
 */

import React from 'react';

import type { CSSProperties as ReactCSSProperties } from 'react';
import type { AccessibilityConfig, AccessibilityPreset } from '../../tokens/accessibility-tokens';

/**
 * Enhanced CSS Properties with pseudo-selectors, keyframes, and custom properties
 */
export interface CSSProperties extends ReactCSSProperties {
  // Pseudo-selectors
  ':hover'?: CSSProperties;
  ':focus'?: CSSProperties;
  ':active'?: CSSProperties;
  ':visited'?: CSSProperties;
  ':disabled'?: CSSProperties;
  ':focus-within'?: CSSProperties;
  ':first-child'?: CSSProperties;
  ':last-child'?: CSSProperties;
  ':nth-child(odd)'?: CSSProperties;
  ':nth-child(even)'?: CSSProperties;

  // Keyframes and animations
  '@keyframes badge-pulse'?: {
    [key: string]: CSSProperties;
  };
  '@keyframes fadeIn'?: {
    [key: string]: CSSProperties;
  };
  '@keyframes slideIn'?: {
    [key: string]: CSSProperties;
  };

  // Custom properties (CSS Variables)
  '--color-primary'?: string;
  '--color-secondary'?: string;
  '--color-success'?: string;
  '--color-warning'?: string;
  '--color-error'?: string;
  '--color-info'?: string;
  '--spacing-xs'?: string;
  '--spacing-sm'?: string;
  '--spacing-md'?: string;
  '--spacing-lg'?: string;
  '--spacing-xl'?: string;
  '--font-size-xs'?: string;
  '--font-size-sm'?: string;
  '--font-size-md'?: string;
  '--font-size-lg'?: string;
  '--font-size-xl'?: string;
  '--border-radius-sm'?: string;
  '--border-radius-md'?: string;
  '--border-radius-lg'?: string;
  '--line-height-tight'?: string;
  '--line-height-normal'?: string;
  '--line-height-relaxed'?: string;
  [key: string]: string | number | undefined | CSSProperties; // Allow custom CSS properties

  // Media queries
  '@media (prefers-reduced-motion: reduce)'?: CSSProperties;
  '@media (prefers-contrast: high)'?: CSSProperties;
  '@media (max-width: 768px)'?: CSSProperties;
  '@media (min-width: 769px)'?: CSSProperties;
  '@media (min-width: 1024px)'?: CSSProperties;
  '@media (min-width: 1200px)'?: CSSProperties;
}

/**
 * Supported languages for UI system
 */
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'sv' | 'da' | 'fi' | 'no';

/**
 * Accessibility levels
 */
export type AccessibilityLevel = 'WCAG_2_1_AA' | 'WCAG_2_1_AAA' | 'WCAG_2_2_AA' | 'WCAG_2_2_AAA' | 'none';

/**
 * Main UI System configuration
 */
export interface UISystemConfig {
  /** System name/identifier */
  readonly name: string;
  
  /** System version */
  readonly version: string;
  
  /** Default language */
  readonly defaultLanguage: SupportedLanguage;
  
  /** Accessibility configuration (optional) */
  readonly accessibility?: AccessibilityConfig | AccessibilityPreset;
  
  /** Theme configuration */
  readonly theme?: {
    readonly mode?: 'light' | 'dark' | 'auto';
    readonly primary?: string;
    readonly secondary?: string;
    readonly customTokens?: Record<string, string>;
  };
  
  /** Performance configuration */
  readonly performance?: {
    readonly enableVirtualization?: boolean;
    readonly enableLazyLoading?: boolean;
    readonly enableMemoization?: boolean;
    readonly bundleSize?: 'minimal' | 'standard' | 'full';
  };
  
  /** Development configuration */
  readonly development?: {
    readonly enableDebugMode?: boolean;
    readonly enablePerformanceMonitoring?: boolean;
    readonly enableA11yWarnings?: boolean;
    readonly logLevel?: 'error' | 'warn' | 'info' | 'debug';
  };
}

/**
 * UI System initialization options
 */
export interface UISystemOptions {
  /** Configuration object */
  readonly config: UISystemConfig;
  
  /** Custom CSS injection */
  readonly customCSS?: string;
  
  /** Custom token overrides */
  readonly tokenOverrides?: Record<string, string>;
  
  /** Container element for the UI system */
  readonly container?: HTMLElement;
  
  /** Initialization callbacks */
  readonly onInitialized?: () => void;
  readonly onError?: (error: Error) => void;
}

/**
 * Base component props
 */
export interface ComponentProps {
  /** Custom CSS class names */
  readonly className?: string;
  
  /** Inline styles (discouraged, use tokens instead) */
  readonly style?: CSSProperties;
  
  /** Test identifier for automated testing */
  readonly testId?: string;
  
  /** Custom data attributes */
  readonly [key: `data-${string}`]: string | undefined;
  
  /** ARIA attributes for accessibility */
  readonly [key: `aria-${string}`]: string | boolean | undefined;
}

/**
 * Component state interface
 */
export interface ComponentState {
  readonly isLoading: boolean;
  readonly isDisabled: boolean;
  readonly hasError: boolean;
  readonly isFocused: boolean;
  readonly isVisible: boolean;
}

/**
 * Event handlers interface
 */
export interface EventHandlers {
  readonly onClick?: (event: MouseEvent) => void;
  readonly onKeyDown?: (event: KeyboardEvent) => void;
  readonly onFocus?: (event: FocusEvent) => void;
  readonly onBlur?: (event: FocusEvent) => void;
  readonly onChange?: (value: unknown) => void;
}

/**
 * Accessibility props interface
 */
export interface AccessibilityProps {
  /** ARIA label */
  readonly 'aria-label'?: string;
  
  /** ARIA described by */
  readonly 'aria-describedby'?: string;
  
  /** ARIA required */
  readonly 'aria-required'?: boolean;
  
  /** ARIA invalid */
  readonly 'aria-invalid'?: boolean;
  
  /** ARIA expanded */
  readonly 'aria-expanded'?: boolean;
  
  /** ARIA hidden */
  readonly 'aria-hidden'?: boolean;
  
  /** Tab index */
  readonly tabIndex?: number;
  
  /** Role */
  readonly role?: string;
}

/**
 * Theme colors interface
 */
export interface ThemeColors {
  readonly primary: string;
  readonly secondary: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly info: string;
  readonly background: string;
  readonly surface: string;
  readonly text: string;
  readonly border: string;
}

/**
 * Theme definition interface
 */
export interface ThemeDefinition {
  readonly name: string;
  readonly colors: ThemeColors;
  readonly spacing: Record<string, string>;
  readonly typography: Record<string, string>;
  readonly borderRadius: Record<string, string>;
  readonly shadows: Record<string, string>;
  readonly breakpoints: Record<string, string>;
}

/**
 * Component definition interface
 */
export interface ComponentDefinition {
  readonly name: string;
  readonly type: ComponentType;
  readonly props: ComponentProps;
  readonly state: ComponentState;
  readonly accessibility: AccessibilityProps;
  readonly theme: Partial<ThemeDefinition>;
}

/**
 * Component type enumeration
 */
export type ComponentType = 
  | 'button'
  | 'input'
  | 'select'
  | 'textarea' 
  | 'checkbox'
  | 'radio'
  | 'modal'
  | 'drawer'
  | 'toast'
  | 'alert'
  | 'card'
  | 'table'
  | 'list'
  | 'navigation'
  | 'layout'
  | 'form'
  | 'data-display'
  | 'feedback'
  | 'platform';

/**
 * Accessibility configuration interface
 */
export interface ComponentAccessibilityConfig {
  readonly level: AccessibilityLevel;
  readonly announcements: boolean;
  readonly keyboardNavigation: boolean;
  readonly focusManagement: boolean;
  readonly colorContrast: number;
  readonly touchTargets: number;
}

/**
 * Performance metrics interface
 */
export interface PerformanceMetrics {
  readonly initializationTime: number;
  readonly renderTime: number;
  readonly memoryUsage: number;
  readonly bundleSize: number;
  readonly componentsLoaded: number;
}

/**
 * Audit trail entry interface
 */
export interface AuditTrailEntry {
  readonly timestamp: Date;
  readonly action: string;
  readonly component: string;
  readonly user?: string;
  readonly details: Record<string, unknown>;
}

/**
 * Theme registry type
 */
export type ThemeRegistry = Map<string, ThemeDefinition>;
