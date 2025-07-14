// LocalizationProvider for @xala-mock/ui-system
// Norwegian government-compliant localization context provider

import {
  SupportedLocale,
  TranslationKeys,
  LocalizationConfig,
  LocalizationProviderProps,
  DEFAULT_LOCALIZATION_CONFIG,
} from '../../types/localization.types';

// React context mock for this environment
declare namespace React {
  function createContext<T>(defaultValue?: T): any;
  type ReactNode = any;
}

// Context interface
export interface LocalizationContextType {
  locale: SupportedLocale;
  translations: Partial<Record<SupportedLocale, Partial<TranslationKeys>>>;
  config: LocalizationConfig;
  changeLocale: (locale: SupportedLocale) => void;
  isLoading: boolean;
  error: string | null;
}

// Default context value
const defaultContextValue: LocalizationContextType = {
  locale: 'nb-NO',
  translations: {},
  config: DEFAULT_LOCALIZATION_CONFIG,
  changeLocale: () => {},
  isLoading: false,
  error: null,
};

// Create localization context
export const LocalizationContext = {
  Provider: ({ children, ...props }: LocalizationProviderProps) => children,
  Consumer: ({ children }: { children: (value: LocalizationContextType) => React.ReactNode }) =>
    children(defaultContextValue),
  displayName: 'LocalizationContext',
};

// Mock LocalizationProvider component
export const LocalizationProvider = ({
  children,
  locale = 'nb-NO',
  config = DEFAULT_LOCALIZATION_CONFIG,
  translations = {},
  norwegianConfig,
}: LocalizationProviderProps) => {
  // Mock implementation for development
  const contextValue: LocalizationContextType = {
    locale,
    translations,
    config: { ...DEFAULT_LOCALIZATION_CONFIG, ...config },
    changeLocale: (newLocale: SupportedLocale) => {
      console.log(`Changing locale to: ${newLocale}`);
    },
    isLoading: false,
    error: null,
  };

  // In a real React environment, this would be:
  // return (
  //   <LocalizationContext.Provider value={contextValue}>
  //     {children}
  //   </LocalizationContext.Provider>
  // );

  // Mock return for development
  return children;
};
