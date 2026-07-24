import { useTranslations } from 'next-intl';

export default function Dashboard() {
  const t = useTranslations('common');
  return (
    <div>{t('dashboard')}</div>
  )
}
