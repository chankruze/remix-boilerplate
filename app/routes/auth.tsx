/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 11:24:38 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Outlet } from "@remix-run/react";

export default function auth() {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 dark:bg-slate-900 overflow-hidden select-none">
      <Outlet />
    </div>
  );
}
