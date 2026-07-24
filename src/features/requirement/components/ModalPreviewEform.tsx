"use client";

import { Modal, Spin, Button } from "antd";
import { CloseOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useModalPreviewEformStore } from "@/store/modalPreviewEform";
import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useTranslations } from 'next-intl';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function ModalPreviewEform() {
  const t = useTranslations('common');
  const { isOpen, pdfUrl, isLoading, closeModal, reset, formName } = useModalPreviewEformStore();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  const handleClose = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    setPageNumber(1);
    reset();
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const handleDownload = () => {
    if (!pdfUrl) return;

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${formName || 'E-Form'}_${new Date().getTime()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalFooter = (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {pdfUrl && !isLoading && numPages > 0 && (
          <>
            <Button
              icon={<LeftOutlined />}
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              {t('previous')}
            </Button>
            <span className="text-sm text-gray-600">
              {t('page-of', { n: pageNumber, total: numPages })}
            </span>
            <Button
              icon={<RightOutlined />}
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              {t('next')}
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          icon={<CloseOutlined />} 
          onClick={handleClose}
        >
          {t('btn-tutup')}
        </Button>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleDownload}
          disabled={!pdfUrl || isLoading}
        >
          {t('btn-download-pdf')}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      title={`${t('title-preview-eform')}${formName ? ` - ${formName}` : ''}`}
      open={isOpen}
      onCancel={handleClose}
      footer={modalFooter}
      width="85%"
      style={{ top: 20 }}
      styles={{
        body: {
          height: 'calc(100vh - 200px)',
          padding: 0,
        },
      }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <Spin size="large" description={t('generating-pdf')} />
        </div>
      ) : pdfUrl ? (
        <div className="flex flex-col items-center justify-center h-full overflow-auto">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center p-8">
                <Spin size="large" description={t('loading-pdf')} />
              </div>
            }
            error={
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-red-500 mb-2">{t('failed-load-pdf')}</p>
                  <p className="text-gray-500 text-sm">{t('failed-load-pdf-desc')}</p>
                </div>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="shadow-lg"
            />
          </Document>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">{t('no-pdf-to-display')}</p>
        </div>
      )}
    </Modal>
  );
}
