 
/**
 * UiProvider Component
 * Core provider for Xala UI System v5.0.0 that manages:
 * - Dynamic theming and theme switching
 * - White-label token overrides
 * - SSR hydration safety
 * - Design tokens distribution
 * - Platform detection
 */

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { mergeDeep } from '@/utils/objects';
import { isServer } from '@/utils/ssr';
import { getPlatformType, getDeviceType, getScreenDimensions } from '@/utils/platform';
import type { 
  ThemeType, 
  TokenSystem, 
  WhiteLabelConfig, 
  UiProviderProps,
  PlatformContextValue,
  LayoutContextValue 
} from '@/types/theme';
import { baseTokens } from '@/tokens/base';

// Define UiContext type with v5 architecture
interface UiContextValue {
  // Theme management
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: string[];
  
  // Tokens
  tokens: TokenSystem;
  updateTokens: (tokens: Partial<TokenSystem>) => void;
  
  // Platform
  platform: PlatformContextValue['platform'];
  device: PlatformContextValue['device'];
  
  // Layout
  layout: string;
  setLayout: (layout: string) => void;
  
  // White labeling
  whiteLabelConfig?: WhiteLabelConfig;
  
  // SSR state
  isHydrated: boolean;
  isServer: boolean;
}

// Create context with safe default values
const UiContext = createContext<UiContextValue>({
  theme: 'system',
  setTheme: () => {},
  availableThemes: ['light', 'dark'],
  tokens: baseTokens,
  updateTokens: () => {},
  platform: 'desktop',
  device: 'unknown',
  layout: 'default',
  setLayout: () => {},
  isHydrated: false,
  isServer: true,
});

/**
 * UiProvider - The core provider component for the Xala UI System v5.0.0
 * Handles theme management, token distribution, SSR hydration, and white labeling
 */
