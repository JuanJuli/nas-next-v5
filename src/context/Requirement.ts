import { Requirement } from '@/types/requirement';
import { createContext, useContext } from 'react';

export interface RequirementContextType {
    requirement: Requirement | null;
}

export const RequirementContext = createContext<RequirementContextType | null>(null);

export const useRequirementContext = () => {
  const context = useContext(RequirementContext);
  if (!context) {
    throw new Error('useRequirementContext must be used within a RequirementContext.Provider');
  }
  return context;
};
