import { createContext, useContext } from 'react';

export interface RequirementListContextType {
    schemaId: string;
    applicantId: string;
    assessmentApplicantId?: string;
}

export const RequirementListContext = createContext<RequirementListContextType | null>(null);

export const useRequirementListContext = () => {
  const context = useContext(RequirementListContext);
  if (!context) {
    throw new Error('useRequirementListContext must be used within a RequirementListContext.Provider');
  }
  return context;
};
