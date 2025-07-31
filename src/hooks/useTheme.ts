/**
 * useTheme Hook
 * Provides access to theme context and theme management
 */

import { useContext } from 'react';
import { ThemeContext } from '../providers/ThemeProvider/ThemeContext';

export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}