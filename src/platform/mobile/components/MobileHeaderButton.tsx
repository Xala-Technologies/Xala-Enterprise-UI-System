// React mock for development
import React from 'react';

// Helper function for classification icons
const getClassificationIcon = (classification?: string): string => {
  const icons = {
    ÅPEN: '🟢',
    BEGRENSET: '🟡',
    KONFIDENSIELT: '🔴',
    HEMMELIG: '⚫',
  };
  return icons[classification as keyof typeof icons] || '📱';
};

interface MobileHeaderButtonProps {
  icon: string;
  label: string;
  onClick?: (() => void) | undefined;
  variant?: 'default' | 'primary' | 'secondary';
  showBadge?: boolean;
  badgeCount?: number;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const MobileHeaderButton = React.forwardRef<HTMLButtonElement, MobileHeaderButtonProps>(
  (
    {
      icon,
      label,
      onClick,
      variant = 'default',
      showBadge = false,
      badgeCount = 0,
      disabled = false,
      style,
      ...restProps
    },
    ref
  ) => {
    const getVariantStyle = (): React.CSSProperties => {
      const variants = {
        default: {
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: 'none',
        },
        primary: {
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-text-on-primary)',
          border: 'none',
        },
        secondary: {
          backgroundColor: 'var(--color-secondary)',
          color: 'var(--color-text-on-secondary)',
          border: 'none',
        },
      };

      return variants[variant];
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 'var(--spacing-11)', // 44px touch target
          minHeight: 'var(--spacing-11)',
          padding: 'var(--spacing-2)',
          borderRadius: 'var(--border-radius-md)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all var(--transition-duration-fast) ease-in-out',
          opacity: disabled ? 0.5 : 1,
          ...getVariantStyle(),
          ...style,
        }}
        aria-label={label}
        {...restProps}
      >
        <span style={{ fontSize: 'var(--font-size-xl)' }}>{icon}</span>

        {showBadge && badgeCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 'var(--spacing-0-5)',
              right: 'var(--spacing-0-5)',
              minWidth: 'var(--spacing-4)',
              height: 'var(--spacing-4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-bold)',
              color: 'var(--color-text-on-error)',
              backgroundColor: 'var(--color-error)',
              borderRadius: 'var(--border-radius-full)',
              border: '2px solid var(--color-surface-primary)',
            }}
          >
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </button>
    );
  }
);

MobileHeaderButton.displayName = 'MobileHeaderButton';
