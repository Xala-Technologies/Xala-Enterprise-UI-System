/**
 * Data Table Generator for Xala UI System
 */

import type { DataTableConfig } from '../types/index.js';

export class DataTableGenerator {
  public generateDataTable(config: DataTableConfig): string {
    const { name, columns, features, actions } = config;
    
    const columnDefinitions = columns.map(col => `
    {
      key: '${col.key}',
      label: t('table.columns.${col.key}'),
      type: '${col.type}',
      sortable: ${col.sortable || false},
      filterable: ${col.filterable || false}
    }`).join(',');

    const actionButtons = actions?.map(action => `
    {
      key: '${action.key}',
      label: t('table.actions.${action.key}'),
      icon: '${action.icon}',
      variant: '${action.variant}',
      onClick: (row: Record<string, unknown>) => handle${action.key.charAt(0).toUpperCase() + action.key.slice(1)}(row)
    }`).join(',') || '';

    return `
import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  DataTable, 
  Button, 
  Stack,
  useTokens 
} from '@xala-technologies/ui-system';

export interface ${name}Props {
  data: Record<string, unknown>[];
  onRowSelect?: (rows: Record<string, unknown>[]) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, unknown>) => void;
}

export function ${name}({ 
  data, 
  onRowSelect, 
  onSort, 
  onFilter 
}: ${name}Props): JSX.Element {
  const { t } = useTranslation();
  const tokens = useTokens();

  const columns = [${columnDefinitions}];

  const actions = [${actionButtons}];

  ${actions?.map(action => `
  const handle${action.key.charAt(0).toUpperCase() + action.key.slice(1)} = (row: Record<string, unknown>): void => {
    console.log('${action.key}', row);
  };`).join('\n') || ''}

  return (
    <DataTable
      data={data}
      columns={columns}
      actions={actions}
      features={{
        sorting: ${features.sorting || false},
        filtering: ${features.filtering || false},
        pagination: ${features.pagination || false},
        selection: ${features.selection || false},
        search: ${features.search || false},
        export: ${features.export || false}
      }}
      onRowSelect={onRowSelect}
      onSort={onSort}
      onFilter={onFilter}
    />
  );
}`;
  }
}
