/**
 * @fileoverview Core type definitions for UI System
 * @module CoreTypes
 * @description Enterprise UI System - Core functionality without compliance overhead
 */

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

/**
 * Component props interface
 */
export interface ComponentProps {
  readonly className?: string;
  readonly children?: unknown;
  readonly testId?: string;
  readonly 'aria-label'?: string;
  readonly style?: Record<string, unknown>;
  readonly id?: string;
  readonly role?: string;
  readonly tabIndex?: number;
  readonly 'aria-describedby'?: string;
  readonly 'aria-labelledby'?: string;
  readonly 'data-testid'?: string;
}

/**
 * Accessibility properties
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
  readonly onClick?: (event: unknown) => void;
  readonly onFocus?: (event: unknown) => void;
  readonly onBlur?: (event: unknown) => void;
  readonly onKeyDown?: (event: unknown) => void;
  readonly onKeyUp?: (event: unknown) => void;
  readonly onChange?: (event: unknown) => void;
}

/**
 * Component state
 */
export interface ComponentState {
  readonly isLoading: boolean;
  readonly isDisabled: boolean;
  readonly hasError: boolean;
  readonly errorMessage?: string;
  readonly isVisible: boolean;
  readonly isFocused: boolean;
}
