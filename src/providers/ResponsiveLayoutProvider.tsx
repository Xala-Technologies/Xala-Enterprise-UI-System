/**
 * @fileoverview ResponsiveLayoutProvider v5.0.0 - Token-Based Design System
 * @description Provider for automatic responsive layout switching
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { createContext, useContext, useEffect } from 'react';
import { useResponsiveLayout, type LayoutType } from '../hooks/useResponsiveLayout';
import { MobileLayout } from '../layouts/mobile/MobileLayout';
import { TabletLayout } from '../layouts/tablet/TabletLayout';
import { DesktopLayout } from '../layouts/desktop/DesktopLayout';
import { WebLayout } from '../layouts/web/WebLayout';
import { AdminLayout } from '../layouts/admin/AdminLayout';
import { BaseLayout } from '../layouts/BaseLayout';
import type { ReactNode } from 'react';

// =============================================================================
// RESPONSIVE LAYOUT CONTEXT
// =============================================================================

export interface ResponsiveLayoutContextValue {
  /** Current layout type */
  currentLayout: LayoutType;
  /** Switch to a specific layout */
  switchLayout: (layout: LayoutType) => void;
  /** Check if responsive mode is active */
  isResponsive: boolean;
  /** Get layout component */
  getLayoutComponent: () => React.ComponentType<any>;
}

const ResponsiveLayoutContext = createContext<ResponsiveLayoutContextValue | undefined>(undefined);

/**
 * Hook to access responsive layout context
 */
export const useResponsiveLayoutContext = (): ResponsiveLayoutContextValue => {
  const context = useContext(ResponsiveLayoutContext);
  if (!context) {
    throw new Error('useResponsiveLayoutContext must be used within ResponsiveLayoutProvider');
  }
  return context;
};

// =============================================================================
// RESPONSIVE LAYOUT PROVIDER
// =============================================================================

export interface ResponsiveLayoutProviderProps {
  /** Children to render */
  children: ReactNode;
  /** Force a specific layout */
  forceLayout?: LayoutType;
  /** Custom layout components */
  layouts?: Partial<Record<LayoutType, React.ComponentType<any>>>;
  /** Enable automatic switching */
  autoSwitch?: boolean;
  /** Custom breakpoints */
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Callback when layout changes */
  onLayoutChange?: (layout: LayoutType) => void;
  /** Default layout props */
  layoutProps?: Record<string, any>;
}

/**
 * Provider for responsive layout switching
 */
export const ResponsiveLayoutProvider: React.FC<ResponsiveLayoutProviderProps> = ({
  children,
  forceLayout,
  layouts: customLayouts = {},
  autoSwitch = true,
  breakpoints,
  onLayoutChange,
  layoutProps = {},
}) => {
  const { layout, setLayout, isResponsive } = useResponsiveLayout({
    forceLayout,
    autoSwitch,
    breakpoints,
    onLayoutChange,
  });

  // Default layout components
  const defaultLayouts: Record<LayoutType, React.ComponentType<any>> = {
    mobile: MobileLayout,
    tablet: TabletLayout,
    desktop: DesktopLayout,
    web: WebLayout,
    admin: AdminLayout,
  };

  // Merge custom layouts with defaults
  const layoutComponents = {
    ...defaultLayouts,
    ...customLayouts,
  };

  const getLayoutComponent = React.useCallback((): React.ComponentType<any> => {
    return layoutComponents[layout] || BaseLayout;
  }, [layout, layoutComponents]);

  const contextValue = React.useMemo<ResponsiveLayoutContextValue>(() => ({
    currentLayout: layout,
    switchLayout: setLayout,
    isResponsive,
    getLayoutComponent,
  }), [layout, setLayout, isResponsive, getLayoutComponent]);

  const LayoutComponent = getLayoutComponent();

  return (
    <ResponsiveLayoutContext.Provider value={contextValue}>
      <LayoutComponent {...layoutProps}>
        {children}
      </LayoutComponent>
    </ResponsiveLayoutContext.Provider>
  );
};

// =============================================================================
// RESPONSIVE LAYOUT WRAPPER
// =============================================================================

export interface ResponsiveLayoutWrapperProps {
  /** Children to render */
  children: ReactNode;
  /** Layout type to use */
  layout?: LayoutType;
  /** Layout-specific props */
  layoutProps?: Record<string, any>;
  /** Enable automatic switching */
  autoSwitch?: boolean;
}

