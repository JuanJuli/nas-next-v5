'use client';

import { Carousel } from 'antd';
import { User, Lock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import SelectLspRole from './SelectLspRole';
import thumbnailOne from '../../../public/thumbnail/kantoran1.jpg';
import thumbnailTwo from '../../../public/thumbnail/kantoran2.webp';
import logo from '../../../public/logo/nas-small.png';
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

export default function LoginType3({ 
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
    defaultValues: { username: '', password: '' }
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
          maxWidth={isMobile ? '100%' : '30vw'}
          showLogo={true}
          logoElement={
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={40}
                style={{ objectFit: 'contain' }}
              />
            </div>
          }
          containerStyle={{
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .full-height-carousel .slick-slider,
        .full-height-carousel .slick-list,
        .full-height-carousel .slick-track,
        .full-height-carousel .slick-slide,
        .full-height-carousel .slick-slide > div {
          height: 100vh !important;
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
        }}
      >
      <div
        style={{
          width: isMobile ? '100%' : '30vw',
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
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '64px',
            }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                {t('welcome')}
              </h1>
              <p style={{ fontSize: '14px', color: '#8c8c8c', marginTop: '8px' }}>
                {t('below-welcome')}
              </p>
            </div>

            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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

                <Button type="submit" className="w-full h-10 mt-6" disabled={loading}>
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
              </form>
            </FormProvider>
          </div>
      </div>

      {!isMobile && (
        <div
          style={{
            width: '70vw',
            height: '100vh',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Carousel 
            autoplay 
            autoplaySpeed={4000} 
            effect="fade" 
            style={{ height: '100vh', width: '100%' }}
            className="full-height-carousel"
          >
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
              <Image
                src={thumbnailOne}
                alt="Thumbnail 1"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  padding: '40px',
                  color: '#fff',
                }}
              >
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', margin: 0 }}>
                  Raih Kesempatan Anda
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                  Bergabunglah dengan ribuan profesional yang telah meningkatkan kompetensi mereka
                </p>
              </div>
            </div>
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
              <Image
                src={thumbnailTwo}
                alt="Thumbnail 2"
                fill
                style={{ objectFit: 'cover'}}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  padding: '40px',
                  color: '#fff',
                }}
              >
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', margin: 0 }}>
                  {t('header-slogan-login-tiga')}
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                  {t('slogan-login-tiga')}
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      )}
      </div>
    </>
  );
}
