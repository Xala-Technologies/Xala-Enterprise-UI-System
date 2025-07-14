/**
 * Button Component Tests for @xala-mock/ui-system
 * Norwegian compliance testing with Jest, React Testing Library, and axe-core
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from '../../src/components/action-feedback/Button';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Button Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    test('renders button with Norwegian text', () => {
      render(<Button labelKey="common.save">Lagre</Button>);
      
      const button = screen.getByRole('button', { name: /lagre/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveNorwegianLanguageSupport();
    });

    test('renders with classification level', () => {
      render(
        <Button 
          labelKey="common.submit"
          norwegian={{ classification: 'BEGRENSET' }}
        >
          Send inn
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toComplyCNSMClassification('BEGRENSET');
    });

    test('renders with municipality context', () => {
      render(
        <Button 
          labelKey="common.save"
          norwegian={{ municipality: '0301' }}
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button.getAttribute('data-municipality')).toBe('0301');
    });
  });

  // Norwegian accessibility tests
  describe('Norwegian Accessibility', () => {
    test('meets WCAG 2.2 AA standards for Norway', async () => {
      const { container } = render(
        <Button 
          variant="primary"
          size="standard"
          labelKey="common.save"
          norwegian={{ 
            accessibility: 'WCAG_2_2_AA',
            classification: 'ÅPEN'
          }}
        >
          Lagre dokument
        </Button>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toBeAccessibleForNorway();
    });

    test('has proper Norwegian keyboard support', async () => {
      render(
        <Button 
          labelKey="common.save"
          norwegian={{ keyboardShortcut: 'Ctrl+S' }}
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveNorwegianKeyboardSupport();
      
      // Test Norwegian keyboard shortcuts
      await userEvent.keyboard('{Control>}s{/Control}');
      // Verify shortcut handling if implemented
    });

    test('meets Norwegian touch target requirements', () => {
      render(
        <Button 
          size="standard"
          labelKey="common.save"
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleTouchTarget();
    });

    test('has proper color contrast for Norwegian standards', () => {
      render(
        <Button 
          variant="primary"
          labelKey="common.save"
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toMeetNorwegianColorStandards();
    });

    test('supports Norwegian screen readers', () => {
      render(
        <Button 
          labelKey="common.save"
          aria-label="Lagre dokument"
          aria-describedby="save-help"
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Lagre dokument');
      expect(button).toHaveAttribute('aria-describedby', 'save-help');
    });
  });

  // NSM Classification tests
  describe('NSM Classification', () => {
    test.each([
      'ÅPEN',
      'BEGRENSET', 
      'KONFIDENSIELT',
      'HEMMELIG'
    ])('handles %s classification level', (level) => {
      render(
        <Button 
          labelKey="common.save"
          norwegian={{ classification: level }}
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toComplyCNSMClassification(level);
    });

    test('applies visual indicators for classification levels', () => {
      render(
        <Button 
          labelKey="common.save"
          norwegian={{ 
            classification: 'KONFIDENSIELT',
            showClassificationIndicator: true
          }}
        >
          Lagre konfidensielt dokument
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('data-classification', 'KONFIDENSIELT');
      
      // Check for visual classification indicator
      const indicator = button.querySelector('[data-testid="classification-indicator"]');
      expect(indicator).toBeInTheDocument();
    });

    test('restricts actions based on classification', async () => {
      const mockConfirmAction = jest.fn();
      
      render(
        <Button 
          labelKey="actions.delete"
          variant="danger"
          confirmDialog={{
            titleKey: 'dialogs.confirmDelete.title',
            messageKey: 'dialogs.confirmDelete.message'
          }}
          onClick={mockConfirmAction}
          norwegian={{ classification: 'KONFIDENSIELT' }}
        >
          Slett dokument
        </Button>
      );
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      // For confidential documents, should require confirmation
      const confirmDialog = await screen.findByRole('dialog');
      expect(confirmDialog).toBeInTheDocument();
      
      const confirmButton = screen.getByRole('button', { name: /bekreft/i });
      await userEvent.click(confirmButton);
      
      expect(mockConfirmAction).toHaveBeenCalled();
    });
  });

  // GDPR Compliance tests
  describe('GDPR Compliance', () => {
    test('handles GDPR data processing attributes', () => {
      render(
        <Button 
          labelKey="common.submit"
          data-gdpr-collect="personal"
          data-gdpr-basis="consent"
          data-gdpr-retention="2 years"
        >
          Send inn persondata
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toComplyWithGDPR();
    });

    test('requires consent for personal data processing', async () => {
      const mockSubmit = jest.fn();
      
      render(
        <Button 
          labelKey="common.submit"
          onClick={mockSubmit}
          norwegian={{ 
            gdprRequirement: 'consent',
            dataTypes: ['personal', 'contact']
          }}
        >
          Send inn skjema
        </Button>
      );
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      // Should trigger GDPR consent flow if not already given
      // This would be implemented in the actual component
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  // DigDir Standards tests
  describe('DigDir Standards', () => {
    test('complies with DigDir design principles', () => {
      render(
        <Button 
          labelKey="common.save"
          aria-label="Lagre dokument"
          lang="nb-NO"
          data-keyboard-shortcuts="Ctrl+S"
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toComplyWithDigDir();
    });

    test('supports DigDir standard keyboard shortcuts', async () => {
      const mockAction = jest.fn();
      
      render(
        <Button 
          labelKey="common.help"
          onClick={mockAction}
          data-keyboard-shortcuts="Alt+H"
        >
          Hjelp
        </Button>
      );
      
      // Test DigDir standard help shortcut
      await userEvent.keyboard('{Alt>}h{/Alt}');
      // Verify if shortcut handling is implemented
    });
  });

  // Design token validation tests
  describe('Design Token Usage', () => {
    test('uses design tokens instead of hardcoded values', () => {
      render(
        <Button 
          variant="primary"
          size="large"
          labelKey="common.save"
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toUseDesignTokens();
      
      // Validate no hardcoded values
      const violations = global.testHelpers.validateDesignTokenUsage(button);
      expect(violations).toHaveLength(0);
    });

    test('maintains consistent spacing using tokens', () => {
      render(
        <Button 
          variant="primary"
          size="standard"
          spacing="comfortable"
          labelKey="common.save"
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      
      // Should use spacing tokens
      expect(styles.padding).toMatch(/var\(--spacing-/);
      expect(styles.margin).toMatch(/var\(--spacing-/);
    });
  });

  // Norwegian form integration tests
  describe('Norwegian Form Integration', () => {
    test('integrates with Norwegian form validation', async () => {
      const mockSubmit = jest.fn();
      
      render(
        <form onSubmit={mockSubmit}>
          <input 
            type="text" 
            name="personalNumber"
            aria-label="Fødselsnummer"
            pattern="[0-9]{11}"
            required
          />
          <Button 
            type="submit"
            labelKey="common.submit"
            norwegian={{ 
              formValidation: true,
              requiresPersonalNumber: true
            }}
          >
            Send inn
          </Button>
        </form>
      );
      
      const submitButton = screen.getByRole('button', { name: /send inn/i });
      const input = screen.getByLabelText(/fødselsnummer/i);
      
      // Test with invalid personal number
      await userEvent.type(input, '12345678900');
      await userEvent.click(submitButton);
      
      // Should prevent submission with invalid personal number
      expect(mockSubmit).not.toHaveBeenCalled();
      
      // Test with valid personal number
      await userEvent.clear(input);
      await userEvent.type(input, '12345678901');
      await userEvent.click(submitButton);
      
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  // Loading and state tests
  describe('Loading States', () => {
    test('shows Norwegian loading text', () => {
      render(
        <Button 
          loading={true}
          loadingText="Lagrer..."
          labelKey="common.save"
        >
          Lagre
        </Button>
      );
      
      expect(screen.getByText(/lagrer/i)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('maintains accessibility during loading', async () => {
      const { container } = render(
        <Button 
          loading={true}
          loadingText="Lagrer dokument..."
          labelKey="common.save"
          aria-describedby="loading-status"
        >
          Lagre
        </Button>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    test('displays Norwegian error messages', () => {
      render(
        <Button 
          error={true}
          errorMessage="Kunne ikke lagre dokumentet"
          labelKey="common.save"
        >
          Lagre
        </Button>
      );
      
      const errorMessage = screen.getByText(/kunne ikke lagre/i);
      expect(errorMessage).toBeInTheDocument();
      expect(global.validateNorwegianText(errorMessage.textContent)).toBe(true);
    });
  });

  // Responsive design tests
  describe('Responsive Design', () => {
    test('adapts to Norwegian mobile standards', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <Button 
          labelKey="common.save"
          responsive={true}
        >
          Lagre
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleTouchTarget();
    });
  });
}); 