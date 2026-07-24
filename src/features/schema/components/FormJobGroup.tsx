'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, DescriptionsProps, Form, Input, Row, theme } from "antd";
import React, { useMemo } from "react";
import SelectUcFormSchema from "./SelectUcFormSchema";

export default function FormJobGroup() {
  const { token } = theme.useToken();
  const { schema, formJobGroup, formJobGroupFinish, onBack, jobGroupValues } = useFormSchemaContext();

  const itemSchema: DescriptionsProps['items'] = useMemo(() => [
      {
        label: "Kode Skema",
        children: schema?.schema_code,
      },
      {
        label: 'Nama Skema',
        children: schema?.schema_name,
      },
      {
        label: 'Lisensi Skema',
        children: schema?.schema_license,
      },
      {
        label: 'Jenis Skema',
        children: schema?.schema_skkni,
      },
      {
        label: 'Tahun Skema',
        children: schema?.schema_year,
      }
    ]
  , [schema]);


  return (
    <>
      <div className="p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
        <h2 className="text-xl font-semibold mb-4">Data Skema Sertifikasi</h2>
        <Descriptions
          column={2}
          layout="vertical"
          colon={false}
          items={itemSchema}
        />
      </div>

      <div className="mt-4 p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
        <h2 className="text-xl font-semibold mb-4">Master Data Kelompok Pekerjaan</h2>
        <Form form={formJobGroup} layout="vertical" className="w-full" onFinish={formJobGroupFinish}>
          <Form.List name="job_groups">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <React.Fragment key={key}>
                    <h3 className="text-lg font-semibold mb-2">Kelompok Pekerjaan {name + 1}</h3>
                    <Row gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'job_group_code']}
                          label="Nomor Kelompok Pekerjaan"
                          rules={[{ required: true, message: 'Nomor Kelompok Pekerjaan is required' }]}
                        >
                          <Input placeholder="Nomor Kelompok Pekerjaan" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'job_group_name']}
                          label="Nama Kelompok Pekerjaan"
                          rules={[{ required: true, message: 'Nama Kelompok Pekerjaan is required' }]}
                        >
                          <Input placeholder="Nama Kelompok Pekerjaan" />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button type="dashed" onClick={() => remove(name)}>Remove</Button>
                      </Col>
                    </Row>
                    <Form.List name={[name, 'unit_competencies']}>
                      {(unitCompetencyField, { add: addUc, remove: removeUc }) => (
                        <div className="ml-4! border-l-2 border-green-200 pl-4">
                          {unitCompetencyField.map(({ key: ucKey, name: ucName, ...restUcField }) => (
                            <Row gutter={16} align="middle" key={ucKey}>
                              <Col span={20}>
                                <SelectUcFormSchema restFields={restUcField} number={ucName} parentNumber={name} />
                              </Col>
                              <Col span={4}>
                                <Button type="dashed" onClick={() => removeUc(ucName)}>Remove</Button>
                              </Col>
                            </Row>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => addUc()} icon={<PlusOutlined />}>Add Unit Kompetensi</Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </React.Fragment>
                ))}
                <Form.Item>
                  <Button block type="dashed" onClick={() => add()} icon={<PlusOutlined />}>Add Job Group</Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>

      {/* Fixed Footer Actions Save & Cancel */}
      <div className="fixed bottom-0 left-0 w-full p-4 border-t-[2px] flex justify-end gap-2" style={{ background: token.colorBgContainer, borderTopColor: token.colorBorderSecondary }}>
        <Button onClick={onBack}>Kembali ke Data Skema</Button>
        <Button type="primary" onClick={() => formJobGroup?.submit()}>
          {(jobGroupValues?.length ?? 0) > 0 ? 'Simpan' : 'Simpan & Lanjutkan'}
        </Button>
      </div>
    </>
  )
}
