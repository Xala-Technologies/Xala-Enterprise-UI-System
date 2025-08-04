# Xala Enterprise UI System - Storybook Documentation

## Overview

This directory contains comprehensive Storybook documentation for the Xala Enterprise UI System v6.0.0, featuring Norwegian compliance, WCAG AAA accessibility, and enterprise-grade components.

## Story Organization

### 📚 Foundation
Core design system elements and tokens:
- **Design Tokens** - Color palettes, spacing, typography scales
- **Colors** - Enterprise color system with Norwegian compliance
- **Typography** - Font families, scales, and semantic text styles  
- **Spacing** - 8pt grid system and semantic spacing tokens
- **Accessibility** - WCAG AAA compliance examples and guidelines

### 🎯 UI Components  
Pure presentational components using CVA variants:
- **Button** - All intents, sizes, states, and accessibility examples
- **Input** - Form inputs with validation and Norwegian formats
- **Card** - Layout containers with enterprise styling
- **Alert** - Notification and feedback components
- **And 12+ more UI primitives**

### 🏗️ Semantic Components
Enhanced components with business logic and enterprise patterns:
- **Container** - Layout containers with responsive behavior
- **Box** - Flexible container with semantic spacing
- **Heading** - Semantic heading hierarchy with enterprise typography
- **Text** - Text components with Norwegian localization
- **And 8+ more semantic elements**

### 📐 Layout Components
Complex layout systems and compositions:
- **Grid** - Responsive grid system with breakpoint controls
- **Stack** - Vertical and horizontal stacking with spacing
- **Dashboard** - Enterprise dashboard layouts
- **PageLayout** - Full page layout templates
- **And 3+ more layout systems**

### 🎨 Patterns  
Common UI patterns and compositions:
- **Form Layouts** - Norwegian government form patterns
- **Navigation Patterns** - Municipal and enterprise navigation
- **Data Display** - Tables, lists, and data visualization
- **Feedback Patterns** - Loading states, error handling

### 📄 Templates
Complete page templates and applications:
- **Government Portal** - Norwegian municipal templates
- **Enterprise Dashboard** - Business intelligence layouts
- **E-commerce** - Commercial application templates
- **Healthcare** - Medical compliance templates

### 💡 Examples
Real-world usage examples and integration guides:
- **Norwegian Compliance** - NSM classification examples
- **Accessibility** - WCAG AAA implementation guides
- **Responsive Design** - Mobile-first implementation
- **Performance** - Optimization examples

## Enterprise Features

### 🛡️ Norwegian Compliance
- **NSM Classification** - OPEN, RESTRICTED, CONFIDENTIAL, SECRET
- **GDPR Compliance** - Data protection examples  
- **Government Standards** - Municipal and healthcare patterns
- **Audit Trails** - Enterprise logging and tracking

### ♿ WCAG AAA Accessibility
- **Color Contrast** - 7:1 ratio for normal text, 4.5:1 for large text
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader** - ARIA labels and semantic structure
- **Focus Management** - Visible focus indicators

### 🌍 Internationalization  
- **Norwegian Bokmål** (nb-NO) - Primary language
- **English** (en-US) - Secondary language
- **French** (fr-FR) - International support
- **Arabic** (ar-SA) - RTL language support

### 🎨 Enterprise Themes
- **Light** - Standard light theme
- **Dark** - Reduced eye strain theme
- **High Contrast** - WCAG accessibility theme
- **Municipal** - Norwegian government branding
- **Oslo/Bergen** - City-specific themes

## Usage Guidelines

### Story Structure
Each component follows this structure:
```typescript
export default {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    docs: { description: { component: 'Description...' } },
    a11y: { config: { rules: [...] } }
  },
  argTypes: { /* Enhanced controls */ }
} satisfies Meta<typeof ComponentName>;
```

### Naming Conventions
- **Categories**: Foundation, UI Components, Semantic Components, etc.
- **Stories**: Default, Variants, States, Accessibility, Use Cases
- **Props**: intent, size, nsmLevel, lang for consistency

### Compliance Requirements
- All stories must pass WCAG AAA accessibility tests
- Norwegian text examples where applicable
- NSM classification examples for enterprise use
- Mobile-first responsive design
- SSR-safe implementation (no client hooks)

### Development Standards
- TypeScript strict mode with explicit return types
- Zero ESLint warnings
- CVA variants for styling consistency  
- Design token usage (no hardcoded values)
- Maximum 200 lines per story file

## Running Storybook

```bash
# Development server
pnpm run storybook

# Build static documentation
pnpm run build-storybook

# Type checking  
pnpm run type-check

# Linting
pnpm run lint
```

## Contributing

When adding new stories:
1. Follow the established directory structure
2. Use the component templates for consistency
3. Include accessibility examples
4. Add Norwegian compliance examples where relevant
5. Test with all enterprise themes
6. Verify WCAG AAA compliance
7. Document usage guidelines

---

**Xala Enterprise UI System v6.0.0**  
*Norwegian Compliance • WCAG AAA • Enterprise Grade*