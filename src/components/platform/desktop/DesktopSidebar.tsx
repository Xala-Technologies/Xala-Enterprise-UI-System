// DesktopSidebar component for @xala-mock/ui-system
// Norwegian-compliant desktop sidebar with resizing and government features

import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { DesktopSidebarProps } from '../../../types/platform.types';

// Helper function to generate CSS using design tokens
const getDesktopSidebarStyles = (props: DesktopSidebarProps): React.CSSProperties => {
  const {
    isCollapsed = false,
    width = 280,
    position = 'left',
    persistent = true,
    overlay = false,
  } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
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
    width: isCollapsed ? 'var(--sidebar-collapsed-width)' : width,
    minWidth: isCollapsed ? 'var(--sidebar-collapsed-width)' : width,
    maxWidth: isCollapsed ? 'var(--sidebar-collapsed-width)' : width,
  };

  return baseStyles;
};

// Sidebar header component
const SidebarHeader = ({
  title,
  isCollapsed,
  onToggle,
  collapsible = true,
}: {
  title?: string;
  isCollapsed: boolean;
  onToggle?: () => void;
  collapsible?: boolean;
}): React.ReactElement => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--spacing-4)',
        borderBottom: 'var(--border-width) solid var(--border-secondary)',
        backgroundColor: 'var(--background-primary)',
      }}
    >
      {!isCollapsed && title && (
        <h2
          style={{
            margin: 0,
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h2>
      )}

      {collapsible && (
        <button
          onClick={onToggle}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--spacing-2)',
            borderRadius: 'var(--border-radius-base)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-sm)',
            transition: 'all var(--transition-duration-fast) ease',
          }}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      )}
    </div>
  );
};

// Classification banner component
const ClassificationBanner = ({ level }: { level: string }): React.ReactElement => {
  const classInfo = {
    bg:
      level === 'HEMMELIG'
        ? 'var(--color-red-600)'
        : level === 'KONFIDENSIELT'
          ? 'var(--color-orange-600)'
          : level === 'BEGRENSET'
            ? 'var(--color-yellow-600)'
            : 'var(--color-green-600)',
    text: level === 'ÅPEN' ? 'var(--color-green-900)' : 'var(--color-white)',
    icon:
      level === 'HEMMELIG'
        ? '🔒'
        : level === 'KONFIDENSIELT'
          ? '⚠️'
          : level === 'BEGRENSET'
            ? '⚡'
            : '🔓',
  };

  return (
    <div
      style={{
        padding: 'var(--spacing-2) var(--spacing-4)',
        backgroundColor: classInfo.bg,
        color: classInfo.text,
        borderBottom: 'var(--border-width) solid var(--border-secondary)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)',
      }}
      role="banner"
      aria-label={`Classification level: ${level}`}
    >
      <span>{classInfo.icon}</span>
      <span>KLASSIFISERING: {level}</span>
    </div>
  );
};

