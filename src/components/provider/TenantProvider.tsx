"use client";

import { useTableQuery } from "@/hooks/useTableQuery";
import { LspByDomain } from "@/types/lsp";
import { createContext, useContext, useEffect, useState } from "react";

const TenantContext = createContext<LspByDomain | null>(null);

export function TenantProvider({ value, lsp_id, children }: { value: LspByDomain | null; children: React.ReactNode; lsp_id?: string; }) {
  const [currentValue, setCurrentValue] = useState<LspByDomain | null>(value);
  
  const { data, refetch } = useTableQuery(`core/lsp/${lsp_id ?? ""}`, {}, {}, !!lsp_id);

  useEffect(() => {
    const setData = (dataLsp: LspByDomain) => {
      setCurrentValue(dataLsp)
    }
    
    if (data && data.status === "OK") {
      setData(data.data)
    }
  }, [data])

  useEffect(() => {
    if (!currentValue && lsp_id) {
      refetch();
    }
  }, [currentValue, lsp_id])

  return (
    <TenantContext.Provider value={currentValue}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  return useContext(TenantContext);
}