import { Logger } from '@xala-technologies/enterprise-standards';
import React, { useRef, useState } from 'react';

import { useLocalization } from '../../../localization/hooks/useLocalization';

const logger = Logger.create({
  serviceName: 'ui-system-desktop-sidebar',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// DesktopSidebar - Norwegian government-compliant desktop sidebar component
interface DesktopSidebarProps {
  isCollapsed?: boolean;
  isResizable?: boolean;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  position?: 'left' | 'right';
  showToggle?: boolean;
  persistent?: boolean;
  overlay?: boolean;
  children: React.ReactNode;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  municipalityCode?: string;
  showQuickAccess?: boolean;
  onToggle?: (collapsed: boolean) => void;
  onResize?: (width: number) => void;
  style?: React.CSSProperties;
}

/**
 * DesktopSidebar - Norwegian government-compliant desktop sidebar component
 *
 * Features:
 * - Resizable sidebar with keyboard support
 * - NSM security classification display
 * - Norwegian government quick access
 * - Keyboard shortcuts support
 * - Municipality branding integration
 * - Hover-friendly interactions
 * - Design token integration
 * - Semantic HTML structure
 *
 * Norwegian Compliance:
 * - DigDir desktop guidelines
 * - NSM visual classification indicators
 * - Government workspace personalization
 * - Quick access to emergency contacts
 * - Norwegian keyboard shortcuts (Alt+S for sidebar)
 * - Municipal branding and context
 */
export const DesktopSidebar = React.forwardRef((props: DesktopSidebarProps, ref: unknown): React.ReactElement => {
  return (
    <>
      {/* Overlay for non-persistent sidebar */}
      {overlay && !isCollapsed && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 'var(--z-index-overlay)',
          }}
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={ref}
        role="complementary"
        aria-label={t('sidebar.navigation')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: `${sidebarWidth}px`,
          minWidth: isCollapsed ? '60px' : `${minWidth}px`,
          maxWidth: isCollapsed ? '60px' : `${maxWidth}px`,
          height: '100vh',
          backgroundColor: 'var(--color-surface-primary)',
          borderRight: position === 'left' ? '1px solid var(--color-border-subtle)' : 'none',
          borderLeft: position === 'right' ? '1px solid var(--color-border-subtle)' : 'none',
          position: persistent ? 'relative' : 'fixed',
          top: persistent ? 'auto' : '0',
          left: position === 'left' && !persistent ? '0' : 'auto',
          right: position === 'right' && !persistent ? '0' : 'auto',
          zIndex: persistent ? 'auto' : 'var(--z-index-sidebar)',
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
          ...getClassificationStyle(),
          ...style,
        }}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        {...restProps}
      >
        {/* Header with toggle and classification */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-3) var(--spacing-4)',
            borderBottom: '1px solid var(--color-border-subtle)',
            minHeight: 'var(--spacing-14)',
          }}
        >
          {/* Toggle button */}
          {showToggle && (
            <button
              type="button"
              onClick={handleToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'var(--spacing-8)',
                height: 'var(--spacing-8)',
                padding: 'var(--spacing-1)',
                border: 'none',
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label={t(`sidebar.${isCollapsed ? 'expand' : 'collapse'}`)}
              title={t('sidebar.toggleShortcut')} // Alt+S
            >
              <span
                style={{
                  fontSize: 'var(--font-size-lg)',
                  transform: isCollapsed ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                {position === 'left' ? '‹' : '›'}
              </span>
            </button>
          )}

          {/* Classification indicator */}
          {!isCollapsed && classification && (
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-secondary)',
                padding: 'var(--spacing-0-5) var(--spacing-2)',
                borderRadius: 'var(--border-radius-sm)',
                border: `1px solid ${getClassificationStyle().borderColor}`,
                backgroundColor: getClassificationStyle().backgroundColor,
              }}
            >
              {t(`nsm.classification.${classification.toLowerCase()}`)}
            </span>
          )}
        </header>

        {/* Quick access (Norwegian government services) */}
        {!isCollapsed && showQuickAccess && (
          <div
            style={{
              padding: 'var(--spacing-3) var(--spacing-4)',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            <h3
              style={{
                margin: '0 0 var(--spacing-2) 0',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {t('sidebar.quickAccess')}
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-1)',
              }}
            >
              {/* Emergency contacts */}
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  padding: 'var(--spacing-2)',
                  border: 'none',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ fontSize: 'var(--font-size-sm)' }}>🚨</span>
                <span style={{ fontSize: 'var(--font-size-sm)' }}>{t('sidebar.emergency')}</span>
              </button>

              {/* Help desk */}
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-2)',
                  padding: 'var(--spacing-2)',
                  border: 'none',
                  borderRadius: 'var(--border-radius-md)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  textAlign: 'left',
                  width: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ fontSize: 'var(--font-size-sm)' }}>💬</span>
                <span style={{ fontSize: 'var(--font-size-sm)' }}>{t('sidebar.helpDesk')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Main content */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: isCollapsed ? 'var(--spacing-2)' : 'var(--spacing-4)',
          }}
        >
          {children}
        </div>

        {/* Footer with municipality info */}
        {!isCollapsed && municipalityCode && (
          <footer
            style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              borderTop: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-surface-secondary)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {t('municipality.context', { code: municipalityCode })}
            </span>
          </footer>
        )}

        {/* Resize handle */}
        {isResizable && !isCollapsed && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              bottom: '0',
              right: position === 'left' ? '0' : 'auto',
              left: position === 'right' ? '0' : 'auto',
              width: '4px',
              backgroundColor: 'transparent',
              cursor: 'col-resize',
              zIndex: 1,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-primary-300)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title={t('sidebar.resize')}
          />
        )}
      </aside>
    </>
  );
});

DesktopSidebar.displayName = 'DesktopSidebar';
