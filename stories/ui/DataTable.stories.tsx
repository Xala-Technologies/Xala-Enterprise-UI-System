/**
 * @fileoverview DataTable Component Stories v6.3.0
 * @description Comprehensive data grid stories with Norwegian compliance examples
 * @version 6.3.0
 */

import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type DataTableColumn } from '../../src/components/ui/data-table';

// Sample data for Norwegian compliance
const norwegianEmployees = [
  {
    id: 1,
    fødselsnummer: '12345678901',
    navn: 'Kari Nordmann',
    stilling: 'Utvikler',
    avdeling: 'IT',
    lønn: 650000,
    startdato: '2023-01-15',
    status: 'Aktiv',
    nsmLevel: 'BEGRENSET'
  },
  {
    id: 2,
    fødselsnummer: '23456789012',
    navn: 'Ola Hansen',
    stilling: 'Designer',
    avdeling: 'UX',
    lønn: 580000,
    startdato: '2022-08-22',
    status: 'Aktiv',
    nsmLevel: 'ÅPEN'
  },
  {
    id: 3,
    fødselsnummer: '34567890123',
    navn: 'Lise Olsen',
    stilling: 'Prosjektleder',
    avdeling: 'Ledelse',
    lønn: 720000,
    startdato: '2021-03-10',
    status: 'Permisjon',
    nsmLevel: 'KONFIDENSIELT'
  },
  {
    id: 4,
    fødselsnummer: '45678901234',
    navn: 'Erik Svendsen',
    stilling: 'Arkitekt',
    avdeling: 'IT',
    lønn: 750000,
    startdato: '2020-11-05',
    status: 'Aktiv',
    nsmLevel: 'BEGRENSET'
  }
];

const employeeColumns: DataTableColumn[] = [
  {
    key: 'navn',
    title: 'Navn',
    sortable: true,
    width: '200px'
  },
  {
    key: 'stilling',
    title: 'Stilling',
    sortable: true,
    width: '150px'
  },
  {
    key: 'avdeling',
    title: 'Avdeling',
    sortable: true,
    width: '120px'
  },
  {
    key: 'lønn',
    title: 'Lønn',
    sortable: true,
    align: 'right',
    render: (item) => `${item.lønn.toLocaleString('nb-NO')} NOK`
  },
  {
    key: 'status',
    title: 'Status',
    render: (item) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        item.status === 'Aktiv' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {item.status}
      </span>
    )
  }
];

const meta: Meta<typeof DataTable> = {
  title: 'UI Components/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: 'Advanced data grid component with sorting, filtering, pagination, and Norwegian compliance features. Supports NSM classification levels and GDPR-compliant data handling.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true, options: { normal: 7, large: 4.5 } },
          { id: 'keyboard-navigation', enabled: true },
          { id: 'focus-management', enabled: true }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'striped', 'compact'],
      description: 'Visual variant of the table',
      table: {
        category: 'Design',
        defaultValue: { summary: 'default' }
      }
    },
    sortable: {
      control: { type: 'boolean' },
      description: 'Enable column sorting',
      table: {
        category: 'Functionality',
        defaultValue: { summary: 'false' }
      }
    },
    filterable: {
      control: { type: 'boolean' },
      description: 'Enable global search filter',
      table: {
        category: 'Functionality',
        defaultValue: { summary: 'false' }
      }
    },
    selectable: {
      control: { type: 'boolean' },
      description: 'Enable row selection',
      table: {
        category: 'Functionality',
        defaultValue: { summary: 'false' }
      }
    },
    pagination: {
      control: { type: 'boolean' },
      description: 'Enable pagination',
      table: {
        category: 'Functionality',
        defaultValue: { summary: 'false' }
      }
    },
    nsmClassification: {
      control: { type: 'select' },
      options: ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'],
      description: 'NSM security classification level',
      table: {
        category: 'Norwegian Compliance'
      }
    },
    locale: {
      control: { type: 'select' },
      options: ['nb-NO', 'en-US', 'fr-FR', 'ar-SA'],
      description: 'Language and region setting',
      table: {
        category: 'Localization',
        defaultValue: { summary: 'en-US' }
      }
    }
  },
  args: {
    data: norwegianEmployees,
    columns: employeeColumns,
    variant: 'default',
    sortable: false,
    filterable: false,
    selectable: false,
    pagination: false,
    locale: 'nb-NO'
  },
  tags: ['autodocs']
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic table
export const Default: Story = {
  name: 'Basic Table',
  args: {
    data: norwegianEmployees.slice(0, 3),
    columns: employeeColumns.slice(0, 3)
  }
};

// With sorting
export const Sortable: Story = {
  name: 'Sortable Columns',
  args: {
    sortable: true
  }
};

// With filtering
export const Filterable: Story = {
  name: 'Global Search Filter',
  args: {
    filterable: true,
    sortable: true
  }
};

// With row selection
export const Selectable: Story = {
  name: 'Row Selection',
  args: {
    selectable: true,
    sortable: true,
    filterable: true
  }
};

// With pagination
export const Paginated: Story = {
  name: 'Pagination',
  args: {
    pagination: {
      pageSize: 2,
      showSizeSelector: true,
      pageSizes: [2, 5, 10, 20]
    },
    sortable: true,
    filterable: true
  }
};

// Striped variant
export const Striped: Story = {
  name: 'Striped Rows',
  args: {
    variant: 'striped',
    sortable: true
  }
};

// Compact variant
export const Compact: Story = {
  name: 'Compact Layout',
  args: {
    variant: 'compact',
    sortable: true,
    pagination: true
  }
};

// Norwegian compliance with NSM classification
export const NorwegianCompliance: Story = {
  name: 'Norwegian NSM Compliance',
  args: {
    nsmClassification: 'BEGRENSET',
    gdprCompliant: true,
    auditTrail: true,
    sortable: true,
    filterable: true,
    selectable: true,
    locale: 'nb-NO'
  },
  parameters: {
    docs: {
      description: {
        story: 'DataTable with Norwegian NSM security classification, GDPR compliance, and audit trail capabilities.'
      }
    }
  }
};

// Loading state
export const Loading: Story = {
  name: 'Loading State',
  args: {
    loading: true,
    sortable: true,
    filterable: true
  }
};

// Empty state
export const Empty: Story = {
  name: 'Empty Data',
  args: {
    data: [],
    emptyMessage: 'Ingen data tilgjengelig',
    filterable: true,
    locale: 'nb-NO'
  }
};

// Full featured Norwegian employee management
export const EmployeeManagement: Story = {
  name: 'Employee Management System',
  args: {
    variant: 'default',
    sortable: true,
    filterable: true,
    selectable: true,
    pagination: {
      pageSize: 3,
      showSizeSelector: true,
      pageSizes: [3, 5, 10, 25]
    },
    nsmClassification: 'KONFIDENSIELT',
    gdprCompliant: true,
    auditTrail: true,
    locale: 'nb-NO',
    onRowClick: (employee, index) => {
      console.log(`Selected employee: ${employee.navn}`, employee);
    },
    onSelectionChange: (selectedEmployees) => {
      console.log('Selection changed:', selectedEmployees);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete Norwegian employee management system with all DataTable features enabled, NSM classification, and GDPR compliance.'
      }
    }
  }
};