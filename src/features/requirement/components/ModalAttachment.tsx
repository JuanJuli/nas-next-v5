'use client';

import UniversalPreviewFile from "@/components/preview_file/UniversalPreviewFile";
import { usePost } from "@/hooks/useMutate";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useModalAttachmentStore } from "@/store/modalAttachment";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Flex, Modal, Space } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect } from "react";
import { useTranslations } from 'next-intl';

export default function ModalAttachmentRequirement() {
  const t = useTranslations('common');
  const { open, requirementID, setOpen, setRequirementID, setRequirementFiles, requirementFiles } = useModalAttachmentStore((state) => state)

  useEffect(() => {
    function setupOpen() {
      if (requirementID) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }

    setupOpen();
  }, [requirementID])

  useEffect(() => {
    function setupState() {
      if (!open) {
        setRequirementID("");
        setRequirementFiles([]);
      }
    }

    setupState();
  }, [open])
  
  const addDocument = usePost(`core/requirements/${requirementID}/file`);
  const dataRequirement = useTableQuery(`core/requirements/${requirementID ?? ""}`, {}, {}, !!requirementID);

  useEffect(() => {
    if (dataRequirement.data && dataRequirement.data.status === "OK" && dataRequirement.data.data) {
      const dataReq = dataRequirement.data.data;
      if (dataReq.requirement_file) {
        setRequirementFiles(dataReq.requirement_file);
      }
    }
  }, [dataRequirement.data]);

  const handleUpload = async (options: any) => {
    const { file } = options;
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      await addDocument.mutateAsync(formData).then(() => {
        dataRequirement.refetch();
      }).catch((err) => {
        console.error("Error uploading file:", err);
      });
    }
  }

  return (
  <Modal
    open={open}
    onCancel={() => setOpen(false)}
    title={t('btn-lampiran-file')}
    cancelText={t('btn-tutup')}
    okButtonProps={{ className: 'hidden' }}
  >
    <Flex className="w-full mb-2">
      <Dragger className="w-full" customRequest={handleUpload} showUploadList={false} accept=".jpeg,.jpg,.png">
        <p className="ant-upload-drag-icon mb-5">
          <CloudUploadOutlined />
        </p>
        <p className="ant-upload-text mb-0 pb-0">{t('label-upload-click-drag')}</p>
        <small className="mt-0 pt-0">{t('upload-hint')}</small>
      </Dragger>
    </Flex>
    <Space vertical className="w-full mt-3! mb-1!">
      {/* Preview File */}
      {requirementFiles.map((file) => (
        <UniversalPreviewFile
          key={file.row_id}
          url={file.form_value}
          fileName={file.filename}
        />
      ))}
    </Space>
  </Modal>
  )
}
