'use client';

import { Pencil, Eye, Trash2 } from 'lucide-react';
import { Button } from 'antd';
import React from 'react';
import { useTranslations } from 'next-intl';

interface IPropsActionBtnTable {
  id: string;
  onEdit?(id: any): void;
  onDelete?(id: string): void;
  onDetail?(id: string): void;
  disableDelete?: boolean;
  simple?: boolean;
  customDetail?: React.ReactNode;
}

const ActionButtonTable = (props: IPropsActionBtnTable) => {
  const t = useTranslations('common');
  const { onEdit, onDelete, onDetail, id, disableDelete = false, customDetail, simple = false } = props;
  return (
    <>
      {onEdit && (
        <Button
          className={`${simple ? '' : 'w-[100px]'} btn-w-icon`}
          onClick={() => onEdit(id)}
          icon={<Pencil className="min-w-[15px]" />}
          title={t('btn-edit')}
        >
          {simple ? '' : t('btn-edit')}
        </Button>
      )}
      {onDetail && (
        <>
          {customDetail ? (
            customDetail
          ) : (
            <Button
              className={`${simple ? '' : 'w-[105px]'} btn-w-icon`}
              onClick={() => onDetail(id)}
              title={t('btn-detail')}
              icon={<Eye className="min-w-[15px]" />}
            >
              {simple ? '' : t('btn-detail')}
            </Button>
          )}
        </>
      )}
      {onDelete && !disableDelete && (
        <Button
          className={`${simple ? '' : 'w-[110px]'} btn-w-icon`}
          onClick={() => onDelete(id)}
          title={t('btn-delete')}
          danger
          icon={<Trash2 className="min-w-[15px]" />}
        >
          {simple ? '' : t('btn-delete')}
        </Button>
      )}
    </>
  );
};

export default ActionButtonTable;
