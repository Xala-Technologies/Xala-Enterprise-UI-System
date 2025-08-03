/**
 * @fileoverview Enhanced Sidebar Component - Enterprise Navigation
 * @description Collapsible sidebar navigation with hierarchical menu support and WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INTERFACES
// =============================================================================

export interface SidebarNavItem {
  readonly id: string;
  readonly label: string;
  readonly href?: string;
  readonly icon?: React.ReactNode;
  readonly badge?: string | number;
  readonly children?: readonly SidebarNavItem[];
  readonly isActive?: boolean;
  readonly isDisabled?: boolean;
  readonly onClick?: () => void;
}

export interface SidebarUserProfile {
  readonly name: string;
  readonly email: string;
  readonly avatar?: string;
  readonly role?: string;
  readonly status?: 'online' | 'offline' | 'away' | 'busy';
}

export interface EnhancedSidebarProps {
  readonly navItems: readonly SidebarNavItem[];
  readonly userProfile?: SidebarUserProfile;
  readonly brandName?: string;
  readonly brandLogo?: React.ReactNode;
  readonly isCollapsed?: boolean;
  readonly onCollapseToggle?: (collapsed: boolean) => void;
  readonly variant?: 'default' | 'elevated' | 'minimal';
  readonly width?: 'compact' | 'standard' | 'wide';
  readonly position?: 'fixed' | 'static';
  readonly className?: string;
  readonly ariaLabel?: string;
}

// =============================================================================
// ENHANCED SIDEBAR COMPONENT
// =============================================================================

export const EnhancedSidebar = ({
  navItems,
  userProfile,
  brandName = 'Xala Enterprise',
  brandLogo,
  isCollapsed = false,
  onCollapseToggle,
  variant = 'default',
  width = 'standard',
  position = 'fixed',
  className = '',
  ariaLabel = 'Main navigation'
}: EnhancedSidebarProps): JSX.Element => {
  const { colors, spacing, typography, elevation, borderRadius, componentSizing, motion } = useTokens();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  // Calculate width based on token system
  const sidebarWidth = useMemo(() => {
    const widthMap = {
      compact: componentSizing?.navbar?.compact || '200px',
      standard: componentSizing?.navbar?.standard || '240px',
      wide: componentSizing?.navbar?.wide || '320px',
    };
    return isCollapsed ? '64px' : widthMap[width];
  }, [width, isCollapsed, componentSizing]);

  // Handle item expansion
  const handleItemToggle = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, item: SidebarNavItem) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (item.children?.length) {
          handleItemToggle(item.id);
        } else if (item.onClick) {
          item.onClick();
        }
        break;
      case 'ArrowRight':
        if (item.children?.length && !expandedItems.has(item.id)) {
          event.preventDefault();
          handleItemToggle(item.id);
        }
        break;
      case 'ArrowLeft':
        if (item.children?.length && expandedItems.has(item.id)) {
          event.preventDefault();
          handleItemToggle(item.id);
        }
        break;
    }
  }, [expandedItems, handleItemToggle]);

  // Collapse handler
  const handleCollapseToggle = useCallback(() => {
    onCollapseToggle?.(!isCollapsed);
  }, [isCollapsed, onCollapseToggle]);

  // Generate styles based on tokens
  const sidebarStyles = useMemo(() => {
    const baseStyle = {
      width: sidebarWidth,
      backgroundColor: variant === 'elevated' 
        ? colors.background?.elevated 
        : colors.background?.paper,
      borderColor: colors.border?.default,
      boxShadow: variant === 'elevated' ? elevation?.md : 'none',
      borderRadius: variant === 'minimal' ? '0' : borderRadius?.lg,
      transition: `width ${motion?.duration?.normal || '200ms'} ${motion?.easing?.ease || 'ease'}`,
    };

    return baseStyle;
  }, [sidebarWidth, variant, colors, elevation, borderRadius, motion]);

  // Render navigation item
  const renderNavItem = useCallback((item: SidebarNavItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = Boolean(item.children?.length);
    const isFocused = focusedItem === item.id;

    const itemStyles = {
      paddingLeft: isCollapsed ? spacing[2] : `${8 + (level * 16)}px`,
      paddingRight: spacing[3],
      paddingTop: spacing[2],
      paddingBottom: spacing[2],
      minHeight: componentSizing?.button?.md || '44px',
      backgroundColor: item.isActive 
        ? colors.primary?.[100] || colors.background?.elevated
        : isFocused 
        ? colors.background?.elevated 
        : 'transparent',
      borderRadius: borderRadius?.md,
      color: item.isActive 
        ? colors.primary?.[700] || colors.text?.primary
        : item.isDisabled 
        ? colors.text?.muted 
        : colors.text?.primary,
      cursor: item.isDisabled ? 'not-allowed' : 'pointer',
      opacity: item.isDisabled ? 0.5 : 1,
      transition: `all ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`,
    };

    return (
      <li key={item.id} role="none">
        <div
          role={hasChildren ? 'button' : item.href ? 'link' : 'menuitem'}
          tabIndex={item.isDisabled ? -1 : 0}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-disabled={item.isDisabled}
          aria-current={item.isActive ? 'page' : undefined}
          style={itemStyles}
          className="flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => {
            if (item.isDisabled) return;
            if (hasChildren) {
              handleItemToggle(item.id);
            } else if (item.onClick) {
              item.onClick();
            }
          }}
          onKeyDown={(e) => handleKeyDown(e, item)}
          onFocus={() => setFocusedItem(item.id)}
          onBlur={() => setFocusedItem(null)}
        >
          <div className="flex items-center flex-1 min-w-0">
            {item.icon && (
              <div 
                className="flex-shrink-0"
                style={{ 
                  marginRight: isCollapsed ? '0' : spacing[3],
                  width: '20px',
                  height: '20px'
                }}
                aria-hidden="true"
              >
                {item.icon}
              </div>
            )}
            
            {!isCollapsed && (
              <span 
                className="flex-1 truncate"
                style={{ 
                  fontSize: typography.fontSize?.sm || '0.875rem',
                  fontWeight: item.isActive ? 600 : 400,
                  lineHeight: typography.lineHeight?.tight || 1.25
                }}
              >
                {item.label}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {!isCollapsed && item.badge && (
              <span
                className="inline-flex items-center justify-center text-xs font-medium rounded-full"
                style={{
                  minWidth: '20px',
                  height: '20px',
                  paddingLeft: spacing[1],
                  paddingRight: spacing[1],
                  backgroundColor: colors.primary?.[500] || '#3b82f6',
                  color: 'white',
                  fontSize: typography.fontSize?.xs || '0.75rem'
                }}
                aria-label={`${item.badge} notifications`}
              >
                {item.badge}
              </span>
            )}

            {!isCollapsed && hasChildren && (
              <div
                style={{
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: `transform ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`,
                  width: '16px',
                  height: '16px'
                }}
                aria-hidden="true"
              >
                ▶
              </div>
            )}
          </div>
        </div>

        {/* Render children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <ul
            role="group"
            aria-labelledby={item.id}
            style={{
              marginTop: spacing[1],
              marginLeft: spacing[2]
            }}
          >
            {item.children?.map(childItem => renderNavItem(childItem, level + 1))}
          </ul>
        )}
      </li>
    );
  }, [
    expandedItems, 
    focusedItem, 
    isCollapsed, 
    spacing, 
    componentSizing, 
    colors, 
    borderRadius, 
    motion, 
    typography,
    handleItemToggle,
    handleKeyDown
  ]);

  // Render user profile section
  const renderUserProfile = useCallback(() => {
    if (!userProfile || isCollapsed) return null;

    const statusColors = {
      online: colors.status?.success || '#10b981',
      offline: colors.text?.muted || '#6b7280',
      away: colors.status?.warning || '#f59e0b',
      busy: colors.status?.error || '#ef4444',
    };

    return (
      <div
        className="border-t p-4"
        style={{
          borderColor: colors.border?.muted,
          backgroundColor: colors.background?.paper
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt={`${userProfile.name}'s avatar`}
                className="rounded-full object-cover"
                style={{ width: '40px', height: '40px' }}
              />
            ) : (
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: colors.primary?.[500] || '#3b82f6',
                  color: 'white',
                  fontSize: typography.fontSize?.sm || '0.875rem',
                  fontWeight: 600
                }}
              >
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
            )}
            
            {userProfile.status && (
              <div
                className="absolute -bottom-1 -right-1 rounded-full border-2 border-white"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: statusColors[userProfile.status]
                }}
                aria-label={`Status: ${userProfile.status}`}
              />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="font-medium truncate"
              style={{
                color: colors.text?.primary,
                fontSize: typography.fontSize?.sm || '0.875rem'
              }}
            >
              {userProfile.name}
            </p>
            <p
              className="truncate"
              style={{
                color: colors.text?.muted,
                fontSize: typography.fontSize?.xs || '0.75rem'
              }}
            >
              {userProfile.role || userProfile.email}
            </p>
          </div>
        </div>
      </div>
    );
  }, [userProfile, isCollapsed, colors, typography]);

  return (
    <aside
      className={`flex flex-col ${position === 'fixed' ? 'fixed left-0 top-0 h-full' : 'h-full'} border-r ${className}`}
      style={sidebarStyles}
      role="navigation"
      aria-label={ariaLabel}
    >
      {/* Brand/Header Section */}
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{
          borderColor: colors.border?.muted,
          minHeight: componentSizing?.navbar?.height || '64px'
        }}
      >
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          {brandLogo && (
            <div className="flex-shrink-0" style={{ width: '32px', height: '32px' }}>
              {brandLogo}
            </div>
          )}
          
          {!isCollapsed && (
            <h1
              className="font-bold truncate"
              style={{
                color: colors.text?.primary,
                fontSize: typography.fontSize?.lg || '1.125rem'
              }}
            >
              {brandName}
            </h1>
          )}
        </div>

        {onCollapseToggle && (
          <button
            type="button"
            onClick={handleCollapseToggle}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              color: colors.text?.secondary,
              minWidth: '36px',
              minHeight: '36px'
            }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            <div
              style={{
                transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: `transform ${motion?.duration?.normal || '200ms'} ${motion?.easing?.ease || 'ease'}`,
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ◀
            </div>
          </button>
        )}
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto p-2" role="menubar">
        <ul role="menu" className="space-y-1">
          {navItems.map(item => renderNavItem(item))}
        </ul>
      </nav>

      {/* User Profile Section */}
      {renderUserProfile()}
    </aside>
  );
};

export default EnhancedSidebar;