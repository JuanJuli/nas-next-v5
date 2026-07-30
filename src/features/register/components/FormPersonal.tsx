'use client';

import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { User, Hash, MapPin, Phone, Briefcase, BadgeCheck } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { listJob } from '@/constants/job';
import { listEducation } from '@/constants/education';
import type { Control, UseFormWatch } from 'react-hook-form';
import type { RegisterFormValues } from '@/lib/schemas/register';

interface FormPersonalProps {
  control: Control<RegisterFormValues>;
  watch: UseFormWatch<RegisterFormValues>;
}

export default function FormPersonal({ control, watch }: FormPersonalProps) {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const roleCode = watch('role_code');

  const showNip = useMemo(() => {
    return roleCode === 'APL';
  }, [roleCode]);

  const showNationality = useMemo(() => {
    return roleCode === 'APL';
  }, [roleCode]);

  const showEducation = useMemo(() => {
    return roleCode === 'ACS';
  }, [roleCode]);

  const showAddress = useMemo(() => {
    return roleCode === 'ACS';
  }, [roleCode]);

  const showRegistrationNumber = useMemo(() => {
    return roleCode === 'ACS';
  }, [roleCode]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="full_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('full-name')}</FormLabel>
            <FormControl>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder={t('placeholder-full-name')} className="pl-9 h-10" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="nik"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('nik')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder={t('placeholder-nik')} className="pl-9 h-10" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="place_of_birth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('birth-place')}</FormLabel>
            <FormControl>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder={t('placeholder-birth-place')} className="pl-9 h-10" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="date_of_birth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('birth-date')}</FormLabel>
            <FormControl>
              <DatePicker
                value={field.value ?? null}
                onChange={(date) => field.onChange(date ?? undefined)}
                placeholder={t('placeholder-birth-date')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="gender_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('gender')}</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder={t('placeholder-select-gender')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">{t('label-male')}</SelectItem>
                  <SelectItem value="P">{t('label-female')}</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showNationality && (
        <FormField
          control={control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nationality')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder={t('placeholder-select-nationality')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WNI">{t('label-wni')}</SelectItem>
                    <SelectItem value="WNA">{t('label-wna')}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={control}
        name="contact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{tc('contact')}</FormLabel>
            <FormControl>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder={tc('placeholder-contact')} className="pl-9 h-10" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="jobs_code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('label-employment-status')}</FormLabel>
            <FormControl>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full h-10">
                  <SelectValue placeholder={t('placeholder-select-employment')} />
                </SelectTrigger>
                <SelectContent>
                  {listJob.map((job) => (
                    <SelectItem key={job.id} value={String(job.id)}>
                      {job.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {showNip && (
        <FormField
          control={control}
          name="nip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tc('nip')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder={tc('placeholder-nip')} className="pl-9 h-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showEducation && (
        <FormField
          control={control}
          name="last_education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tc('last-education')}</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-10">
                    <SelectValue placeholder={t('placeholder-select-education')} />
                  </SelectTrigger>
                  <SelectContent>
                    {listEducation.map((edu) => (
                      <SelectItem key={edu.id} value={edu.id}>
                        {edu.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showAddress && (
        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('address')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder={t('placeholder-address')} className="pl-9 h-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {showRegistrationNumber && (
        <FormField
          control={control}
          name="registration_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{tc('registration-number')}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input placeholder={tc('placeholder-registration-number')} className="pl-9 h-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