// Quick access section component
const QuickAccessSection = ({
  isCollapsed,
  norwegian,
}: {
  isCollapsed: boolean;
  norwegian?: DesktopSidebarProps['norwegian'];
}): React.ReactElement => {
  const accessItems = [
    { key: 'search', label: 'Søk', icon: '🔍' },
    { key: 'help', label: 'Hjelp', icon: '❓' },
    { key: 'settings', label: 'Innstillinger', icon: '⚙️' },
  ];

  return (
    <div style={{ padding: 'var(--spacing-4)' }}>
      {!isCollapsed && (
        <h3
          style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-wide)',
            margin: '0 0 var(--spacing-2) 0',
          }}
        >
          Hurtigtilgang
        </h3>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: isCollapsed ? 'column' : 'row',
          gap: 'var(--spacing-2)',
          flexWrap: 'wrap',
        }}
      >
        {accessItems.map(item => (
          <button
            key={item.key}
            style={{
              display: 'flex',
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
            }}
            aria-label={item.label}
          >
            <span>{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

// Municipality branding component
const MunicipalityBranding = ({
  norwegian,
  isCollapsed,
}: {
  norwegian?: DesktopSidebarProps['norwegian'];
  isCollapsed: boolean;
}): React.ReactElement => {
  if (!norwegian?.municipalityBranding) return <></>;

  return (
    <div
      style={{
        padding: 'var(--spacing-4)',
        borderTop: 'var(--border-width) solid var(--border-secondary)',
        backgroundColor: 'var(--background-tertiary)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--color-primary-500)',
            borderRadius: 'var(--border-radius-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-bold)',
          }}
        >
          {norwegian?.municipality?.charAt(0) || 'K'}
        </div>
        {!isCollapsed && (
          <div>
            <div
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--text-primary)',
              }}
            >
              {norwegian?.municipality || 'Kommune'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Resize handle component
const ResizeHandle = ({
  onMouseDown,
  isResizing,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  isResizing: boolean;
}): React.ReactElement => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '4px',
        height: '100%',
        cursor: 'col-resize',
        backgroundColor: isResizing ? 'var(--color-primary-500)' : 'transparent',
        transition: 'background-color var(--transition-duration-fast) ease',
      }}
      onMouseDown={onMouseDown}
    />
  );
};

// Keyboard shortcuts help
const KeyboardShortcuts = ({ isCollapsed }: { isCollapsed: boolean }): React.ReactElement => {
  if (isCollapsed) return <></>;

  return (
    <div
      style={{
        padding: 'var(--spacing-4)',
        borderTop: 'var(--border-width) solid var(--border-secondary)',
        backgroundColor: 'var(--background-tertiary)',
      }}
    >
      <h4
        style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: 'var(--letter-spacing-wide)',
          margin: '0 0 var(--spacing-2) 0',
        }}
      >
        Hurtigtaster
      </h4>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-1)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-tertiary)',
        }}
      >
        <div>Ctrl + B - Skjul/vis sidepanel</div>
        <div>Ctrl + K - Søk</div>
        <div>Alt + H - Hjelp</div>
      </div>
    </div>
  );
};

// DesktopSidebar component with forwardRef
export const DesktopSidebar = React.forwardRef<HTMLElement, DesktopSidebarProps>(
  (props, ref): React.ReactElement => {
    const {
      isOpen,
      title,
      children,
      width = 280,
      collapsible = true,
      collapsed = false,
      isCollapsed = collapsed,
      position = 'left',
      persistent = true,
      overlay = false,
      onToggle,
      onClose,
      norwegian,
      className,
      ...rest
    } = props;

    const [currentWidth, setCurrentWidth] = useState(width);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    // Handle keyboard shortcuts
    const handleKeydown = useCallback(
      (e: KeyboardEvent) => {
        if (!norwegian?.keyboardShortcuts) return;

        if (e.ctrlKey && e.key === 'b') {
          e.preventDefault();
          onToggle?.();
        }
      },
      [norwegian?.keyboardShortcuts, onToggle]
    );

    useEffect(() => {
      if (norwegian?.keyboardShortcuts) {
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
      }
      return undefined;
    }, [handleKeydown, norwegian?.keyboardShortcuts]);

    // Handle resize functionality
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
    }, []);

    useEffect(() => {
      if (!isResizing) return;

      const handleMouseMove = (e: MouseEvent) => {
        const newWidth = e.clientX;
        setCurrentWidth(Math.max(200, Math.min(600, newWidth)));
      };

      const handleMouseUp = () => {
        setIsResizing(false);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isResizing]);

    const combinedStyles = {
      ...getDesktopSidebarStyles({
        ...props,
        width: currentWidth,
        isCollapsed,
      }),
      position: 'relative' as const,
    };

    return (
      <aside
        ref={ref}
        style={combinedStyles}
        className={className}
        data-testid="desktop-sidebar"
        data-platform="desktop"
        data-collapsed={isCollapsed}
        role="complementary"
        aria-label={title || 'Sidebar'}
        {...rest}
      >
        {/* Classification banner */}
        {norwegian?.classification && <ClassificationBanner level={norwegian.classification} />}

        {/* Sidebar header */}
        <SidebarHeader
          title={title}
          isCollapsed={isCollapsed}
          onToggle={onToggle}
          collapsible={collapsible}
        />

        {/* Main content area */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>

        {/* Quick access section */}
        <QuickAccessSection isCollapsed={isCollapsed} norwegian={norwegian} />

        {/* Municipality branding */}
        <MunicipalityBranding norwegian={norwegian} isCollapsed={isCollapsed} />

        {/* Keyboard shortcuts help */}
        {norwegian?.keyboardShortcuts && <KeyboardShortcuts isCollapsed={isCollapsed} />}

        {/* Resize handle */}
        {!isCollapsed && <ResizeHandle onMouseDown={handleMouseDown} isResizing={isResizing} />}
      </aside>
    );
  }
);

DesktopSidebar.displayName = 'DesktopSidebar';
