/**
 * @fileoverview Grid Layout Component Stories
 * @description Comprehensive Grid system showcase with responsive patterns
 * @version 6.0.0
 * @compliance WCAG AAA, Norwegian Standards, Enterprise Grade
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Grid } from '../../src/components/layout/Grid';
import { Card } from '../../src/components/ui/card';
import { Button } from '../../src/components/ui/button';

/**
 * Meta configuration for Grid layout component
 */
const meta: Meta<typeof Grid> = {
  title: 'Layout Components/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: `
# Grid Layout System

The Grid component provides a powerful, responsive layout system based on CSS Grid with enterprise-grade flexibility and Norwegian compliance.

## Features

### 📐 Grid System
- **12-column system** - Industry standard grid
- **8pt spacing** - Consistent gap values
- **Responsive breakpoints** - Mobile-first design
- **Auto-fit/Auto-fill** - Dynamic column generation
- **Nested grids** - Complex layout compositions

### 🎯 Enterprise Patterns
- **Dashboard layouts** - Admin panel grids
- **Card grids** - Product listings, data displays
- **Form layouts** - Multi-column forms
- **Gallery grids** - Image and media layouts

### ♿ Accessibility
- **Semantic structure** - Proper HTML elements
- **Keyboard navigation** - Logical tab order
- **Screen reader** - Grid role and descriptions
- **Focus management** - Clear focus indicators

### 🇳🇴 Norwegian Compliance
- **Government layouts** - Municipal design patterns
- **Document grids** - Official document layouts
- **Data tables** - Compliant data presentation
- **Responsive design** - Mobile-first approach

## Usage Guidelines

### Basic Grid
\`\`\`tsx
import { Grid } from '@xala-technologies/ui-system';

function MyLayout() {
  return (
    <Grid columns={3} gap="md">
      <div>Column 1</div>
      <div>Column 2</div>
      <div>Column 3</div>
    </Grid>
  );
}
\`\`\`

### Responsive Grid
\`\`\`tsx
<Grid 
  columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
  gap={{ sm: 'sm', md: 'md', lg: 'lg' }}
>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</Grid>
\`\`\`

### Auto-fit Grid
\`\`\`tsx
<Grid 
  autoFit
  minItemWidth="250px"
  gap="lg"
>
  {/* Items automatically fit available space */}
</Grid>
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'landmark-unique',
            enabled: true,
          },
          {
            id: 'grid-role',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    columns: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of grid columns',
      table: {
        category: 'Layout',
        defaultValue: { summary: '12' },
      },
    },
    rows: {
      control: { type: 'number', min: 1, max: 12 },
      description: 'Number of grid rows (optional)',
      table: {
        category: 'Layout',
      },
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Gap between grid items (8pt grid)',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'md' },
      },
    },
    autoFit: {
      control: { type: 'boolean' },
      description: 'Auto-fit items to available space',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    autoFill: {
      control: { type: 'boolean' },
      description: 'Auto-fill available space with items',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    minItemWidth: {
      control: { type: 'text' },
      description: 'Minimum width for auto-fit/fill items',
      table: {
        category: 'Layout',
        defaultValue: { summary: '250px' },
      },
    },
    alignItems: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Vertical alignment of items',
      table: {
        category: 'Alignment',
        defaultValue: { summary: 'stretch' },
      },
    },
    justifyItems: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Horizontal alignment of items',
      table: {
        category: 'Alignment',
        defaultValue: { summary: 'stretch' },
      },
    },
    dense: {
      control: { type: 'boolean' },
      description: 'Pack items densely in grid',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'false' },
      },
    },
    children: {
      control: false,
      description: 'Grid content',
      table: {
        category: 'Content',
      },
    },
  },
  args: {
    columns: 3,
    gap: 'md',
    autoFit: false,
    autoFill: false,
    alignItems: 'stretch',
    justifyItems: 'stretch',
    dense: false,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Grid item component for examples
 */
const GridItem: React.FC<{ 
  readonly children: React.ReactNode;
  readonly className?: string;
}> = ({ children, className = '' }): JSX.Element => (
  <div className={`bg-primary/10 border-2 border-dashed border-primary/30 rounded-lg p-4 min-h-[100px] flex items-center justify-center ${className}`}>
    <div className="text-center text-foreground">{children}</div>
  </div>
);

/**
 * Default grid with interactive controls
 */
export const Default: Story = {
  args: {
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default 3-column grid with medium gap. Use the controls to experiment with different configurations.',
      },
    },
  },
};

/**
 * Responsive grid columns
 */
export const ResponsiveColumns: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Responsive Column Grid</h3>
        <p className="text-muted-foreground">
          Grid adapts from 1 column on mobile to 4 columns on extra large screens
        </p>
      </div>
      
      <Grid 
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        gap={{ sm: 'sm', md: 'md', lg: 'lg' }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <Card key={i} className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Card {i + 1}</h4>
            <p className="text-sm text-muted-foreground">
              Responsive grid item that adapts to screen size
            </p>
          </Card>
        ))}
      </Grid>
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Breakpoint Configuration</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Mobile (sm): 1 column</li>
          <li>• Tablet (md): 2 columns</li>
          <li>• Desktop (lg): 3 columns</li>
          <li>• Large (xl): 4 columns</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Responsive Grid System

Mobile-first responsive design with breakpoint-specific column counts:

**Configuration:**
\`\`\`tsx
<Grid 
  columns={{ 
    sm: 1,   // Mobile: Single column
    md: 2,   // Tablet: Two columns
    lg: 3,   // Desktop: Three columns
    xl: 4    // Large: Four columns
  }}
  gap={{ 
    sm: 'sm',  // 8px on mobile
    md: 'md',  // 16px on tablet
    lg: 'lg'   // 24px on desktop
  }}
>
\`\`\`

**Benefits:**
- Optimal content density per device
- Maintains readability across screens
- Touch-friendly spacing on mobile
- Efficient use of desktop space
        `,
      },
    },
  },
};

