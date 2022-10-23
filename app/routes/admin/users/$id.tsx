/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 06:03:30 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserById } from "~/controllers/user.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUserById>>;
};

export const loader: LoaderFunction = async ({ params }) => {
  return json({
    user: await getUserById(params.id as string),
  });
};

export default function Connection() {
  const { user } = useLoaderData() as LoaderData;

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{user?.email}</h1>
    </main>
  );
}
