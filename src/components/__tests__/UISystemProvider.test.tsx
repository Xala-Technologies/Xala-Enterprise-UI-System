/**
 * @fileoverview UISystemProvider Component Tests
 * Enterprise-compliant test suite following @xala-technologies/enterprise-standards
 *
 * Tests accessibility configuration, provider context, and error handling
 * with comprehensive coverage following SOLID principles
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Logger } from '@xala-technologies/enterprise-standards';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import type { AccessibilityConfig, AccessibilityPreset } from '../../tokens/accessibility-tokens';
import { accessibilityPresets } from '../../tokens/accessibility-tokens';
import { UISystemProvider, useUISystem } from '../UISystemProvider';
import type { UISystemProviderProps } from '../UISystemProvider';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

/**
 * Test component that uses UISystemProvider context
 */
const TestComponent: React.FC = (): React.ReactElement => {
  return (
    <div data-testid="test-component">
      <button type="button">Test Button</button>
    </div>
  );
};

/**
 * Test component that uses the UISystemProvider hooks
 */
const TestComponentWithHooks: React.FC = (): React.ReactElement => {
  const { config, accessibility } = useUISystem();
  return (
    <div data-testid="test-hooks">
      <span data-testid="config-name">{config.name}</span>
      <span data-testid="accessibility-level">{accessibility.level}</span>
    </div>
  );
};

/**
 * Creates a wrapper component with UISystemProvider for testing
 */
const createWrapper = (props?: {
  config?: Partial<UISystemProviderProps['config']>;
  accessibility?: AccessibilityConfig | AccessibilityPreset;
}): React.FC<{ children: React.ReactNode }> => {
  return ({ children }) => (
    <UISystemProvider config={props?.config} accessibility={props?.accessibility}>
      {children}
    </UISystemProvider>
  );
};

/**
 * Test suite for UISystemProvider component
 */
describe('UISystemProvider', (): void => {
  /**
   * Setup function to clean mocks before each test
   */
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  /**
   * Test rendering and basic functionality
   */
  describe('Rendering', (): void => {
    /**
     * Test that provider renders children correctly
     */
    it('should render children without errors', (): void => {
      const result = render(
        <UISystemProvider>
          <TestComponent />
        </UISystemProvider>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(result.container.firstChild).toBeInTheDocument();
    });

    /**
     * Test that provider renders with accessibility configuration
     */
    it('should render with accessibility configuration', (): void => {
      const { container } = render(
        <UISystemProvider accessibility="WCAG_2_1_AA">
          <TestComponent />
        </UISystemProvider>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      
      // Check that accessibility attributes are applied
      const rootElement = container.querySelector('.ui-system-root');
      expect(rootElement).toHaveAttribute('data-accessibility-level', 'WCAG_2_1_AA');
      expect(rootElement).toHaveAttribute('data-high-contrast', 'false');
      expect(rootElement).toHaveAttribute('data-reduce-motion', 'false');
    });

    /**
     * Test that provider applies CSS variables
     */
    it('should apply CSS variables for accessibility tokens', (): void => {
      const { container } = render(
        <UISystemProvider accessibility="basic">
          <TestComponent />
        </UISystemProvider>
      );

      const rootElement = container.querySelector('.ui-system-root');
      expect(rootElement).toHaveStyle({ cssText: expect.stringContaining('--') });
    });
  });

  /**
   * Test accessibility configuration
   */
  describe('Accessibility Configuration', (): void => {
    /**
     * Test WCAG 2.1 AA configuration
     */
    it('should handle WCAG 2.1 AA configuration', (): void => {
      const Wrapper = createWrapper({ accessibility: 'WCAG_2_1_AA' });

      render(
        <Wrapper>
          <TestComponent />
        </Wrapper>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    /**
     * Test none accessibility configuration
     */
    it('should handle none accessibility configuration', (): void => {
      const Wrapper = createWrapper({ accessibility: 'none' });

      render(
        <Wrapper>
          <TestComponent />
        </Wrapper>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  /**
   * Test error handling
   */
  describe('Error Handling', (): void => {
    /**
     * Test handling of missing configuration
     */
    it('should handle missing configuration gracefully', (): void => {
      expect((): void => {
        render(
          <UISystemProvider>
            <TestComponent />
          </UISystemProvider>
        );
      }).not.toThrow();

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  /**
   * Test accessibility compliance
   */
  describe('Accessibility Compliance', (): void => {
    /**
     * Test that component has no accessibility violations
     */
    it('should have no accessibility violations', async (): Promise<void> => {
      const { container } = render(
        <UISystemProvider>
          <TestComponent />
        </UISystemProvider>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    /**
     * Test keyboard navigation support
     */
    it('should support keyboard navigation', async (): Promise<void> => {
      render(
        <UISystemProvider>
          <TestComponent />
        </UISystemProvider>
      );

      const button = screen.getByRole('button', { name: /test button/i });
      
      // Simulate focus
      button.focus();
      expect(button).toHaveFocus();
    });
  });

  /**
   * Test context hooks
   */
  describe('Context Hooks', (): void => {
    /**
     * Test useUISystem hook
     */
    it('should provide access to UI system context', (): void => {
      render(
        <UISystemProvider config={{ name: 'Test System' }}>
          <TestComponentWithHooks />
        </UISystemProvider>
      );

      expect(screen.getByTestId('config-name')).toHaveTextContent('Test System');
      // Default accessibility is 'basic' which has level 'WCAG_2_1_AA'
      const expectedLevel = accessibilityPresets.basic.level;
      expect(screen.getByTestId('accessibility-level')).toHaveTextContent(expectedLevel);
    });

    /**
     * Test error when used outside provider
     */
    it('should throw error when useUISystem is used outside provider', (): void => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = jest.fn();

      expect((): void => {
        render(<TestComponentWithHooks />);
      }).toThrow('useUISystem must be used within a UISystemProvider');

      console.error = originalError;
    });
  });

  /**
   * Test accessibility presets
   */
  describe('Accessibility Presets', (): void => {
    /**
     * Test preset application
     */
    it.each([
      ['basic', 'WCAG_2_1_AA'],
      ['enhanced', 'WCAG_2_2_AAA'],
      ['government', 'WCAG_2_2_AAA'],
      ['enterprise', 'WCAG_2_1_AA'],
      ['none', 'none'],
    ] as const)(
      'should apply %s preset correctly with level %s',
      (preset, expectedLevel): void => {
        const { container } = render(
          <UISystemProvider accessibility={preset}>
            <TestComponent />
          </UISystemProvider>
        );

        const rootElement = container.querySelector('.ui-system-root');
        expect(rootElement).toHaveAttribute('data-accessibility-level', expectedLevel);
      }
    );
  });
});
