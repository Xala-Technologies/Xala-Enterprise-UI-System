// React mock for development
import React from 'react';

import { MobileHeaderButton } from './MobileHeaderButton';

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  height?: 'sm' | 'md' | 'lg';
  sticky?: boolean;
  transparent?: boolean;
  onBack?: () => void;
  onMenuToggle?: () => void;
  onSearchFocus?: () => void;
  onNotificationPress?: () => void;
  style?: React.CSSProperties;
}

export const MobileHeader = React.forwardRef<HTMLElement, MobileHeaderProps>((props, ref) => {
  const {
    title,
    showBackButton = false,
    showMenu = false,
    showSearch = false,
    showNotifications = false,
    notificationCount = 0,
    height = 'md',
    sticky = false,
    transparent = false,
    onBack,
    onMenuToggle,
    onSearchFocus,
    onNotificationPress,
    style,
    ...restProps
  } = props;

  const getHeightStyle = (): string => {
    const heights = {
      sm: '48px',
      md: '56px',
      lg: '64px',
    };

    return heights[height];
  };

  return (
    <header
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-4)',
        minHeight: getHeightStyle(),
        backgroundColor: transparent ? 'transparent' : 'var(--color-surface-primary)',
        borderBottom: '1px solid var(--color-border-subtle)',
        position: sticky ? 'sticky' : 'relative',
        top: sticky ? '0' : 'auto',
        zIndex: sticky ? 'var(--z-index-header)' : 'auto',
        ...style,
      }}
      {...restProps}
    >
      {/* Left section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
        }}
      >
        {showBackButton && <MobileHeaderButton icon="←" label="Back" onClick={onBack} />}
        {showMenu && <MobileHeaderButton icon="☰" label="Menu" onClick={onMenuToggle} />}
      </div>

      {/* Center section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Right section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
        }}
      >
        {showSearch && <MobileHeaderButton icon="🔍" label="Search" onClick={onSearchFocus} />}
        {showNotifications && (
          <MobileHeaderButton
            icon="🔔"
            label="Notifications"
            onClick={onNotificationPress}
            showBadge={!!notificationCount}
            badgeCount={notificationCount}
          />
        )}
      </div>
    </header>
  );
});

MobileHeader.displayName = 'MobileHeader';
