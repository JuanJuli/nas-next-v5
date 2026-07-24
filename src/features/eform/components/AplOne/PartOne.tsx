"use client";

import { useRequirementContext } from "@/context/Requirement";
import { useAuthStore } from "@/store/auth";
import { Card, Divider, Descriptions, Form, Input, DatePicker, Select } from "antd";
import type { DescriptionsProps } from 'antd';
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";

const { TextArea } = Input;

export default function PartOne() {
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
      tempatLahir: user.place_of_birth || '', // Data ini tidak ada di interface, bisa ditambahkan jika diperlukan
      tanggalLahir: user.date_of_birth ? dayjs(user.date_of_birth) : null, // Data ini tidak ada di interface, bisa ditambahkan jika diperlukan
      jenisKelamin: user.gender_code || '', // Data ini tidak ada di interface, bisa ditambahkan jika diperlukan
      kebangsaan: applicant.nationality || '',
      alamat: user.address || '', // Data ini tidak ada di interface, bisa ditambahkan jika diperlukan
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
      label: 'Kode Pos',
      children: `:  ${formData.kodePos}`,
    }
  ]

  const itemsContact: DescriptionsProps['items'] = [
    {
      label: 'Rumah',
      children: formData.telpRumah,
    },
    {
      label: 'Kantor',
      children: formData.telpKantor,
    },
    {
      label: 'HP',
      children: formData.telpHP,
    },
    {
      label: 'Email',
      children: formData.email,
    }
  ]
    
  const items: DescriptionsProps['items'] = [
    {
      label: 'Nama Lengkap',
      span: 'filled',
      children: formData.namaLengkap,
    },
    {
      label: 'No. KTP/NIK/Paspor',
      span: 'filled', // span = 2
      children: formData.noKTP,
    },
    {
      label: 'Tempat/Tanggal Lahir',
      span: 'filled', // span = 3
      children: `${formData.tempatLahir}${formData.tanggalLahir ? ', ' + dayjs(formData.tanggalLahir).format('DD MMMM YYYY') : ''}`,
    },
    {
      label: 'Jenis Kelamin',
      span: 'filled', // span = 4
      children: formData.jenisKelamin,
    },
    {
      label: 'Kebangsaan',
      span: 'filled', // span = 5
      children: formData.kebangsaan,
    },
    {
      label: 'Alamat',
      span: 'filled', // span = 6
      children: <Descriptions colon={false} items={itemsAddress} column={1} className="w-full" styles={{ label: { width: '30%' } }} /> // nested descriptions
    },
    {
      label: 'No. Telepon/Email',
      span: 'filled', // span = 7
      children: <Descriptions colon={true} items={itemsContact} column={2} className="w-full" styles={{ label: { width: '30%', display: 'flex', justifyContent: 'space-between' } }} /> // nested descriptions
    }
  ];

  const itemAddressJobs: DescriptionsProps['items'] = [
    {
      label: formData.alamatKantor,
      span: 'filled',
      children: '',
    },
    {
      label: 'Kode Pos',
      children: `:  ${formData.kodePosKantor}`,
    }
  ]

  const itemContactJobs: DescriptionsProps['items'] = [
    {
      label: 'Telp',
      children: formData.telpKantorPerusahaan,
    },
    {
      label: 'Fax',
      children: formData.faxKantor,
    },
    {
      label: 'Email',
      children: formData.emailKantor,
    }
  ]

  const itemsCurrentJobs: DescriptionsProps['items'] = [
    {
      label: 'Nama Institusi/Perusahaan',
      children: formData.namaInstitusi,
    },
    {
      label: 'Jabatan',
      children: formData.jabatan,
    },
    {
      label: 'Alamat Kantor',
      children: <Descriptions colon={false} items={itemAddressJobs} column={1} className="w-full" styles={{ label: { width: '30%' } }} /> // nested descriptions
    },
    {
      label: 'No. Telp/Fax/Email',
      children: <Descriptions colon={false} items={itemContactJobs} column={2} className="w-full" styles={{ label: { width: '30%', display: 'flex', justifyContent: 'space-between' } }} /> // nested descriptions
    }
  ]

  return (
    <Card>
      <h1 className="text-[2em]! font-bold">Bagian 1: Rincian Data Pemohon Sertifikasi</h1>
      <p>Pada bagian ini, cantumkan data pribadi, data pendidikan formal serta data pekerjaan anda pada saat ini.</p>

      <Divider titlePlacement="left">a. Data Pribadi</Divider>
      
      {!readOnly ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ ...formData, tanggalLahir: formData.tanggalLahir ? dayjs(formData.tanggalLahir) : null }}
          className="w-full"
        >
          <Form.Item
            label="Nama Lengkap"
            name="namaLengkap"
            rules={[{ required: true, message: 'Nama lengkap harus diisi' }]}
          >
            <Input placeholder="Masukkan nama lengkap" />
          </Form.Item>

          <Form.Item
            label="No. KTP/NIK/Paspor"
            name="noKTP"
            rules={[{ required: true, message: 'No. KTP/NIK/Paspor harus diisi' }]}
          >
            <Input placeholder="Masukkan No. KTP/NIK/Paspor" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Tempat Lahir"
              name="tempatLahir"
              rules={[{ required: true, message: 'Tempat lahir harus diisi' }]}
            >
              <Input placeholder="Masukkan tempat lahir" />
            </Form.Item>

            <Form.Item
              label="Tanggal Lahir"
              name="tanggalLahir"
              rules={[{ required: true, message: 'Tanggal lahir harus diisi' }]}
            >
              <DatePicker className="w-full" format="DD-MM-YYYY" placeholder="Pilih tanggal lahir" />
            </Form.Item>
          </div>

          <Form.Item
            label="Jenis Kelamin"
            name="jenisKelamin"
            rules={[{ required: true, message: 'Jenis kelamin harus dipilih' }]}
          >
            <Select placeholder="Pilih jenis kelamin" options={[
              { label: 'Laki-laki', value: 'F' },
              { label: 'Perempuan', value: 'M' }
            ]} />
          </Form.Item>

          <Form.Item
            label="Kebangsaan"
            name="kebangsaan"
            rules={[{ required: true, message: 'Kebangsaan harus diisi' }]}
          >
            <Input placeholder="Masukkan kebangsaan" />
          </Form.Item>

          <Form.Item
            label="Alamat"
            name="alamat"
            rules={[{ required: true, message: 'Alamat harus diisi' }]}
          >
            <TextArea rows={3} placeholder="Masukkan alamat lengkap" />
          </Form.Item>

          <Form.Item
            label="Kode Pos"
            name="kodePos"
            rules={[{ required: true, message: 'Kode pos harus diisi' }]}
          >
            <Input type="number" placeholder="Masukkan kode pos" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="No. Telepon Rumah"
              name="telpRumah"
            >
              <Input placeholder="Masukkan no. telepon rumah" />
            </Form.Item>

            <Form.Item
              label="No. Telepon Kantor"
              name="telpKantor"
            >
              <Input placeholder="Masukkan no. telepon kantor" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="No. HP"
              name="telpHP"
              rules={[{ required: true, message: 'No. HP harus diisi' }]}
            >
              <Input placeholder="Masukkan no. HP" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email harus diisi' },
                { type: 'email', message: 'Format email tidak valid' }
              ]}
            >
              <Input type="email" placeholder="Masukkan email" />
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

      <Divider titlePlacement="left">b. Data Pekerjaan Sekarang</Divider>
      
      {!readOnly ? (
        <Form
          form={form}
          layout="vertical"
          initialValues={formData}
          className="w-full"
        >
          <Form.Item
            label="Nama Institusi/Perusahaan"
            name="namaInstitusi"
            rules={[{ required: true, message: 'Nama institusi/perusahaan harus diisi' }]}
          >
            <Input placeholder="Masukkan nama institusi/perusahaan" />
          </Form.Item>

          <Form.Item
            label="Jabatan"
            name="jabatan"
            rules={[{ required: true, message: 'Jabatan harus diisi' }]}
          >
            <Input placeholder="Masukkan jabatan" />
          </Form.Item>

          <Form.Item
            label="Alamat Kantor"
            name="alamatKantor"
            rules={[{ required: true, message: 'Alamat kantor harus diisi' }]}
          >
            <TextArea rows={3} placeholder="Masukkan alamat kantor lengkap" />
          </Form.Item>

          <Form.Item
            label="Kode Pos Kantor"
            name="kodePosKantor"
            rules={[{ required: true, message: 'Kode pos kantor harus diisi' }]}
          >
            <Input type="number" placeholder="Masukkan kode pos kantor" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="No. Telepon Kantor"
              name="telpKantorPerusahaan"
            >
              <Input placeholder="Masukkan no. telepon kantor" />
            </Form.Item>

            <Form.Item
              label="Fax Kantor"
              name="faxKantor"
            >
              <Input placeholder="Masukkan fax kantor" />
            </Form.Item>
          </div>

          <Form.Item
            label="Email Kantor"
            name="emailKantor"
            rules={[
              { type: 'email', message: 'Format email tidak valid' }
            ]}
          >
            <Input type="email" placeholder="Masukkan email kantor" />
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
