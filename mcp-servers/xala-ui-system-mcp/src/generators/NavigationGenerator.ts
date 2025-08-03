/**
 * Navigation Generator for Xala UI System
 */

import type { ComponentConfig } from '../types/index.js';

export class NavigationGenerator {
  public generateNavigation(config: ComponentConfig): string {
    const { name } = config;
    
    return `
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Navigation, 
  NavigationItem, 
  Stack,
  Button,
  useTokens 
} from '@xala-technologies/ui-system';

export interface ${name}Props {
  items?: Array<{
    key: string;
    label: string;
    href: string;
    icon?: string;
  }>;
  onItemClick?: (key: string) => void;
}

export function ${name}({ items = [], onItemClick }: ${name}Props): JSX.Element {
  const { t } = useTranslation();
  const tokens = useTokens();

  const handleItemClick = (key: string): void => {
    if (onItemClick) {
      onItemClick(key);
    }
  };

  return (
    <Navigation>
      <Stack direction="horizontal" gap={tokens.spacing.sm}>
        {items.map((item) => (
          <NavigationItem key={item.key}>
            <Button
              variant="ghost"
              onClick={() => handleItemClick(item.key)}
            >
              {t(\`navigation.\${item.key}\`)}
            </Button>
          </NavigationItem>
        ))}
      </Stack>
    </Navigation>
  );
}`;
  }
}
