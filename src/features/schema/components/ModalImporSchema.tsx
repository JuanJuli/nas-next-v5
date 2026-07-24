'use client';

import { parseAPL02, SchemePreview } from "@/utils/parseApl02MasterData";
import { InboxOutlined } from "@ant-design/icons";
import { Modal, Spin, Upload } from "antd";
import { useTranslations } from 'next-intl';
import { useState } from "react";

const { Dragger } = Upload;

function mapToFormSchema(data: SchemePreview) {
  return {
    schema_code: data.number,
    schema_name: data.title,
    schema_license: undefined,
    schema_skkni: undefined,
    schema_year: undefined,
    competency_unit: data.units.map((unit, index) => ({
      competency_unit_code: unit.code,
      competency_unit_name: unit.title,
      sequence: unit.no,
      skk: `SKKNI Level ${index + 1}`,
      skk_year: "2025",
      critical_aspects: [],
      elements: unit.elements.map((element) => ({
        element_code: String(element.no),
        element_name: element.name,
        kuks: element.kuks.map((kuk) => ({
          kuk_code: kuk.code,
          kuk_name: kuk.description,
        })),
      })),
    })),
  };
}

export default function ModalImporSchema({ open, onClose, onImport }: { open: boolean, onClose: () => void, onImport?: (data: any) => void }) {
  const [loading, setLoading] = useState(false);
  const tc = useTranslations('common');
  
  const handleUpload = async (file: File) => {
    setLoading(true);
    const result = await parseAPL02(file);

    console.log('Parsed APL02 Result:', result);

    const formData = mapToFormSchema(result);
    onImport?.(formData);
    onClose();
    setLoading(false);
    return false;
  }

  return (
    <Modal open={open} onCancel={onClose} title={tc('btn-import-skema')} footer={null}>
      {/* Form Input File Dragger Antd */}
      <Spin description={tc('loading')} size="small" spinning={loading}>
        <Dragger
          name="file"
          multiple={false}
          accept=".doc,.docx"
          customRequest={({ file }) => handleUpload(file as File)}
          showUploadList={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{tc('label-upload-click-drag')}</p>
          <p className="ant-upload-hint">
            {tc('label-upload-click-drag')}
          </p>
        </Dragger>
      </Spin>
    </Modal>
  )
}
