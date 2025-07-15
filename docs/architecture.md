# Architecture Overview

## System Design Principles

The Xala UI System is built on enterprise-grade architectural principles designed for scalability, maintainability, and compliance with Norwegian government standards.

### Core Principles

1. **SOLID Principles**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
2. **Design Token First**: All styling through semantic design tokens, zero inline styles
3. **Accessibility First**: WCAG 2.2 AAA compliance by design
4. **Type Safety**: Complete TypeScript coverage with strict mode
5. **Norwegian Compliance**: NSM, DigDir, GDPR compliance built-in

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│  UISystemProvider  │  Theme Context  │  Accessibility      │
├─────────────────────────────────────────────────────────────┤
│                    COMPONENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│  Layout Components │  Form Components │  Action Components │
│  Data Components   │  Navigation      │  Platform Specific │
├─────────────────────────────────────────────────────────────┤
│                      DESIGN SYSTEM                         │
├─────────────────────────────────────────────────────────────┤
│  Global Tokens    │  Semantic Tokens │  Component Tokens   │
│  Platform Tokens  │  Accessibility   │  Norwegian Features │
├─────────────────────────────────────────────────────────────┤
│                    FOUNDATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│  Core Types       │  Utilities       │  Validation         │
│  Compliance       │  Internationalization                  │
└─────────────────────────────────────────────────────────────┘
```

## Module Structure

### 1. Foundation Layer (`/src/lib`)

**Purpose**: Core system functionality and utilities

```typescript
// Core types and interfaces
/src/lib/types/core.types.ts
/src/lib/interfaces/ui-system.interface.ts

// Core system implementation
/src/lib/core/index.ts

// Utilities and helpers
/src/lib/utils/
```

**Key Features**:

- TypeScript interfaces and type definitions
- Core UI system implementation with singleton pattern
- Utility functions for validation, accessibility, and internationalization
- Norwegian compliance utilities

**Dependencies**: None (foundation layer)

### 2. Design System Layer (`/src/tokens`)

**Purpose**: Design token system and theming

```typescript
// Token hierarchy
/src/eknost / global -
  tokens.ts / // Raw values
    src /
    tokens /
    semantic -
  tokens.ts / // Semantic meanings
    src /
    tokens /
    component -
  tokens.ts / // Component-specific
    src /
    tokens /
    platform -
  tokens.ts / // Platform overrides
    // Specialized tokens
    src /
    tokens /
    accessibility -
  tokens.ts / // A11y features
    src /
    tokens /
    alias -
  tokens.ts; // Token aliases
```

**Key Features**:

- Hierarchical token system (Global → Semantic → Component → Platform)
- CSS custom property generation
- Dynamic theme switching
- Accessibility token generation
- Norwegian government color schemes

**Architecture Pattern**: Factory Pattern with Builder Pattern for token generation

### 3. Component Layer (`/src/components`)

**Purpose**: Reusable UI components organized by functionality

```typescript
// Component categories
/src/components/action-feedback/    // Buttons, alerts, modals
/src/components/form/              // Inputs, validation
/src/components/layout/            // Containers, grids, layouts
/src/components/data-display/      // Tables, lists, badges
/src/components/navigation/        // Menus, tabs, breadcrumbs
/src/components/platform/          // Desktop/mobile specific
/src/components/ui/               // Base UI primitives
```

**Key Features**:

- Component composition with forwardRef
- Polymorphic component support
- Norwegian-specific component variants
- Accessibility features built-in
- Design token integration

**Architecture Pattern**: Composition Pattern with Dependency Injection

### 4. Application Layer (`/src`)

**Purpose**: Provider system and application integration

```typescript
// Provider and context
/src/UISystemProvider.tsx
/src/index.ts

// Layout systems
/src/layouts/desktop/
/src/layouts/mobile/
/src/layouts/tablet/
/src/layouts/web/
```

**Key Features**:

- Context-based configuration management
- Layout system for different platforms
- Global state management for theme and accessibility
- Environment-specific configurations

**Architecture Pattern**: Provider Pattern with Context API

## Design Patterns

### 1. Singleton Pattern - UISystemCore

```typescript
class UISystemCore {
  private static instance: UISystemCore;

