"use client"

import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useMemo } from "react";
import columnUnitCompetence from "./ColumnUnitcompetence";
import { useRequirementContext } from "@/context/Requirement";
import { useEformApl1Store } from "@/store/eformApl1";
import { useTranslations } from 'next-intl';

export default function PartTwo() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { requirement } = useRequirementContext();
  const { partTwo, setTujuanAsesmen } = useEformApl1Store();

  const { data: unitData, isLoading } = useTableQuery(
    "core/competency_units",
    {
      sort: "competency_unit.sequence,competency_unit.row_id,competency_unit_code",
      schema_id: requirement?.schema_id,
    },
    {},
    !!requirement?.schema_id
  );

  const listData = useMemo(() => {
    if (unitData && unitData.status === "OK" && unitData.data) return unitData.data;
    return [];
  }, [unitData]);

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

  const column = useMemo(() => columnUnitCompetence(), []);

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-[2em]! font-bold">{t('heading-bagian-2')}</h1>
        <p className="mb-4">{t('desc-bagian-2')}</p>

        <div className="mt-4 space-y-2">
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('label-skema-sertifikasi')}</span>
            <span className="mx-2">:</span>
            <div className="space-y-1">
              <p><span className="text-muted-foreground">{t('label-judul')}:</span> Teknisi Komputer</p>
              <p><span className="text-muted-foreground">{t('label-nomor')}:</span> TK-002</p>
            </div>
          </div>
          <div className="flex">
            <span className="font-medium min-w-[30%]">{t('label-tujuan-asesmen')}</span>
            <span className="mx-2">:</span>
            <div className="space-y-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={partTwo.tujuanAsesmen.sertifikasi}
                  onCheckedChange={(checked) => handleTujuanAsesmenChange('sertifikasi', checked === true)}
                />
                <span>{t('label-sertifikasi')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={partTwo.tujuanAsesmen.pkt}
                  onCheckedChange={(checked) => handleTujuanAsesmenChange('pkt', checked === true)}
                />
                <span>{t('label-pkt')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={partTwo.tujuanAsesmen.rpl}
                  onCheckedChange={(checked) => handleTujuanAsesmenChange('rpl', checked === true)}
                />
                <span>{t('label-rpl')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={partTwo.tujuanAsesmen.lainnya}
                  onCheckedChange={(checked) => handleTujuanAsesmenChange('lainnya', checked === true)}
                />
                <span>{t('label-lainnya')}</span>
              </label>
            </div>
          </div>
        </div>

        <p className="mt-6">{t('label-daftar-unit')}</p>
        <DataTable
          columns={column}
          data={listData}
          loading={isLoading}
        />
      </CardContent>
    </Card>
  )
}
