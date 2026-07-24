"use client"

import RegularTable from "@/components/table/RegularTable";
import { Card, Descriptions, Checkbox } from "antd";
import type { DescriptionsProps } from 'antd';
import { useMemo, useState } from "react";
import columnUnitCompetence from "./ColumnUnitcompetence";
import { useRequirementContext } from "@/context/Requirement";
import { useEformApl1Store } from "@/store/eformApl1";

export default function PartTwo() {
  const [currentPage, setCurrentPage] = useState(1);
  const { requirement } = useRequirementContext();
  const { partTwo, setTujuanAsesmen } = useEformApl1Store();

  const itemSkemaData: DescriptionsProps['items'] = [
    {
      label: 'Judul',
      children: 'Teknisi Komputer',
    },
    {
      label: 'Nomor',
      children: 'TK-002',
    }
  ]

  const handleTujuanAsesmenChange = (key: keyof typeof partTwo.tujuanAsesmen, checked: boolean) => {
    if (checked) {
      // Uncheck all others, check only this one
      setTujuanAsesmen('sertifikasi', key === 'sertifikasi');
      setTujuanAsesmen('pkt', key === 'pkt');
      setTujuanAsesmen('rpl', key === 'rpl');
      setTujuanAsesmen('lainnya', key === 'lainnya');
    } else {
      // Just uncheck this one
      setTujuanAsesmen(key, false);
    }
  }

  const itemPurpose: DescriptionsProps['items'] = [
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.sertifikasi} onChange={(e) => handleTujuanAsesmenChange('sertifikasi', e.target.checked)} />,
      children: 'Sertifikasi',
    },
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.pkt} onChange={(e) => handleTujuanAsesmenChange('pkt', e.target.checked)} />,
      children: 'Pengakuan Kompetensi Terkini (PKT)',
    },
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.rpl} onChange={(e) => handleTujuanAsesmenChange('rpl', e.target.checked)} />,
      children: 'Rekognisi Pembelajaran Lampau (RPL)',
    },
    {
      label: <Checkbox checked={partTwo.tujuanAsesmen.lainnya} onChange={(e) => handleTujuanAsesmenChange('lainnya', e.target.checked)} />,
      children: 'Lainnya',
    }
  ]

  const itemSkema: DescriptionsProps['items'] = [
    {
      label: 'Skema Sertifikasi (KKNI/Okupasi/Klaster)',
      children: <Descriptions items={itemSkemaData} colon column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    },
    {
      label: 'Tujuan Asesmen',
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
      <h1 className="text-[2em]! font-bold">Bagian 2: Data Sertifikasi</h1>
      <p className="mb-4">Tuliskan Judul dan Nomor Skema Sertifikasi yang anda ajukan berikut Daftar Unit Kompetensi sesuai kemasan pada skema sertifikasi untuk mendapatkan pengakuan sesuai dengan latar belakang pendidikan, pelatihan serta pengalaman kerja yang anda miliki.</p>

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

      <p>Daftar Unit Kompetensi sesuai kemasan</p>
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
