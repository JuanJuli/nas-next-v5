import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export function useRequiredRule() {
  const t = useTranslations('form');
  return useCallback((labelKey: string) => ({
    required: true,
    message: t('field-required', { field: t(labelKey) })
  }), [t]);
}