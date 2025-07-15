/**
 * @fileoverview UI System Core Implementation
 * @description Core system implementation with Norwegian compliance
 * @version 2.0.0
 */

import type {
    AccessibilityConfig,
    AccessibilityPreset,
    ComponentDefinition,
    SupportedLanguage,
    ThemeDefinition,
    UISystemConfig
} from '../types/core.types';
import { Logger, type ILogger } from '../utils/multiplatform-logger';

/**
 * UI System Core class implementing the Singleton pattern
 * Manages themes, components, and accessibility settings
 */
class UISystemCore {
  private static instance: UISystemCore;
  private readonly logger: ILogger;
  private readonly config: UISystemConfig;
  private readonly componentRegistry: Map<string, ComponentDefinition>;
  private readonly themeRegistry: Map<string, ThemeDefinition>;

  private constructor(config: Partial<UISystemConfig> = {}) {
    this.config = {
      name: 'xala-ui-system',
      version: '2.0.0',
      defaultLanguage: 'nb-NO' as SupportedLanguage,
      accessibility: 'enhanced' as AccessibilityPreset,
      theme: {
        mode: 'light',
        primary: '#1a365d',
        secondary: '#2d3748',
        customTokens: {},
      },
      performance: {
        enableVirtualization: true,
        enableLazyLoading: true,
        enableMemoization: true,
        bundleSize: 'standard',
      },
      development: {
        enableDebugMode: false,
        enablePerformanceMonitoring: true,
        enableA11yWarnings: true,
        logLevel: 'info',
      },
      ...config,
    };

    this.logger = Logger.create({
      serviceName: 'ui-system-core',
      logLevel: 'info',
      enableConsoleLogging: true,
      enableFileLogging: false,
    });

    // Initialize registries
    this.componentRegistry = new Map();
    this.themeRegistry = new Map();

    // Log initialization
    this.logger.info('UISystemCore initialized with configuration');
    this.logger.debug('Configuration details', { config: this.config });
  }

  /**
   * Create a new UI system instance (Singleton pattern)
   */
  public static create(config: Partial<UISystemConfig> = {}): UISystemCore {
    if (!UISystemCore.instance) {
      UISystemCore.instance = new UISystemCore(config);
    }
    return UISystemCore.instance;
  }

  /**
   * Get the current UI system instance
   */
  public static getInstance(): UISystemCore {
    if (!UISystemCore.instance) {
      throw new Error('UISystemCore not initialized. Call create() first.');
    }
    return UISystemCore.instance;
  }

  /**
   * Get system configuration
   */
  getConfig(): UISystemConfig {
    return {
      ...this.config,
      theme: this.config.theme || { mode: 'light' },
      defaultLanguage: this.config.defaultLanguage,
      accessibility: this.config.accessibility,
    };
  }

  /**
   * Get system information
   */
  getSystemInfo(): {
    name: string;
    version: string;
    defaultLanguage: SupportedLanguage;
    accessibility: AccessibilityConfig | AccessibilityPreset | undefined;
    theme: UISystemConfig['theme'];
    componentCount: number;
    themeCount: number;
  } {
    return {
      name: this.config.name,
      version: this.config.version,
      defaultLanguage: this.config.defaultLanguage,
      accessibility: this.config.accessibility,
      theme: this.config.theme,
      componentCount: this.componentRegistry.size,
      themeCount: this.themeRegistry.size,
    };
  }

  /**
   * Register a component with the system
   */
  registerComponent(name: string, component: ComponentDefinition): void {
    this.componentRegistry.set(name, component);
    this.logger.info(`Component registered: ${name}`);
  }

  /**
   * Get a registered component
   */
  getComponent(name: string): ComponentDefinition | undefined {
    return this.componentRegistry.get(name);
  }

  /**
   * Get all registered components
   */
  getAllComponents(): Map<string, ComponentDefinition> {
    return new Map(this.componentRegistry);
  }

