/**
 * @fileoverview Storybook Manager Configuration
 * @description UI configuration for Storybook interface
 * @version 6.0.0
 */

import { addons } from '@storybook/manager-api';
import theme from './theme';

// Configure Storybook UI
addons.setConfig({
  theme,
  // Panel configuration
  panelPosition: 'bottom',
  enableShortcuts: true,
  showToolbar: true,
  showPanel: true,
  
  // Sidebar configuration
  sidebar: {
    showRoots: true,
    collapsedRoots: [],
  },
  
  // Toolbar configuration
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});