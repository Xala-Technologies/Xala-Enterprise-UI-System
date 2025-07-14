// DesktopSidebar component for @xala-mock/ui-system
// Norwegian-compliant desktop sidebar with resizing and government features

import React, { useState, useRef, useEffect } from 'react';

import type { DesktopSidebarProps } from '../../../types/platform.types';

// Helper function to generate CSS using design tokens
const getDesktopSidebarStyles = (props: DesktopSidebarProps): React.CSSProperties => { const { isCollapsed = false,
    width = 280,
    position = 'left',
    persistent = true,
    overlay = false,
    norwegian, } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = { display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--background-secondary)',
    borderRight: position === 'left' ? 'var(--border-width) solid var(--border-secondary)' : 'none',
    borderLeft: position === 'right' ? 'var(--border-width) solid var(--border-secondary)' : 'none',
    fontFamily: 'var(--font-family-sans)',
    position: persistent ? 'relative' : 'fixed',
    top: persistent ? 'auto' : 0,
    left: position === 'left' && !persistent ? 0 : 'auto',
    right: position === 'right' && !persistent ? 0 : 'auto',
    zIndex: persistent ? 'auto' : 'var(--z-index-sidebar)',
    boxShadow: persistent ? 'none' : 'var(--shadow-xl)',
    transition: 'all var(--transition-duration-normal) ease',
    overflow: 'hidden', };

  // Width and collapsed styles
  const widthStyles = getWidthStyles(width, isCollapsed);

  // Overlay styles
  const overlayStyles = getOverlayStyles(overlay, persistent);

  // Classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return { ...baseStyles,
    ...widthStyles,
    ...overlayStyles,
    ...classificationStyles, }; };

// Get width-based styles
const getWidthStyles = (width: number, isCollapsed: boolean): React.CSSProperties => { return { width: isCollapsed ? 'var(--sidebar-collapsed-width)' : `${width}px`,
    minWidth: isCollapsed ? 'var(--sidebar-collapsed-width)' : `${width}px`, }; };

// Get overlay styles
const getOverlayStyles = (overlay: boolean, persistent: boolean): React.CSSProperties => { if (!overlay || persistent) { return {}; }

  return { backgroundColor: 'var(--color-black-alpha-50)',
    backdropFilter: 'blur(var(--blur-sm))', }; };

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => { if (!classification) { return {}; }

  const classificationStyles: Record<string, React.CSSProperties> = { ÅPEN: { borderLeft: 'var(--border-accent-width) solid var(--color-green-500)', },
    BEGRENSET: { borderLeft: 'var(--border-accent-width) solid var(--color-orange-500)', },
    KONFIDENSIELT: { borderLeft: 'var(--border-accent-width) solid var(--color-red-500)',
      backgroundColor: 'var(--color-red-25)', },
    HEMMELIG: { borderLeft: 'var(--border-accent-width) solid var(--color-red-800)',
      backgroundColor: 'var(--color-red-50)',
      boxShadow: '0 0 0 var(--border-width) var(--color-red-200), var(--shadow-xl)', }, };

  return classificationStyles[classification] || {}; };

// Sidebar header component
const SidebarHeader = ({ isCollapsed,
  showToggle,
  norwegian,
  onToggle, }: { isCollapsed: boolean;
  showToggle: boolean;
  norwegian?: unknown;
  onToggle?: () => void; }): React.ReactElement => { return (
    <div
      style={{ display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-4)',
        borderBottom: 'var(--border-width) solid var(--border-secondary)',
        minHeight: 'var(--sidebar-header-height)', }}
    >
      {/* Logo and branding */}
      {!isCollapsed && (
        <div
          style={{ display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)', }}
        >
          {norwegian?.municipalityBranding && (
            <div
              style={{ display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-2)', }}
            >
              <span style={{ fontSize: 'var(--font-size-xl)' }}>🏛️</span>
              <div>
                <div
                  style={{ fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--text-primary)', }}
                >
                  {norwegian.municipality || 'Kommune'}
                </div>
                <div
                  style={{ fontSize: 'var(--font-size-xs)',
                    color: 'var(--text-secondary)', }}
                >
                  Digitale tjenester
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Toggle button */}
      {showToggle && (
        <button
          style={{ width: 'var(--spacing-8)',
            height: 'var(--spacing-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            borderRadius: 'var(--border-radius-base)',
            backgroundColor: 'transparent',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-lg)',
            transition: 'all var(--transition-duration-fast) ease', }}
          onClick={onToggle}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Utvid sidepanel' : 'Skjul sidepanel'}
          onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-100)';
            (e.target as HTMLElement).style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent';
            (e.target as HTMLElement).style.color = 'var(--text-secondary)'; }}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      )}
    </div>
  ); };

// Classification banner component
const ClassificationBanner = ({ level }: { level: string }): React.ReactElement => { return (
    <div
      style={{ padding: 'var(--spacing-2) var(--spacing-4)',
        backgroundColor: classInfo.bg,
        color: classInfo.text,
        borderBottom: 'var(--border-width) solid var(--border-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)', }}
      role="banner"
      aria-label={`Classification level: ${level}`}
    >
      <span>{classInfo.icon}</span>
      <span>KLASSIFISERING: {level}</span>
    </div>
  ); };

// Quick access section component
const QuickAccessSection = ({ quickAccess,
  isCollapsed, }: { quickAccess: unknown;
  isCollapsed: boolean; }): React.ReactElement => { return (
    <div
      style={{ padding: 'var(--spacing-3) var(--spacing-4)',
        borderBottom: 'var(--border-width) solid var(--border-secondary)', }}
    >
      {!isCollapsed && (
        <h3
          style={{ fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-wide)',
            margin: '0 0 var(--spacing-2) 0', }}
        >
          Hurtigtilgang
        </h3>
      )}

      <div
        style={{ display: 'flex',
          flexDirection: isCollapsed ? 'column' : 'row',
          gap: 'var(--spacing-2)',
          flexWrap: 'wrap', }}
      >
        {accessItems.map(item => (
          <button
            key={item.key}
            style={{ display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-2)',
              padding: 'var(--spacing-2)',
              backgroundColor: 'var(--color-gray-50)',
              color: 'var(--text-primary)',
              border: 'var(--border-width) solid var(--border-secondary)',
              borderRadius: 'var(--border-radius-base)',
              cursor: 'pointer',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-medium)',
              transition: 'all var(--transition-duration-fast) ease',
              flex: isCollapsed ? 'none' : '1',
              justifyContent: isCollapsed ? 'center' : 'flex-start', }}
            aria-label={item.label}
            title={item.label}
            onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary-50)';
              (e.target as HTMLElement).style.borderColor = 'var(--color-primary-300)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-50)';
              (e.target as HTMLElement).style.borderColor = 'var(--border-secondary)'; }}
          >
            <span>{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  ); };

