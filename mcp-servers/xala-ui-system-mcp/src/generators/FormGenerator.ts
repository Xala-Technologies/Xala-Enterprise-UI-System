/**
 * Form Generator for Xala UI System
 */

import type { FormConfig } from '../types/index.js';

export class FormGenerator {
  public generateForm(config: FormConfig): string {
    const { name, fields, validation, submission } = config;
    
    const fieldComponents = fields.map(field => {
      switch (field.type) {
        case 'input':
          return `
            <Input
              name="${field.name}"
              label="${field.label}"
              required={${field.required || false}}
              placeholder={t('form.${field.name}.placeholder')}
            />`;
        case 'textarea':
          return `
            <Textarea
              name="${field.name}"
              label="${field.label}"
              required={${field.required || false}}
              placeholder={t('form.${field.name}.placeholder')}
            />`;
        case 'select':
          return `
            <Select
              name="${field.name}"
              label="${field.label}"
              required={${field.required || false}}
              options={${field.name}Options}
            />`;
        default:
          return `<Input name="${field.name}" label="${field.label}" />`;
      }
    }).join('\n');

    return `
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Form, 
  Input, 
  Textarea, 
  Select, 
  Button, 
  Stack,
  useTokens 
} from '@xala-technologies/ui-system';

export interface ${name}Props {
  onSubmit?: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function ${name}({ onSubmit, onCancel }: ${name}Props): JSX.Element {
  const { t } = useTranslation();
  const tokens = useTokens();

  const handleSubmit = (data: Record<string, unknown>): void => {
    if (onSubmit) {
      onSubmit(data);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validation={${JSON.stringify(validation)}}
    >
      <Stack direction="vertical" gap={tokens.spacing.md}>
        ${fieldComponents}
        
        <Stack direction="horizontal" gap={tokens.spacing.sm} justify="end">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              {t('common.cancel')}
            </Button>
          )}
          <Button type="submit" variant="default">
            {t('common.submit')}
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}`;
  }
}
