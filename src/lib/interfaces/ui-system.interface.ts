/**
 * @fileoverview Interface definitions for UI System (ISP compliance)
 * @module UISystemInterfaces
 * @description Enterprise UI System interfaces - Core functionality without compliance overhead
 */

// Local validation result type

import type { AuditTrailEntry, PerformanceMetrics } from '../types/core.types';

interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Main UI System service interface (ISP - focused interface)
 */
export interface UISystemService {
  /**
   * Initialize the UI system
   */
  initialize(): Promise<ValidationResult<void>>;

  /**
   * Register a component in the system
   */
   
  // eslint-disable-next-line no-unused-vars
  registerComponent(_name: string, _component: unknown): ValidationResult<void>;

  /**
   * Get component registry (read-only)
   */
  getComponentRegistry(): ReadonlyMap<string, unknown>;

  /**
   * Get theme registry (read-only)
   */
  getThemeRegistry(): ReadonlyMap<string, unknown>;

  /**
   * Cleanup resources
   */
  dispose(): Promise<void>;
}

/**
 * Component factory interface (OCP - extensible without modification)
 */
export interface ComponentFactory {
  /**
   * Create a component instance
   */
   
  // eslint-disable-next-line no-unused-vars
  createComponent<T>(_name: string, _props: unknown): ValidationResult<T>;

  /**
   * Register a component type
   */
   
  // eslint-disable-next-line no-unused-vars
  registerComponentType(_name: string, _factory: ComponentFactoryFunction): ValidationResult<void>;

  /**
   * Get available component types
   */
  getAvailableTypes(): readonly string[];
}

/**
 * Component factory function type
 */
// eslint-disable-next-line no-unused-vars
export type ComponentFactoryFunction = (_props: unknown) => ValidationResult<unknown>;

/**
 * Theme management interface (SRP - only theme responsibilities)
 */
export interface ThemeManager {
  /**
   * Get current theme
   */
  getCurrentTheme(): string;

  /**
   * Set current theme
   */
  // eslint-disable-next-line no-unused-vars
  setTheme(_themeName: string): ValidationResult<void>;

  /**
   * Register a new theme
   */
  // eslint-disable-next-line no-unused-vars
  registerTheme(_theme: unknown): ValidationResult<void>;

  /**
   * Get available themes
   */
  getAvailableThemes(): readonly string[];

  /**
   * Validate theme accessibility
   */
  // eslint-disable-next-line no-unused-vars
  validateThemeAccessibility(_themeName: string): ValidationResult<boolean>;
}

/**
 * Accessibility service interface (SRP - accessibility only)
 */
export interface AccessibilityService {
  /**
   * Validate component accessibility
   */
  // eslint-disable-next-line no-unused-vars
  validateComponentAccessibility(_component: unknown): ValidationResult<boolean>;

  /**
   * Get accessibility violations
   */
  // eslint-disable-next-line no-unused-vars
  getAccessibilityViolations(_component: unknown): readonly string[];

  /**
   * Check WCAG compliance level
   */
  // eslint-disable-next-line no-unused-vars
  checkWCAGCompliance(_level: 'A' | 'AA' | 'AAA'): ValidationResult<boolean>;

  /**
   * Generate accessibility report
   */
  generateAccessibilityReport(): ValidationResult<unknown>;
}

/**
 * Performance monitoring interface (SRP - performance only)
 */
export interface PerformanceMonitor {
  /**
   * Start performance monitoring
   */
  startMonitoring(): void;

  /**
   * Stop performance monitoring
   */
  stopMonitoring(): void;

  /**
   * Get current metrics
   */
  getCurrentMetrics(): PerformanceMetrics;

  /**
   * Log performance metric
   */
   
  // eslint-disable-next-line no-unused-vars
  logMetric(_name: string, _value: number): void;

  /**
   * Generate performance report
   */
  generateReport(): ValidationResult<PerformanceMetrics>;
}

/**
 * Audit trail service interface (SRP - auditing only)
 */
export interface AuditTrailService {
  /**
   * Log an audit trail entry
   */
  // eslint-disable-next-line no-unused-vars
  logEntry(_entry: AuditTrailEntry): ValidationResult<void>;

  /**
   * Get audit trail entries
   */
  // eslint-disable-next-line no-unused-vars
  getEntries(filter?: AuditTrailFilter): readonly AuditTrailEntry[];

  /**
   * Export audit trail
   */
  // eslint-disable-next-line no-unused-vars
  exportAuditTrail(_format: 'json' | 'csv'): ValidationResult<string>;

  /**
   * Clear audit trail (restricted operation)
   */
  clearAuditTrail(): ValidationResult<void>;
}

/**
 * Audit trail filter interface
 */
export interface AuditTrailFilter {
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly component?: string;
  readonly action?: string;
  readonly user?: string;
}

/**
 * Configuration service interface (SRP - configuration only)
 */
export interface ConfigurationService {
  /**
   * Get configuration value
   */
  // eslint-disable-next-line no-unused-vars
  getValue<T>(_key: string): T | undefined;

  /**
   * Set configuration value
   */
   
  // eslint-disable-next-line no-unused-vars
  setValue<T>(_key: string, _value: T): ValidationResult<void>;

  /**
   * Validate configuration
   */
  validateConfiguration(): ValidationResult<boolean>;

  /**
   * Load configuration from source
   */
  // eslint-disable-next-line no-unused-vars
  loadConfiguration(_source: string): ValidationResult<void>;

  /**
   * Export configuration
   */
  exportConfiguration(): ValidationResult<Record<string, unknown>>;
}

/**
 * Event publisher interface (for decoupled communication)
 */
export interface EventPublisher {
  /**
   * Publish an event
   */
   
  // eslint-disable-next-line no-unused-vars
  publish<T>(_eventName: string, _data: T): void;

  /**
   * Subscribe to events
   */
   
   
  // eslint-disable-next-line no-unused-vars
  subscribe<T>(_eventName: string, _handler: (_data: T) => void): () => void;

  /**
   * Unsubscribe from events
   */
   
   
  // eslint-disable-next-line no-unused-vars
  unsubscribe(_eventName: string, _handler: (_data: unknown) => void): void;
}

/**
 * Localization service interface (SRP - localization only)
 */
export interface LocalizationService {
  /**
   * Get current locale
   */
  getCurrentLocale(): string;

  /**
   * Set current locale
   */
  // eslint-disable-next-line no-unused-vars
  setLocale(_locale: string): ValidationResult<void>;

  /**
   * Translate a key
   */
   
  // eslint-disable-next-line no-unused-vars
  translate(_key: string, params?: Record<string, string>): string;

  /**
   * Get available locales
   */
  getAvailableLocales(): readonly string[];

  /**
   * Validate locale support
   */
  // eslint-disable-next-line no-unused-vars
  validateLocale(_locale: string): ValidationResult<boolean>;
}
