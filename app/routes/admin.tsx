/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 11:05:29 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useState } from "react";
import { NavBar } from "~/components/navbar";
import { SideBar } from "~/components/sidebar";
import { navLinks } from "~/config";
import { requireRole } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await requireRole(request, ["admin"]);
};

export default function Admin() {
  const [isSideBarFolded, setIsSideBarFolded] = useState(false);
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden select-none">
      <NavBar
        navLinks={navLinks}
        isSideBarCollapsed={isSideBarCollapsed}
        collapseSideBar={setIsSideBarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden">
        {!isSideBarCollapsed && (
          <SideBar
            navLinks={navLinks}
            isFolded={isSideBarFolded}
            toggleFold={setIsSideBarFolded}
          />
        )}
        <main className="relative flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
