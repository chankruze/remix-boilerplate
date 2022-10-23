/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 17:34:46 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { FC } from "react";
import type { NavLinkType } from "~/config";
import { useState } from "react";
import { Link } from "@remix-run/react";
import classNames from "classnames";
import { NavBrand } from "./NavBrand";
import {
  RiMenuUnfoldLine,
  RiMenuFoldLine,
  RiCloseLine,
  RiMenu3Line,
} from "react-icons/ri";

export type NavBarProps = {
  navLinks: NavLinkType[];
  isSideBarCollapsed: boolean;
  collapseSideBar: (val: boolean) => void;
};

export const NavBar: FC<NavBarProps> = ({
  navLinks,
  isSideBarCollapsed,
  collapseSideBar,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={classNames(
        "p-2 flex justify-between items-center flex-wrap",
        "border-b border-gray-200 dark:border-gray-800 dark:text-gray-200"
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className="hidden sm:block w-fit p-3 text-gray-500 bg-gray-100 hover:bg-gray-200 dark:text-gray-400
          dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer rounded"
          onClick={() => collapseSideBar(!isSideBarCollapsed)}
        >
          {isSideBarCollapsed ? (
            <RiMenuUnfoldLine className="w-4 h-4 sm:w-6 sm:h-6" />
          ) : (
            <RiMenuFoldLine className="w-4 h-4 sm:w-6 sm:h-6" />
          )}
        </div>
        {/* 1. barnd image */}
        <NavBrand />
        {/* 2. brand text */}
      </div>
      <div className="ml-auto flex flex-row items-center gap-2 lg:order-2">
        {/* <ThemeToggle />
        <Avatar /> */}
        <div
          className="p-3 text-gray-500 bg-gray-100 hover:bg-gray-200 dark:text-gray-400
          dark:bg-gray-800 dark:hover:bg-gray-700 sm:hidden cursor-pointer rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <RiCloseLine className="h-6 w-6" />
          ) : (
            <RiMenu3Line className="h-6 w-6" />
          )}
        </div>
      </div>
      {/* Links Section
        
        1. This section should be collapsable which means on a mobile/tablet device 
        this section will be hidden.
        2. This should be opened with a toggle button. */}
      <div
        className={classNames("sm:hidden sm:flex-row items-center gap-2", {
          "border-t mt-2 border-gray-200 dark:border-gray-700 w-full lg:w-fit flex-col":
            isMenuOpen,
          hidden: !isMenuOpen,
        })}
      >
        {navLinks.map((navLink: NavLinkType) => (
          <Link key={navLink.href} to={navLink.href}>
            {navLink.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
