import LoginPage from '@/components/login/LoginPage';
import MaintenancePage from '@/components/login/MaintenancePage';
import { checkMaintenance } from '@/service/maintenance';

export default async function Page() {
  // TODO: nanti login type nya bisa diambil dari database/cookie, untuk sementara hardcode dulu

  const maintenanceConfig = await checkMaintenance();

  const maintenanceMode = maintenanceConfig?.message === 'application under maintenance';

  if (maintenanceMode) {
    return <MaintenancePage />;
  }

  return <LoginPage />;
}