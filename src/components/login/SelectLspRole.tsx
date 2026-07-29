'use client';

import { Card, Typography, Button, Avatar, Space } from 'antd';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import { User } from 'lucide-react';

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
        backgroundColor: 'var(--background)',
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
          <Title level={2} style={{ color: 'var(--primary)' }}>
            Pilih LSP dan Role
          </Title>
          <Text type="secondary">
            Silakan pilih LSP dan role yang sesuai untuk melanjutkan
          </Text>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
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
              <Title level={4} style={{ marginTop: 0, color: 'var(--primary)' }}>
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
                      <Avatar size={64} icon={<User />} />
                      <Space vertical className='ml-[25px]'>
                        <div style={{ fontWeight: 600 }}>{roleName}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted-foreground)', marginTop: '4px' }}>
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
