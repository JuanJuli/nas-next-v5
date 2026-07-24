import { cookies } from 'next/headers'
import { Layout } from 'antd';
import { getAccessRole } from '@/service/accessRole';
import { AccessRoleProvider } from '@/components/provider/AccessRoleProvider';
import { AccessRoleAll } from '@/types/accessRole';
import ProtectedRouteGuard from '@/components/ProtectedRouteGuard';
import RoleGuard from '@/components/RoleGuard';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const cookieStore = await cookies()
  const roleCode = cookieStore.get('role_code') ?? null;

  let accessRole: AccessRoleAll | null = null;
  if (roleCode) {
    const accessRoleRes = await getAccessRole(roleCode.value)
    if (accessRoleRes?.data) {
      accessRole = accessRoleRes.data;
    }
  }
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AccessRoleProvider value={accessRole}>
        <ProtectedRouteGuard>
          <RoleGuard roleCode={roleCode?.value}>
            {children}
          </RoleGuard>
        </ProtectedRouteGuard>
      </AccessRoleProvider>
    </Layout>
  );
}
