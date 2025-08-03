/**
 * @fileoverview Provider System Exports - Industry Standard Architecture
 * @description Centralized exports for all provider components and hooks
 * @version 5.0.0
 * @compliance SSR-Safe, Industry Standards, Enterprise-ready
 */

// Core Design System Provider
export {
  DesignSystemProvider,
  useDesignSystem,
  useTheme,
  useTemplates,
  type DesignSystemProviderProps,
} from './DesignSystemProvider';

// Branding System Provider
export {
  BrandingProvider,
  useBranding,
  useBrandColors,
  useBrandAssets,
  useIndustryBranding,
  type BrandingProviderProps,
  type BrandConfig,
  type BrandingContextValue,
} from './BrandingProvider';

export {
  ResponsiveLayoutProvider,
  useResponsiveLayoutContext,
  ResponsiveLayoutWrapper,
  LayoutRoute,
  ResponsiveLayoutDetector,
  LayoutTransition,
} from './ResponsiveLayoutProvider';

export type {
  ResponsiveLayoutProviderProps,
  ResponsiveLayoutContextValue,
  ResponsiveLayoutWrapperProps,
  LayoutRouteProps,
  ResponsiveLayoutDetectorProps,
  LayoutTransitionProps,
} from './ResponsiveLayoutProvider';

// SSR Provider
export {
  SSRProvider,
  useSSRProviderContext,
  withSSR,
  SSRBoundary,
  SSRSafe,
} from './SSRProvider';

export type {
  SSRProviderProps,
  SSRBoundaryProps,
  SSRSafeProps,
} from './SSRProvider';

// Hydration Provider
export {
  HydrationProvider,
  useHydration,
  useHydrationSafeContent,
  useConditionalRender,
  HydrationWrapper,
  HydratedOnly,
  HydratingOnly,
  createHydrationSafeState,
  injectThemeIntoHTML,
  withHydration,
} from './HydrationProvider';

export type {
  HydrationProviderProps,
  HydrationContextValue,
  HydrationWrapperProps,
} from './HydrationProvider';

// Theme Provider (New Industry-Standard Theme System)
export {
  ThemeProvider,
  ThemeScript,
  useTheme,
  themeUtils,
  withTheme,
  getServerSideTheme,
} from './ThemeProvider';

export type {
  ThemeProviderProps,
  ThemeScriptProps,
} from './ThemeProvider';
