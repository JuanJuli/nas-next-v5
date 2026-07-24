'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Col, Form, Input, Row, Select, CollapseProps, theme } from "antd";
import React, { useMemo } from "react";

function UnitCompetencyContent({ name }: { name: number; }) {
  console.log('cek name', name)
  return (
    <>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <Form.Item label="Kode Unit" name={[name, 'competency_unit_code']} rules={[{ required: true, message: 'Mohon masukkan kode unit kompetensi' }]}>
            <Input placeholder="Masukkan kode unit kompetensi" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Nama Unit" name={[name, 'competency_unit_name']} rules={[{ required: true, message: 'Mohon masukkan nama unit kompetensi' }]}>
            <Input placeholder="Masukkan nama unit kompetensi" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Urutan" name={[name, 'sequence']} rules={[{ required: true, message: 'Mohon masukkan urutan unit kompetensi' }]}>
            <Input placeholder="Masukkan urutan unit kompetensi" type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="SKKNI / SKKK" name={[name, 'skk']} rules={[{ required: true, message: 'Mohon masukkan SKKNI / SKKK unit kompetensi' }]}>
            <Input placeholder="Masukkan SKKNI / SKKK unit kompetensi" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tahun SKKNI / SKKK" name={[name, 'skk_year']} rules={[{ required: true, message: 'Mohon masukkan tahun SKKNI / SKKK unit kompetensi' }]}>
            <Input placeholder="Masukkan tahun SKKNI / SKKK unit kompetensi" type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.List name={[name, 'critical_aspects']}>
        {(aspectFields, { add: addAspect, remove: removeAspect }) => (
          <div className="ml-4! border-l-2 border-orange-200 pl-4">
            {aspectFields.map(({ key: aspectKey, name: aspectName, ...restAspectField }) => (
              <Row gutter={16} align="middle" key={aspectKey}>
                <Col span={20}>
                  <Form.Item {...restAspectField} label="Aspek Kritis" name={[aspectName, 'aspect']} rules={[{ required: true, message: 'Mohon masukkan aspek kritis' }]}>
                    <Input placeholder="Masukkan aspek kritis" />
                  </Form.Item>
                </Col>
                <Col span={4} className="flex justify-end">
                  <Button danger onClick={() => removeAspect(aspectName)}>Remove</Button>
                </Col>
              </Row>
            ))}
            <Form.Item className="ml-4">
              <Button type="dashed" onClick={() => addAspect()} className="w-full" icon={<PlusOutlined />}>
                Add Aspek Kritis
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
      <Form.List name={[name, 'elements']}>
        {(elementFields, { add: addElement, remove: removeElement }) => (
          <div className="ml-4! border-l-2 border-green-200 pl-4">
            {elementFields.map(({ key: elementKey, name: elementName, ...restElementField }) => (
              <React.Fragment key={elementKey}>
                <Row gutter={16} align="middle">
                  <Col span={10}>
                    <Form.Item {...restElementField} label="Nomor Elemen" name={[elementName, 'element_code']} rules={[{ required: true, message: 'Mohon masukkan kode elemen kompetensi' }]}>
                      <Input placeholder="Masukkan kode elemen kompetensi" />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item {...restElementField} label="Nama Elemen" name={[elementName, 'element_name']} rules={[{ required: true, message: 'Mohon masukkan nama elemen kompetensi' }]}>
                      <Input placeholder="Masukkan nama elemen kompetensi" />
                    </Form.Item>
                  </Col>
                  <Col span={4} className="flex justify-end">
                    <Button danger onClick={() => removeElement(elementName)}>Remove</Button>
                  </Col>
                </Row>
                <Form.List name={[elementName, 'kuks']}>
                  {(kukFields, { add: addKuk, remove: removeKuk }) => (
                    <div className="ml-4! border-l-2 border-blue-200 pl-4">
                      {kukFields.map(({ key: kukKey, name: kukName, ...restKukField }) => (
                        <Row gutter={16} align="middle" key={kukKey}>
                          <Col span={10}>
                            <Form.Item {...restKukField} label="Nomor KUK" name={[kukName, 'kuk_code']} rules={[{ required: true, message: 'Mohon masukkan kode KUK' }]}>
                              <Input placeholder="Masukkan kode KUK" />
                            </Form.Item>
                          </Col>
                          <Col span={10}>
                            <Form.Item {...restKukField} label="KUK" name={[kukName, 'kuk_name']} rules={[{ required: true, message: 'Mohon masukkan KUK' }]}>
                              <Input placeholder="Masukkan KUK" />
                            </Form.Item>
                          </Col>
                          <Col span={4} className="flex justify-end">
                            <Button danger onClick={() => removeKuk(kukName)}>Remove</Button>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item className="ml-4">
                        <Button type="dashed" onClick={() => addKuk()} className="w-full" icon={<PlusOutlined />}>
                          Add KUK
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </React.Fragment>
            ))}
            <Form.Item className="ml-4">
              <Button type="dashed" onClick={() => addElement()} className="w-full" icon={<PlusOutlined />}>
                Add Elemen Kompetensi
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    </>
  );
}

function HeaderLabel({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <span>{name}</span>
      <Button danger onClick={onRemove} icon={<DeleteOutlined />} />
    </div>
  );
}

export default function FormSchema() {
  const { token } = theme.useToken();
  const { formSchema, formSchemaFinish, onBack, schema } = useFormSchemaContext();
  const fValue = Form.useWatch([], formSchema);

  const listCompetencyByName: string[] = useMemo(() => {
    const competencyUnits = formSchema?.getFieldValue('competency_unit') || [];
    return competencyUnits.map((unit: any, index: number) => unit?.competency_unit_name || `Unit Kompetensi ${index + 1}`);
  }, [fValue]);

  const isRevisit = useMemo(() => {
    return !!schema;
  }, [schema])

  const handleFinish = (data: any) => {
    console.log('data', data)

    formSchemaFinish?.(data)
  }
 
  return (
    <>
      <div>
        <Form onFinish={handleFinish} form={formSchema} layout="vertical" scrollToFirstError={{ block: 'center' }}>
          <Card>
            <h2 className="font-bold text-xl mb-2">Detail Skema</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Kode Skema Sertifikasi" name="schema_code" rules={[{ required: true, message: 'Mohon masukkan kode skema sertifikasi' }]}>
                  <Input className="w-full p-2 border rounded" placeholder="Masukkan kode skema sertifikasi" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nama Skema Sertifikasi" name="schema_name" rules={[{ required: true, message: 'Mohon masukkan nama skema sertifikasi' }]}>
                  <Input className="w-full p-2 border rounded" placeholder="Masukkan nama skema sertifikasi" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Lisensi Skema Sertifikasi" name="schema_license" rules={[{ required: true, message: 'Mohon masukkan lisensi skema sertifikasi' }]}>
                  <Select placeholder="Pilih lisensi skema sertifikasi" className="w-full" options={[
                    { label: 'Standard', value: 'standard' },
                    { label: 'SJJ', value: 'sjj' },
                    { label: 'Paperless', value: 'paperless' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Jenis Skema Sertifikasi" name="schema_skkni" rules={[{ required: true, message: 'Mohon masukkan jenis skema sertifikasi' }]}>
                  <Input className="w-full p-2 border rounded" placeholder="Masukkan jenis skema sertifikasi" />
                </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item label="Tahun Skema Sertifikasi" name="schema_year" rules={[{ required: true, message: 'Mohon masukkan tahun skema sertifikasi' }]}>
                    <Input className="w-full p-2 border rounded" placeholder="Masukkan tahun skema sertifikasi" type="number" />
                  </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card className="mt-4!">
            <h2 className="font-bold text-xl mb-2">Unit Kompetensi</h2>
            <Form.List name="competency_unit">
              {(fields, { add, remove }) => {
                const items: CollapseProps['items'] = fields.map(({ key, name }) => ({
                  key: String(key),
                  classNames: { header: 'flex! items-center!' },
                  label: <HeaderLabel name={listCompetencyByName[name]} onRemove={() => remove(name)} />,
                  children: <UnitCompetencyContent name={name} />,
                }));

                return (
                  <>
                    <Collapse
                      defaultActiveKey={fields.length > 0 ? [String(fields[0].key)] : []}
                      destroyOnHidden ={false}
                      items={items}
                    />
                    <Form.Item className="mt-2">
                      <Button type="dashed" onClick={() => add()} className="w-full mt-2" icon={<PlusOutlined />}>
                        Add Unit Kompetensi
                      </Button>
                    </Form.Item>
                  </>
                );
              }}
            </Form.List>
          </Card>
        </Form>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 border-t-[2px] flex justify-end gap-2" style={{ background: token.colorBgContainer, borderTopColor: token.colorBorderSecondary }}>
        <Button onClick={onBack}>Kembali ke Daftar Skema</Button>
        <Button type="primary" onClick={() => formSchema?.submit()}>
          {isRevisit ? 'Simpan' : 'Simpan & Lanjutkan'}
        </Button>
      </div>
    </>
  )
}
