/**
 * @fileoverview Simplified SSR-Safe DesignSystemProvider - Production Strategy
 * @description Simple _theme provider without governance complexity - SSR compatible
 * @version 4.0.0
 * @compliance SSR-Safe, Production-ready, Framework-agnostic
 */

'use client'; // ✅ Only the provider is client-side

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Logger } from '../lib/utils/multiplatform-logger';
import type { ThemeTemplate } from '../tokens/themes/template-loader';
import { TemplateLoader } from '../utils/templateLoader';

const logger = Logger.create({
  serviceName: 'ui-system-design-provider',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// SIMPLIFIED CONTEXT INTERFACES (No Governance)
// =============================================================================

interface DesignSystemContextValue {
  currentTemplate: ThemeTemplate | null;
  _templateId: string;
  isDarkMode: boolean;
  isLoading: boolean;

  // Simple _theme management
  setTemplate: (_templateId: string) => Promise<void>;
  toggleDarkMode: () => void;
  setDarkMode: (_isDark: boolean) => void;

  // Template utilities
  getAvailableTemplates: () => Promise<string[]>;
  reloadTemplate: () => Promise<void>;
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

// =============================================================================
// SIMPLIFIED PROVIDER PROPS (No Governance)
// =============================================================================

export interface DesignSystemProviderProps {
  children: React.ReactNode;
  _templateId?: string;
  initialDarkMode?: boolean;
  autoDetectDarkMode?: boolean;
  // SSR-specific props
  ssrTemplate?: ThemeTemplate; // Pre-loaded template for SSR
  enableSSRFallback?: boolean;
}

// =============================================================================
// SSR-SAFE PROVIDER IMPLEMENTATION
// =============================================================================

export function DesignSystemProvider({
  children,
  _templateId,
  initialDarkMode: _initialDarkMode = false,
  autoDetectDarkMode: _autoDetectDarkMode = false,
  ssrTemplate: _ssrTemplate,
  enableSSRFallback: _enableSSRFallback = true,
}: DesignSystemProviderProps): JSX.Element {
  // ✅ SSR-safe initialization
  const [currentTemplate, setCurrentTemplate] = useState<ThemeTemplate | null>(null);
  const [currentTemplateId, setCurrentTemplateId] = useState('base-light');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const templateLoader = TemplateLoader.getInstance();

  // ✅ SSR-safe browser detection
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDarkMode(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent): void => setIsDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return (): void => mediaQuery.removeEventListener('change', handleChange);
    }
    return undefined;
  }, []);

  // ✅ SSR-safe template loading
  useEffect(() => {
    // Only load template client-side if not provided via SSR
    if (typeof window !== 'undefined') {
      loadTemplate(currentTemplateId);
    }
  }, [currentTemplateId, isDarkMode]);

  const loadTemplate = async (_templateId: string): Promise<void> => {
    // ✅ Skip loading during SSR
    if (typeof window === 'undefined') return;

    setIsLoading(true);
    try {
      const mode = isDarkMode ? 'DARK' : 'LIGHT';
      const finalTemplateId =
        _templateId.includes('-light') || _templateId.includes('-dark')
          ? _templateId
          : `${_templateId}-${mode.toLowerCase()}`;

      const template = await templateLoader.loadTemplate(finalTemplateId, mode);
      setCurrentTemplate(template);
      logger.info('Template loaded successfully', { _templateId: finalTemplateId, mode });
    } catch (error) {
      logger.error('Failed to load template:', { _templateId, error });

      // ✅ SSR fallback to emergency template
      if (typeof window !== 'undefined') {
        const emergencyTemplate = templateLoader.getEmergencyFallback(
          isDarkMode ? 'DARK' : 'LIGHT'
        );
        setCurrentTemplate(emergencyTemplate);
        logger.warn('Using emergency fallback template', { _templateId, isDarkMode });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setTemplate = async (_templateId: string): Promise<void> => {
    logger.info('Switching template', { from: currentTemplateId, to: _templateId });
    setCurrentTemplateId(_templateId);
  };

  const toggleDarkMode = (): void => {
    logger.info('Toggling dark mode', { current: isDarkMode, new: !isDarkMode });
    setIsDarkMode(!isDarkMode);
  };

  const setDarkMode = (_isDark: boolean): void => {
    logger.info('Setting dark mode', { mode: _isDark });
    setIsDarkMode(_isDark);
  };

  const getAvailableTemplates = async (): Promise<string[]> => {
    return templateLoader.getAvailableTemplates();
  };

  const reloadTemplate = async (): Promise<void> => {
    logger.info('Reloading current template', { _templateId: currentTemplateId });
    await loadTemplate(currentTemplateId);
  };

  // Apply CSS custom properties for styling (SSR-safe)
  useEffect(() => {
    if (currentTemplate && typeof document !== 'undefined') {
      const root = document.documentElement;

      try {
        // Type-safe access to template properties
        const template = currentTemplate as ThemeTemplate;
        const colors = template.colors as Record<string, any>;
        const spacing = template.spacing as Record<string, string>;
        const typography = template.typography as Record<string, any>;
        const borderRadius = template.borderRadius as Record<string, string>;

        // Apply color tokens
        if (colors.primary && typeof colors.primary === 'object') {
          Object.entries(colors.primary as Record<string, string>).forEach(([key, value]) => {
            root.style.setProperty(`--color-primary-${key}`, value);
          });
        }

        if (colors.secondary && typeof colors.secondary === 'object') {
          Object.entries(colors.secondary as Record<string, string>).forEach(([key, value]) => {
            root.style.setProperty(`--color-secondary-${key}`, value);
          });
        }

        // Apply background colors
        if (colors.background && typeof colors.background === 'object') {
          Object.entries(colors.background as Record<string, string>).forEach(([key, value]) => {
            root.style.setProperty(`--color-background-${key}`, value);
          });
        }

        // Apply text colors
        if (colors.text && typeof colors.text === 'object') {
          Object.entries(colors.text as Record<string, string>).forEach(([key, value]) => {
            root.style.setProperty(`--color-text-${key}`, value);
          });
        }

        // Apply spacing tokens
        if (spacing && typeof spacing === 'object') {
          Object.entries(spacing).forEach(([key, value]) => {
            root.style.setProperty(`--spacing-${key}`, value);
          });
        }

        // Apply typography tokens
        if (typography.fontFamily && typeof typography.fontFamily === 'object') {
          const fontFamily = typography.fontFamily as Record<string, string[]>;
          if (fontFamily.sans) {
            root.style.setProperty('--font-family-sans', fontFamily.sans.join(', '));
          }
          if (fontFamily.serif) {
            root.style.setProperty('--font-family-serif', fontFamily.serif.join(', '));
          }
          if (fontFamily.mono) {
            root.style.setProperty('--font-family-mono', fontFamily.mono.join(', '));
          }
        }

        if (typography.fontSize && typeof typography.fontSize === 'object') {
          Object.entries(typography.fontSize as Record<string, string>).forEach(([key, value]) => {
            root.style.setProperty(`--font-size-${key}`, value);
          });
        }

        // Apply border radius tokens
        if (borderRadius && typeof borderRadius === 'object') {
          Object.entries(borderRadius).forEach(([key, value]) => {
            root.style.setProperty(`--border-radius-${key}`, value);
          });
        }

        logger.info('CSS custom properties applied', { _templateId: template.id });
      } catch (error) {
        logger.error('Failed to apply CSS custom properties', { error });
      }
    }
  }, [currentTemplate]);

  const value: DesignSystemContextValue = {
    currentTemplate,
    _templateId: currentTemplateId,
    isDarkMode,
    isLoading,
    setTemplate,
    toggleDarkMode,
    setDarkMode,
    getAvailableTemplates,
    reloadTemplate,
  };

  return <DesignSystemContext.Provider value={value}>{children}</DesignSystemContext.Provider>;
}

// =============================================================================
// CONTEXT HOOK
// =============================================================================

export const useDesignSystem = (): DesignSystemContextValue => {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within DesignSystemProvider');
  }
  return context;
};

// =============================================================================
// CONVENIENCE HOOKS (Simplified)
// =============================================================================

/**
 * Hook for accessing current _theme
 */
export const useTheme = (): {
  _theme: ThemeTemplate | null;
  mode: 'LIGHT' | 'DARK';
  isLoading: boolean;
  setTemplate: (_templateId: string) => Promise<void>;
  toggleDarkMode: () => void;
} => {
  const { currentTemplate, isDarkMode, isLoading, setTemplate, toggleDarkMode } = useDesignSystem();

  return {
    _theme: currentTemplate,
    mode: isDarkMode ? 'DARK' : 'LIGHT',
    isLoading,
    setTemplate,
    toggleDarkMode,
  };
};

/**
 * Hook for template management
 */
export const useTemplates = (): {
  availableTemplates: () => Promise<string[]>;
  currentTemplateId: string;
  reloadTemplate: () => Promise<void>;
  setTemplate: (_templateId: string) => Promise<void>;
} => {
  const { _templateId, getAvailableTemplates, reloadTemplate, setTemplate } = useDesignSystem();

  return {
    availableTemplates: getAvailableTemplates,
    currentTemplateId: _templateId,
    reloadTemplate,
    setTemplate,
  };
};

logger.info('Simplified SSR-safe DesignSystemProvider initialized');
