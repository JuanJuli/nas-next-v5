import { destroySession } from "@/utils/session";

export function useLogout() {
  const handleLogout = async () => {
    await destroySession(true);
  };

  return { logout: handleLogout };
}
