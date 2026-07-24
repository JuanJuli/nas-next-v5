'use client';

import { theme, Button } from 'antd';
import { ToolOutlined, ReloadOutlined } from '@ant-design/icons';
import { useRouter } from '@/i18n/navigation';
import Image from 'next/image';
import logo from '../../../public/logo/nas-small.png';

const { useToken } = theme;

export default function MaintenancePage() {
  const { token } = useToken();
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${token.colorPrimary}15 0%, ${token.colorBgContainer} 100%)`,
        padding: '16px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: token.colorBgContainer,
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          padding: '48px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: token.colorPrimary,
            opacity: 0.05,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            backgroundColor: token.colorPrimary,
            opacity: 0.05,
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1,
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

        {/* Icon */}
        <div
          style={{
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              margin: '0 auto',
              borderRadius: '50%',
              backgroundColor: `${token.colorPrimary}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ToolOutlined
              style={{
                fontSize: '48px',
                color: token.colorPrimary,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
          }}
        >
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: token.colorPrimary,
              margin: '0 0 16px 0',
            }}
          >
            Situs dalam pemeliharaan
          </h1>
          
          <p
            style={{
              fontSize: '16px',
              color: token.colorTextSecondary,
              lineHeight: '1.6',
              margin: '0 0 32px 0',
              padding: '0 16px',
            }}
          >
            Mohon maaf atas ketidaknyamanan karena sistem dalam pemeliharaan dalam rangka peningkatan layanan. Terimakasih.
          </p>

          <Button
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            style={{
              height: '48px',
              paddingLeft: '32px',
              paddingRight: '32px',
              fontSize: '16px',
              backgroundColor: token.colorPrimary,
            }}
          >
            Muat Ulang
          </Button>

          <div
            style={{
              marginTop: '32px',
              padding: '16px',
              backgroundColor: `${token.colorPrimary}08`,
              borderRadius: '8px',
              fontSize: '14px',
              color: token.colorTextTertiary,
            }}
          >
            <p style={{ margin: 0 }}>
              Sistem kami sedang dalam proses pemeliharaan berkala untuk memberikan pengalaman yang lebih baik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
