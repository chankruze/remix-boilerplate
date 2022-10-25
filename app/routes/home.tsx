/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 24 2022 19:34:06 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoaderFunction } from "@remix-run/node";
import { requireRole } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await requireRole(request, ["user", "admin"]);
};

export default function Home() {
  return <div>Home</div>;
}
