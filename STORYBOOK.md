# Storybook Documentation - Xala Enterprise UI System

## Overview

The Xala Enterprise UI System includes comprehensive Storybook documentation with interactive component examples, Norwegian compliance patterns, and enterprise-grade use cases.

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start Storybook development server
pnpm run storybook

# Build static Storybook
pnpm run build-storybook
```

Storybook will be available at: http://localhost:6006

## Project Structure

```
.storybook/
├── main.ts              # Core configuration
├── preview.ts           # Global decorators and parameters
├── theme.ts             # Custom theme configuration
└── manager.ts           # UI configuration

stories/
├── foundation/          # Design tokens and core elements
│   └── DesignTokens.stories.tsx
├── ui/                  # UI component stories
│   ├── Button.stories.tsx
│   ├── Input.stories.tsx
│   ├── Card.stories.tsx
│   └── Alert.stories.tsx
├── semantic/            # Semantic component stories
│   └── Container.stories.tsx
├── layout/              # Layout component stories
│   └── Grid.stories.tsx
├── patterns/            # Complete UI patterns
│   └── FormPatterns.stories.tsx
├── templates/           # Full page templates
└── examples/            # Complete application examples
    └── CompleteApplications.stories.tsx
```

## Story Categories

### 📚 Foundation
Core design system elements:
- **Design Tokens** - Colors, spacing, typography, shadows
- **Accessibility** - WCAG AAA guidelines and examples
- **Themes** - Light, dark, high-contrast, municipal themes

### 🎯 UI Components
Pure presentational components:
- **Button** - All variants, states, loading, accessibility
- **Input** - Types, validation, Norwegian formats
- **Card** - Layouts, interactive states, media cards
- **Alert** - Types, dismissible, actions, Norwegian messages
- **And 12+ more components**

### 🏗️ Semantic Components
Enhanced components with business logic:
- **Container** - Responsive layouts, semantic HTML
- **Box** - Flexible containers with spacing
- **Heading** - Typography hierarchy
- **Text** - Semantic text components

### 📐 Layout Components
Complex layout systems:
- **Grid** - 12-column system, auto-fit/fill, responsive
- **Stack** - Vertical/horizontal stacking
- **Dashboard** - Enterprise dashboard layouts
- **PageLayout** - Full page templates

### 🎨 Patterns
Common UI patterns:
- **Form Patterns** - Norwegian forms, validation, multi-step
- **Navigation Patterns** - Headers, sidebars, breadcrumbs
- **Data Display** - Tables, lists, cards
- **Feedback Patterns** - Loading, errors, success

### 📄 Examples
Complete application examples:
- **Government Portal** - Norwegian municipal services
- **Enterprise Dashboard** - Business intelligence
- **E-commerce Platform** - Shopping experience
- **Healthcare System** - Patient management

## Features

### 🇳🇴 Norwegian Compliance

All components include Norwegian compliance examples:

- **NSM Classification** - OPEN, RESTRICTED, CONFIDENTIAL, SECRET
- **Norwegian Formats**:
  - Fødselsnummer (11-digit personal ID)
  - Organisasjonsnummer (9-digit org ID)
  - Phone numbers (+47 format)
  - Postal codes (4-digit)
  - Currency (NOK)
  - Bank accounts

- **Government Patterns**:
  - Municipal service cards
  - Building permit applications
  - Tax forms and declarations
  - Healthcare services

- **Language Support**:
  - Norwegian Bokmål (nb-NO)
  - English (en-US)
  - French (fr-FR)
  - Arabic (ar-SA) with RTL

### ♿ WCAG AAA Accessibility

Every component meets WCAG AAA standards:

- **Color Contrast**: 7:1 for normal text, 4.5:1 for large text
- **Touch Targets**: Minimum 44px for all interactive elements
- **Keyboard Navigation**: Full keyboard support with visible focus
- **Screen Readers**: Proper ARIA labels and live regions
- **Focus Management**: Logical tab order and focus trapping

### 🎨 Design System Integration

Complete token-based design system:

- **Colors**: Semantic color tokens (primary, secondary, destructive, etc.)
- **Spacing**: 8pt grid system (space-1 through space-24)
- **Typography**: Scale from text-xs to text-6xl
- **Shadows**: Elevation system from xs to 2xl
- **Borders**: Consistent radius and width tokens

### 🔧 Interactive Controls

Every story includes:

- **Controls Panel**: Interactive prop controls
- **Actions Tab**: Event logging
- **Viewport Addon**: Responsive testing
- **Backgrounds**: Theme testing
- **A11y Tab**: Accessibility violations

## Writing Stories

### Basic Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from '../src/components/Component';

const meta: Meta<typeof Component> = {
  title: 'Category/Component Name',
  component: Component,
  parameters: {
    docs: {
      description: {
        component: 'Component description...'
      }
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true }
        ]
      }
    }
  },
  argTypes: {
    // Define controls for props
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Visual variant',
      table: {
        category: 'Design',
        defaultValue: { summary: 'primary' }
      }
    }
  },
  args: {
    // Default prop values
    variant: 'primary'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Default content'
  }
};

// Variant showcase
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Component variant="primary">Primary</Component>
      <Component variant="secondary">Secondary</Component>
    </div>
  )
};
```

