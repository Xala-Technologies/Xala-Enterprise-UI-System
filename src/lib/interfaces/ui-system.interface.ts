/**
 * @fileoverview Interface definitions for UI System (ISP compliance)
 * @module UISystemInterfaces
 * @description Enterprise UI System interfaces - Core functionality without compliance overhead
 */

// Local validation result type
import React from 'react';

import type { PerformanceMetrics, AuditTrailEntry } from '../types/core.types';


interface ValidationResult<T> { success: boolean;
  data?: T;
  error?: string; }

/**
 * Main UI System service interface (ISP - focused interface)
 */
export interface UISystemService { /**
   * Initialize the UI system
   */
  initialize(): Promise<ValidationResult<void>>;

  /**
   * Register a component in the system
   */
  registerComponent(name: string, component: unknown): ValidationResult<void>;

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
  dispose(): Promise<void>; }

/**
 * Component factory interface (OCP - extensible without modification)
 */
export interface ComponentFactory { /**
   * Create a component instance
   */
  createComponent<T>(name: string, props: unknown): ValidationResult<T>;

  /**
   * Register a component type
   */
  registerComponentType(name: string, factory: ComponentFactoryFunction): ValidationResult<void>;

  /**
   * Get available component types
   */
  getAvailableTypes(): readonly string[]; }

/**
 * Component factory function type
 */
export type ComponentFactoryFunction = (props: unknown) => ValidationResult<unknown>;

/**
 * Theme management interface (SRP - only theme responsibilities)
 */
export interface ThemeManager { /**
   * Get current theme
   */
  getCurrentTheme(): string;

  /**
   * Set current theme
   */
  setTheme(themeName: string): ValidationResult<void>;

  /**
   * Register a new theme
   */
  registerTheme(theme: unknown): ValidationResult<void>;

  /**
   * Get available themes
   */
  getAvailableThemes(): readonly string[];

  /**
   * Validate theme accessibility
   */
  validateThemeAccessibility(themeName: string): ValidationResult<boolean>; }

/**
 * Accessibility service interface (SRP - accessibility only)
 */
export interface AccessibilityService { /**
   * Validate component accessibility
   */
  validateComponentAccessibility(component: unknown): ValidationResult<boolean>;

  /**
   * Get accessibility violations
   */
  getAccessibilityViolations(component: unknown): readonly string[];

  /**
   * Check WCAG compliance level
   */
  checkWCAGCompliance(level: 'A' | 'AA' | 'AAA'): ValidationResult<boolean>;

  /**
   * Generate accessibility report
   */
  generateAccessibilityReport(): ValidationResult<unknown>; }

/**
 * Performance monitoring interface (SRP - performance only)
 */
export interface PerformanceMonitor { /**
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
  logMetric(name: string, value: number): void;

  /**
   * Generate performance report
   */
  generateReport(): ValidationResult<PerformanceMetrics>; }

/**
 * Audit trail service interface (SRP - auditing only)
 */
export interface AuditTrailService { /**
   * Log an audit trail entry
   */
  logEntry(entry: AuditTrailEntry): ValidationResult<void>;

  /**
   * Get audit trail entries
   */
  getEntries(filter?: AuditTrailFilter): readonly AuditTrailEntry[];

  /**
   * Export audit trail
   */
  exportAuditTrail(format: 'json' | 'csv'): ValidationResult<string>;

  /**
   * Clear audit trail (restricted operation)
   */
  clearAuditTrail(): ValidationResult<void>; }

/**
 * Audit trail filter interface
 */
export interface AuditTrailFilter { readonly startDate?: Date;
  readonly endDate?: Date;
  readonly component?: string;
  readonly action?: string;
  readonly user?: string; }

/**
 * Configuration service interface (SRP - configuration only)
 */
export interface ConfigurationService { /**
   * Get configuration value
   */
  getValue<T>(key: string): T | undefined;

  /**
   * Set configuration value
   */
  setValue<T>(key: string, value: T): ValidationResult<void>;

  /**
   * Validate configuration
   */
  validateConfiguration(): ValidationResult<boolean>;

  /**
   * Load configuration from source
   */
  loadConfiguration(source: string): ValidationResult<void>;

  /**
   * Export configuration
   */
  exportConfiguration(): ValidationResult<Record<string, unknown>>; }

/**
 * Event publisher interface (for decoupled communication)
 */
export interface EventPublisher { /**
   * Publish an event
   */
  publish<T>(eventName: string, data: T): void;

  /**
   * Subscribe to events
   */
  subscribe<T>(eventName: string, handler: (data: T) => void): () => void;

  /**
   * Unsubscribe from events
   */
  unsubscribe(eventName: string, handler: (data: unknown) => void): void; }

/**
 * Localization service interface (SRP - localization only)
 */
export interface LocalizationService { /**
   * Get current locale
   */
  getCurrentLocale(): string;

  /**
   * Set current locale
   */
  setLocale(locale: string): ValidationResult<void>;

  /**
   * Translate a key
   */
  translate(key: string, params?: Record<string, string>): string;

  /**
   * Get available locales
   */
  getAvailableLocales(): readonly string[];

  /**
   * Validate locale support
   */
  validateLocale(locale: string): ValidationResult<boolean>; }
