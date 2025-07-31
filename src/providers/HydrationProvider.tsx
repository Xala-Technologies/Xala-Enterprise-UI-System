/**
 * @fileoverview Hydration Provider v5.0.0 - Token-Based Design System
 * @description Hydration context provider for SSR theme and state synchronization
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { 
  ThemeSnapshot, 
  HydrationMismatch,
  useHydrationMismatchDetection,
  useThemeHydration,
  extractThemeSnapshot,
  serializeThemeState,
  canUseDOM
} from '../utils/ssr';

// =============================================================================
// HYDRATION CONTEXT TYPES
// =============================================================================

export interface HydrationContextValue {
  readonly isHydrating: boolean;
  readonly isHydrated: boolean;
  readonly theme: ThemeSnapshot | null;
  readonly mismatches: HydrationMismatch[];
  readonly hasMismatches: boolean;
  readonly hydrateTheme: (theme: ThemeSnapshot) => void;
  readonly clearMismatches: () => void;
  readonly suppressHydrationWarning: boolean;
  readonly setSuppressHydrationWarning: (suppress: boolean) => void;
}

export interface HydrationProviderProps {
  readonly children: React.ReactNode;
  readonly fallbackTheme?: ThemeSnapshot;
  readonly suppressHydrationWarning?: boolean;
  readonly onHydrationComplete?: () => void;
  readonly onHydrationMismatch?: (mismatches: HydrationMismatch[]) => void;
  readonly enableMismatchDetection?: boolean;
}

// =============================================================================
// HYDRATION CONTEXT
// =============================================================================

const HydrationContext = createContext<HydrationContextValue | null>(null);

// =============================================================================
// DEFAULT THEME SNAPSHOT
// =============================================================================

const DEFAULT_THEME_SNAPSHOT: ThemeSnapshot = {
  theme: 'default',
  mode: 'light',
  tokens: {},
  timestamp: Date.now(),
  version: '5.0.0',
};

// =============================================================================
// HYDRATION PROVIDER COMPONENT
// =============================================================================

/**
 * Hydration Provider component
 * Manages theme hydration and hydration mismatch detection
 */
export const HydrationProvider: React.FC<HydrationProviderProps> = ({
  children,
  fallbackTheme = DEFAULT_THEME_SNAPSHOT,
  suppressHydrationWarning = false,
  onHydrationComplete,
  onHydrationMismatch,
  enableMismatchDetection = process.env.NODE_ENV === 'development',
}) => {
  const [isHydrating, setIsHydrating] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const [suppressWarning, setSuppressWarning] = useState(suppressHydrationWarning);

  // Theme hydration
  const {
    theme,
    isHydrated: themeHydrated,
    hydrateTheme,
  } = useThemeHydration(fallbackTheme);

  // Hydration mismatch detection
  const {
    mismatches,
    hasMismatches,
    clearMismatches,
  } = useHydrationMismatchDetection();

  // Handle hydration completion
  useEffect(() => {
    if (themeHydrated && canUseDOM()) {
      const timeoutId = setTimeout(() => {
        setIsHydrating(false);
        setIsHydrated(true);
        onHydrationComplete?.();
      }, 0);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      // Cleanup function for when condition is not met
    };
  }, [themeHydrated, onHydrationComplete]);

  // Handle hydration mismatches
  useEffect(() => {
    if (hasMismatches && enableMismatchDetection) {
      onHydrationMismatch?.(mismatches);
    }
  }, [hasMismatches, mismatches, onHydrationMismatch, enableMismatchDetection]);

  // Suppress hydration warnings in production
  useEffect(() => {
    if (suppressWarning && typeof window !== 'undefined') {
      const originalError = console.error;
      console.error = (...args: any[]) => {
        const message = args.join(' ');
        if (
          message.includes('hydration') ||
          message.includes('did not match') ||
          message.includes('server-rendered HTML')
        ) {
          return;
        }
        originalError.apply(console, args);
      };

      return () => {
        console.error = originalError;
      };
    }

    return () => {
      // Cleanup function for when suppressWarning is false
    };
  }, [suppressWarning]);

  const contextValue = useMemo<HydrationContextValue>(() => ({
    isHydrating,
    isHydrated,
    theme,
    mismatches,
    hasMismatches,
    hydrateTheme,
    clearMismatches,
    suppressHydrationWarning: suppressWarning,
    setSuppressHydrationWarning: setSuppressWarning,
  }), [
    isHydrating,
    isHydrated,
    theme,
    mismatches,
    hasMismatches,
    hydrateTheme,
    clearMismatches,
    suppressWarning,
  ]);

  return (
    <HydrationContext.Provider value={contextValue}>
      {children}
    </HydrationContext.Provider>
  );
};

