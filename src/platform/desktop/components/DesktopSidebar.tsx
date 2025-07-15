import { Logger } from '@xala-technologies/enterprise-standards';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../../components/action-feedback/Button';
import type { DesktopSidebarProps } from '../../../types/platform.types';

const logger = Logger.create({
  serviceName: 'ui-system-desktop-sidebar',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

export const DesktopSidebar = React.forwardRef<HTMLElement, DesktopSidebarProps>(
  (
    {
      isOpen = true,
      collapsed = false,
      position = 'left',
      width = 280,
      minWidth = 240,
      maxWidth = 400,
      collapsible = true,
      children,
      style,
      onToggle,
      // _onClose removed - unused parameter
      ...restProps
    },
    ref
  ) => {
    const [sidebarWidth, setSidebarWidth] = useState(width);

    const handleToggle = useCallback((): void => {
      onToggle?.();

      // Audit log for user interaction
      logger.info('Sidebar toggled', {
        collapsed: !collapsed,
        timestamp: new Date().toISOString(),
        userId: 'current-user', // Replace with actual user ID
      });
    }, [collapsed, onToggle]);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent): void => {
        if (event.altKey && event.key === 's') {
          event.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    useEffect(() => {
      setSidebarWidth(collapsed ? 60 : width);
    }, [collapsed, width]);

    if (!isOpen) {
      return null;
    }

    return (
      <aside
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: `${sidebarWidth}px`,
          minWidth: collapsed ? '60px' : `${minWidth}px`,
          maxWidth: collapsed ? '60px' : `${maxWidth}px`,
          height: '100vh',
          backgroundColor: 'var(--color-surface-primary)',
          borderRight: position === 'left' ? '1px solid var(--color-border-subtle)' : 'none',
          borderLeft: position === 'right' ? '1px solid var(--color-border-subtle)' : 'none',
          position: 'relative',
          transition: 'width var(--transition-duration-normal) ease-in-out',
          overflow: 'hidden',
          ...style,
        }}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...restProps}
      >
        {/* Header with Toggle Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-4)',
            minHeight: 'var(--spacing-16)',
            borderBottom: '1px solid var(--color-border-subtle)',
          }}
        >
          {collapsible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggle}
              style={{
                minWidth: 'var(--spacing-8)',
                minHeight: 'var(--spacing-8)',
                padding: 'var(--spacing-1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={`${collapsed ? 'Expand' : 'Collapse'} sidebar`}
            >
              <span
                style={{
                  fontSize: 'var(--font-size-lg)',
                  transform: collapsed ? 'rotate(180deg)' : 'none',
                  transition: 'transform var(--transition-duration-fast) ease-in-out',
                }}
              >
                {position === 'left' ? '‹' : '›'}
              </span>
            </Button>
          )}
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: collapsed ? 'var(--spacing-2)' : 'var(--spacing-4)',
          }}
        >
          {children}
        </div>
      </aside>
    );
  }
);
