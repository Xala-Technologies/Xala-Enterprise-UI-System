# Enhanced Components Archive

This directory contains the original Enhanced components that were replaced during the v5.0 token-based architecture migration.

## Archived Components

- **EnhancedAccordion.tsx** - Original enhanced accordion component (replaced by `/components/ui/accordion.tsx`)
- **EnhancedGlobalSearch.tsx** - Original enhanced global search component (replaced by `/components/global-search/GlobalSearch.tsx`)
- **EnhancedTabs.tsx** - Original enhanced tabs component (replaced by `/components/ui/tabs-individual.tsx`)
- **EnhancedFooter.tsx** - Original enhanced footer component (replaced by `/components/navigation/Footer.tsx`)
- **EnhancedSidebar.tsx** - Original enhanced sidebar component (replaced by `/components/navigation/Sidebar.tsx`)
- **EnhancedDashboard.tsx** - Original enhanced dashboard component (replaced by `/components/layout/Dashboard.tsx`)

## Migration Notes

All components have been migrated to the new token-based architecture using the `useTokens()` hook. The new components maintain backward compatibility through legacy exports but use the updated naming convention without the "Enhanced" prefix.

Legacy exports are maintained in the main index files for backward compatibility:
- `export { Accordion as EnhancedAccordion }`
- `export { GlobalSearch as EnhancedGlobalSearch }`
- etc.

## Archive Date
Components archived on: 2025-08-03
Migration version: v5.0.0