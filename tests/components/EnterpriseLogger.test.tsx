/**
 * @fileoverview Enterprise Logger Integration Tests
 * Enterprise-compliant test suite for Logger usage across components
 *
 * Tests logger initialization, configuration, and error handling
 * following enterprise standards and SOLID principles
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Logger } from '@xala-technologies/enterprise-standards';
import React from 'react';

import { UISystemProvider } from '../../src/components/UISystemProvider';
import { OrganizationNumberInput } from '../../src/components/form/OrganizationNumberInput';

/**
 * Mock the Logger to track calls
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
 * Mock Logger.create method
 */
jest.mock('@xala-technologies/enterprise-standards', () => ({
  Logger: {
    create: jest.fn(() => mockLogger),
  },
}));

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
     * Test that Logger.create is called with correct parameters for UISystemProvider
     */
    it('should initialize UISystemProvider logger with correct configuration', (): void => {
      render(
        <TestWrapper>
          <div>Test content</div>
        </TestWrapper>
      );

      expect(Logger.create).toHaveBeenCalledWith({
        serviceName: 'ui-system-provider',
        logLevel: 'info',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });
    });

    /**
     * Test that Logger.create is called with correct parameters for tokens
     */
    it('should initialize tokens logger with correct configuration', (): void => {
      // Import tokens to trigger logger initialization
      require('../../src/tokens/index');

      expect(Logger.create).toHaveBeenCalledWith({
        serviceName: 'ui-system-tokens',
        logLevel: 'info',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });
    });

    /**
     * Test that Logger.create is called with correct parameters for OrganizationNumberInput
     */
    it('should initialize OrganizationNumberInput logger with correct configuration', (): void => {
      render(
        <TestWrapper>
          <OrganizationNumberInput value="" onChange={() => {}} label="Organization Number" />
        </TestWrapper>
      );

      expect(Logger.create).toHaveBeenCalledWith({
        serviceName: 'ui-system-org-number-input',
        logLevel: 'info',
        enableConsoleLogging: true,
        enableFileLogging: false,
      });
    });
  });

  /**
   * Test logging functionality
   */
  describe('Logging Functionality', () => {
    /**
     * Test that warnings are logged correctly
     */
    it('should log warnings with proper metadata', (): void => {
      render(
        <TestWrapper>
          <OrganizationNumberInput
            value="invalid-org-number"
            onChange={() => {}}
            label="Organization Number"
          />
        </TestWrapper>
      );

      // Clear initial logger calls
      mockLogger.warn.mockClear();

      // Simulate a fetch error by changing the input value
      const input = screen.getByLabelText('Organization Number');
      fireEvent.change(input, { target: { value: '123456789' } });

      // Wait for debounced validation
      setTimeout(() => {
        expect(mockLogger.warn).toHaveBeenCalledWith(
          'Failed to fetch organization data:',
          expect.objectContaining({
            error: expect.any(String),
          })
        );
      }, 500);
    });

    /**
     * Test that info logs are created for user interactions
     */
    it('should log info messages for user interactions', async (): Promise<void> => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <OrganizationNumberInput value="" onChange={() => {}} label="Organization Number" />
        </TestWrapper>
      );

      const input = screen.getByLabelText('Organization Number');

      // Clear initial logger calls
      mockLogger.info.mockClear();

      await user.type(input, '123456789');

      // Logger should be called during validation
      expect(mockLogger.info).toHaveBeenCalled();
    });
  });

  /**
   * Test error handling
   */
  describe('Error Handling', () => {
    /**
     * Test that errors are handled gracefully when logger fails
     */
    it('should handle logger initialization errors gracefully', (): void => {
      // Mock Logger.create to throw an error
      (Logger.create as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Logger initialization failed');
      });

      expect(() => {
        render(
          <TestWrapper>
            <div>Test content</div>
          </TestWrapper>
        );
      }).not.toThrow();
    });

    /**
     * Test that components continue to work when logging fails
     */
    it('should continue component functionality when logging fails', (): void => {
      // Mock logger methods to throw errors
      mockLogger.info.mockImplementation(() => {
        throw new Error('Logging failed');
      });

      expect(() => {
        render(
          <TestWrapper>
            <OrganizationNumberInput value="" onChange={() => {}} label="Organization Number" />
          </TestWrapper>
        );
      }).not.toThrow();

      // Component should still render
      expect(screen.getByLabelText('Organization Number')).toBeInTheDocument();
    });
  });

  /**
   * Test logger configuration
   */
  describe('Logger Configuration', () => {
    /**
     * Test that all loggers use consistent configuration
     */
    it('should use consistent logger configuration across components', (): void => {
      render(
        <TestWrapper>
          <OrganizationNumberInput value="" onChange={() => {}} label="Organization Number" />
        </TestWrapper>
      );

      // Check that all Logger.create calls use the same structure
      const loggerCalls = (Logger.create as jest.Mock).mock.calls;

      loggerCalls.forEach(call => {
        const [config] = call;
        expect(config).toHaveProperty('serviceName');
        expect(config).toHaveProperty('logLevel', 'info');
        expect(config).toHaveProperty('enableConsoleLogging', true);
        expect(config).toHaveProperty('enableFileLogging', false);
      });
    });

    /**
     * Test that service names are unique and descriptive
     */
    it('should use unique and descriptive service names', (): void => {
      render(
        <TestWrapper>
          <OrganizationNumberInput value="" onChange={() => {}} label="Organization Number" />
        </TestWrapper>
      );

      const loggerCalls = (Logger.create as jest.Mock).mock.calls;
      const serviceNames = loggerCalls.map(call => call[0].serviceName);

      // Check that all service names are unique
      const uniqueNames = new Set(serviceNames);
      expect(uniqueNames.size).toBe(serviceNames.length);

      // Check that all service names follow naming convention
      serviceNames.forEach(name => {
        expect(name).toMatch(/^ui-system-/);
        expect(name).not.toContain(' ');
        expect(name).not.toContain('_');
      });
    });
  });

  /**
   * Test performance and reliability
   */
  describe('Performance and Reliability', () => {
    /**
     * Test that logger calls don't block UI
     */
    it('should not block UI interactions with logging', async (): Promise<void> => {
      const user = userEvent.setup();

      render(
        <TestWrapper>
          <OrganizationNumberInput value="" onChange={() => {}} label="Organization Number" />
        </TestWrapper>
      );

      const input = screen.getByLabelText('Organization Number');

      // Simulate slow logger
      mockLogger.info.mockImplementation(() => {
        // Simulate delay
        return new Promise(resolve => setTimeout(resolve, 100));
      });

      // UI should remain responsive
      await user.type(input, '123');
      expect(input).toHaveValue('123');
    });
  });
});
