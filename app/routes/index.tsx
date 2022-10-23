/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 23 2022 06:28:27 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useTransition } from "@remix-run/react";
import { countAllUsers } from "~/controllers/user.controller";
import { StatsCard } from "~/components/StatusCard";

type LoaderData = {
  usersCount: Awaited<ReturnType<typeof countAllUsers>>;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    usersCount: await countAllUsers(),
  });
};

export default function DashBoard() {
  const { usersCount } = useLoaderData() as LoaderData;

  const transition = useTransition();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
        <StatsCard
          title="Total Users"
          count={usersCount as number}
          isLoading={transition.state === "loading"}
        />
      </div>
    </div>
  );
}
