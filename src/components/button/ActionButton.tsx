'use client';

import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

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
  const { onEdit, onDelete, onDetail, id, disableDelete = false, customDetail, simple = false } = props;
  return (
    <>
      {onEdit && (
        <Button
          className={`${simple ? '' : 'w-[100px]'} btn-w-icon`}
          onClick={() => onEdit(id)}
          icon={<EditOutlined className="min-w-[15px]" />}
          title="Ubah"
        >
          {simple ? '' : 'Ubah'}
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
              title="Detail"
              icon={<EyeOutlined className="min-w-[15px]" />}
            >
              {simple ? '' : 'Detail'}
            </Button>
          )}
        </>
      )}
      {onDelete && !disableDelete && (
        <Button
          className={`${simple ? '' : 'w-[110px]'} btn-w-icon`}
          onClick={() => onDelete(id)}
          title="Hapus"
          danger
          icon={<DeleteOutlined className="min-w-[15px]" />}
        >
          {simple ? '' : 'Hapus'}
        </Button>
      )}
    </>
  );
};

export default ActionButtonTable;
