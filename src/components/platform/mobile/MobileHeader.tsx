// MobileHeader component for @xala-mock/ui-system
// Norwegian-compliant mobile header with government branding and accessibility

import React from 'react';

import type { MobileHeaderProps } from '../../../types/platform.types';

// Helper function to generate CSS using design tokens
const getMobileHeaderStyles = (props: MobileHeaderProps): React.CSSProperties => {
  const { height = 'standard', sticky = true, transparent = false, norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: transparent ? 'transparent' : 'var(--background-primary)',
    borderBottom: transparent ? 'none' : 'var(--border-width) solid var(--border-secondary)',
    fontFamily: 'var(--font-family-sans)',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : 'auto',
    zIndex: 'var(--z-index-header)',
    boxShadow: transparent ? 'none' : 'var(--shadow-sm)',
    transition: 'all var(--transition-duration-fast) ease',
  };

  // Height-based styles
  const heightStyles = getHeightStyles(height);

  // Safe area handling for Norwegian mobile standards
  const safeAreaStyles = getSafeAreaStyles(norwegian?.safeAreaHandling);

  // Classification styling
  const classificationStyles = getClassificationStyles(norwegian?.classification);

  return {
    ...baseStyles,
    ...heightStyles,
    ...safeAreaStyles,
    ...classificationStyles,
  };
};

// Get height-based styles
const getHeightStyles = (height: string): React.CSSProperties => {
  const heights = {
    compact: {
      height: 'var(--mobile-header-height-compact)',
      padding: '0 var(--spacing-3)',
    },
    standard: {
      height: 'var(--mobile-header-height-standard)',
      padding: '0 var(--spacing-4)',
    },
    extended: {
      height: 'var(--mobile-header-height-extended)',
      padding: '0 var(--spacing-4)',
      flexDirection: 'column' as const,
      gap: 'var(--spacing-2)',
    },
  };
  return heights[height as keyof typeof heights] || heights.standard;
};

// Get safe area styles for Norwegian mobile compliance
const getSafeAreaStyles = (safeAreaHandling?: boolean): React.CSSProperties => {
  if (!safeAreaHandling) {
    return {};
  }

  return {
    paddingTop: 'env(safe-area-inset-top)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  };
};

// Get Norwegian classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) {
    return {};
  }

  const classificationStyles: Record<string, React.CSSProperties> = {
    ÅPEN: {
      borderTop: 'var(--border-accent-width) solid var(--color-green-500)',
    },
    BEGRENSET: {
      borderTop: 'var(--border-accent-width) solid var(--color-orange-500)',
    },
    KONFIDENSIELT: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-500)',
      backgroundColor: 'var(--color-red-25)',
    },
    HEMMELIG: {
      borderTop: 'var(--border-accent-width) solid var(--color-red-800)',
      backgroundColor: 'var(--color-red-50)',
      color: 'var(--color-red-900)',
    },
  };

  return classificationStyles[classification] || {};
};

// Header button component
const HeaderButton = ({
  icon,
  onPress,
  testId,
  ariaLabel,
  badgeCount,
}: {
  icon: React.ReactNode;
  onPress?: () => void;
  testId?: string;
  ariaLabel?: string;
  badgeCount?: number;
}): void => {
  return (
    <button
      style={{
        width: 'var(--touch-target-min-height)', // Norwegian accessibility: 44px
        height: 'var(--touch-target-min-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        borderRadius: 'var(--border-radius-base)',
        backgroundColor: 'transparent',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        fontSize: 'var(--font-size-lg)',
        transition: 'all var(--transition-duration-fast) ease',
        position: 'relative',
      }}
      onClick={onPress}
      data-testid={testId}
      aria-label={ariaLabel}
      onMouseEnter={e => {
        (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-100)';
      }}
      onMouseLeave={e => {
        (e.target as HTMLElement).style.backgroundColor = 'transparent';
      }}
    >
      {icon}

      {/* Badge for notifications */}
      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 'var(--spacing-1)',
            right: 'var(--spacing-1)',
            backgroundColor: 'var(--color-red-500)',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            borderRadius: 'var(--border-radius-full)',
            minWidth: 'var(--spacing-4)',
            height: 'var(--spacing-4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 var(--spacing-1)',
          }}
          aria-label={`${badgeCount} notification${badgeCount === 1 ? '' : 's'}`}
        >
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
};

// Classification badge component
const ClassificationBadge = ({ level }: { level: string }): void => {
  const getClassificationIcon = (classification: string): string => {
    const icons = {
      ÅPEN: '🟢',
      BEGRENSET: '🟡',
      KONFIDENSIELT: '🔴',
      HEMMELIG: '⚫',
    };
    return icons[classification as keyof typeof icons] || '❓';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-1) var(--spacing-2)',
        backgroundColor: 'var(--color-gray-100)',
        borderRadius: 'var(--border-radius-sm)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--text-secondary)',
      }}
      aria-label={`Classification: ${level}`}
    >
      <span>{getClassificationIcon(level)}</span>
      <span>{level}</span>
    </div>
  );
};

// Municipality logo component
const MunicipalityLogo = ({ municipality }: { municipality: string }): void => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-2)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--text-secondary)',
      }}
    >
      <span>🏛️</span>
      <span>{municipality}</span>
    </div>
  );
};

// Emergency contact access component
const EmergencyAccess = ({ onPress }: { onPress?: () => void }): void => {
  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-1)',
        padding: 'var(--spacing-1) var(--spacing-2)',
        backgroundColor: 'var(--color-red-100)',
        color: 'var(--color-red-800)',
        border: 'var(--border-width) solid var(--color-red-300)',
        borderRadius: 'var(--border-radius-base)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-semibold)',
        cursor: 'pointer',
        transition: 'all var(--transition-duration-fast) ease',
      }}
      onClick={onPress}
      aria-label="Emergency contacts"
      title="Nødkontakter"
    >
      <span>🚨</span>
      <span>Nødhjelp</span>
    </button>
  );
};

