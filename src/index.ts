/**
 * @fileoverview Main UI System exports
 * @module UISystem
 * @description Enterprise UI System - Core functionality without compliance overhead
 */

// =============================================================================
// CORE SYSTEM EXPORTS
// =============================================================================

// Core system functionality
export {
  createDevelopmentUISystem, createProductionUISystem,
  createTestUISystem, UISystemCore
} from './lib/core/index';

// =============================================================================
// CORE TYPES AND INTERFACES
// =============================================================================

// Core system types
export type {
  AccessibilityConfig, AccessibilityLevel, AccessibilityProps, AuditTrailEntry, ComponentAccessibilityConfig, ComponentDefinition, ComponentProps, ComponentState, ComponentType, EventHandlers, PerformanceMetrics, SupportedLanguage, ThemeColors, ThemeDefinition, UISystemConfig,
  UISystemOptions, ValidationError
} from './lib/types/core.types';

// Service interfaces
export type {
  AccessibilityService, AuditTrailFilter, AuditTrailService, ComponentFactory,
  ComponentFactoryFunction, ConfigurationService,
  EventPublisher,
  LocalizationService, PerformanceMonitor, ThemeManager, UISystemService
} from './lib/interfaces/ui-system.interface';

// =============================================================================
// UTILITIES
// =============================================================================

// Validation utilities
export {
  createValidationResult, isValidEmail,
  isValidUrl, safeArrayAccess, safeGet
} from './lib/utils/validation';
export type { ValidationResult } from './lib/utils/validation';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

// All design tokens
export * from './tokens';

// =============================================================================
// COMPONENTS
// =============================================================================

// All components (includes their own types)
export * from './components';

// =============================================================================
// ADDITIONAL TYPES (non-conflicting)
// =============================================================================

// Localization types (only export those not already in components)
export type {
  LocalizationConfig, NorwegianLocale, RTLAwareProps, SupportedLocale,
  TextDirection, TranslationFunction, TranslationKeys, UseLocalizationReturn
} from './types/localization.types';

// Platform types (only export those not already in components)
export type {
  HoverFriendlyProps, NorwegianPlatformConfig,
  PlatformComponentProps, PlatformDetection, PlatformTypes,
  ResponsiveBreakpoints, TouchFriendlyProps
} from './types/platform.types';

// =============================================================================
// PACKAGE INFORMATION
// =============================================================================

// Version and package info
export const VERSION = '1.0.1';
export const PACKAGE_NAME = '@xala-technologies/ui-system';

/**
 * Package information for enterprise monitoring
 */
export const PACKAGE_INFO = {
  name: PACKAGE_NAME,
  version: VERSION,
  description: 'Enterprise UI component library with accessibility and performance monitoring',
  platform: 'react',
  features: [
    'accessibility-validation',
    'type-safety',
    'performance-monitoring',
    'enterprise-standards',
    'solid-principles',
  ],
} as const;

// =============================================================================
// EXPORT GROUPS FOR EASIER CONSUMPTION
// =============================================================================

/**
 * Core system exports grouped for easier consumption
 * Use these exports directly instead of this bundle
 */
export const UI_SYSTEM_BUNDLE_INFO = {
  coreExports: ['UISystemCore', 'createProductionUISystem', 'createTestUISystem', 'createDevelopmentUISystem'],
  validationExports: ['createValidationResult', 'safeGet', 'safeArrayAccess', 'isValidEmail', 'isValidUrl'],
  componentExports: ['All components from ./components'],
  tokenExports: ['All tokens from ./tokens'],
  typeExports: ['All types from various modules'],
} as const;
