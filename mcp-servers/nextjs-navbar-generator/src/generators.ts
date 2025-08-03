/**
 * Code Generators for Different Navbar Types
 */

import type { NavbarConfig, GeneratedNavbar, NavigationItem } from './types.js';
import { ICON_MAPPINGS } from './templates.js';

export class NavbarGenerator {
  
  generateNavbar(config: NavbarConfig): GeneratedNavbar {
    switch (config.type) {
      case 'saas':
        return this.generateSaaSNavbar(config);
      case 'admin':
        return this.generateAdminNavbar(config);
      case 'marketing':
        return this.generateMarketingNavbar(config);
      case 'adaptive':
        return this.generateAdaptiveNavbar(config);
      default:
        throw new Error(`Unknown navbar type: ${config.type}`);
    }
  }

  private generateSaaSNavbar(config: NavbarConfig): GeneratedNavbar {
    const imports = this.generateImports(config);
    const componentCode = this.generateSaaSComponent(config);
    const typesCode = this.generateTypes(config);
    const localizationKeys = this.generateLocalizationKeys(config);
    const dependencies = this.generateDependencies(config);

    return {
      componentCode,
      typesCode,
      localizationKeys,
      imports,
      dependencies
    };
  }

  private generateAdminNavbar(config: NavbarConfig): GeneratedNavbar {
    const imports = this.generateImports(config);
    const componentCode = this.generateAdminComponent(config);
    const typesCode = this.generateTypes(config);
    const localizationKeys = this.generateLocalizationKeys(config);
    const dependencies = this.generateDependencies(config);

    return {
      componentCode,
      typesCode,
      localizationKeys,
      imports,
      dependencies
    };
  }

  private generateMarketingNavbar(config: NavbarConfig): GeneratedNavbar {
    const imports = this.generateImports(config);
    const componentCode = this.generateMarketingComponent(config);
    const typesCode = this.generateTypes(config);
    const localizationKeys = this.generateLocalizationKeys(config);
    const dependencies = this.generateDependencies(config);

    return {
      componentCode,
      typesCode,
      localizationKeys,
      imports,
      dependencies
    };
  }

  private generateAdaptiveNavbar(config: NavbarConfig): GeneratedNavbar {
    const imports = this.generateImports(config);
    const componentCode = this.generateAdaptiveComponent(config);
    const typesCode = this.generateTypes(config);
    const localizationKeys = this.generateLocalizationKeys(config);
    const dependencies = this.generateDependencies(config);

    return {
      componentCode,
      typesCode,
      localizationKeys,
      imports,
      dependencies
    };
  }

  private generateImports(config: NavbarConfig): string[] {
    const baseImports = [
      'Container',
      'Stack',
      'Typography',
      'Button',
      'useTokens'
    ];

    const conditionalImports: string[] = [];

    if (config.type === 'saas') {
      conditionalImports.push('WebNavbar');
    } else if (config.type === 'admin') {
      conditionalImports.push('AdminTopBar');
    } else if (config.type === 'marketing') {
      conditionalImports.push('WebNavbar');
    } else if (config.type === 'adaptive') {
      conditionalImports.push('WebNavbar', 'Drawer');
    }

    if (config.features.search) {
      conditionalImports.push('GlobalSearch');
    }

    if (config.features.userMenu) {
      conditionalImports.push('Avatar', 'ContextMenu', 'ContextMenuContent', 'ContextMenuItem', 'ContextMenuTrigger');
    }

    if (config.features.notifications) {
      conditionalImports.push('Badge');
    }

    if (config.features.mobileResponsive) {
      conditionalImports.push('IconButton');
    }

    return [...baseImports, ...conditionalImports];
  }

