'use client';

import { Form, Input, Button, theme, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import { useIsMobile } from '@/hooks/useIsMobile';
import logoNas from '../../../../../public/logo/nas-small.png';
import thumbnail from '../../../../../public/logo/org-proyek.png';

const { useToken } = theme;

export default function ForgotPasswordPage() {
  const { token: themeToken } = useToken();
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleSubmit = (values: { email: string }) => {
    console.log('Forgot password submitted:', values);
  };

  const handleBack = () => {
    console.log('Back button clicked');
    router.back();
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
                Forgot Password
              </h1>
              <p style={{ margin: '8px 0 0', color: themeToken.colorTextSecondary, fontSize: '14px' }}>
                Enter your email to receive reset instructions
              </p>
            </div>

            <Form
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
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
                  style={{ backgroundColor: themeToken.colorPrimary }}
                >
                  Submit
                </Button>
              </Form.Item>

              <Form.Item>
                <Button
                  type="default"
                  block
                  size="large"
                  onClick={handleBack}
                  style={{
                    color: themeToken.colorPrimary,
                    borderColor: themeToken.colorPrimary,
                  }}
                >
                  Back
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
          <div style={{ textAlign: 'left', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', margin: 0 }}>
              Pencapaian Luar Biasa Dimulai dengan Satu Langkah
            </h2>
            <p style={{ fontSize: '12px', lineHeight: '1.8', margin: 0, letterSpacing: '0.5px' }}>
              Capai Tujuan Karier Anda Dengan Sertifikasi Yang Diakui Industri. Silahkan Masuk Atau Daftar Sekarang Untuk Menggenggam Masa Depan Yang Lebih Cerah.
            </p>
          </div>

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
