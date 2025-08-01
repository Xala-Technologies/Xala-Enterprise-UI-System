/**
 * Comprehensive Integration Testing Suite
 * Tests the complete integration of all v5 features
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderToString } from 'react-dom/server';
import { UiProvider } from '../../src/providers/UiProvider/UiProvider';
import { useTokens, useTheme } from '../../src/providers/UiProvider/UiProvider';
import { Button } from '../../src/components/action-feedback/Button';
import { 
  generateCSSVariables,
  generateTailwindConfig,
  generateTypeScriptTypes,
  generateJSONSchema,
  validateTokensAgainstSchema
} from '../../src/tokens/transformers';
import {
  buttonVariantMap,
  generateVariantCSSVariables
} from '../../src/tokens/variant-maps';
import {
  buttonStateMap,
  generateComponentStateCSS
} from '../../src/tokens/state-maps';
import {
  responsiveComponents,
  generateResponsiveCSS
} from '../../src/tokens/responsive-tokens';

describe('V5 Architecture Integration Tests', () => {
  describe('Complete Token Pipeline', () => {
    it.skip('should transform tokens through all formats', async () => {
      // Define a theme
      const theme = {
        id: 'integration-test',
        name: 'Integration Test Theme',
        mode: 'LIGHT' as const,
        version: '1.0.0',
        metadata: {
          description: 'Integration test theme',
          author: 'Test Suite',
          tags: ['test'],
          category: 'TEST',
        },
        colors: {
          primary: { 500: '#3b82f6' },
          neutral: { 900: '#171717' },
        },
        typography: {
          fontSize: { base: '1rem' },
          fontFamily: { sans: ['Inter'] },
        },
        spacing: { 4: '1rem' },
        branding: {},
        accessibility: { wcagLevel: 'AA' },
        responsive: { breakpoints: { md: '768px' } },
      };

      // Generate all outputs
      const tsTypes = generateTypeScriptTypes(theme);
      const cssVars = generateCSSVariables(theme);
      const tailwind = generateTailwindConfig(theme);
      const schema = generateJSONSchema(theme);

      // Validate outputs
      expect(tsTypes.types).toContain('ColorTokens');
      expect(cssVars.variables).toContain('--color-primary-500');
      expect(tailwind.config).toContain('primary');
      expect(schema.schema).toHaveProperty('properties');

      // Validate theme against schema
      const validation = validateTokensAgainstSchema(theme, schema.schema);
      expect(validation.valid).toBe(true);
    });
  });

  describe('Component Integration with Tokens', () => {
    it('should use variant and state tokens in components', () => {
      const TestComponent = () => {
        const tokens = useTokens();
        
        // Generate variant CSS
        const variantCSS = generateVariantCSSVariables(
          'button',
          'primary',
          buttonVariantMap,
          tokens as any
        );
        
        // Generate state CSS
        const stateCSS = generateComponentStateCSS(
          '.btn',
          buttonStateMap,
          (ref) => typeof ref === 'string' ? ref : ref.fallback || ''
        );
        
        return (
          <div>
            <style>{stateCSS}</style>
            <Button 
              variant="primary" 
              style={variantCSS as React.CSSProperties}
            >
              Integrated Button
            </Button>
          </div>
        );
      };

      render(
        <UiProvider enableHydration={false}>
          <TestComponent />
        </UiProvider>
      );

      expect(screen.getByText('Integrated Button')).toBeInTheDocument();
    });

    it('should handle responsive tokens in components', () => {
      const ResponsiveComponent = () => {
        const tokens = useTokens();
        
        const responsiveCSS = generateResponsiveCSS(
          'padding',
          responsiveComponents.button.paddingX as any,
          '.responsive-btn',
          (ref) => {
            if (typeof ref === 'object' && 'token' in ref) {
              const parts = ref.token.split('.');
              let value: any = tokens;
              for (const part of parts) {
                value = value?.[part];
              }
              return value || ref.fallback || '';
            }
            return ref;
          }
        );
        
        return (
          <div>
            <style>{responsiveCSS}</style>
            <button className="responsive-btn">
              Responsive Button
            </button>
          </div>
        );
      };

      render(
        <UiProvider enableHydration={false}>
          <ResponsiveComponent />
        </UiProvider>
      );

      expect(screen.getByText('Responsive Button')).toBeInTheDocument();
    });
  });

  describe('SSR to Client Hydration Flow', () => {
    it('should maintain consistency from SSR to client', async () => {
      const App = () => {
        const { theme, setTheme } = useTheme();
        const tokens = useTokens();
        
        return (
          <div>
            <div data-testid="theme">{theme}</div>
            <div data-testid="primary-color">{tokens.colors.primary[500]}</div>
            <Button onClick={() => setTheme('dark')}>
              Switch Theme
            </Button>
          </div>
        );
      };

      // 1. Server render
      const serverHTML = renderToString(
        <UiProvider defaultTheme="light" enableHydration={false}>
          <App />
        </UiProvider>
      );

      expect(serverHTML).toContain('light');

      // 2. Client render
      const { container } = render(
        <UiProvider defaultTheme="light" enableHydration={false}>
          <App />
        </UiProvider>
      );

      expect(screen.getByTestId('theme')).toHaveTextContent('light');

      // 3. Interactive update
      await userEvent.click(screen.getByText('Switch Theme'));
      
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      
      // Primary color should change with theme
      const darkPrimaryColor = screen.getByTestId('primary-color').textContent;
      expect(darkPrimaryColor).not.toBe('#3b82f6'); // Should be different in dark theme
    });
  });

  describe('Multi-Theme Support', () => {
    it('should support multiple themes with proper isolation', () => {
      const themes = [
        { id: 'theme-a', primaryColor: '#ff0000' },
        { id: 'theme-b', primaryColor: '#00ff00' },
        { id: 'theme-c', primaryColor: '#0000ff' },
      ];

      const MultiThemeApp = () => {
        const [currentTheme, setCurrentTheme] = React.useState(0);
        
        return (
          <div>
            {themes.map((theme, index) => (
              <div
                key={theme.id}
                data-theme={theme.id}
                style={{ 
                  display: currentTheme === index ? 'block' : 'none',
                  '--primary-color': theme.primaryColor,
                } as React.CSSProperties}
              >
                <h2>{theme.id}</h2>
                <Button 
                  style={{ backgroundColor: 'var(--primary-color)' }}
                  onClick={() => setCurrentTheme((index + 1) % themes.length)}
                >
                  Next Theme
                </Button>
              </div>
            ))}
          </div>
        );
      };

      render(
        <UiProvider enableHydration={false}>
          <MultiThemeApp />
        </UiProvider>
      );

      expect(screen.getByText('theme-a')).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('should handle large token systems efficiently', () => {
      // Create a large token system
      const largeTheme = {
        id: 'large',
        name: 'Large Theme',
        mode: 'LIGHT' as const,
        version: '1.0.0',
        colors: Object.fromEntries(
          Array.from({ length: 50 }, (_, i) => [
            `color${i}`,
            {
              50: `#${i.toString(16).padStart(2, '0')}0000`,
              500: `#${i.toString(16).padStart(2, '0')}ff00`,
              900: `#${i.toString(16).padStart(2, '0')}00ff`,
            }
          ])
        ),
        typography: {
          fontSize: Object.fromEntries(
            Array.from({ length: 20 }, (_, i) => [`size${i}`, `${i}rem`])
          ),
        },
        spacing: Object.fromEntries(
          Array.from({ length: 100 }, (_, i) => [i, `${i * 0.25}rem`])
        ),
        branding: {},
        accessibility: {},
        responsive: {},
      };

      const start = Date.now();
      
      // Generate all transformations
      const tsTypes = generateTypeScriptTypes(largeTheme);
      const cssVars = generateCSSVariables(largeTheme);
      const tailwind = generateTailwindConfig(largeTheme);
      const schema = generateJSONSchema(largeTheme);
      
      const duration = Date.now() - start;

      // Should complete quickly even with large token set
      expect(duration).toBeLessThan(100);
      
      // Outputs should be valid
      expect(tsTypes.types).toBeTruthy();
      expect(cssVars.variables).toBeTruthy();
      expect(tailwind.config).toBeTruthy();
      expect(schema.schema).toBeTruthy();
    });
  });

  describe('Error Recovery', () => {
    it('should handle missing tokens gracefully', () => {
      const BrokenComponent = () => {
        const tokens = useTokens();
        
        // Try to access non-existent token
        const missingColor = (tokens as any).colors?.missing?.value || '#fallback';
        
        return (
          <div style={{ color: missingColor }}>
            Fallback Color
          </div>
        );
      };

      render(
        <UiProvider enableHydration={false}>
          <BrokenComponent />
        </UiProvider>
      );

      expect(screen.getByText('Fallback Color')).toBeInTheDocument();
    });

    it('should validate and report invalid tokens', () => {
      const invalidTheme = {
        colors: {
          primary: {
            500: 'not-a-valid-color',
          },
        },
      };

      const schema = generateJSONSchema({
        id: 'test',
        name: 'Test',
        mode: 'LIGHT' as const,
        version: '1.0.0',
        colors: { primary: { 500: '#valid' } },
        typography: {},
        spacing: {},
        branding: {},
        accessibility: {},
        responsive: {},
      });

      const validation = validateTokensAgainstSchema(invalidTheme, schema.schema);
      
      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });
  });

  describe('Real-World Scenario', () => {
    it('should handle a complete application flow', async () => {
      // Simulate a real app with theme switching, responsive design, and SSR
      const RealApp = () => {
        const { theme, setTheme } = useTheme();
        const tokens = useTokens();
        const [user, setUser] = React.useState<string | null>(null);
        
        return (
          <div style={{ 
            backgroundColor: tokens.colors.neutral[50],
            minHeight: '100vh',
          }}>
            <header style={{
              backgroundColor: tokens.colors.primary[500],
              padding: tokens.spacing[4],
            }}>
              <h1 style={{ color: tokens.colors.white }}>My App</h1>
              <Button 
                variant="secondary"
                size="small"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </Button>
            </header>
            
            <main style={{ padding: tokens.spacing[8] }}>
              {!user ? (
                <div>
                  <h2>Welcome</h2>
                  <Button 
                    variant="primary"
                    onClick={() => setUser('John Doe')}
                  >
                    Login
                  </Button>
                </div>
              ) : (
                <div>
                  <h2>Hello, {user}!</h2>
                  <Button 
                    variant="danger"
                    onClick={() => setUser(null)}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </main>
          </div>
        );
      };

      // Test SSR
      const serverHTML = renderToString(
        <UiProvider defaultTheme="light" enableHydration={false}>
          <RealApp />
        </UiProvider>
      );
      
      expect(serverHTML).toContain('My App');
      expect(serverHTML).toContain('Welcome');
      
      // Test client interaction
      render(
        <UiProvider defaultTheme="light" enableHydration={false}>
          <RealApp />
        </UiProvider>
      );
      
      // Login
      await userEvent.click(screen.getByText('Login'));
      expect(screen.getByText('Hello, John Doe!')).toBeInTheDocument();
      
      // Theme switch
      await userEvent.click(screen.getByText('🌙'));
      await waitFor(() => {
        expect(screen.getByText('☀️')).toBeInTheDocument();
      });
      
      // Logout
      await userEvent.click(screen.getByText('Logout'));
      expect(screen.getByText('Welcome')).toBeInTheDocument();
    });
  });
});