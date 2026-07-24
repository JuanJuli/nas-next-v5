'use client'

import { Divider, Form, Input, Select, DatePicker, Row, Col } from 'antd'
import { useState } from 'react'

const { Option } = Select
const { TextArea } = Input

export default function FormPersonalRequirement() {
  const [form] = Form.useForm()
  const [isPekerjaan, setIsPekerjaan] = useState(false)

  const handlePekerjaanChange = (value: string) => {
    setIsPekerjaan(value !== 'belum_bekerja')
    if (value === 'belum_bekerja') {
      // Reset field pekerjaan jika memilih belum bekerja
      form.setFieldsValue({
        institusi: undefined,
        jabatan: undefined,
        email_pekerjaan: undefined,
        kode_pos_pekerjaan: undefined,
        alamat_institusi: undefined,
        kontak_institusi: undefined,
      })
    }
  }

  const handleSubmit = (values: any) => {
    console.log('Form values:', values)
    // Handle submit logic here
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Divider titlePlacement="left">Data Pribadi</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Nama Lengkap"
              name="nama"
              rules={[{ required: true, message: 'Nama lengkap wajib diisi' }]}
            >
              <Input placeholder="Masukkan nama lengkap" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="NIK"
              name="nik"
              rules={[
                { required: true, message: 'NIK wajib diisi' },
                { pattern: /^\d{16}$/, message: 'NIK harus 16 digit angka' }
              ]}
            >
              <Input placeholder="Masukkan NIK" maxLength={16} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tanggal Lahir"
              name="tanggal_lahir"
              rules={[{ required: true, message: 'Tanggal lahir wajib diisi' }]}
            >
              <DatePicker 
                className="w-full" 
                placeholder="Pilih tanggal lahir"
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Jenis Kelamin"
              name="jenis_kelamin"
              rules={[{ required: true, message: 'Jenis kelamin wajib diisi' }]}
            >
              <Select placeholder="Pilih jenis kelamin">
                <Option value="laki-laki">Laki-laki</Option>
                <Option value="perempuan">Perempuan</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Kebangsaan"
              name="kebangsaan"
              rules={[{ required: true, message: 'Kebangsaan wajib diisi' }]}
            >
              <Select placeholder="Pilih kebangsaan">
                <Option value="WNI">WNI</Option>
                <Option value="WNA">WNA</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Kontak (No. HP)"
              name="kontak"
              rules={[
                { required: true, message: 'Kontak wajib diisi' },
                { pattern: /^[0-9]{10,13}$/, message: 'Nomor HP harus 10-13 digit' }
              ]}
            >
              <Input placeholder="Masukkan nomor HP" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={18}>
            <Form.Item
              label="Alamat"
              name="alamat"
              rules={[{ required: true, message: 'Alamat wajib diisi' }]}
            >
              <TextArea 
                placeholder="Masukkan alamat lengkap" 
                rows={3}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Kode Pos"
              name="kode_pos"
              rules={[
                { required: true, message: 'Kode pos wajib diisi' },
                { pattern: /^\d{5}$/, message: 'Kode pos harus 5 digit' }
              ]}
            >
              <Input placeholder="Kode pos" maxLength={5} />
            </Form.Item>
          </Col>
        </Row>

        <Divider titlePlacement="left">Detail Pendidikan</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Pendidikan Terakhir"
              name="pendidikan"
              rules={[{ required: true, message: 'Pendidikan terakhir wajib diisi' }]}
            >
              <Select placeholder="Pilih pendidikan terakhir">
                <Option value="SMA/Sederajat">SMA/Sederajat</Option>
                <Option value="D3">D3</Option>
                <Option value="S1">S1</Option>
                <Option value="S2">S2</Option>
                <Option value="S3">S3</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider titlePlacement="left">Detail Pekerjaan</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Status Pekerjaan"
              name="pekerjaan"
              rules={[{ required: true, message: 'Status pekerjaan wajib diisi' }]}
            >
              <Select 
                placeholder="Pilih status pekerjaan"
                onChange={handlePekerjaanChange}
              >
                <Option value="belum_bekerja">Belum Bekerja</Option>
                <Option value="pegawai_swasta">Pegawai Swasta</Option>
                <Option value="pegawai_negeri">Pegawai Negeri</Option>
                <Option value="wiraswasta">Wiraswasta</Option>
                <Option value="lainnya">Lainnya</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {isPekerjaan && (
          <>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Nama Institusi"
                  name="institusi"
                  rules={[{ required: true, message: 'Nama institusi wajib diisi' }]}
                >
                  <Input placeholder="Masukkan nama institusi" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Jabatan"
                  name="jabatan"
                  rules={[{ required: true, message: 'Jabatan wajib diisi' }]}
                >
                  <Input placeholder="Masukkan jabatan" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email Pekerjaan"
                  name="email_pekerjaan"
                  rules={[
                    { required: true, message: 'Email pekerjaan wajib diisi' },
                    { type: 'email', message: 'Format email tidak valid' }
                  ]}
                >
                  <Input placeholder="email@perusahaan.com" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Kontak Institusi"
                  name="kontak_institusi"
                  rules={[
                    { required: true, message: 'Kontak institusi wajib diisi' },
                    { pattern: /^[0-9]{10,13}$/, message: 'Nomor telepon harus 10-13 digit' }
                  ]}
                >
                  <Input placeholder="Masukkan nomor telepon institusi" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={18}>
                <Form.Item
                  label="Alamat Institusi"
                  name="alamat_institusi"
                  rules={[{ required: true, message: 'Alamat institusi wajib diisi' }]}
                >
                  <TextArea 
                    placeholder="Masukkan alamat institusi" 
                    rows={3}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={6}>
                <Form.Item
                  label="Kode Pos Institusi"
                  name="kode_pos_pekerjaan"
                  rules={[
                    { required: true, message: 'Kode pos wajib diisi' },
                    { pattern: /^\d{5}$/, message: 'Kode pos harus 5 digit' }
                  ]}
                >
                  <Input placeholder="Kode pos" maxLength={5} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Divider titlePlacement="left">Lainnya</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Tempat Uji Kompetensi (TUK)"
              name="tuk"
              rules={[{ required: true, message: 'TUK wajib dipilih' }]}
            >
              <Select placeholder="Pilih TUK">
                <Option value="tuk_1">TUK 1 - Jakarta Pusat</Option>
                <Option value="tuk_2">TUK 2 - Bandung</Option>
                <Option value="tuk_3">TUK 3 - Surabaya</Option>
                <Option value="tuk_4">TUK 4 - Medan</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
