# Xala UI System v6.0 - Token & Theme System Documentation

## 🎨 Comprehensive Token Architecture

This document provides accurate documentation of the token system, themes, and design system architecture actually implemented in v6.0.

---

## 📊 Token System Overview

### Three-Layer Token Architecture

```
┌─────────────────────────────────────────────┐
│         Component Tokens (Layer 3)          │
│    Component-specific design decisions      │
├─────────────────────────────────────────────┤
│         Semantic Tokens (Layer 2)           │
│    Contextual meaning and usage             │
├─────────────────────────────────────────────┤
│         Primitive Tokens (Layer 1)          │
│    Raw values and base definitions          │
└─────────────────────────────────────────────┘
```

---

## 🎯 Token Categories

### 1. Primitive Tokens (`/tokens/base.ts`)
Raw design values that form the foundation.

```typescript
// Color Primitives
const colors = {
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  green: { /* Success colors */ },
  red: { /* Error/destructive colors */ },
  yellow: { /* Warning colors */ },
}

// Spacing Primitives (8pt grid)
const spacing = {
  0: '0px',
  1: '4px',   // 0.25rem
  2: '8px',   // 0.5rem
  3: '12px',  // 0.75rem
  4: '16px',  // 1rem
  5: '20px',  // 1.25rem
  6: '24px',  // 1.5rem
  8: '32px',  // 2rem
  10: '40px', // 2.5rem
  12: '48px', // 3rem
  16: '64px', // 4rem
  20: '80px', // 5rem
  24: '96px', // 6rem
}

// Typography Primitives
const typography = {
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
}
```

### 2. Semantic Tokens (`/tokens/semantic/`)
Tokens with contextual meaning.

#### Colors (`/tokens/semantic/colors.ts`)
```typescript
const semanticColors = {
  // Brand colors
  primary: 'var(--color-blue-600)',
  'primary-foreground': 'var(--color-white)',
  secondary: 'var(--color-gray-100)',
  'secondary-foreground': 'var(--color-gray-900)',
  
  // Surface colors
  background: 'var(--color-white)',
  foreground: 'var(--color-gray-900)',
  card: 'var(--color-white)',
  'card-foreground': 'var(--color-gray-900)',
  popover: 'var(--color-white)',
  'popover-foreground': 'var(--color-gray-900)',
  
  // State colors
  muted: 'var(--color-gray-100)',
  'muted-foreground': 'var(--color-gray-500)',
  accent: 'var(--color-gray-100)',
  'accent-foreground': 'var(--color-gray-900)',
  
  // Semantic states
  destructive: 'var(--color-red-500)',
  'destructive-foreground': 'var(--color-white)',
  success: 'var(--color-green-500)',
  'success-foreground': 'var(--color-white)',
  warning: 'var(--color-yellow-500)',
  'warning-foreground': 'var(--color-gray-900)',
  info: 'var(--color-blue-500)',
  'info-foreground': 'var(--color-white)',
  
  // Borders and dividers
  border: 'var(--color-gray-200)',
  input: 'var(--color-gray-300)',
  ring: 'var(--color-blue-500)',
}
```

#### Spacing (`/tokens/semantic/spacing.ts`)
```typescript
const semanticSpacing = {
  // Component padding
  'button-padding-x': 'var(--spacing-4)',
  'button-padding-y': 'var(--spacing-2)',
  'input-padding-x': 'var(--spacing-3)',
  'input-padding-y': 'var(--spacing-2)',
  'card-padding': 'var(--spacing-6)',
  
  // Layout spacing
  'section-gap': 'var(--spacing-8)',
  'container-padding': 'var(--spacing-6)',
  'stack-gap-sm': 'var(--spacing-2)',
  'stack-gap-md': 'var(--spacing-4)',
  'stack-gap-lg': 'var(--spacing-6)',
  'grid-gap': 'var(--spacing-4)',
}
```

#### Typography (`/tokens/semantic/typography.ts`)
```typescript
const semanticTypography = {
  // Headings
  'heading-1': {
    size: 'var(--font-size-4xl)',
    weight: 'var(--font-weight-bold)',
    lineHeight: 'var(--line-height-tight)',
  },
  'heading-2': {
    size: 'var(--font-size-3xl)',
    weight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-tight)',
  },
  'heading-3': {
    size: 'var(--font-size-2xl)',
    weight: 'var(--font-weight-semibold)',
    lineHeight: 'var(--line-height-normal)',
  },
  
  // Body text
  'body': {
    size: 'var(--font-size-base)',
    weight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-normal)',
  },
  'body-small': {
    size: 'var(--font-size-sm)',
    weight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-normal)',
  },
  
  // UI text
  'label': {
    size: 'var(--font-size-sm)',
    weight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-normal)',
  },
  'caption': {
    size: 'var(--font-size-xs)',
    weight: 'var(--font-weight-normal)',
    lineHeight: 'var(--line-height-normal)',
  },
}
```

