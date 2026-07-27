'use client';

import { Form, Input, Button, theme, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from '@/i18n/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import SelectLspRole from './SelectLspRole';
import { useTranslations } from 'next-intl';

const { useToken } = theme;

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

export default function LoginType1({ 
  handleLogin, 
  loading, 
  listLsp = [], 
  handleGenerateToken, 
  token,
  errorMessage = '',
  headerActions
}: { 
  handleLogin: (values: { username: string; password: string }) => Promise<void>; 
  loading: boolean;
  listLsp?: LspLoginResponse[];
  handleGenerateToken?: (payload: iPayloadGenerateToken, token: string) => Promise<void>;
  token?: string;
  errorMessage?: string;
  headerActions?: React.ReactNode;
}) {
  const { token: themeToken } = useToken();
  const router = useRouter();
  const isMobile = useIsMobile();

  const t = useTranslations('common');

  // Show LSP selection UI if listLsp has items
  if (listLsp.length > 0) {
    return (
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {headerActions && (
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
            {headerActions}
          </div>
        )}
        <SelectLspRole
          listLsp={listLsp}
          handleGenerateToken={handleGenerateToken}
          token={token}
          errorMessage={errorMessage}
          loading={loading}
          maxWidth="800px"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themeToken.colorBgContainer,
        padding: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '800px',
          height: isMobile ? 'auto' : '500px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Left Section - Slogan */}
        {!isMobile && (
        <div
          style={{
            flex: 1,
            backgroundColor: themeToken.colorPrimary,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top-left decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              left: '-40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          {/* Bottom-right decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              right: '-40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            {t('welcome')}
          </h2>
          <p style={{ fontSize: '16px', textAlign: 'center', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
            {t('slogan-login-satu')}
          </p>
        </div>
        )}

        {/* Right Section - Form */}
        <div
          style={{
            flex: 1,
            backgroundColor: themeToken.colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '24px' : '40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {headerActions && (
            <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
              {headerActions}
            </div>
          )}
          {/* Top-right decoration */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: themeToken.colorPrimary,
              opacity: 0.1,
            }}
          />
          {/* Bottom-left decoration */}
          <div
            style={{
              position: 'absolute',
              bottom: '-40px',
              left: '-40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: themeToken.colorPrimary,
              opacity: 0.1,
            }}
          />
          
          <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: themeToken.colorPrimary }}>
                Login
              </h1>
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

            <Form
              layout="vertical"
              onFinish={handleLogin}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your username"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Enter your password"
                  size="large"
                />
              </Form.Item>

              <Divider />

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  loading={loading}
                  style={{ backgroundColor: themeToken.colorPrimary }}
                >
                  Login
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="default"
                  block
                  size="large"
                  onClick={() => router.push('/register')}
                  loading={loading}
                  style={{
                    color: themeToken.colorPrimary,
                    borderColor: themeToken.colorPrimary,
                  }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
