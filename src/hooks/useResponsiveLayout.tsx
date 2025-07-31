/**
 * @fileoverview useResponsiveLayout Hook v5.0.0 - Token-Based Design System
 * @description Hook for responsive layout switching based on viewport size
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based
 */

import React, { useEffect, useState } from 'react';
import { useMediaQuery, usePlatform } from '../hooks';
import { useTokens } from './useTokens';

type LayoutType = 'mobile' | 'tablet' | 'desktop' | 'web' | 'admin';

export interface UseResponsiveLayoutOptions {
  /** Force a specific layout type */
  forceLayout?: LayoutType;
  /** Custom breakpoints */
  breakpoints?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Enable automatic switching */
  autoSwitch?: boolean;
  /** Callback when layout changes */
  onLayoutChange?: (layout: LayoutType) => void;
}

export interface UseResponsiveLayoutReturn {
  /** Current layout type */
  layout: LayoutType;
  /** Manually set layout */
  setLayout: (layout: LayoutType) => void;
  /** Check if current layout matches */
  isLayout: (layout: LayoutType) => boolean;
  /** Get layout-specific classes */
  getLayoutClasses: () => string;
  /** Check if in responsive mode */
  isResponsive: boolean;
}

/**
 * Hook for responsive layout switching
 */
export const useResponsiveLayout = (options: UseResponsiveLayoutOptions = {}): UseResponsiveLayoutReturn => {
  const {
    forceLayout,
    breakpoints = {},
    autoSwitch = true,
    onLayoutChange,
  } = options;

  const { getToken } = useTokens();
  const { platform } = usePlatform();

  // Get default breakpoints from tokens or use fallbacks
  const defaultBreakpoints = {
    mobile: parseInt(getToken('screens.sm') as string || '640'),
    tablet: parseInt(getToken('screens.md') as string || '768'),
    desktop: parseInt(getToken('screens.lg') as string || '1024'),
  };

  const mergedBreakpoints = {
    ...defaultBreakpoints,
    ...breakpoints,
  };

  // Media queries for different layouts
  const isMobile = useMediaQuery(`(max-width: ${mergedBreakpoints.mobile - 1}px)`);
  const isTablet = useMediaQuery(`(min-width: ${mergedBreakpoints.mobile}px) and (max-width: ${mergedBreakpoints.tablet - 1}px)`);
  const isDesktop = useMediaQuery(`(min-width: ${mergedBreakpoints.tablet}px) and (max-width: ${mergedBreakpoints.desktop - 1}px)`);
  const isWeb = useMediaQuery(`(min-width: ${mergedBreakpoints.desktop}px)`);

  const [currentLayout, setCurrentLayout] = useState<LayoutType>(() => {
    if (forceLayout) return forceLayout;
    if (platform === 'mobile') return 'mobile';
    if (platform === 'tablet') return 'tablet';
    return 'desktop';
  });

  // Auto-switch layout based on viewport
  useEffect(() => {
    if (!autoSwitch || forceLayout) return;

    let newLayout: LayoutType = 'desktop';

    if (isMobile) {
      newLayout = 'mobile';
    } else if (isTablet) {
      newLayout = 'tablet';
    } else if (isDesktop) {
      newLayout = 'desktop';
    } else if (isWeb) {
      newLayout = 'web';
    }

    if (newLayout !== currentLayout) {
      setCurrentLayout(newLayout);
      onLayoutChange?.(newLayout);
    }
  }, [isMobile, isTablet, isDesktop, isWeb, currentLayout, autoSwitch, forceLayout, onLayoutChange]);

  const setLayout = React.useCallback((layout: LayoutType) => {
    setCurrentLayout(layout);
    onLayoutChange?.(layout);
  }, [onLayoutChange]);

  const isLayout = React.useCallback((layout: LayoutType) => {
    return currentLayout === layout;
  }, [currentLayout]);

  const getLayoutClasses = React.useCallback(() => {
    const classes = [
      `layout-${currentLayout}`,
      platform && `platform-${platform}`,
    ].filter(Boolean).join(' ');

    return classes;
  }, [currentLayout, platform]);

  return {
    layout: currentLayout,
    setLayout,
    isLayout,
    getLayoutClasses,
    isResponsive: autoSwitch && !forceLayout,
  };
};

