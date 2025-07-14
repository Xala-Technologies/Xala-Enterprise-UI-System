import { Logger } from '@xala-technologies/enterprise-standards';
import React, { useCallback } from 'react';

const logger = Logger.create({
  serviceName: 'ui-system-mobile-drawer',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

interface MobileDrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const MobileDrawer = React.forwardRef<HTMLElement, MobileDrawerProps>(
  (
    { isOpen, onClose, title, position = 'left', size = 'md', children, style, ...restProps },
    ref
  ) => {
    const handleClose = useCallback((): void => {
      onClose?.();

      // Audit log for user interaction
      logger.info('Drawer closed', {
        timestamp: new Date().toISOString(),
        userId: 'current-user', // Replace with actual user ID
      });
    }, [onClose]);

    if (!isOpen) {
      return null;
    }

    const getSizeStyle = (): React.CSSProperties => {
      const widths = {
        sm: '280px',
        md: '320px',
        lg: '400px',
      };

      return { width: widths[size] };
    };

    const getPositionStyle = (): React.CSSProperties => {
      const positions = {
        left: { left: '0', right: 'auto' },
        right: { left: 'auto', right: '0' },
      };

      return positions[position];
    };

    return (
      <>
        {/* Backdrop */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 'var(--z-index-modal)',
          }}
          onClick={handleClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <aside
          ref={ref}
          style={{
            position: 'fixed',
            top: 0,
            bottom: 0,
            zIndex: 'var(--z-index-modal)',
            backgroundColor: 'var(--color-surface-primary)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            ...getSizeStyle(),
            ...getPositionStyle(),
            ...style,
          }}
          {...restProps}
        >
          {/* Header */}
          {title && (
            <header
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-4)',
                borderBottom: '1px solid var(--color-border-subtle)',
              }}
            >
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {title}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 'var(--spacing-2)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-xl)',
                  color: 'var(--color-text-secondary)',
                  borderRadius: 'var(--border-radius-sm)',
                  transition: 'all var(--transition-duration-fast) ease-in-out',
                }}
                aria-label="Close drawer"
              >
                <span style={{ fontSize: 'var(--font-size-xl)' }}>×</span>
              </button>
            </header>
          )}

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: 'var(--spacing-4)',
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        </aside>
      </>
    );
  }
);

MobileDrawer.displayName = 'MobileDrawer';
