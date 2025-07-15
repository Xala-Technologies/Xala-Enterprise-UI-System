/**
 * Mobile Header Component
 * Enterprise-grade mobile header with responsive design and Norwegian compliance
 */

/* eslint-disable no-unused-vars */

import React, { useCallback } from 'react';

import type { MobileHeaderProps } from '../../../types/platform.types';

// Helper function to get classification icon
const getClassificationIcon = (level: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[level as keyof typeof icons] || '📋';
};

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
  const safeAreaStyles = getSafeAreaStyles(true);

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
    },
  };
  return heights[height as keyof typeof heights] || heights.standard;
};

// Get safe area styles
const getSafeAreaStyles = (safeAreaHandling: boolean): React.CSSProperties => {
  if (!safeAreaHandling) return {};

  return {
    paddingTop: 'env(safe-area-inset-top)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  };
};

// Get classification styles
const getClassificationStyles = (classification?: string): React.CSSProperties => {
  if (!classification) return {};

  const classificationColors = {
    ÅPEN: 'var(--color-green-500)',
    BEGRENSET: 'var(--color-orange-500)',
    KONFIDENSIELT: 'var(--color-red-500)',
    HEMMELIG: 'var(--color-red-800)',
  };

  return {
    borderTop: `3px solid ${classificationColors[classification as keyof typeof classificationColors]}`,
  };
};

// Header button component
interface HeaderButtonProps {
  icon: React.ReactNode;
  onPress: () => void;
  testId?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  onPress,
  testId,
  ariaLabel,
  disabled = false,
}) => {
  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '44px', // Norwegian accessibility requirement
    height: '44px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-size-lg)',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
  };

  return (
    <button
      type="button"
      style={buttonStyles}
      onClick={onPress}
      disabled={disabled}
      data-testid={testId}
      aria-label={ariaLabel}
      onMouseEnter={e => {
        if (!disabled) {
          (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-100)';
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          (e.target as HTMLElement).style.backgroundColor = 'transparent';
        }
      }}
    >
      {icon}
    </button>
  );
};

// Municipality logo component
interface MunicipalityLogoProps {
  municipality: string;
}

const MunicipalityLogo: React.FC<MunicipalityLogoProps> = ({ municipality }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-2)',
      padding: 'var(--spacing-1) var(--spacing-2)',
      backgroundColor: 'var(--color-blue-50)',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--color-blue-200)',
    }}
  >
    <span style={{ fontSize: 'var(--font-size-sm)' }}>🏛️</span>
    <span
      style={{
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        color: 'var(--color-blue-700)',
      }}
    >
      {municipality}
    </span>
  </div>
);

// Classification badge component
interface ClassificationBadgeProps {
  level: string;
}

const ClassificationBadge: React.FC<ClassificationBadgeProps> = ({ level }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--spacing-1)',
      padding: 'var(--spacing-1) var(--spacing-2)',
      backgroundColor: 'var(--color-gray-100)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
    }}
  >
    <span>{getClassificationIcon(level)}</span>
    <span>{level}</span>
  </div>
);

// Emergency contact component
const EmergencyContact: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 'calc(100% + var(--spacing-1))',
      right: 'var(--spacing-4)',
      padding: 'var(--spacing-2)',
      backgroundColor: 'var(--color-red-600)',
      color: 'var(--color-white)',
      borderRadius: 'var(--radius-md)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-semibold)',
      whiteSpace: 'nowrap',
      animation: 'emergency-pulse 2s infinite',
    }}
    role="button"
    tabIndex={0}
  >
    🚨 NØDNUMMER: 112
  </div>
);

// Government branding component
const GovernmentBranding: React.FC = () => (
  <div
    style={{
      position: 'absolute',
      top: 'calc(100% + var(--spacing-1))',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: 'var(--spacing-1) var(--spacing-2)',
      backgroundColor: 'var(--color-gray-900)',
      color: 'var(--color-white)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
    }}
    aria-hidden="true"
  >
    🇳🇴 REGJERINGEN.NO
  </div>
);

// MobileHeader component with forwardRef
export const MobileHeader = React.forwardRef<HTMLDivElement, MobileHeaderProps>(
  (props, ref): React.ReactElement => {
    const {
      title,
      titleKey,
      showBackButton = false,
      showMenu = false,
      showSearch = false,
      showNotifications = false,
      notificationCount,
      // searchPlaceholder,
      onBackClick,
      onBack,
      onMenuClick,
      onMenuToggle,
      onSearchFocus,
      onNotificationClick,
      height = 'standard',
      sticky: _sticky = true,
      // transparent mode planned for future
      norwegian,
      className,
      testId,
      ariaLabel,
      ...restProps
    } = props;

    // Handle back button click
    const handleBackClick = useCallback(() => {
      onBackClick?.();
      onBack?.();
    }, [onBackClick, onBack]);

    // Handle menu toggle
    const handleMenuToggle = useCallback(() => {
      onMenuClick?.();
      onMenuToggle?.();
    }, [onMenuClick, onMenuToggle]);

    // Get combined styles
    const combinedStyles = getMobileHeaderStyles(props);

    // Render left section
    const renderLeftSection = (): React.ReactElement => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        {showBackButton && (
          <HeaderButton
            icon="←"
            onPress={handleBackClick}
            testId={`${testId}-back`}
            ariaLabel="Go back"
          />
        )}

        {showMenu && (
          <HeaderButton
            icon="☰"
            onPress={handleMenuToggle}
            testId={`${testId}-menu`}
            ariaLabel="Open menu"
          />
        )}

        {norwegian?.municipalityLogo && norwegian.municipality && (
          <MunicipalityLogo municipality={norwegian.municipality} />
        )}
      </div>
    );

    // Render center section
    const renderCenterSection = (): React.ReactElement | null => {
      if (!(title || titleKey)) return null;

      return (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 var(--spacing-4)',
          }}
        >
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
            {title || titleKey}
          </h1>
        </div>
      );
    };

    // Render right section
    const renderRightSection = (): React.ReactElement => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
        {norwegian?.showClassificationBadge && norwegian.classification && (
          <ClassificationBadge level={norwegian.classification} />
        )}

        {showSearch && (
          <HeaderButton
            icon="🔍"
            onPress={() => onSearchFocus?.()}
            testId={`${testId}-search`}
            ariaLabel="Search"
          />
        )}

        {showNotifications && (
          <div style={{ position: 'relative' }}>
            <HeaderButton
              icon="🔔"
              onPress={() => onNotificationClick?.()}
              testId={`${testId}-notifications`}
              ariaLabel="Notifications"
            />
            {notificationCount && notificationCount > 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 'var(--spacing-1)',
                  right: 'var(--spacing-1)',
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
                }}
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </div>
            )}
          </div>
        )}
      </div>
    );

    return (
      <div
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
        {...restProps}
      >
        {height === 'extended' ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {renderLeftSection()}
              {renderRightSection()}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 'var(--spacing-2)',
              }}
            >
              {renderCenterSection()}
            </div>
          </div>
        ) : (
          <>
            {renderLeftSection()}
            {renderCenterSection()}
            {renderRightSection()}
          </>
        )}

        {/* Emergency contact access */}
        {norwegian?.emergencyContactAccess && <EmergencyContact />}

        {/* Government branding for classified content */}
        {norwegian?.governmentBranding && norwegian.classification === 'HEMMELIG' && (
          <GovernmentBranding />
        )}
      </div>
    );
  }
);

MobileHeader.displayName = 'MobileHeader';
