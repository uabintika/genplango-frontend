import { useAuth } from "../contexts/auth-context";

export type CanFunctionReturnType = (
  resource: string,
  action: string
) => boolean;

type UsePermissionReturnType = {
  can: CanFunctionReturnType;
};

export function usePermission(): UsePermissionReturnType {
  const { user } = useAuth();

  const can = (resource: string, action: string): boolean => {
    if (!user) return false;
    return user.permissions?.includes(`${resource}.${action}`);
  };

  return { can };
}

export const RESOURCES = {
  Users: "users",
  Workers: "workers",
  Institutions: "institutions",
  KinshipRelations: "kinshipRelations",
  ServiceRecipients: "serviceRecipients",
  ServiceRecipientNotes: "serviceRecipientNotes",
  ServiceRecipientContacts: "serviceRecipientContacts",
  ServiceRecipientMethodologyAreas: "serviceRecipientMethodologyAreas",
  ServiceRecipientMethodologyAreaPlans: "serviceRecipientMethodologyAreaPlans",
  Municipalities: "municipalities",
  MethodologyAreas: "methodologyAreas",
};
