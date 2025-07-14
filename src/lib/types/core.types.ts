/**
 * @fileoverview Core type definitions for UI System
 * @module CoreTypes
 * @description Enterprise UI System - Core functionality without compliance overhead
 */

import type { ReactNode, CSSProperties as ReactCSSProperties } from 'react';

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

  // Custom CSS properties for design tokens
  '--color-primary'?: string;
  '--color-secondary'?: string;
  '--spacing-unit'?: string;
  '--border-radius'?: string;
  '--font-family'?: string;
  '--line-length-norwegian-sm'?: string;
  '--line-length-norwegian-md'?: string;
  '--line-length-norwegian-lg'?: string;
  '--line-length-norwegian-xl'?: string;

  // Custom layout properties
  lineLength?: string;

  // Allow any CSS custom property
  [key: `--${string}`]: string | number | undefined;

  // Allow any pseudo-selector
  [key: `:${string}`]: CSSProperties | undefined;

  // Allow any at-rule
  [key: `@${string}`]: any;
}

/**
 * Base component properties with strict typing
 */
export interface ComponentProps {
  readonly className?: string;
  readonly children?: ReactNode;
  readonly testId?: string;
  readonly 'aria-label'?: string;
  readonly style?: CSSProperties;
  readonly id?: string;
  readonly role?: string;
  readonly tabIndex?: number;
  readonly 'aria-describedby'?: string;
  readonly 'aria-labelledby'?: string;
  readonly 'data-testid'?: string;
}

/**
 * Accessibility properties for all components
 */
export interface AccessibilityProps {
  readonly 'aria-label'?: string;
  readonly 'aria-labelledby'?: string;
  readonly 'aria-describedby'?: string;
  readonly 'aria-expanded'?: boolean;
  readonly 'aria-hidden'?: boolean;
  readonly 'aria-live'?: 'off' | 'polite' | 'assertive';
  readonly 'aria-atomic'?: boolean;
  readonly 'aria-busy'?: boolean;
  readonly 'aria-controls'?: string;
  readonly 'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  readonly 'aria-disabled'?: boolean;
  readonly 'aria-invalid'?: boolean | 'grammar' | 'spelling';
  readonly 'aria-pressed'?: boolean;
  readonly 'aria-selected'?: boolean;
  readonly role?: string;
  readonly tabIndex?: number;
}

/**
 * Event handler types
 */
export interface EventHandlers {
  readonly onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  readonly onFocus?: (event: React.FocusEvent<HTMLElement>) => void;
  readonly onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
  readonly onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  readonly onKeyUp?: (event: React.KeyboardEvent<HTMLElement>) => void;
  readonly onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
}

/**
 * Component state types
 */
export interface ComponentState {
  readonly isLoading: boolean;
  readonly isDisabled: boolean;
  readonly hasError: boolean;
  readonly errorMessage?: string;
  readonly isVisible: boolean;
  readonly isFocused: boolean;
}

/**
 * Supported languages
 */
export type SupportedLanguage = 'en-US' | 'nb-NO' | 'nn-NO' | 'fr-FR' | 'ar-SA';

/**
 * Accessibility compliance levels
 */
export type AccessibilityLevel = 'A' | 'AA' | 'AAA';

/**
 * Core UI System configuration
 */
export interface UISystemConfig {
  readonly theme: string;
  readonly locale: SupportedLanguage;
  readonly accessibilityLevel: AccessibilityLevel;
  readonly enableAccessibilityValidation: boolean;
  readonly enablePerformanceMonitoring: boolean;
}

/**
 * UI System initialization options
 */
export interface UISystemOptions {
  readonly enableCache?: boolean;
  readonly enablePerformanceMonitoring?: boolean;
  readonly customThemes?: readonly ThemeDefinition[];
  readonly customComponents?: readonly ComponentDefinition[];
}

/**
 * Theme definition
 */
export interface ThemeDefinition {
  readonly name: string;
  readonly colors: ThemeColors;
  readonly accessibility: AccessibilityConfig;
}

/**
 * Theme color palette
 */
export interface ThemeColors {
  readonly primary: string;
  readonly secondary: string;
  readonly success: string;
  readonly warning: string;
  readonly error: string;
  readonly info: string;
}

/**
 * Accessibility configuration for themes
 */
export interface AccessibilityConfig {
  readonly contrastRatio: number;
  readonly focusIndicator: string;
  readonly highContrast: boolean;
}

/**
 * Component definition interface (ISP - small, focused interface)
 */
export interface ComponentDefinition {
  readonly name: string;
  readonly type: ComponentType;
  readonly accessibility: ComponentAccessibilityConfig;
}

/**
 * Component types
 */
export type ComponentType =
  | 'form'
  | 'action-feedback'
  | 'data-display'
  | 'layout'
  | 'platform-specific';

/**
 * Component accessibility configuration
 */
export interface ComponentAccessibilityConfig {
  readonly ariaLabel: string;
  readonly keyboardNavigation: boolean;
  readonly screenReaderSupport: boolean;
  readonly minimumTouchTarget: number; // Minimum 44px for accessibility standards
}

/**
 * Component registry type
 */
export type ComponentRegistry = Map<string, unknown>;

/**
 * Theme registry type
 */
export type ThemeRegistry = Map<string, ThemeDefinition>;

/**
 * Validation error types
 */
export interface ValidationError {
  readonly code: string;
  readonly message: string;
  readonly field?: string;
}

/**
 * Performance metrics
 */
export interface PerformanceMetrics {
  readonly initializationTime: number;
  readonly renderTime: number;
  readonly memoryUsage: number;
  readonly componentCount: number;
}

/**
 * Audit trail entry
 */
export interface AuditTrailEntry {
  readonly timestamp: Date;
  readonly action: string;
  readonly component: string;
  readonly user?: string;
  readonly metadata?: Record<string, unknown>;
}
