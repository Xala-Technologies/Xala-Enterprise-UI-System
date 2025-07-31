/**
 * Providers Index
 * Main exports for all UI system providers
 */

export { DesignSystemProvider } from './DesignSystemProvider';
export type { DesignSystemProviderProps } from './DesignSystemProvider';

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