// Sidebar content area
const SidebarContent = ({ children, isCollapsed }: { children: React.ReactNode; isCollapsed: boolean }): React.ReactElement => { return (
    <div
      style={{ flex: 1,
        overflow: 'auto',
        padding: isCollapsed ? 'var(--spacing-2)' : 'var(--spacing-4)', }}
    >
      {children}
    </div>
  ); };

// Resize handle component
const ResizeHandle = ({ onResize,
  position, }: { onResize: (width: number) => void;
  position: string; }): React.ReactElement => { return (
    <div
      style={{ position: 'absolute',
        top: 0,
        bottom: 0,
        right: position === 'left' ? 0 : 'auto',
        left: position === 'right' ? 0 : 'auto',
        width: 'var(--spacing-1)',
        cursor: 'col-resize',
        backgroundColor: isResizing ? 'var(--color-primary-500)' : 'transparent',
        transition: 'background-color var(--transition-duration-fast) ease',
        zIndex: 1, }}
      onMouseDown={handleMouseDown}
      aria-label="Resize sidebar"
      title="Dra for å endre størrelse"
    />
  ); };

// Keyboard shortcuts info
const KeyboardShortcuts = ({ isCollapsed }: { isCollapsed: boolean }): React.ReactElement => { return (
    <div
      style={{ padding: 'var(--spacing-3) var(--spacing-4)',
        borderTop: 'var(--border-width) solid var(--border-secondary)',
        backgroundColor: 'var(--color-gray-25)', }}
    >
      <h4
        style={{ fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-secondary)',
          margin: '0 0 var(--spacing-2) 0', }}
      >
        Hurtigtaster
      </h4>

      <div
        style={{ display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-1)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-tertiary)', }}
      >
        <div>Ctrl + B - Skjul/vis sidepanel</div>
        <div>Ctrl + K - Søk</div>
        <div>Alt + H - Hjelp</div>
      </div>
    </div>
  ); };

// DesktopSidebar component with forwardRef
export const DesktopSidebar = React.forwardRef<HTMLElement, DesktopSidebarProps>((props, ref): React.ReactElement => { return () => document.removeEventListener('keydown', handleKeydown); }, [norwegian?.keyboardShortcuts, isCollapsed]);

  return (
    <aside
      ref={ref}
      style={combinedStyles}
      className={className}
      data-testid={testId}
      data-platform="desktop"
      data-collapsed={isCollapsed}
      data-position={position}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
      aria-label={ariaLabel || 'Desktop sidebar'}
      role="complementary"
      {...asideProps}
    >
      {/* Classification banner */}
      {norwegian?.classificationBanner && norwegian.classification && (
        <ClassificationBanner level={norwegian.classification} />
      )}

      {/* Sidebar header */}
      <SidebarHeader
        isCollapsed={isCollapsed}
        showToggle={showToggle}
        norwegian={norwegian}
        onToggle={handleToggle}
      />

      {/* Quick access section */}
      <QuickAccessSection quickAccess={norwegian?.quickAccess} isCollapsed={isCollapsed} />

      {/* Main content */}
      <SidebarContent isCollapsed={isCollapsed}>{children}</SidebarContent>

      {/* Keyboard shortcuts */}
      {norwegian?.keyboardShortcuts && <KeyboardShortcuts isCollapsed={isCollapsed} />}

      {/* Resize handle */}
      {isResizable && !isCollapsed && <ResizeHandle onResize={handleResize} position={position} />}

      {/* Norwegian compliance footer */}
      {norwegian?.auditLog && !isCollapsed && (
        <div
          style={{ padding: 'var(--spacing-2) var(--spacing-4)',
            borderTop: 'var(--border-width) solid var(--border-secondary)',
            backgroundColor: 'var(--color-gray-25)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--text-tertiary)',
            textAlign: 'center', }}
        >
          📝 Handlinger logger for revisjon
        </div>
      )}
    </aside>
  ); });

DesktopSidebar.displayName = 'DesktopSidebar';
