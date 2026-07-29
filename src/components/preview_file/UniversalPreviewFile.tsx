'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Eye, Trash2, File, FileText, ImageIcon, FileSpreadsheet, Monitor } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

if (typeof window !== 'undefined') {
  import('react-pdf').then((pdfjs) => {
    pdfjs.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.pdfjs.version}/build/pdf.worker.min.mjs`;
  });
}

interface UniversalPreviewFileProps {
  url: string;
  fileName?: string;
  onDelete?: () => void;
  view?: React.ReactNode;
}

type FileType = 'image' | 'pdf' | 'office' | 'unknown';

const UniversalPreviewFile: React.FC<UniversalPreviewFileProps> = ({
  url,
  fileName,
  onDelete,
  view,
}) => {
  const t = useTranslations('common');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getFileNameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
      return decodeURIComponent(filename) || 'file';
    } catch {
      const parts = url.split('/');
      const filename = parts[parts.length - 1].split('?')[0];
      return decodeURIComponent(filename) || 'file';
    }
  };

  const displayFileName = useMemo(() => {
    let currentFileName = fileName || getFileNameFromUrl(url);
    
    if (currentFileName) {
      const parts = currentFileName.split('_');
      if (parts.length > 1 && parts[0].length === 36) {
        return parts.slice(1).join('_');
      }
      return currentFileName;
    }
    return currentFileName;
  }, [fileName, url]);

  const getFileType = (filename: string): FileType => {
    const ext = filename.toLowerCase().split('.').pop() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) {
      return 'image';
    }
    
    if (ext === 'pdf') {
      return 'pdf';
    }
    
    if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext)) {
      return 'office';
    }
    
    return 'unknown';
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) {
      return <ImageIcon className="text-blue-500 h-5 w-5" />;
    }
    
    if (ext === 'pdf') {
      return <FileText className="text-red-500 h-5 w-5" />;
    }
    
    if (['doc', 'docx'].includes(ext)) {
      return <FileText className="text-blue-600 h-5 w-5" />;
    }
    
    if (['xls', 'xlsx'].includes(ext)) {
      return <FileSpreadsheet className="text-green-600 h-5 w-5" />;
    }
    
    if (['ppt', 'pptx'].includes(ext)) {
      return <Monitor className="text-orange-600 h-5 w-5" />;
    }
    
    return <File className="text-muted-foreground h-5 w-5" />;
  };

  const fileType = getFileType(displayFileName);

  const handlePreview = () => {
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const renderPreviewContent = () => {
    switch (fileType) {
      case 'image':
        return (
          <div className="flex justify-center items-center pt-2">
            <img
              src={url}
              alt={displayFileName}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        );
      
      case 'pdf':
        if (!isMounted) {
          return <div className="text-center p-4">{t('loading-pdf')}</div>;
        }
        return (
          <div className="flex flex-col items-center">
            <div className="mb-4 flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
              >
                {t('previous')}
              </Button>
              <span className="text-sm text-muted-foreground">
                {t('page-of', { n: pageNumber, total: numPages })}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                disabled={pageNumber >= numPages}
              >
                {t('next')}
              </Button>
            </div>
            <div className="overflow-auto max-h-[60vh]">
              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div className="text-center p-4">{t('loading-pdf')}</div>}
                error={<div className="text-center p-4 text-red-500">{t('failed-load-pdf')}</div>}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </div>
          </div>
        );
      
      case 'office':
        return (
          <div className="w-full h-[70vh]">
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`}
              className="w-full h-full border-0"
              title={displayFileName}
            />
          </div>
        );
      
      default:
        return (
          <div className="text-center p-8">
            <p className="text-muted-foreground">{t('preview-not-available')}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {t('download-file')}
            </a>
          </div>
        );
    }
  };

  return (
    <>
      {view && (
        <div onClick={handlePreview}>
          {view}
        </div>
      )}

      {!view && (
        <div className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-blue-400 transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getFileIcon(displayFileName)}
            <span className="truncate text-sm font-medium text-foreground">
              {displayFileName}
            </span>
          </div>
          
          <div className="flex items-center gap-2 ml-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePreview}
              title={t('btn-preview')}
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                title={t('btn-delete')}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
        </div>
      )}

      {isMounted && (
        <Dialog open={previewVisible} onOpenChange={(open) => { if (!open) handleClosePreview() }}>
          <DialogContent className={fileType === 'image' ? 'max-w-[700px]' : 'max-w-[900px]'}>
            <DialogTitle>{displayFileName}</DialogTitle>
            {renderPreviewContent()}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default UniversalPreviewFile;