  private generateSaaSComponent(config: NavbarConfig): string {
    const componentName = this.toPascalCase(config.name);
    const propsInterface = `${componentName}Props`;
    
    return `// components/navigation/${componentName}.tsx
import {
  ${this.generateImports(config).join(',\n  ')}
} from '@xala-technologies/ui-system';
${config.features.themeSwitcher ? "import { CompactThemeSwitcher } from '@xala-technologies/ui-system/components/ThemeManager';" : ''}
import { ${this.getRequiredIcons(config).join(', ')} } from 'lucide-react';
import { useTranslation } from 'react-i18next';
${config.features.mobileResponsive ? "import { useResponsive } from '@/hooks/useResponsive';" : ''}

export interface ${propsInterface} {
  readonly locale: string;${config.features.userMenu ? `
  readonly userAvatar?: string;
  readonly userName?: string;` : ''}${config.features.notifications ? `
  readonly notificationCount?: number;` : ''}
}

export function ${componentName}({
  locale,${config.features.userMenu ? `
  userAvatar,
  userName,` : ''}${config.features.notifications ? `
  notificationCount = 0` : ''}
}: ${propsInterface}): JSX.Element {
  const { t } = useTranslation();
  const { colors, spacing } = useTokens();${config.features.mobileResponsive ? `
  const { isMobile } = useResponsive();` : ''}

${this.generateEventHandlers(config)}

  return (
    <WebNavbar
      ${this.generateNavbarProps(config)}
      variant="${config.styling.variant}"
      ${config.styling.sticky ? 'sticky' : ''}
    />
  );
}`;
  }

  private generateAdminComponent(config: NavbarConfig): string {
    const componentName = this.toPascalCase(config.name);
    const propsInterface = `${componentName}Props`;
    
    return `// components/navigation/${componentName}.tsx
import {
  ${this.generateImports(config).join(',\n  ')}
} from '@xala-technologies/ui-system';
${config.features.themeSwitcher ? "import { CompactThemeSwitcher } from '@xala-technologies/ui-system/components/ThemeManager';" : ''}
import { ${this.getRequiredIcons(config).join(', ')} } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';

export interface ${propsInterface} {${config.features.breadcrumbs ? `
  readonly title?: string;
  readonly breadcrumbs?: Array<{
    readonly label: string;
    readonly href?: string;
  }>;` : ''}${config.features.userMenu ? `
  readonly userAvatar?: string;
  readonly userName?: string;` : ''}
}

export function ${componentName}({${config.features.breadcrumbs ? `
  title,
  breadcrumbs = [],` : ''}${config.features.userMenu ? `
  userAvatar,
  userName` : ''}
}: ${propsInterface}): JSX.Element {
  const { t } = useTranslation();
  const { colors, spacing } = useTokens();
  const pathname = usePathname();

  const navigationItems = ${JSON.stringify(config.navigation.items, null, 4)};

${this.generateEventHandlers(config)}

  return (
    <AdminTopBar
      ${this.generateAdminNavbarProps(config)}
      variant="${config.styling.variant}"
    />
  );
}`;
  }

  private generateMarketingComponent(config: NavbarConfig): string {
    const componentName = this.toPascalCase(config.name);
    const propsInterface = `${componentName}Props`;
    
    return `// components/navigation/${componentName}.tsx
import {
  ${this.generateImports(config).join(',\n  ')}
} from '@xala-technologies/ui-system';
${config.features.themeSwitcher ? "import { CompactThemeSwitcher } from '@xala-technologies/ui-system/components/ThemeManager';" : ''}
import { useTranslation } from 'react-i18next';
${config.features.mobileResponsive ? "import { useResponsive } from '@/hooks/useResponsive';" : ''}

export interface ${propsInterface} {
  readonly locale: string;
  readonly ctaText?: string;
  readonly onCtaClick?: () => void;
}

export function ${componentName}({
  locale,
  ctaText,
  onCtaClick
}: ${propsInterface}): JSX.Element {
  const { t } = useTranslation();
  const { colors, spacing } = useTokens();${config.features.mobileResponsive ? `
  const { isMobile } = useResponsive();` : ''}

  const navigationItems = ${JSON.stringify(config.navigation.items, null, 4)};

${this.generateEventHandlers(config)}

  return (
    <WebNavbar
      ${this.generateMarketingNavbarProps(config)}
      variant="${config.styling.variant}"
      ${config.styling.sticky ? 'sticky' : ''}
    />
  );
}`;
  }

  private generateAdaptiveComponent(config: NavbarConfig): string {
    const componentName = this.toPascalCase(config.name);
    const propsInterface = `${componentName}Props`;
    
    return `// components/navigation/${componentName}.tsx
import {
  ${this.generateImports(config).join(',\n  ')}
} from '@xala-technologies/ui-system';
${config.features.themeSwitcher ? "import { CompactThemeSwitcher } from '@xala-technologies/ui-system/components/ThemeManager';" : ''}
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '@/hooks/useResponsive';

export interface ${propsInterface} {
  readonly logo: string;
  readonly navigationItems: Array<{
    readonly key: string;
    readonly label: string;
    readonly href: string;
    readonly icon?: React.ReactNode;
  }>;
  readonly actions?: React.ReactNode;
}

export function ${componentName}({
  logo,
  navigationItems,
  actions
}: ${propsInterface}): JSX.Element {
  const { t } = useTranslation();
  const { colors, spacing } = useTokens();
  const { isMobile, isTablet } = useResponsive();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isMobileView = isMobile || isTablet;

${this.generateEventHandlers(config)}

  ${this.generateAdaptiveNavbarLogic(config)}
}`;
  }

