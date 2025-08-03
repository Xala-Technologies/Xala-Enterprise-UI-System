/**
 * UI Component Generator for Xala UI System
 */

import type { ComponentConfig } from '../types/index.js';

export class UIComponentGenerator {
  
  generateUIComponent(config: ComponentConfig): string {
    const componentName = this.toPascalCase(config.name);
    const propsInterface = `${componentName}Props`;
    
    return `// components/ui/${componentName}.tsx
import {
  ${this.generateImports(config).join(',\n  ')}
} from '@xala-technologies/ui-system';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
${config.features.icons ? "import { Loader2 } from 'lucide-react';" : ''}

export interface ${propsInterface} {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly variant?: '${config.styling.variant}';
  readonly size?: '${config.size || 'md'}';
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly onClick?: () => void;
  readonly 'data-testid'?: string;
  readonly 'aria-label'?: string;
}

export function ${componentName}({
  children,
  className,
  variant = '${config.styling.variant}',
  size = '${config.size || 'md'}',
  disabled = false,
  loading = false,
  onClick,
  'data-testid': testId,
  'aria-label': ariaLabel,
  ...props
}: ${propsInterface}): JSX.Element {
  const { t } = useTranslation();
  const { colors, spacing } = useTokens();

  ${this.generateEventHandlers(config)}

  return (
    <Container
      className={className}
      data-testid={testId}
      aria-label={ariaLabel || t('${config.name.toLowerCase()}.label')}
      style={{
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        ...props.style
      }}
      {...props}
    >
      ${this.generateComponentContent(config)}
    </Container>
  );
}`;
  }

  private generateImports(config: ComponentConfig): string[] {
    const baseImports = [
      'Container',
      'Stack',
      'Typography',
      'useTokens'
    ];

    const conditionalImports: string[] = [];

    if (config.features.interactive) {
      conditionalImports.push('Button', 'IconButton');
    }

    if (config.features.loading) {
      conditionalImports.push('Skeleton', 'Spinner');
    }

    if (config.features.error) {
      conditionalImports.push('Alert', 'AlertDescription');
    }

    if (config.features.badges) {
      conditionalImports.push('Badge');
    }

    if (config.features.tooltips) {
      conditionalImports.push('Tooltip', 'TooltipContent', 'TooltipTrigger');
    }

    if (config.features.searchable) {
      conditionalImports.push('GlobalSearch');
    }

    if (config.features.collapsible) {
      conditionalImports.push('Accordion', 'AccordionContent', 'AccordionItem', 'AccordionTrigger');
    }

    if (config.features.draggable) {
      conditionalImports.push('Card');
    }

    return [...new Set([...baseImports, ...conditionalImports])];
  }

  private generateEventHandlers(config: ComponentConfig): string {
    const handlers: string[] = [];

    if (config.features.interactive) {
      handlers.push(`  const handleClick = (): void => {
    if (onClick && !disabled && !loading) {
      onClick();
    }
  };`);
    }

    if (config.features.searchable) {
      handlers.push(`  const handleSearch = (query: string): void => {
    // Handle search functionality
    console.log('Search:', query);
  };`);
    }

    if (config.features.collapsible) {
      handlers.push(`  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleToggle = (): void => {
    setIsExpanded(!isExpanded);
  };`);
    }

    return handlers.join('\n\n');
  }

  private generateComponentContent(config: ComponentConfig): string {
    const content: string[] = [];

    if (config.features.loading) {
      content.push(`{loading && (
        <Stack direction="horizontal" align="center" gap="sm">
          <Spinner size="sm" />
          <Typography variant="body">
            {t('common.loading')}
          </Typography>
        </Stack>
      )}`);
    }

    if (config.features.error) {
      content.push(`{error && (
        <Alert variant="destructive">
          <AlertDescription>
            {t('${config.name.toLowerCase()}.error')}
          </AlertDescription>
        </Alert>
      )}`);
    }

    if (config.features.searchable) {
      content.push(`<GlobalSearch
        placeholder={t('${config.name.toLowerCase()}.searchPlaceholder')}
        onSubmit={handleSearch}
        variant="default"
        size={size}
      />`);
    }

    if (config.features.collapsible) {
      content.push(`<Accordion>
        <AccordionItem value="content">
          <AccordionTrigger onClick={handleToggle}>
            <Typography variant="h4">
              {t('${config.name.toLowerCase()}.title')}
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>`);
    } else {
      content.push(`<Stack direction="vertical" gap="md">
        <Typography variant="h3">
          {t('${config.name.toLowerCase()}.title')}
        </Typography>
        {children}
      </Stack>`);
    }

    if (config.features.interactive && !config.features.collapsible) {
      content.push(`{config.features.interactive && (
        <Stack direction="horizontal" gap="sm" style={{ marginTop: spacing.md }}>
          <Button
            variant={variant}
            size={size}
            disabled={disabled}
            loading={loading}
            onClick={handleClick}
          >
            {t('${config.name.toLowerCase()}.action')}
          </Button>
        </Stack>
      )}`);
    }

    return content.join('\n      ');
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '')
      .replace(/^./, str => str.toUpperCase());
  }
}
