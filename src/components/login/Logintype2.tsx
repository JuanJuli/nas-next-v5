'use client';

import { Form, Input, Button, theme, Divider, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import SelectLspRole from './SelectLspRole';
import logoNas from '../../../public/logo/nas-small.png';
import thumbnail from '../../../public/logo/org-proyek.png';
import { useTranslations } from 'next-intl';

const { useToken } = theme;

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

export default function Logintype2({ 
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
          maxWidth="65vw"
          showLogo={true}
          logoElement={
            <div
              style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={logoNas}
                alt="Logo NAS"
                width={70}
                height={70}
                style={{ objectFit: 'contain' }}
              />
            </div>
          }
          containerStyle={{
            backgroundColor: themeToken.colorBgContainer,
          }}
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
          maxWidth: '65vw',
          height: isMobile ? 'auto' : '600px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Left Section - Form */}
        <div
          style={{
            width: isMobile ? '100%' : '50%',
            backgroundColor: themeToken.colorBgContainer,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: isMobile ? '24px' : '40px',
            position: 'relative',
          }}
        >
          {headerActions && (
            <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
              {headerActions}
            </div>
          )}
          {/* Logo - Top Left */}
          <div
            style={{
              position: 'absolute',
              top: '5px',
              left: '20px',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Image
              src={logoNas}
              alt="Logo NAS"
              width={70}
              height={70}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div style={{ width: '100%' }}>
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

        {/* Right Section - Slogan with Thumbnail */}
        {!isMobile && (
        <div
          style={{
            width: '50%',
            background: `linear-gradient(135deg, ${themeToken.colorPrimary} 0%, ${themeToken.colorPrimary}cc 100%)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '60px 30px 0 30px',
            color: '#fff',
            position: 'relative',
            paddingTop: '80px',
          }}
        >
          {/* Slogan - Center */}
          <div style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', margin: 0 }}>
              {t('header-slogan-login-dua')}
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.8', margin: 0, letterSpacing: '0.5px' }}>
              {t('slogan-login-dua')}
            </p>
          </div>

          {/* Thumbnail - Bottom Center */}
          <div
            style={{
              width: '80%',
              height: 'auto',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            <Image
              src={thumbnail}
              alt="Thumbnail"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
