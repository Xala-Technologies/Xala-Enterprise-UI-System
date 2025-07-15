/**
 * DataTable Component Tests for @xala-technologies/ui-system
 * Norwegian compliance testing with Jest, React Testing Library, and axe-core
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';
import { DataTable } from '../../src/components/data-display/DataTable';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

// Mock Norwegian test data
const mockNorwegianData = [
  {
    id: '1',
    navn: 'Ola Nordmann',
    fødselsnummer: '12345678901',
    kommune: 'Oslo',
    klassifisering: 'ÅPEN',
  },
  {
    id: '2',
    navn: 'Kari Nordmann',
    fødselsnummer: '98765432109',
    kommune: 'Bergen',
    klassifisering: 'BEGRENSET',
  },
  {
    id: '3',
    navn: 'Per Hansen',
    fødselsnummer: '11223344556',
    kommune: 'Trondheim',
    klassifisering: 'KONFIDENSIELT',
  },
];

const mockColumns = [
  {
    key: 'navn',
    titleKey: 'table.columns.name',
    sortable: true,
    norwegian: { personalData: true },
  },
  {
    key: 'fødselsnummer',
    titleKey: 'table.columns.personalNumber',
    sortable: false,
    norwegian: {
      personalData: true,
      classification: 'KONFIDENSIELT',
      masking: true,
    },
  },
  {
    key: 'kommune',
    titleKey: 'table.columns.municipality',
    sortable: true,
    norwegian: { publicData: true },
  },
  {
    key: 'klassifisering',
    titleKey: 'table.columns.classification',
    sortable: true,
    norwegian: { nsmLevel: true },
  },
];

describe('DataTable Component', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    test('renders table with Norwegian data and compliance attributes', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          norwegian={{
            classification: 'BEGRENSET',
            municipality: '0301',
            auditLogging: true,
          }}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toComplyCNSMClassification('BEGRENSET');
      expect(table).toHaveAttribute('data-municipality', '0301');
      expect(table).toHaveAttribute('data-audit-logging', 'true');
    });

    test('renders with proper table headers and Norwegian labels', () => {
      render(
        <DataTable data={mockNorwegianData} columns={mockColumns} titleKey="table.citizens.title" />
      );

      // Check for semantic table structure
      expect(screen.getByRole('table')).toBeInTheDocument();

      // Check for Norwegian column headers
      expect(screen.getByRole('columnheader', { name: /navn|name/i })).toBeInTheDocument();
      expect(
        screen.getByRole('columnheader', { name: /fødselsnummer|personal number/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('columnheader', { name: /kommune|municipality/i })
      ).toBeInTheDocument();
    });

    test('displays NSM classification indicators for sensitive data', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.classified.title"
          norwegian={{
            classification: 'KONFIDENSIELT',
            showClassificationIndicators: true,
          }}
        />
      );

      const classificationCells = screen.getAllByTestId('classification-indicator');
      expect(classificationCells.length).toBeGreaterThan(0);

      classificationCells.forEach(cell => {
        expect(cell).toHaveAttribute('data-classification');
      });
    });
  });

  // Norwegian accessibility tests
  describe('Norwegian Accessibility', () => {
    test('meets WCAG 2.2 AA standards for Norway', async () => {
      const { container } = render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          norwegian={{
            accessibility: 'WCAG_2_2_AA',
            classification: 'ÅPEN',
          }}
        />
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
      expect(container).toBeAccessibleForNorway();
    });

    test('provides proper Norwegian screen reader support', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          captionKey="table.citizens.caption"
          norwegian={{
            screenReaderOptimized: true,
          }}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-labelledby');

      const caption = screen.getByRole('caption');
      expect(caption).toBeInTheDocument();
      expect(global.validateNorwegianText(caption.textContent)).toBe(true);
    });

    test('supports Norwegian keyboard navigation', async () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          sortable={true}
          norwegian={{
            keyboardShortcuts: 'standard',
          }}
        />
      );

      const sortableHeaders = screen.getAllByRole('columnheader', { name: /sortér|sort/i });
      const firstHeader = sortableHeaders[0];

      firstHeader.focus();
      expect(firstHeader).toHaveFocus();

      // Test Norwegian keyboard shortcuts for sorting
      await userEvent.keyboard('{Enter}');
      // Verify sort functionality if implemented
    });

    test('handles focus management for Norwegian accessibility', async () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          selectable={true}
          norwegian={{
            focusManagement: 'strict',
          }}
        />
      );

      const checkboxes = screen.getAllByRole('checkbox');
      const firstCheckbox = checkboxes[0];

      await userEvent.click(firstCheckbox);
      expect(firstCheckbox).toHaveFocus();

      await userEvent.tab();
      // Next focusable element should receive focus
    });
  });

  // NSM Classification and data security tests
  describe('NSM Classification and Data Security', () => {
    test.each(['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'])(
      'handles %s classification level with appropriate data protection',
      level => {
        render(
          <DataTable
            data={mockNorwegianData}
            columns={mockColumns}
            titleKey="table.classified.title"
            norwegian={{
              classification: level,
              dataMasking: level !== 'ÅPEN',
              auditLogging: level !== 'ÅPEN',
            }}
          />
        );

        const table = screen.getByRole('table');
        expect(table).toComplyCNSMClassification(level);

        if (level !== 'ÅPEN') {
          expect(table).toHaveAttribute('data-masking-enabled', 'true');
          expect(table).toHaveAttribute('data-audit-logging', 'true');
        }
      }
    );

    test('masks sensitive personal data in KONFIDENSIELT tables', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.confidential.title"
          norwegian={{
            classification: 'KONFIDENSIELT',
            maskPersonalNumbers: true,
          }}
        />
      );

      // Personal numbers should be masked
      const personalNumberCells = screen.getAllByText(/\*{6}\d{5}/);
      expect(personalNumberCells.length).toBeGreaterThan(0);

      // Full personal numbers should not be visible
      expect(screen.queryByText('12345678901')).not.toBeInTheDocument();
    });

    test('provides classification level indicators for each row', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.mixed.title"
          norwegian={{
            showRowClassification: true,
            inheritMaxClassification: 'KONFIDENSIELT',
          }}
        />
      );

      const rows = screen.getAllByRole('row').slice(1); // Skip header row

      rows.forEach((row, index) => {
        const data = mockNorwegianData[index];
        expect(row).toHaveAttribute('data-classification', data.klassifisering);
      });
    });
  });

  // GDPR Compliance tests
  describe('GDPR Compliance', () => {
    test('handles personal data with proper GDPR attributes', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.personal.title"
          norwegian={{
            gdprCompliance: {
              personalDataColumns: ['navn', 'fødselsnummer'],
              processingBasis: 'legitimate_interests',
              retentionPeriod: '5 years',
            },
          }}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toComplyWithGDPR();
      expect(table).toHaveAttribute('data-gdpr-basis', 'legitimate_interests');
      expect(table).toHaveAttribute('data-gdpr-retention', '5 years');
    });

    test('provides data subject rights information', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          norwegian={{
            gdprCompliance: {
              showDataSubjectRights: true,
              contactDPO: 'dpo@kommune.no',
            },
          }}
        />
      );

      const rightsInfo = screen.getByTestId('gdpr-rights-info');
      expect(rightsInfo).toBeInTheDocument();
      expect(rightsInfo).toHaveTextContent(/dpo@kommune\.no/);
    });
  });

  // Norwegian data integration tests
  describe('Norwegian Data Integration', () => {
    test('integrates with BRREG for organization data', async () => {
      global.mockNorwegianAPIs.setupBRREGMock();

      const orgData = [
        { id: '1', organisasjonsnummer: '123456789', navn: 'Test AS' },
        { id: '2', organisasjonsnummer: '987654321', navn: 'Demo AS' },
      ];

      const orgColumns = [
        {
          key: 'organisasjonsnummer',
          titleKey: 'table.columns.orgNumber',
          norwegian: { brregIntegration: true },
        },
        { key: 'navn', titleKey: 'table.columns.orgName' },
      ];

      render(
        <DataTable
          data={orgData}
          columns={orgColumns}
          titleKey="table.organizations.title"
          norwegian={{
            brregIntegration: true,
            municipality: '0301',
          }}
        />
      );

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('data-brreg-integration', 'true');
    });

    test('validates Norwegian personal numbers in real-time', async () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.citizens.title"
          editable={true}
          norwegian={{
            personalNumberValidation: true,
            realTimeValidation: true,
          }}
        />
      );

      const editButtons = screen.getAllByRole('button', { name: /rediger|edit/i });
      await userEvent.click(editButtons[0]);

      const personalNumberInput = screen.getByDisplayValue(/\d{11}/);
      expect(personalNumberInput).toHaveValidNorwegianPersonalNumber();
    });
  });

  // Sorting and pagination tests
  describe('Sorting and Pagination', () => {
    test('provides Norwegian sorting with proper collation', async () => {
      const norwegianNames = [
        { id: '1', navn: 'Åse Andersen' },
        { id: '2', navn: 'Øystein Berg' },
        { id: '3', navn: 'Anders Carlsen' },
        { id: '4', navn: 'Ærlend Dale' },
      ];

      render(
        <DataTable
          data={norwegianNames}
          columns={[{ key: 'navn', titleKey: 'table.columns.name', sortable: true }]}
          titleKey="table.names.title"
          norwegian={{
            sortingLocale: 'nb-NO',
            norwegianCollation: true,
          }}
        />
      );

      const sortButton = screen.getByRole('button', { name: /sortér etter navn|sort by name/i });
      await userEvent.click(sortButton);

      // Norwegian alphabetical order: A-Z, Æ, Ø, Å
      const cells = screen.getAllByRole('cell');
      const sortedNames = cells.map(cell => cell.textContent).filter(Boolean);

      expect(sortedNames[0]).toBe('Anders Carlsen');
      expect(sortedNames[3]).toBe('Åse Andersen'); // Å comes last in Norwegian alphabet
    });

    test('provides Norwegian pagination with proper language', () => {
      const largeDataSet = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        navn: `Person ${i + 1}`,
        kommune: 'Oslo',
      }));

      render(
        <DataTable
          data={largeDataSet}
          columns={[{ key: 'navn', titleKey: 'table.columns.name' }]}
          titleKey="table.large.title"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          norwegian={{
            paginationLanguage: 'norwegian',
          }}
        />
      );

      const pagination = screen.getByTestId('table-pagination');
      expect(pagination).toBeInTheDocument();

      // Check for Norwegian pagination text
      expect(screen.getByText(/av|of/i)).toBeInTheDocument();
      expect(screen.getByText(/rader|rows/i)).toBeInTheDocument();
    });
  });

  // Loading and error states
  describe('Loading and Error States', () => {
    test('shows Norwegian loading indicators', () => {
      render(
        <DataTable
          data={[]}
          columns={mockColumns}
          titleKey="table.loading.title"
          loading={true}
          loadingTextKey="states.loading.table"
          norwegian={{
            classification: 'ÅPEN',
          }}
        />
      );

      const loadingIndicator = screen.getByText(/laster|loading|henter data/i);
      expect(loadingIndicator).toBeInTheDocument();
      expect(global.validateNorwegianText(loadingIndicator.textContent)).toBe(true);
    });

    test('handles Norwegian empty state messages', () => {
      render(
        <DataTable
          data={[]}
          columns={mockColumns}
          titleKey="table.empty.title"
          emptyStateKey="states.empty.noData"
          norwegian={{
            municipality: '0301',
          }}
        />
      );

      const emptyMessage = screen.getByText(/ingen data|no data|tom tabell/i);
      expect(emptyMessage).toBeInTheDocument();
      expect(global.validateNorwegianText(emptyMessage.textContent)).toBe(true);
    });

    test('displays Norwegian error messages', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.error.title"
          error={{
            hasError: true,
            messageKey: 'errors.dataLoad.failed',
          }}
          norwegian={{
            errorHandling: 'norwegian',
          }}
        />
      );

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
      expect(global.validateNorwegianText(errorMessage.textContent)).toBe(true);
    });
  });

  // Design token validation
  describe('Design Token Usage', () => {
    test('uses design tokens for table styling', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.styled.title"
          variant="government"
          density="comfortable"
        />
      );

      const table = screen.getByRole('table');
      expect(table).toUseDesignTokens();

      const violations = global.testHelpers.validateDesignTokenUsage(table);
      expect(violations).toHaveLength(0);
    });

    test('maintains consistent Norwegian table styling', () => {
      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.government.title"
          norwegian={{
            styling: 'government',
            municipality: '0301',
          }}
        />
      );

      const table = screen.getByRole('table');
      const styles = window.getComputedStyle(table);

      expect(styles.borderColor).toMatch(/var\(--color-/);
      expect(styles.padding).toMatch(/var\(--spacing-/);
      expect(styles.fontSize).toMatch(/var\(--font-size-/);
    });
  });

  // Export functionality tests
  describe('Export Functionality', () => {
    test('exports data with Norwegian formatting', async () => {
      const mockExport = jest.fn();

      render(
        <DataTable
          data={mockNorwegianData}
          columns={mockColumns}
          titleKey="table.export.title"
          exportable={true}
          onExport={mockExport}
          norwegian={{
            exportFormat: 'norwegian',
            includeClassificationHeader: true,
          }}
        />
      );

      const exportButton = screen.getByRole('button', { name: /eksporter|export/i });
      await userEvent.click(exportButton);

      expect(mockExport).toHaveBeenCalledWith(
        expect.objectContaining({
          data: mockNorwegianData,
          format: 'norwegian',
          includeHeaders: true,
        })
      );
    });
  });
});
