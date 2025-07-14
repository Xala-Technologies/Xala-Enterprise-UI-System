// React hooks mock for localization development
// Simplified React hooks implementation for TypeScript compatibility

export const useContext = <T>(context: any): T => {
  // Mock implementation
  return {} as T;
};

export const useCallback = <T extends (...args: any[]) => any>(callback: T, deps: any[]): T => {
  return callback;
};

export const useMemo = <T>(factory: () => T, deps: any[]): T => {
  return factory();
};
