'use client';

import { Requirement } from '@/types/requirement';
import { UploadOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Checkbox, type TableColumnsType } from 'antd';
import { Element } from '@/types/schema';
import { EformApl2State } from '@/store/eformApl2';

interface ColumnListElementProps {
  handleAttachment: (requirementID: string) => void;
  expandedElements: Set<string>;
  toggleElement: (elementId: string) => void;
  partTwo: EformApl2State['partTwo'];
  setRequirementAssessment: (requirementId: string, assessment: 'k' | 'bk' | null) => void;
}

export default function columnListElement({ 
  handleAttachment,
  expandedElements,
  toggleElement,
  partTwo,
  setRequirementAssessment
}: ColumnListElementProps) {

  const column: TableColumnsType<Requirement> = [
    {
      title: 'Dapatkah Saya ?',
      dataIndex: 'element',
      key: 'u-element_name',
      render: (value: Element, record: Requirement, index: number) => {
        if (!value || !value.element_name) return '-';
        const isExpanded = expandedElements.has(value.element_id);
        const hasKuks = value.kuks && value.kuks.length > 0;
        
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {index + 1}. Element: <span className="font-bold">{value.element_name}</span>
              </span>
              {hasKuks && (
                <Button
                  type="text"
                  size="small"
                  icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                  onClick={() => toggleElement(value.element_id)}
                  className="text-blue-500"
                >
                  {isExpanded ? 'Tutup' : 'Tampilkan'} KUK
                </Button>
              )}
            </div>
            {hasKuks && isExpanded && (
              <div className="ml-4 space-y-1 bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-600">Kriteria Unjuk Kerja:</div>
                <ul className="list-disc list-inside space-y-1">
                  {value.kuks.map((kuk) => (
                    <li key={kuk.kuk_id} className="text-sm text-gray-700">
                      {kuk.kuk_code && <span className="font-medium">{kuk.kuk_code}:</span>} {kuk.kuk_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      }
    },
    {
      title: 'K',
      align: 'center',
      dataIndex: 'requirement_id',
      key: 'u-k',
      width: 100,
      render: (requirementId: string) => {
        const isChecked = partTwo.requirementsAssessment[requirementId] === 'k';
        return (
          <div className="flex items-center justify-center">
            <Checkbox 
              checked={isChecked}
              onChange={(e) => {
                if (e.target.checked) {
                  setRequirementAssessment(requirementId, 'k');
                } else {
                  setRequirementAssessment(requirementId, null);
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: 'BK',
      align: 'center',
      dataIndex: 'requirement_id',
      key: 'u-bk',
      width: 100,
      render: (requirementId: string) => {
        const isChecked = partTwo.requirementsAssessment[requirementId] === 'bk';
        return (
          <div className="flex items-center justify-center">
            <Checkbox 
              checked={isChecked}
              onChange={(e) => {
                if (e.target.checked) {
                  setRequirementAssessment(requirementId, 'bk');
                } else {
                  setRequirementAssessment(requirementId, null);
                }
              }}
            />
          </div>
        );
      },
    },
    {
      title: 'Bukti yang relavan',
      dataIndex: 'requirement_id',
      key: 'u-requirement_id',
      width: 200,
      render: (value: any) => {
        if (value) return <Button icon={<UploadOutlined />} onClick={() => handleAttachment(value)}>Lampiran File</Button>;
        return '-';
      },
    },
  ];

  return column;
}