// Search bar component
const SearchBar = ({
  placeholderKey,
  onFocus,
}: {
  placeholderKey?: string;
  onFocus?: () => void;
}): void => {
  return (
    <div
      style={{
        flex: 1,
        maxWidth: 'var(--search-max-width)',
        position: 'relative',
      }}
    >
      <input
        type="text"
        placeholder={placeholderKey || 'Søk...'}
        style={{
          width: '100%',
          height: 'var(--input-height-sm)',
          padding: '0 var(--spacing-3) 0 var(--spacing-8)',
          backgroundColor: 'var(--color-gray-50)',
          border: 'var(--border-width) solid var(--border-secondary)',
          borderRadius: 'var(--border-radius-full)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-primary)',
          outline: 'none',
          transition: 'all var(--transition-duration-fast) ease',
        }}
        onFocus={onFocus}
        aria-label="Search"
      />

      <span
        style={{
          position: 'absolute',
          left: 'var(--spacing-3)',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--text-tertiary)',
          fontSize: 'var(--font-size-base)',
          pointerEvents: 'none',
        }}
      >
        🔍
      </span>
    </div>
  );
};

// MobileHeader component with forwardRef
export const MobileHeader = React.forwardRef<HTMLElement, MobileHeaderProps>((props, ref): void => {
  const {
    titleKey,
    title,
    showBackButton = false,
    showMenu = false,
    showSearch = false,
    showNotifications = false,
    notificationCount = 0,
    searchPlaceholderKey,
    height = 'standard',
    sticky = true,
    transparent = false,
    norwegian,
    onBack,
    onMenuToggle,
    onSearchFocus,
    onNotificationPress,
    className,
    style,
    testId,
    'aria-label': ariaLabel,
    ...headerProps
  } = props;

  const headerStyles = getMobileHeaderStyles(props);
  const combinedStyles = { ...headerStyles, ...style };

  const renderLeftSection = (): void => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          flex: 1,
        }}
      >
        {/* Back button */}
        {showBackButton && (
          <HeaderButton icon="←" onPress={onBack} testId={`${testId}-back`} ariaLabel="Go back" />
        )}

        {/* Menu button */}
        {showMenu && (
          <HeaderButton
            icon="☰"
            onPress={onMenuToggle}
            testId={`${testId}-menu`}
            ariaLabel="Open menu"
          />
        )}

        {/* Municipality logo */}
        {norwegian?.municipalityLogo && norwegian.municipality && (
          <MunicipalityLogo municipality={norwegian.municipality} />
        )}
      </div>
    );
  };

  const renderCenterSection = (): void => {
    if (showSearch) {
      return <SearchBar placeholderKey={searchPlaceholderKey} onFocus={onSearchFocus} />;
    }

    return (
      <div
        style={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
        }}
      >
        {/* Title */}
        {(title || titleKey) && (
          <h1
            style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)',
              margin: 0,
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {/* TODO: Replace with actual localization */}
            {title || titleKey}
          </h1>
        )}

        {/* Classification badge */}
        {norwegian?.showClassificationBadge && norwegian.classification && (
          <ClassificationBadge level={norwegian.classification} />
        )}
      </div>
    );
  };

  const renderRightSection = (): void => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        {/* Emergency access */}
        {norwegian?.emergencyContactAccess && (
          <EmergencyAccess
            onPress={(): void => {
              // TODO: Implement emergency contacts
            }}
          />
        )}

        {/* Search button (when not showing search bar) */}
        {!showSearch && showNotifications && (
          <HeaderButton
            icon="🔍"
            onPress={onSearchFocus}
            testId={`${testId}-search`}
            ariaLabel="Search"
          />
        )}

        {/* Notifications */}
        {showNotifications && (
          <HeaderButton
            icon="🔔"
            onPress={onNotificationPress}
            testId={`${testId}-notifications`}
            ariaLabel="Notifications"
            badgeCount={notificationCount}
          />
        )}
      </div>
    );
  };

  return (
    <header
      ref={ref}
      style={combinedStyles}
      className={className}
      data-testid={testId}
      data-platform="mobile"
      data-height={height}
      data-classification={norwegian?.classification}
      data-municipality={norwegian?.municipality}
      aria-label={ariaLabel || 'Mobile header'}
      role="banner"
      {...headerProps}
    >
      {height === 'extended' ? (
        <>
          {/* Top row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {renderLeftSection()}
            {renderRightSection()}
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {renderCenterSection()}
          </div>
        </>
      ) : (
        <>
          {renderLeftSection()}
          {renderCenterSection()}
          {renderRightSection()}
        </>
      )}

      {/* Government branding footer (for HEMMELIG classification) */}
      {norwegian?.governmentBranding && norwegian.classification === 'HEMMELIG' && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(-1 * var(--spacing-6))',
            left: 0,
            right: 0,
            padding: 'var(--spacing-2) var(--spacing-4)',
            backgroundColor: 'var(--color-red-900)',
            color: 'var(--color-white)',
            fontSize: 'var(--font-size-xs)',
            textAlign: 'center',
            borderTop: 'var(--border-width) solid var(--color-red-700)',
          }}
        >
          🔒 HEMMELIG DOKUMENT - BEGRENSET TILGANG
        </div>
      )}
    </header>
  );
});

MobileHeader.displayName = 'MobileHeader';
