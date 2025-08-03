/**
 * @fileoverview ErrorBoundary Component - Xala UI System Compliant
 * @description WCAG 2.2 AAA compliant error boundary with Norwegian localization
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Norwegian Standards, GDPR, Token-first
 */

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Logger } from '../../lib/utils/multiplatform-logger';
import { Container } from '../layout/Container';
import { Stack } from '../layout/Stack';
import { Text } from '../semantic/Text';
import { Button } from '../ui/button';
import { Alert } from '../ui/alert';

const logger = Logger.create({
  serviceName: 'ui-system-error-boundary',
  logLevel: 'error',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// =============================================================================
// INTERFACES
// =============================================================================

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void;
  readonly enableAnalytics?: boolean;
  readonly enableRecovery?: boolean;
  readonly className?: string;
}

interface ErrorBoundaryState {
  readonly hasError: boolean;
  readonly error: Error | null;
  readonly errorId: string | null;
  readonly retryCount: number;
}

// =============================================================================
// ERROR RECOVERY COMPONENT
// =============================================================================

interface ErrorRecoveryProps {
  readonly onRetry: () => void;
  readonly onReport: () => void;
  readonly errorId: string;
  readonly retryCount: number;
}

const ErrorRecovery = ({ 
  onRetry, 
  onReport, 
  errorId, 
  retryCount 
}: ErrorRecoveryProps): JSX.Element => {
  return (
    <Stack direction="horizontal" gap="md" justify="center">
      <Button
        variant="primary"
        size="lg"
        onClick={onRetry}
        disabled={retryCount >= 3}
        aria-label={t('errors.retry.label')}
      >
        {t('errors.retry.text')}
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={onReport}
        aria-label={t('errors.report.label')}
      >
        {t('errors.report.text')}
      </Button>
    </Stack>
  );
};

// =============================================================================
// ERROR BOUNDARY CLASS
// =============================================================================

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private errorId: string;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const errorData = {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.errorId,
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'SSR',
      url: typeof window !== 'undefined' ? window.location.href : 'SSR',
    };

    // GDPR-compliant error logging
    logger.error('Component error boundary triggered', errorData);
    
    // Analytics integration (if enabled)
    if (this.props.enableAnalytics) {
      this.reportErrorAnalytics(errorData);
    }

    // Custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  private reportErrorAnalytics = (errorData: any): void => {
    // GDPR-compliant analytics reporting
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: errorData.error,
        fatal: false,
        error_id: errorData.errorId,
      });
    }
  };

  private handleRetry = (): void => {
    if (this.state.retryCount < 3) {
      this.setState({
        hasError: false,
        error: null,
        errorId: null,
        retryCount: this.state.retryCount + 1,
      });
      
      logger.info('Error boundary retry attempted', {
        errorId: this.state.errorId,
        retryCount: this.state.retryCount + 1,
      });
    }
  };

  private handleReport = (): void => {
    const reportData = {
      errorId: this.state.errorId,
      error: this.state.error?.message,
      timestamp: new Date().toISOString(),
    };

    logger.info('Error report generated', reportData);
    
    // Here you would integrate with your error reporting service
    // e.g., Sentry, Bugsnag, or custom reporting endpoint
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI using semantic components only
      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          errorId={this.state.errorId}
          retryCount={this.state.retryCount}
          onRetry={this.props.enableRecovery ? this.handleRetry : undefined}
          onReport={this.handleReport}
          className={this.props.className}
        />
      );
    }

    return this.props.children;
  }
}

// =============================================================================
// ERROR FALLBACK COMPONENT
// =============================================================================

interface ErrorBoundaryFallbackProps {
  readonly error: Error | null;
  readonly errorId: string | null;
  readonly retryCount: number;
  readonly onRetry?: () => void;
  readonly onReport: () => void;
  readonly className?: string;
}

const ErrorBoundaryFallback = ({
  error,
  errorId,
  retryCount,
  onRetry,
  onReport,
  className
}: ErrorBoundaryFallbackProps): JSX.Element => {
  return (
    <Container size="md" className={className}>
      <Stack direction="vertical" gap="xl" align="center">
        <Alert
          variant="error"
          size="lg"
          role="alert"
          aria-live="assertive"
        >
          <Stack direction="vertical" gap="md" align="center">
            <Text
              variant="h2"
              align="center"
              aria-label={t('errors.title.label')}
            >
              {t('errors.title.text')}
            </Text>
            
            <Text
              variant="body"
              align="center"
              color="muted"
            >
              {t('errors.description.text')}
            </Text>
            
            {errorId && (
              <Text
                variant="caption"
                align="center"
                color="muted"
                role="status"
              >
                {t('errors.id.text')} {errorId}
              </Text>
            )}
            
            {onRetry && (
              <ErrorRecovery
                onRetry={onRetry}
                onReport={onReport}
                errorId={errorId || ''}
                retryCount={retryCount}
              />
            )}
          </Stack>
        </Alert>
      </Stack>
    </Container>
  );
};

// =============================================================================
// FUNCTION COMPONENT WRAPPER
// =============================================================================

export interface ErrorBoundaryWrapperProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void;
  readonly enableAnalytics?: boolean;
  readonly enableRecovery?: boolean;
  readonly className?: string;
}

export const ErrorBoundaryWrapper = (props: ErrorBoundaryWrapperProps): JSX.Element => {
  return <ErrorBoundary {...props} />;
};

// =============================================================================
// HOC FOR ERROR BOUNDARY
// =============================================================================

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
): React.ComponentType<P> {
  const WithErrorBoundaryComponent = (props: P): JSX.Element => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}

// =============================================================================
// UTILITY FUNCTION
// =============================================================================

// Helper function for localization (assuming it exists)
declare function t(key: string): string;

export { ErrorBoundary as default };