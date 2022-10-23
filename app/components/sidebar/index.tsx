/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 17:34:51 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { FC } from "react";
import type { NavLinkType } from "~/config";
import classNames from "classnames";
import { SideBarContext } from "./SideBarContext";
import { SideBarNavItem } from "./SideBarNavItem";
import { RiMenuUnfoldLine, RiMenuFoldLine } from "react-icons/ri";
import { useLocation } from "@remix-run/react";
import { isActiveRoute } from "~/utils";

export type SideBarProps = {
  navLinks: NavLinkType[];
  isFolded: boolean;
  // eslint-disable-next-line no-unused-vars
  toggleFold: (val: boolean) => void;
};

export const SideBar: FC<SideBarProps> = ({
  navLinks,
  isFolded,
  toggleFold,
}) => {
  const location = useLocation();

  return (
    <SideBarContext.Provider
      value={{
        showLabel: !isFolded,
        showIcon: true,
      }}
    >
      <aside
        className={classNames(
          "hidden sm:flex h-full flex-col gap-4",
          "border-r border-gray-200 dark:border-gray-800"
        )}
      >
        <nav className="p-2 flex-1 space-y-2 overflow-y-auto">
          {navLinks.map((navLink: NavLinkType) => (
            <SideBarNavItem
              key={navLink.href}
              navLink={navLink}
              showIcon
              showLabel
              isActive={isActiveRoute(location.pathname, navLink.href)}
            />
          ))}
        </nav>
        <div className="p-2 flex flex-col justify-center">
          <div
            className="p-3 w-fit cursor-pointer text-gray-500 dark:text-gray-400 bg-gray-100 
            dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            onClick={() => toggleFold(!isFolded)}
          >
            {isFolded ? (
              <RiMenuUnfoldLine className="w-4 h-4 sm:w-6 sm:h-6" />
            ) : (
              <RiMenuFoldLine className="w-4 h-4 sm:w-6 sm:h-6" />
            )}
          </div>
        </div>
      </aside>
    </SideBarContext.Provider>
  );
};
