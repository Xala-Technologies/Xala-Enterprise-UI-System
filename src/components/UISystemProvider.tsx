/**
 * @fileoverview UI System Provider - Configuration Context
 * @module UISystemProvider
 * @description Provides UI system configuration to all components
 */

import { Logger } from '@xala-technologies/enterprise-standards';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useMemo } from 'react';
import type { _AccessibilityLevel, _UISystemConfig } from '../lib/types/core.types';
import type {
  AccessibilityConfig,
  AccessibilityPreset,
  AccessibilityTokens,
} from '../tokens/accessibility-tokens';
import { _accessibilityPresets, _generateAccessibilityTokens } from '../tokens/accessibility-tokens';

const logger = Logger.create({
  serviceName: 'ui-system-provider',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// CONTEXT INTERFACES
// =============================================================================

/**
 * UI System context interface
 */
export interface UISystemContext {
  /** Current configuration */
  config: UISystemConfig;

  /** Accessibility configuration */
  accessibility: AccessibilityConfig;

  /** Generated accessibility tokens */
  accessibilityTokens: AccessibilityTokens;

  /** Update configuration */
  updateConfig: (updates: Partial<UISystemConfig>) => void;

  /** Update accessibility configuration */
  updateAccessibility: (accessibility: AccessibilityConfig | AccessibilityPreset) => void;
}

// =============================================================================
// CONTEXT CREATION
// =============================================================================

const UISystemContextInstance = createContext<UISystemContext | undefined>(undefined);

// =============================================================================
// PROVIDER COMPONENT
// =============================================================================

/**
 * UI System Provider Props
 */
export interface UISystemProviderProps {
  /** Child components */
  children: ReactNode;

  /** Initial configuration */
  config?: Partial<UISystemConfig>;

  /** Custom accessibility configuration */
  accessibility?: AccessibilityConfig | AccessibilityPreset;
}

/**
 * Default UI System configuration
 */
const defaultConfig: UISystemConfig = {
  name: 'Generic UI System',
  version: '1.0.0',
  defaultLanguage: 'en',
  accessibility: 'basic',
  theme: {
    mode: 'light',
    primary: '#1976d2',
    secondary: '#dc004e',
  },
  performance: {
    enableVirtualization: true,
    enableLazyLoading: true,
    enableMemoization: true,
    bundleSize: 'standard',
  },
  development: {
    enableDebugMode: false,
    enablePerformanceMonitoring: false,
    enableA11yWarnings: true,
    logLevel: 'warn',
  },
};

/**
 * UI System Provider Component
 */
export const UISystemProvider: React.FC<UISystemProviderProps> = ({
  children,
  config: initialConfig = {},
  accessibility: initialAccessibility = 'basic',
}): void => {
  // Merge default config with provided config
  const config = useMemo(
    (): UISystemConfig => ({
      ...defaultConfig,
      ...initialConfig,
      accessibility: initialAccessibility,
    }),
    [initialConfig, initialAccessibility]
  );

  // Get accessibility configuration
  const accessibilityConfig = useMemo((): AccessibilityConfig => {
    if (typeof config.accessibility === 'string') {
      return accessibilityPresets[config.accessibility];
    }
    return config.accessibility || accessibilityPresets.basic;
  }, [config.accessibility]);

  // Generate accessibility tokens
  const accessibilityTokens = useMemo((): AccessibilityTokens => {
    return generateAccessibilityTokens(accessibilityConfig);
  }, [accessibilityConfig]);

  // Update configuration function
  const updateConfig = useMemo(
    () =>
      (_updates: Partial<UISystemConfig>): void => {
        // In a real implementation, this would update state
        // For now, we'll just log the update
        logger.warn('UISystemProvider: Configuration updates not implemented in read-only mode');
      },
    []
  );

  // Update accessibility function
  const updateAccessibility = useMemo(
    () =>
      (_accessibility: AccessibilityConfig | AccessibilityPreset): void => {
        // In a real implementation, this would update state
        // For now, we'll just log the update
        logger.warn('UISystemProvider: Accessibility updates not implemented in read-only mode');
      },
    []
  );

  // Context value
  const contextValue = useMemo(
    (): UISystemContext => ({
      config,
      accessibility: accessibilityConfig,
      accessibilityTokens,
      updateConfig,
      updateAccessibility,
    }),
    [config, accessibilityConfig, accessibilityTokens, updateConfig, updateAccessibility]
  );

  // Inject CSS custom properties for accessibility tokens
  const cssVariables = useMemo((): void => {
    const variables = {
      '--ui-focus-color': accessibilityTokens.colors.focus,
      '--ui-error-color': accessibilityTokens.colors.error,
      '--ui-success-color': accessibilityTokens.colors.success,
      '--ui-warning-color': accessibilityTokens.colors.warning,
      '--ui-info-color': accessibilityTokens.colors.info,
      '--ui-contrast-text': accessibilityTokens.colors.contrast.text,
      '--ui-contrast-background': accessibilityTokens.colors.contrast.background,
      '--ui-contrast-border': accessibilityTokens.colors.contrast.border,
      '--ui-focus-spacing': accessibilityTokens.spacing.focus,
      '--ui-touch-target': accessibilityTokens.spacing.touchTarget,
      '--ui-text-spacing': accessibilityTokens.spacing.textSpacing,
      '--ui-line-height': accessibilityTokens.typography.lineHeight,
      '--ui-letter-spacing': accessibilityTokens.typography.letterSpacing,
      '--ui-word-spacing': accessibilityTokens.typography.wordSpacing,
      '--ui-animation-duration': accessibilityTokens.animation.duration,
      '--ui-animation-timing': accessibilityTokens.animation.timing,
    };

    return Object.entries(variables)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }, [accessibilityTokens]);

  return (
    <UISystemContextInstance.Provider value={contextValue}>
      <div
        className="ui-system-root"
        style={{ cssText: cssVariables } as React.CSSProperties}
        data-accessibility-level={accessibilityConfig.level}
        data-high-contrast={accessibilityConfig.highContrast}
        data-reduce-motion={accessibilityConfig.reduceMotion}
      >
        {children}
      </div>
    </UISystemContextInstance.Provider>
  );
};

// =============================================================================
// HOOKS
// =============================================================================

/**
 * Hook to access UI System context
 */
export const useUISystem = (): UISystemContext => {
  const context = useContext(UISystemContextInstance);
  if (!context) {
    throw new Error('useUISystem must be used within a UISystemProvider');
  }
  return context;
};

/**
 * Hook to access accessibility configuration
 */
export const useAccessibility = (): {
  config: AccessibilityConfig;
  tokens: AccessibilityTokens;
  level: AccessibilityLevel;
  isEnabled: boolean;
} => {
  const { _accessibility, _accessibilityTokens } = useUISystem();

  return {
    config: accessibility,
    tokens: accessibilityTokens,
    level: accessibility.level,
    isEnabled: accessibility.level !== 'none',
  };
};

/**
 * Hook to check if accessibility feature is enabled
 */
export const useAccessibilityFeature = (feature: keyof AccessibilityConfig): boolean => {
  const { accessibility } = useUISystem();

  if (accessibility.level === 'none') {
    return false;
  }

  const value = accessibility[feature];
  return typeof value === 'boolean' ? value : Boolean(value);
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Create accessibility props based on configuration
 */
export const createAccessibilityProps = (
  config: AccessibilityConfig,
  props: Record<string, unknown> = {}
): Record<string, unknown> => {
  const a11yProps: Record<string, unknown> = {};

  if (config.level === 'none') {
    return props;
  }

  // Add keyboard navigation support
  if (config.keyboardNavigation) {
    a11yProps.tabIndex = props.tabIndex ?? 0;
  }

  // Add screen reader support
  if (config.screenReader) {
    a11yProps['aria-live'] = props['aria-live'] ?? 'polite';
  }

  // Add focus management
  if (config.focusManagement) {
    a11yProps.onFocus = props.onFocus;
    a11yProps.onBlur = props.onBlur;
  }

  // Add custom accessibility features
  if (config.custom?.landmarks) {
    a11yProps.role = props.role ?? 'region';
  }

  if (config.custom?.announcements) {
    a11yProps['aria-live'] = props['aria-live'] ?? 'polite';
    a11yProps['aria-atomic'] = props['aria-atomic'] ?? 'true';
  }

  return { ...props, ...a11yProps };
};

/**
 * Get accessibility CSS classes
 */
export const getAccessibilityClasses = (
  config: AccessibilityConfig,
  baseClasses: string[] = []
): string[] => {
  const classes = [...baseClasses];

  if (config.level === 'none') {
    return classes;
  }

  // Add accessibility level class
  classes.push(`ui-a11y-${config.level.toLowerCase().replace(/[._]/g, '-')}`);

  // Add feature classes
  if (config.highContrast) {
    classes.push('ui-high-contrast');
  }

  if (config.reduceMotion) {
    classes.push('ui-reduce-motion');
  }

  if (config.keyboardNavigation) {
    classes.push('ui-keyboard-nav');
  }

  if (config.focusManagement) {
    classes.push('ui-focus-management');
  }

  return classes;
};

export default UISystemProvider;
