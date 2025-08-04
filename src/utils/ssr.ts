/* eslint-disable no-console */
/**
 * @fileoverview SSR Utilities v5.0.0 - Token-Based Design System
 * @description Comprehensive SSR safety and hydration utilities for server-side rendering
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

/**
 * Check if the current environment is server-side
 * @returns True if running on the server
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}

/**
 * Check if the current environment is client-side
 * @returns True if running in the browser
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safe access to window object
 * @returns Window object or null if server-side
 */
export function safeWindow(): Window | null {
  return isClient() ? window : null;
}

/**
 * Safe access to document object
 * @returns Document object or null if server-side
 */
export function safeDocument(): Document | null {
  return isClient() ? document : null;
}

/**
 * Safe access to navigator object
 * @returns Navigator object or null if server-side
 */
export function safeNavigator(): Navigator | null {
  return isClient() ? window.navigator : null;
}

/**
 * Safe access to localStorage
 * @returns localStorage object or null if unavailable
 */
export function safeLocalStorage(): Storage | null {
  if (!isClient()) return null;
  
  try {
    const testKey = '__ui_system_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return localStorage;
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to sessionStorage
 * @returns sessionStorage object or null if unavailable
 */
export function safeSessionStorage(): Storage | null {
  if (!isClient()) return null;
  
  try {
    const testKey = '__ui_system_test__';
    sessionStorage.setItem(testKey, 'test');
    sessionStorage.removeItem(testKey);
    return sessionStorage;
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to cookies
 * @returns Cookies string or empty string if unavailable
 */
export function safeCookies(): string {
  if (!isClient()) return '';
  
  try {
    return document.cookie;
  } catch (e) {
    return '';
  }
}

/**
 * Safe access to URL parameters
 * @returns URLSearchParams object or null if unavailable
 */
export function safeURLSearchParams(): URLSearchParams | null {
  if (!isClient()) return null;
  
  try {
    return new URLSearchParams(window.location.search);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to user agent
 * @returns User agent string or empty string if unavailable
 */
export function safeUserAgent(): string {
  if (!isClient()) return '';
  
  try {
    return window.navigator.userAgent;
  } catch (e) {
    return '';
  }
}

/**
 * Safe access to screen dimensions
 * @returns Screen dimensions or default values
 */
export function safeScreenDimensions(): {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
} {
  if (!isClient()) {
    return {
      width: 1024,
      height: 768,
      availWidth: 1024,
      availHeight: 768,
    };
  }

  try {
    return {
      width: window.screen.width,
      height: window.screen.height,
      availWidth: window.screen.availWidth,
      availHeight: window.screen.availHeight,
    };
  } catch (e) {
    return {
      width: 1024,
      height: 768,
      availWidth: 1024,
      availHeight: 768,
    };
  }
}

/**
 * Safe access to device pixel ratio
 * @returns Device pixel ratio or default value
 */
export function safeDevicePixelRatio(): number {
  if (!isClient()) return 1;
  
  try {
    return window.devicePixelRatio || 1;
  } catch (e) {
    return 1;
  }
}

/**
 * Safe access to matchMedia
 * @param query - Media query string
 * @returns MediaQueryList or null if unavailable
 */
export function safeMatchMedia(query: string): MediaQueryList | null {
  if (!isClient()) return null;
  
  try {
    return window.matchMedia(query);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to requestAnimationFrame
 * @param callback - Animation frame callback
 * @returns Animation frame ID or null if unavailable
 */
export function safeRequestAnimationFrame(
  callback: FrameRequestCallback
): number | null {
  if (!isClient()) return null;
  
  try {
    return window.requestAnimationFrame(callback);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to cancelAnimationFrame
 * @param id - Animation frame ID
 */
export function safeCancelAnimationFrame(id: number): void {
  if (!isClient()) return;
  
  try {
    window.cancelAnimationFrame(id);
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Safe access to setTimeout
 * @param callback - Timeout callback
 * @param delay - Delay in milliseconds
 * @returns Timeout ID or null if unavailable
 */
export function safeSetTimeout(
  callback: () => void,
  delay: number
): NodeJS.Timeout | null {
  if (!isClient()) return null;
  
  try {
    return setTimeout(callback, delay);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to clearTimeout
 * @param id - Timeout ID
 */
export function safeClearTimeout(id: NodeJS.Timeout): void {
  if (!isClient()) return;
  
  try {
    clearTimeout(id);
  } catch (e) {
    // Ignore errors
  }
}

/**
 * Safe access to addEventListener
 * @param element - Element to add listener to
 * @param event - Event name
 * @param handler - Event handler
 * @param options - Event options
 * @returns True if successful, false otherwise
 */
export function safeAddEventListener(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions | boolean
): boolean {
  if (!isClient()) return false;
  
  try {
    element.addEventListener(event, handler, options);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Safe access to removeEventListener
 * @param element - Element to remove listener from
 * @param event - Event name
 * @param handler - Event handler
 * @param options - Event options
 * @returns True if successful, false otherwise
 */
export function safeRemoveEventListener(
  element: EventTarget,
  event: string,
  handler: EventListener,
  options?: EventListenerOptions | boolean
): boolean {
  if (!isClient()) return false;
  
  try {
    element.removeEventListener(event, handler, options);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Safe access to createElement
 * @param tagName - HTML tag name
 * @returns Element or null if unavailable
 */
export function safeCreateElement(tagName: string): HTMLElement | null {
  if (!isClient()) return null;
  
  try {
    return document.createElement(tagName);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to querySelector
 * @param selector - CSS selector
 * @returns Element or null if unavailable
 */
export function safeQuerySelector(selector: string): Element | null {
  if (!isClient()) return null;
  
  try {
    return document.querySelector(selector);
  } catch (e) {
    return null;
  }
}

/**
 * Safe access to querySelectorAll
 * @param selector - CSS selector
 * @returns NodeList or empty NodeList if unavailable
 */
export function safeQuerySelectorAll(selector: string): NodeListOf<Element> {
  if (!isClient()) {
    return document.createDocumentFragment().childNodes as NodeListOf<Element>;
  }
  
  try {
    return document.querySelectorAll(selector);
  } catch (e) {
    return document.createDocumentFragment().childNodes as NodeListOf<Element>;
  }
}

// =============================================================================
// ADVANCED SSR UTILITIES
// =============================================================================

/**
 * Environment detection types
 */
export interface EnvironmentInfo {
  readonly isServer: boolean;
  readonly isClient: boolean;
  readonly isBrowser: boolean;
  readonly isNode: boolean;
  readonly isDev: boolean;
  readonly isProd: boolean;
  readonly isTest: boolean;
  readonly framework: 'next' | 'remix' | 'gatsby' | 'vite' | 'webpack' | 'unknown';
  readonly runtime: 'browser' | 'node' | 'edge' | 'worker' | 'unknown';
}

/**
 * SSR context interface
 */
export interface SSRContext {
  readonly isSSR: boolean;
  readonly isHydrating: boolean;
  readonly isHydrated: boolean;
  readonly canUseDOM: boolean;
  readonly userAgent: string;
  readonly headers: Record<string, string>;
  readonly cookies: Record<string, string>;
  readonly url: string;
  readonly pathname: string;
  readonly search: string;
}

/**
 * Hydration mismatch detection
 */
export interface HydrationMismatch {
  readonly type: 'content' | 'attribute' | 'structure';
  readonly element: string;
  readonly expected: string;
  readonly actual: string;
  readonly path: string;
}

/**
 * Theme snapshot for SSR
 */
export interface ThemeSnapshot {
  readonly theme: string;
  readonly mode: 'light' | 'dark' | 'auto';
  readonly tokens: Record<string, any>;
  readonly timestamp: number;
  readonly version: string;
}

// =============================================================================
// ENVIRONMENT DETECTION
// =============================================================================

/**
 * Comprehensive environment detection
 */
export function detectEnvironment(): EnvironmentInfo {
  const isServer = typeof window === 'undefined';
  const isClient = !isServer;
  const isBrowser = isClient && typeof document !== 'undefined';
  const isNode = typeof process !== 'undefined' && process.versions?.node;
  
  // Development/production detection
  const isDev = process.env.NODE_ENV === 'development';
  const isProd = process.env.NODE_ENV === 'production';
  const isTest = process.env.NODE_ENV === 'test';
  
  // Framework detection
  let framework: EnvironmentInfo['framework'] = 'unknown';
  if (typeof process !== 'undefined') {
    if (process.env.NEXT_RUNTIME) framework = 'next';
    else if (process.env.REMIX_DEV_SERVER_WS_PORT) framework = 'remix';
    else if (process.env.GATSBY_EXECUTING_COMMAND) framework = 'gatsby';
    else if (process.env.VITE) framework = 'vite';
    else if (process.env.WEBPACK_DEV_SERVER) framework = 'webpack';
  }
  
  // Runtime detection
  let runtime: EnvironmentInfo['runtime'] = 'unknown';
  if (isServer) {
    if (typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis) runtime = 'edge';
    else if (typeof globalThis !== 'undefined' && 'WorkerGlobalScope' in globalThis) runtime = 'worker';
    else if (isNode) runtime = 'node';
  } else {
    runtime = 'browser';
  }
  
  return {
    isServer,
    isClient,
    isBrowser,
    isNode: Boolean(isNode),
    isDev,
    isProd,
    isTest,
    framework,
    runtime,
  };
}

/**
 * Check if DOM can be safely used
 */
export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

/**
 * Check if we're in a browser environment (not just client-side)
 */
export function isBrowserEnvironment(): boolean {
  return canUseDOM() && typeof window.navigator !== 'undefined';
}

/**
 * Check if we're in Node.js environment
 */
export function isNodeEnvironment(): boolean {
  return (
    typeof process !== 'undefined' &&
    process.versions != null &&
    process.versions.node != null
  );
}

/**
 * Check if we're in an Edge Runtime environment
 */
export function isEdgeRuntime(): boolean {
  return typeof globalThis !== 'undefined' && 'EdgeRuntime' in globalThis;
}

/**
 * Check if we're in a Web Worker environment
 */
export function isWebWorker(): boolean {
  return (
    typeof globalThis !== 'undefined' &&
    'importScripts' in globalThis &&
    typeof navigator !== 'undefined' &&
    typeof location !== 'undefined'
  );
}

// =============================================================================
// SSR CONTEXT PROVIDER
// =============================================================================

/**
 * Create SSR context from server request
 */
export function createSSRContext(options: {
  userAgent?: string;
  headers?: Record<string, string>;
  cookies?: Record<string, string>;
  url?: string;
  pathname?: string;
  search?: string;
} = {}): SSRContext {
  const {
    userAgent = '',
    headers = {},
    cookies = {},
    url = '',
    pathname = '',
    search = '',
  } = options;

  return {
    isSSR: isServer(),
    isHydrating: false,
    isHydrated: false,
    canUseDOM: canUseDOM(),
    userAgent,
    headers,
    cookies,
    url,
    pathname,
    search,
  };
}

/**
 * SSR context hook
 */
export function useSSRContext(): SSRContext {
  const [context, setContext] = useState<SSRContext>(() =>
    createSSRContext()
  );
  
  const [isHydrated, setIsHydrated] = useState(false);
  const [isHydrating, setIsHydrating] = useState(false);

  useEffect(() => {
    setIsHydrating(true);
    
    // Update context with client-side information
    const updatedContext: SSRContext = {
      ...context,
      isSSR: false,
      isHydrating: true,
      isHydrated: false,
      canUseDOM: canUseDOM(),
      userAgent: safeUserAgent(),
      url: isClient() ? window.location.href : '',
      pathname: isClient() ? window.location.pathname : '',
      search: isClient() ? window.location.search : '',
    };

    setContext(updatedContext);

    // Mark as hydrated after next tick
    const timeoutId = setTimeout(() => {
      setIsHydrating(false);
      setIsHydrated(true);
      setContext(prev => ({
        ...prev,
        isHydrating: false,
        isHydrated: true,
      }));
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return { ...context, isHydrating, isHydrated };
}

// =============================================================================
// HYDRATION UTILITIES
// =============================================================================

/**
 * Hook to safely use client-side only code
 */
export function useIsomorphicLayoutEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  if (isServer()) {
    return useEffect(effect, deps);
  } else {
    return useEffect(effect, deps);
  }
}

/**
 * Hook to get hydration-safe value
 */
export function useHydrationSafeValue<T>(
  serverValue: T,
  clientValue: T
): T {
  const [value, setValue] = useState(serverValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setValue(clientValue);
  }, [clientValue]);

  return isHydrated ? clientValue : serverValue;
}

/**
 * Hook to detect hydration mismatch
 */
export function useHydrationMismatchDetection(): {
  mismatches: HydrationMismatch[];
  hasMismatches: boolean;
  clearMismatches: () => void;
} {
  const [mismatches, setMismatches] = useState<HydrationMismatch[]>([]);

  const clearMismatches = useCallback(() => {
    setMismatches([]);
  }, []);

  useEffect(() => {
    if (!canUseDOM()) return;

    // Detect hydration mismatches
    const observer = new MutationObserver((mutations) => {
      const newMismatches: HydrationMismatch[] = [];

      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              
              // Check for hydration warnings in console
              const originalError = console.error;
              console.error = (...args: any[]) => {
                const message = args.join(' ');
                if (message.includes('hydration') || message.includes('mismatch')) {
                  newMismatches.push({
                    type: 'content',
                    element: element.tagName,
                    expected: 'unknown',
                    actual: 'unknown',
                    path: getElementPath(element),
                  });
                }
                originalError.apply(console, args);
              };
            }
          });
        }
      });

      if (newMismatches.length > 0) {
        setMismatches(prev => [...prev, ...newMismatches]);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    mismatches,
    hasMismatches: mismatches.length > 0,
    clearMismatches,
  };
}

/**
 * Get element path for debugging
 */
function getElementPath(element: Element): string {
  const path: string[] = [];
  let current: Element | null = element;

  while (current && current.nodeType === Node.ELEMENT_NODE) {
    let selector = current.nodeName.toLowerCase();
    
    if (current.id) {
      selector += `#${current.id}`;
    } else if (current.className) {
      const classes = current.className.split(' ').filter(Boolean);
      if (classes.length > 0) {
        selector += `.${classes.join('.')}`;
      }
    }

    path.unshift(selector);
    current = current.parentElement;
  }

  return path.join(' > ');
}

// =============================================================================
// THEME SERIALIZATION & HYDRATION
// =============================================================================

/**
 * Serialize theme state for SSR
 */
export function serializeThemeState(theme: {
  theme: string;
  mode: 'light' | 'dark' | 'auto';
  tokens: Record<string, any>;
}): string {
  const snapshot: ThemeSnapshot = {
    ...theme,
    timestamp: Date.now(),
    version: '5.0.0',
  };

  try {
    return JSON.stringify(snapshot);
  } catch (error) {
    console.warn('Failed to serialize theme state:', error);
    return JSON.stringify({
      theme: 'default',
      mode: 'light' as const,
      tokens: {},
      timestamp: Date.now(),
      version: '5.0.0',
    });
  }
}

/**
 * Deserialize theme state from SSR
 */
export function deserializeThemeState(serialized: string): ThemeSnapshot | null {
  if (!serialized) return null;

  try {
    const snapshot = JSON.parse(serialized) as ThemeSnapshot;
    
    // Validate snapshot structure
    if (
      typeof snapshot.theme === 'string' &&
      ['light', 'dark', 'auto'].includes(snapshot.mode) &&
      typeof snapshot.tokens === 'object' &&
      typeof snapshot.timestamp === 'number' &&
      typeof snapshot.version === 'string'
    ) {
      return snapshot;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to deserialize theme state:', error);
    return null;
  }
}

/**
 * Inject theme snapshot into HTML
 */
export function injectThemeSnapshot(snapshot: ThemeSnapshot): string {
  const serialized = serializeThemeState(snapshot);
  return `<script id="__THEME_SNAPSHOT__" type="application/json">${serialized}</script>`;
}

/**
 * Extract theme snapshot from HTML
 */
export function extractThemeSnapshot(): ThemeSnapshot | null {
  if (!canUseDOM()) return null;

  const script = document.getElementById('__THEME_SNAPSHOT__');
  if (!script) return null;

  return deserializeThemeState(script.textContent || '');
}

/**
 * Hook for theme hydration
 */
export function useThemeHydration(fallbackTheme: ThemeSnapshot): {
  theme: ThemeSnapshot;
  isHydrated: boolean;
  hydrateTheme: (newTheme: ThemeSnapshot) => void;
} {
  const [theme, setTheme] = useState<ThemeSnapshot>(fallbackTheme);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Try to extract theme from SSR snapshot
    const ssrTheme = extractThemeSnapshot();
    if (ssrTheme) {
      setTheme(ssrTheme);
    }
    setIsHydrated(true);
  }, []);

  const hydrateTheme = useCallback((newTheme: ThemeSnapshot) => {
    setTheme(newTheme);
  }, []);

  return {
    theme,
    isHydrated,
    hydrateTheme,
  };
}

// =============================================================================
// SSR-SAFE HOOKS
// =============================================================================

/**
 * SSR-safe useState that handles hydration mismatches
 */
export function useSSRSafeState<T>(
  initialValue: T | (() => T),
  serverValue?: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (isServer() && serverValue !== undefined) {
      return serverValue;
    }
    return typeof initialValue === 'function' 
      ? (initialValue as () => T)() 
      : initialValue;
  });

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      setIsHydrated(true);
      // Update to client value if different from server
      if (serverValue !== undefined) {
        const clientValue = typeof initialValue === 'function' 
          ? (initialValue as () => T)() 
          : initialValue;
        if (clientValue !== serverValue) {
          setState(clientValue);
        }
      }
    }
  }, [initialValue, serverValue, isHydrated]);

  return [state, setState];
}

/**
 * SSR-safe useEffect that only runs on client
 */
export function useClientEffect(
  effect: React.EffectCallback,
  deps?: React.DependencyList
): void {
  useEffect(() => {
    if (!canUseDOM()) return;
    return effect();
  }, deps);
}

/**
 * SSR-safe media query hook
 */
export function useSSRSafeMediaQuery(
  query: string,
  fallback: boolean = false
): boolean {
  const [matches, setMatches] = useSSRSafeState(fallback, fallback);

  useClientEffect(() => {
    const mediaQuery = safeMatchMedia(query);
    if (!mediaQuery) return;

    setMatches(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export const SSRUtils = {
  // Environment detection
  detectEnvironment,
  canUseDOM,
  isBrowserEnvironment,
  isNodeEnvironment,
  isEdgeRuntime,
  isWebWorker,
  
  // SSR Context
  createSSRContext,
  
  // Theme serialization
  serializeThemeState,
  deserializeThemeState,
  injectThemeSnapshot,
  extractThemeSnapshot,
  
  // Utilities
  getElementPath,
};

export default SSRUtils;
