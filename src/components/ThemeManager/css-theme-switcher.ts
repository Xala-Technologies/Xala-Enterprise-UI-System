 
/**
 * CSS-Only Theme Switcher
 * Pure implementation for theme switching using CSS variables and data attributes
 * No React hooks or state management dependencies
 */

export interface ThemeState {
  currentTheme: string;
  availableThemes: string[];
  isExpanded: boolean;
  selectedTransition: string;
  isTransitioning: boolean;
}

export interface ThemeActions {
  setTheme: (theme: string) => void;
  toggleExpanded: () => void;
  setTransition: (transition: string) => void;
  setTransitioning: (isTransitioning: boolean) => void;
}

export interface ThemeStateManager {
  state: ThemeState;
  actions: ThemeActions;
}

/**
 * CSS-only theme application using data attributes
 */
export const applyThemeToDOM = (theme: string): void => {
  // Apply theme via data attribute for CSS targeting
  document.documentElement.setAttribute('data-theme', theme);
  
  // Also support legacy class-based themes
  document.documentElement.className = document.documentElement.className
    .replace(/theme-\w+/g, '')
    .trim();
  document.documentElement.classList.add(`theme-${theme}`);
  
  // Apply dark/light mode class for compatibility
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
  
  // Store theme preference
  try {
    localStorage.setItem('ui-theme', theme);
  } catch (error) {
    console.warn('Failed to store theme preference:', error);
  }
};

/**
 * Get current theme from DOM
 */
export const getCurrentThemeFromDOM = (): string => {
  const dataTheme = document.documentElement.getAttribute('data-theme');
  if (dataTheme) return dataTheme;
  
  // Fallback to class detection
  const classList = Array.from(document.documentElement.classList);
  const themeClass = classList.find(cls => cls.startsWith('theme-'));
  if (themeClass) return themeClass.replace('theme-', '');
  
  // Ultimate fallback
  return 'light';
};

/**
 * Get stored theme preference
 */
export const getStoredTheme = (): string | null => {
  try {
    return localStorage.getItem('ui-theme');
  } catch (error) {
    console.warn('Failed to get stored theme:', error);
    return null;
  }
};

/**
 * Detect system theme preference
 */
export const getSystemTheme = (): string => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches 
    ? 'dark' 
    : 'light';
};

/**
 * Initialize theme from storage or system preference
 */
export const initializeTheme = (): string => {
  const stored = getStoredTheme();
  if (stored) {
    applyThemeToDOM(stored);
    return stored;
  }
  
  const system = getSystemTheme();
  applyThemeToDOM(system);
  return system;
};

/**
 * CSS transition classes for theme switching
 */
export const THEME_TRANSITION_CLASSES = {
  instant: '',
  fast: 'transition-all duration-150 ease-out',
  smooth: 'transition-all duration-300 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  dramatic: 'transition-all duration-1000 ease-in-out',
} as const;

/**
 * Apply transition class to document
 */
export const applyThemeTransition = (transition: keyof typeof THEME_TRANSITION_CLASSES): void => {
  const transitionClass = THEME_TRANSITION_CLASSES[transition];
  
  // Remove existing transition classes
  Object.values(THEME_TRANSITION_CLASSES).forEach(cls => {
    if (cls) {
      document.documentElement.classList.remove(...cls.split(' '));
    }
  });
  
  // Add new transition class
  if (transitionClass) {
    document.documentElement.classList.add(...transitionClass.split(' '));
  }
};

/**
 * Create a simple state manager for theme state (no React hooks)
 */
export const createThemeStateManager = (
  initialState?: Partial<ThemeState>
): ThemeStateManager => {
  let state: ThemeState = {
    currentTheme: 'light',
    availableThemes: ['light', 'dark'],
    isExpanded: false,
    selectedTransition: 'smooth',
    isTransitioning: false,
    ...initialState,
  };
  
  const listeners: Array<(state: ThemeState) => void> = [];
  
  const notifyListeners = (): void => {
    listeners.forEach(listener => listener(state));
  };
  
  const actions: ThemeActions = {
    setTheme: (theme: string) => {
      state = { ...state, currentTheme: theme };
      applyThemeToDOM(theme);
      notifyListeners();
    },
    
    toggleExpanded: () => {
      state = { ...state, isExpanded: !state.isExpanded };
      notifyListeners();
    },
    
    setTransition: (transition: string) => {
      state = { ...state, selectedTransition: transition };
      applyThemeTransition(transition as keyof typeof THEME_TRANSITION_CLASSES);
      notifyListeners();
    },
    
    setTransitioning: (isTransitioning: boolean) => {
      state = { ...state, isTransitioning };
      notifyListeners();
    },
  };
  
  return {
    state,
    actions,
  };
};

/**
 * Default CSS variables for theme system
 */
export const THEME_CSS_VARIABLES = `
  :root {
    /* Light theme variables */
    --color-primary-50: #eff6ff;
    --color-primary-500: #3b82f6;
    --color-primary-900: #1e3a8a;
    --color-secondary-500: #6b7280;
    --color-neutral-50: #f8fafc;
    --color-neutral-500: #64748b;
    --color-neutral-900: #0f172a;
    --color-background-default: #ffffff;
    --color-background-paper: #f8fafc;
    --color-text-primary: #0f172a;
    --color-text-secondary: #475569;
  }
  
  [data-theme="dark"], .theme-dark {
    /* Dark theme variables */
    --color-primary-50: #1e3a8a;
    --color-primary-500: #60a5fa;
    --color-primary-900: #dbeafe;
    --color-secondary-500: #9ca3af;
    --color-neutral-50: #1e293b;
    --color-neutral-500: #64748b;
    --color-neutral-900: #f1f5f9;
    --color-background-default: #0f172a;
    --color-background-paper: #1e293b;
    --color-text-primary: #f1f5f9;
    --color-text-secondary: #cbd5e1;
  }
`;