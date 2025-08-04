/**
 * @fileoverview Input Component Stories - UI Documentation
 * @description Comprehensive Input component showcase with validation and Norwegian formats
 * @version 6.0.0
 * @compliance WCAG AAA, Norwegian Standards, Enterprise Grade
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from '../../src/components/ui/input';
import { Button } from '../../src/components/ui/button';

/**
 * Meta configuration for Input component stories
 */
const meta: Meta<typeof Input> = {
  title: 'UI Components/Input',
  component: Input,
  parameters: {
    docs: {
      description: {
        component: `
# Input Component

The Input component is a fundamental form element in the Xala Enterprise UI System, designed for data entry with Norwegian compliance and WCAG AAA accessibility.

## Features

### 🎯 Input Types
- **Text** - Standard text input
- **Email** - Email validation
- **Password** - Secure password entry
- **Number** - Numeric input with validation
- **Tel** - Phone number formatting
- **Date** - Date picker support
- **Search** - Search with clear button
- **URL** - URL validation

### ♿ Accessibility
- **Label association** - Proper label-input pairing
- **Error announcements** - Screen reader support
- **Keyboard navigation** - Full keyboard support
- **Focus indicators** - Clear visual feedback
- **Required fields** - ARIA required attributes

### 🇳🇴 Norwegian Formats
- **Fødselsnummer** - 11-digit personal ID
- **Organisasjonsnummer** - 9-digit organization ID
- **Phone numbers** - Norwegian format (+47)
- **Postal codes** - 4-digit validation
- **Currency** - NOK formatting

### 🛡️ Validation
- **Real-time validation** - Instant feedback
- **Error messages** - Clear error descriptions
- **Success states** - Positive feedback
- **Pattern matching** - Regex validation
- **Custom validators** - Business logic

## Usage

### Basic Input
\`\`\`tsx
<Input 
  type="text"
  placeholder="Enter text..."
  aria-label="Text input"
/>
\`\`\`

### Norwegian Personal Number
\`\`\`tsx
<Input 
  type="text"
  pattern="[0-9]{11}"
  placeholder="Fødselsnummer (11 siffer)"
  aria-label="Fødselsnummer"
  lang="nb-NO"
/>
\`\`\`

### With Validation
\`\`\`tsx
<Input 
  type="email"
  required
  validationState="error"
  errorMessage="Ugyldig e-postadresse"
  aria-invalid="true"
  aria-describedby="email-error"
/>
\`\`\`
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'label',
            enabled: true,
          },
          {
            id: 'aria-valid-attr-value',
            enabled: true,
          },
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'date', 'search', 'url'],
      description: 'Input type for validation and keyboard',
      table: {
        category: 'Type',
        defaultValue: { summary: 'text' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Input size variant (height)',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline'],
      description: 'Visual variant of the input',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'default' },
      },
    },
    validationState: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Validation state of the input',
      table: {
        category: 'State',
        defaultValue: { summary: 'default' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether input is disabled',
      table: {
        category: 'State',
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether input is required',
      table: {
        category: 'Validation',
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether input takes full width',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    pattern: {
      control: { type: 'text' },
      description: 'Regex pattern for validation',
      table: {
        category: 'Validation',
      },
    },
    nsmLevel: {
      control: { type: 'select' },
      options: ['OPEN', 'RESTRICTED', 'CONFIDENTIAL', 'SECRET'],
      description: 'Norwegian NSM security classification',
      table: {
        category: 'Norwegian Compliance',
        defaultValue: { summary: 'OPEN' },
      },
    },
    lang: {
      control: { type: 'select' },
      options: ['nb-NO', 'en-US', 'fr-FR', 'ar-SA'],
      description: 'Language code for input',
      table: {
        category: 'Localization',
        defaultValue: { summary: 'nb-NO' },
      },
    },
  },
  args: {
    type: 'text',
    size: 'md',
    variant: 'default',
    validationState: 'default',
    placeholder: 'Enter text...',
    disabled: false,
    required: false,
    fullWidth: true,
    nsmLevel: 'OPEN',
    lang: 'nb-NO',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with controls
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input with interactive controls. Use the Controls panel to explore all properties.',
      },
    },
  },
};

/**
 * All input types
 */
export const InputTypes: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Input Types</h3>
      
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Text Input</label>
          <Input type="text" placeholder="Enter text..." />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Input</label>
          <Input type="email" placeholder="email@example.com" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Password Input</label>
          <Input type="password" placeholder="Enter password..." />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Number Input</label>
          <Input type="number" placeholder="123" min="0" max="100" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Input</label>
          <Input type="tel" placeholder="+47 000 00 000" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date Input</label>
          <Input type="date" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Search Input</label>
          <Input type="search" placeholder="Search..." />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">URL Input</label>
          <Input type="url" placeholder="https://example.com" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Input Types

Different input types for various data formats:

- **text**: Standard text entry
- **email**: Email with @ validation
- **password**: Masked text entry
- **number**: Numeric with arrows
- **tel**: Phone number entry
- **date**: Date picker
- **search**: Search with clear
- **url**: URL validation
        `,
      },
    },
  },
};

/**
 * Size variants
 */
export const SizeVariants: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Size Variants</h3>
      
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Small (36px height)</label>
          <Input size="sm" placeholder="Small input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Medium (44px height - WCAG AAA)</label>
          <Input size="md" placeholder="Medium input (default)" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Large (52px height)</label>
          <Input size="lg" placeholder="Large input" />
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Accessibility Note:</strong> Medium size (44px) meets WCAG AAA minimum touch target requirements.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Size Variants

Touch-friendly sizing options:

