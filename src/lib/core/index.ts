/**
 * @fileoverview Core UI System implementation
 * @module UISystemCore
 * @description Enterprise UI System - Core functionality without compliance overhead
 */

import React from 'react';

import { Logger, EventCore } from '@xala-technologies/enterprise-standards';

import type { UISystemService } from '../interfaces/ui-system.interface';
import type { UISystemConfig, ComponentRegistry, ThemeRegistry } from '../types/core.types';


// Local types
interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Create simple validation result functions
function createSuccessResult<T>(data: T): ValidationResult<T> {
  return { success: true as const, data };
}

function createFailureResult<T>(error: string): ValidationResult<T> {
  return { success: false as const, error };
}

const createValidationResult = {
  success: createSuccessResult,
  failure: createFailureResult,
};

/**
 * Core UI System service implementing SOLID principles
 * Follows Single Responsibility: Manages UI system lifecycle and coordination
 */
export class UISystemCore implements UISystemService {
  private readonly logger: Logger;
  private readonly events: EventCore;
  private readonly componentRegistry: ComponentRegistry;
  private readonly themeRegistry: ThemeRegistry;
  private readonly config: UISystemConfig;
  private initializationPromise: Promise<void> | null = null;
  private isInitialized = false;

  /**
   * Private constructor enforcing proper initialization through factory methods
   */
  private constructor(config: UISystemConfig) {
    // Store configuration
    this.config = config;

    // Initialize foundation services
    this.logger = Logger.create({
      serviceName: 'ui-system',
      logLevel: 'info',
      enableConsoleLogging: true,
      enableFileLogging: false,
    });

    this.events = EventCore.create({
      serviceName: 'ui-system',
      enablePerformanceMonitoring: true,
      enableHistory: true,
    });

    // Initialize registries
    this.componentRegistry = new Map();
    this.themeRegistry = new Map();

    // Log initialization
    this.logger.info('UISystemCore initialized', {
      theme: config.theme,
      locale: config.locale,
      accessibilityLevel: config.accessibilityLevel,
    });
  }

  /**
   * Factory method following the Factory pattern (GoF)
   * Ensures proper initialization and configuration
   */
  static create(config: Partial<UISystemConfig> = {}): UISystemCore {
    const defaultConfig: UISystemConfig = {
      theme: 'default',
      locale: 'en-US',
      accessibilityLevel: 'AAA',
      enableAccessibilityValidation: true,
      enablePerformanceMonitoring: true,
    };

    const mergedConfig = { ...defaultConfig, ...config };
    return new UISystemCore(mergedConfig);
  }

