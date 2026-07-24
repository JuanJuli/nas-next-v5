'use client';

import { useFormSchemaContext } from "@/context/FormSchema";
import { Button, Collapse, CollapseProps, Descriptions, DescriptionsProps, Form, Switch, theme } from "antd";
import { useTranslations } from 'next-intl';
import { useMemo } from "react";

interface AssessmentTool {
  code: string;
  name: string;
  showInAssesi?: boolean;
}

interface AssessmentCategory {
  label: string;
  groups: {
    label: string;
    tools: AssessmentTool[];
  }[];
}

const defaultAssessmentTools: AssessmentCategory[] = [
  {
    label: "General",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "APL.01", name: "APL.01" },
          { code: "APL.02", name: "APL.02" },
          { code: "SKEMA", name: "Skema Sertifikasi" },
          { code: "SK", name: "Standar Kompetensi" },
          { code: "AK.07", name: "AK.07" },
          { code: "AK.04", name: "AK.04" },
          { code: "AK.01", name: "AK.01" },
        ],
      },
      {
        label: "Laporan Asesmen",
        tools: [
          { code: "AK.05", name: "AK.05" },
          { code: "AK.06", name: "AK.06" },
          { code: "FR.VA", name: "FR.VA" },
        ],
      },
    ],
  },
  {
    label: "Observasi",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "MAPA.01", name: "MAPA.01" },
          { code: "MAPA.02", name: "MAPA.02" },
        ],
      },
      {
        label: "Asesmen",
        tools: [
          { code: "IA.01", name: "IA.01" },
          { code: "IA.02", name: "IA.02" },
          { code: "IA.03", name: "IA.03" },
        ],
      },
    ],
  },
  {
    label: "DIT",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "MAPA.01", name: "MAPA.01" },
          { code: "MAPA.02", name: "MAPA.02" },
        ],
      },
      {
        label: "Asesmen",
        tools: [
          { code: "IA.04A", name: "IA.04A" },
          { code: "IA.04B", name: "IA.04B" },
          { code: "IA.05A", name: "IA.05A" },
          { code: "IA.07", name: "IA.07" },
        ],
      },
    ],
  },
  {
    label: "Portfolio",
    groups: [
      {
        label: "Pra Asesmen",
        tools: [
          { code: "MAPA.01", name: "MAPA.01" },
          { code: "MAPA.02", name: "MAPA.02" },
        ],
      },
      {
        label: "Asesmen",
        tools: [
          { code: "IA.08", name: "IA.08" },
          { code: "IA.09", name: "IA.09" },
        ],
      },
    ],
  },
];

export default function FormAssessmentTools() {
  const { token } = theme.useToken();
  const t = useTranslations('form');
  const tc = useTranslations('common');
  const { schema, formAssessmentTools, formAssessmentToolsFinish, onBack } = useFormSchemaContext();

  const itemSchema: DescriptionsProps['items'] = useMemo(() => [
    { key: 'schema_code', label: t('scheme-code'), children: schema?.schema_code },
    { key: 'schema_name', label: t('scheme-name'), children: schema?.schema_name },
    { key: 'schema_license', label: t('scheme-license'), children: schema?.schema_license },
    { key: 'schema_skkni', label: t('scheme-type'), children: schema?.schema_skkni },
    { key: 'schema_year', label: t('scheme-year'), children: schema?.schema_year },
  ], [schema, t]);

  const collapseItems: CollapseProps['items'] = useMemo(() => defaultAssessmentTools.map((category, catIndex) => ({
    key: String(catIndex),
    label: category.label,
    children: (
      <>
        {category.groups.map((group) => (
          <div key={group.label} className="mb-4">
            <h4 className="text-base font-medium mb-2">{group.label}</h4>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: token.colorBgElevated }}>
                  <th className="text-left p-2 text-sm font-medium" style={{ border: `1px solid ${token.colorBorderSecondary}` }}>{t('heading-assessment-tool')}</th>
                  <th className="text-center p-2 text-sm font-medium w-24" style={{ border: `1px solid ${token.colorBorderSecondary}` }}>{t('heading-asesi')}</th>
                </tr>
              </thead>
              <tbody>
                {group.tools.map((tool) => (
                  <tr key={tool.code}>
                    <td className="p-2 text-sm" style={{ border: `1px solid ${token.colorBorderSecondary}` }}>{tool.name}</td>
                    <td className="p-2 text-center" style={{ border: `1px solid ${token.colorBorderSecondary}` }}>
                      <Form.Item
                        name={[category.label.toLowerCase(), group.label.toLowerCase(), tool.code]}
                        valuePropName="checked"
                        noStyle
                      >
                        <Switch size="small" />
                      </Form.Item>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <p className="text-xs mt-2" style={{ color: token.colorTextTertiary }}>{t('hint-show-asesi')}</p>
      </>
    ),
  })), [token, t]);

  return (
    <>
      <div className="p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
        <h2 className="text-xl font-semibold mb-4">{tc('heading-data-skema')}</h2>
        <Descriptions column={2} layout="vertical" colon={false} items={itemSchema} />
      </div>

      <div className="mt-4 p-4 rounded-lg shadow-md" style={{ background: token.colorBgContainer }}>
        <h2 className="text-xl font-semibold mb-4">{t('heading-assessment-tools')}</h2>
        <Form form={formAssessmentTools} layout="vertical" onFinish={formAssessmentToolsFinish}>
          <Collapse
            defaultActiveKey={defaultAssessmentTools.map((_, i) => String(i))}
            destroyOnHidden={false}
            items={collapseItems}
          />
        </Form>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 border-t-[2px] flex justify-end gap-2" style={{ background: token.colorBgContainer, borderTopColor: token.colorBorderSecondary }}>
        <Button onClick={onBack}>{tc('btn-kembali')}</Button>
        <Button type="primary" onClick={() => formAssessmentTools?.submit()}>{tc('btn-simpan')}</Button>
      </div>
    </>
  );
}