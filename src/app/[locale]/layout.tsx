import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ThemeProvider from "@/components/provider/ThemeProvider";
import {NextIntlClientProvider} from 'next-intl';

import { getTenant } from "@/service/tenant";
import { TenantProvider } from "@/components/provider/TenantProvider";
import TanstackProvider from "@/components/provider/TanstackProvider";
import AuthProvider from "@/components/provider/AuthProvider";
import { getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const domain = headersList.get("x-tenant") || "default";

  let title = 'NAS Online';
  let description = 'Nusantara Aplikasi Sertifikasi';
  let favicon = '/favicon.ico';

  if (domain !== "default") {
    const lspData = await getTenant(domain);
    if (lspData?.data.white_lable) {
      title = 'Sertifikasi Online';
      description = 'Aplikasi Sertifikasi Online';
    }

    if (lspData?.data?.favicon) {
      favicon = lspData.data.favicon;
    } else if (lspData?.data.white_lable) {
      favicon = ''; // remove favicon if white label and no custom favicon provided
    }
  }

  return {
    title: title,
    description: description,
    icons: favicon
      ? [
          {
            rel: 'icon',
            url: favicon,
          },
        ]
      : [],
  };
}

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const headersList = await headers();
  const cookieStore = await cookies();
  const domain = headersList.get("x-tenant") || "default";
  let defaultColor = "#1884bc";

  let lspData = null;
  if (domain !== "default" && domain !== "localhost:3000") {
    lspData = await getTenant(domain);
    if (lspData?.data?.white_lable && lspData?.data?.color_theme) {
      defaultColor = lspData.data.color_theme;
    }
  }
  const roleCode = cookieStore.get('role_code') ?? null;
  const lsp_id = cookieStore.get('xt-id') ?? null;
  
  return (
    <AntdRegistry>
      <TanstackProvider>
        <ThemeProvider primaryColor={defaultColor}>
          <TenantProvider value={lspData?.data || null} lsp_id={lsp_id?.value}>
            <AuthProvider roleCode={roleCode?.value}>
              {children}
            </AuthProvider>
          </TenantProvider>
        </ThemeProvider>
      </TanstackProvider>
    </AntdRegistry> 
  )
}

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {

  const {locale} = await params;

  const messages = await getMessages();
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <MainLayout>{children}</MainLayout>
    </NextIntlClientProvider>
  );
}
