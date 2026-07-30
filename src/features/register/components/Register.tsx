'use client';

import { useTranslations } from 'next-intl';
import ThemeLangButtons from '@/components/login/ThemeLangButtons';
import FormRegister from './FormRegister';
import FloatingBubbles from '@/components/ui/FloatingBubbles';

export default function RegisterPage() {
  const t = useTranslations('common');

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background)',
        padding: '16px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <FloatingBubbles count={12} maxSize={180} minSize={46} />
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '800px',
          minHeight: '500px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div className='absolute ml-auto mt-[25px] right-0 mr-[10px]'>
          <ThemeLangButtons />
        </div>
        
        <div
          style={{
            flex: 1,
            backgroundColor: 'var(--primary-foreground)',
            display: 'flex',
            flexDirection: 'column',
            padding: '40px',
            overflow: 'hidden',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
              {t('register')}
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
              {t('register-desc')}
            </p>
          </div>

          <FormRegister />
        </div>
      </div>
    </div>
  );
}
