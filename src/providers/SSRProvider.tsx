/* eslint-disable no-console */
/**
 * @fileoverview SSR Provider v5.0.0 - Token-Based Design System
 * @description SSR context provider for server-side rendering support
 * @version 5.0.0
 * @compliance SSR-Safe, Framework-agnostic, Production-ready, Token-based, SOLID
 */

import React, { createContext, useContext, useMemo } from 'react';
import type { SSRContext} from '../utils/ssr';
import { createSSRContext } from '../utils/ssr';

// =============================================================================
// SSR CONTEXT
// =============================================================================

const SSRContextProvider = createContext<SSRContext | null>(null);

// =============================================================================
// SSR PROVIDER TYPES
// =============================================================================

export interface SSRProviderProps {
  readonly children: React.ReactNode;
  readonly value?: Partial<SSRContext>;
  readonly userAgent?: string;
  readonly headers?: Record<string, string>;
  readonly cookies?: Record<string, string>;
  readonly url?: string;
  readonly pathname?: string;
  readonly search?: string;
}

// =============================================================================
// SSR PROVIDER COMPONENT
// =============================================================================

/**
 * SSR Provider component
 * Provides SSR context to child components
 */
export const SSRProvider: React.FC<SSRProviderProps> = ({
  children,
  value,
  userAgent,
  headers,
  cookies,
  url,
  pathname,
  search,
}) => {
  const contextValue = useMemo<SSRContext>(() => {
    if (value) {
      return createSSRContext({
        userAgent,
        headers,
        cookies,
        url,
        pathname,
        search,
        ...value,
      });
    }

    return createSSRContext({
      userAgent,
      headers,
      cookies,
      url,
      pathname,
      search,
    });
  }, [value, userAgent, headers, cookies, url, pathname, search]);

  return (
    <SSRContextProvider.Provider value={contextValue}>
      {children}
    </SSRContextProvider.Provider>
  );
};

// =============================================================================
// SSR CONTEXT HOOK
// =============================================================================

/**
 * Hook to consume SSR context
 */
export function useSSRProviderContext(): SSRContext {
  const context = useContext(SSRContextProvider);
  
  if (!context) {
    // Return default context if no provider
    return createSSRContext();
  }
  
  return context;
}

// =============================================================================
// HOC FOR SSR SUPPORT
// =============================================================================

/**
 * HOC to add SSR support to components
 */
export function withSSR<P extends object>(
  Component: React.ComponentType<P>,
  ssrContext?: Partial<SSRContext>
) {
  const WrappedComponent = (props: P) => {
    return (
      <SSRProvider value={ssrContext}>
        <Component {...props} />
      </SSRProvider>
    );
  };

  WrappedComponent.displayName = `withSSR(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

// =============================================================================
// SSR BOUNDARY COMPONENT
// =============================================================================

export interface SSRBoundaryProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface SSRBoundaryState {
  readonly hasError: boolean;
  readonly error?: Error;
}

/**
 * Error boundary for SSR-related errors
 */
export class SSRBoundary extends React.Component<SSRBoundaryProps, SSRBoundaryState> {
  constructor(props: SSRBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): SSRBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SSR Boundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="ssr-error-boundary">
          <h2>Something went wrong during SSR.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// =============================================================================
// SSR SAFE COMPONENT WRAPPER
// =============================================================================

export interface SSRSafeProps {
  readonly children: React.ReactNode;
  readonly fallback?: React.ReactNode;
  readonly clientOnly?: boolean;
}

/**
 * Component that renders children only on client-side
 */
export const SSRSafe: React.FC<SSRSafeProps> = ({
  children,
  fallback = null,
  clientOnly = true,
}) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (clientOnly && !isClient) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default SSRProvider;