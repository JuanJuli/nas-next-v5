import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { FileText, Folder, Link, Eye, FolderMinus } from 'lucide-react';
import dayjs from 'dayjs';
import BadgeAplStatus from '@/components/badge/ApplicantStatus';
import BadgeAsesmenState from '@/components/badge/AssessmentState';

export default function columns({
  handleLinkVirtual,
  handleReq,
  handleOpenNoteAsesmen,
  handleAppeal,
  handleDocumentAsesmen,
  handleSupDocumentApl,
  t,
}: {
  handleLinkVirtual(data: any): void;
  handleReq(id: string): void;
  handleOpenNoteAsesmen(data: string): void;
  handleAppeal(id: string, assessmentID: string): void;
  handleDocumentAsesmen(assessmentID: string, aaID: string): void;
  handleSupDocumentApl(id: string, activityState: string): void;
  t: (key: string) => string;
}): ColumnDef<any>[] {
  return [
    {
      id: 'u-title',
      header: t('asesmen'),
      accessorKey: 'title',
    },
    {
      id: 'name-schema',
      header: t('skema-sertifikasi'),
      accessorKey: 'schema_name',
    },
    {
      id: 'tuk-name',
      header: t('tuk'),
      accessorKey: 'tuk_name',
    },
    {
      id: 'u-address',
      header: t('alamat'),
      accessorKey: 'address',
    },
    {
      id: 'u-start-date',
      header: t('tanggal-asesmen'),
      accessorKey: 'start_date',
      cell: ({ row }) => {
        const value = row.getValue('start_date');
        if (!value) return '-';
        return dayjs(value as string).format('DD MMM YYYY');
      },
    },
    {
      id: 'u-link-virtual',
      header: t('btn-link-virtual'),
      accessorKey: 'link_assessment',
      cell: ({ row }) => {
        const value = row.getValue('link_assessment') as string;
        const record = row.original;
        if (!value && !record.link_pra_assessmen && !record.link_pleno) {
          return '-';
        }
        const dataLink: any = [];
        if (record.link_pra_assessmen) {
          dataLink.push({ id: 1, tipe: 'Pra Asesmen', link: record.link_pra_assessmen });
        }
        if (record.link_assessment) {
          dataLink.push({ id: 2, tipe: 'Asesmen', link: record.link_assessment });
        }
        if (record.link_pleno) {
          dataLink.push({ id: 3, tipe: 'Pleno', link: record.link_pleno });
        }
        return (
          <Button variant="outline" size="sm" onClick={() => handleLinkVirtual(dataLink)}>
            <Link className="mr-1 h-4 w-4" />
            {t('btn-link-virtual')}
          </Button>
        );
      },
    },
    {
      id: 'u-assessor_name',
      header: t('asesor'),
      accessorKey: 'assessment_applicant',
      cell: ({ row }) => {
        const record = row.original;
        if (record.last_activity_state === 'draft' || record.last_activity_state === 'pra_assessment') {
          return '-';
        }
        const value = row.getValue('assessment_applicant') as any;
        return value?.assessor_name || '-';
      },
    },
    {
      id: 'u-test_method',
      header: t('jenis-bukti'),
      accessorKey: 'assessment_applicant',
      cell: ({ row }) => {
        const value = row.getValue('assessment_applicant') as any;
        if (!value) return '-';
        if (value.test_method) {
          return value.test_method === 'portfolio' ? t('indirect') : t('direct');
        }
        return '-';
      },
    },
    {
      id: 'u-status_recomendation',
      header: t('rekomendasi'),
      accessorKey: 'assessment_applicant',
      cell: ({ row }) => {
        const value = row.getValue('assessment_applicant') as any;
        if (!value?.status_recomendation) return '-';
        return (
          <div className="flex flex-col gap-1">
            <BadgeAplStatus state={value.status_recomendation} />
            <Button
              onClick={() => handleOpenNoteAsesmen(value.description_for_recomendation || '-')}
              variant="link"
              size="sm"
              className="px-0"
            >
              <Eye className="mr-1 h-4 w-4" />
              {t('btn-lihat-catatan')}
            </Button>
          </div>
        );
      },
    },
    {
      id: 'u-status_graduation',
      header: t('status'),
      accessorKey: 'assessment_applicant',
      cell: ({ row }) => {
        const value = row.getValue('assessment_applicant') as any;
        if (!value?.status_graduation) return '-';
        return (
          <div className="flex flex-col gap-1">
            <BadgeAplStatus state={value.status_graduation} />
            <Button
              onClick={() => handleOpenNoteAsesmen(value.notes || '-')}
              variant="link"
              size="sm"
              className="px-0"
            >
              <Eye className="mr-1 h-4 w-4" />
              {t('btn-lihat-catatan')}
            </Button>
          </div>
        );
      },
    },
    {
      id: 'u-last-activity-state',
      header: t('status-asesmen'),
      accessorKey: 'last_activity_state',
      cell: ({ row }) => {
        const value = row.getValue('last_activity_state') as string;
        const record = row.original;
        if (!value) return '-';
        return (
          <div className="flex flex-col gap-1">
            <BadgeAsesmenState state={value} />
            {value !== 'draft' && record.notes && (
              <Button
                onClick={() => handleOpenNoteAsesmen(record.notes)}
                variant="link"
                size="sm"
              >
                <Eye className="mr-1 h-4 w-4" />
                {t('btn-lihat-catatan')}
              </Button>
            )}
          </div>
        );
      },
    },
    {
      id: 'action',
      header: t('aksi'),
      accessorKey: 'assessment_applicant',
      cell: ({ row }) => {
        const value = row.getValue('assessment_applicant') as any;
        const record = row.original;
        if (!value) return '-';

        let canAppeal = false;
        if (value.status_graduation && value.status_graduation != 'NONE' && value.graduation_date) {
          const graduationDate = dayjs(value.graduation_date).add(7, 'day');
          if (graduationDate.isAfter(dayjs())) {
            canAppeal = true;
          }
        }
        if (value.status_appealed) {
          canAppeal = false;
        }

        return (
          <div className="flex gap-1">
            <Button variant="default" size="icon" onClick={() => handleDocumentAsesmen(record.assessment_id, value.assessment_applicant_id)} title={t('title-surat-asesmen')}>
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" onClick={() => handleReq(value.assessment_applicant_id)} title={t('title-berkas-asesi')}>
              <Folder className="h-4 w-4" />
            </Button>
            {canAppeal && (
              <Button variant="default" size="sm" onClick={() => handleAppeal(value.assessment_applicant_id, record.assessment_id)}>
                {t('btn-ajukan-banding')}
              </Button>
            )}
            <Button variant="default" size="icon" onClick={() => handleSupDocumentApl(value.assessment_applicant_id, record.last_activity_state)} title={t('title-dokumen-pendukung')}>
              <FolderMinus className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];
}
