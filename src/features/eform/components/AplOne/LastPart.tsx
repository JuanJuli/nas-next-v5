"use client";

import { useRequirementContext } from "@/context/Requirement";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">{tc('rekomendasi-lsp')}</p>
              <p className="text-sm text-muted-foreground mb-2">{tc('desc-rekomendasi')}</p>
              <RadioGroup
                value={String(lastPart.rekomendasi)}
                onValueChange={(value) => setRekomendasi(value === 'true' ? true : value === 'false' ? false : null)}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="true" id="apl1-rekomendasi-terima" />
                  <Label htmlFor="apl1-rekomendasi-terima">{t('label-accepted')}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="false" id="apl1-rekomendasi-tolak" />
                  <Label htmlFor="apl1-rekomendasi-tolak">{t('label-not-accepted')}</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-2">{t('label-as-participant')}</p>
              <p className="text-sm text-muted-foreground">{t('label-choose-appropriate')}</p>
            </div>

            <div>
              <p className="font-medium mb-2">{t('label-notes')}</p>
              <Textarea
                className="w-[80%]!"
                placeholder={t('placeholder-notes')}
                rows={3}
                value={lastPart.catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="font-medium mb-2">{t('label-pemohon-kandidat')}</p>
              <div className="ml-4 space-y-3">
                <p><span className="text-muted-foreground">{t('label-name')}:</span> {currentName}</p>
                <div className="space-y-2">
                  {lastPart.ttdPemohon && (
                    <img src={lastPart.ttdPemohon} alt="Tanda Tangan Pemohon" className="max-w-[200px] max-h-[100px]" />
                  )}
                  {!lastPart.ttdPemohon && (
                    <Button
                      onClick={() => setTtdPemohon(signatureApl)}
                      disabled={(!requirement || !requirement.current_role || requirement.current_role !== 'APL') && !signatureApl}
                      variant="outline"
                    >
                      {tc('btn-tanda-tangan')}
                    </Button>
                  )}
                  <DatePicker
                    value={lastPart.tanggalPemohon ? dayjs(lastPart.tanggalPemohon).toDate() : null}
                    onChange={(date) => setTanggalPemohon(date ? date.toISOString() : null)}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">{t('label-admin-lsp')}</p>
              <div className="ml-4 space-y-3">
                <p><span className="text-muted-foreground">{t('label-name')}:</span> {t('label-admin-lsp')}</p>
                <div className="space-y-2">
                  <Button
                    disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ADM'}
                    variant="outline"
                  >
                    {tc('btn-tanda-tangan')}
                  </Button>
                  <DatePicker
                    disabled={!requirement || !requirement.current_role || requirement.current_role !== 'ADM'}
                    value={lastPart.tanggalAdminLSP ? dayjs(lastPart.tanggalAdminLSP).toDate() : null}
                    onChange={(date) => setTanggalAdminLSP(date ? date.toISOString() : null)}
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
