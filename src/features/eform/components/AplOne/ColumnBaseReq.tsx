import { UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, type TableColumnsType } from 'antd';

interface ColumnBaseReqParams {
  currentPage: number;
  handleAttachment: (requirementID: string) => void;
  requirementsStatus: Record<string, 'meets' | 'not_meets' | 'not_exists'>;
  setRequirementStatus: (requirementId: string, status: 'meets' | 'not_meets' | 'not_exists') => void;
}

export default function columnBaseReq({ 
  currentPage, 
  handleAttachment, 
  requirementsStatus, 
  setRequirementStatus 
}: ColumnBaseReqParams) {
  const handleCheckboxChange = (requirementId: string, status: 'meets' | 'not_meets' | 'not_exists') => {
    setRequirementStatus(requirementId, status);
  };
  const column: TableColumnsType<any> = [
    {
      title: 'No.',
      dataIndex: 'requirement_id',
      key: 'u-requirement_id',
      width: 80,
      render: (value: any, record: any, index: number) => {
        // Menghitung nomor berdasarkan halaman saat ini dan indeks baris
        const rowNumber = (currentPage - 1) * 10 + index + 1;
        return rowNumber;
      }
    },
    {
      title: 'Bukti Persyaratan Dasar',
      dataIndex: 'requirement_name',
      key: 'u-requirement_name',
      render: (value: any) => {
        if (value) return <div dangerouslySetInnerHTML={{ __html: value }} />;
        return '-';
      },
    },
    {
      title: 'File',
      dataIndex: 'requirement_id',
      key: 'u-requirement_id',
      render: (value: any) => {
        if (value) return <Button icon={<UploadOutlined />} onClick={() => handleAttachment(value)}>Lampiran File</Button>;
        return '-';
      },
    },
    {
      title: 'Ada',
      children: [
        {
            title: 'Memenuhi Syarat',
            dataIndex: 'requirement_id',
            width: 180,
            key: 'u-requirement_id_meets',
            render: (value: any) => {
              return (
                <div className="h-full flex items-center justify-center">
                  <Checkbox 
                    checked={requirementsStatus[value] === 'meets'}
                    onChange={() => handleCheckboxChange(value, 'meets')}
                  />
                </div>
              );
            },
        },
        {
            title: 'Tidak Memenuhi Syarat',
            dataIndex: 'requirement_id',
            width: 210,
            key: 'u-requirement_id_not_meets',
            render: (value: any) => {
              return (
                <div className="h-full flex items-center justify-center">
                  <Checkbox 
                    checked={requirementsStatus[value] === 'not_meets'}
                    onChange={() => handleCheckboxChange(value, 'not_meets')}
                  />
                </div>
              );
            }
        }
      ]
    },
    {
      title: 'Tidak Ada',
      dataIndex: 'requirement_id',
      width: 120,
      key: 'u-requirement_id_not_exists',
      render: (value: any) => {
        return (
          <div className="flex items-center justify-center">
            <Checkbox 
              checked={requirementsStatus[value] === 'not_exists'}
              onChange={() => handleCheckboxChange(value, 'not_exists')}
            />
          </div>
        );
      },
    },
  ];

  return column;
}
