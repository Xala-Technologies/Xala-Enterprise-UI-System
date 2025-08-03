/**
 * @fileoverview Authentication Layout System v5.0.0 - Enterprise Auth Layouts
 * @description Comprehensive authentication layouts for login, register, forgot password, and verification flows
 * @version 5.0.0
 * @compliance WCAG 2.2 AAA, Enterprise Standards, SSR-Safe, Norwegian Compliance
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils/cn';
import { useTokens } from '../../hooks/useTokens';

// =============================================================================
// AUTH LAYOUT VARIANTS
// =============================================================================

const authLayoutVariants = cva(
  [
    'min-h-screen w-full',
    'flex items-center justify-center',
    'bg-background text-foreground',
    'transition-all duration-300 ease-in-out',
    'motion-reduce:transition-none',
  ],
  {
    variants: {
      variant: {
        centered: 'p-4',
        split: 'grid grid-cols-1 lg:grid-cols-2 p-0',
        fullscreen: 'p-0',
        floating: 'p-4 bg-gradient-to-br from-primary/5 to-secondary/5',
        minimal: 'p-4 bg-background',
      },
      maxWidth: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
      },
    },
    defaultVariants: {
      variant: 'centered',
      maxWidth: 'md',
    },
  }
);

const authCardVariants = cva(
  [
    'w-full',
    'bg-card text-card-foreground',
    'border border-border',
    'transition-all duration-200 ease-in-out',
  ],
  {
    variants: {
      variant: {
        default: 'rounded-lg shadow-sm',
        elevated: 'rounded-xl shadow-lg',
        floating: 'rounded-2xl shadow-xl backdrop-blur-sm bg-card/95',
        minimal: 'rounded-lg shadow-none border-0 bg-transparent',
        glass: 'rounded-xl shadow-2xl backdrop-blur-md bg-card/80 border-border/50',
      },
      padding: {
        sm: 'p-6',
        md: 'p-8',
        lg: 'p-10',
        xl: 'p-12',
      },
      width: {
        full: 'w-full',
        auto: 'w-auto min-w-[400px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
      width: 'full',
    },
  }
);

const authHeaderVariants = cva(
  [
    'text-center',
    'mb-8',
  ],
  {
    variants: {
      spacing: {
        sm: 'mb-6',
        md: 'mb-8',
        lg: 'mb-10',
      },
      alignment: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      spacing: 'md',
      alignment: 'center',
    },
  }
);

const authSplitPanelVariants = cva(
  [
    'flex items-center justify-center',
    'p-8 lg:p-12',
  ],
  {
    variants: {
      side: {
        left: 'order-first',
        right: 'order-last',
      },
      background: {
        default: 'bg-background',
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        gradient: 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground',
        image: 'bg-cover bg-center relative',
      },
    },
    defaultVariants: {
      side: 'right',
      background: 'primary',
    },
  }
);

const authFooterVariants = cva(
  [
    'text-center',
    'text-sm text-muted-foreground',
    'mt-8',
  ],
  {
    variants: {
      variant: {
        default: 'border-t border-border pt-6',
        minimal: 'border-t-0 pt-4',
        separated: 'border-t-2 border-border/50 pt-8',
      },
      spacing: {
        sm: 'mt-6',
        md: 'mt-8',
        lg: 'mt-10',
      },
    },
    defaultVariants: {
      variant: 'minimal',
      spacing: 'md',
    },
  }
);

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface AuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly variant?: 'centered' | 'split' | 'fullscreen' | 'floating' | 'minimal';
  readonly maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  readonly backgroundImage?: string;
  readonly 'aria-label'?: string;
}

export interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly variant?: 'default' | 'elevated' | 'floating' | 'minimal' | 'glass';
  readonly padding?: 'sm' | 'md' | 'lg' | 'xl';
  readonly width?: 'full' | 'auto';
  readonly loading?: boolean;
}

export interface AuthHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
  readonly title?: string;
  readonly subtitle?: string;
  readonly description?: string;
  readonly logo?: ReactNode;
  readonly spacing?: 'sm' | 'md' | 'lg';
  readonly alignment?: 'left' | 'center' | 'right';
}

export interface AuthSplitPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly side?: 'left' | 'right';
  readonly background?: 'default' | 'primary' | 'secondary' | 'gradient' | 'image';
  readonly backgroundImage?: string;
  readonly overlay?: boolean;
}

export interface AuthFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
  readonly variant?: 'default' | 'minimal' | 'separated';
  readonly spacing?: 'sm' | 'md' | 'lg';
  readonly links?: readonly AuthFooterLink[];
  readonly copyright?: string;
}

export interface AuthFooterLink {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface LoginLayoutProps extends Omit<AuthLayoutProps, 'children'> {
  readonly children: ReactNode;
  readonly showSocialLogin?: boolean;
  readonly showRememberMe?: boolean;
  readonly forgotPasswordHref?: string;
  readonly signUpHref?: string;
}

export interface RegisterLayoutProps extends Omit<AuthLayoutProps, 'children'> {
  readonly children: ReactNode;
  readonly showSocialSignup?: boolean;
  readonly signInHref?: string;
  readonly termsHref?: string;
  readonly privacyHref?: string;
}

export interface ForgotPasswordLayoutProps extends Omit<AuthLayoutProps, 'children'> {
  readonly children: ReactNode;
  readonly backToLoginHref?: string;
}

export interface EmailVerificationLayoutProps extends Omit<AuthLayoutProps, 'children'> {
  readonly children: ReactNode;
  readonly email?: string;
  readonly resendAction?: () => void;
  readonly changeEmailAction?: () => void;
}

// =============================================================================
// AUTH HEADER COMPONENT
// =============================================================================

export const AuthHeader = forwardRef<HTMLDivElement, AuthHeaderProps>(
  (
    {
      children,
      title,
      subtitle,
      description,
      logo,
      spacing = 'md',
      alignment = 'center',
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <div
        ref={ref}
        className={cn(authHeaderVariants({ spacing, alignment }), className)}
        {...props}
      >
        {logo && (
          <div className="mb-6 flex justify-center">
            {logo}
          </div>
        )}

        {title && (
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
        )}

        {subtitle && (
          <h2 className="text-lg font-medium text-muted-foreground mt-2">
            {subtitle}
          </h2>
        )}

        {description && (
          <p className="text-sm text-muted-foreground mt-3 max-w-sm mx-auto leading-relaxed">
            {description}
          </p>
        )}

        {children}
      </div>
    );
  }
);

AuthHeader.displayName = 'AuthHeader';

// =============================================================================
// AUTH SPLIT PANEL COMPONENT
// =============================================================================

export const AuthSplitPanel = forwardRef<HTMLDivElement, AuthSplitPanelProps>(
  (
    {
      children,
      side = 'right',
      background = 'primary',
      backgroundImage,
      overlay = false,
      className,
      style,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const panelStyles: React.CSSProperties = {
      ...style,
      ...(background === 'image' && backgroundImage && {
        backgroundImage: `url(${backgroundImage})`,
      }),
    };

    return (
      <div
        ref={ref}
        className={cn(authSplitPanelVariants({ side, background }), className)}
        style={panelStyles}
        {...props}
      >
        {background === 'image' && overlay && (
          <div className="absolute inset-0 bg-black/40" />
        )}
        
        <div className="relative z-10 max-w-md mx-auto text-center space-y-6">
          {children}
        </div>
      </div>
    );
  }
);

AuthSplitPanel.displayName = 'AuthSplitPanel';

// =============================================================================
// AUTH FOOTER COMPONENT
// =============================================================================

export const AuthFooter = forwardRef<HTMLDivElement, AuthFooterProps>(
  (
    {
      children,
      variant = 'minimal',
      spacing = 'md',
      links,
      copyright,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <footer
        ref={ref}
        className={cn(authFooterVariants({ variant, spacing }), className)}
        {...props}
      >
        {children}

        {links && links.length > 0 && (
          <div className="flex justify-center space-x-4 mb-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {copyright && (
          <p className="text-xs">
            {copyright}
          </p>
        )}
      </footer>
    );
  }
);

AuthFooter.displayName = 'AuthFooter';

// =============================================================================
// AUTH CARD COMPONENT
// =============================================================================

export const AuthCard = forwardRef<HTMLDivElement, AuthCardProps>(
  (
    {
      children,
      variant = 'default',
      padding = 'lg',
      width = 'full',
      loading = false,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors, borderRadius } = useTokens();

    const cardStyles: React.CSSProperties = {
      backgroundColor: variant !== 'minimal' ? colors.background?.paper || colors.background?.default : 'transparent',
      borderColor: colors.border?.default,
    };

    return (
      <div
        ref={ref}
        className={cn(
          authCardVariants({ variant, padding, width }),
          loading && 'relative overflow-hidden',
          className
        )}
        style={cardStyles}
        {...props}
      >
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {children}
      </div>
    );
  }
);

AuthCard.displayName = 'AuthCard';

// =============================================================================
// LOGIN LAYOUT COMPONENT
// =============================================================================

export const LoginLayout = forwardRef<HTMLDivElement, LoginLayoutProps>(
  (
    {
      children,
      variant = 'centered',
      maxWidth = 'md',
      showSocialLogin = false,
      showRememberMe = true,
      forgotPasswordHref,
      signUpHref,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <AuthLayout
        ref={ref}
        variant={variant}
        maxWidth={maxWidth}
        className={className}
        aria-label="Login page"
        {...props}
      >
        <AuthCard variant="elevated" padding="lg">
          <AuthHeader
            title="Welcome back"
            subtitle="Sign in to your account"
          />

          {children}

          {(forgotPasswordHref || signUpHref) && (
            <AuthFooter variant="minimal">
              <div className="space-y-2">
                {forgotPasswordHref && (
                  <div>
                    <a
                      href={forgotPasswordHref}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot your password?
                    </a>
                  </div>
                )}
                {signUpHref && (
                  <div>
                    Don't have an account?{' '}
                    <a
                      href={signUpHref}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Sign up
                    </a>
                  </div>
                )}
              </div>
            </AuthFooter>
          )}
        </AuthCard>
      </AuthLayout>
    );
  }
);

LoginLayout.displayName = 'LoginLayout';

// =============================================================================
// REGISTER LAYOUT COMPONENT
// =============================================================================

export const RegisterLayout = forwardRef<HTMLDivElement, RegisterLayoutProps>(
  (
    {
      children,
      variant = 'centered',
      maxWidth = 'lg',
      showSocialSignup = false,
      signInHref,
      termsHref,
      privacyHref,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <AuthLayout
        ref={ref}
        variant={variant}
        maxWidth={maxWidth}
        className={className}
        aria-label="Registration page"
        {...props}
      >
        <AuthCard variant="elevated" padding="lg">
          <AuthHeader
            title="Create your account"
            subtitle="Join us today"
            description="Fill in your information to get started"
          />

          {children}

          <AuthFooter variant="minimal">
            <div className="space-y-2">
              {(termsHref || privacyHref) && (
                <p className="text-xs">
                  By creating an account, you agree to our{' '}
                  {termsHref && (
                    <>
                      <a href={termsHref} className="text-primary hover:text-primary/80 transition-colors">
                        Terms of Service
                      </a>
                      {privacyHref && ' and '}
                    </>
                  )}
                  {privacyHref && (
                    <a href={privacyHref} className="text-primary hover:text-primary/80 transition-colors">
                      Privacy Policy
                    </a>
                  )}
                </p>
              )}
              {signInHref && (
                <div>
                  Already have an account?{' '}
                  <a
                    href={signInHref}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Sign in
                  </a>
                </div>
              )}
            </div>
          </AuthFooter>
        </AuthCard>
      </AuthLayout>
    );
  }
);

RegisterLayout.displayName = 'RegisterLayout';

// =============================================================================
// FORGOT PASSWORD LAYOUT COMPONENT
// =============================================================================

export const ForgotPasswordLayout = forwardRef<HTMLDivElement, ForgotPasswordLayoutProps>(
  (
    {
      children,
      variant = 'centered',
      maxWidth = 'md',
      backToLoginHref,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <AuthLayout
        ref={ref}
        variant={variant}
        maxWidth={maxWidth}
        className={className}
        aria-label="Forgot password page"
        {...props}
      >
        <AuthCard variant="elevated" padding="lg">
          <AuthHeader
            title="Forgot password?"
            subtitle="Reset your password"
            description="Enter your email address and we'll send you a link to reset your password"
          />

          {children}

          {backToLoginHref && (
            <AuthFooter variant="minimal">
              <a
                href={backToLoginHref}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                ← Back to login
              </a>
            </AuthFooter>
          )}
        </AuthCard>
      </AuthLayout>
    );
  }
);

ForgotPasswordLayout.displayName = 'ForgotPasswordLayout';

// =============================================================================
// EMAIL VERIFICATION LAYOUT COMPONENT
// =============================================================================

export const EmailVerificationLayout = forwardRef<HTMLDivElement, EmailVerificationLayoutProps>(
  (
    {
      children,
      variant = 'centered',
      maxWidth = 'md',
      email,
      resendAction,
      changeEmailAction,
      className,
      ...props
    },
    ref
  ): React.ReactElement => {
    return (
      <AuthLayout
        ref={ref}
        variant={variant}
        maxWidth={maxWidth}
        className={className}
        aria-label="Email verification page"
        {...props}
      >
        <AuthCard variant="elevated" padding="lg">
          <AuthHeader
            title="Check your email"
            subtitle="Verify your email address"
            description={
              email 
                ? `We've sent a verification link to ${email}`
                : "We've sent a verification link to your email address"
            }
          />

          {children}

          <AuthFooter variant="minimal">
            <div className="space-y-2">
              {resendAction && (
                <div>
                  Didn't receive the email?{' '}
                  <button
                    onClick={resendAction}
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Resend
                  </button>
                </div>
              )}
              {changeEmailAction && (
                <div>
                  <button
                    onClick={changeEmailAction}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Change email address
                  </button>
                </div>
              )}
            </div>
          </AuthFooter>
        </AuthCard>
      </AuthLayout>
    );
  }
);

EmailVerificationLayout.displayName = 'EmailVerificationLayout';

// =============================================================================
// MAIN AUTH LAYOUT COMPONENT
// =============================================================================

export const AuthLayout = forwardRef<HTMLDivElement, AuthLayoutProps>(
  (
    {
      children,
      variant = 'centered',
      maxWidth = 'md',
      backgroundImage,
      className,
      style,
      'aria-label': ariaLabel = 'Authentication',
      ...props
    },
    ref
  ): React.ReactElement => {
    const { colors } = useTokens();

    const layoutStyles: React.CSSProperties = {
      backgroundColor: colors.background?.default,
      color: colors.text?.primary,
      ...(backgroundImage && {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }),
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(authLayoutVariants({ variant, maxWidth }), className)}
        style={layoutStyles}
        role="main"
        aria-label={ariaLabel}
        {...props}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/20" />
        )}
        
        <div className="relative z-10 w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    );
  }
);

AuthLayout.displayName = 'AuthLayout';

// =============================================================================
// COMPOUND COMPONENT ATTACHMENTS
// =============================================================================

AuthLayout.Card = AuthCard;
AuthLayout.Header = AuthHeader;
AuthLayout.SplitPanel = AuthSplitPanel;
AuthLayout.Footer = AuthFooter;
AuthLayout.Login = LoginLayout;
AuthLayout.Register = RegisterLayout;
AuthLayout.ForgotPassword = ForgotPasswordLayout;
AuthLayout.EmailVerification = EmailVerificationLayout;

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type AuthLayoutVariant = VariantProps<typeof authLayoutVariants>;
export type AuthCardVariant = VariantProps<typeof authCardVariants>;
export type AuthHeaderVariant = VariantProps<typeof authHeaderVariants>;
export type AuthSplitPanelVariant = VariantProps<typeof authSplitPanelVariants>;
export type AuthFooterVariant = VariantProps<typeof authFooterVariants>;

export { 
  authLayoutVariants, 
  authCardVariants, 
  authHeaderVariants, 
  authSplitPanelVariants,
  authFooterVariants,
};