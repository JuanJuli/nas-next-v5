'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { SettingOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export default function FloatChangeLogin() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const fixLoginType = useMemo(() => {
    let currLoginType = 1;
    const loginTypeParams = searchParams.get('loginType')
    if (loginTypeParams) {
      const parseLtp = parseInt(loginTypeParams);
      if (parseLtp > 0) {
        currLoginType = parseLtp;
      }
    };

    return currLoginType;
  }, [searchParams])

  const handleClick = (value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("loginType", `${value}`)
    router.push(`${pathName}?${params.toString()}`);
  }

  return (
    <>
    <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }} trigger="hover" type="primary" icon={<SettingOutlined />}>
      {fixLoginType !== 1 && (
        <FloatButton shape="circle" style={{ display: fixLoginType === 1 ? 'none' : undefined }} onClick={() => handleClick(1)} content="1" />
      )}
      {fixLoginType !== 2 && (
        <FloatButton shape="circle" style={{ display: fixLoginType === 2 ? 'none' : undefined }} onClick={() => handleClick(2)} content="2" />
      )}
      {fixLoginType !== 3 && (
        <FloatButton shape="circle" style={{ display: fixLoginType === 3 ? 'none' : undefined }} onClick={() => handleClick(3)} content="3" />
      )}
    </FloatButton.Group>
    </>
  )
}
