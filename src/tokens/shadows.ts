// Shadow tokens for @xala-mock/ui-system
// Norwegian-compliant shadows with WCAG accessibility considerations

export const shadows = {
  // No shadow
  none: 'none',

  // Subtle shadows (Norwegian government preference)
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',

  // Inner shadows for inputs and depressed states
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',

  // Focus shadows (accessibility requirement)
  focus: '0 0 0 3px rgba(59, 130, 246, 0.15)', // Primary blue with transparency
  focusError: '0 0 0 3px rgba(239, 68, 68, 0.15)', // Error red with transparency
  focusSuccess: '0 0 0 3px rgba(34, 197, 94, 0.15)', // Success green with transparency
};

// CSS custom properties for shadow tokens
export const shadowTokens = {
  '--shadow-none': shadows.none,
  '--shadow-sm': shadows.sm,
  '--shadow-base': shadows.base,
  '--shadow-md': shadows.md,
  '--shadow-lg': shadows.lg,
  '--shadow-xl': shadows.xl,
  '--shadow-2xl': shadows['2xl'],
  '--shadow-inner': shadows.inner,
  '--shadow-focus': shadows.focus,
  '--shadow-focus-error': shadows.focusError,
  '--shadow-focus-success': shadows.focusSuccess,
};

// Norwegian-specific shadow recommendations
export const norwegianShadows = {
  // Government forms (minimal shadows)
  official: shadows.sm,

  // Municipality cards and sections
  municipal: shadows.base,

  // Modal dialogs and overlays
  modal: shadows.xl,

  // Dropdown menus and popovers
  dropdown: shadows.lg,

  // Floating action buttons
  fab: shadows.md,

  // Focus states (accessibility requirement)
  focus: shadows.focus,

  // Input field focus
  inputFocus: shadows.focus,

  // Error state focus
  errorFocus: shadows.focusError,

  // Success state focus
  successFocus: shadows.focusSuccess,
};

// Light/Dark mode shadow variants
export const lightModeShadows = {
  ...shadows,
  // Lighter shadows for light backgrounds
  card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  hover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
};

export const darkModeShadows = {
  ...shadows,
  // More pronounced shadows for dark backgrounds
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  hover: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
};
