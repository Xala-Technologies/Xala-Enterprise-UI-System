/**
 * Xala Universal Design System - Compliant Documentation
 * Generated with Xaheen CLI - Platform-Specific Implementation
 * 
 * MANDATORY COMPLIANCE RULES:
 * ❌ NO raw HTML elements (div, span, p, h1-h6, button, input, etc.) in components
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

# Xala Universal Design System

## Quick Start

```bash
npm install @xala-technologies/ui-system
```

## ✅ COMPLIANT Core Components

```typescript
import { Container, Stack, Text, Button } from '@xala-technologies/ui-system';

// ✅ REQUIRED - Interface with readonly props
interface DashboardProps {
  readonly title?: string;
}

// ✅ REQUIRED - Functional component with explicit return type
export const Dashboard = ({ title }: DashboardProps): JSX.Element => {
  return (
    <Container size="xl">
      <Stack direction="vertical" gap="xl">
        {/* ✅ REQUIRED - All text uses t() function */}
        <Text variant="h1" role="heading" aria-level={1}>
          {t('dashboard.title')}
        </Text>
        <Button 
          variant="primary" 
          size="lg"
          aria-label={t('actions.create.label')}
        >
          {t('actions.create.text')}
        </Button>
      </Stack>
    </Container>
  );
};
```

## ✅ COMPLIANT Token Usage

```typescript
import { Container, Card, Text } from '@xala-technologies/ui-system';

// ✅ REQUIRED - Only semantic components, NO raw HTML
export const TokenExample = (): JSX.Element => {
  return (
    <Container size="md">
      <Card 
        padding="xl" 
        variant="elevated"
        borderRadius="lg"
        role="region"
        aria-label={t('examples.card.label')}
      >
        <Text variant="body" color="primary">
          {t('examples.content.text')}
        </Text>
      </Card>
    </Container>
  );
};
```

## ✅ COMPLIANT Multi-Platform Support

- React, Vue, Angular, Flutter (semantic components only)
- iOS, Android, Web (WCAG 2.2 AAA compliant)
- SSR-safe with Next.js, Remix (no hydration issues)
- TypeScript-first with strict types (NO 'any' types)

## ✅ COMPLIANT CLI Tool

```bash
# ✅ All generated code follows compliance rules
npx @xala-technologies/xala-cli init my-app --compliant
npx @xala-technologies/xala-cli ai generate "user dashboard" --semantic-only
npx @xala-technologies/xala-cli build all --wcag-aaa
```

## ✅ REQUIRED Enterprise Features

- ✅ WCAG 2.2 AAA compliance (mandatory)
- ✅ Norwegian NSM/GDPR standards (mandatory)
- ✅ Multi-language support: EN/NO/FR/AR (t() function required)
- ✅ Enhanced 8pt grid system (8px increments only)
- ✅ Professional sizing standards (min h-12 buttons, h-14 inputs)

## ✅ COMPLIANT AI Integration

```typescript
// ✅ AI generates ONLY compliant code:
import { Container, Stack, Grid, MetricCard } from '@xala-technologies/ui-system';

export const AIDashboard = (): JSX.Element => (
  <Container size="xl">
    <Stack direction="vertical" gap="xl">
      <Text variant="h1" role="heading">{t('dashboard.title')}</Text>
      <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="lg">
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
```

## ❌ FORBIDDEN vs ✅ REQUIRED

```typescript
// ❌ FORBIDDEN - Raw HTML elements
<div className="p-4">
  <h1>Title</h1>
  <button onClick={handler}>Click</button>
</div>

// ✅ REQUIRED - Semantic components only
<Container padding="md">
  <Text variant="h1" role="heading">{t('page.title')}</Text>
  <Button onClick={handler} aria-label={t('actions.click.label')}>
    {t('actions.click.text')}
  </Button>
</Container>
```

## Support

- Enterprise standards: `@xala-technologies/enterprise-standards`
- CLI validation: `xala validate --compliance`
- Type safety: Zero 'any' types enforced
- Norwegian compliance: Built-in NSM/GDPR validation