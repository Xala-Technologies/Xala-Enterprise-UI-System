// React mock for development
const React = {
  forwardRef: (Component: any) => Component,
};

// MobileHeaderButton - Reusable button component for mobile headers
interface MobileHeaderButtonProps {
  icon: string;
  labelKey: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger';
  size?: 'compact' | 'standard';
  showBadge?: boolean;
  badgeCount?: number;
  style?: any;
}

/**
 * MobileHeaderButton - Norwegian government-compliant mobile header button
 *
 * Features:
 * - WCAG 2.2 AA touch target compliance (minimum var(--spacing-11))
 * - Design token integration
 * - Norwegian accessibility labels
 * - Badge notification support
 */
export const MobileHeaderButton = React.forwardRef((props: MobileHeaderButtonProps, ref: any) => {
  const {
    icon,
    labelKey,
    onClick,
    disabled = false,
    variant = 'default',
    size = 'standard',
    showBadge = false,
    badgeCount,
    style,
    ...restProps
  } = props;

  // Mock translation function
  const t = (key: string) => key;

  // Size variants
  const getSizeStyle = () => {
    return size === 'compact'
      ? { minWidth: 'var(--spacing-10)', minHeight: 'var(--spacing-10)' }
      : { minWidth: 'var(--spacing-11)', minHeight: 'var(--spacing-11)' }; // WCAG 2.2 AA touch target
  };

  // Variant styling
  const getVariantStyle = () => {
    const variants: Record<string, any> = {
      default: {
        color: 'var(--color-text-primary)',
        backgroundColor: 'transparent',
      },
      primary: {
        color: 'var(--color-primary-600)',
        backgroundColor: 'var(--color-primary-50)',
      },
      danger: {
        color: 'var(--color-danger-600)',
        backgroundColor: 'var(--color-danger-50)',
      },
    };
    return variants[variant];
  };

  return (
    <button
      ref={ref}
      type='button'
      onClick={onClick}
      disabled={disabled}
      aria-label={t(labelKey)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...getSizeStyle(),
        padding: 'var(--spacing-2)',
        border: 'none',
        borderRadius: 'var(--border-radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        position: 'relative',
        ...getVariantStyle(),
        ...style,
      }}
      {...restProps}
    >
      <span style={{ fontSize: 'var(--font-size-xl)' }}>{icon}</span>

      {/* Badge indicator */}
      {showBadge && badgeCount && badgeCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 'var(--spacing-1)',
            right: 'var(--spacing-1)',
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
          {badgeCount > 99 ? '99+' : badgeCount}
        </span>
      )}
    </button>
  );
});

MobileHeaderButton.displayName = 'MobileHeaderButton';
