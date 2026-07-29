"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { X, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useModalPreviewEformStore } from "@/store/modalPreviewEform";
import { useEffect, useState } from "react";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { useTranslations } from 'next-intl';

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose() }}>
      <DialogContent className="max-w-[85vw] top-5 !translate-y-0" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <DialogTitle>{`${t('title-preview-eform')}${formName ? ` - ${formName}` : ''}`}</DialogTitle>
        <div className="flex-1 overflow-auto p-0" style={{ height: 'calc(100vh - 280px)' }}>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <Skeleton className="h-8 w-64" />
              <p className="text-sm text-muted-foreground">{t('generating-pdf')}</p>
            </div>
          ) : pdfUrl ? (
            <div className="flex flex-col items-center justify-center h-full overflow-auto">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex flex-col items-center justify-center p-8 gap-4">
                    <Skeleton className="h-8 w-48" />
                    <p className="text-sm text-muted-foreground">{t('loading-pdf')}</p>
                  </div>
                }
                error={
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <p className="text-red-500 mb-2">{t('failed-load-pdf')}</p>
                      <p className="text-muted-foreground text-sm">{t('failed-load-pdf-desc')}</p>
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
              <p className="text-muted-foreground">{t('no-pdf-to-display')}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              {pdfUrl && !isLoading && numPages > 0 && (
                <>
                  <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={pageNumber <= 1}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    {t('previous')}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {t('page-of', { n: pageNumber, total: numPages })}
                  </span>
                  <Button variant="outline" size="sm" onClick={goToNextPage} disabled={pageNumber >= numPages}>
                    {t('next')}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleClose}>
                <X className="mr-1 h-4 w-4" />
                {t('btn-tutup')}
              </Button>
              <Button variant="default" size="sm" onClick={handleDownload} disabled={!pdfUrl || isLoading}>
                <Download className="mr-1 h-4 w-4" />
                {t('btn-download-pdf')}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
