/**
 * Documentation Generator for Xala UI System
 */

import type { ComponentConfig } from '../types/index.js';

export class DocumentationGenerator {
  public generateDocumentation(config: ComponentConfig): string {
    const { name, category, variant } = config;
    
    return `
# ${name}

A ${category} component built with Xala UI System v5.0.0.

## Usage

\`\`\`tsx
import { ${name} } from './components/${name}';

function App() {
  return (
    <${name} 
      variant="${variant || 'default'}"
      size="md"
    />
  );
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'default' | Visual variant of the component |
| size | string | 'md' | Size of the component |
| disabled | boolean | false | Whether the component is disabled |

## Accessibility

This component follows WCAG 2.2 AAA guidelines:

- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ High contrast mode support
- ✅ Focus management
- ✅ ARIA labels and descriptions

## Localization

The component supports multiple languages:

- 🇺🇸 English (en)
- 🇳🇴 Norwegian Bokmål (no)
- 🇫🇷 French (fr)
- 🇸🇦 Arabic (ar) with RTL support

## Examples

### Basic Usage

\`\`\`tsx
<${name} />
\`\`\`

### With Custom Props

\`\`\`tsx
<${name} 
  variant="outline"
  size="lg"
  disabled={false}
/>
\`\`\`

### Interactive Example

\`\`\`tsx
function InteractiveExample() {
  const [value, setValue] = useState('');
  
  return (
    <${name} 
      value={value}
      onChange={setValue}
    />
  );
}
\`\`\`

## Design Tokens

This component uses the following design tokens:

- Colors: \`tokens.colors.primary\`, \`tokens.colors.surface\`
- Spacing: \`tokens.spacing.md\`, \`tokens.spacing.sm\`
- Typography: \`tokens.typography.body\`
- Border Radius: \`tokens.borderRadius.md\`

## Related Components

- [Button](./Button.md)
- [Input](./Input.md)
- [Card](./Card.md)
`;
  }
}
