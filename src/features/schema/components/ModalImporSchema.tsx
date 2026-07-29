'use client';

import { parseAPL02, SchemePreview } from "@/utils/parseApl02MasterData";
import { Upload, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { useState, useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const result = await parseAPL02(file);

    console.log('Parsed APL02 Result:', result);

    const formData = mapToFormSchema(result);
    onImport?.(formData);
    onClose();
    setLoading(false);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>{tc('btn-import-skema')}</DialogTitle>
        <div className="py-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-2 py-8">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{tc('loading')}</p>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">{tc('label-upload-click-drag')}</p>
              <p className="text-xs text-muted-foreground mt-1">{tc('label-upload-click-drag')}</p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
