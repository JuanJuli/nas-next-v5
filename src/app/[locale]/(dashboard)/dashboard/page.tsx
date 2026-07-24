import DashboardApl from '@/features/dashboard/components/apl/Dashboard'
import DashboardAdmin from '@/features/dashboard/components/admin/Dashboard'

import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const roleCode = cookieStore.get('role_code')

  if (roleCode?.value === 'APL') {
    return (
      <DashboardApl />
    )
  }

  return (
    <DashboardAdmin />
  )
}