/**
 * Wrapper component for responsive layouts without provider
 */
export const ResponsiveLayoutWrapper: React.FC<ResponsiveLayoutWrapperProps> = ({
  children,
  layout: forcedLayout,
  layoutProps = {},
  autoSwitch = true,
}) => {
  const { layout } = useResponsiveLayout({
    forceLayout: forcedLayout,
    autoSwitch,
  });

  const layouts: Record<LayoutType, React.ComponentType<any>> = {
    mobile: MobileLayout,
    tablet: TabletLayout,
    desktop: DesktopLayout,
    web: WebLayout,
    admin: AdminLayout,
  };

  const LayoutComponent = layouts[layout] || BaseLayout;

  return (
    <LayoutComponent {...layoutProps}>
      {children}
    </LayoutComponent>
  );
};

// =============================================================================
// LAYOUT ROUTE COMPONENT
// =============================================================================

export interface LayoutRouteProps {
  /** Component to render */
  component: React.ComponentType<any>;
  /** Layout type for this route */
  layout?: LayoutType;
  /** Layout props */
  layoutProps?: Record<string, any>;
  /** Component props */
  componentProps?: Record<string, any>;
}

/**
 * Route component with layout
 */
export const LayoutRoute: React.FC<LayoutRouteProps> = ({
  component: Component,
  layout,
  layoutProps = {},
  componentProps = {},
}) => {
  return (
    <ResponsiveLayoutWrapper layout={layout} layoutProps={layoutProps}>
      <Component {...componentProps} />
    </ResponsiveLayoutWrapper>
  );
};

// =============================================================================
// RESPONSIVE LAYOUT DETECTOR
// =============================================================================

export interface ResponsiveLayoutDetectorProps {
  /** Callback with detected layout */
  onDetect: (layout: LayoutType) => void;
  /** Continuous detection */
  continuous?: boolean;
}

/**
 * Component for detecting current layout
 */
export const ResponsiveLayoutDetector: React.FC<ResponsiveLayoutDetectorProps> = ({
  onDetect,
  continuous = false,
}) => {
  const { layout } = useResponsiveLayout();

  useEffect(() => {
    onDetect(layout);
  }, continuous ? [layout, onDetect] : [onDetect]);

  return null;
};

// =============================================================================
// LAYOUT TRANSITION COMPONENT
// =============================================================================

export interface LayoutTransitionProps {
  /** Children to render */
  children: ReactNode;
  /** Transition duration in ms */
  duration?: number;
  /** Transition type */
  transition?: 'fade' | 'slide' | 'scale' | 'none';
}

/**
 * Component for smooth layout transitions
 */
export const LayoutTransition: React.FC<LayoutTransitionProps> = ({
  children,
  duration = 300,
  transition = 'fade',
}) => {
  const { layout } = useResponsiveLayout();
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [displayLayout, setDisplayLayout] = React.useState(layout);

  useEffect(() => {
    if (layout !== displayLayout) {
      setIsTransitioning(true);
      setTimeout(() => {
        setDisplayLayout(layout);
        setIsTransitioning(false);
      }, duration / 2);
    }
  }, [layout, displayLayout, duration]);

  const transitionStyles = React.useMemo((): React.CSSProperties => {
    if (transition === 'none' || !isTransitioning) {
      return {};
    }

    const baseStyles: React.CSSProperties = {
      transition: `all ${duration}ms ease-in-out`,
    };

    switch (transition) {
      case 'fade':
        return {
          ...baseStyles,
          opacity: isTransitioning ? 0 : 1,
        };
      case 'slide':
        return {
          ...baseStyles,
          transform: isTransitioning ? 'translateX(-20px)' : 'translateX(0)',
          opacity: isTransitioning ? 0 : 1,
        };
      case 'scale':
        return {
          ...baseStyles,
          transform: isTransitioning ? 'scale(0.95)' : 'scale(1)',
          opacity: isTransitioning ? 0 : 1,
        };
      default:
        return baseStyles;
    }
  }, [transition, isTransitioning, duration]);

  return (
    <div style={transitionStyles}>
      {children}
    </div>
  );
};

// Export all types
export type {
  LayoutType,
} from '../hooks/useResponsiveLayout';