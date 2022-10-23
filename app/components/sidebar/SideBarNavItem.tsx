/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 19:44:14 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { FC } from "react";
import type { NavLinkType } from "~/config";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { useSideBarContext } from "./SideBarContext";

interface SideBarNavItemProps {
  navLink: NavLinkType;
  isActive?: boolean;
  showIcon?: boolean;
  showLabel?: boolean;
}

export const SideBarNavItem: FC<SideBarNavItemProps> = ({
  navLink,
  isActive,
}) => {
  const { showIcon, showLabel } = useSideBarContext();

  return (
    <Link
      to={navLink.href}
      className={classNames(
        "p-3 flex items-center border-0 space-x-2 rounded duration-200 font-medium",
        {
          "text-white bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-600":
            isActive,
          "text-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800":
            !isActive,
        }
      )}
    >
      {showIcon && <navLink.icon className="w-4 h-4 sm:w-6 sm:h-6" />}
      {showLabel && (
        <span className="uppercase font-poppins text-sm">{navLink.label}</span>
      )}
    </Link>
  );
};
