import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload } from "lucide-react";
import { useTranslations } from 'next-intl';

interface ColumnBaseReqParams {
  handleAttachment: (requirementID: string) => void;
  requirementsStatus: Record<string, 'meets' | 'not_meets' | 'not_exists'>;
  setRequirementStatus: (requirementId: string, status: 'meets' | 'not_meets' | 'not_exists') => void;
}

export default function columnBaseReq({
  handleAttachment,
  requirementsStatus,
  setRequirementStatus
}: ColumnBaseReqParams): ColumnDef<any>[] {
  const tc = useTranslations('common');

  const handleCheckboxChange = (requirementId: string, status: 'meets' | 'not_meets' | 'not_exists') => {
    setRequirementStatus(requirementId, status);
  };

  return [
    {
      id: 'no',
      header: tc('label-no'),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'requirement_name',
      header: tc('label-persyaratan-dasar'),
      cell: ({ row }) => {
        const value = row.getValue('requirement_name');
        if (value) return <div dangerouslySetInnerHTML={{ __html: value }} />;
        return '-';
      },
    },
    {
      id: 'file',
      header: tc('label-file'),
      cell: ({ row }) => {
        const id = row.original.requirement_id;
        if (id) return <Button variant="outline" size="sm" onClick={() => handleAttachment(id)}><Upload />{tc('btn-lampiran-file')}</Button>;
        return '-';
      },
    },
    {
      id: 'meets',
      header: tc('label-memenuhi-syarat'),
      cell: ({ row }) => {
        const id = row.original.requirement_id;
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={requirementsStatus[id] === 'meets'}
              onCheckedChange={() => handleCheckboxChange(id, 'meets')}
            />
          </div>
        );
      },
    },
    {
      id: 'not_meets',
      header: tc('label-tidak-memenuhi-syarat'),
      cell: ({ row }) => {
        const id = row.original.requirement_id;
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={requirementsStatus[id] === 'not_meets'}
              onCheckedChange={() => handleCheckboxChange(id, 'not_meets')}
            />
          </div>
        );
      },
    },
    {
      id: 'not_exists',
      header: tc('label-tidak-ada'),
      cell: ({ row }) => {
        const id = row.original.requirement_id;
        return (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={requirementsStatus[id] === 'not_exists'}
              onCheckedChange={() => handleCheckboxChange(id, 'not_exists')}
            />
          </div>
        );
      },
    },
  ];
}
