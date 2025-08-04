/**
 * Layout components index
 * Exports all layout components with design tokens and CSS variables
 */

// Container components
export { Container } from './Container';
export type { ContainerProps } from './Container';

// Stack components
export { HStack, Stack, VStack } from './Stack';
export type { StackProps } from './Stack';

// Grid components
export { Grid, GridItem } from './Grid';
export type {
    GridCols,
    GridGap,
    GridItemProps,
    GridItemSpan,
    GridItemStart,
    GridProps
} from './Grid';

// Legacy components (maintained for backward compatibility)
export { Card } from './Card';
export { PageLayout } from './PageLayout';
export { Section } from './Section';

// Enhanced layout components - commented out until implemented
// export { EnhancedDashboard } from './EnhancedDashboard';
// export type { 
//   EnhancedDashboardProps,
//   DashboardKPI,
//   DashboardAction,
//   DashboardActivityItem,
//   DashboardVariant
// } from './EnhancedDashboard';

// Dashboard component
export { Dashboard } from './Dashboard';
export type { 
  DashboardProps,
  KPICardData,
  QuickAction,
  ActivityItem
} from './Dashboard';

