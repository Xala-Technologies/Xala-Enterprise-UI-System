// React mock for development
import { MobileHeaderButton } from './MobileHeaderButton';
import { NSMClassificationIndicator } from './NSMClassificationIndicator';

const React = {
  forwardRef: (Component: any) => Component,
};

// MobileHeader - Norwegian government-compliant mobile header component
interface MobileHeaderProps {
  titleKey?: string;
  title?: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  height?: 'compact' | 'standard' | 'extended';
  sticky?: boolean;
  transparent?: boolean;
  classification?: 'ÅPEN' | 'BEGRENSET' | 'KONFIDENSIELT' | 'HEMMELIG';
  municipalityCode?: string;
  onBack?: () => void;
  onMenuToggle?: () => void;
  onSearchFocus?: () => void;
  onNotificationPress?: () => void;
  children?: any;
  style?: any;
}

/**
 * MobileHeader - Norwegian government-compliant mobile header component
 *
 * Features:
 * - Touch-friendly minimum touch targets (WCAG 2.2 AA)
 * - Norwegian government service integration
 * - NSM security classification display
 * - Design token integration
 * - Semantic HTML structure
 *
 * Norwegian Compliance:
 * - DigDir touch target guidelines
 * - NSM visual classification indicators
 * - Norwegian keyboard shortcuts support
 * - Municipality-specific adaptations
 */
export const MobileHeader = React.forwardRef((props: MobileHeaderProps, ref: any) => {
  const {
    titleKey,
    title,
    showBackButton = false,
    showMenu = false,
    showSearch = false,
    showNotifications = false,
    notificationCount,
    height = 'standard',
    sticky = false,
    transparent = false,
    classification,
    municipalityCode,
    onBack,
    onMenuToggle,
    onSearchFocus,
    onNotificationPress,
    style,
    ...restProps
  } = props;

  // Mock translation function
  const t = (key: string) => key;

  // Height variants using design tokens
  const getHeightStyle = () => {
    const heights: Record<string, string> = {
      compact: 'var(--spacing-12)', // 48px
      standard: 'var(--spacing-14)', // 56px
      extended: 'var(--spacing-16)', // 64px
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
        padding: 'var(--spacing-3) var(--spacing-4)',
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
      {/* NSM Classification border indicator */}
      {classification && (
        <NSMClassificationIndicator level={classification} variant='border' position='bottom' />
      )}

      {/* Left section - Navigation buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          minWidth: 'var(--spacing-11)',
          minHeight: 'var(--spacing-11)',
        }}
      >
        {showBackButton && (
          <MobileHeaderButton icon='←' labelKey='navigation.back' onClick={onBack} />
        )}

        {showMenu && (
          <MobileHeaderButton icon='☰' labelKey='navigation.menu' onClick={onMenuToggle} />
        )}
      </div>

      {/* Center section - Title and classification */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 var(--spacing-2)',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-tight)',
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {titleKey ? t(titleKey) : title}
        </h1>

        {/* NSM Classification label */}
        {classification && (
          <NSMClassificationIndicator
            level={classification}
            variant='badge'
            size='small'
            showLabel={true}
            style={{ marginTop: 'var(--spacing-1)' }}
          />
        )}
      </div>

      {/* Right section - Action buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-1)',
          minWidth: 'var(--spacing-11)',
          justifyContent: 'flex-end',
        }}
      >
        {showSearch && (
          <MobileHeaderButton icon='🔍' labelKey='navigation.search' onClick={onSearchFocus} />
        )}

        {showNotifications && (
          <MobileHeaderButton
            icon='🔔'
            labelKey='navigation.notifications'
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
