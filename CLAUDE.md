
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Xala Universal Design System v5.0** - an enterprise-grade, SSR-safe UI component library with comprehensive Norwegian compliance (NSM, GDPR, WCAG 2.2 AAA). The system uses a token-based architecture with SOLID principles for maximum maintainability and performance.

## Essential Commands

### Development Commands
```bash
# Build the library (primary command)
pnpm run build

# Development with watch mode
pnpm run build:watch

# Type checking
pnpm run type-check

# Linting (strict - max 0 warnings)
pnpm run lint
pnpm run lint:fix

# Testing
pnpm run test                    # Run all tests
pnpm run test:watch              # Watch mode
pnpm run test:coverage           # With coverage (70%+ required)
pnpm run test:ci                 # CI mode
pnpm run test:passing            # Skip problematic SSR tests

# Run single test file
pnpm run test -- tests/components/Button.test.tsx
pnpm run test -- --testNamePattern="Button component"
```

### Build Process
The build uses TypeScript compiler with post-build scripts:
1. `pnpm run clean` - Clean dist directory
2. `pnpm run build:ts` - TypeScript compilation
3. `pnpm run fix:imports` - Fix ES module imports
4. `pnpm run build:css` - Generate CSS tokens
5. `pnpm run postbuild` - SSR compatibility fixes

## Architecture Overview

### Core Architecture Patterns

**Token-Based Design System**: All styling uses semantic design tokens instead of hardcoded values
- Colors: `bg-primary`, `text-foreground`, `border-border`
- Spacing: Uses 8pt grid system with semantic tokens
- Typography: Semantic text scales and font families

**SSR-First Architecture**: Built for server-side rendering with zero hydration issues
- No client-side hooks in base components
- Pure presentational components using forwardRef
- SSR compatibility scripts in build process

**Component Composition**: SOLID principles with class-variance-authority (CVA)
- Single responsibility components
- Variant-based styling system
- Proper TypeScript interfaces

### File Structure
```
src/
├── components/          # UI components organized by category
│   ├── ui/             # Core UI primitives (button, input, etc.)
│   ├── layout/         # Layout components (Container, Stack, Grid)
│   ├── navigation/     # Navigation components
│   ├── action-feedback/ # Alerts, modals, toasts
│   └── platform/       # Platform-specific components
├── tokens/             # Design token system
│   ├── semantic/       # Semantic token definitions
│   ├── themes/         # Theme configurations
│   └── transformers/   # Token transformation utilities
├── layouts/            # Complex layout systems
├── providers/          # React context providers
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

### Component Architecture

**Required Component Pattern**:
```typescript
import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type HTMLAttributes } from 'react';

const componentVariants = cva(
  'base-classes-using-design-tokens',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        primary: 'bg-primary text-primary-foreground',
      },
      size: {
        sm: 'text-sm p-2',
        md: 'text-base p-4',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
);

interface ComponentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  readonly children: React.ReactNode;
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

## 🚫 Mandatory Compliance Rules

**CRITICAL: Follow these rules without exception:**

- ❌ **NO raw HTML elements** (div, span, p, h1-h6, button, input, etc.) in components
- ✅ **ONLY semantic components** from `@xala-technologies/ui-system`
- ❌ **NO hardcoded styling** (no style properties, no arbitrary Tailwind values)
- ✅ **MANDATORY design token usage** for all colors, spacing, typography
- ✅ **Enhanced 8pt Grid System** - all spacing in 8px increments
- ✅ **WCAG 2.2 AAA compliance** for accessibility
- ❌ **NO hardcoded user-facing text** - ALL text must use `t()` function
- ✅ **MANDATORY localization**: English, Norwegian Bokmål, French, Arabic
- ✅ **Explicit TypeScript return types** (no 'any' types)
- ✅ **SOLID principles** and component composition
- ✅ **Maximum 200 lines per file**, 20 lines per function

### TypeScript Requirements (Zero Tolerance)
- **ALWAYS** use explicit return types for functions
- **NEVER** use 'any' type - create specific interfaces
- **ALWAYS** use strict mode (already configured)
- **ALWAYS** handle null/undefined cases explicitly
- **ALWAYS** use readonly properties in interfaces

### Component Requirements
- **NEVER** use React hooks in UI components (useState, useEffect, etc.)
- **ALWAYS** create pure presentational components
- **ALWAYS** use forwardRef for proper ref handling
- **ALWAYS** use class-variance-authority for variants
- **NEVER** use client-side state management
- **NEVER** use 'use client' directive

### Design Token Requirements
- **ALWAYS** use semantic tokens: `bg-primary`, `text-foreground`, `border-border`
- **NEVER** hardcode colors: `#1976d2`, `blue`, `red`
- **ALWAYS** use semantic spacing: `space-2`, `p-4`, `m-4`
- **ALWAYS** use semantic states: `text-destructive`, `bg-destructive`
- **SUCCESS** states: `text-green-600`, `bg-green-500`, `border-green-500`
- **WARNING** states: `text-yellow-600`, `bg-yellow-500`, `border-yellow-500`

## Testing Strategy

### Test Structure
- Unit tests for individual components in `tests/components/`
- Integration tests in `tests/comprehensive/`
- Coverage requirement: 70%+ across all metrics
- SSR compatibility tests (some may be skipped with `test:passing`)

### Running Tests
```bash
# All tests
pnpm run test

# Single component test
pnpm run test -- tests/components/Button.test.tsx

# Pattern-based testing
pnpm run test -- --testNamePattern="accessibility"

# Coverage report
pnpm run test:coverage
```

## Quality Standards

### Code Quality Gates
- **ESLint**: Maximum 0 warnings (strict enforcement)
- **TypeScript**: Strict mode with explicit return types
- **File size**: Maximum 200 lines per file
- **Function size**: Maximum 20 lines per function
- **Cyclomatic complexity**: Maximum 10

### Before Committing
1. Run `pnpm run type-check` - Must pass with 0 errors
2. Run `pnpm run lint` - Must pass with 0 warnings
3. Run `pnpm run test` - All tests must pass
4. Run `pnpm run build` - Must build successfully

## Norwegian Compliance

### NSM Classification System
- Components support `ÅPEN`, `BEGRENSET`, `KONFIDENSIELT`, `HEMMELIG` classifications
- Use `ClassificationIndicator` component for sensitive data
- Audit trails built into component usage

### WCAG 2.2 AAA Compliance
- All components include proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management and visual indicators

### Localization
- All user-facing text uses `t()` function
- Support for `nb-NO`, `en-US`, `fr-FR`, `ar-SA`
- RTL language support included

## Common Issues and Solutions

### SSR Compatibility
- Some tests in `tests/comprehensive/` may fail due to SSR/client mismatch
- Use `pnpm run test:passing` to skip problematic tests during development
- Build process includes SSR compatibility fixes

### Import Issues
- Build process automatically fixes ES module imports
- Use `@/` path aliases for internal imports
- Export components through proper index files

### Token Usage
- Reference existing tokens in `src/tokens/` directory
- Use token transformers for CSS variables, Tailwind config, TypeScript types
- Never create arbitrary color values