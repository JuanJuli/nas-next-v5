'use client';

import { Form, Input, Button, theme, Carousel, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import { LspLoginResponse } from '@/types/login';
import SelectLspRole from './SelectLspRole';
import thumbnailOne from '../../../public/thumbnail/kantoran1.jpg';
import thumbnailTwo from '../../../public/thumbnail/kantoran2.webp';
import logo from '../../../public/logo/nas-small.png';
import { useTranslations } from 'next-intl';

const { useToken } = theme;

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

export default function LoginType3({ 
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
          maxWidth={isMobile ? '100%' : '30vw'}
          showLogo={true}
          logoElement={
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                src={logo}
                alt="Logo"
                width={120}
                height={40}
                style={{ objectFit: 'contain' }}
              />
            </div>
          }
          containerStyle={{
            backgroundColor: '#f5f5f5',
          }}
        />
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .full-height-carousel .slick-slider,
        .full-height-carousel .slick-list,
        .full-height-carousel .slick-track,
        .full-height-carousel .slick-slide,
        .full-height-carousel .slick-slide > div {
          height: 100vh !important;
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          width: '100%',
        }}
      >
      {/* Left Section - Form (20-30vw) */}
      <div
        style={{
          width: isMobile ? '100%' : '30vw',
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
          {/* Logo - Top */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '64px',
            }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: themeToken.colorPrimary }}>
                Selamat Datang
              </h1>
              <p style={{ fontSize: '14px', color: '#8c8c8c', marginTop: '8px' }}>
                Masukkan informasi dibawah ini untuk melakukan login.
              </p>
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

              <Form.Item style={{ marginTop: '24px' }}>
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

              <Form.Item style={{ marginBottom: 0 }}>
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

      {/* Right Section - Carousel (70vw) */}
      {!isMobile && (
        <div
          style={{
            width: '70vw',
            height: '100vh',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Carousel 
            autoplay 
            autoplaySpeed={4000} 
            effect="fade" 
            style={{ height: '100vh', width: '100%' }}
            className="full-height-carousel"
          >
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
              <Image
                src={thumbnailOne}
                alt="Thumbnail 1"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  padding: '40px',
                  color: '#fff',
                }}
              >
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', margin: 0 }}>
                  Raih Kesempatan Anda
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                  Bergabunglah dengan ribuan profesional yang telah meningkatkan kompetensi mereka
                </p>
              </div>
            </div>
            <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
              <Image
                src={thumbnailTwo}
                alt="Thumbnail 2"
                fill
                style={{ objectFit: 'cover'}}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  padding: '40px',
                  color: '#fff',
                }}
              >
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', margin: 0 }}>
                  {t('header-slogan-login-tiga')}
                </h2>
                <p style={{ fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                  {t('slogan-login-tiga')}
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      )}
      </div>
    </>
  );
}
