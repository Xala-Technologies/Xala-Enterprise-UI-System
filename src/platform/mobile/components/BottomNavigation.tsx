import { Logger } from '@xala-technologies/enterprise-standards';
import React from 'react';
import { useLocalization } from '../../../localization/hooks/useLocalization';

const logger = Logger.create({
  serviceName: 'ui-system-bottom-navigation',
  logLevel: 'info',
  enableConsoleLogging: true,
  enableFileLogging: false,
});

// BottomNavigation - Norwegian government-compliant mobile bottom navigation component
interface BottomNavigationItem {
  labelKey: string;
  icon: string;
  activeIcon?: string;
  badgeCount?: number;
  disabled?: boolean;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
}

interface BottomNavigationProps {
  items: BottomNavigationItem[];
  activeIndex?: number;
  showLabels?: boolean;
  showBadges?: boolean;
  height?: 'compact' | 'standard' | 'extended';
  safeAreaBottom?: boolean;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  onItemPress?: (index: number, item: BottomNavigationItem) => void;
  style?: React.CSSProperties;
  children?: unknown;
}

/**
 * BottomNavigation - Norwegian government-compliant mobile bottom navigation
 *
 * Features:
 * - Touch-friendly 44px minimum touch targets (WCAG 2.2 AA)
 * - NSM security classification display
 * - Norwegian government service icons
 * - Badge notifications support
 * - Safe area handling for mobile devices
 * - Design token integration
 * - Semantic HTML structure
 *
 * Norwegian Compliance:
 * - DigDir touch target guidelines (minimum 44px)
 * - NSM visual classification indicators
 * - Government service navigation patterns
 * - Emergency access support
 * - Accessibility announcements in Norwegian
 */
export const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(
  (props: BottomNavigationProps, ref): React.ReactElement => {
    const {
      items,
      activeIndex = 0,
      showLabels = true,
      showBadges = true,
      height = 'standard',
      safeAreaBottom = true,
      classification,
      onItemPress,
      style,
      ...restProps
    } = props;
    
    const { t } = useLocalization();
    
    const handleItemPress = (index: number, item: BottomNavigationItem): void => {
      if (!item.disabled && onItemPress) {
        onItemPress(index, item);
      }
    };
    
    const getHeightStyle = (): string => {
      switch (height) {
        case 'compact': return 'var(--spacing-12)';
        case 'extended': return 'var(--spacing-16)';
        default: return 'var(--spacing-14)';
      }
    };
    
    const getClassificationStyle = (): React.CSSProperties => {
      if (!classification) return {};
      
      const classificationColors = {
        'ÅPEN': 'var(--color-success-500)',
        'BEGRENSET': 'var(--color-warning-500)', 
        'KONFIDENSIELT': 'var(--color-danger-500)',
        'HEMMELIG': 'var(--color-danger-700)'
      };
      
      return {
        borderTopColor: classificationColors[classification] || 'var(--color-border-subtle)',
        borderTopWidth: '2px'
      };
    };
    
    return (
      <nav
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 'var(--spacing-2) var(--spacing-4)',
          paddingBottom: safeAreaBottom
            ? 'calc(var(--spacing-2) + env(safe-area-inset-bottom))'
            : 'var(--spacing-2)',
          minHeight: getHeightStyle(),
          backgroundColor: 'var(--color-surface-primary)',
          borderTop: '1px solid var(--color-border-subtle)',
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 'var(--z-index-navigation)',
          ...getClassificationStyle(),
          ...style,
        }}
        role="tablist"
        aria-label={'navigation.bottomNavigation'}
        {...restProps}
      >
        {items.map((item, index): React.ReactElement => {
          const isActive = index === activeIndex;
          const itemClassification = item.classification;
          
          return (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={t(item.labelKey)}
              disabled={item.disabled}
              onClick={() => handleItemPress(index, item)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 'var(--spacing-11)', // WCAG 2.2 AA - 44px touch target
                minHeight: 'var(--spacing-11)',
                padding: 'var(--spacing-1)',
                border: 'none',
                borderRadius: 'var(--border-radius-md)',
                backgroundColor: 'transparent',
                color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.5 : 1,
                transition: 'all 0.2s ease',
                position: 'relative',
                flex: 1,
                maxWidth: 'var(--spacing-20)', // Prevent items from becoming too wide
              }}
            >
              {/* Icon */}
              <div
                style={{
                  position: 'relative',
                  marginBottom: showLabels ? 'var(--spacing-1)' : '0',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--font-size-xl)',
                    lineHeight: 1,
                  }}
                >
                  {isActive && item.activeIcon ? item.activeIcon : item.icon}
                </span>

                {/* Badge */}
                {showBadges && item.badgeCount && item.badgeCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 'calc(-1 * var(--spacing-1))',
                      right: 'calc(-1 * var(--spacing-1))',
                      backgroundColor: 'var(--color-danger-500)',
                      color: 'var(--color-text-on-danger)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-bold)',
                      borderRadius: 'var(--border-radius-full)',
                      minWidth: 'var(--spacing-4)',
                      height: 'var(--spacing-4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                  >
                    {item.badgeCount > 99 ? '99+' : item.badgeCount}
                  </span>
                )}

                {/* NSM Classification indicator */}
                {itemClassification && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 'calc(-1 * var(--spacing-0-5))',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 'var(--spacing-1)',
                      height: 'var(--spacing-1)',
                      borderRadius: 'var(--border-radius-full)',
                      backgroundColor:
                        itemClassification === 'ÅPEN'
                          ? 'var(--color-success-500)'
                          : itemClassification === 'BEGRENSET'
                            ? 'var(--color-warning-500)'
                            : itemClassification === 'KONFIDENSIELT'
                              ? 'var(--color-danger-500)'
                              : 'var(--color-danger-700)',
                    }}
                  />
                )}
              </div>

              {/* Label */}
              {showLabels && (
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: isActive
                      ? 'var(--font-weight-medium)'
                      : 'var(--font-weight-normal)',
                    lineHeight: 'var(--line-height-tight)',
                    textAlign: 'center',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t(item.labelKey)}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    );
  }
);

BottomNavigation.displayName = 'BottomNavigation';