  private generateNavbarProps(config: NavbarConfig): string {
    const props: string[] = [];

    if (config.features.logo) {
      props.push(`logo={
        <Stack direction="horizontal" align="center" gap="sm">
          <Typography variant="h3" weight="bold">
            {t('brand.name')}
          </Typography>
          <Badge variant="secondary" size="sm">
            {t('brand.version')}
          </Badge>
        </Stack>
      }`);
    }

    if (config.features.search) {
      props.push(`searchComponent={
        <Container 
          size="md" 
          padding="none"
          style={{ 
            maxWidth: isMobile ? '200px' : '400px',
            width: '100%'
          }}
        >
          <GlobalSearch
            placeholder={t('search.placeholder')}
            variant="default"
            size="md"
            onSubmit={handleSearchSubmit}
          />
        </Container>
      }`);
    }

    if (config.features.userMenu || config.features.themeSwitcher || config.features.notifications) {
      props.push(`actions={
        <Stack direction="horizontal" align="center" gap="sm">
          ${this.generateActionComponents(config)}
        </Stack>
      }`);
    }

    return props.join('\n      ');
  }

  private generateAdminNavbarProps(config: NavbarConfig): string {
    const props: string[] = [];

    if (config.features.breadcrumbs) {
      props.push(`title={title || t('admin.dashboard')}
      breadcrumbs={breadcrumbs}`);
    }

    props.push(`navigation={
        <Stack direction="horizontal" gap="md">
          {navigationItems.map((item) => (
            <Button
              key={item.key}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              onClick={(): void => handleNavigationSelect(item.key, item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}
            >
              {item.icon}
              <Typography variant="body">
                {item.label}
              </Typography>
              {item.badge && (
                <Badge size="sm" variant="secondary">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </Stack>
      }`);

    if (config.features.search) {
      props.push(`searchComponent={
        <Container size="md" padding="none" style={{ maxWidth: '300px' }}>
          <GlobalSearch
            placeholder={t('admin.search.placeholder')}
            variant="default"
            size="sm"
            onSubmit={handleSearchSubmit}
          />
        </Container>
      }`);
    }

    if (config.features.userMenu || config.features.themeSwitcher || config.features.notifications) {
      props.push(`actions={
        <Stack direction="horizontal" align="center" gap="xs">
          ${this.generateActionComponents(config)}
        </Stack>
      }`);
    }

    return props.join('\n      ');
  }

  private generateMarketingNavbarProps(config: NavbarConfig): string {
    const props: string[] = [];

    if (config.features.logo) {
      props.push(`logo={
        <Typography variant="h3" weight="bold">
          {t('brand.name')}
        </Typography>
      }`);
    }

    props.push(`navigation={
        <Stack direction="horizontal" gap="lg">
          {navigationItems.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              onClick={(): void => { window.location.href = item.href; }}
            >
              <Typography variant="body">
                {item.label}
              </Typography>
            </Button>
          ))}
        </Stack>
      }`);

    props.push(`actions={
        <Stack direction="horizontal" align="center" gap="sm">
          ${config.features.themeSwitcher && !config.features.mobileResponsive ? `<CompactThemeSwitcher size="small" showLabel={false} />` : ''}
          
          <Button variant="outline" size="sm">
            {t('auth.login')}
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={handleCtaClick}
          >
            {ctaText || t('auth.signup')}
          </Button>
        </Stack>
      }`);

    return props.join('\n      ');
  }

