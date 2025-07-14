// BottomNavigation component for @xala-mock/ui-system
// Norwegian-compliant mobile bottom navigation with accessibility and emergency features

import React from 'react';

import { BottomNavigationProps, BottomNavigationItem } from '../../../types/platform.types';

// Helper function to generate CSS using design tokens
const getBottomNavigationStyles = (props: BottomNavigationProps): React.CSSProperties => {
  const { height = 'standard', safeAreaBottom = true, norwegian } = props;

  // Base styles using design tokens
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'var(--background-primary)',
    borderTop: 'var(--border-width) solid var(--border-secondary)',
    fontFamily: 'var(--font-family-sans)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 'var(--z-index-navigation)',
    boxShadow: 'var(--shadow-lg)',
  };

  // Height-based styles
  const heightStyles = getHeightStyles(height);

  // Safe area handling for Norwegian mobile standards
  const safeAreaStyles = getSafeAreaStyles(safeAreaBottom);

  // Emergency styling
  const emergencyStyles = getEmergencyStyles(norwegian?.emergencyTab);

  return {
    ...baseStyles,
    ...heightStyles,
    ...safeAreaStyles,
    ...emergencyStyles,
  };
};

// Get height-based styles
const getHeightStyles = (height: string): React.CSSProperties => {
  const heights = {
    compact: {
      height: 'var(--mobile-navigation-height-compact)',
      padding: 'var(--spacing-2) 0',
    },
    standard: {
      height: 'var(--mobile-navigation-height-standard)',
      padding: 'var(--spacing-3) 0',
    },
    extended: {
      height: 'var(--mobile-navigation-height-extended)',
      padding: 'var(--spacing-4) 0',
    },
  };
  return heights[height as keyof typeof heights] || heights.standard;
};

// Get safe area styles for Norwegian mobile compliance
const getSafeAreaStyles = (safeAreaBottom: boolean): React.CSSProperties => {
  if (!safeAreaBottom) {
    return {};
  }

  return {
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  };
};

// Get emergency styles
const getEmergencyStyles = (hasEmergencyTab?: boolean): React.CSSProperties => {
  if (!hasEmergencyTab) {
    return {};
  }

  return {
    borderTop: 'var(--border-width-thick) solid var(--color-red-300)',
  };
};

// Tab item styles
const getTabItemStyles = (
  item: BottomNavigationItem,
  isActive: boolean,
  showLabels: boolean,
  showBadges: boolean
): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-1)',
    flex: 1,
    minHeight: 'var(--touch-target-min-height)', // Norwegian accessibility: 44px
    padding: 'var(--spacing-2)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--border-radius-base)',
    color: isActive ? 'var(--color-primary-600)' : 'var(--text-secondary)',
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    opacity: item.disabled ? 0.5 : 1,
    transition: 'all var(--transition-duration-fast) ease',
    position: 'relative',
  };

  // Emergency tab styling
  if (item.norwegian?.priority === 'emergency') {
    return {
      ...baseStyles,
      backgroundColor: isActive ? 'var(--color-red-600)' : 'var(--color-red-100)',
      color: isActive ? 'var(--color-white)' : 'var(--color-red-800)',
      borderRadius: 'var(--border-radius-lg)',
      margin: '0 var(--spacing-2)',
      animation: 'emergency-pulse 2s infinite',
    };
  }

  // Classification styling
  if (item.norwegian?.classification) {
    const classificationColors = {
      ÅPEN: 'var(--color-green-500)',
      BEGRENSET: 'var(--color-orange-500)',
      KONFIDENSIELT: 'var(--color-red-500)',
      HEMMELIG: 'var(--color-red-800)',
    };

    return {
      ...baseStyles,
      borderTop: `var(--border-width-thick) solid ${classificationColors[item.norwegian.classification]}`,
    };
  }

  return baseStyles;
};

// Navigation tab component
const NavigationTab = ({
  item,
  isActive,
  showLabels,
  showBadges,
  onPress,
}: {
  item: BottomNavigationItem;
  isActive: boolean;
  showLabels: boolean;
  showBadges: boolean;
  onPress: () => void;
}) => {
  const tabStyles = getTabItemStyles(item, isActive, showLabels, showBadges);

  return (
    <button
      style={tabStyles}
      onClick={onPress}
      disabled={item.disabled}
      data-testid={item.testId}
      aria-label={item.labelKey}
      aria-selected={isActive}
      role="tab"
      onMouseEnter={e => {
        if (!item.disabled && item.norwegian?.priority !== 'emergency') {
          (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-50)';
        }
      }}
      onMouseLeave={e => {
        if (!item.disabled && item.norwegian?.priority !== 'emergency') {
          (e.target as HTMLElement).style.backgroundColor = 'transparent';
        }
      }}
    >
      {/* Tab icon */}
      <div
        style={{
          fontSize: 'var(--font-size-xl)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {isActive && item.activeIcon ? item.activeIcon : item.icon}

        {/* Badge for notifications */}
        {showBadges && item.badgeCount !== undefined && item.badgeCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 'calc(-1 * var(--spacing-2))',
              right: 'calc(-1 * var(--spacing-2))',
              backgroundColor: item.badgeColor || 'var(--color-red-500)',
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
            aria-label={`${item.badgeCount} notification${item.badgeCount === 1 ? '' : 's'}`}
          >
            {item.badgeCount > 99 ? '99+' : item.badgeCount}
          </span>
        )}

        {/* Classification indicator */}
        {item.norwegian?.classification && (
          <span
            style={{
              position: 'absolute',
              bottom: 'calc(-1 * var(--spacing-1))',
              right: 'calc(-1 * var(--spacing-1))',
              fontSize: 'var(--font-size-xs)',
            }}
            aria-label={`Classification: ${item.norwegian.classification}`}
            title={`Klassifisering: ${item.norwegian.classification}`}
          >
            {getClassificationIcon(item.norwegian.classification)}
          </span>
        )}

        {/* Emergency indicator */}
        {item.norwegian?.priority === 'emergency' && (
          <span
            style={{
              position: 'absolute',
              top: 'calc(-1 * var(--spacing-1))',
              left: 'calc(-1 * var(--spacing-1))',
              fontSize: 'var(--font-size-xs)',
              animation: 'emergency-blink 1s infinite',
            }}
            aria-label="Emergency"
          >
            🚨
          </span>
        )}
      </div>

      {/* Tab label */}
      {showLabels && (
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
            textAlign: 'center',
            lineHeight: 'var(--line-height-tight)',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {/* TODO: Replace with actual localization */}
          {item.labelKey}
        </span>
      )}

      {/* Auth required indicator */}
      {item.norwegian?.requiresAuth && !isActive && (
        <span
          style={{
            position: 'absolute',
            top: 'var(--spacing-1)',
            right: 'var(--spacing-1)',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-orange-600)',
          }}
          aria-label="Authentication required"
          title="Krever autentisering"
        >
          🔐
        </span>
      )}
    </button>
  );
};