  /**
   * Initialize the UI system (async initialization pattern)
   */
  public async initialize(): Promise<ValidationResult<void>> {
    if (this.isInitialized) {
      return createValidationResult.success(undefined);
    }

    if (this.initializationPromise) {
      await this.initializationPromise;
      return createValidationResult.success(undefined);
    }

    this.initializationPromise = this.performInitialization();

    try {
      await this.initializationPromise;
      this.isInitialized = true;

      this.logger.info('UISystemCore initialized successfully', {
        theme: this.config.theme,
        locale: this.config.locale,
        accessibilityLevel: this.config.accessibilityLevel,
      });

      return createValidationResult.success(undefined);
    } catch (error) {
      this.logger.error('UISystemCore initialization failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      return createValidationResult.failure(
        `UI System initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Private initialization implementation
   */
  private async performInitialization(): Promise<void> {
    const startTime = Date.now();

    // Initialize theme registry with Norwegian themes
    await this.initializeThemeRegistry();

    // Initialize component registry
    await this.initializeComponentRegistry();

    // Register event listeners
    this.registerEventListeners();

    const initializationTime = Date.now() - startTime;

    // Enforce <100ms initialization requirement
    if (initializationTime > 100) {
      this.logger.warn('Initialization time exceeded 100ms threshold', {
        initializationTime,
      });
    }

    this.events.emit('ui-system:initialized', {
      id: 'ui-system-init',
      type: 'ui-system:initialized',
      source: 'ui-system',
      timestamp: new Date(),
      data: {
        initializationTime,
      },
    });
  }

  /**
   * Initialize theme registry with Norwegian compliance
   */
  private async initializeThemeRegistry(): Promise<void> {
    // Register Norwegian government theme
    this.themeRegistry.set('norwegian-government', {
      name: 'norwegian-government',
      colors: {
        primary: '#1a365d',
        secondary: '#2d3748',
        success: '#38a169',
        warning: '#d69e2e',
        error: '#e53e3e',
        info: '#3182ce',
      },
      accessibility: {
        contrastRatio: 7.0, // WCAG AAA
        focusIndicator: '#005fcc',
        highContrast: true,
      },
    });

    // Register high contrast theme for accessibility
    this.themeRegistry.set('high-contrast', {
      name: 'high-contrast',
      colors: {
        primary: '#000000',
        secondary: '#ffffff',
        success: '#00ff00',
        warning: '#ffff00',
        error: '#ff0000',
        info: '#0000ff',
      },
      accessibility: {
        contrastRatio: 21.0, // Maximum contrast
        focusIndicator: '#ff0000',
        highContrast: true,
      },
    });
  }

  /**
   * Initialize component registry
   */
  private async initializeComponentRegistry(): Promise<void> {
    // Component registry will be populated by component modules
    // This follows ISP - components register themselves
    this.logger.debug('Component registry initialized');
  }

  /**
   * Register event listeners for system events
   */
  private registerEventListeners(): void {
    this.events.on('component:registered', (data: unknown) => {
      const eventData = data as { data?: { name?: string } };
      this.logger.debug('Component registered', {
        componentName: eventData.data?.name || 'unknown',
      });
    });

    this.events.on('theme:changed', (data: unknown) => {
      const eventData = data as { data?: { theme?: string } };
      this.logger.info('Theme changed', {
        newTheme: eventData.data?.theme || 'unknown',
      });
    });
  }

  /**
   * Get component registry (read-only access)
   */
  public getComponentRegistry(): ReadonlyMap<string, unknown> {
    return this.componentRegistry;
  }

  /**
   * Get theme registry (read-only access)
   */
  public getThemeRegistry(): ReadonlyMap<string, unknown> {
    return this.themeRegistry;
  }

  /**
   * Register a component in the system
   */
  public registerComponent(name: string, component: unknown): ValidationResult<void> {
    if (this.componentRegistry.has(name)) {
      return createValidationResult.failure(`Component ${name} is already registered`);
    }

    this.componentRegistry.set(name, component);

    this.events.emit('component:registered', {
      id: `component-${name}`,
      type: 'component:registered',
      source: 'ui-system',
      timestamp: new Date(),
      data: {
        name,
      },
    });

    this.logger.debug('Component registered successfully', {
      componentName: name,
    });

    return createValidationResult.success(undefined);
  }

  /**
   * Cleanup resources (proper lifecycle management)
   */
  public async dispose(): Promise<void> {
    this.componentRegistry.clear();
    this.themeRegistry.clear();

    this.events.emit('ui-system:disposed', {
      id: 'ui-system-dispose',
      type: 'ui-system:disposed',
      source: 'ui-system',
      timestamp: new Date(),
      data: {},
    });

    this.logger.info('UISystemCore disposed');
  }
}

/**
 * Factory function for production UI System
 */
export function createProductionUISystem(): UISystemCore {
  return UISystemCore.create({
    theme: 'enterprise',
    locale: 'en-US',
    accessibilityLevel: 'AA',
    enableAccessibilityValidation: true,
    enablePerformanceMonitoring: true,
  });
}

/**
 * Factory function for test UI System
 */
export function createTestUISystem(): UISystemCore {
  return UISystemCore.create({
    theme: 'test',
    locale: 'en-US',
    accessibilityLevel: 'AAA',
    enableAccessibilityValidation: false,
    enablePerformanceMonitoring: false,
  });
}

/**
 * Factory function for development UI System
 */
export function createDevelopmentUISystem(): UISystemCore {
  return UISystemCore.create({
    theme: 'development',
    locale: 'en-US',
    accessibilityLevel: 'AAA',
    enableAccessibilityValidation: true,
    enablePerformanceMonitoring: true,
  });
}
