/**
 * @fileoverview Container Semantic Component Stories
 * @description Comprehensive Container component showcase with enterprise patterns
 * @version 6.0.0
 * @compliance WCAG AAA, Norwegian Standards, Enterprise Grade
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Container } from '../../src/components/semantic/Container';
import { Button } from '../../src/components/ui/button';

/**
 * Meta configuration for Container semantic component
 */
const meta: Meta<typeof Container> = {
  title: 'Semantic Components/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: `
# Container Semantic Component

The Container is a foundational semantic component that provides consistent layout boundaries and responsive behavior across the Xala Enterprise UI System.

## Features

### 🏗️ Semantic Architecture
- **Semantic HTML** - Uses appropriate HTML elements
- **Accessible structure** - Proper heading hierarchy and landmarks
- **SSR-safe** - Pure presentational component
- **Token-based** - Uses design system tokens exclusively

### 📐 Layout System
- **Max-width constraints** - Prevents overly wide content
- **Responsive breakpoints** - Mobile-first responsive design
- **Consistent spacing** - 8pt grid system alignment
- **Flexible positioning** - Center, start, end alignment

### ♿ Accessibility Features
- **Semantic landmarks** - Main, section, article elements
- **Skip navigation** - Keyboard navigation support
- **Screen reader** - Proper heading structure
- **Focus management** - Logical tab order

### 🇳🇴 Norwegian Compliance
- **Government layouts** - Municipal design patterns
- **NSM classification** - Security level indicators
- **Document structure** - Official document formatting
- **Multi-language** - Support for Norwegian content

## Usage Guidelines

### Basic Container
\`\`\`tsx
import { Container } from '@xala-technologies/ui-system';

function MyPage() {
  return (
    <Container maxWidth="lg" centerContent>
      <h1>Page Title</h1>
      <p>Page content...</p>
    </Container>
  );
}
\`\`\`

### Norwegian Government Layout
\`\`\`tsx
<Container 
  maxWidth="xl" 
  element="main"
  nsmLevel="RESTRICTED"
  lang="nb-NO"
  aria-label="Hovedinnhold"
>
  <h1>Søknadsskjema</h1>
  {/* Government form content */}
</Container>
\`\`\`

### Responsive Design
\`\`\`tsx
<Container 
  maxWidth={{
    sm: 'sm',
    md: 'md', 
    lg: 'lg',
    xl: 'xl'
  }}
>
  Content adapts to screen size
</Container>
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
    a11y: {
      config: {
        rules: [
          {
            id: 'landmarks',
            enabled: true,
          },
          {
            id: 'heading-order',
            enabled: true,
          },
          {
            id: 'skip-link',
            enabled: true,
          },
        ],
      },
    },
  },
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full', 'none'],
      description: 'Maximum width constraint for the container',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'lg' },
      },
    },
    centerContent: {
      control: { type: 'boolean' },
      description: 'Whether to center the container horizontally',
      table: {
        category: 'Layout',
        defaultValue: { summary: 'true' },
      },
    },
    element: {
      control: { type: 'select' },
      options: ['div', 'main', 'section', 'article', 'aside', 'header', 'footer'],
      description: 'HTML element to render as',
      table: {
        category: 'Semantic',
        defaultValue: { summary: 'div' },
      },
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding following 8pt grid',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'md' },
      },
    },
    background: {
      control: { type: 'select' },
      options: ['none', 'subtle', 'surface', 'elevated'],
      description: 'Background variant using design tokens',
      table: {
        category: 'Design System',
        defaultValue: { summary: 'none' },
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
      description: 'Language code for content',
      table: {
        category: 'Localization',
        defaultValue: { summary: 'nb-NO' },
      },
    },
    children: {
      control: { type: 'text' },
      description: 'Container content',
      table: {
        category: 'Content',
      },
    },
  },
  args: {
    maxWidth: 'lg',
    centerContent: true,
    element: 'div',
    spacing: 'md',
    background: 'none',
    nsmLevel: 'OPEN',
    lang: 'nb-NO',
    children: 'Container content',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default container with interactive controls
 */
export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Default Container</h2>
        <p className="text-muted-foreground">
          This is a default container with medium spacing and large max-width. 
          Use the controls panel to experiment with different configurations.
        </p>
        <Button intent="primary">Action Button</Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'The default container configuration with interactive controls for testing all properties.',
      },
    },
  },
};

/**
 * All max-width variants showcase
 */
export const MaxWidthVariants: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Container Max-Width Variants</h3>
      
      {(['sm', 'md', 'lg', 'xl', '2xl', 'full'] as const).map((width) => (
        <div key={width} className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            {width} - {
              width === 'sm' ? '640px' :
              width === 'md' ? '768px' :
              width === 'lg' ? '1024px' :
              width === 'xl' ? '1280px' :
              width === '2xl' ? '1536px' :
              '100%'
            }
          </h4>
          <Container maxWidth={width} background="surface" spacing="md">
            <div className="bg-primary/10 p-4 rounded border-2 border-dashed border-primary/30">
              <p className="text-sm text-foreground">
                Container with <code className="bg-muted px-1 rounded">{width}</code> max-width
              </p>
            </div>
          </Container>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
### Max-Width Variants

Responsive container widths following the 8pt grid system:

- **sm (640px)**: Mobile and small tablet layouts
- **md (768px)**: Standard tablet layouts  
- **lg (1024px)**: Desktop layouts (recommended default)
- **xl (1280px)**: Large desktop layouts
- **2xl (1536px)**: Extra large desktop layouts
- **full (100%)**: Full viewport width
- **none**: No max-width constraint

**Responsive Behavior:**
Containers automatically adapt to smaller screen sizes while maintaining readability and usability.
        `,
      },
    },
  },
};

