'use client';

import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useTenant } from '@/components/provider/TenantProvider';
import type { Control } from 'react-hook-form';
import type { RegisterFormValues } from '@/lib/schemas/register';

interface FormLspCodeProps {
  control: Control<RegisterFormValues>;
}

export default function FormLspCode({ control }: FormLspCodeProps) {
  const t = useTranslations('common');
  const tenant = useTenant();
  const isWhiteLabel = tenant?.white_lable === true;

  if (isWhiteLabel) {
    return null;
  }

  return (
    <FormField
      control={control}
      name="lsp_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('lsp-code')}</FormLabel>
          <FormControl>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input placeholder={t('placeholder-lsp-code')} className="pl-9 h-10" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
