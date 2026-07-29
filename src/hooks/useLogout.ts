import { useSession } from "@/utils/session";

export function useLogout() {
  const { destroy } = useSession();

  const handleLogout = async () => {
    await destroy(true);
  };

  return { logout: handleLogout };
}
