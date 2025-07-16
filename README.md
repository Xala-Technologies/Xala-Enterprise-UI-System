# Xala Technologies UI System v4.7.1

> **Enterprise-grade, SSR-safe UI component library with Norwegian compliance and multiplatform support**

[![npm version](https://badge.fury.io/js/%40xala-technologies%2Fui-system.svg)](https://badge.fury.io/js/%40xala-technologies%2Fui-system)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![SSR Safe](https://img.shields.io/badge/SSR-Safe-green.svg)](https://nextjs.org/)
[![Norwegian Compliance](https://img.shields.io/badge/Norwegian-Compliant-red.svg)](https://www.digdir.no/)

## Overview

A production-ready UI component library built for enterprise applications with Norwegian government compliance, full SSR compatibility, and comprehensive multiplatform support. Features 161+ semantic components, design token system, and specialized chat interface components.

## Key Features

### 🏛️ **Norwegian Enterprise Compliance**

- **NSM Classification**: ÅPEN, BEGRENSET, KONFIDENSIELT, HEMMELIG support
- **DigDir Standards**: Complete compliance with Norwegian digital standards
- **WCAG 2.2 AAA**: Full accessibility compliance
- **GDPR Ready**: Built-in privacy and data protection features

### 🌐 **Multiplatform Architecture**

- **Web Applications**: React/Next.js optimized layouts
- **Mobile Apps**: Touch-friendly components and responsive design
- **Desktop Applications**: Electron-compatible layouts
- **SSR/SSG**: Full server-side rendering support

### 🎨 **Design Token System**

- **Semantic Tokens**: `bg-primary`, `text-foreground`, `border-border`
- **Norwegian Color Palette**: Government-compliant color schemes
- **Dynamic Theming**: Light/dark mode with municipal themes
- **CSS Variables**: Complete design token integration

### 💬 **Chat Interface Components**

- **MessageBubble**: Specialized chat messages with avatars and metadata
- **CodeBlock**: 20+ programming languages with syntax highlighting
- **ActionBar**: 15+ predefined actions with Norwegian translations
- **ScrollArea**: Smooth message scrolling
- **Box**: Flexible layout containers
- **Separator**: Visual message grouping

### 🧩 **161+ Components**

- **Layout**: PageLayout, Section, Container, Grid, Stack, Card
- **Forms**: Input, Select, Textarea with Norwegian validation
- **Data Display**: DataTable, Badge, Tooltip, Avatar
- **Navigation**: Breadcrumb, Pagination, Tabs, CommandPalette
- **Feedback**: Alert, Toast, Modal, Progress, Skeleton

## Quick Installation

```bash
# Using npm
npm install @xala-technologies/ui-system

# Using pnpm (recommended)
pnpm add @xala-technologies/ui-system

# Using yarn
yarn add @xala-technologies/ui-system
```

## Basic Setup

```tsx
import { DesignSystemProvider, PageLayout, Button } from '@xala-technologies/ui-system';

function App() {
  return (
    <DesignSystemProvider>
      <PageLayout>
        <Button variant="primary">Kom i gang</Button>
      </PageLayout>
    </DesignSystemProvider>
  );
}
```

## Platform-Specific Quick Start Guides

- **[Web Applications Guide](./docs/quick-start/web-applications.md)** - React, Next.js, Remix
- **[Mobile Applications Guide](./docs/quick-start/mobile-applications.md)** - React Native, Expo
- **[Desktop Applications Guide](./docs/quick-start/desktop-applications.md)** - Electron, Tauri
- **[Chat Interface Guide](./docs/quick-start/chat-interfaces.md)** - AI Chat, Messaging Apps

## Documentation

### 📚 **Core Documentation**

- **[Architecture Guide](./docs/architecture.md)** - System design and patterns
- **[Component Library](./docs/components/README.md)** - Complete component reference
- **[Design Tokens](./docs/design-tokens.md)** - Token system and theming
- **[Norwegian Compliance](./docs/norwegian-compliance.md)** - Government standards

### 🛠️ **Implementation Guides**

- **[Getting Started](./docs/getting-started.md)** - First steps and setup
- **[Layout System](./docs/layouts/README.md)** - Responsive layout patterns
- **[Form Validation](./docs/forms/validation.md)** - Norwegian number validation
- **[Accessibility](./docs/accessibility/README.md)** - WCAG 2.2 AAA compliance

### 🎯 **Advanced Topics**

- **[SSR Compatibility](./docs/ssr-best-practices.md)** - Server-side rendering
- **[Performance](./docs/performance.md)** - Optimization strategies
- **[Testing](./docs/testing/README.md)** - Component testing patterns
- **[Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## Design Principles

### 🚫 **No Raw HTML**

```tsx
// ❌ Avoid raw HTML elements
<div className="flex gap-4">
  <span>Text content</span>
</div>

// ✅ Use semantic components
<Stack direction="row" gap="4">
  <Text>Text content</Text>
</Stack>
```

### 🎨 **Design Tokens Only**

```tsx
// ❌ Avoid hardcoded styles
<Button style={{ backgroundColor: '#1976d2', padding: '16px' }}>

// ✅ Use semantic design tokens
<Button variant="primary" size="lg">
```

### 🏗️ **Composition Pattern**

```tsx
// ✅ Compose layouts semantically
<PageLayout>
  <Section variant="hero">
    <Container>
      <Stack direction="col" gap="6" align="center">
        <Heading level={1}>Velkommen</Heading>
        <Text variant="lead">Enterprise-grade Norwegian application</Text>
        <Button variant="primary" size="lg">
          Kom i gang
        </Button>
      </Stack>
    </Container>
  </Section>
</PageLayout>
```

## Norwegian Compliance Features

### 🏛️ **NSM Classification System**

```tsx
<ClassificationIndicator level="KONFIDENSIELT" />
<MessageBubble classification="BEGRENSET">
  Sensitive business information
</MessageBubble>
```

### 📝 **Norwegian Form Validation**

```tsx
<PersonalNumberInput
  placeholder="Fødselsnummer (11 siffer)"
  validation="strict"
/>
<OrganizationNumberInput
  placeholder="Organisasjonsnummer (9 siffer)"
  brreg={true}
/>
```

### 🌐 **Localization Support**

```tsx
<DesignSystemProvider locale="nb-NO" fallback="en">
  <Button>{t('common.submit')}</Button> {/* "Send inn" */}
</DesignSystemProvider>
```

## Version History

- **v4.7.1** - Chat interface components export fix
- **v4.7.0** - Major chat interface components release
- **v4.6.x** - SSR compatibility and module system fixes
- **v4.5.x** - Norwegian compliance and design token system
- **v4.0.x** - Enterprise architecture and multiplatform support

## Enterprise Support

**Xala Technologies AS** provides enterprise support for Norwegian government and business applications:

- 🏛️ **Government Compliance**: NSM, DigDir, WCAG 2.2 AAA certification
- 🔒 **Security**: ISO27001, GDPR compliance consulting
- 🚀 **Implementation**: Architecture consulting and migration support
- 📞 **Support**: Priority enterprise support channels

## Contributing

We welcome contributions! Please read our [Contributing Guide](./CONTRIBUTING.md) and [Code of Conduct](./CODE_OF_CONDUCT.md).

## License

MIT License - see [LICENSE](./LICENSE) file for details.

---

**Built with ❤️ in Norway 🇳🇴 for enterprise applications worldwide**