/**
 * Semantic HTML elements showcase
 */
export const SemanticElements: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Semantic HTML Elements</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Container element="main" background="surface" spacing="md" aria-label="Main content area">
          <h4 className="font-semibold text-foreground mb-2">&lt;main&gt; Element</h4>
          <p className="text-sm text-muted-foreground">
            Primary content area of the page. Should be unique per page.
          </p>
        </Container>
        
        <Container element="section" background="surface" spacing="md" aria-labelledby="section-heading">
          <h4 id="section-heading" className="font-semibold text-foreground mb-2">&lt;section&gt; Element</h4>
          <p className="text-sm text-muted-foreground">
            Thematic grouping of content with a heading.
          </p>
        </Container>
        
        <Container element="article" background="surface" spacing="md">
          <h4 className="font-semibold text-foreground mb-2">&lt;article&gt; Element</h4>
          <p className="text-sm text-muted-foreground">
            Self-contained content that could be distributed independently.
          </p>
        </Container>
        
        <Container element="aside" background="surface" spacing="md" aria-label="Supplementary content">
          <h4 className="font-semibold text-foreground mb-2">&lt;aside&gt; Element</h4>
          <p className="text-sm text-muted-foreground">
            Supplementary content related to the main content.
          </p>
        </Container>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Accessibility Benefits</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Screen readers can navigate by landmarks</li>
          <li>• Improved document structure and SEO</li>
          <li>• Better keyboard navigation</li>
          <li>• Semantic meaning for assistive technologies</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Semantic HTML Elements

Using appropriate HTML elements improves accessibility and SEO:

**Landmark Elements:**
- \`<main>\`: Primary content area (one per page)
- \`<section>\`: Thematic content grouping
- \`<article>\`: Self-contained, distributable content
- \`<aside>\`: Supplementary or sidebar content
- \`<header>\`: Introductory content
- \`<footer>\`: Closing content

**Benefits:**
- Screen reader navigation
- SEO improvements
- Semantic document structure
- Better accessibility testing
        `,
      },
    },
  },
};

/**
 * Norwegian government layout patterns
 */
export const NorwegianGovernment: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">🇳🇴 Norwegian Government Layouts</h3>
      
      <div className="space-y-6">
        <Container 
          element="main" 
          maxWidth="lg" 
          background="surface"
          spacing="lg"
          nsmLevel="OPEN"
          lang="nb-NO"
          aria-label="Hovedinnhold - Søknadsskjema"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm text-muted-foreground">ÅPEN - Offentlig tilgjengelig</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Søknad om byggetillatelse</h1>
            <p className="text-muted-foreground">
              Fyll ut skjemaet nedenfor for å søke om byggetillatelse. 
              Alle felt merket med * er obligatoriske.
            </p>
            <div className="flex gap-4">
              <Button intent="primary" lang="nb-NO">Fortsett søknad</Button>
              <Button intent="outline" lang="nb-NO">Lagre utkast</Button>
            </div>
          </div>
        </Container>
        
        <Container 
          element="section" 
          maxWidth="lg" 
          background="elevated"
          spacing="lg"
          nsmLevel="RESTRICTED"
          lang="nb-NO"
          aria-labelledby="restricted-section"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" aria-hidden="true"></div>
              <span className="text-sm text-muted-foreground">BEGRENSET - Kun autorisert personell</span>
            </div>
            <h2 id="restricted-section" className="text-2xl font-bold text-foreground">
              Saksbehandling - Intern vurdering
            </h2>
            <p className="text-muted-foreground">
              Dette området er kun tilgjengelig for saksbehandlere og kommunale ansatte 
              med tilstrekkelige tilganger.
            </p>
            <div className="flex gap-4">
              <Button intent="success" lang="nb-NO">Godkjenn søknad</Button>
              <Button intent="destructive" lang="nb-NO">Avslå søknad</Button>
              <Button intent="outline" lang="nb-NO">Be om tilleggsinfo</Button>
            </div>
          </div>
        </Container>
        
        <Container 
          element="aside" 
          maxWidth="md" 
          background="surface"
          spacing="md"
          nsmLevel="OPEN"
          lang="nb-NO"
          aria-label="Tilleggsinformasjon"
        >
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Kontaktinformasjon</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Kommunens byggesaksavdeling</strong></p>
              <p>Telefon: 22 12 34 56</p>
              <p>E-post: byggesak@kommune.no</p>
              <p>Åpningstider: Man-Fre 08:00-15:30</p>
            </div>
          </div>
        </Container>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Norwegian Compliance Features</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• NSM security classification indicators</li>
          <li>• Norwegian language support (nb-NO)</li>
          <li>• Government form patterns</li>
          <li>• Municipal branding compatibility</li>
          <li>• GDPR compliant data handling</li>
          <li>• Accessibility compliance (WCAG AAA)</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Norwegian Government Layout Patterns

