# Database-Ready Theme Template System

## Overview

This is a **pure JSON template system** designed for database storage and framework-agnostic usage. Unlike TypeScript-based themes, these templates can be:

- Stored directly in databases (PostgreSQL, MongoDB, etc.)
- Loaded without TypeScript compilation
- Used across different frameworks and platforms
- Automatically fallback to base templates when issues occur

## Template Structure

### Base Templates (Required)

- `base-light.json` - Default light theme, used as fallback
- `base-dark.json` - Default dark theme, used as fallback

### Industry Templates (Optional)

All industry templates extend the base structure with specialized configurations:

- **Municipal**: `drammen-light.json`, `oslo-light.json`, `bergen-light.json` + dark variants
- **Enterprise**: `enterprise-light.json`, `enterprise-dark.json`
- **E-commerce**: `ecommerce-light.json`, `ecommerce-dark.json`
- **Healthcare**: `healthcare-light.json`, `healthcare-dark.json`
- **Finance**: `finance-light.json`, `finance-dark.json`
- **Education**: `education-light.json`, `education-dark.json`
- **Productivity**: `productivity-light.json`, `productivity-dark.json`

## Template JSON Schema

```json
{
  "id": "unique-template-id",
  "name": "Human Readable Name",
  "description": "Template description",
  "version": "1.0.0",
  "category": "BASE|MUNICIPAL|ENTERPRISE|ECOMMERCE|HEALTHCARE|EDUCATION|FINANCE|PRODUCTIVITY",
  "mode": "LIGHT|DARK",
  "isDefault": false,
  "isActive": true,
  "isPublic": true,
  "isFallback": false,
  "accessibility": {
    "level": "WCAG_AA|WCAG_AAA|BASIC|ENHANCED|OFF",
    "highContrast": false,
    "reducedMotion": false,
    "focusIndicators": true,
    "colorBlindFriendly": true,
    "screenReaderOptimized": false
  },
  "colors": {
    "primary": { "50": "#color", "500": "#color", "950": "#color" },
    "secondary": { "50": "#color", "500": "#color", "950": "#color" },
    "background": { "default": "#color", "paper": "#color", "elevated": "#color" },
    "text": { "primary": "#color", "secondary": "#color", "muted": "#color" },
    "border": { "default": "#color", "muted": "#color" },
    "status": { "success": "#color", "warning": "#color", "error": "#color", "info": "#color" }
  },
  "typography": {
    "fontFamily": { "sans": ["Font", "fallback"], "serif": ["Font"], "mono": ["Font"] },
    "fontSize": { "xs": "0.75rem", "base": "1rem", "4xl": "2.25rem" },
    "fontWeight": { "light": 300, "normal": 400, "bold": 700 },
    "lineHeight": { "tight": 1.25, "normal": 1.5, "relaxed": 1.75 }
  },
  "spacing": { "0": "0", "1": "0.25rem", "24": "6rem" },
  "branding": {
    "logo": { "primary": "/path/to/logo.svg", "secondary": "/path/to/alt-logo.svg" }
  },
  "compliance": {
    "standards": ["GDPR", "HIPAA", "PCI_DSS", "SOC2", "ISO27001", "NSM"],
    "dataClassification": "PUBLIC|INTERNAL|CONFIDENTIAL|HIGHLY_CONFIDENTIAL",
    "requiresApproval": false,
    "auditLogging": true
  },
  "performance": {
    "lazyLoading": true,
    "cacheStrategy": "aggressive|moderate|minimal",
    "bundleOptimization": true
  },
  "responsive": {
    "breakpoints": { "mobile": "320px", "tablet": "768px", "desktop": "1024px", "wide": "1440px" }
  }
}
```

## Usage Examples

### Basic Template Loading

```typescript
import { loadThemeTemplate } from './template-loader';

// Load specific template (falls back to base if not found)
const result = await loadThemeTemplate('enterprise-dark');
console.log(result.template); // Full template object
console.log(result.isFromFallback); // false if successful, true if fallback used
console.log(result.loadSource); // 'requested' | 'fallback-base-light' | 'fallback-base-dark'

// Load default template (base-light)
const defaultResult = await loadThemeTemplate();
console.log(defaultResult.template.id); // 'base-light'
```

### Mode-Specific Loading

```typescript
import { getTemplateForMode } from './template-loader';

// Get light theme (fallback to base-light if preferred not found)
const lightTheme = await getTemplateForMode('LIGHT', 'drammen-light');

// Get dark theme (fallback to base-dark if preferred not found)
const darkTheme = await getTemplateForMode('DARK', 'enterprise-dark');
```

