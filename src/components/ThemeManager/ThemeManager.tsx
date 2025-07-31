/**
 * ThemeManager Component
 * Provides UI for theme management, switching, and customization
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useTheme, useTokens } from '../../providers/UiProvider/UiProvider';
import { useThemeTransition, themeTransitionPresets } from '../../hooks/useThemeTransition';
import type { TokenSystem } from '../../tokens/types';

export interface ThemeManagerProps {
  readonly showPreview?: boolean;
  readonly showTransitionOptions?: boolean;
  readonly allowCustomThemes?: boolean;
  readonly themes?: TokenSystem[];
  readonly onThemeChange?: (theme: string) => void;
  readonly className?: string;
}

interface TransitionOption {
  name: string;
  preset: keyof typeof themeTransitionPresets;
}

const transitionOptions: TransitionOption[] = [
  { name: 'Instant', preset: 'instant' },
  { name: 'Fast', preset: 'fast' },
  { name: 'Smooth', preset: 'smooth' },
  { name: 'Slow', preset: 'slow' },
  { name: 'Dramatic', preset: 'dramatic' },
];

export const ThemeManager = ({
  showPreview = true,
  showTransitionOptions = true,
  allowCustomThemes = false,
  themes = [],
  onThemeChange,
  className = '',
}: ThemeManagerProps): JSX.Element => {
  const { theme, setTheme: baseSetTheme, availableThemes } = useTheme();
  const tokens = useTokens();
  const [selectedTransition, setSelectedTransition] = useState<keyof typeof themeTransitionPresets>('smooth');
  const [isExpanded, setIsExpanded] = useState(false);

  const { transitionTheme, isTransitioning } = useThemeTransition(
    themeTransitionPresets[selectedTransition]
  );

  // Combine built-in and custom themes
  const allThemes = useMemo(() => {
    const builtInThemes = availableThemes.map((t: string) => ({
      id: t,
      name: t.charAt(0).toUpperCase() + t.slice(1),
      category: 'built-in',
    }));

    const customThemes = themes.map(t => ({
      id: t.metadata?.id || 'custom',
      name: t.metadata?.name || 'Custom Theme',
      category: t.metadata?.category || 'custom',
    }));

    return [...builtInThemes, ...customThemes];
  }, [availableThemes, themes]);

  // Handle theme change
  const handleThemeChange = useCallback(async (themeId: string) => {
    await transitionTheme(themeId);
    onThemeChange?.(themeId);
  }, [transitionTheme, onThemeChange]);

  // Quick theme toggle
  const toggleTheme = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await handleThemeChange(newTheme);
  }, [theme, handleThemeChange]);

  return (
    <div className={`theme-manager ${className}`}>
      {/* Quick Toggle */}
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Theme
        </span>
        <button
          onClick={toggleTheme}
          disabled={isTransitioning}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
              theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Expanded Options */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 w-full text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {isExpanded ? 'Show Less' : 'More Options'}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* Theme Selection */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Theme
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {allThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  disabled={isTransitioning || theme === t.id}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    theme === t.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  } disabled:opacity-50`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Transition Options */}
          {showTransitionOptions && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Transition Style
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {transitionOptions.map((option) => (
                  <button
                    key={option.preset}
                    onClick={() => setSelectedTransition(option.preset)}
                    className={`px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedTransition === option.preset
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Theme Preview */}
          {showPreview && (
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Preview
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: tokens.colors.primary[500] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Primary Color
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: tokens.colors.secondary?.[500] || tokens.colors.neutral[500] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Secondary Color
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: tokens.colors.neutral[50] }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Background
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Compact theme switcher for headers/navigation
 */
export interface CompactThemeSwitcherProps {
  readonly size?: 'small' | 'medium' | 'large';
  readonly showLabel?: boolean;
  readonly transitionPreset?: keyof typeof themeTransitionPresets;
  readonly className?: string;
}

export const CompactThemeSwitcher = ({
  size = 'medium',
  showLabel = false,
  transitionPreset = 'smooth',
  className = '',
}: CompactThemeSwitcherProps): JSX.Element => {
  const { theme } = useTheme();
  const { transitionTheme, isTransitioning } = useThemeTransition(
    themeTransitionPresets[transitionPreset]
  );

  const handleToggle = useCallback(async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    await transitionTheme(newTheme);
  }, [theme, transitionTheme]);

  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12',
  };

  const iconSize = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6',
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isTransitioning}
      className={`${sizeClasses[size]} flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <svg
          className={`${iconSize[size]} text-gray-700`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className={`${iconSize[size]} text-yellow-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
      {showLabel && (
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
};