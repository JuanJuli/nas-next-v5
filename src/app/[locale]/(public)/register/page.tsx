import RegisterPage from '@/features/register/components/Register';
import MaintenancePage from '@/components/login/MaintenancePage';
import { checkMaintenance } from '@/service/maintenance';

export default async function Page() {
  const maintenanceConfig = await checkMaintenance();
  const maintenanceMode = maintenanceConfig?.message === 'application under maintenance';

  if (maintenanceMode) {
    return <MaintenancePage />;
  }

  return <RegisterPage />;
}
