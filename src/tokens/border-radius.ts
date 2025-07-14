// Border radius tokens for @xala-mock/ui-system
// Norwegian-compliant rounded corners with accessibility focus

export const borderRadius = {
  none: '0px',
  sm: '2px', // Subtle rounding
  base: '4px', // Standard rounding
  md: '6px', // Medium rounding
  lg: '8px', // Large rounding
  xl: '12px', // Extra large rounding
  '2xl': '16px', // 2X large rounding
  '3xl': '24px', // 3X large rounding
  full: '9999px', // Full rounding (pills, circles)
};

// CSS custom properties for border radius tokens
export const borderRadiusTokens = {
  '--border-radius-none': borderRadius.none,
  '--border-radius-sm': borderRadius.sm,
  '--border-radius-base': borderRadius.base,
  '--border-radius-md': borderRadius.md,
  '--border-radius-lg': borderRadius.lg,
  '--border-radius-xl': borderRadius.xl,
  '--border-radius-2xl': borderRadius['2xl'],
  '--border-radius-3xl': borderRadius['3xl'],
  '--border-radius-full': borderRadius.full,
};

// Norwegian-specific border radius recommendations
export const norwegianBorderRadius = {
  // Government forms and official documents
  official: borderRadius.sm,

  // Municipality branding (slightly more rounded)
  municipal: borderRadius.base,

  // Modern web interfaces
  modern: borderRadius.md,

  // Mobile-friendly touch targets
  mobile: borderRadius.lg,

  // Accessibility-focused (larger touch areas)
  accessible: borderRadius.xl,
};