// =============================================================================
// HYDRATION CONTEXT HOOK
// =============================================================================

/**
 * Hook to consume hydration context
 */
export function useHydration(): HydrationContextValue {
  const context = useContext(HydrationContext);
  
  if (!context) {
    throw new Error('useHydration must be used within a HydrationProvider');
  }
  
  return context;
}

// =============================================================================
// HYDRATION-SAFE COMPONENT HOOKS
// =============================================================================

/**
 * Hook to safely render content only after hydration
 */
export function useHydrationSafeContent<T>(
  serverContent: T,
  clientContent: T,
  options: {
    skipHydrationCheck?: boolean;
    fallbackDelay?: number;
  } = {}
): T {
  const { isHydrated } = useHydration();
  const [content, setContent] = useState(serverContent);
  const { skipHydrationCheck = false, fallbackDelay = 0 } = options;

  useEffect(() => {
    if (skipHydrationCheck || isHydrated) {
      const timeoutId = setTimeout(() => {
        setContent(clientContent);
      }, fallbackDelay);

      return () => clearTimeout(timeoutId);
    }

    return () => {
      // Cleanup function for when condition is not met
    };
  }, [isHydrated, clientContent, skipHydrationCheck, fallbackDelay]);

  return content;
}

/**
 * Hook to conditionally render based on hydration state
 */
export function useConditionalRender(
  condition: 'hydrating' | 'hydrated' | 'always'
): boolean {
  const { isHydrating, isHydrated } = useHydration();

  switch (condition) {
    case 'hydrating':
      return isHydrating;
    case 'hydrated':
      return isHydrated;
    case 'always':
      return true;
    default:
      return false;
  }
}

// =============================================================================
// HYDRATION WRAPPER COMPONENTS
// =============================================================================

export interface HydrationWrapperProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly condition?: 'hydrating' | 'hydrated';
  readonly suppressHydrationWarning?: boolean;
}

/**
 * Component that conditionally renders based on hydration state
 */
export const HydrationWrapper: React.FC<HydrationWrapperProps> = ({
  children,
  fallback = null,
  condition = 'hydrated',
  suppressHydrationWarning = false,
}) => {
  const shouldRender = useConditionalRender(condition);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  if (suppressHydrationWarning) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return <>{children}</>;
};

/**
 * Component that renders children only after hydration is complete
 */
export const HydratedOnly: React.FC<{
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}> = ({ children, fallback = null }) => {
  return (
    <HydrationWrapper condition="hydrated" fallback={fallback}>
      {children}
    </HydrationWrapper>
  );
};

/**
 * Component that renders children only during hydration
 */
export const HydratingOnly: React.FC<{
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
}> = ({ children, fallback = null }) => {
  return (
    <HydrationWrapper condition="hydrating" fallback={fallback}>
      {children}
    </HydrationWrapper>
  );
};

// =============================================================================
// HYDRATION UTILITIES
// =============================================================================

/**
 * Utility to create hydration-safe initial state
 */
export function createHydrationSafeState<T>(
  serverState: T,
  clientState: () => T
): {
  getInitialState: () => T;
  isServerState: boolean;
} {
  const isServer = typeof window === 'undefined';
  
  return {
    getInitialState: () => (isServer ? serverState : clientState()),
    isServerState: isServer,
  };
}

/**
 * Utility to inject theme snapshot into server-rendered HTML
 */
export function injectThemeIntoHTML(
  html: string,
  theme: ThemeSnapshot
): string {
  const serialized = serializeThemeState(theme);
  const script = `<script id="__THEME_SNAPSHOT__" type="application/json">${serialized}</script>`;
  
  // Insert before closing head tag
  if (html.includes('</head>')) {
    return html.replace('</head>', `${script}</head>`);
  }
  
  // Insert before closing body tag as fallback
  if (html.includes('</body>')) {
    return html.replace('</body>', `${script}</body>`);
  }
  
  // Append to end as final fallback
  return html + script;
}

// =============================================================================
// HOC FOR HYDRATION SUPPORT
// =============================================================================

/**
 * HOC to add hydration support to components
 */
export function withHydration<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    fallbackTheme?: ThemeSnapshot;
    suppressHydrationWarning?: boolean;
  } = {}
) {
  const WrappedComponent = (props: P) => {
    return (
      <HydrationProvider
        fallbackTheme={options.fallbackTheme}
        suppressHydrationWarning={options.suppressHydrationWarning}
      >
        <Component {...props} />
      </HydrationProvider>
    );
  };

  WrappedComponent.displayName = `withHydration(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default HydrationProvider;