### 3. Component Tokens (`/tokens/component-tokens.ts`)
Component-specific design decisions.

```typescript
const componentTokens = {
  button: {
    // Sizing
    'height-sm': '32px',
    'height-md': '40px',
    'height-lg': '48px',
    'padding-x-sm': 'var(--spacing-3)',
    'padding-x-md': 'var(--spacing-4)',
    'padding-x-lg': 'var(--spacing-6)',
    
    // Typography
    'font-size-sm': 'var(--font-size-sm)',
    'font-size-md': 'var(--font-size-base)',
    'font-size-lg': 'var(--font-size-lg)',
    
    // Effects
    'border-radius': 'var(--radius-md)',
    'focus-ring-width': '2px',
    'focus-ring-offset': '2px',
  },
  
  input: {
    'height-sm': '36px',
    'height-md': '40px',
    'height-lg': '48px',
    'border-width': '1px',
    'border-radius': 'var(--radius-md)',
  },
  
  card: {
    'padding-sm': 'var(--spacing-4)',
    'padding-md': 'var(--spacing-6)',
    'padding-lg': 'var(--spacing-8)',
    'border-radius': 'var(--radius-lg)',
    'shadow': 'var(--shadow-md)',
  },
}
```

---

## 🎨 Theme System

### Available Themes

The system includes 20 pre-built themes (10 light + 10 dark variants):

| Theme Category | Light Theme | Dark Theme | Use Case |
|----------------|-------------|------------|----------|
| **Base** | `base-light` | `base-dark` | Default system theme |
| **Oslo** | `oslo-light` | `oslo-dark` | Oslo municipality branding |
| **Bergen** | `bergen-light` | `bergen-dark` | Bergen municipality branding |
| **Drammen** | `drammen-light` | `drammen-dark` | Drammen municipality branding |
| **Enterprise** | `enterprise-light` | `enterprise-dark` | Corporate applications |
| **Finance** | `finance-light` | `finance-dark` | Banking & financial services |
| **Healthcare** | `healthcare-light` | `healthcare-dark` | Medical & health applications |
| **Education** | `education-light` | `education-dark` | Educational platforms |
| **E-commerce** | `ecommerce-light` | `ecommerce-dark` | Online retail |
| **Productivity** | `productivity-light` | `productivity-dark` | Productivity tools |

### Theme Structure Example

```json
// bergen-light.json
{
  "name": "Bergen Light",
  "mode": "light",
  "colors": {
    "primary": "#0056A0",        // Bergen blue
    "primary-foreground": "#FFFFFF",
    "secondary": "#F4F4F4",
    "secondary-foreground": "#1A1A1A",
    "background": "#FFFFFF",
    "foreground": "#1A1A1A",
    "muted": "#F5F5F5",
    "muted-foreground": "#6B7280",
    "accent": "#E3F2FD",
    "accent-foreground": "#0056A0",
    "destructive": "#DC2626",
    "destructive-foreground": "#FFFFFF",
    "border": "#E5E7EB",
    "input": "#E5E7EB",
    "ring": "#0056A0"
  },
  "spacing": {
    "base": 8,
    "scale": [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96]
  },
  "typography": {
    "fontFamily": {
      "sans": "Inter, system-ui, sans-serif",
      "mono": "JetBrains Mono, monospace"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem"
    }
  },
  "radius": {
    "sm": "0.25rem",
    "md": "0.375rem",
    "lg": "0.5rem",
    "xl": "0.75rem",
    "full": "9999px"
  },
  "shadows": {
    "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"
  }
}
```

### Theme Implementation

Themes are applied through CSS custom properties:

```css
/* Light theme CSS variables */
:root {
  --color-primary: #0056A0;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #F4F4F4;
  --color-secondary-foreground: #1A1A1A;
  --color-background: #FFFFFF;
  --color-foreground: #1A1A1A;
  /* ... more tokens ... */
}

/* Dark theme CSS variables */
[data-theme="dark"] {
  --color-primary: #3B82F6;
  --color-primary-foreground: #FFFFFF;
  --color-secondary: #1F2937;
  --color-secondary-foreground: #F9FAFB;
  --color-background: #111827;
  --color-foreground: #F9FAFB;
  /* ... more tokens ... */
}
```

---

## 🔧 Token Transformers

### CSS Variables Transformer (`/tokens/transformers/css-variables.ts`)
Converts tokens to CSS custom properties.

```typescript
// Input tokens
const tokens = {
  colors: { primary: '#3B82F6' },
  spacing: { md: '16px' }
}

// Output CSS
:root {
  --color-primary: #3B82F6;
  --spacing-md: 16px;
}
```

### Tailwind Config Transformer (`/tokens/transformers/tailwind-config.ts`)
Generates Tailwind configuration from tokens.

