"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Button, Card, DatePicker, Radio, Space, Input } from "antd";
import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import { useEffect, useMemo } from "react";
import { useEformApl2Store } from "@/store/eformApl2";
import dayjs from "dayjs";
import { useTranslations } from 'next-intl';

export default function LastPart() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { requirement } = useRequirementContext();
  const { 
    lastPart, 
    setRekomendasi, 
    setPemohonNama, 
    setPemohonTtd, 
    setPemohonTanggal,
    setAsesorNoReg,
    setAsesorNama,
    setAsesorTtd,
    setAsesorTanggal
  } = useEformApl2Store();

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

  // Set default nama pemohon dari requirement data
  useEffect(() => {
    if (currentName && !lastPart.pemohonNama) {
      setPemohonNama(currentName);
    }
  }, [currentName, lastPart.pemohonNama, setPemohonNama]);

  // Set default signature pemohon dari requirement data
  useEffect(() => {
    if (signatureApl && lastPart.pemohonTtd) {
      setPemohonTtd(signatureApl);
    }
  }, [signatureApl, lastPart.pemohonTtd, setPemohonTtd]);

  const handleSignaturePemohon = () => {
    if (signatureApl) {
      setPemohonTtd(signatureApl);
    }
  };

  const handleSignatureAsesor = () => {
    console.log('Open signature modal for assessor');
  };

  const itemApplicant: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: t('label-name'),
      children: lastPart.pemohonNama || currentName,
    },
    {
      label: t('label-signature-date'),
      children: (
        <Space orientation="vertical" className="w-full">
          {!lastPart.pemohonTtd && (
            <Button 
              disabled={(!requirement || !requirement.current_role || requirement.current_role !== 'APL') && !signatureApl}
              onClick={handleSignaturePemohon}
            >
              {tc('btn-tanda-tangan')}
            </Button>
          )}
          {lastPart.pemohonTtd && (
            <img src={lastPart.pemohonTtd} alt="Signature" style={{ maxWidth: '150px', maxHeight: '75px' }} />
          )}
          <DatePicker 
            className="w-full"
            value={lastPart.pemohonTanggal ? dayjs(lastPart.pemohonTanggal) : null}
            onChange={(date) => setPemohonTanggal(date ? date.toISOString() : null)}
          />
        </Space>
      ),
    },
  ]), [currentName, requirement, signatureApl, lastPart.pemohonNama, lastPart.pemohonTtd, lastPart.pemohonTanggal, setPemohonTanggal]);

  const itemAsesorUji: DescriptionsProps['items'] = useMemo(() => ([
    {
      label: t('label-reg-number'),
      children: lastPart.asesorNoReg ?? "",
    },
    {
      label: t('label-name'),
      children: lastPart.asesorNama ?? "",
    },
    {
      label: t('label-signature-date'),
      children: (
        <Space orientation="vertical" className="w-full">
          <Button 
            disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ACS'}
            onClick={handleSignatureAsesor}
          >
            {lastPart.asesorTtd ? t('label-change-signature') : tc('btn-tanda-tangan')}
          </Button>
          {lastPart.asesorTtd && (
            <img src={lastPart.asesorTtd} alt="Assessor Signature" style={{ maxWidth: '150px', maxHeight: '75px' }} />
          )}
          <DatePicker 
            className="w-full"
            disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ACS'}
            value={lastPart.asesorTanggal ? dayjs(lastPart.asesorTanggal) : null}
            onChange={(date) => setAsesorTanggal(date ? date.toISOString() : null)}
          />
        </Space>
      ),
    },
  ]), [requirement, lastPart.asesorNoReg, lastPart.asesorNama, lastPart.asesorTtd, lastPart.asesorTanggal, setAsesorNoReg, setAsesorNama, setAsesorTanggal]);

  const itemLastPart: DescriptionsProps['items'] = [
    {
      label: t('label-rekomendasi-asesi'),
      children: (
      <div>
        <Radio.Group 
          value={lastPart.rekomendasi}
          onChange={(e) => setRekomendasi(e.target.value)}
        >
          <Radio value={true}>{t('label-asesmen-dilanjutkan')}</Radio>
          <Radio value={false}>{t('label-asesmen-tidak-dilanjutkan')}</Radio>
        </Radio.Group>
        <p className="text-gray-500 text-sm mt-2">{t('label-choose-appropriate')}</p>
      </div>
      ),
    },
    {
      label: t('label-asesi'),
      children: <Descriptions items={itemApplicant} colon={false} column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    },
    {
        label: '',
        children: '',
    },
    {
      label: t('label-ditinjau-asesor'),
      children: <Descriptions items={itemAsesorUji} colon={false} column={1} className="w-full" styles={{ label: { width: '30%' } }} />,
    }
  ]


  return (
    <Card>
      <Descriptions layout="vertical" items={itemLastPart} colon={false} column={2} className="w-full" styles={{ label: { width: '30%' } }} />
    </Card>
  );
}
