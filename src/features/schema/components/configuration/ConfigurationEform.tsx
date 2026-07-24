'use client';

import TitlePage from "@/components/title_page/TitlePage";
import { useMenuIconByPath } from "@/hooks/useMenuIcon";
import { Schema } from "@/types/schema";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useEffect, useMemo } from "react";
import AplOne from "./AplOne";
import { ConfigurationEformContext } from "@/context/ConfigurationEform";

export default function ConfigurationEform({ params, schemaData }: { params: string[], schemaData?: Schema }) {
  const icon = useMenuIconByPath('/schema')

  useEffect(() => {
    console.log('schema data', schemaData)
  }, [schemaData])

  const formCode = useMemo(() => {
    if (params.length > 1) {
      return params[1]
    }

    return  ''
  }, [params]);

  const schemaId = useMemo(() => {
    if (params.length > 0) {
      return params[0]
    }

    return  ''
  }, [params]);

  useEffect(() => {
    console.log('schemaId', schemaId)
  }, [schemaId])

  const breadCrumb: BreadcrumbItemType[] = useMemo(() => {
    return [
      {
        key: 'master-schema',
        title: "Master Data Skema"
      },
      {
        key: 'form-schema',
        title: "Form Skema"
      },
      {
        key: 'configuration',
        title: "Konfigurasi Form"
      }
    ]
  }, [])
  
  return (
    <>
      <TitlePage
        title={`Konfigurasi Form - ${formCode}`}
        icon={icon}
        breadCrumb={breadCrumb}
      />
      <ConfigurationEformContext.Provider value={{ schema: schemaData ?? null }}>
        <div className="p-5!">
          <AplOne />
        </div>
      </ConfigurationEformContext.Provider>
    </>
  )
}
