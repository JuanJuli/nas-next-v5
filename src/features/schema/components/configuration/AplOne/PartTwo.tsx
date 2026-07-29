'use client';

import { DataTable } from "@/components/ui/data-table";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import columnUnitCompetence from "@/features/eform/components/AplOne/ColumnUnitcompetence";
import { Card, Descriptions, DescriptionsProps } from "antd";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from 'next-intl';
import { useMemo, useState } from "react";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useTableUrlState } from "@/hooks/useTableUrlState";

export default function PartTwo() {
  const { schema } = useConfigurationEformContext();
  const t = useTranslations('form');
  const [currentPage, setCurrentPage] = useState(1);
  const { params, setParams } = useTableUrlState();

  const { data, isLoading } = useTableQuery("core/competency_units", params, {
    sort: "competency_unit.sequence,competency_unit.row_id,competency_unit_code",
    schema_id: schema ? schema.schema_id : "",
  });

  const itemSkemaData: DescriptionsProps['items'] = useMemo(() => ([
    {
      key: 'judul',
      label: t('label-judul'),
      children: schema ? schema.schema_name : '-',
    },
    {
      key: 'nomor',
      label: t('label-nomor'),
      children: schema ? schema.schema_code : '-',
    }
  ]), [schema, t]);

  const itemPurpose: DescriptionsProps['items'] = [
    {
      key: 'sertifikasi',
      label: <Checkbox disabled />,
      children: t('label-sertifikasi'),
    },
    {
      key: 'pkt',
      label: <Checkbox disabled />,
      children: t('label-pkt'),
    },
    {
      key: 'rpl',
      label: <Checkbox disabled />,
      children: t('label-rpl'),
    },
    {
      key: 'lainnya',
      label: <Checkbox disabled />,
      children: t('label-lainnya'),
    }
  ]

  const itemSkema: DescriptionsProps['items'] = [
    {
      key: 'skema',
      label: t('label-skema-sertifikasi'),
      children: <Descriptions items={itemSkemaData} colon column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    },
    {
      key: 'tujuan',
      label: t('label-tujuan-asesmen'),
      children: <Descriptions items={itemPurpose} colon={false} column={1} className="w-full" styles={{ label: { width: '5%' } }} />,
    },
  ]

  const column = useMemo(() => columnUnitCompetence({ currentPage }), [currentPage]);

  return (
    <Card>
      <h1 className="text-[1.3em]! font-bold">{t('heading-bagian-2')}</h1>
      <p className="mb-4">{t('desc-bagian-2')}</p>

      <Descriptions
        items={itemSkema}
        colon={true}
        column={1} 
        className="w-full mt-4"
        styles={{
          label: { 
            width: '30%',
            display: 'flex',
            justifyContent: 'space-between',
          },
        }}
      />

      <p>{t('label-daftar-unit')}</p>
      <DataTable
        columns={column}
        data={data?.data || []}
        loading={isLoading}
        total={data?.count || 0}
        pageSize={params.limit}
        pageIndex={params.page ? params.page - 1 : 0}
        onPaginationChange={(pagination) => {
          setParams({
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
            page: pagination.pageIndex + 1,
          })
          setCurrentPage(pagination.pageIndex + 1);
        }}
      />
    </Card>
  )
}
