"use client";

import { useRequirementContext } from "@/context/Requirement";
import { useAuthStore } from "@/store/auth";
import { Card, Divider, Descriptions, Form, Input, DatePicker, Select } from "antd";
import type { DescriptionsProps } from 'antd';
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import { useTranslations } from 'next-intl';
import { useRequiredRule } from '@/i18n/validation';

const { TextArea } = Input;

export default function PartOne() {
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const req = useRequiredRule();
  const roleCode = useAuthStore((s) => s.roleCode);
  const { requirement } = useRequirementContext();
  const [form] = Form.useForm();

  const readOnly = useMemo(() => {
    return roleCode === 'APL' ? false : true;
  }, [roleCode]);

  useEffect(() => {
    console.log("ReadOnly state in PartOne component:", readOnly, roleCode);
  }, [readOnly, roleCode]);

  // Data dari requirement
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
      tanggalLahir: user.date_of_birth ? dayjs(user.date_of_birth) : null,
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

  // Update form values when formData changes
  useEffect(() => {
    if (!readOnly && formData) {
      form.setFieldsValue({
        ...formData,
        tanggalLahir: formData.tanggalLahir ? dayjs(formData.tanggalLahir) : null
      });
    }
  }, [formData, readOnly, form]);
  
  const itemsAddress: DescriptionsProps['items'] = [
    {
      label: formData.alamat,
      span: 'filled',
      children: '',
    },
    {
      label: t('postal-code'),
      children: `:  ${formData.kodePos}`,
    }
  ]

  const itemsContact: DescriptionsProps['items'] = [
    {
      label: tc('label-rumah'),
      children: formData.telpRumah,
    },
    {
      label: tc('label-kantor'),
      children: formData.telpKantor,
    },
    {
      label: tc('label-hp'),
      children: formData.telpHP,
    },
    {
      label: 'Email',
      children: formData.email,
    }
  ]
    
  const items: DescriptionsProps['items'] = [
    {
      label: t('full-name'),
      span: 'filled',
      children: formData.namaLengkap,
    },
    {
      label: 'No. KTP/NIK/Paspor',
      span: 'filled',
      children: formData.noKTP,
    },
    {
      label: `${t('birth-place')}/${t('birth-date')}`,
      span: 'filled',
      children: `${formData.tempatLahir}${formData.tanggalLahir ? ', ' + dayjs(formData.tanggalLahir).format('DD MMMM YYYY') : ''}`,
    },
    {
      label: t('gender'),
      span: 'filled',
      children: formData.jenisKelamin,
    },
    {
      label: t('nationality'),
      span: 'filled',
      children: formData.kebangsaan,
    },
    {
      label: t('address'),
      span: 'filled',
      children: <Descriptions colon={false} items={itemsAddress} column={1} className="w-full" styles={{ label: { width: '30%' } }} />
    },
    {
      label: 'No. Telepon/Email',
      span: 'filled',
      children: <Descriptions colon={true} items={itemsContact} column={2} className="w-full" styles={{ label: { width: '30%', display: 'flex', justifyContent: 'space-between' } }} />
    }
  ];

  const itemAddressJobs: DescriptionsProps['items'] = [
    {
      label: formData.alamatKantor,
      span: 'filled',
      children: '',
    },
    {
      label: t('postal-code'),
      children: `:  ${formData.kodePosKantor}`,
    }
  ]

  const itemContactJobs: DescriptionsProps['items'] = [
    {
      label: tc('label-telp'),
      children: formData.telpKantorPerusahaan,
    },
    {
      label: tc('label-fax'),
      children: formData.faxKantor,
    },
    {
      label: 'Email',
      children: formData.emailKantor,
    }
  ]

  const itemsCurrentJobs: DescriptionsProps['items'] = [
    {
      label: t('institution-name'),
      children: formData.namaInstitusi,
    },
    {
      label: t('position'),
      children: formData.jabatan,
    },
    {
      label: t('office-address'),
      children: <Descriptions colon={false} items={itemAddressJobs} column={1} className="w-full" styles={{ label: { width: '30%' } }} />
    },
    {
      label: 'No. Telp/Fax/Email',
      children: <Descriptions colon={false} items={itemContactJobs} column={2} className="w-full" styles={{ label: { width: '30%', display: 'flex', justifyContent: 'space-between' } }} />
    }
  ]

  return (
    <Card>
      <h1 className="text-[2em]! font-bold">{tc('heading-bagian-1')}</h1>
      <p>{tc('desc-bagian-1')}</p>

      <Divider titlePlacement="left">{tc('sub-a-data-pribadi')}</Divider>
      
      {!readOnly ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...formData, tanggalLahir: formData.tanggalLahir ? dayjs(formData.tanggalLahir) : null }}
          className="w-full"
        >
          <Form.Item
            label={t('full-name')}
            name="namaLengkap"
            rules={[req('full-name')]}
          >
            <Input placeholder={t('placeholder-full-name')} />
          </Form.Item>

          <Form.Item
            label="No. KTP/NIK/Paspor"
            name="noKTP"
            rules={[{ required: true, message: t('field-required', { field: 'No. KTP/NIK/Paspor' }) }]}
          >
            <Input placeholder="Masukkan No. KTP/NIK/Paspor" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('birth-place')}
              name="tempatLahir"
              rules={[req('birth-place')]}
            >
              <Input placeholder={t('placeholder-birth-place')} />
            </Form.Item>

            <Form.Item
              label={t('birth-date')}
              name="tanggalLahir"
              rules={[req('birth-date')]}
            >
              <DatePicker className="w-full" format="DD-MM-YYYY" placeholder={t('placeholder-birth-date')} />
            </Form.Item>
          </div>

          <Form.Item
            label={t('gender')}
            name="jenisKelamin"
            rules={[req('gender')]}
          >
            <Select placeholder={t('placeholder-select-gender')} options={[
              { label: t('label-male'), value: 'F' },
              { label: t('label-female'), value: 'M' }
            ]} />
          </Form.Item>

          <Form.Item
            label={t('nationality')}
            name="kebangsaan"
            rules={[req('nationality')]}
          >
            <Input placeholder={t('placeholder-nationality')} />
          </Form.Item>

          <Form.Item
            label={t('address')}
            name="alamat"
            rules={[req('address')]}
          >
            <TextArea rows={3} placeholder={t('placeholder-address')} />
          </Form.Item>

          <Form.Item
            label={t('postal-code')}
            name="kodePos"
            rules={[req('postal-code')]}
          >
            <Input type="number" placeholder={t('placeholder-postal-code')} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('phone-home')}
              name="telpRumah"
            >
              <Input placeholder={t('placeholder-phone')} />
            </Form.Item>

            <Form.Item
              label={t('phone-office')}
              name="telpKantor"
            >
              <Input placeholder={t('placeholder-phone')} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('phone-mobile')}
              name="telpHP"
              rules={[req('phone-mobile')]}
            >
              <Input placeholder={t('placeholder-phone')} />
            </Form.Item>

            <Form.Item
              label={t('email')}
              name="email"
              rules={[
                req('email'),
                { type: 'email', message: t('email-invalid') }
              ]}
            >
              <Input type="email" placeholder={t('placeholder-email')} />
            </Form.Item>
          </div>
        </Form>
      ) : (
        <Descriptions 
          items={items} 
          colon={true}
          column={1} 
          className="w-full"
          styles={{
            label: { 
              width: '30%',
              display: 'flex',
              justifyContent: 'space-between',
            },
          }}
        />
      )}

      <Divider titlePlacement="left">{tc('sub-b-data-pekerjaan')}</Divider>
      
      {!readOnly ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          className="w-full"
        >
          <Form.Item
            label={t('institution-name')}
            name="namaInstitusi"
            rules={[req('institution-name')]}
          >
            <Input placeholder={t('placeholder-institution')} />
          </Form.Item>

          <Form.Item
            label={t('position')}
            name="jabatan"
            rules={[req('position')]}
          >
            <Input placeholder={t('placeholder-position')} />
          </Form.Item>

          <Form.Item
            label={t('office-address')}
            name="alamatKantor"
            rules={[req('office-address')]}
          >
            <TextArea rows={3} placeholder={t('placeholder-office-address')} />
          </Form.Item>

          <Form.Item
            label={t('office-postal-code')}
            name="kodePosKantor"
            rules={[req('office-postal-code')]}
          >
            <Input type="number" placeholder={t('placeholder-office-postal-code')} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label={t('office-phone')}
              name="telpKantorPerusahaan"
            >
              <Input placeholder={t('placeholder-phone')} />
            </Form.Item>

            <Form.Item
              label={t('office-fax')}
              name="faxKantor"
            >
              <Input placeholder={t('placeholder-phone')} />
            </Form.Item>
          </div>

          <Form.Item
            label={t('office-email')}
            name="emailKantor"
            rules={[
              { type: 'email', message: t('email-invalid') }
            ]}
          >
            <Input type="email" placeholder={t('placeholder-email')} />
          </Form.Item>
        </Form>
      ) : (
        <Descriptions 
          items={itemsCurrentJobs} 
          colon={true}
          column={1} 
          className="w-full"
          styles={{
            label: { 
              width: '30%',
              display: 'flex',
              justifyContent: 'space-between',
            },
          }}
        />
      )}
    </Card>
  )
}
