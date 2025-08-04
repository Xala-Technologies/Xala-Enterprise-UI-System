/**
 * @fileoverview Alert Component Stories - UI Documentation
 * @description Comprehensive Alert component showcase with notification patterns
 * @version 6.0.0
 * @compliance WCAG AAA, Norwegian Standards, Enterprise Grade
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from '../../src/components/ui/alert';
import { Button } from '../../src/components/ui/button';

/**
 * Meta configuration for Alert component stories
 */
const meta: Meta<typeof Alert> = {
  title: 'UI Components/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `
# Alert Component

The Alert component provides important messages and notifications to users with appropriate visual emphasis and accessibility.

## Features

### 🎨 Alert Types
- **Info** - Informational messages (blue)
- **Success** - Positive confirmations (green)
- **Warning** - Cautionary messages (yellow)
- **Error** - Error messages (red)
- **Default** - Neutral messages

### 📐 Layout Options
- **With icon** - Leading icon for visual emphasis
- **With title** - Heading for alert content
- **With actions** - Buttons for user response
- **Dismissible** - Close button option

### ♿ Accessibility
- **ARIA roles** - Alert, status, live regions
- **Screen reader** - Announcement priority
- **Focus management** - Keyboard dismissal
- **Color contrast** - WCAG AAA compliant

### 🇳🇴 Norwegian Patterns
- **Government notices** - Official communications
- **System messages** - Norwegian error messages
- **Compliance alerts** - GDPR, NSM notifications
- **Municipal updates** - Service announcements

## Usage

### Basic Alert
\`\`\`tsx
<Alert type="info">
  This is an informational message
</Alert>
\`\`\`

### Alert with Title
\`\`\`tsx
<Alert type="success" title="Success!">
  Your changes have been saved successfully
</Alert>
\`\`\`

### Dismissible Alert
\`\`\`tsx
<Alert 
  type="warning" 
  dismissible
  onDismiss={handleDismiss}
>
  This alert can be closed
</Alert>
\`\`\`
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'aria-roles',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'info', 'success', 'warning', 'error'],
      description: 'Type of alert for semantic meaning',
      table: {
        category: 'Type',
        defaultValue: { summary: 'default' },
      },
    },
    title: {
      control: { type: 'text' },
      description: 'Optional title for the alert',
      table: {
        category: 'Content',
      },
    },
    dismissible: {
      control: { type: 'boolean' },
      description: 'Whether alert can be dismissed',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Whether to show icon',
      table: {
        category: 'Display',
        defaultValue: { summary: 'true' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Alert message content',
      table: {
        category: 'Content',
      },
    },
  },
  args: {
    type: 'default',
    dismissible: false,
    icon: true,
    children: 'This is an alert message',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default alert
 */
export const Default: Story = {
  args: {
    children: 'This is a default alert message. Use the controls to explore different configurations.',
  },
};

/**
 * Alert types
 */
export const AlertTypes: Story = {
  render: (): JSX.Element => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Alert Types</h3>
      
      <Alert className="border-l-4 border-l-slate-500">
        <div className="flex gap-3">
          <span className="text-slate-600">ℹ️</span>
          <div className="flex-1">
            <p className="font-medium text-foreground">Default Alert</p>
            <p className="text-sm text-muted-foreground mt-1">
              Neutral informational message without specific semantic meaning
            </p>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex gap-3">
          <span className="text-blue-600">ℹ️</span>
          <div className="flex-1">
            <p className="font-medium text-blue-900">Information</p>
            <p className="text-sm text-blue-700 mt-1">
              This is an informational alert providing helpful context or guidance
            </p>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-green-500 bg-green-50">
        <div className="flex gap-3">
          <span className="text-green-600">✓</span>
          <div className="flex-1">
            <p className="font-medium text-green-900">Success</p>
            <p className="text-sm text-green-700 mt-1">
              Operation completed successfully. Your changes have been saved.
            </p>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-yellow-500 bg-yellow-50">
        <div className="flex gap-3">
          <span className="text-yellow-600">⚠️</span>
          <div className="flex-1">
            <p className="font-medium text-yellow-900">Warning</p>
            <p className="text-sm text-yellow-700 mt-1">
              Please review this information carefully before proceeding
            </p>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-red-500 bg-red-50">
        <div className="flex gap-3">
          <span className="text-red-600">⚠</span>
          <div className="flex-1">
            <p className="font-medium text-red-900">Error</p>
            <p className="text-sm text-red-700 mt-1">
              An error occurred while processing your request. Please try again.
            </p>
          </div>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Alert Types

Semantic alert variants for different message types:

- **Default**: Neutral messages without specific urgency
- **Info**: Helpful information and tips (blue)
- **Success**: Positive confirmations (green)
- **Warning**: Important cautions (yellow)
- **Error**: Error messages requiring attention (red)

Each type has appropriate ARIA roles and color contrast for accessibility.
        `,
      },
    },
  },
};

