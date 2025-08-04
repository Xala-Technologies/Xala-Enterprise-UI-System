/**
 * @fileoverview Checkbox Component Stories v6.3.0
 * @description Form control for multiple selections with Norwegian compliance
 * @version 6.3.0
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../src/components/ui/checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'UI Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: 'Checkbox component for form controls, allowing users to select multiple options from a set. Includes proper accessibility features and Norwegian compliance patterns.'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true, options: { normal: 7, large: 4.5 } },
          { id: 'touch-target-size', enabled: true },
          { id: 'focus-visible', enabled: true }
        ]
      }
    }
  },
  argTypes: {
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in indeterminate state',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
      table: {
        category: 'Design',
        defaultValue: { summary: 'md' }
      }
    }
  },
  args: {
    checked: false,
    disabled: false,
    indeterminate: false,
    size: 'md'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic states
export const Default: Story = {
  name: 'Default Unchecked',
  args: {}
};

export const Checked: Story = {
  name: 'Checked',
  args: {
    checked: true
  }
};

export const Indeterminate: Story = {
  name: 'Indeterminate',
  args: {
    indeterminate: true
  }
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    disabled: true
  }
};

export const DisabledChecked: Story = {
  name: 'Disabled Checked',
  args: {
    checked: true,
    disabled: true
  }
};

// Sizes
export const Sizes: Story = {
  name: 'Checkbox Sizes',
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Checkbox size="sm" id="small" />
        <label htmlFor="small" className="text-sm">Small</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox size="md" id="medium" />
        <label htmlFor="medium" className="text-base">Medium</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox size="lg" id="large" />
        <label htmlFor="large" className="text-lg">Large</label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available checkbox sizes with properly associated labels.'
      }
    }
  }
};

// Interactive example
export const Interactive: Story = {
  name: 'Interactive Example',
  render: () => {
    const [checked, setChecked] = useState(false);
    
    return (
      <div className="flex items-center gap-2">
        <Checkbox 
          checked={checked} 
          onCheckedChange={setChecked}
          id="interactive"
        />
        <label htmlFor="interactive" className="text-sm font-medium">
          {checked ? 'Checked' : 'Unchecked'} - Click to toggle
        </label>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive checkbox that shows state changes when clicked.'
      }
    }
  }
};

// Norwegian compliance form
export const NorwegianConsentForm: Story = {
  name: 'Norwegian Consent Form',
  render: () => {
    const [consents, setConsents] = useState({
      personalData: false,
      marketing: false,
      analytics: false,
      required: false
    });

    const updateConsent = (key: keyof typeof consents) => (checked: boolean) => {
      setConsents(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="max-w-md space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Samtykke til behandling av personopplysninger</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Checkbox 
              id="required" 
              checked={consents.required}
              onCheckedChange={updateConsent('required')}
            />
            <div>
              <label htmlFor="required" className="text-sm font-medium text-red-600">
                Nødvendig behandling *
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Behandling av personopplysninger for å levere tjenesten
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox 
              id="personalData" 
              checked={consents.personalData}
              onCheckedChange={updateConsent('personalData')}
            />
            <div>
              <label htmlFor="personalData" className="text-sm font-medium">
                Utvidet persondata
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Lagring av fødselsnummer og kontaktinformasjon
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox 
              id="marketing" 
              checked={consents.marketing}
              onCheckedChange={updateConsent('marketing')}
            />
            <div>
              <label htmlFor="marketing" className="text-sm font-medium">
                Markedsføring
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Mottak av nyhetsbrev og markedsføringsmateriale
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox 
              id="analytics" 
              checked={consents.analytics}
              onCheckedChange={updateConsent('analytics')}
            />
            <div>
              <label htmlFor="analytics" className="text-sm font-medium">
                Analyse og statistikk
              </label>
              <p className="text-xs text-muted-foreground mt-1">
                Bruk av cookies for å forbedre tjenesten
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Du kan når som helst trekke tilbake samtykket ditt. 
            Les mer i vår <a href="#" className="text-primary underline">personvernerklæring</a>.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Norwegian GDPR consent form with various consent categories and proper accessibility.'
      }
    }
  }
};

// Municipal services selection
export const MunicipalServices: Story = {
  name: 'Municipal Services Selection',
  render: () => {
    const [services, setServices] = useState({
      building: false,
      school: false,
      health: false,
      technical: false,
      culture: false
    });

    const updateService = (key: keyof typeof services) => (checked: boolean) => {
      setServices(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="max-w-md space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Velg tjenester du ønsker varsler om</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox 
              id="building" 
              checked={services.building}
              onCheckedChange={updateService('building')}
            />
            <label htmlFor="building" className="text-sm font-medium">
              🏗️ Byggesak og plan
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox 
              id="school" 
              checked={services.school}
              onCheckedChange={updateService('school')}
            />
            <label htmlFor="school" className="text-sm font-medium">
              🎓 Skole og barnehage
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox 
              id="health" 
              checked={services.health}
              onCheckedChange={updateService('health')}
            />
            <label htmlFor="health" className="text-sm font-medium">
              🏥 Helse og omsorg
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox 
              id="technical" 
              checked={services.technical}
              onCheckedChange={updateService('technical')}
            />
            <label htmlFor="technical" className="text-sm font-medium">
              🔧 Tekniske tjenester
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox 
              id="culture" 
              checked={services.culture}
              onCheckedChange={updateService('culture')}
            />
            <label htmlFor="culture" className="text-sm font-medium">
              🎭 Kultur og fritid
            </label>
          </div>
        </div>

        <div className="pt-3 border-t text-sm text-muted-foreground">
          Valgte tjenester: {Object.values(services).filter(Boolean).length} av 5
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Municipal service selection form for Norwegian citizen portals.'
      }
    }
  }
};

// Select all functionality
export const SelectAll: Story = {
  name: 'Select All Pattern',
  render: () => {
    const [items, setItems] = useState({
      item1: false,
      item2: false,
      item3: false,
      item4: false
    });

    const allSelected = Object.values(items).every(Boolean);
    const someSelected = Object.values(items).some(Boolean);
    const indeterminate = someSelected && !allSelected;

    const toggleAll = (checked: boolean) => {
      setItems(prev => Object.keys(prev).reduce((acc, key) => ({
        ...acc,
        [key]: checked
      }), {} as typeof items));
    };

    const toggleItem = (key: keyof typeof items) => (checked: boolean) => {
      setItems(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="max-w-md space-y-4 p-4 border rounded-lg">
        <div className="flex items-center gap-3 pb-2 border-b">
          <Checkbox 
            id="selectAll"
            checked={allSelected}
            indeterminate={indeterminate}
            onCheckedChange={toggleAll}
          />
          <label htmlFor="selectAll" className="text-sm font-semibold">
            Velg alle elementer
          </label>
        </div>
        
        <div className="space-y-2 pl-6">
          {Object.entries(items).map(([key, checked], index) => (
            <div key={key} className="flex items-center gap-3">
              <Checkbox 
                id={key}
                checked={checked}
                onCheckedChange={toggleItem(key as keyof typeof items)}
              />
              <label htmlFor={key} className="text-sm">
                Element {index + 1}
              </label>
            </div>
          ))}
        </div>

        <div className="pt-2 text-xs text-muted-foreground">
          Status: {allSelected ? 'Alle valgt' : someSelected ? 'Noen valgt' : 'Ingen valgt'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Select all pattern with indeterminate state when some items are selected.'
      }
    }
  }
};