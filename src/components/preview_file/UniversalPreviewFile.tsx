'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Modal, Button, Image } from 'antd';
import { EyeOutlined, DeleteOutlined, FileOutlined, FilePdfOutlined, FileImageOutlined, FileWordOutlined, FileExcelOutlined, FilePptOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Dynamically import react-pdf components with no SSR
const Document = dynamic(
  () => import('react-pdf').then((mod) => mod.Document),
  { ssr: false }
);

const Page = dynamic(
  () => import('react-pdf').then((mod) => mod.Page),
  { ssr: false }
);

// Configure PDF.js worker on client side only
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

  // Ensure component only renders on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Extract filename from URL if fileName is empty
  const getFileNameFromUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
      return decodeURIComponent(filename) || 'file';
    } catch {
      // If URL parsing fails, try simple split
      const parts = url.split('/');
      const filename = parts[parts.length - 1].split('?')[0];
      return decodeURIComponent(filename) || 'file';
    }
  };

  const displayFileName = useMemo(() => {
    // pisahkan _ dari nama file untuk mendapatkan nama file yang lebih bersih
    // cek jika index 0 lengthnya = 36 (panjang UUID), maka hapus index 0 dan gabungkan sisanya
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

  // Detect file type based on extension
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

  // Get appropriate icon based on file extension
  const getFileIcon = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'].includes(ext)) {
      return <FileImageOutlined className="text-blue-500 text-xl" />;
    }
    
    if (ext === 'pdf') {
      return <FilePdfOutlined className="text-red-500 text-xl" />;
    }
    
    if (['doc', 'docx'].includes(ext)) {
      return <FileWordOutlined className="text-blue-600 text-xl" />;
    }
    
    if (['xls', 'xlsx'].includes(ext)) {
      return <FileExcelOutlined className="text-green-600 text-xl" />;
    }
    
    if (['ppt', 'pptx'].includes(ext)) {
      return <FilePptOutlined className="text-orange-600 text-xl" />;
    }
    
    return <FileOutlined className="text-gray-500 text-xl" />;
  };

  const fileType = getFileType(displayFileName);

  const handlePreview = () => {
    console.log('Previewing file:', url);
    console.log('File type detected:', fileType);
    console.log('isMounted:', isMounted);
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setPageNumber(1);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // Render preview content based on file type
  const renderPreviewContent = () => {
    switch (fileType) {
      case 'image':
        return (
          <div className="flex justify-center items-center pt-2">
            <Image
              src={url}
              alt={displayFileName}
              className="max-w-full max-h-[70vh] object-contain"
              preview={false}
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
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
              >
                {t('previous')}
              </Button>
              <span>
                {t('page-of', { n: pageNumber, total: numPages })}
              </span>
              <Button
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
            <p>{t('preview-not-available')}</p>
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {t('download-file')}
            </a>
          </div>
        );
    }
  };

  // Default view
  return (
    <>
      {view && (
        <div onClick={handlePreview}>
          {view}
        </div>
      )}

      {!view && (
        <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getFileIcon(displayFileName)}
            <span className="truncate text-sm font-medium text-gray-700">
              {displayFileName}
            </span>
          </div>
          
          <div className="flex items-center gap-2 ml-3">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={handlePreview}
              className="hover:text-blue-500 hover:bg-blue-50"
              title={t('btn-preview')}
            />
            
            {onDelete && (
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={onDelete}
                className="hover:text-red-500 hover:bg-red-50"
                danger
                title={t('btn-delete')}
              />
            )}
          </div>
        </div>
      )}

      {isMounted && (
        <Modal
          title={displayFileName}
          open={previewVisible}
          onCancel={handleClosePreview}
          footer={null}
          width={fileType === 'image' ? 700 : 900}
          centered
          destroyOnHidden
        >
          {renderPreviewContent()}
        </Modal>
      )}
    </>
  );
};

export default UniversalPreviewFile;
