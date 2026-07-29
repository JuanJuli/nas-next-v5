import { ColumnDef } from '@tanstack/react-table';
import { Requirement } from '@/types/requirement';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { Element } from '@/types/schema';
import { EformApl2State } from '@/store/eformApl2';
import { useTranslations } from 'next-intl';

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
}: ColumnListElementProps): ColumnDef<Requirement>[] {
  const t = useTranslations('form');
  const tc = useTranslations('common');

  return [
    {
      id: 'element_name',
      header: t('label-dapatkah-saya'),
      cell: ({ row }) => {
        const value = row.original.element;
        const index = row.index;
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
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleElement(value.element_id)}
                  className="text-blue-500"
                >
                  {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  {isExpanded ? t('label-tutup-kuk') : t('label-tampilkan-kuk')} KUK
                </Button>
              )}
            </div>
            {hasKuks && isExpanded && (
              <div className="ml-4 space-y-1 bg-gray-50 p-3 rounded">
                <div className="text-sm font-medium text-gray-600">{t('label-kriteria-unjuk-kerja')}</div>
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
      id: 'k',
      header: t('label-k'),
      cell: ({ row }) => {
        const requirementId = row.original.requirement_id;
        const isChecked = partTwo.requirementsAssessment[requirementId] === 'k';
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                setRequirementAssessment(requirementId, checked ? 'k' : null);
              }}
            />
          </div>
        );
      },
    },
    {
      id: 'bk',
      header: t('label-bk'),
      cell: ({ row }) => {
        const requirementId = row.original.requirement_id;
        const isChecked = partTwo.requirementsAssessment[requirementId] === 'bk';
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                setRequirementAssessment(requirementId, checked ? 'bk' : null);
              }}
            />
          </div>
        );
      },
    },
    {
      id: 'bukti_relevan',
      header: t('label-bukti-relevan'),
      cell: ({ row }) => {
        const value = row.original.requirement_id;
        if (value) return <Button variant="outline" size="sm" onClick={() => handleAttachment(value)}><Upload />{tc('btn-lampiran-file')}</Button>;
        return '-';
      },
    },
  ];
}
