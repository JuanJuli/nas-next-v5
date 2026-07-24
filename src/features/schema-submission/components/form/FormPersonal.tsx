'use client'

import { Divider, Form, Input, Select, DatePicker, Row, Col } from 'antd'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRequiredRule } from '@/i18n/validation'

const { Option } = Select
const { TextArea } = Input

export default function FormPersonalRequirement() {
  const t = useTranslations('form')
  const tc = useTranslations('common')
  const req = useRequiredRule()
  const [form] = Form.useForm()
  const [isPekerjaan, setIsPekerjaan] = useState(false)

  const handlePekerjaanChange = (value: string) => {
    setIsPekerjaan(value !== 'belum_bekerja')
    if (value === 'belum_bekerja') {
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
  }

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Divider titlePlacement="left">{tc('heading-bagian-1')}</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('full-name')}
              name="nama"
              rules={[req('full-name')]}
            >
              <Input placeholder={t('placeholder-full-name')} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('nik')}
              name="nik"
              rules={[
                { required: true, message: t('nik-required') },
                { pattern: /^\d{16}$/, message: t('nik-digit') }
              ]}
            >
              <Input placeholder={t('placeholder-nik')} maxLength={16} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('birth-date')}
              name="tanggal_lahir"
              rules={[req('birth-date')]}
            >
              <DatePicker 
                className="w-full" 
                placeholder={t('placeholder-birth-date')}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('gender')}
              name="jenis_kelamin"
              rules={[req('gender')]}
            >
              <Select placeholder={t('placeholder-select-gender')}>
                <Option value="laki-laki">{t('label-male')}</Option>
                <Option value="perempuan">{t('label-female')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('nationality')}
              name="kebangsaan"
              rules={[req('nationality')]}
            >
              <Select placeholder={t('placeholder-select-nationality')}>
                <Option value="WNI">{t('label-wni')}</Option>
                <Option value="WNA">{t('label-wna')}</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={t('label-contact')}
              name="kontak"
              rules={[
                { required: true, message: t('field-required', { field: t('label-contact') }) },
                { pattern: /^[0-9]{10,13}$/, message: t('phone-digit') }
              ]}
            >
              <Input placeholder={t('placeholder-phone')} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={18}>
            <Form.Item
              label={t('address')}
              name="alamat"
              rules={[req('address')]}
            >
              <TextArea 
                placeholder={t('placeholder-address')} 
                rows={3}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label={t('postal-code')}
              name="kode_pos"
              rules={[
                { required: true, message: t('field-required', { field: t('postal-code') }) },
                { pattern: /^\d{5}$/, message: t('postal-code-digit') }
              ]}
            >
              <Input placeholder={t('placeholder-postal-code')} maxLength={5} />
            </Form.Item>
          </Col>
        </Row>

        <Divider titlePlacement="left">{t('label-education-detail')}</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('label-last-education')}
              name="pendidikan"
              rules={[req('label-last-education')]}
            >
              <Select placeholder={t('placeholder-select-education')}>
                <Option value="SMA/Sederajat">{t('label-sma')}</Option>
                <Option value="D3">{t('label-d3')}</Option>
                <Option value="S1">{t('label-s1')}</Option>
                <Option value="S2">{t('label-s2')}</Option>
                <Option value="S3">{t('label-s3')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider titlePlacement="left">{t('label-employment-detail')}</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('label-employment-status')}
              name="pekerjaan"
              rules={[req('label-employment-status')]}
            >
              <Select 
                placeholder={t('placeholder-select-employment')}
                onChange={handlePekerjaanChange}
              >
                <Option value="belum_bekerja">{t('label-not-working')}</Option>
                <Option value="pegawai_swasta">{t('label-private-employee')}</Option>
                <Option value="pegawai_negeri">{t('label-civil-servant')}</Option>
                <Option value="wiraswasta">{t('label-entrepreneur')}</Option>
                <Option value="lainnya">{t('label-other')}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {isPekerjaan && (
          <>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={t('institution-name')}
                  name="institusi"
                  rules={[req('institution-name')]}
                >
                  <Input placeholder={t('placeholder-institution')} />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={t('position')}
                  name="jabatan"
                  rules={[req('position')]}
                >
                  <Input placeholder={t('placeholder-position')} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={t('label-institution-email')}
                  name="email_pekerjaan"
                  rules={[
                    { required: true, message: t('field-required', { field: t('label-institution-email') }) },
                    { type: 'email', message: t('email-invalid') }
                  ]}
                >
                  <Input placeholder="email@perusahaan.com" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label={t('label-office-contact')}
                  name="kontak_institusi"
                  rules={[
                    { required: true, message: t('field-required', { field: t('label-office-contact') }) },
                    { pattern: /^[0-9]{10,13}$/, message: t('phone-digit') }
                  ]}
                >
                  <Input placeholder={t('placeholder-phone')} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={18}>
                <Form.Item
                  label={t('label-institution-address')}
                  name="alamat_institusi"
                  rules={[req('label-institution-address')]}
                >
                  <TextArea 
                    placeholder={t('placeholder-office-address')} 
                    rows={3}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} md={6}>
                <Form.Item
                  label={t('label-institution-postal-code')}
                  name="kode_pos_pekerjaan"
                  rules={[
                    { required: true, message: t('field-required', { field: t('label-institution-postal-code') }) },
                    { pattern: /^\d{5}$/, message: t('postal-code-digit') }
                  ]}
                >
                  <Input placeholder={t('placeholder-office-postal-code')} maxLength={5} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Divider titlePlacement="left">{t('label-lainnya')}</Divider>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={t('label-workplace')}
              name="tuk"
              rules={[req('label-workplace')]}
            >
              <Select placeholder={t('placeholder-select-tuk')}>
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
