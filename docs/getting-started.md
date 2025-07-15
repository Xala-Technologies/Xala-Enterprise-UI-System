# Getting Started

## Installation

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **Package Manager**: pnpm (recommended), npm, or yarn
- **TypeScript**: 5.0.0 or higher (for TypeScript projects)
- **React**: 18.0.0 or higher

### Install the Package

```bash
# Using pnpm (recommended)
pnpm add @xala-technologies/ui-system

# Using npm
npm install @xala-technologies/ui-system

# Using yarn
yarn add @xala-technologies/ui-system
```

### Peer Dependencies

The UI system requires these peer dependencies:

```bash
pnpm add react react-dom @types/react @types/react-dom
```

## Basic Setup

### 1. Provider Setup

Wrap your application with the `UISystemProvider`:

```tsx
import React from 'react';
import { UISystemProvider } from '@xala-technologies/ui-system';
import { App } from './App';

function Root() {
  return (
    <UISystemProvider accessibility="enhanced" theme={{ mode: 'light' }} language="nb-NO">
      <App />
    </UISystemProvider>
  );
}

export default Root;
```

### 2. Import CSS Variables (Optional)

If using CSS variables for styling:

```css
/* In your main CSS file */
@import '@xala-technologies/ui-system/dist/tokens.css';
```

### 3. TypeScript Configuration

Add types to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@xala-technologies/ui-system"]
  }
}
```

## First Component

```tsx
import React from 'react';
import { Button, Container, PageLayout } from '@xala-technologies/ui-system';

function App() {
  return (
    <PageLayout>
      <Container size="lg" padding="lg">
        <h1>Welcome to Xala UI System</h1>

        <Button variant="primary" size="md" onClick={() => alert('Hello from Xala UI!')}>
          Get Started
        </Button>
      </Container>
    </PageLayout>
  );
}

export default App;
```

## Configuration Options

### UISystemProvider Props

```tsx
interface UISystemProviderProps {
  children: React.ReactNode;

  // Accessibility configuration
  accessibility?: 'basic' | 'enhanced' | 'government' | AccessibilityConfig;

  // Theme configuration
  theme?: {
    mode?: 'light' | 'dark' | 'auto';
    primary?: string;
    secondary?: string;
    customTokens?: Record<string, string>;
  };

  // Language and localization
  language?: 'nb-NO' | 'nn-NO' | 'en-NO' | 'en-US';

  // Norwegian-specific features
  municipality?: string;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';

  // Performance settings
  performance?: {
    enableVirtualization?: boolean;
    enableLazyLoading?: boolean;
    enableMemoization?: boolean;
  };
}
```

### Example Configurations

#### Government/Municipal Setup

```tsx
<UISystemProvider
  accessibility="government"
  theme={{ mode: 'light' }}
  language="nb-NO"
  municipality="Oslo"
  classification="ÅPEN"
>
  <App />
</UISystemProvider>
```

#### Enterprise Setup

```tsx
<UISystemProvider
  accessibility="enhanced"
  theme={{
    mode: 'auto',
    primary: '#1a365d',
    secondary: '#2d3748',
  }}
  language="en-US"
  performance={{
    enableVirtualization: true,
    enableLazyLoading: true,
    enableMemoization: true,
  }}
>
  <App />
</UISystemProvider>
```

#### Development Setup

```tsx
<UISystemProvider
  accessibility="basic"
  theme={{ mode: 'light' }}
  language="en-US"
  config={{
    development: {
      enableDebugMode: true,
      enablePerformanceMonitoring: true,
      enableA11yWarnings: true,
      logLevel: 'debug',
    },
  }}
>
  <App />
</UISystemProvider>
```

## Environment Variables

Create a `.env` file for configuration:

```env
# UI System Configuration
REACT_APP_UI_SYSTEM_THEME=light
REACT_APP_UI_SYSTEM_LANGUAGE=nb-NO
REACT_APP_UI_SYSTEM_MUNICIPALITY=Oslo
REACT_APP_UI_SYSTEM_CLASSIFICATION=ÅPEN

# Development Settings
REACT_APP_UI_SYSTEM_DEBUG=true
REACT_APP_UI_SYSTEM_A11Y_WARNINGS=true
```

## Component Categories

### Layout Components

```tsx
import { PageLayout, Container, Section, Grid, Stack, Card } from '@xala-technologies/ui-system';
```

### Form Components

```tsx
import {
  Form,
  Input,
  Select,
  TextArea,
  PersonalNumberInput,
  OrganizationNumberInput,
} from '@xala-technologies/ui-system';
```

### Action & Feedback Components

```tsx
import { Button, Alert, Modal, Toast } from '@xala-technologies/ui-system';
```

### Data Display Components

```tsx
import { DataTable, Badge, Tag, Tooltip, KeyValueList } from '@xala-technologies/ui-system';
```

## Norwegian-Specific Features

### Personal Number Validation

```tsx
import { PersonalNumberInput } from '@xala-technologies/ui-system';

