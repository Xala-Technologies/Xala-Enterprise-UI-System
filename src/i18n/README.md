# Internationalization (i18n) System

Comprehensive localization support for the UI System with full TypeScript support, RTL languages, and Norwegian compliance features.

## Supported Languages

- **English (en)** - Base language
- **Norwegian Bokmål (nb-NO)** - Primary Norwegian variant with full compliance support
- **French (fr)** - Complete French localization
- **Arabic (ar)** - RTL support with proper pluralization rules

## Features

### Core Features
- ✅ **Full TypeScript Support** - Type-safe translation keys and values
- ✅ **RTL Support** - Proper right-to-left layout for Arabic
- ✅ **Pluralization Rules** - Language-specific plural forms (including Arabic's complex rules)
- ✅ **String Interpolation** - Template variables with `{{variable}}` syntax
- ✅ **Nested Keys** - Dot notation for organized translations (`common.buttons.save`)
- ✅ **Fallback System** - Graceful degradation to default locale

### Formatting
- ✅ **Number Formatting** - Locale-aware number display
- ✅ **Date Formatting** - Internationalized date/time display
- ✅ **Currency Formatting** - Multi-currency support
- ✅ **Relative Time** - "2 hours ago" style formatting

### Norwegian Compliance
- ✅ **NSM Classifications** - Security level translations
- ✅ **GDPR Compliance** - Privacy-related terminology
- ✅ **WCAG Support** - Accessibility-focused translations
- ✅ **Audit Trail** - Compliance tracking terminology

## Quick Start

### 1. Basic Usage with Hooks

```typescript
import { useTranslation } from '@/i18n';

function MyComponent() {
  const { t, locale, direction, isRTL } = useTranslation();

  return (
    <div dir={direction}>
      <h1>{t('common.welcome')}</h1>
      <p>{t('forms.validation.required')}</p>
      <span>{t('common.items', { count: 5 })}</span>
    </div>
  );
}
```

### 2. Provider Setup

```typescript
import { I18nProvider } from '@/i18n';

function App() {
  return (
    <I18nProvider 
      initialLocale="en"
      persistLocale={true}
      onLocaleChange={(locale) => console.log('Locale changed:', locale)}
    >
      <MyApp />
    </I18nProvider>
  );
}
```

### 3. Locale Switcher

```typescript
import { LocaleSwitcher } from '@/i18n';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <LocaleSwitcher 
        showFlags={true}
        showNativeNames={true}
        className="ml-auto"
      />
    </header>
  );
}
```

## Advanced Usage

### String Interpolation

```typescript
// Translation file
{
  "welcome": "Welcome {{name}} to {{app}}!",
  "itemCount": "You have {{count}} items"
}

// Component
const message = t('welcome', { name: 'John', app: 'MyApp' });
// Result: "Welcome John to MyApp!"
```

### Pluralization

```typescript
// Translation file
{
  "items": {
    "zero": "No items",
    "one": "1 item", 
    "other": "{{count}} items"
  }
}

// Component
const message = t('items', { count: 5 });
// Result: "5 items"
```

### Arabic Pluralization

Arabic has complex plural rules automatically handled:

```typescript
// Arabic translation
{
  "items": {
    "zero": "لا توجد عناصر",      // 0 items
    "one": "عنصر واحد",          // 1 item
    "two": "عنصران",             // 2 items  
    "few": "{{count}} عناصر",    // 3-10 items
    "many": "{{count}} عنصراً",  // 11-99 items
    "other": "{{count}} عنصر"    // 100+ items
  }
}
```

### Date and Number Formatting

```typescript
const { formatDate, formatNumber, formatCurrency } = useTranslation();

// Locale-aware formatting
const date = formatDate(new Date(), { dateStyle: 'medium' });
const price = formatCurrency(99.99, 'NOK');
const count = formatNumber(1234.56);
```

### RTL Support

```typescript
const { isRTL, getDirectionalClasses } = useTranslation();

return (
  <div className={getDirectionalClasses('ml-4', 'mr-4')}>
    {isRTL ? 'RTL Layout' : 'LTR Layout'}
  </div>
);
```

## Translation File Structure

```json
{
  "common": {
    "ok": "OK",
    "cancel": "Cancel",
    "items": {
      "zero": "No items",
      "one": "1 item",
      "other": "{{count}} items"
    }
  },
  "forms": {
    "labels": {
      "email": "Email Address"
    },
    "validation": {
      "required": "This field is required",
      "email": "Please enter a valid email"
    }
  },
  "norwegian": {
    "classification": {
      "open": "Open",
      "restricted": "Restricted"
    },
    "compliance": {
      "gdprCompliant": "GDPR Compliant",
      "auditTrail": "Audit Trail"
    }
  }
}
```

## API Reference

### Hooks

#### `useTranslation(options?)`

Main hook for translation functionality.

```typescript
const {
  t,                    // Translation function
  locale,              // Current locale
  direction,           // 'ltr' | 'rtl'
  isRTL,              // boolean
  localeMetadata,     // Locale information
  formatNumber,       // Number formatter
  formatDate,         // Date formatter
  formatCurrency,     // Currency formatter
  formatRelativeTime, // Relative time formatter
  getDirectionalClasses // CSS class helper
} = useTranslation();
```

#### `useT(locale?)`

Lightweight hook that returns only the translation function.

```typescript
const t = useT('nb-NO');
```

#### `useLocale(locale?)`

Hook for locale information only.

```typescript
const { locale, direction, isRTL, localeMetadata } = useLocale();
```

### Context Provider

#### `I18nProvider`

```typescript
<I18nProvider
  initialLocale="en"              // Initial locale
  availableLocales={['en', 'nb-NO']} // Available locales
  persistLocale={true}            // Save to localStorage
  storageKey="ui-system-locale"   // Storage key
  onLocaleChange={(locale) => {}} // Change callback
>
  <App />
</I18nProvider>
```

### Utility Functions

#### `getTranslation(key, locale, options?)`

Direct translation function.

```typescript
const text = getTranslation('common.save', 'nb-NO');
```

#### `formatNumber(value, locale, options?)`

Format numbers for locale.

```typescript
const formatted = formatNumber(1234.56, 'nb-NO');
// Result: "1 234,56"
```

#### `formatDate(date, locale, options?)`

Format dates for locale.

```typescript
const formatted = formatDate(new Date(), 'nb-NO', { 
  dateStyle: 'full' 
});
```

## Norwegian Compliance Features

### NSM Security Classifications

```typescript
// Available in all languages
t('norwegian.classification.open')         // "Open" / "Åpen" / "Ouvert" / "مفتوح"
t('norwegian.classification.restricted')   // "Restricted" / "Begrenset" / etc.
t('norwegian.classification.confidential') // "Confidential" / "Konfidensiell" / etc.
t('norwegian.classification.secret')       // "Secret" / "Hemmelig" / etc.
```

### GDPR and Compliance

```typescript
t('norwegian.compliance.gdprCompliant')     // GDPR compliance status
t('norwegian.compliance.auditTrail')       // Audit trail terminology
t('norwegian.compliance.dataClassification') // Data classification
```

## RTL Support Details

### Automatic Direction Detection

The system automatically:
- Sets `document.dir` attribute
- Adds `rtl`/`ltr` CSS classes to `<html>`
- Provides direction-aware utility functions

### CSS Custom Properties

```css
/* Automatically set by the i18n system */
html {
  --text-direction: ltr; /* or rtl */
}

.my-component {
  margin-inline-start: 1rem; /* Respects text direction */
}
```

### Manual Direction Handling

```typescript
const { getDirectionalClasses, isRTL } = useTranslation();

// CSS classes
const classes = getDirectionalClasses('ml-4 text-left', 'mr-4 text-right');

// Conditional logic
const alignment = isRTL ? 'right' : 'left';
```

## Development Tools

### Translation Validation

```typescript
import { validateTranslationCompleteness } from '@/i18n';

const validation = validateTranslationCompleteness('fr', 'en');
console.log('Missing keys:', validation.missing);
console.log('Extra keys:', validation.extra);
```

### Quick Setup

```typescript
import { createI18n } from '@/i18n';

const i18n = createI18n('nb-NO');
const text = i18n.t('common.save');
```

## Best Practices

### 1. Organize Translation Keys

Use nested structure for better organization:

```typescript
// Good
t('forms.validation.email')
t('components.dataTable.loading')
t('navigation.breadcrumb')

// Avoid
t('emailValidation')
t('tableLoading')  
t('breadcrumb')
```

### 2. Use Semantic Keys

Make keys descriptive of their purpose:

```typescript
// Good
t('components.modal.confirmDelete')
t('errors.network.timeout')

// Avoid  
t('modal.text1')
t('error.msg')
```

### 3. Handle Pluralization

Always consider plural forms:

```typescript
// Good
t('common.items', { count: items.length })

// Avoid
`${items.length} ${items.length === 1 ? 'item' : 'items'}`
```

### 4. RTL Considerations

Use logical properties and direction-aware utilities:

```typescript
// Good
className={getDirectionalClasses('ml-4', 'mr-4')}
style={{ marginInlineStart: '1rem' }}

// Avoid
className="ml-4" // Fixed left margin
style={{ marginLeft: '1rem' }}
```

### 5. Norwegian Compliance

Use proper NSM classifications:

```typescript
// Good
<Alert classification={t('norwegian.classification.restricted')}>
  {sensitiveData}
</Alert>

// Document compliance requirements
const auditMessage = t('norwegian.compliance.acknowledgmentMessage');
```

## Migration Guide

If you're migrating from another i18n solution:

1. **Extract existing translations** into the JSON format
2. **Organize by namespace** (common, forms, components, etc.)
3. **Add pluralization rules** where needed
4. **Replace translation calls** with `useTranslation` hook
5. **Add RTL support** for Arabic if needed
6. **Test Norwegian compliance** features

## Contributing

When adding new translations:

1. Add to English first (base language)
2. Maintain consistent key structure across all locales
3. Consider pluralization rules for each language
4. Test RTL layout with Arabic translations
5. Validate Norwegian compliance terminology
6. Run validation tools to check completeness

## Performance Notes

- Translations are loaded synchronously (no dynamic imports)
- Hooks are optimized with React.useMemo and useCallback
- Locale changes trigger minimal re-renders
- Translation functions are memoized per locale
- Number/date formatters use native Intl API for performance