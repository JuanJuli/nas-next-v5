'use client';

import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import logoNas from '../../../../../public/logo/nas-small.png';
import thumbnail from '../../../../../public/logo/org-proyek.png';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/schemas/forgot-password';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    console.log('Forgot password submitted:', values);
    setSuccess(true);
  };

  const handleBack = () => {
    router.back();
  };

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
            {success ? (
              <div className="flex flex-col items-center text-center py-8">
                <CheckCircle2 className="size-16 text-green-500 mb-4" />
                <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                  Check Your Email
                </h1>
                <p className="text-sm text-muted-foreground mb-6">
                  We have sent password reset instructions to your email.
                </p>
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="size-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: 'var(--primary)' }}>
                    Forgot Password
                  </h1>
                  <p style={{ margin: '8px 0 0', color: 'var(--muted-foreground)', fontSize: '14px' }}>
                    Enter your email to receive reset instructions
                  </p>
                </div>

                <FormProvider {...form}><form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input placeholder="Enter your email" className="pl-9 h-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <hr className="border-t border-border my-4" />

                  <Button type="submit" className="w-full h-10">
                    Submit
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-10"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </form></FormProvider>
              </>
            )}
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
              Pencapaian Luar Biasa Dimulai dengan Satu Langkah
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.8', margin: 0, letterSpacing: '0.5px' }}>
              Capai Tujuan Karier Anda Dengan Sertifikasi Yang Diakui Industri. Silahkan Masuk Atau Daftar Sekarang Untuk Menggenggam Masa Depan Yang Lebih Cerah.
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
