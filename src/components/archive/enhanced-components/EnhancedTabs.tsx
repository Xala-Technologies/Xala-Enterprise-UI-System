/**
 * @fileoverview Enhanced Tabs Component - Enterprise Navigation
 * @description Horizontal tab navigation with multiple variants and content panels with WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INTERFACES
// =============================================================================

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly content: React.ReactNode;
  readonly icon?: React.ReactNode;
  readonly badge?: string | number;
  readonly isDisabled?: boolean;
  readonly isClosable?: boolean;
  readonly isLoading?: boolean;
}

export interface EnhancedTabsProps {
  readonly tabs: readonly TabItem[];
  readonly defaultActiveTab?: string;
  readonly variant?: 'default' | 'pills' | 'cards' | 'underlined' | 'minimal';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly orientation?: 'horizontal' | 'vertical';
  readonly fullWidth?: boolean;
  readonly lazyLoad?: boolean;
  readonly scrollable?: boolean;
  readonly onTabChange?: (tabId: string) => void;
  readonly onTabClose?: (tabId: string) => void;
  readonly className?: string;
  readonly ariaLabel?: string;
}

// =============================================================================
// ENHANCED TABS COMPONENT
// =============================================================================

export const EnhancedTabs = ({
  tabs,
  defaultActiveTab,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  fullWidth = false,
  lazyLoad = false,
  scrollable = false,
  onTabChange,
  onTabClose,
  className = '',
  ariaLabel = 'Tab navigation'
}: EnhancedTabsProps): JSX.Element => {
  const { colors, spacing, typography, elevation, borderRadius, componentSizing, motion } = useTokens();
  
  const [activeTab, setActiveTab] = useState<string>(() => {
    return defaultActiveTab || tabs.find(tab => !tab.isDisabled)?.id || tabs[0]?.id || '';
  });
  
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(() => {
    const loaded = new Set<string>();
    if (!lazyLoad) {
      tabs.forEach(tab => loaded.add(tab.id));
    } else if (activeTab) {
      loaded.add(activeTab);
    }
    return loaded;
  });

  const tabListRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Handle tab change
  const handleTabChange = useCallback((tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (!tab || tab.isDisabled) return;

    setActiveTab(tabId);
    
    if (lazyLoad) {
      setLoadedTabs(prev => new Set([...prev, tabId]));
    }
    
    onTabChange?.(tabId);
  }, [tabs, lazyLoad, onTabChange]);

  // Handle tab close
  const handleTabClose = useCallback((tabId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // If closing active tab, switch to next available tab
    if (tabId === activeTab) {
      const currentIndex = tabs.findIndex(t => t.id === tabId);
      const nextTab = tabs.find((t, index) => 
        index !== currentIndex && !t.isDisabled
      );
      
      if (nextTab) {
        setActiveTab(nextTab.id);
        onTabChange?.(nextTab.id);
      }
    }
    
    onTabClose?.(tabId);
  }, [activeTab, tabs, onTabChange, onTabClose]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(t => t.id === tabId);
    let targetIndex = currentIndex;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        targetIndex = currentIndex - 1;
        while (targetIndex >= 0 && tabs[targetIndex].isDisabled) {
          targetIndex--;
        }
        if (targetIndex >= 0) {
          handleTabChange(tabs[targetIndex].id);
        }
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        targetIndex = currentIndex + 1;
        while (targetIndex < tabs.length && tabs[targetIndex].isDisabled) {
          targetIndex++;
        }
        if (targetIndex < tabs.length) {
          handleTabChange(tabs[targetIndex].id);
        }
        break;
      case 'Home':
        event.preventDefault();
        targetIndex = 0;
        while (targetIndex < tabs.length && tabs[targetIndex].isDisabled) {
          targetIndex++;
        }
        if (targetIndex < tabs.length) {
          handleTabChange(tabs[targetIndex].id);
        }
        break;
      case 'End':
        event.preventDefault();
        targetIndex = tabs.length - 1;
        while (targetIndex >= 0 && tabs[targetIndex].isDisabled) {
          targetIndex--;
        }
        if (targetIndex >= 0) {
          handleTabChange(tabs[targetIndex].id);
        }
        break;
    }
  }, [tabs, handleTabChange]);

  // Check scroll state
  const checkScrollState = useCallback(() => {
    if (!scrollable || !tabListRef.current) return;

    const element = tabListRef.current;
    const canScrollLeft = element.scrollLeft > 0;
    const canScrollRight = element.scrollLeft < element.scrollWidth - element.clientWidth;
    
    setCanScrollLeft(canScrollLeft);
    setCanScrollRight(canScrollRight);
    setShowScrollButtons(element.scrollWidth > element.clientWidth);
  }, [scrollable]);

  // Scroll tabs
  const scrollTabs = useCallback((direction: 'left' | 'right') => {
    if (!tabListRef.current) return;
    
    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? tabListRef.current.scrollLeft - scrollAmount
      : tabListRef.current.scrollLeft + scrollAmount;
    
    tabListRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  }, []);

  // Update scroll state on mount and resize
  useEffect(() => {
    checkScrollState();
    
    const handleResize = () => checkScrollState();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScrollState]);

  // Generate variant styles
  const tabListStyles = useMemo(() => {
    const baseStyles = {
      display: orientation === 'horizontal' ? 'flex' : 'block',
      alignItems: orientation === 'horizontal' ? 'center' : 'stretch',
      flexDirection: orientation === 'horizontal' ? 'row' : 'column',
      width: fullWidth ? '100%' : 'auto',
      overflowX: scrollable && orientation === 'horizontal' ? 'auto' : 'visible',
      overflowY: scrollable && orientation === 'vertical' ? 'auto' : 'visible',
    };

    switch (variant) {
      case 'pills':
        return {
          ...baseStyles,
          backgroundColor: colors.background?.elevated,
          padding: spacing[1],
          borderRadius: borderRadius?.lg,
          gap: spacing[1],
        };
      case 'cards':
        return {
          ...baseStyles,
          borderBottom: `1px solid ${colors.border?.default}`,
          gap: spacing[1],
        };
      case 'underlined':
        return {
          ...baseStyles,
          borderBottom: `2px solid ${colors.border?.muted}`,
          gap: spacing[4],
        };
      case 'minimal':
        return {
          ...baseStyles,
          gap: spacing[6],
        };
      default:
        return {
          ...baseStyles,
          borderBottom: `1px solid ${colors.border?.default}`,
          gap: spacing[1],
        };
    }
  }, [variant, orientation, fullWidth, scrollable, colors, spacing, borderRadius]);

  // Generate size styles
  const sizeStyles = useMemo(() => {
    const sizeMap = {
      sm: {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize?.sm || '0.875rem',
        height: componentSizing?.button?.sm || '36px',
      },
      md: {
        padding: `${spacing[3]} ${spacing[4]}`,
        fontSize: typography.fontSize?.base || '1rem',
        height: componentSizing?.button?.md || '44px',
      },
      lg: {
        padding: `${spacing[4]} ${spacing[6]}`,
        fontSize: typography.fontSize?.lg || '1.125rem',
        height: componentSizing?.button?.lg || '52px',
      },
    };
    
    return sizeMap[size];
  }, [size, spacing, typography, componentSizing]);

  // Render tab button
  const renderTabButton = useCallback((tab: TabItem) => {
    const isActive = tab.id === activeTab;
    
    const buttonStyles = useMemo(() => {
      const baseStyles = {
        padding: sizeStyles.padding,
        fontSize: sizeStyles.fontSize,
        minHeight: sizeStyles.height,
        color: tab.isDisabled 
          ? colors.text?.muted 
          : isActive 
          ? colors.primary?.[600] || '#2563eb'
          : colors.text?.secondary,
        backgroundColor: 'transparent',
        border: 'none',
        cursor: tab.isDisabled ? 'not-allowed' : 'pointer',
        opacity: tab.isDisabled ? 0.5 : 1,
        transition: `all ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`,
        flex: fullWidth ? '1' : 'none',
        minWidth: fullWidth ? '0' : 'auto',
      };

      switch (variant) {
        case 'pills':
          return {
            ...baseStyles,
            backgroundColor: isActive 
              ? colors.primary?.[500] || '#3b82f6'
              : 'transparent',
            color: isActive 
              ? 'white' 
              : tab.isDisabled 
              ? colors.text?.muted 
              : colors.text?.primary,
            borderRadius: borderRadius?.md,
          };
        case 'cards':
          return {
            ...baseStyles,
            backgroundColor: isActive 
              ? colors.background?.paper 
              : colors.background?.elevated,
            border: `1px solid ${colors.border?.default}`,
            borderBottom: isActive ? `1px solid ${colors.background?.paper}` : `1px solid ${colors.border?.default}`,
            borderRadius: `${borderRadius?.md} ${borderRadius?.md} 0 0`,
            marginBottom: '-1px',
          };
        case 'underlined':
          return {
            ...baseStyles,
            borderBottom: isActive 
              ? `2px solid ${colors.primary?.[500] || '#3b82f6'}`
              : '2px solid transparent',
            marginBottom: '-2px',
          };
        case 'minimal':
          return {
            ...baseStyles,
            fontWeight: isActive ? 600 : 400,
          };
        default:
          return {
            ...baseStyles,
            backgroundColor: isActive 
              ? colors.background?.elevated 
              : 'transparent',
            borderRadius: `${borderRadius?.md} ${borderRadius?.md} 0 0`,
          };
      }
    }, [isActive, tab.isDisabled, variant, colors, borderRadius, sizeStyles, motion, fullWidth]);

    return (
      <button
        key={tab.id}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`tabpanel-${tab.id}`}
        aria-disabled={tab.isDisabled}
        id={`tab-${tab.id}`}
        tabIndex={isActive ? 0 : -1}
        onClick={() => handleTabChange(tab.id)}
        onKeyDown={(e) => handleKeyDown(e, tab.id)}
        disabled={tab.isDisabled}
        className="inline-flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={buttonStyles}
      >
        {tab.icon && (
          <span aria-hidden="true" style={{ width: '16px', height: '16px' }}>
            {tab.icon}
          </span>
        )}
        
        <span className={fullWidth ? 'truncate' : ''}>{tab.label}</span>
        
        {tab.badge && (
          <span
            className="inline-flex items-center justify-center rounded-full text-xs font-medium"
            style={{
              minWidth: '18px',
              height: '18px',
              backgroundColor: isActive && variant === 'pills' 
                ? 'rgba(255,255,255,0.2)' 
                : colors.primary?.[100] || '#dbeafe',
              color: isActive && variant === 'pills' 
                ? 'white' 
                : colors.primary?.[700] || '#1d4ed8',
              fontSize: typography.fontSize?.xs || '0.75rem',
              padding: '0 6px'
            }}
            aria-label={`${tab.badge} notifications`}
          >
            {tab.badge}
          </span>
        )}

        {tab.isLoading && (
          <div
            className="animate-spin rounded-full border-2 border-current border-t-transparent"
            style={{ width: '14px', height: '14px' }}
            aria-label="Loading..."
          />
        )}

        {tab.isClosable && (
          <button
            type="button"
            onClick={(e) => handleTabClose(tab.id, e)}
            className="ml-2 p-1 rounded hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{
              color: 'currentColor',
              opacity: 0.7,
              minWidth: '20px',
              minHeight: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label={`Close ${tab.label} tab`}
          >
            ✕
          </button>
        )}
      </button>
    );
  }, [
    activeTab,
    sizeStyles,
    colors,
    variant,
    borderRadius,
    motion,
    fullWidth,
    typography,
    handleTabChange,
    handleKeyDown,
    handleTabClose
  ]);

  // Render tab content
  const renderTabContent = useCallback(() => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    if (!activeTabData) return null;

    const shouldRenderContent = !lazyLoad || loadedTabs.has(activeTab);
    if (!shouldRenderContent) return null;

    return (
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={0}
        style={{
          padding: spacing[4],
          backgroundColor: variant === 'cards' ? colors.background?.paper : 'transparent',
          borderRadius: variant === 'cards' ? `0 0 ${borderRadius?.md} ${borderRadius?.md}` : '0',
          border: variant === 'cards' ? `1px solid ${colors.border?.default}` : 'none',
          borderTop: variant === 'cards' ? 'none' : undefined,
          marginTop: variant === 'cards' ? '-1px' : undefined,
        }}
      >
        {activeTabData.content}
      </div>
    );
  }, [activeTab, tabs, lazyLoad, loadedTabs, spacing, variant, colors, borderRadius]);

  return (
    <div className={`tabs ${className}`} style={{ width: fullWidth ? '100%' : 'auto' }}>
      {/* Tab List Container */}
      <div className="relative">
        {/* Scroll Buttons */}
        {scrollable && showScrollButtons && orientation === 'horizontal' && (
          <>
            <button
              type="button"
              onClick={() => scrollTabs('left')}
              disabled={!canScrollLeft}
              className="absolute left-0 top-0 z-10 p-2 bg-white border border-gray-300 rounded-l hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: sizeStyles.height,
                color: colors.text?.secondary
              }}
              aria-label="Scroll tabs left"
            >
              ◀
            </button>
            <button
              type="button"
              onClick={() => scrollTabs('right')}
              disabled={!canScrollRight}
              className="absolute right-0 top-0 z-10 p-2 bg-white border border-gray-300 rounded-r hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                height: sizeStyles.height,
                color: colors.text?.secondary
              }}
              aria-label="Scroll tabs right"
            >
              ▶
            </button>
          </>
        )}

        {/* Tab List */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label={ariaLabel}
          style={{
            ...tabListStyles,
            paddingLeft: scrollable && showScrollButtons ? '40px' : '0',
            paddingRight: scrollable && showScrollButtons ? '40px' : '0',
          }}
          onScroll={checkScrollState}
        >
          {tabs.map(renderTabButton)}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default EnhancedTabs;