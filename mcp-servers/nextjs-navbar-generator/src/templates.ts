/**
 * Navbar Templates for Different Use Cases
 */

import type { NavbarTemplate, NavigationItem } from './types.js';

export const NAVBAR_TEMPLATES: Record<string, NavbarTemplate> = {
  saas: {
    name: 'SaaS Application Navbar',
    description: 'Perfect for customer-facing SaaS products with branding, search, and user actions',
    type: 'saas',
    defaultConfig: {
      features: {
        logo: true,
        search: true,
        themeSwitcher: true,
        userMenu: true,
        notifications: true,
        breadcrumbs: false,
        mobileResponsive: true
      },
      styling: {
        variant: 'elevated',
        sticky: true,
        theme: 'enterprise'
      }
    },
    requiredFeatures: ['logo', 'userMenu']
  },
  
  admin: {
    name: 'Admin Dashboard Navbar',
    description: 'Optimized for internal tools and admin panels with comprehensive navigation',
    type: 'admin',
    defaultConfig: {
      features: {
        logo: false,
        search: true,
        themeSwitcher: true,
        userMenu: true,
        notifications: true,
        breadcrumbs: true,
        mobileResponsive: true
      },
      styling: {
        variant: 'elevated',
        sticky: false,
        theme: 'enterprise'
      }
    },
    requiredFeatures: ['userMenu', 'breadcrumbs']
  },
  
  marketing: {
    name: 'Marketing Website Navbar',
    description: 'Perfect for public-facing websites with marketing focus and lead generation',
    type: 'marketing',
    defaultConfig: {
      features: {
        logo: true,
        search: false,
        themeSwitcher: true,
        userMenu: false,
        notifications: false,
        breadcrumbs: false,
        mobileResponsive: true
      },
      styling: {
        variant: 'flat',
        sticky: true,
        theme: 'enterprise'
      }
    },
    requiredFeatures: ['logo']
  },
  
  adaptive: {
    name: 'Mobile-Responsive Adaptive Navbar',
    description: 'Automatically adapts between desktop horizontal and mobile drawer navigation',
    type: 'adaptive',
    defaultConfig: {
      features: {
        logo: true,
        search: true,
        themeSwitcher: true,
        userMenu: false,
        notifications: false,
        breadcrumbs: false,
        mobileResponsive: true
      },
      styling: {
        variant: 'elevated',
        sticky: true,
        theme: 'enterprise'
      }
    },
    requiredFeatures: ['mobileResponsive']
  }
};

export const DEFAULT_NAVIGATION_ITEMS: Record<string, NavigationItem[]> = {
  saas: [
    { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'Home' },
    { key: 'projects', label: 'Projects', href: '/projects', icon: 'FolderOpen' },
    { key: 'team', label: 'Team', href: '/team', icon: 'Users' },
    { key: 'settings', label: 'Settings', href: '/settings', icon: 'Settings' }
  ],
  
  admin: [
    { key: 'dashboard', label: 'Dashboard', href: '/admin', icon: 'Home' },
    { key: 'users', label: 'Users', href: '/admin/users', icon: 'Users', badge: '12' },
    { key: 'analytics', label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' },
    { key: 'security', label: 'Security', href: '/admin/security', icon: 'Shield' },
    { key: 'settings', label: 'Settings', href: '/admin/settings', icon: 'Settings' }
  ],
  
  marketing: [
    { key: 'home', label: 'Home', href: '/' },
    { key: 'features', label: 'Features', href: '/features' },
    { key: 'pricing', label: 'Pricing', href: '/pricing' },
    { key: 'about', label: 'About', href: '/about' },
    { key: 'contact', label: 'Contact', href: '/contact' }
  ],
  
  adaptive: [
    { key: 'home', label: 'Home', href: '/', icon: 'Home' },
    { key: 'products', label: 'Products', href: '/products', icon: 'Package' },
    { key: 'services', label: 'Services', href: '/services', icon: 'Briefcase' },
    { key: 'contact', label: 'Contact', href: '/contact', icon: 'Mail' }
  ]
};

export const ICON_MAPPINGS: Record<string, string> = {
  'Home': 'Home',
  'Users': 'Users',
  'Settings': 'Settings',
  'BarChart3': 'BarChart3',
  'Shield': 'Shield',
  'FolderOpen': 'FolderOpen',
  'Package': 'Package',
  'Briefcase': 'Briefcase',
  'Mail': 'Mail',
  'Bell': 'Bell',
  'Search': 'Search',
  'Menu': 'Menu',
  'X': 'X',
  'LogOut': 'LogOut',
  'User': 'User',
  'HelpCircle': 'HelpCircle'
};
