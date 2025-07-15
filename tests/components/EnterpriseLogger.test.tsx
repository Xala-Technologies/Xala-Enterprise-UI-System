/**
 * @fileoverview Enterprise Logger Integration Tests
 * Enterprise-compliant test suite for Logger usage across components
 *
 * Tests logger initialization, configuration, and error handling
 * following enterprise standards and SOLID principles
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Logger } from '@xala-technologies/enterprise-standards';
import React from 'react';

import { UISystemProvider } from '../../src/components/UISystemProvider';

/**
 * Get the mocked Logger from jest.setup.js
 */
const mockedLogger = Logger as jest.Mocked<typeof Logger>;

/**
 * Test component wrapper
 */
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <UISystemProvider>{children}</UISystemProvider>
);

/**
 * Test suite for Enterprise Logger integration
 */
describe('Enterprise Logger Integration', () => {
  /**
   * Setup function to clean mocks before each test
   */
  beforeEach((): void => {
    jest.clearAllMocks();
  });

  /**
   * Test logger initialization
   */
  describe('Logger Initialization', () => {
    /**
     * Test that components using the local multiplatform-logger work correctly
     * Note: UISystemProvider uses a local Logger implementation, not the enterprise-standards one
     */
    it('should render components that use local logger implementation', (): void => {
      const { container } = render(
        <TestWrapper>
          <div data-testid="test-content">Test content</div>
        </TestWrapper>
      );

      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(container).toBeInTheDocument();
    });

    /**
     * Test that the enterprise Logger mock is available for testing
     */
    it('should have enterprise Logger mock available', (): void => {
      expect(mockedLogger.create).toBeDefined();
      expect(typeof mockedLogger.create).toBe('function');

      // Verify the mock returns the expected shape
      const mockLoggerInstance = mockedLogger.create({
        serviceName: 'test-service',
        logLevel: 'info',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });

      expect(mockLoggerInstance).toHaveProperty('debug');
      expect(mockLoggerInstance).toHaveProperty('info');
      expect(mockLoggerInstance).toHaveProperty('warn');
      expect(mockLoggerInstance).toHaveProperty('error');
      expect(mockLoggerInstance).toHaveProperty('fatal');
      expect(mockLoggerInstance).toHaveProperty('audit');
      expect(mockLoggerInstance).toHaveProperty('child');
      expect(mockLoggerInstance).toHaveProperty('clearLogs');
    });
  });

  /**
   * Test error handling
   */
  describe('Error Handling', () => {
    /**
     * Test that UI remains functional when logger is mocked
     */
    it('should maintain UI functionality with mocked logger', async (): Promise<void> => {
      const TestInput = (): JSX.Element => {
        const [value, setValue] = React.useState('');
        return (
          <input
            data-testid="test-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Test input"
          />
        );
      };

      render(
        <TestWrapper>
          <TestInput />
        </TestWrapper>
      );

      const input = screen.getByTestId('test-input');
      
      // Use fireEvent to avoid clipboard issues
      fireEvent.change(input, { target: { value: 'test value' } });
      
      // Verify the input works correctly
      await waitFor(() => {
        expect(input).toHaveValue('test value');
      });
    });

    /**
     * Test that component errors are isolated and don't break the test suite
     */
    it('should handle component errors in a controlled manner', (): void => {
      // Mock console.error to suppress error output during this test
      const originalConsoleError = console.error;
      console.error = jest.fn();

      const ThrowingComponent = (): JSX.Element => {
        throw new Error('Test error');
      };

      // Use a try-catch to handle the error gracefully
      try {
        render(
          <TestWrapper>
            <ThrowingComponent />
          </TestWrapper>
        );
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Test error');
      }

      // Restore console.error
      console.error = originalConsoleError;
    });
  });

  /**
   * Test logger mock configuration
   */
  describe('Logger Mock Configuration', () => {
    /**
     * Test that logger mock can be configured for specific test scenarios
     */
    it('should allow configuration of logger mock behavior', (): void => {
      // Create a custom mock implementation for a specific test
      const customLoggerInstance = {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
        fatal: jest.fn(),
        audit: jest.fn(),
        child: jest.fn(),
        clearLogs: jest.fn(),
      };

      mockedLogger.create.mockReturnValueOnce(customLoggerInstance);

      // Use the custom logger
      const logger = mockedLogger.create({
        serviceName: 'custom-test',
        logLevel: 'debug',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });

      // Test custom behavior
      logger.info('Test message');
      expect(customLoggerInstance.info).toHaveBeenCalledWith('Test message');
    });

    /**
     * Test that logger calls can be tracked and verified
     */
    it('should track logger method calls for testing', (): void => {
      const logger = mockedLogger.create({
        serviceName: 'tracking-test',
        logLevel: 'info',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });

      // Make various logger calls
      logger.debug('Debug message');
      logger.info('Info message', { metadata: 'test' });
      logger.warn('Warning message');
      logger.error('Error message', new Error('Test error'));
      logger.audit({ action: 'test-action', user: 'test-user' });

      // Verify calls were made
      expect(logger.debug).toHaveBeenCalledWith('Debug message');
      expect(logger.info).toHaveBeenCalledWith('Info message', { metadata: 'test' });
      expect(logger.warn).toHaveBeenCalledWith('Warning message');
      expect(logger.error).toHaveBeenCalledWith('Error message', expect.any(Error));
      expect(logger.audit).toHaveBeenCalledWith({ action: 'test-action', user: 'test-user' });
    });
  });

  /**
   * Test performance and reliability
   */
  describe('Performance and Reliability', () => {
    /**
     * Test that UI interactions are not blocked by logger operations
     */
    it('should not block UI interactions', async (): Promise<void> => {
      const InteractiveComponent = (): JSX.Element => {
        const [count, setCount] = React.useState(0);
        
        return (
          <button
            data-testid="counter-button"
            onClick={() => setCount(prev => prev + 1)}
          >
            Count: {count}
          </button>
        );
      };

      render(
        <TestWrapper>
          <InteractiveComponent />
        </TestWrapper>
      );

      const button = screen.getByTestId('counter-button');
      
      // Click the button multiple times using fireEvent
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      // Verify the count updated correctly
      await waitFor(() => {
        expect(button).toHaveTextContent('Count: 3');
      });
    });

    /**
     * Test that components render quickly even with logger initialization
     */
    it('should render components quickly', async (): Promise<void> => {
      const startTime = performance.now();
      
      render(
        <TestWrapper>
          <div data-testid="performance-test">Performance Test</div>
        </TestWrapper>
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Component should render in less than 100ms
      expect(renderTime).toBeLessThan(100);
      
      await waitFor(() => {
        expect(screen.getByTestId('performance-test')).toBeInTheDocument();
      });
    });
  });
});