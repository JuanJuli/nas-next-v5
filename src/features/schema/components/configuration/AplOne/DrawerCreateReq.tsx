'use client';

import { useRequiredRule } from "@/i18n/validation";
import Tiptap from "@/components/tiptap";
import { useConfigurationEformContext } from "@/context/ConfigurationEform";
import { usePost, usePut } from "@/hooks/useMutate";
import { notification } from "@/service/antdStatic";
import { Button, Drawer, Form, InputNumber, Radio } from "antd";
import { useTranslations } from 'next-intl';
import { useEffect, useMemo } from "react";

interface RequirementMasterData {
  requirement_master_id?: string
  requirement_name?: string
  is_required?: boolean
  sequence?: number
}

export default function DrawerCreateReq({ open, close, data, type = "BAM" }: { open: boolean; close(): void; data?: RequirementMasterData, type?: string }) {
  const [form] = Form.useForm();
  const { schema } = useConfigurationEformContext()
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const tm = useTranslations('message');
  const req = useRequiredRule();
  const fReqName = Form.useWatch('requirement_name', form);

  const isEdit = useMemo(() => {
    return !!data?.requirement_master_id
  }, [data])

  useEffect(() => {
    console.log('cek fReqName:', fReqName)
  }, [fReqName])

  const createMutation = usePost('core/requirement_masters', {
    invalidateQueries: ['table', 'core/requirement_masters/regular'],
    onSuccess: () => {
      form.resetFields()
      notification.success({
        message: tm('success-create'),
        className: 'cnotif csuccess'
      })
      close()
    },
    onError: (error: unknown) => {
      notification.error({
        message: tm('failed-create'),
        description: (error as { message?: string })?.message || tm('terjadi-kesalahan'),
      })
    },
  })

  const updateMutation = usePut('core/requirement_masters', {
    invalidateQueries: ['table', 'core/requirement_masters/regular'],
    onSuccess: () => {
      form.resetFields()
      notification.success({
        message: tm('success-update'),
        className: 'cnotif csuccess'
      })
      close()
    },
    onError: (error: unknown) => {
      notification.error({
        message: tm('failed-update'),
        description: (error as { message?: string })?.message || tm('terjadi-kesalahan'),
      })
    },
  })

  const isPending = useMemo(() => {
    return createMutation.isPending || updateMutation.isPending
  }, [createMutation.isPending, updateMutation.isPending])

  const handleFinish = async (values: any) => {
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
      form.setFieldsValue(data)
    }
  }, [open, data])

  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  return (
    <Drawer
      title={tc('btn-tambah-data')}
      open={open}
      onClose={close}
      size={500}
      destroyOnHidden
      footer={
        <Button type="primary" onClick={form.submit} loading={isPending} disabled={isPending}>
          {tc('btn-simpan')}
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Tiptap
          id="req-name"
          fValue={fReqName}
          form={form}
          formItemProps={{
            required: true,
            label: t('document-name'),
            name: 'requirement_name',
            rules: [req('document-name')],
          }}
        />
        <Form.Item label={t('mandatory')} name="is_required" initialValue={false}>
          <Radio.Group>
            <Radio value={true}>{t('label-yes')}</Radio>
            <Radio value={false}>{t('label-no')}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('sequence')} name="sequence" initialValue={0}>
          <InputNumber min={0} className="w-full" />
        </Form.Item>
      </Form>
    </Drawer>
  )
}
