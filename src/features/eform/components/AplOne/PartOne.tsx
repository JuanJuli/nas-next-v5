"use client";

import { useRequirementContext } from "@/context/Requirement";
import { useAuthStore } from "@/store/auth";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEformSchemas } from "@/lib/schemas/eform";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useTranslations } from 'next-intl';

export default function PartOne() {
  const tForm = useTranslations('form');
  const tc = useTranslations('common');
  const roleCode = useAuthStore((s) => s.roleCode);
  const { requirement } = useRequirementContext();

  const readOnly = useMemo(() => {
    return roleCode === 'APL' ? false : true;
  }, [roleCode]);

  const t = useTranslations('form');
  const { personalSchema } = useMemo(() => createEformSchemas(tForm), [tForm]);

  const formData = useMemo(() => {
    if (!requirement || !requirement.applicant) {
      return {
        namaLengkap: '',
        noKTP: '',
        tempatLahir: '',
        tanggalLahir: null,
        jenisKelamin: '',
        kebangsaan: '',
        alamat: '',
        kodePos: '',
        telpRumah: '',
        telpKantor: '-',
        telpHP: '',
        email: '',
        namaInstitusi: '',
        jabatan: '-',
        alamatKantor: '-',
        kodePosKantor: '-',
        telpKantorPerusahaan: '-',
        faxKantor: '-',
        emailKantor: '-',
      };
    }

    const { applicant } = requirement;
    const user = applicant.user;

    return {
      namaLengkap: user?.full_name || '',
      noKTP: applicant.nip || '',
      tempatLahir: user.place_of_birth || '',
      tanggalLahir: user.date_of_birth ? dayjs(user.date_of_birth).toDate() : null,
      jenisKelamin: user.gender_code || '',
      kebangsaan: applicant.nationality || '',
      alamat: user.address || '',
      kodePos: applicant.zip_code || '',
      telpRumah: user?.contact || '',
      telpKantor: '',
      telpHP: user?.contact || '',
      email: '',
      namaInstitusi: applicant.institution?.name || '',
      jabatan: applicant.position || '-',
      alamatKantor: applicant.jobs_address || '-',
      kodePosKantor: applicant.jobs_zip || '-',
      telpKantorPerusahaan: applicant.jobs_contact || '-',
      faxKantor: applicant.jobs_fax || '-',
      emailKantor: applicant.jobs_email || '-',
    };
  }, [requirement]);

  const form = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: formData as any,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!readOnly) {
      form.reset(formData as any);
    }
  }, [formData, readOnly, form]);

  const fieldProps = (name: any) => ({
    control: form.control,
    name,
    render: ({ field }: { field: any }) => (
      <FormItem>
        <FormControl>
          <Input placeholder={t(`placeholder-${name}` as any)} {...field} value={field.value ?? ''} />
        </FormControl>
        <FormMessage />
      </FormItem>
    ),
  });

  return (
    <Card>
      <CardContent className="p-6">
        <h1 className="text-[2em]! font-bold">{tc('heading-bagian-1')}</h1>
        <p>{tc('desc-bagian-1')}</p>

        <Separator className="my-4" />

        <h3 className="font-semibold mb-4">{tc('sub-a-data-pribadi')}</h3>

        {!readOnly ? (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="namaLengkap"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('full-name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholder-full-name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noKTP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. KTP/NIK/Paspor</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan No. KTP/NIK/Paspor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tempatLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('birth-place')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-birth-place')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tanggalLahir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('birth-date')}</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={t('placeholder-birth-date')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="jenisKelamin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('gender')}</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('placeholder-select-gender')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="F">{t('label-male')}</SelectItem>
                        <SelectItem value="M">{t('label-female')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kebangsaan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nationality')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholder-nationality')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('address')}</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder={t('placeholder-address')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kodePos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('postal-code')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('placeholder-postal-code')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telpRumah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phone-home')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-phone')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telpKantor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phone-office')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-phone')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telpHP"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phone-mobile')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-phone')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={t('placeholder-email')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Row label={t('full-name')} value={formData.namaLengkap} />
            <Row label="No. KTP/NIK/Paspor" value={formData.noKTP} />
            <Row label={`${t('birth-place')}/${t('birth-date')}`} value={`${formData.tempatLahir}${formData.tanggalLahir ? ', ' + dayjs(formData.tanggalLahir).format('DD MMMM YYYY') : ''}`} />
            <Row label={t('gender')} value={formData.jenisKelamin === 'F' ? t('label-male') : formData.jenisKelamin === 'M' ? t('label-female') : formData.jenisKelamin} />
            <Row label={t('nationality')} value={formData.kebangsaan} />
            <div>
              <span className="font-medium">{t('address')}</span>
              <div className="ml-4 mt-1 space-y-1">
                <p>{formData.alamat}</p>
                <p><span className="text-muted-foreground">{t('postal-code')}:</span> {formData.kodePos}</p>
              </div>
            </div>
            <div>
              <span className="font-medium">No. Telepon/Email</span>
              <div className="ml-4 mt-1 space-y-1">
                <p><span className="text-muted-foreground">{tc('label-rumah')}:</span> {formData.telpRumah}</p>
                <p><span className="text-muted-foreground">{tc('label-kantor')}:</span> {formData.telpKantor}</p>
                <p><span className="text-muted-foreground">{tc('label-hp')}:</span> {formData.telpHP}</p>
                <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
              </div>
            </div>
          </div>
        )}

        <Separator className="my-4" />

        <h3 className="font-semibold mb-4">{tc('sub-b-data-pekerjaan')}</h3>

        {!readOnly ? (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="namaInstitusi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('institution-name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholder-institution')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jabatan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('position')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('placeholder-position')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="alamatKantor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('office-address')}</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder={t('placeholder-office-address')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="kodePosKantor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('office-postal-code')}</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder={t('placeholder-office-postal-code')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="telpKantorPerusahaan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('office-phone')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-phone')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="faxKantor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('office-fax')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('placeholder-phone')} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="emailKantor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('office-email')}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t('placeholder-email')} {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <Row label={t('institution-name')} value={formData.namaInstitusi} />
            <Row label={t('position')} value={formData.jabatan} />
            <div>
              <span className="font-medium">{t('office-address')}</span>
              <div className="ml-4 mt-1 space-y-1">
                <p>{formData.alamatKantor}</p>
                <p><span className="text-muted-foreground">{t('postal-code')}:</span> {formData.kodePosKantor}</p>
              </div>
            </div>
            <div>
              <span className="font-medium">No. Telp/Fax/Email</span>
              <div className="ml-4 mt-1 space-y-1">
                <p><span className="text-muted-foreground">{tc('label-telp')}:</span> {formData.telpKantorPerusahaan}</p>
                <p><span className="text-muted-foreground">{tc('label-fax')}:</span> {formData.faxKantor}</p>
                <p><span className="text-muted-foreground">Email:</span> {formData.emailKantor}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="font-medium min-w-[30%]">{label}</span>
      <span className="mx-2">:</span>
      <span>{value || '-'}</span>
    </div>
  )
}
