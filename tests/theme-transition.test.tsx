/**
 * Theme Transition Tests
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UiProvider } from '../src/providers/UiProvider/UiProvider';
import { useThemeTransition, themeTransitionPresets } from '../src/hooks/useThemeTransition';
import { ThemeManager, CompactThemeSwitcher } from '../src/components/ThemeManager';

// Test component that uses the hook
const TestComponent = ({ options = {} }: { options?: any }) => {
  const { 
    transitionTheme, 
    isTransitioning, 
    transitionState,
    cancelTransition,
    getTransitionStyles 
  } = useThemeTransition(options);

  return (
    <div>
      <button onClick={() => transitionTheme('dark')}>Switch to Dark</button>
      <button onClick={() => transitionTheme('light')}>Switch to Light</button>
      <button onClick={cancelTransition}>Cancel</button>
      <div data-testid="is-transitioning">{isTransitioning.toString()}</div>
      <div data-testid="transition-state">{JSON.stringify(transitionState)}</div>
      <div data-testid="transition-styles" style={getTransitionStyles()}>
        Styled Content
      </div>
    </div>
  );
};

describe('useThemeTransition', () => {
  beforeEach(() => {
    // Clear any existing styles
    document.head.innerHTML = '';
  });

  it('should transition between themes', async () => {
    render(
      <UiProvider defaultTheme="light">
        <TestComponent />
      </UiProvider>
    );

    expect(screen.getByTestId('is-transitioning')).toHaveTextContent('false');

    await userEvent.click(screen.getByText('Switch to Dark'));

    expect(screen.getByTestId('is-transitioning')).toHaveTextContent('true');

    await waitFor(() => {
      expect(screen.getByTestId('is-transitioning')).toHaveTextContent('false');
    }, { timeout: 1000 });
  });

  it('should handle instant transitions', async () => {
    render(
      <UiProvider defaultTheme="light">
        <TestComponent options={themeTransitionPresets.instant} />
      </UiProvider>
    );

    await userEvent.click(screen.getByText('Switch to Dark'));

    // Should not show transitioning state for instant
    expect(screen.getByTestId('is-transitioning')).toHaveTextContent('false');
  });

  it('should cancel transitions', async () => {
    render(
      <UiProvider defaultTheme="light">
        <TestComponent options={{ duration: 1000 }} />
      </UiProvider>
    );

    await userEvent.click(screen.getByText('Switch to Dark'));
    expect(screen.getByTestId('is-transitioning')).toHaveTextContent('true');

    await userEvent.click(screen.getByText('Cancel'));
    expect(screen.getByTestId('is-transitioning')).toHaveTextContent('false');
  });

  it('should apply transition styles', async () => {
    render(
      <UiProvider defaultTheme="light">
        <TestComponent />
      </UiProvider>
    );

    await userEvent.click(screen.getByText('Switch to Dark'));

    const styledElement = screen.getByTestId('transition-styles');
    const styles = styledElement.getAttribute('style');
    
    expect(styles).toContain('transition-property');
    expect(styles).toContain('transition-duration');
  });

  it('should add and remove transition styles from document', async () => {
    render(
      <UiProvider defaultTheme="light">
        <TestComponent options={{ duration: 100 }} />
      </UiProvider>
    );

    await userEvent.click(screen.getByText('Switch to Dark'));

    // Check if style element is added
    const styleEl = document.getElementById('theme-transition-styles');
    expect(styleEl).toBeTruthy();
    expect(styleEl?.textContent).toContain('transition-property');

    // Wait for transition to complete
    await waitFor(() => {
      const removedStyle = document.getElementById('theme-transition-styles');
      expect(removedStyle).toBeFalsy();
    }, { timeout: 500 });
  });
});

describe('ThemeManager', () => {
  it('should render theme manager', () => {
    render(
      <UiProvider>
        <ThemeManager />
      </UiProvider>
    );

    expect(screen.getByText('Theme')).toBeInTheDocument();
  });

  it('should toggle theme', async () => {
    const mockOnChange = jest.fn();
    
    render(
      <UiProvider defaultTheme="light">
        <ThemeManager onThemeChange={mockOnChange} />
      </UiProvider>
    );

    const toggleButton = screen.getByLabelText('Switch to dark theme');
    await userEvent.click(toggleButton);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('dark');
    });
  });

  it('should expand to show more options', async () => {
    render(
      <UiProvider>
        <ThemeManager />
      </UiProvider>
    );

    expect(screen.queryByText('Select Theme')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('More Options'));

    expect(screen.getByText('Select Theme')).toBeInTheDocument();
    expect(screen.getByText('Transition Style')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('should allow transition style selection', async () => {
    render(
      <UiProvider>
        <ThemeManager showTransitionOptions={true} />
      </UiProvider>
    );

    await userEvent.click(screen.getByText('More Options'));

    const fastButton = screen.getByText('Fast');
    const dramaticButton = screen.getByText('Dramatic');

    expect(fastButton).toHaveClass('bg-gray-100');
    expect(dramaticButton).toHaveClass('bg-gray-100');

    await userEvent.click(dramaticButton);

    expect(dramaticButton).toHaveClass('bg-blue-500');
  });
});

describe('CompactThemeSwitcher', () => {
  it('should render compact switcher', () => {
    render(
      <UiProvider>
        <CompactThemeSwitcher />
      </UiProvider>
    );

    // Button should be present regardless of which theme it's switching to
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label');
  });

  it('should toggle theme with transition', async () => {
    render(
      <UiProvider defaultTheme="light">
        <CompactThemeSwitcher transitionPreset="fast" />
      </UiProvider>
    );

    const button = screen.getByLabelText('Switch to dark theme');
    await userEvent.click(button);

    // Button should be disabled during transition
    expect(button).toBeDisabled();

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Switch to light theme');
    });
  });

  it('should show label when requested', () => {
    render(
      <UiProvider defaultTheme="light">
        <CompactThemeSwitcher showLabel={true} />
      </UiProvider>
    );

    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('should render different sizes', () => {
    const { rerender } = render(
      <UiProvider>
        <CompactThemeSwitcher size="small" />
      </UiProvider>
    );

    let button = screen.getByLabelText(/Switch to/);
    expect(button).toHaveClass('h-8', 'w-8');

    rerender(
      <UiProvider>
        <CompactThemeSwitcher size="large" />
      </UiProvider>
    );

    button = screen.getByLabelText(/Switch to/);
    expect(button).toHaveClass('h-12', 'w-12');
  });
});