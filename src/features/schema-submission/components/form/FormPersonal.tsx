'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dayjs from 'dayjs'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  nama: z.string().min(1, 'Nama harus diisi'),
  nik: z.string().regex(/^\d{16}$/, 'NIK harus 16 digit angka'),
  tanggal_lahir: z.string().min(1, 'Tanggal lahir harus diisi'),
  jenis_kelamin: z.string().min(1, 'Jenis kelamin harus dipilih'),
  kebangsaan: z.string().min(1, 'Kebangsaan harus dipilih'),
  kontak: z.string().regex(/^[0-9]{10,13}$/, 'No. HP harus 10-13 digit'),
  alamat: z.string().min(1, 'Alamat harus diisi'),
  kode_pos: z.string().regex(/^\d{5}$/, 'Kode pos harus 5 digit'),
  pendidikan: z.string().min(1, 'Pendidikan harus dipilih'),
  pekerjaan: z.string().min(1, 'Status pekerjaan harus dipilih'),
  institusi: z.string().optional(),
  jabatan: z.string().optional(),
  email_pekerjaan: z.string().optional(),
  kontak_institusi: z.string().optional(),
  alamat_institusi: z.string().optional(),
  kode_pos_pekerjaan: z.string().optional(),
  tuk: z.string().min(1, 'TUK harus dipilih'),
}).superRefine((data, ctx) => {
  const isPekerjaan = data.pekerjaan && data.pekerjaan !== 'belum_bekerja'
  if (isPekerjaan) {
    if (!data.institusi) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['institusi'], message: 'Nama institusi harus diisi' })
    if (!data.jabatan) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['jabatan'], message: 'Jabatan harus diisi' })
    if (!data.email_pekerjaan) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['email_pekerjaan'], message: 'Email pekerjaan harus diisi' })
    if (!data.kontak_institusi || !/^[0-9]{10,13}$/.test(data.kontak_institusi)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['kontak_institusi'], message: 'Kontak institusi harus 10-13 digit' })
    if (!data.alamat_institusi) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['alamat_institusi'], message: 'Alamat institusi harus diisi' })
    if (!data.kode_pos_pekerjaan || !/^\d{5}$/.test(data.kode_pos_pekerjaan)) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['kode_pos_pekerjaan'], message: 'Kode pos harus 5 digit' })
  }
})

type FormValues = z.infer<typeof formSchema>

export default function FormPersonalRequirement() {
  const t = useTranslations('form')
  const tc = useTranslations('common')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: '',
      nik: '',
      tanggal_lahir: '',
      jenis_kelamin: '',
      kebangsaan: '',
      kontak: '',
      alamat: '',
      kode_pos: '',
      pendidikan: '',
      pekerjaan: '',
      tuk: '',
    },
  })

  const pekerjaan = form.watch('pekerjaan')
  const isPekerjaan = pekerjaan && pekerjaan !== 'belum_bekerja'

  const handleSubmit = (values: FormValues) => {
    console.log('Form values:', values)
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <hr className="border-t border-border" />
        <h3 className="text-lg font-medium">{tc('heading-bagian-1')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="nama" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('full-name')}</FormLabel>
              <FormControl><Input placeholder={t('placeholder-full-name')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="nik" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nik')}</FormLabel>
              <FormControl><Input placeholder={t('placeholder-nik')} maxLength={16} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="tanggal_lahir" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('birth-date')}</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger
                    className={cn("w-full justify-start text-left font-normal h-10 inline-flex items-center rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm transition-colors", !field.value && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {field.value ? dayjs(field.value).format('DD/MM/YYYY') : t('placeholder-birth-date')}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value ? dayjs(field.value).toDate() : undefined}
                      onSelect={(date) => field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : '')}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="jenis_kelamin" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('gender')}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t('placeholder-select-gender')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="laki-laki">{t('label-male')}</SelectItem>
                  <SelectItem value="perempuan">{t('label-female')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="kebangsaan" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('nationality')}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t('placeholder-select-nationality')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="WNI">{t('label-wni')}</SelectItem>
                  <SelectItem value="WNA">{t('label-wna')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="kontak" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('label-contact')}</FormLabel>
              <FormControl><Input placeholder={t('placeholder-phone')} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <FormField control={form.control} name="alamat" render={({ field }) => (
              <FormItem>
                <FormLabel>{t('address')}</FormLabel>
                <FormControl><Textarea placeholder={t('placeholder-address')} rows={3} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <FormField control={form.control} name="kode_pos" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('postal-code')}</FormLabel>
              <FormControl><Input placeholder={t('placeholder-postal-code')} maxLength={5} {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <hr className="border-t border-border" />
        <h3 className="text-lg font-medium">{t('label-education-detail')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="pendidikan" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('label-last-education')}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t('placeholder-select-education')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SMA/Sederajat">{t('label-sma')}</SelectItem>
                  <SelectItem value="D3">{t('label-d3')}</SelectItem>
                  <SelectItem value="S1">{t('label-s1')}</SelectItem>
                  <SelectItem value="S2">{t('label-s2')}</SelectItem>
                  <SelectItem value="S3">{t('label-s3')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <hr className="border-t border-border" />
        <h3 className="text-lg font-medium">{t('label-employment-detail')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="pekerjaan" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('label-employment-status')}</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value)
                  if (value === 'belum_bekerja') {
                    form.setValue('institusi', '')
                    form.setValue('jabatan', '')
                    form.setValue('email_pekerjaan', '')
                    form.setValue('kontak_institusi', '')
                    form.setValue('alamat_institusi', '')
                    form.setValue('kode_pos_pekerjaan', '')
                  }
                }}
              >
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t('placeholder-select-employment')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="belum_bekerja">{t('label-not-working')}</SelectItem>
                  <SelectItem value="pegawai_swasta">{t('label-private-employee')}</SelectItem>
                  <SelectItem value="pegawai_negeri">{t('label-civil-servant')}</SelectItem>
                  <SelectItem value="wiraswasta">{t('label-entrepreneur')}</SelectItem>
                  <SelectItem value="lainnya">{t('label-other')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {isPekerjaan && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="institusi" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('institution-name')}</FormLabel>
                  <FormControl><Input placeholder={t('placeholder-institution')} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="jabatan" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('position')}</FormLabel>
                  <FormControl><Input placeholder={t('placeholder-position')} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="email_pekerjaan" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('label-institution-email')}</FormLabel>
                  <FormControl><Input placeholder="email@perusahaan.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="kontak_institusi" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('label-office-contact')}</FormLabel>
                  <FormControl><Input placeholder={t('placeholder-phone')} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <FormField control={form.control} name="alamat_institusi" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('label-institution-address')}</FormLabel>
                    <FormControl><Textarea placeholder={t('placeholder-office-address')} rows={3} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="kode_pos_pekerjaan" render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('label-institution-postal-code')}</FormLabel>
                  <FormControl><Input placeholder={t('placeholder-office-postal-code')} maxLength={5} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </>
        )}

        <hr className="border-t border-border" />
        <h3 className="text-lg font-medium">{t('label-lainnya')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="tuk" render={({ field }) => (
            <FormItem>
              <FormLabel>{t('label-workplace')}</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={t('placeholder-select-tuk')} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tuk_1">TUK 1 - Jakarta Pusat</SelectItem>
                  <SelectItem value="tuk_2">TUK 2 - Bandung</SelectItem>
                  <SelectItem value="tuk_3">TUK 3 - Surabaya</SelectItem>
                  <SelectItem value="tuk_4">TUK 4 - Medan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>
      </form>
    </div>
  )
}
