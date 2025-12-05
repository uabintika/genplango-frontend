import { ROUTES } from "@/routes";
import { UserLock, Users } from "lucide-react";

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: "",
      id: "serviceRecipients",
      menus: [
        {
          id: "serviceRecipients",
          href: ROUTES.ADMIN.SERVICE_RECIPIENTS.INDEX,
          label: t("service_recipients"),
          active: pathname.includes(ROUTES.ADMIN.SERVICE_RECIPIENTS.INDEX),
          icon: <Users />,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      id: "workers",
      menus: [
        {
          id: "workers",
          href: ROUTES.ADMIN.WORKERS.INDEX,
          label: "Darbuotojai",
          active: pathname.includes(ROUTES.ADMIN.WORKERS.INDEX),
          icon: <UserLock />,
          submenus: [],
        },
      ],
    },
    // {
    //   groupLabel: "",
    //   id: "dashboard",
    //   menus: [
    //     {
    //       id: "dashboard",
    //       href: ROUTES.ADMIN.DASHBOARD,
    //       label: t("dashboard"),
    //       active: pathname.includes(ROUTES.ADMIN.DASHBOARD),
    //       icon: "",
    //       submenus: [
    //         {
    //           href: "/",
    //           label: "Example 1",
    //           active: pathname === "/dashboard/analytics",
    //           icon: "",
    //           children: [],
    //         },
    //         {
    //           href: "/",
    //           label: "Example 2",
    //           active: pathname === "/dashboard/dash-ecom",
    //           icon: "",
    //           children: [],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
}
