"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Button, Card, DatePicker, Radio, Space } from "antd";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useMemo } from "react";
import { useEformApl1Store } from "@/store/eformApl1";
import dayjs from "dayjs";
import { useTranslations } from 'next-intl';

export default function LastPart() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { requirement } = useRequirementContext();
  const { lastPart, setRekomendasi, setTanggalPemohon, setCatatan, setTanggalAdminLSP, setTtdPemohon, setTtdAdminLSP } = useEformApl1Store();

  const signatureApl = useMemo(() => {
    if (requirement && requirement.applicant && requirement.applicant.user && requirement.applicant.user.signature) {
      return requirement.applicant.user.signature;
    }
    return null;
  }, [requirement]);

  const currentName = useMemo(() => {
    if (requirement && requirement.applicant && requirement.applicant.user && requirement.applicant.user.full_name) {
      return requirement.applicant.user.full_name;
    }

    return "Pemohon";
  }, [requirement]);

  useEffect(() => {
    console.log("signatureApl:", signatureApl);
  }, [signatureApl]);

  const itemApplicant: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: t('label-name'),
      children: currentName,
    },
    {
      label: t('label-signature-date'),
      children: (
        <Space orientation="vertical" className="w-full">
          {lastPart.ttdPemohon && <img src={lastPart.ttdPemohon} alt="Tanda Tangan Pemohon" style={{ maxWidth: '200px', maxHeight: '100px' }} />}
          {!lastPart.ttdPemohon && (
            <Button onClick={() => setTtdPemohon(signatureApl)} disabled={(!requirement || !requirement.current_role || requirement.current_role !== 'APL') && !signatureApl}>{tc('btn-tanda-tangan')}</Button>
          )}
          <DatePicker 
            className="w-full" 
            value={lastPart.tanggalPemohon ? dayjs(lastPart.tanggalPemohon) : null}
            onChange={(date) => setTanggalPemohon(date ? date.toISOString() : null)}
          />
        </Space>
      ),
    },
  ]), [currentName, requirement, signatureApl, lastPart]);

  const itemAdminLSP: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: t('label-name'),
      children: t('label-admin-lsp'),
    },
    {
      label: t('label-signature-date'),
      children: (
        <Space orientation="vertical" className="w-full">
          <Button disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ADM'}>{tc('btn-tanda-tangan')}</Button>
          <DatePicker 
            className="w-full"
            disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ADM'}
            value={lastPart.tanggalAdminLSP ? dayjs(lastPart.tanggalAdminLSP) : null}
            onChange={(date) => setTanggalAdminLSP(date ? date.toISOString() : null)}
          />
        </Space>
      ),
    },
  ]), [requirement]);

  const itemLastPart: DescriptionsProps['items'] = [
    {
      label: tc('rekomendasi-lsp'),
      children: (
      <div>
        <p>{tc('desc-rekomendasi')}</p>
        <Radio.Group value={lastPart.rekomendasi} onChange={(e) => setRekomendasi(e.target.value)}>
          <Radio value={true}>{t('label-accepted')}</Radio>
          <Radio value={false}>{t('label-not-accepted')}</Radio>
        </Radio.Group>
        <p>{t('label-as-participant')}</p>
        <p>{t('label-choose-appropriate')}</p>
      </div>
      ),
    },
    {
      label: t('label-pemohon-kandidat'),
      children: <Descriptions items={itemApplicant} colon={false} column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    },
    {
      label: t('label-notes'),
      children: <TextArea className="w-[80%]!" placeholder={t('placeholder-notes')} rows={3} value={lastPart.catatan} onChange={(e) => setCatatan(e.target.value)} />,
    },
    {
      label: t('label-admin-lsp'),
      children: <Descriptions items={itemAdminLSP} colon={false} column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    }
  ]


  return (
    <Card>
      <Descriptions layout="vertical" items={itemLastPart} colon={true} column={2} className="w-full" styles={{ label: { width: '30%' } }} />
    </Card>
  );
}