<PersonalNumberInput
  labelKey="form.personalNumber"
  validation={{ personalNumber: true }}
  required
/>;
```

### Organization Number Validation

```tsx
import { OrganizationNumberInput } from '@xala-technologies/ui-system';

<OrganizationNumberInput labelKey="form.organizationNumber" enableBRREGCheck required />;
```

### Security Classification

```tsx
import { Button } from '@xala-technologies/ui-system';

<Button
  variant="primary"
  norwegian={{
    classification: 'KONFIDENSIELT',
    requiresConfirmation: true,
  }}
>
  Sensitive Action
</Button>;
```

## Styling Approaches

### 1. Design Tokens (Recommended)

```tsx
<Button variant="primary" size="md" className="custom-button">
  Click me
</Button>
```

```css
.custom-button {
  margin: var(--spacing-md);
  border-radius: var(--border-radius-lg);
}
```

### 2. CSS Variables

```css
:root {
  --primary-color: #1a365d;
  --secondary-color: #2d3748;
  --success-color: #38a169;
}
```

### 3. Theme Customization

```tsx
const customTheme = {
  mode: 'light',
  primary: '#1a365d',
  secondary: '#2d3748',
  customTokens: {
    'brand-color': '#ff6b35',
    'accent-color': '#4a90e2',
  },
};

<UISystemProvider theme={customTheme}>
  <App />
</UISystemProvider>;
```

## Common Patterns

### Form with Norwegian Validation

```tsx
import { Form, Input, PersonalNumberInput, Button } from '@xala-technologies/ui-system';

function ContactForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <Input labelKey="form.firstName" required validation={{ minLength: 2 }} />

      <Input labelKey="form.lastName" required validation={{ minLength: 2 }} />

      <PersonalNumberInput
        labelKey="form.personalNumber"
        required
        validation={{ personalNumber: true }}
      />

      <Button type="submit" variant="primary">
        Send
      </Button>
    </Form>
  );
}
```

### Layout with Municipality Branding

```tsx
import { PageLayout, Container, Section } from '@xala-technologies/ui-system';

function MunicipalPage() {
  return (
    <PageLayout variant="municipal" norwegian={{ municipality: 'Oslo' }}>
      <Container size="xl">
        <Section spacing="lg">
          <h1>Municipal Services</h1>
          {/* Content */}
        </Section>
      </Container>
    </PageLayout>
  );
}
```

### Data Table with Accessibility

```tsx
import { DataTable } from '@xala-technologies/ui-system';

const columns = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'email', label: 'Email', sortable: true },
  { id: 'role', label: 'Role', sortable: false },
];

function UserTable() {
  return (
    <DataTable
      columns={columns}
      data={users}
      pagination={{ pageSize: 10 }}
      sorting={{ defaultSort: 'name' }}
      accessibility={{
        ariaLabel: 'User list table',
        describedBy: 'user-table-description',
      }}
    />
  );
}
```

## Next Steps

1. **Explore Components**: Check out [Component Documentation](./components/) for detailed guides
2. **Accessibility**: Read [Accessibility Guide](./accessibility.md) for WCAG compliance
3. **Norwegian Features**: Learn about [Norwegian Compliance](./norwegian-compliance.md)
4. **Customization**: See [Theming Guide](./theming.md) for custom themes
5. **Testing**: Review [Testing Guide](./testing.md) for testing strategies

## Troubleshooting

### Common Issues

**TypeScript errors with components:**

```bash
# Make sure types are installed
pnpm add -D @types/react @types/react-dom

# Update tsconfig.json to include UI system types
```

**CSS variables not working:**

```tsx
// Make sure UISystemProvider is at the root
<UISystemProvider>
  <App />
</UISystemProvider>
```

**Accessibility warnings:**

```tsx
// Enable accessibility warnings in development
<UISystemProvider
  config={{
    development: { enableA11yWarnings: true },
  }}
>
  <App />
</UISystemProvider>
```

For more detailed troubleshooting, see [Troubleshooting Guide](./troubleshooting.md).

---

**Next**: Learn about the [Architecture Overview](./architecture.md) to understand the system design.