- **Small (36px)**: Compact layouts only
- **Medium (44px)**: Default, WCAG AAA compliant
- **Large (52px)**: Enhanced touch targets
        `,
      },
    },
  },
};

/**
 * Validation states
 */
export const ValidationStates: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Validation States</h3>
      
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Default State</label>
          <Input placeholder="Normal input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Error State</label>
          <Input 
            validationState="error" 
            placeholder="Invalid input"
            aria-invalid="true"
            aria-describedby="error-message"
          />
          <p id="error-message" className="text-sm text-destructive">
            This field contains an error
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Success State</label>
          <Input 
            validationState="success" 
            placeholder="Valid input"
            aria-describedby="success-message"
          />
          <p id="success-message" className="text-sm text-success">
            ✓ Input validated successfully
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Disabled State</label>
          <Input 
            disabled 
            placeholder="Disabled input"
            aria-disabled="true"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Required Field <span className="text-destructive">*</span>
          </label>
          <Input 
            required 
            placeholder="Required input"
            aria-required="true"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Validation States

Visual feedback for input validation:

- **Default**: Normal state
- **Error**: Invalid input with red border
- **Success**: Valid input with green border
- **Disabled**: Non-interactive state
- **Required**: Mandatory field indicator
        `,
      },
    },
  },
};

/**
 * Norwegian format examples
 */
export const NorwegianFormats: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">🇳🇴 Norwegian Format Examples</h3>
      
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Fødselsnummer (11 siffer)
          </label>
          <Input 
            type="text"
            pattern="[0-9]{11}"
            placeholder="01234567890"
            maxLength={11}
            lang="nb-NO"
            aria-label="Fødselsnummer"
          />
          <p className="text-xs text-muted-foreground">
            Format: 11 siffer (DDMMYYXXXXX)
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Organisasjonsnummer (9 siffer)
          </label>
          <Input 
            type="text"
            pattern="[0-9]{9}"
            placeholder="123456789"
            maxLength={9}
            lang="nb-NO"
            aria-label="Organisasjonsnummer"
          />
          <p className="text-xs text-muted-foreground">
            Format: 9 siffer for norske organisasjoner
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Norsk telefonnummer
          </label>
          <Input 
            type="tel"
            pattern="\\+47 ?[0-9]{3} ?[0-9]{2} ?[0-9]{3}"
            placeholder="+47 000 00 000"
            lang="nb-NO"
            aria-label="Telefonnummer"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Postnummer
          </label>
          <Input 
            type="text"
            pattern="[0-9]{4}"
            placeholder="0001"
            maxLength={4}
            lang="nb-NO"
            aria-label="Postnummer"
          />
          <p className="text-xs text-muted-foreground">
            4-sifret norsk postnummer
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Beløp i NOK
          </label>
          <Input 
            type="number"
            placeholder="1 000,00"
            step="0.01"
            lang="nb-NO"
            aria-label="Beløp i norske kroner"
          />
          <p className="text-xs text-muted-foreground">
            Norske kroner med desimaler
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Kontonummer
          </label>
          <Input 
            type="text"
            pattern="[0-9]{4} [0-9]{2} [0-9]{5}"
            placeholder="1234 56 78901"
            lang="nb-NO"
            aria-label="Norsk kontonummer"
          />
          <p className="text-xs text-muted-foreground">
            Format: XXXX XX XXXXX
          </p>
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Norwegian Validation</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Fødselsnummer: 11-digit personal ID with checksum</li>
          <li>• Organisasjonsnummer: 9-digit organization ID</li>
          <li>• Phone: +47 format with 8 digits</li>
          <li>• Postal code: 4-digit Norwegian format</li>
          <li>• Currency: NOK with comma decimal separator</li>
          <li>• Bank account: 11-digit with spaces</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Norwegian Input Formats

Specialized input patterns for Norwegian data:

**Personal/Business IDs:**
- Fødselsnummer: 11-digit personal identification
- Organisasjonsnummer: 9-digit organization number

**Contact Information:**
- Phone: +47 XXX XX XXX format
- Postal code: 4-digit Norwegian system

**Financial:**
- NOK currency with comma decimals
- Norwegian bank account format

All inputs include proper validation patterns and ARIA labels in Norwegian.
        `,
      },
    },
  },
};

/**
 * Form layout example
 */
export const FormExample: Story = {
  render: (): JSX.Element => (
    <div className="max-w-2xl mx-auto p-6">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstname" className="text-sm font-medium text-foreground">
                First Name <span className="text-destructive">*</span>
              </label>
              <Input 
                id="firstname"
                type="text"
                placeholder="John"
                required
                aria-required="true"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastname" className="text-sm font-medium text-foreground">
                Last Name <span className="text-destructive">*</span>
              </label>
              <Input 
                id="lastname"
                type="text"
                placeholder="Doe"
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address <span className="text-destructive">*</span>
            </label>
            <Input 
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              required
              aria-required="true"
              aria-describedby="email-help"
            />
            <p id="email-help" className="text-xs text-muted-foreground">
              We'll never share your email with anyone else.
            </p>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">
              Phone Number
            </label>
            <Input 
              id="phone"
              type="tel"
              placeholder="+47 000 00 000"
              pattern="\\+47 ?[0-9]{3} ?[0-9]{2} ?[0-9]{3}"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              Message
            </label>
            <textarea 
              id="message"
              className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md"
              placeholder="Your message..."
              rows={4}
            />
          </div>
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button type="button" intent="outline">Cancel</Button>
          <Button type="submit" intent="primary">Submit</Button>
        </div>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Complete Form Example

Real-world form implementation with:

- Proper label-input association
- Required field indicators
- Help text for guidance
- Grid layout for organization
- Validation patterns
- Accessible form structure
        `,
      },
    },
  },
};