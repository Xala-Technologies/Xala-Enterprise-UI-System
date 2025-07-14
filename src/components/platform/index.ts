/**
 * @fileoverview Platform Component Index
 * @module Platform
 */

// Platform components
export { DesktopSidebar } from './desktop/DesktopSidebar';
export { BottomNavigation } from './mobile/BottomNavigation';
export { MobileHeader } from './mobile/MobileHeader';

// Platform utility types
export type {
    HoverFriendlyProps, PlatformComponentProps, PlatformDetection,
    PlatformTypes, ResponsiveBreakpoints, TouchFriendlyProps
} from '../../types/platform.types';