/**
 * Auto-fit and auto-fill grids
 */
export const AutoGrid: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8 p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Auto-fit Grid</h3>
          <p className="text-muted-foreground">
            Items stretch to fill available space when there's room
          </p>
          <Grid autoFit minItemWidth="200px" gap="md">
            <Card className="p-4">
              <div className="text-center">Auto-fit Item 1</div>
            </Card>
            <Card className="p-4">
              <div className="text-center">Auto-fit Item 2</div>
            </Card>
            <Card className="p-4">
              <div className="text-center">Auto-fit Item 3</div>
            </Card>
            <Card className="p-4">
              <div className="text-center">Auto-fit Item 4</div>
            </Card>
          </Grid>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Auto-fill Grid</h3>
          <p className="text-muted-foreground">
            Creates empty columns to maintain consistent item width
          </p>
          <Grid autoFill minItemWidth="200px" gap="md">
            <Card className="p-4">
              <div className="text-center">Auto-fill Item 1</div>
            </Card>
            <Card className="p-4">
              <div className="text-center">Auto-fill Item 2</div>
            </Card>
            <Card className="p-4">
              <div className="text-center">Auto-fill Item 3</div>
            </Card>
            <Card className="p-4">
              <div className="text-center">Auto-fill Item 4</div>
            </Card>
          </Grid>
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Auto Grid Benefits</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Dynamic column generation</li>
          <li>• No media queries needed</li>
          <li>• Consistent item sizing</li>
          <li>• Responsive by default</li>
          <li>• Perfect for unknown item counts</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Auto-fit vs Auto-fill

Dynamic grid layouts that adapt to available space:

**Auto-fit:**
- Items stretch to fill available space
- No empty columns
- Best for flexible layouts

