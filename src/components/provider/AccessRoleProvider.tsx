"use client";

import { AccessRoleAll } from "@/types/accessRole";
import { createContext, useContext } from "react";

const AccessRoleContext = createContext<AccessRoleAll | null>(null);

export function AccessRoleProvider({ value, children }: { value: AccessRoleAll | null; children: React.ReactNode }) {
  return (
    <AccessRoleContext.Provider value={value}>
      {children}
    </AccessRoleContext.Provider>
  );
}

export function useAccessRole() {
  return useContext(AccessRoleContext);
}