Real-world examples for Norwegian municipal and government applications:

**NSM Classification:**
- Visual indicators for security levels
- Color-coded classification system
- Access control integration
- Audit trail compliance

**Government Use Cases:**
- Building permit applications
- Municipal service portals
- Internal case management
- Citizen information systems

**Language Support:**
- Norwegian Bokmål (nb-NO) as primary
- Proper ARIA labels in Norwegian
- Cultural context for form patterns
- Municipal communication standards
        `,
      },
    },
  },
};

/**
 * Responsive design examples
 */
export const ResponsiveDesign: Story = {
  render: (): JSX.Element => (
    <div className="space-y-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">📱 Responsive Design Examples</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Mobile-First Layout</h4>
          <Container maxWidth="sm" background="surface" spacing="md">
            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Mobile Container (640px max)</h5>
              <p className="text-sm text-muted-foreground">
                Optimized for mobile devices with touch-friendly spacing and readable text.
              </p>
              <div className="flex flex-col gap-2">
                <Button fullWidth intent="primary">Full Width Primary</Button>
                <Button fullWidth intent="outline">Full Width Secondary</Button>
              </div>
            </div>
          </Container>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Tablet Layout</h4>
          <Container maxWidth="md" background="surface" spacing="lg">
            <div className="space-y-4">
              <h5 className="font-semibold text-foreground">Tablet Container (768px max)</h5>
              <p className="text-sm text-muted-foreground">
                Balanced layout for tablet devices with comfortable spacing and two-column options.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button intent="primary">Primary Action</Button>
                <Button intent="outline">Secondary Action</Button>
              </div>
            </div>
          </Container>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Desktop Layout</h4>
          <Container maxWidth="lg" background="surface" spacing="xl">
            <div className="space-y-6">
              <h5 className="font-semibold text-foreground">Desktop Container (1024px max)</h5>
              <p className="text-sm text-muted-foreground">
                Spacious desktop layout with generous spacing and multi-column content organization.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button intent="primary">Primary</Button>
                <Button intent="secondary">Secondary</Button>
                <Button intent="outline">Tertiary</Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
      
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Responsive Guidelines</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Mobile-first approach (320px minimum)</li>
          <li>• Touch-friendly 44px minimum targets</li>
          <li>• Readable text at all screen sizes</li>
          <li>• Flexible grid systems</li>
          <li>• Consistent spacing across breakpoints</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: `
### Responsive Design Patterns

Mobile-first responsive design following WCAG AAA guidelines:

**Breakpoint Strategy:**
- Mobile: 320px - 640px (sm)
- Tablet: 641px - 768px (md)  
- Desktop: 769px - 1024px (lg)
- Large: 1025px+ (xl, 2xl)

**Key Features:**
- Touch-friendly interactive elements
- Readable typography at all sizes
- Flexible content organization
- Consistent spacing scales
- Accessibility maintained across devices

**Implementation:**
\`\`\`tsx
<Container 
  maxWidth={{
    sm: 'sm',    // 640px on mobile
    md: 'md',    // 768px on tablet
    lg: 'lg',    // 1024px on desktop
    xl: 'xl'     // 1280px on large screens
  }}
>
  Responsive content
</Container>
\`\`\`
        `,
      },
    },
  },
};