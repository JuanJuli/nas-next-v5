'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { BASE_API_URL } from '@/utils/config';
import { registerSchema, type RegisterFormValues } from '@/lib/schemas/register';
import { capitalizeWords, normalizeContact, formatDate, prependMET, buildRegisterFormData } from '../utils/dataTransform';
import FormTypeUser from './FormTypeUser';
import FormAccount from './FormAccount';
import FormPersonal from './FormPersonal';
import FormLspCode from './FormLspCode';

export default function FormRegister() {
  const t = useTranslations('common');
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role_code: 'APL',
      username: '',
      email: '',
      password: '',
      nik: '',
      full_name: '',
      place_of_birth: '',
      date_of_birth: undefined,
      gender_code: '',
      nationality: '',
      contact: '',
      jobs_code: '',
      nip: '',
      last_education: '',
      address: '',
      registration_number: '',
      lsp_code: '',
      signature: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmittingReg(true);
    try {
      const transformed = {
        ...values,
        full_name: capitalizeWords(values.full_name),
        contact: normalizeContact(values.contact),
        date_of_birth: formatDate(values.date_of_birth),
        registration_number: values.registration_number
          ? prependMET(values.registration_number)
          : undefined,
      };

      const formData = buildRegisterFormData(transformed);

      const res = await fetch(`${BASE_API_URL}auth/register`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.message === "application is under maintenance") {
        setShowMaintenance(true);
        return;
      }

      if (data?.message === "registration number already exist") {
        toast.error(t('error-duplicate-registration'));
        return;
      }

      if (!res.ok) {
        toast.error(data?.message || "Registration failed");
        return;
      }

      setShowSuccess(true);
    } catch {
      toast.error("Registration failed");
    } finally {
      setIsSubmittingReg(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto flex-1 pr-2">
          <FormTypeUser control={control} />

          {watch('role_code') && (
            <>
              <FormAccount control={control} />

              <FormField
                control={control}
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

              <FormPersonal control={control} watch={watch} />

              <FormLspCode control={control} />

              <Button type="submit" className="w-full h-10" disabled={isSubmitting || isSubmittingReg}>
                {isSubmitting || isSubmittingReg ? t('loading') : t('register')}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-10"
                onClick={() => router.push('/login')}
                disabled={isSubmitting || isSubmittingReg}
              >
                {t('btn-kembali')}
              </Button>
            </>
          )}
        </form>
      </FormProvider>

      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('register-success-title')}</DialogTitle>
            <DialogDescription>{t('register-success-desc')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => router.push('/login')}>
              {t('btn-kembali')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMaintenance} onOpenChange={setShowMaintenance}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('error-maintenance')}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMaintenance(false)}>
              {t('btn-tutup')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