/**
 * Dismissible alerts
 */
export const DismissibleAlerts: Story = {
  render: (): JSX.Element => {
    const [visible1, setVisible1] = React.useState(true);
    const [visible2, setVisible2] = React.useState(true);
    const [visible3, setVisible3] = React.useState(true);
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Dismissible Alerts</h3>
        
        {visible1 && (
          <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 flex-1">
                <span className="text-blue-600">ℹ️</span>
                <div>
                  <p className="font-medium text-blue-900">New Feature Available</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Check out our new dashboard analytics feature
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVisible1(false)}
                className="text-blue-600 hover:text-blue-800 p-1"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          </Alert>
        )}
        
        {visible2 && (
          <Alert className="border-l-4 border-l-yellow-500 bg-yellow-50">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 flex-1">
                <span className="text-yellow-600">⚠️</span>
                <div>
                  <p className="font-medium text-yellow-900">Maintenance Scheduled</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    System maintenance planned for Sunday 2:00-4:00 AM CET
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVisible2(false)}
                className="text-yellow-600 hover:text-yellow-800 p-1"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          </Alert>
        )}
        
        {visible3 && (
          <Alert className="border-l-4 border-l-green-500 bg-green-50">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 flex-1">
                <span className="text-green-600">✓</span>
                <div>
                  <p className="font-medium text-green-900">Profile Updated</p>
                  <p className="text-sm text-green-700 mt-1">
                    Your profile changes have been saved successfully
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVisible3(false)}
                className="text-green-600 hover:text-green-800 p-1"
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>
          </Alert>
        )}
        
        {!visible1 && !visible2 && !visible3 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">All alerts dismissed</p>
            <Button
              onClick={() => {
                setVisible1(true);
                setVisible2(true);
                setVisible3(true);
              }}
              intent="outline"
            >
              Reset Alerts
            </Button>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Dismissible Alerts

Alerts that users can close:

- **Close button**: Accessible dismiss control
- **Keyboard support**: Escape key dismissal
- **ARIA labels**: Screen reader announcements
- **State management**: Controlled visibility
- **Animation**: Smooth transitions (optional)
        `,
      },
    },
  },
};

/**
 * Alert with actions
 */
export const AlertWithActions: Story = {
  render: (): JSX.Element => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Alerts with Actions</h3>
      
      <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-blue-600">📦</span>
            <div className="flex-1">
              <p className="font-medium text-blue-900">Update Available</p>
              <p className="text-sm text-blue-700 mt-1">
                Version 2.0.0 is now available with new features and improvements
              </p>
            </div>
          </div>
          <div className="flex gap-3 ml-9">
            <Button size="sm" intent="primary">Update Now</Button>
            <Button size="sm" intent="outline">View Changelog</Button>
            <Button size="sm" intent="ghost">Remind Later</Button>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-yellow-500 bg-yellow-50">
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-yellow-600">🔒</span>
            <div className="flex-1">
              <p className="font-medium text-yellow-900">Session Expiring</p>
              <p className="text-sm text-yellow-700 mt-1">
                Your session will expire in 5 minutes due to inactivity
              </p>
            </div>
          </div>
          <div className="flex gap-3 ml-9">
            <Button size="sm" intent="primary">Stay Logged In</Button>
            <Button size="sm" intent="outline">Log Out</Button>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-red-500 bg-red-50">
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-red-600">⚠</span>
            <div className="flex-1">
              <p className="font-medium text-red-900">Payment Failed</p>
              <p className="text-sm text-red-700 mt-1">
                We couldn't process your payment. Please check your payment details.
              </p>
            </div>
          </div>
          <div className="flex gap-3 ml-9">
            <Button size="sm" intent="destructive">Retry Payment</Button>
            <Button size="sm" intent="outline">Update Payment Method</Button>
          </div>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Alerts with Actions

Interactive alerts with action buttons:

- **Primary actions**: Main response options
- **Secondary actions**: Alternative choices
- **Destructive actions**: Dangerous operations
- **Button sizing**: Appropriate for alert context
- **Action alignment**: Consistent positioning
        `,
      },
    },
  },
};