  /**
   * Register a theme with the system
   */
  registerTheme(name: string, theme: ThemeDefinition): void {
    this.themeRegistry.set(name, theme);
    this.logger.info(`Theme registered: ${name}`);
  }

  /**
   * Get a registered theme
   */
  getTheme(name: string): ThemeDefinition | undefined {
    return this.themeRegistry.get(name);
  }

  /**
   * Get all registered themes
   */
  getAllThemes(): Map<string, ThemeDefinition> {
    return new Map(this.themeRegistry);
  }

  /**
   * Initialize theme registry
   */
  private async initializeThemeRegistry(): Promise<void> {
    // Initialize with default theme
    this.themeRegistry.set('default', {
      name: 'default',
      colors: {
        primary: '#1a365d',
        secondary: '#2d3748',
        success: '#38a169',
        warning: '#d69e2e',
        error: '#e53e3e',
        info: '#3182ce',
        background: '#ffffff',
        surface: '#f7fafc',
        text: '#1a202c',
        border: '#e2e8f0',
      },
      spacing: { sm: '8px', md: '16px', lg: '24px' },
      typography: { body: '16px', heading: '24px' },
      borderRadius: { sm: '4px', md: '8px' },
      shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
      breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
    });

    this.logger.info('Theme registry initialized');
  }

  /**
   * Initialize default components
   */
  private initializeDefaultComponents(): void {
    // Register default Button component
    this.componentRegistry.set('Button', {
      name: 'Button',
      type: 'button',
      props: {
        className: 'btn',
        testId: 'button-component',
      },
      state: {
        isLoading: false,
        isDisabled: false,
        isVisible: true,
        hasError: false,
        isFocused: false,
      },
      accessibility: {
        'aria-label': 'Button',
        'aria-describedby': 'button-description',
      },
      theme: {
        name: 'default',
        colors: {
          primary: '#1a365d',
          secondary: '#2d3748',
          success: '#38a169',
          warning: '#d69e2e',
          error: '#e53e3e',
          info: '#3182ce',
          background: '#ffffff',
          surface: '#f7fafc',
          text: '#1a202c',
          border: '#e2e8f0',
        },
        spacing: { sm: '8px', md: '16px', lg: '24px' },
        typography: { body: '16px', heading: '24px' },
        borderRadius: { sm: '4px', md: '8px' },
        shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
        breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
      },
    });

    // Register default Input component
    this.componentRegistry.set('Input', {
      name: 'Input',
      type: 'input',
      props: {
        className: 'input',
        testId: 'input-component',
      },
      state: {
        isLoading: false,
        isDisabled: false,
        isVisible: true,
        hasError: false,
        isFocused: false,
      },
      accessibility: {
        'aria-label': 'Input field',
        'aria-describedby': 'input-description',
      },
      theme: {
        name: 'default',
        colors: {
          primary: '#1a365d',
          secondary: '#2d3748',
          success: '#38a169',
          warning: '#d69e2e',
          error: '#e53e3e',
          info: '#3182ce',
          background: '#ffffff',
          surface: '#f7fafc',
          text: '#1a202c',
          border: '#e2e8f0',
        },
        spacing: { sm: '8px', md: '16px', lg: '24px' },
        typography: { body: '16px', heading: '24px' },
        borderRadius: { sm: '4px', md: '8px' },
        shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
        breakpoints: { sm: '640px', md: '768px', lg: '1024px' },
      },
    });
  }

  /**
   * Initialize the UI system
   */
  async initialize(): Promise<void> {
    try {
      await this.initializeThemeRegistry();
      this.initializeDefaultComponents();
      
      this.logger.info('UISystemCore initialization completed');
    } catch (error) {
      this.logger.error('UISystemCore initialization failed', error);
      throw error;
    }
  }

  /**
   * Validate accessibility configuration
   */
  validateAccessibility(config: AccessibilityConfig | AccessibilityPreset): boolean {
    if (typeof config === 'string') {
      return ['basic', 'enhanced', 'enterprise'].includes(config);
    }
    
    return config.level !== undefined;
  }

