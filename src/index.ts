/**
 * @fileoverview Xala UI System v6.0.0 - Enterprise Semantic Architecture
 * @description Clean, production-ready UI component library
 * @version 6.0.0
 */

// ===== SEMANTIC COMPONENTS (Core) =====
export * from './components/semantic';

// ===== UI COMPONENTS (Selective to avoid conflicts) =====
export {
  // Form components
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  type CheckboxGroupProps,
  type CheckboxOption,
  type CheckboxSize,
  type CheckboxVariant,
  
  // Layout UI components  
  Card,
  type CardProps,
  
  // Form UI components
  Textarea,
  type TextareaProps,
  type TextareaSize,
  type TextareaVariant,
  type TextareaResize,

  Select,
  type SelectProps,
  type SelectOption,
  type SelectSize,
  type SelectVariant
} from './components/ui';

// ===== PROVIDERS =====
export { ThemeProvider, type ThemeProviderProps } from './providers/ThemeProvider';
export { DesignSystemProvider, type DesignSystemProviderProps } from './providers/DesignSystemProvider';
export { BrandingProvider, type BrandingProviderProps } from './providers/BrandingProvider';
export { ResponsiveLayoutProvider, type ResponsiveLayoutProviderProps } from './providers/ResponsiveLayoutProvider';

// ===== HOOKS =====
export { useTokens } from './hooks/useTokens';
export { useMediaQuery } from './hooks/useMediaQuery';
export { useThemeTransition } from './hooks/useThemeTransition';
export { useDebounce } from './hooks/useDebounce';

// ===== TOKENS =====
export * from './tokens';
// Theme exports are included in tokens

// ===== UTILITIES =====
export { cn } from './lib/utils/cn';
export { classNames } from './utils/classNames';

// ===== TYPES =====
export type * from './types';

// ===== VERSION =====
export const UI_SYSTEM_VERSION = '6.0.0';
export const SEMANTIC_ARCHITECTURE_VERSION = '1.0.0';