/**
 * Layout switcher component for manual layout selection
 */
export interface LayoutSwitcherProps {
  /** Current layout */
  currentLayout?: LayoutType;
  /** Available layouts */
  layouts?: LayoutType[];
  /** Change handler */
  onChange?: (layout: LayoutType) => void;
  /** Additional CSS classes */
  className?: string;
  /** Show labels */
  showLabels?: boolean;
}

export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  currentLayout,
  layouts = ['mobile', 'tablet', 'desktop', 'web'],
  onChange,
  className = '',
  showLabels = true,
}) => {
  const { colors, spacing, typography } = useTokens();
  const { layout: defaultLayout, setLayout } = useResponsiveLayout({ autoSwitch: false });

  const activeLayout = currentLayout || defaultLayout;

  const buttonStyles = React.useMemo((): React.CSSProperties => ({
    padding: `${spacing?.[2] || '0.5rem'} ${spacing?.[3] || '0.75rem'}`,
    fontSize: typography?.fontSize?.sm || '0.875rem',
    border: `1px solid ${colors.border?.default || '#e2e8f0'}`,
    backgroundColor: colors.background?.default || '#ffffff',
    color: colors.text?.primary || '#111827',
    cursor: 'pointer',
    transition: 'all 150ms ease-in-out',
  }), [colors, spacing, typography]);

  const activeButtonStyles = React.useMemo((): React.CSSProperties => ({
    ...buttonStyles,
    backgroundColor: colors.primary?.[500] || '#3b82f6',
    color: colors.primary?.foreground || '#ffffff',
    borderColor: colors.primary?.[500] || '#3b82f6',
  }), [buttonStyles, colors]);

  const handleLayoutChange = (layout: LayoutType) => {
    setLayout(layout);
    onChange?.(layout);
  };

  const layoutIcons: Record<LayoutType, React.ReactNode> = {
    mobile: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h10V4H7zm5 14a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    tablet: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm0 2v8h16V8H4zm8 10a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    desktop: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 4h18a1 1 0 011 1v11a1 1 0 01-1 1h-7v2h3a1 1 0 110 2H7a1 1 0 110-2h3v-2H3a1 1 0 01-1-1V5a1 1 0 011-1zm1 2v9h16V6H4z" />
      </svg>
    ),
    web: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    admin: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.86L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
      </svg>
    ),
  };

  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label="Layout switcher">
      {layouts.map((layout) => (
        <button
          key={layout}
          onClick={() => handleLayoutChange(layout)}
          style={activeLayout === layout ? activeButtonStyles : buttonStyles}
          className="flex items-center gap-2 rounded-md"
          aria-label={`Switch to ${layout} layout`}
          aria-pressed={activeLayout === layout}
        >
          {layoutIcons[layout]}
          {showLabels && <span className="capitalize">{layout}</span>}
        </button>
      ))}
    </div>
  );
};

/**
 * Higher-order component for responsive layouts
 */
export function withResponsiveLayout<P extends object>(
  Component: React.ComponentType<P & { layout: LayoutType }>,
  options?: UseResponsiveLayoutOptions
): React.ComponentType<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    const { layout } = useResponsiveLayout(options);
    return <Component {...props} layout={layout} />;
  };
  
  WrappedComponent.displayName = `withResponsiveLayout(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
}

/**
 * Layout-specific rendering component
 */
export interface ResponsiveLayoutProps {
  /** Children or render prop */
  children: React.ReactNode | ((layout: LayoutType) => React.ReactNode);
  /** Specific layouts to render for */
  only?: LayoutType | LayoutType[];
  /** Layouts to exclude */
  except?: LayoutType | LayoutType[];
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  only,
  except,
}) => {
  const { layout } = useResponsiveLayout();

  const shouldRender = React.useMemo(() => {
    if (only) {
      const onlyLayouts = Array.isArray(only) ? only : [only];
      return onlyLayouts.includes(layout);
    }

    if (except) {
      const exceptLayouts = Array.isArray(except) ? except : [except];
      return !exceptLayouts.includes(layout);
    }

    return true;
  }, [layout, only, except]);

  if (!shouldRender) return null;

  if (typeof children === 'function') {
    return <>{children(layout)}</>;
  }

  return <>{children}</>;
};

// Export all related types
export type { LayoutType };