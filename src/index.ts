/**
 * @fileoverview Main UI System Index
 * @module UISystem
 * @description Generic UI system without country-specific compliance
 */

// =============================================================================
// CORE EXPORTS
// =============================================================================

// Components (includes platform components)
export * from './components';

// Layouts
export * from './layouts';

// Hooks
export * from './hooks';

// Tokens
export * from './tokens';

// Core types
export type {
  AccessibilityLevel,
  AccessibilityProps,
  AuditTrailEntry,
  CSSProperties,
  ComponentAccessibilityConfig,
  ComponentDefinition,
  ComponentProps,
  ComponentState,
  ComponentType,
  EventHandlers,
  PerformanceMetrics,
  SupportedLanguage,
  ThemeColors,
  ThemeDefinition,
  UISystemConfig,
  UISystemOptions,
} from './lib/types/core.types';

// =============================================================================
// ADDITIONAL TYPES (non-conflicting)
// =============================================================================

// Platform types (only export those not already in components)
export type {
  HoverFriendlyProps,
  PlatformComponentProps,
  PlatformDetection,
  PlatformTypes,
  ResponsiveBreakpoints,
  TouchFriendlyProps,
} from './types/platform.types';

// =============================================================================
// PROVIDERS AND HOOKS
// =============================================================================

// Re-export UISystemProvider
export {
  UISystemProvider,
  useAccessibility,
  useAccessibilityFeature,
  useUISystem,
} from './components/UISystemProvider';

// =============================================================================
// PACKAGE INFORMATION
// =============================================================================

export const UI_SYSTEM_INFO = {
  name: 'Generic UI System',
  version: '1.0.0',
  description: 'A generic, accessible UI system built with design tokens',
  features: [
    'Configurable accessibility (WCAG 2.1 AA to WCAG 2.2 AAA)',
    'Design token-based styling',
    'Multi-platform support',
    'TypeScript support',
    'Framework agnostic',
    'Customizable themes',
  ],
  accessibility: {
    levels: ['WCAG_2_1_AA', 'WCAG_2_1_AAA', 'WCAG_2_2_AA', 'WCAG_2_2_AAA'],
    configurable: true,
    optional: true,
  },
} as const;
