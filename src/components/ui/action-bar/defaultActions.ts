/**
 * @fileoverview Default Actions Configuration v5.0.0 - Token-Based Design System
 * @description Default action configurations with Norwegian localization
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import type { ActionType } from './types';

// =============================================================================
// DEFAULT ACTION CONFIGURATIONS
// =============================================================================

/**
 * Default action configurations with Norwegian labels
 * Follows SRP by handling only action definition concerns
 */
export const defaultActions: Record<ActionType, Omit<import('./types').ActionConfig, 'onClick'>> = {
  copy: {
    type: 'copy',
    label: 'Copy',
    norwegianLabel: 'Kopier',
    iconPath: 'M20 9h-3V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3v3c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V11c0-1.1-.9-2-2-2zM4 17V6h11v3H9c-1.1 0-2 .9-2 2v6H4zm16 3H9v-8h11v8z',
    tooltip: 'Copy to clipboard',
    norwegianTooltip: 'Kopier til utklippstavlen',
    variant: 'ghost',
  },
  regenerate: {
    type: 'regenerate',
    label: 'Regenerate',
    norwegianLabel: 'Regenerer',
    iconPath: 'M4 12a8 8 0 0 1 8-8V2.5L16 6l-4 3.5V8a6 6 0 1 0 6 6h2a8 8 0 0 1-16 0z',
    tooltip: 'Regenerate content',
    norwegianTooltip: 'Generer innhold på nytt',
    variant: 'ghost',
  },
  edit: {
    type: 'edit',
    label: 'Edit',
    norwegianLabel: 'Rediger',
    iconPath: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    tooltip: 'Edit content',
    norwegianTooltip: 'Rediger innhold',
    variant: 'ghost',
  },
  delete: {
    type: 'delete',
    label: 'Delete',
    norwegianLabel: 'Slett',
    iconPath: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    tooltip: 'Delete item',
    norwegianTooltip: 'Slett element',
    variant: 'destructive',
    confirmRequired: true,
  },
  save: {
    type: 'save',
    label: 'Save',
    norwegianLabel: 'Lagre',
    iconPath: 'M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-4 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h11v6z',
    tooltip: 'Save changes',
    norwegianTooltip: 'Lagre endringer',
    variant: 'primary',
  },
  share: {
    type: 'share',
    label: 'Share',
    norwegianLabel: 'Del',
    iconPath: 'M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.50-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z',
    tooltip: 'Share content',
    norwegianTooltip: 'Del innhold',
    variant: 'ghost',
  },
  download: {
    type: 'download',
    label: 'Download',
    norwegianLabel: 'Last ned',
    iconPath: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
    tooltip: 'Download file',
    norwegianTooltip: 'Last ned fil',
    variant: 'ghost',
  },
  bookmark: {
    type: 'bookmark',
    label: 'Bookmark',
    norwegianLabel: 'Bokmerke',
    iconPath: 'M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z',
    tooltip: 'Add bookmark',
    norwegianTooltip: 'Legg til bokmerke',
    variant: 'ghost',
  },
  flag: {
    type: 'flag',
    label: 'Flag',
    norwegianLabel: 'Flagg',
    iconPath: 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z',
    tooltip: 'Flag content',
    norwegianTooltip: 'Flagg innhold',
    variant: 'ghost',
  },
  'thumbs-up': {
    type: 'thumbs-up',
    label: 'Like',
    norwegianLabel: 'Lik',
    iconPath: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z',
    tooltip: 'Like content',
    norwegianTooltip: 'Lik innhold',
    variant: 'ghost',
  },
  'thumbs-down': {
    type: 'thumbs-down',
    label: 'Dislike',
    norwegianLabel: 'Mis...',
    iconPath: 'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z',
    tooltip: 'Dislike content',
    norwegianTooltip: 'Mislik innhold',
    variant: 'ghost',
  },
  retry: {
    type: 'retry',
    label: 'Retry',
    norwegianLabel: 'Prøv igjen',
    iconPath: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z',
    tooltip: 'Retry action',
    norwegianTooltip: 'Prøv handlingen igjen',
    variant: 'ghost',
  },
  expand: {
    type: 'expand',
    label: 'Expand',
    norwegianLabel: 'Utvid',
    iconPath: 'M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z',
    tooltip: 'Expand content',
    norwegianTooltip: 'Utvid innhold',
    variant: 'ghost',
  },
  collapse: {
    type: 'collapse',
    label: 'Collapse',
    norwegianLabel: 'Skjul',
    iconPath: 'M7.41 18.59L8.83 20 12 16.83 15.17 20l1.41-1.41L12 14l-4.59 4.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z',
    tooltip: 'Collapse content',
    norwegianTooltip: 'Skjul innhold',
    variant: 'ghost',
  },
  more: {
    type: 'more',
    label: 'More',
    norwegianLabel: 'Mer',
    iconPath: 'M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
    tooltip: 'More options',
    norwegianTooltip: 'Flere alternativer',
    variant: 'ghost',
  },
};

// =============================================================================
// ACTION UTILITIES
// =============================================================================

/**
 * Create action configuration with default values
 * Follows Factory pattern for consistent action creation
 */
export const createAction = (
  type: ActionType,
  onClick: () => void,
  overrides?: Partial<import('./types').ActionConfig>
): import('./types').ActionConfig => {
  const defaultAction = defaultActions[type];
  return {
    ...defaultAction,
    onClick,
    ...overrides,
  };
};

/**
 * Create multiple actions from types
 * Utility for batch action creation
 */
export const createActions = (
  actionConfigs: Array<{ type: ActionType; onClick: () => void; overrides?: Partial<import('./types').ActionConfig> }>
): import('./types').ActionConfig[] => {
  return actionConfigs.map(({ type, onClick, overrides }) => 
    createAction(type, onClick, overrides)
  );
};