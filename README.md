# @xala-mock/ui-system

Norwegian-compliant UI component library with WCAG 2.2 AA, NSM, and GDPR compliance.

## Overview

A production-ready, semantic, and Norwegian-compliant UI component library for use across all Xala apps (Web, Mobile, Admin, Docs). Built following the PASEPAGE principle with full accessibility and government compliance.

## Features

### 🇳🇴 Norwegian Compliance
- **NSM Classification**: Support for ÅPEN, BEGRENSET, KONFIDENSIELT, HEMMELIG
- **GDPR Compliance**: Built-in data protection and privacy features
- **WCAG 2.2 AA**: Full accessibility compliance with Norwegian standards
- **Municipality Themes**: Pre-built themes for major Norwegian cities

### 🎨 Design System
- **Design Tokens**: CSS custom properties for consistent styling
- **Norwegian Typography**: Optimized for æ, ø, å characters
- **Color Accessibility**: WCAG AA compliant contrast ratios (4.5:1)
- **Touch Targets**: 44px minimum following Norwegian mobile standards

### 🧩 Component Architecture
- **Semantic Components**: No raw HTML elements in pages
- **PASEPAGE Compliant**: Separation of data and presentation logic
- **Platform Agnostic**: Shared components for web and mobile
- **TypeScript First**: Full type safety and IntelliSense support

## Installation

```bash
pnpm add @xala-mock/ui-system
```

## Usage

### Basic Setup

```tsx
import { UISystemProvider } from '@xala-mock/ui-system';

function App() {
  return (
    <UISystemProvider 
      theme="norwegian-municipal"
      language="nb"
      municipality="Drammen"
    >
      {/* Your app components */}
    </UISystemProvider>
  );
}
```

### Using Components

```tsx
import { Button, Input, Form } from '@xala-mock/ui-system';

function ContactForm() {
  return (
    <Form>
      <Input 
        labelKey="form.name" 
        required 
        validation={{ personalNumber: false }}
      />
      <Button variant="primary" size="medium">
        Send
      </Button>
    </Form>
  );
}
```

### Norwegian-Specific Components

```tsx
import { 
  PersonalNumberInput, 
  OrganizationNumberInput 
} from '@xala-mock/ui-system';

function NorwegianForm() {
  return (
    <Form>
      <PersonalNumberInput 
        labelKey="form.personalNumber"
        required
      />
      <OrganizationNumberInput 
        labelKey="form.organizationNumber"
        enableBRREGCheck
      />
    </Form>
  );
}
```

## Municipality Themes

Supported Norwegian municipalities with pre-configured branding:

- **Drammen**: Blue (#0ea5e9) + Red (#dc2626)
- **Oslo**: Red (#dc2626) + White (#ffffff)
- **Bergen**: Navy (#0369a1) + Orange (#f59e0b)
- **Trondheim**: Green (#16a34a) + Blue (#0ea5e9)
- **Stavanger**: Purple (#7c3aed) + Red (#dc2626)

## Compliance Standards

### Accessibility (WCAG 2.2 AA)
- Color contrast ratio: 4.5:1 minimum
- Focus indicators: 2px visible outline
- Screen reader support: Semantic HTML and ARIA labels
- Keyboard navigation: Full keyboard accessibility

### Norwegian Standards (NSM)
- Data classification support
- Security level indicators
- Government branding compliance
- Municipal identity integration

### GDPR Compliance
- Data protection by design
- Privacy-first component defaults
- Audit logging capabilities
- Consent management integration

## Development

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build package
pnpm build

# Run tests
pnpm test

# Validate compliance
pnpm validate:components
pnpm test:accessibility
```

## Scripts

- `build`: Build TypeScript and generate CSS tokens
- `dev`: Start development with watch mode
- `test`: Run Jest tests with accessibility checks
- `validate:components`: Ensure no raw HTML in semantic exports
- `validate:pasepages`: Validate PASEPAGE architecture
- `generate:css`: Generate CSS from design tokens
- `generate:tokens`: Generate token definitions

## Architecture

### PASEPAGE Compliance
- **Pages**: Data orchestration only, no layout logic
- **Components**: Handle all styling, layout, and interactions
- **Tokens**: Design system values, no hardcoded styles
- **Validation**: Build-time checks for compliance

### Norwegian Integration
- **Language Support**: Bokmål (nb), Nynorsk (nn), English (en)
- **Date Formats**: dd.MM.yyyy (Norwegian standard)
- **Number Formats**: Norwegian decimal separators
- **Validation**: Personal numbers, organization numbers, postal codes

## License

MIT - See LICENSE file for details.

## Contributing

This package follows strict Norwegian compliance and accessibility standards. Please ensure all contributions maintain WCAG 2.2 AA compliance and NSM security guidelines. 