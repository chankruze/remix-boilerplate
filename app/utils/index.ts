/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 08:47:20 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export const isActiveRoute = (pathname: string, route: string): boolean => {
  // exact pathname
  // i.e. pathname --> http://localhost/customers, route --> /customers
  if (pathname === route) return true;

  // if the pathname contains the route name
  // i.e. pathname --> http://localhost/customers/new, route --> /customers
  if (
    pathname
      .split("/")
      .filter((i) => i !== "")
      .includes(route.slice(1))
  )
    return true;

  return false;
};
