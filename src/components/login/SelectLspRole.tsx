'use client';

import { Card, Typography, Alert, Button, theme, Avatar, Space } from 'antd';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import { UserOutlined } from '@ant-design/icons';

const { useToken } = theme;
const { Title, Text } = Typography;

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

interface SelectLspRoleProps {
  listLsp: LspLoginResponse[];
  handleGenerateToken?: (payload: iPayloadGenerateToken, token: string) => Promise<void>;
  token?: string;
  errorMessage?: string;
  loading?: boolean;
  containerStyle?: React.CSSProperties;
  maxWidth?: string;
  showLogo?: boolean;
  logoElement?: React.ReactNode;
}

export default function SelectLspRole({
  listLsp,
  handleGenerateToken,
  token,
  errorMessage = '',
  loading = false,
  containerStyle,
  maxWidth = '800px',
  showLogo = false,
  logoElement,
}: SelectLspRoleProps) {
  const { token: themeToken } = useToken();
  const isMobile = useIsMobile();

  const handleSelectLspRole = (lsp: LspLoginResponse, roleIndex: number) => {
    if (handleGenerateToken && token) {
      const payload: iPayloadGenerateToken = {
        lsp_id: lsp.lsp_id,
        tuk_id: lsp.tuk_id,
        role_code: lsp.role_code[roleIndex],
        institution_id: lsp.institution_id,
      };
      handleGenerateToken(payload, token);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeToken.colorBgContainer,
        padding: '16px',
        ...containerStyle,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: maxWidth,
          padding: isMobile ? '24px' : '40px',
        }}
      >
        {showLogo && logoElement && (
          <div style={{ marginBottom: '32px' }}>
            {logoElement}
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ color: themeToken.colorPrimary }}>
            Pilih LSP dan Role
          </Title>
          <Text type="secondary">
            Silakan pilih LSP dan role yang sesuai untuk melanjutkan
          </Text>
        </div>

        {errorMessage && (
          <Alert
            title="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            style={{ marginBottom: '16px' }}
          />
        )}

        <div style={{ display: 'grid', gap: '16px' }}>
          {listLsp.map((lsp, lspIndex) => (
            <Card
              key={lspIndex}
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
              }}
            >
              <Title level={4} style={{ marginTop: 0, color: themeToken.colorPrimary }}>
                {lsp.lsp_name}
              </Title>
              <div style={{ display: 'grid', gap: '8px', marginTop: '16px' }}>
                {lsp.role_name.map((roleName, roleIndex) => (
                  <Button
                    key={roleIndex}
                    type="default"
                    size="large"
                    onClick={() => handleSelectLspRole(lsp, roleIndex)}
                    loading={loading}
                    style={{
                      textAlign: 'left',
                      height: 'auto',
                      padding: '12px 16px',
                    }}
                  >
                    <div className='flex items-center w-full'>
                      <Avatar size={64} icon={<UserOutlined />} />
                      <Space vertical className='ml-[25px]'>
                        <div style={{ fontWeight: 600 }}>{roleName}</div>
                        <div style={{ fontSize: '12px', color: themeToken.colorTextSecondary, marginTop: '4px' }}>
                          {lsp.lsp_name}
                        </div>
                      </Space>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
