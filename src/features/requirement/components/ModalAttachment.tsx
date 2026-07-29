'use client';

import UniversalPreviewFile from "@/components/preview_file/UniversalPreviewFile";
import { usePost } from "@/hooks/useMutate";
import { useTableQuery } from "@/hooks/useTableQuery";
import { useModalAttachmentStore } from "@/store/modalAttachment";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
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

  const handleFileDrop = async (files: File[]) => {
    for (const file of files) {
      const formData = new FormData();
      formData.append('files', file);

      try {
        await addDocument.mutateAsync(formData)
        dataRequirement.refetch()
      } catch (err) {
        console.error("Error uploading file:", err)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) setOpen(false) }}>
      <DialogContent>
        <DialogTitle>{t('btn-lampiran-file')}</DialogTitle>
        <div className="w-full mb-2">
          <FileUpload
            onDrop={handleFileDrop}
            accept={{ 'image/jpeg': ['.jpeg', '.jpg'], 'image/png': ['.png'] }}
          >
            <div className="flex flex-col items-center gap-2">
              <p className="ant-upload-text mb-0 pb-0">{t('label-upload-click-drag')}</p>
              <small className="mt-0 pt-0 text-muted-foreground">{t('upload-hint')}</small>
            </div>
          </FileUpload>
        </div>
        <div className="flex flex-col w-full gap-2">
          {requirementFiles.map((file) => (
            <UniversalPreviewFile
              key={file.row_id}
              url={file.form_value}
              fileName={file.filename}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
