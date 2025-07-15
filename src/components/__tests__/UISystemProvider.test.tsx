/**
 * @fileoverview UISystemProvider Component Tests
 * Enterprise-compliant test suite following @xala-technologies/enterprise-standards
 *
 * Tests accessibility configuration, provider context, and error handling
 * with comprehensive coverage following SOLID principles
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { Logger } from '../../lib/utils/multiplatform-logger';

import type { AccessibilityConfig } from '../../tokens/accessibility-tokens';
import { UISystemProvider } from '../UISystemProvider';

// Extend Jest matchers for accessibility testing
expect.extend(toHaveNoViolations);

/**
 * Mock logger for testing
 */
const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  fatal: jest.fn(),
  audit: jest.fn(),
  child: jest.fn(),
  clearLogs: jest.fn(),
};

/**
 * Mock Logger.create to return our mock logger
 */
jest.mock('@xala-technologies/enterprise-standards', () => ({
  Logger: {
    create: jest.fn(() => mockLogger),
  },
}));

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
 * Creates a wrapper component with UISystemProvider for testing
 */
const createWrapper = (config?: {
  accessibility?: AccessibilityConfig;
}): React.FC<{ children: React.ReactNode }> => {
  return ({ children }) => <UISystemProvider config={config}>{children}</UISystemProvider>;
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
      const accessibilityConfig: AccessibilityConfig = {
        level: 'WCAG_2_1_AA',
        highContrast: false,
        reduceMotion: false,
        screenReader: true,
        keyboardNavigation: true,
        focusManagement: true,
        colorContrast: {
          normal: 4.5,
          large: 3.0,
        },
        touchTargets: {
          minimum: 44,
          recommended: 48,
        },
        textSpacing: {
          lineHeight: 1.5,
          paragraphSpacing: 2.0,
          letterSpacing: 0.12,
          wordSpacing: 0.16,
        },
        animation: {
          duration: 3.0,
          flickerThreshold: 3,
          pauseControl: true,
        },
      };

      render(
        <UISystemProvider config={{ accessibility: accessibilityConfig }}>
          <TestComponent />
        </UISystemProvider>
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
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
      const config: AccessibilityConfig = {
        level: 'WCAG_2_1_AA',
        highContrast: false,
        reduceMotion: false,
        screenReader: true,
        keyboardNavigation: true,
        focusManagement: true,
        colorContrast: {
          normal: 4.5,
          large: 3.0,
        },
        touchTargets: {
          minimum: 44,
          recommended: 48,
        },
        textSpacing: {
          lineHeight: 1.5,
          paragraphSpacing: 2.0,
          letterSpacing: 0.12,
          wordSpacing: 0.16,
        },
        animation: {
          duration: 3.0,
          flickerThreshold: 3,
          pauseControl: true,
        },
      };

      const Wrapper = createWrapper({ accessibility: config });

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
      const config: AccessibilityConfig = {
        level: 'none',
        highContrast: false,
        reduceMotion: false,
        screenReader: false,
        keyboardNavigation: false,
        focusManagement: false,
        colorContrast: {
          normal: 3.0,
          large: 3.0,
        },
        touchTargets: {
          minimum: 24,
          recommended: 32,
        },
        textSpacing: {
          lineHeight: 1.2,
          paragraphSpacing: 1.0,
          letterSpacing: 0.0,
          wordSpacing: 0.0,
        },
        animation: {
          duration: 5.0,
          flickerThreshold: 2,
          pauseControl: false,
        },
      };

      const Wrapper = createWrapper({ accessibility: config });

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
      const user = userEvent.setup();

      render(
        <UISystemProvider>
          <TestComponent />
        </UISystemProvider>
      );

      const button = screen.getByRole('button', { name: /test button/i });

      await user.tab();
      expect(button).toHaveFocus();
    });
  });

  /**
   * Test logging functionality
   */
  describe('Logging', (): void => {
    /**
     * Test that logger is created with correct configuration
     */
    it('should create logger with correct configuration', (): void => {
      render(
        <UISystemProvider>
          <TestComponent />
        </UISystemProvider>
      );

      expect(Logger.create).toHaveBeenCalledWith({
        serviceName: 'ui-system-provider',
        logLevel: 'info',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });
    });
  });
});
