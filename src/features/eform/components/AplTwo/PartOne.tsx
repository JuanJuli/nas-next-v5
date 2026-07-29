"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from 'next-intl';

export default function PartOne() {
  const t = useTranslations('form');
  const { requirement } = useRequirementContext();

  return (
    <Card>
      <CardContent className="p-6">
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <td rowSpan={2} className="border border-gray-300 px-3 py-2 text-center align-middle" style={{ width: '35%' }}>
                {t('label-skema-sertifikasi')}
              </td>
              <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>{t('label-judul')}</td>
              <td className="border border-gray-300 px-3 py-2 text-center" style={{ width: '5%' }}>:</td>
              <td className="border border-gray-300 px-3 py-2" style={{ width: '45%' }}>
                {requirement?.schema?.schema_name ?? "-"}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>{t('label-nomor')}</td>
              <td className="border border-gray-300 px-3 py-2 text-center" style={{ width: '5%' }}>:</td>
              <td className="border border-gray-300 px-3 py-2" style={{ width: '45%' }}>
                {requirement?.schema?.schema_number ?? "-"}
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-full border-collapse mt-6">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-3 py-2 align-middle font-bold" style={{ width: '35%' }}>
                {t('label-panduan-asesmen-mandiri')}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-3 py-2" style={{ width: '15%' }}>
                <strong>{t('label-instruksi')}</strong>
                <ul className="list-disc list-inside mt-2">
                  <li>{t('label-instruksi-1')}</li>
                  <li>{t('label-instruksi-2')}</li>
                  <li>{t('label-instruksi-3')}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
