/**
 * @fileoverview Badge Component Stories v6.3.0
 * @description Status and label indicators with Norwegian compliance
 * @version 6.3.0
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../src/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: 'Small status indicators and labels used to highlight information, show status, or categorize content. Includes Norwegian compliance variations and accessibility features.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true, options: { normal: 7, large: 4.5 } }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'success', 'warning', 'info', 'outline'],
      description: 'Visual variant of the badge',
      table: {
        category: 'Design',
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
      table: {
        category: 'Design',
        defaultValue: { summary: 'md' }
      }
    },
    children: {
      control: { type: 'text' },
      description: 'Badge content',
      table: {
        category: 'Content'
      }
    }
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  name: 'Default',
  args: {
    children: 'Default'
  }
};

export const Secondary: Story = {
  name: 'Secondary',
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
};

export const Destructive: Story = {
  name: 'Destructive',
  args: {
    children: 'Error',
    variant: 'destructive'
  }
};

export const Success: Story = {
  name: 'Success',
  args: {
    children: 'Success',
    variant: 'success'
  }
};

export const Warning: Story = {
  name: 'Warning',
  args: {
    children: 'Warning',
    variant: 'warning'
  }
};

export const Info: Story = {
  name: 'Info',
  args: {
    children: 'Info',
    variant: 'info'
  }
};

export const Outline: Story = {
  name: 'Outline',
  args: {
    children: 'Outline',
    variant: 'outline'
  }
};

// Sizes
export const Sizes: Story = {
  name: 'Badge Sizes',
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available badge sizes: small (sm), medium (md), and large (lg).'
      }
    }
  }
};

// Norwegian status examples
export const NorwegianStatuses: Story = {
  name: 'Norwegian Status Labels',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success">Aktiv</Badge>
      <Badge variant="warning">Venter</Badge>
      <Badge variant="destructive">Avslått</Badge>
      <Badge variant="info">Under behandling</Badge>
      <Badge variant="secondary">Arkivert</Badge>
      <Badge variant="outline">Utkast</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common Norwegian status labels for government and municipal applications.'
      }
    }
  }
};

// NSM Classification badges
export const NSMClassification: Story = {
  name: 'NSM Security Classification',
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="success" className="bg-green-500 text-white">
        ÅPEN
      </Badge>
      <Badge variant="warning" className="bg-yellow-500 text-white">
        BEGRENSET
      </Badge>
      <Badge variant="info" className="bg-orange-500 text-white">
        KONFIDENSIELT
      </Badge>
      <Badge variant="destructive" className="bg-red-600 text-white">
        HEMMELIG
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'NSM (Norwegian National Security Authority) classification levels for sensitive information.'
      }
    }
  }
};

// Municipal services
export const MunicipalServices: Story = {
  name: 'Municipal Service Categories',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="info">Byggesak</Badge>
      <Badge variant="success">Skole & Barnehage</Badge>
      <Badge variant="warning">Helse & Omsorg</Badge>
      <Badge variant="secondary">Tekniske tjenester</Badge>
      <Badge variant="outline">Kultur & Fritid</Badge>
      <Badge variant="default">Plan & Bygg</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common Norwegian municipal service categories for citizen portals.'
      }
    }
  }
};

// Application statuses
export const ApplicationStatuses: Story = {
  name: 'Application Status Workflow',
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Søknadsstatus:</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Påbegynt</Badge>
          <Badge variant="info">Innsendt</Badge>
          <Badge variant="warning">Under behandling</Badge>
          <Badge variant="success">Godkjent</Badge>
          <Badge variant="destructive">Avslått</Badge>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Betalingsstatus:</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="warning">Venter betaling</Badge>
          <Badge variant="success">Betalt</Badge>
          <Badge variant="destructive">Forfalt</Badge>
          <Badge variant="secondary">Refundert</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Application and payment status workflow for Norwegian government services.'
      }
    }
  }
};

// Notification counts
export const NotificationCounts: Story = {
  name: 'Notification Badges',
  render: () => (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button className="p-2 bg-gray-100 rounded-lg">
          📧 Meldinger
        </button>
        <Badge variant="destructive" size="sm" className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full text-xs">
          3
        </Badge>
      </div>
      <div className="relative">
        <button className="p-2 bg-gray-100 rounded-lg">
          🔔 Varsler
        </button>
        <Badge variant="warning" size="sm" className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full text-xs">
          12
        </Badge>
      </div>
      <div className="relative">
        <button className="p-2 bg-gray-100 rounded-lg">
          📋 Oppgaver
        </button>
        <Badge variant="success" size="sm" className="absolute -top-1 -right-1 min-w-[20px] h-5 rounded-full text-xs">
          99+
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Notification badges for showing counts and alerts on navigation items.'
      }
    }
  }
};

// GDPR compliance indicators
export const GDPRCompliance: Story = {
  name: 'GDPR Data Categories',
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">Personopplysninger:</span>
        <Badge variant="warning" size="sm">Sensitive</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Kontaktinformasjon:</span>
        <Badge variant="info" size="sm">Standard</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Anonymiserte data:</span>
        <Badge variant="success" size="sm">Trygg</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Biometriske data:</span>
        <Badge variant="destructive" size="sm">Høy risiko</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'GDPR data category indicators for privacy compliance in Norwegian applications.'
      }
    }
  }
};