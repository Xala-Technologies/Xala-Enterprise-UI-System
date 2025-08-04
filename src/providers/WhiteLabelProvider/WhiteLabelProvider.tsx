/* eslint-disable no-console */
/**
 * WhiteLabelProvider
 * Enables white-label customization of the UI system
 */

import React, { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react';
import type { TokenSystem } from '../../tokens/types';
import { mergeDeep } from '../../utils/object';

export interface WhiteLabelConfig {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly logo?: {
    readonly light: string;
    readonly dark: string;
    readonly alt: string;
  };
  readonly favicon?: string;
  readonly themes?: Partial<TokenSystem>[];
  readonly defaultTheme?: string;
  readonly features?: {
    readonly [key: string]: boolean;
  };
  readonly content?: {
    readonly [key: string]: string;
  };
  readonly analytics?: {
    readonly id: string;
    readonly provider: 'google' | 'mixpanel' | 'custom';
  };
  readonly customCSS?: string;
  readonly customJS?: string;
}

interface WhiteLabelContextValue {
  config: WhiteLabelConfig | null;
  isWhiteLabeled: boolean;
  setConfig: (config: WhiteLabelConfig) => void;
  updateConfig: (updates: Partial<WhiteLabelConfig>) => void;
  resetConfig: () => void;
  getContent: (key: string, fallback?: string) => string;
  isFeatureEnabled: (feature: string) => boolean;
  applyCustomStyles: () => void;
}

const WhiteLabelContext = createContext<WhiteLabelContextValue | undefined>(undefined);

export interface WhiteLabelProviderProps {
  readonly children: React.ReactNode;
  readonly config?: WhiteLabelConfig;
  readonly storageKey?: string;
  readonly enablePersistence?: boolean;
}

const DEFAULT_STORAGE_KEY = 'xala-white-label-config';

export const WhiteLabelProvider = ({
  children,
  config: initialConfig,
  storageKey = DEFAULT_STORAGE_KEY,
  enablePersistence = true,
}: WhiteLabelProviderProps): JSX.Element => {
  const [config, setConfigState] = useState<WhiteLabelConfig | null>(() => {
    if (enablePersistence && typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Failed to parse white label config:', e);
        }
      }
    }
    return initialConfig || null;
  });

  // Persist config changes
  useEffect(() => {
    if (enablePersistence && config && typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(config));
    }
  }, [config, storageKey, enablePersistence]);

  // Apply custom styles
  const applyCustomStyles = useCallback(() => {
    if (!config) return;

    // Apply favicon
    if (config.favicon && typeof document !== 'undefined') {
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || 
                   document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = config.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }

    // Apply custom CSS
    if (config.customCSS && typeof document !== 'undefined') {
      const styleId = 'white-label-custom-css';
      let styleEl = document.getElementById(styleId) as HTMLStyleElement;
      
      if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
        document.head.appendChild(styleEl);
      }
      
      styleEl.textContent = config.customCSS;
    }

    // Apply custom JS (be careful with this!)
    if (config.customJS && typeof document !== 'undefined') {
      const scriptId = 'white-label-custom-js';
      let scriptEl = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = scriptId;
        scriptEl.textContent = config.customJS;
        document.body.appendChild(scriptEl);
      }
    }
  }, [config]);

  // Apply styles on mount and config change
  useEffect(() => {
    applyCustomStyles();
  }, [applyCustomStyles]);

  // Set config
  const setConfig = useCallback((newConfig: WhiteLabelConfig) => {
    setConfigState(newConfig);
  }, []);

  // Update config partially
  const updateConfig = useCallback((updates: Partial<WhiteLabelConfig>) => {
    setConfigState(prev => {
      if (!prev) return null;
      // Create a new object to avoid mutating readonly properties
      return { ...prev, ...updates } as WhiteLabelConfig;
    });
  }, []);

  // Reset config
  const resetConfig = useCallback(() => {
    setConfigState(null);
    if (enablePersistence && typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
    
    // Remove custom styles
    if (typeof document !== 'undefined') {
      document.getElementById('white-label-custom-css')?.remove();
      document.getElementById('white-label-custom-js')?.remove();
    }
  }, [storageKey, enablePersistence]);

  // Get content with fallback
  const getContent = useCallback((key: string, fallback: string = ''): string => {
    return config?.content?.[key] || fallback;
  }, [config]);

  // Check if feature is enabled
  const isFeatureEnabled = useCallback((feature: string): boolean => {
    return config?.features?.[feature] !== false;
  }, [config]);

  const value = useMemo(() => ({
    config,
    isWhiteLabeled: !!config,
    setConfig,
    updateConfig,
    resetConfig,
    getContent,
    isFeatureEnabled,
    applyCustomStyles,
  }), [config, setConfig, updateConfig, resetConfig, getContent, isFeatureEnabled, applyCustomStyles]);

  return (
    <WhiteLabelContext.Provider value={value}>
      {children}
    </WhiteLabelContext.Provider>
  );
};

export function useWhiteLabel(): WhiteLabelContextValue {
  const context = useContext(WhiteLabelContext);
  if (!context) {
    throw new Error('useWhiteLabel must be used within a WhiteLabelProvider');
  }
  return context;
}

/**
 * White label configuration presets
 */
export const whiteLabelPresets = {
  minimal: {
    id: 'minimal',
    name: 'Minimal Brand',
    features: {
      animations: false,
      advancedThemes: false,
      customFonts: false,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise Brand',
    features: {
      animations: true,
      advancedThemes: true,
      customFonts: true,
      analytics: true,
      multiLanguage: true,
    },
  },
  startup: {
    id: 'startup',
    name: 'Startup Brand',
    features: {
      animations: true,
      advancedThemes: true,
      customFonts: true,
      analytics: true,
    },
  },
} as const;

/**
 * HOC for white label aware components
 */
export function withWhiteLabel<P extends object>(
  Component: React.ComponentType<P & { whiteLabel: WhiteLabelContextValue }>
): React.ComponentType<P> {
  return function WhiteLabeledComponent(props: P) {
    const whiteLabel = useWhiteLabel();
    return <Component {...props} whiteLabel={whiteLabel} />;
  };
}