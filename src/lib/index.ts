/**
 * @fileoverview Main library exports for UI System
 * @module UISystemLib
 * @description Core UI system functionality without compliance overhead
 */

// Core system exports
export { UISystemCore,
  createProductionUISystem,
  createTestUISystem,
  createDevelopmentUISystem, } from './core/index';

// Core types and interfaces
export type { UISystemConfig,
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
  AuditTrailEntry, } from './types/core.types';

// Interfaces
export type { UISystemService,
  ComponentFactory,
  ComponentFactoryFunction,
  ThemeManager,
  AccessibilityService,
  PerformanceMonitor,
  AuditTrailService,
  AuditTrailFilter,
  ConfigurationService,
  EventPublisher,
  LocalizationService, } from './interfaces/ui-system.interface';

// Validation utilities
export type { ValidationResult } from './utils/validation';
export { createValidationResult,
  safeGet,
  safeArrayAccess,
  isValidEmail,
  isValidUrl, } from './utils/validation';
