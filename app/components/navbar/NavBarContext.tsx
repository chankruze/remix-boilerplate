/*
Author: chankruze (chankruze@gmail.com)
Created: Sat Oct 22 2022 19:52:29 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { createContext, useContext } from "react";

export type NavBarContextType = {
  isMenuOpen: boolean;
};

export const NavBarContext = createContext<NavBarContextType | undefined>(
  undefined
);

export function useNavBarContext(): NavBarContextType {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error(
      "useNavBarContext should be used within the NavBarContext provider!"
    );
  }

  return context;
}
