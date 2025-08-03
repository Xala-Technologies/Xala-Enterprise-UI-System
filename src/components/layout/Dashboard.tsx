/**
 * @fileoverview Dashboard Component - Enterprise Layout
 * @description Complete dashboard layout with KPI cards, metrics, and activity feed with WCAG AAA compliance
 * @version 5.0.0
 * @compliance WCAG AAA, NSM, Enterprise Standards
 */

import React, { useState, useCallback, useMemo } from 'react';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// INTERFACES
// =============================================================================

export interface KPICardData {
  readonly id: string;
  readonly title: string;
  readonly value: string | number;
  readonly previousValue?: string | number;
  readonly trend?: 'up' | 'down' | 'neutral';
  readonly trendPercentage?: number;
  readonly icon?: React.ReactNode;
  readonly color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  readonly isLoading?: boolean;
  readonly onClick?: () => void;
  readonly ariaLabel?: string;
}

export interface QuickAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: React.ReactNode;
  readonly onClick: () => void;
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly isDisabled?: boolean;
  readonly badge?: string | number;
}

export interface ActivityItem {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly timestamp: string;
  readonly type?: 'info' | 'success' | 'warning' | 'error';
  readonly icon?: React.ReactNode;
  readonly avatar?: string;
  readonly userName?: string;
  readonly isRead?: boolean;
}

export interface DashboardProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly welcomeMessage?: string;
  readonly kpiCards: readonly KPICardData[];
  readonly quickActions?: readonly QuickAction[];
  readonly activityItems?: readonly ActivityItem[];
  readonly chartComponent?: React.ReactNode;
  readonly customSections?: readonly React.ReactNode[];
  readonly isLoading?: boolean;
  readonly error?: string;
  readonly onRefresh?: () => void;
  readonly className?: string;
}

// =============================================================================
// DASHBOARD COMPONENT
// =============================================================================