  private generateAdaptiveNavbarLogic(config: NavbarConfig): string {
    return `if (isMobileView) {
    return (
      <>
        <WebNavbar
          logo={
            <Typography variant="h4" weight="bold">
              {logo}
            </Typography>
          }
          actions={
            <Stack direction="horizontal" align="center" gap="xs">
              ${config.features.search ? `<IconButton
                variant="ghost"
                size="sm"
                onClick={handleSearchToggle}
                aria-label={t('search.open')}
              >
                <Search size={20} />
              </IconButton>` : ''}
              
              <IconButton
                variant="ghost"
                size="sm"
                onClick={handleMenuToggle}
                aria-label={t('navigation.openMenu')}
              >
                <Menu size={20} />
              </IconButton>
            </Stack>
          }
          variant="${config.styling.variant}"
          ${config.styling.sticky ? 'sticky' : ''}
        />

        <Drawer
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        >
          <Stack
            direction="vertical"
            gap="lg"
            style={{ padding: spacing.lg, height: '100%' }}
          >
            <Stack direction="horizontal" justify="between" align="center">
              <Typography variant="h3" weight="bold">
                {t('navigation.menu')}
              </Typography>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={(): void => setIsMobileMenuOpen(false)}
                aria-label={t('navigation.closeMenu')}
              >
                <X size={20} />
              </IconButton>
            </Stack>

            <Stack direction="vertical" gap="sm">
              {navigationItems.map((item) => (
                <Button
                  key={item.key}
                  variant="ghost"
                  size="md"
                  onClick={(): void => handleNavigationSelect(item.key, item)}
                  style={{
                    justifyContent: 'flex-start',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: spacing.sm
                  }}
                >
                  {item.icon}
                  <Typography variant="body">
                    {item.label}
                  </Typography>
                </Button>
              ))}
            </Stack>

            <Stack direction="vertical" gap="md" style={{ marginTop: 'auto' }}>
              ${config.features.themeSwitcher ? '<CompactThemeSwitcher showLabel />' : ''}
              {actions}
            </Stack>
          </Stack>
        </Drawer>
      </>
    );
  }

  // Desktop View
  return (
    <WebNavbar
      logo={
        <Typography variant="h3" weight="bold">
          {logo}
        </Typography>
      }
      navigation={
        <Stack direction="horizontal" gap="lg">
          {navigationItems.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              onClick={(): void => handleNavigationSelect(item.key, item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing.xs
              }}
            >
              {item.icon}
              <Typography variant="body">
                {item.label}
              </Typography>
            </Button>
          ))}
        </Stack>
      }
      ${config.features.search ? `searchComponent={
        <Container size="md" padding="none" style={{ maxWidth: '400px' }}>
          <GlobalSearch
            placeholder={t('search.placeholder')}
            variant="default"
            size="md"
          />
        </Container>
      }` : ''}
      actions={
        <Stack direction="horizontal" align="center" gap="sm">
          ${config.features.themeSwitcher ? '<CompactThemeSwitcher size="medium" />' : ''}
          {actions}
        </Stack>
      }
      variant="${config.styling.variant}"
      ${config.styling.sticky ? 'sticky' : ''}
    />
  );`;
  }

  private generateActionComponents(config: NavbarConfig): string {
    const components: string[] = [];

    if (config.features.themeSwitcher) {
      const size = config.type === 'admin' ? 'small' : 'medium';
      components.push(`<CompactThemeSwitcher size="${size}" />`);
    }

    if (config.features.notifications) {
      components.push(`<Button
            variant="ghost"
            size="sm"
            onClick={handleNotificationClick}
            aria-label={t('notifications.label')}
            style={{ position: 'relative' }}
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                size="sm"
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  minWidth: '20px',
                  height: '20px'
                }}
              >
                {notificationCount > 99 ? '99+' : notificationCount.toString()}
              </Badge>
            )}
          </Button>`);
    }

    if (config.features.userMenu) {
      components.push(`<ContextMenu>
            <ContextMenuTrigger>
              <Avatar
                src={userAvatar}
                alt={t('user.avatar', { name: userName })}
                size="sm"
                fallback={userName?.charAt(0) || 'U'}
              />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={(): void => handleProfileAction('profile')}
              >
                <Stack direction="horizontal" align="center" gap="sm">
                  <User size={16} />
                  <Typography variant="body">
                    {t('user.profile')}
                  </Typography>
                </Stack>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={(): void => handleProfileAction('settings')}
              >
                <Stack direction="horizontal" align="center" gap="sm">
                  <Settings size={16} />
                  <Typography variant="body">
                    {t('user.settings')}
                  </Typography>
                </Stack>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={(): void => handleProfileAction('logout')}
              >
                <Stack direction="horizontal" align="center" gap="sm">
                  <LogOut size={16} />
                  <Typography variant="body">
                    {t('user.logout')}
                  </Typography>
                </Stack>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>`);
    }

    return components.join('\n          ');
  }

