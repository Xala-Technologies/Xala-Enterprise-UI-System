// Hooks for @xala-mock/ui-system
// React hooks for Norwegian UI components

export const useUISystem = (): { theme: string; accessibility: string; language: string } => {
  return {
    theme: 'norwegian-municipal',
    accessibility: 'WCAG_2_2_AA',
    language: 'nb',
  };
};
