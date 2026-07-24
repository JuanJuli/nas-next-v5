'use client';

import { Result, theme } from 'antd';
import Link from 'next/link';
import { SmileOutlined } from '@ant-design/icons';

const { useToken } = theme;

export default function Home() {
  const { token } = useToken();

  return (
    <div 
      className="flex min-h-screen items-center justify-center font-sans"
      style={{ backgroundColor: token.colorBgContainer }}
    >
      <div className="text-center space-y-8">
        <Result
          icon={<SmileOutlined />}
          title="SELAMAT DATANG DI NUSANTARA APLIKASI SERTIFIKASI"
          styles={{ title: { color: token.colorPrimary } }}
          className='text-4xl md:text-5xl font-bold'
          extra={<Link
            href="/dashboard"
            className="inline-block px-8 py-3 rounded-lg font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: token.colorPrimary, color: token.colorText }}
          >
            Masuk ke Dashboard
          </Link>
          }
        />
        
        
      </div>
    </div>
  );
}
