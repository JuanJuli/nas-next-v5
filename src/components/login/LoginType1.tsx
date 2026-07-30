'use client';

import { User, Lock } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import SelectLspRole from './SelectLspRole';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormValues } from '@/lib/schemas/login';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import FloatingBubbles from '../ui/FloatingBubbles';

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

export default function LoginType1({ 
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
          maxWidth="800px"
        />
      </div>
    );
  }

  return (
    <>
     
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
            maxWidth: '800px',
            height: isMobile ? 'auto' : '500px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <FloatingBubbles count={12} maxSize={180} minSize={46} />
          {!isMobile && (
          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                left: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
            
            <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              {t('welcome')}
            </h2>
            <p style={{ fontSize: '16px', textAlign: 'center', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
              {t('slogan-login-satu')}
            </p>
          </div>
          )}

          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--background)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '24px' : '40px',
              position: 'relative',
              overflow: 'hidden',
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
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                opacity: 0.1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-40px',
                left: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                opacity: 0.1,
              }}
            />
            
            <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
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
        </div>
      </div>
    </>
  );
}
