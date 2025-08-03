/**
 * AI Integration Guide - Xala UI System Compliant
 * Generated with Xaheen CLI - Platform-Specific AI Implementation
 * 
 * MANDATORY COMPLIANCE RULES:
 * ❌ NO raw HTML elements (div, span, p, h1-h6, button, input, etc.) in pages
 * ✅ ONLY semantic components from @xala-technologies/ui-system
 * ❌ NO hardcoded styling (no style properties, no arbitrary Tailwind values)
 * ✅ MANDATORY design token usage for all colors, spacing, typography
 * ✅ Enhanced 8pt Grid System - all spacing in 8px increments
 * ✅ WCAG 2.2 AAA compliance for accessibility
 * ❌ NO hardcoded user-facing text - ALL text must use t() function
 * ✅ MANDATORY localization: English, Norwegian Bokmål, French, Arabic
 * ✅ Explicit TypeScript return types (no 'any' types)
 * ✅ SOLID principles and component composition
 * ✅ Maximum 200 lines per file, 20 lines per function
 */

# AI Integration Guide

## For AI Code Generators

### ✅ COMPLIANT Component Usage Patterns

```typescript
// ✅ REQUIRED - Semantic components only
import { Container, Stack, Text, Button, Card, Grid } from '@xala-technologies/ui-system';

// ✅ REQUIRED - Proper TypeScript interfaces with readonly props
interface DashboardProps {
  readonly title?: string;
  readonly data?: readonly MetricData[];
}

interface MetricData {
  readonly id: string;
  readonly value: string;
  readonly trend: string;
}

// ✅ REQUIRED - Functional component with explicit JSX.Element return type
export const Dashboard = ({ title, data = [] }: DashboardProps): JSX.Element => {
  return (
    <Container size="xl">
      <Stack direction="vertical" gap="xl">
        {/* ✅ REQUIRED - All text uses t() function with proper accessibility */}
        <Text variant="h1" role="heading" aria-level={1}>
          {t('dashboard.title')}
        </Text>
        <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
          {data.map((metric) => (
            <Card 
              key={metric.id}
              padding="lg"
              variant="elevated"
              role="region"
              aria-label={t('metrics.card.label', { id: metric.id })}
            >
              <Text variant="h3" role="heading" aria-level={3}>
                {t(`metrics.${metric.id}.title`)}
              </Text>
              <Text variant="body" color="muted">
                {metric.value}
              </Text>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};
```

### ❌ FORBIDDEN Patterns

```typescript
// ❌ FORBIDDEN - Raw HTML elements
<div className="p-4">
  <h1>Dashboard</h1>
  <button onClick={handler}>Click</button>
</div>

// ❌ FORBIDDEN - Hardcoded text
<Text variant="h1">Dashboard</Text>

// ❌ FORBIDDEN - Inline styles or style properties
<div style={{ padding: '16px', backgroundColor: '#blue' }}>

// ❌ FORBIDDEN - Any types
const data: any = props;

// ❌ FORBIDDEN - Arbitrary Tailwind values
<div className="bg-[#ff0000] p-[10px]">
```

### ✅ REQUIRED AI Generation Rules

1. **Only semantic components** from `@xala-technologies/ui-system`
2. **All text must use** `t()` function for Norwegian/multilingual localization
3. **Professional sizing** enforced (min h-12 buttons, h-14 inputs)
4. **WCAG 2.2 AAA** accessibility attributes mandatory
5. **Enhanced 8pt grid spacing** in multiples of 8px only
6. **TypeScript strict** - NO 'any' types permitted
7. **200 lines max** per file, 20 lines per function maximum
8. **Readonly interfaces** with explicit return types
9. **SOLID principles** and component composition
10. **Design tokens** for all styling (colors, spacing, typography)

### ✅ COMPLIANT Quick Patterns

