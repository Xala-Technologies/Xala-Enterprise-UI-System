/**
 * @fileoverview Main UI System Entry Point - Production Optimized
 * @description Tree-shakeable exports organized for optimal bundle splitting
 * @version 4.0.0
 * @compliance SSR-Safe, Production-ready, Tree-shakeable
 */

// =============================================================================
// CORE PROVIDER & HOOKS (Essential for SSR)
// =============================================================================
export { useTokens } from './hooks/useTokens';
export type { UseTokensResult } from './hooks/useTokens';
export { DesignSystemProvider } from './providers/DesignSystemProvider';

// =============================================================================
// ESSENTIAL UI COMPONENTS (Most commonly used)
// =============================================================================
export { Container } from './components/layout/Container';
export { Button } from './components/ui/button';
export { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
export { Input } from './components/ui/input';

export type { ContainerProps } from './components/layout/Container';
export type { ButtonProps } from './components/ui/button';
export type { CardContentProps, CardFooterProps, CardHeaderProps, CardProps } from './components/ui/card';
export type { InputProps } from './components/ui/input';

// =============================================================================
// TEMPLATE SYSTEM (Dynamic loading for SSR optimization)
// =============================================================================
export { TemplateLoader } from './utils/templateLoader';

// =============================================================================
// LAYOUT COMPONENTS (Tree-shakeable)
// =============================================================================
export {
    Grid,
    GridItem, HStack, PageLayout, Section, Stack,
    VStack
} from './components/layout';

export type {
    GridItemProps, GridProps, StackProps
} from './components/layout';

// =============================================================================
// FORM COMPONENTS (Tree-shakeable)
// =============================================================================
export {
    Form, OrganizationNumberInput, PersonalNumberInput, Select,
    TextArea
} from './components/form';

export type {
    FormProps, OrganizationNumberInputProps, PersonalNumberInputProps, SelectProps,
    TextAreaProps
} from './components/form';

// =============================================================================
// DATA DISPLAY COMPONENTS (Tree-shakeable)
// =============================================================================
export {
    Badge,
    DataTable,
    KeyValueList,
    Tag,
    Tooltip
} from './components/data-display';

export type {
    BadgeProps,
    DataTableProps,
    KeyValueListProps,
    TagProps,
    TooltipProps
} from './components/data-display';

// =============================================================================
// ACTION & FEEDBACK COMPONENTS (Tree-shakeable)
// =============================================================================
export {
    Alert,
    Modal,
    Toast
} from './components/action-feedback';

export type {
    AlertProps,
    ModalProps,
    ToastProps
} from './components/action-feedback';

// =============================================================================
// PLATFORM COMPONENTS (Lazy-loadable for SSR)
// =============================================================================
// Desktop platform exports (lazy-loaded)
export const Desktop = {
  get Sidebar() { 
    return import('./components/platform/desktop/DesktopSidebar').then(m => m.DesktopSidebar);
  }
};

// Mobile platform exports (lazy-loaded)
export const Mobile = {
  get Header() { 
    return import('./components/platform/mobile/MobileHeader').then(m => m.MobileHeader);
  },
  get BottomNavigation() { 
    return import('./components/platform/mobile/BottomNavigation').then(m => m.BottomNavigation);
  }
};

// =============================================================================
// UTILITY TYPES & INTERFACES (Tree-shakeable)
// =============================================================================
export type {
    AccessibilityTokens, BrandingTokens, ColorTokens, ResponsiveTokens, SpacingTokens, TypographyTokens
} from './hooks/useTokens';

// =============================================================================
// ADVANCED FEATURES (Lazy-loadable)
// =============================================================================
// Load only when needed for bundle optimization
export const Advanced = {
  get GlobalSearch() {
    return import('./components/global-search/GlobalSearch').then(m => m.GlobalSearch);
  },
  get FilterBar() {
    return import('./components/filter-bar/FilterBar').then(m => m.FilterBar);
  },
  get NavigationComponents() {
    return import('./components/navigation/NavigationComponents');
  }
};

// =============================================================================
// UTILITIES (Tree-shakeable)
// =============================================================================
// Note: Some utilities not yet implemented - will be added in future versions

// =============================================================================
// LEGACY COMPATIBILITY (Deprecated - will be removed in v5.0.0)
// =============================================================================
/** @deprecated Use new component exports instead. Will be removed in v5.0.0 */
export * from './components/ui';
