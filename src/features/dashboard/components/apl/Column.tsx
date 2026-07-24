import { Button, Space, Tooltip, type TableColumnsType } from 'antd';
import { FileTextOutlined, FolderOutlined, LinkOutlined, ReadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import BadgeAplStatus from '@/components/badge/ApplicantStatus';
import BadgeAsesmenState from '@/components/badge/AssessmentState';
import { FolderMinus } from 'lucide-react';

export default function columns({
  handleLinkVirtual,
  handleReq,
  handleOpenNoteAsesmen,
  handleAppeal,
  handleDocumentAsesmen,
  handleSupDocumentApl,
}: {
  handleLinkVirtual(data: any): void;
  handleReq(id: string): void;
  handleOpenNoteAsesmen(data: string): void;
  handleAppeal(id: string, assessmentID: string): void;
  handleDocumentAsesmen(assessmentID: string, aaID: string): void;
  handleSupDocumentApl(id: string, activityState: string): void;
}) {
  const column: TableColumnsType<any> = [
    {
      title: 'Asesmen',
      dataIndex: 'title',
      key: 'u-title',
    },
    {
      title: 'Skema Sertifikasi',
      dataIndex: 'schema_name',
      key: 'name-schema',
    },
    {
      title: 'TUK',
      dataIndex: 'tuk_name',
      key: 'tuk-name',
    },
    {
      title: 'Alamat',
      dataIndex: 'address',
      key: 'u-address',
    },
    {
      title: 'Tanggal Asesmen',
      dataIndex: 'start_date',
      key: 'u-start-date',
      render: value => {
        if (!value) return '-';

        return dayjs(value).format('DD MMM YYYY');
      },
    },
    {
      title: 'Link Virtual Meeting',
      dataIndex: 'link_assessment',
      key: 'u-link-virtual',
      width: 200,
      render: (value: string, record: any) => {
        if (!value && !record.link_pra_assessmen && !record.link_pleno) {
          return '-';
        }

        const dataLink: any = [];
        if (record.link_pra_assessmen) {
          dataLink.push({
            id: 1,
            tipe: 'Pra Asesmen',
            link: record.link_pra_assessmen,
          });
        }

        if (record.link_assessment) {
          dataLink.push({
            id: 2,
            tipe: 'Asesmen',
            link: record.link_assessment,
          });
        }

        if (record.link_pleno) {
          dataLink.push({ id: 3, tipe: 'Pleno', link: record.link_pleno });
        }

        return (
          <Button onClick={() => handleLinkVirtual(dataLink)} icon={<LinkOutlined style={{ fontSize: '16px' }} />}>
            Link Virtual Meeting
          </Button>
        );
      },
    },
    {
      title: 'Asesor',
      dataIndex: 'assessment_applicant',
      key: 'u-assessor_name',
      render: (value: any, record: any) => {
        if (record.last_activity_state === 'draft' || record.last_activity_state === 'pra_assessment') {
          return '-';
        }
        return value.assessor_name || '-';
      },
    },
    {
      title: 'Jenis Bukti',
      dataIndex: 'assessment_applicant',
      key: 'u-test_method',
      render: value => {
        if (!value) return '-';

        if (value.test_method) {
          return value.test_method === 'portfolio' ? 'Tidak Langsung' : 'Langsung';
        }

        return '-';
      },
    },
    {
      title: 'Rekomendasi',
      dataIndex: 'assessment_applicant',
      key: 'u-status_recomendation',
      render: (value: any) => {
        if (!value) return '-';

        if (value.status_recomendation) {
          return (
            <Space orientation="vertical">
              <BadgeAplStatus state={value.status_recomendation} />
              <Button
                onClick={() =>
                  handleOpenNoteAsesmen(value.description_for_recomendation ? value.description_for_recomendation : '-')
                }
                type="link"
                size="small"
                icon={<ReadOutlined />}
              >
                Lihat Catatan
              </Button>
            </Space>
          );
        }

        return '-';
      },
    },
    {
      title: 'Status',
      dataIndex: 'assessment_applicant',
      key: 'u-status_graduation',
      render: (value: any) => {
        if (!value) return '-';

        if (value.status_graduation) {
          return (
            <Space orientation="vertical">
              <BadgeAplStatus state={value.status_graduation} />
              <Button
                onClick={() => handleOpenNoteAsesmen(value.notes ? value.notes : '-')}
                type="link"
                className="px-0"
                size="small"
                icon={<ReadOutlined />}
              >
                Lihat Catatan
              </Button>
            </Space>
          );
        }

        return '-';
      },
    },
    {
      title: 'Status Asesmen',
      dataIndex: 'last_activity_state',
      key: 'u-last-activity-state',
      width: '190px',
      render: (value: string, record: any) => {
        if (!value) return '-';

        return (
          <Space orientation="vertical">
            <BadgeAsesmenState state={value} />
            {value !== 'draft' && record.notes && (
              <Button
                onClick={() => handleOpenNoteAsesmen(record.notes)}
                type="link"
                size="small"
                icon={<ReadOutlined />}
              >
                Lihat Catatan
              </Button>
            )}
          </Space>
        );
      },
    },
    {
      title: 'Aksi',
      dataIndex: 'assessment_applicant',
      key: 'action',
      width: '270px',
      render: (value: any, record: any) => {
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
          <Space>
            <Tooltip placement="bottom" title="Surat Asesmen">
              <Button
                type="primary"
                onClick={() => handleDocumentAsesmen(record.assessment_id, value.assessment_applicant_id)}
                icon={<FileTextOutlined style={{ fontSize: '16px' }} />}
              />
            </Tooltip>
            <Tooltip placement="bottom" title="Berkas Asesi">
              <Button type="primary" onClick={() => handleReq(value.assessment_applicant_id)} icon={<FolderOutlined style={{ fontSize: '16px' }} />} />
            </Tooltip>
            {canAppeal && (
              <Button type="primary" onClick={() => handleAppeal(value.assessment_applicant_id, record.assessment_id)}>
                Ajukan Banding
              </Button>
            )}
            <Tooltip placement="bottom" title="Dokumen Pendukung">
              <Button
                type="primary"
                onClick={() => handleSupDocumentApl(value.assessment_applicant_id, record.last_activity_state)}
                icon={<FolderMinus size={16} />}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return column;
}
