"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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

  useEffect(() => {
    if (currentName && !lastPart.pemohonNama) {
      setPemohonNama(currentName);
    }
  }, [currentName, lastPart.pemohonNama, setPemohonNama]);

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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6">
            <div>
              <p className="font-medium mb-2">{t('label-rekomendasi-asesi')}</p>
              <RadioGroup
                value={String(lastPart.rekomendasi)}
                onValueChange={(value) => setRekomendasi(value === 'true' ? true : value === 'false' ? false : null)}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="true" id="apl2-rekomendasi-ya" />
                  <Label htmlFor="apl2-rekomendasi-ya">{t('label-asesmen-dilanjutkan')}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="false" id="apl2-rekomendasi-tidak" />
                  <Label htmlFor="apl2-rekomendasi-tidak">{t('label-asesmen-tidak-dilanjutkan')}</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-2">{t('label-choose-appropriate')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-medium mb-2">{t('label-asesi')}</p>
              <div className="ml-4 space-y-3">
                <p><span className="text-muted-foreground">{t('label-name')}:</span> {lastPart.pemohonNama || currentName}</p>
                <div className="flex flex-col gap-2">
                  {!lastPart.pemohonTtd && (
                    <Button
                      variant="outline"
                      disabled={(!requirement || !requirement.current_role || requirement.current_role !== 'APL') && !signatureApl}
                      onClick={handleSignaturePemohon}
                    >
                      {tc('btn-tanda-tangan')}
                    </Button>
                  )}
                  {lastPart.pemohonTtd && (
                    <img src={lastPart.pemohonTtd} alt="Signature" className="max-w-[150px] max-h-[75px]" />
                  )}
                  <DatePicker
                    value={lastPart.pemohonTanggal ? dayjs(lastPart.pemohonTanggal).toDate() : null}
                    onChange={(date) => setPemohonTanggal(date ? date.toISOString() : null)}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">{t('label-ditinjau-asesor')}</p>
              <div className="ml-4 space-y-3">
                <p><span className="text-muted-foreground">{t('label-reg-number')}:</span> {lastPart.asesorNoReg ?? ""}</p>
                <p><span className="text-muted-foreground">{t('label-name')}:</span> {lastPart.asesorNama ?? ""}</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ACS'}
                    onClick={handleSignatureAsesor}
                  >
                    {lastPart.asesorTtd ? t('label-change-signature') : tc('btn-tanda-tangan')}
                  </Button>
                  {lastPart.asesorTtd && (
                    <img src={lastPart.asesorTtd} alt="Assessor Signature" className="max-w-[150px] max-h-[75px]" />
                  )}
                  <DatePicker
                    disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ACS'}
                    value={lastPart.asesorTanggal ? dayjs(lastPart.asesorTanggal).toDate() : null}
                    onChange={(date) => setAsesorTanggal(date ? date.toISOString() : null)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