  public static getInstance(config?: Partial<UISystemConfig>): UISystemCore {
    if (!UISystemCore.instance) {
      UISystemCore.instance = new UISystemCore(config);
    }
    return UISystemCore.instance;
  }
}
```

**Usage**: Ensures single instance of UI system configuration across the application.

### 2. Factory Pattern - Token Generation

```typescript
export function createTokenFactory(config: TokenConfig): TokenFactory {
  return {
    generateGlobalTokens: () => GlobalTokenGenerator.create(config),
    generateSemanticTokens: () => SemanticTokenGenerator.create(config),
    generateComponentTokens: () => ComponentTokenGenerator.create(config),
  };
}
```

**Usage**: Creates appropriate token generators based on configuration.

### 3. Builder Pattern - Component Construction

```typescript
export const ButtonBuilder = {
  create: () => new ComponentBuilder<ButtonProps>(),
  withVariant: (variant: ButtonVariant) => builder.addProp('variant', variant),
  withSize: (size: ButtonSize) => builder.addProp('size', size),
  withNorwegianFeatures: (features: NorwegianFeatures) => builder.addFeatures(features),
  build: () => builder.build(),
};
```

**Usage**: Flexible component configuration with Norwegian-specific features.

### 4. Strategy Pattern - Accessibility Implementation

```typescript
interface AccessibilityStrategy {
  applyAccessibilityFeatures(component: Component): Component;
}

class WCAGStrategy implements AccessibilityStrategy {
  applyAccessibilityFeatures(component: Component): Component {
    // WCAG-specific accessibility features
  }
}

class NorwegianGovernmentStrategy implements AccessibilityStrategy {
  applyAccessibilityFeatures(component: Component): Component {
    // Norwegian government accessibility requirements
  }
}
```

**Usage**: Different accessibility strategies based on compliance requirements.

### 5. Observer Pattern - Theme Updates

```typescript
class ThemeManager {
  private observers: ThemeObserver[] = [];

  subscribe(observer: ThemeObserver): void {
    this.observers.push(observer);
  }

  notifyThemeChange(theme: Theme): void {
    this.observers.forEach(observer => observer.onThemeChange(theme));
  }
}
```

**Usage**: Automatic component updates when theme changes.

## Component Architecture

### Component Hierarchy

```typescript
// Base Component Interface
interface BaseComponent<T = {}> {
  props: T;
  accessibility?: AccessibilityConfig;
  norwegian?: NorwegianCompliance;
  testId?: string;
}

// Layout Components
interface LayoutComponent extends BaseComponent {
  children: React.ReactNode;
  variant?: LayoutVariant;
  spacing?: SpacingToken;
}

// Interactive Components
interface InteractiveComponent extends BaseComponent {
  disabled?: boolean;
  loading?: boolean;
  onInteraction?: EventHandler;
}

// Norwegian-Specific Components
interface NorwegianComponent extends BaseComponent {
  norwegian: NorwegianCompliance;
  municipality?: Municipality;
  classification?: SecurityClassification;
}
```

### Component Composition

```typescript
// Example: Button with Norwegian features
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ norwegian, accessibility, ...props }, ref) => {
    // Base button functionality
    const baseButton = useBaseButton(props);

    // Norwegian compliance layer
    const norwegianFeatures = useNorwegianCompliance(norwegian);

    // Accessibility layer
    const accessibilityFeatures = useAccessibility(accessibility);

    return (
      <button
        ref={ref}
        {...baseButton}
        {...norwegianFeatures}
        {...accessibilityFeatures}
      >
        {children}
      </button>
    );
  }
);
```

## Data Flow

### 1. Configuration Flow

```
User Configuration → UISystemProvider → Context → Components
```

1. User provides configuration to UISystemProvider
2. Provider processes and validates configuration
3. Configuration distributed via React Context
4. Components access configuration through hooks

### 2. Token Flow

```
Raw Tokens → Semantic Tokens → Component Tokens → CSS Variables → Components
```

1. Global tokens define raw values (colors, spacing, etc.)
2. Semantic tokens provide meaning-based abstractions
3. Component tokens specify component-specific values
4. CSS variables generated for runtime use
5. Components use CSS variables for styling

### 3. Accessibility Flow

```
Accessibility Config → Strategy Selection → Feature Application → Component Enhancement
```

1. Accessibility level configured (basic/enhanced/government)
2. Appropriate strategy selected based on requirements
3. Accessibility features applied to components
4. Enhanced components with full a11y support

### 4. Norwegian Compliance Flow

```
Compliance Config → Validation → Feature Injection → Audit Logging
```

1. Norwegian compliance features configured
2. Validation ensures proper classification and municipality settings
3. Compliance features injected into relevant components
4. Audit trail maintained for compliance reporting

## Error Handling

### 1. Configuration Errors

```typescript
interface ConfigurationError extends Error {
  code: 'INVALID_CONFIG' | 'MISSING_REQUIRED_CONFIG' | 'INCOMPATIBLE_CONFIG';
  details: Record<string, unknown>;
}

