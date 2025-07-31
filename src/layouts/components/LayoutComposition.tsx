/**
 * @fileoverview LayoutComposition Utilities v5.0.0 - Token-Based Design System
 * @description Layout composition patterns using SOLID principles
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { type ReactNode } from 'react';
import { BaseLayout, type BaseLayoutProps } from './BaseLayout';
import { LayoutSidebar } from './LayoutSidebar';
import { LayoutMainContent, type LayoutMainContentProps } from './LayoutMainContent';

// =============================================================================
// COMPOSITION INTERFACES
// =============================================================================

interface AppLayoutProps extends BaseLayoutProps {
  readonly header?: ReactNode;
  readonly sidebar?: ReactNode;
  readonly main: ReactNode;
  readonly footer?: ReactNode;
  readonly sidebarOpen?: boolean;
  readonly onSidebarClose?: () => void;
}

interface DashboardLayoutProps extends BaseLayoutProps {
  readonly header?: ReactNode;
  readonly sidebar?: ReactNode;
  readonly main: ReactNode;
  readonly footer?: ReactNode;
  readonly sidebarCollapsed?: boolean;
}

interface CenteredLayoutProps extends BaseLayoutProps {
  readonly header?: ReactNode;
  readonly main: ReactNode;
  readonly footer?: ReactNode;
  readonly maxWidth?: LayoutMainContentProps['maxWidth'];
}

// =============================================================================
// LAYOUT COMPOSITION UTILITIES
// =============================================================================

/**
 * Layout composition utilities following the Composition pattern (OCP)
 * Each layout is composable and can be extended without modification
 */
export const LayoutComposition = {
  /**
   * Standard app layout with header, sidebar, main content, and footer
   * Follows OCP by being open for extension through props composition
   */
  App: React.memo<AppLayoutProps>(({
    header,
    sidebar,
    main,
    footer,
    sidebarOpen = false,
    onSidebarClose,
    ...props
  }): React.ReactElement => (
    <BaseLayout {...props}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        {sidebar && (
          <LayoutSidebar open={sidebarOpen} onClose={onSidebarClose}>
            {sidebar}
          </LayoutSidebar>
        )}
        <LayoutMainContent>{main}</LayoutMainContent>
      </div>
      {footer}
    </BaseLayout>
  )),

  /**
   * Dashboard layout with collapsible sidebar
   * Follows ISP by providing a focused interface for dashboard needs
   */
  Dashboard: React.memo<DashboardLayoutProps>(({
    header,
    sidebar,
    main,
    footer,
    sidebarCollapsed = false,
    ...props
  }): React.ReactElement => (
    <BaseLayout {...props}>
      {header}
      <div className="flex flex-1 overflow-hidden">
        {sidebar && <LayoutSidebar collapsed={sidebarCollapsed}>{sidebar}</LayoutSidebar>}
        <LayoutMainContent maxWidth="full">{main}</LayoutMainContent>
      </div>
      {footer}
    </BaseLayout>
  )),

  /**
   * Centered layout for forms and content pages
   * Follows SRP by handling only centered content layout concerns
   */
  Centered: React.memo<CenteredLayoutProps>(({
    header,
    main,
    footer,
    maxWidth = 'md',
    ...props
  }): React.ReactElement => (
    <BaseLayout {...props}>
      {header}
      <LayoutMainContent maxWidth={maxWidth}>{main}</LayoutMainContent>
      {footer}
    </BaseLayout>
  )),
} as const;

// Set display names for better debugging
LayoutComposition.App.displayName = 'LayoutComposition.App';
LayoutComposition.Dashboard.displayName = 'LayoutComposition.Dashboard';
LayoutComposition.Centered.displayName = 'LayoutComposition.Centered';

// =============================================================================
// LAYOUT FACTORY (Factory Pattern for DIP)
// =============================================================================

/**
 * Layout factory for dependency injection pattern
 * Follows DIP by depending on abstractions (layout type) rather than concrete implementations
 */
export interface LayoutFactoryConfig {
  readonly type: 'app' | 'dashboard' | 'centered';
  readonly props: AppLayoutProps | DashboardLayoutProps | CenteredLayoutProps;
}

export const createLayout = (config: LayoutFactoryConfig): React.ReactElement => {
  switch (config.type) {
    case 'app':
      return <LayoutComposition.App {...(config.props as AppLayoutProps)} />;
    case 'dashboard':
      return <LayoutComposition.Dashboard {...(config.props as DashboardLayoutProps)} />;
    case 'centered':
      return <LayoutComposition.Centered {...(config.props as CenteredLayoutProps)} />;
    default:
      throw new Error(`Unknown layout type: ${(config as any).type}`);
  }
};

// =============================================================================
// LAYOUT CONTEXT PROVIDER (DIP)
// =============================================================================

interface LayoutContextValue {
  readonly layoutType: 'app' | 'dashboard' | 'centered';
  readonly setLayoutType: (type: 'app' | 'dashboard' | 'centered') => void;
}

const LayoutContext = React.createContext<LayoutContextValue | undefined>(undefined);

/**
 * Layout context provider for dependency injection
 * Follows DIP by providing layout configuration as an abstraction
 */
export const LayoutProvider: React.FC<{
  readonly children: ReactNode;
  readonly defaultLayoutType?: 'app' | 'dashboard' | 'centered';
}> = ({ children, defaultLayoutType = 'app' }) => {
  const [layoutType, setLayoutType] = React.useState<'app' | 'dashboard' | 'centered'>(defaultLayoutType);

  const contextValue = React.useMemo((): LayoutContextValue => ({
    layoutType,
    setLayoutType,
  }), [layoutType]);

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

/**
 * Hook to access layout context
 * Follows ISP by providing focused access to layout state
 */
export const useLayoutContext = (): LayoutContextValue => {
  const context = React.useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};