  /**
   * Get accessibility configuration
   */
  getAccessibilityConfig(): AccessibilityConfig | AccessibilityPreset | undefined {
    return this.config.accessibility;
  }

  /**
   * Update theme configuration
   */
  updateTheme(theme: UISystemConfig['theme']): void {
    (this.config as { theme: UISystemConfig['theme'] }).theme = theme;
    this.logger.info('Theme configuration updated', { theme });
  }

  /**
   * Destroy the UI system instance
   */
  destroy(): void {
    this.componentRegistry.clear();
    this.themeRegistry.clear();
    this.logger.info('UISystemCore destroyed');
  }
}

// =============================================================================
// FACTORY FUNCTIONS
// =============================================================================

/**
 * Create UI system instance with default configuration
 */
export function createUISystem(config: Partial<UISystemConfig> = {}): UISystemCore {
  return UISystemCore.create(config);
}

/**
 * Create UI system instance with Norwegian government configuration
 */
export function createNorwegianUISystem(config: Partial<UISystemConfig> = {}): UISystemCore {
  const norwegianConfig: Partial<UISystemConfig> = {
    name: 'norwegian-government-ui',
    defaultLanguage: 'nb-NO' as SupportedLanguage,
    accessibility: 'enterprise' as AccessibilityPreset,
    theme: {
      mode: 'light',
      primary: '#1a365d',
      secondary: '#2d3748',
      customTokens: {
        'gov-primary': '#1a365d',
        'gov-secondary': '#2d3748',
      },
    },
    development: {
      enableDebugMode: false,
      enablePerformanceMonitoring: true,
      enableA11yWarnings: false,
      logLevel: 'error',
    },
    ...config,
  };

  return UISystemCore.create(norwegianConfig);
}

/**
 * Create UI system instance for production
 */
export function createProductionUISystem(config: Partial<UISystemConfig> = {}): UISystemCore {
  const productionConfig: Partial<UISystemConfig> = {
    name: 'production-ui-system',
    defaultLanguage: 'en-US' as SupportedLanguage,
    accessibility: 'enterprise' as AccessibilityPreset,
    theme: {
      mode: 'light',
      primary: '#1a365d',
      secondary: '#2d3748',
    },
    development: {
      enableDebugMode: false,
      enablePerformanceMonitoring: true,
      enableA11yWarnings: false,
      logLevel: 'error',
    },
    ...config,
  };

  return UISystemCore.create(productionConfig);
}

/**
 * Create UI system instance for testing
 */
export function createTestUISystem(config: Partial<UISystemConfig> = {}): UISystemCore {
  const testConfig: Partial<UISystemConfig> = {
    name: 'test-ui-system',
    defaultLanguage: 'en-US' as SupportedLanguage,
    accessibility: 'basic' as AccessibilityPreset,
    theme: {
      mode: 'light',
      primary: '#007acc',
      secondary: '#666666',
      customTokens: {},
    },
    development: {
      enableDebugMode: true,
      enablePerformanceMonitoring: true,
      enableA11yWarnings: true,
      logLevel: 'debug',
    },
    ...config,
  };

  return UISystemCore.create(testConfig);
}

/**
 * Create UI system instance for development
 */
export function createDevelopmentUISystem(config: Partial<UISystemConfig> = {}): UISystemCore {
  const developmentConfig: Partial<UISystemConfig> = {
    name: 'development-ui-system',
    defaultLanguage: 'en-US' as SupportedLanguage,
    accessibility: 'standard' as AccessibilityPreset,
    theme: {
      mode: 'light',
      primary: '#1a365d',
      secondary: '#2d3748',
    },
    development: {
      enableDebugMode: true,
      enablePerformanceMonitoring: true,
      enableA11yWarnings: true,
      logLevel: 'debug',
    },
    ...config,
  };

  return UISystemCore.create(developmentConfig);
}

// =============================================================================
// EXPORTS
// =============================================================================

export default UISystemCore;
export { UISystemCore };
export type { ComponentDefinition, ThemeDefinition, UISystemConfig };

