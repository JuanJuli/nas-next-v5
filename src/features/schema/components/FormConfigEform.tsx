'use client';

import { formGroupTools } from "@/constants/form_group";
import { useRouter } from "@/i18n/navigation"
import { useTranslations } from 'next-intl';
import { Button, Modal } from "antd";


export default function FormConfigEform({ open, close, schemaId }: { open: boolean; close(): void; schemaId?: string }) {
  const router = useRouter();
  const tc = useTranslations('common');

  const handleConfig = (formCode: string) => {
    router.push(`/schema/requirement/${schemaId}/${formCode}`);
  };

  return (
    <Modal
      open={open}
      onCancel={close}
      title={tc('heading-config-eform')}
      footer={<Button onClick={close}>{tc('btn-tutup')}</Button>}
    >
      {formGroupTools.map((group) => (
        <div key={group.type} className="mb-4">
          <h3 className="text-base font-semibold mb-2">{group.type}</h3>
          <div className="border rounded-md divide-y">
            {group.tools.map((tool) => (
              <div key={tool.code} className="flex items-center justify-between px-3 py-2">
                <span className="text-sm">{tool.name}</span>
                <Button size="small" type="primary" onClick={() => handleConfig(tool.code)}>
                  {tc('btn-config')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Modal>
  )
}
