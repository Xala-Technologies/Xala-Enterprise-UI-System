/**
 * @fileoverview Enterprise UI System library exports
 * @module UISystemEnterprise
 * @description Core UI system functionality without compliance overhead
 */

// Core system exports
export {
  UISystemCore,
  createProductionUISystem,
  createTestUISystem,
  createDevelopmentUISystem,
} from './lib/core/index';

// Core types and interfaces
export type {
  UISystemConfig,
  UISystemOptions,
  SupportedLanguage,
  AccessibilityLevel,
  ThemeDefinition,
  ThemeColors,
  AccessibilityConfig,
  ComponentDefinition,
  ComponentType,
  ComponentAccessibilityConfig,
  ValidationError,
  PerformanceMetrics,
  AuditTrailEntry,
  ComponentProps,
  AccessibilityProps,
  EventHandlers,
  ComponentState,
} from './lib/types/core.types';

// Interfaces
export type {
  UISystemService,
  ComponentFactory,
  ComponentFactoryFunction,
  ThemeManager,
  AccessibilityService,
  PerformanceMonitor,
  AuditTrailService,
  AuditTrailFilter,
  ConfigurationService,
  EventPublisher,
  LocalizationService,
} from './lib/interfaces/ui-system.interface';

// Validation utilities
export type { ValidationResult } from './lib/utils/validation';
export {
  createValidationResult,
  safeGet,
  safeArrayAccess,
  isValidEmail,
  isValidUrl,
} from './lib/utils/validation';

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
