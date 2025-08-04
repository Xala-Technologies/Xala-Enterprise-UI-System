 
/**
 * Theme Switching Utility
 * 
 * Provides runtime theme switching without JavaScript in component styling.
 * Switches themes by setting data-theme attribute on document.documentElement.
 * Saves preference to localStorage and detects system preference.
 */

export type Theme = 'light' | 'dark' | 'high-contrast' | 'system';

export interface ThemeSwitcherConfig {
  readonly defaultTheme?: Theme;
  readonly storageKey?: string;
  readonly enableTransitions?: boolean;
  readonly transitionDuration?: number;
}

const DEFAULT_CONFIG: Required<ThemeSwitcherConfig> = {
  defaultTheme: 'system',
  storageKey: 'ui-theme',
  enableTransitions: true,
  transitionDuration: 200,
} as const;

/**
 * Theme switcher utility class for managing theme switching without JavaScript in styling
 */
export class ThemeSwitcher {
  private readonly config: Required<ThemeSwitcherConfig>;
  private mediaQuery: MediaQueryList | null = null;
  private systemThemeListener: ((e: MediaQueryListEvent) => void) | null = null;

  constructor(config: ThemeSwitcherConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }

  /**
   * Initialize theme switcher - sets up system theme detection and applies saved theme
   */
  private init(): void {
    if (typeof window === 'undefined') return;

    // Set up system theme detection
    this.setupSystemThemeDetection();

    // Apply saved or system theme
    const savedTheme = this.getSavedTheme();
    this.applyTheme(savedTheme || this.config.defaultTheme);
  }

  /**
   * Set up system theme detection with media query
   */
  private setupSystemThemeDetection(): void {
    if (typeof window === 'undefined') return;

    try {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.systemThemeListener = (e: MediaQueryListEvent) => {
        const currentTheme = this.getCurrentTheme();
        if (currentTheme === 'system') {
          this.applySystemTheme();
        }
      };

      // Use the newer addEventListener if available, fallback to addListener
      if (this.mediaQuery.addEventListener) {
        this.mediaQuery.addEventListener('change', this.systemThemeListener);
      } else {
        // Fallback for older browsers
        this.mediaQuery.addListener(this.systemThemeListener);
      }
    } catch (error) {
      console.warn('System theme detection not supported:', error);
    }
  }

  /**
   * Get system preferred theme
   */
  private getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  /**
   * Get saved theme from localStorage
   */
  private getSavedTheme(): Theme | null {
    if (typeof window === 'undefined') return null;

    try {
      const saved = localStorage.getItem(this.config.storageKey);
      if (saved && ['light', 'dark', 'high-contrast', 'system'].includes(saved)) {
        return saved as Theme;
      }
    } catch (error) {
      console.warn('Unable to read theme from localStorage:', error);
    }

    return null;
  }

