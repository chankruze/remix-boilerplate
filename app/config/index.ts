/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 17:49:43 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { IconType } from "react-icons";
import { Roles } from "./roles";
import { RiDashboardLine, RiGroupLine } from "react-icons/ri";

export type NavLinkType = {
  label: string;
  href: string;
  icon: IconType;
  roles: Roles[];
};

export const navLinks: NavLinkType[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: RiDashboardLine,
    roles: [Roles.ADMIN, Roles.MANAGER],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: RiGroupLine,
    roles: [Roles.ADMIN, Roles.MANAGER],
  },
];

export const APP_NAME = "Remix 🚀";
