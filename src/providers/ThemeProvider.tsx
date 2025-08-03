/**
 * Theme Provider Component
 * 
 * SSR-safe theme provider that doesn't require hooks in child components.
 * Handles server-side theme detection and client-side hydration without flash.
 * Uses data attributes for theme switching instead of React context.
 */

'use client';

import React, { useEffect, useRef } from 'react';
import type { Theme, ThemeSwitcherConfig} from '../lib/theme/theme-switcher';
import { ThemeSwitcher, generateThemeScript, themeTransitionCSS } from '../lib/theme/theme-switcher';

export interface ThemeProviderProps {
  readonly children: React.ReactNode;
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
  readonly enableTransitions?: boolean;
  readonly transitionDuration?: number;
  readonly forcedTheme?: Theme;
  readonly enableSystem?: boolean;
  readonly disableTransitionOnChange?: boolean;
  readonly serverTheme?: 'light' | 'dark';
}

/**
 * Theme Provider - SSR-safe theme management without hooks in components
 * 
 * This provider:
 * 1. Prevents theme flash by applying theme before React hydration
 * 2. Works without requiring useTheme hooks in child components
 * 3. Uses data attributes on document.documentElement for CSS targeting
 * 4. Handles server-side rendering correctly
 */
export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  enableTransitions = true,
  transitionDuration = 200,
  forcedTheme,
  enableSystem = true,
  disableTransitionOnChange = false,
  serverTheme = 'light'
}: ThemeProviderProps): JSX.Element => {
  const themeSwitcherRef = useRef<ThemeSwitcher | null>(null);
  const isHydratedRef = useRef(false);

  useEffect(() => {
    // Only initialize on client-side
    if (typeof window === 'undefined') return;

    // Prevent double initialization
    if (isHydratedRef.current) return;
    isHydratedRef.current = true;

    const config: ThemeSwitcherConfig = {
      defaultTheme: enableSystem ? defaultTheme : (defaultTheme === 'system' ? 'light' : defaultTheme),
      storageKey,
      enableTransitions: enableTransitions && !disableTransitionOnChange,
      transitionDuration
    };

    // Initialize theme switcher
    themeSwitcherRef.current = new ThemeSwitcher(config);

    // Apply forced theme if provided
    if (forcedTheme) {
      themeSwitcherRef.current.setTheme(forcedTheme);
    }

    // Cleanup on unmount
    return () => {
      if (themeSwitcherRef.current) {
        themeSwitcherRef.current.destroy();
        themeSwitcherRef.current = null;
      }
    };
  }, [
    defaultTheme,
    storageKey,
    enableTransitions,
    transitionDuration,
    forcedTheme,
    enableSystem,
    disableTransitionOnChange
  ]);

  // Handle forced theme changes
  useEffect(() => {
    if (forcedTheme && themeSwitcherRef.current) {
      themeSwitcherRef.current.setTheme(forcedTheme);
    }
  }, [forcedTheme]);

  return (
    <>
      {/* Inject theme transition CSS */}
      {enableTransitions && !disableTransitionOnChange && (
        <style dangerouslySetInnerHTML={{ __html: themeTransitionCSS }} />
      )}
      
      {/* Render children without theme context - components use CSS variables directly */}
      {children}
    </>
  );
};

/**
 * Theme Script Component
 * 
 * Renders the inline script that prevents theme flash.
 * Should be placed in the <head> or before the main app content.
 */
export interface ThemeScriptProps {
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
  readonly enableSystem?: boolean;
  readonly forcedTheme?: Theme;
}

export const ThemeScript = ({
  defaultTheme = 'system',
  storageKey = 'ui-theme',
  enableSystem = true,
  forcedTheme
}: ThemeScriptProps): JSX.Element => {
  const config = {
    defaultTheme: enableSystem ? defaultTheme : (defaultTheme === 'system' ? 'light' : defaultTheme),
    storageKey
  };

  // If forced theme is provided, override the script to use it directly
  const script = forcedTheme 
    ? `
        (function() {
          document.documentElement.setAttribute('data-theme', '${forcedTheme}');
          document.documentElement.classList.add('theme-${forcedTheme}');
        })();
      `.trim()
    : generateThemeScript(config);

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
};

