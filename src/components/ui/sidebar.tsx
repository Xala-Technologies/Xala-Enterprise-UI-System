/**
 * @fileoverview Sidebar Component - Enterprise Navigation
 * @description Collapsible sidebar navigation with hierarchical menu support and WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Box, Text, Heading, Button as SemanticButton, Input as SemanticInput, List, ListItem, Link } from '../semantic';
import { cn } from '../../lib/utils/cn';

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

export interface SidebarProps {
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
// SIDEBAR COMPONENT
// =============================================================================

export const Sidebar = ({
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
}: SidebarProps): JSX.Element => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [focusedItem, setFocusedItem] = useState<string | null>(null);

  // Calculate width based on token system
  const sidebarWidth = useMemo(() => {
    const widthMap = {
      compact: '200px',
      standard: '240px',
      wide: '320px',
    };
    return isCollapsed ? '64px' : widthMap[width];
  }, [width, isCollapsed]);

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

  // Generate sidebar classes
  const sidebarClasses = useMemo(() => {
    const baseClasses = [
      'transition-width duration-200 ease-in-out',
      variant === 'elevated' ? 'bg-card shadow-md' : 'bg-background',
      variant === 'minimal' ? 'rounded-none' : 'rounded-lg',
      'border border-border'
    ];
    return baseClasses.join(' ');
  }, [variant]);

  // Render navigation item
  const renderNavItem = useCallback((item: SidebarNavItem, level: number = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = Boolean(item.children?.length);
    const isFocused = focusedItem === item.id;

    const itemClasses = cn(
      'min-h-[44px] rounded-md transition-all duration-150 ease-in-out cursor-pointer',
      isCollapsed ? 'px-2' : `pl-[${8 + (level * 16)}px] pr-3`,
      'py-2',
      item.isActive && 'bg-primary/10 text-primary-700',
      isFocused && !item.isActive && 'bg-muted/50',
      item.isDisabled && 'opacity-50 cursor-not-allowed text-muted-foreground',
      !item.isActive && !item.isDisabled && 'text-foreground'
    );

    return (
      <ListItem key={item.id} role="none">
        <Box
          role={hasChildren ? 'button' : item.href ? 'link' : 'menuitem'}
          tabIndex={item.isDisabled ? -1 : 0}
          aria-expanded={hasChildren ? isExpanded : undefined}
          aria-disabled={item.isDisabled}
          aria-current={item.isActive ? 'page' : undefined}
          className={cn(itemClasses, "flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2")}
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
          <Box className="flex items-center flex-1 min-w-0">
            {item.icon && (
              <Box 
                className="flex-shrink-0 w-5 h-5 mr-3"
                aria-hidden="true"
              >
                {item.icon}
              </Box>
            )}
            
            {!isCollapsed && (
              <Text as="span" 
                className="flex-1 truncate text-sm font-medium"
              >
                {item.label}
              </Text>
            )}
          </Box>

          <Box className="flex items-center space-x-2">
            {!isCollapsed && item.badge && (
              <Text as="span"
                className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 text-xs font-medium bg-primary text-white rounded-full"
                aria-label={`${item.badge} notifications`}
              >
                {item.badge}
              </Text>
            )}

            {!isCollapsed && hasChildren && (
              <Box
                className="w-4 h-4 transition-transform"
                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                aria-hidden="true"
              >
                ▶
              </Box>
            )}
          </Box>
        </Box>

        {/* Render children */}
        {hasChildren && isExpanded && !isCollapsed && (
          <List variant="unordered"
            role="group"
            aria-labelledby={item.id}
            className="mt-1 ml-2"
          >
            {item.children?.map(childItem => renderNavItem(childItem, level + 1))}
          </List>
        )}
      </ListItem>
    );
  }, [
    expandedItems, 
    focusedItem, 
    isCollapsed,
    handleItemToggle,
    handleKeyDown
  ]);

  // Render user profile section
  const renderUserProfile = useCallback(() => {
    if (!userProfile || isCollapsed) return null;

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-500',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    return (
      <Box
        className="border-t border-border p-4 bg-background"
      >
        <Box className="flex items-center space-x-3">
          <Box className="relative flex-shrink-0">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt={`${userProfile.name}'s avatar`}
                className="rounded-full object-cover w-10 h-10"
              />
            ) : (
              <Box
                className="rounded-full flex items-center justify-center w-10 h-10 bg-primary text-white text-sm font-semibold"
              >
                {userProfile.name.charAt(0).toUpperCase()}
              </Box>
            )}
            
            {userProfile.status && (
              <Box
                className={cn(
                  "absolute -bottom-1 -right-1 rounded-full border-2 border-white w-3 h-3",
                  statusColors[userProfile.status]
                )}
                aria-label={`Status: ${userProfile.status}`}
              />
            )}
          </Box>

          <Box className="flex-1 min-w-0">
            <Text
              className="font-medium truncate text-sm text-foreground"
            >
              {userProfile.name}
            </Text>
            <Text
              className="truncate text-xs text-muted-foreground"
            >
              {userProfile.role || userProfile.email}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }, [userProfile, isCollapsed]);

  return (
    <Box as="aside"
      className={cn(
        'flex flex-col border-r',
        position === 'fixed' ? 'fixed left-0 top-0 h-full' : 'h-full',
        sidebarClasses,
        className
      )}
      style={{ width: sidebarWidth }}
      role="navigation"
      aria-label={ariaLabel}
    >
      {/* Brand/Header Section */}
      <Box
        className="flex items-center justify-between p-4 border-b border-border min-h-[64px]"
      >
        <Box className="flex items-center space-x-3 min-w-0 flex-1">
          {brandLogo && (
            <Box className="flex-shrink-0 w-8 h-8">
              {brandLogo}
            </Box>
          )}
          
          {!isCollapsed && (
            <Heading level={1}
              className="font-bold truncate text-lg text-foreground"
            >
              {brandName}
            </Heading>
          )}
        </Box>

        {onCollapseToggle && (
          <Text
            as="button"
            type="button"
            onClick={handleCollapseToggle}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!isCollapsed}
          >
            <Box
              className="w-5 h-5 flex items-center justify-center transition-transform"
              style={{ transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ◀
            </Box>
          </Text>
        )}
      </Box>

      {/* Navigation Section */}
      <Box as="nav" className="flex-1 overflow-y-auto p-2" role="menubar">
        <List variant="unordered" role="menu" className="space-y-1">
          {navItems.map(item => renderNavItem(item))}
        </List>
      </Box>

      {/* User Profile Section */}
      {renderUserProfile()}
    </Box>
  );
};

export default Sidebar;

// Legacy exports for backward compatibility
export { Sidebar as EnhancedSidebar };
export type { SidebarProps as EnhancedSidebarProps };