'use client';

import { useMemo, useState } from 'react';
import { useRouter } from '@/i18n/navigation';
import LoginType1 from '@/components/login/LoginType1';
import LoginType2 from '@/components/login/Logintype2';
import LoginType3 from '@/components/login/LoginType3';
import { DefaultApiResponse } from '@/types/defaultApiResponse';
import { LspLoginResponse } from '@/types/login';
import { useSearchParams } from 'next/navigation';

interface iPayloadGenerateToken {
  lsp_id: string;
  tuk_id?: string;
  role_code: string;
  institution_id?: string;
}

export default function LoginPage({ loginType = 1 }: { loginType?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [listLsp, setListLsp] = useState<LspLoginResponse[]>([]);
  const [token, setToken] = useState<string>('');

  const handleGenerateToken = async (payload: iPayloadGenerateToken,  token:string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setErrorMessage('Failed to generate token. Please try again.');
        return;
      }

      setListLsp([]); // Clear LSP list to hide selection UI
      setToken(''); // Clear token from state
      setErrorMessage(''); // Clear any previous error messages
      setLoading(false); // Stop loading before redirecting

      router.push(redirectTo);
    } catch (error) {
      setErrorMessage('An error occurred while generating token. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleSetupGenerate = (listLsp: LspLoginResponse[], token: string) => {
    if (listLsp.length === 0) {
      setErrorMessage('No LSP available for login.');
      return;
    }
   
    // Store token
    setToken(token);

    if (listLsp.length === 1) {
       setLoading(true);
      const selectedLsp = listLsp[0];
      if (selectedLsp.role_name.length === 1) {
        const payload: iPayloadGenerateToken = {
          lsp_id: selectedLsp.lsp_id,
          tuk_id: selectedLsp.tuk_id,
          role_code: selectedLsp.role_code[0],
          institution_id: selectedLsp.institution_id,
        };
        handleGenerateToken(payload, token);
        return;
      }
    }

    setListLsp(listLsp);
  }

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    setErrorMessage(''); // Clear previous error
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      const dataResp: DefaultApiResponse<any> = data.data

      if (dataResp.status === "ERROR") {
        if (dataResp.message) {
          setErrorMessage(dataResp.message);
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
        return;
      }

      if (dataResp.lsp && dataResp.token) {
        handleSetupGenerate(dataResp.lsp, dataResp.token);
      }
    } finally {
      setLoading(false);
    }
  };

  const LoginComponent = useMemo(() => {
    switch (loginType) {
      case 1:
        return LoginType1;
      case 2:
        // return LoginType2;
        return LoginType2; // placeholder
      case 3:
        // return LoginType3;
        return LoginType3; // placeholder
      default:
        return LoginType1;
    }
  }, [loginType]);

  return (
    <LoginComponent 
      handleLogin={handleLogin} 
      loading={loading} 
      listLsp={listLsp}
      handleGenerateToken={handleGenerateToken}
      token={token}
      errorMessage={errorMessage}
    />
  );
}