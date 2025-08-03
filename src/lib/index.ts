/**
 * @fileoverview Main library exports for UI System
 * @module UISystemLib
 * @description Core UI system functionality without compliance overhead
 */

// Core system exports
export {
  UISystemCore,
  createDevelopmentUISystem,
  createProductionUISystem,
  createTestUISystem,
} from './core/index';

// Core types and interfaces
export type {
  AccessibilityLevel,
  AuditTrailEntry,
  ComponentAccessibilityConfig,
  ComponentDefinition,
  ComponentType,
  PerformanceMetrics,
  SupportedLanguage,
  ThemeColors,
  ThemeDefinition,
  UISystemConfig,
  UISystemOptions,
} from './types/core.types';

// Interfaces
export type {
  AccessibilityService,
  AuditTrailFilter,
  AuditTrailService,
  ComponentFactory,
  ComponentFactoryFunction,
  ConfigurationService,
  EventPublisher,
  LocalizationService,
  PerformanceMonitor,
  ThemeManager,
  UISystemService,
} from './interfaces/ui-system.interface';

// Validation utilities
export {
  createValidationResult,
  isValidEmail,
  isValidUrl,
  safeArrayAccess,
  safeGet,
} from './utils/validation';
export type { ValidationResult } from './utils/validation';

// Theme System
export {
  ThemeSwitcher,
  getThemeSwitcher,
  getServerTheme,
  generateThemeScript,
  themeTransitionCSS,
} from './theme/theme-switcher';
export type {
  Theme,
  ThemeSwitcherConfig,
} from './theme/theme-switcher';
