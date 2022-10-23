/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 19:52:29 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { createContext, useContext } from "react";

export type SideBarContextType = {
  showIcon: boolean;
  showLabel: boolean;
};

export const SideBarContext = createContext<
  SideBarContextType | undefined
>(undefined);

export function useSideBarContext(): SideBarContextType {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error(
      "useSideBarContext should be used within the SideBarContext provider!"
    );
  }

  return context;
}
