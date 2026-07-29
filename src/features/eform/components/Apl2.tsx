"use client"

import TitlePage, { TitleAction } from "@/components/title_page/TitlePage"
import { useRequirementContext } from "@/context/Requirement";
import { Eye } from "lucide-react";

import PartOne from "./AplTwo/PartOne";
import PartTwo from "./AplTwo/PartTwo";
import LastPart from "./AplTwo/LastPart";
import { useRouter } from "@/i18n/navigation";
import { useEformApl2Store } from "@/store/eformApl2";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useAuthStore } from "@/store/auth";
import { useModalPreviewEformStore } from "@/store/modalPreviewEform";
import dayjs from "dayjs";
import { htmlToPlainText } from "@/helper/stringHtml";
import { toast } from "sonner";
import { authFetch } from "@/utils/authFetch";
import QRCode from 'qrcode';
import { useTranslations } from 'next-intl';

export default function Apl2() {
  const t = useTranslations('common');
  const tm = useTranslations('message');
  const router = useRouter();
  const { requirement:requirementData } = useRequirementContext();
  const { partTwo, lastPart } = useEformApl2Store();
  const { user } = useAuthStore();
  const { openModal, setPdfUrl, setIsLoading, setFormName } = useModalPreviewEformStore();

  // Query untuk Unit Kompetensi
  const { data: unitKompetensiData } = useTableQuery(
    "core/competency_units",
    {
      sort: "competency_unit.sequence,competency_unit.row_id,competency_unit_code",
      schema_id: requirementData?.schema_id,
    },
    {},
    !!requirementData?.schema_id
  );

  // Query untuk semua Requirements (Elements) untuk schema ini
  const { data: allRequirementsData } = useTableQuery(
    "core/requirements",
    {
      schema_id: requirementData?.schema_id,
      requirement_category: "KOMPETENSI",
      applicant_id: requirementData?.applicant_id,
      limit: 1000,
    },
    {},
    !!requirementData?.schema_id && !!requirementData?.applicant_id
  );

  const previewEform = async () => {
    try {
      setIsLoading(true);
      openModal();
      setFormName(`FR.APL.02_${requirementData?.applicant?.user?.full_name || 'E-Form'}`);

      const applicant = requirementData?.applicant;
      const applicantUser = applicant?.user;

      // Bagian 1: Data Skema Sertifikasi
      const bagian1 = {
        judulSkema: requirementData?.schema?.title || '',
        nomorSkema: requirementData?.schema?.code || '',
      };

      // Bagian 2: Unit Kompetensi dengan Requirements (Elements)
      const unitKompetensiList = unitKompetensiData?.data || [];
      const allRequirements = allRequirementsData?.data || [];
      
      
      const bagian2 = {
        unitKompetensi: await Promise.all(
          unitKompetensiList.map(async (unit: any, index: number) => {
            // Filter requirements untuk unit ini
            const unitRequirements = allRequirements.filter(
              (req: any) => req.element.competency_unit_id === unit.competency_unit_id
            );
            
            const requirements = await Promise.all(
              unitRequirements.map(async (req: any, reqIndex: number) => {
                const assessment = partTwo.requirementsAssessment[req.requirement_id];
                
                // Generate QR code untuk requirement_id
                let qrCodeDataUrl = '';
                const urlToQr = `${window.location.origin}/requirement/file-list/${req.requirement_id}`;
                try {
                  qrCodeDataUrl = await QRCode.toDataURL(urlToQr, {
                    width: 150,
                    margin: 1,
                  });
                } catch (error) {
                  console.error('Error generating QR code:', error);
                }

                // Map KUKs from element
                const kuks = (req.element?.kuks || []).map((kuk: any) => ({
                  namaKuk: kuk.kuk_name || '',
                }));

                return {
                  no_req: reqIndex + 1,
                  namaDokumen: req.element?.element_name ? htmlToPlainText(req.element.element_name) : '',
                  k: assessment === 'k',
                  bk: assessment === 'bk',
                  file: qrCodeDataUrl,
                  kuks: kuks,
                };
              })
            );

            return {
              no: index + 1,
              kodeUnit: unit.competency_unit_code || '',
              judulUnit: unit.competency_unit_name || '',
              requirement: requirements,
            };
          })
        ),
      };

      // Bagian 3: Rekomendasi & Tanda Tangan
      const bagian3 = {
        rekomendasi: {
          dilanjutkan: lastPart.rekomendasi === true,
          tidakDilanjutkan: lastPart.rekomendasi === false,
        },
        pemohon: {
          nama: lastPart.pemohonNama || applicantUser?.full_name || '',
          ttd: lastPart.pemohonTtd || '',
          tanggal: lastPart.pemohonTanggal ? dayjs(lastPart.pemohonTanggal).format('DD MMMM YYYY') : '',
        },
        assessor: {
          noReg: lastPart.asesorNoReg || '',
          nama: lastPart.asesorNama || '',
          ttd: lastPart.asesorTtd || '',
          tanggal: lastPart.asesorTanggal ? dayjs(lastPart.asesorTanggal).format('DD MMMM YYYY') : '',
        },
      };

      // Gabungkan semua data
      const payload = {
        ...bagian1,
        ...bagian2,
        ...bagian3,
        template: "FR.APL.02 Template",
      };

      console.log('Preview Eform APL2 Payload:', payload);

      // Call API untuk generate PDF
      const response = await authFetch('/api/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Convert response to blob dan create URL
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(tm('failed-preview'));
      setIsLoading(false);
    }
  }

  const handleBack = () => {
    router.back();
  }

  const titleAction: TitleAction[] = [
    {
      key: 'preview',
      label: t('btn-preview-form'),
      icon: <Eye />,
      onClick: previewEform,
    }
  ]
  return (
    <>
      <TitlePage title={requirementData?.requirement_name ?? t('persyaratan')} handleBack={handleBack} actions={titleAction} />
      <div className="flex flex-col gap-6 w-full p-6">
        <PartOne />
        <PartTwo />
        <LastPart />
      </div>
    </>
  )
}