export const UiProvider: React.FC<UiProviderProps> = ({
  children,
  defaultTheme = 'system',
  defaultTokens,
  whiteLabelConfig,
  platformConfig = {
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    desktopBreakpoint: 1440,
  },
  enableSSR = true,
  enableHydration = true,
}) => {
  // Initialize state
  const [theme, setThemeState] = useState<ThemeType>(defaultTheme);
  const [isHydrated, setIsHydrated] = useState(isServer());
  const [layout, setLayoutState] = useState<string>('default');
  const [platform, setPlatform] = useState<PlatformContextValue['platform']>('desktop');
  const [device, setDevice] = useState<PlatformContextValue['device']>('unknown');
  
  // Generate merged tokens based on default tokens, theme, and white-label overrides
  const tokens = useMemo(() => {
    const whiteLabelTokens = whiteLabelConfig?.tokens || {};
    const merged = mergeDeep(baseTokens as any, defaultTokens || {}, whiteLabelTokens);
    return merged as any as TokenSystem;
  }, [defaultTokens, whiteLabelConfig]);
  
  // Theme switching function with optional persistence
  const setTheme = useCallback((newTheme: ThemeType) => {
    setThemeState(newTheme);
    
    // Persist theme preference
    if (!isServer()) {
      try {
        localStorage.setItem('xala-ui-theme', newTheme);
      } catch (error) {
        // Fail silently if localStorage is not available
      }
    }
  }, []);
  
  // Layout switching function
  const setLayout = useCallback((newLayout: string) => {
    setLayoutState(newLayout);
    
    // Persist layout preference
    if (!isServer()) {
      try {
        localStorage.setItem('xala-ui-layout', newLayout);
      } catch (error) {
        // Fail silently if localStorage is not available
      }
    }
  }, []);
  
  // Update tokens function
  const updateTokens = useCallback((newTokens: Partial<TokenSystem>) => {
    // This will trigger re-render with updated tokens
    // In a real implementation, this might dispatch to a reducer
  }, []);
  
  // Platform detection effect
  useEffect(() => {
    if (isServer()) return;
    
    const handleResize = (): void => {
      const { width } = getScreenDimensions();
      const newPlatform = getPlatformType(width, {
        mobileBreakpoint: platformConfig?.mobileBreakpoint || 768,
        tabletBreakpoint: platformConfig?.tabletBreakpoint || 1024,
        desktopBreakpoint: platformConfig?.desktopBreakpoint || 1440,
      });
      const newDevice = getDeviceType();
      
      // Convert 'web' to 'desktop' for consistency with our type system
      const normalizedPlatform = newPlatform === 'web' ? 'desktop' : newPlatform;
      setPlatform(normalizedPlatform);
      setDevice(newDevice);
    };
    
    // Set initial platform and device
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [platformConfig]);
  
  // SSR hydration effect - CRITICAL for preventing hydration mismatch
  useEffect(() => {
    if (isServer() || !enableSSR) {
      setIsHydrated(true);
      return;
    }
    
    const hydrateFromSnapshot = (): void => {
      try {
        const snapshotEl = document.getElementById('__XALA_UI_STATE__');
        if (snapshotEl) {
          const snapshot = JSON.parse(snapshotEl.textContent || '{}');
          
          if (snapshot.theme) {
            setThemeState(snapshot.theme);
          } else {
            // Try to restore from localStorage
            const storedTheme = localStorage.getItem('xala-ui-theme') as ThemeType | null;
            if (storedTheme) {
              setThemeState(storedTheme);
            }
          }
          
          if (snapshot.layout) {
            setLayoutState(snapshot.layout);
          } else {
            const storedLayout = localStorage.getItem('xala-ui-layout');
            if (storedLayout) {
              setLayoutState(storedLayout);
            }
          }
        }
      } catch (error) {
        console.error('Error hydrating UI state:', error);
      }
      
      setIsHydrated(true);
    };
    
    hydrateFromSnapshot();
  }, [enableSSR]);
  
  // Avoid rendering until hydrated to prevent flash/mismatch
  // But always render in static generation context (renderToStaticMarkup)
  if (!isServer() && !isHydrated && enableHydration) {
    return null; // Or a minimal loading state
  }
  
  return (
    <UiContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes: ['light', 'dark', 'system'],
        tokens,
        updateTokens,
        platform,
        device,
        layout,
        setLayout,
        whiteLabelConfig,
        isHydrated,
        isServer: isServer(),
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

/**
 * useUi - Hook to access the UI context
 */
export const useUi = (): UiContextValue => {
  const context = useContext(UiContext);
  
  if (context === undefined) {
    throw new Error('useUi must be used within a UiProvider');
  }
  
  return context;
};

/**
 * useTokens - Hook to access the current tokens
 */
export const useTokens = (): TokenSystem => {
  const { tokens } = useUi();
  return tokens;
};

/**
 * useTheme - Hook to access and modify the current theme
 */
export const useTheme = (): {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  availableThemes: string[];
} => {
  const { theme, setTheme, availableThemes } = useUi();
  return { theme, setTheme, availableThemes };
};

/**
 * usePlatform - Hook to access the current platform and device
 */
export const usePlatform = (): {
  platform: PlatformContextValue['platform'];
  device: PlatformContextValue['device'];
} => {
  const { platform, device } = useUi();
  return { platform, device };
};

/**
 * useLayout - Hook to access and modify the current layout
 */
export const useLayout = (): {
  layout: string;
  setLayout: (layout: string) => void;
} => {
  const { layout, setLayout } = useUi();
  return { layout, setLayout };
};

/**
 * useWhiteLabel - Hook to access white label configuration
 */
export const useWhiteLabel = (): {
  config?: WhiteLabelConfig;
} => {
  const { whiteLabelConfig } = useUi();
  return { config: whiteLabelConfig };
};

/**
 * useSSR - Hook to access SSR state
 */
export const useSSR = (): {
  isHydrated: boolean;
  isServer: boolean;
} => {
  const { isHydrated, isServer } = useUi();
  return { isHydrated, isServer };
};
