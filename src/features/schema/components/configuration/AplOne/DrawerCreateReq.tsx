'use client';

import Tiptap from "@/components/tiptap";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import { usePost, usePut } from "@/hooks/useMutate";
import { toast } from "sonner";
import { Button, InputNumber } from "antd";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from "react";
import { useForm, useController, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  requirement_name: z.string().min(1, 'Nama dokumen harus diisi'),
  is_required: z.boolean(),
  sequence: z.number().min(0),
})

type FormValues = z.infer<typeof formSchema>

interface RequirementMasterData {
  requirement_master_id?: string
  requirement_name?: string
  is_required?: boolean
  sequence?: number
}

export default function DrawerCreateReq({ open, close, data, type = "BAM" }: { open: boolean; close(): void; data?: RequirementMasterData, type?: string }) {
  const { schema } = useConfigurationEformContext()
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const tm = useTranslations('message');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirement_name: '',
      is_required: false,
      sequence: 0,
    },
  })

  const { field: tiptapField } = useController({
    control: form.control,
    name: 'requirement_name',
  })

  const isEdit = useMemo(() => {
    return !!data?.requirement_master_id
  }, [data])

  const createMutation = usePost('core/requirement_masters', {
    invalidateQueries: ['table', 'core/requirement_masters/regular'],
    onSuccess: () => {
      form.reset()
      toast.success(tm('success-create'))
      close()
    },
    onError: (error: unknown) => {
      toast.error(tm('failed-create'), {
        description: (error as { message?: string })?.message || tm('terjadi-kesalahan'),
      })
    },
  })

  const updateMutation = usePut('core/requirement_masters', {
    invalidateQueries: ['table', 'core/requirement_masters/regular'],
    onSuccess: () => {
      form.reset()
      toast.success(tm('success-update'))
      close()
    },
    onError: (error: unknown) => {
      toast.error(tm('failed-update'), {
        description: (error as { message?: string })?.message || tm('terjadi-kesalahan'),
      })
    },
  })

  const isPending = useMemo(() => {
    return createMutation.isPending || updateMutation.isPending
  }, [createMutation.isPending, updateMutation.isPending])

  const handleFinish = (values: FormValues) => {
    const payload = {
      ...values,
      requirement_category: type,
      schema_id: [schema?.schema_id],
      requirement_type: 'UPLOAD',
      apl_state: ['draft'],
      acs_state: [],
      supervisor_state: [],
      plenary_state: []
    }
    if (isEdit) {
      if (data) {
        updateMutation.mutate({ url: `/${data.requirement_master_id}`, data: payload })
      }
    } else {
      createMutation.mutate(payload)
    }
  }

  useEffect(() => {
    if (open && data) {
      form.reset({
        requirement_name: data.requirement_name || '',
        is_required: data.is_required || false,
        sequence: data.sequence || 0,
      })
    }
  }, [open, data, form])

  useEffect(() => {
    if (!open) {
      form.reset({
        requirement_name: '',
        is_required: false,
        sequence: 0,
      })
    }
  }, [open, form])

  return (
    <Sheet open={open} onOpenChange={(isOpen) => { if (!isOpen) close() }}>
      <SheetContent side="right" className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>{tc('btn-tambah-data')}</SheetTitle>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4 p-4">
          <FormProvider {...form}>
          <FormItem>
            <FormLabel>{t('document-name')}</FormLabel>
            <FormControl>
              <Tiptap
                id="req-name"
                fValue={tiptapField.value}
                onValueChange={tiptapField.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="is_required"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('mandatory')}</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={String(field.value)}
                    onValueChange={(val) => field.onChange(val === 'true')}
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="true" id="is_required_yes" />
                      <Label htmlFor="is_required_yes">{t('label-yes')}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="false" id="is_required_no" />
                      <Label htmlFor="is_required_no">{t('label-no')}</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sequence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('sequence')}</FormLabel>
                <FormControl>
                  <InputNumber
                    min={0}
                    className="w-full"
                    value={field.value}
                    onChange={(val) => field.onChange(val ?? 0)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </FormProvider>
        </form>

        <SheetFooter>
          <Button type="primary" onClick={form.handleSubmit(handleFinish)} loading={isPending} disabled={isPending}>
            {tc('btn-simpan')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