/**
 * Norwegian system messages
 */
export const NorwegianAlerts: Story = {
  render: (): JSX.Element => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        🇳🇴 Norwegian System Messages
      </h3>
      
      <Alert className="border-l-4 border-l-green-500 bg-green-50">
        <div className="flex gap-3">
          <span className="text-green-600">✓</span>
          <div className="flex-1">
            <p className="font-medium text-green-900" lang="nb-NO">
              Søknad sendt
            </p>
            <p className="text-sm text-green-700 mt-1" lang="nb-NO">
              Din søknad er mottatt og vil bli behandlet innen 3-5 virkedager. 
              Saksnummer: 2024/1234
            </p>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-yellow-500 bg-yellow-50">
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-yellow-600">🔒</span>
            <div className="flex-1">
              <p className="font-medium text-yellow-900" lang="nb-NO">
                GDPR-varsel
              </p>
              <p className="text-sm text-yellow-700 mt-1" lang="nb-NO">
                Dette skjemaet inneholder personopplysninger som behandles i henhold til 
                personvernforordningen (GDPR) og norsk personvernlovgivning.
              </p>
            </div>
          </div>
          <div className="ml-9">
            <Button size="sm" intent="outline" lang="nb-NO">
              Les personvernerklæring
            </Button>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-orange-500 bg-orange-50">
        <div className="flex gap-3">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold">
            B
          </div>
          <div className="flex-1">
            <p className="font-medium text-orange-900" lang="nb-NO">
              Begrenset tilgang
            </p>
            <p className="text-sm text-orange-700 mt-1" lang="nb-NO">
              Dette dokumentet er klassifisert som BEGRENSET og krever spesiell autorisasjon. 
              Kun autorisert personell har tilgang.
            </p>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-blue-500 bg-blue-50">
        <div className="flex gap-3">
          <span className="text-blue-600">📋</span>
          <div className="flex-1">
            <p className="font-medium text-blue-900" lang="nb-NO">
              Nye meldinger fra kommunen
            </p>
            <p className="text-sm text-blue-700 mt-1" lang="nb-NO">
              Du har 3 uleste meldinger i din digitale postkasse. 
              Siste melding mottatt: 15.01.2024 kl. 14:30
            </p>
            <div className="mt-3 flex gap-3">
              <Button size="sm" intent="primary" lang="nb-NO">
                Gå til meldinger
              </Button>
              <Button size="sm" intent="outline" lang="nb-NO">
                Merk som lest
              </Button>
            </div>
          </div>
        </div>
      </Alert>
      
      <Alert className="border-l-4 border-l-red-500 bg-red-50">
        <div className="flex gap-3">
          <span className="text-red-600">⚠</span>
          <div className="flex-1">
            <p className="font-medium text-red-900" lang="nb-NO">
              Validering feilet
            </p>
            <p className="text-sm text-red-700 mt-1" lang="nb-NO">
              Fødselsnummer må være 11 siffer. Kontroller at du har skrevet inn riktig 
              fødselsnummer og prøv igjen.
            </p>
          </div>
        </div>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Norwegian System Messages

Government and municipal alert patterns:

- **Norwegian language**: All text in Norwegian Bokmål
- **GDPR notices**: Privacy and data protection alerts
- **NSM classification**: Security level indicators
- **Case numbers**: Reference numbers for tracking
- **Municipal messages**: Official communications
- **Validation errors**: Norwegian format requirements
- **Action buttons**: Norwegian labeled actions

All messages follow Norwegian government digital service guidelines.
        `,
      },
    },
  },
};