function validateConfiguration(config: UISystemConfig): ValidationResult {
  const errors: ConfigurationError[] = [];

  // Validate required fields
  if (!config.name) {
    errors.push(createConfigError('MISSING_REQUIRED_CONFIG', 'name is required'));
  }

  // Validate Norwegian compliance
  if (config.norwegian && !isValidMunicipality(config.norwegian.municipality)) {
    errors.push(createConfigError('INVALID_CONFIG', 'Invalid municipality'));
  }

  return { isValid: errors.length === 0, errors };
}
```

### 2. Component Errors

```typescript
interface ComponentError extends Error {
  componentName: string;
  props: Record<string, unknown>;
  stackTrace: string;
}

function withErrorBoundary<T>(Component: React.ComponentType<T>) {
  return function ErrorBoundaryWrapper(props: T) {
    return (
      <ErrorBoundary
        fallback={(error) => <ComponentErrorFallback error={error} />}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
```

### 3. Accessibility Errors

```typescript
interface AccessibilityError extends Error {
  level: 'warning' | 'error';
  rule: string;
  element: HTMLElement;
  suggestion: string;
}

function validateAccessibility(element: HTMLElement): AccessibilityError[] {
  const errors: AccessibilityError[] = [];

  // Check color contrast
  if (!hasValidColorContrast(element)) {
    errors.push({
      level: 'error',
      rule: 'WCAG 2.2 AA color contrast',
      element,
      suggestion: 'Increase color contrast to at least 4.5:1',
    });
  }

  return errors;
}
```

## Performance Considerations

### 1. Bundle Optimization

```typescript
// Tree-shaking support
export { Button } from './components/action-feedback/Button';
export { Input } from './components/form/Input';
// ... individual exports for optimal tree-shaking

// Lazy loading for platform-specific components
export const DesktopSidebar = lazy(() => import('./components/platform/desktop/DesktopSidebar'));
export const MobileBottomNav = lazy(() => import('./components/platform/mobile/BottomNavigation'));
```

### 2. Memoization Strategy

```typescript
// Component memoization
export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    // Component implementation
  }),
  (prevProps, nextProps) => {
    // Custom comparison for Norwegian and accessibility props
    return (
      shallowEqual(prevProps, nextProps) &&
      deepEqual(prevProps.norwegian, nextProps.norwegian) &&
      deepEqual(prevProps.accessibility, nextProps.accessibility)
    );
  }
);

// Hook memoization
function useNorwegianCompliance(config: NorwegianCompliance) {
  return useMemo(() => {
    return processNorwegianCompliance(config);
  }, [config.municipality, config.classification, config.auditLevel]);
}
```

### 3. Virtualization Support

```typescript
interface VirtualizationConfig {
  enabled: boolean;
  itemHeight: number;
  overscan: number;
}

