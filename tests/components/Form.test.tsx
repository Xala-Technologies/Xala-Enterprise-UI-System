/**
 * Form Component Tests for @xala-technologies/ui-system
 * Norwegian compliance testing with Jest, React Testing Library, and axe-core
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Form } from '../../src/components/form/Form';
import { Input } from '../../src/components/form/Input';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('Form Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    test('renders form with Norwegian compliance attributes', () => {
      render(
        <Form 
          titleKey="forms.registration.title"
          norwegian={{ 
            classification: 'ÅPEN',
            municipality: '0301'
          }}
        >
          <Input labelKey="fields.name" name="name" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      expect(form).toComplyCNSMClassification('ÅPEN');
      expect(form.getAttribute('data-municipality')).toBe('0301');
    });

    test('renders with NSM classification header', () => {
      render(
        <Form 
          titleKey="forms.secure.title"
          norwegian={{ 
            classification: 'KONFIDENSIELT',
            showClassificationHeader: true
          }}
        >
          <Input labelKey="fields.personalNumber" name="personalNumber" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      const classificationHeader = form.querySelector('[data-testid="classification-header"]');
      
      expect(classificationHeader).toBeInTheDocument();
      expect(classificationHeader).toHaveTextContent('KONFIDENSIELT');
    });

    test('renders with GDPR notice for personal data', () => {
      render(
        <Form 
          titleKey="forms.personal.title"
          norwegian={{ 
            gdprNotice: true,
            dataTypes: ['personal', 'contact']
          }}
        >
          <Input labelKey="fields.email" name="email" />
        </Form>
      );
      
      const gdprNotice = screen.getByTestId('gdpr-notice');
      expect(gdprNotice).toBeInTheDocument();
      expect(gdprNotice).toComplyWithGDPR();
    });
  });

  // Norwegian accessibility tests
  describe('Norwegian Accessibility', () => {
    test('meets WCAG 2.2 AA standards for Norway', async () => {
      const { container } = render(
        <Form 
          titleKey="forms.application.title"
          norwegian={{ 
            accessibility: 'WCAG_2_2_AA',
            classification: 'ÅPEN'
          }}
        >
          <Input 
            labelKey="fields.name" 
            name="name" 
            required 
            aria-describedby="name-help"
          />
          <Input 
            labelKey="fields.email" 
            name="email" 
            type="email" 
            required
          />
        </Form>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toBeAccessibleForNorway();
    });

    test('provides proper Norwegian form labels and descriptions', () => {
      render(
        <Form 
          titleKey="forms.registration.title"
          descriptionKey="forms.registration.description"
          norwegian={{ 
            municipality: '0301'
          }}
        >
          <Input 
            labelKey="fields.personalNumber" 
            name="personalNumber"
            helpTextKey="help.personalNumber"
          />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-labelledby');
      expect(form).toHaveAttribute('aria-describedby');
      
      const input = screen.getByLabelText(/fødselsnummer|personal number/i);
      expect(input).toHaveAttribute('aria-describedby');
    });

    test('supports Norwegian keyboard navigation', async () => {
      render(
        <Form 
          titleKey="forms.application.title"
          norwegian={{ keyboardShortcuts: 'standard' }}
        >
          <Input labelKey="fields.name" name="name" />
          <Input labelKey="fields.email" name="email" />
        </Form>
      );
      
      const nameInput = screen.getByLabelText(/navn|name/i);
      const emailInput = screen.getByLabelText(/e-post|email/i);
      
      nameInput.focus();
      expect(nameInput).toHaveFocus();
      
      await userEvent.tab();
      expect(emailInput).toHaveFocus();
      
      await userEvent.tab({ shift: true });
      expect(nameInput).toHaveFocus();
    });
  });

  // NSM Classification tests
  describe('NSM Classification', () => {
    test.each([
      'ÅPEN',
      'BEGRENSET', 
      'KONFIDENSIELT',
      'HEMMELIG'
    ])('handles %s classification level with appropriate security measures', (level) => {
      render(
        <Form 
          titleKey="forms.classified.title"
          norwegian={{ 
            classification: level,
            auditLogging: level !== 'ÅPEN'
          }}
        >
          <Input labelKey="fields.data" name="data" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toComplyCNSMClassification(level);
      
      if (level !== 'ÅPEN') {
        expect(form).toHaveAttribute('data-audit-required', 'true');
      }
    });

    test('applies enhanced security for KONFIDENSIELT and HEMMELIG forms', () => {
      render(
        <Form 
          titleKey="forms.secret.title"
          norwegian={{ 
            classification: 'KONFIDENSIELT',
            requireSecureConnection: true,
            sessionTimeout: 300
          }}
        >
          <Input labelKey="fields.sensitiveData" name="sensitiveData" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('data-secure-connection-required', 'true');
      expect(form).toHaveAttribute('data-session-timeout', '300');
    });

    test('shows classification warning for sensitive forms', () => {
      render(
        <Form 
          titleKey="forms.confidential.title"
          norwegian={{ 
            classification: 'HEMMELIG',
            showSecurityWarning: true
          }}
        >
          <Input labelKey="fields.classifiedInfo" name="classifiedInfo" />
        </Form>
      );
      
      const securityWarning = screen.getByTestId('security-warning');
      expect(securityWarning).toBeInTheDocument();
      expect(securityWarning).toHaveTextContent(/hemmelig|classified|sikkerhet/i);
    });
  });

  // GDPR Compliance tests
  describe('GDPR Compliance', () => {
    test('handles personal data processing with proper consent', () => {
      render(
        <Form 
          titleKey="forms.personal.title"
          norwegian={{ 
            gdprProcessing: {
              dataTypes: ['personal', 'contact'],
              processingBasis: 'consent',
              retentionPeriod: '2 years'
            }
          }}
        >
          <Input labelKey="fields.name" name="name" />
          <Input labelKey="fields.email" name="email" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toComplyWithGDPR();
      expect(form).toHaveAttribute('data-gdpr-basis', 'consent');
      expect(form).toHaveAttribute('data-gdpr-retention', '2 years');
    });

    test('requires explicit consent for sensitive data', async () => {
      const mockSubmit = jest.fn();
      
      render(
        <Form 
          titleKey="forms.health.title"
          onSubmit={mockSubmit}
          norwegian={{ 
            gdprProcessing: {
              dataTypes: ['health', 'personal'],
              processingBasis: 'consent',
              explicitConsent: true
            }
          }}
        >
          <Input labelKey="fields.healthInfo" name="healthInfo" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      const consentCheckbox = screen.getByRole('checkbox', { name: /samtykke|consent/i });
      
      expect(consentCheckbox).toBeInTheDocument();
      expect(consentCheckbox).toBeRequired();
      
      fireEvent.submit(form);
      expect(mockSubmit).not.toHaveBeenCalled();
      
      await userEvent.click(consentCheckbox);
      fireEvent.submit(form);
      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  // Form validation tests
  describe('Norwegian Form Validation', () => {
    test('validates personal numbers using MOD11 algorithm', async () => {
      const mockSubmit = jest.fn();
      
      render(
        <Form 
          titleKey="forms.citizen.title"
          onSubmit={mockSubmit}
          norwegian={{ 
            validation: {
              personalNumber: true,
              strictValidation: true
            }
          }}
        >
          <Input 
            labelKey="fields.personalNumber" 
            name="personalNumber"
            type="personalNumber"
            required
          />
        </Form>
      );
      
      const input = screen.getByLabelText(/fødselsnummer|personal number/i);
      const form = screen.getByRole('form');
      
      // Test invalid personal number
      await userEvent.type(input, '12345678900');
      fireEvent.submit(form);
      
      expect(screen.getByText(/ugyldig fødselsnummer|invalid personal number/i)).toBeInTheDocument();
      expect(mockSubmit).not.toHaveBeenCalled();
      
      // Test valid personal number
      await userEvent.clear(input);
      await userEvent.type(input, '12345678901');
      fireEvent.submit(form);
      
      expect(mockSubmit).toHaveBeenCalled();
    });

    test('integrates with Norwegian municipality services', async () => {
      global.mockNorwegianAPIs.setupAltinnMock();
      
      render(
        <Form 
          titleKey="forms.municipal.title"
          norwegian={{ 
            municipality: '0301',
            integrateWithAltinn: true
          }}
        >
          <Input labelKey="fields.citizenData" name="citizenData" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('data-municipality', '0301');
      expect(form).toHaveAttribute('data-altinn-integration', 'true');
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    test('displays Norwegian error messages', async () => {
      const mockSubmit = jest.fn().mockRejectedValue(new Error('Validation failed'));
      
      render(
        <Form 
          titleKey="forms.application.title"
          onSubmit={mockSubmit}
          norwegian={{ 
            errorMessages: 'norwegian'
          }}
        >
          <Input labelKey="fields.name" name="name" required />
        </Form>
      );
      
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toBeInTheDocument();
        expect(global.validateNorwegianText(errorMessage.textContent)).toBe(true);
      });
    });

    test('handles network errors gracefully', async () => {
      const mockSubmit = jest.fn().mockRejectedValue(new Error('Network error'));
      
      render(
        <Form 
          titleKey="forms.application.title"
          onSubmit={mockSubmit}
          norwegian={{ 
            retryOnNetworkError: true,
            maxRetries: 3
          }}
        >
          <Input labelKey="fields.data" name="data" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        const retryButton = screen.getByRole('button', { name: /prøv igjen|retry/i });
        expect(retryButton).toBeInTheDocument();
      });
    });
  });

  // Loading states
  describe('Loading States', () => {
    test('shows Norwegian loading indicators', () => {
      render(
        <Form 
          titleKey="forms.application.title"
          loading={true}
          loadingTextKey="states.submitting"
          norwegian={{ 
            classification: 'ÅPEN'
          }}
        >
          <Input labelKey="fields.data" name="data" />
        </Form>
      );
      
      const loadingIndicator = screen.getByText(/sender|submitting|behandler/i);
      expect(loadingIndicator).toBeInTheDocument();
      
      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-busy', 'true');
    });

    test('maintains accessibility during loading', async () => {
      const { container } = render(
        <Form 
          titleKey="forms.application.title"
          loading={true}
          loadingTextKey="states.submitting"
        >
          <Input labelKey="fields.data" name="data" />
        </Form>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // Design token validation
  describe('Design Token Usage', () => {
    test('uses design tokens for styling', () => {
      render(
        <Form 
          titleKey="forms.application.title"
          variant="standard"
          spacing="comfortable"
        >
          <Input labelKey="fields.data" name="data" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      expect(form).toUseDesignTokens();
      
      const violations = global.testHelpers.validateDesignTokenUsage(form);
      expect(violations).toHaveLength(0);
    });

    test('maintains consistent Norwegian form styling', () => {
      render(
        <Form 
          titleKey="forms.application.title"
          norwegian={{ 
            styling: 'government',
            municipality: '0301'
          }}
        >
          <Input labelKey="fields.data" name="data" />
        </Form>
      );
      
      const form = screen.getByRole('form');
      const styles = window.getComputedStyle(form);
      
      expect(styles.fontFamily).toMatch(/var\(--font-/);
      expect(styles.padding).toMatch(/var\(--spacing-/);
      expect(styles.borderRadius).toMatch(/var\(--border-radius-/);
    });
  });
}); 