// UISystemProvider for @xala-mock/ui-system
// Main provider component for Norwegian UI system

interface UISystemProviderProps {
  children: any;
  theme?: string;
  language?: 'nb' | 'nn' | 'en';
  municipality?: string;
}

export const UISystemProvider = ({
  children,
  theme: _theme = 'norwegian-municipal',
}: UISystemProviderProps) => {
  return children;
};
