# Xala UI System v5.0.0 Architecture

> **Branch: feat/v5-architecture**  
> This document outlines the architectural improvements and migration strategy for v5.0.0 of the Xala UI System.

## 🎯 Critical Issues & Solutions

### 1. Dependencies Management

**Issue:** The UI system uses dependencies like `tailwind-merge` but doesn't declare them properly, causing conflicts when consumers remove Tailwind.

**Solution:**
- ✅ Explicitly declare all dependencies in package.json
- ✅ Modularize styling approach to allow for dependency-free option
- ✅ Provide CSS extraction option for projects that don't want CSS-in-JS

```json
// package.json
{
  "dependencies": {
    "tailwind-merge": "^3.x.x",
    "clsx": "^2.x.x"
  },
  "peerDependencies": {
    "react": "^18.x",
    "react-dom": "^18.x"
  }
}
```

### 2. Theme Loading & Fallbacks

**Issue:** The system tries to fetch templates from API endpoints that don't exist by default, causing 404 errors.

**Solution:**
- ✅ Ship with embedded default templates (no API calls)
- ✅ Add fallback mechanism for offline/error scenarios
- ✅ Clear error handling and developer feedback
- ✅ Option to bypass API calls entirely

```typescript
// New ThemeProvider API
<ThemeProvider
  themeSource={{
    type: 'embedded', // or 'api' or 'local'
    fallbackTheme: 'light',
    errorBehavior: 'fallback' // or 'throw'
  }}
>
  {children}
</ThemeProvider>
```

### 3. CSS Injection & Hydration

**Issue:** Styles aren't injected properly, causing hydration errors and missing styles.

**Solution:**
- ✅ Support three style injection methods:
  1. CSS-in-JS with proper SSR extraction
  2. Static CSS file imports
  3. Runtime CSS variable injection
- ✅ Add explicit hydration control
- ✅ Server-side style extraction for zero hydration mismatch

### 4. Component API Consistency

**Issue:** Documentation doesn't match actual component APIs and implementations.

**Solution:**
- ✅ Strict TypeScript interfaces for all components
- ✅ Automated documentation from TSDoc comments
- ✅ Migration guides from v4 to v5 APIs
- ✅ Storybook integration for live examples

## 🔧 v5.0.0 Architecture

### Core Principles

1. **Zero Dependencies Mode**
   - Option to use the UI system without additional runtime dependencies
   - CSS extracted at build time rather than runtime
   - Static variants instead of dynamic class generation

2. **SSR-First**
   - All components designed for SSR compatibility
   - Hydration safety built into every component
   - No reliance on browser APIs during render

3. **Multi-Tenant White-Labeling**
   - Support for unlimited tenants with unique branding
   - Database-driven theme configuration
   - Dynamic theme switching without page reloads

### Component Architecture

```
UI System
├── /core              # Core primitives and types
├── /components        # UI components
├── /layouts           # Layout components and system
├── /providers         # Context providers
│   └── UiProvider     # Root provider (unified)
├── /tokens            # Design tokens
│   ├── base.ts        # Base tokens
│   └── themes/        # Pre-built themes
├── /hooks             # Custom hooks
└── /utils             # Utilities
    ├── style.ts       # Styling utilities
    └── theme.ts       # Theme utilities
```

## 🏗️ White-Labeling Architecture

We adopt the architecture suggested by the SaaS team for maximum flexibility and performance:

```typescript
// 1. Centralized theme configuration
interface WhiteLabelConfig {
  brandName: string;
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  features: {
    enabledModules: string[];
    customRoutes: RouteConfig[];
  };
}

// 2. Theme provider that handles both Xala templates and custom branding
interface ThemeSystemConfig {
  xalaTemplate: 'enterprise' | 'finance' | 'healthcare' | string;
  whiteLabel: WhiteLabelConfig;
  customTokens?: Partial<DesignTokens>;
}
```

### Multi-Tenant Strategy

1. **Runtime Theme Resolution**
   - Theme resolved based on request domain/path
   - Tenant configuration fetched from database or static config
   - Themes merged at runtime (base + template + tenant)

2. **Component Customization**
   - Component registry for tenant-specific overrides
   - Default components used as fallbacks
   - Dynamic import of tenant-specific components

3. **Performance Optimization**
   - CSS variables for runtime updates
   - Static theme extraction for build-time optimization
   - Theme caching for repeated visits

## 📊 Implementation Roadmap

| Phase | Focus | Deliverables | Timeline |
|-------|-------|-------------|---------|
| 1 | Core Provider | UiProvider with theme context | Week 1 |
| 2 | Token System | Design token architecture | Week 1-2 |
| 3 | Component Refactor | Update core components | Week 2-4 |
| 4 | SSR Compatibility | Hydration-safe rendering | Week 3-5 |
| 5 | White-Label Support | Tenant configuration system | Week 5-7 |
| 6 | Documentation | Updated docs & examples | Week 6-8 |

## 🔄 Migration Guide

For SaaS applications currently using v4:

1. **Install v5.0.0-alpha**
   ```bash
   pnpm add @xala-technologies/ui-system@5.0.0-alpha
   ```

2. **Wrap your app with the new UiProvider**
   ```tsx
   import { UiProvider } from '@xala-technologies/ui-system';

   function App({ Component, pageProps }) {
     return (
       <UiProvider
         defaultTheme="light"
         whiteLabelTokens={tenant.branding}
       >
         <Component {...pageProps} />
       </UiProvider>
     );
   }
   ```

3. **Update component imports**
   ```tsx
   // v4
   import { Button } from '@xala-technologies/ui-system/Button';
   
   // v5
   import { Button } from '@xala-technologies/ui-system';
   ```

4. **Use new hooks for theming**
   ```tsx
   import { useTokens, useTheme } from '@xala-technologies/ui-system';
   
   function MyComponent() {
     const tokens = useTokens();
     const { theme, setTheme } = useTheme();
     
     return (
       <div style={{ color: tokens.colors.primary }}>
         Current theme: {theme}
       </div>
     );
   }
   ```

## 📝 Next Steps

1. Complete the UiProvider implementation
2. Define the token schema and types
3. Implement SSR-safe theme switching
4. Create a minimal set of updated components
5. Test in a real SaaS application
