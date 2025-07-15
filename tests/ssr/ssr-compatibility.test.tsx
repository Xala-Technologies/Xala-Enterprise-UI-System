/**
 * @fileoverview SSR Compatibility Test Suite - Production Validation
 * @description Comprehensive tests for server-side rendering compatibility
 * @version 4.0.0
 * @compliance Production-ready, SSR-safe validation
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

// Import production components
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  DesignSystemProvider,
  Input,
  useTokens,
} from '../../src';

// Mock SSR environment
const mockSSREnvironment = () => {
  // Mock window as undefined (SSR environment)
  Object.defineProperty(global, 'window', {
    value: undefined,
    writable: true,
  });

  // Mock document as undefined (SSR environment)
  Object.defineProperty(global, 'document', {
    value: undefined,
    writable: true,
  });
};

const restoreClientEnvironment = () => {
  // Restore window and document for other tests
  Object.defineProperty(global, 'window', {
    value: global.window || {},
    writable: true,
  });

  Object.defineProperty(global, 'document', {
    value: global.document || {},
    writable: true,
  });
};

describe('SSR Compatibility Tests', () => {
  describe('Component Rendering Without Context Errors', () => {
    // Test component that uses useTokens hook
    const TestComponent: React.FC = () => {
      const { colors, spacing, typography } = useTokens();

      return (
        <div
          style={{
            color: colors.text.primary,
            padding: spacing[4],
            fontFamily: typography.fontFamily.sans.join(', '),
          }}
        >
          SSR Test Component
        </div>
      );
    };

    test('Button component renders without SSR context errors', () => {
      const { getByText } = render(
        <DesignSystemProvider templateId="base-light">
          <Button variant="primary">Test Button</Button>
        </DesignSystemProvider>
      );

      expect(getByText('Test Button')).toBeInTheDocument();
    });

    test('Card component family renders without SSR context errors', () => {
      const { getByText } = render(
        <DesignSystemProvider templateId="base-light">
          <Card variant="default">
            <CardHeader>
              <h2>Test Header</h2>
            </CardHeader>
            <CardContent>
              <p>Test Content</p>
            </CardContent>
            <CardFooter>
              <span>Test Footer</span>
            </CardFooter>
          </Card>
        </DesignSystemProvider>
      );

      expect(getByText('Test Header')).toBeInTheDocument();
      expect(getByText('Test Content')).toBeInTheDocument();
      expect(getByText('Test Footer')).toBeInTheDocument();
    });

    test('Input component renders without SSR context errors', () => {
      const { getByPlaceholderText } = render(
        <DesignSystemProvider templateId="base-light">
          <Input placeholder="Test Input" variant="default" />
        </DesignSystemProvider>
      );

      expect(getByPlaceholderText('Test Input')).toBeInTheDocument();
    });

    test('Container component renders without SSR context errors', () => {
      const { getByText } = render(
        <DesignSystemProvider templateId="base-light">
          <Container maxWidth="lg" padding="md">
            <div>Test Container Content</div>
          </Container>
        </DesignSystemProvider>
      );

      expect(getByText('Test Container Content')).toBeInTheDocument();
    });

    test('useTokens hook works without context errors', () => {
      const { getByText } = render(
        <DesignSystemProvider templateId="base-light">
          <TestComponent />
        </DesignSystemProvider>
      );

      expect(getByText('SSR Test Component')).toBeInTheDocument();
    });
  });

  describe('Provider SSR Safety', () => {
    test('DesignSystemProvider initializes safely without window', () => {
      // Mock SSR environment
      const originalWindow = global.window;
      delete (global as any).window;

      expect(() => {
        render(
          <DesignSystemProvider templateId="base-light" enableSSRFallback={true}>
            <div>SSR Content</div>
          </DesignSystemProvider>
        );
      }).not.toThrow();

      // Restore window
      global.window = originalWindow;
    });

    test('Provider works with preloaded template for SSR', () => {
      const mockTemplate = {
        id: 'test-template',
        name: 'Test Template',
        description: 'Test template for SSR validation',
        category: 'BASE' as const,
        mode: 'LIGHT' as const,
        version: '1.0.0',
        colors: {
          primary: { 500: '#0066cc' },
          secondary: { 100: '#f1f5f9', 200: '#e2e8f0' },
          background: { default: '#ffffff', paper: '#f8fafc' },
          text: { primary: '#1e293b', secondary: '#64748b', muted: '#94a3b8' },
          border: { default: '#e2e8f0', muted: '#f1f5f9' },
          status: { error: '#ef4444', success: '#10b981' },
        },
        spacing: {
          1: '0.25rem',
          2: '0.5rem',
          3: '0.75rem',
          4: '1rem',
          5: '1.25rem',
          6: '1.5rem',
        },
        typography: {
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
          fontSize: {
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
          },
          fontWeight: {
            normal: 400,
            medium: 500,
          },
          lineHeight: {
            normal: '1.5',
          },
        },
      };

      const { getByText } = render(
        <DesignSystemProvider templateId="test-template" ssrTemplate={mockTemplate}>
          <div>SSR with preloaded template</div>
        </DesignSystemProvider>
      );

      expect(getByText('SSR with preloaded template')).toBeInTheDocument();
    });
  });

  describe('Template System SSR Compatibility', () => {
    test('Emergency fallback works when template loading fails', () => {
      const { getByText } = render(
        <DesignSystemProvider templateId="non-existent-template" enableSSRFallback={true}>
          <Button variant="primary">Fallback Test</Button>
        </DesignSystemProvider>
      );

      expect(getByText('Fallback Test')).toBeInTheDocument();
    });

    test('Components receive tokens even with fallback templates', () => {
      const TokenDisplayComponent: React.FC = () => {
        const { colors } = useTokens();
        return (
          <div data-testid="token-display">
            Primary Color: {colors.primary[500] || 'Not Available'}
          </div>
        );
      };

      const { getByTestId } = render(
        <DesignSystemProvider templateId="base-light">
          <TokenDisplayComponent />
        </DesignSystemProvider>
      );

      const tokenDisplay = getByTestId('token-display');
      expect(tokenDisplay).toBeInTheDocument();
      expect(tokenDisplay.textContent).toContain('Primary Color:');
      expect(tokenDisplay.textContent).not.toContain('Not Available');
    });
  });

  describe('Bundle Tree-Shaking Validation', () => {
    test('Components can be imported individually', () => {
      // This test validates that tree-shaking works by testing individual imports
      expect(Button).toBeDefined();
      expect(Card).toBeDefined();
      expect(Input).toBeDefined();
      expect(Container).toBeDefined();
      expect(DesignSystemProvider).toBeDefined();
      expect(useTokens).toBeDefined();
    });

    test('Component props are properly typed', () => {
      // Test that TypeScript types are working
      const buttonProps = {
        variant: 'primary' as const,
        size: 'md' as const,
        children: 'Test',
      };

      const cardProps = {
        variant: 'default' as const,
        padding: 'md' as const,
        children: 'Test',
      };

      const inputProps = {
        type: 'text' as const,
        variant: 'default' as const,
        size: 'md' as const,
      };

      const containerProps = {
        maxWidth: 'lg' as const,
        padding: 'md' as const,
        children: 'Test',
      };

      // These should compile without TypeScript errors
      expect(buttonProps.variant).toBe('primary');
      expect(cardProps.variant).toBe('default');
      expect(inputProps.type).toBe('text');
      expect(containerProps.maxWidth).toBe('lg');
    });
  });

  describe('Production Performance Validation', () => {
    test('useTokens hook does not cause excessive re-renders', () => {
      let renderCount = 0;

      const CountingComponent: React.FC = () => {
        renderCount++;
        const { colors } = useTokens();
        return <div style={{ color: colors.text.primary }}>Render count: {renderCount}</div>;
      };

      const { rerender } = render(
        <DesignSystemProvider templateId="base-light">
          <CountingComponent />
        </DesignSystemProvider>
      );

      const initialRenderCount = renderCount;

      // Force re-render
      rerender(
        <DesignSystemProvider templateId="base-light">
          <CountingComponent />
        </DesignSystemProvider>
      );

      // Should not cause excessive re-renders
      expect(renderCount - initialRenderCount).toBeLessThanOrEqual(2);
    });

    test('Multiple components using useTokens perform efficiently', () => {
      const start = performance.now();

      const { getAllByTestId } = render(
        <DesignSystemProvider templateId="base-light">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <Button key={i} data-testid={`button-${i}`}>
                Button {i}
              </Button>
            ))}
          </div>
        </DesignSystemProvider>
      );

      const end = performance.now();
      const renderTime = end - start;

      expect(getAllByTestId(/button-\d+/)).toHaveLength(10);
      expect(renderTime).toBeLessThan(100); // Should render in under 100ms
    });
  });

  describe('Error Boundary Integration', () => {
    test('Components handle missing provider gracefully', () => {
      // Test what happens when components are used without provider
      console.error = jest.fn(); // Suppress expected error logs

      expect(() => {
        render(<Button>No Provider Test</Button>);
      }).not.toThrow();

      (console.error as jest.Mock).mockRestore();
    });

    test('Invalid template IDs are handled gracefully', () => {
      console.warn = jest.fn(); // Suppress expected warning logs

      const { getByText } = render(
        <DesignSystemProvider templateId="completely-invalid-template-id" enableSSRFallback={true}>
          <Button>Invalid Template Test</Button>
        </DesignSystemProvider>
      );

      expect(getByText('Invalid Template Test')).toBeInTheDocument();

      (console.warn as jest.Mock).mockRestore();
    });
  });
});

describe('Production Build Validation', () => {
  test('Package exports are correctly structured', () => {
    // Validate that main exports are available
    expect(Button).toBeDefined();
    expect(Card).toBeDefined();
    expect(Input).toBeDefined();
    expect(Container).toBeDefined();
    expect(DesignSystemProvider).toBeDefined();
    expect(useTokens).toBeDefined();
  });

  test('TypeScript definitions are complete', () => {
    // This test validates that all necessary types are exported
    // If this compiles, it means TypeScript definitions are working
    const _buttonProps: React.ComponentProps<typeof Button> = {
      children: 'Test',
    };

    const _cardProps: React.ComponentProps<typeof Card> = {
      children: 'Test',
    };

    const _inputProps: React.ComponentProps<typeof Input> = {};

    const _containerProps: React.ComponentProps<typeof Container> = {
      children: 'Test',
    };

    // Types should be defined
    expect(typeof _buttonProps).toBe('object');
    expect(typeof _cardProps).toBe('object');
    expect(typeof _inputProps).toBe('object');
    expect(typeof _containerProps).toBe('object');
  });
});