  /**
   * Save theme to localStorage
   */
  private saveTheme(theme: Theme): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(this.config.storageKey, theme);
    } catch (error) {
      console.warn('Unable to save theme to localStorage:', error);
    }
  }

  /**
   * Apply theme to document element
   */
  private applyThemeToDocument(resolvedTheme: 'light' | 'dark' | 'high-contrast'): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Add transition class if enabled
    if (this.config.enableTransitions) {
      root.style.setProperty('--theme-transition-duration', `${this.config.transitionDuration}ms`);
      root.classList.add('theme-transitioning');
      
      // Remove transition class after transition completes
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, this.config.transitionDuration + 50);
    }

    // Set the data-theme attribute
    root.setAttribute('data-theme', resolvedTheme);

    // Also set a CSS class for additional styling if needed
    root.className = root.className.replace(/theme-\w+/g, '');
    root.classList.add(`theme-${resolvedTheme}`);
  }

  /**
   * Apply system theme based on user's OS preference
   */
  private applySystemTheme(): void {
    const systemTheme = this.getSystemTheme();
    this.applyThemeToDocument(systemTheme);
  }

  /**
   * Apply theme with proper resolution (system -> actual theme)
   */
  private applyTheme(theme: Theme): void {
    if (theme === 'system') {
      this.applySystemTheme();
    } else {
      this.applyThemeToDocument(theme);
    }
  }

  /**
   * Switch to a specific theme
   */
  public setTheme(theme: Theme): void {
    this.saveTheme(theme);
    this.applyTheme(theme);

    // Dispatch custom event for components that need to react to theme changes
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('themeChange', {
        detail: { theme, resolvedTheme: this.getResolvedTheme() }
      });
      window.dispatchEvent(event);
    }
  }

  /**
   * Get current theme preference (including 'system')
   */
  public getCurrentTheme(): Theme {
    return this.getSavedTheme() || this.config.defaultTheme;
  }

  /**
   * Get resolved theme (actual theme being used, never 'system')
   */
  public getResolvedTheme(): 'light' | 'dark' | 'high-contrast' {
    const currentTheme = this.getCurrentTheme();
    
    if (currentTheme === 'system') {
      return this.getSystemTheme();
    }
    
    return currentTheme;
  }

  /**
   * Toggle between light and dark themes
   */
  public toggleTheme(): void {
    const current = this.getCurrentTheme();
    const resolved = this.getResolvedTheme();
    
    if (current === 'system') {
      // If system, switch to opposite of current system theme
      this.setTheme(resolved === 'dark' ? 'light' : 'dark');
    } else if (resolved === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  /**
   * Check if a theme is currently active
   */
  public isThemeActive(theme: Theme): boolean {
    if (theme === 'system') {
      return this.getCurrentTheme() === 'system';
    }
    return this.getResolvedTheme() === theme;
  }

  /**
   * Get all available themes
   */
  public getAvailableThemes(): readonly Theme[] {
    return ['light', 'dark', 'high-contrast', 'system'] as const;
  }

  /**
   * Cleanup event listeners
   */
  public destroy(): void {
    if (this.mediaQuery && this.systemThemeListener) {
      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.systemThemeListener);
      } else {
        // Fallback for older browsers
        this.mediaQuery.removeListener(this.systemThemeListener);
      }
    }
    this.mediaQuery = null;
    this.systemThemeListener = null;
  }

  /**
   * Static factory method
   */
  static create(config?: ThemeSwitcherConfig): ThemeSwitcher {
    return new ThemeSwitcher(config);
  }
}

/**
 * Global theme switcher instance
 */
let globalThemeSwitcher: ThemeSwitcher | null = null;

/**
 * Get or create global theme switcher instance
 */
export const getThemeSwitcher = (config?: ThemeSwitcherConfig): ThemeSwitcher => {
  if (!globalThemeSwitcher) {
    globalThemeSwitcher = new ThemeSwitcher(config);
  }
  return globalThemeSwitcher;
};

/**
 * Server-side safe theme detection
 */
export const getServerTheme = (userAgent?: string): 'light' | 'dark' => {
  // On server, default to light theme
  // In the future, we could parse user-agent or use other heuristics
  return 'light';
};

/**
 * Generate inline script for preventing theme flash
 */
export const generateThemeScript = (config?: ThemeSwitcherConfig): string => {
  const { storageKey = 'ui-theme', defaultTheme = 'system' } = config || {};
  
  return `
    (function() {
      try {
        var theme = localStorage.getItem('${storageKey}') || '${defaultTheme}';
        var resolvedTheme = theme;
        
        if (theme === 'system') {
          resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        document.documentElement.setAttribute('data-theme', resolvedTheme);
        document.documentElement.classList.add('theme-' + resolvedTheme);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.add('theme-light');
      }
    })();
  `.trim();
};

/**
 * CSS for theme transitions
 */
export const themeTransitionCSS = `
  .theme-transitioning {
    transition: background-color var(--theme-transition-duration, 200ms) ease-in-out,
                color var(--theme-transition-duration, 200ms) ease-in-out,
                border-color var(--theme-transition-duration, 200ms) ease-in-out;
  }
  
  .theme-transitioning *,
  .theme-transitioning *::before,
  .theme-transitioning *::after {
    transition: inherit !important;
  }
`;