```typescript
// Generated Tailwind config
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)',
        // ... more colors
      },
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        // ... 8pt grid
      },
    },
  },
}
```

### TypeScript Types Transformer (`/tokens/transformers/typescript-types.ts`)
Generates type definitions from tokens.

```typescript
// Generated TypeScript types
export interface DesignTokens {
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    // ... more colors
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    // ... more spacing
  };
  // ... more token categories
}
```

---

## 🎯 Token Usage in Components

### Using Semantic Tokens in CVA Components

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  // Base classes with semantic tokens
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        // Using semantic color tokens
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        // Using semantic spacing tokens
        sm: 'h-9 px-3 text-xs',  // 36px height, 12px padding
        md: 'h-10 px-4 py-2',     // 40px height, 16px padding
        lg: 'h-11 px-8',          // 44px height, 32px padding
      },
    },
  }
);
```

### Token Usage in Styled Components

```typescript
// Card component with token-based styling
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'elevated', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles with tokens
          'rounded-lg bg-card text-card-foreground',
          // Variant styles
          variant === 'elevated' && 'shadow-lg',
          variant === 'outlined' && 'border border-border',
          variant === 'flat' && 'shadow-none',
          className
        )}
        {...props}
      />
    );
  }
);
```

---

## 🚀 Runtime Token System

### Dynamic Token Loading (`/tokens/dynamic-token-loader/`)

The system supports runtime token loading for multi-tenant applications:

```typescript
import { TokenLoader } from '@/tokens/dynamic-token-loader';

// Load tenant-specific tokens
const loader = new TokenLoader();
const tokens = await loader.loadTenantTokens('bergen-municipality');

// Apply tokens at runtime
document.documentElement.style.setProperty('--color-primary', tokens.colors.primary);
```

### Token Caching (`/tokens/dynamic-token-loader/cache-manager.ts`)

```typescript
const cacheManager = new CacheManager({
  maxAge: 3600000, // 1 hour
  maxSize: 100,    // Maximum cached themes
});

// Cached token retrieval
const cachedTokens = cacheManager.get('bergen-light');
```

---

## 📊 Token Validation System

### Token Validator (`/tokens/validation/token-validator.ts`)

Ensures token integrity and compliance:

```typescript
import { TokenValidator } from '@/tokens/validation';

const validator = new TokenValidator();

// Validate color contrast for WCAG compliance
validator.validateColorContrast({
  foreground: '#FFFFFF',
  background: '#3B82F6',
  level: 'AAA', // Requires 7:1 contrast ratio
});

// Validate spacing follows 8pt grid
validator.validateSpacing(16); // ✅ Valid (multiple of 8)
validator.validateSpacing(15); // ❌ Invalid
```

---

## 🔄 Token Versioning & Migration

### Version Management (`/tokens/versioning/`)

```typescript
// Token version tracking
export const TOKEN_VERSION = '6.0.0';

// Migration from v5 to v6
import { migrateTokens } from '@/tokens/versioning/migrations';

const v5Tokens = { /* old token structure */ };
const v6Tokens = migrateTokens(v5Tokens, '5.0.0', '6.0.0');
```

---

## 🎨 CSS Architecture

### Token-Based CSS Structure

```css
/* Base token definitions */
@import './tokens.css';

/* Theme-specific overrides */
@import './themes/light.css';
@import './themes/dark.css';
@import './themes/high-contrast.css';

/* Component styles using tokens */
.button {
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
}
```

---

## 📋 Token Usage Guidelines

### DO's ✅
- Always use semantic tokens over primitive tokens
- Use CSS variables for runtime theming
- Follow the 8pt grid system for spacing
- Validate color contrast for accessibility
- Use component tokens for consistency

### DON'Ts ❌
- Never hardcode color values
- Don't use arbitrary spacing values
- Avoid mixing token systems
- Don't override semantic tokens directly
- Never skip WCAG validation

---

## 🔍 Token Debugging

### Layout Inspector
```typescript
import { layoutInspector } from '@/utils/layout-inspector';

// Enable token visualization in development
if (process.env.NODE_ENV === 'development') {
  layoutInspector.showTokenGrid();
  layoutInspector.showColorPalette();
  layoutInspector.showSpacingScale();
}
```

### Token Diff Tool
```typescript
import { tokenDiff } from '@/tokens/diff';

// Compare theme tokens
const differences = tokenDiff.compare('base-light', 'bergen-light');
console.log('Token differences:', differences);
```

---

## 📚 Resources

- **Token Definitions**: `/tokens/definitions/`
- **Theme Files**: `/tokens/themes/definitions/`
- **Transformers**: `/tokens/transformers/`
- **Validation Tools**: `/tokens/validation/`
- **Migration Guides**: `/tokens/versioning/`

---

*Last Updated: December 2024*  
*Token System Version: 6.0.0*  
*Total Themes: 20 (10 light + 10 dark)*  
*Token Categories: 12*