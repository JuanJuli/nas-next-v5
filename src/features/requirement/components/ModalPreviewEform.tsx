"use client";

import { Modal, Spin, Button } from "antd";
import { CloseOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useModalPreviewEformStore } from "@/store/modalPreviewEform";
import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

export default function ModalPreviewEform() {
  const { isOpen, pdfUrl, isLoading, closeModal, reset, formName } = useModalPreviewEformStore();
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    // Cleanup URL ketika modal ditutup
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

    // Create temporary link element to trigger download
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
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              icon={<RightOutlined />}
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              Next
            </Button>
          </>
        )}
      </div>
      <div className="flex gap-2">
        <Button 
          icon={<CloseOutlined />} 
          onClick={handleClose}
        >
          Tutup
        </Button>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleDownload}
          disabled={!pdfUrl || isLoading}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      title={`Preview E-Form${formName ? ` - ${formName}` : ''}`}
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
          <Spin size="large" description="Generating PDF..." />
        </div>
      ) : pdfUrl ? (
        <div className="flex flex-col items-center justify-center h-full overflow-auto">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center p-8">
                <Spin size="large" description="Loading PDF..." />
              </div>
            }
            error={
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <p className="text-red-500 mb-2">Failed to load PDF</p>
                  <p className="text-gray-500 text-sm">Please try again or download the file</p>
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
          <p className="text-gray-500">No PDF to display</p>
        </div>
      )}
    </Modal>
  );
}
