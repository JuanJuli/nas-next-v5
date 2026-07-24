import { Schema } from '@/types/schema';
import { createContext, useContext } from 'react';

export interface ConfigurationEformContextType {
  schema: Schema | null;
}

export const ConfigurationEformContext = createContext<ConfigurationEformContextType | null>(null);

export const useConfigurationEformContext = () => {
  const context = useContext(ConfigurationEformContext);
  if (!context) {
    throw new Error('useConfigurationEformContext must be used within a ConfigurationEformContext.Provider');
  }
  return context;
};