**Auto-fill:**
- Maintains consistent item width
- Creates empty columns if needed
- Best for predictable item sizes

**Usage:**
\`\`\`tsx
// Auto-fit
<Grid autoFit minItemWidth="250px" gap="lg">

// Auto-fill
<Grid autoFill minItemWidth="250px" gap="lg">
\`\`\`
        `,
      },
    },
  },
};

/**
 * Dashboard layout example
 */
export const DashboardLayout: Story = {
  render: (): JSX.Element => (
    <div className="p-6 bg-background">
      <h3 className="text-2xl font-bold text-foreground mb-6">Enterprise Dashboard</h3>
      
      <Grid columns={12} gap="lg">
        {/* Header Stats - Full Width */}
        <div className="col-span-12">
          <Card className="p-6 bg-primary/5">
            <h4 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h4>
            <Grid columns={4} gap="md">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">247</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">89%</div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">12</div>
                <div className="text-sm text-muted-foreground">Pending Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-info">4.8</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </Grid>
          </Card>
        </div>
        
        {/* Main Content - 8 columns */}
        <div className="col-span-12 lg:col-span-8">
          <Card className="p-6 h-[300px]">
            <h4 className="text-lg font-semibold text-foreground mb-4">Main Chart</h4>
            <div className="bg-muted rounded h-full flex items-center justify-center">
              <span className="text-muted-foreground">Chart Visualization</span>
            </div>
          </Card>
        </div>
        
        {/* Sidebar - 4 columns */}
        <div className="col-span-12 lg:col-span-4">
          <Card className="p-6 h-[300px]">
            <h4 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">User login: admin@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Document approved</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">System update scheduled</span>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Bottom Cards - 3x4 columns */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Performance</h4>
            <p className="text-sm text-muted-foreground">System running optimally</p>
            <Button intent="outline" size="sm" className="mt-4">View Details</Button>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Security</h4>
            <p className="text-sm text-muted-foreground">No threats detected</p>
            <Button intent="outline" size="sm" className="mt-4">Security Report</Button>
          </Card>
        </div>
        
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Compliance</h4>
            <p className="text-sm text-muted-foreground">GDPR & NSM compliant</p>
            <Button intent="outline" size="sm" className="mt-4">Audit Log</Button>
          </Card>
        </div>
      </Grid>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
### Dashboard Layout Pattern

Enterprise dashboard using 12-column grid system:

**Layout Structure:**
- Header stats: Full width (12 columns)
- Main content: 8 columns on desktop
- Sidebar: 4 columns on desktop
- Cards: 4 columns each (3 per row)

**Responsive Behavior:**
- Stacks vertically on mobile
- 2-column layout on tablet
- Full layout on desktop

**Use Cases:**
- Admin panels
- Analytics dashboards
- Monitoring systems
- Business intelligence
        `,
      },
    },
  },
};

/**
 * Norwegian government form layout
 */
export const NorwegianFormLayout: Story = {
  render: (): JSX.Element => (
    <div className="p-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            🇳🇴 Søknad om byggetillatelse
          </h3>
          <p className="text-muted-foreground">
            Kommune: Oslo | Sakstype: Byggesak | Status: Under behandling
          </p>
        </div>
        
        <Grid columns={12} gap="lg">
          {/* Personal Information Section */}
          <div className="col-span-12">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Personopplysninger
              </h4>
              <Grid columns={2} gap="md">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Fornavn *</label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-3 border border-border rounded-md"
                    placeholder="Ola"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Etternavn *</label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-3 border border-border rounded-md"
                    placeholder="Nordmann"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Fødselsnummer *</label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-3 border border-border rounded-md"
                    placeholder="11 siffer"
                    pattern="[0-9]{11}"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Telefon *</label>
                  <input 
                    type="tel" 
                    className="w-full h-11 px-3 border border-border rounded-md"
                    placeholder="+47 000 00 000"
                  />
                </div>
              </Grid>
            </Card>
          </div>
          
          {/* Address Section */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="p-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Eiendomsinformasjon
              </h4>
              <Grid columns={1} gap="md">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Gateadresse *</label>
                  <input 
                    type="text" 
                    className="w-full h-11 px-3 border border-border rounded-md"
                    placeholder="Karl Johans gate 1"
                  />
                </div>
                <Grid columns={3} gap="md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Postnummer *</label>
                    <input 
                      type="text" 
                      className="w-full h-11 px-3 border border-border rounded-md"
                      placeholder="0001"
                      pattern="[0-9]{4}"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium text-foreground">Poststed *</label>
                    <input 
                      type="text" 
                      className="w-full h-11 px-3 border border-border rounded-md"
                      placeholder="Oslo"
                      readOnly
                    />
                  </div>
                </Grid>
              </Grid>
            </Card>
          </div>
          
          {/* NSM Classification */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="p-6 border-2 border-warning">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Klassifisering
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">BEGRENSET</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dette dokumentet inneholder personopplysninger og er underlagt GDPR.
                </p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Saksbehandler: Kommune</div>
                  <div>Tilgang: Autorisert personell</div>
                  <div>Opprettet: 2024-01-15</div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Action Buttons */}
          <div className="col-span-12">
            <Card className="p-6 bg-muted/50">
              <Grid columns={12} gap="md">
                <div className="col-span-12 md:col-span-8">
                  <p className="text-sm text-muted-foreground">
                    * Obligatoriske felt. Alle personopplysninger behandles i henhold til GDPR og norsk lovgivning.
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 flex gap-3 justify-end">
                  <Button intent="outline">Lagre utkast</Button>
                  <Button intent="primary">Send søknad</Button>
                </div>
              </Grid>
            </Card>
          </div>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
### Norwegian Government Form Layout

Official form layout following Norwegian municipal standards:

**Features:**
- GDPR compliant data collection
- NSM security classification
- Norwegian field labels and validation
- Responsive form sections
- Clear visual hierarchy

**Layout Pattern:**
- Personal info: 2-column grid
- Address: Mixed column widths
- Classification: Sidebar placement
- Actions: Bottom bar with alignment

**Compliance:**
- Norwegian language labels
- Fødselsnummer validation
- Postal code lookup
- GDPR consent tracking
        `,
      },
    },
  },
};