/**
 * Theme utilities for imperative theme management
 * These functions work without React context or hooks
 */
export const themeUtils = {
  /**
   * Set theme imperatively (works from anywhere in the app)
   */
  setTheme: (theme: Theme): void => {
    if (typeof window === 'undefined') return;
    
    // Create temporary theme switcher if none exists
    const switcher = new ThemeSwitcher();
    switcher.setTheme(theme);
  },

  /**
   * Get current theme
   */
  getCurrentTheme: (): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    const switcher = new ThemeSwitcher();
    return switcher.getCurrentTheme();
  },

  /**
   * Get resolved theme (never 'system')
   */
  getResolvedTheme: (): 'light' | 'dark' | 'high-contrast' => {
    if (typeof window === 'undefined') return 'light';
    
    const switcher = new ThemeSwitcher();
    return switcher.getResolvedTheme();
  },

  /**
   * Toggle theme
   */
  toggleTheme: (): void => {
    if (typeof window === 'undefined') return;
    
    const switcher = new ThemeSwitcher();
    switcher.toggleTheme();
  },

  /**
   * Check if theme is active
   */
  isThemeActive: (theme: Theme): boolean => {
    if (typeof window === 'undefined') return theme === 'light';
    
    const switcher = new ThemeSwitcher();
    return switcher.isThemeActive(theme);
  },

  /**
   * Subscribe to theme changes
   */
  subscribeToThemeChanges: (callback: (theme: Theme, resolvedTheme: 'light' | 'dark' | 'high-contrast') => void): (() => void) => {
    if (typeof window === 'undefined') return () => {};

    const handler = (event: CustomEvent) => {
      callback(event.detail.theme, event.detail.resolvedTheme);
    };

    window.addEventListener('themeChange', handler as EventListener);

    return () => {
      window.removeEventListener('themeChange', handler as EventListener);
    };
  }
};

/**
 * Hook for theme management (optional - components can work without this)
 * Only use this if you need reactive theme state in a component
 */
export const useTheme = () => {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    return themeUtils.getCurrentTheme();
  });

  const [resolvedTheme, setResolvedThemeState] = React.useState<'light' | 'dark' | 'high-contrast'>(() => {
    if (typeof window === 'undefined') return 'light';
    return themeUtils.getResolvedTheme();
  });

  useEffect(() => {
    // Update state from actual theme
    setThemeState(themeUtils.getCurrentTheme());
    setResolvedThemeState(themeUtils.getResolvedTheme());

    // Subscribe to theme changes
    const unsubscribe = themeUtils.subscribeToThemeChanges((newTheme, newResolvedTheme) => {
      setThemeState(newTheme);
      setResolvedThemeState(newResolvedTheme);
    });

    return unsubscribe;
  }, []);

  const setTheme = React.useCallback((newTheme: Theme) => {
    themeUtils.setTheme(newTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    themeUtils.toggleTheme();
  }, []);

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
    themes: ['light', 'dark', 'high-contrast', 'system'] as const
  };
};

/**
 * SSR-safe theme detection for Next.js getServerSideProps or similar
 */
export const getServerSideTheme = (headers: Record<string, string | string[] | undefined>): 'light' | 'dark' => {
  // In the future, we could parse Accept header, User-Agent, or cookies
  // For now, default to light theme on server
  return 'light';
};

/**
 * Theme Provider HOC for easy integration
 */
export const withTheme = <P extends object>(Component: React.ComponentType<P>) => {
  const WithThemeComponent = (props: P & { themeProps?: ThemeProviderProps }) => {
    const { themeProps, ...componentProps } = props;
    
    return (
      <ThemeProvider {...themeProps}>
        <Component {...(componentProps as P)} />
      </ThemeProvider>
    );
  };

  WithThemeComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  
  return WithThemeComponent;
};