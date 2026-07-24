'use client';

import { useRequiredRule } from "@/i18n/validation";
import { useFormSchemaContext } from "@/context/FormSchema";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, DescriptionsProps, Form, Input, Row, theme } from "antd";
import { useTranslations } from 'next-intl';
import React, { useMemo } from "react";
import SelectUcFormSchema from "./SelectUcFormSchema";

export default function FormJobGroup() {
  const { token } = theme.useToken();
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const req = useRequiredRule();
  const { schema, formJobGroup, formJobGroupFinish, onBack, jobGroupValues } = useFormSchemaContext();

  const itemSchema: DescriptionsProps['items'] = useMemo(() => [
      {
        key: 'schema_code',
        label: t('scheme-code'),
        children: schema?.schema_code,
      },
      {
        key: 'schema_name',
        label: t('scheme-name'),
        children: schema?.schema_name,
      },
      {
        key: 'schema_license',
        label: t('scheme-license'),
        children: schema?.schema_license,
      },
      {
        key: 'schema_skkni',
        label: t('scheme-type'),
        children: schema?.schema_skkni,
      },
      {
        key: 'schema_year',
        label: t('scheme-year'),
        children: schema?.schema_year,
      }
    ]
  , [schema, t]);


  return (
    <>
      <div className="p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
        <h2 className="text-xl font-semibold mb-4">{tc('heading-data-skema')}</h2>
        <Descriptions
          column={2}
          layout="vertical"
          colon={false}
          items={itemSchema}
        />
      </div>

      <div className="mt-4 p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
        <h2 className="text-xl font-semibold mb-4">{tc('heading-master-kelompok-pekerjaan')}</h2>
        <Form form={formJobGroup} layout="vertical" className="w-full" onFinish={formJobGroupFinish}>
          <Form.List name="job_groups">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <React.Fragment key={key}>
                    <h3 className="text-lg font-semibold mb-2">{tc('label-kelompok-pekerjaan')} {name + 1}</h3>
                    <Row gutter={16} align="middle">
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'job_group_code']}
                          label={t('job-group-code')}
                          rules={[req('job-group-code')]}
                        >
                          <Input placeholder={t('placeholder-job-group-code')} />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          {...restField}
                          name={[name, 'job_group_name']}
                          label={t('job-group-name')}
                          rules={[req('job-group-name')]}
                        >
                          <Input placeholder={t('placeholder-job-group-name')} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Button type="dashed" onClick={() => remove(name)}>{t('btn-remove')}</Button>
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
                                <Button type="dashed" onClick={() => removeUc(ucName)}>{t('btn-remove')}</Button>
                              </Col>
                            </Row>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => addUc()} icon={<PlusOutlined />}>{t('btn-add-unit-competency')}</Button>
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </React.Fragment>
                ))}
                <Form.Item>
                  <Button block type="dashed" onClick={() => add()} icon={<PlusOutlined />}>{t('btn-add-job-group')}</Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </div>

      {/* Fixed Footer Actions Save & Cancel */}
      <div className="fixed bottom-0 left-0 w-full p-4 border-t-[2px] flex justify-end gap-2" style={{ background: token.colorBgContainer, borderTopColor: token.colorBorderSecondary }}>
        <Button onClick={onBack}>{tc('btn-kembali')}</Button>
        <Button type="primary" onClick={() => formJobGroup?.submit()}>
          {(jobGroupValues?.length ?? 0) > 0 ? tc('btn-simpan') : tc('btn-lanjutkan')}
        </Button>
      </div>
    </>
  )
}
