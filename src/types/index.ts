/**
 * @fileoverview Type definitions index for UI System
 * @module Types
 * @description Core type exports without compliance overhead
 */

// Core types from lib
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
} from '../lib/types/core.types';

// Interface types from lib
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
} from '../lib/interfaces/ui-system.interface';

// Component type exports
export * from './action-feedback.types';
export * from './data-display.types';
export * from './form.types';
export * from './layout.types';
export * from './localization.types';
export * from './platform.types';
