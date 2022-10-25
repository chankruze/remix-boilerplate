/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 24 2022 18:37:06 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { requireRole } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireRole(request, ["user", "admin"]);
  return redirect("/home");
};