### Database Integration

```typescript
import { ThemeTemplateLoader, registerDatabaseTemplate } from './template-loader';

// Configure for database source
const loader = ThemeTemplateLoader.getInstance({
  templateSource: 'database',
  defaultTemplate: 'base-light',
  strictFallback: true,
});

// Store database result in cache
const dbResult = await db.query('SELECT * FROM theme_templates WHERE id = ?', ['custom-theme']);
registerDatabaseTemplate(dbResult);

// Load template (will use database source)
const result = await loader.loadTemplate('custom-theme');
```

### Framework-Agnostic Usage (Pure JSON)

```javascript
// No TypeScript compilation required
const fetch = require('node-fetch');

async function loadThemeFromAPI(templateId) {
  try {
    // Try to load specific template
    const response = await fetch(`/api/themes/${templateId}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('Failed to load template, using fallback');
  }

  // Fallback to base template
  const mode = templateId?.includes('dark') ? 'dark' : 'light';
  const fallbackResponse = await fetch(`/api/themes/base-${mode}`);
  return await fallbackResponse.json();
}

// Usage
const theme = await loadThemeFromAPI('enterprise-dark');
// Apply theme to your application...
```

## Fallback Behavior

The system implements multiple fallback layers:

1. **Requested Template**: Try to load the specific template requested
2. **Mode-Based Fallback**: If failed, use base template for the same mode (light/dark)
3. **Emergency Fallback**: If base templates fail, use minimal hardcoded template

```typescript
// Example of fallback in action
const result = await loadThemeTemplate('non-existent-theme');
// result.isFromFallback = true
// result.fallbackReason = "Template non-existent-theme not found"
// result.template = base-light template content
```

## Database Schema Examples

### PostgreSQL Schema

```sql
CREATE TABLE theme_templates (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  version VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  mode VARCHAR(10) NOT NULL CHECK (mode IN ('LIGHT', 'DARK')),
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_public BOOLEAN DEFAULT true,
  is_fallback BOOLEAN DEFAULT false,
  template_data JSONB NOT NULL, -- Full template JSON
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_theme_templates_category ON theme_templates(category);
CREATE INDEX idx_theme_templates_mode ON theme_templates(mode);
CREATE INDEX idx_theme_templates_active ON theme_templates(is_active);
```

### MongoDB Schema

```javascript
const themeTemplateSchema = {
  _id: String, // template ID
  name: String,
  description: String,
  version: String,
  category: {
    type: String,
    enum: [
      'BASE',
      'MUNICIPAL',
      'ENTERPRISE',
      'ECOMMERCE',
      'HEALTHCARE',
      'EDUCATION',
      'FINANCE',
      'PRODUCTIVITY',
    ],
  },
  mode: { type: String, enum: ['LIGHT', 'DARK'] },
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isPublic: { type: Boolean, default: true },
  isFallback: { type: Boolean, default: false },
  templateData: Object, // Full template JSON
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};
```

## Configuration Options

```typescript
interface TemplateLoaderConfig {
  /** Base template for light mode - used as fallback */
  baseLightTemplate?: ThemeTemplate | string;
  /** Base template for dark mode - used as fallback */
  baseDarkTemplate?: ThemeTemplate | string;
  /** Default template to use when no configuration provided */
  defaultTemplate?: string; // Template ID (default: 'base-light')
  /** Enable strict fallback (always use base on any error) */
  strictFallback?: boolean; // default: false
  /** Template source (database, file system, etc.) */
  templateSource?: 'database' | 'filesystem' | 'memory'; // default: 'filesystem'
}
```

## Benefits Over TypeScript Themes

1. **Database Storage**: Templates stored as JSON in database tables
2. **No Compilation**: Load and use without TypeScript compilation
3. **Framework Agnostic**: Works with React, Vue, Angular, vanilla JS
4. **Runtime Loading**: Load templates dynamically from APIs
5. **Automatic Fallbacks**: Graceful degradation when templates fail
6. **Cache Management**: Built-in caching with manual cache control
7. **Version Control**: Each template has version field for updates

## Migration from TypeScript Themes

If you were previously using TypeScript themes, you can migrate by:

1. **Export existing themes to JSON** using the theme factory
2. **Store JSON templates in database** using provided schemas
3. **Update loading code** to use `loadThemeTemplate()` instead of imports
4. **Configure fallback behavior** based on your needs

This template system provides production-ready theme management with enterprise-grade fallback mechanisms.
