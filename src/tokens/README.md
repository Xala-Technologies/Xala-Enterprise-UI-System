# Design Token System Documentation

## Overview

This document describes the consolidated semantic design token system for the Xala UI System. The token system follows design token best practices with a hierarchical structure that ensures consistency, maintainability, and scalability.

## Token Hierarchy

```
Global Tokens (Raw Values)
    ↓
Semantic Tokens (Meaning-Based)
    ↓
Component Tokens (Component-Specific)
    ↓
Platform Tokens (Platform-Specific Overrides)
```

## Token Structure

### 1. Global Tokens (Foundation Layer)

Raw values that form the foundation of our design system:

```typescript
import { globalColors, globalSpacing, globalTypography } from '@/tokens';

// Raw color values
const blue = globalColors.xala[500]; // #1987ff
const spacing = globalSpacing[4]; // 16px
const fontSize = globalTypography.fontSize.base; // 16px
```

### 2. Semantic Tokens (Meaning-Based)

Tokens that provide meaning and intent:

```typescript
import { semanticColors, semanticSpacing, semanticTypography } from '@/tokens';

// Semantic color usage
const primaryAction = semanticColors.interactive.primary;
const textPrimary = semanticColors.text.primary;
const backgroundPrimary = semanticColors.background.primary;

// Semantic spacing
const componentSpacing = semanticSpacing.component.md;
const layoutSpacing = semanticSpacing.layout.lg;

// Semantic typography
const headingLarge = semanticTypography.heading.h1;
const bodyText = semanticTypography.body.medium;
```

### 3. Component Tokens (Component-Specific)

Tokens specific to individual components:

```typescript
import { componentTokens } from '@/tokens';

// Button-specific tokens
const buttonHeight = componentTokens.button.height.md;
const buttonPadding = componentTokens.button.padding.md;
const buttonBorderRadius = componentTokens.button.borderRadius.md;

// Input-specific tokens
const inputHeight = componentTokens.input.height.md;
const inputPadding = componentTokens.input.padding.md;
```

### 4. Platform Tokens (Platform-Specific Overrides)

Platform-specific overrides for mobile and desktop:

```typescript
import { platformTokens } from '@/tokens';

// Mobile-specific overrides
const mobileButtonHeight = platformTokens.mobile.component.button.height.md;

// Desktop-specific overrides
const desktopButtonHeight = platformTokens.desktop.component.button.height.md;
```

## Usage Examples

### Basic Token Usage

```typescript
// ❌ BAD - Hardcoded values
const buttonStyle = {
  backgroundColor: '#1987ff',
  color: '#ffffff',
  padding: '12px 16px',
  borderRadius: '8px',
};

// ✅ GOOD - Using semantic tokens
import { getSemanticColor, getComponentToken } from '@/tokens';

const buttonStyle = {
  backgroundColor: getSemanticColor('interactive.primary'),
  color: getSemanticColor('text.inverse'),
  padding: getComponentToken('button', 'padding.md'),
  borderRadius: getComponentToken('button', 'borderRadius.md'),
};
```

### Using Token Helpers

```typescript
// ✅ BEST - Using token helper functions
import { createButtonStyles } from '@/tokens';

const buttonStyle = createButtonStyles('primary', 'md');
// Returns complete style object with all necessary properties
```

### Component Integration

```typescript
import React from 'react';
import { createButtonStyles, getSemanticColor } from '@/tokens';

const MyButton: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  // Get complete button styles
  const buttonStyles = createButtonStyles(variant, size);

  return (
    <button
      {...props}
      style={buttonStyles}
      className="focus:outline-none transition-all duration-150"
    />
  );
};
```

### CSS-in-JS Integration

```typescript
import { generateCSSVariables, generateCSSString } from '@/tokens';

// Generate CSS custom properties
const cssVars = generateCSSVariables();
// Returns: { '--color-primary-500': '#1987ff', ... }

// Generate CSS string for injection
const cssString = generateCSSString();
// Returns: ":root { --color-primary-500: #1987ff; ... }"
```

