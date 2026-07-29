"use client"

import TitlePage, { TitleAction } from "@/components/title_page/TitlePage";
import { Eye } from "lucide-react";
import { useEformApl1Store } from "@/store/eformApl1";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useAuthStore } from "@/store/auth";
import { useModalPreviewEformStore } from "@/store/modalPreviewEform";
import dayjs from "dayjs";
import { htmlToPlainText } from "@/helper/stringHtml";
import { toast } from "sonner";
import { switchGenderToLabel } from "@/helper/gender";

import PartOne from "./AplOne/PartOne"
import PartTwo from "./AplOne/PartTwo"
import PartTree from "./AplOne/PartTree"
import LastPart from "./AplOne/LastPart"
import { useRequirementContext } from "@/context/Requirement";
import { useRouter } from "@/i18n/navigation";
import { authFetch } from "@/utils/authFetch";
import QRCode from 'qrcode';
import { useTranslations } from 'next-intl';

export default function Apl1() {
  const t = useTranslations('common');
  const tm = useTranslations('message');
  const router = useRouter();
  const { partTwo, partTree, lastPart } = useEformApl1Store();
  const { user } = useAuthStore();
  const { openModal, setPdfUrl, setIsLoading, setFormName } = useModalPreviewEformStore();
  const { requirement:requirementData } = useRequirementContext();
  
  // Query untuk Unit Kompetensi (Bagian 2)
  const { data: unitKompetensiData } = useTableQuery(
    "core/competency_units",
    {
      sort: "competency_unit.sequence,competency_unit.row_id,competency_unit_code",
      schema_id: requirementData?.schema_id,
    },
    {},
    !!requirementData?.schema_id
  );

  // Query untuk Bukti Persyaratan Dasar (Bagian 3.1)
  const { data: buktiDasarData } = useTableQuery(
    "core/requirements",
    {
      schema_id: requirementData?.schema_id,
      requirement_category: "DASAR",
      applicant_id: user?.applicant?.applicant_id,
    },
    {},
    !!requirementData?.schema_id && !!user?.applicant?.applicant_id
  );

  // Query untuk Bukti Administratif (Bagian 3.2)
  const { data: buktiAdministratifData } = useTableQuery(
    "core/requirements",
    {
      schema_id: requirementData?.schema_id,
      requirement_category: "BAM",
      applicant_id: user?.applicant?.applicant_id,
    },
    {},
    !!requirementData?.schema_id && !!user?.applicant?.applicant_id
  );

  const handleBack = () => {
    router.back();
  }

  const previewEform = async () => {
    try {
      setIsLoading(true);
      openModal();

      setFormName(`FR.APL.01_${requirementData?.applicant?.user?.full_name || 'E-Form'}`);
      // Kumpulkan semua data yang diperlukan untuk preview eform
      const applicant = requirementData?.applicant;
      const applicantUser = applicant?.user;

      // Bagian 1: Data Pribadi dan Pekerjaan
      const bagian1 = {
        namaLengkap: applicantUser?.full_name || '',
        nik: applicantUser?.nik || applicant?.nip || '',
        tempatLahir: applicantUser?.place_of_birth || '',
        tanggalLahir: applicantUser?.date_of_birth ? dayjs(applicantUser.date_of_birth).format('DD MMMM YYYY') : '',
        jenisKelamin: applicantUser?.gender_code ? switchGenderToLabel(applicantUser.gender_code) : '',
        kebangsaan: applicant?.nationality || '',
        alamatRumah: applicantUser?.address || '',
        kodePos: applicant?.zip_code || '',
        noTelpRumah: applicantUser?.contact || '',
        noTelpKantor: '',
        noTelpHP: applicantUser?.contact || '',
        email: '', // Tidak ada di interface User
        kualifikasiPendidikan: applicant?.last_education || '',
        namaPerusahaan: applicant?.institution?.name || '',
        jabatan: applicant?.position || '',
        alamatKantor: applicant?.jobs_address || '',
        kodePosKantor: applicant?.jobs_zip || '',
        noTelpKantorPerusahaan: applicant?.jobs_contact || '',
        faxKantor: applicant?.jobs_fax || '',
        emailKantor: applicant?.jobs_email || '',
      };

      // Bagian 2: Data Sertifikasi
      const bagian2 = {
        judulSkema: requirementData?.schema?.title || '',
        nomorSkema: requirementData?.schema?.code || '',
        tujuanAsesmen: {
          sertifikasi: partTwo.tujuanAsesmen.sertifikasi,
          pkt: partTwo.tujuanAsesmen.pkt,
          rpl: partTwo.tujuanAsesmen.rpl,
          lainnya: partTwo.tujuanAsesmen.lainnya,
        },
        unitKompetensi: (unitKompetensiData?.data || []).map((unit: any, index: number) => ({
          no: index + 1,
          kodeUnit: unit.competency_unit_code || '',
          judulUnit: unit.competency_unit_name || '',
          standarKompetensi: unit.competency_unit_skkni || '',
        })),
      };

      // Bagian 3: Bukti Kelengkapan
      const bagian3 = {
        buktiPersyaratanDasar: await Promise.all(
          (buktiDasarData?.data || []).map(async (req: any, index: number) => {
            const status = partTree.requirementsStatus[req.requirement_id];
            
            // Generate QR code untuk requirement_id
            let qrCodeDataUrl = '';
            let urlToQr = window.location.origin + `/requirement/file-list/${req.requirement_id}`;
            try {
              qrCodeDataUrl = await QRCode.toDataURL(urlToQr, {
                width: 150,
                margin: 1,
              });
            } catch (error) {
              console.error('Error generating QR code:', error);
            }
            
            return {
              no: index + 1,
              namaDokumen: req.requirement_name ? htmlToPlainText(req.requirement_name) : '',
              memenuhi: status === 'meets',
              tidakMemenuhi: status === 'not_meets',
              tidakAda: status === 'not_exists',
              file: qrCodeDataUrl,
            };
          })
        ),
        buktiAdministratif: await Promise.all(
          (buktiAdministratifData?.data || []).map(async (req: any, index: number) => {
            const status = partTree.requirementsStatus[req.requirement_id];
            
            // Generate QR code untuk requirement_id
            let urlToQr = window.location.origin + `/requirement/file-list/${req.requirement_id}`;
            let qrCodeDataUrl = '';
            try {
              qrCodeDataUrl = await QRCode.toDataURL(urlToQr, {
                width: 150,
                margin: 1,
              });
            } catch (error) {
              console.error('Error generating QR code:', error);
            }
            
            return {
              no: index + 1,
              namaDokumen: req.requirement_name ? htmlToPlainText(req.requirement_name) : '',
              memenuhi: status === 'meets',
              tidakMemenuhi: status === 'not_meets',
              tidakAda: status === 'not_exists',
              file: qrCodeDataUrl,
            };
          })
        ),
      };

      // Bagian 4: Rekomendasi & Tanda Tangan
      const bagian4 = {
        rekomendasi: {
          diterima: lastPart.rekomendasi === true,
          ditolak: lastPart.rekomendasi === false,
          belumDiisi: lastPart.rekomendasi === null,
          catatan: lastPart.catatan || '',
        },
        pemohon: {
          nama: applicantUser?.full_name || '',
          ttd: lastPart.ttdPemohon || '',
          tanggal: lastPart.tanggalPemohon ? dayjs(lastPart.tanggalPemohon).format('DD MMMM YYYY') : '',
        },
        adminLSP: {
          nama: '', // Akan diisi oleh admin
          ttd: '',
          tanggal: lastPart.tanggalAdminLSP ? dayjs(lastPart.tanggalAdminLSP).format('DD MMMM YYYY') : '',
        },
      };

      // Gabungkan semua data
      const payload = {
        ...bagian1,
        ...bagian2,
        ...bagian3,
        ...bagian4,
        template: "FR.APL.01_Template_Base", // Nama template yang akan digunakan untuk generate PDF
      };

      console.log('Preview Eform Payload:', payload);

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
      <div className="p-6">
        <div className="flex flex-col gap-6 w-full">
          <PartOne />
          <PartTwo />
          <PartTree />
          <LastPart />
        </div>
      </div>
    </>
  )
}
