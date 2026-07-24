"use client"

import RegularTable from "@/components/table/RegularTable";
import { Card, Descriptions, Checkbox } from "antd";
import type { DescriptionsProps } from 'antd';
import { useMemo, useState } from "react";
import columnUnitCompetence from "./ColumnUnitcompetence";
import { useRequirementContext } from "@/context/Requirement";
import { useEformApl1Store } from "@/store/eformApl1";
import { useTranslations } from 'next-intl';

export default function PartTwo() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const [currentPage, setCurrentPage] = useState(1);
  const { requirement } = useRequirementContext();
  const { partTwo, setTujuanAsesmen } = useEformApl1Store();

  const itemSkemaData: DescriptionsProps['items'] = [
    {
      label: t('label-judul'),
      children: 'Teknisi Komputer',
    },
    {
      label: t('label-nomor'),
      children: 'TK-002',
    }
  ]

  const handleTujuanAsesmenChange = (key: keyof typeof partTwo.tujuanAsesmen, checked: boolean) => {
    if (checked) {
      setTujuanAsesmen('sertifikasi', key === 'sertifikasi');
      setTujuanAsesmen('pkt', key === 'pkt');
      setTujuanAsesmen('rpl', key === 'rpl');
      setTujuanAsesmen('lainnya', key === 'lainnya');
    } else {
      setTujuanAsesmen(key, false);
    }
  }

  const itemPurpose: DescriptionsProps['items'] = [
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.sertifikasi} onChange={(e) => handleTujuanAsesmenChange('sertifikasi', e.target.checked)} />,
      children: t('label-sertifikasi'),
    },
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.pkt} onChange={(e) => handleTujuanAsesmenChange('pkt', e.target.checked)} />,
      children: t('label-pkt'),
    },
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.rpl} onChange={(e) => handleTujuanAsesmenChange('rpl', e.target.checked)} />,
      children: t('label-rpl'),
    },
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.lainnya} onChange={(e) => handleTujuanAsesmenChange('lainnya', e.target.checked)} />,
      children: t('label-lainnya'),
    }
  ]

  const itemSkema: DescriptionsProps['items'] = [
    {
      label: t('label-skema-sertifikasi'),
      children: <Descriptions items={itemSkemaData} colon column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    },
    {
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
      <h1 className="text-[2em]! font-bold">{t('heading-bagian-2')}</h1>
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
      <RegularTable
        url="core/competency_units"
        queryParams={
          {
            sort: "competency_unit.sequence,competency_unit.row_id,competency_unit_code",
            schema_id: requirement?.schema_id,
          }
        }
        columns={column}
        rowKey="row_id"
        onChangeParams={handleChangeParams}
      />
    </Card>
  )
}