## Token Helper Functions

### Color Functions

```typescript
import { getSemanticColor, semanticColors } from '@/tokens';

// Get semantic color
const primaryColor = getSemanticColor('interactive.primary');

// Direct access (not recommended for dynamic usage)
const primaryColor = semanticColors.interactive.primary;
```

### Spacing Functions

```typescript
import { getSemanticSpacing, semanticSpacing } from '@/tokens';

// Get semantic spacing
const componentSpacing = getSemanticSpacing('component.md');

// Direct access
const componentSpacing = semanticSpacing.component.md;
```

### Component Style Functions

```typescript
import { createButtonStyles, createInputStyles, createCardStyles } from '@/tokens';

// Create button styles
const buttonStyles = createButtonStyles('primary', 'md');

// Create input styles
const inputStyles = createInputStyles('md', false);

// Create card styles
const cardStyles = createCardStyles('md');
```

### Platform-Aware Functions

```typescript
import { getResponsiveToken, getPlatformToken } from '@/tokens';

// Get responsive token (auto-detects platform)
const buttonHeight = getResponsiveToken('component.button.height.md');

// Get platform-specific token
const mobileButtonHeight = getPlatformToken('mobile', 'component.button.height.md');
```

## Migration Guide

### From Old System to New System

```typescript
// ❌ OLD WAY
import { baseColors, spacingTokens } from '@/tokens';

const styles = {
  backgroundColor: baseColors.primary[500],
  padding: spacingTokens.md,
  color: '#ffffff',
};

// ✅ NEW WAY
import { getSemanticColor, getSemanticSpacing } from '@/tokens';

const styles = {
  backgroundColor: getSemanticColor('interactive.primary'),
  padding: getSemanticSpacing('component.md'),
  color: getSemanticColor('text.inverse'),
};
```

### From CSS Variables to Semantic Tokens

```typescript
// ❌ OLD WAY
const styles = {
  backgroundColor: 'var(--color-primary-600)',
  color: 'var(--color-white)',
  padding: 'var(--spacing-3) var(--spacing-4)',
};

// ✅ NEW WAY
import { createButtonStyles } from '@/tokens';

const styles = createButtonStyles('primary', 'md');
```

### From Hardcoded Tailwind to Semantic Tokens

```typescript
// ❌ OLD WAY
<button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
  Click me
</button>

// ✅ NEW WAY
import { createButtonStyles } from '@/tokens';

const buttonStyles = createButtonStyles('primary', 'md');

<button style={buttonStyles} className="focus:outline-none transition-all">
  Click me
</button>
```

## Best Practices

### 1. Always Use Semantic Tokens

```typescript
// ❌ DON'T use global tokens directly in components
const color = globalColors.xala[500];

// ✅ DO use semantic tokens
const color = semanticColors.interactive.primary;
```

### 2. Use Token Helper Functions

```typescript
// ❌ DON'T access tokens directly for dynamic usage
const color = semanticColors.interactive[variant];

// ✅ DO use helper functions
const color = getSemanticColor(`interactive.${variant}`);
```

### 3. Prefer Component Style Functions

```typescript
// ❌ DON'T manually compose styles
const buttonStyle = {
  backgroundColor: getSemanticColor('interactive.primary'),
  color: getSemanticColor('text.inverse'),
  padding: getComponentToken('button', 'padding.md'),
  // ... many more properties
};

// ✅ DO use component style functions
const buttonStyle = createButtonStyles('primary', 'md');
```

### 4. Handle Platform Differences

```typescript
// ✅ GOOD - Platform-aware token usage
const buttonHeight = getResponsiveToken('component.button.height.md');

// ✅ BETTER - Explicit platform handling
const buttonHeight = getPlatformToken(
  isMobile ? 'mobile' : 'desktop',
  'component.button.height.md'
);
```