export const Dashboard = ({
  title = 'Dashboard',
  subtitle,
  welcomeMessage,
  kpiCards,
  quickActions = [],
  activityItems = [],
  chartComponent,
  customSections = [],
  isLoading = false,
  error,
  onRefresh,
  className = ''
}: DashboardProps): JSX.Element => {
  const { colors, spacing, typography, elevation, borderRadius, componentSizing, motion } = useTokens();
  const [expandedActivity, setExpandedActivity] = useState(false);

  // Handle activity expansion
  const handleActivityToggle = useCallback(() => {
    setExpandedActivity(prev => !prev);
  }, []);

  // Render KPI Card
  const renderKPICard = useCallback((kpi: KPICardData) => {
    const cardColors = {
      primary: colors.primary?.[500] || '#3b82f6',
      secondary: colors.secondary?.[500] || '#6b7280',
      success: colors.status?.success || '#10b981',
      warning: colors.status?.warning || '#f59e0b',
      danger: colors.status?.error || '#ef4444',
      info: colors.status?.info || '#3b82f6',
    };

    const accentColor = kpi.color ? cardColors[kpi.color] : cardColors.primary;
    const trendColor = kpi.trend === 'up' 
      ? colors.status?.success || '#10b981'
      : kpi.trend === 'down' 
      ? colors.status?.error || '#ef4444'
      : colors.text?.muted || '#6b7280';

    const cardStyles = {
      backgroundColor: colors.background?.paper,
      borderColor: colors.border?.default,
      borderRadius: borderRadius?.lg,
      boxShadow: elevation?.md,
      padding: componentSizing?.card?.padding || spacing[6],
      minHeight: '140px',
      cursor: kpi.onClick ? 'pointer' : 'default',
      transition: `all ${motion?.duration?.normal || '200ms'} ${motion?.easing?.ease || 'ease'}`,
    };

    return (
      <div
        key={kpi.id}
        className={`border hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${kpi.onClick ? 'cursor-pointer' : ''}`}
        style={cardStyles}
        onClick={kpi.onClick}
        role={kpi.onClick ? 'button' : undefined}
        tabIndex={kpi.onClick ? 0 : undefined}
        aria-label={kpi.ariaLabel || `${kpi.title}: ${kpi.value}`}
        onKeyDown={(e) => {
          if (kpi.onClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            kpi.onClick();
          }
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {kpi.icon && (
              <div
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: `${accentColor}15`,
                  color: accentColor,
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-hidden="true"
              >
                {kpi.icon}
              </div>
            )}
            <div>
              <h3
                className="font-medium"
                style={{
                  color: colors.text?.primary,
                  fontSize: typography.fontSize?.sm || '0.875rem',
                  lineHeight: typography.lineHeight?.tight || 1.25
                }}
              >
                {kpi.title}
              </h3>
            </div>
          </div>

          {kpi.trend && kpi.trendPercentage !== undefined && (
            <div className="flex items-center space-x-1">
              <div
                style={{
                  color: trendColor,
                  fontSize: typography.fontSize?.xs || '0.75rem',
                  transform: kpi.trend === 'up' ? 'rotate(0deg)' : kpi.trend === 'down' ? 'rotate(180deg)' : 'none'
                }}
                aria-hidden="true"
              >
                {kpi.trend !== 'neutral' && '▲'}
              </div>
              <span
                style={{
                  color: trendColor,
                  fontSize: typography.fontSize?.xs || '0.75rem',
                  fontWeight: 600
                }}
              >
                {kpi.trendPercentage}%
              </span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {kpi.isLoading ? (
            <div
              className="animate-pulse rounded"
              style={{
                height: '32px',
                backgroundColor: colors.background?.elevated,
                width: '60%'
              }}
            />
          ) : (
            <p
              className="font-bold"
              style={{
                color: colors.text?.primary,
                fontSize: typography.fontSize?.['2xl'] || '1.5rem',
                lineHeight: typography.lineHeight?.tight || 1.25
              }}
            >
              {kpi.value}
            </p>
          )}

          {kpi.previousValue !== undefined && (
            <p
              style={{
                color: colors.text?.muted,
                fontSize: typography.fontSize?.xs || '0.75rem'
              }}
            >
              Previous: {kpi.previousValue}
            </p>
          )}
        </div>
      </div>
    );
  }, [colors, spacing, typography, elevation, borderRadius, componentSizing, motion]);

  // Render Quick Action
  const renderQuickAction = useCallback((action: QuickAction) => {
    const buttonVariants = {
      primary: {
        backgroundColor: colors.primary?.[500] || '#3b82f6',
        color: 'white',
        borderColor: colors.primary?.[500] || '#3b82f6',
      },
      secondary: {
        backgroundColor: colors.background?.elevated,
        color: colors.text?.primary,
        borderColor: colors.border?.default,
      },
      outline: {
        backgroundColor: 'transparent',
        color: colors.primary?.[500] || '#3b82f6',
        borderColor: colors.primary?.[500] || '#3b82f6',
      },
    };

    const variant = action.variant || 'secondary';
    const buttonStyles = {
      ...buttonVariants[variant],
      borderRadius: borderRadius?.md,
      padding: `${spacing[2]} ${spacing[4]}`,
      minHeight: componentSizing?.button?.md || '44px',
      opacity: action.isDisabled ? 0.5 : 1,
      cursor: action.isDisabled ? 'not-allowed' : 'pointer',
      transition: `all ${motion?.duration?.fast || '150ms'} ${motion?.easing?.ease || 'ease'}`,
    };

    return (
      <button
        key={action.id}
        type="button"
        disabled={action.isDisabled}
        onClick={action.onClick}
        className="inline-flex items-center justify-center space-x-2 border font-medium hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        style={buttonStyles}
        aria-label={action.label}
      >
        {action.icon && (
          <span aria-hidden="true">
            {action.icon}
          </span>
        )}
        <span>{action.label}</span>
        {action.badge && (
          <span
            className="inline-flex items-center justify-center rounded-full text-xs font-medium"
            style={{
              minWidth: '18px',
              height: '18px',
              backgroundColor: colors.status?.error || '#ef4444',
              color: 'white',
              fontSize: typography.fontSize?.xs || '0.75rem'
            }}
            aria-label={`${action.badge} notifications`}
          >
            {action.badge}
          </span>
        )}
      </button>
    );
  }, [colors, borderRadius, spacing, componentSizing, motion, typography]);

  // Render Activity Item
  const renderActivityItem = useCallback((activity: ActivityItem) => {
    const typeColors = {
      info: colors.status?.info || '#3b82f6',
      success: colors.status?.success || '#10b981',
      warning: colors.status?.warning || '#f59e0b',
      error: colors.status?.error || '#ef4444',
    };

    const accentColor = activity.type ? typeColors[activity.type] : typeColors.info;

    return (
      <div
        key={activity.id}
        className={`flex space-x-3 p-3 rounded-lg ${!activity.isRead ? 'bg-opacity-50' : ''}`}
        style={{
          backgroundColor: !activity.isRead 
            ? `${accentColor}10` 
            : 'transparent',
          borderLeft: `3px solid ${accentColor}`,
          paddingLeft: spacing[3]
        }}
      >
        <div className="flex-shrink-0">
          {activity.avatar ? (
            <img
              src={activity.avatar}
              alt={`${activity.userName}'s avatar`}
              className="rounded-full object-cover"
              style={{ width: '32px', height: '32px' }}
            />
          ) : activity.icon ? (
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: `${accentColor}15`,
                color: accentColor
              }}
              aria-hidden="true"
            >
              {activity.icon}
            </div>
          ) : null}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className="font-medium"
            style={{
              color: colors.text?.primary,
              fontSize: typography.fontSize?.sm || '0.875rem'
            }}
          >
            {activity.title}
          </p>
          
          {activity.description && (
            <p
              className="mt-1"
              style={{
                color: colors.text?.secondary,
                fontSize: typography.fontSize?.xs || '0.75rem'
              }}
            >
              {activity.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-2">
            <p
              style={{
                color: colors.text?.muted,
                fontSize: typography.fontSize?.xs || '0.75rem'
              }}
            >
              {activity.timestamp}
            </p>
            {activity.userName && (
              <p
                style={{
                  color: colors.text?.muted,
                  fontSize: typography.fontSize?.xs || '0.75rem'
                }}
              >
                by {activity.userName}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }, [colors, spacing, typography]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Section */}
      <div
        className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
        style={{ padding: `${spacing[6]} 0` }}
      >
        <div>
          <h1
            className="font-bold"
            style={{
              color: colors.text?.primary,
              fontSize: typography.fontSize?.['3xl'] || '1.875rem',
              lineHeight: typography.lineHeight?.tight || 1.25
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="mt-1"
              style={{
                color: colors.text?.secondary,
                fontSize: typography.fontSize?.base || '1rem'
              }}
            >
              {subtitle}
            </p>
          )}
          {welcomeMessage && (
            <p
              className="mt-2"
              style={{
                color: colors.text?.muted,
                fontSize: typography.fontSize?.sm || '0.875rem'
              }}
            >
              {welcomeMessage}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 border rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{
                backgroundColor: colors.background?.paper,
                borderColor: colors.border?.default,
                color: colors.text?.primary,
                minHeight: componentSizing?.button?.md || '44px'
              }}
              aria-label="Refresh dashboard"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600" />
              ) : (
                <span>⟳</span>
              )}
              <span className="ml-2">Refresh</span>
            </button>
          )}

          {quickActions.map(renderQuickAction)}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div
          className="p-4 rounded-lg border-l-4"
          style={{
            backgroundColor: `${colors.status?.error || '#ef4444'}10`,
            borderColor: colors.status?.error || '#ef4444',
            color: colors.status?.error || '#ef4444'
          }}
          role="alert"
        >
          <p className="font-medium">Error</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kpiCards.map(renderKPICard)}
      </div>

      {/* Chart Section */}
      {chartComponent && (
        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: colors.background?.paper,
            borderColor: colors.border?.default,
            borderRadius: borderRadius?.lg,
            boxShadow: elevation?.sm
          }}
        >
          {chartComponent}
        </div>
      )}

      {/* Activity Feed */}
      {activityItems.length > 0 && (
        <div
          className="border rounded-lg"
          style={{
            backgroundColor: colors.background?.paper,
            borderColor: colors.border?.default,
            borderRadius: borderRadius?.lg,
            boxShadow: elevation?.sm
          }}
        >
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: colors.border?.muted }}
          >
            <h2
              className="font-semibold"
              style={{
                color: colors.text?.primary,
                fontSize: typography.fontSize?.lg || '1.125rem'
              }}
            >
              Recent Activity
            </h2>
            <button
              type="button"
              onClick={handleActivityToggle}
              className="text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ color: colors.primary?.[500] || '#3b82f6' }}
              aria-expanded={expandedActivity}
            >
              {expandedActivity ? 'Show Less' : 'Show All'}
            </button>
          </div>

          <div className="divide-y" style={{ borderColor: colors.border?.muted }}>
            {(expandedActivity ? activityItems : activityItems.slice(0, 5)).map(renderActivityItem)}
          </div>
        </div>
      )}

      {/* Custom Sections */}
      {customSections.map((section, index) => (
        <div key={index}>{section}</div>
      ))}
    </div>
  );
};

export default Dashboard;

// Legacy exports for backward compatibility
export { Dashboard as EnhancedDashboard };
export type { DashboardProps as EnhancedDashboardProps };