/**
 * Gap spacing showcase
 */
export const GapSpacing: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Gap Spacing (8pt Grid)</h3>
      
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((gap) => (
        <div key={gap} className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Gap: {gap} ({
              gap === 'none' ? '0px' :
              gap === 'xs' ? '4px' :
              gap === 'sm' ? '8px' :
              gap === 'md' ? '16px' :
              gap === 'lg' ? '24px' :
              gap === 'xl' ? '32px' :
              '48px'
            })
          </h4>
          <Grid columns={3} gap={gap}>
            <GridItem>Item 1</GridItem>
            <GridItem>Item 2</GridItem>
            <GridItem>Item 3</GridItem>
          </Grid>
        </div>
      ))}
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">8pt Grid System</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Consistent spacing across components</li>
          <li>• Pixel-perfect alignment</li>
          <li>• Touch-friendly spacing on mobile</li>
          <li>• Follows enterprise design standards</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Gap Spacing System

Consistent spacing using the 8pt grid system:

**Spacing Scale:**
- **none**: 0px - No gap
- **xs**: 4px - Extra small (0.5 grid unit)
- **sm**: 8px - Small (1 grid unit)
- **md**: 16px - Medium (2 grid units)
- **lg**: 24px - Large (3 grid units)
- **xl**: 32px - Extra large (4 grid units)
- **2xl**: 48px - Double XL (6 grid units)

**Usage:**
\`\`\`tsx
<Grid columns={3} gap="lg">
  {/* 24px gap between items */}
</Grid>
\`\`\`
        `,
      },
    },
  },
};