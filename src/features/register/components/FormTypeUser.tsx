'use client';

import { useTranslations } from 'next-intl';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import type { Control } from 'react-hook-form';
import type { RegisterFormValues } from '@/lib/schemas/register';

interface FormTypeUserProps {
  control: Control<RegisterFormValues>;
}

export default function FormTypeUser({ control }: FormTypeUserProps) {
  const t = useTranslations('common');

  return (
    <FormField
      control={control}
      name="role_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('placeholder-select-role')}</FormLabel>
          <FormControl>
            <RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex gap-4"
            >
              <label className="flex items-center gap-2 cursor-pointer w-[50%] border-gray-200 border-[1px] p-2 rounded-sm">
                <RadioGroupItem value="APL" />
                <span className="text-sm">{t('role-apl')}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer w-[50%] border-gray-200 border-[1px] p-2 rounded-sm">
                <RadioGroupItem value="ACS" />
                <span className="text-sm">{t('role-acs')}</span>
              </label>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
