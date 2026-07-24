'use client';

import { useRequiredRule } from "@/i18n/validation";
import { useFormSchemaContext } from "@/context/FormSchema";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Col, Form, Input, Row, Select, CollapseProps, theme } from "antd";
import { useTranslations } from 'next-intl';
import React, { useMemo } from "react";

function UnitCompetencyContent({ name }: { name: number; }) {
  const t = useTranslations('form');
  const req = useRequiredRule();
  console.log('cek name', name)
  return (
    <>
      <Row gutter={16} align="middle">
        <Col span={12}>
          <Form.Item label={t('unit-code')} name={[name, 'competency_unit_code']} rules={[req('unit-code')]}>
            <Input placeholder={t('placeholder-unit-code')} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('unit-name')} name={[name, 'competency_unit_name']} rules={[req('unit-name')]}>
            <Input placeholder={t('placeholder-unit-name')} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('unit-sequence')} name={[name, 'sequence']} rules={[req('unit-sequence')]}>
            <Input placeholder={t('placeholder-unit-sequence')} type="number" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('unit-skkni')} name={[name, 'skk']} rules={[req('unit-skkni')]}>
            <Input placeholder={t('placeholder-unit-skkni')} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('unit-skkni-year')} name={[name, 'skk_year']} rules={[req('unit-skkni-year')]}>
            <Input placeholder={t('placeholder-unit-skkni-year')} type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Form.List name={[name, 'critical_aspects']}>
        {(aspectFields, { add: addAspect, remove: removeAspect }) => (
          <div className="ml-4! border-l-2 border-orange-200 pl-4">
            {aspectFields.map(({ key: aspectKey, name: aspectName, ...restAspectField }) => (
              <Row gutter={16} align="middle" key={aspectKey}>
                <Col span={20}>
                  <Form.Item {...restAspectField} label={t('critical-aspect')} name={[aspectName, 'aspect']} rules={[req('critical-aspect')]}>
                    <Input placeholder={t('placeholder-critical-aspect')} />
                  </Form.Item>
                </Col>
                <Col span={4} className="flex justify-end">
                  <Button danger onClick={() => removeAspect(aspectName)}>{t('btn-remove')}</Button>
                </Col>
              </Row>
            ))}
            <Form.Item className="ml-4">
              <Button type="dashed" onClick={() => addAspect()} className="w-full" icon={<PlusOutlined />}>
                {t('btn-add-aspect')}
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
                    <Form.Item {...restElementField} label={t('element-code')} name={[elementName, 'element_code']} rules={[req('element-code')]}>
                      <Input placeholder={t('placeholder-element-code')} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item {...restElementField} label={t('element-name')} name={[elementName, 'element_name']} rules={[req('element-name')]}>
                      <Input placeholder={t('placeholder-element-name')} />
                    </Form.Item>
                  </Col>
                  <Col span={4} className="flex justify-end">
                    <Button danger onClick={() => removeElement(elementName)}>{t('btn-remove')}</Button>
                  </Col>
                </Row>
                <Form.List name={[elementName, 'kuks']}>
                  {(kukFields, { add: addKuk, remove: removeKuk }) => (
                    <div className="ml-4! border-l-2 border-blue-200 pl-4">
                      {kukFields.map(({ key: kukKey, name: kukName, ...restKukField }) => (
                        <Row gutter={16} align="middle" key={kukKey}>
                          <Col span={10}>
                            <Form.Item {...restKukField} label={t('kuk-code')} name={[kukName, 'kuk_code']} rules={[req('kuk-code')]}>
                              <Input placeholder={t('placeholder-kuk-code')} />
                            </Form.Item>
                          </Col>
                          <Col span={10}>
                            <Form.Item {...restKukField} label={t('kuk-name')} name={[kukName, 'kuk_name']} rules={[req('kuk-name')]}>
                              <Input placeholder={t('placeholder-kuk-name')} />
                            </Form.Item>
                          </Col>
                          <Col span={4} className="flex justify-end">
                            <Button danger onClick={() => removeKuk(kukName)}>{t('btn-remove')}</Button>
                          </Col>
                        </Row>
                      ))}
                      <Form.Item className="ml-4">
                        <Button type="dashed" onClick={() => addKuk()} className="w-full" icon={<PlusOutlined />}>
                          {t('btn-add-kuk')}
                        </Button>
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
              </React.Fragment>
            ))}
            <Form.Item className="ml-4">
              <Button type="dashed" onClick={() => addElement()} className="w-full" icon={<PlusOutlined />}>
                {t('btn-add-element')}
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
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const req = useRequiredRule();
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
            <h2 className="font-bold text-xl mb-2">{t('heading-detail-scheme')}</h2>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label={t('scheme-code')} name="schema_code" rules={[req('scheme-code')]}>
                  <Input className="w-full p-2 border rounded" placeholder={t('placeholder-scheme-code')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('scheme-name')} name="schema_name" rules={[req('scheme-name')]}>
                  <Input className="w-full p-2 border rounded" placeholder={t('placeholder-scheme-name')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('scheme-license')} name="schema_license" rules={[req('scheme-license')]}>
                  <Select placeholder={t('placeholder-scheme-license')} className="w-full" options={[
                    { label: 'Standard', value: 'standard' },
                    { label: 'SJJ', value: 'sjj' },
                    { label: 'Paperless', value: 'paperless' },
                  ]} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label={t('scheme-type')} name="schema_skkni" rules={[req('scheme-type')]}>
                  <Input className="w-full p-2 border rounded" placeholder={t('placeholder-scheme-type')} />
                </Form.Item>
              </Col>
              <Col span={12}>
                  <Form.Item label={t('scheme-year')} name="schema_year" rules={[req('scheme-year')]}>
                    <Input className="w-full p-2 border rounded" placeholder={t('placeholder-scheme-year')} type="number" />
                  </Form.Item>
              </Col>
            </Row>
          </Card>

          <Card className="mt-4!">
            <h2 className="font-bold text-xl mb-2">{t('heading-unit-competency')}</h2>
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
                        {t('btn-add-unit')}
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
        <Button onClick={onBack}>{tc('btn-kembali')}</Button>
        <Button type="primary" onClick={() => formSchema?.submit()}>
          {isRevisit ? tc('btn-simpan') : tc('btn-lanjutkan')}
        </Button>
      </div>
    </>
  )
}
