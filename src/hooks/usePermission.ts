import { useAccessRole } from "@/components/provider/AccessRoleProvider";

export function usePermission() {
//   const permissions = useAuthStore((s) => s.permissions);
  const accessRole = useAccessRole();

  const can = (permission: string, type?: string) => {
    if (type === 'module') {
      if (accessRole?.access_module) {
        return accessRole.access_module.includes(permission);
      }
    } else {
      if (accessRole?.access_role) {
        return accessRole.access_role.includes(permission);
      }
    }
    return false;
  };

  return { can };
}