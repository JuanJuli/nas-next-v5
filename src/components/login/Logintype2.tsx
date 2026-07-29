'use client';

import { User, Lock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import SelectLspRole from './SelectLspRole';
import logoNas from '../../../public/logo/nas-small.png';
import thumbnail from '../../../public/logo/org-proyek.png';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/lib/schemas/login';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

export default function Logintype2({ 
  handleLogin, 
  loading, 
  listLsp = [], 
  handleGenerateToken, 
  token,
  errorMessage = '',
  headerActions
}: { 
  handleLogin: (values: { username: string; password: string }) => Promise<void>; 
  loading: boolean;
  listLsp?: LspLoginResponse[];
  handleGenerateToken?: (payload: iPayloadGenerateToken, token: string) => Promise<void>;
  token?: string;
  errorMessage?: string;
  headerActions?: React.ReactNode;
}) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const t = useTranslations('common');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  if (listLsp.length > 0) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {headerActions && (
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
            {headerActions}
          </div>
        )}
        <SelectLspRole
          listLsp={listLsp}
          handleGenerateToken={handleGenerateToken}
          token={token}
          errorMessage={errorMessage}
          loading={loading}
          maxWidth="65vw"
          showLogo={true}
          logoElement={
            <div
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={logoNas}
                alt="Logo NAS"
                width={70}
                height={70}
                style={{ objectFit: 'contain' }}
              />
            </div>
          }
          containerStyle={{
            backgroundColor: 'var(--background)',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--background)',
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '65vw',
          height: isMobile ? 'auto' : '600px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: isMobile ? '100%' : '50%',
            backgroundColor: 'var(--background)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '24px' : '40px',
            position: 'relative',
          }}
        >
          {headerActions && (
            <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
              {headerActions}
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              top: '5px',
              left: '20px',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              src={logoNas}
              alt="Logo NAS"
              width={70}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                Login
              </h1>
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <FormProvider {...form}><form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('username')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input placeholder="Enter your username" className="pl-9 h-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                        <Input type="password" placeholder="Enter your password" className="pl-9 h-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <hr className="border-t border-border my-4" />

              <Button type="submit" className="w-full h-10" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-10"
                onClick={() => router.push('/register')}
                disabled={loading}
              >
                Register
              </Button>
            </form></FormProvider>
          </div>
        </div>

        {!isMobile && (
        <div
          style={{
            width: '50%',
            background: `linear-gradient(135deg, var(--primary) 0%, color-mix(in srgb, var(--primary) 80%, transparent) 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '60px 30px 0 30px',
            color: '#fff',
            position: 'relative',
            paddingTop: '80px',
          }}
        >
          <div style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', margin: 0 }}>
              {t('header-slogan-login-dua')}
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.8', margin: 0, letterSpacing: '0.5px' }}>
              {t('slogan-login-dua')}
            </p>
          </div>

          <div
            style={{
              width: '80%',
              height: 'auto',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            <Image
              src={thumbnail}
              alt="Thumbnail"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
