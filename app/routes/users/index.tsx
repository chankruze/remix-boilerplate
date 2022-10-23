/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 06:02:33 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllUsers } from "~/controllers/user.controller";

type LoaderData = {
  users: Awaited<ReturnType<typeof getAllUsers> | []>;
};

export const loader: LoaderFunction = async ({ params }) => {
  return json<LoaderData>({
    users: await getAllUsers(),
  });
};

export default function Users() {
  const { users } = useLoaderData() as LoaderData;

  return (
    <div className="p-4">
      <pre className="dark:text-white">{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