## Accessibility Considerations

### WCAG 2.2 AA Compliance

All semantic color tokens are designed to meet WCAG 2.2 AA standards:

```typescript
import { norwegianCompliance } from '@/tokens';

// Minimum touch target size (44px)
const touchTarget = norwegianCompliance.accessibility.minimumTouchTarget;

// Contrast ratios
const contrastAA = norwegianCompliance.accessibility.contrastRatio.AA; // 4.5:1
const contrastAAA = norwegianCompliance.accessibility.contrastRatio.AAA; // 7:1
```

### Norwegian Government Compliance

```typescript
import { norwegianCompliance } from '@/tokens';

// NSM classification colors
const classificationColors = norwegianCompliance.nsm.classification;

// Usage
const openColor = classificationColors.ÅPEN;
const restrictedColor = classificationColors.BEGRENSET;
```

## Debugging and Development

### Debug Token Values

```typescript
import { getDebugTokens, validateToken } from '@/tokens';

// Get all tokens for debugging
const allTokens = getDebugTokens();
console.log(allTokens);

// Validate token exists
const isValid = validateToken('interactive.primary');
console.log(`Token exists: ${isValid}`);
```

### Development Tools

```typescript
// Generate CSS for development
import { generateCSSString } from '@/tokens';

// Inject CSS into page for testing
const css = generateCSSString();
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
```

## Common Patterns

### Button Component Pattern

```typescript
import { createButtonStyles, getSemanticColor } from '@/tokens';

const Button: React.FC<ButtonProps> = ({ variant, size, ...props }) => {
  const styles = createButtonStyles(variant, size);

  return (
    <button
      {...props}
      style={styles}
      className="focus:outline-none transition-all duration-150"
    />
  );
};
```

### Input Component Pattern

```typescript
import { createInputStyles, getSemanticColor } from '@/tokens';

const Input: React.FC<InputProps> = ({ size, hasError, ...props }) => {
  const styles = createInputStyles(size, hasError);

  return (
    <input
      {...props}
      style={styles}
      className="focus:outline-none transition-all duration-150"
    />
  );
};
```

### Card Component Pattern

```typescript
import { createCardStyles } from '@/tokens';

const Card: React.FC<CardProps> = ({ padding, children, ...props }) => {
  const styles = createCardStyles(padding);

  return (
    <div {...props} style={styles}>
      {children}
    </div>
  );
};
```

## Troubleshooting

### Common Issues

1. **Token not found**: Check if the token path is correct
2. **Type errors**: Ensure you're using the correct token type
3. **Platform differences**: Use platform-aware functions for responsive behavior
4. **Performance**: Use `React.useMemo` for expensive token calculations

### Solutions

```typescript
// Issue: Token not found
const color = getSemanticColor('interactive.primary'); // ✅ Correct path
const color = getSemanticColor('primary'); // ❌ Incorrect path

// Issue: Performance
const styles = React.useMemo(() => {
  return createButtonStyles(variant, size);
}, [variant, size]);
```

## Future Considerations

### Theme Support

The token system is designed to support theming:

```typescript
// Future: Theme-aware tokens
const color = getSemanticColor('interactive.primary', 'dark');
```

### Design Tool Integration

Tokens can be exported for design tools:

```typescript
// Future: Design tool integration
const designTokens = exportForFigma(designTokens);
```

### Build-Time Optimization

Tokens can be optimized at build time:

```typescript
// Future: Build-time optimization
const optimizedTokens = optimizeTokens(designTokens);
```

## Conclusion

The semantic design token system provides a robust foundation for consistent, maintainable, and scalable UI development. By following the patterns and best practices outlined in this documentation, you can create components that are both performant and accessible while maintaining design consistency across the entire application.

For questions or contributions, please refer to the project's contribution guidelines.
