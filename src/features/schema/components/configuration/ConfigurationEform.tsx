'use client';

import TitlePage from "@/components/title_page/TitlePage";
import { useMenuIconByPath } from "@/hooks/useMenuIcon";
import { Schema } from "@/types/schema";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from "react";
import AplOne from "./AplOne";
import { ConfigurationEformContext } from "@/context/ConfigurationEform";

export default function ConfigurationEform({ params, schemaData }: { params: string[], schemaData?: Schema }) {
  const icon = useMenuIconByPath('/schema')
  const t = useTranslations('form');

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
        title: t('breadcrumb-master-schema')
      },
      {
        key: 'form-schema',
        title: t('breadcrumb-form-schema')
      },
      {
        key: 'configuration',
        title: t('breadcrumb-configuration')
      }
    ]
  }, [t])
  
  return (
    <>
      <TitlePage
        title={t('heading-config-form', { formCode })}
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