### Norwegian Compliance Story

```typescript
export const NorwegianExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Component 
        nsmLevel="RESTRICTED"
        lang="nb-NO"
        aria-label="Norsk eksempel"
      >
        Eksempel med norsk innhold
      </Component>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Norwegian government compliance example'
      }
    }
  }
};
```

## Best Practices

### Component Organization

1. **Group by Category**: Use proper title hierarchy (e.g., `UI Components/Button`)
2. **Default Story First**: Always include a default story with controls
3. **Showcase Variants**: Create stories for all component variants
4. **Include States**: Show loading, error, success, disabled states
5. **Add Accessibility**: Include ARIA examples and keyboard navigation
6. **Norwegian Examples**: Add Norwegian format and compliance examples

### Documentation

1. **Component Description**: Use the `docs.description.component` parameter
2. **Story Descriptions**: Add context for each story variant
3. **Code Examples**: Include usage examples in descriptions
4. **Accessibility Notes**: Document WCAG compliance details
5. **Norwegian Context**: Explain government/municipal use cases

### Testing

1. **Visual Testing**: Use different viewport sizes
2. **Interaction Testing**: Test all interactive elements
3. **Accessibility Testing**: Check a11y panel for violations
4. **Theme Testing**: Test with different backgrounds
5. **Responsive Testing**: Use viewport addon for breakpoints

## Configuration

### Theme Customization

Edit `.storybook/theme.ts` to customize the Storybook UI:

```typescript
export default create({
  base: 'light',
  brandTitle: 'Your Brand',
  brandUrl: 'https://your-url.com',
  brandImage: '/logo.png',
  // Custom colors
  colorPrimary: '#0062ba',
  colorSecondary: '#38bdf8',
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace'
});
```

### Global Decorators

Add global decorators in `.storybook/preview.ts`:

```typescript
export const decorators = [
  (Story) => (
    <div className="custom-wrapper">
      <Story />
    </div>
  )
];
```

### Addon Configuration

Configure addons in `.storybook/main.ts`:

```typescript
const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    // Add more addons
  ]
};
```

## Deployment

### Build for Production

```bash
# Build static Storybook
pnpm run build-storybook

# Output will be in storybook-static/
```

### Deploy to Static Hosting

The built Storybook can be deployed to any static hosting service:

- **GitHub Pages**: Push to gh-pages branch
- **Netlify**: Connect repository and set build command
- **Vercel**: Import project with Storybook preset
- **AWS S3**: Upload storybook-static/ to S3 bucket

### CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/storybook.yml
name: Storybook
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm run build-storybook
      - run: pnpm run test-storybook # If using test runner
```

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Use different port
   pnpm run storybook -- -p 6007
   ```

2. **Build Errors**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules storybook-static
   pnpm install
   pnpm run build-storybook
   ```

3. **Component Not Showing**
   - Check story file location matches pattern in main.ts
   - Verify export default and named exports
   - Check for TypeScript errors

4. **Styling Issues**
   - Ensure Tailwind CSS is imported in preview.ts
   - Check PostCSS configuration
   - Verify design tokens are loaded

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format](https://storybook.js.org/docs/react/api/csf)
- [Addon Gallery](https://storybook.js.org/addons)
- [Norwegian Design System](https://design.nav.no)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)

---

**Xala Enterprise UI System v6.1.0**  
*Norwegian Compliance • WCAG AAA • Enterprise Grade*