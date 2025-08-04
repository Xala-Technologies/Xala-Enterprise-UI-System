/**
 * ThemeManagerContainer Component
 * Container component that manages external state for pure ThemeManager components
 * Provides theme state management without using React hooks in child components
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ThemeManager, CompactThemeSwitcher } from './ThemeManager';
import type { ThemeManagerProps, CompactThemeSwitcherProps } from './ThemeManager';
import type {
  THEME_TRANSITION_CLASSES 
} from './css-theme-switcher';
import { 
  createThemeStateManager,
  initializeTheme,
  applyThemeTransition 
} from './css-theme-switcher';
import { useTheme, useTokens } from '../../providers/UiProvider/UiProvider';

// Create global state manager instance
const themeStateManager = createThemeStateManager();

export interface ThemeManagerContainerProps extends Omit<ThemeManagerProps, 
  'currentTheme' | 'availableThemes' | 'isExpanded' | 'onToggleExpanded' | 
  'selectedTransition' | 'onTransitionChange' | 'isTransitioning' | 'tokens'
> {
  // Additional container-specific props if needed
}

export interface CompactThemeSwitcherContainerProps extends Omit<CompactThemeSwitcherProps,
  'currentTheme' | 'onThemeToggle' | 'isTransitioning'
> {
  // Additional container-specific props if needed
}

/**
 * Container for ThemeManager with external state management
 */
export const ThemeManagerContainer = (props: ThemeManagerContainerProps): JSX.Element => {
  // Container manages state using hooks
  const { theme, setTheme, availableThemes } = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTransition, setSelectedTransition] = useState<keyof typeof THEME_TRANSITION_CLASSES>('smooth');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = initializeTheme();
    if (initialTheme !== theme) {
      setTheme(initialTheme as 'light' | 'dark' | 'system');
    }
  }, []);

  // Handle theme change with transition
  const handleThemeChange = useCallback(async (newTheme: string) => {
    setIsTransitioning(true);
    
    // Apply transition
    applyThemeTransition(selectedTransition);
    
    // Change theme
    setTheme(newTheme as 'light' | 'dark' | 'system');
    
    // Reset transitioning state after animation
    const transitionDuration = selectedTransition === 'instant' ? 0 :
      selectedTransition === 'fast' ? 150 :
      selectedTransition === 'smooth' ? 300 :
      selectedTransition === 'slow' ? 500 : 1000;
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  }, [selectedTransition, setTheme]);

  const handleToggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const handleTransitionChange = useCallback((transition: string) => {
    setSelectedTransition(transition as keyof typeof THEME_TRANSITION_CLASSES);
  }, []);

  // Convert tokens to expected format for pure component
  const normalizedTokens = useMemo(() => ({
    colors: {
      primary: { 500: '#3b82f6' },
      secondary: { 500: '#8b5cf6' },
      neutral: { 50: '#f8fafc', 500: '#64748b' },
    },
  }), []);

  return (
    <ThemeManager
      {...props}
      currentTheme={theme}
      availableThemes={availableThemes}
      isExpanded={isExpanded}
      onToggleExpanded={handleToggleExpanded}
      selectedTransition={selectedTransition}
      onTransitionChange={handleTransitionChange}
      isTransitioning={isTransitioning}
      tokens={normalizedTokens}
      onThemeChange={handleThemeChange}
    />
  );
};

/**
 * Container for CompactThemeSwitcher with external state management
 */
export const CompactThemeSwitcherContainer = (props: CompactThemeSwitcherContainerProps): JSX.Element => {
  // Container manages state using hooks
  const { theme, setTheme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThemeToggle = useCallback(async () => {
    setIsTransitioning(true);
    
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Apply smooth transition for compact switcher
    applyThemeTransition('smooth');
    
    // Change theme
    setTheme(newTheme);
    
    // Reset transitioning state
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  }, [theme, setTheme]);

  return (
    <CompactThemeSwitcher
      {...props}
      currentTheme={theme}
      onThemeToggle={handleThemeToggle}
      isTransitioning={isTransitioning}
    />
  );
};

// Export pure components and containers
export { ThemeManager as PureThemeManager, CompactThemeSwitcher as PureCompactThemeSwitcher };

// Default exports are the container components (backwards compatibility)
export default ThemeManagerContainer;