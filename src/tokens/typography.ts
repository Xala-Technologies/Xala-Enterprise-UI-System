// Typography tokens for @xala-mock/ui-system
// Norwegian-optimized typography for æ, ø, å characters

export const typography = {
  fontFamily: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px', // Base Norwegian reading size
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '96px',
    '9xl': '128px',
  },

  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500', // Recommended for Norwegian text
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5', // Optimal for Norwegian readability
    relaxed: '1.625',
    loose: '2',
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em', // Best for æ, ø, å
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// CSS custom properties for typography tokens
export const typographyTokens = {
  // Font families
  '--font-family-sans': typography.fontFamily.sans.join(', '),
  '--font-family-serif': typography.fontFamily.serif.join(', '),
  '--font-family-mono': typography.fontFamily.mono.join(', '),

  // Font sizes
  '--font-size-xs': typography.fontSize.xs,
  '--font-size-sm': typography.fontSize.sm,
  '--font-size-base': typography.fontSize.base,
  '--font-size-lg': typography.fontSize.lg,
  '--font-size-xl': typography.fontSize.xl,
  '--font-size-2xl': typography.fontSize['2xl'],
  '--font-size-3xl': typography.fontSize['3xl'],
  '--font-size-4xl': typography.fontSize['4xl'],
  '--font-size-5xl': typography.fontSize['5xl'],
  '--font-size-6xl': typography.fontSize['6xl'],
  '--font-size-7xl': typography.fontSize['7xl'],
  '--font-size-8xl': typography.fontSize['8xl'],
  '--font-size-9xl': typography.fontSize['9xl'],

  // Font weights
  '--font-weight-thin': typography.fontWeight.thin,
  '--font-weight-extralight': typography.fontWeight.extralight,
  '--font-weight-light': typography.fontWeight.light,
  '--font-weight-normal': typography.fontWeight.normal,
  '--font-weight-medium': typography.fontWeight.medium,
  '--font-weight-semibold': typography.fontWeight.semibold,
  '--font-weight-bold': typography.fontWeight.bold,
  '--font-weight-extrabold': typography.fontWeight.extrabold,
  '--font-weight-black': typography.fontWeight.black,

  // Line heights
  '--line-height-none': typography.lineHeight.none,
  '--line-height-tight': typography.lineHeight.tight,
  '--line-height-snug': typography.lineHeight.snug,
  '--line-height-normal': typography.lineHeight.normal,
  '--line-height-relaxed': typography.lineHeight.relaxed,
  '--line-height-loose': typography.lineHeight.loose,

  // Letter spacing
  '--letter-spacing-tighter': typography.letterSpacing.tighter,
  '--letter-spacing-tight': typography.letterSpacing.tight,
  '--letter-spacing-normal': typography.letterSpacing.normal,
  '--letter-spacing-wide': typography.letterSpacing.wide,
  '--letter-spacing-wider': typography.letterSpacing.wider,
  '--letter-spacing-widest': typography.letterSpacing.widest,
};

// Norwegian typography enhancements
export const norwegianTypography = {
  // Official government typography settings
  official: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base, // 16px for readability
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal, // 1.5 for Norwegian text
    letterSpacing: typography.letterSpacing.normal, // Optimal for æ, ø, å
  },

  // Municipality branding typography
  municipal: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium, // Slightly bolder for municipal
    lineHeight: typography.lineHeight.relaxed, // More relaxed for public reading
    letterSpacing: typography.letterSpacing.normal,
  },

  // Accessibility-enhanced typography
  accessible: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.lg, // Larger for accessibility
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.relaxed, // Better readability
    letterSpacing: typography.letterSpacing.wide, // Better character separation
  },

  // Special Norwegian character handling
  norwegianChars: {
    // Optimized spacing for æ, ø, å in headings
    headingSpacing: typography.letterSpacing.tight,

    // Body text spacing for Norwegian readability
    bodySpacing: typography.letterSpacing.normal,

    // Line height adjustments for Norwegian text density
    norwegianLineHeight: '1.6', // Slightly more than normal for Norwegian

    // Font weight for Norwegian compliance documents
    complianceWeight: typography.fontWeight.medium,
  },
};

// Typography scales for different contexts
export const typographyScales = {
  // Government forms scale
  government: {
    heading1: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.bold },
    heading2: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.semibold },
    heading3: { fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.medium },
    body: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.normal },
    caption: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.normal },
  },

  // Municipal website scale
  municipal: {
    heading1: { fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.bold },
    heading2: { fontSize: typography.fontSize['2xl'], fontWeight: typography.fontWeight.semibold },
    heading3: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.medium },
    body: { fontSize: typography.fontSize.base, fontWeight: typography.fontWeight.normal },
    caption: { fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.normal },
  },
};