  private generateEventHandlers(config: NavbarConfig): string {
    const handlers: string[] = [];

    if (config.features.search) {
      handlers.push(`  const handleSearchSubmit = (query: string): void => {
    // Handle search submission
    console.log('Search:', query);
  };`);
    }

    if (config.features.notifications) {
      handlers.push(`  const handleNotificationClick = (): void => {
    // Handle notification click
    console.log('Notifications clicked');
  };`);
    }

    if (config.features.userMenu) {
      handlers.push(`  const handleProfileAction = (action: string): void => {
    // Handle profile actions
    console.log('Profile action:', action);
  };`);
    }

    if (config.navigation.items.length > 0) {
      handlers.push(`  const handleNavigationSelect = (key: string, item: any): void => {
    // Handle navigation
    window.location.href = item.href;
  };`);
    }

    if (config.type === 'marketing') {
      handlers.push(`  const handleCtaClick = (): void => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default CTA action
      window.location.href = '/signup';
    }
  };`);
    }

    if (config.type === 'adaptive') {
      handlers.push(`  const handleMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchToggle = (): void => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleNavigationSelect = (key: string, item: any): void => {
    window.location.href = item.href;
    setIsMobileMenuOpen(false);
  };`);
    }

    return handlers.join('\n\n');
  }

  private generateTypes(config: NavbarConfig): string {
    return `// types/${config.name.toLowerCase()}.types.ts
export interface NavigationItem {
  readonly key: string;
  readonly label: string;
  readonly href: string;
  readonly icon?: React.ReactNode;
  readonly badge?: string;
  readonly active?: boolean;
}

export interface ${this.toPascalCase(config.name)}Config {
  readonly locale: string;
  readonly theme: '${config.styling.theme}';
  readonly variant: '${config.styling.variant}';
}`;
  }

  private generateLocalizationKeys(config: NavbarConfig): Record<string, any> {
    const keys: Record<string, any> = {
      brand: {
        name: "Your App",
        version: "v2.0"
      }
    };

    if (config.navigation.items.length > 0) {
      keys.nav = {};
      config.navigation.items.forEach(item => {
        keys.nav[item.key] = item.label;
      });
    }

    if (config.features.search) {
      keys.search = {
        placeholder: "Search everything...",
        open: "Open search"
      };
    }

    if (config.features.userMenu) {
      keys.user = {
        avatar: "User avatar for {{name}}",
        profile: "Profile",
        settings: "Settings",
        logout: "Logout"
      };
    }

    if (config.features.notifications) {
      keys.notifications = {
        label: "Notifications"
      };
    }

    if (config.type === 'marketing') {
      keys.auth = {
        login: "Log In",
        signup: "Sign Up"
      };
    }

    if (config.type === 'admin') {
      keys.admin = {
        dashboard: "Admin Dashboard",
        search: {
          placeholder: "Search admin..."
        },
        user: {
          avatar: "Admin avatar for {{name}}",
          profile: "Profile",
          preferences: "Preferences",
          logout: "Logout"
        }
      };
    }

    if (config.features.mobileResponsive) {
      keys.navigation = {
        menu: "Menu",
        openMenu: "Open navigation menu",
        closeMenu: "Close navigation menu"
      };
    }

    keys.common = {
      cancel: "Cancel"
    };

    return keys;
  }

  private generateDependencies(config: NavbarConfig): string[] {
    const deps = [
      '@xala-technologies/ui-system',
      'react-i18next',
      'lucide-react'
    ];

    if (config.features.mobileResponsive) {
      deps.push('react');
    }

    if (config.type === 'admin' || config.type === 'adaptive') {
      deps.push('next/navigation');
    }

    return deps;
  }

  private getRequiredIcons(config: NavbarConfig): string[] {
    const icons = new Set<string>();

    if (config.features.notifications) {
      icons.add('Bell');
    }

    if (config.features.userMenu) {
      icons.add('User');
      icons.add('Settings');
      icons.add('LogOut');
    }

    if (config.features.mobileResponsive) {
      icons.add('Menu');
      icons.add('X');
    }

    if (config.features.search && config.type === 'adaptive') {
      icons.add('Search');
    }

    if (config.type === 'admin') {
      icons.add('HelpCircle');
    }

    // Add icons from navigation items
    config.navigation.items.forEach(item => {
      if (item.icon && ICON_MAPPINGS[item.icon]) {
        icons.add(item.icon);
      }
    });

    return Array.from(icons);
  }

  private toPascalCase(str: string): string {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '')
      .replace(/^./, str => str.toUpperCase());
  }
}
