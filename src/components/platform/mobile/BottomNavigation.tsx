// BottomNavigation component for @xala-mock/ui-system
// Norwegian-compliant mobile bottom navigation with accessibility and emergency features

import React, { useCallback } from 'react';

import type { BottomNavigationItem, BottomNavigationProps } from '../../../types/platform.types';

// Helper function to generate CSS using design tokens
const getBottomNavigationStyles = (props: BottomNavigationProps): React.CSSProperties => {
  const { height = 'standard', norwegian } = props;

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
  const safeAreaStyles = getSafeAreaStyles(true);

  // Emergency styling
  const emergencyStyles = getEmergencyStyles(norwegian?.emergencyTab);

  return { ...baseStyles, ...heightStyles, ...safeAreaStyles, ...emergencyStyles };
};

// Get height-based styles
const getHeightStyles = (height: string): React.CSSProperties => {
  const heights = {
    compact: { height: 'var(--mobile-navigation-height-compact)', padding: 'var(--spacing-2) 0' },
    standard: { height: 'var(--mobile-navigation-height-standard)', padding: 'var(--spacing-3) 0' },
    extended: { height: 'var(--mobile-navigation-height-extended)', padding: 'var(--spacing-4) 0' },
  };
  return heights[height as keyof typeof heights] || heights.standard;
};

// Get safe area styles
const getSafeAreaStyles = (safeAreaBottom: boolean): React.CSSProperties => {
  if (!safeAreaBottom) return {};

  return {
    paddingBottom: 'env(safe-area-inset-bottom)',
    minHeight: 'calc(var(--mobile-navigation-height-standard) + env(safe-area-inset-bottom))',
  };
};

// Get emergency styles
const getEmergencyStyles = (emergencyTab?: boolean): React.CSSProperties => {
  if (!emergencyTab) return {};

  return {
    borderTop: '2px solid var(--color-red-500)',
    boxShadow: '0 -2px 8px rgba(239, 68, 68, 0.2), var(--shadow-lg)',
  };
};

// Get classification icon
const getClassificationIcon = (classification: string): string => {
  const icons = {
    ÅPEN: '🔓',
    BEGRENSET: '🔒',
    KONFIDENSIELT: '🔐',
    HEMMELIG: '🛡️',
  };
  return icons[classification as keyof typeof icons] || '🔓';
};

// Navigation tab component
interface NavigationTabProps {
  item: BottomNavigationItem;
  isActive: boolean;
  showLabels: boolean;
  showBadges: boolean;
  onPress: () => void;
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  item,
  isActive,
  showLabels,
  showBadges,
  onPress,
}) => {
  const tabStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 'var(--spacing-2)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
    transition: 'all 0.2s ease',
    minHeight: '44px', // Norwegian accessibility requirement
    position: 'relative',
  };

  const iconStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-xl)',
    marginBottom: showLabels ? 'var(--spacing-1)' : 0,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-xs)',
    lineHeight: 1.2,
    textAlign: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const badgeStyles: React.CSSProperties = {
    position: 'absolute',
    top: 'var(--spacing-1)',
    right: 'var(--spacing-2)',
    backgroundColor: 'var(--color-red-500)',
    color: 'var(--color-white)',
    borderRadius: '50%',
    minWidth: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-bold)',
  };

  return (
    <button
      type="button"
      style={tabStyles}
      onClick={onPress}
      disabled={item.disabled}
      aria-label={item.labelKey || item.label}
      aria-selected={isActive}
      role="tab"
      data-testid={item.testId}
    >
      {/* Emergency priority indicator */}
      {item.norwegian?.priority === 'emergency' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'var(--color-red-500)',
            animation: 'emergency-pulse 1s infinite',
          }}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      <div style={iconStyles}>{isActive && item.activeIcon ? item.activeIcon : item.icon}</div>

      {/* Classification badge */}
      {item.norwegian?.classification && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--spacing-1)',
            left: 'var(--spacing-1)',
            fontSize: 'var(--font-size-xs)',
            opacity: 0.7,
          }}
          aria-label={`Classification: ${item.norwegian.classification}`}
          title={`Klassifisering: ${item.norwegian.classification}`}
        >
          {getClassificationIcon(item.norwegian.classification)}
        </div>
      )}

      {/* Emergency indicator */}
      {item.norwegian?.priority === 'emergency' && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--spacing-1)',
            right: 'var(--spacing-1)',
            color: 'var(--color-red-500)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-bold)',
          }}
          aria-hidden="true"
        >
          🚨
        </div>
      )}

      {/* Label */}
      {showLabels && <span style={labelStyles}>{item.labelKey || item.label}</span>}

      {/* Badge */}
      {showBadges && item.badgeCount && item.badgeCount > 0 && (
        <div style={badgeStyles}>{item.badgeCount > 99 ? '99+' : item.badgeCount}</div>
      )}

      {/* Auth required indicator */}
      {item.norwegian?.requiresAuth && !isActive && (
        <div
          style={{
            position: 'absolute',
            bottom: 'var(--spacing-1)',
            right: 'var(--spacing-1)',
            fontSize: 'var(--font-size-xs)',
            opacity: 0.5,
          }}
          aria-hidden="true"
          title="Krever autentisering"
        >
          🔐
        </div>
      )}
    </button>
  );
};

// Municipality indicator component
interface MunicipalityIndicatorProps {
  municipality: string;
}

const MunicipalityIndicator: React.FC<MunicipalityIndicatorProps> = ({ municipality }) => (
  <div
    style={{
      position: 'absolute',
      top: 'calc(-1 * var(--spacing-5))',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: 'var(--spacing-1) var(--spacing-2)',
      backgroundColor: 'var(--color-blue-50)',
      color: 'var(--color-blue-700)',
      fontSize: 'var(--font-size-xs)',
      borderRadius: 'var(--radius-sm)',
      fontWeight: 'var(--font-weight-medium)',
      border: '1px solid var(--color-blue-200)',
    }}
    aria-hidden="true"
  >
    {municipality}
  </div>
);

// Emergency banner component
const EmergencyBanner: React.FC = () => {
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
  (props, ref): React.ReactElement => {
    const {
      items,
      activeIndex = 0,
      activeItem,
      onItemClick,
      showLabels = true,
      showBadges = true,
      height = 'standard',
      norwegian,
      className,
      testId,
      ariaLabel,
      ...restProps
    } = props;

    // Handle item press
    const handleItemPress = useCallback(
      (index: number, item: BottomNavigationItem) => {
        if (item.disabled) return;
        onItemClick?.(item, index);
      },
      [onItemClick]
    );

    // Get combined styles
    const combinedStyles = getBottomNavigationStyles(props);

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
        {...restProps}
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
                style={{ fontSize: 'var(--font-size-xs)', opacity: '0.7' }}
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
