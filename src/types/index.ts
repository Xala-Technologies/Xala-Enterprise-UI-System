/**
 * @fileoverview Type definitions for @xala-technologies/ui-system
 * @module UISystemTypes
 * @compliance NSM, GDPR, WCAG AAA
 */

import type { NSMClassification } from '@xala-technologies/foundation';
import type { ReactNode, CSSProperties as ReactCSSProperties } from 'react';

import type { ValidationResult } from '../lib/utils/validation';

// Re-export core types from lib
export type {
  UISystemConfig,
  UISystemOptions,
  NorwegianCompliance,
  NorwegianLanguage,
  WCAGLevel,
  ThemeDefinition,
  ThemeColors,
  AccessibilityConfig,
  ComponentDefinition,
  ComponentType,
  ComponentAccessibilityConfig,
  ValidationError,
  PerformanceMetrics,
  AuditTrailEntry,
} from '../lib/types/core.types';

// Re-export interfaces
export type {
  UISystemService,
  ComponentFactory,
  ComponentFactoryFunction,
  ThemeManager,
  AccessibilityService,
  PerformanceMonitor,
  NorwegianComplianceValidator,
  AuditTrailService,
  AuditTrailFilter,
  ConfigurationService,
  EventPublisher,
  LocalizationService,
} from '../lib/interfaces/ui-system.interface';

/**
 * Strict CSS properties without 'any' types
 */
export interface CSSProperties extends ReactCSSProperties {
  // Custom CSS properties for design tokens
  '--color-primary'?: string;
  '--color-secondary'?: string;
  '--spacing-unit'?: string;
  '--border-radius'?: string;
  '--font-family'?: string;
  // Pseudo-selectors for enhanced styling
  '&:hover'?: CSSProperties;
  '&:focus'?: CSSProperties;
  '&:focus-within'?: CSSProperties;
  '&:active'?: CSSProperties;
  '&:disabled'?: CSSProperties;
}

/**
 * Norwegian UI configuration with strict typing
 */
export interface NorwegianUIConfig {
  readonly language: 'nb-NO' | 'nn-NO' | 'en-US';
  readonly municipality?: string;
  readonly accessibility: 'WCAG_2_2_AA' | 'WCAG_2_2_AAA';
  readonly compliance: {
    readonly nsm: boolean;
    readonly gdpr: boolean;
  };
  readonly nsmClassification: NSMClassification;
}

/**
 * Design token definition with type safety
 */
export interface DesignToken {
  readonly name: string;
  readonly value: string;
  readonly category: 'color' | 'spacing' | 'typography' | 'border' | 'shadow';
  readonly description?: string;
  readonly accessibility?: {
    readonly contrastRatio?: number;
    readonly wcagLevel?: 'AA' | 'AAA';
  };
  readonly nsmClassification: NSMClassification;
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
  readonly nsmClassification?: NSMClassification;
}

/**
 * Semantic component properties
 */
export interface SemanticComponentProps extends ComponentProps {
  readonly variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success';
  readonly size?: 'small' | 'medium' | 'large' | 'extra-large';
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

/**
 * Platform-specific component properties (mobile)
 */
export interface MobileComponentProps extends ComponentProps {
  readonly touchFriendly?: boolean;
  readonly swipeEnabled?: boolean;
  readonly minimumTouchTarget?: number; // Minimum 44px
  readonly gestureSupport?: boolean;
}

/**
 * Platform-specific component properties (desktop)
 */
export interface DesktopComponentProps extends ComponentProps {
  readonly hoverEnabled?: boolean;
  readonly keyboardNavigation?: boolean;
  readonly mouseSupport?: boolean;
  readonly contextMenuEnabled?: boolean;
}

/**
 * Norwegian form component properties with validation
 */
export interface NorwegianFormProps extends ComponentProps {
  readonly labelKey: string;
  readonly errorKey?: string;
  readonly required?: boolean;
  readonly validation?: {
    readonly personalNumber?: boolean;
    readonly organizationNumber?: boolean;
    readonly postalCode?: boolean;
    readonly phoneNumber?: boolean;
    readonly email?: boolean;
  };
  readonly norwegianCompliance: {
    readonly nsmClassification: NSMClassification;
    readonly gdprCompliant: boolean;
    readonly wcagLevel: 'A' | 'AA' | 'AAA';
    readonly supportedLanguages: readonly string[];
    readonly auditTrail: boolean;
  };
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
 * Norwegian specific validation types
 */
export type NorwegianPersonalNumber = string & { readonly __brand: 'NorwegianPersonalNumber' };
export type NorwegianOrganizationNumber = string & {
  readonly __brand: 'NorwegianOrganizationNumber';
};
export type NorwegianPostalCode = string & { readonly __brand: 'NorwegianPostalCode' };
export type NorwegianPhoneNumber = string & { readonly __brand: 'NorwegianPhoneNumber' };

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
 * Theme context type
 */
export interface ThemeContext {
  readonly currentTheme: string;
  readonly availableThemes: readonly string[];
  readonly setTheme: (theme: string) => ValidationResult<void>;
  readonly themeColors: {
    readonly primary: string;
    readonly secondary: string;
    readonly success: string;
    readonly warning: string;
    readonly error: string;
    readonly info: string;
  };
  readonly accessibility: {
    readonly contrastRatio: number;
    readonly focusIndicator: string;
    readonly highContrast: boolean;
  };
}

/**
 * Localization context type
 */
export interface LocalizationContext {
  readonly currentLocale: string;
  readonly availableLocales: readonly string[];
  readonly setLocale: (locale: string) => ValidationResult<void>;
  readonly translate: (key: string, params?: Record<string, string>) => string;
  readonly formatDate: (date: Date) => string;
  readonly formatNumber: (number: number) => string;
}

// Re-export layout types
export * from './layout.types';

// Re-export form types
export * from './form.types';

// Re-export data display types
export * from './data-display.types';

// Re-export action feedback types
export * from './action-feedback.types';

// Re-export platform types
export * from './platform.types';
