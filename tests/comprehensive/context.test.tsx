/**
 * Comprehensive Context Testing Suite
 * Tests all context providers and their interactions
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UiProvider } from '../../src/providers/UiProvider/UiProvider';
import { useTokens } from '../../src/hooks/useTokens';
import { useTheme } from '../../src/hooks/useTheme';
import { usePlatform } from '../../src/hooks/usePlatform';
import { useLayout } from '../../src/hooks/useLayout';
import { useComponent } from '../../src/hooks/useComponent';

describe('Context Provider Tests', () => {
  describe('UiProvider', () => {
    it('should provide all contexts', () => {
      const TestComponent = () => {
        const tokens = useTokens();
        const { theme } = useTheme();
        const platform = usePlatform();
        const layout = useLayout();
        
        return (
          <div>
            <div data-testid="tokens">{tokens ? 'Tokens available' : 'No tokens'}</div>
            <div data-testid="theme">{theme}</div>
            <div data-testid="platform">{platform.isMobile ? 'Mobile' : 'Desktop'}</div>
            <div data-testid="layout">{layout.current}</div>
          </div>
        );
      };

      render(
        <UiProvider defaultTheme="light">
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('tokens')).toHaveTextContent('Tokens available');
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('platform')).toHaveTextContent('Desktop');
      expect(screen.getByTestId('layout')).toBeTruthy();
    });

    it('should handle missing provider gracefully', () => {
      // Mock console.error to avoid test noise
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      const TestComponent = () => {
        try {
          const tokens = useTokens();
          return <div>{tokens ? 'Has tokens' : 'No tokens'}</div>;
        } catch (error) {
          return <div>Error: {(error as Error).message}</div>;
        }
      };

      const { container } = render(<TestComponent />);
      
      expect(container.textContent).toContain('Error');
      consoleSpy.mockRestore();
    });

    it('should merge custom tokens', () => {
      const customTokens = {
        colors: {
          custom: {
            500: '#custom500'
          }
        }
      };

      const TestComponent = () => {
        const tokens = useTokens();
        return <div>{tokens.colors.custom?.[500]}</div>;
      };

      render(
        <UiProvider customTokens={customTokens}>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByText('#custom500')).toBeInTheDocument();
    });
  });

  describe('Theme Context', () => {
    it('should change theme', async () => {
      const TestComponent = () => {
        const { theme, setTheme } = useTheme();
        
        return (
          <div>
            <div data-testid="current-theme">{theme}</div>
            <button onClick={() => setTheme('dark')}>Set Dark</button>
            <button onClick={() => setTheme('system')}>Set System</button>
          </div>
        );
      };

      render(
        <UiProvider defaultTheme="light">
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

      // Change to dark
      await userEvent.click(screen.getByText('Set Dark'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

      // Change to system
      await userEvent.click(screen.getByText('Set System'));
      expect(screen.getByTestId('current-theme')).toHaveTextContent('system');
    });

    it('should persist theme preference', async () => {
      const TestComponent = () => {
        const { theme, setTheme } = useTheme();
        return (
          <div>
            <div data-testid="theme">{theme}</div>
            <button onClick={() => setTheme('dark')}>Dark</button>
          </div>
        );
      };

      const { unmount } = render(
        <UiProvider defaultTheme="light" persistTheme={true}>
          <TestComponent />
        </UiProvider>
      );

      // Change theme
      await userEvent.click(screen.getByText('Dark'));
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');

      // Unmount and remount
      unmount();
      
      render(
        <UiProvider defaultTheme="light" persistTheme={true}>
          <TestComponent />
        </UiProvider>
      );

      // Should remember dark theme
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should detect system theme changes', async () => {
      // Mock matchMedia
      const mockMatchMedia = (matches: boolean) => ({
        matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      });

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => {
          if (query === '(prefers-color-scheme: dark)') {
            return mockMatchMedia(true);
          }
          return mockMatchMedia(false);
        }),
      });

      const TestComponent = () => {
        const { theme, resolvedTheme } = useTheme();
        return (
          <div>
            <div data-testid="theme">{theme}</div>
            <div data-testid="resolved">{resolvedTheme}</div>
          </div>
        );
      };

      render(
        <UiProvider defaultTheme="system">
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });
  });

  describe('Platform Context', () => {
    it('should detect platform correctly', () => {
      const TestComponent = () => {
        const platform = usePlatform();
        
        return (
          <div>
            <div data-testid="is-mobile">{platform.isMobile.toString()}</div>
            <div data-testid="is-tablet">{platform.isTablet.toString()}</div>
            <div data-testid="is-desktop">{platform.isDesktop.toString()}</div>
            <div data-testid="is-touch">{platform.isTouch.toString()}</div>
            <div data-testid="os">{platform.os}</div>
            <div data-testid="browser">{platform.browser}</div>
          </div>
        );
      };

      render(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('is-mobile')).toHaveTextContent(/true|false/);
      expect(screen.getByTestId('is-tablet')).toHaveTextContent(/true|false/);
      expect(screen.getByTestId('is-desktop')).toHaveTextContent(/true|false/);
      expect(screen.getByTestId('is-touch')).toHaveTextContent(/true|false/);
      expect(screen.getByTestId('os')).toBeTruthy();
      expect(screen.getByTestId('browser')).toBeTruthy();
    });

    it('should update on viewport change', async () => {
      const TestComponent = () => {
        const platform = usePlatform();
        return <div data-testid="viewport">{platform.viewport.width}x{platform.viewport.height}</div>;
      };

      render(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      const initialViewport = screen.getByTestId('viewport').textContent;

      // Simulate viewport change
      act(() => {
        window.innerWidth = 500;
        window.innerHeight = 800;
        window.dispatchEvent(new Event('resize'));
      });

      await waitFor(() => {
        expect(screen.getByTestId('viewport')).toHaveTextContent('500x800');
      });
    });
  });

  describe('Layout Context', () => {
    it('should provide layout configuration', () => {
      const TestComponent = () => {
        const layout = useLayout();
        
        return (
          <div>
            <div data-testid="current">{layout.current}</div>
            <div data-testid="has-sidebar">{layout.sidebar.enabled.toString()}</div>
            <div data-testid="has-header">{layout.header.enabled.toString()}</div>
            <div data-testid="has-footer">{layout.footer.enabled.toString()}</div>
          </div>
        );
      };

      render(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('current')).toBeTruthy();
      expect(screen.getByTestId('has-sidebar')).toHaveTextContent(/true|false/);
      expect(screen.getByTestId('has-header')).toHaveTextContent(/true|false/);
      expect(screen.getByTestId('has-footer')).toHaveTextContent(/true|false/);
    });

    it('should update layout dynamically', async () => {
      const TestComponent = () => {
        const layout = useLayout();
        
        return (
          <div>
            <div data-testid="sidebar">{layout.sidebar.enabled.toString()}</div>
            <button onClick={() => layout.setSidebar({ enabled: !layout.sidebar.enabled })}>
              Toggle Sidebar
            </button>
          </div>
        );
      };

      render(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      const initialState = screen.getByTestId('sidebar').textContent;
      
      await userEvent.click(screen.getByText('Toggle Sidebar'));
      
      expect(screen.getByTestId('sidebar').textContent).not.toBe(initialState);
    });
  });

  describe('Component Context', () => {
    it('should provide component configuration', () => {
      const TestComponent = () => {
        const config = useComponent('button');
        
        return (
          <div>
            <div data-testid="default-variant">{config.defaultVariant}</div>
            <div data-testid="default-size">{config.defaultSize}</div>
          </div>
        );
      };

      render(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('default-variant')).toBeTruthy();
      expect(screen.getByTestId('default-size')).toBeTruthy();
    });

    it('should override component defaults', () => {
      const componentOverrides = {
        button: {
          defaultVariant: 'secondary',
          defaultSize: 'large'
        }
      };

      const TestComponent = () => {
        const config = useComponent('button');
        
        return (
          <div>
            <div data-testid="variant">{config.defaultVariant}</div>
            <div data-testid="size">{config.defaultSize}</div>
          </div>
        );
      };

      render(
        <UiProvider componentDefaults={componentOverrides}>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('variant')).toHaveTextContent('secondary');
      expect(screen.getByTestId('size')).toHaveTextContent('large');
    });
  });

  describe('Context Interactions', () => {
    it('should update tokens when theme changes', async () => {
      const TestComponent = () => {
        const tokens = useTokens();
        const { theme, setTheme } = useTheme();
        
        return (
          <div>
            <div data-testid="theme">{theme}</div>
            <div data-testid="primary-color">{tokens.colors.primary[500]}</div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              Toggle Theme
            </button>
          </div>
        );
      };

      render(
        <UiProvider defaultTheme="light">
          <TestComponent />
        </UiProvider>
      );

      const lightColor = screen.getByTestId('primary-color').textContent;
      
      await userEvent.click(screen.getByText('Toggle Theme'));
      
      const darkColor = screen.getByTestId('primary-color').textContent;
      
      // Colors should be different in different themes
      expect(lightColor).not.toBe(darkColor);
    });

    it('should adjust layout based on platform', () => {
      // Mock mobile platform
      Object.defineProperty(window.navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
      });

      const TestComponent = () => {
        const platform = usePlatform();
        const layout = useLayout();
        
        return (
          <div>
            <div data-testid="is-mobile">{platform.isMobile.toString()}</div>
            <div data-testid="layout">{layout.current}</div>
          </div>
        );
      };

      render(
        <UiProvider>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByTestId('is-mobile')).toHaveTextContent('true');
      expect(screen.getByTestId('layout')).toHaveTextContent(/mobile/i);
    });
  });

  describe('Context Performance', () => {
    it('should not re-render unnecessarily', () => {
      let tokenRenders = 0;
      let themeRenders = 0;

      const TokenConsumer = () => {
        useTokens();
        tokenRenders++;
        return <div>Token renders: {tokenRenders}</div>;
      };

      const ThemeConsumer = () => {
        const { theme } = useTheme();
        themeRenders++;
        return <div>Theme renders: {themeRenders}</div>;
      };

      const { rerender } = render(
        <UiProvider defaultTheme="light">
          <TokenConsumer />
          <ThemeConsumer />
        </UiProvider>
      );

      expect(tokenRenders).toBe(1);
      expect(themeRenders).toBe(1);

      // Re-render with same props
      rerender(
        <UiProvider defaultTheme="light">
          <TokenConsumer />
          <ThemeConsumer />
        </UiProvider>
      );

      // Should not cause additional renders
      expect(tokenRenders).toBe(1);
      expect(themeRenders).toBe(1);
    });
  });
});