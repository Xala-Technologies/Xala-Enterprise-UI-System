/**
 * ThemeManager Component Tests
 * Verifies pure component functionality without hooks
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PureThemeManager, PureCompactThemeSwitcher } from './ThemeManager';
import type { ThemeManagerProps, CompactThemeSwitcherProps } from './ThemeManager';

// Mock theme data
const mockTokens = {
  colors: {
    primary: { 500: '#3b82f6' },
    secondary: { 500: '#6b7280' },
    neutral: { 50: '#f8fafc', 500: '#64748b' },
  },
};

const mockThemes = [
  {
    metadata: { id: 'custom-1', name: 'Custom Theme 1', category: 'custom' },
    colors: {},
    typography: {},
    spacing: {},
  },
];

describe('PureThemeManager', () => {
  const defaultProps: ThemeManagerProps = {
    currentTheme: 'light',
    availableThemes: ['light', 'dark'],
    isExpanded: false,
    onToggleExpanded: jest.fn(),
    selectedTransition: 'smooth',
    onTransitionChange: jest.fn(),
    isTransitioning: false,
    tokens: mockTokens,
    onThemeChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<PureThemeManager {...defaultProps} />);
    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  test('displays current theme in toggle switch', () => {
    render(<PureThemeManager {...defaultProps} />);
    const toggleButton = screen.getByRole('button', { name: /Switch to dark theme/ });
    expect(toggleButton).toBeInTheDocument();
  });

  test('calls theme change when toggle is clicked', () => {
    const onThemeChange = jest.fn();
    render(
      <PureThemeManager 
        {...defaultProps} 
        onThemeChange={onThemeChange}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /Switch to dark theme/ });
    fireEvent.click(toggleButton);
    
    expect(onThemeChange).toHaveBeenCalledWith('dark');
  });

  test('expands options when more options button is clicked', () => {
    const onToggleExpanded = jest.fn();
    render(
      <PureThemeManager 
        {...defaultProps} 
        onToggleExpanded={onToggleExpanded}
      />
    );
    
    const moreOptionsButton = screen.getByText('More Options');
    fireEvent.click(moreOptionsButton);
    
    expect(onToggleExpanded).toHaveBeenCalled();
  });

  test('shows expanded options when isExpanded is true', () => {
    render(
      <PureThemeManager 
        {...defaultProps} 
        isExpanded={true}
      />
    );
    
    expect(screen.getByText('Select Theme')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  test('shows transition options when enabled', () => {
    render(
      <PureThemeManager 
        {...defaultProps} 
        isExpanded={true}
        showTransitionOptions={true}
      />
    );
    
    expect(screen.getByText('Transition Style')).toBeInTheDocument();
    expect(screen.getByText('Instant')).toBeInTheDocument();
    expect(screen.getByText('Smooth')).toBeInTheDocument();
  });

  test('shows preview when enabled', () => {
    render(
      <PureThemeManager 
        {...defaultProps} 
        isExpanded={true}
        showPreview={true}
      />
    );
    
    expect(screen.getByText('Preview')).toBeInTheDocument();
    expect(screen.getByText('Primary Color')).toBeInTheDocument();
  });

  test('includes custom themes in theme list', () => {
    render(
      <PureThemeManager 
        {...defaultProps} 
        isExpanded={true}
        themes={mockThemes}
      />
    );
    
    expect(screen.getByText('Custom Theme 1')).toBeInTheDocument();
  });

  test('disables interactions when transitioning', () => {
    render(
      <PureThemeManager 
        {...defaultProps} 
        isTransitioning={true}
      />
    );
    
    const toggleButton = screen.getByRole('button', { name: /Switch to dark theme/ });
    expect(toggleButton).toBeDisabled();
  });
});

describe('PureCompactThemeSwitcher', () => {
  const defaultProps: CompactThemeSwitcherProps = {
    currentTheme: 'light',
    onThemeToggle: jest.fn(),
    isTransitioning: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<PureCompactThemeSwitcher {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Switch to dark theme/ });
    expect(button).toBeInTheDocument();
  });

  test('shows correct icon for light theme', () => {
    render(<PureCompactThemeSwitcher {...defaultProps} />);
    const button = screen.getByRole('button', { name: /Switch to dark theme/ });
    
    // Check for moon icon (dark theme icon when in light mode)
    const moonIcon = button.querySelector('svg path[d*="20.354"]');
    expect(moonIcon).toBeInTheDocument();
  });

  test('shows correct icon for dark theme', () => {
    render(
      <PureCompactThemeSwitcher 
        {...defaultProps} 
        currentTheme="dark"
      />
    );
    const button = screen.getByRole('button', { name: /Switch to light theme/ });
    
    // Check for sun icon (light theme icon when in dark mode)
    const sunIcon = button.querySelector('svg path[d*="12 3v1m0 16v1m9-9h-1M4"]');
    expect(sunIcon).toBeInTheDocument();
  });

  test('calls onThemeToggle when clicked', () => {
    const onThemeToggle = jest.fn();
    render(
      <PureCompactThemeSwitcher 
        {...defaultProps} 
        onThemeToggle={onThemeToggle}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onThemeToggle).toHaveBeenCalled();
  });

  test('shows label when enabled', () => {
    render(
      <PureCompactThemeSwitcher 
        {...defaultProps} 
        showLabel={true}
      />
    );
    
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  test('applies correct size classes', () => {
    const { rerender } = render(
      <PureCompactThemeSwitcher 
        {...defaultProps} 
        size="small"
      />
    );
    
    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-8', 'w-8');
    
    rerender(
      <PureCompactThemeSwitcher 
        {...defaultProps} 
        size="large"
      />
    );
    
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-12', 'w-12');
  });

  test('disables when transitioning', () => {
    render(
      <PureCompactThemeSwitcher 
        {...defaultProps} 
        isTransitioning={true}
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

// Test CSS theme switching utilities
describe('CSS Theme Switching', () => {
  beforeEach(() => {
    // Reset DOM state
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.className = '';
    localStorage.clear();
  });

  test('should apply theme to DOM correctly', async () => {
    const { applyThemeToDOM } = await import('./css-theme-switcher');
    
    applyThemeToDOM('dark');
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('theme-dark')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  test('should get current theme from DOM', async () => {
    const { applyThemeToDOM, getCurrentThemeFromDOM } = await import('./css-theme-switcher');
    
    applyThemeToDOM('dark');
    const currentTheme = getCurrentThemeFromDOM();
    
    expect(currentTheme).toBe('dark');
  });

  test('should initialize theme from storage', async () => {
    const { initializeTheme } = await import('./css-theme-switcher');
    
    localStorage.setItem('ui-theme', 'dark');
    const theme = initializeTheme();
    
    expect(theme).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});