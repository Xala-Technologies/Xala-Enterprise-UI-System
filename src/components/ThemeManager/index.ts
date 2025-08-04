// Pure components (hook-free)
export { 
  ThemeManager as PureThemeManager, 
  CompactThemeSwitcher as PureCompactThemeSwitcher 
} from './ThemeManager';

// Container components (with state management)
export { 
  ThemeManagerContainer as ThemeManager,
  CompactThemeSwitcherContainer as CompactThemeSwitcher
} from './ThemeManagerContainer';

// CSS-only theme utilities
export {
  applyThemeToDOM,
  getCurrentThemeFromDOM,
  getStoredTheme,
  getSystemTheme,
  initializeTheme,
  applyThemeTransition,
  createThemeStateManager,
  THEME_TRANSITION_CLASSES,
  THEME_CSS_VARIABLES
} from './css-theme-switcher';

// Types
export type { ThemeManagerProps, CompactThemeSwitcherProps } from './ThemeManager';
export type { 
  ThemeManagerContainerProps, 
  CompactThemeSwitcherContainerProps 
} from './ThemeManagerContainer';
export type { 
  ThemeState, 
  ThemeActions, 
  ThemeStateManager 
} from './css-theme-switcher';