// Spacing tokens for @xala-mock/ui-system
// Norwegian-compliant spacing following 8px grid system

export const spacing = {
  px: '1px',
  0: '0px',
  0.5: '2px',
  1: '4px',
  1.5: '6px',
  2: '8px', // Base unit
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px', // Common spacing
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px', // Norwegian touch target minimum
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',
};

// CSS custom properties for spacing tokens
export const spacingTokens = {
  '--spacing-px': spacing.px,
  '--spacing-0': spacing[0],
  '--spacing-0-5': spacing[0.5],
  '--spacing-1': spacing[1],
  '--spacing-1-5': spacing[1.5],
  '--spacing-2': spacing[2],
  '--spacing-2-5': spacing[2.5],
  '--spacing-3': spacing[3],
  '--spacing-3-5': spacing[3.5],
  '--spacing-4': spacing[4],
  '--spacing-5': spacing[5],
  '--spacing-6': spacing[6],
  '--spacing-7': spacing[7],
  '--spacing-8': spacing[8],
  '--spacing-9': spacing[9],
  '--spacing-10': spacing[10],
  '--spacing-11': spacing[11], // Norwegian touch target minimum
  '--spacing-12': spacing[12],
  '--spacing-14': spacing[14],
  '--spacing-16': spacing[16],
  '--spacing-20': spacing[20],
  '--spacing-24': spacing[24],
  '--spacing-28': spacing[28],
  '--spacing-32': spacing[32],
  '--spacing-36': spacing[36],
  '--spacing-40': spacing[40],
  '--spacing-44': spacing[44],
  '--spacing-48': spacing[48],
  '--spacing-52': spacing[52],
  '--spacing-56': spacing[56],
  '--spacing-60': spacing[60],
  '--spacing-64': spacing[64],
  '--spacing-72': spacing[72],
  '--spacing-80': spacing[80],
  '--spacing-96': spacing[96],
};

// Norwegian-specific spacing recommendations
export const norwegianSpacing = {
  // Touch targets (Norwegian accessibility standard)
  touchMinimum: spacing[11], // 44px minimum
  touchComfortable: spacing[12], // 48px comfortable

  // Form elements
  formSpacing: spacing[4], // 16px between form elements
  formPadding: spacing[3], // 12px inside form elements

  // Content sections
  sectionPadding: spacing[6], // 24px section padding
  sectionMargin: spacing[8], // 32px between sections

  // Municipality branding
  logoMargin: spacing[4], // 16px around logos
  headerPadding: spacing[6], // 24px header padding

  // Accessibility focus
  focusOffset: spacing[1], // 4px focus ring offset
  focusWidth: spacing[0.5], // 2px focus ring width
};
