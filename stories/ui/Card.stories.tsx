/**
 * @fileoverview Card Component Stories - UI Documentation
 * @description Comprehensive Card component showcase with layout patterns
 * @version 6.0.0
 * @compliance WCAG AAA, Norwegian Standards, Enterprise Grade
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';
import { Grid } from '../../src/components/layout/Grid';

/**
 * Meta configuration for Card component stories
 */
const meta: Meta<typeof Card> = {
  title: 'UI Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `
# Card Component

The Card component is a versatile container for grouping related content with consistent styling and elevation.

## Features

### 🎨 Design Variants
- **Default** - Standard card with subtle border
- **Elevated** - Shadow elevation for depth
- **Interactive** - Hover and click states
- **Bordered** - Emphasized border styling
- **Filled** - Background color variants

### 📐 Layout Options
- **Padding variants** - sm, md, lg, xl spacing
- **Full bleed** - Edge-to-edge content
- **Aspect ratios** - Fixed proportions
- **Overflow handling** - Scrollable content

### ♿ Accessibility
- **Semantic HTML** - Article, section elements
- **Focus indicators** - Keyboard navigation
- **ARIA roles** - Proper semantics
- **Screen reader** - Content structure

### 🇳🇴 Norwegian Patterns
- **Government cards** - Official document layouts
- **Municipal services** - Service card designs
- **Healthcare cards** - Patient information
- **Education cards** - Course materials

## Usage

### Basic Card
\`\`\`tsx
<Card className="p-6">
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
\`\`\`

### Interactive Card
\`\`\`tsx
<Card 
  interactive
  onClick={handleClick}
  className="hover:shadow-lg transition-shadow"
>
  Clickable card content
</Card>
\`\`\`

### Card with Actions
\`\`\`tsx
<Card className="p-6 space-y-4">
  <div>Content area</div>
  <div className="flex gap-3">
    <Button>Primary</Button>
    <Button intent="outline">Secondary</Button>
  </div>
</Card>
\`\`\`
        `,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'landmark-unique',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'bordered', 'filled'],
      description: 'Visual variant of the card',
      table: {
        category: 'Design',
        defaultValue: { summary: 'default' },
      },
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding size',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'md' },
      },
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Whether card is interactive (hover/click)',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'false' },
      },
    },
    element: {
      control: { type: 'select' },
      options: ['div', 'article', 'section'],
      description: 'HTML element to render',
      table: {
        category: 'Semantic',
        defaultValue: { summary: 'div' },
      },
    },
    children: {
      control: false,
      description: 'Card content',
      table: {
        category: 'Content',
      },
    },
  },
  args: {
    variant: 'default',
    padding: 'md',
    interactive: false,
    element: 'div',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card
 */
export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Card Title</h3>
        <p className="text-muted-foreground">
          This is a default card component with standard padding and styling.
          Use the controls to explore different configurations.
        </p>
        <Button intent="primary" size="sm">Action</Button>
      </div>
    ),
    className: 'max-w-md',
  },
};

/**
 * Card variants
 */
export const Variants: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Card Variants</h3>
      
      <Grid columns={2} gap="lg">
        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-2">Default Card</h4>
          <p className="text-sm text-muted-foreground">
            Standard card with subtle border and no elevation
          </p>
        </Card>
        
        <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
          <h4 className="font-semibold text-foreground mb-2">Elevated Card</h4>
          <p className="text-sm text-muted-foreground">
            Card with shadow elevation for visual hierarchy
          </p>
        </Card>
        
        <Card className="p-6 border-2 border-primary">
          <h4 className="font-semibold text-foreground mb-2">Bordered Card</h4>
          <p className="text-sm text-muted-foreground">
            Emphasized border for important content
          </p>
        </Card>
        
        <Card className="p-6 bg-primary/5">
          <h4 className="font-semibold text-foreground mb-2">Filled Card</h4>
          <p className="text-sm text-muted-foreground">
            Subtle background color for differentiation
          </p>
        </Card>
      </Grid>
    </div>
  ),
};

/**
 * Interactive cards
 */
export const Interactive: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Interactive Cards</h3>
      
      <Grid columns={3} gap="md">
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
          onClick={() => alert('Card clicked!')}
          role="button"
          tabIndex={0}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h4 className="font-semibold text-foreground">Analytics</h4>
            <p className="text-sm text-muted-foreground">
              View detailed analytics and reports
            </p>
          </div>
        </Card>
        
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
          onClick={() => alert('Card clicked!')}
          role="button"
          tabIndex={0}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-foreground">Goals</h4>
            <p className="text-sm text-muted-foreground">
              Track and manage your objectives
            </p>
          </div>
        </Card>
        
        <Card 
          className="p-6 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all"
          onClick={() => alert('Card clicked!')}
          role="button"
          tabIndex={0}
        >
          <div className="space-y-3">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
            <h4 className="font-semibold text-foreground">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure system preferences
            </p>
          </div>
        </Card>
      </Grid>
    </div>
  ),
};

