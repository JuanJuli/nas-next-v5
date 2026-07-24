'use client';

import RegularTable from "@/components/table/RegularTable";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import columnUnitCompetence from "@/features/eform/components/AplOne/ColumnUnitcompetence";
import { Card, Checkbox, Descriptions, DescriptionsProps } from "antd";
import { useTranslations } from 'next-intl';
import { useMemo, useState } from "react";

export default function PartTwo() {
  const { schema } = useConfigurationEformContext();
  const t = useTranslations('form');
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleChangeParams = (params: any) => {
    if (params.page) {
      setCurrentPage(params.page);
    }
  }

  return (
    <Card>
      <h1 className="text-[1.3em]! font-bold">{t('heading-bagian-2')}</h1>
      <p className="mb-4">{t('desc-bagian-2')}</p>

      <Descriptions
        items={itemSkema}
        colon={true}
        column={1} 
        className="w-full mt-4"
        // make colon flex end and label width 30% and content width 70%
        styles={{
          label: { 
            width: '30%',
            display: 'flex',
            justifyContent: 'space-between',
          },
        }}
      />

      <p>{t('label-daftar-unit')}</p>
      <RegularTable
        url="core/competency_units"
        queryParams={
          {
            sort: "competency_unit.sequence,competency_unit.row_id,competency_unit_code",
            schema_id: schema ? schema.schema_id : "",
          }
        }
        columns={column}
        rowKey="row_id"
        onChangeParams={handleChangeParams}
      />
    </Card>
  )
}