// Get classification icon
const getClassificationIcon = (classification: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[classification as keyof typeof icons] || '❓';
};

// Municipality context indicator
const MunicipalityIndicator = ({ municipality }: { municipality: string }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(-1 * var(--spacing-8))',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 'var(--spacing-1) var(--spacing-2)',
        backgroundColor: 'var(--color-blue-100)',
        color: 'var(--color-blue-800)',
        fontSize: 'var(--font-size-xs)',
        borderRadius: 'var(--border-radius-sm)',
        border: 'var(--border-width) solid var(--color-blue-300)',
        whiteSpace: 'nowrap',
      }}
      aria-label={`Municipality: ${municipality}`}
    >
      🏛️ {municipality}
    </div>
  );
};

// Emergency banner component
const EmergencyBanner = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(-1 * var(--spacing-6))',
        left: 0,
        right: 0,
        padding: 'var(--spacing-1) var(--spacing-4)',
        backgroundColor: 'var(--color-red-600)',
        color: 'var(--color-white)',
        fontSize: 'var(--font-size-xs)',
        textAlign: 'center',
        fontWeight: 'var(--font-weight-semibold)',
        animation: 'emergency-pulse 2s infinite',
      }}
      role="alert"
      aria-live="assertive"
    >
      🚨 NØDTJENESTER TILGJENGELIG
    </div>
  );
};

// BottomNavigation component with forwardRef
export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(
  (props, ref) => {
    const {
      items,
      activeIndex = 0,
      showLabels = true,
      showBadges = true,
      height = 'standard',
      safeAreaBottom = true,
      norwegian,
      onItemPress,
      className,
      style,
      testId,
      'aria-label': ariaLabel,
      ...navProps
    } = props;

    const navigationStyles = getBottomNavigationStyles(props);
    const combinedStyles = { ...navigationStyles, ...style };

    const handleItemPress = (index: number, item: BottomNavigationItem) => {
      if (item.disabled) {
        return;
      }

      // Norwegian haptic feedback for touch devices
      if (norwegian?.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate([10]);
      }

      // Accessibility announcement
      if (norwegian?.accessibilityAnnouncements) {
        // TODO: Implement screen reader announcement
      }

      onItemPress?.(index, item);
    };

    return (
      <nav
        ref={ref}
        style={combinedStyles}
        className={className}
        data-testid={testId}
        data-platform="mobile"
        data-height={height}
        data-municipality={norwegian?.municipality}
        aria-label={ariaLabel || 'Bottom navigation'}
        role="tablist"
        {...navProps}
      >
        {/* Emergency banner */}
        {norwegian?.emergencyTab && <EmergencyBanner />}

        {/* Municipality context */}
        {norwegian?.municipalityContext && norwegian.municipality && (
          <MunicipalityIndicator municipality={norwegian.municipality} />
        )}

        {/* Navigation tabs */}
        {items.map((item, index) => (
          <NavigationTab
            key={index}
            item={item}
            isActive={index === activeIndex}
            showLabels={showLabels}
            showBadges={showBadges}
            onPress={() => handleItemPress(index, item)}
          />
        ))}

        {/* Classification indicators overlay */}
        {norwegian?.classificationIndicators && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(-1 * var(--spacing-1))',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 'var(--spacing-1)',
            }}
            aria-hidden="true"
          >
            {Array.from(
              new Set(items.map(item => item.norwegian?.classification).filter(Boolean))
            ).map(classification => (
              <span
                key={classification}
                style={{
                  fontSize: 'var(--font-size-xs)',
                  opacity: '0.7',
                }}
                title={`System supports: ${classification}`}
              >
                {getClassificationIcon(classification!)}
              </span>
            ))}
          </div>
        )}

        {/* Norwegian compliance footer */}
        {norwegian?.auditLog && (
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(-1 * var(--spacing-4))',
              left: 0,
              right: 0,
              padding: 'var(--spacing-1)',
              backgroundColor: 'var(--color-gray-25)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-tertiary)',
              textAlign: 'center',
              borderTop: 'var(--border-width) solid var(--border-tertiary)',
            }}
            aria-hidden="true"
          >
            📝 Navigasjon logger for revisjon
          </div>
        )}
      </nav>
    );
  }
);

BottomNavigation.displayName = 'BottomNavigation';
