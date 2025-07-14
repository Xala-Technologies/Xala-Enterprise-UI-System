/**
 * @fileoverview Button Component Tests
 * Enterprise-compliant test suite following @xala-technologies/enterprise-standards
 *
 * Tests button component functionality with accessibility, design tokens, and responsive design
 * following generic UI system patterns and SOLID principles
 */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Button } from '../../src/components/action-feedback/Button';

/**
 * Test suite for Button component
 * Enterprise-compliant testing with comprehensive coverage
 */
describe('Button Component', (): void => {
  /**
   * Test basic rendering functionality
   */
  describe('Rendering', (): void => {
    /**
     * Test basic button rendering
     */
    test('renders button with text', (): void => {
      render(<Button>Save</Button>);

      const button = screen.getByRole('button', { name: /save/i });
      expect(button).toBeInTheDocument();
    });

    /**
     * Test button with different variants
     */
    test('renders with different variants', (): void => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);

      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'primary');

      rerender(<Button variant="secondary">Secondary</Button>);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-variant', 'secondary');
    });

    /**
     * Test button with different sizes
     */
    test('renders with different sizes', (): void => {
      const { rerender } = render(<Button size="sm">Small</Button>);

      let button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'sm');

      rerender(<Button size="md">Medium</Button>);
      button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-size', 'md');
    });
  });

  /**
   * Test accessibility standards
   */
  describe('Accessibility', (): void => {
    /**
     * Test keyboard support
     */
    test('has proper keyboard support', async (): Promise<void> => {
      const mockClick = jest.fn();
      render(<Button onClick={mockClick}>Keyboard Test</Button>);

      const button = screen.getByRole('button');
      button.focus();

      // Test Enter key
      await userEvent.keyboard('{Enter}');
      expect(mockClick).toHaveBeenCalledTimes(1);
    });

    /**
     * Test screen reader support
     */
    test('supports screen readers', (): void => {
      render(
        <Button aria-label="Save document">
          <span aria-hidden="true">💾</span>
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Save document');
    });
  });

  /**
   * Test loading states
   */
  describe('Loading States', (): void => {
    /**
     * Test loading state
     */
    test('shows loading state', (): void => {
      render(<Button loading={true}>Loading Test</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    /**
     * Test accessibility during loading
     */
    test('maintains accessibility during loading', (): void => {
      render(
        <Button loading={true} loadingText="Saving...">
          Save
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveTextContent('Saving...');
    });
  });

  /**
   * Test disabled state
   */
  describe('Disabled State', (): void => {
    /**
     * Test disabled button
     */
    test('handles disabled state', (): void => {
      const mockClick = jest.fn();
      render(
        <Button disabled={true} onClick={mockClick}>
          Disabled Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');

      // Should not call onClick when disabled
      fireEvent.click(button);
      expect(mockClick).not.toHaveBeenCalled();
    });
  });

  /**
   * Test button types
   */
  describe('Button Types', (): void => {
    /**
     * Test submit button
     */
    test('works as submit button', (): void => {
      render(
        <form>
          <Button type="submit">Submit</Button>
        </form>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });
  });
});
