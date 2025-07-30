/**
 * @fileoverview Theme Registry - Theme Management System
 * @description Centralized theme registry for loading and managing themes
 * @version 5.0.0
 * @compliance SSR-Safe, Performance Optimized, Enterprise Standards
 */

import type { TokenSystem } from '../base';
import type { ThemeType } from '@/types/theme';
import { mergeDeep } from '@/utils/objects';
import { isServer } from '@/utils/ssr';

// Import built-in themes
import baseTokens from '../base';
import lightTheme from './light';
import darkTheme from './dark';
import tumTumSahourTheme from './tum-tum-sahour';

/**
 * Theme registry interface
 */
export interface ThemeRegistry {
  readonly themes: Map<string, Partial<TokenSystem>>;
  register: (name: string, tokens: Partial<TokenSystem>) => void;
  get: (name: string) => Partial<TokenSystem>;
  getMerged: (name: string) => TokenSystem;
  list: () => string[];
  has: (name: string) => boolean;
}

/**
 * Global theme registry instance
 */
class ThemeRegistryImpl implements ThemeRegistry {
  private _themes = new Map<string, Partial<TokenSystem>>();
  private _cache = new Map<string, TokenSystem>();

  get themes(): Map<string, Partial<TokenSystem>> {
    return this._themes;
  }

  constructor() {
    // Register built-in themes
    this.register('light', lightTheme as any);
    this.register('dark', darkTheme as any);
    this.register('tum-tum-sahour', tumTumSahourTheme as any);
  }

  /**
   * Register a new theme
   */
  register(name: string, tokens: Partial<TokenSystem>): void {
    this._themes.set(name, tokens);
    this._cache.clear(); // Clear cache when new theme is registered
  }

  /**
   * Get theme tokens (without merging)
   */
  get(name: string): Partial<TokenSystem> {
    return this._themes.get(name) || {};
  }

  /**
   * Get merged theme tokens with base tokens
   */
  getMerged(name: string): TokenSystem {
    // Check cache first
    if (this._cache.has(name)) {
      return this._cache.get(name)!;
    }

    const themeTokens = this.get(name);
    const merged = mergeDeep(baseTokens, themeTokens) as any as TokenSystem;

    // Cache the result
    this._cache.set(name, merged);
    return merged;
  }

  /**
   * List all available themes
   */
  list(): string[] {
    return Array.from(this._themes.keys());
  }

  /**
   * Check if theme exists
   */
  has(name: string): boolean {
    return this._themes.has(name);
  }

  /**
   * Get system theme preference
   */
  getSystemTheme(): 'light' | 'dark' {
    if (isServer()) {
      return 'light'; // Default for SSR
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Load theme from local storage
   */
  loadFromStorage(): ThemeType | null {
    if (isServer()) {
      return null;
    }

    try {
      const stored = localStorage.getItem('xala-theme');
      return stored as ThemeType;
    } catch {
      return null;
    }
  }

  /**
   * Save theme to local storage
   */
  saveToStorage(theme: ThemeType): void {
    if (isServer()) {
      return;
    }

    try {
      localStorage.setItem('xala-theme', theme);
    } catch {
      // Ignore storage errors
    }
  }
}

/**
 * Global theme registry instance
 */
export const v5ThemeRegistry = new ThemeRegistryImpl();

/**
 * Theme utilities
 */
export const v5ThemeUtils = {
  /**
   * Resolve theme name (handle 'system')
   */
  resolveTheme(theme: ThemeType): string {
    if (theme === 'system') {
      return v5ThemeRegistry.getSystemTheme();
    }
    return theme;
  },

  /**
   * Get theme with fallback
   */
  getThemeWithFallback(theme: ThemeType, fallback: string = 'light'): TokenSystem {
    const resolved = v5ThemeUtils.resolveTheme(theme);
    const themeName = v5ThemeRegistry.has(resolved) ? resolved : fallback;
    return v5ThemeRegistry.getMerged(themeName);
  },

  /**
   * Get all available themes
   */
  getAvailableThemes(): Array<{
    name: string;
    displayName: string;
    description?: string;
  }> {
    return v5ThemeRegistry.list().map((name: string) => ({
      name,
      displayName: name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' '),
      description: `Theme: ${name}`,
    }));
  },
};

export default v5ThemeRegistry;
