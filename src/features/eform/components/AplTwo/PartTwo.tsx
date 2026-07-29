'use client';

import { useRequirementContext } from "@/context/Requirement";
import { useTableQuery } from "@/hooks/useTableQuery";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo } from "react";
import ListElement from "./ListElement";
import { useTranslations } from 'next-intl';

export default function PartTwo() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { requirement } = useRequirementContext();

  const schemaID = requirement?.schema_id;

  const dataUnitCompetence = useTableQuery(`core/competency_units`, { schema_id: schemaID, sort: 'competency_unit.sequence,competency_unit.row_id,competency_unit_code' }, {}, !!schemaID);

  const listData = useMemo(() => {
    if (dataUnitCompetence.data && dataUnitCompetence.data.status === "OK" && dataUnitCompetence.data.data) {
      return dataUnitCompetence.data.data;
    }

    return [];
  }, [dataUnitCompetence.data])

  return (
    <div className="flex flex-col gap-6 w-full">
      {listData.length === 0 && <div className="text-center">{tc('empty-data')}</div>}
      {listData.map((item: any, index: number) => (
        <Card key={item.competency_unit_id}>
          <CardContent className="p-6">
            <table className="w-full border-collapse mb-3">
              <tbody>
                <tr>
                  <td rowSpan={2} className="border border-gray-300 px-3 py-2 text-center align-middle font-bold" style={{ width: '35%' }}>
                    {t('label-unit-competency', { number: index + 1 })}
                  </td>
                  <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>{t('unit-code')}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center" style={{ width: '5%' }}>:</td>
                  <td className="border border-gray-300 px-3 py-2" style={{ width: '45%' }}>
                    {item.competency_unit_code ?? "-"}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>{t('label-unit-title')}</td>
                  <td className="border border-gray-300 px-3 py-2 text-center" style={{ width: '5%' }}>:</td>
                  <td className="border border-gray-300 px-3 py-2" style={{ width: '45%' }}>
                    {item.competency_unit_name ?? "-"}
                  </td>
                </tr>
              </tbody>
            </table>

            <ListElement unitCompetenceID={item.competency_unit_id} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
