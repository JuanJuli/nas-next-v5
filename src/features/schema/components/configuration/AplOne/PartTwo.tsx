'use client';

import RegularTable from "@/components/table/RegularTable";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import columnUnitCompetence from "@/features/eform/components/AplOne/ColumnUnitcompetence";
import { Card, Checkbox, Descriptions, DescriptionsProps } from "antd";
import { useMemo, useState } from "react";

export default function PartTwo() {
  const { schema } = useConfigurationEformContext();
  const [currentPage, setCurrentPage] = useState(1);

  const itemSkemaData: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: 'Judul',
      children: schema ? schema.schema_name : '-',
    },
    {
      label: 'Nomor',
      children: schema ? schema.schema_code : '-',
    }
  ]), [schema]);

  const itemPurpose: DescriptionsProps['items'] = [
    {
      label: <Checkbox disabled />,
      children: 'Sertifikasi',
    },
    {
      label: <Checkbox disabled />,
      children: 'Pengakuan Kompetensi Terkini (PKT)',
    },
    {
      label: <Checkbox disabled />,
      children: 'Rekognisi Pembelajaran Lampau (RPL)',
    },
    {
      label: <Checkbox disabled />,
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
      <h1 className="text-[1.3em]! font-bold">Bagian 2: Data Sertifikasi</h1>
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
