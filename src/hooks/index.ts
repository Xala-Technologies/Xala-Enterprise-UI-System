/**
 * @fileoverview Xala UI System v5.0.0 Hooks
 * @description Centralized exports for all UI system hooks
 * @version 5.0.0
 */

// Core provider hooks
export { useUi, useTokens, useTheme, usePlatform, useLayout, useWhiteLabel, useSSR } from '../providers/UiProvider/UiProvider';

// Custom hooks
export { useComponent, useComponentVariant } from './useComponent';
export { useMediaQuery, useResponsive, useBreakpoint } from './useMediaQuery';
export { useDebounce, useDebouncedCallback, useThrottle, useLoadingTimeout } from './useDebounce';
export { useThemeTransition, themeTransitionPresets } from './useThemeTransition';