```typescript
// ✅ SaaS Dashboard Pattern
export const SaaSDashboard = (): JSX.Element => (
  <Container size="xl">
    <Stack direction="vertical" gap="xl">
      <Text variant="h1" role="heading">{t('dashboard.saas.title')}</Text>
      <Grid cols={{ base: 1, lg: 3 }} gap="lg">
        <MetricCard 
          title={t('metrics.revenue.title')}
          value="$12,345"
          trend="+12%"
          ariaLabel={t('metrics.revenue.label')}
        />
      </Grid>
    </Stack>
  </Container>
);

// ✅ Form Layout Pattern
export const ContactForm = (): JSX.Element => (
  <Container size="md">
    <Stack direction="vertical" gap="lg">
      <Text variant="h2" role="heading">{t('forms.contact.title')}</Text>
      <Input 
        label={t('forms.email.label')} 
        type="email" 
        required
        aria-describedby="email-help"
      />
      <Button 
        variant="primary" 
        size="lg"
        type="submit"
        aria-label={t('forms.submit.label')}
      >
        {t('forms.submit.text')}
      </Button>
    </Stack>
  </Container>
);

// ✅ Navigation Pattern
export const AppNavigation = (): JSX.Element => (
  <Container size="full">
    <Stack direction="horizontal" gap="md" justify="between" align="center">
      <Text variant="logo" role="img" aria-label={t('brand.logo.label')}>
        {t('brand.name')}
      </Text>
      <Stack direction="horizontal" gap="sm">
        <Button 
          variant="ghost" 
          size="md"
          aria-label={t('nav.home.label')}
        >
          {t('nav.home.text')}
        </Button>
        <Button 
          variant="primary" 
          size="md"
          aria-label={t('nav.signup.label')}
        >
          {t('nav.signup.text')}
        </Button>
      </Stack>
    </Stack>
  </Container>
);
```

## ✅ COMPLIANT CLI Integration

```bash
# ✅ AI-powered generation with compliance validation
xala ai generate "user management dashboard" --semantic-only --wcag-aaa
xala ai validate ./src/components/Dashboard.tsx --compliance-check
xala ai suggest "mobile navigation patterns" --norwegian-compliant
```

## ✅ REQUIRED Platform Support

- **React**: JSX.Element components with semantic structure
- **Vue**: Composition API equivalents with same accessibility  
- **Angular**: Component classes with WCAG compliance
- **Flutter**: Widget hierarchies following 8pt grid
- **iOS**: SwiftUI views with VoiceOver support
- **Android**: Compose functions with TalkBack compliance

All platforms maintain identical semantic structure, accessibility compliance, and Norwegian localization support.

## ✅ MANDATORY Accessibility Implementation

```typescript
// ✅ REQUIRED - Full WCAG 2.2 AAA compliance example
export const AccessibleDataTable = (): JSX.Element => (
  <Container size="xl">
    <Stack direction="vertical" gap="lg">
      <Text 
        variant="h2" 
        role="heading" 
        aria-level={2}
        id="data-table-title"
      >
        {t('tables.users.title')}
      </Text>
      <DataTable
        data={users}
        columns={columns}
        aria-labelledby="data-table-title"
        aria-describedby="data-table-description"
        role="table"
      />
      <Text 
        variant="caption" 
        color="muted"
        id="data-table-description"
        role="status"
        aria-live="polite"
      >
        {t('tables.users.description', { count: users.length })}
      </Text>
    </Stack>
  </Container>
);
```

## ✅ REQUIRED Norwegian Compliance

All components must include Norwegian Bokmål localization:

```typescript
// ✅ REQUIRED - Norwegian localization keys
const norwegianKeys = {
  'dashboard.title': 'Kontrollpanel',
  'metrics.revenue.title': 'Inntekter',
  'forms.email.label': 'E-postadresse',
  'forms.submit.text': 'Send inn',
  'nav.home.text': 'Hjem',
  'errors.network.message': 'Nettverksfeil oppstod',
};
```

## Support

- Enterprise compliance: `@xala-technologies/enterprise-standards`
- Norwegian validation: `xala validate --norwegian-compliance`
- WCAG testing: `xala test --accessibility --level=AAA`
- AI validation: `xala ai validate --all-rules`