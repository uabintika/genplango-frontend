import { useAuth } from "../contexts/auth-context";

export function usePermission() {
  const { user } = useAuth();

  const can = (resource: string, action: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(`${resource}.${action}`);
  };

  return { can };
}
