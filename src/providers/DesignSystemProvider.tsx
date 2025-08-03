'use client'; // ✅ Add this directive at the top

/**
 * @fileoverview SSR-Safe DesignSystemProvider - Industry Standard Implementation
 * @description Truly SSR-safe theme provider with React module resolution safety
 * @version 5.0.0
 * @compliance SSR-Safe, Production-ready, Framework-agnostic, Industry Standards
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Logger } from '../lib/utils/multiplatform-logger';
import type { ThemeTemplate } from '../tokens/themes/template-loader';
import { TemplateLoader } from '../utils/templateLoader';
import { designTokens } from '../tokens/design-tokens';

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
  setTemplate: (templateId: string) => Promise<void>;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;

  // Template utilities
  getAvailableTemplates: () => Promise<string[]>;
  reloadTemplate: () => Promise<void>;
}

// ✅ SSR-safe context creation
let DesignSystemContext: React.Context<DesignSystemContextValue | null> | null = null;

if (typeof window !== 'undefined') {
  DesignSystemContext = createContext<DesignSystemContextValue | null>(null);
} else {
  // SSR fallback
  DesignSystemContext = {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: DesignSystemContextValue | null) => React.ReactNode;
    }) => children(null),
    displayName: 'DesignSystemContext',
  } as unknown as React.Context<DesignSystemContextValue | null>;
}

// =============================================================================
// SIMPLIFIED PROVIDER PROPS (No Governance)
// =============================================================================

export interface DesignSystemProviderProps {
  children: React.ReactNode;
  templateId?: string;
  initialDarkMode?: boolean;
  autoDetectDarkMode?: boolean;
  // SSR-specific props
  ssrTemplate?: ThemeTemplate; // Pre-loaded template for SSR
}

// =============================================================================
// SSR-SAFE MEDIA QUERY HOOK
// =============================================================================

function useSSRSafeMediaQuery(query: string, fallback: boolean = false): boolean {
  // ✅ Only use hooks in browser
  if (typeof window === 'undefined') {
    return fallback;
  }

  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent): void => setMatches(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return (): void => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

// =============================================================================
// SSR-SAFE PROVIDER IMPLEMENTATION
// =============================================================================

export function DesignSystemProvider({
  children,
  templateId = 'base-light',
  initialDarkMode = false,
  autoDetectDarkMode = false,
  ssrTemplate,
}: DesignSystemProviderProps): JSX.Element {
  // ✅ Only use hooks in browser
  if (typeof window === 'undefined') {
    // SSR: Return simple wrapper
    return <>{children}</>;
  }

  // ✅ Client-side: Full functionality
  const [currentTemplate, setCurrentTemplate] = useState<ThemeTemplate | null>(ssrTemplate || null);
  const [currentTemplateId, setCurrentTemplateId] = useState(templateId);
  const [isDarkMode, setIsDarkMode] = useState(initialDarkMode);
  const [isLoading, setIsLoading] = useState(true);

  const templateLoader = TemplateLoader.getInstance();

  // ✅ SSR-safe browser detection using media query hook
  const prefersDark = useSSRSafeMediaQuery('(prefers-color-scheme: dark)', false);

  useEffect(() => {
    if (autoDetectDarkMode) {
      setIsDarkMode(prefersDark);
    }
  }, [prefersDark, autoDetectDarkMode]);

  // ✅ SSR-safe template loading
  useEffect(() => {
    loadTemplate(currentTemplateId);
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

      // ✅ Fallback to emergency template
      const emergencyTemplate = templateLoader.getEmergencyFallback(isDarkMode ? 'DARK' : 'LIGHT');
      setCurrentTemplate(emergencyTemplate);
      logger.warn('Using emergency fallback template', { _templateId, isDarkMode });
    } finally {
      setIsLoading(false);
    }
  };

  const setTemplate = async (newTemplateId: string): Promise<void> => {
    logger.info('Switching template', { from: currentTemplateId, to: newTemplateId });
    setCurrentTemplateId(newTemplateId);
  };

  const toggleDarkMode = (): void => {
    logger.info('Toggling dark mode', { current: isDarkMode, new: !isDarkMode });
    setIsDarkMode(!isDarkMode);
  };

  const setDarkMode = (isDark: boolean): void => {
    logger.info('Setting dark mode', { mode: isDark });
    setIsDarkMode(isDark);
  };

  const getAvailableTemplates = async (): Promise<string[]> => {
    return templateLoader.getAvailableTemplates();
  };

  const reloadTemplate = async (): Promise<void> => {
    logger.info('Reloading current template', { templateId: currentTemplateId });
    await loadTemplate(currentTemplateId);
  };

  // Apply CSS custom properties for styling (SSR-safe)
  useEffect(() => {
    if (currentTemplate && typeof document !== 'undefined') {
      const root = document.documentElement;

      try {
        // Type-safe access to template properties
        const template = currentTemplate as ThemeTemplate;
        const colors = template.colors as Record<string, unknown>;
        const spacing = template.spacing as Record<string, string>;
        const typography = template.typography as Record<string, unknown>;
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

        // Apply industry standard design tokens
        Object.entries(designTokens.colors.primary).forEach(([key, value]) => {
          root.style.setProperty(`--ds-color-primary-${key}`, value);
        });
        
        Object.entries(designTokens.spacing).forEach(([key, value]) => {
          root.style.setProperty(`--ds-spacing-${key}`, value);
        });
        
        Object.entries(designTokens.elevation).forEach(([key, value]) => {
          if (typeof value === 'string') {
            root.style.setProperty(`--ds-elevation-${key}`, value);
          }
        });
        
        Object.entries(designTokens.borderRadius).forEach(([key, value]) => {
          if (typeof value === 'string') {
            root.style.setProperty(`--ds-border-radius-${key}`, value);
          }
        });
        
        Object.entries(designTokens.motion.duration).forEach(([key, value]) => {
          root.style.setProperty(`--ds-motion-duration-${key}`, value);
        });
        
        Object.entries(designTokens.motion.easing).forEach(([key, value]) => {
          root.style.setProperty(`--ds-motion-easing-${key}`, value);
        });

        logger.info('CSS custom properties applied', { templateId: template.id });
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

  // ✅ Use SSR-safe provider rendering
  if (!DesignSystemContext) {
    // During SSR or when React context creation failed, render children directly
    return <>{children}</>;
  }

  return <DesignSystemContext.Provider value={value}>{children}</DesignSystemContext.Provider>;
}

// =============================================================================
// CONTEXT HOOK WITH SSR SAFETY
// =============================================================================

export const useDesignSystem = (): DesignSystemContextValue => {
  const defaultValue: DesignSystemContextValue = {
    currentTemplate: null,
    _templateId: 'base-light',
    isDarkMode: false,
    isLoading: false,
    setTemplate: async () => {},
    toggleDarkMode: () => {},
    setDarkMode: () => {},
    getAvailableTemplates: async () => [],
    reloadTemplate: async () => {},
  };

  // ✅ SSR-safe hook usage
  if (typeof window === 'undefined') {
    // Return safe defaults during SSR
    return defaultValue;
  }

  // ✅ Client-side: Use actual context
  if (!DesignSystemContext) {
    return defaultValue;
  }

  try {
    const context = useContext(DesignSystemContext);
    return context || defaultValue;
  } catch (error) {
    logger.warn('useDesignSystem failed, using defaults:', error);
    return defaultValue;
  }
};

// =============================================================================
// CONVENIENCE HOOKS (Simplified)
// =============================================================================

/**
 * Hook for accessing current theme
 */
export const useTheme = (): {
  theme: ThemeTemplate | null;
  mode: 'LIGHT' | 'DARK';
  isLoading: boolean;
  setTemplate: (_templateId: string) => Promise<void>;
  toggleDarkMode: () => void;
} => {
  const { currentTemplate, isDarkMode, isLoading, setTemplate, toggleDarkMode } = useDesignSystem();

  return {
    theme: currentTemplate,
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

logger.info('SSR-safe DesignSystemProvider with industry standard tokens initialized');
