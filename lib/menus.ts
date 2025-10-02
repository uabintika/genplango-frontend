import { ROUTES } from "@/routes";

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
      id: "dashboard",
      menus: [
        {
          id: "dashboard",
          href: ROUTES.ADMIN.DASHBOARD,
          label: t("dashboard"),
          active: pathname.includes(ROUTES.ADMIN.DASHBOARD),
          icon: "",
          submenus: [
            {
              href: "/",
              label: "Example 1",
              active: pathname === "/dashboard/analytics",
              icon: "",
              children: [],
            },
            {
              href: "/",
              label: "Example 2",
              active: pathname === "/dashboard/dash-ecom",
              icon: "",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "",
      id: "changelog",
      menus: [
        {
          id: "changelog",
          href: "/changelog",
          label: "Changelog",
          active: pathname.includes("/changelog"),
          icon: "",
          submenus: [],
        },
      ],
    },
  ];
}
