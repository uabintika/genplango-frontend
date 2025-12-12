import { CanFunctionReturnType, RESOURCES } from "@/hooks/use-permission";
import { ROUTES } from "@/routes";
import {
  Building2,
  Ribbon,
  SquareLibrary,
  UserLock,
  Users,
  UserStar,
} from "lucide-react";
import { _Translator } from "next-intl";

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
  canView: boolean;
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactElement;
  submenus?: Submenu[];
  children?: SubChildren[];
  canView: boolean;
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactElement;
  submenus: Submenu[];
  id: string;
  canView: boolean;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
  canView: boolean;
};

export function getMenuList(
  pathname: string,
  t: _Translator<Record<string, string>>,
  can: CanFunctionReturnType
): Group[] {
  const canView = {
    serviceRecipients: can(RESOURCES.ServiceRecipients, "viewAny"),
    workers: can(RESOURCES.Workers, "viewAny"),
    users: can(RESOURCES.Users, "viewAny"),
    municipalities: can(RESOURCES.Municipalities, "viewAny"),
    relations: can(RESOURCES.KinshipRelations, "viewAny"),
    methodology: can(RESOURCES.MethodologyAreas, "viewAny"),
  };

  const isActive = (route: string) => pathname.includes(route);

  const menuConfig = [
    {
      id: "serviceRecipients",
      groupLabel: "",
      canView: canView.serviceRecipients,
      menus: [
        {
          id: "serviceRecipients",
          route: ROUTES.ADMIN.SERVICE_RECIPIENTS.INDEX,
          label: t("service_recipients"),
          icon: <Users />,
          canView: canView.serviceRecipients,
        },
      ],
    },
    {
      id: "workers",
      groupLabel: "",
      canView: canView.workers,
      menus: [
        {
          id: "workers",
          route: ROUTES.ADMIN.WORKERS.INDEX,
          label: "Darbuotojai",
          icon: <UserLock />,
          canView: canView.workers,
        },
      ],
    },
    {
      id: "users",
      groupLabel: "",
      canView: canView.users,
      menus: [
        {
          id: "users",
          route: ROUTES.ADMIN.USERS.INDEX,
          label: "Naudotojai",
          icon: <UserStar />,
          canView: canView.users,
        },
      ],
    },
    {
      id: "settings",
      groupLabel: "Nustatymai",
      canView:
        canView.municipalities || canView.relations || canView.methodology,
      menus: [
        {
          id: "municipalities",
          route: ROUTES.ADMIN.MUNICIPALITIES.INDEX,
          label: "Savivaldybės",
          icon: <Building2 />,
          canView: canView.municipalities,
        },
        {
          id: "relations",
          route: ROUTES.ADMIN.KINSHIP_RELATIONS.INDEX,
          label: "Ryšiai tarp klientų",
          icon: <Ribbon />,
          canView: canView.relations,
        },
        {
          id: "methodology-areas",
          route: ROUTES.ADMIN.METHODOLOGY_AREAS.INDEX,
          label: "Metodikų sritys",
          icon: <SquareLibrary />,
          canView: canView.methodology,
        },
      ],
    },
  ];

  return menuConfig.map((group) => ({
    ...group,
    menus: group.menus.map((menu) => ({
      ...menu,
      href: menu.route,
      active: isActive(menu.route),
      submenus: [],
    })),
  }));
}