/**
 * Card with media
 */
export const MediaCards: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Media Cards</h3>
      
      <Grid columns={3} gap="lg">
        <Card className="overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/10" />
          <div className="p-4 space-y-2">
            <h4 className="font-semibold text-foreground">Image Card</h4>
            <p className="text-sm text-muted-foreground">
              Card with header image or media content
            </p>
            <Button size="sm" intent="outline" fullWidth>
              View Details
            </Button>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20" />
              <div>
                <h4 className="font-semibold text-foreground">User Card</h4>
                <p className="text-xs text-muted-foreground">@username</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Profile card with avatar and user information
            </p>
          </div>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-2xl">📄</span>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <h4 className="font-semibold text-foreground">Document.pdf</h4>
            <p className="text-sm text-muted-foreground">2.4 MB</p>
            <div className="flex gap-2">
              <Button size="sm" intent="primary">Download</Button>
              <Button size="sm" intent="outline">Share</Button>
            </div>
          </div>
        </Card>
      </Grid>
    </div>
  ),
};

/**
 * Norwegian government cards
 */
export const NorwegianCards: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        🇳🇴 Norwegian Government Service Cards
      </h3>
      
      <Grid columns={2} gap="lg">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-foreground">Byggesøknad</h4>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                Under behandling
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saksnummer:</span>
                <span className="font-medium">2024/1234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Innsendt:</span>
                <span className="font-medium">15.01.2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kommune:</span>
                <span className="font-medium">Oslo</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button size="sm" intent="primary">Se detaljer</Button>
              <Button size="sm" intent="outline">Last ned</Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 border-l-4 border-l-success">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-foreground">Skattekort</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                Aktivt
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tabellnummer:</span>
                <span className="font-medium">7100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prosent:</span>
                <span className="font-medium">36%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gyldig til:</span>
                <span className="font-medium">31.12.2024</span>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button size="sm" intent="primary">Endre</Button>
              <Button size="sm" intent="outline">Se mer</Button>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-2 border-blue-200">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🏥</span>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">Helsetjenester</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Tilgang til dine helsetjenester og journaler
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Fastlege registrert</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Kjernejournal oppdatert</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>E-resept aktivert</span>
              </li>
            </ul>
            <Button fullWidth intent="primary">
              Gå til Helsenorge
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 bg-orange-50 border-2 border-orange-200">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground">Utdanning</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Søknader og opptak til høyere utdanning
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 space-y-1">
              <p className="text-sm font-medium">Søknadsfrist</p>
              <p className="text-2xl font-bold text-orange-600">15. april 2024</p>
              <p className="text-xs text-muted-foreground">23 dager gjenstår</p>
            </div>
            <Button fullWidth intent="primary">
              Start søknad
            </Button>
          </div>
        </Card>
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Norwegian Government Service Cards

Official service card patterns for Norwegian digital services:

- **Status indicators** - Clear visual status (active, pending, approved)
- **Case numbers** - Norwegian case management format
- **Date formatting** - DD.MM.YYYY Norwegian standard
- **Service categories** - Healthcare, tax, education, permits
- **Municipal branding** - Official color coding
- **Action buttons** - Primary and secondary actions
- **Accessibility** - WCAG AAA compliant
- **Language** - Norwegian Bokmål labels
        `,
      },
    },
  },
};

/**
 * Dashboard cards
 */
export const DashboardCards: Story = {
  render: (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Dashboard Cards</h3>
      
      <Grid columns={4} gap="md">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Users</span>
            <span className="text-green-600 text-xs">+12%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">24,847</div>
          <div className="text-xs text-muted-foreground mt-1">
            vs last month: 22,183
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Revenue</span>
            <span className="text-green-600 text-xs">+8.4%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">NOK 1.2M</div>
          <div className="text-xs text-muted-foreground mt-1">
            Monthly recurring
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Active Projects</span>
            <span className="text-yellow-600 text-xs">3 pending</span>
          </div>
          <div className="text-2xl font-bold text-foreground">47</div>
          <div className="text-xs text-muted-foreground mt-1">
            12 completed this month
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Performance</span>
            <span className="text-red-600 text-xs">-2.1%</span>
          </div>
          <div className="text-2xl font-bold text-foreground">98.2%</div>
          <div className="text-xs text-muted-foreground mt-1">
            Uptime last 30 days
          </div>
        </Card>
      </Grid>
      
      <Grid columns={2} gap="lg">
        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Recent Activity</h4>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-border last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary/10" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    User action item {i}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {i * 5} minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        <Card className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
            <Button intent="outline" size="sm">Create Report</Button>
            <Button intent="outline" size="sm">Export Data</Button>
            <Button intent="outline" size="sm">View Analytics</Button>
            <Button intent="outline" size="sm">Settings</Button>
          </div>
        </Card>
      </Grid>
    </div>
  ),
};