function useVirtualization(config: VirtualizationConfig) {
  return useMemo(() => {
    if (!config.enabled) return null;

    return createVirtualizer({
      itemHeight: config.itemHeight,
      overscan: config.overscan,
    });
  }, [config]);
}
```

## Testing Architecture

### 1. Unit Testing Strategy

```typescript
// Component testing with accessibility
describe('Button Component', () => {
  it('should meet WCAG 2.2 AA standards', async () => {
    render(<Button>Test Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should support Norwegian classification', () => {
    render(
      <Button norwegian={{ classification: 'KONFIDENSIELT' }}>
        Classified Button
      </Button>
    );
    expect(screen.getByText('KONFIDENSIELT')).toBeInTheDocument();
  });
});
```

### 2. Integration Testing

```typescript
// Provider integration testing
describe('UISystemProvider', () => {
  it('should provide configuration to child components', () => {
    const config = { municipality: 'Oslo', classification: 'ÅPEN' };

    render(
      <UISystemProvider norwegian={config}>
        <TestComponent />
      </UISystemProvider>
    );

    expect(screen.getByTestId('municipality')).toHaveTextContent('Oslo');
  });
});
```

### 3. E2E Testing

```typescript
// Norwegian compliance workflow testing
test('Norwegian compliance workflow', async ({ page }) => {
  await page.goto('/government-form');

  // Test personal number validation
  await page.fill('[data-testid="personal-number"]', '12345678901');
  await expect(page.locator('.validation-error')).toBeVisible();

  // Test classification display
  await expect(page.locator('[data-classification="ÅPEN"]')).toBeVisible();
});
```

## Security Considerations

### 1. Input Sanitization

```typescript
function sanitizeInput(value: string, type: 'personalNumber' | 'organizationNumber'): string {
  // Remove any non-numeric characters for Norwegian numbers
  if (type === 'personalNumber' || type === 'organizationNumber') {
    return value.replace(/\D/g, '');
  }

  // General HTML sanitization
  return DOMPurify.sanitize(value);
}
```

### 2. Classification Handling

```typescript
interface ClassificationConfig {
  level: SecurityClassification;
  requiresAudit: boolean;
  accessControlList: string[];
}

function validateClassificationAccess(
  classification: SecurityClassification,
  userClearance: SecurityClassification
): boolean {
  const hierarchy = ['ÅPEN', 'BEGRENSET', 'KONFIDENSIELT', 'HEMMELIG'];
  const userLevel = hierarchy.indexOf(userClearance);
  const requiredLevel = hierarchy.indexOf(classification);

  return userLevel >= requiredLevel;
}
```

### 3. Audit Logging

```typescript
interface AuditEvent {
  timestamp: Date;
  user: string;
  action: string;
  classification: SecurityClassification;
  details: Record<string, unknown>;
}

function logAuditEvent(event: AuditEvent): void {
  // Secure audit logging implementation
  secureLogger.log({
    ...event,
    hash: createSecureHash(event),
    signature: signEvent(event),
  });
}
```

## Deployment Architecture

### 1. Package Distribution

```typescript
// Multi-format build output
{
  "main": "dist/index.js",           // CommonJS
  "module": "dist/index.esm.js",     // ES Modules
  "types": "dist/index.d.ts",        // TypeScript declarations
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./tokens": {
      "import": "./dist/tokens/index.esm.js",
      "require": "./dist/tokens/index.js",
      "types": "./dist/tokens/index.d.ts"
    }
  }
}
```

### 2. Environment Configuration

```typescript
interface EnvironmentConfig {
  development: {
    enableDebugMode: boolean;
    enablePerformanceMonitoring: boolean;
    enableA11yWarnings: boolean;
  };
  production: {
    enableAuditLogging: boolean;
    enableSecurityFeatures: boolean;
    optimizeBundleSize: boolean;
  };
  testing: {
    mockNorwegianServices: boolean;
    enableAccessibilityTesting: boolean;
  };
}
```

## Extensibility

### 1. Plugin Architecture

```typescript
interface UISystemPlugin {
  name: string;
  version: string;
  init: (system: UISystemCore) => void;
  destroy: () => void;
}

function registerPlugin(plugin: UISystemPlugin): void {
  plugins.set(plugin.name, plugin);
  plugin.init(UISystemCore.getInstance());
}
```

### 2. Custom Component Registration

```typescript
function registerCustomComponent<T>(
  name: string,
  component: React.ComponentType<T>,
  validation?: ComponentValidator<T>
): void {
  if (validation && !validation(component)) {
    throw new Error(`Component ${name} failed validation`);
  }

  componentRegistry.set(name, {
    component,
    metadata: extractComponentMetadata(component),
  });
}
```

This architecture ensures scalability, maintainability, and compliance while providing a solid foundation for enterprise-grade Norwegian government applications.

---

**Next**: Explore [Design System](./design-system.md) to understand the token system and theming.
